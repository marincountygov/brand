# Development

## Run locally

Open `index.html` directly in a browser:

```text
file:///path/to/index.html
```

Serve the folder with any static web server when browser origin behavior matters (IndexedDB, service workers, stricter runtime packaging), or when running accessibility tools like WAVE.

## Customize the starter

1. Replace every `APP_NAME`, `APP_DESCRIPTION`, and `APP_OWNER` placeholder — search the project for these tokens (`index.html`, `README.md`) and fill them in with real values.
2. Update the page `<title>` and `<meta name="description">`.
3. Replace the starter `#start` section in `index.html` with the real workflow. Keep the standard `#about`, `#security`, `#accessibility`, and `#updates` sections in `index.html`; these are hash-routed by `shared/app-shell.js`.
4. Keep **About** and **Updates** in the application header navigation, with no default **Start** item. Keep the footer app name as plain text followed by **About**, **Security**, **Accessibility**, and **Updates**, with **MarinOS** on its own line.
5. Add app-specific styles to `assets/app.css` and app-specific behavior to `assets/app.js` — see the guidance comments in each file before adding new patterns.

## Use marin-ui

This project vendors a release of [`marin-ui`](https://github.com/marincountygov/marin-ui): `shared/app-brand.css`, `shared/app-shell.js`, `vendor/pico.min.css`, `vendor/fonts/Jost-wght.ttf`, and `BRAND_VERSION`.

Prefer existing marin-ui components and tokens over new CSS. See `marin-ui`'s `docs/` (architecture, foundations, components, app shell, accessibility implementation) before adding new markup patterns.

### Updating the marin-ui bundle

Use marin-ui's own sync script from a local checkout of `marin-ui`:

```text
./scripts/sync-consumer.sh /path/to/this-project
```

This copies `BRAND_VERSION`, `shared/app-brand.css`, `shared/app-shell.js`, `vendor/pico.min.css`, and `vendor/fonts/Jost-wght.ttf`. Do not edit the vendored `shared/` or `vendor/` files directly — fixes belong in `marin-ui`, then re-sync.

After syncing, review the marin-ui changelog, check the resulting diff, and re-test the app before committing.

## Test changes

- Keyboard: tab through the page, confirm visible focus, and confirm the skip link and menu work.
- Reflow: check the page at a narrow viewport and at 200% zoom.
- Color mode: check both light and dark, since the shell follows `prefers-color-scheme` and does not provide a manual toggle.
- Accessibility: run WAVE over HTTP (or grant the extension local-page access for `file://`) — see marin-ui's `docs/accessibility-implementation.md`.

## Deployment

Deployment steps vary by hosting target and are not yet standardized here. Document the actual deployment process for this application in this file once it is established, rather than assuming a specific host.
