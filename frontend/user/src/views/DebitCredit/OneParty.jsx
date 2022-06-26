import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";

import ModalDisplay from "./ModalDisplay";
import AddDebitCredit from "./AddDebitCredit";
import Alert from "../../components/Alert";
import CustomModal from "../../components/CustomModal";

import fetchy from "../../utils/fetchy";

function OneParty() {
  const { partyName } = useParams();
  const dispatch = useDispatch();
  const { languageData, debitData, creditData } = useSelector((state) => state);
  const [isDebit, isCredit] = [
    useRouteMatch("/account/debit"),
    useRouteMatch("/account/credit"),
  ];
  const [alert, setAlert] = useState({ open: false, data: null });
  const [modal, setModal] = useState({ open: false, data: null });

  const accountType = isDebit ? "debit" : "credit";

  const entriesOfParty = (isDebit ? debitData : creditData).filter(
    (e) => e.partyName === partyName
  );

  const handleClick = {
    deleteEntry: (_id) => {
      fetchy(`/api/v1/accounting/debitcredit`, "DELETE", {
        _id,
        accountType,
      }).then(({ success, data }) => {
        console.log(data);
        if (success) {
          dispatch({
            type: `DELETE_${accountType.toUpperCase()}_DATA`,
            payload: _id,
          });
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "success",
              message: `Deleted Successfully`,
            },
          });
        } else {
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "error",
              message: `Unsuccessful delete attempt. Please Try again. If the problem persist please contact the Mahaan Express team`,
            },
          });
        }
      });
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
      handleClick.toggleModal(false);
    },
    toggleModal: (e) => {
      setModal({ ...modal, open: e || !modal.open });
    },
  };

  return (
    <div>
      <Alert
        titleMessage={`Remove ${
          isCredit ? "Credit" : "Debit"
        } details of ${partyName}`}
        subMessage={`${partyName}'s  ${
          isCredit ? "Credit" : "Debit"
        } details of ${moment(alert.data?.date).format(
          "ddd YYYY/MM/DD"
        )} will be deleted Permanently.`}
        choice1="Don't remove"
        choice2="Remove"
        open={alert.open}
        handleClick={handleClick}
      />
      <CustomModal
        toggleModal={handleClick.toggleModal}
        open={modal.open}
        title={`Details of ${moment(modal.data?.date).format(
          "ddd YYYY/MM/DD"
        )}`}
        // btnText={`Add jpt`}
        // handleSubmit={}
      >
        <ModalDisplay data={modal.data} handleClick={handleClick} />
      </CustomModal>

      {isDebit && (
        <div>
          <AddDebitCredit accountType="debit" partyName={partyName} />
        </div>
      )}
      {isCredit && (
        <div>
          <AddDebitCredit accountType="credit" partyName={partyName} />
        </div>
      )}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{languageData["Date"]}</TableCell>
              <TableCell>{languageData["Party Name"]}</TableCell>
              <TableCell>{languageData["Items Count"]}</TableCell>
              <TableCell>{languageData["Total"]}</TableCell>
              <TableCell>{languageData["Detail"]}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entriesOfParty.map((row, key) => (
              <TableRow
                key={key}
                onClick={(e) => {
                  if (e.ctrlKey) {
                    handleClick.openAlert(row);
                  } else {
                    setModal({ open: true, data: row });
                  }
                }}
              >
                <TableCell>
                  {moment(row.date).format("ddd YYYY/MM/DD")}
                </TableCell>
                <TableCell>{row.partyName}</TableCell>
                <TableCell>{row.items?.length}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default OneParty;
