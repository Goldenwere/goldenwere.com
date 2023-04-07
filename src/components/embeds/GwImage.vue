<script setup lang='ts'>
import { defineProps } from 'vue'
import type { Image } from '@/src/types/embeds/image'

const props = defineProps<{
  image: Image
}>()
</script>

<template lang='pug'>
.container.image
  img(
    :src='image.src'
    :alt='image.alt'
  )
</template>

<style scoped lang='sass'>
.container
  display: flex
  width: 100%
  height: 100%
  img
    width: auto
    height: auto
    max-width: 100%
    max-height: 100%
    margin: auto
</style>
