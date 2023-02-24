<script setup lang="ts">
import IconDelete from 'assets/icons/delete.svg'
import IconPlay from 'assets/icons/play.svg'

interface Props {
  title: string
}

interface Emits {
  (event: 'add'): void
  (event: 'remove'): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

</script>

<template>
  <div class="bg-gray-800 rounded border border-gray-800 pt-4 px-4 mb-4">
    <p class="mb-2 text-gray-400 text-md">
      {{ props.title }}
    </p>
    <span class="inline-flex w-full justify-end">
      <a class="text-gray-500 ml-2">
        <IconDelete
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="emits('remove')"
        />
      </a>
      <a class="text-gray-500 ml-2">
        <IconPlay
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="emits('add')"
        />
      </a>
    </span>
  </div>
</template>
