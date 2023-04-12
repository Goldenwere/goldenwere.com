<script setup lang='ts'>
import type { Press } from '@/src/types/press'
import GwArticle from '@/src/components/embeds/GwArticle.vue'
import GwGallery from '@/src/components/embeds/GwGallery.vue'
import GwImage from '@/src/components/embeds/GwImage.vue'

const props = defineProps<{
  press: Press,
}>()
</script>

<template lang='pug'>
section#branding(
  v-if='press.branding'
)
  h2 Branding
  .download(
    v-if='press.branding.download'
  )
    a(
      :href='press.branding.download'
    )
      span Download all assets as a .zip
  GwGallery(
    :elements='press.branding.samples'
  )
  .guidelines(
    v-if='press.branding.guidelines'
  )
    GwArticle(
      :content='press.branding.guidelines'
    )
</template>

<style scoped lang='sass'>
.media-gallery
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  .gallery-element
    .image
      height: 8em
      width: 100%
</style>
