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
    "Tuseday",
    "Wednseday",
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
  </div>
  

`;
  let moreDetails = document.getElementById("more-details");
  moreDetails.innerHTML = `  <span>Humidity: <strong>${
    response.data.temperature.humidity
  }%</strong></span
                >,
                <span>wind: <strong>${Math.round(
                  response.data.wind.speed
                )} km/h</strong></span>`;
}
let defaultCity = "Kabul";
let apiKey = "8tc45bb70811ad02c7716f84fe4ocbe3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
