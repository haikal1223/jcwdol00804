import React from "react";
import Page from "../../Components/Page";
import DetailSection from "./DetailSection";

const ProductDetail = () => {
    return (
        <Page isNavbar={true} isFooter={false}>
            <DetailSection />
        </Page>
    )
}

export default ProductDetail;