<script lang="ts">
  import type { OperationStore } from "@urql/svelte"
  
  type T = $$Generic
  interface $$Slots {
    default: {
      data: T
    }
  }

  export let queryStore: OperationStore<T>
</script>

{#if $queryStore.fetching}
  <p>Loading&hellip;</p>
{:else if $queryStore.error}
  <p>Uh-oh:</p>
  <pre><code>{$queryStore.error.message}</code></pre>
{:else}
  <slot data={$queryStore.data} />
{/if}