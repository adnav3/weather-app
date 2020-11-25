function forecast(response) {
  console.log(response);
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

function cityName(city) {
  if (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(currentWeather);
    document.querySelector("#search-form").reset();
  } else {
    alert("Please enter a city name 🌞");
  }
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
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

//Default location on page load
cityName("lisbon");
