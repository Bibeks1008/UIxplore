import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./card.css";
import sample_img from "../../assets/images/sample_image.png";
import { AiOutlineHeart } from "react-icons/ai";

const Card = (props) => {
  return (
    <div className="card">
      <Link to={`/card/${props.id}`}>
        <img className="card-image" src={sample_img} alt="card-image" />
      </Link>
      <div className="card-footer">
        <div className="color-container"></div>
        <span className="card-title">Jive</span>
        <AiOutlineHeart className="favourite-icon" />
      </div>
    </div>
  );
};

export default Card;
