<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card finanacial_statment">
      <div class="card-header mb-3 header-sm d-flex" style="padding: 0 25px !important">
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto">
            {{ trans('financial_equations') }}
          </h4>
          <div class="dropdown">
            <router-link
              class="btn btn-success btn-md"
              to="/financial_equation_add"
              v-if="permissions.includes('create_financial_list_section')"
            >
              <font-awesome-icon icon="fa-solid fa-circle-plus " />
            </router-link>
            <GoBackButton />
          </div>
        </div>
      </div>
      <div class="card-body">
        <b-row
          class="mx-0"
          style="margin-top: 5px"
          v-if="permissions.includes('view_any_financial_list_section')"
        >
          <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
            <GlobalTabel :columns="columns" />
            <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />
            <b-tbody class="text-center" v-else>
              <b-tr v-for="section in financial_equations" :key="section.id">
                <b-td>{{ section.title }}</b-td>

                <b-td>
                  {{ Number(section.total_balance).toNegativeFormat() }}
                </b-td>
                <b-td>{{ section.created_at }}</b-td>

                <b-td>
                  <!--    v-if="permissions.includes('update_financial_list_section_item')" -->
                  <router-link
                    :to="'/financial-equation/show/' + section.id"
                    v-b-tooltip.hover
                    :title="trans('show')"
                    style="cursor: pointer; color: #007bff !important; font-size: 14px"
                    class="mx-2"
                  >
                    <font-awesome-icon icon="fa-solid fa-eye" />
                  </router-link>
                  <!--   v-if="permissions.includes('view_financial_list_section_item')" -->
                  <router-link
                    :to="'/financial-equation/edit/' + section.id"
                    v-b-tooltip.hover
                    :title="trans('edit')"
                    style="cursor: pointer; color: #007bff !important; font-size: 14px"
                    class="mx-2"
                  >
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                  </router-link>
                  <!--   v-if="permissions.includes('delete_financial_list_section_item')" -->
                  <a
                    v-b-tooltip.hover
                    :title="trans('delete')"
                    style="cursor: pointer; color: #dc3545 !important"
                    class="mx-2"
                    @click="Delete(section)"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash "
                  /></a>
                  <!--   v-if="permissions.includes('view_action_event_financial_equation_item')" -->
                  <ActionButton :id="section.id" :resource_name="'financial_equation'" />
                </b-td>
              </b-tr>
            </b-tbody>
            <!-- <b-tbody class="text-center" v-if="!financial_equations.length">
                <b-tr class="text-center">
                  <b-td colspan="8">
                    <h5 class="no_results_found">
                      {{ trans('no_results_found') }}
                    </h5>
                  </b-td>
                </b-tr>
              </b-tbody> -->
          </b-table-simple>
        </b-row>

        <div class="col-sm-12 text-center" v-if="financial_equations.length">
          <pagination-component
            :items="financial_equations"
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
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
export default {
  components: {
    PaginationComponent,
    TableSkeletonLoader
  },
  props: ['permissions', 'settings', 'language'],
  data() {
    return {
      columns: ['equation', 'balance', 'created_at', 'actions'],
      financial_equations: [],
      skeletonLoading: true,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: 0,
      total: 0,
      paginate: {}
    }
  },
  mounted() {
    this.getAllFinancialEquations()
  },
  methods: {
    getAllFinancialEquations() {
      axios({
        method: 'GET',
        url: '/api/equation/financial-equations'
      })
        .then((res) => {
          this.skeletonLoading = false
          this.financial_equations = res.data.body.financial_equations.data

          this.paginate = res.data.body.financial_equations.paginate
          this.total = res.data.body.financial_equations.paginate.total
          this.current_page = res.data.body.financial_equations.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.financial_equations.paginate.next_page_url
          this.prev_page_url = res.data.body.financial_equations.paginate.prev_page_url
          this.first_page_url = res.data.body.financial_equations.paginate.first_page_url
          this.last_page_url = res.data.body.financial_equations.paginate.last_page_url
          this.last_page = res.data.body.financial_equations.paginate.last_page

          if (this.permissions.includes('create_financial_list_section')) {
            console.log('permissions true')
          } else {
            console.log('permissions false')
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    goTo(url) {
      this.financial_equations = []
      this.skeletonLoading = true
      axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.financial_equations = res.data.body.financial_equations.data

          this.paginate = res.data.body.financial_equations.paginate
          this.total = res.data.body.financial_equations.paginate.total
          this.current_page = res.data.body.financial_equations.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.financial_equations.paginate.next_page_url
          this.prev_page_url = res.data.body.financial_equations.paginate.prev_page_url
          this.first_page_url = res.data.body.financial_equations.paginate.first_page_url
          this.last_page_url = res.data.body.financial_equations.paginate.last_page_url
          this.last_page = res.data.body.financial_equations.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    Delete(section) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do_you_want_to_delete_this_equation'), {
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
            axios
              .delete('/api/equation/financial-equations/' + section.id + '')
              .then((res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)

                  this.financial_equations = this.financial_equations.filter((x) => {
                    return x.id != section.id
                  })
                  return this.getAllFinancialList()
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
<style></style>
