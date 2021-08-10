<script lang="ts">
	import { link } from "svelte-routing"
	import AwaitQuery from "../components/AwaitQuery.svelte"
	import NullableString from "../components/NullableString.svelte"
	import THead from "../components/THead.svelte"
	import { GetTitlesDocument } from "../graphql/schemas.generated"
	import type { TitlesPage } from "../graphql/schemas.generated"
	import { operationStore, query } from "@urql/svelte"
	
	const titlesStore = operationStore<{titles: TitlesPage}>(GetTitlesDocument,{
		pageSize: 1000
	})
	query(titlesStore)
</script>

<section class="home">
	<AwaitQuery queryStore={titlesStore} let:data={{titles}}>
		<p>Showing {titles.items.length} of {titles.totalCount} results</p>
		<table>
			<THead>
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Publisher</th>
					<th scope="col">Year</th>
					<th scope="row">Volume</th>
				</tr>
			</THead>
			<tbody>
				{#each titles.items as title}
				<tr>
					<th scope="row">
						<a use:link href="/app/titles/{title.id}">{title.name}</a>
					</th>
					<td>
						<a use:link href="/app/publishers/{title.publisher.id}">{title.publisher.name}</a>
					</td>
					<td><NullableString value={title.year}/></td>
					<td><NullableString value={title.volume}/></td>
				</tr>
				{/each}
			</tbody>
		</table>
	</AwaitQuery>
</section>

<style>
</style>