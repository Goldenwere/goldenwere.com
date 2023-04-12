<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useStore } from '@/src/store'
import { headerRoutes, homeRoute } from '@/src/router'
import GwImage from '@/src/components/embeds/GwImage.vue'

const store = useStore()

const routes = ref(headerRoutes)
const home = ref(homeRoute)
const site = reactive(store.site)
</script>

<template lang='pug'>
footer.primary-nav
  router-link.logo.nav(
    :to='home'
  )
    GwImage(
      v-if='site?.logo'
      :image='site.logo'
    )
  p.copyright {{ site.copyright }}
</template>

<style scoped lang='sass'>
.primary-nav
  bottom: 0
  left: 0
  right: 0
  padding: 1em
  height: 4em
  position: fixed
  background-color: var(--theme-modal-bg)
  display: flex
  justify-content: flex-start
  align-items: center
  z-index: 99
  flex-direction: row-reverse
  .logo
    cursor: pointer
    width: 5em
    height: 5em
    margin-bottom: 1em
    margin-left: auto
    background-color: var(--theme-modal-bg)
    padding: 1em
  .copyright
    color: var(--theme-modal-fg)
</style>
