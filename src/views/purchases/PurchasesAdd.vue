<template>
  <div class="saleAdd">
    <b-modal id="modal-xl2" size="xl" style="margin: :auto; width:90%">
      <b-row>
        <b-col
          v-for="(product, index) in products"
          :key="product.id"
          cols="12"
          md="3"
          style="margin: 15px 0 10px"
        >
          <v-card>
            <button style="padding: 15px 10px">
              <b-row>
                <b-col
                  class="col"
                  cols="12"
                  md="12"
                  style="text-align: start; padding: 10px 27px; font-size: 16px"
                  ><span style="display: inline-block">{{ trans('product name') }}</span>

                  <span style="display: inline-block"> : {{ product.title }}</span></b-col
                >
                <b-col
                  class="col"
                  cols="12"
                  md="12"
                  style="text-align: start; padding: 10px 27px; font-size: 16px"
                  ><span style="display: inline-block">{{ trans('barcode') }}</span>

                  <span style="display: inline-block"> : {{ product.barcode }}</span></b-col
                >

                <b-col
                  class="col"
                  cols="12"
                  md="12"
                  style="text-align: start; padding: 10px 27px; font-size: 16px"
                  ><span style="display: inline-block">{{ trans('quantity') }}</span>

                  <span style="display: inline-block"> : {{ product.quantity }}</span></b-col
                >
                <b-col
                  class="col"
                  cols="12"
                  md="12"
                  style="text-align: start; padding: 10px 27px; font-size: 16px"
                  ><span style="display: inline-block">{{ trans('price') }}</span>

                  <span style="display: inline-block"> : {{ product.price }}</span></b-col
                >
                <b-col
                  class="col"
                  cols="12"
                  md="12"
                  style="text-align: start; padding: 10px 27px; font-size: 16px"
                  ><span style="display: inline-block">{{ trans('cost') }}</span>

                  <span style="display: inline-block"> : {{ product.cost }}</span></b-col
                >
              </b-row>
            </button>
          </v-card>
        </b-col>
      </b-row>
    </b-modal>

    <template v-if="noAccountLinks">
      <div>
        <div
          style="
            background: #fcfcfc 0% 0% no-repeat padding-box;
            border-radius: 11px;
            opacity: 1;
            padding: 18px;
          "
        >
          <h1 class="first_header">{{ trans('link account') }}</h1>
        </div>

        <div class="text-center">
          <img
            width="500"
            height="500"
            class="mt-4"
            src="@/assets/images/Invoice_refunded.gif"
            alt="Invoice_refunded"
          />
        </div>

        <div
          class="mt-4 text-center"
          style="
            background: #f9f9f9 0% 0% no-repeat padding-box;
            border-radius: 16px;
            width: 877px;
            padding: 34px;
            margin: auto;
            display: flex;
            justify-content: center;
            gap: 10px;
          "
        >
          <font-awesome-icon
            style="color: #e21818; font-size: 36px"
            icon="fa-sharp fa-solid fa-circle-exclamation"
          />
          <h1 class="last_header">{{ noAccountLinksMessage }}</h1>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="col-sm-12 grid-margin stretch-card">
        <div class="card pt-3" v-if="loaded">
          <div class="card-header header-sm d-flex justify-content-between align-items-center">
            <h4 class="card-title">
              {{ trans('add_purchases_invoice') }}
            </h4>
            <div class="dropdown">
              <!-- <a
                v-b-tooltip.hover
                class="mx-2 btn btn-primary text-white"
                @click="addProductModal"
              >
                {{ trans('add new product') }}
              </a> -->
              <router-link
                v-b-tooltip.hover
                class="mx-2 btn btn-primary text-white"
                to="/products/add"
              >
                {{ trans('add new product') }}</router-link
              >
              <GoBackButton />
            </div>
          </div>
          <div class="card-body">
            <div class="align-items-center justify-content-between mb-4">
              <div class="col-sm-12">
                <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                  <b-form @submit.prevent="handleSubmit(store)">
                    <b-form-row>
                      <b-col>
                        <b-form-row>
                          <b-col cols="12" md="4">
                            <b-form-group :label="trans('invoice type')">
                              <div
                                style="
                                  font-weight: 500;
                                  padding: 7px 5px;
                                  background: #fcfcfc;
                                  border-radius: 3px;
                                  display: flex;
                                  justify-content: space-around;
                                "
                              >
                                <span>
                                  <input
                                    v-model="invoice.payment_type"
                                    type="radio"
                                    name="invoice_type"
                                    value="full"
                                  />

                                  {{ trans('full') }}
                                </span>
                                <span>
                                  <input
                                    v-model="invoice.payment_type"
                                    type="radio"
                                    name="invoice_type"
                                    value="installment"
                                  />{{ trans('installment') }}
                                </span>
                              </div>
                            </b-form-group>
                          </b-col>

                          <b-col v-if="invoice.payment_type != 'installment'" cols="12" md="4">
                            <b-form-group :label="trans('payment method')">
                              <b-form-select
                                @change="AllAccounts(invoice.payment_method)"
                                v-model="invoice.payment_method"
                              >
                                <b-form-select-option value="bank"
                                  >{{ trans('credit card') }}
                                </b-form-select-option>
                                <b-form-select-option value="cash"
                                  >{{ trans('cash') }}
                                </b-form-select-option>
                              </b-form-select>
                            </b-form-group>
                          </b-col>

                          <div v-if="invoice.payment_type != 'installment'" class="col-4">
                            <b-form-group :label="trans('account_number')">
                              <v-select
                                :options="accountLinks"
                                label="full_title_from_parent"
                                v-model="invoice.treasury_account"
                                :reduce="(option) => option.account"
                                :dir="language === 'ar' ? 'rtl' : 'ltr'"
                              />
                            </b-form-group>
                          </div>

                          <b-col cols="12" md="4">
                            <b-form-group :label="trans('select_provider')">
                              <v-select
                                :options="providers"
                                label="name"
                                v-model="invoice.provider_id"
                                :reduce="(option) => option.id"
                                :dir="language === 'ar' ? 'rtl' : 'ltr'"
                              />
                            </b-form-group>
                          </b-col>
                          <b-col cols="12" md="4">
                            <b-form-group :label="trans('provider invoice number')">
                              <b-form-input
                                style="min-width: 100px"
                                type="text"
                                v-model="invoice.provider_inv_number"
                              >
                              </b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col cols="12" md="4">
                            <b-form-group :label="trans('invoice date')">
                              <b-form-input
                                style="min-width: 100px"
                                type="datetime-local"
                                v-model="invoice.invoice_date"
                              >
                              </b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col cols="12" md="4">
                            <ValidationProvider
                              name="inventory"
                              rules="required|integer"
                              v-slot="{ errors }"
                            >
                              <b-form-group
                                :label="trans('inventory')"
                                :invalid-feedback="errors[0]"
                              >
                                <!-- no select of inventories -->
                                <v-select
                                  v-if="username === 'admin'"
                                  :options="inventories"
                                  label="title"
                                  v-model="invoice.inventory_id"
                                  :reduce="(option) => option.id"
                                  :dir="language === 'ar' ? 'rtl' : 'ltr'"
                                />
                                <b-form-input
                                  v-else
                                  type="text"
                                  v-model="invoice.inventory_id"
                                  disabled
                                >
                                </b-form-input>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <!-- v-if="invoice.invoice_type == 'installment'"-->

                          <b-col v-if="invoice.payment_type == 'installment'" cols="12" md="4">
                            <!-- <div class="all d-flex">
                              <b-form-group
                                class="w-50"
                                :label="trans('paid_amount')"
                              >
                                <b-form-input
                                  @input="setRemainingAndPaid"
                                  :placeholder="trans('paid_amount')"
                                  type="number"
                                  v-model="invoice.paid_amount"
                                >
                                </b-form-input>
                              </b-form-group>
                              <b-form-group
                                class="w-50"
                                :label="trans('remain_amount')"
                              >
                                <b-form-input
                                  readonly
                                  disabled
                                  type="number"
                                  :max="total"
                                  :placeholder="trans('remain_amount')"
                                  v-model="invoice.remaining_amount"
                                >
                                </b-form-input>
                              </b-form-group>
                            </div> -->
                          </b-col>

                          <!-- <div class="col-4">
                            <legend
                              tabindex="-1"
                              class="bv-no-focus-ring col-form-label pt-0"
                              id="__BVID__59__BV_label_"
                            >
                              {{ trans('add_discount') }}
                            </legend>
                            <b-dropdown
                              id="dropdown-1"
                              class="custom-select"
                              size="lg"
                            >
                              <b-dropdown-item
                                v-for="(disc, index) in discounts"
                                :key="index"
                                @click="addDiscount(disc)"
                              >
                                <span v-if="language == 'ar'">
                                  {{ disc.translation.title.ar }}
                                </span>
                                <span v-else>
                                  {{ disc.translation.title.en }}
                                </span>

                                <em v-if="disc.type == 'fixed'"
                                  >({{ disc.value }} {{ getSetting('currency') }})
                                </em>
                                <em v-else>( {{ disc.value }}% )</em>
                              </b-dropdown-item>
                            </b-dropdown>
                          </div> -->
                        </b-form-row>
                        <b-row
                          style="
                            justify-content: space-between;
                            align-items: center;
                            margin: 0 !important;
                          "
                        >
                          <h2 class="col-sm-6">
                            <b-button @click="addItem" class="float-end" variant="primary">
                              <i class="bi bi-plus-lg"></i>
                            </b-button>
                          </h2>
                          <!-- <b-button
                            v-b-modal.modal-xl2
                            class="float-end"
                            variant="primary"
                          >
                            {{ trans('add_product') }}
                          </b-button> -->
                        </b-row>
                        <div class="col-sm-12 p-0" style="min-height: 370px">
                          <b-table-simple striped bordered style="min-height: 50px">
                            <GlobalTabel :columns="columns" />
                            <b-tbody v-for="(item, index) in invoice.items" :key="index">
                              <b-tr>
                                <b-td>
                                  {{ index + 1 }}
                                </b-td>

                                <b-td>
                                  <ValidationProvider
                                    name="product"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <b-form-group>
                                      <v-select
                                        v-model="invoice.items[index].serial"
                                        @input="setProduct(index)"
                                        dir="rtl"
                                        :value="index"
                                        :label="'serial'"
                                        :options="products"
                                        :reduce="(product) => product.serial"
                                      ></v-select>

                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  <!-- <span v-if="item.is_variant">{{item.title}}</span> -->
                                </b-td>
                                <b-td>
                                  <ValidationProvider
                                    name="product"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <b-form-group>
                                      <v-select
                                        style="max-width: 200px"
                                        v-model="invoice.items[index].item"
                                        @input="setCost(index) & setProduct(index)"
                                        dir="rtl"
                                        :value="index"
                                        label="title"
                                        :options="products"
                                      ></v-select>

                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  <span v-if="item.is_variant">{{ item.title }}</span>
                                </b-td>
                                <b-td style="max-width: 100px">
                                  <ValidationProvider
                                    rules="required|min_value:1"
                                    v-slot="{ valid, errors }"
                                    name="quantity"
                                  >
                                    <b-form-group>
                                      <b-form-input
                                        disabled
                                        style="max-width: 100px; background: #ddd"
                                        type="number"
                                        v-model="invoice.items[index].item.quantity"
                                        :state="errors[0] ? false : valid ? true : null"
                                      ></b-form-input>
                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                </b-td>
                                <b-td>
                                  <ValidationProvider
                                    rules="required|min_value:1"
                                    v-slot="{ valid, errors }"
                                    name="quantity"
                                  >
                                    <b-form-group>
                                      <b-form-input
                                        style="max-width: 100px"
                                        type="number"
                                        v-model="invoice.items[index].quantity"
                                        :state="errors[0] ? false : valid ? true : null"
                                        @change="updateSubtotal(index)"
                                        @keypress="isNumber($event)"
                                        @keyup="getTotal(index)"
                                      ></b-form-input>
                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                </b-td>

                                <b-td>
                                  <ValidationProvider
                                    rules="required|positive|decimal"
                                    v-slot="{ valid, errors }"
                                    name="price"
                                  >
                                    <b-form-group>
                                      <b-form-input
                                        style="max-width: 120px"
                                        type="text"
                                        v-model="invoice.items[index].cost"
                                        :state="errors[0] ? false : valid ? true : null"
                                        @change="updateSubtotal(index)"
                                        @keypress="isNumber($event)"
                                        @keyup="getTotal(index)"
                                      >
                                      </b-form-input>
                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                </b-td>

                                <b-td>
                                  <b-form-group>
                                    <b-form-input
                                      placeholder="نسبة الخصم"
                                      style="max-width: 150px"
                                      :disabled="extraDiscounts.length > 0"
                                      v-model="invoice.items[index].item.discount_percentage"
                                      @keyup="
                                        updateDiscountValues(index, 'percentage')
                                        getTotal(index)
                                      "
                                    >
                                    </b-form-input>
                                  </b-form-group>
                                </b-td>

                                <b-td style="max-width: 150px">
                                  <b-form-group>
                                    <b-form-input
                                      placeholder="قيمة الخصم"
                                      style="max-width: 150px"
                                      :disabled="extraDiscounts.length > 0"
                                      v-model="invoice.items[index].item.discount_fixed"
                                      @keyup="
                                        updateDiscountValues(index, 'fixed')
                                        getTotal(index)
                                      "
                                    >
                                    </b-form-input>
                                  </b-form-group>
                                </b-td>
                                <!-- 
                                <b-td>
                                  <ValidationProvider
                                    rules="positive|decimal"
                                    v-slot="{ valid, errors }"
                                    name="product_tax"
                                  >
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        placeholder="السعر بعد الخصم"
                                        style="min-width: 100px"
                                        type="text"
                                        v-model="
                                          invoice.items[index].item
                                            .price_after_discount
                                        "
                                        :state="
                                          errors[0]
                                            ? false
                                            : valid
                                            ? true
                                            : null
                                        "
                                      >
                                      </b-form-input>
                                      <b-form-invalid-feedback
                                        id="inputLiveFeedback"
                                      >
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                </b-td> -->

                                <b-td style="max-width: 120px">
                                  <ValidationProvider
                                    rules="required|positive|decimal"
                                    v-slot="{ valid, errors }"
                                    name="cost"
                                  >
                                    <b-form-group>
                                      <b-form-input
                                        style="max-width: 120px"
                                        type="number"
                                        v-model="invoice.items[index].item.tax"
                                        readonly
                                        :state="errors[0] ? false : valid ? true : null"
                                        @keyup="getTotal(index)"
                                      >
                                      </b-form-input>
                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  <!-- <span v-if="invoice.items[index].price_after_tax >= invoice.items[index].item.discount_percentage">price greater than cost</span> -->
                                </b-td>
                                <!-- 
                                <b-td>
                                  <ValidationProvider
                                    rules="required|positive|decimal"
                                    v-slot="{ valid, errors }"
                                    name="cost"
                                  >
                                    <b-form-group>
                                      <b-form-input
                                        style="min-width: 100px"
                                        type="text"
                                        readonly
                                        v-model="
                                          invoice.items[index].item
                                            .tax_after_price
                                        "
                                        :state="
                                          errors[0]
                                            ? false
                                            : valid
                                            ? true
                                            : null
                                        "
                                      >
                                        <span v-if="invoice.items[index].cost >= invoice.items[index].item.cost">pricegreater than cost</span>
                                      </b-form-input>
                                      <b-form-invalid-feedback
                                        id="inputLiveFeedback"
                                      >
                                        {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                </b-td> -->

                                <b-td>
                                  <span
                                    v-if="
                                      invoice.items[index].cost &&
                                      invoice.items[index].item &&
                                      invoice.items[index].quantity
                                    "
                                  >
                                    <b> {{ invoice.items[index].total }}</b>
                                  </span>
                                </b-td>

                                <b-td>
                                  <b-button variant="danger" @click="removeItem(index)">
                                    <font-awesome-icon icon="fa-solid fa-minus " />
                                  </b-button>
                                </b-td>
                              </b-tr>
                            </b-tbody>
                            <b-tbody>
                              <!-- اجمالي القيمه الخاضع للضريبه -->

                              <!-- <b-tr
                                v-for="(tax, index) in allItemData"
                                :key="'one_' + index"
                              >


                                <template>
                                  <b-td
                                    v-if="parseInt(tax.tax) > 0"
                                    colspan="3"
                                    class="text-center"
                                  >
                                    {{
                                      user.language == 'en'
                                        ? 'Total Value with added tax'
                                        : 'اجمالي القيمة الخاضع للضريبة'
                                    }}
                                    - ({{ tax.tax }}%)
                                  </b-td>

                                  <b-td v-else colspan="3" class="text-center">
                                    {{
                                      user.language == 'en'
                                        ? 'Total Value with no added tax'
                                        : 'اجمالي القيمة الغير الخاضع للضريبة'
                                    }}
                                  </b-td>
                                  <b-td>
                                    <span>
                                      {{
                                        tax.totalValuesAfterDiscount
                                          .toFixed(3)
                                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                      }}
                                      {{
                                        user.language == 'en'
                                          ? settings.currency_en
                                          : settings.currency_ar
                                      }}</span
                                    >
                                  </b-td>
                                </template>


                              </b-tr> -->

                              <!-- الاجمالي -->
                              <b-tr>
                                <b-td colspan="3" class="text-center font-weight-bold">
                                  {{ trans('total value') }}
                                </b-td>
                                <b-td class="font-weight-bold" colspan="9">
                                  <b>{{
                                    totalCostBeforeDiscount
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                  }}</b>
                                  <span> {{ getSetting('currency') }} </span>
                                </b-td>
                              </b-tr>
                              <b-tr>
                                <b-td colspan="3" class="text-center font-weight-bold text-danger">
                                  {{ trans('total discount') }}
                                </b-td>
                                <b-td colspan="9" class="font-weight-bold text-danger">
                                  <b>{{
                                    totalDiscounts.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                  }}</b>
                                  <span> {{ getSetting('currency') }}</span>
                                </b-td>
                              </b-tr>
                              <b-tr>
                                <b-td colspan="3" class="text-center font-weight-bold">
                                  {{ trans('total value after discount') }}
                                </b-td>
                                <b-td class="font-weight-bold" colspan="9">
                                  <b>{{
                                    costNew.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                  }}</b>
                                  <span> {{ getSetting('currency') }}</span>
                                </b-td>
                              </b-tr>

                              <b-tr
                                v-for="(disc, index) in extraDiscounts"
                                :key="index"
                                class="disc-row"
                              >
                                <b-td colspan="3">
                                  <span style="font-size: 19px">
                                    {{ disc.title }}
                                    {{ disc.value }}
                                    <span v-if="disc.type === 'fixed'">{{
                                      getSetting('currency')
                                    }}</span>
                                  </span>
                                  <button
                                    style="margin: 0 7px; height: 30px"
                                    class="btn btn-danger btn-sm btn-rounded"
                                    @click="removeDiscount(disc.id)"
                                  >
                                    <font-awesome-icon icon="fa-solid fa-xmark" />
                                  </button>
                                </b-td>
                                <td class="text-center" colspan="9">
                                  <span
                                    v-text="language == 'en' ? disc.title.en : disc.title.ar"
                                  ></span>
                                  <span v-if="disc.type == 'percentage'">{{
                                    disc.value + '%'
                                  }}</span>
                                  <span v-else>{{ disc.value }} {{ getSetting('currency') }}</span>
                                </td>
                              </b-tr>
                            </b-tbody>
                            <b-tbody>
                              <!-- <b-tr
                                v-for="(tax, index) in allItemData"
                                :key="'two_' + index"
                              >
                                <template v-if="parseInt(tax.tax) > 0">
                                  <b-td colspan="3" class="text-center">
                                    {{
                                      user.language == 'en'
                                        ? 'Added Tax'
                                        : 'ضريبة القيمة المضافة'
                                    }}
                                    - ({{ tax.tax }}%)
                                  </b-td>
                                  <b-td>
                                    <span
                                      >{{
                                        tax.taxValue
                                          .toFixed(3)
                                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                      }}
                                      {{
                                        user.language == 'en'
                                          ? settings.currency_en
                                          : settings.currency_ar
                                      }}
                                    </span>
                                  </b-td>
                                </template>
                              </b-tr> -->
                              <b-tr>
                                <b-td colspan="3" class="text-center font-weight-bold">
                                  {{ trans('adding_added_tax') }}
                                </b-td>
                                <b-td class="font-weight-bold" colspan="9">
                                  <b>{{
                                    totalTax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                  }}</b
                                  ><span> {{ getSetting('currency') }}</span>
                                </b-td>
                              </b-tr>
                              <b-tr>
                                <b-td class="text-center font-weight-bold" colspan="3"
                                  >{{ trans('invoice total') }}
                                </b-td>
                                <b-td class="font-weight-bold" colspan="9">
                                  <b>{{ total.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</b
                                  ><span> {{ getSetting('currency') }}</span>
                                </b-td>
                              </b-tr>
                            </b-tbody>
                          </b-table-simple>
                        </div>
                      </b-col>
                    </b-form-row>
                    <b-form-row class="justify-content-center">
                      <b-button variant="success" type="submit"
                        >{{ trans('submit') }}
                        <font-awesome-icon icon="fa-solid fa-check " />
                      </b-button>
                    </b-form-row>
                  </b-form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-else>
          <div class="card-body text-center">
            <skeleton-loader />
          </div>
        </div>
        <PurchaseReceipt
          :user="user"
          :strings="strings"
          :sale="invoice"
          :settings="settings"
        ></PurchaseReceipt>
        <NewVariations :settings="settings" :user="user"></NewVariations>
        <add-product-modal></add-product-modal>
      </div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import PurchaseReceipt from '@/components/sections/modals/PurchaseReceipt.vue'
import NewVariations from '@/components/sections/modals/NewVariations.vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import GoogleMap from '@/components/global/GoogleMap.vue'
import AddProductModal from '@/components/sections/modals/addProduct.vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
// register globally
Vue.component('multiselect', Multiselect)
Vue.component('downloadExcel', JsonExcel)
Vue.use(VuejsDialog)

import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
export default {
  name: 'AppPurchasesAdd',
  components: {
    GoogleMap,
    PurchaseReceipt,
    NewVariations,
    AddProductModal,
    SkeletonLoader
  },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions', 'language'],
  data() {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd

    return {
      columns: [
        'id',
        'barcode',
        'item',
        'avaliable quantity',
        'quantity',
        'product cost',
        'discount percentage',
        'discount fixed',
        'added tax',
        'total value',
        'actions'
      ],
      userInventoryTitle: '',
      username: '',
      user_treasury_account: '',
      accountLinks: [],
      totalTax: 0,
      summ: 0,
      totalDiscounts: 0,
      total: 0,
      test: '',
      message: '',
      alertType: 'danger',
      sales: [],
      strings: [],
      products: [],
      filter: {
        per_page: 30
      },
      paid_amount: 0,
      discounts: [],
      discount: 0,
      discount_percentage: 0,
      discount_fixed: 0,
      invoice: {
        inventory_id: '',
        items: [],
        paid: 0,
        qr: '',
        tax: 0,
        provider: {},
        provider_inv_number: '',
        invoice_date: today,
        payment_type: 'full',
        paid_amount: 0,
        remaining_amount: '',
        provider_id: '',
        totalValueBeforeDiscount: 0,
        payment_method: 'cash'
      },
      loaded: false,
      usingFilters: 0,
      itemsLoaded: false,
      export_fields: {
        'invoice id': 'id',
        'customer name': 'c_name',
        'customer phone': 'c_phone',
        at: 'created_at',
        inventory: 'inventory_title',
        user: 'user_name',
        total: 'total'
      },
      showReceipt: false,
      customEvents: [
        {
          eventName: 'close-purchase-receipt-modal',
          callback: this.closeReceipt
        },
        {
          eventName: 'cashier-set-customer',
          callback: this.setCustomer
        },
        {
          eventName: 'open-customers-modal',
          callback: this.setCustomer
        },
        { eventName: 'update-order', callback: this.updateOrder }
      ],
      extraDiscounts: [],
      discountsId: [],
      customer: {
        name: '',
        latitude: '',
        longitude: ''
      },

      latitude: '',
      longitude: '',
      searchObject: {},
      variant: '',

      select: '',

      itemss: ['Foo', 'Bar', 'Fizz', 'Buzz'],

      Allcost: '',
      cost: 0,
      costNew: 0,
      noAccountLinks: false,
      noAccountLinksMessage: '',
      totalCostBeforeDiscount: 0,
      allItemData: [],
      inventories: [],
      providers: [],
      payment_types: []
    }
  },
  mounted() {
    this.getProviders()
    this.AllAccounts('cash')
    window.scrollTo(0, 0)
    this.refresh()
    this.getProducts()
    this.latitude = parseFloat(localStorage.getItem('latitude'))
    this.longitude = parseFloat(localStorage.getItem('longitude'))
    SharedEvent.listen('close-add-products-modal', (data) => {
      this.refresh()
    })
    this.getEnums()
    this.getProfile()
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
  computed: {},
  watch: {
    'invoice.items'() {
      if (this.invoice.items.length <= 0) {
        this.invoice.paid_amount = 0
        this.invoice.remaining_amount = 0
      }
    },
    total() {
      this.setRemainingAndPaid()
    },
    'invoice.payment_type'() {
      this.setRemainingAndPaid()
    }
  },
  methods: {
    getProfile() {
      axios({
        method: 'GET',
        url: '/api/profile'
      })
        .then((res) => {
          this.userInventoryTitle = res.data.body.user.inventory.title
          this.username = res.data.body.user.username
          this.user_treasury_account = res.data.body.user.inventory.treasury.account
        })
        .catch((error) => {})
    },
    addProductModal() {
      let settings = {
        strings: this.strings,
        inventories: this.inventories,
        user: this.user
      }
      SharedEvent.fire('open-product-modal', {
        langs: this.langs,
        settings: settings
      })
    },
    setRemainingAndPaid() {
      if (this.invoice.payment_type == 'full') {
        this.invoice.paid_amount = this.total
        this.invoice.remaining_amount = 0
      } else {
        this.invoice.remaining_amount = this.total - this.invoice.paid_amount
      }
    },
    addGlobalDiscount() {
      if (this.invoice.items.length) {
        for (let x = 0; x < this.invoice.items.length; x++) {
          if (this.extraDiscounts.length) {
            for (let i = 0; i < this.extraDiscounts.length; i++) {
              let q = parseFloat(this.extraDiscounts[i].value)
              if (this.extraDiscounts[i].type === 'percentage') {
                this.invoice.items[x].item.discount_percentage = q
                this.invoice.items[x].item.discount_fixed =
                  parseFloat(this.invoice.items[x].cost) *
                  parseFloat(this.invoice.items[x].item.discount_percentage / 100).toFixed(2)
              } else {
                this.invoice.items[x].item.discount_percentage = (
                  (q / this.totalCostBeforeDiscount) *
                  100
                ).toFixed(2)

                this.invoice.items[x].item.discount_fixed =
                  parseFloat(this.invoice.items[x].item.cost) *
                  (this.invoice.items[x].item.discount_percentage / 100)
              }
            }
          } else {
            this.invoice.items[x].item.discount_percentage =
              this.invoice.items[x].item.discount_percentage ?? 0
            this.invoice.items[x].item.discount_fixed =
              this.invoice.items[x].item.discount_fixed ?? 0
          }
          if (this.extraDiscounts.length > 1) {
            this.extraDiscounts.shift()
          }

          this.getTotal(x)
        }
      }
    },
    updateDiscountValues(index, type) {
      if (type === 'percentage') {
        if (this.invoice.items[index].item.discount_percentage <= 0) {
          this.invoice.items[index].item.discount_fixed = 0
          this.invoice.items[index].item.discount_percentage = 0
        } else {
          this.invoice.items[index].item.discount_fixed = parseFloat(
            parseFloat(this.invoice.items[index].cost) *
              parseFloat(this.invoice.items[index].item.discount_percentage / 100)
          ).toFixed(2)
        }
      }
      if (type === 'fixed') {
        if (this.invoice.items[index].item.discount_fixed <= 0) {
          this.invoice.items[index].item.discount_fixed = 0
          this.invoice.items[index].item.discount_percentage = 0
        } else {
          this.invoice.items[index].item.discount_percentage = parseFloat(
            (parseFloat(this.invoice.items[index].item.discount_fixed) /
              parseFloat(this.invoice.items[index].cost)) *
              100
          ).toFixed(2)
        }
      }
    },
    getTotal(index, remove = false) {
      if (!remove) {
        //السعر بعد الخصم Done

        if (this.invoice.items[index].item.discount_percentage) {
          this.invoice.items[index].item.price_after_discount = parseFloat(
            parseFloat(this.invoice.items[index].cost) -
              parseFloat(
                parseFloat(this.invoice.items[index].cost) *
                  parseFloat(this.invoice.items[index].item.discount_percentage / 100)
              ).toFixed(2)
          ).toFixed(2)
        } else {
          this.invoice.items[index].item.price_after_discount = this.invoice.items[index].cost
        }

        //السعر بعد الضريبه Done
        this.invoice.items[index].item.tax_after_price = parseFloat(
          parseFloat(this.invoice.items[index].item.price_after_discount) *
            parseFloat(parseInt(this.invoice.items[index].item.tax) / 100) +
            parseFloat(this.invoice.items[index].item.price_after_discount)
        ).toFixed(2)

        //اجمالي الصف subtotal Done
        this.invoice.items[index].subtotal =
          parseFloat(
            parseFloat(this.invoice.items[index].item.cost) -
              parseFloat(this.invoice.items[index].item.discount_fixed)
          ) * parseInt(this.invoice.items[index].quantity).toFixed(2)

        console.log(
          'cost' + typeof this.invoice.items[index].item.cost + this.invoice.items[index].item.cost
        )
        console.log(
          'discount_fixed' +
            typeof this.invoice.items[index].item.discount_fixed +
            this.invoice.items[index].item.discount_fixed
        )
        console.log('qty' + typeof this.invoice.items[index].quantity)
        console.log('subtotal' + typeof this.invoice.items[index].subtotal)
        console.log('fixed' + this.invoice.items[index].item.discount_fixed)

        // Total Done
        this.invoice.items[index].total =
          //  parseFloat(
          //   parseFloat(this.invoice.items[index].item.tax_after_price) *
          //     parseInt(this.invoice.items[index].quantity)
          // ).toFixed(2)
          parseFloat(
            parseFloat(this.invoice.items[index].subtotal) +
              parseFloat(this.invoice.items[index].subtotal) *
                parseFloat(this.invoice.items[index].item.tax / 100)
          ).toFixed(3)

        //يضاف ضريبة القيمة المضافة Done
        this.invoice.items[index].product_tax = (
          parseFloat(this.invoice.items[index].tax_percentage / 100) *
          parseFloat(this.invoice.items[index].item.price_after_discount) *
          parseInt(this.invoice.items[index].quantity)
        ).toFixed(3)
      }
      this.calculateTotals()
    },
    calculateTotals() {
      let totalValue = 0
      let totalTax = 0
      let totalTaxValue = 0
      let totalValuebeforDiscount = 0
      let totalFinal = 0

      //grouping tax
      let itemsData = _.chain(this.invoice.items)
        .groupBy('tax_percentage')
        .map((value, key) => ({ tax: key, grouped: value }))
        .value()

      if (itemsData) {
        itemsData.map((item) => {
          let s = 0
          item.grouped.map((subItem) => {
            subItem['valueAfterDiscount'] =
              parseInt(subItem.quantity) * parseFloat(subItem.item.price_after_discount)
            s = s + subItem['valueAfterDiscount']
            item['totalValuesAfterDiscount'] = s
          })
        })
      }

      let test = 0
      //without global discount
      if (itemsData) {
        itemsData.map((item, key) => {
          test = 0
          totalValue = parseFloat(totalValue) + item['totalValuesAfterDiscount']
          totalTaxValue =
            parseFloat(totalTaxValue) + (item['tax'] / 100) * item['totalValuesAfterDiscount']
          totalFinal = parseFloat(totalFinal) + item['totalValuesAfterDiscount']
          item.grouped.map((subItem) => {
            totalValuebeforDiscount =
              parseFloat(totalValuebeforDiscount) +
              parseInt(subItem.quantity) * parseFloat(subItem.cost).toFixed(2)

            if (subItem.item.discount_fixed) {
              totalTax =
                parseFloat(totalTax) +
                parseInt(subItem.quantity) * parseFloat(subItem.item.discount_fixed).toFixed(2)
            }
            item['taxValue'] = (item.tax / 100) * item['totalValuesAfterDiscount']
          })
        })
      }
      totalFinal = totalFinal + totalTaxValue

      if (this.extraDiscounts.length) {
        for (let i = 0; i < this.extraDiscounts.length; i++) {
          let q = parseFloat(this.extraDiscounts[i].value)
          if (this.extraDiscounts[i].type === 'percentage') {
            itemsData.map((item) => {
              q =
                (parseFloat(this.extraDiscounts[i].value) / 100) * item['totalValuesAfterDiscount']
            })
            this.extraDiscounts[i].subtotal = q
          }
        }
      }

      this.costNew = totalValue
      this.totalDiscounts = totalTax
      this.totalCostBeforeDiscount = totalValuebeforDiscount
      this.totalTax = totalTaxValue
      this.total = totalFinal

      //tax_percentage

      //يضاف ضريبة القيمة المضافة الكلي
      // if (this.invoice.items.length) {
      //     for (let x = 0; x < this.invoice.items.length; x++) {
      //         if (this.invoice.items[x].item_id) {
      //             totalTax = parseFloat(totalTax) + parseFloat(this.invoice.items[x].product_tax);
      //             totalValue = parseFloat(totalValue)
      //                 + (parseFloat(this.invoice.items[x].item.price_after_discount).toFixed(2) * parseInt(this.invoice.items[x].quantity))
      //         }
      //     }
      //     // this.costNew = totalValue
      // }

      //الاجمالي الكلي
      let items = this.invoice.items
      this.allItemData = itemsData

      this.invoice.discount_amount = parseFloat(totalTax).toFixed(2)
    },
    showMessage(index) {
      if (this.invoice.items[index].price_after_tax < this.invoice.items[index].item.cost) {
        alert('cost is greater than price')
      }
    },

    // update_price_after_discounts(value) {
    //         this.invoice.items[index].item.price_after_discount = parseFloat(this.invoice.items[index].item.cost) - parseFloat(value)
    // },
    getEnums() {
      axios({
        method: 'GET',
        url: '/api/enums'
      }).then((res) => {
        this.payment_types = res.data.body.payment_type
      })
    },

    AllAccounts(input = 'sales_invoice_account') {
      if (input == 'cash') {
        input = 'treasury'
      }
      axios
        .get('api/account/from/link?link_name=' + input)
        .then((res) => {
          this.accountLinks = res.data.body.accounts
        })
        .catch((error) => {
          console.log(error)
        })
    },

    setPlace(place) {
      this.customer.latitude = place.lat
      this.customer.longitude = place.lng
    },
    openCustomersModal() {
      let data = {
        settings: this.settings,
        permissions: this.permissions
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-customers-modal', data)
    },
    updateOrder(variant) {
      let duplicated = 1
      for (let i in this.invoice.items) {
        if (this.invoice.items[i].variation_id === variant.id) {
          duplicated += 1
        }
      }
      if (duplicated >= 2) {
        // this.invoice.items.splice(0,index);
        this.message = 'لا يمكن اختيار نفس المنتج مرتين'
        this.alertType = 'danger'
        this.removeItem(variant.index)
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 120000)
      } else {
        this.variant = variant
        this.invoice.items[this.invoice.items.length - 1].variation_id = this.variant.id
        this.invoice.items[this.invoice.items.length - 1].cost = this.variant.cost
        this.invoice.items[this.invoice.items.length - 1].serial = this.variant.serial
        this.invoice.items[this.invoice.items.length - 1].serial = this.variant.serial
        this.invoice.items[this.invoice.items.length - 1].stock = this.variant.quantity
        this.invoice.items[this.invoice.items.length - 1].title = this.variant.title_trans
        this.invoice.items[this.invoice.items.length - 1].is_variant = true
        this.invoice.items[this.invoice.items.length - 1].has_attributes = 'true'
        this.addItem2()
      }
    },
    setCustomer(data) {
      this.customer = data.customer
      if (this.customer.latitude.length > 0) {
        this.latitude = parseFloat(this.customer.latitude)
        this.longitude = parseFloat(this.customer.longitude)
      }
    },
    refresh() {
      this.noAccountLinks = false
      this.noAccountLinksMessage = ''
      let url = '/api/purchases/create'
      this.loaded = false
      this.itemsLoaded = false
      axios
        .get(url)
        .then((res) => {
          this.discounts = res.data.body.discounts
          this.inventories = res.data.body.inventories

          // this.addItem();
          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          console.log(error.toJSON())
          this.noAccountLinks = true
          this.noAccountLinksMessage = error.response.data.message
        })
    },
    getProviders() {
      axios.get('/api/providers').then((res) => {
        this.providers = res.data.body.providers.data
      })
    },
    getProducts() {
      this.loaded = false
      axios
        .get('/api/product/general-list')
        .then((res) => {
          this.products = res.data.body.products.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    addDiscount(discount) {
      this.discountsId.push(discount.id)
      let disc = this.discounts.filter((x) => {
        return x.id == discount.id
      })[0]
      if (
        !this.extraDiscounts.filter((x) => {
          return x.id == discount.id
        }).length &&
        this.invoice.items.length
      ) {
        this.extraDiscounts.push(disc)
      }
      this.addGlobalDiscount()
      this.calculateTotals()
    },

    removeDiscount(id) {
      this.invoice.items.map((el) => {
        el['item']['discount_fixed'] = 0
        el['item']['discount_percentage'] = 0
      })
      this.extraDiscounts = this.extraDiscounts.filter((x) => {
        return x.id != id
      })
      this.discountsId = this.discountsId.filter((x) => {
        return x != id
      })
      this.addGlobalDiscount()
      this.calculateTotals()
    },

    openVariationsModal(item, index) {
      let data = {
        product: item,
        index: index,
        strings: this.strings,
        language: this.user.language,
        // "settings": this.settings,
        permissions: this.permissions,
        lockOrder: this.lockOrder
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-new-variation-modal', data)
    },
    setCost(index) {
      console.log(index)
      this.invoice.items[index].has_attributes = 'false'
      let item = this.invoice.items[index].item
      if (!item) return
      if (item.variation) {
        this.openVariationsModal(item, index)
      }
      if (!this.invoice.items[index].tax_percentage) {
        this.invoice.items[index].tax_percentage = 0
      }

      if (Object.keys(item).includes('product_id')) {
        this.invoice.items[index].item_id = item.product_id
        this.invoice.items[index].has_attributes = 'true'
        this.invoice.items[index].variation_id = this.invoice.items[index].item.id
      } else {
        this.invoice.items[index].item_id = item.id
      }
      let prod = this.products.filter((x) => {
        return x.serial == item.serial
      })[0]
      let duplicated = 1
      if (!prod.variation) {
        for (let i in this.invoice.items) {
          if (this.invoice.items[i].item_id === prod.id) {
            duplicated += 1
          }
        }
      }
      if (duplicated >= 3) {
        // this.invoice.items.splice(0,index);
        this.message = 'لا يمكن اختيار نفس المنتج مرتين'
        this.alertType = 'danger'
        this.removeItem(index)
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 120000)
      } else {
        this.invoice.items[index].price_after_tax = prod.price_after_tax
        this.invoice.items[index].cost = prod.cost
        this.invoice.items[index].serial = item.serial
        this.invoice.items[index].stock = item.quantity
        this.invoice.items[index].product_tax = this.invoice.items[index].item.tax
        this.invoice.items[index].total = prod.price_after_tax * this.invoice.items[index].quantity
        this.updateSubtotal(index, true)
      }
    },
    addItem(product) {
      let item = {
        quantity: 1,
        item_id: null,
        has_attributes: 'false',

        item: {
          tax: ''
        }
      }

      this.invoice.items.push(item)
      console.log(this.invoice.items)
    },
    addItem2() {
      let item = {
        quantity: 1,
        item_id: null,

        has_attributes: 'false',
        item: {
          tax: ''
        }
      }
      this.invoice.items.push(item)
      this.invoice.items.pop()
    },
    updateSubtotal(index, calc = false) {
      if (this.invoice.items[index].item_id) {
        if (this.invoice.items[index].product_tax) {
          //  this.invoice.items[index].subtotal = parseFloat(parseFloat(this.invoice.items[index].price_after_tax) * parseInt(this.invoice.items[index].quantity)).toFixed(2);
          this.invoice.items[index].tax_percentage = this.invoice.items[index].item.tax
          // this.invoice.items[index].product_tax = ((parseFloat(this.invoice.items[index].tax_percentage/100) * parseFloat(this.invoice.items[index].item.price_after_discount)) * parseInt(this.invoice.items[index].quantity)).toFixed(2);
          this.invoice.items[index].price_after_tax = (
            parseFloat(this.invoice.items[index].tax_percentage / 100) *
              parseFloat(this.invoice.items[index].cost) +
            parseFloat(this.invoice.items[index].cost)
          ).toFixed(2)
        } else {
          //  this.invoice.items[index].subtotal = parseFloat(parseFloat(this.invoice.items[index].price_after_tax) * parseInt(this.invoice.items[index].quantity)).toFixed(2);
        }
        this.addItem()
        this.invoice.items.length = this.invoice.items.length - 1
        this.getTotal(index)
        // this.updateDiscountValues(index,'fixed')
        // this.updateDiscountValues(index,'percentage')
      }
    },
    removeItem(idx) {
      this.invoice.items.splice(idx, 1)
      if (this.invoice.items.length == 0) {
        this.extraDiscounts = []
      }
      this.getTotal(idx, true)
    },

    store() {
      this.invoice.treasury_account =
        this.invoice.payment_type === 'installment'
          ? this.user_treasury_account
          : this.invoice.treasury_account

      this.invoice.tax_amount = this.totalTax
      this.invoice.tax = this.totalTax

      this.invoice.cost = this.cost
      // this.invoice.cost =  this.total - this.totalTax + parseFloat(this.invoice.discount_amount)
      this.invoice.total = this.total
      this.invoice.discounts = this.discountsId
      this.invoice.customer = this.customer
      this.invoice.provider = this.provider
      this.invoice.data = this.allItemData
      this.invoice.customer_id = this.customer.id
      this.invoice.totalValueBeforeDiscount = this.totalCostBeforeDiscount
      this.invoice.subtotal = this.total - this.totalTax + parseFloat(this.invoice.discount_amount)
      this.invoice.tax_percentage =
        // ((parseFloat(this.totalTax) / parseFloat(this.invoice.subtotal)) * 100 )
        this.invoice.items[0].tax_percentage
      let data = this.invoice
      if (this.invoice.payment_type == 'full') {
        this.invoice.paid_amount = this.invoice.total
        this.invoice.remaining_amount = 0
      } else {
        this.invoice.payment_method = 'cash'
      }
      let items = this.invoice.items
      if (items.length > 0) {
        items.forEach((item) => {
          item.cost = item.cost
          item.cost_after_tax = item.subtotal
          item.title_ar = item.item.title_ar
          item.title = item.item.title
          item.tax_amount = parseFloat(item.subtotal) - item.valueAfterDiscount
          item.product_tax = item.item.tax
          item.discount_percentage = item.item.discount_percentage
          item.discount_amount = item.item.discount_fixed

          item.unit_key = item.item.unit_key
          item.has_attributes = item.item.has_attributes
        })
      }
      axios
        .post('/api/purchases', data)
        .then((res) => {
          setTimeout(() => {
            if (res.data.status) {
              this.invoice.provider = res.data.body.invoice.provider
              this.showToastError(res.data.message, res.data.custom_code)
              this.invoice.items = res.data.body.invoice.items

              this.invoice.id = res.data.body.invoice.id
              this.invoice.provider_tax_number = res.data.body.invoice.provider_tax_number

              this.invoice.cost = res.data.body.invoice.cost
              this.invoice.total = res.data.body.invoice.total
              this.invoice.subtotal = res.data.body.invoice.subtotal
              this.invoice.tax = res.data.body.invoice.tax_amount
              this.showReceipt = true
              this.invoice.created_at = res.data.body.invoice.created_at
              this.invoice.qr = res.data.body.invoice.qr
              this.invoice.total_string = res.data.body.invoice.total_string
              let data = {
                invoice: this.invoice,
                user: this.user,
                settings: this.settings,
                strings: this.strings,
                qr: this.invoice.qr,
                purchaseInvoiceType: this.trans('purchase invoice')
              }

              // eslint-disable-next-line no-undef
              // SharedEvent.fire('open-purchase-receipt-modal', data)
              this.resetInvoiceData()
              this.cost = 0
              this.totalDiscounts = 0
              this.totalTax = 0
              this.costNew = 0
              this.totalCostBeforeDiscount = 0
              this.total = 0
              this.allItemData = []
              this.extraDiscounts = []
              this.$router.push(`/purchases/edit/${res.data.body.invoice.id}`)
            }
          }, 0)
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    resetInvoiceData() {
      this.invoice = {
        items: [],
        paid: 0,
        qr: '',
        tax: 0,
        provider_inv_number: '',
        invoice_date: '',
        payment_type: '',
        paid_amount: 0,
        remaining_amount: '',
        provider_id: ''
      }
    },
    closeReceipt() {
      this.invoice = {
        items: [],
        paid: 0,
        inventory_id: this.user.inventory,
        tax: 0
      }

      this.showReceipt = false
      this.$router.push({ path: '/purchases' })
    },

    setProduct(index) {
      this.invoice.items[index].cost = 0
      this.invoice.items[index].item = ''
      let prod = this.products.filter((x) => {
        return x.serial == this.invoice.items[index].serial
      })[0]

      if (!prod) return
      if (Object.keys(prod).includes('product_id')) {
        this.invoice.items[index].item_id = prod.product_id
      } else {
        this.invoice.items[index].item_id = prod.id
      }
      this.invoice.items[index].item = prod
      this.invoice.items[index].cost = prod.cost
      this.invoice.items[index].product_tax = this.invoice.items[index].item.tax
      this.updateSubtotal(index, true)
      this.addGlobalDiscount()
      this.setCost(index)
    },
    getSetting: function (key) {
      var result = this.settings.find((el) => {
        if (el.key === key) {
          return el.value
        }
      })

      return result.value
    }
  }
}
</script>
<style>
.saleAdd .custom-select,
.saleAdd .form-control {
  border-radius: 4px !important;
  height: 33px !important;
  border-color: #ccc !important;
}
.saleAdd #dropdown-1 {
  border-radius: 4px !important;
  height: 33px !important;
  border-color: #ccc !important;
}
.saleAdd .btn-group {
  width: 100%;

  border-radius: 50px !important;
  height: 36px;
  outline: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}

.vs--searchable .vs__dropdown-toggle {
  min-width: 120px !important;
}

.style-chooser.is-invalid {
  border: 1px solid #dc3545 !important;
}

tr:not(.enable-border) th {
  /* max-width: 125px !important;
    min-width: 125px !important; */
}

.table.table-bordered td {
  /* max-width: 125px !important;
    width: 125px !important; */
}

.multiselect__tags {
  min-height: calc(1.5em + 0.75rem + 2px) !important;
  padding: 5px 40px 0 8px !important;
  border: 1px solid #ced4da !important;
  font-size: 1rem !important;
  border-radius: 0.25rem !important;
  color: rgb(73, 80, 87) !important;
  overflow: auto;
}

.custom-select .dropdown-toggle,
.custom-select .dropdown-toggle:hover,
.custom-select .dropdown-toggle:focus,
.custom-select.show .dropdown-toggle {
  background-color: transparent !important;
  color: #000 !important;
  border: none !important;
  border-radius: 0 !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
}

.dropdown.custom-select {
  border-radius: 30px;
  padding: 0 !important;
}
</style>

<style scoped>
table .form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + -1px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  border-radius: 6px !important;
  background-image: none;
}

.modal-footer {
  display: none !important;
}
</style>
