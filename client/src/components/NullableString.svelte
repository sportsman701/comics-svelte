<script lang="ts">
  export let value: string | number
  let isNull = false

  switch(true) {
    case value === null:
    case value === undefined:
    case typeof value === "string" && !value.length:
    case typeof value === "number" && value === NaN:
      isNull = true
      break;
  }
</script>

{#if value === null}
<span>/null/</span>
{:else}
{value}
{/if}

<style>
  span {
    color: var(--lightgrey);
  }
</style>