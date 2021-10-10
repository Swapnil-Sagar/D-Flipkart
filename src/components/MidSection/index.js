import { Box, makeStyles, Grid } from "@material-ui/core";
import clsx from "clsx";

const ImageURL = [
  "https://i.ibb.co/d4wbkcB/Black-Friday.jpg",
  "https://i.ibb.co/BtF3ZwK/Harry.jpg",
  "https://i.ibb.co/Fw6HtSk/DD-removebg-preview.png",
];

const useStyle = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    marginTop: 50,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
  },
  help: {
    [theme.breakpoints.down("md")]: {
      objectFit: "cover",
      height: 120,
    },
  },
}));

const MidSection = ({ banner1, banner2 }) => {
  const classes = useStyle();
  const url =
    "https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50";
  return (
    <>
      {banner1 && (
        <a href="https://www.giveindia.org/" target="blank">
          <img
            src={url}
            className={clsx(classes.wrapper, classes.help)}
            style={{ width: "100%" }}
            alt="img"
          />
        </a>
      )}
      {banner2 && (
        <Grid
          lg={12}
          sm={12}
          md={12}
          xs={12}
          container
          className={classes.wrapper}
        >
          {ImageURL.map((image) => (
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <img
                style={{ height: "320px" }}
                src={image}
                className={classes.image}
                alt="img"
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MidSection;
