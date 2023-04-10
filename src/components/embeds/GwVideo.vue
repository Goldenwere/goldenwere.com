<script setup lang='ts'>
import { computed, defineProps } from 'vue'
import type { Video } from '@/src/types/embeds/video'

const props = defineProps<{
  video: Video
  isBackground: boolean
}>()

const videoUrl = computed(() => {
  // uses videoId as playlistId to make youtube loop properly
  if (props.video.type === 'youtube') {
    const params = props.isBackground
      ? '&autoplay=1&disablekb=1&controls=0&loop=1&mute=1&modestbranding=1&fs=0&color=red&wmode=transparent'
      : ''
    return `https://www.youtube.com/embed/${props.video.id}?playlist=${props.video.id}${params}`
  } else {
    throw Error(`Currently unsupported video type: ${props.video.type}`)
  }
})
</script>

<template lang='pug'>
.container.video
  iframe(
    loading='lazy'
    :src='videoUrl'
    :class='{ "is-background": props.isBackground }'
    frameborder='0'
    allowfullscreen
  )
</template>

<style scoped lang='sass'>
.container
  aspect-ratio: 16/9
  iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    &.is-background
      pointer-events: none
</style>
