import { useEffect, useState } from 'react';
function Weather() {
  const [search,setSearch] = useState("");
  const [city,setCity] = useState(null);

const getWeatherData = async()=>{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric`);
    let result = await response.json();
setCity(result)
    
}
useEffect(()=>{
  getWeatherData();
},[search])
  return (
    <div className="App">
     <div className="weather-card">
  <div className="search">
    <input type="search" placeholder="enter city name" spellCheck="false" onChange={(e)=>setSearch(e.target.value)} />
  </div>
  <div className="weather">
    <img className="weather-icon" src='weather1.webp' alt="..." />
    <h1 className="temp">{city?.main?.temp}°C </h1>
    <h2 className="city">{city?.name}</h2>
    <div className="details">
      <div style={{display: 'flex'}} className="col">
        <img className="humi" src="weather2.png" />
        <div className="info">
          <p className="humidity">{city?.main?.humidity}%</p>
          <p>Humidity test</p>
        </div>
      </div>
      <div className="col">
        <img src="weather3.png" />
        <div className="info">
          <p className="wind">{city?.wind?.speed} km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default Weather;