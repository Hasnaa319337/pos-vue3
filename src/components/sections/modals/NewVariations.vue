<template>
  <section>
    <b-modal
      no-close-on-backdrop
      style="z-index: 1050"
      id="newvariations-modal"
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
          no-gutters
          class="pointer align-items-center justify-content-md-start justify-content-center"
          @click="addVariationToOrder(variant)"
          v-for="(variant, index) in product.variation"
          :key="index"
        >
          <b-col class="img col-md-auto">
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
          </b-col>
          <b-col md="8">
            <b-card-body>
              <b-card-text>
                <h3>
                  {{ language == 'en' ? product.title : product.title_ar }}
                  <span>{{ variant.title_trans }}</span>
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
              </b-card-text>
            </b-card-body>
          </b-col>
          <hr class="col-12" />
        </b-row>
      </b-card>
      <section slot="modal-footer"></section>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewVariations',
  props: ['settings', 'user'],
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-new-variation-modal',
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
    addVariationToOrder(variant) {
      variant.index = this.index
      // eslint-disable-next-line no-undef
      SharedEvent.fire('update-order', variant)
      this.$bvModal.hide('newvariations-modal')
    },

    loadVariations(data) {
      this.product = data.product
      this.index = data.index
      this.strings = data.strings
      this.language = data.language

      this.$refs['variations-modal'].show()
    },
  },
}
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
