<template>
  <b-form-group :label="label" class="col col-lg-6">
    <b-form-input type="number" :value="value"></b-form-input>
  </b-form-group>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: Number,
    default: 0,
  },
})
</script>

<style></style>
