<script lang="ts">
import { link } from "svelte-routing"
import { operationStore, query } from "@urql/svelte"
import AwaitQuery from "../components/AwaitQuery.svelte"
import Breadcrumbs from "../components/Breadcrumbs.svelte"
import NullableString from "../components/NullableString.svelte"
import THead from "../components/THead.svelte"
import { GetPublisherDocument } from "../graphql/schemas.generated"
import type { Publisher } from "../graphql/schemas.generated"
  
  export let id: string = ""

  const publisherId = parseInt(id, 10)

  const publisherStore = operationStore<{publisher: Publisher}>(GetPublisherDocument, {
    id: publisherId
  })
  query(publisherStore)
</script>

<section class="publisher">
  <AwaitQuery queryStore={publisherStore} let:data={{publisher}}>
    <Breadcrumbs
      publisher={{name: publisher.name}}
    />

    <h2>{publisher.name}</h2>
    <p>URL: <NullableString value={publisher.url}/></p>
    
    <h3>Titles:</h3>
    <table>
      <THead>
        <tr>
          <th scope="row">Title</th>
          <th scope="row">Link</th>
          <th scope="row">Year</th>
          <th scope="row">Volume</th>
        </tr>
      </THead>
      <tbody>
        {#each publisher.titles as title}
          <tr>
            <th scope="row">
              <a use:link href="/app/titles/{title.id}">{title.name}</a>
            </th>
            <td><NullableString value={title.url}/></td>
            <td><NullableString value={title.year}/></td>
            <td><NullableString value={title.volume}/></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </AwaitQuery>
</section>

<style>
</style>