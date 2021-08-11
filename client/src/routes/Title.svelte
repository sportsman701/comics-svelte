<script lang="ts">
  import { link } from "svelte-routing"
  import AwaitQuery from "../components/AwaitQuery.svelte"
  import Breadcrumbs from "../components/Breadcrumbs.svelte"
  import NullableString from "../components/NullableString.svelte"
  import THead from "../components/THead.svelte"
  import { GetTitleDocument } from "../graphql/schemas.generated"
  import type { ComicsPage, Title } from "../graphql/schemas.generated"
  import { operationStore, query } from "@urql/svelte"

  export let id: string = ""

  const titleId = parseInt(id, 10)

  const titleStore = operationStore<{title: Title, comics: ComicsPage}>(GetTitleDocument, {
    id: titleId
  })
  query(titleStore)
</script>

<section class="title">
  <AwaitQuery queryStore={titleStore} let:data={{title, comics}}>
    <Breadcrumbs
      publisher={{id: title.publisher.id, name: title.publisher.name}}
      title={{name: title.name}}
    />

    <div>
      <h2>{title.name}</h2>
      <div><a use:link href="/app/titles/{titleId}/edit">(edit)</a></div>
    </div>
    <p>Publisher: {title.publisher.name}</p>
    <p>Year: <NullableString value={title.year}/></p>
    <p>Volume: <NullableString value={title.volume}/></p>

    <h3>Issues:</h3>
    <table>
      <THead>
        <tr>
          <th scope="col">Issue</th>
          <th scope="col">Grade</th>
          <th scope="col">Description</th>
        </tr>
      </THead>
      <tbody>
        {#each comics.items as comic}
          <tr>
            <th scope="row">
              <a use:link href="/app/comics/{comic.id}">{comic.issue_no}</a>
            </th>
            <td>{comic.grade.name}</td>
            <td><NullableString value={comic.description}/></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </AwaitQuery>
</section>

<style>
</style> 