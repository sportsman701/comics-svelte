<script lang="ts">
  import { link } from "svelte-routing"
  import { operationStore, query } from "@urql/svelte"
  import AwaitQuery from "../../components/AwaitQuery.svelte"
  import DirectoryList from "../../components/DirectoryList.svelte"
  import NullableString from "../../components/NullableString.svelte"
  import PageTitle from "../../components/PageTitle.svelte"
  import { GetPublisherDocument } from "../../graphql/schemas.generated"
  import type { Publisher } from "../../graphql/schemas.generated"
  
  export let id: string = ""

  const publisherId = parseInt(id, 10)

  const publisherStore = operationStore<{publisher: Publisher}>(GetPublisherDocument, {
    id: publisherId
  })
  query(publisherStore)

  const extractDomain = (url: string) => url ? new URL(url).hostname : url
</script>

<AwaitQuery queryStore={publisherStore} let:data={{publisher}}>
  <PageTitle value="/comics/publishers/{publisher.name}"/>
  <section class="publisher">
    <p>
      Url: {#if publisher.url}
        <a href="{publisher.url}" alt="{extractDomain(publisher.url)}" target="_blank">
          {extractDomain(publisher.url)}
        </a>
      {:else}
      <NullableString value={publisher.url}/>
      {/if}
    </p>
    
    <DirectoryList parentDirectory="/comics/publishers">
      {#each publisher.titles as title (title.id)}
      <tr>
        <td><img src="/icons/folder.gif" alt="[DIR]"></td>
        <th scope="row">
          <a use:link href="/comics/titles/{title.id}">{title.name}</a>
        </th>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      {/each}
    </DirectoryList>
  </section>
</AwaitQuery>
