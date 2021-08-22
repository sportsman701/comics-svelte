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
import { grades, config } from "./config"

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
      pretty: config.currentEnv === "development",
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
  server.use(express.json())

  configHealthcheck(server)
  configGraphQL(server)

  // must be last routes added
  configSinglePageApp(server)

  server.set("x-powered-by", false)
  server.set("ETag", config.currentEnv === "production")

  return server
}

genServer()
  .then((server) => {
    console.log(`Starting server with config:`, config)
    server.listen(config.express.port, () => {
      console.log(`Listening on http://localhost:${config.express.port}`)
    })
  })
  .catch((err) => {
    logger.error(`Error: ${err}`)
  })

process.once("SIGUSR2", () => {
  db.destroy()
  process.kill(process.pid, "SIGUSR2")
})
