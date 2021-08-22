export type User = {
  username: string
  password: string
  roles: number[]
}

export type Role = {
  id: number
  name: string
}

export type SessionResponse = {
  username: string
  roles: Role[]
}

export const roles: Role[] = [
  {
    id: 1,
    name: "admin",
  },
]

export const users: User[] = [
  {
    username: "Wookiee",
    password: "Password",
    roles: [1],
  },
]
