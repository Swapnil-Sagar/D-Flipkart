import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { products, brands } from "../../constants/data";
import {
  IoIosArrowDown,
  IoIosCart,
  IoIosClose,
  IoIosSearch,
} from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";
import { Link } from "react-router-dom";

export default function Header(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const [searchDisplay, setSearchDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (options.length === 0) setOptions(brands);
  }, [brands]);

  // state cart value

  const cart = useSelector((state) => state.cart);

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  const testCred = () => {
    setEmail("testCustomer@buyer.com");
    setPassword("testCustomer");
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setSearchDisplay(false);
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  //  const handleInputChange = (event) => {
  //    onSearch(event.target.value);
  //    setSearchTerm(event.target.value);
  //    setIsOpen(true);
  //    setClearSearch(true);
  //    if (event.target.value === "") {
  //      onSearch("");
  //      setIsOpen(false);
  //      setClearSearch(false);
  //    }
  //  };

  const setAutoComplete = (item) => {
    console.log("SEARCHH", item);
    setSearch(item);
    setSearchDisplay(false);
  };

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },

          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <div
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </div>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <div
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#1A191C", cursor: "pointer" }}
            >
              Sign Up
            </div>
          </div>
        }
      />
    );
  };

  useEffect(() => {
    console.log("USERRR 1", auth, auth.error, user);
  });

  return (
    <div className="header" ref={wrapperRef}>
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              {signup ? <h2>Signup</h2> : <h2>Login</h2>}
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  // <MaterialInput
                  //   type="text"
                  //   label="First Name"
                  //   value={firstName}
                  //   onChange={(e) => setFirstName(e.target.value)}
                  // />
                  <TextField
                    style={{ width: "100%" }}
                    required
                    id="standard-required"
                    label="First Name"
                    variant="standard"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  // <MaterialInput
                  //   type="text"
                  //   label="Last Name"
                  //   value={lastName}
                  //   onChange={(e) => setLastName(e.target.value)}
                  // />
                  <TextField
                    style={{ width: "100%", marginTop: 12 }}
                    required
                    id="standard-required"
                    label="Last Name"
                    variant="standard"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}
                {/* <MaterialInput
                  type="text"
                  label="Enter Email"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={(e) => setEmail(e.target.value)}
                /> */}

                <TextField
                  style={{ width: "100%", marginTop: 12 }}
                  required
                  id="standard-required"
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  required
                  style={{ width: "100%", marginTop: 12 }}
                  id="standard-password-input"
                  label="Password"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  //rightElement={<a href="#">Forgot?</a>}
                /> */}
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="rgb(8, 38, 184)"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />
                {!signup && (
                  <>
                    <p style={{ textAlign: "center" }}>OR</p>
                    <MaterialButton
                      title="Use Test Credential"
                      bgColor="#ffffff"
                      textColor="#1A191C"
                      style={{
                        margin: "20px 0",
                      }}
                      onClick={testCred}
                    />
                    <p>
                      New Customer?{" "}
                      <span
                        style={{
                          marginTop: "40px",
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={() => setSignup(true)}
                      >
                        Signup
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <Link to={"/"}>
            <img src={flipkartLogo} className="logoimage" alt="" />
          </Link>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div className="searchBar">
          <div className="searchInputContainer">
            <input
              id="auto"
              className="searchInput"
              placeholder={"Search for any brands"}
              onClick={() => setSearchDisplay(true)}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {!searchDisplay ? (
              <div className="searchIconContainer">
                <IoIosSearch
                  style={{
                    color: "#1A191C",
                  }}
                />
              </div>
            ) : (
              <div
                className="searchIconContainer"
                onClick={() => setSearchDisplay(false)}
              >
                <IoIosClose
                  style={{
                    color: "#1A191C",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </div>
          {searchDisplay && (
            <div className="searchAutoComplete">
              {options.filter(
                ({ name }) =>
                  name.toLowerCase().indexOf(search.toLowerCase()) > -1
              ).length > 0 ? (
                options
                  .filter(
                    ({ name }) =>
                      name.toLowerCase().indexOf(search.toLowerCase()) > -1
                  )
                  .map((v, i) => {
                    return (
                      <a
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() => setAutoComplete(v.name)}
                        href={`/${
                          v.name
                        }?cid=${"6064593b9855211ebcf4fce1"}&type=${v.type}`}
                        key={i}
                        tabIndex="0"
                      >
                        <h5>{v.name}</h5>
                      </a>
                    );
                  })
              ) : (
                <h5>No Option Found</h5>
              )}
            </div>
          )}
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <div className="moreMenu">
            <DropdownMenu
              menu={
                <a className="more">
                  <span>More</span>
                  <IoIosArrowDown />
                </a>
              }
              menus={[
                { label: "Notification Preference", href: "", icon: null },
                { label: "Sell on flipkart", href: "", icon: null },
                { label: "24x7 Customer Care", href: "", icon: null },
                { label: "Advertise", href: "", icon: null },
                { label: "Download App", href: "", icon: null },
              ]}
            />
          </div>
          <div>
            <Link to={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
