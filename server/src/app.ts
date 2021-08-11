import express from "express"
import cors from "cors"
import { Express } from "express-serve-static-core"
import compression from "compression"
import logger from "./log"
import controllers from "./controllers"

import { graphqlHTTP } from "express-graphql"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { addResolversToSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"

import { db, paginateQuery, countTable } from "./database"
import grades from "./config/grades"

const morgan = require("morgan")("combined")

const configGraphQL = (server: Express) => {
  const schema = loadSchemaSync("./src/graphql/schema.generated.graphql", {
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
        grades: grades,
      },
    })
  )
}

const configSinglePageApp = (server: Express) => {
  controllers(server)
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

async function genServer(): Promise<Express> {
  const server = express()
  server.use(morgan)
  server.use(compression())
  server.use(cors())

  server.disable("x-powered-by")

  configHealthcheck(server)
  configSinglePageApp(server)
  configGraphQL(server)

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
