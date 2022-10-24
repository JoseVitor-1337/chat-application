import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: true,
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
  },
})
