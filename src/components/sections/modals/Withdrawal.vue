<template>
  <section>
    <b-modal
      id="withdrawal-modal"
      class="withdrawal-modal"
      ref="withdrawal-modal"
      centered
      scrollable
      :title="`${strings['add withdrawal']}`"
    >
      <div class="col-sm-12 text-center" v-if="message.length">
        <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
      </div>

      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <b-form @submit.prevent="handleSubmit(store)">
          <ValidationProvider
            rules="required"
            v-slot="{ valid, errors }"
            name="withdrawal_reason"
          >
            <b-form-group :label="strings['withdrawal reason']">
              <b-form-input
                type="text"
                v-model="withdrawal.title"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            rules="required"
            v-slot="{ valid, errors }"
            name="amount"
          >
            <b-form-group :label="strings['amount']">
              <b-form-input
                type="number"
                v-model="withdrawal.amount"
                @keypress="isNumber($event)"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-form>
      </ValidationObserver>

      <section slot="modal-footer">
        <b-button
          size="md"
          variant="success"
          type="submit"
          @click="handleSubmit()"
        >
          {{ strings['add'] }}
        </b-button>
        <b-button size="md" variant="danger" @click="cancel_action">
          {{ strings['cancel'] }}
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
      customEvents: [
        {
          eventName: 'open-withdrawal-modal',
          callback: this.openWithdrawalModal,
        },
      ],
      message: '',
      alertType: '',
      withdrawal: {},
      strings: [],
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
    openWithdrawalModal(data) {
      this.strings = data.strings
      this.$refs['withdrawal-modal'].show()
    },
    handleSubmit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          // Successfully validated & update the data.
          this.store()
        }
      })
    },
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      let url = '/api/cashier/submit-withdrawal'
      axios.post(url, this.withdrawal).then(res => {
        this.message = res.data.message
        if (res.data.success) {
          this.alertType = 'success'
          this.withdrawal = {}
          this.$nextTick(() => {
            this.$refs.form.reset()
          })
          var vm = this
          setTimeout(function () {
            vm.showWithdrawalForm = 0
            this.message = ''
            this.alertType = 'info'
          }, 2000)
        } else {
          this.alertType = 'danger'
        }
      })
    },
    cancel_action() {
      this.clearForm()
      this.$bvModal.hide('withdrawal-modal')
    },
    clearForm() {
      this.withdrawal = {}
      this.message = ''
      this.alertType = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
  },
}
</script>

<style lang="scss"></style>
