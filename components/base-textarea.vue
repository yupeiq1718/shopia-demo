<script setup lang="ts">
interface Props {
  title: string
  value: string,
  disabled: boolean
}

interface Emits {
  (event: 'update:value', value: string): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()
</script>

<template>
  <div class="relative mb-4">
    <label for="email" class="leading-7 text-sm text-gray-400">{{ props.title }}</label>
    <textarea
      id="email"
      name="email"
      class="w-full bg-gray-800 rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      :value="props.value"
      :disabled="props.disabled"
      @input="emits('update:value', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
