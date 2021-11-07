<template>
  <div v-html="nuxtApp.$mdit.render(source)" />
</template>

<script lang="ts">
export default defineComponent({
  props: {
    source: {
      type: String,
      default: '',
    }
  },
  setup() {
    const nuxtApp = useNuxtApp()
    return {
      nuxtApp,
    }
  }
})
</script>

<style scoped>
</style>
