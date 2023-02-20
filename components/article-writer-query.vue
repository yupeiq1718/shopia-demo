<script setup lang="ts">
import IconLoading from 'assets/icons/loading.svg'

const switchValue = ref('Input')
const description = ref('')

const titleList = ref<string[]>([])

const isLoading = ref(false)

const { createArticleTitle } = useApi()

const generateArticleTitle = async (text: string) => {
  isLoading.value = true
  const { response } = await createArticleTitle(text)
  const data = response.generated_text.split('\n').map(title => title.split('. ')[1] || title)
  titleList.value = data
  description.value = ''
  isLoading.value = false
}

</script>

<template>
  <section class="bg-gray-900 shadow-md rounded-lg p-8 mx-2 flex flex-col">
    <header class="flex flex-col">
      <BaseSwitch
        v-model:value="switchValue"
        :title-list="['Input', 'Output']"
        class="mb-8"
      />
    </header>
    <article
      v-if="switchValue === 'Input'"
      class="w-full"
    >
      <section class="flex items-end">
        <BaseTextarea
          v-model:value="description"
          title="Describe your Article (required)"
          :disabled="isLoading"
          class="flex-1 mr-1"
        />
        <br class="my-4">
        <button
          class="text-white bg-green-500 border-0 py-5 px-2 m-2 focus:outline-none hover:bg-green-600 rounded text-lg flex justify-center items-center"
          @click="generateArticleTitle(description)"
        >
          <span v-if="isLoading" class="mx-2 animate-spin">
            <IconLoading />
          </span>
          <span v-else>Generate</span>
        </button>
      </section>
      <br class="my-4">
      <section>
        <button
          v-for="title of titleList"
          :key="title"
          class="text-white bg-gray-400 border-0 py-2 px-3 my-2 focus:outline-none hover:bg-green-600 rounded text-md flex justify-center items-center"
        >
          {{ title }}
        </button>
      </section>
    </article>
  </section>
</template>
