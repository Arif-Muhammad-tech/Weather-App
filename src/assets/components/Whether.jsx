import React, { useState } from "react";
import "./Whether.css";

import sunnyBg from "../images/sunny.gif";
import rainBg from "../images/rainy.gif";
import cloudyBg from "../images/fog.gif";
import mistBg from "../images/fog.gif";
import snowBg from "../images/snow.gif";

function Whether() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);

  const handleClick = () => {
    if (city.trim() === "") return alert("Please enter a city name!");

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=96e7f89de3904dd28c372229250211&q=${city}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current.condition.text);
        setLocation(data.location.name);
        setTemp(data.current.temp_c);
        setWind(data.current.wind_kph);
      })
      .catch(() => alert("City not found!"));
  };

  const getBackground = () => {
    if (!weather) return sunnyBg;
    const lower = weather.toLowerCase();
    if (lower.includes("sunny") || lower.includes("clear")) return sunnyBg;
    if (lower.includes("rain")) return rainBg;
    if (lower.includes("cloud")) return cloudyBg;
    if (lower.includes("mist") || lower.includes("fog")) return mistBg;
    if (lower.includes("snow")) return snowBg;
    return sunnyBg;
  };

  return (
    <div
      className="weather-container"
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="weather-card">
        <h2 className="app-title">☀️ Weather App</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleClick}>Search</button>
        </div>

        {location && (
          <div className="weather-info">
            <h3 className="city">{location}</h3>
            <p className="condition">{weather}</p>
            <h1 className="temperature">{temp}°C</h1>
            <p className="wind">💨 Wind: {wind} kph</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Whether;
