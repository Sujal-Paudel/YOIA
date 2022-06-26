import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//styles
const useStyles = makeStyles((theme) => ({
  catButton: {
    display: "flex",
    margin: theme.spacing(2, 0),
    borderRadius: "5px",
    padding: "10px",
    "&:hover": {
      background: theme.color.main,
      cursor: "pointer",
    },
  },
  circle: {
    background: "white",
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    border: "1px solid black",
    marginRight: "15px",
  },
}));

const CategoryButtons = (props) => {
  const { title, onClick } = props;
  const classes = useStyles();
  return (
    <Grid item xs={6} sm={3} onClick={onClick}>
      <div className={classes.catButton}>
        <div className={classes.circle}></div>
        <Typography variant="subtitle1">{title}</Typography>
      </div>
    </Grid>
  );
};
export default CategoryButtons;
