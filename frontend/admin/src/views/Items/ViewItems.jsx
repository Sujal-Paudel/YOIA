import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

// import ReactToPrint from "react-to-print";
import { makeStyle } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import OneItem from "./OneItem";
import FilterFunction from "../../components/FilterFunction";

import useCustomTable from "../../utils/useCustomTable";
import fetchy from "../../utils/fetchy";
import { camelToPascalCase } from "../../utils";

const useStyles = makeStyles(() => ({
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      background: "#eee",
    },
  },
}));

function ViewItems() {
  const componentRef = useRef();

  return (
    <div>
      <h3>Items</h3>
      {/* <ReactToPrint
        trigger={() => <Button color="primary">Print Items</Button>}
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

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [filter, setFilter] = useState({ key: "itemName", input: "" });

  const { itemsData } = useSelector((state) => state);

  const classes = useStyles();

  const {
    sorted,
    customSort,
    sortConfig,
    filtered,
    customFilter,
  } = useCustomTable(Object.values(itemsData));

  const displayData = filter.input ? filtered : sorted;

  React.useEffect(() => {
    customFilter(filter.input, filter.key);
  }, [filter]);

  function deleteItem(_id, itemName) {
    const sure = window.confirm("Delete this Item?");
    if (sure) {
      fetchy(`/api/v1/admin/items`, "DELETE", { _id }).then(({ success }) => {
        if (success) {
          dispatch({ type: "DELETE_ITEMS_DATA", payload: _id });
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "success",
              message: `${itemName} is deleted successfully`,
            },
          });
        }
      });
    }
  }

  const handleChange = {
    filterFunction: (e) => {
      const { name, value } = e.currentTarget;
      setFilter({ ...filter, [name]: value });
    },
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const tableHead = [
    "itemCode",
    "itemName",
    "category",
    "inventory",
    "rate",
    "marketRate",
    "minOrder",
  ];
  return (
    <Paper>
      {selectedRow.itemName && (
        <OneItem row={selectedRow} toggleModal={toggleModal} open={open} />
      )}
      <FilterFunction
        filter={filter}
        handleChange={handleChange.filterFunction}
        tableHead={tableHead}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            {tableHead.map((head) => (
              <TableCell
                onClick={() => customSort(head)}
                key={head}
                style={{ cursor: "pointer" }}
              >
                {camelToPascalCase(head)}
                {sortConfig.key === head &&
                  (sortConfig.ascending ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  ))}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.map((row, index) => (
            <TableRow
              className={classes.tableRow}
              key={index}
              onClick={(e) => {
                if (e.ctrlKey) {
                  //Ctrl + click
                  deleteItem(row._id, row.itemName);
                } else {
                  toggleModal();
                  setSelectedRow(row);
                }
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <Tooltip title="Ctrl +Click to delete" arrow>
                <TableCell>{row.itemName}</TableCell>
              </Tooltip>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.inventory}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.marketRate}</TableCell>
              <TableCell>{row.minOrder}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ViewItems;
