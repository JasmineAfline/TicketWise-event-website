import React from "react";
import "./Card.css"; // optional if you want styling

function Card({ title, description, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
