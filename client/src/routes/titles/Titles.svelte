<script lang="ts">
	import { link } from "svelte-routing"
	import AwaitQuery from "../../components/AwaitQuery.svelte"
	import PageTitle from "../../components/PageTitle.svelte"
	import DirectoryList from "../../components/DirectoryList.svelte"
	import { GetTitlesDocument } from "../../graphql/schemas.generated"
	import type { TitlesPage } from "../../graphql/schemas.generated"
	import { operationStore, query } from "@urql/svelte"
	
	const titlesStore = operationStore<{titles: TitlesPage}>(GetTitlesDocument,{
		pageSize: 1000
	})
	query(titlesStore)

	const titleDisplayName = (name: string, year: number = undefined): string => {
		if (year) {
			return `${name} (${year})`
		} else {
			return name
		}
	}
</script>

<PageTitle value="/titles" />
<section class="home">
	<DirectoryList parentDirectory="../comics">
		<AwaitQuery queryStore={titlesStore} let:data={{titles}}>
			{#each titles.items as title (title.id)}
			<tr>
				<td><img src="/icons/folder.gif" alt="[DIR]"></td>
				<th scope="row">
					<a use:link href="/comics/titles/{title.id}">{titleDisplayName(title.name, title.year)}</a>
				</th>
        <td>-</td>
        <td>{title.issue_count || 0}</td>
        <td></td>
			</tr>
			{/each}
		</AwaitQuery>
	</DirectoryList>
</section>

<style>
</style>