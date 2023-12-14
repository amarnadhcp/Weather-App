import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const trimmedLocation = location.trim();

      if (trimmedLocation === "") {
        toast.error("Please Enter A Location");
        return;
      }
      const params = {
        lat: data.coord ? data.coord.lat : "", 
        lon: data.coord ? data.coord.lon : "", 
        q: location,
        appid: apiKey,
        units: "metric"
      };

      axios.get(apiUrl, { params }).then((response) => {
        setData(response.data);
      }).catch((error) => {
        toast.error("Location Not Found");
        setLocation("");
      });
    }
  };

  
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home