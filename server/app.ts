import express from "express"
import { Express } from "express-serve-static-core"
import compression from "compression"
import logger from "./log"

import { graphqlHTTP } from "express-graphql"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { addResolversToSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"

import { db, paginateQuery, countTable } from "./database"

const morgan = require("morgan")("combined")

const configGraphQL = (server: Express) => {
  const schema = loadSchemaSync("./server/schemas/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  })

  server.use(
    "/graphql",
    graphqlHTTP({
      schema: addResolversToSchema({
        schema,
        resolvers,
      }),
      graphiql: true,
      pretty: process.env.NODE_ENV === "development",
      context: {
        database: {
          db,
          paginateQuery,
          countTable,
        },
      },
    })
  )
}

const configSinglePageApp = (server: Express) => {
  server.get(
    "/",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.sendFile("views/index.html", {
        root: __dirname,
      })
    }
  )
}

const configHealthcheck = (server: Express) => {
  server.get(
    "/healthcheck",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.send({
        status: "OK",
      })
      next()
    }
  )
}

const configErrorHandlers = (server: Express) => {
  server.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(err.status)
      switch (err.status) {
        case 400:
          res.json({
            type: "validation_error",
            message: err.message,
          })
          break
        default:
          logger.error(err)
          res.json({
            type: "unknown_error",
            message: "An unknown error has occurred",
          })
          break
      }
    }
  )
}

async function genServer(): Promise<Express> {
  const server = express()
  server.use(morgan)
  server.use(compression())

  configHealthcheck(server)
  configSinglePageApp(server)
  configGraphQL(server)
  configErrorHandlers(server)

  return server
}

genServer()
  .then((server) => {
    server.listen(3000, () => {
      console.log("Listening on http://localhost:3000")
    })
  })
  .catch((err) => {
    logger.error(`Error: ${err}`)
  })
