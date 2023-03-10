<script setup lang="ts">
import IconLoading from 'assets/icons/loading.svg'

interface Emits {
  (event: 'add-section-title', value: string): void,
  (event: 'set-article-title', value: string): void
}
const emits = defineEmits<Emits>()

const switchValue = ref('Input')
const description = ref('')
const editedArticleTitle = ref('')

const setEditedArticleTitle = (text: string) => {
  editedArticleTitle.value = text
}

const titleList = ref<string[]>([])

const articleOutline = ref<string[]>([])

const removeArticleOutlineTitle = (index: number) => {
  articleOutline.value.splice(index, 1)
}

const isLoading = reactive({
  titleList: false,
  editedArticleTitle: false
})

const { createArticleTitle, createArticleOutline } = useApi()

const generateArticleTitle = async (text: string) => {
  isLoading.titleList = true
  const { response } = await createArticleTitle(text)
  const data = response.generated_text.split('\n').map(title => title.split('. ')[1] || title)
  titleList.value = data
  isLoading.titleList = false
}
const generateSectionOutline = async (text: string) => {
  isLoading.editedArticleTitle = true
  emits('set-article-title', editedArticleTitle.value)
  const { response } = await createArticleOutline(text)
  const data = response.generated_text.split('\n').map(title => title.split('. ')[1] || title)
  articleOutline.value = data
  description.value = ''
  titleList.value = []
  switchValue.value = 'Output'
  isLoading.editedArticleTitle = false
}

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 mx-2 flex flex-col justify-start">
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
          @click="setEditedArticleTitle(title)"
        >
          {{ title }}
        </button>
      </article>
      <br class="my-2">
      <footer>
        <BaseTextarea
          v-model:value="editedArticleTitle"
          title="Describe your Article (required)"
          :disabled="isLoading.editedArticleTitle"
          class="flex-1 mr-1"
        />
        <br class="my-2">
        <button
          class="w-full text-white bg-green-500 border-0 py-4 px-6 focus:outline-none hover:bg-green-600 rounded text-lg flex justify-center"
          @click="generateSectionOutline(description)"
        >
          <span v-if="isLoading.editedArticleTitle" class="mx-2 animate-spin">
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
      <BaseCard
        v-for="(title, index) of articleOutline"
        :key="title"
        :title="title"
        @add="emits('add-section-title', title)"
        @remove="removeArticleOutlineTitle(index)"
      />
    </article>
  </section>
</template>
