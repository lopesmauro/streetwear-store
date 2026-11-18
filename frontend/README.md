# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.8.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Application structure

The application uses a feature-first structure:

- `core/layout`: application shell components such as header, footer, dialogs, and notifications.
- `core/storage`: browser storage abstraction.
- `features/products`: product domain, repository, catalog, detail page, and reusable cards.
- `features/favorites`: favorites state and page.
- `features/cart`: cart state and persistence.
- `features/home`: storefront landing page.

Product data currently comes from a local repository. The UI depends on `ProductRepository`, so
the local implementation can later be replaced by an HTTP-backed data source without changing the
pages and cards.

Main routes:

- `/produtos`
- `/produtos/:slug`
- `/favoritos`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
