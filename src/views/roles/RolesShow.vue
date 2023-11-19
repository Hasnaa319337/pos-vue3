<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">
            {{ trans('RolesShow') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <b-form-row>
                <b-col class="col-6">
                  <ValidationProvider
                    rules="required|arabicLettersAndNumbersOnly"
                    v-slot="{ valid, errors }"
                    :name="trans('title') + '(Ar)'"
                  >
                    <b-form-group :label="trans('title') + ' (AR) '">
                      <b-input
                        disabled
                        type="text"
                        v-model="role.title.ar"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts arabic words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>

                <b-col class="col-6">
                  <ValidationProvider
                    rules="required|englishLettersAndNumbersOnly"
                    v-slot="{ valid, errors }"
                    :name="trans('title') + '(EN)'"
                  >
                    <b-form-group :label="trans('title') + '( EN )'">
                      <b-form-input
                        disabled
                        type="text"
                        v-model="role.title.en"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col class="col-6">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ valid, errors }"
                    :name="trans('slug')"
                  >
                    <b-form-group :label="trans('slug')">
                      <b-form-input
                        disabled
                        type="text"
                        v-model="role.name"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                        {{ trans('without sapces') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
                <b-col
                  class="col-6"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    justify-items: center;
                    margin-top: 13px;
                  "
                >
                  <v-btn
                    class="white--text permBtn"
                    color="teal"
                    @click="overlay = !overlay"
                  >
                    {{ trans('Permissions') }}
                  </v-btn>
                </b-col>

                <v-row justify="center">
                  <v-overlay :z-index="zIndex" :value="overlay">
                    <div class="contain">
                      <font-awesome-icon
                        style="
                          font-size: 25px;
                          position: fixed;
                          left: 85px;
                          color: #cf1212;
                          padding: 5px;
                          border-radius: 50%;
                          cursor: pointer;
                        "
                        icon="fa fa-close"
                        @click="overlay = false"
                      />
                      <div>
                        <div v-for="(group, key) in perms" :key="key">
                          <h3>{{ trans(key) }}</h3>
                          <ul class="row">
                            <li v-for="prem in group" class="col-3" :key="prem">
                              <div>
                                <label
                                  ><input
                                    type="checkbox"
                                    v-model="role.permissions"
                                    :value="prem.id"
                                    @click="select(role.permissions)"
                                  />{{ prem.title }}</label
                                >
                              </div>
                            </li>
                          </ul>

                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </v-overlay>
                </v-row>
              </b-form-row>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card text-center">
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

export default {
  components: { SkeletonLoader },
  name: 'AppRolesEdit',
  props: ['section', 'sections', 'user'],
  data() {
    return {
      role: {
        permissions: [],
        name: '',
        guard_name: 'api',
        title: {
          ar: '',
          en: '',
        },
      },
      strings: [],
      secs: [],
      perms: [],
      loaded: false,
      roleTitle: '',
      overlay: false,
      zIndex: 1500,
      isAllSelected: false,
      isAllSelected2: false,
      selectedCatIds: [],
      permissionGroups: [],
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.getPermissions()
    this.getRolesData()
  },
  methods: {
    select(x) {
      console.log(x)
      if (this.role.permissions.length !== this.perms.length) {
        this.isAllSelected = false
      } else {
        this.isAllSelected = true
      }
    },

    getPermissions() {
      axios
        .get('/api/permissions')
        .then(res => {
          this.perms = _.groupBy(res.data.body.permissions, 'group')
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    getRolesData() {
      axios
        .get('/api/roles/' + this.$route.params.id)
        .then(res => {
          this.loaded = true
          this.role.name = res.data.body.roles.name
          this.role.permissions = res.data.body.roles.permissions
          this.role.title.ar = res.data.body.roles.translation.title.ar
          this.role.title.en = res.data.body.roles.translation.title.en
          this.role.guard_name = res.data.body.roles.guard_name

          this.role.permissions = res.data.body.roles.permissions.map(el => {
            el['id']
            return el['id']
          })
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
  },
}
</script>
