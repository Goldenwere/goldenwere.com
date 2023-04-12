import type { Image } from '@/src/types/embeds/image'
import type { Link } from '@/src/types/embeds/link'
import type { Section } from '@/src/types/embeds/section'
import type { Video } from '@/src/types/embeds/video'

/**
 * Presskit information model for a game/application
 */
export interface Press {
  /* any articles, reviews, and other forms of citation that the app has received*/
  articles?: {
    /* the title of the article */
    title: string
    /* a link to the article */
    link: Link
  }[]
  /* any awards, nominations, and other forms of recognition that the app has received */
  awards?: {
    /* the title of the award */
    title: string
    /* a link to the award if applicable/available */
    link?: Link
  }[]
  /* image that appears as a header for the app */
  banner?: Image
  /* logos and other forms of branding related to the app */
  branding?: {
    /* an optional location to download all images as an archive file */
    download?: string
    /* [MARKDOWN] optional branding guidelines */
    guidelines?: string
    /* images to show directly on the page */
    samples: Image[]
  }
  /* contact information related to the app */
  contact?: {
    link: Link
    title: string
  }[]
  /* credits for people who contributed to the app */
  credits?: {
    /* the person/entity that contributed */
    who: string
    /* what they contributed */
    for?: string
    /* any links to the person/entity that may be relevant */
    links?: Link[]
  }[]
  /* [MARKDOWN] the main descriptive content of the app */
  description: Section[]
  /* disclaimer for press/etc regarding usage permissions for the information on the page or the app as a whole */
  disclaimer?: string
  /* [MARKDOWN] an aside of various facts related to the app */
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