<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <!-- Header -->
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('transfer_request') }} ( {{ id }} #)</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>

      <!-- Body -->

      <div class="d-flex" style="height: 70px">
        <div class="filter col-sm-6" style="margin-bottom: 35px">
          <b-form-input
            style="
              border: 1px solid #59bcd7;
              height: 47px !important;
              width: 69%;
              display: inline-block;
              border-top-left-radius: 10px !important;
              border-bottom-left-radius: 10px !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
              outline: 0;
            "
            readonly
            type="text"
            v-model="inventory_transfer_request.from_inventory.title"
          >
          </b-form-input>
          <span
            style="
              background: #59bcd7;
              height: 47px !important;
              color: #fff;
              border-top-right-radius: 10px !important;
              border-bottom-right-radius: 10px !important;
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: 0 !important;
              padding: 11px 14px;
              float: right;
              width: 120px;
              text-align: center;
            "
          >
            {{ trans('from_inventory') }}
          </span>
        </div>
        <div class="filter col-sm-6" style="margin-bottom: 35px">
          <b-form-input
            style="
              border: 1px solid #59bcd7;
              height: 47px !important;
              width: 69%;
              display: inline-block;
              border-top-left-radius: 10px !important;
              border-bottom-left-radius: 10px !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
              outline: 0;
            "
            readonly
            type="text"
            v-model="inventory_transfer_request.note"
          >
          </b-form-input>
          <span
            style="
              background: #59bcd7;
              height: 47px !important;
              color: #fff;
              border-top-right-radius: 10px !important;
              border-bottom-right-radius: 10px !important;
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: 0 !important;
              padding: 11px 14px;
              float: right;
              width: 120px;
              text-align: center;
            "
          >
            {{ trans('statement') }}
          </span>
        </div>
      </div>

      <div class="d-flex" style="height: 70px">
        <div class="filter col-sm-6" style="margin-bottom: 35px">
          <b-form-input
            style="
              border: 1px solid #59bcd7;
              height: 47px !important;
              width: 69%;
              display: inline-block;
              border-top-left-radius: 10px !important;
              border-bottom-left-radius: 10px !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
              outline: 0;
            "
            readonly
            type="text"
            v-model="inventory_transfer_request.to_inventory.title"
          >
          </b-form-input>
          <span
            style="
              background: #59bcd7;
              height: 47px !important;
              color: #fff;
              border-top-right-radius: 10px !important;
              border-bottom-right-radius: 10px !important;
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: 0 !important;
              padding: 11px 14px;
              float: right;
              width: 120px;
              text-align: center;
            "
          >
            {{ trans('to_inventory') }}
          </span>
        </div>
        <div class="filter col-sm-6" style="margin-bottom: 35px">
          <b-form-input
            style="
              border: 1px solid #59bcd7;
              height: 47px !important;
              width: 69%;
              display: inline-block;
              border-top-left-radius: 10px !important;
              border-bottom-left-radius: 10px !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
              outline: 0;
            "
            readonly
            type="text"
            v-model="inventory_transfer_request.created_at"
          >
          </b-form-input>
          <span
            style="
              background: #59bcd7;
              height: 47px !important;
              color: #fff;
              border-top-right-radius: 10px !important;
              border-bottom-right-radius: 10px !important;
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: 0 !important;
              padding: 11px 14px;
              float: right;
              width: 120px;
              text-align: center;
            "
          >
            {{ trans('request date') }}
          </span>
        </div>
      </div>

      <div class="card-body" style="margin-top: 20px">
        <div class="row align-items-center justify-content-between mb-4">
          <div class="col-sm-12">
            <div class="table-responsive">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <th>{{ trans('id') }}</th>
                    <th style="width: 100px">
                      {{ trans('product name') }}
                    </th>
                    <th>{{ trans('barcode') }}</th>
                    <th>{{ trans('unit') }}</th>
                    <th>{{ trans('notes') }}</th>
                    <th>{{ trans('avaliable quantity') }}</th>
                    <th>{{ trans('require quantity') }}</th>
                    <th>{{ trans('accept') }}</th>
                    <th>{{ trans('reject') }}</th>
                  </b-tr>
                </b-thead>
                <!-- -->
                <b-tbody v-if="items.length > 0">
                  <b-tr v-for="(request, index) in items" :key="request.id">
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ request.product.title }}</b-td>
                    <b-td style="width: 150px !important">{{ request.product.serial }}</b-td>
                    <b-td>{{ request.product.unit.title }}</b-td>

                    <b-td>{{ request.note }}</b-td>
                    <b-td>{{ request.product.quantity }}</b-td>
                    <b-td>
                      <span
                        :class="
                          request.quantity > request.product.quantity
                            ? 'require_quantity'
                            : 'require_quantity_without_border'
                        "
                      >
                        <input
                          type="number"
                          min="0"
                          v-model="request.quantity"
                          style="text-align: center"
                          @change="checkQuantity(request)"
                          :disabled="disabledQuantity"
                        />

                        <button v-if="request.quantity > request.product.quantity">
                          <svg
                            v-b-tooltip.hover
                            :title="trans('The quantity ordered is more')"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                            />
                          </svg>
                        </button>
                      </span>
                    </b-td>
                    <b-td>
                      <button
                        ref="accept_button"
                        style="cursor: pointer; color: #04cd22 !important"
                        class="mx-2 option_btn option_btn1"
                        v-if="
                          (request.status.value === 'accepted') |
                            (request.status.value === 'under_review')
                        "
                        :disabled="request.status.value === 'accepted'"
                        @click.prevent="
                          acceptOrRejectedSingleTransfer(request.quantity, request.id, 'accepted')
                        "
                      >
                        <font-awesome-icon icon="fa-solid fa-check" />
                      </button>
                    </b-td>
                    <b-td>
                      <button
                        ref="reject_button"
                        v-if="
                          (request.status.value === 'rejected') |
                            (request.status.value === 'under_review')
                        "
                        :disabled="request.status.value === 'rejected'"
                        @click.prevent="hiddenFunction(request.quantity, request.id)"
                        v-b-modal.modal-1
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2 option_btn option_btn2"
                      >
                        <font-awesome-icon icon="fa-solid fa-xmark " />
                      </button>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <!-- -->
                <b-tbody class="text-center" v-else>
                  <b-tr>
                    <b-td colspan="5">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
          <!-- Start:: Buttons -->

          <div class="btns_container container">
            <div class="row align-items-center" style="gap: 17px; justify-content: center">
              <button
                class="col-sm-3 text-center final_btn final_btn1"
                @click="acceptOrRejectTransfers('accepted')"
              >
                {{ trans('confirm_request') }}
              </button>
              <button
                v-b-modal.modal-5
                class="col-sm-3 text-center final_btn final_btn2"
                @click="hidden2Function('rejected')"
              >
                {{ trans('reject_request') }}
              </button>
              <button class="col-sm-3 text-center final_btn final_btn3" v-b-modal.modal-xl>
                {{ trans('print') }}
              </button>
            </div>
          </div>

          <!-- End:: Buttons -->

          <!-- Start: inventory Transfer Report -->

          <b-modal
            id="modal-xl"
            size="xl"
            title="Extra Large Modal"
            style="margin: :auto; width:90%"
            ><transfer-invoice
              :id="id"
              :items="items"
              :settings="settings"
              :products="products"
              :language="language"
              :to_inventory="to_inventory"
              :from_inventory="from_inventory"
              :note="note"
              :created_at="created_at"
              :created_by="created_by"
          /></b-modal>

          <!-- End :: Inventory Transfer Report -->

          <div
            v-if="items.length > 0"
            class="col-sm-12 text-center"
            :style="{ direction: language == 'en' ? 'ltr' : 'rtl' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body row justify-content-center">
        <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
      </div>
    </div>
    <!-- For single reject -->
    <div v-if="hidden">
      <b-modal id="modal-1">
        <h5>
          {{ trans('refuse_reason') }}
        </h5>
        <b-form @submit.prevent="handleSubmit(acceptOrRejectedSingleTransfer())">
          <b-textarea
            :placeholder="trans('put reason here') + ' ......'"
            class="refuse_input"
            v-model="comment"
          >
          </b-textarea>
          <button type="submit" class="submit_button" style="color: #fff !important">
            <span>{{ trans('reject') }}</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </span>
          </button>
        </b-form>
      </b-modal>
    </div>
    <!-- For all reject -->
    <div v-if="hidden2">
      <b-modal id="modal-5">
        <h5>
          {{ trans('refuse_reason') }}
        </h5>
        <b-form @submit.prevent="handleSubmit(acceptOrRejectTransfers('rejected'))">
          <b-textarea
            :placeholder="trans('put reason here') + ' ......'"
            class="refuse_input"
            v-model="globalComment"
          >
          </b-textarea>
          <button type="submit" class="submit_button" style="color: #fff !important">
            <span>{{ trans('reject') }}</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </span>
          </button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import TransferInvoice from '@/components/sections/modals/TransferInvoice.vue'

export default {
  components: { TransferInvoice },

  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      disabledQuantity: false,
      hidden: false,
      hidden2: false,

      items: [],
      inventory_transfer_request: {},
      to_inventory: {},
      from_inventory: {},
      created_by: {},
      created_at: '',
      id: '',
      comment: '',
      globalComment: '',
      myQuantity: '',
      myItem: '',

      filter: {
        per_page: 30
      },
      users: [],
      loaded: true,
      btnStatus: localStorage.getItem('btnStatus'),
      itemsLoaded: false,
      products: [],

      showBtn: localStorage.getItem('showBtn')
    }
  },

  watch: {
    status(newStatus) {
      if (newStatus === 'active') {
        this.$refs.accept_button.style.backgroundColor = 'red'
      } else {
        this.$refs.reject_button.style.backgroundColor = 'white'
      }
    }
  },
  mounted() {
    this.$forceUpdate()
    this.getMyTransferRequests()
    this.getProducts()

    this.id = this.$route.params.id
  },
  methods: {
    checkQuantity(request) {
      if (request.quantity > request.product.quantity) {
      }
    },
    getProducts() {
      this.axios({
        method: 'GET',
        url: '/api/products'
      })
        .then((res) => {
          this.products = res.data.body.products.data
        })
        .catch((error) => {})
    },

    getUnitById(serial) {
      const record = this.products.find((el) => el.serial === serial)
    },
    hiddenFunction(quantity, item) {
      this.myQuantity = quantity
      this.myItem = item
      this.hidden = !this.hidden
      console.log(this.hidden)
    },
    hidden2Function(status) {
      this.hidden2 = !this.hidden2
    },
    getMyTransferRequests() {
      this.axios
        .get('/api/inventory-transfer/inventory-transfer-requests/' + this.$route.params.id)
        .then((res) => {
          this.inventory_transfer_request = res.data.body.inventory_transfer_request

          this.items = res.data.body.inventory_transfer_request.items

          this.from_inventory = res.data.body.inventory_transfer_request.from_inventory
          this.created_at = res.data.body.inventory_transfer_request.created_at
          this.created_by = res.data.body.inventory_transfer_request.created_by
          this.note = res.data.body.inventory_transfer_request.note
          this.to_inventory = res.data.body.inventory_transfer_request.to_inventory
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    acceptOrRejectedSingleTransfer(quantity, item, status) {
      let data = {
        quantity: quantity || this.myQuantity,
        comment: this.comment || '',
        status: status || 'rejected'
      }
      let globalItem = item || this.myItem

      this.axios
        .put(
          '/api/inventory-transfer/inventory-transfer-request-action/' +
            this.$route.params.id +
            '/item/' +
            globalItem,
          data
        )
        .then((res) => {
          if (res.data.status) {
            this.disabledQuantity = true
            this.btnStatus = res.data.body.item.status.value
            localStorage.setItem('btnStatus', this.btnStatus)
            this.hidden = false

            this.showToastError(res.data.message, res.data.custom_code)

            return this.getMyTransferRequests()
          }

          localStorage.removeItem('btnStatus')
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    acceptOrRejectTransfers(status) {
      let data = {
        status: status,
        comment: this.globalComment || ''
      }

      this.axios
        .put(
          '/api/inventory-transfer/inventory-transfer-request-action/' + this.$route.params.id,
          data
        )
        .then((res) => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            setTimeout(() => {
              this.$router.push('/inventory-transfer-requests')
            }, 3000)

            this.hidden2 = false
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
          this.hidden2 = false
        })
    }
  }
}
</script>

<style>
.btns_container {
  max-width: 550px;
  margin-bottom: 50px;
}
.final_btn {
  color: #fff;
  font-size: 15px;
  border-radius: 9px;
  font-weight: 500;
  padding: 7px;
  max-width: 15% !important;
}
.final_btn1 {
  background: rgba(79, 167, 190, 1);
}
.final_btn2 {
  background: rgba(204, 49, 49, 1);
}
.final_btn3 {
  color: rgba(79, 167, 190, 1);
  border: 1px solid rgba(79, 167, 190, 1);
}
.require_quantity {
  border: 1px solid rgba(204, 49, 49, 1);
  border-radius: 5px;
  width: 94% !important;
  display: block;
  padding: 9px 5px;
  margin: auto auto;
  height: 100% !important;
}
.require_quantity_without_border {
  border: 1px solid rgba(79, 167, 190, 1) !important;
  border-radius: 5px;
  width: 94% !important;
  display: block;
  padding: 9px 5px;
  margin: auto auto;
  height: 100% !important;
}
.require_quantity button {
  float: left;
}

.require_quantity svg {
  fill: rgba(204, 49, 49, 1);
  width: 19px;
  height: 19px;
}
.option_btn {
  cursor: pointer;
  // border: 1px solid rgba(79, 167, 190, 1);
  background: transparent;
  padding: 4px 11px;
  border-radius: 5px;
  font-size: 21px !important;
  width: 50px !important;
  /* display: block; */
  margin: auto;
}
.option_btn2 {
  border: 1px solid #dc3545;
}
.option_btn1 {
  border: 1px solid #04cd22;
}

.refuse_input {
  border-radius: 7px !important;
  margin-top: 12px;
}
.submit_button {
  background: #dc3545;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 7px;
  border-radius: 5px;
  align-items: center;
  justify-items: center;
  margin: auto;
  margin-top: 12px;
  gap: 24px;
  font-size: 17px;
  text-align: center;
  width: 144px;
}
.submit_button span:last-of-type {
  float: left;
}
.submit_button svg {
  fill: #fff;
}

.modal-footer {
  // display: none !important;
  color: #fff !important;
}
.modal-body h5 {
  text-align: start;
  /* font-weight: 600; */
  margin-top: -14px;
  font-size: 24px;
}
.modal-body b-label {
  text-align: start !important;
  display: block;
}

#modal-5 .modal-footer {
  display: none;
}

.hide {
  display: none;
}
</style>
