import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "components/Footer";
import { Fragment } from "react";
import loginSchema from "validation/login.validation";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ResetPasswordPage = () => {
  const [eyePasswordShow, setEyePasswordShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const history = useHistory();

  const { token } = useParams();
  const HandlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/resetpassword/" + token, { password })
      .then(({ data }) => {
        toast.success("Password changed succesfully!", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        history.push("/login");
      })
      .catch((error) => {});
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
  useEffect(() => {
    (() => {
      const { error } = loginSchema.password.validate(password);
      if (error && password !== "") {
        error.message =
          "Password requires at least 4 numbers, an uppercase and a lowercase letter, one of these symbols(-_&^%$#@!), and must have at least 8 charecters";
        setPasswordErrors([error.message]);
      } else {
        setPasswordErrors([]);
      }
    })();
  }, [password]);

  useEffect(() => {
    (() => {
      const hasNoErrors = passwordErrors.length === 0 && password !== "";
      if (hasNoErrors) {
        setDisabledBtn(false);
      } else {
        setDisabledBtn(true);
      }
    })();
  }, [passwordErrors]);

  return (
    <Fragment>
      <h2 className="mt-2">Enter your new password </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group flex-nowrap">
          <input
            type={passwordType}
            className="form-control"
            id="password"
            value={password}
            onChange={HandlePasswordChange}
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
        <ul className="list-group">
          {passwordErrors.map((error, index) => (
            <li
              className="list-group-item list-group-item-danger"
              key={"phone" + index}
            >
              {error}
            </li>
          ))}
        </ul>

        <button disabled={disabledBtn} className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
      <Footer />
    </Fragment>
  );
};

export default ResetPasswordPage;
