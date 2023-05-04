import { useEffect, useState } from "react";
import axios from "axios";
import { Fragment } from "react";
import Footer from "components/Footer";
import { useParams } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/ProductPage.scss";
import image from "../assets/images/1519855918965.jpeg";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dataFromToken = useSelector((state) => state.auth.userData);
  const history = useHistory();

  const handleQuantitySelect = (selectedQuantity) => {
    setQuantity(selectedQuantity);
  };
  const handleAddToCart = async () => {
    try {
      let { data } = await axios.get(
        `/cart/${dataFromToken.id}/cart/${product._id}`
      );
      if (data.msg === "already exists") {
        let updatedItem = await axios.patch("/cart/updatecart", {
          _id: data.existingCartItem._id,
          productQuantity: quantity,
        });
        if (updatedItem) {
          toast.success("Added to cart", {
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
      } else if (data.msg === "it does not exists in the cart") {
        let addedToCart = await axios.post("/cart/addtocart", {
          userId: dataFromToken.id,
          productId: product._id,
          productName: product.name,
          productPrice: product.price,
          productDescription: product.description,
          productImg: product.img,
          productQuantity: quantity,
        });
        if (addedToCart) {
          toast.success("Added to cart", {
            position: "top-left",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {}
  };

  let { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/products/getproductbyid/${id}`);
        setProduct(data);
      } catch (err) {}
    })();
  }, []);

  const handlePushToLogin = () => {
    history.push("/login");
  };

  return (
    product && (
      <Fragment>
        <h1 className="greet mt-5">Product Page</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 col-sm-12">
              <div className="card text-center">
                <img
                  src={product.img}
                  className="card-img-top card-page border-0"
                  alt={product.name}
                />
              </div>
            </div>
            <div className="col-lg-5 col-sm-12 ">
              <div className="card">
                <div className=" card-body">
                  <h3 className="card-text text-center">
                    {product.description}
                  </h3>
                  <h1 className="card-title mb-4 text-center">
                    {product.name}
                  </h1>
                  <h4 className="card-text text-center">{product.price}</h4>
                  <div className="container button-grid">
                    <div className="row">
                      <div className="col-3 text-center">
                        <DropdownButton className="btn" title={` ${quantity}`}>
                          <Dropdown.Item
                            onClick={() => handleQuantitySelect(1)}
                          >
                            1
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleQuantitySelect(2)}
                          >
                            2
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleQuantitySelect(3)}
                          >
                            3
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleQuantitySelect(4)}
                          >
                            4
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleQuantitySelect(5)}
                          >
                            5
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                      <div className="col-8 text-center">
                        {dataFromToken ? (
                          <button
                            className="btn btn-primary btn-lg product-action_button w-100"
                            type="button"
                            onClick={handleAddToCart}
                          >
                            <i className="bi bi-cart-fill me-2"></i> Add to Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-lg product-action_button w-100"
                            type="button"
                            onClick={handlePushToLogin}
                          >
                            <i className="bi bi-cart-fill me-2"></i> Log in to
                            add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </Fragment>
    )
  );
};

export default ProductPage;
