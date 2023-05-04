import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthGuardRoute = ({ component: Page, ...rest }) => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <Route
      {...rest}
      render={(props) =>
        userData ? <Page {...props}></Page> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  );
};

export default AuthGuardRoute;
