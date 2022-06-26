import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import OneOrder from "./OneOrder";

import StyledChip from "./StyledChip";

import { dateFromObjectId } from "../../utils";
import fetchy from "../../utils/fetchy";

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    background: "green",
    color: "white",
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      background: "#eee",
    },
  },
}));

const Orders = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(false);

  const { ordersData } = useSelector((state) => state);

  const classes = useStyles();
  const toggleModal = () => {
    setSelectedRow(false);
  };

  useEffect(() => {
    fetchy(`/api/v1/orders`, "POST").then(({ success, data }) => {
      if (success) {
        console.log("orders", data);
        dispatch({ type: "POPULATE_ORDERS", payload: data });
      }
    });
  }, []);

  return (
    <div>
      {selectedRow._id && (
        <OneOrder
          row={selectedRow}
          toggleModal={toggleModal}
          open={!!selectedRow}
        />
      )}
      <Typography variant="h4" style={{ padding: 8 }}>
        Your Order Details
      </Typography>
      <Hidden smUp>
        {Object.values(ordersData).map((row, index) => (
          <Card key={index} style={{ marginBottom: 8 }}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {dateFromObjectId(row._id)}
              </Typography>
              <Typography variant="h5" component="h2">
                Status:{" "}
                <StyledChip
                  size="small"
                  status={row.status}
                  label={row.status}
                />
              </Typography>
              <Typography variant="body2" component="p">
                qty: {row.items.length}
              </Typography>
              <Typography variant="body2" component="p">
                Total: {row.total}
              </Typography>
              <Typography variant="body2" component="p">
                Grand Total: {row.grandTotal}
              </Typography>
              <Typography variant="body2" component="p">
                Paid: {row.payment ? "Yes" : "No"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={(e) => {
                  setSelectedRow(row);
                }}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Hidden>

      <Hidden xsDown>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Items </TableCell>
                <TableCell>Total</TableCell>
                <TableCell>GrandTotal</TableCell>
                <TableCell>Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(ordersData).map((row, index) => (
                <TableRow
                  className={classes.tableRow}
                  key={index}
                  onClick={(e) => {
                    setSelectedRow(row);
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{dateFromObjectId(row._id)}</TableCell>
                  <TableCell>
                    <StyledChip
                      size="small"
                      status={row.status}
                      label={row.status}
                    />
                  </TableCell>
                  <TableCell>{row.items.length}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.grandTotal}</TableCell>
                  <TableCell>{row.payment ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Hidden>
    </div>
  );
};

export default Orders;
