<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from '@/src/store'
import { fetchAndParseContent } from '@/src/utilities/fetch'
import type { Press } from '@/src/types/press'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const ready = ref(false)
const press = ref({} as Press)

const found = store.press.find((other) => other.id === props.id)
if (!found) {
  fetchAndParseContent(`/content/press/${props.id}.yml`)
    .then((content) => {
      store.$patch({ press: [
        ...store.press,
        {
          id: props.id,
          content: content as Press,
        },
      ]})
      press.value = content as Press
      ready.value = true
    })
} else {
  press.value = found.content
  ready.value = true
}
</script>

<template lang='pug'>

</template>

<style scoped lang='sass'>

</style>
