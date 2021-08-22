<script lang="ts">
  import { link } from "svelte-routing"
  
  export let parentDirectory: string = ""
</script>

<table class="directory">
  <thead>
    <tr>
      <th scope="col" aria-hidden="true"></th>
      <th scope="col">Name</th>
      <th scope="col">Last Modified</th>
      <th scope="col">Size</th>
      <th scope="col">Description</th>
    </tr>
    <tr aria-hidden="true">
      <td colspan="5">
        <hr/>
      </td>
    </tr>
  </thead>
  <tbody>
    {#if parentDirectory}
    <tr>
      <td><img src="/icons/back.gif" alt="[PARENTDIR]"></td>
      <td><a use:link href="{parentDirectory}">Parent Directory</a></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    {/if}
    <slot></slot>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="5">
        <hr/>
      </td>
    </tr>
  </tfoot>
</table>