import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import ReactToPrint from "react-to-print";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import StyledChip from "./StyledChip";
import OneOrder from "./OneOrder";

import fetchy from "../../utils/fetchy";
import { dateFromObjectId } from "../../utils";

const useStyles = makeStyles(() => ({
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      background: "#eee",
    },
  },
}));

function ViewOrders() {
  const componentRef = useRef();

  return (
    <div>
      <h3>Orders</h3>
      {/* <ReactToPrint
        trigger={() => <Button color="primary">Print Orders</Button>}
        content={() => componentRef.current}
      /> */}
      <div ref={componentRef}>
        <DisplayTable />
      </div>
    </div>
  );
}

function DisplayTable() {
  const dispatch = useDispatch();

  // const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { ordersData } = useSelector((state) => state);

  const classes = useStyles();

  function deleteOrder(_id) {
    const sure = window.confirm("Delete this order?");
    if (sure) {
      fetchy(`/api/v1/admin/orders`, "DELETE", { _id }).then(({ success }) => {
        if (success) {
          dispatch({ type: "DELETE_ORDERS_DATA", payload: _id });
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "success",
              message: `Order is deleted successfully`,
            },
          });
        }
      });
    }
  }

  const toggleModal = () => {
    setSelectedRow(false);
  };

  return (
    <Paper>
      {selectedRow._id && (
        <OneOrder
          row={selectedRow}
          toggleModal={toggleModal}
          open={selectedRow}
        />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Items Count</TableCell>
            <TableCell>Delivery</TableCell>
            <TableCell>Manual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(ordersData).map((row, index) => (
            <TableRow
              className={classes.tableRow}
              key={index}
              onClick={(e) => {
                if (e.ctrlKey) {
                  //Ctrl + click
                  deleteOrder(row._id);
                } else {
                  setSelectedRow(row);
                }
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <StyledChip
                  size="small"
                  data={row}
                  status={row.status}
                  label={row.status}
                />
              </TableCell>
              <Tooltip title="Ctrl + Click to delete">
                <TableCell>{dateFromObjectId(row._id)}</TableCell>
              </Tooltip>
              <Tooltip title="Ctrl +Click to delete" arrow>
                <TableCell>{row.username}</TableCell>
              </Tooltip>
              <TableCell>{row.items.length}</TableCell>
              <TableCell>{row.delivery?.condition}</TableCell>
              <TableCell>{row.flags && row.flags.manualEntry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ViewOrders;
