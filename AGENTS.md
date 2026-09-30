# Working on marin-app-template

## Architecture

This is the starting scaffold for new MarinOS applications, not an app itself. `index.html`, `README.md`, and `marin.yml` all carry `APP_NAME`/`APP_DESCRIPTION`/`APP_OWNER`/`APP_REPO` placeholders that get replaced when a new app is created from it.

## Before making changes

Changes here affect every future app created from this template — existing apps don't inherit them automatically (see `README.md`'s note on `TEMPLATE_VERSION`). Keep it minimal: only the standard shell, nav, and placeholder content belong here, nothing app-specific.

## Before finishing

Bump `TEMPLATE_VERSION` and add a `CHANGELOG.md` entry for any change that affects what a newly-created app looks like. If the change touches the standard nav/tab pattern, also update `marin-skills/marin-app-builder/SKILL.md`'s build workflow and review checklist to match.

## References

- `marin-ui` — the shared bundle this template vendors: https://github.com/marincountygov/marin-ui
- `marin-skills/marin-app-builder` — the skill that uses this template to scaffold new apps: https://github.com/marincountygov/marin-skills
- `marin-digital-standards` — accessibility, content, brand, and product-design requirements: https://github.com/marincountygov/marin-digital-standards
