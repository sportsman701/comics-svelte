<script lang="ts">
import sessionStore from "../../stores/session"
import { navigate } from "svelte-routing"

let username: string
let password: string
$: loginError = undefined

const maybeRedirect = () => {
  const redirectLocation = new URLSearchParams(window.location.search).get("g")
  if (redirectLocation) {
    navigate(redirectLocation)
  }
}

const login = async (): Promise<void> => { 
  loginError = undefined

  const params = {
    username,
    password
  }

  const responseData = await fetch("/v1/login", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (response): Promise<LoginResponse> => {
    switch (response.status) {
      case 200:
        return await response.json()
      case 400:
      case 401:
        const e = await response.json()
        return new Error(e.message)
      default:
        return new Error(response.statusText)
    }
  })

  if (!(responseData instanceof Error)) {
    sessionStore.set(responseData)
    maybeRedirect()
  } else {
    loginError = responseData.message
  }
}
</script>

<section id="login">
  <div class="login-wrapper">
    <h2>Authentication Required</h2>
    <p>This server requires a username and password. The server says: Restricted Area</p>
    {#if loginError}
      <div class="error">
        <p>{loginError}</p>
      </div>
    {/if}
    <form on:submit|preventDefault={login} autocomplete=off>
      <p>
        <label for="username">User Name: </label>
        <input type="text" id="username" name="username" bind:value={username} />
      </p>
      <p>
        <label for="password">Password:</label>
        <input type="password" id="password" name="username" bind:value={password} /> 
      </p>
      <button type="submit">Log in</button> &nbsp; <button type="cancel">Cancel</button>
    </form>
  </div>
</section>

<style>
  .login-wrapper {
    border: 1px solid var(--mediumgrey);
    border-width: 0 1px 1px 1px;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.5);
    height: max-content;
    margin: auto;
    padding: 1em;
    position: absolute;
    top: 0; left: 0; bottom: 100%; right: 0;
    width: 25em;
  }
</style>