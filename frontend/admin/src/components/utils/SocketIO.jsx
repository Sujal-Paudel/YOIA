import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";

const socketEndpoint = process.env.REACT_APP_SOCKETIO_ENDPOINT;

function SocketIO() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = socketIOClient(socketEndpoint);
    socket.on("NEW_ORDER", (data) => {
      dispatch({
        type: "SET_SNACKBAR",
        payload: {
          type: "success",
          message: "New Order has arrived.",
        },
      });
      dispatch({
        type: "UPDATE_ORDERS",
        payload: data,
      });
    });
  }, []);
}

export default SocketIO;
