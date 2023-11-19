<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title" v-if="language">
          {{ trans('sidebar') }}
        </h4>
        <div class="dropdown btns_header" style="text-align: end">
          <router-link
            class="btn btn-success btn-md"
            v-if="permissions.includes('create_sidebar')"
            to="/sidebar/add"
          >
            <i class="bi bi-plus-lg"></i>
          </router-link>
          <GoBackButton />
        </div>
      </div>

      <div class="card-body" v-if="permissions.includes('view_any_sidebar')">
        <div v-if="searchOn" class="row m-0 align-items-center justify-content-between mb-4">
          <ValidationObserver v-slot="{ handleSubmit }" class="w-100" ref="form">
            <b-form @submit.prevent="handleSubmit(filter)" @reset.prevent="reset">
              <b-form-row>
                <b-col cols="12" md="3">
                  <b-form-group :label="trans('serial')">
                    <b-form-input type="text" v-model="filters.serial"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3">
                  <b-form-group :label="trans('title')">
                    <b-form-input type="text" v-model="filters.title"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group :label="trans('category')">
                    <multiselect
                      v-model="categoryObject"
                      :placeholder="trans('choose category')"
                      label="title"
                      :multiple="true"
                      :close-on-select="false"
                      track-by="title"
                      :options="categories"
                    >
                      <template>
                        <span class="option__title">{{ props.option.title }}</span>
                      </template>
                      <template>
                        <span class="option__title">{{ props.option.title }}</span>
                      </template>
                    </multiselect>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('per_page')">
                    <b-form-input
                      type="number"
                      v-model="filters.per_page"
                      @keypress="isNumber($event)"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="justify-content-center">
                <b-button variant="success" type="submit" class="mr-2">
                  <font-awesome-icon icon="fa-solid fa-filter" />
                  {{ trans('filter') }}
                </b-button>
                <b-button variant="warning" type="reset" class="mr-2">
                  <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                  {{ trans('reset_search') }}
                </b-button>
              </b-form-row>
            </b-form>
          </ValidationObserver>
        </div>
        <div class="" v-if="permissions.includes('view_sidebar')">
          <div class="align-items-center justify-content-between mb-4">
            <div>
              <div
                v-if="errorValidationImport.length > 0"
                style="background: #cd0808; padding: 20px; border-radius: 4px; color: #fff"
              >
                <h4>{{ trans('there is error validation in import') }}</h4>
                <span class="d-block" v-for="err in errorValidationImport" :key="err">
                  {{ trans(err.attribute) }} - {{ trans('row') }} ({{ err.row }}) -
                  <span v-for="val in err.errors" :key="val">{{ val }}</span>
                </span>
              </div>
              <b-table-simple
                class="table-container"
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <GlobalTabel :columns="columns" />
                <table-skeleton-loader
                  :items="10"
                  :length="columns.length"
                  v-if="skeletonLoading"
                />
                <b-tbody v-else>
                  <b-tr v-for="(side, index) in sidebars" :key="index">
                    <b-td>{{ side.translation.title.ar }}</b-td>
                    <b-td>{{ side.translation.title.en }}</b-td>

                    <b-td class="btns">
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        v-if="permissions.includes('update_sidebar')"
                        :to="'/sidebar/edit/' + side.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      </router-link>

                      <a
                        v-b-tooltip.hover
                        :title="trans('delete')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        v-if="side.allow_delete === true"
                        @click="Delete(side.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash " />
                      </a>
                      <ActionButton
                        v-if="permissions.includes('view_action_event_sidebar')"
                        :id="side.id"
                        :resource_name="'sidebar'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="itemsLoaded && !sidebars.length" class="text-center">
                  <b-tr>
                    <b-td colspan="9">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
export default {
  name: 'AppProducts',
  components: { TableSkeletonLoader },

  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'langs',
    'permissions',
    'settings',
    'language'
  ],
  data() {
    return {
      skeletonLoading: true,
      columns: ['name_ar', 'name_en', 'actions'],

      sidebars: [],
      paginate: {},

      strings: [],
      filters: {
        per_page: 20,
        category_id: []
      },

      itemsLoaded: false,
      usingFilters: false,
      categoryObject: '',
      searchOn: false,
      errorValidationImport: []
    }
  },

  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    reset() {
      this.usingFilters = false
      this.filters = {
        per_page: 20,
        category_id: []
      }
      this.refresh()
    },
    filter() {
      if (this.categoryObject.length > 0) {
        for (let i = 0; i < this.categoryObject.length; i++) {
          this.filters.category_id.push(this.categoryObject[i].id)
        }
      }
      this.usingFilters = true
      this.refresh()
    },

    refresh() {
      this.itemsLoaded = false
      let url = 'api/sidebars'
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filters) {
          if (this.filters[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filters[key]
        }
        url = url + '?' + str
      }
      this.axios
        .get(url)
        .then((res) => {
          this.sidebars = res.data.body.sidebars
          this.skeletonLoading = false

          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    Delete(id) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this menu'), {
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
              .delete('/api/sidebars/' + id)
              .then((res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.refresh()

                  this.sidebars = this.sidebars.filter((x) => {
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
    }
  }
}
</script>
<style scoped>
.table-container {
  max-height: unset !important;
}

td {
  text-align: center;
}
</style>
