import express from "express"
import { Express } from "express-serve-static-core"
import * as path from "path"
import { createProxyMiddleware } from "http-proxy-middleware"

const controllers = (server: Express) => {
  server.get(
    "/",
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

  server.use(
    ["/favicon.png", "/global.css", "/build"],
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  )
}

export default controllers
