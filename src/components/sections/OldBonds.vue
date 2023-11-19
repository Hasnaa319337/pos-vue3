<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card pt-3">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">القيود الحسابية</h4>
          <div class="dropdown" style="text-align: end">
            <router-link
              class="btn btn-success btn-md mb-1"
              to="/accounting-restrictions/add"
            >
              <font-awesome-icon icon="fa-solid fa-circle-plus " />
            </router-link>
          </div>
        </div>
        <!--                <div class="card-body header-sm d-flex justify-content-between align-items-center">-->
        <!--                    <div class="col-sm-12"></div>-->
        <!--                </div>-->
        <div class="card-body">
          <div class="align-items-center row mx-0 justify-content-between mb-4">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div
                class="alert"
                :class="'alert-' + alertType"
                v-html="message"
              ></div>
            </div>
            <div class="clear clearfix"></div>
            <div class="col-sm-12">
              <b-row>
                <b-table-simple
                  :items="restrictions"
                  small
                  id="my-table"
                  :per-page="perPage"
                  :current-page="currentPage"
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px"
                >
                  <b-thead>
                    <b-tr class="rounded" variant="dark">
                      <b-th>رقم القيد</b-th>
                      <!--                                            <b-th>كود القيد</b-th>-->
                      <b-th>مبلغ القيد</b-th>
                      <!--                                            <b-th>معدل القيد</b-th>-->
                      <b-th>مدخل القيد</b-th>
                      <b-th>التاريخ</b-th>
                      <b-th>ملاحظات</b-th>
                      <b-th>{{ trans('actions') }}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody class="text-center">
                    <b-tr
                      v-for="(restriction, index) in restrictions"
                      :key="index"
                    >
                      <b-td>{{ restriction.id }}</b-td>
                      <!--                                            <b-td>{{-->
                      <!--                                                    restriction.restriction_code-->
                      <!--                                            }}</b-td>-->
                      <b-td>{{ restriction.restriction_amount }}</b-td>
                      <!--                                            <b-td>{{ // restriction.updated_by }}</b-td>-->
                      <b-td>{{ restriction.created_by.name }}</b-td>
                      <b-td>{{ restriction.date }}</b-td>
                      <b-td>{{ restriction.note }}</b-td>
                      <b-td>
                        <router-link
                          :to="
                            '/accounting_restriction/show/' +
                            restriction.restriction_code
                          "
                        >
                          <a
                            v-b-tooltip.hover
                            title="عرض"
                            style="cursor: pointer; color: #007bff !important"
                            class="mx-2"
                          >
                            <font-awesome-icon icon="fa-solid fa-eye" />
                          </a>
                        </router-link>
                        <router-link
                          v-b-tooltip.hover
                          title="تعديل"
                          style="cursor: pointer; color: #007bff !important"
                          class="mx-2"
                          v-if="permissions.includes('edit_attributes')"
                          :to="
                            '/accounting-restrictions/edit/' +
                            restriction.restriction_code
                          "
                        >
                          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </router-link>
                        <span
                          v-b-tooltip.hover
                          title="تصدير إكسل"
                          @click="
                            exportData(restriction.restriction_code, 'xlsx')
                          "
                          style="cursor: pointer; color: #007bff !important"
                          class="mx-2"
                        >
                          <font-awesome-icon icon="fa-solid fa-download" />
                        </span>
                        <span
                          v-b-tooltip.hover
                          title="تصدير pdf"
                          @click="
                            exportData(restriction.restriction_code, 'pdf')
                          "
                          style="cursor: pointer; color: #007bff !important"
                          class="mx-2"
                        >
                          <font-awesome-icon icon="fa-solid fa-file-pdf" />
                        </span>
                        <a
                          v-b-tooltip.hover
                          title="حذف"
                          style="cursor: pointer; color: #dc3545 !important"
                          class="mx-2"
                          @click="delItem(restriction.restriction_code)"
                        >
                          <font-awesome-icon icon="fa-solid fa-trash" />
                        </a>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-row>
            </div>
          </div>

          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          >
          </b-pagination>
        </div>
      </div>

      <!-- <div class="card" v-else>
                <div class="card-body text-center">
                    <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
                </div>
            </div> -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
// import Receipt from './Receipt.vue';
import Receipt from './modals/PurchaseReceipt.vue'
import PurchaseReceipt from './modals/PurchaseReceipt.vue'
import NewVariations from './modals/NewVariations.vue'

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

// register globally
Vue.component('multiselect', Multiselect)

Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  name: 'OpeningInventoryBalance',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions'],
  data() {
    return {
      message: '',
      alertType: 'success',
      filters: {
        per_page: 30,
      },
      perPage: '',
      currentPage: '',
      strings: '',
      balances: '',
      total_product: '',
      total_initial_balance: '',
      restrictions: {},
      items: [],
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    exportData(id, type) {
      let url = '/api/account/restrictions/export/' + type + '/' + id
      axios
        .get(url, {
          headers: {
            'Content-Type':
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
          responseType: 'arraybuffer',
        })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `account.${type}`)
          document.body.appendChild(link)
          link.click()
        })
        .catch(error => {})
    },
    refresh() {
      let url = '/api/account/restrictions'
      // console.log(url);
      axios
        .get(url)
        .then(res => {
          console.log(res.data.body.restrictions.data[0].items.data[0].amount)
          this.strings = res.data.strings
          this.restrictions = res.data.body.restrictions.data
          this.items = res.data.body.restrictions.data
          this.balances = res.data.initial.data
          this.total_initial_balance = res.data.total_initial_balance
          this.total_product = res.data.total_product

          this.currentPage = res.data.body.restrictions.meta.current_page
          this.perPage = res.data.body.restrictions.meta.per_page
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

    delItem(id) {
      axios
        .delete(`api/account/initial-balance/${id}`)
        .then(res => {
          this.message = res.data.message
          this.alertType = 'success'

          this.refresh()

          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 3000)
          console.log('handle success response', response.data)
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 3000)
        })
    },
  },
  computed: {
    rows() {
      return this.items.length
    },
  },
}
</script>

<style scoped>
.pagination.b-pagination {
  display: flex;
  justify-content: center;
}
</style>
