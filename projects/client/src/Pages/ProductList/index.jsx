import React from "react";
import Page from "../../Components/Page";
import ProductSection from "./ProductSection";

const ProductList = () => {
  return (
    <Page isNavbar={true} isFooter={false}>
      <ProductSection />
    </Page>
  );
};

export default ProductList;
