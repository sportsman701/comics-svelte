<script lang="ts">
  import { link, navigate } from "svelte-routing"
  import { propertiesStore, defaultState } from "../../stores/properties"

  export let property: string = ""

  const propertyName = property.replace(".txt", "")

  let ownerName = $propertiesStore.owner
  let copyrightYear = $propertiesStore.copyrightYear

  const update = (event: Event) => {
    let defaultValue = defaultState[propertyName]
    let value = event.target[propertyName].value

    if (!value) {
      value = defaultValue
    }

    switch (typeof defaultValue) {
      case "number":
        value = parseInt(value, 10)
        break
      case "string":
        value = value.toString()
        break
    }

    $propertiesStore[propertyName] = value
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

    {#if propertyName == "copyrightYear"}
    <p>
      <label for="copyrightYear">Copyright Year</label>
      <input type="number" name="copyrightYear" id="copyrightYear" value="{copyrightYear}" />
    </p>
    {/if}

    <button type="submit">Save</button>
  </form>
</section>