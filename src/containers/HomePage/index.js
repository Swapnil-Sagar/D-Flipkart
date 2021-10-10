import React from "react";
import CarouselContainer from "../../components/Carousel";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import MenuHeader from "../../components/MenuHeader";
import { Box, makeStyles } from "@material-ui/core";
import { products, brands } from "../../constants/data";
import Slider from "../../components/Slider";
import MidSection from "../../components/MidSection";

export default function HomePage() {
  const useStyles = makeStyles({
    component: {
      padding: "10px !important",
      background: "#1a191c",
    },
    rightWrapper: {
      marginTop: 12,
      background: "#1a191c",
      width: "17%",
      marginLeft: 10,
      padding: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const classes = useStyles();
  const adURL =
    // "https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70";
    "https://i.ibb.co/fvLB7SV/Liked-It-1.png";
  return (
    <Layout>
      <Box className={classes.component}>
        <CarouselContainer />
        <Slider live={true} title="Shop by Brands" items={brands} />
      </Box>
      <MidSection banner1={true} />
      <Box
        style={{
          display: "flex",
          // flexWrap: "wrap",
          // justifyContent: "flex-end",
        }}
      >
        <Box className="offerSlider">
          <Slider
            live={false}
            timer={true}
            title="Deals of the Day (Coming Soon)"
            items={products}
          />
        </Box>

        <Box className="clickPoster">
          <a href="https://swapnilsagar.netlify.app/" target="blank">
            <img src={adURL} alt="ad-url" style={{ width: 180 }} />
          </a>
        </Box>
      </Box>
      <MidSection banner2={true} />
    </Layout>
  );
}
