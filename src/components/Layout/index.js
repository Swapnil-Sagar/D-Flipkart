import React from "react";
import Header from "../Header";
import MenuHeader from "../MenuHeader";

export default function Layout(props) {
  return (
    <>
      <Header />
      <MenuHeader />
      {props.children}
    </>
  );
}
