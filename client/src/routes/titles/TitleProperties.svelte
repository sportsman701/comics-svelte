<script type="ts">
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
  export let type: string = ""
  console.log(type)

  const titleId = parseInt(id, 10)

  const titleStore = operationStore<{title: Title, comics: ComicsPage}>(GetTitleDocument, {
    id: titleId
  })
  query(titleStore)

  const propertyHref = (id: string, name: string) => `/comics/titles/${id}/properties/${name}.txt`
  const propertyLink = (id: string, name: string) => `<a use:link href="${propertyHref(id, name)}">${name}.txt</a>`
  const dateTime = (timestamp: number) => new Date(timestamp * 1000).toUTCString()
</script>

<AwaitQuery queryStore={titleStore} let:data={{title, comics}}>
  <PageTitle value="/comics/titles/{title.name}/properties"/>
  <section class="properties">
    <DirectoryList parentDirectory="/comics/titles/{title.id}">
      <tr>
        <td><Icon icon="text" alt="property" /></td>
        <th scope="row">{@html propertyLink(title.id, "name")}</th>
        <td>{dateTime(title.date_updated)}</td>
        <td>{title.name.toString().length}</td>
        <td>{title.name}</td>
      </tr>
      <tr>
        <td><Icon icon="text" alt="property" /></td>
        <th scope="row">{@html propertyLink(title.id, "publisher")}</th>
        <td>{dateTime(title.date_updated)}</td>
        <td>{title.publisher.name.length}</td>
        <td>{title.publisher.name}</td>
      </tr>
      <tr>
        <td><Icon icon="text" alt="property" /></td>
        <th scope="row">{@html propertyLink(title.id, "url")}</th>
        <td>{dateTime(title.date_updated)}</td>
        <td><NullableLength value={title.url} /></td>
        <td><NullableString value={title.url} /></td>
      </tr>
      <tr>
        <td><Icon icon="text" alt="property" /></td>
        <th scope="row">{@html propertyLink(title.id, "volume")}</th>
        <td>{dateTime(title.date_updated)}</td>
        <td><NullableLength value={title.volume} /></td>
        <td><NullableString value={title.volume} /></td>
      </tr>
      <tr>
        <td><Icon icon="text" alt="property" /></td>
        <th scope="row">{@html propertyLink(title.id, "year")}</th>
        <td>{dateTime(title.date_updated)}</td>
        <td><NullableLength value={title.year} /></td>
        <td><NullableString value={title.year} /></td>
      </tr>
    </DirectoryList>
  </section>
</AwaitQuery>
