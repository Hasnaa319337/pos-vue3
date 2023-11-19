<template>
  <div class="card">
    <div
      class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
      style="width: 98% !important; margin: 0 auto"
    >
      <h4 class="card-title" v-if="language">
        {{ trans('Inventory History') }} {{ route_id }}
      </h4>
      <div class="dropdown">
        <GoBackButton />
      </div>
    </div>
    <div class="card_body">
      <div class="col-sm-12" v-if="permissions.includes('view_inventory')">
        <b-row class="mx-0">
          <b-table-simple
            sticky-header
            striped
            bordered
            responsive
            style="min-height: 50px"
          >
            <b-thead>
              <b-tr class="rounded" variant="dark">
                <th style="width: 100px; border: 2px solid #85c3ff">
                  {{ trans('id') }}
                </th>
                <th style="border: 2px solid #85c3ff">
                  {{ trans('item code') }}
                </th>
                <th style="border: 2px solid #85c3ff">
                  {{ trans('product') }}
                </th>
                <th style="border: 2px solid #85c3ff">
                  {{ trans('initial quantity') }}
                </th>
                <th style="border: 2px solid #85c3ff" colspan="3">
                  {{ trans('incoming') }}
                  <br />
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      border-top: 2px solid #85c3ff;
                      padding-top: 3px;
                    "
                  >
                    <span>
                      {{ trans('purchases') }}
                    </span>
                    <span> {{ trans('sales refund') }} </span>
                    <span> {{ trans('store_transfer') }} </span>
                  </div>
                </th>
                <th style="border: 2px solid #85c3ff" colspan="3">
                  {{ trans('outstanding') }}
                  <br />
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      border-top: 2px solid #85c3ff;
                      padding-top: 3px;
                    "
                  >
                    <span> {{ trans('sales') }} </span>
                    <span>
                      {{ trans('purchases refund') }}
                    </span>
                    <span> {{ trans('store_transfer') }} </span>
                  </div>
                </th>
                <th>{{ trans('balance') }}</th>
              </b-tr>
            </b-thead>
            <TableSkeletonLoader
              :items="10"
              :length="11"
              v-if="skeletonLoading"
            />
            <b-tbody v-else class="text-center">
              <b-tr v-for="report in reports" :key="report.id">
                <b-td>{{ report.id }}</b-td>
                <b-td>
                  <router-link
                    :to="{
                      path:
                        '/products-card/' +
                        report.product.serial +
                        '?inventory_id=' +
                        route_id,
                    }"
                  >
                    {{ spliceText(report.product.serial, '10') }}
                  </router-link>
                </b-td>
                <b-td>{{ report.product.title }}</b-td>
                <b-td
                  :class="
                    Number(report.initial_amount).isNegative(
                      'negative_number_color'
                    )
                  "
                >
                  {{ Number(report.initial_amount).toNegativeFormat(0) }}
                </b-td>

                <b-td
                  :class="
                    Number(report.purchase_amount).isNegative(
                      'negative_number_color'
                    )
                  "
                >
                  {{ Number(report.purchase_amount).toNegativeFormat(0) }}
                </b-td>

                <b-td
                  :class="
                    Number(report.refund_sales_amount).isNegative(
                      'negative_number_color'
                    )
                  "
                >
                  {{ Number(report.refund_sales_amount).toNegativeFormat(0) }}
                </b-td>

                <b-td
                  :class="
                    Number(report.inventory_transfer_incremented).isNegative(
                      'negative_number_color'
                    )
                  "
                >
                  {{
                    Number(
                      report.inventory_transfer_incremented
                    ).toNegativeFormat(0)
                  }}
                </b-td>

                <b-td
                  :class="
                    Number(report.sales_amount).isNegative(
                      'negative_number_color'
                    )
                  "
                >
                  {{ Number(report.sales_amount).toNegativeFormat(0) }}
                </b-td>

                <b-td
                  :class="
                    Number(report.refund_purchase_amount).isNegative(
                      'negative_number_color'
                    )
                  "
                >
                  {{
                    Number(report.refund_purchase_amount).toNegativeFormat(0)
                  }}
                </b-td>
                <b-td
                  :class="
                    Number(report.inventory_transfer_decremented).isNegative(
                      'negative_number_color'
                    )
                  "
                >
                  {{
                    Number(
                      report.inventory_transfer_decremented
                    ).toNegativeFormat(0)
                  }}
                </b-td>

                <b-td
                  :class="
                    Number(report.quantity).isNegative('negative_number_color')
                  "
                >
                  {{ Number(report.quantity).toNegativeFormat(0) }}
                </b-td>
              </b-tr>
            </b-tbody>
            <b-tbody
              v-if="!skeletonLoading && !reports.length"
              class="text-center"
            >
              <b-tr>
                <b-td colspan="5">
                  <h5>{{ trans('no_results_found') }}</h5>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-row>
        <div
          class="col-sm-12 text-center"
          v-if="!skeletonLoading && reports.length"
        >
          <pagination-component
            :items="reports"
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
</template>

<script>
import axios from 'axios'
import TableSkeletonLoader from '../../components/global/TableSkeletonLoader.vue'

export default {
  components: { TableSkeletonLoader },

  name: 'AppInventories',
  props: [
    'section',
    'sections',
    'user',
    'language',
    'user_language',
    'langs',
    'permissions',
    'settings',
  ],
  data() {
    return {
      skeletonLoading: true,
      reports: [],
      paginate: {},
      route_id: '',
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: 0,
      total: 0,
    }
  },
  mounted() {
    this.getHistory()
  },
  methods: {
    spliceText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength)
      } else {
        return text
      }
    },
    getHistory() {
      axios
        .get(
          '/api/stock/histories?inventory_id=' + this.$route.query.inventory_id
        )
        .then(res => {
          this.skeletonLoading = false
          this.reports = res.data.body.report.data
          this.paginate = res.data.body.report.paginate
          this.total = res.data.body.report.paginate.total
          this.current_page = res.data.body.report.paginate.current_page
          this.total = res.data.body.report.paginate.total
          this.current_page = res.data.body.report.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.report.paginate.next_page_url
          this.prev_page_url = res.data.body.report.paginate.prev_page_url

          this.first_page_url = res.data.body.report.paginate.first_page_url

          this.last_page_url = res.data.body.report.paginate.last_page_url
          this.last_page = res.data.body.report.paginate.last_page
          this.route_id = this.$route.query.inventory_id
          console.log(this.$route.query.inventory_id)
        })
    },

    goTo(url) {
      this.skeletonLoading = true
      this.reports = []

      let str = ''
      for (var key in this.filters) {
        if (this.filters[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.filters[key]
      }
      url = url.includes('?') ? url + '&' + str : url + '?' + str

      axios
        .get(url)
        .then(res => {
          this.skeletonLoading = false
          this.reports = res.data.body.report.data
          this.paginate = res.data.body.report.paginate
          this.total = res.data.body.report.paginate.total
          this.current_page = res.data.body.report.paginate.current_page
          this.total = res.data.body.report.paginate.total
          this.current_page = res.data.body.report.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.report.paginate.next_page_url
          this.prev_page_url = res.data.body.report.paginate.prev_page_url

          this.first_page_url = res.data.body.report.paginate.first_page_url

          this.last_page_url = res.data.body.report.paginate.last_page_url
          this.last_page = res.data.body.report.paginate.last_page
          this.loaded = true
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
  },
}
</script>

<style></style>
