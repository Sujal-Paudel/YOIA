import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";

import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
// import ReactToPrint from "react-to-print";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { updateInventory } from "../../actions";

const useStyles = makeStyles(() => ({
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      background: "#eee",
    },
  },
}));

function Inventory() {
  const componentRef = useRef();
  return (
    <div>
      <h3>Inventory</h3>
      <div ref={componentRef}>
        <DisplayTable />
      </div>
    </div>
  );
}

function DisplayTable() {
  const dispatch = useDispatch();
  const { itemsData } = useSelector((state) => state);

  const classes = useStyles();

  const handleClick = {
    minus: (_id, inventory) => {
      inventory--;
      dispatch(
        updateInventory({
          data: { _id, inventory },
        })
      );
    },
    plus: (_id, inventory) => {
      inventory++;
      dispatch(
        updateInventory({
          data: { _id, inventory },
        })
      );
    },
  };

  const handleChange = {
    inventory: (_id, inventory) => {
      console.log(inventory);
      dispatch(
        updateInventory({
          data: { _id, inventory },
        })
      );
    },
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow style={{ textAlgin: "center" }}>
            <TableCell>S.No.</TableCell>
            <TableCell>Item Code</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell style={{ textAlign: "center" }}>Inventory</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(itemsData).map((row, index) => (
            <TableRow key={index} className={classes.tableRow}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <Tooltip title="Ctrl + Click To delete" arrow>
                <TableCell>{row.itemName}</TableCell>
              </Tooltip>
              <TableCell>{row.rate}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="subtract"
                  onClick={() => handleClick.minus(row._id, row.inventory)}
                  style={{ color: "black" }}
                >
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
                <TextField
                  defaultValue={row.inventory}
                  key={row.inventory}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleChange.inventory(row._id, e.target.value);
                    }
                  }}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  id="standard-number"
                  type="number"
                  style={{ width: 100 }}
                />
                <IconButton
                  aria-label="add"
                  onClick={() => handleClick.plus(row._id, row.inventory)}
                  style={{ color: "black" }}
                >
                  <AddCircleOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Inventory;
