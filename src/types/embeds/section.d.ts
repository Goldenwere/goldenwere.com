import type { List } from '@/src/types/embeds/list'

export interface Section {
  content: (string | Section | List)[]
  heading?: string
}
