import React from "react";
import Card from "../Card/Card";

import "./card-container.css";

const CardContainer = () => {
  return (
    <div className="card-container">
      {[...Array(5).keys()].map((index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default CardContainer;
