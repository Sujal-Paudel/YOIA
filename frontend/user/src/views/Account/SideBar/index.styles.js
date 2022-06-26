import { drawerWidth } from "../../../styles/shared.styles";

const style = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  paperOverride: {
    position: "relative",
    zIndex: theme.zIndex.header - 1,
  },
  drawerOpen: {
    position: "relative",
    width: drawerWidth,
    height: "100%",
    borderRightWidth: "0px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: theme.shadow.cardHover,
    marginRight: "20px",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      zIndex: 2,
    },
  },
  drawerClose: {
    position: "absolute",
    width: theme.spacing(0),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      zIndex: 2,
    },
  },
  sidebarHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    ...theme.mixins.toolbar,
  },
  list: {
    padding: 0,
  },
  listLink: {
    textDecoration: "none",
    color: "black",
  },
  active: {
    // backgroundColor: "#eee !important",
  },
});

export default style;
