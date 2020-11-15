const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const route = require("./route/index");
const mongoConfig = require("./config/mongo");

dotenv.config();
mongoConfig.init();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState) {
        client.send(message);
      }
    });
  });
});

app.use("/", route);

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
