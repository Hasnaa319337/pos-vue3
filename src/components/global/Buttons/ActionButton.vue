<template>
  <router-link
    v-b-tooltip.hover
    :title="trans('record_procedures')"
    style="cursor: pointer; color: rgb(39, 182, 51) !important ; font-size: 0.875rem"
    class="mx-2"
    :to="{ name: 'ResourceActions', params: propsFn() }"
  >
    <button>
      <i class="bi bi-activity"></i>
    </button>
  </router-link>
</template>

<script>
export default {
  props: ['id', 'resource_name'],
  data() {
    return {}
  },

  methods: {
    propsFn() {
      return {
        id: this.id,
        resource_name: this.resource_name
      }
    }
  }
}
</script>

<style>
.table td img:not(.thumb-image),
.table th img:not(.thumb-image) {
  width: 22px !important;
  min-width: 18px !important;
  max-width: 22px !important;
  height: 20px !important;
  border-radius: 0 !important;
}
</style>
