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
footer
  router-link.logo(
    :to='routes?.[0]'
  )
    img(
      :src='site.logo'
    )
  p.copyright {{ site.copyright }}
</template>

<style scoped lang='sass'>
@import '@/src/styles/variables.scss'

footer
  bottom: 0
  left: 0
  right: 0
  padding: 1em
  height: 4em
  position: fixed
  background-color: $brand-body-bg
  box-shadow: 0 0 0.5em 0 #000a
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
    background-color: $brand-body-bg
    border-top: 0.25em solid $brand-accent-a-fg
    border-radius: 0.5em
    box-shadow: 0 0 0.5em 0 transparentize($brand-body-fg, 0.5)
    img
      cursor: pointer
      width: 100%
      height: 100%
      padding: 10%
  .copyright
    color: $brand-body-fg
</style>
