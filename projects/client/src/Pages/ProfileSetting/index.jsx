import React from "react";
import Page from "../../Components/Page";
import AvatarSection from "./Sections/AvatarSection";
import SettingSection from "./Sections/SettingSection";

const ChangePassword = () => {
    return (
        <Page isNavbar={true} isFooter={false} navTitle={"Profile Settings"}>
            <AvatarSection />
            <SettingSection />
        </Page>
    )
}

export default ChangePassword;