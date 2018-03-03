## Quickstart

(For development, from the redY directory)

### Docker:
```
docker-compose -f docker-compose-development.yml build
docker-compose -f docker-compose-development.yml up
```
and then go to your docker ip address url @ port 8000
or 
`redy.docker`

### Non-docker:
```
  npm install
  npm start
```
and then go to http://localhost:8000

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm3` is required to install dependencies properly.

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors
