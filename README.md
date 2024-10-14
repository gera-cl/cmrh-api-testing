# cmrh-testing
================

A testing framework for authentication using Jest and Supertest.

## Table of Contents
-----------------

* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Environment Variables](#environment-variables)
* [License](#license)

## Getting Started
---------------

Welcome to our project! This section will guide you through the process of getting started with our codebase.

This project uses [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) for testing.

The tests look to cover all the functionalities of the backend of Cumorah, a password management application, by calling the endpoints exposed by the [API](https://cmrh-core-service-prod.onrender.com/api). 

## Prerequisites
--------------·

* Node.js
* npm

## Installation
------------

To install the dependencies, run the following command:

```bash
npm install
```

## Usage
-----

To run the tests, use the following command:

```bash
npm test
```

## Environment Variables
The tests use the following environment variables:

* **BASE_URL**: The base URL of the application
* **APIKEY**: The API key for authentication
* **TEST_AUTH_PASSWORD**: The password for testing authentication

## License
-------

This project is licensed under the ISC License.