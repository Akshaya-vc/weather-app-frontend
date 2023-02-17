import React from "react";
import "./ParameterCard.component.css"

const ParameterCard = ({ parameter, index , data}) => {
  return (
    <div className="parameter-item" key={index}>
      <div className="parameter-heading">
        <img className="parameter-icon" src={parameter.icon} alt="" />
        <div className="parameter-item-name">{parameter.name}</div>
      </div>
      <p className="parameter-item-value">
        {data.current[parameter.variable]} {parameter.unit}
      </p>
    </div>
  );
};

export default ParameterCard;
