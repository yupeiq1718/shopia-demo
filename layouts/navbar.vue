<script setup lang="ts">
import IconLogo from 'assets/icons/logo.svg'
</script>

<template>
  <header class="text-gray-400 bg-gray-900 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
        <IconLogo class="fill-green-500" />
      </a>
      <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
        <NuxtLink class="mr-5 hover:text-white" to="/social-post">
          Social Post
        </NuxtLink>
        <NuxtLink class="mr-5 hover:text-white" to="/article-writer">
          Article Writer
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
