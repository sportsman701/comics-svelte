import express from "express"
import type { Express } from "express-serve-static-core"
import * as path from "path"
import { config } from "../config"
import { users, roles } from "../config/users"
import type { SessionResponse } from "../config/users"
import { createProxyMiddleware } from "http-proxy-middleware"
import logger from "../log"

const controllers = (server: Express) => {
  server.post(
    "/v1/login",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      logger.info(req.body)
      const username = req.body.username
      const password = req.body.password

      // @TODO - proper validation
      if (!username || !password) {
        return res.status(400).send({
          error: 400,
          message: "username and password fields are required",
        })
      }

      const user = users.find((u) => u.username === username)

      if (user) {
        const sessionResponse: SessionResponse = {
          username: user.username,
          roles: roles.filter((r) => r.id in user.roles),
        }
        res.json(sessionResponse)
      } else {
        res.status(401).send({
          error: 401,
          message: "access denied",
        })
      }
    }
  )

  if (config.currentEnv !== "production") {
    /**
     * For dev and testing we proxy over to the running svelte dev server
     */
    server.use(
      ["/favicon.png", "/global.css", "/build", "/icons/*"],
      createProxyMiddleware({
        target: "http://localhost:5000",
        changeOrigin: true,
      })
    )
  } else {
    /**
     * in the docker container the compiled svelte app is copied in ./public
     */
    server.use(express.static(config.static.dir))
  }

  server.get(
    "*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      logger.info(`Handling default route for ${req.url}`)
      res.sendFile("views/index.html", {
        root: path.join(__dirname, "../"),
      })
    }
  )
}

export default controllers
