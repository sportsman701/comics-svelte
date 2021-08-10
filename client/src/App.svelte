<script lang="ts">
	import { Router, Route, Link } from "svelte-routing"
	import { initClient } from "@urql/svelte"

	import Home from "./routes/Home.svelte"
	import Title from "./routes/Title.svelte"
	import Comic from "./routes/Comic.svelte"
	import Publisher from "./routes/Publisher.svelte"

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

<header>
	<h1 class="title">Comics!</h1>
</header>
<Router {url}>
	<Route path="/">
		<Home/>
	</Route>
	<Route path="app/titles/:id" let:params>
		<Title id="{params.id}" />
	</Route>
	<Route path="app/comics/:id" let:params>
		<Comic id="{params.id}" />
	</Route>
	<Route path="app/publishers/:id" let:params>
		<Publisher id="{params.id}" />
	</Route>
</Router>
<footer>
	<p>&copy; Copyright Me.</p>
</footer>
