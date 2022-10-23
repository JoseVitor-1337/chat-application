import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";
import EVENTS from "./config/events";
import { prismaClient } from "./database/prismaClient";

type IMessage = {
  userName: string;
  message: string;
  messages: ISendMessage[];
  roomId: number;
};

type ISendMessage = {
  userName: string;
  message: string;
  time: string;
};

type ICreateRoomType = {
  roomName: string;
};

type IRooms = {
  name: string;
};

let rooms: IRooms[] = [];

function socket({ io }: { io: Server }) {
  io.on("connection", (socket: Socket) => {
    socket.on(EVENTS.CLIENT.USER_LOGGED, (userName: string) => {
      prismaClient.user
        .findFirst({ where: { name: userName } })
        .then((response) => {
          if (!response) {
            prismaClient.user
              .create({ data: { name: userName } })
              .then(() => {});
          }

          prismaClient.room.findMany().then((rooms) => {
            socket.emit(EVENTS.SERVER.NEW_ROOM, rooms);
          });
        });
    });

    socket.on(EVENTS.CLIENT.SEND_DELETE_ROOM, (roomId: number) => {
      prismaClient.room.delete({ where: { id: roomId } }).then(() => {
        prismaClient.room.findMany().then((rooms) => {
          socket.broadcast.emit(EVENTS.SERVER.DELETE_ROOM, rooms);
        });
      });
    });

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }: ICreateRoomType) => {
      const roomId = uuidv4();

      rooms = [...rooms, { name: roomName }];

      prismaClient.room
        .create({ data: { roomId, name: roomName } })
        .then(({ id }) => {
          socket.join(String(id));

          prismaClient.room.findMany().then((rooms) => {
            socket.broadcast.emit(EVENTS.SERVER.NEW_ROOM, rooms);
            socket.emit(EVENTS.SERVER.NEW_ROOM, rooms);
          });

          prismaClient.message
            .findMany({ where: { roomId: id } })
            .then((messages) => {
              socket.emit(EVENTS.SERVER.JOINED_ROOMS, {
                roomId: id,
                messages,
              });
            });
        });
    });

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, userName }: IMessage) => {
        const date = new Date();

        const time = `${date.getHours()}:${date.getMinutes()}`;

        const newMessage = { message, time, userName, roomId };

        prismaClient.message
          .create({
            data: newMessage,
          })
          .then(() => {
            prismaClient.message
              .findMany({ where: { roomId } })
              .then((messages) => {
                socket
                  .to(String(roomId))
                  .emit(EVENTS.SERVER.ROOM_MESSAGE, messages);
              });
          });
      }
    );

    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(String(roomId));

      prismaClient.message.findMany({ where: { roomId } }).then((messages) => {
        socket.emit(EVENTS.SERVER.JOINED_ROOMS, { roomId, messages });
      });
    });
  });
}

export default socket;
