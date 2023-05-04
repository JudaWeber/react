import { Fragment, useState } from "react";
import validate from "validation/validation";
import axios from "axios";
import productSchema from "validation/product.validation";
import Footer from "components/Footer";
import { useEffect } from "react";
import AdminGallery from "components/AdminGallery";
import { toast } from "react-toastify";

const ManageProductPage = () => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [userInput, setUserInput] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
  });

  const [nameErrors, setNameErrors] = useState([]);
  const [priceErrors, setPriceErrors] = useState([]);
  const [descriptionErrors, setDescriptionErrors] = useState([]);
  const [imgErrors, setImgErrors] = useState([]);

  const handleCreateACardClick = async () => {
    const { error } = validate(userInput, productSchema);
    if (error) {
      return;
    }
    try {
      let { data } = await axios.post("/products/add-product", {
        name: userInput.name,
        price: userInput.price,
        description: userInput.description,
        img: userInput.img,
      });
      if (data) {
        window.location.reload();
      }
    } catch (err) {}
  };

  const handleChangeName = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.name.validate(userInput.name);
      if (error && userInput.name !== "") {
        setNameErrors([error.message]);
      } else {
        setNameErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        userInput.name !== "" &&
        userInput.price !== "" &&
        userInput.description !== "" &&
        userInput.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [userInput]);

  const handleChangePrice = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.price.validate(userInput.price);
      if (error && userInput.price !== "") {
        setPriceErrors([error.message]);
      } else {
        setPriceErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        userInput.name !== "" &&
        userInput.price !== "" &&
        userInput.description !== "" &&
        userInput.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [userInput]);
  const handleChangeDescription = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.description.validate(
        userInput.description
      );
      if (error && userInput.description !== "") {
        setDescriptionErrors([error.message]);
      } else {
        setDescriptionErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        userInput.name !== "" &&
        userInput.price !== "" &&
        userInput.description !== "" &&
        userInput.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [userInput]);
  const handleChangeImg = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = productSchema.img.validate(userInput.img);
      if (error && userInput.img !== "") {
        setImgErrors([error.message]);
      } else {
        setImgErrors([]);
      }
      const hasNoErrors =
        nameErrors.length === 0 &&
        priceErrors.length === 0 &&
        descriptionErrors.length === 0 &&
        imgErrors.length === 0 &&
        userInput.name !== "" &&
        userInput.price !== "" &&
        userInput.description !== "" &&
        userInput.img !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [userInput]);

  return (
    <Fragment>
      <h1 className="text-center mt-5 ">Create a new product</h1>

      <div className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={userInput.name}
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
            value={userInput.price}
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
            value={userInput.description}
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
            value={userInput.img}
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
            onClick={handleCreateACardClick}
          >
            Create Product
          </button>
        </div>
      </div>

      <AdminGallery />
      <Footer />
    </Fragment>
  );
};

export default ManageProductPage;
