<script lang="ts">
import { link } from "svelte-routing"
import { properties } from "../stores/properties"
import sessionStore from "../stores/session"
</script>

<footer>
	<p>
		&copy; Copyright {$properties.copyrightYear} {$properties.owner}
		&nbsp;|&nbsp;
		{#if $sessionStore.username }
			<a use:link href="/logout">logout ({$sessionStore.username})</a>
		{:else}
			<a use:link href="/login?g={window.location.pathname}">log in</a>
		{/if}
	</p>
</footer>
