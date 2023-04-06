<script setup lang='ts'>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { fetchAndParseContent } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'
import GwHeader from '@/src/components/navigation/header/GwHeader.vue'
import GwFooter from '@/src/components/navigation/footer/GwFooter.vue'

const store = useStore()
const route = useRoute()
const content = reactive(store.home)

if (store.home === undefined) {
  fetchAndParseContent('/content/home.yml')
    .then((content) => {
      store.$patch({ home: content as any})
      console.log(store.home)
    })
}
</script>

<template lang='pug'>
.content
  .about
    p(
      v-for='p in content.about'
      v-html='p'
    )
</template>

<style scoped lang='sass'>
.soon
  position: absolute
  top: 4em
  bottom: 4em
  left: 4em
  right: 4em
  display: flex
  justify-content: center
  align-items: center
</style>
