import { fade } from "@material-ui/core/styles";

import { drawerWidth } from "../../styles/shared.styles";

const navbarStyle = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbarGutter: {},
  appBar: {
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
    backgroundColor: theme.color.main,
    width: "100%",
    zIndex: theme.zIndex.header,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    position: "absolute",

    left: 10,
    top: 5,
    [theme.breakpoints.down("md")]: {
      left: "auto",
    },
  },
  marginLeft: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },

  search: {
    display: "flex",
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    borderRadius: 5,
    margin: theme.spacing(1, 3, 1, 3),
    width: "100%",
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(0),
    },
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.95),
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eee",
    borderRadius: 5,
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  logoContainer: {
    height: 64,
    padding: theme.spacing(1),
    [theme.breakpoints.down("lg")]: {
      height: 32,
      padding: 0,
    },
  },
  logo: {
    cursor: "pointer",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  sectionMobile: {
    display: "flex",
    padding: theme.spacing(1, 3, 1, 3),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbarRegular: {
    minHeight: 20,
  },
  iconButton: {
    color: "black",
    marginRight: theme.spacing(1),

    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "inherit",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(1),
      padding: theme.spacing(0.5),
    },
  },
  recommendationRoot: {
    position: "absolute",
    background: theme.palette.common.white,
    padding: 0,
  },
  // openIcon: {
  //   transition: theme.transitions.create(["width"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // closeIcon: {
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
});

export default navbarStyle;
