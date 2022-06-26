import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ReactToPrint from "react-to-print";
import AddClient from "./AddClient";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@material-ui/core";

import { dateFromObjectId } from "../../utils";
import fetchy from "../../utils/fetchy";

function Clients() {
  const componentRef = useRef();

  return (
    <div>
      <h3>Clients</h3>
      {/* <ReactToPrint
        trigger={() => <Button color="primary">Print Clients</Button>}
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
  const { clientsData } = useSelector((state) => state);

  const handleChange = {
    togglePaidUser: (user) => {
      fetchy(`/api/v1/admin/clients`, "PATCH", {
        username: user.username,
        paidUser: !user.paidUser,
      }).then(({ success, data }) => {
        console.log(data);
        if (success) {
          dispatch({
            type: "UPDATE_CLIENTS",
            payload: { [user._id]: { ...user, paidUser: !user.paidUser } },
          });
        }
      });
    },
    toggleSMS: (user) => {
      fetchy(`/api/v1/admin/clients`, "PATCH", {
        username: user.username,
        sendSMS: !user.sendSMS,
      }).then(({ success, data }) => {
        console.log(data);
        if (success) {
          dispatch({
            type: "UPDATE_CLIENTS",
            payload: { [user._id]: { ...user, sendSMS: !user.sendSMS } },
          });
        }
      });
    },
  };

  return (
    <Paper>
      <div className="App_content_buttons">
        <AddClient />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Member Since</TableCell>
            <TableCell>Paid User</TableCell>
            <TableCell>Send SMS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(clientsData).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{dateFromObjectId(row._id)}</TableCell>
              <TableCell>
                <Checkbox
                  checked={row.paidUser}
                  onChange={() => handleChange.togglePaidUser(row)}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={row.sendSMS}
                  onChange={() => handleChange.toggleSMS(row)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Clients;
