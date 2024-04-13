import { useEffect, useState } from 'react';
import '../WeatherData/WeatherData.scss';
import { WiHumidity } from "react-icons/wi";
import { FaDroplet } from "react-icons/fa6";
import { TbUvIndex } from "react-icons/tb";
import { FaWind } from "react-icons/fa";


const WeatherData=({currentWeather, lat, lon})=>{

    const week=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayInWeek=new Date().getDay();
    const[time, setTime]=useState(0)
    

    useEffect(()=>{
        fetch(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=kumekumovski2878991`)
          .then(response => response.json())
          .then(result => {
            setTime(Number(result.time.slice(11,13)))
        })
          .catch(error => console.log('error', error));
       },[])
    
    
    const weatherCodes={
        0: "Unknown",
        1000: "Clear, Sunny",
        1100: "Mostly Clear",
        1101: "Partly Cloudy",
        1102: "Mostly Cloudy",
        1001: "Cloudy",
        2000: "Fog",
        2100: "Light Fog",
        4000: "Drizzle",
        4001: "Rain",
        4200: "Light Rain",
        4201: "Heavy Rain",
        5000: "Snow",
        5001: "Flurries",
        5100: "Light Snow",
        5101: "Heavy Snow",
        6000: "Freezing Drizzle",
        6001: "Freezing Rain",
        6200: "Light Freezing Rain",
        6201: "Heavy Freezing Rain",
        7000: "Ice Pellets",
        7101: "Heavy Ice Pellets",
        7102: "Light Ice Pellets",
        8000: "Thunderstorm"
      }

    return (
        <div className='current-weather-data'>
        <div className='temperature'>
        <h3>{week[dayInWeek-1]}</h3>
        <div className='temperature-icon'>
                {
                    time >= 20 && time <= 6 ?
                    <img src={`weather_icons/night_icons/${currentWeather.weatherCode}.png`} 
                    alt="weather-icons" /> 
                    :
                    <img src={`weather_icons/${currentWeather.weatherCode}.png`} 
                    alt="weather-icons" /> 

                }
            </div>
            <div className='temperature-degrees'>
              Temperature  {Math.round(currentWeather.temperature)} °C
            </div> 
            <div className='temperature-description'>
            {weatherCodes[currentWeather.weatherCode]}
            </div>
            
            </div>
            
            <div className='additional-data'>
                <div>
                    <p>Humidity</p>
                    <WiHumidity style={{height:50, width:50}}/>
                    <p>{currentWeather.humidity}%</p>
                </div>

                <div>
                    <p>Precipitation</p>
                    <FaDroplet style={{height:50, width:50}} />
                    <p>{currentWeather.precipitationProbability}%</p>
                </div>

                <div>
                    <p>UV Index</p>
                  <TbUvIndex style={{height:50, width:50}} />
                  <p>{currentWeather.uvIndex}</p>
                </div>

                <div className="wind-speed">
                    <p>Wind Speed</p>
                    <FaWind style={{height:50, width:50}} />
                   <p>{Math.round(currentWeather.windSpeed)} m/s</p>
                   
 
                </div>
            </div>
        </div>
    )
}

export default WeatherData;