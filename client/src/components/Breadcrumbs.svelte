<script lang="ts">
  import { link } from "svelte-routing"
  
  type BreadcrumbProp = {
    id?: string,
    name: string
  }

  const defaultProp: BreadcrumbProp = {id: null, name: null!}

  export let publisher: BreadcrumbProp = defaultProp
  export let title: BreadcrumbProp = defaultProp
  export let comic: BreadcrumbProp = defaultProp
  export let tail: string = null

  const wrapLink = (prefix: string, entry: BreadcrumbProp): string => {
    console.log(entry.id, entry.name)
    if (!entry.id) {
      return entry.name
    }

    return `<a use:link href="${prefix}/${entry.id}">${entry.name}</a>`
  }
</script>

<nav class="breadcrumbs">
  <ul>
    <li>
      <a use:link href="/">Home</a>
    </li>
    {#if publisher.name}
    <li>
      <span>&raquo;</span> {@html wrapLink("/app/publishers", publisher)}
    </li>
    {/if}
    {#if title.name}
    <li>
      <span>&raquo;</span> {@html wrapLink("/app/titles", title)}
    </li>
    {/if}
    {#if comic.name}
    <li>
      <span>&raquo;</span> {@html wrapLink("/app/comics",comic)}
    </li>
    {/if}
    {#if tail}
    <li>
      <span>&raquo;</span> {tail}
    </li>
    {/if}
  </ul>
</nav>

<style>
.breadcrumbs ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.breadcrumbs span {
  color:var(--grey);
  margin: 0 1em;
}
</style>