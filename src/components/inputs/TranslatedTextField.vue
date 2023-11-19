<template>
  <b-form-group :label="label" class="col col-lg-6">
    <b-form-input type="text" :value="value" :language="language">
    </b-form-input>
  </b-form-group>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: Text,
    default: 0,
  },
  languages: {
    type: Array,
    default: localStorage.getItem('languages'),
  },
  language: {
    type: Text,
    default: 'ar',
  },
})
</script>

<style></style>
