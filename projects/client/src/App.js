import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import Home from "./Pages/Home";
import Verify from "./Components/Verify";
import SignUp from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import PersonalData from "./Pages/PersonalData";
import SignIn from "./Pages/SignIn";
import Axios from "axios";
import { API_URL } from "./helper";
import { loginAction } from "./Actions/user";
import MyCart from "./Pages/MyCart";
import { getCartList } from "./Actions/cart";
import RestrictedRoutes from "./Utils/RestrictedRoutes";

function App() {
  const dispatch = useDispatch();
  const keepLogin = () => {
    let getLocalStorage = localStorage.getItem("xmart_login");
    if (getLocalStorage) {
      Axios.get(`${API_URL}/user/keep-login`, {
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
        },
      })
        .then((res) => {
          localStorage.setItem("eshop_login", res.data.token);
          dispatch(loginAction(res.data));
          dispatch(getCartList());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<RestrictedRoutes />}>
          <Route path="/personal-data" element={<PersonalData />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/verify-email" element={<Verify />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
