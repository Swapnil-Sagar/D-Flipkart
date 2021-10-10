import React from "react";
import Layout from "../../components/Layout";
import ProductPage from "./ProductPage";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductStore from "./ProductStore";
import "./style.css";

export default function ProductListPage(props) {
  const renderProduct = () => {
    console.log("PROOPS", props);
    const params = getParams(props.location.search);
    console.log(params);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
}
