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

const addTitle = (title:string) => {
  titleList.value.push(title)
}

defineExpose({ addContent, addTitle })

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 mx-2 relative">
    <section
      v-if="switchValue === 'Input'"
      class="w-full relative lg:overflow-auto pr-2"
    >
      <p
        v-for="title of titleList"
        :key="title"
      >
        {{ title }}
      </p>
    </section>
    <section
      v-if="switchValue === 'Output'"
      class="h-[calc(100%-3rem)] bg-white"
    >
      <QuillEditor v-model:content="content" content-type="html" class="bg-white" />
    </section>
  </section>
</template>
