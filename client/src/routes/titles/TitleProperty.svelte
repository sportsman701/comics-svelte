<script lang="ts">
  import { navigate, link } from "svelte-routing"
  import AwaitQuery from "../../components/AwaitQuery.svelte"
  import { GetTitleEditDocument, UpdateTitleDocument } from "../../graphql/schemas.generated"
  import type { PublishersPage, Title } from "../../graphql/schemas.generated"
  import { operationStore, query, mutation } from "@urql/svelte"
  import PageTitle from "../../components/PageTitle.svelte"

  export let id: string
  export let property: string

  const titleId = parseInt(id, 10)
  const propertyName = property.replace(".txt", "")

  const titleStore = operationStore<{title: Title, publishers: PublishersPage}>(GetTitleEditDocument, {
    id: titleId
  })
  query(titleStore)

  const titleMutationStore = operationStore<Title>(UpdateTitleDocument)
  const updateTitleMutation = mutation(titleMutationStore)

  // @TODO - bind update handler to form submit instead of button click
  const update = () => {
    // @TODO - bind to local properties, update store on success
    const titleUpdate = {
      name: propertyName == "name" ? $titleStore.data.title.name : undefined,
      publisher_id: propertyName == "publisher" ? $titleStore.data.title.publisher_id : undefined,
      url: propertyName == "url" ? $titleStore.data.title.url : undefined,
      volume: propertyName == "volume" ? $titleStore.data.title.volume : undefined,
      year: propertyName == "year" ? $titleStore.data.title.year : undefined
    }

    updateTitleMutation({id: titleId, update: titleUpdate})
      .then((result) => {
        if (result.error) {
          console.log(result)
        } else if (result.data) {
          navigate(`/comics/titles/${titleId}/properties`)
        }
      })

    return false;
  }
</script>

<PageTitle value={property} isDirectory={false} />
<section class="title edit">
  {#if $titleMutationStore.error}
  <div class="error">
    <p>{$titleMutationStore.error}</p>
  </div>
  {/if}

  <p>
    <img src="/icons/back.gif" alt="[PARENTDIR]">
    <a use:link href="./">Back</a>
  </p>
  <hr />

  <AwaitQuery queryStore={titleStore}>
    <form>
      <input type="hidden" name="id" bind:value="{$titleStore.data.title.id}" />
      
      {#if propertyName === "name"}
      <p>
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={$titleStore.data.title.name} />
      </p>
      {/if}

      {#if propertyName === "publisher"}
      <p>
        <label for="publisher">Publisher</label>
        <select id="publisher" bind:value={$titleStore.data.title.publisher_id}>
          {#each $titleStore.data.publishers.items as publisher}
            <option value="{publisher.id}" selected={publisher.id === $titleStore.data.title.publisher_id.toString()}>{publisher.name}</option>
          {/each}
        </select>
      </p>
      {/if}

      {#if propertyName === "url"}
      <p>
        <label for="url">URL</label>
        <input type="text" id="url" bind:value={$titleStore.data.title.url} />
      </p>
      {/if}

      {#if propertyName == "year"}
      <p>
        <label for="year">Year</label>
        <input type="number" id="year" bind:value="{$titleStore.data.title.year}" />
      </p>
      {/if}

      {#if propertyName === "volume"}
      <p>
        <label for="volume">Volume</label>
        <input type="number" id="volume" bind:value="{$titleStore.data.title.volume}" />
      </p>
      {/if}

      <button on:click|preventDefault={update}>Save</button>
    </form>
  </AwaitQuery>
</section>