import { Grid } from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import Login from 'components/Login'
import RoomsContainer from 'components/Rooms'
import MessagesContainer from 'components/Messages'

export default function Home() {
  const { userName } = useSockets()

  if (!userName) return <Login />

  return (
    <Grid
      height="100vh"
      width="100vw"
      templateColumns={{ base: 'none', md: '50% 50%', lg: '25% 75%' }}
      overflow="hidden"
    >
      <RoomsContainer />
      <MessagesContainer />
    </Grid>
  )
}
