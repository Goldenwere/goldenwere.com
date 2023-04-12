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
header.primary-nav
  router-link.logo.nav(
    :to='home'
  )
    GwImage(
      v-if='site?.logo'
      :image='site.logo'
    )
  router-link.link.nav(
    v-for='route in routes'
    :to='route'
  ) {{ route.name }}
</template>

<style scoped lang='sass'>
.primary-nav
  top: 0
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
  .logo
    cursor: pointer
    width: 5em
    height: 5em
    margin-top: 1em
    margin-right: 3em
    background-color: var(--theme-modal-bg)
    padding: 1em
  .link
    font-size: 2em
    line-height: 2em
    margin-left: 1em
</style>
