<template>
  <b-modal
    id="files-purchase-modal"
    class="files-purchase-modal"
    ref="files-purchase-modal"
    centered
    size="lg"
    scrollable
    :title="trans('add files')"
  >
    <div id="import-products">
      <div class="row">
        <b-form-group class="col-12" :label="trans('file')">
          <b-form-file multiple @change="getFile"></b-form-file>
        </b-form-group>
      </div>
    </div>
    <section slot="modal-footer">
      <b-button
      style="margin:0 10px"
        :disabled="!fileData"
        size="md"
        variant="success"
        type="submit"
        @click="saveFiles"
      >
        {{ trans('save') }}
      </b-button>
      <b-button size="md" variant="danger" @click="closeFilesPurchaseModal">
        {{ trans('close') }}
      </b-button>
    </section>
  </b-modal>
</template>

<script>
export default {
  name: 'AddFilesPurchase',
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-files-purchase-modal',
          callback: this.filesPurchaseModal,
        },
      ],
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

            `,
      fileData: '',
      purchaseId: 0,
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
  mounted() {
    this.initPrintMe()
  },
  methods: {
    getFile(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.fileData = files
    },
    filesPurchaseModal(data) {
      this.$refs['files-purchase-modal'].show()
      this.purchaseId = data.purchaseId
      this.fileData = ''
    },
    closeFilesPurchaseModal() {
      this.$bvModal.hide('files-purchase-modal')
      this.fileData = ''
    },
    saveFiles() {
      this.formData = new FormData()
      for (var i = 0; i < this.fileData.length; i++) {
        this.formData.append('files[]', this.fileData[i])
      }
      //
      // axios.post(
      //         `api/products/${this.purchaseId}`,
      //         this.formData,
      //         {
      //             headers: {
      //                 "Content-Type": "multipart/form-data",
      //                 Authorization:
      //                     "Bearer " + localStorage.getItem("accessToken")
      //             }
      //         },
      //
      //     )
      //     .then(response => {
      //        this.closeFilesPurchaseModal()
      //         SharedEvent.fire("close-files-purchase-modal",response.data);
      //        this.fileData = ''
      //     })
      //     .catch(error => {
      //         console.log(error);
      //     });
    },
  },
}
</script>
