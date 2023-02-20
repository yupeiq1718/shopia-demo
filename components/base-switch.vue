<script setup lang="ts">
interface Props {
  titleList: string[]
  value: string,
}

interface Emits {
  (event: 'update:value', value: string): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()
</script>

<template>
  <div class="my-4 flex mx-auto border-2 border-green-500 rounded overflow-hidden">
    <button
      v-for="(title, index) of titleList"
      :key="title"
      class="py-1 px-4 text-white focus:outline-none"
      :class="{ 'bg-green-500': props.value === props.titleList[index] }"
      @click="emits('update:value', props.titleList[index])"
    >
      {{ props.titleList[index] }}
    </button>
  </div>
</template>
