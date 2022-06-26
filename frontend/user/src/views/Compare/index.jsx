import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";

import CompareTab from "./CompareTab";
import Pagination from "../../components/Pagination";

import styles from "./index.styles";

import { defaultDisplayImage, imageSrcRoute } from "../../assets/img";

const useStyles = makeStyles(styles);
function Compare() {
  const { compareData, itemsData } = useSelector((state) => state);
  const history = useHistory();
  const classes = useStyles();
  const fallbackImage = (e) => {
    e.target.src = defaultDisplayImage;
  };
  const [current, setCurrent] = useState(1);

  let displayed = 0;

  const pageOffset = 30; // Number of items to be displayed at a time
  const itemsArray = Object.values(itemsData) || [];

  const uniqueItems = itemsArray.filter((item) => !compareData.includes(item));

  function CompareTable({ items }) {
    const sliced = items.slice(
      (current - 1) * pageOffset,
      (current - 1) * pageOffset + (pageOffset - displayed)
    );
    displayed += items.length;
    return (
      <>
        {Object.values(sliced).map((item, i) => (
          <Grid
            item
            md={12}
            key={i}
            onClick={() => history.push(`/item/${item._id}`)}
          >
            <List>
              <ListItem className={classes.eachItem}>
                <ListItemAvatar classes={{ root: classes.listItemAvatar }}>
                  <Avatar classes={{ root: classes.avatarRoot }}>
                    <img
                      src={`${
                        item.image[0]
                          ? imageSrcRoute + "/" + item.image[0]
                          : defaultDisplayImage
                      }`}
                      alt={item.itemname}
                      className={classes.productImage}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.itemName}
                  secondary={
                    <Hidden xsDown>
                      {item.itemCode ? `Product Code: ${item.itemCode}` : " "}
                    </Hidden>
                  }
                  className={classes.truncateName}
                />
                <ListItemText primary={`Rs. ${item.rate || "-"}`} />
                <ListItemText
                  primary={`Rs. ${item.marketRate || item.rate || "-"}`}
                />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        ))}
      </>
    );
  }

  const ListHeader = ({ data }) => (
    <Grid container justify="center" className={classes.topMargin}>
      <Grid item xs={12} sm={12} md={8}>
        <Card classes={{ root: classes.cardRoot }}>
          <List>
            <ListItem>
              <ListItemText primary="Item" className={classes.itemHead} />
              <ListItemText primary="Our Price" />
              <ListItemText primary="Market" />
            </ListItem>
            <Divider />
          </List>

          <CompareTable items={data} />
        </Card>
      </Grid>
    </Grid>
  );
  const handleClick = {
    nextPage: (pageNum) => {
      setCurrent(pageNum);
      window.scrollTo(0, 0);
    },
  };

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      {compareData[0] && (
        <>
          <Typography variant="h4" style={{ padding: 16 }}>
            Added to Compare
          </Typography>
          <Divider style={{ width: "60%" }} />
          <ListHeader
            data={compareData.slice(
              (current - 1) * pageOffset,
              (current - 1) * pageOffset + pageOffset
            )}
          />
        </>
      )}

      <Typography variant="h4" style={{ padding: 16 }}>
        Today's Market
      </Typography>
      <Divider style={{ width: "60%" }} />
      <ListHeader data={uniqueItems} />

      <Pagination
        current={current}
        total={itemsArray.length}
        offset={pageOffset}
        setCurrent={handleClick.nextPage}
      />
    </Container>
  );
}

export default Compare;
