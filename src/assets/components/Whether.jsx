import React, { useState } from "react";
import "./Whether.css";

// Import background images
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

  // 🌤 Choose background and theme color
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
        transition: "background 0.5s ease",
      }}
    >
      <div className="weather-card">
        <h1>🌍 Weather App</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleClick}>Search</button>
        </div>

        {location && (
          <div className="details">
            <h2>{location}</h2>
            <p>{weather}</p>
            <p>🌡 {temp}°C</p>
            <p>💨 {wind} kph</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Whether;
