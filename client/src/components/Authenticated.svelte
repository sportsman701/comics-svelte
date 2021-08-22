<script lang="ts">
import sessionStore from "../stores/session"
import Login from "../routes/session/Login.svelte"

console.log($sessionStore.username)
console.log($sessionStore.roles)
</script>

{#if !$sessionStore.username}
<Login/>
{:else}
<slot></slot>
{/if}