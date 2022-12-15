import { memo } from 'react'
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import { IMessage, useSockets } from 'contexts/socket.context'

interface IMessageItemProps {
  message: IMessage
}

const MessageItem: React.FC<IMessageItemProps> = ({ message }) => {
  const { userName } = useSockets()

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
}

export default memo(MessageItem)
