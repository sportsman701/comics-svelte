import { db } from "./index"

export const countTable = async (tableName: string): Promise<number> => {
  return new Promise((resolve, reject): void => {
    db(tableName)
      .count<Record<string, number>>({ count: 0 })
      .first()
      .then((result) => {
        if (result === undefined) {
          reject("Coult not count table `" + tableName + "`")
        } else {
          resolve(result.count as number)
        }
      })
  })
}
