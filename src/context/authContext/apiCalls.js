import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
    toast.success("Sign in successfully");
    window.location.href = "/";
  } catch (err) {
    dispatch(loginFailure());
    toast.error("Incorrect username or password");
  }
};
