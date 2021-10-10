import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";

import { MaterialButton, MaterialInput } from "../../components/MaterialUI";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#fefefe",
    textColor: "blue",
    background: "ghostwhite",
  },
}));

const AddressForm = (props) => {
  const { initialData } = props;
  const classes = useStyles();
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const inputContainer = {
    width: "100%",
    marginRight: 15,
    marginBottom: 15,
  };

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };
    console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };

  useEffect(() => {
    console.log("addressCount", user.address);
    if (submitFlag) {
      console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }

      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {
    return (
      <>
        <div className="flexRow">
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="Name"
              variant="filled"
              value={name}
              color="primary"
              onChange={(e) => setName(e.target.value)}
              focused
            />
          </div>
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="10-digit mobile number"
              variant="filled"
              value={mobileNumber}
              color="primary"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="Pincode"
              variant="filled"
              value={pinCode}
              color="primary"
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="Locality"
              variant="filled"
              value={locality}
              color="primary"
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="Address"
              variant="filled"
              value={address}
              color="primary"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flexRow">
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="City/District/Town"
              variant="filled"
              value={cityDistrictTown}
              color="primary"
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="State"
              variant="filled"
              value={state}
              color="primary"
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="Landmark (Optional)"
              variant="filled"
              value={landmark}
              color="primary"
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <TextField
              className={classes.root}
              required
              id="standard-required"
              label="Alternate Phone (Optional)"
              variant="filled"
              value={alternatePhone}
              color="primary"
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <p>Address Type</p>
          <div className="flexRow">
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
              />
              <span>Home</span>
            </div>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span>Work</span>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <MaterialButton
            title="SAVE AND DELIVER HERE"
            bgColor="#0826B8"
            onClick={onAddressSubmit}
            style={{
              width: "250px",
              margin: "20px 0",
            }}
          />
        </div>
      </>
    );
  };

  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>;
  }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;
