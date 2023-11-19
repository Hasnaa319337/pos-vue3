<template>
  <section>
    <b-modal
      id="customers-modal"
      class="customers-modal"
      ref="customers-modal"
      centered
      scrollable
      :title="trans('add_customer')"
      size="xl"
      @hidden="cancel_action"
    >
      <div class="col-sm-12">
        <b-row>
          <ValidationObserver
            class="w-100"
            v-slot="{ handleSubmit }"
            ref="searchForm"
          >
            <b-form
              @submit.prevent="handleSubmit(filter)"
              @reset.prevent="reset"
            >
              <b-form-row>
                <b-col cols="12" md="3">
                  <b-form-group>
                    <b-form-input
                      type="text"
                      class="form-control"
                      v-model="filters.name"
                      :placeholder="trans('search')"
                    />
                  </b-form-group>
                </b-col>

                <b-col cols="12" lg="3" class="text-center mb-3">
                  <b-button variant="success" type="submit" class="mr-2 mb-3"
                    ><i class="fa fa-filter"></i>
                    {{ trans('search') }}
                  </b-button>
                  <b-button
                    variant="warning"
                    type="reset"
                    class="mr-2 mb-3"
                    @click="reset"
                    ><i class="fa fa-refresh"></i>
                    {{ trans('reset_search') }}
                  </b-button>
                </b-col>
              </b-form-row>
            </b-form>
          </ValidationObserver>
        </b-row>
        <b-row>
          <b-table-simple
            sticky-header
            striped
            bordered
            responsive
            style="min-height: 50px"
          >
            <GlobalTabel :columns="columns" />
            <b-tbody
              class="text-center"
              v-if="customersLoaded && customers.length"
            >
              <b-tr v-for="(customer, index) in customers" :key="index">
                <b-td>{{ customer.name }}</b-td>
                <b-td>{{ customer.phone }}</b-td>
                <b-td>{{ customer.tax_num }}</b-td>

                <b-td>
                  <b-form-radio
                    v-model="selected_customer"
                    name="selected_customer"
                    :value="customer"
                  >
                  </b-form-radio>
                </b-td>
              </b-tr>
            </b-tbody>
            <b-tbody
              class="text-center"
              v-else-if="customersLoaded && !customers.length"
            >
              <b-tr class="text-center">
                <b-td colspan="8">
                  <h5 class="no_results_found">
                    {{ trans('no_results_found') }}
                  </h5>
                </b-td>
              </b-tr>
            </b-tbody>
            <b-tbody v-else class="text-center">
              <b-tr>
                <b-td colspan="8">
                  <i
                    class="fa fa-spin fa-spinner"
                    style="font-size: 30px; margin: 50px"
                  ></i>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-row>
      </div>

      <section slot="modal-footer">
        <b-button
          style="margin: 0 7px"
          size="md"
          variant="success"
          type="submit"
          @click="setCustomer(selected_customer)"
          :disabled="Object.keys(selected_customer).length === 0"
        >
          {{ trans('add') }}
        </b-button>
        <b-button size="md" variant="danger" @click="cancel_action">
          {{ trans('cancel') }}
        </b-button>
      </section>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      columns: ['customer_name', 'phone', 'tax_num', 'actions'],
      customEvents: [
        {
          eventName: 'open-customers-modal',
          callback: this.openCustomersModal,
        },
      ],

      customers: {},
      language: '',
      settings: {},
      permissions: [],
      customersLoaded: 0,
      filters: {},
      selected_customer: {},
    }
  },
  created() {
    ////////////////////////////////////////////////////
    //**          Custom Event Listener           ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  destroyed() {
    ////////////////////////////////////////////////////
    //**      Remove Custom Event Listener        ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  methods: {
    openCustomersModal(data) {
      console.log(data)
      this.settings = data.settings
      this.permissions = data.permissions
      this.refresh()
    },
    filter() {
      let str = ''
      for (var key in this.filters) {
        if (this.filters[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.filters[key]
      }

      let globalUrl = new URL(location.href).hash
      let subUrl = ''
      if (globalUrl == '#/cashier') {
        subUrl = '/api/cashier/customers?'
      } else {
        subUrl = '/api/customers?'
      }

      let url = subUrl + str
      this.refresh(url)
    },
    refresh() {
      this.customersLoaded = false

      axios({
        method: 'get',
        url:
          new URL(location.href).hash === '#/cashier'
            ? '/api/cashier/customers'
            : '/api/customers',
        params: {
          search: this.filters.name,
        },
      }).then(res => {
        this.customers = res.data.body.customers.data
        this.customersLoaded = true
        this.$refs['customers-modal'].show()
      })
    },
    cancel_action() {
      this.$bvModal.hide('customers-modal')
    },
    reset() {
      this.usingFilters = false
      this.filters = {
        name: '',
      }
      this.refresh()
    },
    setCustomer(customer) {
      let data = {
        customer: customer,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('cashier-set-customer', data)
      this.cancel_action()
    },
  },
}
</script>

<style lang="scss" scoped>
#customers-modal .custom-control-label::after,
.custom-control-label::before {
  right: 30px !important;
}
@media screen and (max-width: 1199px) {
  .modal-xl {
    max-width: 90% !important;
  }
}
</style>
