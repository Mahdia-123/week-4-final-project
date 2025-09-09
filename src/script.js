let form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchInput = document.getElementById("search-input");
  console.log(searchInput.value);
  let cities = document.getElementById("cities");
  cities.innerHTML = searchInput.value;
});
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
dateElement.innerHTML = `${day} ${hour}:${minute}, moderate rain`;
