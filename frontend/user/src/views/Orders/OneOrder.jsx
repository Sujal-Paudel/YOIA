import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import StyledChip from "./StyledChip";
import CustomModal from "../../components/CustomModal";

import { idToTicketNo, camelToPascalCase } from "../../utils/index";

import { defaultDisplayImage, imageSrcRoute } from "../../assets/img";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  productImage: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  header: {
    // padding: theme.spacing(2),
  },
  truncateName: {
    marginTop: theme.spacing(1, 0),
    overflow: "hidden",
    position: "relative",
    display: " -webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
}));

const OneOrder = (props) => {
  const { row, open, toggleModal } = props;

  const { itemsData } = useSelector((state) => state);

  const classes = useStyles();

  const labels = [
    ["address", "charge", "condition"],
    "status",
    "total",
    "grandTotal",
  ];
  const DataDisplay = ({ label, data }) => (
    <Grid container spacing={2} key={label}>
      <Grid item xs={12} sm={3}>
        <Typography
          variant="subtitle1"
          style={{ display: "flex", alignItems: "center" }}
        >
          {camelToPascalCase(label)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="subtitle1"
          style={{ display: "flex", alignItems: "center" }}
        >
          {label === "status" ? (
            <StyledChip size="small" status={data} label={data} />
          ) : (
            data
          )}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <CustomModal
      toggleModal={toggleModal}
      open={open}
      title={`Order ID : ${idToTicketNo(row._id)}`}
    >
      <form noValidate autoComplete="off">
        {labels.map((label, i) => {
          return typeof label === "object" ? (
            <div key={label}>
              <Typography variant="h6">Delivery</Typography>
              {label.map((each) => (
                <DataDisplay
                  label={each}
                  data={row.delivery && row.delivery[each]}
                  key={each}
                />
              ))}
              <hr />
            </div>
          ) : (
            <DataDisplay label={label} data={row[label]} key={label} />
          );
        })}
        <Grid container spacing={2} style={{ marginBottom: 16 }}>
          {row.items.map((item, i) => {
            return (
              <Grid item xs={12} sm={4} key={i}>
                <div className={classes.flexContainer}>
                  <img
                    src={`${
                      Object.values(itemsData).find(
                        (e) => e.itemCode === item.itemCode
                      )?.image[0]
                        ? imageSrcRoute +
                          "/" +
                          Object.values(itemsData).find(
                            (e) => e.itemCode === item.itemCode
                          )?.image[0]
                        : defaultDisplayImage
                    }`}
                    alt={item.itemName}
                    className={classes.productImage}
                  />
                </div>

                <Typography variant="body2" className={classes.truncateName}>
                  {item.itemName}
                </Typography>
                <Typography variant="caption">
                  Qty: Rs. {item.quantity}
                </Typography>
                <br />
                <Typography variant="caption">Rate: Rs. {item.rate}</Typography>
                <Typography variant="caption">
                  <br />
                  Total: Rs. {item.quantity * item.rate}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </form>
    </CustomModal>
  );
};

export default OneOrder;
