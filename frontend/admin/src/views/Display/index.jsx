import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";

import DynamicImport from "../../components/DynamicInput";
import { ImageDisplay, ImageInput } from "../../components/ImageDisplay";

import styles from "./index.styles";

import { updateConfig, addBanner } from "../../actions";
import { imageSrcRoute } from "../../assets/img";

const useStyles = makeStyles(styles);

function Display() {
  const dispatch = useDispatch();
  const { bannerImages, featured, bestValue, popular } = useSelector(
    (state) => state.configData
  );
  // const { itemsData } = useSelector((state) => state);
  // console.log(itemsData);

  const { configData } = useSelector((state) => state);

  const classes = useStyles();
  const handleChange = {
    add: (name, value) => {
      const temp = configData[name];
      const updated = Array.from(new Set([...temp, value]));
      dispatch(
        updateConfig(updated, `${name}`, `UPDATE_${name.toUpperCase()}`)
      );
    },
    del: (name, value) => {
      const temp = configData[name];
      const updated = temp.filter((f) => f !== value);
      dispatch(
        updateConfig(updated, `${name}`, `UPDATE_${name.toUpperCase()}`)
      );
    },
    addBanner: (e) => {
      const formData = new FormData();
      formData.append(0, e.target.files[0]);
      dispatch(addBanner({ formData, bannerImages }));
    },
    delBanner: (e, index) => {
      const tempImg = [...bannerImages];
      if (index > -1) {
        tempImg.splice(index, 1);
        dispatch(updateConfig(tempImg, "bannerImages", "UPDATE_BANNER"));
      } else {
        throw new Error("Check Add Item.jsx Image Handler");
      }
    },
  };

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.heading}>
          Banner Images
        </Typography>
        <Grid container spacing={1}>
          {bannerImages &&
            bannerImages.map((img, i) => {
              const src = `${imageSrcRoute}/${img}`;
              return (
                <Grid item xs={12} sm={3} key={i}>
                  <ImageDisplay
                    imgSrc={src}
                    imgHeight={150}
                    imgRmv={(e) => handleChange.delBanner(e, i)}
                  />
                </Grid>
              );
            })}

          <Grid item xs={12} sm={3}>
            <ImageInput
              id="banner"
              handleChange={handleChange.addBanner}
              cardHeight={150}
              cardMediaHeight={120}
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <Divider />
      <div>
        <Typography variant="h5" className={classes.heading}>
          Featured Product Items
        </Typography>

        <DynamicImport
          items={featured}
          onInputEntry={handleChange.add}
          onEntryDelete={handleChange.del}
          name="featured"
        />
      </div>
      <Divider />
      <div>
        <Typography variant="h5" className={classes.heading}>
          Best Value Product Items
        </Typography>
        <DynamicImport
          items={bestValue}
          onInputEntry={handleChange.add}
          onEntryDelete={handleChange.del}
          name="bestValue"
        />
      </div>
      <Divider />
      <div>
        <Typography variant="h5" className={classes.heading}>
          Popular Product Items
        </Typography>
        <DynamicImport
          items={popular}
          onInputEntry={handleChange.add}
          onEntryDelete={handleChange.del}
          name="popular"
        />
      </div>
      <Divider />
    </div>
  );
}

export default Display;
