import * as express from "express"
import { db, joinedObjectParser, Pagination } from "../database"
import { Title, TitleRecord, Publisher } from "../models"

const transformTitleResponse = (obj: TitleRecord): Title => {
    return {
        id: obj.id,
        name: obj.name,
        publisher_id: obj.publisher_id,
        url: obj.url,
        issues: obj.issues,
        year: obj.year,
        volume: obj.volume,
        publisher: joinedObjectParser(obj, "publisher__") as Publisher
    }
}

export async function listTitles(req: express.Request, res: express.Response) {
    const pagination = new Pagination(req)
    const publisherId = parseInt(req.query.publisherId as string, 10)

    const titles = await db<Title>("titles")
        .select(
            "titles.*",
            "publishers.id AS publisher__id",
            "publishers.name AS publisher__name",
            "publishers.url AS publisher__url"
        )
        .join("publishers", "publishers.id", "=", "titles.publisher_id")
        .offset(pagination.getOffset())
        .limit(pagination.getLimit())
        .modify((queryBuilder) => {
            if (publisherId) {
                queryBuilder.where("publisher_id", publisherId)
            }
        })
        .then(list => list.map(transformTitleResponse))

    res.json({
        "titles": titles,
        "meta": pagination.getResponseMeta(titles)
    })
}

export async function fetchTitle(req: express.Request, res: express.Response) {
    const id = req.params.id
    const title = await db<Title>("titles")
        .select(
            "titles.*",
            "publishers.id AS publisher__id",
            "publishers.name AS publisher__name",
            "publishers.url AS publisher__url"
        )
        .join("publishers", "titles.publisher_id", "=", "publishers.id")
        .where("titles.id", id)
        .first()
        .then(result => {
            if (result !== undefined) {
                result = transformTitleResponse(result)
            }

            return result
        })
    
    if (title === undefined) {
        res.status(404)
            .json({
                "type": "Not Found",
                "message": "Title '" + id + "' not found"
            })
            .end()
    }

    res.json(title)
}
