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
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
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
      directory: "./database/migrations",
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
      directory: "./database/migrations",
    },
    useNullAsDefault: true,
  },
}
