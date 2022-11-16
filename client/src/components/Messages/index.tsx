import { memo, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import EVENTS from 'configs/events'

function MessagesContainer() {
  const { socket, messages, onSetMessages, roomId, userName } = useSockets()

  const containerRef = useRef<HTMLDivElement | null>(null)

  const inputMessageRef = useRef<HTMLInputElement | null>(null)

  const handleSendMessage = () => {
    const message = inputMessageRef.current?.value

    if (!message || !userName) return

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
      roomId,
      message,
      userName,
    })

    const date = new Date()

    onSetMessages([
      ...messages,
      { userName, message, time: `${date.getHours()}:${date.getMinutes()}` },
    ])

    if (inputMessageRef.current) inputMessageRef.current.value = ''
  }

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
          return (
            <Stack
              p={2}
              mb={4}
              marginLeft={userName === message.userName ? 'auto' : 0}
              maxWidth="35%"
              borderWidth="1px"
              borderColor="gray.200"
              bg="light"
              rounded="lg"
              key={message.message}
            >
              <Box>
                <Text color={useColorModeValue('blue.200', 'blue.400')}>
                  {userName === message.userName ? 'Você' : message.userName}
                </Text>
                <Text color={useColorModeValue('gray.400', 'gray.600')}>
                  {message.time}
                </Text>
              </Box>
              <Text>{message.message}</Text>
            </Stack>
          )
        })}
      </Box>

      <HStack
        height="60px"
        width="100%"
        spacing={4}
        p={4}
        borderTopWidth="1px"
        borderColor="borderColor"
      >
        <Input
          defaultValue=""
          placeholder="Digite sua mensagem"
          ref={inputMessageRef}
        />

        <Button onClick={handleSendMessage}>Enviar</Button>
      </HStack>
    </Flex>
  )
}

export default memo(MessagesContainer)
