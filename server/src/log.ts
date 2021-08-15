import { config } from "./config"
const winston = require("winston")

const logLevel = config.currentEnv === "production" ? "warning" : "info"
const logger = new winston.createLogger({
  level: logLevel,
})

if (config.currentEnv === "production") {
  logger.add(
    new winston.transports.File({
      filename: "logs/all.log",
    })
  )
}

if (config.currentEnv in ["development", "test"]) {
  logger.add(
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    })
  )
}

export default logger
