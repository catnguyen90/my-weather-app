// Feature #1
let now = new Date();

let day = now.getDay();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
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

let currentDay = days[now.getDay()];
let dateTime = document.querySelector("li#date-time");
dateTime.innerHTML = `${currentDay} ${hours}:${minutes}`;

//Feature #2
function searchPlace(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  let cityInput = document.querySelector(".form-control");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", searchPlace);

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city-input");
  let description = document.querySelector("#temp-description");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature"); //id from h2
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°F`;
  description.innerHTML = response.data.weather[0].description; //id from h2
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "841f4173fd81916cf9b0019ffbaf6e87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "841f4173fd81916cf9b0019ffbaf6e87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
