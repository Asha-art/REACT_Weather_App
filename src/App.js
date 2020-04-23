import React from 'react';
//import React, { Component } from 'react';
import './App.css';

//const api_key = process.env.REACT_APP_WEATHER_API_KEY;

class App extends React.Component {
  state = {
    temperature: " ",
    city: " ",
    country: " ",
    humidity: " ",
    Low: " ",
    High: " ",
    icon: " ",
    description: "",
    error: ""
  }

  getWeather = async (e) => {
    const zipcode = e.target.elements.zipcode.value;
    e.preventDefault();
    const api_call = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
      zipcode + ",us&units=imperial&appid=" +
      process.env.REACT_APP_WEATHER_API_KEY)

    const response = await api_call.json();


    if (zipcode) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        Low: response.main.temp_min,
        High: response.main.temp_max,
        icon: response.weather[0].icon,
        description: response.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        error: "Please Enter the zipcode ... "
      })
    }
  }

  render() {
    return (
      <div className="container">
        <Heading />
        <div className="form">
          <Form loadWeather={this.getWeather} />   {/* get information from Form and bring it into the render */}
        </div>
        <div className="weather">
          <Forecast
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            Low={this.state.Low}
            High={this.state.High}
            icon={this.state.icon}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    )
  }
}
export default App;

// Heading
const Heading = (props) => {
  return (
    <div>
      <h3> Check the weather condition in your city</h3>
    </div>
  )
}
//form
const Form = (props) => {
  return (
    <form onSubmit={props.loadWeather}>
      <input type="text " name="zipcode" placeholder="Enter the zipcode" />
      <button>Get Weather</button>
    </form>
  )
}

//forecast to display
const Forecast = (props) => {
  return (
    <div >
      {props.country && props.city && <p>
        {props.city}{"   "}{props.country}</p>}
      {props.temperature && <p> {props.temperature}</p>}
      {props.Low && <p>Low: {props.Low} High: {props.High} </p>}
      {/* {props.High && <p>High: {props.High}</p>} */}
      {props.icon && <img src={` http://openweathermap.org/img/w/${props.icon}.png`} alt="weather icon"></img>}
      {props.humidity && <p>Humidity: {props.humidity} {"%"}</p>}
      {props.description && <p>Conditions : {props.description}</p>}
      {props.error && <p> {props.error}</p>}
    </div>
  )
}



















//Zach's code
// getWeather = () => {

//   const zipInput = document.getElementById("zipInput").value;

//   fetch("https://api.openweathermap.org/data/2.5/weather?zip =" + zipInput + ",us&appid=" +
//     process.env.REACT_APP_WEATHER_API_KEY + "&units=imperial")
//     .then(function (response) {
//       if (response.status !== 200) {
//         console.log("Looks like there was a problem. Status Code: " + response.status);
//       }
//     })
//   return;
// }


// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {}

//   }

//   handleClick = () => {
//     let zipInput = document.getElementById("zipInput").value;
//     this.setState({ zip: zipInput });

//   }

//   render() {
//     return <div>
//       <input type="text" placeholder="Enter ZIP Code" ></input>
//       <button onClick={this.getWeather}>Search</button>
//     </div>;
//   }
// }
// export default App;
