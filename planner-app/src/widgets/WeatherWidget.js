import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'd642489b275a95dffe81fcfd7030577d';
  const city = 'Lagos'; // Replace with the desired city

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return null;
  }

  const { main, description } = weatherData.weather[0];
  const { temp, feels_like, humidity } = weatherData.main;

  return (
    <div>
      <h3>Weather Widget</h3>
      <div>
        <strong>Main:</strong> {main}
      </div>
      <div>
        <strong>Description:</strong> {description}
      </div>
      <div>
        <strong>Temperature:</strong> {temp} °C
      </div>
      <div>
        <strong>Feels Like:</strong> {feels_like} °C
      </div>
      <div>
        <strong>Humidity:</strong> {humidity}%
      </div>
    </div>
  );
};

export default WeatherWidget;
