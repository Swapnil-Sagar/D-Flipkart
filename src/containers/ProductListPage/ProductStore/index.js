import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../../urlConfig";
import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  useEffect(() => {
    console.log("Categories  ", product);
  });

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <>
            {console.log("PPROPP", product)}
            {product.productsByPrice[key].length > 0 && (
              <Card
                headerLeft={
                  priceRange[key] === 30001
                    ? `${props.match.params.slug} Flagships`
                    : `${props.match.params.slug} mobile under ${priceRange[key]}`
                }
                // headerRight={
                //   <MaterialButton
                //     title={"VIEW ALL"}
                //     style={{
                //       width: "96px",
                //     }}
                //     bgColor="#2874f0"
                //     fontSize="12px"
                //   />
                // }
                style={{
                  width: "calc(100% - 100px)",
                  margin: "50px",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {product.productsByPrice[key].map((product) => (
                    <Link
                      to={`/${product.slug}/${product._id}/p`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                        color: "#000",
                      }}
                      className="productContainer"
                    >
                      <div className="productImgContainer">
                        <img
                          src={generatePublicUrl(
                            product.productPictures[0].img
                          )}
                          alt=""
                        />
                      </div>
                      <div className="productInfo">
                        <p style={{ margin: "10px 0" }}>{product.name}</p>
                        <div>
                          <Rating value="4.3" />
                          &nbsp;&nbsp;
                          <p
                            style={{
                              color: "#fefe",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            (3353)
                          </p>
                        </div>
                        <Price value={product.price} />
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </>
        );
      })}
    </>
  );
};

export default ProductStore;
