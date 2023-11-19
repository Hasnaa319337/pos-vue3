<template>
  <section>
    <b-modal
      style="z-index: 1050"
      id="variations-modal"
      class="variations-modal"
      ref="variations-modal"
      centered
      scrollable
      :title="language == 'en' ? product.title : product.title_ar"
      size="lg"
    >
      <div class="col-sm-12 text-center" v-if="message.length">
        <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
      </div>
      <b-card no-body class="overflow-hidden" :key="reRenderKey">
        <b-row
          class="align-items-center justify-content-md-start justify-content-center"
          no-gutters
          v-for="(variant, index) in product.variation"
          :key="index"
        >
          <div class="img col-md-auto">
            <b-card-img
              v-if="variant.image !== 'parent'"
              :src="variant.image"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
            <b-card-img
              v-if="variant.image == 'parent' && product.image !== ''"
              :src="product.image"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
            <b-card-img
              v-if="variant.image == 'parent' && product.image == ''"
              :src="'assets/images/product.png'"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </div>
          <b-col md="8">
            <b-card-body>
              <b-card-text>
                <h3>
                  {{ language == 'en' ? product.title : product.title_ar }}
                  <span>{{
                    language == 'en'
                      ? variant.terms.title
                      : variant.terms.title_ar
                  }}</span>
                </h3>
                <h4>
                  <del v-if="variant.sale_price > 0"
                    >{{ variant.price }}
                    {{
                      language == 'en'
                        ? settings.currency_en
                        : settings.currency_ar
                    }}
                  </del>
                  <span v-else
                    >{{ variant.price }}
                    {{
                      language == 'en'
                        ? settings.currency_en
                        : settings.currency_ar
                    }}</span
                  >
                  <span variant="success" v-if="variant.sale_price > 0">
                    {{ variant.sale_price }}
                    {{
                      language == 'en'
                        ? settings.currency_en
                        : settings.currency_ar
                    }}
                  </span>
                </h4>
                <div class="text-center col-md-auto col-12">
                  <b-row>
                    <h6 v-if="variant.quantity > 0">
                      <b
                        >{{ variant.quantity
                        }}{{
                          user.language == 'en'
                            ? product.unit.titles.en
                            : product.unit.titles.ar
                        }}
                        {{ strings['in stock'] }}</b
                      >
                    </h6>
                    <h6 v-else>
                      <b>{{ strings['out of stock'] }} </b>
                    </h6>
                  </b-row>

                  <b-row class="align-items-center">
                    <div class="col-lg-6 col-12 px-2 quantity">
                      <div
                        class="row align-items-center m-0 justify-content-between"
                      >
                        <b-input
                          type="text"
                          disabled
                          v-model="variant.quant"
                          class="quantity-field"
                        ></b-input>
                        <b-button
                          class="btn minus-btn"
                          variant="danger"
                          @click="decreaseVarQuant(variant)"
                        >
                          <font-awesome-icon icon="fa-solid fa-minus" />
                        </b-button>
                        <b-button
                          class="btn plus-btn"
                          variant="success"
                          @click="increaseVarQuant(variant)"
                        >
                          <font-awesome-icon icon="fa-solid fa-plus" />
                        </b-button>
                      </div>
                    </div>
                    <div class="col-auto">
                      <h4 class="total my-2" v-if="variant.quant > 0">
                        <span>{{ strings['total'] }}</span>
                        <b>
                          {{
                            order.filter(x => {
                              return x.variation_id == variant.id
                            })[0]['subtotal']
                          }}
                          {{
                            language == 'en'
                              ? settings.currency_en
                              : settings.currency_ar
                          }}</b
                        >
                      </h4>
                    </div>
                  </b-row>
                </div>
              </b-card-text>
            </b-card-body>
          </b-col>
          <hr class="col-12" />
        </b-row>
      </b-card>
      <section slot="modal-footer">
        <b-button
          size="md"
          variant="success"
          type="submit"
          @click="handleSubmit()"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          {{ strings['add'] }}
        </b-button>
        <b-button size="md" variant="danger" @click="cancel_action">
          <font-awesome-icon icon="fa-solid fa-xmark" />
          {{ strings['cancel'] }}
        </b-button>
      </section>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['settings', 'user'],
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-variations-modal',
          callback: this.openVariationsModal,
        },
      ],
      message: '',
      alertType: '',
      data: {},
      strings: [],
      product: {
        variation: [
          {
            image: '',
            terms: {
              title: '',
              title_ar: '',
            },
          },
        ],
        current_terms: [],
      },
      index: '',
      language: '',
      order: {},
      reRenderKey: 0,
      lockOrder: 0,
      permissions: [],
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
    openVariationsModal(data) {
      this.loadVariations(data)
    },
    handleSubmit() {
      this.addVariationToOrder()
    },
    loadVariations(data) {
      this.product = data.product
      this.index = data.index
      this.strings = data.strings
      this.language = data.language
      this.settings = data.settings
      this.order = this.cloneItem(data.order)
      this.permissions = data.permissions
      this.lockOrder = data.lockOrder
      let first_occ = []
      for (let i = 0; i < this.product.terms.length; i++) {
        first_occ.push(data.product.terms[i].terms.ids)
      }
      for (let i = 0; i < this.product.variation.length; i++) {
        this.product.variation[i].terms = data.product.terms[i].terms
      }
      this.product.current_terms = first_occ.sort(sortNumber)

      function sortNumber(a, b) {
        return a - b
      }

      let current_variation = this.product.variation.filter(x => {
        return (
          JSON.stringify(x.terms.ids.sort(sortNumber)[x]) ==
          JSON.stringify(first_occ.sort(sortNumber)[x])
        )
      })
      console.log('test' + current_variation)
      for (let i = 0; i < current_variation.length; i++) {
        current_variation[i].quant =
          current_variation[i].quant != null ? current_variation[i].quant : 0
      }
      this.product.variation = current_variation

      // check if variation exists in order
      let var_exists_in_order = this.order.filter(x => {
        return x.item_id == this.product.variation.id
      })
      if (var_exists_in_order.length) {
        this.product.variation.quant = parseInt(var_exists_in_order[0].quantity)
        this.product.variation.quantity = parseInt(var_exists_in_order[0].stock)
      } else {
        this.product.variation.quant = 0
      }

      this.$refs['variations-modal'].show()
    },
    alterTerm(attr_index, term_id) {
      // find term replacement
      let siblingTerms = this.product.terms[attr_index].terms

      for (let i = 0; i < siblingTerms.length; i++) {
        if (this.product.current_terms.includes(siblingTerms[i].id)) {
          let key = this.product.current_terms.indexOf(siblingTerms[i].id)
          // remove it
          this.product.current_terms.splice(key, 1)
        }
      }
      // add new
      this.product.current_terms.push(term_id)

      function sortNumber(a, b) {
        return a - b
      }

      // alter variation
      let current_variation = this.product.variation.filter(x => {
        return (
          JSON.stringify(x.terms.ids.sort(sortNumber)[x]) ==
          JSON.stringify(this.product.current_terms.sort(sortNumber)[x])
        )
      })
      this.product.variation = current_variation[0]
      // check if variation exists in order
      let var_exists_in_order = this.order.filter(x => {
        return x.id == this.product.variation.serial
      })
      if (var_exists_in_order.length) {
        this.product.variation.quant = parseInt(var_exists_in_order[0].quantity)
        this.product.variation.quantity = parseInt(var_exists_in_order[0].stock)
      } else {
        this.product.variation.quant = 0
      }

      this.reRenderKey++
    },
    increaseVarQuant(variation) {
      if (this.lockOrder) return
      // check existence
      let var_exists = this.order.filter(x => {
        return x.variation_id == variation.id
      })
      let curr_var = this.product.variation.filter(x => {
        return x.serial == variation.serial
      })[0]
      // set function variables
      let VarQuant = parseInt(variation.quant)
      let VarQuantity = parseInt(variation.quantity)
      let OrderQuantity = var_exists.length
        ? parseInt(var_exists[0].quantity)
        : 0
      // check quantity
      if (VarQuantity > 0 || this.permissions.includes('sell_stock_zero')) {
        // update product.quant / variation.quant / variation.quantity / order.quantity
        if (OrderQuantity > 0) {
          var_exists[0].quantity = parseInt(var_exists[0].quantity) + 1
          var_exists[0].stock = parseInt(var_exists[0].stock) - 1
          var_exists[0].subtotal =
            parseFloat(var_exists[0].quantity) *
            parseInt(var_exists[0].price_after_tax)
          curr_var.quant = parseInt(curr_var.quant) + 1
          curr_var.quantity = parseInt(curr_var.quantity) - 1
          this.product.quantity = parseInt(this.product.quantity) - 1
          this.product.quant = parseInt(this.product.quant) + 1
        } else {
          curr_var.quant = parseInt(curr_var.quant) + 1
          curr_var.quantity = parseInt(curr_var.quantity) - 1
          this.product.quantity = parseInt(this.product.quantity) - 1
          this.product.quant = parseInt(this.product.quant) + 1
          let item = {
            item_id: this.product.id,
            title: this.product.title + ' ' + curr_var.terms.title,
            title_ar: this.product.title_ar + ' ' + curr_var.terms.title_ar,
            price:
              variation.sale_price > 0 ? variation.sale_price : variation.price,
            quantity: variation.quant,
            unit: this.product.unit,
            stock: parseInt(curr_var.quantity),
            serial: curr_var.serial,
            tax_percentage: parseInt(curr_var.tax),
            has_attributes: 'true',
            variation_id: curr_var.id,
          }
          item.price_after_tax = parseFloat(
            parseFloat(item.price) * (parseInt(item.tax_percentage) / 100) +
              parseFloat(item.price)
          )
          item.product_tax =
            (parseFloat(item.price_after_tax) - parseFloat(item.price)) *
            parseInt(item.quantity)
          item.subtotal =
            parseFloat(item.price_after_tax) * parseInt(item.quantity)
          item.total = parseFloat(item.product_tax) + parseFloat(item.subtotal)
          this.order.push(item)
        }
      }
      // quant not less than quantity
      else {
        return
      }

      this.reRenderKey++
    },
    decreaseVarQuant(variation) {
      if (this.lockOrder) return
      let exists = this.order.filter(x => {
        return x.variation_id == variation.id
      })
      let curr_var = this.product.variation.filter(x => {
        return x.serial == variation.serial
      })[0]
      if (exists.length) {
        this.product.quantity++
        this.product.quant--
        exists[0].stock++
        exists[0].quantity--
        exists[0].subtotal =
          parseInt(exists[0].quantity) * parseFloat(exists[0].price_after_tax)
        curr_var.quantity++
        curr_var.quant--

        if (variation.quant < 1) {
          this.order = this.order.filter(x => {
            return x.variation_id != variation.id
          })
        }
      }
      this.reRenderKey++
    },
    addVariationToOrder() {
      // eslint-disable-next-line no-undef
      SharedEvent.fire('update-order', this.order)
      this.$bvModal.hide('variations-modal')
    },
    cancel_action() {
      this.clearForm()
      this.$bvModal.hide('variations-modal')
    },
    clearForm() {
      this.product = {
        variation: {
          image: '',
          terms: {},
        },
        current_terms: [],
      }
      this.index = ''
      this.order = {}
    },
  },
}
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
