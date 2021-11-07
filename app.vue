<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const description = useState('description')
    const title = computed(() => `Simple Blog ${description.value}`)
    useMeta({
      title: title,
    })

    return {
      description,
    }
  }
})
</script>