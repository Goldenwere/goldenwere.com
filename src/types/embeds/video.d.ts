export type VideoType =
| 'youtube'
| 'video'

export interface Video {
  title?: string
  type: VideoType
  id: string
}
