const styles = (theme) => ({
  root: {
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      padding: 2,
    },
    marginBottom: theme.spacing(3),
    cursor: "pointer",
    height: (props) => (props.allProducts ? "100%" : "90%"),
    background: "white",
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "&:hover": {
      background: "#f7f8ff",
      boxShadow: theme.shadow.cardHover,
      transition: theme.transitions.create(["transform"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  media: {
    height: "60%",
  },
  productImage: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  slide: {
    display: "inline-block",
    height: "100%",
    width: "100%",
    marginLeft: "right",
  },
  cardAction: {
    justifyContent: "space-between",
    height: 25,
    [theme.breakpoints.down("xs")]: {
      padding: (props) => !props.allProducts && 0,
    },
  },
  iconButton: {
    color: theme.color.main,
    fontSize: 15,
  },
  addIcon: {
    padding: 25,
  },
  cardContent: {
    whiteSpace: "normal",
    padding: theme.spacing(0.5, 1, 0.5, 1),
  },
  truncateName: {
    paddingTop: theme.spacing(1),
    overflow: "hidden",
    position: "relative",
    lineHeight: "1.0em",
    display: " -webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },

  tileRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    height: 300,
  },

  tileGridList: {
    flexWrap: "nowrap",
  },
  tileImg: {
    transform: "translateY(0)",
    top: 0,
    background: "red",
  },
  tileTitle: {
    color: theme.palette.primary.light,
  },
  tileTitleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

export default styles;
