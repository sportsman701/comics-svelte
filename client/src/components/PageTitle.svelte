<script lang="ts">
  export let value: string = ""
  export let isDirectory: boolean = true
</script>

<header>
  <h1>{#if isDirectory}Index of {/if}{value}</h1>
</header>