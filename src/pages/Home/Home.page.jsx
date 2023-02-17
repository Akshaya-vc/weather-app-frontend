import React, { useState, useEffect } from "react";
import "./Home.page.css";
import { fetchForecast } from "../../api/forecast";

import Forecast from "../../components/Forecast/Forecast.component";
import Scale from "../../components/Scale/Scale.component";
import ParameterCard from "../../components/ParameterCard/ParameterCard.component";

import parameters from "../../assets/parameters";
import Loader from "../../components/Loader/Loader";

const SearchIcon =
  "https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-17.png";

const Home = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [toggleScale, setToggleScale] = useState({
    temperature: false,
    distance: false,
  });
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const getForecast = (location) => {
    // fetch API
    setIsLoading(true);
    fetchForecast(location)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log("Invalid location", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getForecast(input);
  };

  // load initial data on refresh
  useEffect(() => {
    getForecast("London");
  }, []);

  // to switch between two temperature scales
  const handleTempToggle = () => {
    setToggleScale({ ...toggleScale, temperature: !toggleScale.temperature });
  };
  // return <Loader />;
  if (isLoading) return <Loader />;
  else
    return (
      <div className="home">
        {/* Navbar */}
        <div className="navbar">
          {/* Search bar */}
          <form className="search" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              onChange={handleChange}
              value={input}
              placeholder="Search for cities..."
            />
            <button type="submit" className="search-btn" onClick={handleSubmit}>
              <img
                className="search-btn-icon"
                src={SearchIcon}
                alt="search-icon"
              />
            </button>
          </form>
          <Scale
            handleTempToggle={handleTempToggle}
            toggleScale={toggleScale}
          />
        </div>

        {Object.keys(data).length !== 0 ? (
          <div className="body">
            {/* Location header */}
            <div className="body-item location">
              <h2>{data.location.name}</h2>
              <h3>
                {data.location.region} {data.location.region ? ", " : " "}
                {data.location.country}
              </h3>
            </div>

            <div className="body-item current">
              {/* Column 1 */}
              <div className="overview">
                <img
                  src={data.current.condition.icon}
                  className="main-icon"
                  alt="weather-icon"
                />
                <div className="overview-text">
                  {toggleScale.temperature ? (
                    <h1>{data.current.temp_f}&#8457;</h1>
                  ) : (
                    <h1>{data.current.temp_c}&#8451;</h1>
                  )}
                  <h3>{data.current.condition.text}</h3>
                </div>
              </div>
              <div className="detailed-view">
                {parameters.map((parameter, i) => (
                  <ParameterCard parameter={parameter} i={i} data={data} />
                ))}
              </div>
            </div>

            <div className="body-item forecast">
              <h2>7 Day Forecast</h2>
              <div className="forecast-details">
                {data.forecast.forecastday.map((day, i) => {
                  return (
                    <Forecast
                      toggleScale={toggleScale}
                      perDayData={day}
                      i={i}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
};

export default Home;
