const styles = (theme) => ({
  slide: {
    display: "inline-block",
    height: "100%",
    width: "100%",
    margin: 10,
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
    width: "100%",
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
