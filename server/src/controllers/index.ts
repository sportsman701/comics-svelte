import express from "express"
import type { Express } from "express-serve-static-core"
import * as path from "path"
import { config } from "../config"
import { createProxyMiddleware } from "http-proxy-middleware"

const controllers = (server: Express) => {
  if (config.currentEnv !== "production") {
    server.use(
      ["/favicon.png", "/global.css", "/build", "/icons/*"],
      createProxyMiddleware({
        target: "http://localhost:5000",
        changeOrigin: true,
      })
    )
  }

  server.get(
    "*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.sendFile("views/index.html", {
        root: path.join(__dirname, "../"),
      })
    }
  )
}

export default controllers
