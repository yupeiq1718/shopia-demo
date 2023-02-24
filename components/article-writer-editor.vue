<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import IconLoading from 'assets/icons/loading.svg'

interface Props {
  articleTitle: string
}

const props = defineProps<Props>()

const switchValue = ref('Outline')

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

const content = ref('')

const addContent = (text: string) => {
  const htmlText = `<p>${text}</p>`
  content.value = content.value.concat(htmlText)
}

const { createArticleHeader, createArticleSection, createArticleFooter } = useApi()

const isLoading = reactive({
  article: false
})

const generateArticle = async () => {
  isLoading.article = true
  addContent(`<h1>${props.articleTitle}</h1>`)

  const titleListString = sectionTitleList.value.join('\n')
  const responseHeader = await createArticleHeader(titleListString)
  const header = responseHeader.response.generated_text
  addContent(`<h2><strong>介紹</strong></h2><br><p>${header}</p>`)

  sectionTitleList.value.forEach(async (title) => {
    const responseSection = await createArticleSection(title)
    const section = responseSection.response.generated_text
    addContent(`<h2><strong>${title}</strong></h2><br><p>${section}</p>`)
  })

  const responseFooter = await createArticleFooter(header)
  const footer = responseFooter.response.generated_text
  addContent(`<h2><strong>結論</strong></h2><br><p>${footer}</p>`)

  isLoading.article = false
}

defineExpose({ createSectionTitle })

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 mx-2 flex flex-col justify-start">
    <header class="flex flex-col">
      <BaseSwitch
        v-model:value="switchValue"
        :title-list="['Outline', 'Content']"
        class="mb-8"
      />
    </header>
    <article
      v-if="switchValue === 'Outline'"
      class="w-full relative lg:overflow-auto pr-2"
    >
      <header class="border border-gray-800 rounded bg-gray-800 text-white text-xl text-center py-4 px-4 mb-4">
        {{ props.articleTitle }}
      </header>
      <article>
        <section class="border border-gray-800 rounded bg-gray-800 text-white  py-4 px-4 mb-4">
          {{ 'Introduction' }}
        </section>
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
      </article>
      <section class="border border-gray-800 rounded bg-gray-800 text-white  py-4 px-4 mb-4">
        {{ 'Conclusion' }}
      </section>
      <footer>
        <button
          class="w-full text-white bg-green-500 border-0 py-4 px-6 focus:outline-none hover:bg-green-600 rounded text-lg flex justify-center"
          @click="generateArticle"
        >
          <span v-if="isLoading.article" class="mx-2 animate-spin">
            <IconLoading />
          </span>
          <span v-else>Generate Article</span>
        </button>
      </footer>
    </article>
    <article
      v-if="switchValue === 'Content'"
      class="h-[calc(100%-8rem)] bg-white"
    >
      <QuillEditor v-model:content="content" content-type="html" class="bg-white" />
    </article>
  </section>
</template>
