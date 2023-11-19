<template>
  <section>
    <b-modal
      id="move-stock-modal"
      class="move-stock-modal"
      ref="move-stock-modal"
      centered
      size="lg"
      scrollable
      :title="`${product.title}`"
      @hidden="clearForm"
    >
      <div class="col-sm-12 text-center" v-if="message.length">
        <div class="alert" :class="'alert-' + alertType" v-html="this.message"></div>
      </div>
      <ValidationObserver ref="form">
        <b-form>
          <b-table-simple
            hover
            bordered
            responsive
            style="min-height: 50px; margin-top: 30px"
            v-if="!product.has_attributes"
          >
            <b-tr>
              <b-th>{{ trans('stock') }}</b-th>
              <b-th>{{ trans('inventory') }}</b-th>
              <b-th>{{ trans('quantity') }}</b-th>
              <b-th>{{ trans('to inventory') }}</b-th>
            </b-tr>
            <b-tr>
              <b-td>{{ product.quantity }}</b-td>
              <!-- <b-td>
                                {{
                                    language == 'en' ? product.inventory.title :
                                        product.inventory.title_ar
                                }}
                            </b-td> -->
              <b-td>
                <ValidationProvider rules="required" v-slot="{ valid, errors }" name="stock">
                  <b-form-select
                    class="form-control"
                    v-model="product.inventory"
                    :state="errors[0] ? false : valid ? true : null"
                  >
                    <b-form-select-option v-for="inv in inventories" :value="inv.id" :key="inv.id">
                      {{ inv.title }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-td>

              <b-td style="width: 35%; min-width: 120px">
                <ValidationProvider
                  :rules="`required|integer|min_value:1|max_value:${product.quantity}`"
                  v-slot="{ valid, errors }"
                  name="quantity"
                >
                  <b-form-input
                    type="number"
                    class="form-control"
                    v-model="product.quant"
                    @keyup="isNumber($event)"
                    :state="errors[0] ? false : valid ? true : null"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-td>

              <b-td>
                <ValidationProvider rules="required" v-slot="{ valid, errors }" name="stock">
                  <b-form-select
                    class="form-control"
                    v-model="product.target_inv"
                    :state="errors[0] ? false : valid ? true : null"
                  >
                    <b-form-select-option
                      v-for="invent in inventories"
                      :value="invent.id"
                      :key="invent.id"
                    >
                      {{ invent.title }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-td>
            </b-tr>
          </b-table-simple>
          <b-table-simple hover bordered responsive style="min-height: 50px" v-else>
            <b-tr>
              <b-th>{{ trans('variations') }}</b-th>
              <b-th>{{ trans('stock') }}</b-th>
              <b-th>{{ trans('inventory') }}</b-th>
              <b-th>{{ trans('quantity') }}</b-th>
              <b-th>{{ trans('to inventory') }}</b-th>
            </b-tr>
            <b-tr>
              <b-td>
                <ValidationProvider
                  rules="required"
                  v-slot="{ valid, errors }"
                  name="variant_product"
                >
                  <b-form-select
                    class="form-control"
                    v-model="product.var_id"
                    :state="errors[0] ? false : valid ? true : null"
                  >
                    <b-form-select-option
                      v-for="vr in product.variation"
                      :value="vr.id"
                      :key="vr.id"
                    >
                      {{ vr.title }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-td>
              <b-td
                >{{
                  product.hasOwnProperty('var_id') && product.var_id > 0
                    ? product.variation.filter((x) => x.id == product.var_id)[0].quantity
                    : product.quantity
                }}
              </b-td>
              <b-td>
                {{ product.inventory.title }}
              </b-td>
              <td style="width: 35%; min-width: 120px">
                <ValidationProvider
                  :rules="`required|integer|min_value:1|max_value:${
                    product.hasOwnProperty('var_id') && product.var_id > 0
                      ? product.variation.filter((x) => x.id == product.var_id)[0].quantity
                      : product.quantity
                  }`"
                  v-slot="{ valid, errors }"
                  name="quantity"
                >
                  <b-form-input
                    type="number"
                    class="form-control"
                    :state="errors[0] ? false : valid ? true : null"
                    v-model="product.quant"
                    @keyup="isNumber($event)"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </td>
              <td>
                <ValidationProvider rules="required" v-slot="{ valid, errors }" name="stock">
                  <b-form-select
                    class="form-control"
                    v-model="product.target_inv"
                    :state="errors[0] ? false : valid ? true : null"
                  >
                    <b-form-select-option v-for="inv in inventories" :value="inv.id" :key="inv.id">
                      {{ inv.title }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </td>
            </b-tr>
          </b-table-simple>
        </b-form>
      </ValidationObserver>

      <section slot="modal-footer">
        <b-button
          style="margin: 0 10px"
          size="md"
          variant="success"
          type="submit"
          @click="handleSubmit(product)"
        >
          {{ trans('move stock') }}
        </b-button>
        <b-button size="md" variant="danger" @click="close_action">
          {{ trans('close') }}
        </b-button>
      </section>

      <MoveStockReport></MoveStockReport>
    </b-modal>
  </section>
</template>

<script>
import MoveStockReport from './MoveStockReport.vue'

export default {
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-move-stock-modal',
          callback: this.openMoveStockModal
        }
      ],
      message: '',
      alertType: '',
      product: {
        inventory: { title: '' }
      },
      language: '',
      inventories: [],
      user: {}
    }
  },
  components: { MoveStockReport },
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
    openMoveStockModal(data) {
      this.product = this.cloneItem(data.product)
      this.user = data.settings.user
      this.language = data.settings.user.language
      this.inventories = data.settings.inventories
      this.inventories = this.inventories.filter((x) => {
        return x.id != this.product.inv_id
      })
      this.$refs['move-stock-modal'].show()
    },
    handleSubmit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          // Successfully validated & update the data.
          this.moveStock()
        }
      })
    },
    close_action() {
      this.clearForm()
      this.$bvModal.hide('move-stock-modal')
    },
    clearForm() {
      this.product = {
        inventory: { title: '', title_ar: '' }
      }
      this.language = ''
      this.inventories = []
    },
    moveStock() {
      this.message = "<i class='fa fa-spinner fa-spin'></i>"
      this.alertType = 'info'
      let data = {
        id: this.product.id,
        product_serial: this.product.serial,
        from_inventory_id: this.product.id,
        to_inventory_id: this.product.target_inv,
        quantity: this.product.quant
      }
      if (this.product.has_attributes) {
        data.var_id = this.product.var_id
      }
      console.log(data)
      this.axios
        .post('/api/inventory-transfers', data)
        .then((res) => {
          this.message = res.data.message
          if (res.data.status) {
            this.alertType = 'success'
            this.product.quant = ''
            this.product.quantity = res.data.body.inventory_transfer.quantity
            if (this.product.has_attributes) {
              this.product.variation.filter((x) => x.id == this.product.var_id)[0].quantity =
                this.product.quantity
            }

            this.$refs.form.reset()
            this.$bvModal.hide('move-stock-modal')

            let reportData = {
              report: res.data.report,
              user: this.user
            }

            // eslint-disable-next-line no-undef
            SharedEvent.fire('open-move-stock-report-modal', reportData)
          } else {
            this.alertType = 'danger'
          }
        })
        .catch((err) => {
          this.message = err.response.data.message
          this.alertType = 'danger'
        })
    }
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
