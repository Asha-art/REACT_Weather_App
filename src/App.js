import React from 'react';
import './App.css';
import moment from "moment";
import Moment from 'react-moment'
//import "moment-timezone";
//var moment = require('moment');

class App extends React.Component {
  state = {
    temperature: " ",
    city: " ",
    country: " ",
    time: " ",
    humidity: " ",
    Low: " ",
    High: " ",
    icon: " ",
    description: "",
    error: ""
  }

  // getTime = () => {
  //   let time = moment().format("MMMM Do, h:mm a");
  //   console.log(time);
  // }




  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentDate: new Date(),
  //     markedDate: moment(new Date()).format("YYYY-MM-DD")
  //   };
  // }

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
        time: response.getTime,
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
          {/* < Moment format="YYYY/MM/DD" > {this.props.dateToFormat}</Moment> */}

          <Forecast
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            time={this.state.getTime}
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
      <p> {props.error}</p>
      <p class="city">{props.city}{"   "}{props.country}</p>

      {/* <p>{props.getTime}</p> */}
      <p class="temp">{Math.round(props.temperature)}&deg;</p>
      <p> {Math.round(props.Low)}&deg;  {Math.round(props.High)}&deg;</p>
      {/* {props.High && <p>High: {props.High}</p>} */}
      <img src={` http://openweathermap.org/img/w/${props.icon}.png`} />
      <p> {props.description}</p>
    </div>
  )
}


// // timezone
// const Timezone = ({ reading, degreeType }) => {
//   let newDate = new Date();
//   const weekday = reading.dt * 1000
//   newDate.setTime(weekday)
//   return (
//     <p>{moment(newDate).format('MMMM Do, h:mm a')}</p>
//   )
// }


// //forecast to display
// const Forecast = (props) => {
//   return (
//     <div >
//       {props.country && props.city && <p class="city">
//         {props.city}{"   "}{props.country}</p>}

//       {props.temperature && <p class="temp"> {props.temperature}&deg;F</p>}
//       {props.Low && <p>Low: {props.Low} &deg;  High: {props.High} &deg;</p>}
//       {/* {props.High && <p>High: {props.High}</p>} */}
//       {props.icon && <img src={` http://openweathermap.org/img/w/${props.icon}.png`} />}
//       {props.description && <p> {props.description}</p>}
//       {props.humidity && <p>Humidity: {props.humidity} {" %"}</p>}
//       {props.error && <p> {props.error}</p>}
//     </div>
//   )
// }














