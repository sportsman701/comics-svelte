<script lang="ts">
  import { link } from "svelte-routing"
  import Icon from "../components/Icon.svelte"
  import PageTitle from "../components/PageTitle.svelte"
</script>

<PageTitle value={"Not Found"} isDirectory={false} />
<section class="four-oh-four">
  <p>The requested URL {window.location.pathname} was not found on this server.</p>
  <p><Icon icon="forward" alt="home" /> <a use:link href="/">Go home</a></p>
</section>