import React, { useState, useEffect } from "react";
import "./Home.page.css";
import { fetchWeather } from "../../api/fetchWeather";

const Home = () => {
  const searchIconLink =
    "https://assets.stickpng.com/images/585e4ae1cb11b227491c3393.png";
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (location) => {
    // fetch API
    fetchWeather(location)
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

  return (
    <div className="home">
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
      {Object.keys(data).length !== 0 ? (
        <div className="content">
          <img
            src={data.current.condition.icon}
            alt="weather-icon"
            className="content-icon"
          />
          <h1>{data.current.temp_c}&#8451;</h1>
          <h1>{data.location.name}</h1>
          <h3>
            {data.location.region}, {data.location.country}
          </h3>
          <div className="item">Wind speed: {data.current.wind_kph}</div>
          <div className="item">Humidity: {data.current.humidity}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
