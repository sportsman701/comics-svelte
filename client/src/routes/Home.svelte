<script lang="ts">
	import {link} from "svelte-routing"
	import DirectoryList from "../components/DirectoryList.svelte"
	import Icon from "../components/Icon.svelte"
	import PageTitle from "../components/PageTitle.svelte"
</script>

<PageTitle value="/" />
<section class="home">
	<DirectoryList>
			<tr>
        <td><Icon icon="folder" alt="dir"/></td>
				<th scope="row">
					<a use:link href="/comics">comics</a>
				</th>
				<td>-</td>
        <td></td>
        <td>Comics Listings</td>
			</tr>
			<tr>
        <td><Icon icon="folder" alt="dir"/></td>
				<th scope="row">
					<a use:link href="/site-properties">site-properties</a>
				</th>
				<td>-</td>
        <td></td>
        <td></td>
			</tr>
	</DirectoryList>
</section>
