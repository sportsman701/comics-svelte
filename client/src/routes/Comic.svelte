<script lang="ts">
  import { operationStore, query } from "@urql/svelte"
  import { GetComicDocument } from "../graphql/schemas.generated"
  import type { Comic } from "../graphql/schemas.generated"
  import AwaitQuery from "../components/AwaitQuery.svelte"
  import Breadcrumbs from "../components/Breadcrumbs.svelte"
  import NullableString from "../components/NullableString.svelte"

  export let id: string = ""

  const comicId = parseInt(id, 10)

  const comicStore = operationStore<{comic: Comic}>(GetComicDocument, {
    id: comicId
  })

  query(comicStore)
</script>

<section class="comic">
  <AwaitQuery queryStore={comicStore} let:data={{comic}}>
    <Breadcrumbs
      publisher={{id: comic.title.publisher.id, name: comic.title.publisher.name}}
      title={{id: comic.title.id, name: comic.title.name}}
      comic={{name: comic.issue_no.toString()}}
    />
    <h2>{comic.title.name} #{comic.issue_no}</h2>
    <p>Publisher: {comic.title.publisher.name}</p>
    <p>Grade: {comic.grade.name}</p>
    <p>Description: <NullableString value={comic.description}/></p>
  </AwaitQuery>
</section>

<style>
</style>