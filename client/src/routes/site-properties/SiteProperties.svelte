<script lang="ts">
  import { link } from "svelte-routing"
  import DirectoryList from "../../components/DirectoryList.svelte"
  import Icon from "../../components/Icon.svelte"
  import NullableLength from "../../components/NullableLength.svelte"
  import NullableString from "../../components/NullableString.svelte"
  import PageTitle from "../../components/PageTitle.svelte"
  import { properties, defaultState } from "../../stores/properties"

  const siteProperties = Object.keys(defaultState)
</script>

<section class="properties">
  <PageTitle value="/properties"/>
  <DirectoryList parentDirectory="/">
    {#each siteProperties as property}
    <tr>
      <td><Icon icon="text" alt="property" /></td>
      <th scope="row">
        <a use:link href="/site-properties/{property}.txt">{property}.txt</a>
      </th>
      <td>-</td>
      <td><NullableLength value={$properties[property]}/></td>
      <td><NullableString value={$properties[property]}/></td>
    </tr>
    {/each}
  </DirectoryList>
</section>