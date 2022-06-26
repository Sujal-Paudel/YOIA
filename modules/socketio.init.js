module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("made connection", socket.id);
    // socket.on("dataToServer", data => {
    //   console.log(data, socket.id);
    // });
  });
};
