//Functions:

//Search Engine
function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  if (city.value) {
    let citySearch = city.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;

    axios.get(url).then(CityStats);
  } else {
    alert("Please enter a city name");
  }
}

//Get Weather Details Features
function currentCityName(response) {
  let cityName = response.data.name;

  let currentCity = document.querySelector("#search-result");
  currentCity.innerHTML = `${cityName}`;
}

function currentCityTemp(response) {
  let cityTemperature = Math.round(response.data.main.temp);

  let temperature = document.querySelector("#temp-now");
  temperature.innerHTML = `${cityTemperature}`;
}

function currentCityWeather(response) {
  let cityWeatherDescription = response.data.weather[0].description;
  let cityWeatherShort = response.data.weather[0].main;

  let weatherDescription = document.querySelector("#current-weather");
  weatherDescription.innerHTML = `${cityWeatherDescription}`;
}

function currentCityHumidity(response) {
  let cityHumidity = response.data.main.humidity;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${cityHumidity}`;
}

function currentCityWind(response) {
  let cityWind = response.data.wind.speed;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${cityWind}`;
}

function CityStats(response) {
  currentCityName(response);
  currentCityTemp(response);
  currentCityWeather(response);
  currentCityHumidity(response);
  currentCityWind(response);
}

// Geolocation Features
function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(url).then(CityStats);
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

// Celsius and Fahrenheit conversion buttons
function celsiusFahrenheit() {
  let tempValue = document.querySelector("#temp-now").innerHTML;
  let unit = document.querySelector("#cf").innerHTML;

  if (unit === "ºF") {
    alert("The temperature is already in Fahrenheit");
  } else {
    let temp = document.querySelector("#temp-now");
    let fTemp = Math.round((tempValue * 9) / 5 + 32);
    temp.innerHTML = `${fTemp}`;
    let unitName = document.querySelector("#cf");
    unitName.innerHTML = `ºF`;
  }
}

function fahrenheitCelsius() {
  let tempValue = document.querySelector("#temp-now").innerHTML;
  let unit = document.querySelector("#cf").innerHTML;

  if (unit === "ºC") {
    alert("The temperature is already in Celsius");
  } else {
    let temp = document.querySelector("#temp-now");
    let cTemp = Math.round(((tempValue - 32) * 5) / 9);
    temp.innerHTML = `${cTemp}`;
    let unitName = document.querySelector("#cf");
    unitName.innerHTML = `ºC`;
  }
}

//Variables:

// Date Feature
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDateTime = new Date();
let hours = currentDateTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDateTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let todaywd = document.querySelector("#current-wd");
todaywd.innerHTML = `${weekDays[currentDateTime.getDay()]}`;

let currentTime = document.querySelector("#current-tm");
currentTime.innerHTML = `${hours}:${minutes}`;

//Weather features
let apiKey = "085ad2cfec4f22f9ac3cf57871ea2e7e";

//Buttons Interactions
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", cityName);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getGeolocation);

let celsiusButton = document.querySelector("#temp-celsius-btn");
celsiusButton.addEventListener("click", fahrenheitCelsius);

let fahrenheitButton = document.querySelector("#temp-fahrenheit-btn");
fahrenheitButton.addEventListener("click", celsiusFahrenheit);

//On page load
getGeolocation();
