<template>
  <div class="container">
    <Message
      severity="warn"
      v-if="existsMessage"
    >
      {{ message }}
    </Message>
    <div v-else class="content-block">
      <div class='content-title'>{{ article.title }}</div>
      <div class="markdown-body">
        <MarkdownIt :source="article.body" />
      </div>
      <div class="button-block">
        <Button @click="goEditPage">編集</Button>
      </div>
    </div>
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
    const article = reactive<ArticleResponse>({
      id: '',
      title: '',
      body: '',
    })

    if (params.articleid) {
      console.log(params.articleid)
      const { data } = await useFetch<string, ArticleResponse>(`/api/articles/${params.articleid}`, {
        baseURL: 'http://localhost:3001',
//        server: false,
      })
      console.log(data.value)
      if (!data.value) {
        message.value = '記事が見つかりません。'
      } else {
        article.id = data.value.id
        article.title = data.value.title
        article.body = data.value.body
        description.value = data.value.title
        message.value = ''
      }
    } else {
      message.value = '記事IDが指定されていません。'
    }

    const goEditPage = () => {
      router.push(`/editor/${params.articleid}`)
    }

    return {
      message,
      existsMessage,
      article,
      goEditPage,
    }
  }
})
</script>

<style>
.markdown-body p code {
  margin: 0;
}
.content-block {
  margin-top: 50px;
  margin-bottom: 50px;
}
.container {
  margin-top: 20px;
}
.content-title {
  font-size: 200%;
  margin-bottom: 20px;
}
/*
.markdown-body {
}
*/
</style>
