const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const socketIO = require("socket.io");

const app = require("./app");
const socketioInit = require("./modules/socketio.init");

const server = http.createServer(app);

const io = socketIO.listen(server);
socketioInit(io);

app.io = io; // access "io" as "req.app.io" in routes

const port = process.env.PORT || process.env.PROJECT_PORT;
server.listen(port, () => {
  console.log("up and running " + port);
});
