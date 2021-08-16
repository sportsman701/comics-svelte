import { config } from "./config"
const winston = require("winston")

const logLevel = config.currentEnv === "production" ? "warning" : "info"
const logger = new winston.createLogger({
  level: logLevel,
})

logger.add(
  new winston.transports.Console({
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.prettyPrint()
    ),
  })
)

export default logger
