<script setup lang="ts">
import IconDelete from 'assets/icons/delete.svg'
import IconPlay from 'assets/icons/play.svg'

interface Props {
  title: string
}

interface Emits {
  (event: 'add-editor-content'): void
  (event: 'remove-social-post'): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

</script>

<template>
  <div class="bg-gray-800 rounded border border-gray-700 pt-4 px-4 mb-4">
    <p class="mb-4 text-gray-400 text-md">
      {{ props.title }}
    </p>
    <span class="inline-flex w-full justify-end">
      <a class="text-gray-500">
        <IconDelete
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="emits('remove-social-post')"
        />
      </a>
      <a class="text-gray-500">
        <IconPlay
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="emits('add-editor-content')"
        />
      </a>
    </span>
  </div>
</template>
