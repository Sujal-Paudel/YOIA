const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  topMargin: {
    marginTop: theme.spacing(4),
  },
  cardRoot: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  itemHead: {
    width: "calc(100px + 38%)",
    [theme.breakpoints.down("xs")]: {
      width: "calc(60px + 38%)",
    },
  },
  eachItem: {
    cursor: "pointer",
    borderRadius: theme.spacing(1),
    transition: theme.transitions.create(["backgroundColor"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "&:hover": {
      backgroundColor: "#eee",
      transition: theme.transitions.create(["backgroundColor"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  listItemAvatar: {
    marginRight: theme.spacing(4),
    width: 100,
    height: 100,
    [theme.breakpoints.down("xs")]: {
      width: 60,
      height: 60,
      marginRight: theme.spacing(0),
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRoot: {
    width: "auto",
    height: "auto",
    borderRadius: "5px",
  },
  productImage: {
    maxHeight: 100,
    maxWidth: 100,
    [theme.breakpoints.down("xs")]: {
      maxWidth: 60,
      maxHeight: 60,
    },
  },

  truncateName: {
    width: "35%",
    padding: theme.spacing(0, 2),
    overflow: "hidden",
    position: "relative",
    display: " -webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
});
export default styles;
