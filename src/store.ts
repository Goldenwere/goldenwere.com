import { defineStore } from 'pinia'
import type { Home } from '@/src/types/home'
import type { Press } from '@/src/types/press'
import type { Site } from '@/src/types/site'

export const useStore = defineStore('store', {
  state: () => ({
    site: {} as Site,
    home: {} as Home,
    press: [] as {
      id: string,
      content: Press
    }[]
  }),
})
