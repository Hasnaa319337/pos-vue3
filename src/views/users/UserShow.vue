<template>
  <div class="col-sm-12 grid-margin stretch-card show_user">
    <div class="card" v-if="loaded">
      <div
        class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
      >
        <h4 class="card-title">{{ trans('UserShow') }} : {{ usr.username }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>

      <h2 style="margin-bottom: 20px; color: #46a8c2">
        <svg
          v-if="language === 'ar'"
          style="fill: #46a8c2; width: 20px; height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
        <svg
          v-else
          style="fill: #46a8c2; width: 20px; height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>

        {{ trans('user_details') }}
      </h2>
      <div class="user_details card-intro" md="">
        <div class="d-flex">
          <h5>
            <b class="boldHead">{{ trans('id') }}</b> : {{ usr.id }}
          </h5>
        </div>

        <div class="d-flex">
          <h5>
            <b>{{ trans('name') }} </b> : {{ usr.name }}
          </h5>
        </div>
        <div class="d-flex">
          <h5>
            <b>{{ trans('phone') }}</b> : {{ usr.phone }}
          </h5>
        </div>
        <div class="d-flex">
          <h5>
            <b>{{ trans('email') }}</b> : {{ usr.email }}
          </h5>
        </div>
        <div class="d-flex">
          <h5>
            <b>{{ trans('language') }}</b> : {{ usr.language.title }}
          </h5>
        </div>
        <div class="d-flex">
          <h5>
            <b>{{ trans('inventory') }}</b> : {{ usr.inventory.title }}
          </h5>
        </div>
      </div>

      <h2 style="margin: 40px 0 20px; color: #46a8c2">
        <svg
          v-if="language === 'ar'"
          style="fill: #46a8c2; width: 20px; height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
        <svg
          v-else
          style="fill: #46a8c2; width: 20px; height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>

        {{ trans('roles') }}
      </h2>

      <b-form
        style="display: flex; align-items: center"
        @submit.prevent="assignRoles"
      >
        <b-col cols="12" md="4">
          <b-form-group :label="trans('choose_role')">
            <multiselect
              v-model="newRoles"
              label="title"
              :multiple="true"
              :close-on-select="true"
              track-by="title"
              :options="roles"
            >
            </multiselect>
          </b-form-group>
        </b-col>
        <b-button
          type="submit"
          style="height: 41px; margin-top: 10px"
          v-if="permissions.includes('create_assign_role')"
          >{{ trans('attach_roles') }}</b-button
        >
      </b-form>

      <b-col
        cols="12"
        md="8"
        v-if="permissions.includes('view_any_assign_role')"
      >
        <b-table-simple
          sticky-header
          striped
          bordered
          responsive
          style="min-height: 50px"
        >
          <b-thead>
            <b-tr class="rounded" variant="dark">
              <b-th>{{ trans('id') }}</b-th>
              <b-th>{{ trans('role_name') }} </b-th>

              <b-th>{{ trans('options') }}</b-th>
            </b-tr>
          </b-thead>
          <b-tbody
            v-if="itemsLoaded && assign_roles.length"
            class="text-center"
          >
            <b-tr v-for="role in assign_roles" :key="role.id">
              <b-td>{{ role.id }}</b-td>
              <b-td>{{ role.title }}</b-td>

              <b-td>
                <a
                  v-b-tooltip.hover
                  :title="trans('delete')"
                  style="cursor: pointer; color: #dc3545 !important"
                  class="mx-2"
                  v-if="permissions.includes('delete_assign_role')"
                  @click="Delete(role.id)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash " />
                </a>
              </b-td>
            </b-tr>
          </b-tbody>
          <b-tbody
            v-else-if="itemsLoaded && !assign_roles.length"
            class="text-center"
          >
            <b-tr>
              <b-td colspan="5">
                <h5>{{ trans('no_results_found') }}</h5>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>

      <h2 style="margin: 20px 0 20px; color: #46a8c2">
        <svg
          v-if="language === 'ar'"
          style="fill: #46a8c2; width: 20px; height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
        <svg
          v-else
          style="fill: #46a8c2; width: 20px; height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>

        {{ trans('permission') }}
      </h2>

      <ValidationProvider class="col-6">
        <b-col
          class="col-12"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            justify-items: center;
            margin-top: 19px;
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
            <b-form @submit="assignPermissions" style="height: 100%">
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
                  <div v-for="(group, key) in myPermissions" :key="key">
                    <h3>{{ trans(key) }}</h3>
                    <ul class="row">
                      <li v-for="prem in group" class="col-3" :key="prem">
                        <div>
                          <label
                            ><input
                              type="checkbox"
                              v-model="assign_permissions"
                              :value="prem.id"
                              @click="select"
                            />{{ prem.title }}</label
                          >
                        </div>
                      </li>
                    </ul>

                    <hr class="hr" />
                  </div>
                </div>

                <button
                  class="save"
                  type="submit"
                  style="color: white; left: 46%"
                >
                  {{ trans('save') }}
                </button>
              </div>
            </b-form>
          </v-overlay>
        </v-row>
      </ValidationProvider>
    </div>
    <div class="card" v-else>
      <skeleton-loader />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
export default {
  components: { SkeletonLoader },
  props: ['permissions', 'language'],
  data() {
    return {
      overlay: false,
      zIndex: 1500,

      newRoles: [],
      roles: [],
      loaded: false,
      itemsLoaded: false,
      assign_roles: [],
      assign_permissions: [],
      myPermissions: [],
      usr: {
        inventory_id: '',
        language_locale: '',
      },
      delRole: '',
    }
  },
  mounted() {
    this.getUser()
    this.getAssignRoles()
    this.getRoles()
    this.getPermissions()
    this.getAssignPermissions()
    this.getEnumius()
  },
  methods: {
    getEnumius() {
      axios.get('/api/enums').then(res => {
        this.parts = res.data.body.eniums
      })
    },
    getPermissions() {
      axios.get('/api/permissions').then(res => {
        this.myPermissions = _.groupBy(res.data.body.permissions, 'group')
        console.log(this.myPermissions)
      })
    },

    getAssignPermissions() {
      axios
        .get('api/user/' + this.$route.params.id + '/assign-permissions')
        .then(res => {
          this.assign_permissions = res.data.body.permissions.map(el => {
            el['id']
            return el['id']
          })
          console.log(this.assign_permissions)
        })
        .catch(err => {})
    },
    assignPermissions() {
      let data = {
        permissions: this.assign_permissions,
      }
      axios
        .post('api/user/' + this.$route.params.id + '/assign-permissions', data)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.overlay = false
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    getAssignRoles() {
      axios
        .get('api/user/' + this.$route.params.id + '/assign-roles')
        .then(res => {
          this.assign_roles = res.data.body.roles
          this.itemsLoaded = true
        })
        .catch(err => {})
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
        .get('api/user/' + this.$route.params.id + '/assign-roles/create')
        .then(res => {
          if (res.data.status) {
            this.roles = res.data.body.roles
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    assignRoles() {
      this.assign_roles = this.assign_roles.map(el => {
        el['id']
        return el['id']
      })
      this.newRoles = this.newRoles.map(el => {
        el['id']
        return el['id']
      })
      this.newRoles.push(this.assign_roles)

      let data = {
        roles: this.newRoles,
      }

      axios
        .post('api/user/' + this.$route.params.id + '/assign-roles', data)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)

            return this.getAssignRoles()
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    Delete(id) {
      this.assign_roles = this.assign_roles.map(el => {
        el['id']
        return el['id']
      })

      this.delRole = this.assign_roles.filter(el => {
        el.id == id
      })

      this.assign_roles.pop(this.delRole)

      let data = {
        roles: this.assign_roles,
      }
      axios
        .post('api/user/' + this.$route.params.id + '/assign-roles', data)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            return this.getAssignRoles()
          }
        })
        .catch(err => {})
    },
  },
}
</script>

<style>
.user_details {
  /* background: #f6f6f6; */
  background: #fff;
  box-shadow: 0px 1px 4px #0000001a;
  border-radius: 10px;
  padding: 10px 29px;
  margin: 0 10px;
  text-decoration: none;
  width: 38%;
  padding: 7px 15px;
  border-radius: 12px;
}

.user_details h5 b {
  display: inline-block;
  width: 145px;
}

.show_user .user_details .d-flex {
  margin: 8px 0;
}
</style>
