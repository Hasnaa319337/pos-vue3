<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="language" v-text="trans('inventories')"></h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 justify-content-between mb-4">
            <!--    v-if="permissions.includes('create_inventory')" -->
            <div class="col-sm-4">
              <ValidationObserver ref="form">
                <b-form @submit.prevent="store">
                  <ValidationProvider
                    rules="required|englishLettersAndNumbersOnly"
                    :name="trans('title') + ' En'"
                  >
                    <b-form-group :label="trans('title') + ' En'">
                      <b-form-input
                        type="text"
                        v-model="inventory.translation.title.en"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <!-- Arabic Title -->
                  <ValidationProvider
                    rules="required|arabicLettersAndNumbersOnly"
                    :name="trans('title')"
                  >
                    <b-form-group :label="trans('title') + ' Ar'">
                      <b-form-input
                        type="text"
                        v-model="inventory.translation.title.ar"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts arabic words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required|englishLettersAndNumbersOnly"
                    :name="trans('description')"
                  >
                    <b-form-group :label="trans('description') + ' En'">
                      <b-form-textarea
                        v-model="inventory.translation.description.en"
                      ></b-form-textarea>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|arabicLettersAndNumbersOnly"
                    :name="trans('description')"
                  >
                    <b-form-group :label="trans('description') + ' Ar'">
                      <b-form-textarea
                        v-model="inventory.translation.description.ar"
                      ></b-form-textarea>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <b-form-row class="justify-content-center mb-4">
                    <b-button variant="primary" type="submit" v-if="EditMode">
                      {{ trans('edit') }}
                    </b-button>
                    <b-button variant="success" type="submit" v-else>
                      {{ trans('save') }}
                    </b-button>
                    <b-button
                      style="margin: 0px 5px; background: #efbe1c; color: #fff; border: none"
                      variant="danger"
                      type="reset"
                    >
                      <span style="display: block">{{ trans('reset') }}</span>
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
            <!--  v-if="permissions.includes('view_inventory')" -->
            <div class="col-sm-8" style="height: 100%">
              <b-row class="mx-0">
                <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                  <GlobalTabel :columns="columns" />
                  <TableSkeletonLoader :items="10" :length="6" v-if="skeletonLoading" />
                  <b-tbody v-else class="text-center">
                    <b-tr
                      v-for="inv in inventories"
                      :key="inv.id"
                      :class="{ 'bg-success': user.inventory == inv.id }"
                    >
                      <b-td
                        ><router-link :to="'/stock/histories?inventory_id=' + inv.id">
                          {{ inv.title }}
                        </router-link></b-td
                      >
                      <b-td>{{ inv.description }}</b-td>

                      <b-td :class="Number(inv.quantity).isNegative('negative_number_color')">
                        {{ Number(inv.quantity).toNegativeFormat(0) }}
                      </b-td>

                      <b-td :class="Number(inv.cost).isNegative('negative_number_color')"
                        >{{ Number(inv.cost).toNegativeFormat() }}
                      </b-td>
                      <b-td>{{ inv.created_at }}</b-td>
                      <b-td>
                        <!--    v-if="permissions.includes('update_inventory')" -->
                        <a
                          v-b-tooltip.hover
                          :title="trans('edit')"
                          style="cursor: pointer; color: #007bff !important"
                          class="mx-2"
                          @click="edit(inv)"
                          ><font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </a>
                        <!-- v-if="permissions.includes('delete_inventory')" -->
                        <a
                          v-b-tooltip.hover
                          :title="trans('delete')"
                          style="cursor: pointer; color: #dc3545 !important"
                          class="mx-2"
                          @click="Delete(inv)"
                        >
                          <font-awesome-icon icon="fa-solid fa-trash " />
                        </a>
                        <!--    v-if="
                            permissions.includes('view_action_event_inventory')
                          " -->
                        <ActionButton :id="inv.id" :resource_name="'inventory'" />
                        <!-- <a
                          v-b-tooltip.hover
                          :title="trans('set as main')"
                          style="cursor: pointer; color: #28a644 !important"
                          class="mx-2"
                          v-if="user.inventory != inv.id"
                          @click="setAsMainInventory(inv)"
                          ><font-awesome-icon icon="fa-solid fa-house" />
                        </a> -->
                      </b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{ trans('total') }}</b-td>
                      <b-td></b-td>

                      <b-td :class="Number(total_quantity).isNegative('negative_number_color')">
                        {{ Number(total_quantity).toNegativeFormat(0) }}
                      </b-td>

                      <b-td :class="Number(total_cost).isNegative('negative_number_color')"
                        >{{ Number(total_cost).toNegativeFormat() }}
                        {{ getSetting('currency', settings) }}
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-if="!skeletonLoading && !inventories.length" class="text-center">
                    <b-tr>
                      <b-td colspan="5">
                        <h5>{{ trans('no_results_found') }}</h5>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-row>
              <div class="col-sm-12 text-center" v-if="inventories.length">
                <pagination-component
                  :items="inventories"
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
<style>
tr.select-inventory {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}
</style>
<script>
import axios from 'axios'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  components: { PaginationComponent, TableSkeletonLoader },
  name: 'AppInventories',

  props: [
    'section',
    'sections',
    'user',
    'language',
    'user_language',
    'langs',
    'permissions',
    'settings'
  ],
  data() {
    return {
      columns: ['title', 'description', 'quantity', 'cost', 'created_at', 'actions'],
      skeletonLoading: true,
      last_page: '',

      inventories: [],
      paginate: {},
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,

      per_page: 0,
      total_cost: null,
      total_quantity: null,
      inventory: {
        translation: {
          title: {
            ar: '',
            en: ''
          },
          description: {
            ar: '',
            en: ''
          }
        }
      },
      EditMode: 0,
      loaded: false,
      itemsLoaded: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.inventoriesTotal()
  },
  methods: {
    goTo(url) {
      this.skeletonLoading = true
      this.reports = []

      axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.inventories = res.data.body.inventories.data
          this.paginate = res.data.body.inventories.paginate
          this.last_page = res.data.body.inventories.paginate.last_page
          this.total = res.data.body.inventories.paginate.total
          this.current_page = res.data.body.inventories.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.inventories.paginate.next_page_url
          this.prev_page_url = res.data.body.inventories.paginate.prev_page_url
          this.first_page_url = res.data.body.inventories.paginate.first_page_url
          this.last_page_url = res.data.body.inventories.paginate.last_page_url
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    refresh() {
      this.itemloaded = false

      axios
        .get('/api/inventories')
        .then((res) => {
          this.skeletonLoading = false
          this.inventories = res.data.body.inventories.data
          this.paginate = res.data.body.inventories.paginate
          this.last_page = res.data.body.inventories.paginate.last_page

          this.total = res.data.body.inventories.paginate.total
          this.current_page = res.data.body.inventories.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.inventories.paginate.next_page_url
          this.prev_page_url = res.data.body.inventories.paginate.prev_page_url
          this.first_page_url = res.data.body.inventories.paginate.first_page_url
          this.last_page_url = res.data.body.inventories.paginate.last_page_url

          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    inventoriesTotal() {
      axios
        .get('/api/inventories-total')
        .then((res) => {
          this.total_cost = res.data.body.total_cost
          this.total_quantity = res.data.body.total_quantity

          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    edit(inv) {
      this.EditMode = 1
      this.inventory = this.cloneItem(inv)
    },
    setAsMainInventory(inv) {
      let data = {
        description: {
          en: inv.description.en,
          ar: inv.description.ar
        },
        title: {
          ar: inv.title.ar,
          en: inv.title.en
        }
      }

      axios
        .put('/api/inventories/' + inv.id, data)
        .then((res) => {
          if (res.data.success) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.user.inventory = inv_id
            this.refresh()
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    store() {
      let url = this.EditMode ? '/api/inventories/' + this.inventory.id : '/api/inventories'
      let apiMethod = this.EditMode ? 'put' : 'post'
      let data = {
        description: {
          ar: this.inventory.translation.description.ar,
          en: this.inventory.translation.description.en
        },
        title: {
          ar: this.inventory.translation.title.ar,
          en: this.inventory.translation.title.en
        }
      }
      axios[apiMethod](url, data)
        .then(
          (res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
              if (this.EditMode) {
                this.EditMode = 0
              }

              this.inventory.translation.title.ar = ''
              this.inventory.translation.title.en = ''
              this.inventory.translation.description.ar = ''
              this.inventory.translation.description.en = ''

              this.$refs.form.reset()
              this.refresh()
            }
          },
          (error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        )
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    Delete(inv) {
      this.$bvModal
        // trans
        .msgBoxConfirm(this.trans('Do you want to delete this inventory'), {
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
            axios.delete('/api/inventories/' + inv.id).then((res) => {
              if (res.data.status) {
                this.showToastError(res.data.message, res.data.custom_code)
                this.inventories = this.inventories.filter((x) => {
                  return x.id != inv.id
                })
              } else {
                this.showToastError(res.data.message, res.data.custom_code)
              }
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
