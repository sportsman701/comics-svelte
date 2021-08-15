// Update with your config settings.
import * as path from "path"

module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
      multipleStatements: true,
    },
    pool: {
      max: 1,
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "database", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "database", "seeds"),
    },
  },

  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/development.db",
    },
    pool: {
      max: 1,
    },
    migrations: {
      directory: path.join(__dirname, "database", "migrations"),
    },
    useNullAsDefault: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./database/production.db",
    },
    pool: {
      max: 1,
    },
    migrations: {
      directory: path.join(__dirname, "database", "migrations"),
    },
    useNullAsDefault: true,
  },
}
