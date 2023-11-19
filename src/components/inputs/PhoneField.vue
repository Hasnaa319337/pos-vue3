<template>
    <div>
      <b-form-group :label="label" class="col col-lg-6">
        <b-form-input type="phone" :value="value"></b-form-input>
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
      default: null,
    },
  })
  </script>
  
  <style></style>
  