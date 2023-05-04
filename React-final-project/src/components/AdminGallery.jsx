import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "../style/AdminGallery.scss";
import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import productSchema from "validation/product.validation";
import image from "../assets/images/1519855918965.jpeg";

const AdminGallery = () => {
  const [productEditInfo, setProductEditInfo] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    img: "",
  });
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [productsArr, setProductsArr] = useState([]);
  const [nameErrors, setNameErrors] = useState([]);
  const [priceErrors, setPriceErrors] = useState([]);
  const [descriptionErrors, setDescriptionErrors] = useState([]);
  const [imgErrors, setImgErrors] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/products/all-products");
        if (location.pathname === "/home") {
          const newArray = data.slice(0, 4);
          setProductsArr(newArray);
        } else {
          setProductsArr(data);
        }
      } catch (error) {}
    })();
  }, []);
  const handleEditClick = async (ev) => {
    try {
      let { data } = await axios.get(`products/getproductbyid/${ev.target.id}`);
      if (data) {
        setProductEditInfo({
          id: data._id,
          name: data.name,
          price: data.price,
          description: data.description,
          img: data.img,
        });
        handleShow();
      }
    } catch (err) {}
  };
  const handleChangeName = (event) => {
    const { id, value } = event.target;
    setProductEditInfo((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.name.validate(productEditInfo.name);
      if (error && productEditInfo.name !== "") {
        setNameErrors([error.message]);
      } else {
        setNameErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        productEditInfo.name !== "" &&
        productEditInfo.price !== "" &&
        productEditInfo.description !== "" &&
        productEditInfo.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [productEditInfo]);
  const handleChangePrice = (event) => {
    const { id, value } = event.target;
    setProductEditInfo((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.price.validate(productEditInfo.price);
      if (error && productEditInfo.price !== "") {
        setPriceErrors([error.message]);
      } else {
        setPriceErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        productEditInfo.name !== "" &&
        productEditInfo.price !== "" &&
        productEditInfo.description !== "" &&
        productEditInfo.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [productEditInfo]);
  const handleChangeDescription = (event) => {
    const { id, value } = event.target;
    setProductEditInfo((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.description.validate(
        productEditInfo.description
      );
      if (error && productEditInfo.description !== "") {
        setDescriptionErrors([error.message]);
      } else {
        setDescriptionErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        productEditInfo.name !== "" &&
        productEditInfo.price !== "" &&
        productEditInfo.description !== "" &&
        productEditInfo.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [productEditInfo]);
  const handleChangeImg = (event) => {
    const { id, value } = event.target;
    setProductEditInfo((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.img.validate(productEditInfo.img);
      if (error && productEditInfo.img !== "") {
        setImgErrors([error.message]);
      } else {
        setImgErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        productEditInfo.name !== "" &&
        productEditInfo.price !== "" &&
        productEditInfo.description !== "" &&
        productEditInfo.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [productEditInfo]);

  const handleUpdateProductClick = async () => {
    try {
      let { data } = await axios.patch("/products/updateproduct", {
        _id: productEditInfo.id,
        name: productEditInfo.name,
        price: productEditInfo.price,
        description: productEditInfo.description,
        img: productEditInfo.img,
      });
      let updatedItem = await axios.patch("/cart/adminupdate", {
        productId: productEditInfo.id,
        productName: productEditInfo.name,
        productPrice: productEditInfo.price,
        productDescription: productEditInfo.description,
        productImg: productEditInfo.img,
      });
      if (data && updatedItem) {
        window.location.reload();
      }
    } catch (err) {}
  };

  const handleDeleteClick = async (event) => {
    try {
      let { data } = await axios.delete(
        `/products/deleteproduct/${event.target.id}`
      );
      let deletedItemFromCart = await axios.delete("/cart/admindelete", {
        productId: event.target.id,
      });

      if (data && deletedItemFromCart) {
        window.location.reload();
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <h1 className="text-center mb-4">Edit and delete products</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          {/* {productsArr.map((item, index) => (
            <div className="col-12" key={"product" + index}>
              <div className="card shadow-lg my-card">
                <img
                  src={image}
                  className="card-img-top border-0 my-gallery"
                  alt={item.name}
                  id={item._id}
                />
                <div className="card-body d-flex flex-column justify-content-center  ">
                  <h5 className="card-title text-center" id={item._id}>
                    {item.name}
                  </h5>
                  <h5 className="card-title text-center" id={item._id}>
                    {item.description}
                  </h5>
                  <div className="card-body">
                    <h3 className="card-text ms-4 text-danger " id={item._id}>
                      {item.price}
                    </h3>
                  </div>
                  <div className="card-body  d-flex justify-content-between">
                    <button
                      className="btn btn-primary mx-2"
                      onClick={handleEditClick}
                      id={item._id}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleDeleteClick}
                      id={item._id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
          {productsArr.map((item, index) => (
            <div className="col-12" key={"product" + index}>
              <div className="card shadow-lg my-card">
                <img
                  src={item.img}
                  className="card-img-top border-0 my-gallery"
                  alt={item.name}
                  id={item._id}
                />
                <div className="card-body">
                  <h5 className="card-title text-center" id={item._id}>
                    {item.name}
                  </h5>
                  <h5 className="card-title text-center" id={item._id}>
                    {item.description}
                  </h5>
                  <div className="card-body">
                    <h3 className="card-text ms-4 text-danger " id={item._id}>
                      {item.price}
                    </h3>
                  </div>
                  <div className="card-body d-flex justify-content-between">
                    <button
                      className="btn btn-primary mx-2"
                      onClick={handleEditClick}
                      id={item._id}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleDeleteClick}
                      id={item._id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="mb-3 d-none">
                <label htmlFor="name" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  defaultValue={productEditInfo.id}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={productEditInfo.name}
                  onChange={handleChangeName}
                />
              </div>
              <ul className="list-group">
                {nameErrors.map((error, index) => (
                  <li
                    className="list-group-item list-group-item-danger"
                    key={"name" + index}
                  >
                    {error}
                  </li>
                ))}
              </ul>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={productEditInfo.price}
                  onChange={handleChangePrice}
                />
              </div>
              <ul className="list-group">
                {priceErrors.map((error, index) => (
                  <li
                    className="list-group-item list-group-item-danger"
                    key={"price" + index}
                  >
                    {error}
                  </li>
                ))}
              </ul>
              <div className="mb-3">
                <label htmlFor="description" className="form-label ">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={productEditInfo.description}
                  onChange={handleChangeDescription}
                />
              </div>
              <ul className="list-group">
                {descriptionErrors.map((error, index) => (
                  <li
                    className="list-group-item list-group-item-danger"
                    key={"description" + index}
                  >
                    {error}
                  </li>
                ))}
              </ul>
              <div className="mb-3">
                <label htmlFor="img" className="form-label ">
                  Image img
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="img"
                  value={productEditInfo.img}
                  onChange={handleChangeImg}
                />
              </div>
              <ul className="list-group">
                {imgErrors.map((error, index) => (
                  <li
                    className="list-group-item list-group-item-danger"
                    key={"img" + index}
                  >
                    {error}
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-evenly">
                <button
                  type="submit"
                  disabled={disabledBtn}
                  className="btn btn-success mb-5"
                  onClick={handleUpdateProductClick}
                >
                  Edit Product
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </Fragment>
  );
};

export default AdminGallery;
