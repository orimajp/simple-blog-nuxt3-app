<template>
  <Toolbar>
    <template #left>
      <div class="brand">
        <NuxtLink to="/" class="brand-link">Simple Blog</NuxtLink>
      </div>
      <div class="nav-description">
        {{ description }}
      </div>
    </template>
    <template #right>
      <Button v-if="topPage" @click="goEditPage">新規作成</Button>
    </template>
  </Toolbar>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const route = useRoute()
    const topPage = computed(() => route.path === '/')
    const description = useState<string>('description')

    const router = useRouter()
    const goEditPage = () => {
      console.log('button click!')
      router.push('/editor')
    }

    return {
      topPage,
      description,
      goEditPage,
    }
  }
})
</script>
<style scoped>
.brand {
  padding: 9px;
  text-decoration: none;
}
.brand-link {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
