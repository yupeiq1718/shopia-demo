<script setup lang="ts">
import SocialPostEditor from '@/components/social-post-editor.vue'

const editor = ref<InstanceType<typeof SocialPostEditor> | null>(null)

</script>
<template>
  <div class="container grid grid-cols-6 px-4 py-2 lg:py-24 mx-auto lg:overflow-hidden">
    <SocialPostQuery
      class="col-span-6 lg:col-span-2 m-2 overflow-hidden"
      @add-editor-content="editor?.addContent"
    />
    <SocialPostEditor
      ref="editor"
      class="col-span-6 lg:col-span-4 m-2 overflow-hidden"
    />
  </div>
</template>
