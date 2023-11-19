<template>
  <button v-b-tooltip.hover :title="trans('delete')" class="mx-2" @click="$emit('delete', unit)">
    <i class="bi bi-trash3-fill"></i>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
button {
  cursor: pointer;
  color: #dc3545 !important;
  font-size: 17px;
  background: #74d4f466;
  width: 30px !important;
  display: inline-block;
  height: 27px;
  line-height: 1.8;
  border-radius: 2px;
  font-weight: bold;
}
</style>
