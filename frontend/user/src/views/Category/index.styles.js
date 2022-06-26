const style = (theme) => ({
  root: {},
  searchResults: {
    display: "grid",
    gridGap: 10,
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(5,1fr)",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(4,1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(2,1fr)",
    },
  },
  itemCard: {
    display: "inline-block",
    height: "100%",
    width: "100%",
  },
  noResult: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
});
export default style;
