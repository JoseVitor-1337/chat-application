import { memo, useRef } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import EVENTS from 'configs/events'

export default function RoomHeader() {
  const { socket, userName } = useSockets()

  const newRoomRef = useRef<HTMLInputElement | null>(null)

  function handleCreateRoom() {
    if (!newRoomRef.current) return

    const roomName = newRoomRef.current.value

    if (!roomName) return

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName: roomName.trim() })

    newRoomRef.current.value = ''
  }

  return (
    <Box p={2}>
      <Heading fontWeight="500" color="primary" size="md">
        {userName}
      </Heading>
      <FormControl mb={2}>
        <FormLabel htmlFor="room">Novo grupo</FormLabel>
        <Input id="room" ref={newRoomRef} />
      </FormControl>
      <Button minWidth="100%" onClick={handleCreateRoom}>
        Criar novo grupo
      </Button>
    </Box>
  )
}
