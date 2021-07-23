import express from "express";
import { Express } from "express-serve-static-core"
import * as OpenApiValidator from "express-openapi-validator"
import { connector, summarise } from "swagger-routes-express"
import YAML from "yamljs"
import path from "path"
import compression from "compression";
import logger from "./log"
import * as api from "./controllers"

const morgan = require("morgan")("combined")

async function genServer(): Promise<Express> {
    const apiSpec = YAML.load(path.resolve("./src/api.yaml"))
    logger.info(summarise(apiSpec))

    const server = express()
    server.use(morgan)
    server.use(compression())

    // simple healthcheck
    server.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send({
            "status": "OK"
        })
        next()
    })

    server.use(OpenApiValidator.middleware({
        apiSpec: "./src/api.yaml",
        validateRequests: {
            coerceTypes: true
        },
        validateResponses: true
    }))

    // Stupid error handler
    server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
                    message: "An unknown error has occurred"
                })
                break
        }
    })

    const connect = connector(api, apiSpec, {
        onCreateRoute: (method: string, descriptor: any[]) => {
            console.log(`${method}: ${descriptor[0]} -> ${(descriptor[1] as any).name}`)
        }
    })

    connect(server)

    return server
}

genServer()
    .then(server => {
        server.listen(3000, () => {
            console.log("Listening on http://localhost:3000")
        })
    })
    .catch(err => {
        console.error(`Error: ${err}`)
    })

