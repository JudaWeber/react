import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import image from "../assets/images/1519855918965.jpeg";
import Footer from "components/Footer";
import "../style/my-cart.scss";

const MyCart = () => {
  const [myCartArr, setMyCartArr] = useState([]);
  const [emptyCart, setEmptyCart] = useState(true);
  const [quantity, setQuantity] = useState({});
  const dataFromToken = useSelector((state) => state.auth.userData);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cart/my-cart");
        if (data) {
          setMyCartArr(data);
          if (data.length !== 0) {
            setEmptyCart(false);
          }
          const initialQuantity = data.reduce((acc, curr) => {
            acc[curr._id] = curr.productQuantity;
            return acc;
          }, {});
          setQuantity(initialQuantity);
        }
      } catch (error) {}
    })();
  }, []);

  const handleQuantityChange = (event) => {
    const productId = event.target.id;
    const newQuantity = event.target.value;

    if (newQuantity > 0) {
      setQuantity((prevState) => ({ ...prevState, [productId]: newQuantity }));
    } else {
      toast.error("Quantity must be a positive number", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleUpdateButton = async (ev) => {
    try {
      let { data } = await axios.get(
        `/cart/${dataFromToken.id}/cart/${ev.target.id}`
      );

      if (data.msg === "already exists") {
        let updatedItem = await axios.patch("/cart/updatecartfrommycartpage", {
          _id: data.existingCartItem._id,
          productQuantity: ev.target.name,
        });
        if (updatedItem) {
          window.location.reload();
        }
      }
    } catch (error) {}
  };

  const handleRemoveButton = async (ev) => {
    try {
      let deletedItem = await axios.delete(
        `/cart/deleteitemfromcart/${ev.target.id}`,
        {
          _id: ev.target.id,
        }
      );
      if (deletedItem) {
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <h1 className="mb-5 text-center mt-5">My Cart</h1>
      <div className="container-fluid w-100" style={{ marginLeft: "0" }}>
        {myCartArr.map((item, index) => (
          <div
            className="row row-cols-lg-2 row-cols-1 m-2 d-flex align-items-center my-cart-row"
            key={"product" + index}
          >
            <div className="col-lg-2 col-sm-12 my-img-btn-col">
              <img
                src={item.productImg}
                className="card-img-top border-0 my-gallery"
                alt={item.productName}
                id={item._id}
              />
            </div>
            <div className="col-lg-3 col-sm-12 ">
              <h5 className="card-title text-center mt-5 " id={item._id}>
                {item.productDescription}
              </h5>
              <h5
                className="card-title text-center my-name-text mt-2"
                id={item._id}
              >
                {item.productName}
              </h5>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h3
                className="card-text text-center ms-4  text-danger"
                id={item._id}
              >
                USD:{item.productPrice}
              </h3>
            </div>
            <div className="col-lg-2 col-sm-12 d-flex justify-content-center m-2">
              <label className="m-2" htmlFor="{item._id}">
                Quantity:
              </label>
              <input
                type="number"
                className="card-text text-center ms-4 w-25"
                id={item._id}
                value={quantity[item._id] || ""}
                onChange={handleQuantityChange}
              />
            </div>
            <div className="col-lg-2 col-sm-12 d-flex justify-content-center">
              <button
                onClick={handleUpdateButton}
                id={item.productId}
                type="button"
                name={quantity[item._id] || ""}
                className="btn btn-outline-success ms-2 "
              >
                Update
              </button>
              <button
                onClick={handleRemoveButton}
                type="button"
                id={item._id}
                className="btn btn-outline-danger ms-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {emptyCart && (
          <div>
            <h2 className="text-center">You have no items in your cart</h2>
          </div>
        )}
      </div>

      <Footer />
    </Fragment>
  );
};

export default MyCart;
