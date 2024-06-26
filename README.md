# FitLit 

A site for tracking various data of users including user information, friends, step goals, sleep information, and hydration information.

## Background/About

Having a clear and concise overview of activity and tracking it over time is crucial for any fitness/activity related application. Using data fetched from an API, this application simulates viewing activities of random users over a 7 day period.

## APIs Used

- [FitLit API](https://github.com/corysanders3/fitlit-api)

## Primary Technologies Used

<div align="center">
    <img src="https://img.shields.io/badge/JavaScript-E8D44D?style=for-the-badge&logo=javascript&logoColor=fff" alt="javascript badge">
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=for-the-badge" alt="html badge">
    <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=for-the-badge" alt="css badge">
    <img src="https://img.shields.io/badge/Webpack-8ACEF1?style=for-the-badge&logo=webpack&logoColor=fff" alt="webpack badge">
    <img src="https://img.shields.io/badge/Mocha-886446?style=for-the-badge&logo=mocha&logoColor=fff" alt="webpack badge">
    <img src="https://img.shields.io/badge/Chai-980B05?style=for-the-badge&logo=chai&logoColor=fff" alt="webpack badge">
</div>

[Fluid Meter Library](https://github.com/aarcoraci/fluid-meter)

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
5. Navigate to the address provided within the terminal ex: http://localhost:8080/

## Test Driven Development

This application uses a combination of Mocha Testing Framework and Chai Assertion Library
- Run `npm test` from the associated root directory

## Contributors

- [Cory Sanders](https://github.com/corysanders3)
- [Ethan Duvall](https://github.com/Eduvall23)
- [David Kwon](https://github.com/dkwon1223)

## Deployed Page

[FitLit](https://activity-tracker-ten-inky.vercel.app/)
