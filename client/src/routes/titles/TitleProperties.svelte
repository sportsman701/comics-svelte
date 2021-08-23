<script lang="ts">
  import { link } from "svelte-routing"
  import type { Title, ComicsPage } from "../../graphql/schemas.generated"
  import { GetTitleDocument } from "../../graphql/schemas.generated"
  import { operationStore, query } from "@urql/svelte"
  import Icon from "../../components/Icon.svelte"
  import AwaitQuery from "../../components/AwaitQuery.svelte"
  import DirectoryList from "../../components/DirectoryList.svelte"
  import NullableLength from "../../components/NullableLength.svelte"
  import NullableString from "../../components/NullableString.svelte"
  import PageTitle from "../../components/PageTitle.svelte"

  export let id: string = ""

  const titleId = parseInt(id, 10)

  const titleStore = operationStore<{title: Title, comics: ComicsPage}>(GetTitleDocument, {
    id: titleId
  })
  query(titleStore)

  const propertyHref = (id: string, name: string) => `/comics/titles/${id}/properties/${propertyFileName(name)}`
  const propertyFileName = (name: string) => `${name}.txt`
  const propertyValue = (obj: Title, property: string) => {
    let value = obj[property]
    if (value instanceof Object && value.hasOwnProperty("name")) {
      value = value.name
    }
    return value
  }
  const dateTime = (timestamp: number) => new Date(timestamp * 1000).toUTCString()

  const properties = [
    "name",
    "publisher",
    "url",
    "volume",
    "year"
  ]
</script>

<AwaitQuery queryStore={titleStore} let:data={{title, comics}}>
  <PageTitle value="/comics/titles/{title.name}/properties"/>
  <section class="properties">
    <DirectoryList parentDirectory="/comics/titles/{title.id}">
      {#each properties as property}
      <tr>
        <td><Icon icon="text" alt="property" /></td>
        <th scope="row">
          <a use:link href={propertyHref(title.id, property)}>{propertyFileName(property)}</a>
        </th>
        <td>{dateTime(title.date_updated)}</td>
        <td><NullableLength value={title[property]} /></td>
        <td><NullableString value={propertyValue(title, property)} /></td>
      </tr>
      {/each}
    </DirectoryList>
  </section>
</AwaitQuery>
