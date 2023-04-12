<script setup lang='ts'>
import { computed } from 'vue'
import type { Image } from '@/src/types/embeds/image'
import type { Video } from '@/src/types/embeds/video'
import GwImage from './GwImage.vue'
import GwVideo from './GwVideo.vue'

const props = defineProps<{
  elements: (Image | Video)[],
}>()

const elementsMapped = computed(() => {
  return props.elements.map((element) => {
    let type = ''
    if ((element as Image).alt !== undefined) {
      type = 'image'
    } else if ((element as Video).type !== undefined) {
      type = 'video'
    } else {
      throw Error('Unsupported media passed to gallery')
    }
    return {
      element,
      type,
    }
  })
})
</script>

<template lang='pug'>
.media-gallery
  .gallery-element(
    v-for='element in elementsMapped'

  )
    .gallery-image(
      v-if='element.type === "image"'
    )
      GwImage(
        :image='element.element'
      )
      p(
        v-if='element.element.caption'
      ) {{ element.element.caption }}
    .gallery-video(
      v-else-if='element.type === "video"'
    )
      GwVideo(
        :video='element.element'
        :is-background='false'
      )
      p(
        v-if='element.element.title'
      ) {{ element.element.title }}
</template>

<style scoped lang='sass'>
.media-gallery
  display: grid
  row-gap: 0.25em
  column-gap: 0.25em
  .gallery-element
    border: 1px solid var(--theme-body-border)
    padding: 0.5em
    display: flex
    flex-direction: column
    justify-content: flex-start
    .container
      position: relative
    p
      margin: auto
      text-align: center
    .image
      height: 8em
      width: 100%
</style>
