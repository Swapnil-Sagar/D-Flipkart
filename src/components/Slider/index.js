import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../../constants/data";
import Countdown from "react-countdown";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles((theme) => ({
  image: {
    // height: 150,
    width: "90%",
  },
  component: {
    marginTop: 12,
    background: "#1a191c",
    // backgroundImage:
    //   "url(https://i.ibb.co/k3PdRpb/navy-blue-concrete-wall-with-scratches.jpg)",
    backdropFilter: "saturate(180%) blur(10px)",
  },
  deal: {
    padding: "15px 20px",
    display: "flex",
  },
  timer: {
    color: "#7f7f7f",
    marginLeft: "12px",
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginTop: 5,
    color: "#fff",
  },
  dealText: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    marginRight: 25,
    color: "#fff",
  },
  button: {
    marginLeft: "auto",
    backgroundColor: "#2874f0",
    borderRadius: 2,
    fontSize: 13,
  },
  wrapper: {
    padding: "35px 15px",
    margin: "12px 18px",
    borderRadius: "30px",
    background: "#191c1f",
    boxShadow: "8px -8px 15px #0a0b0c, -8px 8px 15px #282d32",
    minHeight: "16rem",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  timerr: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  anchor: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
}));

const Slider = ({ timer, title, items, live }) => {
  const classes = useStyles();
  const category = useSelector((state) => state.category);
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {hours} : {minutes} : {seconds} left
      </span>
    );
  };

  return (
    <Box className={classes.component}>
      <Box className={classes.deal}>
        <Typography className={classes.dealText}>{title}</Typography>

        {timer && (
          <Box className={classes.timer}>
            <img src={timerURL} style={{ width: 24 }} alt="time clock" />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Box>
        )}
        {/* <Button variant="contained" color="primary" className={classes.button}>
          View All
        </Button> */}
      </Box>
      <Divider />
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={true}
        swipeable={true}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {items.map((product) => (
          <Box textAlign="center" className={classes.wrapper}>
            {live ? (
              <a
                style={{ textDecoration: "none" }}
                // className={classes.anchor}
                href={`/${
                  product.name
                }?cid=${"6064593b9855211ebcf4fce1"}&type=${product.type}`}
              >
                <img
                  src={product.url}
                  alt="product-url"
                  className={classes.image}
                />
                <div>
                  <Typography
                    className={classes.text}
                    style={{ fontWeight: 600, color: "#fff" }}
                  >
                    {product.title.shortTitle}
                  </Typography>
                  <Typography
                    className={classes.text}
                    style={{ color: "#36e4c4" }}
                  >
                    {product.discount}
                  </Typography>
                  <Typography
                    className={classes.text}
                    style={{ color: "#fff", opacity: ".6" }}
                  >
                    {product.tagline}
                  </Typography>
                </div>
              </a>
            ) : (
              <a style={{ textDecoration: "none" }}>
                <img
                  src={product.url}
                  alt="product-url"
                  className={classes.image}
                />
                <Typography
                  className={classes.text}
                  style={{ fontWeight: 600, color: "#fff" }}
                >
                  {product.title.shortTitle}
                </Typography>
                <Typography
                  className={classes.text}
                  style={{ color: "#36e4c4" }}
                >
                  {product.discount}
                </Typography>
                <Typography
                  className={classes.text}
                  style={{ color: "#fff", opacity: ".6" }}
                >
                  {product.tagline}
                </Typography>
              </a>
            )}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slider;
