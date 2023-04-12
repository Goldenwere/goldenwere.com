<script setup lang='ts'>
import type { Press } from '@/src/types/press'

const props = defineProps<{
  press: Press,
}>()
</script>

<template lang='pug'>
#contributors(
  v-if='press.contact || press.credits'
)
  section#credits(
    v-if='press.credits'
  )
    h2 Credits
    ul
      li(
        v-for='credit in press.credits'
      )
        .who
          span {{ credit.who }}
        .for(
          v-if='credit.for'
        )
          span {{ credit.for }}
        .links(
          v-if='credit.links?.length === 1'
        )
          a.link(
            :href='credit.links[0].href'
          ) {{ credit.links[0].caption || credit.links[0].href }}
        ul.links(
          v-else-if='credit.link?.length > 1'
        )
          li(
            v-for='link in credit.links'
          )
            a.link(
              :href='link.href'
            ) {{ link.caption || link.href }}
  section#contact(
    v-if='press.contact'
  )
    h2 Contact
    ul
      li(
        v-for='contact in press.contact'
      )
        .title(
          v-if='contact.title'
        ) 
          span {{ contact.title }}
        a.link(
          :href='contact.link.href'
        ) {{ contact.link.caption || contact.link.href }}
</template>

<style scoped lang='sass'>
#credits
  .who
    font-weight: bold
  .for
    font-style: italic
</style>
