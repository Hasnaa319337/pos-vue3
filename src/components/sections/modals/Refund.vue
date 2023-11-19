<template>
  <section>
    <b-modal
      size="xl"
      id="refund-modal"
      class="refund-modal"
      ref="refund-modal"
      centered
      scrollable
      :title="`${trans('refund')}`"
      @hidden="cancel_action"
      :hide-footer="!refund.length"
    >
      <ValidationObserver
        v-if="!invoice_id"
        v-slot="{ handleSubmit }"
        ref="form"
      >
        <b-form @submit.prevent="handleSubmit(loadInvoice)">
          <ValidationProvider
            rules="required"
            v-slot="{ valid, errors }"
            name="invoice_id"
          >
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
                <b-button
                  :disabled="!refund.invoice_id"
                  type="submit"
                  variant="primary"
                >
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

import RefundReceipt from './RefundReceipt.vue'

export default {
  props: ['invoice_id', 'settings', 'user'],
  data() {
    return {
      customEvents: [
        { eventName: 'open-refund-modal', callback: this.openRefundModal },
      ],
      message: '',
      alertType: '',
      refund: [],
      invoice: {},
      language: '',
      paymentMethods: [],
      pMethod: '',
      // settings: [],
      x: '',
    }
  },
  components: { RefundReceipt },
  computed: {
    refundSubTotal() {
      if (this.refund.length) {
        let total = 0
        for (let i = 0; i < this.refund.length; i++) {
          total =
            parseFloat(total) +
            parseFloat(this.refund[i].subtotal) -
            (parseFloat(this.invoice.discount_amount) /
              parseFloat(this.invoice.subtotal)) *
              parseFloat(this.refund[i].subtotal)
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
          this.refund[i].total = (
            parseFloat(this.refund[i].subtotal) -
            (parseFloat(this.invoice.discount_amount) /
              parseFloat(this.invoice.subtotal)) *
              parseFloat(this.refund[i].subtotal) +
            parseFloat(
              parseFloat(this.refund[i].tax_percentage / 100) *
                parseFloat(this.refund[i].price) *
                parseFloat(this.refund[i].quantity)
            )
          ).toFixed(2)
          total = parseFloat(total) + parseFloat(this.refund[i].total)
          // total = parseFloat(total).toFixed(2);
        }
        return total.toFixed(2)
      }
      return 0
    },
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
    openReceiptDirect() {
      if (this.invoice_id) {
        axios
          .get('/api/cashier/load-invoice/' + this.invoice_id)
          .then(res => {
            if (res.data.code == 200) {
              this.message = ''
              this.invoice = res.data.body.invoice
            } else {
              this.message = res.data.message
              this.alertType = 'danger'
              this.invoice = {}
              let invID = this.refund.invoice_id
              this.refund = []
              this.refund.invoice_id = invID
              this.pMethod = ''
            }
          })
          .catch(error => {
            this.message = error.response.data.message
            this.alertType = 'danger'
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 5000)
          })
      }
    },
    openRefundModal(data) {
      this.language = data.language
      this.paymentMethods = data.paymentMethods || {
        bank: 'bank',
        cash: 'cash',
      }
      // this.settings = data.settings;
      this.$refs['refund-modal'].show()
      if (this.invoice_id) {
        this.openReceiptDirect()
      }
    },
    handleSubmit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          // Successfully validated & update the data.
          this.store()
        }
      })
    },
    hide_action() {
      this.$bvModal.hide('refund-modal')
    },
    cancel_action() {
      this.clearForm()
      this.hide_action()
    },
    clearForm() {
      this.refund = []
      this.invoice = {}
      this.pMethod = ''
      this.message = ''
      this.alertType = ''
    },
    loadInvoice() {
      this.$bvModal.hide('refund-modal')
      axios
        .get('/api/cashier/load-invoice/' + this.refund.invoice_id)

        .then(res => {
          if (res.data.status) {
            this.invoice = res.data.body.invoice

            this.$router.push('/sales/refund/' + this.refund.invoice_id)
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
            this.invoice = {}
            let invID = this.refund.invoice_id
            this.refund = []
            this.refund.invoice_id = invID
            this.pMethod = ''
          }

          this.$nextTick(() => {
            this.$refs.form.reset()
          })
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
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
          _this.x.quantity = quantity
          _this.refund.push(_this.x)
        } else {
          if (
            _this.refund.filter(function (e) {
              return e.item_id === _this.x.item_id
            }).length > 0
          ) {
            _this.refund.filter(a => {
              if (a.item_id === _this.x.item_id) {
                return (a.quantity = quantity + a.quantity)
              }
            })
          } else {
            _this.x.quantity = quantity + _this.x.quantity
            _this.refund.push(_this.x)
          }
        }
      }
      for (let i = 0; i < this.refund.length; i++) {
        this.refund[i].subtotal = (
          parseFloat(this.refund[i].price) * parseFloat(this.refund[i].quantity)
        ).toFixed(2)
      }
      for (let i = 0; i < this.invoice.items.length; i++) {
        this.invoice.items[i].subtotal = (
          parseFloat(this.invoice.items[i].price) *
          parseFloat(this.invoice.items[i].quantity)
        ).toFixed(2)
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
            _this.refund.filter(a => {
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
      for (let i = 0; i < this.refund.length; i++) {
        this.refund[i].subtotal = (
          parseFloat(this.refund[i].price) * parseFloat(this.refund[i].quantity)
        ).toFixed(2)
      }
      for (let i = 0; i < this.invoice.items.length; i++) {
        this.invoice.items[i].subtotal = (
          parseFloat(this.invoice.items[i].price) *
          parseFloat(this.invoice.items[i].quantity)
        ).toFixed(2)
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
            _this.invoice.items.filter(a => {
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
      for (let i = 0; i < this.refund.length; i++) {
        this.refund[i].subtotal = (
          parseFloat(this.refund[i].price) * parseFloat(this.refund[i].quantity)
        ).toFixed(2)
      }
      for (let i = 0; i < this.invoice.items.length; i++) {
        this.invoice.items[i].subtotal = (
          parseFloat(this.invoice.items[i].price) *
          parseFloat(this.invoice.items[i].quantity)
        ).toFixed(2)
      }
    },
    submitRefund() {
      // if (!['cash', 'visa'].includes(this.pMethod)) {
      //     this.message = this.strings['select refund method'];
      //     this.alertType = 'danger';
      //     return
      // }
      if (this.refund.length > 0) {
        this.refund.forEach(item => {
          item.tax_amount =
            (parseFloat(item.tax_percentage) / parseFloat(item.subtotal)) * 100
          item.sale_price = item.sale_price ?? item.price
          item.discount_amount = item.discount_amount ?? 0
          item.discount_percentage = item.discount_percentage ?? 0
        })
      }
      console.log(this.refund)
      console.log(_.sumBy(this.refund, 'tax_amount'))

      let data = {
        items: this.refund,
        remaining_amount: this.invoice.remaining_amount,
        payment_type: this.invoice.payment_type ?? 'installment', // will be reviewed
        discount_amount: this.invoice.discount_amount,
        discount_percentage:
          this.invoice.discount_percentage ?? this.invoice.discount_amount,
        subtotal: this.refundSubTotal,
        total: this.refundTotal,
        sale_id: this.invoice.id,
        payment_method: this.pMethod,
        tax_amount:
          this.refund.length > 0 ? _.sumBy(this.refund, 'tax_amount') : 0,
        tax_percentage:
          _.sumBy(this.refund, 'tax_amount') > 0
            ? ((this.refund.length > 0
                ? _.sumBy(this.refund, 'tax_amount')
                : 0) /
                this.refundTotal) *
              100
            : 0,
      }
      axios
        .post('/api/cashier/submit-refund', data)
        .then(res => {
          if (res.data.success) {
            this.message = res.data.message
            this.alertType = 'success'
            data.invoiceID = this.invoice.id
            data.qr = res.data.refund.qr
            data.settings = this.settings
            data.language = this.language
            data.created_at = res.data.refund.created_at

            // eslint-disable-next-line no-undef
            SharedEvent.fire('open-refund-receipt-modal', data)
          } else {
            this.showToastError(res.data.message, res.data.custom_code)

            this.invoice = {}
            let invID = this.refund.invoice_id
            this.refund = []
            this.refund.invoice_id = invID
            this.pMethod = ''
          }

          this.$nextTick(() => {
            this.$refs.form.reset()
          })
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 5000)
        })
    },
  },
  watch: {
    invoice_id: function () {
      this.openReceiptDirect()
    },
  },
}
</script>

<style lang="scss"></style>
