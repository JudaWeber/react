import React from "react";
import { useHistory } from "react-router-dom";
import "../style/shop-banner.scss";
import image from "../assets/images/monkey-gaca54b333_1920.jpg";

const ShopBanner = () => {
  const history = useHistory();
  const handleShopButtonClick = () => {
    history.push("/ourproducts");
  };
  return (
    <div className="shop-banner">
      <img src={image} alt="Shop Banner" />
      <div className="text-overlay">
        <h1>Shop Now</h1>
        <p>Unbeatable prices on everything you need</p>
        <button onClick={handleShopButtonClick} className="button">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ShopBanner;
