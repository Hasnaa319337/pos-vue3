<template>
 
     <b-form-group :label="label"  class="col-md-6 col-sm-12">
      <b-form-select  v-model="value">
        <b-form-select-option
        v-for="(key,val) in options" :key="key"
         type="radio" :value="val" :options="options">{{ val }}</b-form-select-option>
      </b-form-select>
     </b-form-group>


      <!-- <b-form-select v-model="settings[12].value">
                        <b-form-select-option
                          v-for="(key,val) in settings[12].options"
                          :key="key" 
                          :value="val"
                          >{{ val }}</b-form-select-option
                        >
                      </b-form-select> -->
 
  </template>
  
  <script setup>
  const props = defineProps({
    options:{
      type:Object
    },
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
  