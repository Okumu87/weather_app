"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // get the content you wish to manipulate
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "0991bde3d456380d590c855a419d3e40";

  //   Get weatherBtn on click get info

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return; //if there is no city input stop

    // it may throw an error
    //server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  // functions

  // gets the data

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    // console.log(typeof response);
    // console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City Not Found ");
    }
    const data = await response.json();
    return data;
  }

  // display

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;

    //show the display

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    //display
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
  }

  // shows error

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
