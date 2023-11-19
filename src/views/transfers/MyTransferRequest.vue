<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="items.length > 0">
      <!-- Header -->
      <div
        class="card-header header-sm d-flex justify-content-between align-items-center"
      >
        <h4 class="card-title">
          {{ trans('transfer_request') }} ( {{ id }} #)
        </h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <div style="margin: 11px 7px 0">
        <svg
          v-if="language === 'ar'"
          :style="{ fill: color }"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
        <svg
          v-else
          :style="{ fill: color }"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>
        <h4 style="display: inline-block; margin: 0 8px">
          <span style="font-weight: 600" :style="{ color: color }"
            >{{ trans('request') }} {{ trans(globalStatus) }}
            <b v-if="inventory_transfer_request.status.value === 'rejected'"
              >( {{ inventory_transfer_request.status.comment }} )</b
            >
          </span>
        </h4>
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

      <div class="card-body" style="margin-top: 10px">
        <div class="row align-items-center justify-content-between mb-4">
          <div class="col-sm-12">
            <div class="table-responsive">
              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <th>{{ trans('id') }}</th>
                    <th style="width: 100px">
                      {{ trans('product name') }}
                    </th>
                    <th>{{ trans('barcode') }}</th>
                    <th>{{ trans('unit') }}</th>
                    <th>{{ trans('notes') }}</th>
                    <th>{{ trans('require quantity') }}</th>
                    <th>{{ trans('status') }}</th>
                  </b-tr>
                </b-thead>
                <!-- -->
                <b-tbody v-if="items.length > 0">
                  <b-tr v-for="(request, index) in items" :key="request.id">
                    <b-td>{{ index + 1 }}</b-td>
                    <b-td>{{ spliceText(request.product.title, '20') }}</b-td>
                    <b-td style="width: 200px !important">{{
                      request.product.serial
                    }}</b-td>

                    <b-td>{{ request.product.unit.title }}</b-td>
                    <b-td>{{ request.note }}</b-td>
                    <b-td>
                      <span
                        v-if="request.status.value === 'rejected'"
                        style="
                          width: 100%;
                          border: 1px solid rgb(220, 53, 69) !important;
                          display: block;
                          height: 100%;
                          border-radius: 4px;
                          padding: 9px 0;
                        "
                      >
                        {{ request.quantity }}</span
                      >
                      <span v-else>{{ request.quantity }}</span>
                    </b-td>
                    <b-td>
                      <button
                        style="color: #04cd22 !important"
                        class="mx-2 option_btn option_btn1"
                        v-if="request.status.value === 'accepted'"
                      >
                        <font-awesome-icon icon="fa-solid fa-check" />
                      </button>

                      <button
                        v-if="request.status.value === 'rejected'"
                        style="color: #dc3545 !important"
                        class="mx-2 option_btn option_btn2"
                        v-b-modal.modal-1
                        @click="hiddenFunction(request.status.comment)"
                      >
                        <font-awesome-icon icon="fa-solid fa-xmark " />
                      </button>
                      <button
                        v-if="request.status.value === 'under_review'"
                        style="
                          background: rgb(89, 188, 215);
                          color: #fff;
                          padding: 9px;
                          border-radius: 3px;
                          font-weight: 400;
                        "
                        class="mx-2"
                      >
                        <!-- <font-awesome-icon icon="fa-solid fa-xmark " /> -->
                        {{ trans('under_review') }}
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

          <div
            v-if="items.length > 0"
            class="col-sm-12 text-center"
            :style="{ direction: language == 'en' ? 'ltr' : 'rtl' }"
          ></div>
        </div>

        <!-- Start:: Buttons -->

        <div class="btns_container container">
          <div
            class="row align-items-center"
            style="gap: 17px; justify-content: center"
          >
            <!-- add condation if status for transfer rejected -->
            <button
              v-if="inventory_transfer_request.status.value !== 'rejected'"
              class="col-sm-3 text-center final_btn final_btn3"
              style="color: #fff; background: #4fa7be"
              v-b-modal.modal-xl
            >
              {{ trans('print') }}
            </button>
          </div>
        </div>

        <!-- End:: Buttons -->
      </div>

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

      <!-- For single reject -->
      <div v-if="hidden">
        <b-modal id="modal-1">
          <h5>
            {{ trans('refuse_reason') }}
          </h5>
          <b-form @submit.prevent="">
            <b-textarea readonly class="refuse_input" v-model="comment">
            </b-textarea>
          </b-form>
        </b-modal>
      </div>
    </div>
    <div class="card" v-else>
      <b-skeleton
        animation="wave"
        width="100%"
        height="10%"
        style="background: #f6f6f6; margin-bottom: 50px; border-raduis: 35px"
      ></b-skeleton>

      <div class="d-flex" style="gap: 5px">
        <b-skeleton
          animation="wave"
          width="70%"
          height="70px"
          style="
              background: #f6f6f6;
              margin-bottom: 50px;
              border-raduis: 35px;
              col-6
            "
        ></b-skeleton>
        <b-skeleton
          animation="wave"
          width="70%"
          height="70px"
          style="
              background: #f6f6f6;
              margin-bottom: 50px;
              border-raduis: 35px;
              col-6
            "
        ></b-skeleton>
      </div>

      <div class="d-flex" style="gap: 5px">
        <b-skeleton
          animation="wave"
          width="70%"
          height="70px"
          style="
              background: #f6f6f6;
              margin-bottom: 50px;
              border-raduis: 35px;
              col-6
            "
        ></b-skeleton>
        <b-skeleton
          animation="wave"
          width="70%"
          height="70px"
          style="
              background: #f6f6f6;
              margin-bottom: 50px;
              border-raduis: 35px;
              col-6
            "
        ></b-skeleton>
      </div>

      <b-skeleton
        animation="wave"
        width="100%"
        height="90%"
        style="background: #f6f6f6; border-raduis: 15px"
      ></b-skeleton>
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
      hidden: false,
      hidden2: false,

      items: [],
      comment: '',

      to_inventory: {},
      from_inventory: {},
      created_at: '',
      created_by: {},
      note: '',
      globalComment: '',
      myQuantity: '',
      myItem: '',

      filter: {
        per_page: 30,
      },
      users: [],
      loaded: true,
      btnStatus: localStorage.getItem('btnStatus'),
      itemsLoaded: false,
      globalStatus: '',
      color: '',
      products: [],
      inventory_transfer_request: {},
      id: '',
      hidden: false,
    }
  },
  mounted() {
    this.getMyTransferRequests()
    this.getProducts()
    this.id = this.$route.params.id
    this.comment = this.trans('no reason for refuse')
  },

  methods: {
    spliceText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength)
      } else {
        return text
      }
    },
    getProducts() {
      axios({
        method: 'GET',
        url: '/api/products',
      })
        .then(res => {
          this.products = res.data.body.products.data
        })
        .catch(error => {})
    },

    getTitleById(serial) {
      const record = this.products.find(el => el.serial === serial)

      // return record.unit.title
    },

    hiddenFunction(v) {
      this.comment = v
      this.hidden = !this.hidden
    },
    getMyTransferRequests() {
      axios
        .get(
          '/api/inventory-transfer/inventory-transfer-requests/' +
            this.$route.params.id
        )
        .then(res => {
          this.inventory_transfer_request =
            res.data.body.inventory_transfer_request
          this.items = res.data.body.inventory_transfer_request.items
          this.globalStatus =
            res.data.body.inventory_transfer_request.status.value
          this.color =
            res.data.body.inventory_transfer_request.status.color.hexadecimal
          console.log(this.items)
          this.from_inventory =
            res.data.body.inventory_transfer_request.from_inventory
          this.created_at = res.data.body.inventory_transfer_request.created_at
          this.created_by = res.data.body.inventory_transfer_request.created_by
          this.note = res.data.body.inventory_transfer_request.note
          this.to_inventory =
            res.data.body.inventory_transfer_request.to_inventory
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
  },
}
</script>

<style lang="scss">
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
  border: none;
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

#modal-1 h5 {
}
</style>
