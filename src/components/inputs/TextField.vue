<template>
  
      <b-form-group :label="label" class="col-md-6 col-sm-12">
        <b-form-input type="text" :value="value"></b-form-input>
      </b-form-group>
 
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: Text,
    default: '',
  },
})
</script>

<style></style>
