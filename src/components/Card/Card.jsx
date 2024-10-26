import React from "react";
import { useState } from "react";

import "./card.css";
import sample_img from "../../assets/images/sample_image.png";
import { AiOutlineHeart } from "react-icons/ai";

const Card = () => {
  return (
    <div className="card">
      <img className="card-image" src={sample_img} alt="card-image" />
      <div className="card-footer">
        <div className="color-container"></div>
        <span className="card-title">Jive</span>
        <AiOutlineHeart className="favourite-icon" />
      </div>
    </div>
  );
};

export default Card;
