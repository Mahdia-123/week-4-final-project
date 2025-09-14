let form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchInput = document.getElementById("search-input").value;

  let city = searchInput;
  let apiKey = "8tc45bb70811ad02c7716f84fe4ocbe3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
});
function displayWeather(response) {
  console.log(response.data);
  let cities = document.getElementById("cities");
  cities.innerHTML = response.data.city;

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
  let hour = now.getHours();
  let minute = now.getMinutes();

  let dateElement = document.getElementById("date");
  dateElement.innerHTML = `${day} ${hour}:${minute}, ${response.data.condition.description}`;

  let weatherElement = document.querySelector(".temperature-details");
  let iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;

  weatherElement.innerHTML = `
    <div id="icon">
      <img src="${iconUrl}" alt="${
    response.data.condition.description
  }" class="icon"/>
    </div>
    <div class="temperature mt-4">
      <span class="temp" id="temp">${Math.round(
        response.data.temperature.current
      )}</span>
      <span class="unit">℃</span>
    </div>
  `;

  let moreDetails = document.getElementById("more-details");
  moreDetails.innerHTML = `
    <span>Humidity: <strong>${
      response.data.temperature.humidity
    }%</strong></span>,
    <span>Wind: <strong>${Math.round(
      response.data.wind.speed
    )} km/h</strong></span>
  `;

  // ✅ Now actually call forecast
  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "8tc45bb70811ad02c7716f84fe4ocbe3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  // Example: show 5 days from API instead of hardcoded
  let forecastHtml = "";
  response.data.daily.slice(0, 5).forEach(function (day) {
    let date = new Date(day.time * 1000); // API returns UNIX timestamp
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayName = days[date.getDay()];

    let iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png`;

    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${dayName}</div>
        <div class="weather-forecast-icon">
          <img src="${iconUrl}" alt="${day.condition.description}" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature-max"><strong>${Math.round(
            day.temperature.maximum
          )}º</strong></div>
          <div class="weather-forecast-temperature-min">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
  });

  document.getElementById("forecast").innerHTML = forecastHtml;
}

let defaultCity = "Kabul";
let apiKey = "8tc45bb70811ad02c7716f84fe4ocbe3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
