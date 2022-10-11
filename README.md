# Disney API

This is an API that allows you to explore the world of Disney by querying, creating, editing and deleting series and characters.

### The project is currently deployed at [https://alkemydisneyapi.fly.dev](https://alkemydisneyapi.fly.dev)

It is **strongly recommended** to read the endpoint documentation published at [https://documenter.getpostman.com/view/12772916/2s83zjqNC5](https://documenter.getpostman.com/view/12772916/2s83zjqNC5)

## Running the App Locally

It is needed to create an _.env_ file on the project root directory, based in the provided _.env.example_

- **PORT**: port where the node will listen for requests.
- **JWT_SECRET**: secret used to create authentication tokens.
- **SB_API_KEY**: is required a [sendinblue](https://www.sendinblue.com/) api key in order to allow the app to send emails.
- **SB_EMAIL**: email address used to send the emails.

There are **two different ways** to run the app locally, with Docker or installing nodejs and providing your own postgre databases.

## Using Docker

Running the app:

    $ docker compose build --no-cache
    $ docker compose up

Running the test cases:

    $ docker compose build --build-arg script=test --no-cache
    $ docker compose up

## Using Node and Postgres

Fill the _development.json_ and _test.json_ files located in the _config/_ directory, accordingly with your own databases information.

Running the app:

    $ npm start

Running the test cases:

    $ npm run test
