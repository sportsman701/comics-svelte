<script lang="ts">
	import { Router, Route, Link } from "svelte-routing";
	import { initClient } from "@urql/svelte"

	import Home from "./components/Home.svelte"

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
	<nav>
		<Link to="/">Home</Link>
	</nav>
	<div>
		<Route path="/">
			<Home/>
		</Route>
	</div>
</Router>