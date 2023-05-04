import ProductGallery from "../components/ProductGallery";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import ShopBanner from "components/ShopBanner";
import Footer from "components/Footer";
import VintageBanner from "components/VintageBanner";
import "../style/HomePage.scss";

const HomePage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <Fragment>
      {loggedIn ? (
        <div className="container greet mt-1 mb-5">
          <h1 className="HomeH1 d-flex justify-content-center">
            welcome {userInfo.name}
          </h1>
          <p className="HomeParegraph d-flex justify-content-center">
            to Beat-Boutique!
          </p>
        </div>
      ) : (
        <div className="container greet mt-1 mb-5">
          <h1 className="HomeH1 d-flex justify-content-center">
            Welcome to Beat-Boutique
          </h1>
          <p className="HomeParegraph d-flex justify-content-center">
            Best music products in the web
          </p>
        </div>
      )}
      <ShopBanner />
      <ProductGallery />
      <VintageBanner />
      <Footer />
      {/* <Footer /> */}
    </Fragment>
  );
};

export default HomePage;
