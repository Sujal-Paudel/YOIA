import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Alert from "../../components/Alert";
import AddLedger from "./AddLedger";

import fetchy from "../../utils/fetchy";
import { camelToPascalCase } from "../../utils";

function Ledger() {
  const dispatch = useDispatch();
  const { languageData, ledgerData } = useSelector((state) => state);
  const [alert, setAlert] = useState({ open: false, data: null });

  const handleClick = {
    deleteEntry: (_id) => {
      fetchy(`/api/v1/accounting/ledger`, "DELETE", { _id }).then(
        ({ success, data }) => {
          console.log(data);
          if (success) {
            dispatch({
              type: "DELETE_LEDGER_DATA",
              payload: _id,
            });
            dispatch({
              type: "SET_SNACKBAR",
              payload: {
                type: "success",
                message: `Deleted Successfully`,
              },
            });
          }
        }
      );
    },
    openAlert: (item) => {
      setAlert({ open: true, data: item });
    },
    closeAlert: () => {
      setAlert({ open: false, data: null });
    },
    choice: (remove) => {
      if (remove) handleClick.deleteEntry(alert.data._id);
      setAlert({ open: false, data: null });
    },
  };

  const tableHead = [
    "date",
    "saleAmount",
    "withdrawAmount",
    "loanAmount",
    "profitAmount",
    "totalAmount",
  ];

  return (
    <div>
      <Alert
        titleMessage={`Remove ledger entry`}
        subMessage={`Entry of ${moment(alert.data?.date).format(
          "ddd YYYY/MM/DD"
        )} will be deleted Permanently.`}
        choice1="Don't remove"
        choice2="Remove"
        open={alert.open}
        handleClick={handleClick}
      />

      <AddLedger />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((head) => (
                <TableCell key={head} style={{ cursor: "pointer" }}>
                  {languageData[camelToPascalCase(head)]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ background: "#eee" }}>
              <TableCell>SUM</TableCell>
              <TableCell>
                {ledgerData.reduce((a, e) => a + +e.saleAmount, 0)}
              </TableCell>
              <TableCell>
                {ledgerData.reduce((a, e) => a + +e.withdrawAmount, 0)}
              </TableCell>
              <TableCell>
                {ledgerData.reduce((a, e) => a + +e.loanAmount, 0)}
              </TableCell>
              <TableCell>
                {ledgerData.reduce((a, e) => a + +e.profitAmount, 0)}
              </TableCell>
              <TableCell>
                {ledgerData.reduce((a, e) => a + +e.totalAmount, 0)}
              </TableCell>
            </TableRow>

            {ledgerData.map((row, key) => (
              <TableRow
                key={key}
                onClick={() => {
                  handleClick.openAlert(row);
                }}
              >
                <TableCell>
                  {moment(row.date).format("ddd YYYY/MM/DD")}
                </TableCell>
                <TableCell>{row.saleAmount || 0}</TableCell>
                <TableCell>{row.withdrawAmount || 0}</TableCell>
                <TableCell>{row.loanAmount || 0}</TableCell>
                <TableCell>{row.profitAmount || 0}</TableCell>
                <TableCell>{row.totalAmount || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Ledger;
