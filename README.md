# FitLit 

A site for tracking various data of users including user information, friends, step goals, sleep information, and hydration information.

## Background/About

Having a clear and concise overview of activity and tracking it over time is crucial for any fitness/activity related application. Using data fetched from an API, this application simulates viewing activities of random users over a 7 day period.

## APIs Used

- FitLit API

## Primary Technologies Used
- Webpack
- HTML
- CSS
- JavaScript
- Mocha Testing Framework & Chai Assertion Library
- [Fluid Meter Library](https://github.com/aarcoraci/fluid-meter)

## Next Steps
Additional enhancements could include:
- Animating the circle progress bars like the fluid meter
- Allowing the user to choose a date instead of defaulting to the most recent
- Add an activity tracking widget based on the unused data from [activity API](https://fitlit-api.herokuapp.com/api/v1/activity)

## Preview of App

![FitLit](https://github.com/corysanders3/fitlit/assets/41808895/be8f729b-8e11-471d-9d27-c3bb937d09f1)

## Set Up

1. Fork this repository
2. Clone your own local version of the repository
3. Run `npm install` to install project dependencies
4. Run `npm start` to start the server
5. You will also need to run the backend server. That repository can be found [here](https://github.com/corysanders3/fitlit-api).
6. Clone a local version of the repo in step 5.
7. CD into that directory and run `npm install` to install project dependencies
8. Run `npm start` to start that server
9. Navigate to the address provided within the terminal ex: http://localhost:8080/

## Test Driven Development

This application uses a combination of Mocha Testing Framework and Chai Assertion Library
- Run `npm test` from the associated root directory

## Contributors

- [Cory Sanders](https://github.com/corysanders3)
- [Ethan Duvall](https://github.com/Eduvall23)
- [David Kwon](https://github.com/dkwon1223)
