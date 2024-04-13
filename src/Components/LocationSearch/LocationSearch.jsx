import { useState, useEffect } from "react";
import "../LocationSearch/LocationSearch.scss";
import WeatherData from "../WeatherData/WeatherData";
import Forecast from "../Forecast/Forecast";
import ErrorPage from "../ErrorPage/ErrorPage";
import { Oval } from "react-loader-spinner";

const LocationSearch = () => {
  const [location, setLocation] = useState("");
  const [currentTime, setTime] = useState(new Date());
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  function handleInput(event) {
    setLocation(event.target.value);
  }

  function handleKey(event) {
    if (event.key === "Enter") {
      setLoading(true);
      fetchCurrentWeather();
      fetchForecast();
    }
  }

  function fetchCurrentWeather() {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    fetch(
      `https://api.tomorrow.io/v4/weather/realtime?location=${location}&units=metric&apikey=2o2J5nawWSOhb7vqyL8FyN7wa0V2qbz7`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCurrentWeather(response.data.values);
        setLat(response.location.lat);
        setLon(response.location.lon);
        setLoading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.message);
        }
      });
  }

  function fetchForecast() {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=2o2J5nawWSOhb7vqyL8FyN7wa0V2qbz7`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setForecast(response.timelines.daily);
      });
  }

  if (error) return <ErrorPage />;
  return (
    <>
      <div className="location">
        <div className="location-search">
          <input
            autoFocus
            type="text"
            onChange={handleInput}
            onKeyDown={handleKey}
          />
          <div className="clock">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      <div className="info-container">
        {Object.keys(currentWeather).length === 0 && forecast.length === 0 ? (
          <h1>Search City</h1>
        ) : (
          <div className="weather-data">
            {loading ? (
              <div className="spinner">
                <Oval
                  height="80"
                  width="80"
                  color="#222222"
                  visible={loading}
                />
              </div>
            ) : (
              <WeatherData
                currentWeather={currentWeather}
                lat={lat}
                lon={lon}
              />
            )}

            {loading ? (
              <div className="spinner">
                <Oval
                  height="80"
                  width="80"
                  color="#222222"
                  visible={loading}
                />
              </div>
            ) : (
              <Forecast forecast={forecast} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LocationSearch;
