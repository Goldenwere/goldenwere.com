<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/src/store'
import { fetchAndParseContent } from '@/src/utilities/fetch'
import type { Press } from '@/src/types/press'
import GwArticle from '@/src/components/embeds/GwArticle.vue'
import GwImage from '@/src/components/embeds/GwImage.vue'
import GwVideo from '@/src/components/embeds/GwVideo.vue'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const route = useRoute()
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

function scrollTo (id: string) {
  document.getElementById(id)?.scrollIntoView()
}
</script>

<template lang='pug'>
.content.press(
  v-if='ready'
)
  nav
    router-link.nav.link(
      to='#description'
      @click.native='scrollTo("description")'
    ) Description
    router-link.nav.link(
      v-if='press.videos'
      to='#videos'
      @click.native='scrollTo("videos")'
    ) Videos
    router-link.nav.link(
      v-if='press.videos'
      to='#images'
      @click.native='scrollTo("images")'
    ) Images
    router-link.nav.link(
      v-if='press.videos'
      to='#branding'
      @click.native='scrollTo("branding")'
    ) Branding
    router-link.nav.link(
      v-if='press.articles || press.awards'
      to='#accolades'
      @click.native='scrollTo("accolades")'
    ) Accolades
    router-link.nav.link(
      v-if='press.contact || press.credits'
      to='#contributors'
      @click.native='scrollTo("contributors")'
    ) Contributors
  article.press-article
    .banner(
      v-if='press.banner'
    )
      GwImage(
        :image='press.banner'
      )
    h1 {{ press.title }}
    .press-content
      section#factsheet
        h2 Fact Sheet
        GwArticle(
          :content='press.factSheet'
        )
      .main
        section#description
          h2 Description
          GwArticle(
            :content='press.description'
          )
        section#videos(
          v-if='press.videos'
        )
          h2 Videos
          .media-gallery
            .gallery-element(
              v-for='video in press.videos'
            )
              GwVideo(
                :video='video'
                :is-background='false'
              )
              p(
                v-if='video.title'
              ) {{ video.title }}
        section#images(
          v-if='press.images'
        )
          h2 Images
          .media-gallery
            .gallery-element(
              v-for='img in press.images.samples'
            )
              GwImage(
                :image='img'
              )
              p(
                v-if='img.caption'
              ) {{ img.caption }}
        section#branding(
          v-if='press.branding'
        )
          h2 Branding
          .media-gallery
            .gallery-element(
              v-for='img in press.branding.samples'
            )
              GwImage(
                :image='img'
              )
              p(
                v-if='img.caption'
              ) {{ img.caption }}
        .two-column#accolades(
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
        .two-column#contributors(
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
        section#disclaimer(
          v-if='press.disclaimer'
        )
          p(
            v-for='p in press.disclaimer'
            v-html='p'
          )
</template>

<style scoped lang='sass'>
nav
  position: fixed
  top: 4em
  margin-top: 2em
  width: fit-content
  margin-left: 1em
  display: flex
  flex-direction: column
  a
    margin-bottom: 0.5em
    font-size: 1.5em
.press-article
  margin-left: 16em
  margin-top: 2em
.banner
  height: 4em
  width: auto
.press-content
  display: grid
  grid-template-columns: 1fr 3fr
  .main
    a
      font-weight: normal
    .two-column
      display: grid
      grid-template-columns: 1fr 1fr
ul
  padding-left: 1em
.title
  font-weight: bold

.media-gallery
  display: grid
  row-gap: 0.25em
  column-gap: 0.25em
  .gallery-element
    border: 1px solid var(--theme-body-border)
    padding: 0.5em
    display: flex
    flex-direction: column
    justify-content: flex-start
    .container
      position: relative
    p
      margin: auto
      text-align: center
#videos .media-gallery
  grid-template-columns: 1fr 1fr
#images .media-gallery,
#branding .media-gallery
  grid-template-columns: 1fr 1fr 1fr
  .gallery-element
    .image
      height: 8em
      width: 100%

#factsheet::v-deep
  h1, h2, h3, h4, h5, h6
    margin-bottom: 0
  h1
    font-size: 1.25em
    font-weight: bold
    font-style: normal
  h2
    font-size: 1.25em
    font-weight: normal
    font-style: italic
  h3
    font-size: 1.1em
    font-weight: bold
    font-style: normal
  h4
    font-size: 1.1em
    font-weight: normal
    font-style: italic
  h5
    font-size: 0.95em
    font-weight: bold
    font-style: normal
  h6
    font-size: 0.95em
    font-weight: normal
    font-style: italic
  > h2
    font-size: 1.35em
    font-weight: bold
    font-style: normal
  p, ul
    margin-top: 0
    font-size: 0.8em
  ul
    padding-left: 1em

#description::v-deep
  article
    max-width: 32em

#credits
  .who
    font-weight: bold
  .for
    font-style: italic
</style>
