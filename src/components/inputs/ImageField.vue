<template>
  <div>
    <b-form-group :label="label" style="padding: 16px">
      <b-img
        :src="value"
        width="100"
        style="margin: 10px; border-radius: 5px; margin-top: 0"
      />

      <b-form-file type="image" :value="value"    @change="onFileChange($event, index)"></b-form-file>
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
function onFileChange(e, index) {
  let files = e.target.files || e.dataTransfer.files
  if (!files.length) return
  this.createImage(files[0], index)
}
function createImage(file, index) {
  var image = new Image()
  var reader = new FileReader()
  var vm = this

  reader.onload = e => {
    vm.settings[index].value = e.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<style></style>
