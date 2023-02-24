<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  articleTitle: string
}

const props = defineProps<Props>()

const switchValue = ref('Input')

const content = ref('')

const addContent = (text:string) => {
  const htmlText = `<p>${text}</p>`
  content.value = content.value.concat(htmlText)
}

const sectionTitleList = ref<string[]>([])

const createSectionTitle = (title:string) => {
  sectionTitleList.value.push(title)
}

const updateSectionTitle = ({ index, title }: {
  index: number,
  title: string
}) => {
  sectionTitleList.value[index] = title
}

const deleteSectionTitle = (index: number) => {
  sectionTitleList.value.splice(index, 1)
}

const switchSectionTitle = (firstIndex: number, secondIndex: number) => {
  if (!sectionTitleList.value[firstIndex] || !sectionTitleList.value[secondIndex]) {
    return
  }
  [sectionTitleList.value[firstIndex], sectionTitleList.value[secondIndex]] = [sectionTitleList.value[secondIndex], sectionTitleList.value[firstIndex]]
}

const generateArticle = () => {
  console.log('generateArticle')
}

defineExpose({ addContent, createSectionTitle })

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 mx-2 relative">
    <section
      v-if="switchValue === 'Input'"
      class="w-full relative lg:overflow-auto pr-2"
    >
      <ArticleWriterTitle
        v-for="(title, index) of sectionTitleList"
        :key="title"
        :title="title"
        :index="index"
        @save="updateSectionTitle({ index, title: $event})"
        @delete="deleteSectionTitle(index)"
        @switch-up="switchSectionTitle(index, index - 1)"
        @switch-down="switchSectionTitle(index, index + 1)"
      />
      <button
        class="w-full text-white bg-green-500 border-0 py-4 px-6 focus:outline-none hover:bg-green-600 rounded text-lg flex justify-center"
        @click="generateArticle"
      >
        <span v-if="false" class="mx-2 animate-spin">
          <IconLoading />
        </span>
        <span v-else>Generate Article</span>
      </button>
    </section>
    <section
      v-if="switchValue === 'Output'"
      class="h-[calc(100%-3rem)] bg-white"
    >
      <QuillEditor v-model:content="content" content-type="html" class="bg-white" />
    </section>
  </section>
</template>
