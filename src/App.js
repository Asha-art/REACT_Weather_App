import React from 'react';
import './App.css';
import Forecast from "./components/Forecast";
import Moment from "moment";
import "moment-timezone";



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

  getWeather = async (e) => {
    const zipcode = e.target.elements.zipcode.value;
    e.preventDefault();

    let degUnit = null;
    if (document.getElementById("imperial").checked) {
      degUnit = "imperial";
    } else {
      degUnit = "metric";
    }

    const api_call = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
      zipcode + ",us&units=" + degUnit + "&appid=" + process.env.REACT_APP_WEATHER_API_KEY)

    const response = await api_call.json();
    console.log(response.cod);


    if (zipcode) {
      this.setState({
        temperature: Math.round(response.main.temp) + "°",
        city: response.name + ",",
        country: response.sys.country + " | ",
        time: Moment().utcOffset(response.timezone / 60).format("dddd, MMMM Do YYYY |  h:mm A"),
        humidity: "Humidity: " + response.main.humidity + "%",
        Low: "Low: " + Math.round(response.main.temp_min) + "°",
        High: "High: " + Math.round(response.main.temp_max) + "°",
        icon: response.weather[0].icon,
        description: response.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        error: alert("Please Enter the zipcode ... ")
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
            time={this.state.time}
            humidity={this.state.humidity}
            Low={this.state.Low}
            High={this.state.High}
            icon={<img src={` https://openweathermap.org/img/wn/${this.state.icon}` + ".png"} />}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div >
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

      <p > <label>
        <input className="radio"
          type="radio"
          name="units"
          checked
          id="imperial"
        // onClick={props.loadWeather}
        />imperial
        </label>

        <label>
          <input className="radio"
            type="radio"
            name="units"
            id="metric"
          // onClick={props.loadWeather}
          /> metric
          </label>
      </p>

    </form >
  )
}

















// // //Zach's code
// import React from "react";
// import Moment from "moment";
// import "moment-timezone";
// import tz from "zipcode-to-timezone";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const APP_KEY = "appid=0e715fd6e4dd427ee64eeda6aab95586";

// class App extends React.Component {
//   state = {};

//   getTime = () => {
//     let timeZone = tz.lookup(this.state.zip);
//     let time = Moment().tz(timeZone).format("dddd, MMMM Do YYYY, h:mm:ss a");

//     this.setState({
//       currentTime: time,
//     });
//   };

//   weather = () => {
//     let zip = document.getElementById("zipcode").value;

//     fetch(
//       "http://api.openweathermap.org/data/2.5/weather?zip=" +
//       zip +
//       ",us" +
//       "&units=imperial&" +
//       APP_KEY
//     )
//       .then((response) => {
//         if (response.status !== 200) {
//           console.log(
//             "Looks like there was a problem. Status Code: " + response.status
//           );
//           return;
//         }

//         // Examine the text in the response
//         response.json().then((data) => {
//           console.log(data);
//           this.setState({
//             zip: zip,
//             city: data.name,
//             forecast: data.weather[0].main,
//             temp: data.main.temp,

//           });

//           this.refs.clear.value = "";

//           this.getTime();
//         });
//       })
//       .catch(function (err) {
//         console.log("Fetch Error :-S", err);
//       });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <div className="container">
//           <div className="row">
//             <div className="h3">
//               <h3>Get the weather forecast in your city</h3>

//               <div onClick={this.weather}>
//                 <input type="text" id="zipcode" ref="clear" />
//                 <button>Get Weather</button>
//               </div>
//               <div>
//                 <h3>{this.state.currentTime}</h3>
//                 <span>{this.state.city}</span>
//                 <br />
//                 <span>{this.state.forecast}</span>
//                 <br />
//                 <span> {Math.round(this.state.temp)} </span>
//                 <br />

//                 <br />
//               </div>
//             </div>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default App;










