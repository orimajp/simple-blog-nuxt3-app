<template>
  <div class="container">
    <Message
      severity="warn"
      v-if="existsMessage"
    >
      {{ message }}
    </Message>
    <EditForm
      v-else
      v-model:body="body"
      v-model:title="title"
      @cancelEdit='cancelEdit'
      @updateArticle='updateArticle'
      @deleteArticle='deleteArticle'
    />
  </div>
</template>

<script lang="ts">
import {ArticleResponse} from "~/models/ArticleResponse"

export default defineComponent({
  async setup() {
    const { params } = useRoute()
    const router = useRouter()

    const description = useState<string>('description')
    const message = ref('')
    const existsMessage = computed(() => message.value !== '')
    const pageTitle = computed(() => `[編集] ${form.title}`)
    const form = reactive({
      title: '',
      body: '',
    })

    if (params.articleid) {
      const { data } = await useFetch<string, ArticleResponse>(`/api/articles/${params.articleid}`, {
        baseURL: 'http://localhost:3001',
//        server: false,
      })
      console.log(data.value)
      if (!data.value) {
        message.value = '記事が見つかりません。'
      } else {
        form.title = data.value.title
        form.body = data.value.body
        description.value = data.value.title
        message.value = ''
      }
    } else {
      message.value = '記事IDが指定されていません。'
    }

    watch(
      () => pageTitle.value,
      (newVal) => {
        description.value = newVal
      }
    )

    const cancelEdit = () => {
      router.push(`/articles/${params.articleid}`)
    }

    const updateArticle = async () => {
      await $fetch(`/api/articles/${params.articleid}`, {
        baseURL: 'http://localhost:3001',
        method: 'PUT',
        body: form,
      })
      router.push('/')
    }

    const deleteArticle = async () => {
      await $fetch(`/api/articles/${params.articleid}`, {
        baseURL: 'http://localhost:3001',
        method: 'DELETE',
      })
      router.push('/')
    }

    return {
      message,
      existsMessage,
      ...toRefs(form),
      cancelEdit,
      updateArticle,
      deleteArticle,

    }
  }
})
</script>

<style>
</style>
