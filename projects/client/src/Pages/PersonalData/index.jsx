import React from "react";
import BackButton from "../../Components/BackButton";
import Page from "../../Components/Page";

const PersonalData = () => {
  return (
    <Page isFooter={false} isNavbar={false}>
      <div className="relative">
        <BackButton />
        <h1 className="text-center">PersonalData</h1>
      </div>
    </Page>
  );
};

export default PersonalData;
