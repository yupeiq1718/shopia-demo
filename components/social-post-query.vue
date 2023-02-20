<script setup lang="ts">
import IconLoading from 'assets/icons/loading.svg'

interface Emits {
  (event: 'add-editor-content', value: string): void
}
const emits = defineEmits<Emits>()

const switchValue = ref('Input')
const description = ref('')

const socialPosts = ref<string[]>([])

const isLoading = ref(false)

const { createSocialPost } = useApi()

const generateSocialPost = async (text: string) => {
  isLoading.value = true
  const { response } = await createSocialPost(text)

  socialPosts.value.push(response.generated_text)
  description.value = ''
  switchValue.value = 'Output'
  isLoading.value = false
}

const removeSocialPost = (index:number) => {
  socialPosts.value.splice(index, 1)
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
      <BaseTextarea
        v-model:value="description"
        title="Describe your post (required)"
        :disabled="isLoading"
      />
      <br class="my-4">
      <button
        class="w-full text-white bg-green-500 border-0 py-4 px-6 focus:outline-none hover:bg-green-600 rounded text-lg flex justify-center"
        @click="generateSocialPost(description)"
      >
        <span v-if="isLoading" class="mx-2 animate-spin">
          <IconLoading />
        </span>
        <span v-else>Generate</span>
      </button>
    </article>
    <article
      v-if="switchValue === 'Output'"
      class="w-full flex-1 relative lg:overflow-auto"
    >
      <div class="absolute pr-4">
        <SocialPostCard
          v-for="(socialPost, index) of socialPosts"
          :key="socialPost"
          :title="socialPost"
          @add-editor-content="emits('add-editor-content', socialPost)"
          @remove-social-post="removeSocialPost(index)"
        />
      </div>
    </article>
  </section>
</template>
