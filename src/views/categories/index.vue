<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title" v-if="language" v-text="trans('categories')"></h4>
        <div class="dropdown">
          <b-button @click="searchOn = !searchOn" variant="primary" style="margin: 0 5px">
            <i class="bi bi-search"></i>
          </b-button>
          <b-button
            to="/categories/add"
            variant="success"
            v-if="permissions.includes('create_product_category')"
          >
            <i class="bi bi-plus-lg"></i>
          </b-button>
          <GoBackButton />
        </div>
      </div>
      <div class="card-body">
        <div
          v-if="searchOn"
          class="row m-0 align-items-center justify-content-between mb-4"
          style="margin: 0 8px"
        >
          <b-row>
            <b-col cols="12" md="3">
              <b-form-group :label="trans('name_or_description')">
                <b-form-input
                  style="border-radius: 4px !important; height: 34px; border-color: #ccc"
                  type="text"
                  v-model="filter.search"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="1" style="margin-top: 30px">
              <b-button variant="success" type="submit" @click="refresh()" class="mr-2">
                {{ trans('filter') }}
              </b-button>
            </b-col>
            <b-col cols="12" md="2" style="margin-top: 30px">
              <b-button variant="warning" class="mr-2" @click="reset()">
                <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                {{ trans('reset_search') }}
              </b-button>
            </b-col>
          </b-row>
        </div>
        <div class="align-items-center row mx-0 justify-content-between mb-4">
          <div class="col-sm-12 p-0" v-if="permissions.includes('view_product_category')">
            <b-table-simple
              sticky-header
              bordered
              responsive
              style="min-height: 50px; margin-top: 15px"
            >
              <GlobalTabel :columns="columns" />
              <table-skeleton-loader :items="10" :length="columns.length" v-if="skeletonLoading" />
              <b-tbody v-else>
                <b-tr v-for="category in categories" :key="category.id">
                  <b-td>{{ category.title }}</b-td>
                  <b-td>
                    <b-img
                      :src="category.image ? category.image : getSetting('default_image')"
                      width="100"
                      class="img-responsive mx-auto"
                      alt=""
                    ></b-img>
                  </b-td>
                  <b-td style="max-width: 200px !important">
                    <p>
                      {{ category.description }}
                    </p>
                  </b-td>
                  <b-td style="max-width: 200px !important">
                    <p>
                      {{ category.parent ? category.parent.title : '---' }}
                    </p>
                  </b-td>
                  <td>
                    <router-link
                      v-b-tooltip.hover
                      :title="trans('show')"
                      style="cursor: pointer; color: #007bff !important; font-size: 15px"
                      class="mx-2"
                      v-if="permissions.includes('update_product_category')"
                      :to="'/categories/show/' + category.id"
                      ><font-awesome-icon icon="fa-solid fa-eye" />
                    </router-link>
                    <router-link
                      v-b-tooltip.hover
                      :title="trans('edit')"
                      style="cursor: pointer; color: #007bff !important"
                      class="mx-2"
                      v-if="permissions.includes('update_product_category')"
                      :to="'/categories/edit/' + category.id"
                      ><font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </router-link>
                    <a
                      v-b-tooltip.hover
                      :title="trans('delete')"
                      style="cursor: pointer; color: #dc3545 !important"
                      class="mx-2"
                      @click="Delete(category.id)"
                      v-if="permissions.includes('delete_product_category')"
                      ><font-awesome-icon icon="fa-solid fa-trash" />
                    </a>
                    <ActionButton
                      v-if="permissions.includes('view_action_event_product_category')"
                      :id="category.id"
                      :resource_name="'product_category'"
                    />
                  </td>
                </b-tr>
              </b-tbody>
              <tbody v-if="itemsLoaded && !categories.length">
                <b-tr class="text-center">
                  <b-td colspan="4">
                    <h5>{{ trans('no_results_found') }}</h5>
                  </b-td>
                </b-tr>
              </tbody>
            </b-table-simple>
          </div>

          <div class="col-sm-12 text-center" v-if="categories.length">
            <pagination-component
              :items="categories"
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
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VuejsDialog)

import PaginationComponent from '@/components/global/PaginationComponent.vue'

import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
export default {
  name: 'AppCategories',
  components: { PaginationComponent, TableSkeletonLoader },

  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'langs',
    'permissions',
    'language',
    'settings'
  ],
  data() {
    return {
      columns: ['name', 'image', 'description', 'main_category', 'options'],
      skeletonLoading: true,
      searchOn: false,
      categories: [],
      paginate: {},
      filter: {
        search: ''
      },
      users: [],

      usingFilters: 0,
      itemsLoaded: false,
      last_page: 0,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,

      more: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },

  methods: {
    goTo(url) {
      this.categories = []
      this.skeletonLoading = true
      let str = ''
      for (var key in this.filter) {
        if (this.filter[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.filter[key]
      }
      url = url.includes('?') ? url + '&' + str : url + '?' + str

      this.axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.itemsLoaded = true
          this.categories = res.data.body.categories.data
          this.paginate = res.data.body.categories.paginate

          this.total = res.data.body.categories.paginate.total
          this.current_page = res.data.body.categories.paginate.current_page
          this.last_page = res.data.body.categories.paginate.last_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.categories.paginate.next_page_url
          this.prev_page_url = res.data.body.categories.paginate.prev_page_url
          this.first_page_url = res.data.body.categories.paginate.first_page_url

          this.last_page_url = res.data.body.categories.paginate.last_page_url
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    refresh() {
      this.axios({
        method: 'GET',
        url: '/api/product-categories',
        params: {
          search: this.filter.search
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.categories = res.data.body.categories.data
          this.paginate = res.data.body.categories.paginate
          this.last_page = res.data.body.categories.paginate.last_page

          this.total = res.data.body.categories.paginate.total
          this.current_page = res.data.body.categories.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.categories.paginate.next_page_url
          this.prev_page_url = res.data.body.categories.paginate.prev_page_url
          this.first_page_url = res.data.body.categories.paginate.first_page_url

          this.last_page_url = res.data.body.categories.paginate.last_page_url
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    getSetting(key) {
      const result = this.settings.find((el) => {
        if (el.key === key) {
          return el.value
        }
      })
      return result.value
    },
    Delete(id) {
      this.$bvModal
        .msgBoxConfirm(this.trans('are you sure you want to delete this category?'), {
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
              .delete('/api/product-categories/' + id)
              .then((res) => {
                if (res.data.success) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.categories = this.categories.filter((x) => {
                    return x.id != id
                  })
                } else {
                  this.showToastError(res.data.message, res.data.custom_code)
                }

                this.refresh()
              })
              .catch((error) => {
                this.refresh()
                this.showToastError(error.response.data.message, error.response.data.custom_code)
              })
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    reset() {
      this.filter.search = ''
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
