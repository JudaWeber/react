import { useState, useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import validate from "validation/validation";
import registerschema from "validation/register.validation";
import Footer from "components/Footer";
import "../style/Log&Reg.scss";

const RegisterPage = () => {
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [nameErrors, setNameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [phoneErrors, setPhoneErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [regBtn, setRegBtn] = useState(true);
  const [passwordVarificator, setPasswordVarificator] = useState("");
  const [show, setShow] = useState(false);
  const [eyePasswordShow, setEyePasswordShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordVarifyType, setPasswordVarifyType] = useState("password");

  const handleRegisterClick = async () => {
    const { error } = validate(userInput, registerschema);
    if (error) {
      return;
    }
    try {
      await axios.post("/auth/register", {
        name: userInput.name,
        email: userInput.email,
        phone: userInput.phone,
        password: userInput.password,
      });
      history.push("/login");
      toast.success("welcome! please log in", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      if (err.response.data === "User already registered.") {
        toast.warn("You are already registered, please log in", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warn("Somthing went wrong..", {
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
    }
  };

  const handlePasswordVarificationChange = (ev) => {
    setPasswordVarificator(ev.target.value);
  };

  const handleEyePassword = () => {
    if (eyePasswordShow === false) {
      setEyePasswordShow(true);
      setPasswordType("text");
      setPasswordVarifyType("text");
    } else if (eyePasswordShow === true) {
      setEyePasswordShow(false);
      setPasswordType("password");
      setPasswordVarifyType("password");
    }
  };
  const handleChangeName = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = registerschema.name.validate(userInput.name);
      if (error && userInput.name !== "") {
        setNameErrors([error.message]);
      } else {
        setNameErrors([]);
      }
    })();
  }, [userInput.name]);
  const handleChangeEmail = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = registerschema.email.validate(userInput.email);
      if (error && userInput.email !== "") {
        setEmailErrors([error.message]);
      } else {
        setEmailErrors([]);
      }
    })();
  }, [userInput.email]);
  const handleChangePhone = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = registerschema.phone.validate(userInput.phone);
      if (error && userInput.phone !== "") {
        setPhoneErrors([error.message]);
      } else {
        setPhoneErrors([]);
      }
    })();
  }, [userInput.phone]);
  const handleChangePassword = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      let { error } = registerschema.password.validate(userInput.password);
      if (error && userInput.password !== "") {
        error.message =
          "Password requires at least 4 numbers, an uppercase and a lowercase letter, one of these symbols(-_&^%$#@!), and must have at least 8 charecters";
        setPasswordErrors([error.message]);
      } else {
        setPasswordErrors([]);
      }
    })();
  }, [userInput.password]);

  useEffect(() => {
    (() => {
      if (
        passwordVarificator &&
        userInput.password &&
        userInput.password === passwordVarificator
      ) {
        setRegBtn(false);
        setShow(false);
      } else if (
        passwordVarificator &&
        userInput.password &&
        userInput.password !== passwordVarificator
      ) {
        setShow(true);
        setRegBtn(true);
      }
    })();
  }, [userInput.password, passwordVarificator]);

  useEffect(() => {
    (() => {
      const hasNoErrors =
        nameErrors.length === 0 &&
        emailErrors.length === 0 &&
        phoneErrors.length === 0 &&
        passwordErrors.length === 0 &&
        userInput.name !== "" &&
        userInput.email !== "" &&
        userInput.phone !== "" &&
        userInput.password !== "";
      if (hasNoErrors) {
        setRegBtn(false);
      } else {
        setRegBtn(true);
      }
    })();
  }, [nameErrors, emailErrors, phoneErrors, passwordErrors]);

  return (
    <Fragment>
      <h1 className="greet mt-5">Register page</h1>
      <div>
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
          <label htmlFor="email" className="form-label ">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={userInput.email}
            onChange={handleChangeEmail}
          />
        </div>
        <ul className="list-group">
          {emailErrors.map((error, index) => (
            <li
              className="list-group-item list-group-item-danger"
              key={"email" + index}
            >
              {error}
            </li>
          ))}
        </ul>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label ">
            Phone
          </label>
          <input
            type="phone"
            className="form-control"
            id="phone"
            value={userInput.phone}
            onChange={handleChangePhone}
          />
        </div>
        <ul className="list-group">
          {phoneErrors.map((error, index) => (
            <li
              className="list-group-item list-group-item-danger"
              key={"phone" + index}
            >
              {error}
            </li>
          ))}
        </ul>
        <div className="mb-3">
          <label htmlFor="password" className="form-label ">
            Password
          </label>
          <div className="input-group flex-nowrap">
            <input
              type={passwordType}
              className="form-control"
              id="password"
              value={userInput.password}
              onChange={handleChangePassword}
            />
            <button
              className="input-group-text"
              id="addon-wrapping"
              onClick={handleEyePassword}
            >
              {eyePasswordShow ? (
                <i className="bi bi-eye-fill"></i>
              ) : (
                <i className="bi bi-eye-slash-fill"></i>
              )}
            </button>
          </div>
        </div>
        <ul className="list-group">
          {passwordErrors.map((error, index) => (
            <li
              className="list-group-item list-group-item-danger"
              key={"password" + index}
            >
              {error}
            </li>
          ))}
        </ul>
        <div className="mb-3">
          <label htmlFor="passwordVarification" className="form-label ">
            Varify Password
          </label>
          <div className="input-group flex-nowrap">
            <input
              type={passwordVarifyType}
              className="form-control"
              id="passwordVarification"
              value={passwordVarificator}
              onChange={handlePasswordVarificationChange}
              // onBlur={handleBlurPassword}
            />
            <button
              className="input-group-text"
              id="addon-wrapping"
              onClick={handleEyePassword}
            >
              {eyePasswordShow ? (
                <i className="bi bi-eye-fill"></i>
              ) : (
                <i className="bi bi-eye-slash-fill"></i>
              )}
            </button>
          </div>
        </div>
        <ul className="list-group">
          {show && (
            <li className="list-group-item list-group-item-danger ">
              The passwords don't match😕
            </li>
          )}
        </ul>
        <button
          type="submit"
          disabled={regBtn}
          className="btn my-btn-log-reg"
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </div>
      <Footer />
    </Fragment>
  );
};

export default RegisterPage;
