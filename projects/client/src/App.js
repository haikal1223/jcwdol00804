import React from "react";
import "./App.css";
// import Login from "./components/Login";
import Home from './Pages/Home';
import Footer from "./Components/Footer";
import Verify from "./components/Verify";
import SignUp from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Page from "./components/Page";

function App() {
  return (
    <div>
      <Page>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        </Routes>
      </Page>
    </div>
  )

}

export default App;
