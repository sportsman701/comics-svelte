import { writable } from "svelte/store"

export const defaultSession: UserSession = {
  username: undefined,
  roles: [],
}

const sessionStore = writable<UserSession>(defaultSession)

export default sessionStore
