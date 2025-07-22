import "./styles.css";
import React, { useState, useEffect } from "react";

export default function Temp({ temperatureType }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  // Styling example
  const myStyle = {
    color: temperatureType ? "white" : "blue",
    padding: "0px",
  };

  // Get geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );
    } else {
      setError({ message: "Geolocation is not supported." });
      setLoading(false);
    }
  }, []);

  // Fetch weather once location is available
  useEffect(() => {
    if (location) {
      const weatherEndpoint = `https://weather-proxy.freecodecamp.rocks/api/current?lon=${location.longitude}&lat=${location.latitude}`;
      fetchData(weatherEndpoint);
    }
  }, [location]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response not ok");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Convert temperature to Fahrenheit if required
  const convertTemp = (celsius) =>
    temperatureType ? Math.floor((celsius * 9) / 5 + 32) : celsius;

  if (loading) return <p>Loading Weather Data...</p>;
  if (error) return <p>Error while loading data: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="container-fluid">
      <br />
      <h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-geo-alt-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
        </svg>
        <span style={myStyle}>{"  " + data.name}</span>{" "}
        <span>
          {" "}
          <img src={data.weather[0].icon} alt="Weather Icon" />
        </span>
      </h2>

      <div>
        <strong>Current :</strong> {convertTemp(data.main.temp)}°
        {temperatureType ? "F" : "C"}
      </div>
      <div>
        <strong>Feels Like:</strong> {convertTemp(data.main.feels_like)}°
        {temperatureType ? "F" : "C"}
      </div>
      <div>
        <strong>Min:</strong> {convertTemp(data.main.temp_min)}°
        {temperatureType ? "F" : "C"}
      </div>
      <div>
        <strong>Max:</strong> {convertTemp(data.main.temp_max)}°
        {temperatureType ? "F" : "C"}
      </div>
      <div>
        <strong>Humidity:</strong> {data.main.humidity}%
      </div>
      <div>
        <strong>Pressure:</strong> {data.main.pressure} hPa
      </div>
    </div>
  );
  // // Toggle style (optional button)
  // const updateCount = () => {
  //   setColor((prev) => !prev);
  // };
}
