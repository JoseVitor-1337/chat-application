import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import SocketsProvider from 'contexts/socket.context'
import theme from 'styles/index'

import 'configs/fonts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SocketsProvider>
        <Component {...pageProps} />
      </SocketsProvider>
    </ChakraProvider>
  )
}

export default MyApp
