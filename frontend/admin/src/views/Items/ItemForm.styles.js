const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  imageInput: {
    position: "absolute",
    opacity: 0,
    width: "0.1px",
    height: "0.1px",
  },
  imageInputLabel: {
    cursor: "pointer",
  },
  cardRoot: {
    cursor: "pointer",
    transition: "0.5s ease all",
    border: "0.8px solid grey",
    background: "#eee",
    height: 110,
    "&:hover": {
      transform: "scale(1.05)",
      background: "rgba(0,0,0,0.08)",
    },
  },
  center: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
});

export default styles;
