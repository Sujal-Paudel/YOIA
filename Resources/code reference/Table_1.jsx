import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Divider
} from "@material-ui/core";

function DisplayTable() {
  const attendanceData = useSelector(state => state.attendanceData);

  return (
    <Paper className="daily_report">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>ID No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Entry Time</TableCell>
            <TableCell>Exit Time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((row, index) => (
            <TableRow
              key={index}
              onDoubleClick={e => {
                Array.from(
                  e.currentTarget.getElementsByTagName("td")
                ).pop().innerHTML = "Present*";
              }}
            >
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.rollId}</TableCell>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.entryTime}</TableCell>
              <TableCell>{row.exitTime}</TableCell>
              <TableCell>{row.duration}</TableCell>
              <TableCell>{row.attendance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const DailyReport = () => {
  const componentRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => <Button color="primary">Print Report</Button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
        {/* <TitleTable inputData={inputData} /> */}
        <DisplayTable />
      </div>
    </>
  );
};

export default DailyReport;
