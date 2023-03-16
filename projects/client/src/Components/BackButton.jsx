import React from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BiChevronLeft
        size={30}
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 cursor-pointer"
      />
    </div>
  );
};

export default BackButton;
