import { memo } from 'react'
import { Center, Stack, Text } from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'

import RoomItem from './components/RoomItem'
import RoomHeader from './components/RoomHeader'

function Rooms() {
  const { rooms } = useSockets()

  return (
    <Stack height="100%" borderRightWidth="1px" borderColor="borderColor">
      <RoomHeader />

      <Stack borderTopWidth="1px" borderColor="borderColor" spacing={0}>
        {rooms.length > 0 ? (
          <>
            {rooms.map(({ id, name }) => {
              return <RoomItem key={id} id={id} name={name} />
            })}
          </>
        ) : (
          <Center mt={4}>
            <Text>Não há nenhum grupo</Text>
          </Center>
        )}
      </Stack>
    </Stack>
  )
}

export default memo(Rooms)
