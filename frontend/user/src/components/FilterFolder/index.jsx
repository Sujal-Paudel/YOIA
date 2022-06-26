import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { filterFolderItems } from "../../utils/variables";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  wrapper: {
    display: "grid",
    gridGap: 20,
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
    "&:hover": {
      boxShadow: theme.shadow.cardHover,
    },
  },
}));

const FilterFolder = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = {
    item: (item) => {
      history.push(`/category/${item}`);
    },
  };

  return (
    <div className={classes.wrapper}>
      {Object.keys(filterFolderItems).map((item) => (
        <Card
          key={item}
          className={classes.itemCard}
          onClick={() => handleClick.item(item)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`${require("../../assets/img/" + item + ".jpg")}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default FilterFolder;
