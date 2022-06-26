const style = (theme) => ({
  slider: {
    position: "relative",
    margin: "0 auto",

    [theme.breakpoints.up("md")]: {
      height: (props) => (props.sliderHeight ? props.sliderHeight : "400px"),
    },
    [theme.breakpoints.down("md")]: {
      height: (props) => (props.items ? " " : 250),
    },
    [theme.breakpoints.down("sm")]: {
      height: (props) => (props.items ? 300 : ""),
    },
    [theme.breakpoints.down("xs")]: {
      height: (props) => (props.items ? 252 : ""),
    },
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  sliderWrapper: {
    position: "relative",
    height: "100%",

    [theme.breakpoints.up("md")]: {
      width: (props) =>
        props.sliderWrapperWidth ? props.sliderWrapperWidth : "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: (props) => (props.items ? "28%" : "100%"),
    },
    [theme.breakpoints.down("sm")]: {
      width: (props) => (props.items ? "40%" : "100%"),
    },
    [theme.breakpoints.down("xs")]: {
      width: (props) => (props.items ? "50%" : "100%"),
    },

    transform: (props) => `translateX(${props.translateValue}px)`,
    transition: "transform ease-out 0.45s",
  },
  arrow: {
    height: 50,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eee",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "transform ease-in 0.1s",
    position: "absolute",
    top: "40%",
    fontSize: 32,
  },
  nextArrow: {
    right: "25px",
  },
  backArrow: {
    left: "25px",
  },
});
export default style;
