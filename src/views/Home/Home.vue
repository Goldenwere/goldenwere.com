<script setup lang='ts'>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { fetchAndParseContent } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'
import GwVideo from '@/src/components/embeds/GwVideo.vue'

const store = useStore()
const route = useRoute()
const content = reactive(store.home)

if ((store.home as any).about === undefined) {
  fetchAndParseContent('/content/home.yml')
    .then((content) => {
      store.$patch({ home: content as any })
    })
}
</script>

<template lang='pug'>
.content
  .lander
    GwVideo.video(
      v-if='content.landingVideo'
      :video='content.landingVideo'
      fullscreen='false'
    )
    .lander-content
      p(
        v-for='p in content?.landing'
        v-html='p'
      )
  .about
    p(
      v-for='p in content?.about'
      v-html='p'
    )
</template>

<style scoped lang='sass'>
.lander
  width: 100vmin
  margin: 4em auto
  position: relative
  .lander-video
    filter: brightness(50%) contrast(115%)
  .lander-content
    font-family: var(--theme-font-display)
    font-size: 3em
    color: var(--theme-accent-a-bg)
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    text-shadow: 0 0 2px var(--theme-modal-bg)
    -webkit-text-stroke: 0.5px var(--theme-accent-a-fg)
.about
  width: 100vmin
  margin: 4em auto
</style>
