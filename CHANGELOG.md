# Changelog

Tracks changes to `marin-app-template` itself — repository structure, starter shell, scaffolding, and documentation. This is separate from `BRAND_VERSION`, which tracks the vendored `marin-ui` bundle.

Existing applications do not automatically inherit these changes. Template changes only affect projects created after the change; see `TEMPLATE_VERSION` and the README's "Template versioning" note.

## 1.2.1

- Expand the standard footer into local-app navigation: plain-text app name plus **About**, **Security**, **Accessibility**, and **Updates**, with **MarinOS** on its own line.
- Keep the informational destinations as hash-routed sections within `index.html`; add the standard `#accessibility` section alongside the existing About, Updates, and Security sections.
- Keep **About** and **Updates** in the application header navigation and remove the default **Start** header item.
- Add responsive footer styles in `shared/app-brand.css`.

## 1.2.0

- Add security setup so new apps start compliant with the MarinOS security standard: a starter `security.json` (the `internal` profile, with `APP_OWNER` placeholders), `SECURITY.md`, a generated `.well-known/security.txt`, a `#security` section wired to the shared renderer in `marin-ui` 1.18.0, an About → Security link, and a README "Security" section. Nothing here needs `APP_NAME`-style identity fields — `marin.yml` already owns identity.
- Add an empty `.nojekyll` file. Apps deployed from a branch (GitHub Pages' default "legacy" build) otherwise skip dot-folders, so `.well-known/security.txt` returned 404. Do not delete it.

## 1.1.0

- Add `marin.yml`, a machine-readable project manifest (owner, status, `marin-ui`/template versions) using the same `APP_NAME`/`APP_DESCRIPTION`/`APP_OWNER`/`APP_REPO` placeholder convention as `index.html` and `README.md`.
- Add `AGENTS.md`, documenting the template repo itself for anyone or any agent working on the template directly. New apps get their own app-shaped `AGENTS.md` as part of the build workflow, not a copy of this one — see `marin-skills/marin-app-builder/SKILL.md`.

## 1.0.0

- Initial template: starter `index.html` shell, `assets/app.css` and `assets/app.js`, vendored `marin-ui` bundle, `docs/development.md`, PR template.
