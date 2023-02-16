import React, { useState, useEffect } from "react";
import "./Home.page.css";
import { fetchForecast } from "../../api/forecast";

import WindIcon from "../../assets/Wind.png";
import VisibilityIcon from "../../assets/Rainbow.png";
import PrecipitationIcon from "../../assets/Cloud.png";
import PressureIcon from "../../assets/Temperature half.png";
import HumidityIcon from "../../assets/Raindrops.png";
import UVIcon from "../../assets/Sun.png";
// import SearchIcon from "../../assets/search-icon.png";
const SearchIcon =
  "https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-17.png";

const Home = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const parameters = [
    { variable: "humidity", name: "Humidity", icon: HumidityIcon, unit: "" },
    { variable: "uv", name: "UV", icon: UVIcon, unit: "" },
    { variable: "wind_kph", name: "Wind", icon: WindIcon, unit: "kph" },
    { variable: "vis_km", name: "Visibility", icon: VisibilityIcon, unit: "km" },
    {
      variable: "precip_mm",
      name: "Precipitation",
      icon: PrecipitationIcon,
      unit: "mm",
    },
    { variable: "pressure_mb", name: "Pressure", icon: PressureIcon, unit: "mb" },
  ];
  const [toggleScale, setToggleScale] = useState({
    temperature: false,
    distance: false,
  });
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (location) => {
    // fetch API
    fetchForecast(location)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("Invalid location", err);
      });
  };

  useEffect(() => {
    handleSubmit("London");
  }, []);

  const handleTempToggle = () => {
    setToggleScale({ ...toggleScale, temperature: !toggleScale.temperature });
  };

  const detailedView = (parameter, index) => {
    return (
      <div className="parameter-item" key={index}>
        <div className="parameter-heading">
          <img className="parameter-icon" src={parameter.icon} alt="" />
          <div className="parameter-item-name">{parameter.name}</div>
        </div>{" "}
        <h2 className="parameter-item-value">
          {data.current[parameter.variable]} {parameter.unit}
        </h2>
      </div>
    );
  };

  const forecastComponent = (perDayData, index) => {
    const d = new Date(perDayData.date);
    const day =
      d.toString().split(" ")[0] +
      ", " +
      d.toString().split(" ")[1] +
      " " +
      d.toString().split(" ")[2];

    return (
      <div className="forecast-item" key={index}>
        <img src={perDayData.day.condition.icon} alt="" />
        <h3>{day}</h3>
        {toggleScale.temperature ? (
          <h1>{perDayData.day.avgtemp_f}&#8457;</h1>
        ) : (
          <h2>{perDayData.day.avgtemp_c}&#8451;</h2>
        )}
      </div>
    );
  };
  // if (data) data.forecast.forecastday.map((day) => forecastComponent(day));

  return (
    <div className="home">
      <div className="navbar">
        {/* Search bar */}
        <div className="search">
          <input
            type="text"
            className="search-input"
            onChange={handleChange}
            value={input}
            placeholder="Search for cities..."
          />
          <button
            type="submit"
            className="search-btn"
            onClick={() => handleSubmit(input)}
          >
            <img
              className="search-btn-icon"
              src={SearchIcon}
              alt="search-icon"
            />
          </button>
        </div>
        {/* Toggle temperature scale */}
        <div className="scale">
          <div className="scale-heading">Temperature scale</div>

          <button
            style={{
              backgroundColor: !toggleScale.temperature ? "#4dabf5" : "white",
            }}
            className="scale-icon scale-icon-1"
            onClick={handleTempToggle}
          >
            Celsius
          </button>
          <button
            style={{
              backgroundColor: toggleScale.temperature ? "#4dabf5" : "white",
            }}
            className="scale-icon scale-icon-2"
            onClick={handleTempToggle}
          >
            Farenheit
          </button>
        </div>
      </div>

      {Object.keys(data).length !== 0 ? (
        <div className="content">
          <div className="location-details">
            <h2>{data.location.name}</h2>
            <h3>
              {data.location.region} {data.location.region ? ", " : " "}
              {data.location.country}
            </h3>
          </div>

          <div className="content-columns">
            <div className="overview">
              <img
                src={data.current.condition.icon}
                className="main-icon"
                alt="weather-icon"
              />
              {toggleScale.temperature ? (
                <h1>{data.current.temp_f}&#8457;</h1>
              ) : (
                <h1>{data.current.temp_c}&#8451;</h1>
              )}
            </div>
            <div className="detailed-view">
              {parameters.map((parameter, i) => detailedView(parameter, i))}
            </div>
          </div>

          <h4>7 Day forecast</h4>
          <div className="forecast-container">
            {data.forecast.forecastday.map((day, i) =>
              forecastComponent(day, i)
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
