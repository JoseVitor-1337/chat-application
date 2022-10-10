import { Grid } from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import Login from 'components/Login'
import RoomsContainer from 'components/Rooms'
import MessagesContainer from 'components/Messages'

export default function Home() {
  const { userName } = useSockets()

  if (!userName) return <Login />

  return (
    <Grid templateColumns={{ base: 'none', md: '50% 50%', lg: '30% 70%' }}>
      <RoomsContainer />
      <MessagesContainer />
    </Grid>
  )
}
