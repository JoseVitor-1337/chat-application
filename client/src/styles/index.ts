import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const customTheme = {
  fonts: { body: 'Poppins', heading: 'Poppins' },
  semanticTokens: {
    colors: {
      primary: {
        default: 'blue.400',
        _dark: 'blue.900',
      },
    },
  },
}

const newTheme = extendTheme(
  customTheme,
  withDefaultColorScheme({ colorScheme: 'blue' })
)

export default newTheme
