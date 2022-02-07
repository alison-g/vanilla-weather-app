//API

function giveWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "302b354b2bd58d43a3079df7d4047669";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(giveWeather);
}

function searchWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-town").value;
  search(city);
}

//GEOLOCATION

function showCurrentTemp(response) {
  console.log(response.data.name);
  console.log(Math.round(response.data.main.temp));
}

function locateCurrentTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "302b354b2bd58d43a3079df7d4047669";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=
${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiCall).then(showCurrentTemp);
}

navigator.geolocation.getCurrentPosition(locateCurrentTemp);

// C to F

function changeTempToF(event) {
  event.preventDefault();
  let tempOne = document.querySelector("#mainTemp");
  let removeC = document.querySelector("#mainC");
  let temp = tempOne.innerHTML;

  tempOne.innerHTML = Math.round((temp * 9) / 5) + 32;
  removeC.innerHTML = "℉";
}

function changeFeelsLikeTempToF(event) {
  event.preventDefault();
  let feelsLike = document.querySelector("#feelsLike");
  let removeC = document.querySelector("#feelsLikeC");
  let temp = feelsLike.innerHTML;

  feelsLike.innerHTML = Math.round((temp * 9) / 5) + 32;
  removeC.innerHTML = "℉";
}

function changeTempToC(event) {
  event.preventDefault();
  let tempTwo = document.querySelector("#mainTemp");
  let removeF = document.querySelector("#mainC");
  let temp = tempTwo.innerHTML;

  tempTwo.innerHTML = Math.round(((temp -= 32) * 5) / 9);
  removeF.innerHTML = "℃";
}

function changeFeelsLikeTempToC(event) {
  event.preventDefault();
  let feelsLike = document.querySelector("#feelsLike");
  let removeF = document.querySelector("#feelsLikeC");
  let temp = feelsLike.innerHTML;

  feelsLike.innerHTML = Math.round(((temp -= 32) * 5) / 9);
  removeF.innerHTML = "℃";
}

//TIME & DATE

function changeTime() {
  if (minutes < 10) {
    let time = document.querySelector("#time-and-date");
    time.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    let time = document.querySelector("#time-and-date");
    time.innerHTML = `${day} ${hours}:${minutes}`;
  }
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let day = days[now.getDay()];

let switchToF = document.querySelector("#temp");
switchToF.addEventListener("click", changeTempToF);

let switchFeelsLikeToF = document.querySelector("#temp");
switchFeelsLikeToF.addEventListener("click", changeFeelsLikeTempToF);

let switchFeelsLikeToC = document.querySelector("#tempC");
switchFeelsLikeToC.addEventListener("click", changeFeelsLikeTempToC);

let switchToC = document.querySelector("#tempC");
switchToC.addEventListener("click", changeTempToC);

let searchButton = document.querySelector("#search-town-form");
searchButton.addEventListener("submit", searchWeather);

changeTime();

search("London");
