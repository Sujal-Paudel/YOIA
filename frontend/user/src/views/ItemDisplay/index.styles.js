const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  mainImageContainer: {
    padding: 15,
    height: 350,
    maxHeight: 350,
  },
  mainImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  subImageContainer: {
    cursor: "pointer",
    // height: 100,
    transition: "0.4s all ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  selectedImage: {
    border: `1px solid ${theme.color.main}`,
  },
  subImage: {
    padding: 5,
    margin: 5,
    // position: "relative",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%,-50%)",
    // maxHeight: "100%",
  },
  details: {
    paddingTop: 15,
    color: theme.color.details,
    lineHeight: 2,
  },
  addToCartBtn: {
    backgroundColor: theme.color.main,
    paddingRight: theme.spacing(4),
    boxShadow: `1px 1px 1px 1px ${theme.color.details}`,
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "&:hover": {
      backgroundColor: theme.color.main,
      color: "white",
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
});

export default styles;
