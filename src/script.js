function fahrenheitToCelsius() {
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

    for (let index = 0; index < 5; index++) {
      let minTemp = document.querySelector(`#fmint${index}`);
      let minTempValue = minTemp.innerHTML;
      let cMinTemp = Math.round(((minTempValue - 32) * 5) / 9);
      minTemp.innerHTML = `${cMinTemp}`;

      let maxTemp = document.querySelector(`#fmaxt${index}`);
      let maxTempValue = maxTemp.innerHTML;
      let cMaxTemp = Math.round(((maxTempValue - 32) * 5) / 9);
      maxTemp.innerHTML = `${cMaxTemp}`;
    }

    celsiusButton.classList.remove("inactive");
    celsiusButton.classList.add("active");
    fahrenheitButton.classList.remove("active");
    fahrenheitButton.classList.add("inactive");
  }
}

function celsiusToFahrenheit() {
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

    for (let index = 0; index < 5; index++) {
      let minTemp = document.querySelector(`#fmint${index}`);
      let minTempValue = minTemp.innerHTML;
      let fMinTemp = Math.round((minTempValue * 9) / 5 + 32);
      minTemp.innerHTML = `${fMinTemp}`;

      let maxTemp = document.querySelector(`#fmaxt${index}`);
      let maxTempValue = maxTemp.innerHTML;
      let fMaxTemp = Math.round((maxTempValue * 9) / 5 + 32);
      maxTemp.innerHTML = `${fMaxTemp}`;
    }

    fahrenheitButton.classList.remove("inactive");
    fahrenheitButton.classList.add("active");
    celsiusButton.classList.remove("active");
    celsiusButton.classList.add("inactive");
  }
}

function forecast(response) {
  for (let index = 0; index < 5; index++) {
    let dateTime = response.data.daily[[index]].dt;
    let timezone = response.data.timezone_offset;
    let localDate = new Date((dateTime + timezone) * 1000);

    let weekday = document.querySelector(`#wd${index}`);
    weekday.innerHTML = getWeekday(localDate).slice(0, 3);

    let minTemp = response.data.daily[[index]].temp.min;
    let maxTemp = response.data.daily[[index]].temp.max;

    let minTemperature = document.querySelector(`#fmint${index}`);
    minTemperature.innerHTML = `${Math.round(`${minTemp}`)}`;
    let maxTemperature = document.querySelector(`#fmaxt${index}`);
    maxTemperature.innerHTML = `${Math.round(`${maxTemp}`)}`;

    let weatherIcon = document.querySelector(`#fs${index}`);
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${
        response.data.daily[[index]].weather[0].icon
      }@2x.png`
    );
    weatherIcon.setAttribute(
      "alt",
      `${response.data.daily[[index]].weather[0].description}`
    );
  }
}

function getTime(time) {
  let hours = time.getUTCHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}h${minutes}`;
}

function getWeekday(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = `${weekDays[date.getUTCDay()]}`;
  return day;
}

function currentWeather(response) {
  let location = document.querySelector("#search-result");
  location.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let dateTime = response.data.dt;
  let timezone = response.data.timezone;
  let localDate = new Date((dateTime + timezone) * 1000);

  let todaywd = document.querySelector("#current-wd");
  todaywd.innerHTML = getWeekday(localDate);

  let currentTime = document.querySelector("#current-tm");
  currentTime.innerHTML = getTime(localDate);

  let temperature = document.querySelector("#temp-now");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  document.querySelector("#cf").innerHTML = `ºC`;
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  fahrenheitButton.classList.add("inactive");

  let weatherIcon = document.querySelector("#wthr-now-symbol");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  let weatherDescription = document.querySelector("#current-weather");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}`;

  let precipitation = document.querySelector("#precipitation");
  if (response.data.rain === undefined) {
    precipitation.innerHTML = 0;
  } else {
    precipitation.innerHTML = `${response.data.rain["1h"]}`;
  }

  let lat = response.data.coord.lat;
  let long = response.data.coord.lon;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
    )
    .then(forecast);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

function cityName(city) {
  if (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(currentWeather);
    document.querySelector("#search-form").reset();
  } else {
    alert("Please enter a city name 🌞");
  }
}

function searchResult(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  cityName(city);
}

//Global Variables
let apiKey = "adc7ca37eff3fa0b73ae6b54ab48c90d";

//Button Listeners
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchResult);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getLocation);
});

let celsiusButton = document.querySelector("#temp-celsius-btn");
celsiusButton.addEventListener("click", fahrenheitToCelsius);

let fahrenheitButton = document.querySelector("#temp-fahrenheit-btn");
fahrenheitButton.addEventListener("click", celsiusToFahrenheit);

//Default location on page load
cityName("lisbon");
