<script lang="ts">
  import { link } from "svelte-routing"
  import AwaitQuery from "../../components/AwaitQuery.svelte"
  import NullableString from "../../components/NullableString.svelte"
  import { GetTitleDocument } from "../../graphql/schemas.generated"
  import type { Comic, ComicsPage, Title } from "../../graphql/schemas.generated"
  import { operationStore, query } from "@urql/svelte"
  import PageTitle from "../../components/PageTitle.svelte"
  import DirectoryList from "../../components/DirectoryList.svelte"

  export let id: string = ""

  const titleId = parseInt(id, 10)

  const titleStore = operationStore<{title: Title, comics: ComicsPage}>(GetTitleDocument, {
    id: titleId
  })
  query(titleStore)

  const fullName = (issue: number, title: Title): string => {
    let name = title.name
    if (title.year) {
      name = `${name} (${title.year})`
    }
    name = `${name}.${title.publisher.name}`
    if (title.volume) {
      name = `${name}.VOLUME-${title.volume}`
    }
    return `${name}.ISSUE_${issue}.html`
  }

  const comicSize = (comic: Comic) => Object.values(comic).join("").length

</script>

<AwaitQuery queryStore={titleStore} let:data={{title, comics}}>
  <PageTitle value="/comics/titles/{title.name}" />

  <table class="classic">
    <tbody>
      <tr>
        <td>
          <img src="/icons/left.gif" alt="[BACK]" role="presentation">
          {#if title.series.previous}
          <a use:link href="/comics/titles/{title.series.previous}">Previous Title</a>
          {:else}
          <span class="disabled">Previous Title</span>
          {/if}
        </td>
        <td>
          <img src="/icons/back.gif" alt="[PARENTDIR]" role="presentation">
          <a use:link href="/comics/titles">Up to Titles List</a>
        </td>
        <td>
          {#if title.series.next}
          <a use:link href="/comics/titles/{title.series.next}">Next Title</a>
          {:else}
          <span class="disabled">Next Title</span>
          {/if}
          <img src="/icons/right.gif" alt="[NEXT]" role="presentation">
        </td>
      </tr>
    </tbody>
  </table>

  <section class="title">
    <p><b>Publisher:</b> {title.publisher.name}</p>
    <p><b>Url:</b> 
      {#if title.url}
      <a href="{title.url}" target="_blank">'{title.name}' product page</a>
      {:else}
      <NullableString value={title.url}/>
      {/if}
    </p>
    <p><b>Volume:</b> <NullableString value={title.volume}/></p>
    <p><b>Year:</b> <NullableString value={title.year}/></p>

    <DirectoryList parentDirectory="/comics/titles">
      <tr>
        <td><img src="/icons/folder.gif" alt="[DIR]"></td>
        <th scope="row">
          <a use:link href="./{titleId}/properties">properties</a>
        </th>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      {#each comics.items as comic (comic.id)}
      <tr>
        <td><img src="/icons/text.gif" alt="[TXT]"></td>
        <th scope="row">
          <a use:link href="/comics/comics/{comic.id}">{fullName(comic.issue_no, title)}</a>
        </th>
        <td>{new Date(comic.date_updated * 1000).toUTCString()}</td>
        <td>{comicSize(comic)}</td>
        <td></td>
      </tr>
      {/each}
    </DirectoryList>
  </section>
</AwaitQuery>
