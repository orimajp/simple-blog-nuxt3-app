import { defineNuxtPlugin, useState } from '#app'
export default defineNuxtPlugin((nuxt) => {
  const description = useState<string>('description', () => '')
})
