import React from "react";
import { Fragment } from "react";
import Footer from "../components/Footer";
import "../style/AboutUs.scss";

const AboutUsPage = () => {
  return (
    <Fragment>
      <div className="about-us">
        <h2 className="about-us__title mt-5 text-center">About Us</h2>
        <p className="about-us__text">
          Welcome to our music equipment store! We are a team of music
          enthusiasts who are passionate about providing high-quality
          instruments and gear to musicians of all levels. Whether you're just
          starting out or are a seasoned professional, we have everything you
          need to create your perfect sound.
        </p>
        <p className="about-us__text">
          Our store is dedicated to providing exceptional customer service and
          expertise. Our staff is knowledgeable about all of the products we
          carry and can help you find exactly what you need to achieve your
          musical goals. We believe that music is for everyone, and we strive to
          make our store a welcoming and inclusive space for all musicians.
        </p>
        <p className="about-us__text">
          In this website you can use the search bar to find a specific item, or
          click on "Our Products" link to browse all our available items.
        </p>
        <p className="about-us__text">
          In your cart you can update or remove items from your cart.
        </p>
        <p className="about-us__text">
          Thank you for choosing our store for your music equipment needs. We
          look forward to helping you create the music of your dreams!
        </p>
      </div>
      <Footer />
    </Fragment>
  );
};

export default AboutUsPage;
