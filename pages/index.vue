<template>
  <div class="container">
    <Message
      severity="warn"
      v-if="!existsList"
    >
      まだ記事が書かれていません。
    </Message>
    <DataTable v-else :value="articles" stripedRows responsiveLayout="scroll">
      <Column field="title" header="記事名" class="article-title" />
      <Column field="id" header="個別ページ">
        <template #body="slotProps">
          <NuxtLink :to="articleLink(slotProps.data.id)">リンク</NuxtLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import {ArticleListResponse} from "~/models/ArticleResponse";

interface ArticleListItem {
  id: string
  title: string
}

const PAGE_TITLE = '一覧'

export default defineComponent({
  async setup() {
    const list = reactive({
      articles: [] as Array<ArticleListItem>
    })

    const description = useState<string>('description')
    description.value = PAGE_TITLE

    const listLength = computed(() => articleList.value.articles.length)
    const existsList = computed(() => listLength.value !== 0)

    const { data: articleList } = await useFetch<string, ArticleListResponse>('/api/articles', {
      baseURL: 'http://localhost:3001',
    })

    list.articles = articleList.value.articles

    const articleLink = (id: string) => {
      console.log(`link=/articles/${id}`)
      return `/articles/${id}`
    }

    return {
      ...toRefs(list),
      existsList,
      articleLink,
    }
  }
})
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.article-title {
  cursor: pointer;
}
</style>
