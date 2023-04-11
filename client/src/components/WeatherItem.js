import React from 'react'

export default function WeatherItem(props) {

    const { city, country, coordinates, weatherIcon, temperature, maxTemp, minTemp, feelsLikeTemp, humidity, sunrise, sunset} = props;

    return (
        <div className="container text-center" style={{"marginTop" : "50px"}}>
            <div className="card">
                <div className="card-body d-flex justify-content-evenly align-items-center">
                    <div>
                        <h2 className="card-title">{city}, {country}</h2>
                        <p className="card-text text-muted">{coordinates}</p>
                    </div>
                    <div className="d-flex mx-2 align-items-center">
                        <img src={weatherIcon} alt="Weather Icon" />
                        <div>
                            <h3 className='text-center'>{temperature} &#176;C</h3>
                            <p className="card-text text-muted">{maxTemp} &#176;C / {minTemp} &#176;C</p>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="d-flex justify-content-evenly">
                            <h5><i className="fa-solid fa-sun mx-2"></i>Sunrise (Local Time) : {sunrise}</h5>
                            <h5><i class="fa-solid fa-moon mx-2"></i>Sunset (Local Time) : {sunset}</h5>
                        </div>
                    </li>
                    <li className="list-group-item"><h5><i class="fa-solid fa-temperature-half mx-2"></i>Feels Like: {feelsLikeTemp} &#176;C</h5></li>
                    <li className="list-group-item"><h5><i class="fa-solid fa-droplet mx-2"></i>Humidity: {humidity}%</h5></li>
                </ul>
            </div>
        </div>
    )
}
