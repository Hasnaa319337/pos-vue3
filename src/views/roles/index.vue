<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="permissions.includes('view_any_role')">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="language">{{ trans('roles') }}</h4>
          <div class="dropdown">
            <b-button
              style="margin: 0 5px"
              variant="success"
              to="/roles/add"
              v-if="permissions.includes('create_role')"
            >
              <i class="bi bi-plus-lg"></i>
            </b-button>
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
          <div class="row mx-0align-items-center justify-content-between mb-4">
            <div class="col-sm-12" v-if="searchOn">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(refresh)" @reset.prevent="reset">
                  <b-form-row>
                    <b-col cols="12" md="2">
                      <b-form-group>
                        <b-form-input v-model="search" type="text" :placeholder="trans('title')">
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
            <div class="col-sm-12">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <GlobalTabel :columns="columns" />
                <table-skeleton-loader
                  v-if="skeletonLoading"
                  :items="10"
                  :length="columns.length"
                />
                <b-tbody v-else>
                  <b-tr v-for="role in roles" :key="role.id">
                    <b-td>{{ role.name }}</b-td>
                    <b-td>{{ role.translation.title.ar }}</b-td>
                    <b-td>{{ role.translation.title.en }}</b-td>

                    <b-td>
                      <router-link
                        v-if="permissions.includes('view_role')"
                        v-b-tooltip.hover
                        :title="trans('show')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="'/roles/show/' + role.id"
                        ><font-awesome-icon icon="fa-solid fa-eye"
                      /></router-link>
                      <router-link
                        v-if="permissions.includes('update_role')"
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="'/roles/edit/' + role.id"
                        ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                      /></router-link>
                      <!-- role.id != 1 && role.id != 2 &&  permissions.includes('delete_role') -->
                      <a
                        v-b-tooltip.hover
                        :title="trans('delete')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        v-if="permissions.includes('delete_role')"
                        @click="Delete(role.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash "
                      /></a>
                      <ActionButton
                        v-if="permissions.includes('view_action_event_role')"
                        :id="role.id"
                        :resource_name="'role'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="!roles.length && !skeletonLoading">
                  <b-tr>
                    <b-td colspan="2">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>

              <div class="col-sm-12 text-center">
                <pagination-component
                  v-if="!skeletonLoading"
                  :items="roles"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
export default {
  name: 'AppRoles',
  components: { PaginationComponent, TableSkeletonLoader },
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'language', 'permissions'],
  data() {
    return {
      columns: ['slug', 'title_ar', 'title_en', 'actions'],
      roles: [],

      searchOn: false,
      search: '',
      skeletonLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.axios({
        method: 'GET',
        url: '/api/roles',
        params: {
          search: this.search
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.roles = res.data.body.roles.data
          this.total = res.data.body.roles.paginate.total
          this.current_page = res.data.body.roles.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.roles.paginate.next_page_url
          this.prev_page_url = res.data.body.roles.paginate.prev_page_url
          this.first_page_url = res.data.body.roles.paginate.first_page_url
          this.last_page_url = res.data.body.roles.paginate.last_page_url
          this.last_page = res.data.body.roles.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    goTo(url) {
      this.skeletonLoading = true
      this.roles = []

      this.axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.roles = res.data.body.roles.data
          this.total = res.data.body.roles.paginate.total
          this.current_page = res.data.body.roles.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.roles.paginate.next_page_url
          this.prev_page_url = res.data.body.roles.paginate.prev_page_url
          this.first_page_url = res.data.body.roles.paginate.first_page_url
          this.last_page_url = res.data.body.roles.paginate.last_page_url
          this.last_page = res.data.body.roles.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    Delete(id) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this role'), {
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
              .delete(`/api/roles/${id}`)
              .then((res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.roles = this.roles.filter((x) => {
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
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
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
