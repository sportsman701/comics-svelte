import * as express from "express"
import { db, Pagination } from "../../database"
import { Publisher } from "../schemas"

export async function listPublishers(
  req: express.Request,
  res: express.Response
) {
  const pagination = new Pagination(req)

  const publishers = await db<Publisher>("publishers")
    .select("*")
    .offset(pagination.getOffset())
    .limit(pagination.getLimit())

  res.json({
    publishers: publishers,
    meta: pagination.getResponseMeta(publishers),
  })
}

export async function fetchPublisher(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.id

  const publisher = await db<Publisher>("publishers")
    .where("publishers.id", id)
    .first()

  if (publisher === undefined) {
    res
      .status(404)
      .json({
        type: "Not Found",
        message: "Publisher '" + id + "' not found",
      })
      .end()
  }

  res.json(publisher)
}
