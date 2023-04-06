# `www.goldenwere.com`

This is the framework used for building the Goldenwere home website. This framework is designed to be as separate as possible from Goldenwere branding/content in order to maintain re-usability while still being usable through CI/CD.

## Stack
- builder: Vite 4
  - static build
- framework: Vue 3
  - *.vue SFCs
  - `<script setup>`
  - `<style scoped>`
- language: Typescript 4.9
- router: Vue Router 4
- store: Pinia 2
- markup: Pug 3
- style: Sass 1

## Development

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Deploying

Github Actions is configured to build `/dist` to AWS on push to `main`. `/content` must be syncronized manually.

## Content API
The following content definitions are required/assumed by the node project in order to load properly.

### `/content/meta/favicon.ico`
Where the favicon for the site is stored.

Note that if this is missing, the site will not have a favicon for the browser.

### `/content/themes/base.css`
Where the base/default theme is stored. All themes must be in a format corresponding to `src/types/theme.d.ts`.

Note that if this is missing and no other theme is selected, the site's styling will be broken.

### `/content/site.yml`
Where the site's shared primary config is stored; must match `src/types/site.d.ts`.

Note that if this is missing, a lot of the site's basic information and config will not be applied.
