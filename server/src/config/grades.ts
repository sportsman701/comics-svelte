import { Grade } from "../types/schemas.generated"

export const defaultGrade: Grade = {
  id: 0,
  abbr: "NG",
  name: "No Grade",
  score: 0,
}

const grades: Grade[] = [
  defaultGrade,
  {
    id: 2,
    abbr: "VF",
    name: "Very Fine",
    score: 8,
  },
  {
    id: 3,
    abbr: "NM",
    name: "Near Mint",
    score: 9.4,
  },
  {
    id: 4,
    abbr: "G",
    name: "Good",
    score: 2,
  },
  {
    id: 5,
    abbr: "VG",
    name: "Very Good",
    score: 4,
  },
  {
    id: 7,
    abbr: "FN",
    name: "Fine",
    score: 6,
  },
  {
    id: 12,
    abbr: "M",
    name: "Mint",
    score: 10,
  },
  {
    id: 17,
    abbr: "P",
    name: "Poor",
    score: 0.5,
  },
  {
    id: 18,
    abbr: "FA",
    name: "Fair",
    score: 1,
  },
]

export default grades
