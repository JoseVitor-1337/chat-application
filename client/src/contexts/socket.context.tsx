import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import io, { Socket } from 'socket.io-client'
import { Center, Spinner } from '@chakra-ui/react'

import { SOCKET_URL } from 'configs/socket'
import EVENTS from 'configs/events'

export type IMessage = {
  userName: string
  message: string
  time: string
}

type IRooms = {
  id: number
  roomId: string
  name: string
}

interface ContextProps {
  socket: Socket
  userName?: string
  roomId?: number
  messages: IMessage[]
  rooms: IRooms[]
  onSetRoomId: (newRoomId: number) => void
  onSetMessages: (messages: IMessage[]) => void
  onSetUserName: (name: string) => void
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<ContextProps>({
  socket,
  messages: [],
  rooms: [],
  onSetRoomId: () => null,
  onSetMessages: () => null,
  onSetUserName: () => null,
})

type ISocketsProviderProps = {
  children: ReactElement
}

function SocketsProvider({ children }: ISocketsProviderProps) {
  const [userName, setUserName] = useState('')
  const [roomId, setRoomId] = useState(0)
  const [rooms, setRooms] = useState<IRooms[]>([])
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<IMessage[]>([])

  function onSetUserName(name: string) {
    setUserName(name)
  }

  function onSetRoomId(newRoomId: number) {
    setRoomId(newRoomId)
  }

  function onSetMessages(newMessages: IMessage[]) {
    setMessages(newMessages)
  }

  useEffect(() => {
    socket.on(EVENTS.SERVER.NEW_ROOM, (newRooms: IRooms[]) => {
      setRooms(newRooms)
    })

    socket.on(EVENTS.SERVER.NEW_ROOM, (newRooms: IRooms[]) => {
      setRooms(newRooms)
    })

    socket.on(
      EVENTS.SERVER.DELETE_ROOM,
      (room: { roomId: number; newRooms: IRooms[] }) => {
        console.log('room', room)
        console.log('roomId', roomId)

        if (room.roomId == roomId) setRoomId(0)

        setRooms(room.newRooms)
      }
    )

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, (allMessages: IMessage[]) => {
      setMessages(allMessages)
    })

    socket.on(EVENTS.SERVER.SEND_ROOMS, (rooms: IRooms[]) => {
      setRooms(rooms)
    })

    socket.on(
      EVENTS.SERVER.JOINED_ROOMS,
      ({ roomId, messages }: { roomId: number; messages: IMessage[] }) => {
        setRoomId(roomId)
        setMessages(messages)
      }
    )
  }, [socket])

  useEffect(() => {
    const userName = localStorage.getItem('username')

    if (userName) setUserName(userName)

    socket.emit(EVENTS.CLIENT.REQUEST_ROOMS)

    setLoading(false)
  }, [userName])

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    )
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        userName,
        roomId,
        rooms,
        onSetRoomId,
        onSetMessages,
        onSetUserName,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider
