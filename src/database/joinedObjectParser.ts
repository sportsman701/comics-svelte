/**
 * Horrible function to accommodate pulling all db data in a single query.
 *
 * Given:
 *     obj = {
 *       a: 1,
 *       b__sub1: 1,
 *       b__sub2: 2
 *     }
 *
 * A call to `filter(obj, "b__")` will return:
 *     {
 *       sub1: 1,
 *       sub2: 2
 *     }
 */
export const joinedObjectParser = (
  obj: { [prop: string]: any },
  index: string
) => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter((entry) => {
        return entry[0].startsWith(index)
      })
      .map((entry) => {
        entry[0] = entry[0].replace(index, "")
        return entry
      })
  )
}
