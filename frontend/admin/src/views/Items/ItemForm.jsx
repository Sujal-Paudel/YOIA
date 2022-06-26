import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Input,
  Grid,
  Chip,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Tooltip,
} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NativeSelect from "@material-ui/core/NativeSelect";

import { ImageDisplay, ImageInput } from "../../components/ImageDisplay";

import { filterFolderItems } from "../../utils/variables";
import styles from "./ItemForm.styles";
import noImage from "../../assets/img/noImage.png";

const useStyles = makeStyles(styles);

//Parent Component=> ./AddItem.jsx
const ItemForm = (props) => {
  const {
    itemLabels,
    handleChange,
    inputData,
    imageSrc,
    imageRemove,
    tagsArray,
    onTagDelete,
  } = props;

  const classes = useStyles();

  const FormInput = (key, index) => {
    return (
      <Grid container spacing={2} key={index} justify="center">
        <Grid item xs={12} sm={3}>
          <Typography
            variant="subtitle1"
            style={{ display: "flex", alignItems: "center" }}
          >
            {key.pascal}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {key.name === "tags" ? (
            <Tooltip title="Type and press Space to add a tag" arrow>
              <Input
                placeholder={key.pascal}
                name={key.name}
                value={inputData[key.name]}
                onChange={handleChange.formInput}
                fullWidth
                multiline={key.name === "description"}
              />
            </Tooltip>
          ) : key.name === "description" ? (
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Empty"
              rowsMin={3}
              style={{ width: "100%" }}
              name={key.name}
              value={inputData[key.name]}
              onChange={handleChange.formInput}
            />
          ) : key.name === "category" ? (
            <NativeSelect
              onChange={handleChange.formInput}
              inputProps={{
                name: key.name,
                value: inputData[key.name],
              }}
              fullWidth
            >
              <option disabled selected value="">
                -Select One-
              </option>
              {Object.values(filterFolderItems)
                .flat()
                .map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
            </NativeSelect>
          ) : (
            <Input
              placeholder={key.pascal}
              name={key.name}
              value={inputData[key.name]}
              onChange={handleChange.formInput}
              fullWidth
              multiline={key.name === "description"}
            />
          )}
          {key.name === "tags" &&
            tagsArray &&
            tagsArray.length > 0 &&
            tagsArray.map((tag, i) => (
              <Chip
                size="small"
                label={`${tag}`}
                color="primary"
                key={i}
                style={{ marginTop: 5, marginRight: 5 }}
                onDelete={() => onTagDelete(i)}
              />
            ))}
          <br />
        </Grid>
      </Grid>
    );
  };

  return (
    <form noValidate autoComplete="off">
      {itemLabels &&
        itemLabels.map(
          (key, index) =>
            key.name !== "image" && key.editable && FormInput(key, index)
        )}
      <br />
      <Grid container spacing={2}>
        {imageSrc.length > 0 &&
          imageSrc.map((img, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <ImageDisplay
                imgSrc={img}
                imgHeight={110}
                imgRmv={(e) => imageRemove(e, index)}
              />
            </Grid>
          ))}
        <Grid item xs={12} sm={4}>
          <ImageInput
            id="item"
            handleChange={(e) => handleChange.file(e)}
            cardHeight={110}
            cardMediaHeight={90}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;
