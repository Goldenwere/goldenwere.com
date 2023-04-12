<script setup lang='ts'>
import type { Press } from '@/src/types/press'

const props = defineProps<{
  press: Press,
}>()

function scrollTo (id: string) {
  document.getElementById(id)?.scrollIntoView()
}
</script>

<template lang='pug'>
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
  router-link.nav.link(
    v-if='press.disclaimer'
    to='#disclaimer'
    @click.native='scrollTo("disclaimer")'
  ) Disclaimer
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
</style>
