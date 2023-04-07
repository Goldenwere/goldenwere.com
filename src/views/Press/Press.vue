<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from '@/src/store'
import { fetchAndParseContent } from '@/src/utilities/fetch'
import type { Press } from '@/src/types/press'
import GwImage from '@/src/components/embeds/GwImage.vue'

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
.content.press(
  v-if='ready'
)
  nav
    a(
      href='#description'
    ) Description
    a(
      v-if='press.videos'
      href='#videos'
    ) Videos
    a(
      v-if='press.videos'
      href='#images'
    ) Images
    a(
      v-if='press.videos'
      href='#branding'
    ) Branding
    a(
      v-if='press.articles || press.awards'
      href='#accolades'
    ) Accolades
    a(
      v-if='press.contact || press.credits'
      href='#contributors'
    ) Contributors
  article
    h1 {{ press.title }}
    .banner(
      v-if='press.banner'
    )
      GwImage(
        :image='press.banner'
      )
    section.factsheet
      h2 Fact Sheet
    .main
      section#description
        h2 Description
      section#videos(
        v-if='press.videos'
      )
        h2 Videos
      section#images(
        v-if='press.images'
      )
        h2 Images
      section#branding(
        v-if='press.branding'
      )
        h2 Branding
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
                | (
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
              h4 {{ article.title }}
              a.link(
                :href='article.link.href'
              ) {{ article.link.caption || article.link.href }}
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
                v-if='credit.link?.length === 1'
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
      section#disclaimer(
        v-if='press.disclaimer'
      )
        p(
          v-for='p in press.disclaimer'
          v-html='p'
        )
</template>

<style scoped lang='sass'>

</style>
