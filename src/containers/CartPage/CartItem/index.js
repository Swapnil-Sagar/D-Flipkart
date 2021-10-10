import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { addToCart, getCartItems, removeCartItem } from "../../../actions";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <p>Delivery in 3 - 5 days</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button style={{ color: "lightgrey" }} onClick={onQuantityDecrement}>
            -
          </button>
          <input value={qty} readOnly />
          <button style={{ color: "lightgrey" }} onClick={onQuantityIncrement}>
            +
          </button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button className="cartActionBtn" onClick={() => onRemoveCartItem(_id)}>
          Remove
        </button>
        {!auth.authenticate && (
          <p style={{ color: "#b64a4a", fontSize: "13px" }}>Requires Login*</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
