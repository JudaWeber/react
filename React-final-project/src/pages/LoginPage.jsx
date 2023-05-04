import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import loginSchema from "validation/login.validation";
import { useHistory } from "react-router-dom";
import useAutoLogin from "hooks/useAutoLogin";
import Footer from "components/Footer";
import "../style/Log&Reg.scss";

const LoginPage = () => {
  const history = useHistory();
  const autoLoginFunction = useAutoLogin();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [emailErrors, setEmailErrors] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [eyePasswordShow, setEyePasswordShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleLoginClick = async () => {
    try {
      let { data } = await axios.post("/auth/login", {
        email: userInput.email,
        password: userInput.password,
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
        autoLoginFunction(data.token);
        history.push("/home");
        toast.success("welcome!", {
          position: "top-left",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("email or password is not correct", {
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
    } catch (error) {}
  };

  const handleEyePassword = () => {
    if (eyePasswordShow === false) {
      setEyePasswordShow(true);
      setPasswordType("text");
    } else if (eyePasswordShow === true) {
      setEyePasswordShow(false);
      setPasswordType("password");
    }
  };

  const handleChangeEmail = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };
  useEffect(() => {
    (() => {
      const { error } = loginSchema.email.validate(userInput.email);
      if (error && userInput.email !== "") {
        setEmailErrors([error.message]);
      } else {
        setEmailErrors([]);
      }
    })();
  }, [userInput.email]);
  const handleChangePassword = (event) => {
    const { id, value } = event.target;
    setUserInput((prevUserInput) => ({ ...prevUserInput, [id]: value }));
  };

  useEffect(() => {
    (() => {
      const hasNoErrors =
        emailErrors.length === 0 &&
        userInput.email !== "" &&
        userInput.password !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      } else {
        setDisabledBtn(true);
      }
    })();
  }, [userInput.password, emailErrors]);

  const handleForgotPasswordClick = () => {
    history.push("/forgotpassword");
  };

  return (
    <Fragment>
      <h1 className=" mt-5">Login Page</h1>
      <div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label ">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={userInput.email}
            onChange={handleChangeEmail}
          />
        </div>
        <ul className="list-group">
          {emailErrors.map((error, index) => (
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
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            disabled={disabledBtn}
            className="btn my-btn-log-reg"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            type="submit"
            className="btn btn-outline-danger"
            onClick={handleForgotPasswordClick}
          >
            Forgot password?
          </button>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoginPage;
