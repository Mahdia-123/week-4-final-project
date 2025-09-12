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

  // City name
  let cities = document.getElementById("cities");
  cities.innerHTML = response.data.city;

  // Local time using Moment.js and timezone from API
  let timeZone = response.data.timezone; // SheCodes API provides timezone, e.g., "Asia/Kabul"
  let localTime = moment().tz(timeZone).format("dddd HH:mm");
  let dateElement = document.getElementById("date");
  dateElement.innerHTML = `${localTime}, ${response.data.condition.description}`;

  // Weather icon and temperature
  let weatherElement = document.querySelector(".temperature-details");
  let iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;

  weatherElement.innerHTML = `<div id="icon">
    <img src="${iconUrl}" alt="${
    response.data.condition.description
  }" class="icon"/>
  </div>
  <div class="temperature mt-4">
    <span class="temp" id="temp">${Math.round(
      response.data.temperature.current
    )}</span>
    <span class="unit">℃</span>
  </div>`;

  // More details
  let moreDetails = document.getElementById("more-details");
  moreDetails.innerHTML = `
    <span>Humidity: <strong>${
      response.data.temperature.humidity
    }%</strong></span>,
    <span>Wind: <strong>${Math.round(
      response.data.wind.speed
    )} km/h</strong></span>`;
}

// Default city
let defaultCity = "Kabul";
let apiKey = "8tc45bb70811ad02c7716f84fe4ocbe3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
