import { memo, useRef } from 'react'
import { Button, HStack, Input } from '@chakra-ui/react'

import { useSockets } from 'contexts/socket.context'
import EVENTS from 'configs/events'
import getCurrentHourFormatted from 'utils/getCurrentHourFormatted'

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

    onSetMessages([
      ...messages,
      { userName, message, time: getCurrentHourFormatted() },
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
