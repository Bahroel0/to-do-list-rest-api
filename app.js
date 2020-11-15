const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const dotenv = require("dotenv");
const route = require("./route/index");

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = [];

app.use(cors());

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    const payload = JSON.parse(message);
    if (payload.hasOwnProperty("connect")) {
      if (payload.connect) {
        if (![...users].filter((item) => item.id === payload.id).length) {
          ws.id = payload.id;
          users.push({
            id: payload.id,
            ws: ws,
          });
          wss.clients.forEach(function each(client) {
            if (client.readyState) {
              client.send(
                JSON.stringify({
                  ...payload,
                  connect: true,
                  id: payload.id,
                })
              );
            }
          });
        }
      }
    } else {
      wss.clients.forEach(function each(client) {
        if (client.readyState) {
          client.send(message);
        }
      });
    }
  });
  ws.on("close", () => {
    const close = [...users].filter((item) => item.ws.id === ws.id);
    if (close.length) {
      wss.clients.forEach(function each(client) {
        if (client.readyState) {
          client.send(
            JSON.stringify({
              connect: false,
              id: close[0].id,
            })
          );
        }
      });
    }
    users = [...users].filter((user) => {
      return user.ws.id !== ws.id;
    });
  });
});

app.get("/user/online", (req, res) => {
  return res.json(users);
});

app.use("/", route);

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
