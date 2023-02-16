import React, { useState, useEffect } from "react";
import "./Home.page.css";
import { fetchForecast } from "../../api/forecast";

const Home = () => {
  const searchIconLink =
    "https://assets.stickpng.com/images/585e4ae1cb11b227491c3393.png";
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [more, setMore] = useState(false);
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
              src={searchIconLink}
              alt="search-icon"
            />
          </button>
        </div>
        {/* Toggle temperature scale */}
        <div className="scale">
          Temperature scale
          <button onClick={handleTempToggle}>
            {toggleScale.temperature ? "C" : "F"}
          </button>
        </div>
      </div>

      {Object.keys(data).length !== 0 ? (
        <div className="content">
          <h1>{data.location.name}</h1>
          <h3>
            {data.location.region} {data.location.region ? ", " : " "}
            {data.location.country}
          </h3>
          <div className="content-columns">
            <div className="overview">
              {" "}
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
              <div className="item">Wind speed: {data.current.wind_kph}</div>
              <div className="item">Humidity: {data.current.humidity}</div>
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
