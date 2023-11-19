<template>
  <div class="users">
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header mb-3 header-sm d-flex align-items-center"
          style="justify-content: space-between"
        >
          <h4 class="card-title" v-if="language">{{ trans('users') }}</h4>
          <div class="dropdown btns_header" style="text-align: start">
            <router-link
              class="btn btn-success btn-md"
              v-if="permissions.includes('create_user')"
              to="/users/add"
            >
              <i class="bi bi-plus-lg"></i>
            </router-link>
            <b-button
              :style="language == 'en' ? 'right: 0' : 'left: 0'"
              variant="primary"
              class="search-btn"
              @click="searchOn = !searchOn"
            >
              <i class="bi bi-search"></i>
            </b-button>
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <b-row class="mx-0">
            <div class="col-sm-12" v-if="searchOn">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(refresh)" @reset.prevent="reset">
                  <b-form-row>
                    <b-col cols="12" md="2">
                      <b-form-group>
                        <b-form-input v-model="search" type="text" :placeholder="trans('name')">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="1">
                      <b-button
                        variant="success"
                        type="submit"
                        class="mr-2"
                        style="font-size: 14px !important"
                      >
                        <font-awesome-icon icon="fa-solid fa-filter" />
                        {{ trans('filter') }}
                      </b-button>
                    </b-col>
                    <b-col cols="12" md="2">
                      <b-button variant="warning" type="reset" class="mr-2" @click="resetForm()">
                        <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                        {{ trans('reset search') }}
                      </b-button>
                    </b-col>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
            <b-col cols="12" md="12" v-if="permissions.includes('view_user')">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <GlobalTabel :columns="columns" />
                <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />
                <b-tbody v-else>
                  <b-tr v-for="usr in users" :key="usr.id">
                    <b-td>{{ usr.name }}</b-td>
                    <b-td>{{ usr.username }}</b-td>
                    <b-td>
                      <span v-if="usr.phone">{{ usr.phone }}</span>
                      <span v-else>--</span>
                    </b-td>
                    <b-td>{{ usr.email }}</b-td>
                    <b-td>
                      <span
                        v-for="role in usr.roles"
                        :key="role"
                        style="
                          display: inline-block;
                          margin: 5px;
                          background: rgb(67 97 190);
                          padding: 5px;
                          color: #fff;
                          border-radius: 3px;
                        "
                        >{{ role }}
                      </span>
                    </b-td>

                    <b-td>
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('show')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="'/users/show/' + usr.id"
                        v-if="permissions.includes('view_user')"
                        ><font-awesome-icon icon="fa-solid fa-eye"
                      /></router-link>
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="'/users/edit/' + usr.id"
                        v-if="permissions.includes('update_user')"
                        ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                      /></router-link>

                      <a
                        v-b-tooltip.hover
                        :title="trans('delete')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        v-if="permissions.includes('delete_user')"
                        @click="Delete(usr.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash "
                      /></a>

                      <ActionButton
                        v-if="permissions.includes('view_action_event_user')"
                        :id="usr.id"
                        :resource_name="'user'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="itemsLoaded && !users.length">
                  <b-tr>
                    <b-td colspan="5">
                      <h5>{{ trans('no results found') }}</h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <div class="col-sm-12 text-center" v-if="users.length">
                <pagination-component
                  :items="users"
                  :last_page="last_page"
                  :next_page="next_page"
                  :prev_page="prev_page"
                  :current_page="current_page"
                  :next_page_url="next_page_url"
                  :prev_page_url="prev_page_url"
                  :first_page_url="first_page_url"
                  :last_page_url="last_page_url"
                  :total="total"
                  @goToNext="goTo(next_page_url)"
                  @goToPrev="goTo(prev_page_url)"
                  @goToFirst="goTo(first_page_url)"
                  @goToLast="goTo(last_page_url)"
                />
              </div>
            </b-col>
            <b-col cols="12" v-else>
              <h2 class="text-center" v-if="language == 'en'">You Not Allowed to Open This Page</h2>
              <h2 class="text-center" v-else>هذه الصفحه غير مسموح لك الدخول عليها</h2>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
export default {
  name: 'AppUsers',

  components: { TableSkeletonLoader, PaginationComponent },
  props: ['section', 'sections', 'user', 'user_language', 'permissions', 'language'],
  data() {
    return {
      columns: ['name', 'username', 'phone', 'email', 'role', 'actions'],
      countryCode: 'SA',

      users: [],

      permissionss: [],

      searchOn: false,

      rolesID: [],
      strings: [],
      roles: [],
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: 0,
      total: 0,
      invs: [],
      langs: [],

      itemsLoaded: false,
      skeletonLoading: true,
      search: ''
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getInventories()
    this.getLanguages()
    this.getPermissions()
    this.axios.get('/api/roles').then((res) => {
      this.roles = res.data.body.roles.data
    })
  },
  methods: {
    onCountryChange(e) {
      this.countryCode = e.countryCode

      console.log(e)
    },

    getPermissions() {
      this.axios.get('/api/permissions').then((res) => {
        this.permissionss = res.data.body.permissions
      })
    },

    getLanguages() {
      this.axios.get('/api/languages').then((res) => {
        this.langs = res.data.body.languages.data
      })
    },
    getInventories() {
      this.axios.get('/api/inventories').then((res) => {
        this.invs = res.data.body.inventories.data
      })
    },
    refresh() {
      this.itemsLoaded = false

      this.axios({
        method: 'get',
        url: '/api/users',
        params: {
          search: this.search
        }
      })
        .then((res) => {
          if (res.data.status) {
            this.skeletonLoading = false
            this.users = res.data.body.users.data

            this.total = res.data.body.users.paginate.total
            this.current_page = res.data.body.users.paginate.current_page
            this.prev_page = this.current_page - 1
            this.next_page = this.current_page + 1
            this.next_page_url = res.data.body.users.paginate.next_page_url
            this.prev_page_url = res.data.body.users.paginate.prev_page_url
            this.first_page_url = res.data.body.users.paginate.first_page_url
            this.last_page_url = res.data.body.users.paginate.last_page_url
            this.last_page = res.data.body.users.paginate.last_page

            this.itemsLoaded = true
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    goTo(url) {
      this.users = []
      this.itemsLoaded = false
      this.skeletonLoading = true
      this.axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.users = res.data.body.users.data
          this.total = res.data.body.users.paginate.total
          this.current_page = res.data.body.users.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.users.paginate.next_page_url
          this.prev_page_url = res.data.body.users.paginate.prev_page_url
          this.first_page_url = res.data.body.users.paginate.first_page_url
          this.last_page_url = res.data.body.users.paginate.last_page_url
          this.last_page = res.data.body.users.paginate.last_page

          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    Delete(id) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this user'), {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((value) => {
          if (value) {
            this.axios
              .delete('/api/users/' + id)
              .then((res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)

                  this.users = this.users.filter((x) => {
                    return x.id != id
                  })
                } else {
                  this.showToastError(res.data.message, res.data.custom_code)
                }
              })
              .catch((error) => {
                this.showToastError(error.response.data.message, error.response.data.custom_code)
              })
          }
        })
        .catch((err) => {
          // An error occurred
        })
    },

    resetForm() {
      this.search = ''
      return this.refresh()
    }
  }
}
</script>
<style scoped>
td {
  text-align: center;
}
</style>
