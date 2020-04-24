import React from "react";


const Forecast = (props) => {
    return (
        <div >
            <p> {props.error}</p>
            <p className="city">{props.city}{"   "}{props.country}</p>
            <p>{props.time}</p>
            <p className="temp">{Math.round(props.temperature)}&deg;</p>
            <p> {Math.round(props.Low)}&deg;  {Math.round(props.High)}&deg;</p>
            <img src={` http://openweathermap.org/img/w/${props.icon}.png`} />
            <p> {props.humidity}</p>
            <p> {props.description}</p>
        </div>
    )
}
export default Forecast;