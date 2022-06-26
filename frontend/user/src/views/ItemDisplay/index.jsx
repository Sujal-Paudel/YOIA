import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

import ItemSlider from "../../components/ItemSlider";
import ItemDescription from "./ItemDescription";

import styles from "./index.styles";

import { defaultDisplayImage, imageSrcRoute } from "../../assets/img";

const useStyles = makeStyles(styles);

function ItemDisplay() {
  const classes = useStyles();
  const { _id } = useParams();
  const { itemsData } = useSelector((state) => state);
  const { [_id]: itemDetail } = useSelector((state) => state.itemsData);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!itemDetail) {
    return <></>;
  }

  const ItemImages = () => (
    <>
      <Paper
        elevation={3}
        variant="outlined"
        className={classes.mainImageContainer}
      >
        <img
          src={`${
            itemDetail.image[selectedImage]
              ? imageSrcRoute + "/" + itemDetail.image[selectedImage]
              : defaultDisplayImage
          }`}
          alt={itemDetail.itemName}
          className={classes.mainImage}
        />
      </Paper>
      <br />
      <Grid container>
        {itemDetail.image.map((each, index) => (
          <Grid
            item
            xs={2}
            md={4}
            key={index}
            onClick={() => setSelectedImage(index)}
            className={clsx(classes.subImageContainer, {
              [classes.selectedImage]: selectedImage === index,
            })}
          >
            <Paper
              elevation={3}
              variant="outlined"
              className={classes.subImage}
            >
              <img
                src={`${
                  each ? imageSrcRoute + "/" + each : defaultDisplayImage
                }`}
                alt={itemDetail.itemName}
                width="100%"
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <ItemImages />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <ItemDescription itemDetail={itemDetail} />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" classes={{ root: classes.details }}>
          Similar Items
        </Typography>
        <Divider />
        <ItemSlider
          data={Object.values(itemsData)
            .filter((e) => e.category === itemDetail.category)
            .slice(0, 7)}
        />
      </Container>
    </React.Fragment>
  );
}

export default ItemDisplay;
