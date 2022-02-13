//TIME & DATE

function changeTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  if (minutes < 10) {
    let time = document.querySelector("#time-and-date");
    time.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    let time = document.querySelector("#time-and-date");
    time.innerHTML = `${day} ${hours}:${minutes}`;
  }
}

//GEOLOCATION

function showCurrentTemp(response) {
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

function locateCurrentTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "302b354b2bd58d43a3079df7d4047669";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiCall).then(showCurrentTemp);
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(locateCurrentTemp);
}

//FORECAST

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function weatherPrediction(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
              <div class="forecast-day">  ${formatDay(forecastDay.dt)}
      <img src="http://openweathermap.org/img/wn/${
        response.data.daily[0].weather[0].icon
      }@2x.png" alt="weather-forecast" width="60px">
      </br>
          <span class="weather-prediction-temp-max"><strong>${Math.round(
            response.data.daily[0].temp.max
          )}° &nbsp</strong> </span>
          <span class="weather-prediction-temp-min"> ${Math.round(
            response.data.daily[0].temp.min
          )}° </span>
  </div>
  </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//API

function getForecast(coordinates) {
  apiKey = "302b354b2bd58d43a3079df7d4047669";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherPrediction);
}

function giveWeather(response) {
  centigradeTemp = response.data.main.temp;
  feelsLikeTemp = response.data.main.feels_like;
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
  let icon = document.querySelector("#main-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
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

// C to F

function changeTempToF(event) {
  event.preventDefault();
  let tempOne = document.querySelector("#mainTemp");
  let removeC = document.querySelector("#mainC");

  tempOne.innerHTML = Math.round((centigradeTemp * 9) / 5) + 32;
  removeC.innerHTML = "℉";
}

function changeFeelsLikeTempToF(event) {
  event.preventDefault();
  let feelsLike = document.querySelector("#feelsLike");
  let removeC = document.querySelector("#feelsLikeC");

  feelsLike.innerHTML = Math.round((feelsLikeTemp * 9) / 5) + 32;
  removeC.innerHTML = "℉";
}

function changeTempToC(event) {
  event.preventDefault();
  let tempTwo = document.querySelector("#mainTemp");
  let removeF = document.querySelector("#mainC");

  tempTwo.innerHTML = Math.round(centigradeTemp);
  removeF.innerHTML = "℃";
}

function changeFeelsLikeTempToC(event) {
  event.preventDefault();
  let feelsLike = document.querySelector("#feelsLike");
  let removeF = document.querySelector("#feelsLikeC");

  feelsLike.innerHTML = Math.round(feelsLikeTemp);
  removeF.innerHTML = "℃";
}

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

let searchCurrent = document.querySelector("#current");
searchCurrent.addEventListener("click", searchCurrentLocation);

let centigradeTemp = null;
let feelsLikeTemp = null;

search("London");
changeTime();
weatherPrediction();
