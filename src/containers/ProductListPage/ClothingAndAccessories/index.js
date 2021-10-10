import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import PageNotFound from "../../404";

import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <div style={{ padding: "10px", height: "100%" }}>
      {console.log("PRODICT", product)}
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "none",
        }}
      >
        {product.products.length > 0 ? (
          <>
            {product.products.map((product) => (
              <div className="caContainer">
                <Link
                  className="caImgContainer"
                  to={`/${product.slug}/${product._id}/p`}
                >
                  <img
                    src={generatePublicUrl(product.productPictures[0].img)}
                    alt="ProductImg"
                  />
                </Link>
                <div
                  style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="caProductName">{product.name}</p>
                  <p className="caProductPrice">
                    <BiRupee />
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <PageNotFound />
        )}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
