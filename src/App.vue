<script setup lang='ts'>
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { capitalizeFirstLetter } from '@/src/utilities/string'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'
import type { Site } from '@/src/types/site'
import GwHeader from '@/src/components/navigation/GwHeader.vue'
import GwFooter from '@/src/components/navigation/GwFooter.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

fetchAndParseYaml('/content/site.yml')
  .then(async (content) => {
    store.$patch({ site: content as Site })
    await router.isReady()
    document.title = `${capitalizeFirstLetter(route.name as string)} - ${store.site.name}`
    router.afterEach((to, from) => {
      nextTick(() => {
        document.title = `${capitalizeFirstLetter(to.name as string)} - ${store.site.name}`
      })
    })
  })
</script>

<template lang='pug'>
#entry
  GwHeader
  main
    router-view
  GwFooter
</template>

<style scoped lang='sass'>
#entry
  overflow: hidden
  z-index: 1
main
  top: 4em
  left: 0
  right: 0
  bottom: 4em
  overflow: auto
  position: absolute
  z-index: 0
</style>
