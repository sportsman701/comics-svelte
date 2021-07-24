import { Title } from "./title"

export type Publisher = {
  id: number
  name: string
  url: string
  titles?: Title[]
}
