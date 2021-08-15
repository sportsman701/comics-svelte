<script type="ts">
  export let value: string | number
  let valueLength = "-"

  switch(true) {
    case value === null:
    case value === undefined:
    case value === NaN:
      break
    case typeof value === "string":
    case typeof value === "number":
      valueLength = String(value).length.toString()
      break;
  }
</script>

{valueLength}