// Showing the date and time
let now = new Date();
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
let hours = now.getHours();
let minutes = now.getMinutes();
let date = document.querySelector("#date");
date.innerHTML = ` ${day} ${hours}:${minutes}`;

//Display the name of the city on the result page

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");

  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type in a city");
  }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

//Display the current weather of the city

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temp}°C`;
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#temperature-description");
  currentDescription.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed} mph`;
}

function search(event) {
  event.preventDefault();
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let units = "metric";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Get the current position
function showPosition(position) {
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-position");
button.addEventListener("click", getCurrentPosition);
