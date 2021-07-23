import { Title } from "./title"
import { Grade } from "./grade"
import { Publisher } from "./publisher"

export type Comic = {
    id: number,
    issue: number,
    description: string,
    date: number,
    grade: Grade,
    title: Title,
    publisher: Publisher
}

export type ComicRecord = {
    id: number,
    description: string,
    date: number,
    issue_no: number,
    grade__id: number,
    grade__abbr: string,
    grade__name: string,
    grade__score: number,
    publisher__id: number,
    publisher__name: string,
    publisher__url: string,
    title__id: number,
    title__name: string,
    title__publisher_id: number,
    title__url: string,
    title__issues: number,
    title__year: number,
    title__volume: number
}