<script setup lang='ts'>
import { computed } from 'vue'
import type { Section } from '@/src/types/embeds/section'

const props = defineProps<{
  depth: number
  section: Section
}>()

const type = computed(() => {
  if (typeof props.section === 'string') {
    return 'string'
  } else if (Array.isArray(props.section)) {
    return (typeof props.section[0] === 'string')
      ? 'array-list'
      : 'array-content'
  } else if (props.section.content !== undefined) {
    return (Array.isArray(props.section.content))
      ? 'section-list'
      : 'section-content'
  } else {
    throw TypeError('Content passed to recursive text embed was not of a supported type')
  }
})
</script>

<template lang='pug'>
p(
  v-if='type === "string"'
  v-html='props.section'
)
ul(
  v-else-if='type === "array-list"'
)
  li(
    v-for='li in props.section'
    v-html='li'
  )
GwRecursiveText(
  v-else-if='type === "array-content"'
  v-for='content in props.section'
  :depth='props.depth'
  :section='content'
)
section(
  v-else
)
  h1(
    v-if='props.section.heading && props.depth === 1'
  ) {{ props.section.heading }}
  h2(
    v-else-if='props.section.heading && props.depth === 2'
  ) {{ props.section.heading }}
  h3(
    v-else-if='props.section.heading && props.depth === 3'
  ) {{ props.section.heading }}
  h4(
    v-else-if='props.section.heading && props.depth === 4'
  ) {{ props.section.heading }}
  h5(
    v-else-if='props.section.heading && props.depth === 5'
  ) {{ props.section.heading }}
  h6(
    v-else
  ) {{ props.section.heading }}
  GwRecursiveText(
    v-for='content in props.section.content'
    v-if='type === "section-array"'
    :depth='props.section.heading ? props.depth + 1 : props.depth'
    :section='content'
  )
  GwRecursiveText(
    v-else
    :depth='props.section.heading ? props.depth + 1 : props.depth'
    :section='props.section.content'
  )
</template>

<style scoped lang='sass'>

</style>
