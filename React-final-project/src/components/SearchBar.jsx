import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { useLocation, useHistory } from "react-router-dom";
import { useRef } from "react";

const SearchBar = () => {
  const inputRef = useRef(null);
  const [productsArr, setProductsArr] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/products/all-products");
        if (data) {
          setProductsArr(data);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (() => {
      setSearchInput("");
      setMatches([]);
    })();
  }, [location]);

  const handleSearchEnter = (ev) => {
    ev.preventDefault();
  };

  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    const results = productsArr.filter((item) =>
      item.name.toLowerCase().startsWith(input.toLowerCase())
    );
    if (input.trim() === "") {
      setMatches([]);
      return;
    }
    setMatches(results);
  };

  const handleOpenModal = () => {
    handleShow();
  };
  const handleProductClick = (ev) => {
    const id = ev.target.id;
    history.push(`/productpage/${id}`);
    window.location.reload();
  };

  useEffect(() => {
    if (show) {
      inputRef.current.focus();
    }
  }, [show]);

  return (
    <Fragment>
      <li className="nav-item ms-3">
        <form className="d-flex" onSubmit={handleSearchEnter}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onClick={handleOpenModal}
            onChange={handleSearch}
            value={searchInput}
          />
          <button
            onClick={handleOpenModal}
            className="btn btn-outline-light"
            type="submit"
          >
            Search
          </button>
        </form>
      </li>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div>
              <div className="container">
                <form className="d-flex" onSubmit={handleSearchEnter}>
                  <input
                    className="form-control me-2 mb-5"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onClick={handleOpenModal}
                    onChange={handleSearch}
                    value={searchInput}
                    ref={inputRef}
                  />
                </form>
              </div>

              {matches.length > 0 && (
                <ul className="list-group">
                  {matches.map((item) => (
                    <li
                      className="list-group-item d-flex align-items-center my-search-item"
                      key={item._id}
                      onClick={handleProductClick}
                    >
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            className="w-100"
                            src={item.img}
                            alt={item.name}
                            id={item._id}
                            onClick={handleProductClick}
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="d-flex flex-column ml-3 justify-content-center m-2">
                            <h3 onClick={handleProductClick} id={item._id}>
                              {item.name}
                            </h3>
                            <h5 onClick={handleProductClick} id={item._id}>
                              {item.description}
                            </h5>
                            <h3 onClick={handleProductClick} id={item._id}>
                              {item.price}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </>
    </Fragment>
  );
};

export default SearchBar;
