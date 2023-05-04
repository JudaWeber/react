import axios from "axios";

const getUserInfo = () => {
  if (localStorage.getItem("token")) {
    return axios.get("/auth/userInfo");
  }
};

export default getUserInfo;
