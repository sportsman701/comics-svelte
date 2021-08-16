<script lang="ts">
	import { Router, Route } from "svelte-routing"
	import { initClient } from "@urql/svelte"

	import NotFound from "./routes/NotFound.svelte"
	import Home from "./routes/Home.svelte"
	import Title from "./routes/titles/Title.svelte"
	import Titles from "./routes/titles/Titles.svelte"
	import Comic from "./routes/comics/Comic.svelte"
	import Comics from "./routes/comics/Comics.svelte"
	import Publisher from "./routes/publishers/Publisher.svelte"
	import Publishers from "./routes/publishers/Publishers.svelte"
	import TitleProperty from "./routes/titles/TitleProperty.svelte"
	import TitleProperties from "./routes/titles/TitleProperties.svelte"
	import SiteProperties from "./routes/site-properties/SiteProperties.svelte"
	import SiteProperty from "./routes/site-properties/SiteProperty.svelte"

	import { properties } from "./stores/properties"

	export let url = ""

	initClient({
		url: "http://localhost:3000/graphql",
		fetchOptions: () => {
		// insert api auth token header once we have authorization
		/*
		const token = ...
		return {
			headers: {
			authorization: `Bearer ${token}`
			}
		}
		*/
		return {}
		}
	})
</script>

<Router {url}>
	<Route path="/site-properties">
		<SiteProperties/>
	</Route>
	<Route path="/site-properties/:property" let:params>
		<SiteProperty property={params.property}/>
	</Route>

	<Route path="comics/titles/:id/properties/:property" let:params>
		<TitleProperty id={params.id} property={params.property} />
	</Route>
	<Route path="comics/titles/:id/properties" let:params>
		<TitleProperties id={params.id} type="title" />
	</Route>
	<Route path="comics/titles/:id" let:params>
		<Title id={params.id} />
	</Route>
	<Route path="comics/titles">
		<Titles/>
	</Route>
	
	<Route path="comics/publishers/:id" let:params>
		<Publisher id={params.id} />
	</Route>
	<Route path="comics/publishers">
		<Publishers/>
	</Route>
	
	<Route path="comics/comics/:id" let:params>
		<Comic id={params.id} />
	</Route>
	
	<Route path="comics">
		<Comics/>
	</Route>
	
	<Route path="/">
		<Home/>
	</Route>
	
	<Route>
		<NotFound/>
	</Route>
</Router>

<footer>
	<p>&copy; Copyright {$properties.copyrightYear} {$properties.owner}</p>
</footer>
