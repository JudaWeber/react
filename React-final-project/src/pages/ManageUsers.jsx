import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../style/AdminGallery.scss";
import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import adminManageSchema from "validation/adminManage.validation";

const ManageUsers = () => {
  const [userEditInfo, setUserEditInfo] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    isAdmin: "",
  });
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [usersArr, setUsersArr] = useState([]);
  const [isAdminErrors, setIsAdminErrors] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/auth/showallusers");
        setUsersArr(data);
      } catch (error) {}
    })();
  }, []);
  const handleEditClick = async (ev) => {
    try {
      let { data } = await axios.get(`auth/getuserbyid/${ev.target.id}`);
      if (data) {
        setUserEditInfo({
          id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          isAdmin: data.isAdmin,
        });
        handleShow();
      }
    } catch (err) {}
  };
  const handleIsAdminChange = (event) => {
    setUserEditInfo({
      ...userEditInfo,
      isAdmin: event.target.value,
    });
  };
  useEffect(() => {
    (() => {
      const { error } = adminManageSchema.isAdmin.validate(
        userEditInfo.isAdmin
      );
      if (error && userEditInfo.name !== "") {
        setIsAdminErrors([error.message]);
      } else {
        setIsAdminErrors([]);
      }
      const hasNoErrors =
        isAdminErrors.length === 0 && userEditInfo.isAdmin !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      }
    })();
  }, [userEditInfo.isAdmin]);

  const handleUpdateUserClick = async () => {
    try {
      let { data } = await axios.patch("/auth/updateuser", {
        id: userEditInfo.id,
        name: userEditInfo.name,
        email: userEditInfo.email,
        phone: userEditInfo.phone,
        isAdmin: userEditInfo.isAdmin,
      });
      if (data) {
        handleClose();
      }
    } catch (err) {}
  };

  const handleDeleteClick = async (event) => {
    try {
      let { data } = await axios.delete(`/auth/deleteuser/${event.target.id}`);
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
        <h1 className="text-center mb-4">Edit and delete users</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 me-2 ">
          {usersArr.map((item, index) => (
            <div
              className="row m-2 d-flex align-items-center my-cart-row"
              key={"user" + index}
            >
              <div className="col col-sm-12">
                <h5 className="card-title text-center mt-2" id={item._id}>
                  {item.name}
                </h5>
              </div>
              <div className="col col-sm-12">
                <h5
                  className="card-title text-center mt-2 overflow-scroll"
                  id={item._id}
                >
                  {item.email}
                </h5>
              </div>
              <div className="col col-sm-12 d-flex justify-content-center">
                <button
                  id={item._id}
                  type="button"
                  className="btn btn-outline-success m-2 "
                  onClick={handleEditClick}
                >
                  Update
                </button>
                <button
                  type="button"
                  id={item._id}
                  className="btn btn-outline-danger m-2"
                  onClick={handleDeleteClick}
                >
                  Remove
                </button>
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
                  defaultValue={userEditInfo.id}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="isAdmin" className="form-label">
                  Is Admin?
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="isAdmin"
                  value={userEditInfo.isAdmin}
                  onChange={handleIsAdminChange}
                />
              </div>
              <ul className="list-group">
                {isAdminErrors.map((error, index) => (
                  <li
                    className="list-group-item list-group-item-danger"
                    key={"name" + index}
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
                  onClick={handleUpdateUserClick}
                >
                  Edit User
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </Fragment>
  );
};

export default ManageUsers;
