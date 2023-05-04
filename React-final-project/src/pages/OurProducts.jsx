import React from "react";
import Footer from "components/Footer";
import { Fragment } from "react";
import ProductGallery from "components/ProductGallery";

const OurProducts = () => {
  return (
    <Fragment>
      <h1 className="text-center m-5">Our Products</h1>
      <ProductGallery />
      <Footer />
    </Fragment>
  );
};

export default OurProducts;
