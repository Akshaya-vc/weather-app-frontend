import React from "react";
import "./Scale.component.css";

const Scale = ({ toggleScale, handleTempToggle }) => {
  return (
    <>
      {/* Toggle temperature scale */}
      <div className="scale">
        <button
          style={{
            backgroundColor: !toggleScale ? "#4dabf5" : "white",
          }}
          className="scale-icon scale-icon-1"
          onClick={handleTempToggle}
        >
          Celsius
        </button>
        <button
          style={{
            backgroundColor: toggleScale ? "#4dabf5" : "white",
          }}
          className="scale-icon scale-icon-2"
          onClick={handleTempToggle}
        >
          Fahrenheit
        </button>
      </div>
    </>
  );
};

export default Scale;
