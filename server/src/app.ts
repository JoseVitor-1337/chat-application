import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import config from "config";
import socket from "./socket";
import logger from "./utils/logger";
import { prismaClient } from "./database/prismaClient";

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

app.get("/", () => {
  logger.info("Server is running");
});

app.get("/rooms", async (request, response) => {
  try {
    const rooms = await prismaClient.room.findMany();

    return response.json({
      success: true,
      body: { rooms },
      message: "Listagem das salas de conversa",
    });
  } catch {
    return response.json({
      success: false,
      message: "Erro na listagem das salar",
    });
  }
});

httpServer.listen(port, host, () => {
  logger.info(`Server is listening: ${port}`);

  socket({ io });
});
