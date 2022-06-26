const styles = (theme) => ({
  root: {},
  media: {
    width: "20%",
    padding: theme.spacing(1),
  },
  productImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  cardRoot: {
    display: "flex",
    marginBottom: theme.spacing(2),
    height: 150,
  },
  cardContent: {
    paddingTop: theme.spacing(4),
    flexGrow: 1,
    color: theme.color.details,
    maxWidth: "35%",
    cursor: "pointer",
  },
  price: {
    paddingTop: theme.spacing(4),
    color: theme.color.main,
  },
  marketRate: {
    textDecoration: "line-through",
    color: "red",
  },
  marketRatePrice: {
    color: theme.color.details,
  },
  iconButton: {
    marginTop: 5,
  },
  deleteIcon: {
    paddingLeft: 0,
    transition: "0.1s all ease",
    color: theme.color.danger,
    "&:hover": {
      backgroundColor: "inherit",
      transform: "scale(1.02)",

      textDecoration: "underline",
    },
  },
  truncateName: {
    overflow: "hidden",
    position: "relative",
    lineHeight: "1.0em",
    maxHeight: "2.0em",
    display: " -webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  emptyCartContainer: {
    position: "relative",
    padding: theme.spacing(4),
  },
  emptyCart: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    opacity: 0.6,
    width: 150,
    height: 150,
  },
  shoppingBtn: {
    position: "absolute",
    bottom: "0px",
    background: theme.color.main,
    color: "white",
    padding: theme.spacing(1),
    left: "50%",
    transform: "translateX(-45%)",
    "&:hover": {
      color: theme.color.details,
    },
  },
  shippingProfile: {
    backgroundColor: "#EFEFEF",
    [theme.breakpoints.up("md")]: {
      position: "relative",
      top: -16,
      right: 0,
      boxShadow: "-1px -1px 1px 1px grey",
    },
  },
  shippingBottom: {
    flexGrow: 1,
    backgroundColor: "#D1D1D1",
    padding: theme.spacing(2),
  },
  shippingBtns: {
    margin: theme.spacing(2),
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
  form: {
    padding: 1,
  },
});

export default styles;
