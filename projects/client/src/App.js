import React from "react";
import "./App.css";
import Login from "./components/Login";
import Verify from "./components/Verify";
import { Routes, Route } from "react-router-dom";
import Page from "./components/Page";

function App() {
  return (
    <div>
      <Page>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify-email" element={<Verify />} />
        </Routes>
      </Page>
    </div>
  );
}

export default App;
