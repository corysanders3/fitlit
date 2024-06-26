import { updatePage } from "./domUpdates";

function fetchUserData(usersData) {
  return fetch("https://fitlit-api-ochre.vercel.app/api/v1/users")
    .then((response) => response.json())
    .then((data) => (usersData = data));
}
function fetchHydrationData(hydration) {
  return fetch("https://fitlit-api-ochre.vercel.app/api/v1/hydration")
    .then((repsonse) => repsonse.json())
    .then((data) => (hydration = data));
}

function fetchSleepData(sleep) {
  return fetch("https://fitlit-api-ochre.vercel.app/api/v1/sleep")
    .then((repsonse) => repsonse.json())
    .then((data) => (sleep = data));
}

function postHydrationData(date, numOunces, userID) {
  fetch("https://fitlit-api-ochre.vercel.app/api/v1/hydration", {
    method: 'POST',
    body: JSON.stringify({
      date,
      numOunces,
      userID
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if(!response.ok) {
      throw new Error("There was an issue adding your hydration details. Please try again later.")
    }
    return response.json();
  })
  .then(data => updatePage())
  .catch(error => popUpError.innerText = error.message)
}

export { fetchHydrationData, fetchUserData, fetchSleepData, postHydrationData };
