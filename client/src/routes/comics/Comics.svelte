<script lang="ts">
  import { link } from "svelte-routing"
  import PageTitle from "../../components/PageTitle.svelte"
  import DirectoryList from "../../components/DirectoryList.svelte"
</script>

<PageTitle value="/comics"/>
<section class="comics">
  <DirectoryList parentDirectory="/">
			<tr>
        <td><img src="/icons/folder.gif" alt="[DIR]"></td>
				<th scope="row">
          <a use:link href="/comics/titles">titles</a>
        </th>
        <td>-</td>
        <td></td>
        <td>Comics by Title</td>
      </tr>
      <tr>
        <td><img src="/icons/folder.gif" alt="[DIR]"></td>
        <th scope="row">
          <a use:link href="/comics/publishers">publishers</a>
        </th>
        <td>-</td>
        <td></td>
        <td>Comics by Publisher</td>
      </tr>
  </DirectoryList>
</section>
