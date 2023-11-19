<template>
  <div class="col-sm-12 grid-margin stretch-card userEdit">
    <div class="card" v-if="loaded">
      <div
        class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
      >
        <h4 class="card-title">{{ trans('UsersEdit') }} : {{ usr.name }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>

      <div class="card-body">
        <div class="row mx-0 align-items-center justify-content-between mb-4">
          <ValidationObserver
            class="w-100"
            v-slot="{ handleSubmit }"
            ref="form"
          >
            <b-form @submit.prevent="handleSubmit(update)">
              <b-row>
                <ValidationProvider
                  rules="required"
                  v-slot="{ valid, errors }"
                  name="title"
                  class="col-6"
                >
                  <b-form-group :label="trans('name')">
                    <b-form-input
                      v-model="usr.name"
                      type="text"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('required_field') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>

                <ValidationProvider
                  rules="required|email"
                  v-slot="{ valid, errors }"
                  name="email"
                  class="col-6"
                >
                  <b-form-group :label="trans('email')">
                    <b-form-input
                      v-model="usr.email"
                      type="text"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('required_field') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-row>

              <b-row>
                <ValidationProvider
                  :name="trans('username')"
                  rules="required|englishLettersOnly"
                  v-slot="{ valid, errors }"
                  class="col-6"
                >
                  <b-form-group :label="trans('username')">
                    <b-form-input
                      v-model="usr.username"
                      type="text"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('This field accepts English words only') }}
                      {{ trans('without sapces') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  v-slot="{ valid, errors }"
                  :name="trans('phone')"
                  class="col-6"
                >
                  <b-form-group :label="trans('phone')">
                    <vue-phone-number-input
                      :state="errors[0] ? false : valid ? true : null"
                      :only-countries="['SA', 'EG']"
                      v-model="usr.phone"
                      :default-country-code="usr.phone_utility.country"
                      required
                      placeholder=""
                      @update="onCountryChange"
                    ></vue-phone-number-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('required_field') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-row>

              <b-row>
                <ValidationProvider
                  name="inventory"
                  rules="required"
                  v-slot="{ valid, errors }"
                  class="col-6"
                >
                  <b-form-group :label="trans('inventory')">
                    <b-form-select
                      v-model="usr.inventory_id"
                      :state="errors[0] ? false : valid ? true : null"
                    >
                      <b-form-select-option
                        v-for="inv in invs"
                        :value="inv.id"
                        :key="inv.id"
                      >
                        {{ inv.title }}
                      </b-form-select-option>
                    </b-form-select>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('required_field') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>

                <ValidationProvider
                  name="language"
                  rules="required"
                  v-slot="{ valid, errors }"
                  class="col-6"
                >
                  <b-form-group :label="trans('Language')">
                    <b-form-select
                      v-model="usr.language_locale"
                      :state="errors[0] ? false : valid ? true : null"
                    >
                      <b-form-select-option
                        v-for="lang in langs"
                        :value="lang.locale"
                        :key="lang.id"
                      >
                        {{ lang.title }}
                      </b-form-select-option>
                    </b-form-select>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('required_field') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-row>

              <b-row>
                <ValidationProvider
                  name="password"
                  rules="min:8|verify_password"
                  v-slot="{ valid, errors }"
                  class="col-6"
                >
                  <b-form-group :label="trans('Password')">
                    <b-form-input
                      v-model="usr.password"
                      :type="show1 ? 'password' : 'text'"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('password_validation') }}
                    </b-form-invalid-feedback>
                    <button
                      type="button"
                      @click="show1 = !show1"
                      style="position: absolute; left: 24px; top: 54px"
                    >
                      <span v-if="!show1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </span>
                      <span v-else>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                          />
                          <path
                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                          />
                          <path
                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </span>
                    </button>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  name="password_confirmation"
                  rules="min:8|confirmed:password"
                  v-slot="{ valid, errors }"
                  class="col-6"
                >
                  <b-form-group :label="trans('Password confirmation') + ' * '">
                    <b-form-input
                      style="position: relative"
                      v-model="usr.password_confirmation"
                      :type="show2 ? 'password' : 'text'"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('password_not_matching') }}
                    </b-form-invalid-feedback>

                    <button
                      type="button"
                      @click="show2 = !show2"
                      style="position: absolute; left: 24px; top: 54px"
                    >
                      <span v-if="!show2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </span>
                      <span v-else>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                          />
                          <path
                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                          />
                          <path
                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </span>
                    </button>
                  </b-form-group>
                </ValidationProvider>
              </b-row>

              <b-form-row
                class="justify-content-center"
                style="margin-top: 40px"
              >
                <b-button variant="success" type="submit"
                  ><font-awesome-icon icon="fa-solid fa-check" />
                </b-button>
              </b-form-row>
            </b-form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <skeleton-loader />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import axios from 'axios'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

Vue.use(VuejsDialog)
export default {
  components: { SkeletonLoader },
  name: 'AppUsersEdit',
  props: ['section', 'sections', 'user', 'user_language'],
  data() {
    return {
      show1: true,
      show2: true,
      countryCode: 'EG',
      loaded: false,

      usr: {
        name: '',
        username: '',
        email: '',
        language_locale: '',
        inventory_id: '',
        phone: '',
        assign_role: [],
        assign_permissions: [],
        password: null,
        password_confirmation: null,
      },
      roles: [],
      permissions: [],
      strings: [],
      invs: [],
      langs: [],
      myPhone: '',
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.getRoles()
    this.getUser()
    this.getInventories()
    this.getLanguages()
    this.getPermissions()
    this.getAssignRoles()
    this.getAssignPermissions()
  },

  methods: {
    onCountryChange(e) {
      this.countryCode = e.countryCode
      this.myPhone = e.formattedNumber
      console.log(e)
    },
    select() {
      if (this.usr.assign_permissions.length !== this.permissions.length) {
        this.isAllSelected2 = false
        console.log(' assign_permissions ' + this.usr.assign_permissions)
        console.log(' assign_permissions ' + this.permissions)
      } else {
        this.isAllSelected2 = true
      }
    },

    getAssignRoles() {
      axios
        .get('api/user/' + this.$route.params.id + '/assign-roles')
        .then(res => {
          // this.usr.assign_role = res.data.body.roles

          this.usr.assign_role = res.data.body.roles.map(el => {
            el['id']
            return el['id']
          })
        })
        .catch(err => {})
    },
    getAssignPermissions() {
      axios
        .get('api/user/' + this.$route.params.id + '/assign-permissions')
        .then(res => {
          // this.usr.assign_permissions = res.data.body.permissions
          this.usr.assign_permissions = res.data.body.permissions.map(el => {
            el['id']
            return el['id']
          })
          console.log(this.usr.assign_permissions)
        })
        .catch(err => {})
    },

    getInventories() {
      axios.get('/api/inventories').then(res => {
        this.invs = res.data.body.inventories.data
      })
    },
    getLanguages() {
      axios.get('/api/languages').then(res => {
        this.langs = res.data.body.languages.data
      })
    },
    getPermissions() {
      axios.get('/api/permissions').then(res => {
        this.permissions = res.data.body.permissions
      })
    },

    getUser() {
      axios
        .get('api/users/' + this.$route.params.id)
        .then(res => {
          if (res.data.status) {
            this.loaded = true

            this.usr = res.data.body.user
            this.usr.inventory_id = res.data.body.user.inventory.id
            this.usr.language_locale = res.data.body.user.language.locale
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    getRoles() {
      axios
        .get('/api/roles')
        .then(res => {
          this.roles = res.data.body.roles.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    update() {
      let data = {
        name: this.usr.name,
        email: this.usr.email,
        phone: this.myPhone,
        username: this.usr.username,
        password: this.usr.password,
        password_confirmation: this.usr.password_confirmation,
        language_locale: this.usr.language_locale,
        inventory_id: this.usr.inventory_id,
        assign_permissions: this.usr.assign_permissions,
        assign_role: this.usr.assign_role,
      }

      axios
        .put('/api/users/' + this.$route.params.id, data)

        .then(
          response => {
            if (this.usr.password !== null) {
              if (response.data.status) {
                this.showToastError(
                  response.data.message,
                  response.data.custom_code
                )
                setTimeout(() => {
                  this.$router.push('/users')
                }, 3000)
              } else {
                this.showToastError(
                  response.data.message,
                  response.data.custom_code
                )
              }
            }
          },
          error => {
            this.showToastError(
              error.response.data.message,
              error.response.data.custom_code
            )
          }
        )
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

<style>
.userEdit input,
.userEdit select {
  height: 50px;
  border-radius: 4px !important;
}
</style>
