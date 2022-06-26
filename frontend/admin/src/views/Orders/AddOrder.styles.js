const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  addButton: {
    position: "relative",
    top: theme.spacing(1),
  },
  closeButton: {
    position: "absolute",
    right: "0px",
    top: "0px",
    color: "red",
  },
  imageInput: {
    opacity: 0,
    width: "0.1px",
    height: "0.1px",
  },
  imageInputLabel: {
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100px",
  },
});

export default styles;
