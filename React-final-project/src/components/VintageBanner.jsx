import React from "react";
import { useHistory } from "react-router-dom";
import "../style/vintage-banner.scss";
import image from "../assets/images/guitar-g15c94853a_1920.jpg";

const VintageBanner = () => {
  const history = useHistory();
  const handleShopButtonClick = () => {
    history.push("/ourproducts");
  };
  return (
    <div className="vintage-banner">
      <img src={image} alt="accordion player" />
      <div className="vintage-text-overlay">
        <h1>USED AND </h1>
        <h1>VINTAGE</h1>
        <p>Explre through a nationwide inventory</p>
        <button onClick={handleShopButtonClick} className="button">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default VintageBanner;
