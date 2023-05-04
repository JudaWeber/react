import { useState } from "react";
import axios from "axios";
import Footer from "components/Footer";
import { Fragment } from "react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const HandleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/forgotpassword", { email })
      .then(({ data }) => {
        //instead of email i used console.log
        console.log(data.resetPasswordLink);
        toast.success("Check your inbox(console)", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {});
  };
  return (
    <Fragment>
      <h2 className="mt-2">Enter your email to change your password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={HandleEmailChange}
            value={email}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      <Footer />
    </Fragment>
  );
};

export default ForgotPasswordPage;
