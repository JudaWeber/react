import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "../style/ProductGallery.scss";
import image from "../assets/images/1519855918965.jpeg";

const ProductGallery = () => {
  const history = useHistory();
  const [myCartArr, setMyCartArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let { data } = await axios.get("/products/all-products");
        if (location.pathname === "/home") {
          const newArray = data.slice(0, 4);
          setProductsArr(newArray);
        } else {
          setProductsArr(data);
        }
      } catch (error) {}
    };
    fetchProducts();
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cart/my-cart");
        if (data) {
          setMyCartArr(data);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    const newProductsArr = productsArr.map(function (item) {
      const itemInMyCartArr = myCartArr.find(function (obj) {
        return obj.productId === item._id;
      });

      if (itemInMyCartArr) {
        return { ...item, inObj2: true };
      } else {
        return item;
      }
    });
    setProductsArr(newProductsArr);
  }, [myCartArr]);

  const handleProductClick = (ev) => {
    const id = ev.target.id;
    history.push(`/productpage/${id}`);
  };

  const handleSortAsc = () => {
    const sortedArr = [...productsArr].sort((a, b) => a.price - b.price);
    setProductsArr(sortedArr);
  };

  const handleSortDesc = () => {
    const sortedArr = [...productsArr].sort((a, b) => b.price - a.price);
    setProductsArr(sortedArr);
  };

  return (
    <div className="container-fluid">
      <div className="sort-buttons mb-3">
        <button className="sort-button" onClick={handleSortAsc}>
          Sort by Price (Low to High)
        </button>
        <button className="sort-button" onClick={handleSortDesc}>
          Sort by Price (High to Low)
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 ">
        {productsArr.map((item, index) => (
          <div className="col-md-6 col-sm-6 col-lg-3" key={"product" + index}>
            <div
              className="card shadow-lg my-card"
              onClick={handleProductClick}
            >
              <img
                src={item.img}
                className="card-img-top border-0 "
                alt={item.name}
                id={item._id}
              />
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title text-center" id={item._id}>
                  {item.name}
                </h5>
                {item.inObj2 === true && (
                  <h1 className="text-success">
                    <i className="bi bi-cart2"> In cart</i>
                  </h1>
                )}
                <h5 className="card-title text-center " id={item._id}>
                  {item.description}
                </h5>
                <div className="card-body">
                  <h3
                    className="card-text  text-center text-danger my-card-price"
                    id={item._id}
                  >
                    {item.price}$
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
