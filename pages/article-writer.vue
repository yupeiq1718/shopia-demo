<script setup lang="ts">
import ArticleWriterEditor from '@/components/article-writer-editor.vue'

const editor = ref<InstanceType<typeof ArticleWriterEditor> | null>(null)

const articleTitle = ref('')

const setArticleTitle = (text: string) => {
  articleTitle.value = text
}

</script>

<template>
  <div class="container grid grid-cols-12 px-4 py-4 lg:py-8 mx-auto lg:overflow-hidden">
    <ArticleWriterQuery
      class="col-span-12 lg:col-span-5 m-2 overflow-hidden"
      @add-section-title="editor?.createSectionTitle"
      @set-article-aitle="setArticleTitle"
    />
    <ArticleWriterEditor
      ref="editor"
      :article-title="articleTitle"
      class="col-span-12 lg:col-span-7 m-2 overflow-hidden"
    />
  </div>
</template>
