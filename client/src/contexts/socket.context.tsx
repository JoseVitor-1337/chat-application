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

interface ContextProps {
  socket: Socket
  userName?: string
  roomId?: string
  rooms: string[]
  onSetUserName: (name: string) => void
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<ContextProps>({
  socket,
  rooms: [],
  onSetUserName: () => null,
})

type ISocketsProviderProps = {
  children: ReactElement
}

function SocketsProvider({ children }: ISocketsProviderProps) {
  const [userName, setUserName] = useState('')
  const [roomId, setRoomId] = useState('')
  const [rooms, setRooms] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  function onSetUserName(name: string) {
    setUserName(name)
  }

  useEffect(() => {
    const userName = localStorage.getItem('username')

    if (userName) setUserName(userName)

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    )
  }

  return (
    <SocketContext.Provider
      value={{ socket, userName, roomId, rooms, onSetUserName }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider
