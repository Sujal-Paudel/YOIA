const style = (theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  categoryTitle: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
  catWrapper: {
    padding: "10px",
  },

  allProducts: {
    display: "grid",
    gridGap: 10,
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(5,1fr)",
      gridTemplateRows: 370,
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(4,1fr)",
      gridTemplateRows: 250,
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(3,1fr)",
      gridTemplateRows: 300,
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: " repeat(2,minmax(0, 1fr))",
      gridTemplateRows: 252,
    },
  },
  itemCard: {
    display: "inline-block",
    height: "100%",
    width: "100%",
  },
});
export default style;
