import { memo, useRef } from 'react'
import {
  Box,
  Button,
  Center,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import EVENTS from 'configs/events'

function Rooms() {
  const { socket, userName, rooms, roomId, onSetRoomId } = useSockets()

  const newRoomRef = useRef<HTMLInputElement | null>(null)

  function handleCreateRoom() {
    if (!newRoomRef.current) return

    const roomName = newRoomRef.current.value

    if (!roomName) return

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName: roomName.trim() })

    newRoomRef.current.value = ''
  }

  function handleDeleteRoom(deletedRoomId: number) {
    socket.emit(EVENTS.CLIENT.SEND_DELETE_ROOM, deletedRoomId)
    onSetRoomId(0)
  }

  function handleJoinRoom(newRoomId: number) {
    if (newRoomId === roomId) return

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, newRoomId)
  }

  return (
    <Stack height="100%" borderRightWidth="1px" borderColor="borderColor">
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

      <Stack borderTopWidth="1px" borderColor="borderColor" spacing={0}>
        {rooms.map(({ id, name }) => {
          const isCurrentRoom = id === roomId

          return (
            <HStack
              data-cy={name}
              p={2}
              justify="space-between"
              cursor="pointer"
              borderBottomWidth="1px"
              borderColor="borderColor"
            >
              <HStack color={isCurrentRoom ? 'primary' : 'dark'}>
                <Center
                  cursor="pointer"
                  height="20px"
                  width="20px"
                  rounded="full"
                  borderWidth="1px"
                  borderColor="primary"
                  onClick={() => handleJoinRoom(id)}
                  sx={{ '&:hover .circle': { bg: 'primary' } }}
                >
                  <Box
                    transition="all 250ms"
                    className="circle"
                    bg={isCurrentRoom ? 'primary' : 'transparent'}
                    rounded="full"
                    height="12px"
                    width="12px"
                  />
                </Center>
                <Text transition="all 250ms">{name}</Text>
              </HStack>

              <CloseButton
                data-cy={`delete_${name}`}
                onClick={() => handleDeleteRoom(id)}
                _hover={{
                  bg: useColorModeValue('red.400', 'red.800'),
                  color: 'light',
                }}
              />
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default memo(Rooms)
