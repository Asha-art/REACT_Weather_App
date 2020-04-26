import React from "react";


const Forecast = (props) => {
    return (
        <div >
            <p className="city">{props.city}{"   "}{props.country} {"   "} {props.time}</p>
            <p className="temp">{props.temperature}{props.icon}
                {/* <img src={` http://openweathermap.org/img/w/${props.icon}`} /> */}
                <span className="desc">{props.description}</span></p>
            <p><span className="low">{props.Low}</span>
                <span className="high"> {props.High}</span>
                <span className="humidity">{props.humidity}</span>
            </p>
        </div>
    )
}
export default Forecast;