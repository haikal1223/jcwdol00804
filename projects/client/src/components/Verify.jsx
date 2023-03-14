import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../helper";

function Verify() {
  const { search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const email = urlSearchParams.get("email");

  function verifyEmail() {
    axios
      .patch(`${API_URL}/user/verify`, {
        email,
      })
      .then(function (response) {
        console.log(response);
        alert(response.data.message);
        //TODO: redirect to landing page
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
        //TODO: show error to frontend
      });
  }
  return (
    <div className="font-sans grid justify-items-center items-center container mx-auto text-center p-10 h-full">
      <div>
        <div className="object-fit-contain h-1/2 w-1/2 mx-auto">
          <img src="/Verify.png" alt="verify-symbol" />
        </div>
        <p className="text-2xl font-bold my-5">
          Please click button below to verify your email
        </p>
        <p className="text-xl">{email}</p>
      </div>
      <button
        className="font-semibold text-xl py-2 px-8 mt-4 bg-lime-500 text-white rounded-3xl w-full"
        onClick={verifyEmail}
      >
        Verify
      </button>
    </div>
  );
}

export default Verify;
