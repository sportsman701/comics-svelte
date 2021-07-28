import { components } from "./generated"

export type Title = components["schemas"]["Title"]

export type TitleRecord = {
  id: number
  name: string
  publisher_id: number
  url: string
  issues: number
  year: number
  volume: number
  publisher__id: number
  publisher__name: string
  publisher__url: string
}
