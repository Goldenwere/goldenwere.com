<script setup lang='ts'>
import GwImage from '@/src/components/embeds/GwImage.vue'
import type { Press } from '@/src/types/press'

const props = defineProps<{
  press: Press,
}>()
</script>

<template lang='pug'>
header
  .banner(
    v-if='press.banner'
  )
    GwImage(
      :image='press.banner'
    )
  h1 {{ press.title }}
</template>

<style scoped lang='sass'>
.banner
  height: 4em
  width: auto
</style>
