import React from "react";
import moment from "moment";
import { Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const ModalDisplay = ({ data, handleClick }) => {
  const display = [
    { label: "Date", value: moment(data.date).format("ddd YYY/MM/DD") },
    { label: "Total", value: `Rs. ${data.total}` },
    { label: "Notes", value: data.notes },
  ];

  return (
    <form noValidate autoComplete="off">
      {display.map((each) => (
        <Grid container spacing={2} key={Math.random()}>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="subtitle1"
              style={{ display: "flex", alignItems: "center" }}
            >
              {each.label}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography
              variant="subtitle1"
              style={{ display: "flex", alignItems: "center" }}
            >
              {each.value}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <hr />
      <Typography
        variant="h6"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "underline",
          marginBottom: 8,
        }}
      >
        Items Details
      </Typography>

      <Grid container spacing={2}>
        {data.items.map((item, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Typography
              variant="subtitle1"
              style={{ display: "flex", alignItems: "center" }}
            >
              Item: {item.item}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ display: "flex", alignItems: "center" }}
            >
              Quantity: {item.qty}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ display: "flex", alignItems: "center" }}
            >
              Rate: {item.rate}
            </Typography>
          </Grid>
        ))}
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleClick.openAlert(data)}
        >
          Delete Entry
        </Button>
      </Grid>
    </form>
  );
};
export default ModalDisplay;
