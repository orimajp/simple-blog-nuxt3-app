<template>
  <div class='content-block'>
    <InputText
      v-model="editTitle"
      style="width: 100%;"
      placeholder="タイトルを入力してください"
    />
    <TabView>
      <TabPanel header="edit">
        <Textarea
          v-model="editBody"
          style="width: 100%;"
          :rows="20"
          placeholder="本文を入力してください"
        />
      </TabPanel>
      <TabPanel header="prev">
        <div class="markdown-body">
          <MarkdownIt :source="editBody" />
        </div>
      </TabPanel>
    </TabView>

    <div class="button-block">
        <div>
          <Button v-if="!newArticle" label="削除"  @click='executeDelete' />
        </div>
        <div style="float: right;">
          <div>
            <Button style="margin-right: 10px;" label="キャンセル"  @click='executeCancel' />
            <Button v-if="newArticle" label="登録"  @click='executeRegister' />
            <Button v-else label="更新"  @click='executeUpdate' />
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    newArticle: {
      type: Boolean,
      required: false,
      default: false,
    },
    title : {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    }
  },
  setup(prop, { emit }) {
    const editTitle = computed({
      get: () => prop.title,
      set: (value: string) => emit('update:title', value)
    })

    const editBody = computed({
      get: () => prop.body,
      set: (value: string) => emit ('update:body', value)
    })

    const executeRegister = () => {
      emit('registerArticle')
    }

    const executeUpdate = () => {
      emit('updateArticle')
    }

    const executeDelete = () => {
      emit('deleteArticle')
    }

    const executeCancel = () => {
      emit('cancelEdit')
    }

    return {
      editTitle,
      editBody,
      executeRegister,
      executeUpdate,
      executeDelete,
      executeCancel,
    }
  }

})
</script>

<style>
.alert-block, .content-block {
  margin-top: 50px;
  margin-bottom: 50px;
}
.markdown-body {
  padding: 20px;
}

.markdown-body code {
  margin: 0 -20px;
}
.markdown-body p code {
  margin: 0;
}

.button-block div {
  float:left;
}
</style>
