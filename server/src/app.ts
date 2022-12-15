import express, { response } from "express";
import { createServer, request } from "http";
import { Server } from "socket.io";
import cors from "cors";

import config from "config";
import socket from "./socket";
import logger from "./utils/logger";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

httpServer.listen(port, host, () => {
  logger.info(`Server is listening: ${port}`);

  socket({ io });
});
