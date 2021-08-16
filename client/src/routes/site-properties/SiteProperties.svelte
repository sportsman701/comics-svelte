<script type="ts">
  import { link } from "svelte-routing"
  import DirectoryList from "../../components/DirectoryList.svelte"
  import Icon from "../../components/Icon.svelte"
  import PageTitle from "../../components/PageTitle.svelte"
  import { properties } from "../../stores/properties"

</script>

<section class="properties">
  <PageTitle value="/properties"/>
  <DirectoryList parentDirectory="/">
    <tr>
      <td><Icon icon="text" alt="property" /></td>
      <th scope="row">
        <a use:link href="/site-properties/owner.txt">owner.txt</a>
      </th>
      <td>-</td>
      <td></td>
      <td>{$properties.owner}</td>
    </tr>
    <tr>
      <td><Icon icon="text" alt="property" /></td>
      <th scope="row">
        <a use:link href="/site-properties/copyrightYear.txt">copyrightYear.txt</a>
      </th>
      <td>-</td>
      <td></td>
      <td>{$properties.copyrightYear}</td>
    </tr>
  </DirectoryList>
</section>