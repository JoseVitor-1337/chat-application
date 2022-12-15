import { memo, useEffect, useRef } from 'react'
import { Box, Center, Flex, Heading, useColorModeValue } from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import MessageItem from './components/MessageItem'
import SendMessageFooter from './components/SendMessageFooter'

function MessagesContainer() {
  const { messages, roomId } = useSockets()

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [containerRef, messages])

  if (!roomId) {
    return (
      <Center>
        <Heading>Nenhum grupo selecionado</Heading>
      </Center>
    )
  }

  return (
    <Flex
      direction="column"
      height="100%"
      align="center"
      justify="space-between"
    >
      <Box
        ref={containerRef}
        bg={useColorModeValue('gray.100', 'gray.800')}
        width="100%"
        p={4}
        height="calc(100vh - 60px)"
        maxHeight="calc(100vh - 60px)"
        overflowY="auto"
      >
        {messages.map((message) => {
          return <MessageItem key={message.time} message={message} />
        })}
      </Box>

      <SendMessageFooter />
    </Flex>
  )
}

export default memo(MessagesContainer)
