import { memo } from 'react'
import {
  Box,
  Center,
  CloseButton,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import EVENTS from 'configs/events'

interface IRoomItemProps {
  id: number
  name: string
}

const Rooms: React.FC<IRoomItemProps> = ({ id, name }) => {
  const { socket, onSetRoomId, roomId } = useSockets()

  const isSelectedRoom = id === roomId

  function handleDeleteRoom(deletedRoomId: number) {
    socket.emit(EVENTS.CLIENT.SEND_DELETE_ROOM, deletedRoomId)
    onSetRoomId(0)
  }

  function handleJoinRoom(newRoomId: number) {
    if (newRoomId === roomId) return

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, newRoomId)
  }

  return (
    <HStack
      key={id}
      data-cy={name}
      p={2}
      justify="space-between"
      cursor="pointer"
      borderBottomWidth="1px"
      borderColor="borderColor"
    >
      <HStack color={isSelectedRoom ? 'primary' : 'dark'}>
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
            bg={isSelectedRoom ? 'primary' : 'transparent'}
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
}

export default memo(Rooms)
