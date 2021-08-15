<script type="ts">
  import { link, navigate } from "svelte-routing"
  import { propertiesStore } from "../../stores/properties"

  export let property: string = ""

  const propertyName = property.replace(".txt", "")

  let ownerName = $propertiesStore.owner

  const update = (event: Event) => {
    $propertiesStore.owner = event.target.owner.value
    navigate(`/site-properties`)
  }
</script>

<section class="site-property">
  <p>
    <img src="/icons/back.gif" alt="[PARENTDIR]">
    <a use:link href="./">Back</a>
  </p>
  <hr />
  
  <form on:submit|preventDefault={update}>
    {#if propertyName == "owner"}
    <p>
      <label for="owner">Owner</label>
      <input type="text" name="owner" id="owner" value="{ownerName}" />
    </p>
    {/if}

    <button type="submit">Save</button>
  </form>
</section>