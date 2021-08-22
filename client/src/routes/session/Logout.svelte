<script lang="ts">
import sessionStore, { defaultSession } from "../../stores/session"
import { navigate } from "svelte-routing"

sessionStore.set(defaultSession)
navigate("/")
</script>