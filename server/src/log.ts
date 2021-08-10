const winston = require("winston")

const environment = process.env.NODE_ENV || "development"

const logLevel = process.env.NODE_ENV === "production" ? "warning" : "info"
const logger = new winston.createLogger({
  level: logLevel,
})

if (environment === "production") {
  logger.add(
    new winston.transports.File({
      filename: "logs/all.log",
    })
  )
}

if (environment in ["development", "test"]) {
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
