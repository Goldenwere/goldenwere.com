import type { Image } from '@/src/types/embeds/image'
import type { Link } from '@/src/types/embeds/link'
import type { List } from '@/src/types/embeds/list'
import type { Section } from '@/src/types/embeds/section'
import type { Video } from '@/src/types/embeds/video'

/**
 * Presskit information model for a game/application
 */
export interface Press {
  /* any articles, reviews, and other forms of citation that the app has received*/
  articles?: List[]
  /* any awards, accolades, and other forms of recognition that the app has received */
  awards?: List[]
  /* image that appears as a header for the app */
  banner?: Image
  /* logos and other forms of branding related to the app */
  branding?: Image[]
  /* contact information related to the app */
  contact?: Link[]
  /* credits for people who contributed to the app */
  credits?: {
    /* the person/entity that contributed */
    who: string
    /* what they contributed */
    for: string
    /* any links to the person/entity that may be relevant */
    links?: Link[]
  }[]
  /* the main descriptive content of the app */
  description: Section[]
  /* disclaimer for press/etc regarding usage permissions for the information on the page or the app as a whole */
  disclaimer?: string
  /* an aside of various facts related to the app */
  factSheet?: Section[]
  /* images related to the app */
  images?: {
    /* an optional location to download all images as an archive file */
    download?: string
    /* images to show directly on the page */
    samples: Image[]
  }
  /* the title of the app */
  title: string
  /* videos related to the app */
  videos?: Video[]
}