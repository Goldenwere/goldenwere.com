<script setup lang='ts'>
import { computed, defineProps } from 'vue'
import type { Video } from '@/src/types/embeds/video'

const props = defineProps<{
  video: Video
}>()

const videoUrl = computed(() => {
  // uses videoId as playlistId to make youtube loop properly
  return `https://www.youtube.com/embed/${props.video.id}?autoplay=1&disablekb=1&controls=0&loop=1&playlist=${props.video.id}&mute=1&modestbranding=1&fs=0&color=red&wmode=transparent`
})
</script>

<template lang='pug'>
.container
  iframe(
    loading='lazy'
    :src='videoUrl'
    frameborder='0'
    allowfullscreen
  )
</template>

<style scoped lang='sass'>
.container
  padding-bottom: 56.25%
  iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 0
    object-fit: cover
    pointer-events: none
</style>
