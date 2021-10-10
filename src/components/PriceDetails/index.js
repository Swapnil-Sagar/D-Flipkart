import React from "react";
import Card from "../../components/UI/Card";

const PriceDetails = (props) => {
  return (
    <Card
      headerLeft={"Price Details"}
      style={{ maxWidth: "380px", margin: "24px" }}
    >
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <p>Price ({props.totalItem} items)</p>
          <p>{props.totalPrice}</p>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <p>Delivery Charges</p>
          <p>FREE</p>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <p>Total Amount</p>
          <p>{props.totalPrice}</p>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
