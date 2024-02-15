// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    defaults: {
        VBtn: {
          color: 'primary',
          variant: 'outlined',
          rounded: true,
        },
      },
  })
  app.vueApp.use(vuetify)
})
