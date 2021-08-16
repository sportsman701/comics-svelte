<script type="ts">
  import { link } from "svelte-routing"
  import AwaitQuery from "../../components/AwaitQuery.svelte"
  import type { PublishersPage } from "../../graphql/schemas.generated"
  import { operationStore, query } from "@urql/svelte"
  import { GetPublishersDocument } from "../../graphql/schemas.generated"
  import PageTitle from "../../components/PageTitle.svelte"
  import DirectoryList from "../../components/DirectoryList.svelte"

  const publishersStore = operationStore<{publishers: PublishersPage}>(GetPublishersDocument, {
    pageSize: 1000
  })
  query(publishersStore)
</script>

<PageTitle value="/comics/publishers" />
<section class="publishers">
  <DirectoryList parentDirectory="../comics">
    <AwaitQuery queryStore={publishersStore} let:data={{publishers}}>
      {#each publishers.items as publisher (publisher.id)}
      <tr>
        <td><img src="/icons/folder.gif" alt="[DIR]"></td>
        <th scope="row">
          <a use:link href="/comics/publishers/{publisher.id}">{publisher.name}</a>
        </th>
        <td>-</td>
        <td>{publisher.title_count}</td>
        <td></td>
      </tr>
      {/each}
    </AwaitQuery>
  </DirectoryList>
</section>