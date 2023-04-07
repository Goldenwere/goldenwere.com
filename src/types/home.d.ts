import type { Image } from '@/src/types/embeds/image'
import type { Video } from '@/src/types/embeds/video'

export interface Home {
  about: string[]
  landing: string[]
  landingVideo: Video
  logo: Image
}
