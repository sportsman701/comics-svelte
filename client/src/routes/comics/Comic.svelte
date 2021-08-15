<script lang="ts">
  import { link } from "svelte-routing"
  import { operationStore, query } from "@urql/svelte"
  import { GetComicDocument } from "../../graphql/schemas.generated"
  import type { Comic } from "../../graphql/schemas.generated"
  import AwaitQuery from "../../components/AwaitQuery.svelte"
  import NullableString from "../../components/NullableString.svelte"
import PageTitle from "../../components/PageTitle.svelte"

  export let id: string = ""

  const comicId = parseInt(id, 10)

  const comicStore = operationStore<{comic: Comic}>(GetComicDocument, {
    id: comicId
  })

  query(comicStore)
</script>

  <AwaitQuery queryStore={comicStore} let:data={{comic}}>
    <PageTitle value={`${comic.title.name} # ${comic.issue_no}`} isDirectory={false} />

    <section class="comic">

      <table class="classic">
        <tbody>
          <tr>
            <td>
              <img src="/icons/left.gif" alt="[BACK]" role="presentation">
              {#if comic.series.previous}
              <a href="/comics/comics/{comic.series.previous}">Previous Issue</a>
              {:else}
              <span class="disabled" aria-hidden="true">Previous Issue</span>
              {/if}
            </td>
            <td>
              <img src="/icons/back.gif" alt="[PARENTDIR]" role="presentation">
              <a use:link href="/comics/titles/{comic.title.id}">Up to Title page</a>
            </td>
            <td>
              {#if comic.series.next}
              <a href="/comics/comics/{comic.series.next}">Next Issue</a>
              {:else}
              <span class="disabled" aria-hidden="true">Previous Issue</span>
              {/if}
              <img src="/icons/right.gif" alt="[NEXT]" role="presentation">
            </td>
          </tr>
        </tbody>
      </table>

      <hr/>
      <p>Publisher: {comic.title.publisher.name}</p>
      <p>Grade: {comic.grade.name}</p>
      <p>Description: <NullableString value={comic.description}/></p>
    </section>
  </AwaitQuery>

<style>
</style>