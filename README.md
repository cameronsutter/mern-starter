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

**Note : when you load the page, an un-styled page flashes for a second due to the boilerplate.**

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors

## Results

The account and albums are hardcoded. I tried tackling the hardest problem first: the file uploading. I knew the account editing and adding albums would be easier. The file upload works.

## Retrospec/Improvements

1. I started with a boilerplate project that included MongoDB (because I wanted to impress you with the fact that I learned MongoDB in a weekend). The boilerplate came with a lot of useless features that I didn't need for a small project. If I had been building it for production, I would have taken this approach, but for a small code challenge with very limited time, it wasn't the best approach
1. I severely underestimated some of the challenges and spent too much time at first reading about the tools and boilerplate project and not enough time figuring out how to build with them
1. I haven't used server-side rendering before so I think i made some of that wonky
1. I was hoping to also have working tests ... but time
1. Using docker sounded like a good idea at first, but it turned out to make my cycle time between tries like almost 3-5 minutes ... ouch. I could have looked into why the webpack watcher wasn't working, but instead of going down that rabbit hole like i would have for a production app, I opted to focus on functionality. In retrospect, that may have been a bad choice.
1. There's no security/authentication ... there's no way that would fly in production
1. error handling is very minimal ... that would be improved for production
