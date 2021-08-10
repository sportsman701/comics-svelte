const path = require("path")

module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
      multipleStatements: true,
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
    useNullAsDefault: true,
  },

  staging: {
    client: "sqlite3",
    connection: {
      filename: "./database/staging.db",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./database/production.db",
    },
    useNullAsDefault: true,
  },
}