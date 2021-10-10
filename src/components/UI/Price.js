import React from "react";
import { BiRupee } from "react-icons/bi";

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
        color: "white",
      }}
    >
      <BiRupee />
      {props.value}
    </div>
  );
};

export default Price;
