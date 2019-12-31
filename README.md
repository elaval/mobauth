# mobauth
This is an Angular module that facilitates user authentication against Microsoft Azure AD using Open ID in ionic/cordova mobile Apps

## Context
On Ionic 4 projects you could authenticate using MS-ADAl plugin https://ionicframework.com/docs/native/ms-adal, but that plugin has 2 problems:
- It is no longer mantained by MS (and the git repository has been archived)
- It does not work well on iPhone Apps built with xCode 10.4 (it still works if you use xCode 10.3)

ADAL (Azure Directory Authentication Library) was created to work with AD accounts via the 1.0 endpoint
MSAL works via MS identity platform (formally the Azure AD v2.0 endpoint)
(https://docs.microsoft.com/en-us/azure/active-directory/develop/migrate-objc-adal-msal)

But unfortunately at this time (Dec 2019) there is no ionic plugin for MSAL (and have not read any plan to build it by MS).

An option is to use ionic-appauth (https://www.npmjs.com/package/ionic-appauth) which is an implementation of  AppAuth-JS (https://github.com/openid/AppAuth-JS) for ionic users.

AppAuth is a client for communicating with OAuth 2.0 and OpenID Connect providers. OpenID Connect is a MS recommendation if we are building a web application that is hosted on a server and accessed via a browser. https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-protocols-openid-connect-code

Even though ionic-appauth has all the pieces to build an authentication service, it has little documentation and it is not easy to built as an angular module that can easily used by an ionic project

We try to help in this last mile

# Quickstart

## Create a new ionic project
$ ionic start mobauth-demo blank

## Install mobauth
$ npm i mobauth --save


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
