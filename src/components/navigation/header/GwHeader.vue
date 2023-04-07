<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/src/store'

const router = useRouter()
const store = useStore()

const routes = ref(router.getRoutes())
const site = reactive(store.site)
</script>

<template lang='pug'>
header
  router-link.logo.nav(
    :to='routes?.[0]'
  )
    img(
      :src='site.logo'
    )
  router-link.link.nav(
    v-for='route in routes'
    :to='route'
  ) {{ route.name }}
</template>

<style scoped lang='sass'>
header
  top: 0
  left: 0
  right: 0
  padding: 1em
  height: 4em
  position: fixed
  background-color: var(--theme-body-bg)
  box-shadow: 0 0 0.5em 0 #000a
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
    background-color: var(--theme-body-bg)
    border-bottom: 0.25em solid var(--theme-accent-a-fg)
    border-radius: 0.5em
    box-shadow: 0 0 0.5em 0 var(--theme-body-fg)
    img
      cursor: pointer
      width: 100%
      height: 100%
      padding: 10%
  .link
    font-size: 2em
    line-height: 2em
</style>
