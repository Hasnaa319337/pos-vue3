<template>
  <section>
    <b-modal
      size="xl"
      id="purchase-refund-modal"
      class="purchase-refund-modal"
      ref="purchase-refund-modal"
      centered
      scrollable
      :title="`${trans('refund')}`"
      @hidden="cancel_action"
      :hide-footer="!refund.length"
    >
      <ValidationObserver v-if="!invoice_id" v-slot="{ handleSubmit }" ref="form">
        <b-form @submit.prevent="handleSubmit(loadInvoice)">
          <ValidationProvider rules="required" v-slot="{ valid, errors }" name="invoice_id">
            <b-form-row>
              <div class="col">
                <b-form-group class="w-auto">
                  <b-form-input
                    type="number"
                    :placeholder="trans('invoice id')"
                    v-model="refund.invoice_id"
                    :state="errors[0] ? false : valid ? true : null"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ trans('enter_an_invoice_number') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div class="col-auto">
                <b-button :disabled="!refund.invoice_id" type="submit" variant="primary">
                  {{ trans('load invoice') }}
                </b-button>
              </div>
            </b-form-row>
          </ValidationProvider>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['invoice_id', 'settings', 'user'],
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-purchase-refund-modal',
          callback: this.openRefundModal
        }
      ],

      refund: [],
      strings: [],
      invoice: {},
      language: '',
      paymentMethods: [],
      pMethod: '',
      payment_type: '',

      x: ''
    }
  },

  computed: {
    refundSubTotal() {
      if (this.refund.length) {
        let total = 0
        for (let i = 0; i < this.refund.length; i++) {
          this.refund[i].cost = parseFloat(this.refund[i].cost).toFixed(2)
          this.refund[i].subtotal =
            parseFloat(this.refund[i].cost) * parseInt(this.refund[i].quantity)
          total = total + this.refund[i].subtotal
          // total = parseFloat(total).toFixed(2);
        }
        return total.toFixed(2)
      }
      return 0
    },
    refundTotal() {
      if (this.refund.length) {
        let total = 0
        for (let i = 0; i < this.refund.length; i++) {
          this.refund[i].cost = parseFloat(this.refund[i].cost).toFixed(2)
          this.refund[i].total =
            (parseFloat(this.refund[i].cost) +
              parseFloat(
                parseFloat(this.refund[i].tax_percentage / 100) * parseFloat(this.refund[i].cost)
              )) *
            parseInt(this.refund[i].quantity)
          total = total + this.refund[i].total
          // total = parseFloat(total).toFixed(2);
        }
        return total.toFixed(2)
      }
      return 0
    }
  },
  created() {
    ////////////////////////////////////////////////////
    //**          Custom Event Listener           ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  unmounted() {
    ////////////////////////////////////////////////////
    //**      Remove Custom Event Listener        ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  methods: {
    openReceiptDirect() {
      if (this.invoice_id) {
        axios.get('/api/refund-purchases/load-invoice/' + this.invoice_id).then((res) => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.invoice = res.data.body.invoice
            this.paymentMethods = { bank: 'bank', cash: 'cash' }
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
            this.invoice = {}
            let invID = this.refund.invoice_id
            this.refund = []
            this.refund.invoice_id = invID
            this.pMethod = ''
            this.payment_type = ''
          }
        })
      }
    },
    openRefundModal(data) {
      this.language = data.language
      this.paymentMethods = data.paymentMethods
      this.settings = data.settings
      this.$refs['purchase-refund-modal'].show()
      if (this.invoice_id) {
        this.openReceiptDirect()
      }
    },
    handleSubmit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          // Successfully validated & update the data.
          this.store()
        }
      })
    },
    hide_action() {
      this.$bvModal.hide('purchase-refund-modal')
    },
    cancel_action() {
      this.clearForm()
      this.hide_action()
    },
    clearForm() {
      this.refund = []
      this.invoice = {}
      this.pMethod = ''
      this.payment_type = ''
    },
    loadInvoice() {
      localStorage.setItem('myRefundPurchaseInv', this.refund.invoice_id)
      this.$bvModal.hide('purchase-refund-modal')
      axios
        .get('/api/cashier/load-invoice/' + this.refund.invoice_id)
        .then((res) => {
          if (res.data.status) {
            this.invoice = res.data.body.invoice
            // this.$router.push('/purchase/refund/' + this.refund.invoice_id)
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
            this.invoice = {}
            let invID = this.refund.invoice_id
            this.refund = []
            this.refund.invoice_id = invID
            this.pMethod = ''
            this.payment_type = ''
          }

          this.$nextTick(() => {
            this.$refs.form.reset()
          })
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    refundAll(index, quantity) {
      if (quantity > 0) {
        let _this = this
        for (let i = 0; i < _this.invoice.items.length; i++) {
          if (_this.invoice.items[i].item_id == index) {
            _this.invoice.items[i].quantity = 0
            _this.x = Object.assign({}, _this.invoice.items[i])
            _this.invoice.items.splice(i, 1)
          }
        }
        if (_this.refund.length === 0) {
          _this.x.quantity = parseInt(quantity)
          _this.refund.push(_this.x)
        } else {
          if (
            _this.refund.filter(function (e) {
              return e.item_id === _this.x.item_id
            }).length > 0
          ) {
            _this.refund.filter((a) => {
              if (a.item_id === _this.x.item_id) {
                return (a.quantity = parseInt(quantity) + parseInt(a.quantity))
              }
            })
          } else {
            _this.x.quantity = parseInt(quantity) + parseInt(_this.x.quantity)
            _this.refund.push(_this.x)
          }
        }
      }
    },
    refundOneItem(index, quantity) {
      if (quantity > 0) {
        let _this = this
        for (let i = 0; i < _this.invoice.items.length; i++) {
          if (_this.invoice.items[i].item_id == index) {
            _this.invoice.items[i].quantity--
            _this.x = Object.assign({}, _this.invoice.items[i])
            if (_this.invoice.items[i].quantity === 0) {
              _this.invoice.items.splice(i, 1)
            }
          }
        }
        if (_this.refund.length === 0) {
          _this.x.quantity = 1
          _this.refund.push(_this.x)
        } else {
          if (
            _this.refund.filter(function (e) {
              return e.item_id === _this.x.item_id
            }).length > 0
          ) {
            _this.refund.filter((a) => {
              if (a.item_id === _this.x.item_id) {
                return (a.quantity += 1)
              }
            })
          } else {
            _this.x.quantity = 1
            _this.refund.push(_this.x)
          }
        }
      }
    },
    buyOneItem(index, quantity) {
      if (quantity > 0) {
        let _this = this
        for (let i = 0; i < _this.refund.length; i++) {
          if (_this.refund[i].item_id == index) {
            _this.refund[i].quantity--
            _this.x = Object.assign({}, _this.refund[i])
            if (_this.refund[i].quantity === 0) {
              _this.refund.splice(i, 1)
            }
          }
        }
        if (_this.invoice.items.length === 0) {
          _this.x.quantity = 1
          _this.invoice.items.push(_this.x)
        } else {
          if (
            _this.invoice.items.filter(function (e) {
              return e.item_id === _this.x.item_id
            }).length > 0
          ) {
            _this.invoice.items.filter((a) => {
              if (a.item_id === _this.x.item_id) {
                return (a.quantity += 1)
              }
            })
          } else {
            _this.x.quantity = 1
            _this.invoice.items.push(_this.x)
          }
        }
      }
    },
    submitRefund() {
      // if (!['cash', 'visa'].includes(this.pMethod)) {
      //     this.message = this.strings['select refund method'];
      //     this.alertType = 'danger';
      //     return
      // }
      for (let i = 0; i < this.refund.length; i++) {
        this.refund[i].subtotal = this.refund[i].price
      }

      let data = {
        items: this.refund,
        subtotal_refunded: this.refundSubTotal,
        total_refunded: this.refundTotal,
        purchase_id: this.invoice.id,
        payment_method: this.pMethod,
        payment_type: this.payment_type
      }
      axios.post('/api/refund-purchases', data).then((res) => {
        if (res.data.status) {
          this.showToastError(res.data.message, res.data.custom_code)
          data.invoiceID = this.invoice.id

          data.settings = this.settings
          data.language = this.language
          data.created_at = res.data.refund.created_at
          data.qr = res.data.refund.qr

          // eslint-disable-next-line no-undef
          this.SharedEvent.fire('open-refund-receipt-modal', data)
        } else {
          this.showToastError(res.data.message, res.data.custom_code)
          this.invoice = {}
          let invID = this.refund.invoice_id
          this.refund = []
          this.refund.invoice_id = invID
          this.pMethod = ''
          this.payment_type = ''
        }
      })
    }
  },
  watch: {
    invoice_id: function () {
      this.openReceiptDirect()
    }
  }
}
</script>

<style lang="scss"></style>
