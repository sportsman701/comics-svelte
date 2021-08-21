<script lang="ts">
  import { link } from "svelte-routing"
  import { operationStore, query } from "@urql/svelte"
  import AwaitQuery from "../../components/AwaitQuery.svelte"
  import DirectoryList from "../../components/DirectoryList.svelte"
  import NullableString from "../../components/NullableString.svelte"
  import PageTitle from "../../components/PageTitle.svelte"
  import { GetPublisherDocument } from "../../graphql/schemas.generated"
  import type { Publisher, TitlesPage } from "../../graphql/schemas.generated"
  
  export let id: string = ""

  const publisherId = parseInt(id, 10)

  const publisherStore = operationStore<{publisher: Publisher, titles: TitlesPage}>(GetPublisherDocument, {
    id: publisherId
  })
  query(publisherStore)

  const extractDomain = (url: string) => url ? new URL(url).hostname : url
</script>

<AwaitQuery queryStore={publisherStore} let:data={{publisher, titles}}>
  <PageTitle value="/comics/publishers/{publisher.name}"/>

  <table class="classic">
    <tbody>
      <tr>
        <td>
          <img src="/icons/left.gif" alt="[BACK]" role="presentation">
          {#if publisher.series.previous}
          <a href="/comics/publishers/{publisher.series.previous}">Previous Publisher</a>
          {:else}
          <span class="disabled">Previous Publisher</span>
          {/if}
        </td>
        <td>
          <img src="/icons/back.gif" alt="[PARENTDIR]" role="presentation">
          <a use:link href="/comics/publishers">Up to Publishers List</a>
        </td>
        <td>
          {#if publisher.series.next}
          <a href="/comics/publishers/{publisher.series.next}">Next Publisher</a>
          {:else}
          <span class="disabled">Next Publisher</span>
          {/if}
          <img src="/icons/right.gif" alt="[NEXT]" role="presentation">
        </td>
      </tr>
    </tbody>
  </table>

  <section class="publisher">
    <p>
      <b>Url:</b> {#if publisher.url}
        <a href="{publisher.url}" alt="{extractDomain(publisher.url)}" target="_blank">
          {extractDomain(publisher.url)}
        </a>
      {:else}
      <NullableString value={publisher.url}/>
      {/if}
    </p>
    
    <DirectoryList parentDirectory="/comics/publishers">
      {#each titles.items as title (title.id)}
      <tr>
        <td><img src="/icons/folder.gif" alt="[DIR]"></td>
        <th scope="row">
          <a use:link href="/comics/titles/{title.id}">{title.name}</a>
        </th>
        <td>-</td>
        <td>{title.issue_count || 0}</td>
        <td></td>
      </tr>
      {/each}
    </DirectoryList>
  </section>
</AwaitQuery>
