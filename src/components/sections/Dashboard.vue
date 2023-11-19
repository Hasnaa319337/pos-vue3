<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4
            class="card-title"
            v-if="user.language"
            v-text="
              user.language == 'en'
                ? section.title
                : section.x_title.filter(x => x.language == user.language)[0]
                    .value
            "
          ></h4>
          <div class="dropdown"></div>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="wrapper text-center comming-soon">
              <img src="@/assets/images/comming-soon.png" alt="" />
              <h1 class="">
                {{ trans('it_is_only_available_in_the_paid_version') }}
              </h1>
              <h4>
                {{ trans('to_get_the_paid_version') }}
              </h4>
              <a href="#" class="btn btn-primary">
                {{ trans('call_us') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppDashboard',
  props: ['section', 'sections', 'user', 'user_language', 'strings'],
  data() {
    return {}
  },
  methods: {},
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>
<style scoped>
/* .comming-soon h1{
        margin-top: -10%;
    } */
.comming-soon img {
  max-width: 100%;
}
</style>
