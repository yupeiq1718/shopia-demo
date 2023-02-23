<script setup lang="ts">
import IconLoading from 'assets/icons/loading.svg'

const switchValue = ref('Input')
const description = ref('')
const articleTitle = ref('')

const setArticleTitle = (text: string) => {
  articleTitle.value = text
}

const titleList = ref<string[]>([])

const articleOutline = ref<string[]>([])

const isLoading = reactive({
  titleList: false,
  articleTitle: false
})

const { createArticleTitle, createArticleOutline } = useApi()

const generateArticleTitle = async (text: string) => {
  isLoading.titleList = true
  const { response } = await createArticleTitle(text)
  const data = response.generated_text.split('\n').map(title => title.split('. ')[1] || title)
  titleList.value = data
  isLoading.titleList = false
}
const generateArticleOutline = async (text: string) => {
  isLoading.articleTitle = true
  const { response } = await createArticleOutline(text)
  const data = response.generated_text.split('\n').map(title => title.split('. ')[1] || title)
  articleOutline.value = data
  description.value = ''
  titleList.value = []
  switchValue.value = 'Output'
  isLoading.articleTitle = false
}

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 ml-2 flex flex-col justify-start">
    <header class="flex flex-col">
      <BaseSwitch
        v-model:value="switchValue"
        :title-list="['Input', 'Output']"
        class="mb-8"
      />
    </header>
    <article
      v-if="switchValue === 'Input'"
      class="w-full relative lg:overflow-auto pr-2"
    >
      <header class="flex items-end">
        <BaseTextarea
          v-model:value="description"
          title="Describe your Article (required)"
          :disabled="isLoading.titleList"
          class="flex-1 mr-1"
        />
        <br class="my-4">
        <button
          class="text-white bg-green-500 border-0 py-5 px-2 m-2 focus:outline-none hover:bg-green-600 rounded text-lg flex justify-center items-center"
          @click="generateArticleTitle(description)"
        >
          <span v-if="isLoading.titleList" class="mx-2 animate-spin">
            <IconLoading />
          </span>
          <span v-else>Generate</span>
        </button>
      </header>
      <br class="my-4">
      <article>
        <button
          v-for="title of titleList"
          :key="title"
          class="text-white bg-gray-400 border-0 py-2 px-3 my-2 focus:outline-none hover:bg-green-600 rounded text-md flex justify-center items-center"
          @click="setArticleTitle(title)"
        >
          {{ title }}
        </button>
      </article>
      <br class="my-2">
      <footer>
        <BaseTextarea
          v-model:value="articleTitle"
          title="Describe your Article (required)"
          :disabled="isLoading.articleTitle"
          class="flex-1 mr-1"
        />
        <br class="my-2">
        <button
          class="w-full text-white bg-green-500 border-0 py-4 px-6 focus:outline-none hover:bg-green-600 rounded text-lg flex justify-center"
          @click="generateArticleOutline(description)"
        >
          <span v-if="isLoading.articleTitle" class="mx-2 animate-spin">
            <IconLoading />
          </span>
          <span v-else>Use As Title</span>
        </button>
      </footer>
    </article>
    <article
      v-if="switchValue === 'Output'"
      class="w-full relative lg:overflow-auto pr-2"
    >
      <ArticleWriterCard
        v-for="title of articleOutline"
        :key="title"
        :title="title"
      />
    </article>
  </section>
</template>
