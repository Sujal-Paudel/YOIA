const appStyle = (theme) => ({
  content: {
    minHeight: "95vh",
    paddingTop: "20px",
    flexGrow: 1,
    scrollBehavior: "smooth",
    [theme.breakpoints.down("md")]: {
      paddingTop: "5px",
    },
  },
});

export default appStyle;
