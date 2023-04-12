<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/src/store'
import { fetchAndParseContent } from '@/src/utilities/fetch'
import type { Press } from '@/src/types/press'
import GwArticle from '@/src/components/embeds/GwArticle.vue'
import GwImage from '@/src/components/embeds/GwImage.vue'
import GwVideo from '@/src/components/embeds/GwVideo.vue'
import PressAccolades from './PressAccolades.vue'
import PressContributors from './PressContributors.vue'
import PressHeader from './PressHeader.vue'
import PressNav from './PressNav.vue'

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
</script>

<template lang='pug'>
.content.press(
  v-if='ready'
)
  PressNav(
    :press='press'
  )
  article.press-article
    PressHeader(
      :press='press'
    )
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
          .download(
            v-if='press.images.download'
          )
            a(
              :href='press.images.download'
            )
              span Download all images as a .zip
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
          .download(
            v-if='press.branding.download'
          )
            a(
              :href='press.branding.download'
            )
              span Download all assets as a .zip
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
        PressAccolades.two-column(
          :press='press'
        )
        PressContributors.two-column(
          :press='press'
        )
        section#disclaimer(
          v-if='press.disclaimer'
        )
          h2 Disclaimer
          p(
            v-for='p in press.disclaimer'
            v-html='p'
          )
</template>

<style scoped lang='sass'>
.press-article
  margin-left: 16em
  margin-right: 4em
  margin-top: 2em
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
.download
  margin-bottom: 1em

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
</style>
