#!/usr/bin/env node
// Validates a brand.json file against schemas/brand.schema.json.
// No dependencies — matches every other MarinOS generator's no-build-step
// convention (see marin-os/scripts/validate-security.js, which this
// adapts). Hand-rolled for the subset of JSON Schema draft 2020-12 this
// schema actually uses (type, required, properties, enum, pattern,
// items/minItems/maxItems, local $ref into $defs) — not a general-purpose
// implementation. If brand.schema.json starts using a feature this file
// doesn't handle, this file needs updating too; it does not silently pass
// unrecognized keywords as "no opinion."
//
// Usage: node scripts/validate-brand.js <path-to-brand.json> [...more paths]
//        node scripts/validate-brand.js   (defaults to every brands/*/brand.json)

const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(repoRoot, "schemas", "brand.schema.json");

function resolveRef(ref, schema) {
  if (!ref.startsWith("#/")) {
    throw new Error(`Only local "#/..." refs are supported, got: ${ref}`);
  }
  const parts = ref.slice(2).split("/");
  let node = schema;
  for (const part of parts) {
    if (!(part in node)) throw new Error(`Cannot resolve $ref "${ref}" — missing "${part}"`);
    node = node[part];
  }
  return node;
}

function typeOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function matchesType(value, type) {
  if (type === "integer") return typeof value === "number" && Number.isInteger(value);
  if (type === "object") return typeOf(value) === "object";
  return typeOf(value) === type;
}

function validate(schema, node, data, dataPath, errors) {
  if (node.$ref) node = resolveRef(node.$ref, schema);
  if (Object.keys(node).length === 0) return; // an intentionally untyped node (see $defs.citation)

  if (node.enum && !node.enum.includes(data)) {
    errors.push(`${dataPath}: must be one of ${JSON.stringify(node.enum)}, got ${JSON.stringify(data)}`);
    return;
  }
  if (node.type && !matchesType(data, node.type)) {
    errors.push(`${dataPath}: must be of type "${node.type}", got "${typeOf(data)}"`);
    return;
  }
  if (node.type === "string" && node.pattern && !new RegExp(node.pattern).test(data)) {
    errors.push(`${dataPath}: does not match pattern ${node.pattern}`);
  }
  if (node.type === "array") {
    if (typeof node.minItems === "number" && data.length < node.minItems) {
      errors.push(`${dataPath}: must have at least ${node.minItems} items, got ${data.length}`);
    }
    if (typeof node.maxItems === "number" && data.length > node.maxItems) {
      errors.push(`${dataPath}: must have at most ${node.maxItems} items, got ${data.length}`);
    }
    if (node.items) data.forEach((item, i) => validate(schema, node.items, item, `${dataPath}[${i}]`, errors));
  }

  if (node.type === "object" || (!node.type && node.properties)) {
    for (const key of node.required || []) {
      if (!(key in data)) errors.push(`${dataPath}: missing required property "${key}"`);
    }
    for (const key of Object.keys(data)) {
      const propSchema = node.properties && node.properties[key];
      if (propSchema) validate(schema, propSchema, data[key], `${dataPath}.${key}`, errors);
    }
  }
}

function validateFile(filePath, schema) {
  const raw = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    return [`Not valid JSON: ${error.message}`];
  }
  const errors = [];
  validate(schema, schema, data, "$", errors);
  return errors;
}

function defaultTargets() {
  const brandsDir = path.join(repoRoot, "brands");
  if (!fs.existsSync(brandsDir)) return [];
  return fs
    .readdirSync(brandsDir)
    .map((slug) => path.join(brandsDir, slug, "brand.json"))
    .filter((p) => fs.existsSync(p));
}

function main() {
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const targets = process.argv.slice(2).length ? process.argv.slice(2) : defaultTargets();

  if (targets.length === 0) {
    console.log("No brand.json files found under brands/*.");
    return;
  }

  let anyErrors = false;
  for (const target of targets) {
    const errors = validateFile(target, schema);
    if (errors.length === 0) {
      console.log(`${target}: valid`);
    } else {
      anyErrors = true;
      console.error(`${target}: INVALID`);
      for (const error of errors) console.error(`  - ${error}`);
    }
  }
  if (anyErrors) process.exit(1);
}

main();
