<template>
  <div>
    <b-form-group :label="label">
      <b-form-input type="checkbox" :value="value"></b-form-input>
    </b-form-group>
  </div>
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
