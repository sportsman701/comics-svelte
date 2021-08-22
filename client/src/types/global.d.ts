/// <reference types="svelte" />

type Role = {
  id: number
  name: string
}

type UserSession = {
  username: string
  roles: Role[]
}

type LoginResponse = UserSession | Error
