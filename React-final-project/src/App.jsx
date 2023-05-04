import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import "../src/style/App.scss";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AboutUsPage from "pages/AboutUsPage";
import HomePage from "pages/HomePage";
import useAutoLogin from "hooks/useAutoLogin";
import NotFoundPage from "pages/NotFoundPage";
import AdminGuardRoute from "./components/AdminGuardRoute";
import ProductPage from "pages/ProductPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import ProductGallery from "components/ProductGallery";
import OurProducts from "./pages/OurProducts";
import MyCart from "pages/MyCart";
import ContactUs from "pages/ContactUs";
import ManageProductPage from "pages/ManageProductPage";
import NavBarNew from "components/NavBarNew";
import AuthGuardRoute from "components/AuthGuardRoute";
import ManageUsers from "pages/ManageUsers";

const App = () => {
  const autoLoginFunction = useAutoLogin();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [tryingToLogin, setTryingToLogin] = useState(true);
  useEffect(() => {
    (async () => {
      let status = await autoLoginFunction(localStorage.getItem("token"));
      if (status === false) {
        setTryingToLogin(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (loggedIn === true && tryingToLogin === true) {
      setTryingToLogin(false);
    }
  }, [loggedIn]);
  return (
    <div className="container ">
      <NavBarNew />
      <ToastContainer />
      {!tryingToLogin && (
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path={"/home"} component={HomePage}></Route>
          <Route path={"/manageusers"} component={ManageUsers}></Route>
          <Route path={"/register"} component={RegisterPage}></Route>
          <Route path={"/login"} component={LoginPage}></Route>
          <Route path={"/aboutus"} component={AboutUsPage}></Route>
          <Route path="/forgotpassword" component={ForgotPasswordPage}></Route>
          <Route path={"/Productgallery"} component={ProductGallery}></Route>
          <Route path={"/ourproducts"} component={OurProducts}></Route>
          <Route path={"/productpage/:id"} component={ProductPage}></Route>
          <Route path={"/contactus"} component={ContactUs}></Route>
          <Route
            path="/resetpassword/:token"
            component={ResetPasswordPage}
          ></Route>
          <AdminGuardRoute
            path={"/manageproducts"}
            component={ManageProductPage}
          ></AdminGuardRoute>
          <AuthGuardRoute path={"/mycart"} component={MyCart}></AuthGuardRoute>
          <Route path="*" component={NotFoundPage}></Route>
        </Switch>
      )}
    </div>
  );
};

export default App;
