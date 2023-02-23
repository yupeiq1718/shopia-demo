<script setup lang="ts">
import ArticleWriterEditor from '@/components/article-writer-editor.vue'

const editor = ref<InstanceType<typeof ArticleWriterEditor> | null>(null)

</script>

<template>
  <div class="container grid grid-cols-12 px-4 py-4 lg:py-8 mx-auto lg:overflow-hidden">
    <ArticleWriterQuery
      class="col-span-12 lg:col-span-5 m-2 overflow-hidden"
      @add-editor-title="editor?.addTitle"
    />
    <ArticleWriterEditor
      ref="editor"
      class="col-span-12 lg:col-span-7 m-2 overflow-hidden"
    />
  </div>
</template>
