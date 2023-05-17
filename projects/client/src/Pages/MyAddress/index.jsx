import React from "react";
import Page from "../../Components/Page";
import AddressSection from "./AddressSection";
import AvatarSection from "./AvatarSection";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const MyAddress = () => {
  const navigate = useNavigate();
  return (
    <Page isNavbar={false} isFooter={false}>
      <div className="absolute left-50 cursor-pointer z-20">
        <div>
          <BiChevronLeft
            size={30}
            onClick={() => navigate("/profile-setting")}
            className="absolute top-5 left-5 cursor-pointer z-20"
          />
        </div>
      </div>
      <div className="text-center text-xl py-5 font-bold z-10 relative">
        My Address
      </div>
      <AvatarSection />
      <AddressSection />
    </Page>
  );
};

export default MyAddress;
