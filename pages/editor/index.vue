<template>
  <EditForm
    :newArticle="true"
    v-model:body="body"
    v-model:title="title"
    @registerArticle='registerArticle'
    @cancelEdit='cancelEdit'
  />
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const form = reactive({
      title: '',
      body: ''
    })

    const router = useRouter()

    const cancelEdit = () => {
      router.push('/')
    }

    const registerArticle = async () => {
      console.log(form)
      try {
        await $fetch('/api/articles', {
          baseURL: 'http://localhost:3001',
          method: 'POST',
          body: form,
        })
        await router.push('/')
      } catch (e) {
        console.log('投稿エラー')
        console.log(e)
      }
    }

    return {
      ...toRefs(form),
      cancelEdit,
      registerArticle,
    }

  }
})
</script>

<style>
</style>
