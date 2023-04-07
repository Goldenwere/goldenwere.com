export type VideoType =
| 'youtube'
| 'video'

export interface Video {
  type: VideoType
  id: string
}
