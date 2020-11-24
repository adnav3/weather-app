function currentWeather(response) {
  console.log(response);
}

function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  if (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(currentWeather);
  } else {
    alert("Please enter a city name 🌞");
  }
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", cityName);

let apiKey = "adc7ca37eff3fa0b73ae6b54ab48c90d";
