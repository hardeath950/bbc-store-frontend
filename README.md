### Sonar Qube
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=hardeath950_bbc-store-frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=hardeath950_bbc-store-frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=hardeath950_bbc-store-frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=hardeath950_bbc-store-frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=hardeath950_bbc-store-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=hardeath950_bbc-store-frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=hardeath950_bbc-store-frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=hardeath950_bbc-store-frontend)
#### LGTM
[![Total alerts](https://img.shields.io/lgtm/alerts/g/hardeath950/bbc-store-frontend.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/hardeath950/bbc-store-frontend/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/hardeath950/bbc-store-frontend.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/hardeath950/bbc-store-frontend/context:javascript)

<p align='center'>
  <img src='https://bobcorn.com.br/wp-content/uploads/2021/04/logo.png' alt='Bobcorn Store Template' width='250'/>
</p>

<p align='center'>
bbc-store forked from <b>Vitesse</b><sup><em>(speed)</em></sup><br>
</p>

<p align='center'>
<a href="https://bbc-store-frontend.vercel.app/">Live Dev Server</a>
</p>
</p>

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born to be fast

- 🗂 [File-based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via Pinia](https://pinia.esm.dev/)

- 📑 [Layout system](./src/layouts)

- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🌍 [I18n ready](./locales)

- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-md)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🦔 Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)

- 🦾 TypeScript, of course

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest)

<br>

## Pre-packed

### UI Frameworks

- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system-based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [Pinia](https://pinia.esm.dev) - Intuitive, type-safe, light and flexible Store for Vue using the composition API
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA
- [`vite-plugin-md`](https://github.com/antfu/vite-plugin-md) - Markdown as components / components in Markdown
  - [`markdown-it-prism`](https://github.com/jGleitz/markdown-it-prism) - [Prism](https://prismjs.com/) for syntax highlighting
  - [`prism-theme-vars`](https://github.com/antfu/prism-theme-vars) - customizable Prism.js theme using CSS variables
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
  - [`vite-plugin-vue-i18n`](https://github.com/intlify/vite-plugin-vue-i18n) - Vite plugin for Vue I18n
- [VueUse](https://github.com/antfu/vueuse) - a collection of useful composition APIs
- [`@vueuse/head`](https://github.com/vueuse/head) - manipulate document head reactively

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - Unit testing powered by Vite
- [Cypress](https://cypress.io/) - E2E testing
- [pnpm](https://pnpm.js.org/) - fast, disk space-efficient package manager
- [`vite-ssg`](https://github.com/antfu/vite-ssg) - Static-site generation
  - [critters](https://github.com/GoogleChromeLabs/critters) - Critical CSS
- [Netlify](https://www.netlify.com/) - zero-config deployment
- [VS Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up the Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 `<script setup>` IDE support
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  - [i18n [Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All-in-one i18n support
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Requirements

> bbc-store requires Node >=14 (better with node >=16)

## Usage

### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that is ready to be served.

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=hardeath950_bbc-store-frontend)
