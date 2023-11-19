<template>
  <button v-b-tooltip.hover :title="trans('edit')" class="mx-2" @click="$emit('edit', unit)">
    <i class="bi bi-pencil-square"></i>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
button {
  cursor: pointer;
  color: rgb(0, 123, 255) !important;
  background: #74d4f466;
  width: 30px !important;
  display: inline-block;
  height: 27px;
  line-height: 1.9;
  border-radius: 2px;
  font-weight: bold;
}
</style>
