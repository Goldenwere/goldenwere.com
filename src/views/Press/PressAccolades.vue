<script setup lang='ts'>
import type { Press } from '@/src/types/press'

const props = defineProps<{
  press: Press,
}>()
</script>

<template lang='pug'>
#accolades(
  v-if='press.articles || press.awards'
)
  section#awards(
    v-if='press.awards'
  )
    h3 Awards
    ul
      li(
        v-for='award in press.awards'
      )
        span {{ award.title }}
        span(
          v-if='award.link'
        )
          | &#32;(
          a.link(
            :href='award.link.href'
          ) {{ award.link.caption || award.link.href }}
          | )
  section#articles(
    v-if='press.articles'
  )
    h3 Articles
    ul
      li(
        v-for='article in press.articles'
      )
        .title
          span {{ article.title }}
        a.link(
          :href='article.link.href'
        ) {{ article.link.caption || article.link.href }}
</template>

<style scoped lang='sass'>

</style>
