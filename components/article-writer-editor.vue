<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const switchValue = ref('Input')

const content = ref('')

const addContent = (text:string) => {
  const htmlText = `<p>${text}</p>`
  content.value = content.value.concat(htmlText)
}

const titleList = ref<string[]>([])

const createTitle = (title:string) => {
  titleList.value.push(title)
}

const updateTitle = ({ index, title }: {
  index: number,
  title: string
}) => {
  titleList.value[index] = title
}

const deleteTitle = (index: number) => {
  titleList.value.splice(index, 1)
}

defineExpose({ addContent, createTitle })

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 mx-2 relative">
    <section
      v-if="switchValue === 'Input'"
      class="w-full relative lg:overflow-auto pr-2"
    >
      <ArticleWriterTitle
        v-for="(title, index) of titleList"
        :key="title"
        :title="title"
        :index="index"
        @save="updateTitle"
        @delete="deleteTitle"
      />
    </section>
    <section
      v-if="switchValue === 'Output'"
      class="h-[calc(100%-3rem)] bg-white"
    >
      <QuillEditor v-model:content="content" content-type="html" class="bg-white" />
    </section>
  </section>
</template>
