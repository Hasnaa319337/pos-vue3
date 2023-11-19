<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <div
        class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
      >
        <h4 class="card-title">{{ trans('Permissions') }}</h4>
        <div class="dropdown"></div>
      </div>
      <div class="card-body">
        <div class="row mx-0 align-items-start justify-content-between mb-4">
          <div class="col-sm-12 text-center" v-if="this.message.length">
            <div
              class="alert"
              :class="'alert-' + alertType"
              v-html="this.message"
            ></div>
          </div>
          <div class="clear clearfix"></div>
          <b-col cols="12" md="4">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <b-form @submit.prevent="handleSubmit(store)">
                <ValidationProvider
                  rules="required"
                  v-slot="{ valid, errors }"
                  name="slug"
                >
                  <b-form-group :label="trans('slug')">
                    <b-form-input
                      type="text"
                      v-model="permission.slug"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  :rules="language == 'ar' ? 'required' : ''"
                  v-slot="{ valid, errors }"
                  :name="language == 'name_ar'"
                >
                  <b-form-group :label="trans('title') + ' (Ar) '">
                    <b-form-input
                      type="text"
                      v-model="permission.x_title[ar]"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>

                <ValidationProvider
                  :rules="language == 'ar' ? 'required' : ''"
                  v-slot="{ valid, errors }"
                  :name="language == 'name'"
                >
                  <b-form-group :label="trans('title') + ' (EN) '">
                    <b-form-input
                      type="text"
                      v-model="permission.x_title[en]"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>

                <b-form-row class="justify-content-center mb-4">
                  <b-button variant="success" type="submit">
                    <font-awesome-icon icon="fa-solid fa-check" />
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </b-col>
          <b-col cols="12" md="8">
            <b-table-simple
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px"
            >
              <b-thead>
                <b-tr class="rounded" variant="dark">
                  <b-th>{{ trans('slug') }}</b-th>
                  <b-th>{{ trans('title') }} (Ar) </b-th>
                  <b-th>{{ trans('title') }} (En) </b-th>
                  <b-th>{{ trans('group') }} </b-th>
                  <!-- <b-th>{{ trans('created_at') }}</b-th> -->
                </b-tr>
              </b-thead>
              <b-tbody v-if="loaded && permissions.length" class="text-center">
                <b-tr v-for="perm in permissions" :key="perm.id">
                  <b-td>{{ perm.slug }}</b-td>
                  <b-td>{{ perm.title }} </b-td>
                  <b-td>{{ perm.name }} </b-td>
                  <b-td>{{ perm.group }} </b-td>

                  <!-- <b-td>{{ perm.created_at }}</b-td> -->
                </b-tr>
              </b-tbody>
              <b-tbody
                v-else-if="loaded && !permissions.length"
                class="text-center"
              >
                <b-tr>
                  <b-td colspan="3">
                    <h5 class="no_results_found">
                      {{ trans('no_results_found') }}
                    </h5>
                  </b-td>
                </b-tr>
              </b-tbody>
              <b-tbody v-else class="text-center">
                <b-tr>
                  <b-td colspan="3">
                    <font-awesome-icon
                      class="fa-spin-pulse"
                      icon="fa-solid fa-spinner "
                    />
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body text-center">
        <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppPermissions',
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'language'],
  data() {
    return {
      message: '',
      alertType: 'success',
      permission: {
        x_title: {},
      },
      permissions: [],
      strings: [],
      loaded: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.loaded = false
      axios
        .get('/api/permissions')
        .then(res => {
          this.permissions = res.data.body.permissions
          this.strings = res.data.strings
          this.loaded = true
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      // console.log(this.permission);
      axios
        .post('/api/permissions/store', this.permission)
        .then(res => {
          if (res.data.success) {
            this.message = res.data.message
            this.alertType = 'success'
            this.permissions.push(res.data.permission)
            this.permission = {
              x_title: {},
            }
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
        })
    },
  },
}
</script>
