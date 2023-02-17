import React from "react";
import "./Scale.component.css";

const Scale = ({ toggleScale, handleTempToggle }) => {
  return (
    <>
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
    </>
  );
};

export default Scale;
