<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchAndParseContent } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'
import GwImage from '@/src/components/embeds/GwImage.vue'
import GwVideo from '@/src/components/embeds/GwVideo.vue'
import type { Home } from '@/src/types/home'

const store = useStore()
const route = useRoute()
const content = reactive(store.home)
const site = reactive(store.site)
const ready = ref(false)

if (store.home.about === undefined) {
  fetchAndParseContent('/content/home.yml')
    .then((content) => {
      store.$patch({ home: content as Home })
      ready.value = true
    })
} else {
  ready.value = true
}
</script>

<template lang='pug'>
.content.home(
  v-if='!!ready'
)
  h1.title {{ site.name }}
  .lander
    GwVideo.lander-video(
      v-if='content.landingVideo'
      :video='content.landingVideo'
      fullscreen='false'
    )
    .lander-content
      p(
        v-for='p in content.landing'
        v-html='p'
      )
  section.about
    h2 About
    p(
      v-for='p in content.about'
      v-html='p'
    )
    GwImage.about-image(
      :image='content.logo'
    )
</template>

<style scoped lang='sass'>
h1
  text-align: center
  margin: 1em 0 0
  font-size: 2em
  color: var(--theme-accent-b-fg)
.lander
  width: 100vmin
  margin: 2em auto
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
  .about-image
    height: 10em
</style>
