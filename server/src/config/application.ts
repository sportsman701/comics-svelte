const config = {
  currentEnv: process.env.NODE_ENV || "development",
  express: {
    port: 3000,
  },
  static: {
    dir: "/usr/src/app/public", // only in docker container
  },
}

export default config
