const appStyle = (theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    fontFamily: "roboto",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export default appStyle;
