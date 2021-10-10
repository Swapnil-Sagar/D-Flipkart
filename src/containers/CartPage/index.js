import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../actions";

import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  //const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    // console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  const notify = () => toast("No Items in Cart");

  return (
    <Layout>
      <div
        className="cartContainer"
        style={{ alignItems: "flex-start", marginTop: "10px" }}
      >
        <Card
          headerLeft={`My Cart`}
          headerRight={<p>Deliver to</p>}
          className="cartCard"
          // style={{
          //   width: "calc(100% - 400px)",
          //   overflow: "hidden",
          //   margin: "24px",
          // }}
        >
          {console.log(
            "CARTITEMSS",
            cartItems,
            Object.keys(cartItems),
            Object.keys(cartItems).length
          )}
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
          ))}

          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#191c1f",
              justifyContent: "flex-end",
              // boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px", marginRight: "10px" }}>
              <MaterialButton
                bgColor="#0826B8"
                title="PLACE ORDER"
                onClick={() =>
                  Object.keys(cartItems).length > 0
                    ? props.history.push(`/checkout`)
                    : notify
                }
              />
            </div>
          </div>
        </Card>
        <div style={{ marginTop: "10px" }}>
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce(
              (totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
              },
              0
            )}
          />
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default CartPage;
