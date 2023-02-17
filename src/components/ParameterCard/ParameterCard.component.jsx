import React from "react";

const ParameterCard = ({ parameter, index , data}) => {
  return (
    <div className="parameter-item" key={index}>
      <div className="parameter-heading">
        <img className="parameter-icon" src={parameter.icon} alt="" />
        <div className="parameter-item-name">{parameter.name}</div>
      </div>
      <h2 className="parameter-item-value">
        {data.current[parameter.variable]} {parameter.unit}
      </h2>
    </div>
  );
};

export default ParameterCard;
