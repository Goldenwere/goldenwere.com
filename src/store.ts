import { defineStore } from 'pinia'
import type { Site } from '@/src/types/site'

export const useStore = defineStore('store', {
  state: () => ({
    site: {} as Site,
    home: undefined as unknown as Object,
  }),
})
