import * as express from "express"
import { db, joinedObjectParser, idsParser, Pagination } from "../database"
import { Comic, Title, Grade, Publisher } from "../models"
import { ComicRecord } from "../models"
// import logger from "../log"

const transformComicResponse = (obj: ComicRecord): Comic => ({
    id: obj.id,
    issue: obj.issue_no,
    description: obj.description,
    date: obj.date,
    grade: joinedObjectParser(obj, "grade__") as Grade,
    title: joinedObjectParser(obj, "title__") as Title,
    publisher: joinedObjectParser(obj, "publisher__") as Publisher
})

const comicQueryBuilder = () => db<ComicRecord>("comics")
        .select(
            "comics.id",
            "comics.issue_no",
            "comics.description",
            "comics.date",
            "grades.id AS grade__id",
            "grades.abbr AS grade__abbr", 
            "grades.name AS grade__name", 
            "grades.score AS grade__score",
            "titles.id AS title__id",
            "titles.name AS title__name",
            "titles.publisher_id AS title__publisher_id",
            "titles.url AS title__url",
            "titles.issues AS title__issues",
            "titles.year AS title__year",
            "titles.volume AS title__volume",
            "publishers.id AS publisher__id",
            "publishers.name AS publisher__name",
            "publishers.url AS publisher__url"
        )
        .join("grades", "comics.grade_id", "=", "grades.id")
        .join("titles", "comics.title_id", "=", "titles.id")
        .join("publishers", "titles.publisher_id", "=", "publishers.id")

export async function listComics(req: express.Request, res: express.Response) {
    const pagination = new Pagination(req)

    const gradeIds: string[] = idsParser(req.query.gradeIds)
    const publisherIds: string[] = idsParser(req.query.publisherIds)
    const titleIds: string[] = idsParser(req.query.titleIds)
    
    const comics = await comicQueryBuilder()
        .modify(queryBuilder => {
            if (gradeIds?.length) {
                queryBuilder.whereIn("comics.grade_id", gradeIds)
            }
            if (publisherIds?.length) {
                queryBuilder.whereIn("titles.publisher_id", publisherIds)
            }
            if (titleIds?.length) {
                queryBuilder.whereIn("comics.title_id", titleIds)
            }
        })
        .offset(pagination.getOffset())
        .limit(pagination.getLimit())
        .then(list => list.map(transformComicResponse))
    
    res.json({
        "comics": comics,
        "meta": pagination.getResponseMeta(comics)
    })
}

export async function fetchComic(req: express.Request, res: express.Response) {
    const id = req.params.id
    const comic = await comicQueryBuilder()
        .where("comics.id", id)
        .first()
        .then(result => {
            switch (result) {
                case undefined:
                    return result
                default:
                    return transformComicResponse(result)
            }
        })
    
    if (comic === undefined) {
        res.status(404)
            .json({
                "type": "Not Found",
                "message": "Comic '" + id + "' not found"
            })
            .end()
    }

    res.json(comic)
}