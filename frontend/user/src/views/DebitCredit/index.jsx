import React from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import AddDebitCredit from "./AddDebitCredit";

function DebitCredit() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { languageData, debitData, creditData } = useSelector((state) => state);
  const [isDebit, isCredit] = [
    useRouteMatch("/account/debit"),
    useRouteMatch("/account/credit"),
  ];

  const entries = (isDebit ? debitData : creditData).reduce((a, e) => {
    return {
      ...a,
      [e.partyName]: e.total + (a[e.partyName] || 0),
    };
  }, {});

  const handleClick = {
    gotoOneParty: (partyName) => {
      history.push(`${pathname}/${partyName}`);
    },
  };
  console.log(entries);

  return (
    <div>
      {isDebit && (
        <div>
          <AddDebitCredit accountType="debit" />
        </div>
      )}
      {isCredit && (
        <div>
          <AddDebitCredit accountType="credit" />
        </div>
      )}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{languageData["S.No."]}</TableCell>
              <TableCell>{languageData["Party Name"]}</TableCell>
              <TableCell>{languageData["Total"]}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(entries).map((row, key) => (
              <TableRow
                key={key}
                onClick={() => {
                  handleClick.gotoOneParty(row);
                }}
              >
                <TableCell>{key + 1}</TableCell>
                <TableCell>{row}</TableCell>
                <TableCell>{entries[row]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default DebitCredit;
