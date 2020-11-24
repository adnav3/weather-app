function currentWeather(response) {
  console.log(response);
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

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchResult);

let apiKey = "adc7ca37eff3fa0b73ae6b54ab48c90d";

cityName("lisbon");
