import { FormEvent, memo, useRef } from 'react'
import {
  Box,
  Image,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

import ChatSvg from './assets/messenger.png'
import { useSockets } from 'contexts/socket.context'

function Login() {
  const userNameRef = useRef<HTMLInputElement | null>(null)
  const { userName, onSetUserName } = useSockets()

  const handleSetUserName = (event: FormEvent) => {
    event.preventDefault()

    const value = userNameRef.current?.value

    if (!value) return

    onSetUserName(value)

    localStorage.setItem('username', value)
  }

  return (
    <Center bg="primary" height="100vh">
      <Box
        p={4}
        bg={useColorModeValue('white', 'blue.600')}
        height="300px"
        width="400px"
        maxWidth="400px"
        rounded="lg"
      >
        <Stack as="form" onSubmit={handleSetUserName}>
          <Stack mb={8}>
            <Center>
              <Image src={ChatSvg.src} boxSize={14} />
            </Center>
            <Heading size="md" textAlign="center" fontWeight="normal">
              Escreva o seu nome e entre na roda de conversa online!
            </Heading>
          </Stack>

          <FormControl>
            <FormLabel>Nome do usuário</FormLabel>
            <Input defaultValue={userName} ref={userNameRef} />
          </FormControl>

          <Button type="submit">Entrar</Button>
        </Stack>
      </Box>
    </Center>
  )
}

export default memo(Login)
