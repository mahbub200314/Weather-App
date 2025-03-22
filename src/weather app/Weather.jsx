import React, { useEffect, useRef, useState } from 'react'
import '../App.css'

import humidity from '../assets/humidity.png'
import search from '../assets/search.png'
import wind from '../assets/wind.png'

function Weather() {
   const inputRef = useRef() 
const [weatherData, setWeatherData]=useState(false)
const searchWeather = async (city)=>{
    try{
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const response = await fetch(url);
        const data = await response.json();
        
      if(response.ok){
        setWeatherData({
            humidity:data.main.humidity,
            windspeed  :data.wind.speed,
            temperature:Math.floor(data.main.temp),
            locatin:data.name ,
            icon:data.weather[0].icon
        })
      }else{

        window.alert("This location is not available ");
        setWeatherData(false)//...clear weather data here
      }
        inputRef.current.value='';
    }catch (error){
     console.log(error)
    }
}



useEffect(()=>{
    searchWeather('Feni')
},[])

  return (
    <div className='weather-app'>
      
        <div className="weather-condition">

            <div className="header">
                <h2>Let's see <br></br>your weather<br></br> condition...</h2>
               <div className='header-2nd'>
               <input ref={inputRef} type="text" name="search" id="" placeholder='Search' />
               <img onClick={()=>searchWeather(inputRef.current.value)}
                className='search' src={search} alt="seacrh-icon" />
               </div>
            </div>

            <div className="tempature">
                <img className='icon' src={` https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}  alt="" />
                <h2>{weatherData.temperature}°C</h2>
                <p>{weatherData.locatin}</p>
            </div>
        
         
         <div className="speed">
            <div>
                <img src={humidity} alt="" />
                <p>Humidity</p>
                <p>{weatherData.humidity}%</p>
            </div>

            <div>
                <img src={wind} alt="" />
                <p>Wind</p>
                <p>{weatherData.windspeed}km/h</p>
            </div>
         </div>{/* speed */}

             
        </div>{/* weather-condition */}
     
     

    </div> // weather-app
  )
}

export default Weather
