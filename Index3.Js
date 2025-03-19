const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value;
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found");
      return;
    }

    displayWeather(data);
  } catch (error) {
    alert("Error fetching weather data. Please try again.");
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");

  // Clear previous data
  weatherInfo.innerHTML = "";

  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  weatherInfo.innerHTML = `
    <h2>${cityName}</h2>
    <img src="${icon}" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${weatherDescription}</p>
  `;
}
