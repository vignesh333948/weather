import { useEffect, useState } from "react";

function Weather() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!search) return; // Prevent API call if search is empty

      try {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        let result = await response.json();
        setCity(result);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.message);
        setCity(null);
      }
    };

    getWeatherData();
  }, [search]); // Runs when `search` changes

  return (
    <div className="App">
      <div className="weather-card">
        <div className="search">
          <input
            type="search"
            placeholder="Enter city name"
            spellCheck="false"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {error ? (
          <h3 className="error-message">{error}</h3>
        ) : (
          city && (
            <div className="weather">
              <img
                className="weather-icon"
                src="weather1.webp"
                alt="Weather Icon"
              />
              <h2 className="temp">{city?.main?.temp}°C</h2>
              <h3 className="city">{city?.name}</h3>
              <div className="details">
                <div style={{ display: "flex" }} className="col">
                  <img
                    className="humi"
                    src="weather2.png"
                    alt="Humidity Icon"
                  />
                  <div className="info">
                    <p className="humidity">{city?.main?.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="col">
                  <img src="weather3.png" alt="Wind Speed Icon" />
                  <div className="info">
                    <p className="wind">{city?.wind?.speed} km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Weather;
