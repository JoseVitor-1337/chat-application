import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
} from '@chakra-ui/react'

const customTheme = {
  fonts: { body: 'Poppins', heading: 'Poppins' },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: '500',
      },
    },
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'blue.400',
        _dark: 'blue.200',
      },
      borderColor: {
        default: 'gray.200',
        _dark: 'gray.600',
      },
      light: {
        default: 'white',
        _dark: 'blackAlpha.900',
      },
      dark: {
        default: 'blackAlpha.900',
        _dark: 'white',
      },
    },
  },
}

const newTheme = extendTheme(
  customTheme,
  withDefaultSize({ size: 'sm' }),
  withDefaultColorScheme({ colorScheme: 'blue' })
)

export default newTheme
