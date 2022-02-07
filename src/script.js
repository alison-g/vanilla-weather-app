// C to F

function changeTempToF(event) {
  event.preventDefault();
  let tempOne = document.querySelector("#mainTemp");
  let removeC = document.querySelector("#mainC");
  let temp = tempOne.innerHTML;

  tempOne.innerHTML = Math.round((temp * 9) / 5) + 32;
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

let switchToF = document.querySelector("#temp");
switchToF.addEventListener("click", changeTempToF);

let switchToC = document.querySelector("#tempC");
switchToC.addEventListener("click", changeTempToC);
