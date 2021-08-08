<script lang="ts">
	import { GetTitlesDocument } from "../graphql/schemas.generated"
	import { operationStore, query } from "@urql/svelte"
	
	const titlesQuery = query(operationStore(GetTitlesDocument,{
		pageSize: 1000
	}))
</script>

<main>
	{#if $titlesQuery.fetching }
		<p>Loading&hellip;</p>
	{:else if $titlesQuery.error}
		<p>Uh-oh! &rarr; {$titlesQuery.error.message}</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Publisher</th>
					<th scope="col">Year</th>
					<th scope="row">Volume</th>
				</tr>
			</thead>
			<tbody>
				{#each $titlesQuery.data.titles.items as title}
					<tr>
						<th scope="row">{title.name}</th>
						<td>{title.publisher.name}</td>
						<td>{title.year || ""}</td>
						<td>{title.volume || ""}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</main>

<style>
</style>