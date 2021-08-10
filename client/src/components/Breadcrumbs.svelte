<script lang="ts">
  import { link } from "svelte-routing"
  
  type BreadcrumbProp = {
    id: string,
    name: string
  }

  const defaultProp: BreadcrumbProp = {id: null, name: null}

  export let publisher: BreadcrumbProp = defaultProp
  export let title: BreadcrumbProp = defaultProp
  export let comic: BreadcrumbProp = defaultProp
</script>

<nav class="breadcrumbs">
  <ul>
    <li>
      <a use:link href="/">Home</a>
    </li>
    {#if publisher.id}
    <li>
      <span>&raquo;</span> <a use:link href="/app/publishers/{publisher.id}">{publisher.name}</a>
    </li>
    {/if}
    {#if title.id}
    <li>
      <span>&raquo;</span> <a use:link href="/app/titles/{title.id}">{title.name}</a>
    </li>
    {/if}
    {#if comic.id}
    <li>
      <span>&raquo;</span> <a use:link href="/app/comics/{comic.id}">#{comic.name}</a>
    </li>
    {/if}
  </ul>
</nav>

<style>
ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
span {
  color:var(--grey);
  margin: 0 1em;
}
</style>