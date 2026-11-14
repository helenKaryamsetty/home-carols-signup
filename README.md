# CarolHouseVisit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Cloudflare Pages deployment

This app is a static Angular build and is ready for Cloudflare Pages.

- Minimum Wrangler version: `4.1`
- Build command: `npm run build`
- Output directory: `dist/carol-house-visit/browser`
- SPA fallback: included in `public/_redirects` so deep links load correctly
- Security headers: included in `public/_headers`

Connect this repo as a **Cloudflare Pages** project, set the build command to `npm run build` and the output directory to `dist/carol-house-visit/browser`. If deploying from the CLI, use `npx wrangler pages deploy dist/carol-house-visit/browser` with Wrangler `v4.1+`; `wrangler deploy` is for Workers and does not deploy this Pages app.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
