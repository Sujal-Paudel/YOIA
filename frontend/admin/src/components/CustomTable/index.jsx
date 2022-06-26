import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      background: "#eee",
    },
  },
}));

//** TODO <Prajwal> For further optimization
const CustomTable = ({ tableHead }) => {
  const classes = useStyles();
  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableHead.map((head) => (
            <TableCell key={head}>{head}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{/* for further optimization */}</TableBody>
    </Table>
  );
};

export default CustomTable;
