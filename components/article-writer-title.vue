<script setup lang="ts">
import IconEdit from 'assets/icons/edit.svg'
import IconDelete from 'assets/icons/delete.svg'
import IconUp from 'assets/icons/up.svg'
import IconDown from 'assets/icons/down.svg'
import IconCheck from 'assets/icons/Check.svg'

interface Props {
  title: string,
  index: number
}

interface Emits {
  (event: 'save', value: string): void,
  (event: 'delete'): void,
  (event: 'switch-up'): void
  (event: 'switch-down'): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const isEdit = ref(false)

const setIsEdit = (value: boolean) => {
  isEdit.value = value
}

const editedTitle = ref(props.title)

const saveEditedTitle = () => {
  emits('save', editedTitle.value)
  setIsEdit(false)
}

</script>

<template>
  <div class="border border-gray-800 rounded bg-gray-800 text-gray-400 pt-4 px-4 mb-4">
    <BaseInput
      v-model:value="editedTitle"
      type="text"
      :disabled="!isEdit"
      class="mb-2"
    />
    <span class="inline-flex w-full justify-end">
      <a class="text-gray-500 ml-2">
        <IconEdit
          v-if="!isEdit"
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="setIsEdit(true)"
        />
      </a>
      <a class="text-gray-500 ml-2">
        <IconDelete
          v-if="!isEdit"
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="emits('delete')"
        />
      </a>
      <a class="text-gray-500 ml-2">
        <IconUp
          v-if="!isEdit"
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="emits('switch-up')"
        />
      </a>
      <a class="text-gray-500 ml-2">
        <IconDown
          v-if="!isEdit"
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="emits('switch-down')"
        />
      </a>
      <a class="text-gray-500 ml-2">
        <IconCheck
          v-if="isEdit"
          class="fill-gray-400 cursor-pointer hover:fill-green-400"
          @click="saveEditedTitle"
        />
      </a>
    </span>
  </div>
</template>
