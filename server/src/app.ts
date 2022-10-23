import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import socket from "./socket";
import logger from "./utils/logger";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", () => {
  logger.info("Server is running");
});

httpServer.listen(port, host, () => {
  logger.info("Server is listening");

  socket({ io });
});
