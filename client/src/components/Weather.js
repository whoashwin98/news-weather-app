import React, { useState } from 'react'
import Spinner from './Spinner';
import WeatherItem from './WeatherItem';
import _ from 'lodash'

export default function Weather(props) {
  // a local state for the weeather details
  const [weatherDetails, setWeatherDetails] = useState({});
  // a local state to maintain the city input
  const [city, setCity] = useState("");
  // state for showing and hiding the spinner
  const [loading, setLoading] = useState(false);
  // set the title according to the category being fetched
  document.title = `NewsApp | Weather Forecast`

  // handle the change in the city input
  function handleChange(event) {
    setCity(event.target.value);
  }

  // a function that helps display the country name, given the country code
  const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );

  // utility function add an extra zero if the hours or minutes is single digit
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  // a function that returns the local time in hours and minutes if milliseconds given
  function getLocalTime(milliseconds) {
    // convert ms to s, s to mins, mins to hours
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    
    // if seconds crosses the 60 mark
    seconds = seconds % 60;
    // if minutes crosses the 60 mark
    minutes = minutes % 60;
    // if hours crosses the 24 mark
    hours = hours % 24;
    
    // returning a date string in the format hh:mm
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }

  // a function to get the coordinates along with the symbols given the numeric coordinates
  function getCoordinates(lat,lon) {
    let latString = lat < 0 ? `${Math.abs(lat).toString()} °S` : `${Math.abs(lat).toString()} °N`;
    let lonString = lon < 0 ? `${Math.abs(lon).toString()} °W` : `${Math.abs(lon).toString()} °E`;
    return `${latString}, ${lonString}`;
  }


  // a function to handle the search button click
  const handleSearch = async () => {
    // we would want the previous city details to be erased first
    setWeatherDetails({});
    // set the loading bar
    props.setProgress(15);
    // this is the url of the API from where we will be fetching data based on the city name
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${props.apiKey}`;
    // set loading to true in order to show the spinner
    setLoading(true);
    // fetch the data
    let data = await fetch(url);
    if(data.status === 404) {
      console.clear();
      // we cannot display anything so we set the weather details as blank
      setWeatherDetails({});
      // set the input to blank
      setCity("");
      // disable the spinner once the data is obtained and the state is set
      setLoading(false);
      // complete the loading bar
      props.setProgress(100);
    } else {
      props.setProgress(45);
      // parse the obtained data into JSON
      let parsedData = await data.json();
      // set the weatherDetails state as the currently fetched data
      setWeatherDetails(parsedData);
      // set the input to blank
      setCity("");
      // disable the spinner once the data is obtained and the state is set
      setLoading(false);
      // complete the loading bar
      props.setProgress(100);
    }
  }

  return (
    <>
      <div className='container text-center' style={{ "marginTop": "100px" }}>
        <h2>Today's Weather Forecast</h2>
        <form className="d-flex" role="search" style={{ "marginTop": "50px" }} onSubmit={(event) => {
          handleSearch();
          event.preventDefault();
        }}>
          <input className="form-control me-2" type="search" placeholder="Enter a city..." aria-label="Search" style={{ padding: "10px" }} onChange={handleChange} value={city} />
          <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
      {/* displaying the spinner only when loading state is true */}
      { loading && <Spinner /> }
      {/* if the weatherDetails doesn't have anything we do not display anything (used lodash to check if object is empty or not) */}
      {(!_.isEmpty(weatherDetails)) ? 
        <WeatherItem city={weatherDetails.name} country={regionNames.of(weatherDetails.sys.country)} coordinates={getCoordinates(weatherDetails.coord.lat,weatherDetails.coord.lon)} weatherIcon={`https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`} temperature={Math.round(weatherDetails.main.temp - 273.15)} maxTemp={Math.round(weatherDetails.main.temp_max - 273.15)} minTemp={Math.round(weatherDetails.main.temp_min - 273.15)} feelsLikeTemp={Math.round(weatherDetails.main.feels_like - 273.15)} humidity={weatherDetails.main.humidity} sunrise={getLocalTime(new Date((weatherDetails.sys.sunrise + weatherDetails.timezone) * 1000))}  sunset={getLocalTime(new Date((weatherDetails.sys.sunset + weatherDetails.timezone) * 1000))}/>
      : <div className='container text-center my-3 text-muted'>No Results To Display</div>}
    </>
  )
}
