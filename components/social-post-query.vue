<script setup lang="ts">
import IconLoading from 'assets/icons/loading.svg'

const switchValue = ref('Input')
const description = ref('')

const socialPosts = ref<string[]>([])
const runtimeConfig = useRuntimeConfig()

const isLoading = ref(false)

const generateSocialPost = async (text: string) => {
  isLoading.value = true
  const { data } = await useLazyFetch(`${runtimeConfig.public.apiBase}?token=${runtimeConfig.public.apiToken}&writer=social posts&language=Chinese&input_1=${text}`, {
    method: 'POST'
  })
  type SocialPostResponse = {
    response: {
      generated_text: string
    }
  }
  socialPosts.value.push((data.value as SocialPostResponse)?.response.generated_text)
  description.value = ''
  switchValue.value = 'Output'
  isLoading.value = false
}

</script>

<template>
  <section class="lg:w-1/3 md:w-1/2 bg-gray-900 shadow-md rounded-lg p-8 flex flex-col md:mr-auto w-full relative z-10">
    <BaseSwitch
      v-model:value="switchValue"
      :title-list="['Input', 'Output']"
      class="mb-8"
    />
    <section
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
    </section>
    <section
      v-if="switchValue === 'Output'"
      class="w-full"
    >
      <SocialPostCard v-for="socialPost of socialPosts" :key="socialPost" :title="socialPost" />
    </section>
  </section>
</template>
