import React from "react";
import notfound from "../../Assets/404.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <img src={notfound} alt="notfound" width="300px" />
      <div className="text-2xl font-bold">Sorry, Page Not Found</div>
      <div className="text-base">The page you requested could not be found</div>
      <div className="mt-10">Redirect to home page</div>
      <button
        className="rounded-full bg-[#82CD47] w-7/12 h-[38px] text-white mt-2 text-[20px] font-[600] leading-6 shadow-md"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
};

export default NotFound;
