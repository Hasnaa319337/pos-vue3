<template>
  <b-modal
    id="barcode-modal"
    class="barcode-modal"
    ref="barcode-modal"
    centered
    size="lg"
    scrollable
    :title="product.title"
  >
    <div id="barcode">
      <div class="row">
        <!-- <h3 class="col-12" v-if="language == 'en'">
          {{ product.title }}
        </h3>
        <h3 class="col-12" v-else>
          {{ product.title }}
        </h3> -->
        <vue-barcode
          :value="product.serial"
          class="col-12"
          style="display: flex; justify-content: center; align-items: center"
        >
          Show this if the rendering fails.
        </vue-barcode>
      </div>
    </div>
    <section>
      <b-button
        size="md"
        variant="success"
        type="submit"
        @click="printBarcode"
        style="margin: 0 10px"
      >
        {{ trans('print') }}
      </b-button>
      <b-button size="md" variant="danger" @click="closeBarcodeModal">
        {{ trans('close') }}
      </b-button>
    </section>
  </b-modal>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  components: { VueBarcode },
  data() {
    return {
      customEvents: [{ eventName: 'open-barcode-modal', callback: this.openBarcodeModal }],
      product: '',
      user: '',
      language: '',
      strings: '',
      cssText: `
                    .row {
                        display: flex;
                        flex-wrap: wrap;
                        margin-right: -15px;
                        margin-left: -15px;
                        width: 100%;
                    }
                    .col-12 {
                        flex: 0 0 100%;
                        max-width: 100%;
                        text-align: center;
                    }

            `
    }
  },
  created() {
    ////////////////////////////////////////////////////
    //**          Custom Event Listener           ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      // this.SharedEvent.listen(customEvent.eventName, customEvent.callback)
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
  mounted() {
    this.initPrintMe()
  },
  methods: {
    openBarcodeModal(data) {
      this.product = this.cloneItem(data.product)
      this.user = data.settings.user
      this.language = data.settings.user.language
      this.strings = data.settings.strings
      this.$refs['barcode-modal'].show()
    },
    closeBarcodeModal() {
      // eslint-disable-next-line no-undef
      this.SharedEvent.fire('close-barcode-modal')
      this.$bvModal.hide('barcode-modal')
    },
    printBarcode() {
      //invoke Print me From Mixin //
      this.printMe('#barcode', this.cssText)
    }
  }
}
</script>
<style scoped>
#barcode {
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>
