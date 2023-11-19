<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card roleEdit">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">
            {{ trans('RolesEdit') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(update)">
                  <b-form-row>
                    <b-col class="col-6">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + '(Ar)'"
                      >
                        <b-form-group :label="trans('title') + ' (AR) '">
                          <b-input
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
                            <div
                              v-for="(group, key) in perms"
                              :key="key"
                              class="group"
                            >
                              <div
                                class="d-flex"
                                style="justify-content: space-between"
                              >
                                <h3>{{ trans(key) }}</h3>
                                <button
                                  @click="selectAllInputs(group)"
                                  type="button"
                                  style="
                                    color: #3fa7c2;
                                    font-size: 20px;
                                    background: none;
                                    border: none;
                                  "
                                >
                                  {{ trans('select_all') }}
                                </button>
                              </div>
                              <ul class="row">
                                <li
                                  v-for="prem in group"
                                  class="col-3"
                                  :key="prem"
                                >
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
                          <v-btn @click="overlay = false" class="save">
                            {{ trans('save') }}
                          </v-btn>
                        </div>
                      </v-overlay>
                    </v-row>
                  </b-form-row>
                  <b-form-row
                    class="justify-content-center"
                    style="gap: 23px; margin-top: 25px"
                  >
                    <b-button variant="success" type="submit">
                      {{ trans('save') }}
                    </b-button>
                    <b-button variant="danger" @click="resetForm()">
                      <span style="display: block">{{ trans('cancel') }}</span>
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
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
      selectedAll: true,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.getPermissions()
    this.getRolesData()
  },
  methods: {
    selectAllInputs(group) {
      if (this.selectedAll) {
        group.map(el => {
          this.role.permissions.push(el['id'])
        })
        this.selectedAll = false
      } else {
        group.map(el => {
          this.role.permissions.pop(el['id'])
        })
        this.selectedAll = true
      }
    },
    select(x) {
      console.log(x)
      if (this.role.permissions.length !== this.perms.length) {
        this.isAllSelected = false
      } else {
        this.isAllSelected = true
      }
    },

    getPermissions() {
      axios.get('/api/permissions').then(res => {
        this.perms = _.groupBy(res.data.body.permissions, 'group')
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
        .catch(err => {
          console.log(err)
        })
    },
    update() {
      let myData = {
        name: this.role.name,
        title: {
          ar: this.role.title.ar,
          en: this.role.title.en,
        },

        permissions: this.role.permissions,
        guard_name: this.role.guard_name,
      }

      axios
        .put('/api/roles/' + this.$route.params.id, myData)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
          }
          setTimeout(() => {
            this.$router.push('/roles')
          }, 1500)
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    resetForm() {
      ;(this.role.title.ar = ''),
        (this.role.title.en = ''),
        (this.role.name = ''),
        (this.role.guard_name = ''),
        (this.role.permissions = [])
      this.$router.push('/roles')
    },
  },
}
</script>

<style>
.roleEdit .group {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}
</style>
