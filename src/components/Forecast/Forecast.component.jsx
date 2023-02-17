import React from "react";
import "./Forecast.component.css";

const Forecast = ({ toggleScale, perDayData, index }) => {
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
        <h1>{perDayData.day.maxtemp_f}&#8457;</h1>
      ) : (
        <h2>{perDayData.day.maxtemp_c}&#8451;</h2>
      )}
    </div>
  );
};

export default Forecast;
