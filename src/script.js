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

let switchToF = document.querySelector("#temp");
switchToF.addEventListener("click", changeTempToF);

let switchFeelsLikeToF = document.querySelector("#temp");
switchFeelsLikeToF.addEventListener("click", changeFeelsLikeTempToF);

let switchFeelsLikeToC = document.querySelector("#tempC");
switchFeelsLikeToC.addEventListener("click", changeFeelsLikeTempToC);

let switchToC = document.querySelector("#tempC");
switchToC.addEventListener("click", changeTempToC);
