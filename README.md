# Nickname Editor

A basic nickname editor written using Angular and RxJs.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running end-to-end tests

Currently we only have e2e tests written using Jasmine and Protractor.

Unit tests will be implemented later on as well as an extra contract.

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Architecture

From a technical perspective the end goal was to implement the app in a fully reactive way, withouth using any template driven approaches.

### Components

The different parts of the UI are organised into sections:

-   Details: holds the address and description of the building
-   Nicknames: where the user can add new nicknames to a list

### Services

Currently there is only one service which takes care of the input validation"

-   `ValidationService`

It does that by simulating a http request with the `delay()` operator.

Later if more custom validation will be needed, the `ValidationService` can be a perfect place for that.
