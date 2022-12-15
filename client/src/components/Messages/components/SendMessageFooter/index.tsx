import { memo, useRef } from 'react'
import { Button, HStack, Input } from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import EVENTS from 'configs/events'

function MessagesContainer() {
  const { socket, messages, onSetMessages, roomId, userName } = useSockets()

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

  return (
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
  )
}

export default memo(MessagesContainer)
