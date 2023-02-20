<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const content = ref('')

const addContent = (text:string) => {
  const htmlText = `<p>${text}</p>`
  content.value = content.value.concat(htmlText)
}

defineExpose({ addContent })

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 mx-2 relative">
    <section class="h-[calc(100%-3rem)] bg-white">
      <QuillEditor v-model:content="content" content-type="html" class="bg-white" />
    </section>
  </section>
</template>
