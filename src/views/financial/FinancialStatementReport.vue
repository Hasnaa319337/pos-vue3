<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card finanacial_statment">
      <div class="card-header mb-3 header-sm d-flex" style="padding: 0 25px !important">
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto">
            {{ trans('income_list') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
      </div>
      <div class="card-body">
        <b-row
          class="mx-0"
          v-if="permissions.includes('view_any_financial_list_section_item')"
          style="margin-top: 5px"
        >
          <b-table-simple
            class="report_table"
            sticky-header
            striped
            bordered
            responsive
            style="min-height: 50px"
          >
            <GlobalTabel :columns="columns" />
            <table-skeleton-loader :items="10" :length="columns.length" v-if="skeletonLoading" />
            <b-tbody class="text-center" v-else>
              <b-tr v-for="section in list_sections" :key="section">
                <b-td style="padding: 10px 0 0 0 !important" class="itemData"
                  ><p class="item_title" v-for="sec in section.items" :key="sec">
                    {{ sec.reference.title }}
                  </p>

                  <br />
                  <p style="background: #b3b3b3; color: #fff; font-weight: 800; padding: 10px 0">
                    {{ section.title }}
                  </p>
                </b-td>

                <b-td style="padding: 10px 0 0 0 !important" class="itemData"
                  ><p class="item_title" v-for="sec in section.items" :key="sec">
                    {{ trans(sec.type) }}
                  </p>

                  <br />
                  <p
                    style="
                      background: #b3b3b3;
                      color: #fff;
                      font-weight: 800;
                      padding: 10px 0;
                      border-left: 1px solid #fff;
                      border-right: 1px solid #fff;
                    "
                  >
                    ---
                  </p>
                </b-td>

                <b-td style="padding: 10px 0 0 0 !important">
                  <p
                    style="background: none !important"
                    class="item_title"
                    v-for="sec in section.items"
                    :key="sec"
                    :style="
                      sec.reference.total_balance < 0
                        ? 'color:rgb(255 5 5);font-weight:800'
                        : ' color : #000'
                    "
                  >
                    {{ Number(sec.reference.total_balance).toNegativeFormat() }}
                  </p>

                  <br />
                  <p
                    style="
                      background: #b3b3b3;
                      color: #fff;
                      font-weight: 800;
                      padding: 10px 0;
                      border-left: 1px solid #fff;
                      border-right: 1px solid #fff;
                    "
                    class="item_title"
                  >
                    ---
                  </p>
                </b-td>
                <b-td style="padding: 10px 0 0 0 !important">
                  <p v-for="sec in section.items" :key="sec" class="item_title">---</p>

                  <br />
                  <p
                    style="
                      background: #b3b3b3 !important;
                      color: #fff;
                      font-weight: 800;
                      padding: 10px 0;
                    "
                    class="item_title"
                    :class="Number(section.total_balance).isNegative('negative_number_color')"
                  >
                    {{ Number(section.total_balance).toNegativeFormat() }}
                  </p>
                </b-td>
              </b-tr>

              <b-tr>
                <b-td style="font-weight: 800">مجمل الربح</b-td>
                <b-td>---</b-td>
                <b-td>---</b-td>
                <b-td
                  style="font-weight: 800"
                  :class="Number(total_balance_sections).isNegative('negative_number_color')"
                >
                  {{ Number(total_balance_sections).toNegativeFormat() }}
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
export default {
  components: { TableSkeletonLoader },
  props: ['permissions'],
  data() {
    return {
      columns: ['name', 'type', 'partial', 'overall'],
      list_sections: [],
      rowId: '',

      total_balance_sections: '',
      skeletonLoading: true
    }
  },
  mounted() {
    this.getReport()
  },
  methods: {
    getId(id) {
      this.rowId = id
    },
    getReport() {
      this.axios({
        method: 'GET',
        url: '/api/financial-list/report/income_list'
      })
        .then((res) => {
          this.skeletonLoading = false
          this.list_sections = res.data.body.sections
          this.total_balance_sections = res.data.body.total_balance_sections
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
          console.log(error)
        })
    }
  }
}
</script>

<style>
.report_table tr td {
  padding: 0 !important;
}

.item_title {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
