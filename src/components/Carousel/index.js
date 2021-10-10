import React from "react";
import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../constants/data";
import { Paper, Button, makeStyles } from "@material-ui/core";

export default function CarouselContainer(props) {
  const useStyles = makeStyles(() => ({
    image: {
      width: "100%",
      height: "auto",
    },
    carousel: {},
  }));
  const classes = useStyles();
  return (
    <div>
      <Carousel
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            background: "#ffffff",
            color: "#494949",
            borderRadius: 0,
            margin: 0,
          },
        }}
        className={classes.carousel}
      >
        {bannerData.map((image) => (
          <img src={image} alt="Banner-img" className={classes.image} />
        ))}
      </Carousel>
    </div>
  );
}
