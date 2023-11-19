<template>
  <div>
    <div
      v-if="cashierLoaded"
      :class="[user.language === 'en' ? '' : 'rtl']"
      class="col-sm-12 grid-margin stretch-card"
    >
      <div class="card" style="background: #f9f9f9">
        <!-- Slider for sub categories -->
        <!-- <div class="category-container">
          <vueper-slides
            class="no-shadow"
            :visible-slides="5"
            slide-multiple
            :gap="1"
            :slide-ratio="1 / 4"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
          >
            <vueper-slide
              v-for="cat in subcategories"
              :title="cat.title"
              :key="cat"
            >
            </vueper-slide>
          </vueper-slides>
        </div> -->

        <div
          v-if="fmessage.length"
          :class="'text-center alert alert-' + alertType"
          v-html="fmessage"
        ></div>
        <div class="card-body" style="padding-right: 0; padding-left: 0">
          <div class="align-items-center justify-content-between mb-4">
            <b-row class="m-0">
              <!-- products row -->
              <b-col cols="12" lg="5" class="products-section">
                <b-row class="mx-0">
                  <b-col cols="12">
                    <b-row align-h="around" class="px-3">
                      <b-dropdown
                        id="dropdown-1"
                        class="cashier-btn col-auto mb-3"
                        :text="trans('add_discount')"
                        :disabled="lockOrder == 1"
                        @click="showDiscounts = !showDiscounts"
                        size="sm"
                      >
                        <div
                          v-for="disc in discounts"
                          :key="disc.id"
                          v-if="discounts.length"
                        >
                          <b-dropdown-item
                            @click="addDiscount(disc.id)"
                            v-if="!disc.scheduled"
                          >
                            <span style="">
                              <em v-if="disc.type == 'fixed'"
                                >{{ disc.title }} ( {{ disc.value }}
                                {{ getSetting('currency', settings) }} )</em
                              >
                              <em v-else>
                                {{ disc.title }} ({{ disc.value }} %)
                              </em></span
                            >
                          </b-dropdown-item>
                        </div>
                        <p v-if="discounts.length === 0">
                          {{ trans('no_available_discounts') }}
                        </p>
                      </b-dropdown>
                      <b-button
                        class="mb-3 cashier-btn col-auto d-none"
                        variant="primary"
                        size="sm"
                        @click="openWithdrawalModal"
                        :disabled="lockOrder == 1"
                      >
                        {{ trans('add_withdrawal') }}
                      </b-button>
                      <b-button
                        class="mb-3 cashier-btn col-auto"
                        variant="primary"
                        size="sm"
                        :disabled="lockOrder == 1"
                        @click="openRefundModal"
                        >{{ trans('refund') }}
                      </b-button>
                      <b-button
                        class="mb-3 cashier-btn col-auto"
                        variant="primary"
                        size="sm"
                        @click="openDrawerModal"
                        :disabled="lockOrder == 1"
                      >
                        {{ trans('drawer') }}
                      </b-button>
                      <b-button
                        class="mb-3 cashier-btn col-auto"
                        variant="primary"
                        size="sm"
                        :disabled="lockOrder == 1"
                        v-if="settings['tables_interface'] == 'enable'"
                        @click="openTablesModal"
                        >{{ trans('tables') }}
                      </b-button>
                      <b-button
                        class="mb-3 cashier-btn col-auto"
                        size="sm"
                        :disabled="lockOrder == 1"
                        @click="openCustomersModal"
                        >{{ trans('add_customer') }}
                      </b-button>
                    </b-row>
                  </b-col>
                </b-row>

                <div class="products-card">
                  <b-row class="m-0 px-3">
                    <div class="categories">
                      <div v-if="loaded" class="categories-bar">
                        <b-card-group deck>
                          <b-row align-h="around" class="w-100 m-0">
                            <h5 style="margin-bottom: 17px; margin-right: 3px">
                              {{ trans('main_categories') }}
                            </h5>

                            <b-row
                              class="d-flex"
                              style="padding: 0 6px; align-items: center"
                            >
                              <div class="col-1">
                                <button
                                  class="page-item"
                                  :class="
                                    categories_current_page === 1
                                      ? 'disabledClass'
                                      : ''
                                  "
                                >
                                  <a
                                    class="page-link"
                                    @click.prevent="
                                      goToCat(categories_prev_page_url)
                                    "
                                    href="#"
                                    tabindex="-1"
                                  >
                                    <font-awesome-icon
                                      icon="fa-solid fa-angle-right"
                                    />
                                  </a>
                                </button>
                              </div>

                              <div
                                class="col-10"
                                style="display: flex; column-gap: 7px"
                              >
                                <div
                                  class="category-container"
                                  v-if="categories"
                                >
                                  <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo8p1F9j7slN08YgiEmXLO5r1nzWGUFvhcZO4kAx8S-yWeCSGhHrKj1SLGYhWh07ZFhIY&usqp=CAU                               
                              "
                                    alt="Card Image"
                                    @click="getProducts()"
                                    class="category"
                                    :class="{ selected: category == '' }"
                                  />
                                  <b-card-text class="category-text">
                                    {{ trans('all') }}
                                  </b-card-text>
                                </div>

                                <div
                                  class="category-container"
                                  v-for="cat in categories"
                                  :key="cat.id"
                                  v-if="categories.length > 0"
                                >
                                  <img
                                    :src="
                                      cat.image
                                        ? cat.image
                                        : getSetting('default_image')
                                    "
                                    alt="Card Image"
                                    @click="selectdCategory(cat.id, cat)"
                                    class="category"
                                    :class="{ selected: category == cat.id }"
                                  />
                                  <b-card-text
                                    class="category-text"
                                    style="text-wrap: pretty"
                                  >
                                    {{ spliceText(cat.title, '10') }}
                                  </b-card-text>
                                </div>
                                <p v-else>
                                  {{ trans('no_available_categories') }}
                                </p>
                              </div>

                              <div class="col-1" style="padding: 0 3px">
                                <button
                                  class="page-item"
                                  :class="
                                    categories_next_page_url === ''
                                      ? 'disabledClass'
                                      : ''
                                  "
                                >
                                  <a
                                    class="page-link"
                                    @click.prevent="
                                      goToCat(categories_next_page_url)
                                    "
                                    href="#"
                                    ><font-awesome-icon
                                      icon="fa-solid fa-angle-left"
                                  /></a>
                                </button>
                              </div>
                            </b-row>
                          </b-row>

                          <div
                            style="
                              display: flex;
                              justify-content: center;
                              flex-direction: column;
                              align-items: center;
                              width: 100%;
                            "
                          >
                            <div class="text-center" style="padding-top: 20px">
                              <h5
                                style="
                                  margin: 17px 3px 27px 0;
                                  text-align: center;
                                  display: block;
                                "
                              >
                                {{ trans('sub_categories') }}
                              </h5>
                            </div>
                            <b-row
                              class="d-flex"
                              style="padding: 0 10px; align-items: center"
                            >
                              <div
                                class="category-container"
                                v-for="cat in subcategories"
                                :key="cat.id"
                                v-if="subcategories.length"
                                style="margin: 5px"
                              >
                                <img
                                  :src="
                                    cat.image
                                      ? cat.image
                                      : getSetting('default_image')
                                  "
                                  alt="Card Image"
                                  @click="selectdCategory(cat.id)"
                                  class="category"
                                  :class="{ selected: category == cat.id }"
                                />
                                <b-card-text
                                  class="category-text"
                                  style="text-wrap: pretty"
                                >
                                  {{ spliceText(cat.title, '10') }}
                                </b-card-text>
                              </div>

                              <div
                                v-if="!subcategories.length"
                                class="text-center"
                                style="padding-top: 20px"
                              >
                                <p style="display: block">
                                  {{ trans('no_available_sub_categories') }}
                                </p>
                              </div>
                            </b-row>
                          </div>
                        </b-card-group>
                      </div>
                      <div
                        v-else
                        class="text-center categories-bar"
                        style="padding-top: 20px"
                      >
                        <font-awesome-icon
                          class="fa-spin"
                          icon="fa-solid fa-spinner"
                        />
                      </div>
                    </div>
                  </b-row>

                  <b-row class="m-0 px-3">
                    <div class="products-cont">
                      <div
                        class="row m-0 align-items-center justify-content-between"
                        style="padding-right: 10px"
                      >
                        <ValidationObserver
                          v-slot="{ handleSubmit }"
                          class="w-100"
                          ref="form"
                        >
                          <b-form
                            @submit.prevent="handleSubmit(filter)"
                            @reset.prevent="reset"
                          >
                            <b-form-row style="align-items: baseline">
                              <b-col cols="12" md="4">
                                <b-form-group style="text-align: center">
                                  <b-form-input
                                    :placeholder="trans('search')"
                                    type="text"
                                    v-model="filters.serial"
                                  ></b-form-input>
                                </b-form-group>
                              </b-col>

                              <b-col cols="12" md="3">
                                <b-form-group>
                                  <b-button variant="success" type="submit">
                                    <font-awesome-icon
                                      icon="fa-solid fa-filter"
                                    />
                                    {{ trans('filter') }}
                                  </b-button>
                                </b-form-group>
                              </b-col>

                              <b-col cols="12" md="4">
                                <b-form-group>
                                  <b-button variant="warning" type="reset">
                                    <font-awesome-icon
                                      icon="fa-solid fa-arrows-rotate"
                                    />
                                    {{ trans('reset_search') }}
                                  </b-button>
                                </b-form-group>
                              </b-col>
                            </b-form-row>
                          </b-form>
                        </ValidationObserver>
                      </div>
                      <div class="products" v-if="loaded && products.length">
                        <b-card-group
                          deck
                          style="display: -webkit-box !important"
                        >
                          <b-row class="justify-content-around m-0">
                            <button
                              class="product col-sm-4 col-11 p-0"
                              v-for="(product, index) in products"
                              :key="product.id"
                              @click.stop="increaseQuant(product, index)"
                            >
                              <b-card
                                :img-src="
                                  product.image
                                    ? product.image
                                    : getSetting('default_image')
                                "
                                img-alt="Image"
                                img-top
                              >
                                <b-card-title class="p-3">
                                  <span class="col-auto title p-0">{{
                                    product.title
                                  }}</span>
                                  <b-row class="m-0">
                                    <span class="col price p-0">
                                      <span
                                        variant="success"
                                        v-if="
                                          product.sale_price &&
                                          product.sale_price !== '0.00'
                                        "
                                      >
                                        {{ product.sale_price }}
                                        {{ getSetting('currency', settings) }}
                                      </span>

                                      <del
                                        v-if="
                                          product.sale_price &&
                                          product.sale_price !== '0.00'
                                        "
                                        >{{ product.price }}
                                        {{ getSetting('currency', settings) }}
                                      </del>
                                      <span v-else
                                        >{{ product.price }}
                                        {{
                                          getSetting('currency', settings)
                                        }}</span
                                      >
                                      <b-badge variant="danger"> </b-badge>
                                    </span>
                                  </b-row>
                                </b-card-title>
                                <div class="product-cat">
                                  <div style="text-align: left">
                                    <small class="text-muted">
                                      {{ product.quantity }}
                                      {{ trans('piece') }}
                                    </small>
                                  </div>
                                </div>
                                <div class="serial">
                                  <div style="text-align: left">
                                    <small class="text-muted">
                                      {{ spliceText(product.serial, '10') }}
                                    </small>
                                  </div>
                                </div>
                              </b-card>
                            </button>

                            <div class="controls" v-if="paginateTotal > 10">
                              <nav
                                aria-label="Page navigation center-block"
                                style="margin-top: 20px; direction: ltr"
                              >
                                <ul class="pagination justify-content-center">
                                  <li class="page-item">
                                    <a
                                      class="page-link"
                                      @click.prevent="goTo(first_page_url)"
                                      href="#"
                                      tabindex="-1"
                                      ><font-awesome-icon
                                        icon="fa-solid fa-angles-left"
                                      />
                                    </a>
                                  </li>
                                  <li class="page-item">
                                    <a
                                      class="page-link"
                                      @click.prevent="goTo(prev_page_url)"
                                      href="#"
                                      tabindex="-1"
                                    >
                                      <font-awesome-icon
                                        icon="fa-solid fa-angle-left"
                                      />
                                    </a>
                                  </li>
                                  <li class="page-item active disabled">
                                    <a
                                      class="page-link"
                                      @click.prevent="javascript"
                                      href="#"
                                      >{{ current_page }}</a
                                    >
                                  </li>
                                  <li class="page-item">
                                    <a
                                      class="page-link"
                                      @click.prevent="goTo(next_page_url)"
                                      href="#"
                                      ><font-awesome-icon
                                        icon="fa-solid fa-angle-right"
                                    /></a>
                                  </li>
                                  <li class="page-item">
                                    <a
                                      class="page-link"
                                      @click.prevent="goTo(last_page_url)"
                                      href="#"
                                      ><font-awesome-icon
                                        icon="fa-solid fa-angles-right"
                                    /></a>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                            <div
                              v-if="products.length > 0"
                              class="col-sm-12 text-center"
                              :style="{
                                direction: language == 'en' ? 'ltr' : 'rtl',
                              }"
                            >
                              <span>
                                {{ trans('total_search_results') }} :
                                {{ paginateTotal }}
                              </span>
                            </div>
                          </b-row>
                        </b-card-group>
                      </div>
                      <div
                        v-else-if="loaded && !products.length"
                        class="text-center"
                      >
                        <h3 style="margin: 20px 0">
                          {{ trans('no_results_found') }}
                        </h3>
                      </div>
                      <div v-else class="text-center" style="padding-top: 20px">
                        <font-awesome-icon
                          class="fa-spin"
                          icon="fa-solid fa-spinner"
                        />
                      </div>
                    </div>
                  </b-row>
                </div>
              </b-col>

              <!-- cashout row -->
              <b-col
                cols="12"
                lg="7"
                :class="[
                  this.sideMenu ? 'active' : '',
                  user.language == 'en' ? 'ltr' : '',
                ]"
                class="cashier-responsive"
                style="padding-top: 30px"
              >
                <i
                  class="fa fa-times cashier-responsive-times"
                  @click="openMenu()"
                ></i>
                <font-awesome-icon
                  class="cashier-responsive-times"
                  @click="openMenu()"
                  icon="fa-solid fa-xmark"
                />
                <div class="col-12" style="overflow: hidden">
                  <b-button
                    variant="danger"
                    class="del-elements"
                    size="sm"
                    v-if="order.length"
                    @click="clearOrder"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash" />
                    {{ trans('remove_items') }}
                  </b-button>
                </div>

                <b-row
                  style="margin-top: 35px"
                  class="justify-content-center"
                  v-if="table_id > 0"
                >
                  <h6>
                    <b-badge
                      variant="danger"
                      @click="!lockOrder ? (table_id = 0) : ''"
                    >
                      <font-awesome-icon
                        style="cursor: pointer"
                        icon="fa-solid fa-xmark"
                      />
                    </b-badge>
                    <b-badge variant="success">
                      <font-awesome-icon icon="fa-solid fa-table" />
                    </b-badge>
                    {{ trans('table') }} :
                    {{
                      tables.filter(x => {
                        return x.id == table_id
                      })[0].title
                    }}
                  </h6>
                </b-row>

                <!-- tab row -->
                <b-row class="m-0">
                  <b-nav tabs>
                    <b-nav-item
                      v-for="(tab, index) in tabs"
                      :key="index"
                      :active="index == current_tab_index"
                    >
                      <b-row>
                        <b-col @click="alterTab(index)">
                          <b-badge variant="light">
                            <font-awesome-icon
                              class="fa-xl"
                              :class="
                                isOnline == true
                                  ? 'text-success'
                                  : 'text-danger'
                              "
                              icon="fa-solid fa-circle"
                            />
                          </b-badge>
                        </b-col>
                        <b-col @click="alterTab(index)">
                          <h6>{{ formatTime(tab.creation_time) }}</h6>
                        </b-col>
                        <b-col @click="removeTab(index)">
                          <b-button size="xs" variant="danger">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-nav-item>
                    <b-nav-item>
                      <b-button @click="addTab()" variant="success" size="xs">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                      </b-button>
                    </b-nav-item>
                  </b-nav>
                </b-row>

                <div
                  style="margin-top: 35px"
                  class="row justify-content-center customer-card align-items-center"
                  v-if="customer.id > 0"
                >
                  <span
                    class="close-card"
                    @click="lockOrder ? '' : (customer = {})"
                  >
                    <font-awesome-icon
                      style="cursor: pointer"
                      icon="fa-solid fa-xmark"
                    />
                  </span>
                  <div class="col-6 p-0">
                    <p>
                      <span>
                        <font-awesome-icon
                          style="cursor: pointer"
                          icon="fa-solid fa-user"
                        />
                      </span>
                      {{ trans('customer_name') }} {{ customer.name }}
                    </p>
                    <p>
                      <span>
                        <font-awesome-icon
                          style="cursor: pointer"
                          icon="fa-solid fa-phone"
                        />
                      </span>
                      {{ trans('customer_phone') }} {{ customer.phone }}
                    </p>
                  </div>
                  <div class="col-6 p-0 cashier-map">
                    <!-- <GoogleMap
                    v-on:getPlace="setPlace"
                    :lat="latitude"
                    :lng="longitude"
                    :user="user"
                  /> -->
                  </div>
                </div>
                <b-row style="margin-top: 35px">
                  <b-table-simple
                    class="table-checkout"
                    striped
                    hover
                    responsive
                    fixed
                    style="min-height: 50px"
                  >
                    <b-thead class="res-hidden">
                      <b-tr>
                        <b-th style="width: 50px">{{ trans('num') }}</b-th>
                        <b-th style="width: 136px">{{ trans('barcode') }}</b-th>
                        <b-th class="res-hidden">{{ trans('item') }}</b-th>
                        <b-th class="text-center">{{ trans('quantity') }}</b-th>
                        <b-th>{{ trans('price') }}</b-th>
                        <b-th style="width: 150px"
                          >{{ trans('discount percentage') }} (%)</b-th
                        >
                        <b-th>{{ trans('discount fixed') }}</b-th>

                        <b-th class="res-hidden">{{ trans('added_tax') }}</b-th>
                        <!-- <b-th>{{ trans('price_after_tax') }}</b-th> -->
                        <b-th>{{ trans('total_value') }}</b-th>
                      </b-tr>
                    </b-thead>
                    <template v-for="(item, index) in order">
                      <b-tbody v-if="order.length" :key="item.id">
                        <b-tr class="order-row res-hidden">
                          <b-td class="">
                            {{ parseInt(index) + 1 }}
                          </b-td>
                          <b-td class="">
                            {{ spliceText(item.serial, '10') }}
                          </b-td>
                          <b-td class="res-hidden" v-if="language === 'ar'">
                            {{ item.title }}
                          </b-td>
                          <b-td class="res-hidden" v-else>
                            {{ item.title_ar }}
                          </b-td>
                          <b-td>
                            <b-row class="justify-content-center m-0">
                              <b-input
                                type="text"
                                @keyup="orderUpdateQuant(item, index)"
                                @blur="resetStockTotal(item, index)"
                                @click="recordStockTotal(item, index)"
                                v-model="item.quantity"
                                class="col-12 quantity-field my-1"
                                @keypress="isNumber($event)"
                                :class="'order-item-' + index"
                                :disabled="lockOrder ? true : false"
                              ></b-input>

                              <b-button
                                class="btn minus-btn"
                                @click="orderMinusQuant(item, index)"
                                :disabled="lockOrder ? true : false"
                              >
                                <font-awesome-icon icon="fa-solid fa-minus" />
                              </b-button>
                              <b-button
                                class="btn plus-btn"
                                @click="orderPlusQuant(item, index)"
                                :disabled="item.stock == 0 ? true : false"
                              >
                                <font-awesome-icon icon="fa-solid fa-plus" />
                              </b-button>
                            </b-row>
                          </b-td>
                          <b-td>
                            <b-input
                              @keypress="isNumber($event)"
                              type="text"
                              class="price"
                              disabled
                              style="width: 100px"
                              @change="
                                item.price = (
                                  (parseFloat(item.price_after_tax) * 100) /
                                  (100 + parseFloat(item.tax_percentage))
                                ).toFixed(2)
                              "
                              v-model="item.price"
                            ></b-input>
                          </b-td>

                          <b-td>
                            <ValidationProvider
                              rules="positive|decimal"
                              v-slot="{ valid, errors }"
                              name="product_tax"
                            >
                              <b-form-group>
                                <b-form-input
                                  style="
                                    padding: 0px !important;
                                    margin: 0 !important;
                                    text-align: center;
                                    width: 100% !important;
                                  "
                                  type="number"
                                  min="0"
                                  :disabled="extraDiscounts.length > 0"
                                  @keyup="
                                    updateDiscountValues(index, 'percentage')
                                    getTotal(index)
                                  "
                                  v-model="item.discount_percentage"
                                  :state="
                                    errors[0] ? false : valid ? true : null
                                  "
                                >
                                </b-form-input>
                                <b-form-invalid-feedback id="inputLiveFeedback">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-td>
                          <b-td>
                            <ValidationProvider
                              rules="positive|decimal"
                              v-slot="{ valid, errors }"
                              name="discount_amount"
                            >
                              <b-form-group>
                                <b-form-input
                                  style="
                                    padding: 0px !important;
                                    margin: 0 !important;
                                    text-align: center;
                                    width: 100% !important;
                                  "
                                  type="number"
                                  min="0"
                                  :disabled="extraDiscounts.length > 0"
                                  @keyup="
                                    updateDiscountValues(index, 'fixed')
                                    getTotal(index)
                                  "
                                  v-model="item.discount_amount"
                                  :state="
                                    errors[0] ? false : valid ? true : null
                                  "
                                >
                                </b-form-input>
                                <b-form-invalid-feedback id="inputLiveFeedback">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-td>

                          <b-td class="res-hidden">
                            {{ '%' + item.tax_percentage }}
                          </b-td>

                          <b-td>
                            {{ parseFloat(item.tax_after_price).toFixed(2) }}
                          </b-td>
                        </b-tr>
                      </b-tbody>
                    </template>

                    <b-tbody v-if="order.length">
                      <b-tr>
                        <b-td
                          colspan="3"
                          style="border: 1px solid #ccc; border-right: none"
                        >
                          <span style="float: right">
                            {{ trans('total value before discount') }}
                          </span>
                        </b-td>
                        <b-td colspan="2">
                          <span style="float: left">
                            {{ costNewBeforeDiscount }}
                            <span>
                              {{ getSetting('currency', settings) }}
                            </span>
                          </span>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td
                          colspan="3"
                          class="font-weight-bold text-danger"
                          style="border: 1px solid #ccc; border-right: none"
                        >
                          <span style="float: right">{{
                            trans('discount_total')
                          }}</span>
                        </b-td>
                        <b-td colspan="2">
                          <span
                            style="float: left"
                            v-for="(tax, index) in extraDiscounts"
                            :key="'one_' + index"
                          >
                            <b
                              v-if="
                                extraDiscounts.length & (tax.type == 'fixed')
                              "
                              >{{ tax.value }}</b
                            >
                            <span> {{ getSetting('currency', settings) }}</span>
                          </span>
                          <span
                            style="float: left"
                            v-if="!extraDiscounts.length"
                          >
                            <b>{{ totalDiscounts }}</b>
                            <span> {{ getSetting('currency', settings) }}</span>
                          </span>
                        </b-td>
                      </b-tr>
                    </b-tbody>

                    <b-tbody v-if="order.length">
                      <b-tr
                        v-for="(tax, index) in allItemData"
                        :key="'one_' + index"
                      >
                        <template>
                          <b-td
                            colspan="3"
                            style="
                              text-align: start !important;
                              border: 1px solid #ccc;
                              border-right: none;
                            "
                          >
                            {{ trans('total value after discount') }}
                            <span v-if="allItemData.length > 1">
                              ( {{ tax.tax }}% )</span
                            >
                          </b-td>

                          <b-td colspan="2" style="text-align: end !important">
                            <span>
                              {{ tax.totalValuesAfterDiscount }}
                              {{ getSetting('currency', settings) }}</span
                            >
                          </b-td>
                        </template>
                      </b-tr>
                    </b-tbody>

                    <b-tbody v-if="order.length">
                      <b-tr>
                        <b-td
                          colspan="3"
                          style="border: 1px solid #ccc; border-right: none"
                        >
                          <span style="float: right">
                            {{ trans('added_tax') }}
                          </span>
                        </b-td>
                        <b-td colspan="2" style="text-align: end !important">
                          <span>
                            {{ parseFloat(totalTax).toFixed(2) }}
                            <span> {{ getSetting('currency', settings) }}</span>
                          </span>
                        </b-td>
                      </b-tr>
                    </b-tbody>

                    <tbody v-if="!order.length">
                      <b-tr>
                        <b-td class="text-center" colspan="9">
                          <h5 style="margin: 10px 0px">
                            {{ trans('no_items_added') }}
                          </h5>
                        </b-td>
                      </b-tr>
                    </tbody>
                    <b-tbody class="no-wrap total-tbody" v-if="order.length">
                      <b-tr>
                        <b-td
                          class="py-3"
                          colspan="3"
                          style="border-left: 1px solid #ccc"
                        >
                          <span style="float: right">
                            <span class="total-cell"
                              >{{ trans('invoice_total') }}
                            </span>
                          </span> </b-td
                        ><b-td colspan="2">
                          <span style="float: left">
                            <span class="total-cell"
                              >{{ parseFloat(total).toFixed(2) }}
                              <span>
                                {{ getSetting('currency', settings) }}</span
                              >
                            </span>
                          </span>
                        </b-td>
                      </b-tr>
                    </b-tbody>

                    <b-tbody class="no-wrap total-tbody" v-if="order.length">
                      <b-tr
                        v-for="disc in extraDiscounts"
                        :key="disc.id"
                        class="disc-row"
                      >
                        <td class="text-center" colspan="5">
                          <span
                            v-text="disc.title"
                            style="margin: 0 5px"
                          ></span>
                          <span v-if="disc.type == 'percentage'">
                            {{ disc.value + '%' }}</span
                          >
                          <span v-else
                            >{{ disc.value }}
                            {{ getSetting('currency', settings) }}</span
                          >

                          <button
                            style="
                              margin: 0 15px;
                              background: #dc3545 !important;
                            "
                            class="btn btn-danger btn-sm btn-rounded"
                            @click="removeDiscount(disc.id, disc.value)"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-xmark"
                              style="color: #fff"
                            />
                          </button>
                        </td> </b-tr
                    ></b-tbody>
                  </b-table-simple>
                  <div class="w-100">
                    <div class="pay-row">
                      <div
                        v-if="!showPMethod && !showOrderDueDate"
                        class="table-btns"
                      >
                        <b-button
                          :disabled="!order.length"
                          v-if="!showPMethod && !table_id && !isOffline"
                          @click="submitArrearsOrder()"
                          variant="primary"
                          class="btn-pay"
                        >
                          <h3>
                            <font-awesome-icon
                              icon="fa-solid fa-calendar-days"
                            />
                            {{ trans('payment_in_arrears') }}
                          </h3>
                        </b-button>

                        <b-button
                          :disabled="!order.length"
                          v-if="!showPMethod && !table_id"
                          @click="submitPayment('full')"
                          variant="success"
                          class="btn-pay"
                        >
                          <h3>
                            <font-awesome-icon icon="fa-solid fa-money-bill" />
                            {{ trans('payment') }}
                          </h3>
                        </b-button>
                      </div>
                      <div v-if="table_id && !showPMethod" class="table-btns">
                        <b-button variant="primary" @click="saveTable"
                          >{{ trans('save_table') }}
                        </b-button>
                        <b-button variant="success" @click="checkoutTableOrder"
                          >{{ trans('checkout') }}
                        </b-button>
                      </div>
                      <div v-if="showPMethod" class="payment-methods">
                        <b-button
                          class="pmethod text-center"
                          @click="submitOrder('cash')"
                        >
                          <h4>
                            <font-awesome-icon icon="fa-solid fa-money-bill" />
                            {{ trans('cash') }}
                          </h4>
                        </b-button>
                        <b-button
                          class="pmethod text-center"
                          @click="orderBank('bank')"
                        >
                          <h4>
                            <font-awesome-icon icon="fa-solid fa-credit-card" />
                            {{ trans('credit_card') }}
                          </h4>
                        </b-button>
                      </div>
                      <div v-if="showOrderDueDate">
                        <b-form-group
                          id="due_date-1"
                          :label="trans('paid_amount')"
                          label-for="due_date"
                        >
                          <b-form-input
                            readonly
                            class="mb-2"
                            style="apperance: "
                            value="0"
                            :min="0"
                            step=".1"
                            :max="0"
                            :placeholder="trans('paid_amount')"
                            type="number"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group :label="trans('remaining amount')">
                          <b-form-input
                            class="mb-2"
                            style="apperance: "
                            v-model="paid"
                            :min="0"
                            :max="orderTotal"
                            @change="unpaid = parseFloat(orderTotal)"
                            :placeholder="trans('remain_amount')"
                            type="number"
                          ></b-form-input>
                          <b-button
                            :disabled="!paid"
                            @click="submitPayment('installment')"
                            variant="success"
                            class="btn-pay"
                          >
                            <h3>
                              <font-awesome-icon
                                icon="fa-solid fa-money-bill"
                              />
                              {{ trans('payment') }}
                            </h3>
                          </b-button>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <Withdrawal></Withdrawal>
      <Refund :settings="settings" :user="user"></Refund>
      <Drawer></Drawer>
      <Tables></Tables>
      <SaleReceipt></SaleReceipt>
      <Variations :settings="settings" :user="user"></Variations>
      <Customer></Customer>
    </div>

    <div
      v-else
      class="main-panel"
      style="width: 98%; height: 100%; margin: 35px 15px"
    >
      <b-row class="d-flex">
        <b-col class="col-3">
          <b-skeleton
            animation="wave"
            width="100%"
            height="100%"
            style="
              background: #eaecee;
              border-raduis: 15px;
              margin-bottom: 15px;
            "
          ></b-skeleton>
        </b-col>
        <b-col class="col-9">
          <b-skeleton
            animation="wave"
            width="100%"
            height="100%"
            style="background: #eaecee; border-raduis: 15px"
          ></b-skeleton>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'
import Withdrawal from '../../components/sections/modals/Withdrawal.vue'
import Refund from '../../components/sections/modals/Refund.vue'
import Drawer from '../../components/sections/modals/Drawer.vue'
import Tables from '../../components/sections/modals/Tables.vue'
import SaleReceipt from '../../components/sections/modals/SaleReceipt.vue'
import Variations from '../../components/sections/modals/Variations.vue'
import Customer from '../../components/sections/modals/Customer.vue'
// import GoogleMap from '@/components/global/GoogleMap.vue'

import PaginationComponent from '@/components/global/PaginationComponent.vue'

import moment from 'moment'
import axios from 'axios'

Vue.use(VueGeolocation)
export default {
  name: 'AppCashier',
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'language',
    'permissions',
    'online',
    'sideMenu',
    'settings',
  ],
  data() {
    return {
      filterProducts: [],
      main_account: '',
      Today: localStorage.getItem('Today'),

      allItemData: null,
      selectProducts: [],
      test: '',
      searchObject: '',

      fmessage: '',
      alertType: 'success',
      filters: {
        page: 1,
      },
      categories: [],
      category: 0,
      products: [],
      productsList: [],
      strings: [],
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',

      categories_next_page: 0,
      categories_prev_page: 0,
      categories_current_page: 0,
      categories_next_page_url: '',
      categories_prev_page_url: '',
      categories_first_page_url: '',
      categories_last_page_url: '',

      paginateTotal: 0,
      loaded: false,
      keyword: null,
      barcode: '',
      showVariations: 0,
      order: [],
      variationsLoaded: 0,
      paymentMethods: [],
      paymentTypes: [],
      payment_type: '',
      showPMethod: false,
      pMethod: '',
      discounts: [],
      extraDiscounts: [],
      showDiscounts: 0,
      showReceipt: 0,
      invoiceID: 0,
      cashierLoaded: false,
      loadingInvoice: false,
      showWithdrawalForm: 0,
      showDrawerForm: 0,
      withdrawal: {},
      evaluatedLoaded: false,
      drawer: {},
      refund: [],
      invoice: {},
      showRefundForm: 0,
      showCustomerDetails: 0,
      customer: {},
      payment_in_arrear: 0,
      tables: [],
      subcategories: [],
      ShowTables: 0,
      table_id: 0,
      lockOrder: 0,
      paid: '',
      unpaid: '',
      qr: '',
      discount_amount: 0,
      discountsId: [],
      pushed: false,
      tabs: [
        {
          tab_index: 0,
          order: [],
          taxes: [],
          discounts: [],
          extraDiscounts: [],
          showCustomerDetails: 0,
          customer: {},
          payment_in_arrear: 0,
          table_id: 0,
          lockOrder: 0,
          creation_time: Date.now(),
          showOrderDueDate: 0,
          due_date: '',
          showPMethod: 0,
        },
      ],
      costNewBeforeDiscount: 0,
      current_tab_index: 0,
      reloadAlert: false,
      isOnline: true,
      isOffline: false,
      savedCusomerWhileOffline: false,
      offlineOrders: [],
      submittingOfflineOrders: false,
      submittingOfflineOrdersIndex: 0,
      OnlineInterval: null,
      longitude: '31.436267848000522',
      latitude: '30.999147391047117',
      customEvents: [
        { eventName: 'cashier-set-table', callback: this.setTable },
        { eventName: 'cashier-table-checkout', callback: this.checkout },
        { eventName: 'close-cashier-receipt-modal', callback: this.closeOrder },
        { eventName: 'update-order', callback: this.updateOrder },
        { eventName: 'cashier-set-customer', callback: this.setCustomer },
        { eventName: 'open-customers-modal', callback: this.setCustomer },
      ],
      showOrderDueDate: false,
      due_date: '',
      quantInput: 0,
      costNew: 0,
      total: 0,
      totalTax: 0,
      totalDiscounts: 0,
      filterdProducts: [],
      categoryObject: '',
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
    setTimeout(() => {
      this.cashierLoaded = true
    }, 3000)

    window.scrollTo(0, 0)

    this.getProducts()
    this.getDiscounts()
    this.getCategories()
    this.getProfile()

    let th = this
    // SubmitOfflineOrders
    $(document).on('click', '.submit-offline-link', function () {
      th.submittingOfflineOrders = true
      for (
        let o = th.submittingOfflineOrdersIndex;
        o < th.offlineOrders.length;
        o++
      ) {
        th.order = th.offlineOrders[o].items
        th.taxes = th.offlineOrders[o].taxes
        th.customer.id = th.offlineOrders[o].customer_id
        th.customer.customer_name = th.offlineOrders[o].customer_name
        th.customer.customer_phone = th.offlineOrders[o].customer_phone
        th.paid = th.offlineOrders[o].paid_amount
        th.unpaid = th.offlineOrders[o].remaining_amount
        th.payment_type = th.offlineOrders[o].payment_type
        th.extraDiscounts = th.offlineOrders[o].discounts.filter(
          x => x.scheduled == 0
        )
        th.submitOrder(
          th.offlineOrders[o].payment_method,
          th.offlineOrders[o].payment_type
        )
        return false
      }
    })

    this.OnlineInterval = setInterval(() => this.updateOnlineStatus(), 0.001)
  },
  components: {
    Withdrawal,
    Refund,
    Drawer,
    Tables,
    SaleReceipt,
    Variations,
    Customer,
    PaginationComponent,
    // GoogleMap,
  },
  computed: {
    orderSubTotal() {
      // (price - discount amount) * quantity
      if (this.order.length) {
        let total = 0
        for (let i = 0; i < this.order.length; i++) {
          this.order[i].price = parseFloat(this.order[i].price) || 0
          this.order[i].subtotal =
            parseFloat(
              this.order[i].price -
                parseFloat(this.order[i].discount_amount) *
                  parseInt(this.order[i].quantity)
            ).toFixed(2) || 0

          total = total + this.order[i].subtotal
          // total = parseFloat(total).toFixed(2);
        }
        return parseFloat(total).toFixed(2)
      }
      return 0
    },

    orderTotal() {
      let taxes = 0
      let discs = 0
      let extraDiscs = 0
      if (this.order.length) {
        if (this.discounts.length) {
          for (let i = 0; i < this.discounts.length; i++) {
            if (!this.discounts[i].scheduled) continue
            let q = parseFloat(this.discounts[i].value)
            if (this.discounts[i].type == 'percentage') {
              q =
                (parseFloat(this.discounts[i].value) / 100) * this.orderSubTotal
            }
            this.discounts[i].subtotal = q
            discs = parseFloat(discs) + q
          }
        }
        if (this.extraDiscounts.length) {
          for (let i = 0; i < this.extraDiscounts.length; i++) {
            let q = parseFloat(this.extraDiscounts[i].value)

            if (this.extraDiscounts[i].type == 'percentage') {
              q =
                (parseFloat(this.extraDiscounts[i].value) / 100) *
                this.orderSubTotal
            }
            this.extraDiscounts[i].subtotal = q
            extraDiscs = parseFloat(extraDiscs) + q
          }
        }
      }
      this.discount_amount = parseFloat(extraDiscs).toFixed(2)

      let result =
        parseFloat(this.orderSubTotal) +
        parseFloat(this.totalTax - discs - extraDiscs)
      return result
    },
    today() {
      return moment().format('YYYY-MM-DD')
    },
  },
  beforeDestroy() {
    this.saveTab()
    this.updateOnlineStatus()
    if (this.isOffline) {
      this.fmessage = this.trans(
        'you will lose every saved order if you change the page'
      )
      return
    } else {
      if (this.submittingOfflineOrders) {
        this.fmessage = this.trans(
          'you will lose every saved order if you change the page'
        )
        return
      }
    }
    clearInterval(this.OnlineInterval)
  },
  methods: {
    updateDiscountValues(index, type) {
      if (type === 'percentage') {
        if (this.order[index].discount_percentage <= 0) {
          this.order[index].discount_amount = 0
          this.order[index].discount_percentage = 0
        } else {
          this.order[index].discount_amount =
            parseFloat(this.order[index].price) *
            parseFloat(this.order[index].discount_percentage / 100).toFixed(2)
        }
      }
      if (type === 'fixed') {
        if (this.order[index].discount_amount <= 0) {
          this.order[index].discount_amount = 0
          this.order[index].discount_percentage = 0
        } else {
          this.order[index].discount_percentage = (
            (parseFloat(this.order[index].discount_amount) /
              parseFloat(this.order[index].price)) *
            100
          ).toFixed(2)
        }
      }
    },
    getTotal(index, remove = false) {
      if (!remove) {
        //السعر بعد الخصم
        if (this.order[index].discount_percentage) {
          this.order[index].price_after_discount = parseFloat(
            parseFloat(this.order[index].price) -
              parseFloat(
                parseFloat(this.order[index].price) *
                  parseFloat(this.order[index].discount_percentage / 100)
              ).toFixed(2)
          ).toFixed(2)
        } else {
          this.order[index].price_after_discount = this.order[index].price
        }

        //السعر بعد الضريبه
        this.order[index].tax_after_price = parseFloat(
          parseFloat(this.order[index].price_after_discount) *
            parseFloat(parseInt(this.order[index].tax_percentage) / 100) +
            parseFloat(this.order[index].price_after_discount)
        ).toFixed(2)

        //اجمالي الصف
        this.order[index].subtotal = parseFloat(
          parseFloat(this.order[index].tax_after_price) *
            parseInt(this.order[index].quantity)
        ).toFixed(2)

        //يضاف ضريبة القيمة المضافة
        this.order[index].product_tax = (
          parseFloat(this.order[index].tax_percentage / 100) *
          parseFloat(this.order[index].price_after_discount) *
          parseInt(this.order[index].quantity)
        ).toFixed(2)

        // Total Done
        this.order[index].total = parseFloat(
          parseFloat(this.order[index].subtotal) +
            parseFloat(this.order[index].subtotal) *
              (this.order[index].tax_percentage / 100)
        ).toFixed(2)
      }
      this.calculateTotals()
    },
    calculateTotals() {
      let totalValueBeforeDiscount = 0
      let totalValue = 0
      let totalTax = 0
      let totalTaxValue = 0
      let totalFinal = 0

      //grouping tax
      let itemsData = _.chain(this.order)
        .groupBy('tax_percentage')
        .map((value, key) => ({ tax: key, grouped: value }))
        .value()

      if (itemsData) {
        itemsData.map(item => {
          let s = 0
          item.grouped.map(subItem => {
            subItem['valueAfterDiscount'] =
              parseInt(subItem.quantity) *
              parseFloat(subItem.price_after_discount).toFixed(2)
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
            parseFloat(totalTaxValue) +
            (item['tax'] / 100) * item['totalValuesAfterDiscount']
          totalFinal = parseFloat(totalFinal) + item['totalValuesAfterDiscount']
          item.grouped.map(subItem => {
            totalValueBeforeDiscount = parseFloat(
              parseFloat(totalValueBeforeDiscount) +
                parseFloat(
                  parseInt(subItem.quantity) * parseFloat(subItem.price)
                )
            ).toFixed(2)

            if (subItem.discount_amount) {
              totalTax =
                parseFloat(totalTax) +
                parseInt(subItem.quantity) *
                  parseFloat(subItem.discount_amount).toFixed(2)
            }
            item['taxValue'] =
              (item.tax / 100) * item['totalValuesAfterDiscount']
          })
        })
      }

      this.costNew = this.costNewBeforeDiscount - this.totalDiscounts
      // this.costNew = totalValue
      this.costNewBeforeDiscount = totalValueBeforeDiscount
      this.totalDiscounts = totalTax
      this.totalTax = totalTaxValue
      totalFinal = totalFinal + totalTaxValue

      if (this.extraDiscounts.length) {
        for (let i = 0; i < this.extraDiscounts.length; i++) {
          let q = parseFloat(this.extraDiscounts[i].value)
          if (this.extraDiscounts[i].type === 'percentage') {
            itemsData.map(item => {
              q =
                (parseFloat(this.extraDiscounts[i].value) / 100) *
                item['totalValuesAfterDiscount']
            })
            this.extraDiscounts[i].subtotal = q
          }
        }
      }

      this.costNew = this.costNewBeforeDiscount - this.totalDiscounts

      this.costNewBeforeDiscount = totalValueBeforeDiscount
      this.totalDiscounts = totalTax
      this.totalTax = totalTaxValue
      this.total = totalFinal
      this.allItemData = itemsData

      // this.order.discount_amount = parseFloat(totalTax).toFixed(2)
    },

    addGlobalDiscount() {
      if (this.order.length) {
        for (let x = 0; x < this.order.length; x++) {
          if (this.extraDiscounts.length) {
            for (let i = 0; i < this.extraDiscounts.length; i++) {
              let q = parseFloat(this.extraDiscounts[i].value)
              if (this.extraDiscounts[i].type === 'percentage') {
                this.order[x].discount_percentage = q
                this.order[x].discount_amount =
                  parseFloat(this.order[x].price) *
                  parseFloat(this.order[x].discount_percentage / 100).toFixed(2)
              }
              if (this.extraDiscounts[i].type === 'fixed') {
                this.order[x].discount_percentage = (
                  (q / this.costNewBeforeDiscount) *
                  100
                ).toFixed(2)

                this.order[x].discount_amount =
                  parseFloat(this.order[x].price) *
                  (this.order[x].discount_percentage / 100)
              }
            }
          } else {
            this.order[x].discount_percentage =
              this.order[x].discount_percentage ?? 0
            this.order[x].discount_amount = this.order[x].discount_amount ?? 0
          }
          if (this.extraDiscounts.length > 1) {
            this.extraDiscounts.shift()
          }

          this.getTotal(x)
        }
      }
    },

    spliceText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength)
      } else {
        return text
      }
    },
    getSetting(key) {
      const result = this.settings.find(el => {
        if (el.key === key) {
          return el.value
        }
      })
      return result.value
    },
    reset() {
      this.usingFilters = false
      this.filters = {
        page: 1,
        category_id: [],
      }
      this.getProducts()
    },
    filter() {
      if (this.categoryObject.length > 0) {
        for (let i = 0; i < this.categoryObject.length; i++) {
          this.filters.category_id.push(this.categoryObject[i].id)
        }
      }
      // this.usingFilters = true
      this.getProducts()
    },
    getProfile() {
      axios
        .get('/api/profile')
        .then(res => {
          this.main_account = res.data.body.user.inventory.account
        })
        .catch(error => {})
    },

    setPlace(place) {
      this.customer.longitude = place.lng
      this.customer.latitude = place.lat
    },
    openMenu() {
      let sideMenuState = !this.sideMenu
      this.$emit('sideMenu', sideMenuState)
    },
    refresh(url = '/api/cashier') {
      if (localStorage.getItem('tabs')) {
        this.tabs = JSON.parse(localStorage.getItem('tabs'))
        this.current_tab_index = parseInt(
          localStorage.getItem('current_tab_index')
        )
      }

      this.update_tab_index()
      if (!this.order.length && this.tabs.length < 2) {
        this.tabs[0].creation_time = Date.now()
      }

      if (this.current_tab_index > this.tabs.length - 1) {
        this.current_tab_index = 0
      }
      if (localStorage.getItem('offlineOrders')) {
        this.offlineOrders = JSON.parse(localStorage.getItem('offlineOrders'))
      }
      if (localStorage.getItem('longitude')) {
        this.longitude = localStorage.getItem('longitude')
        this.latitude = localStorage.getItem('latitude')
      } else {
        this.setLocation()
      }

      this.order = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).order
      this.discounts = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).discounts
      this.extraDiscounts = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).extraDiscounts
      if (this.tabs.find(x => x.tab_index == this.current_tab_index).customer) {
        this.customer = this.tabs.find(
          x => x.tab_index == this.current_tab_index
        ).customer
      }

      this.payment_in_arrear = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).payment_in_arrear
      this.table_id = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).table_id
      this.lockOrder = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).lockOrder
      this.showPMethod = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).showPMethod
      this.showOrderDueDate = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).showOrderDueDate
      this.due_date = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).due_date

      this.saveTab()
      axios
        .get(url)
        .then(res => {
          this.category = 0
          this.paymentTypes = res.data.body.payment_type

          this.productsList = res.data.body.productsList
          this.products.forEach((prod, idx) => {
            if (prod.has_attributes) {
            }
          })
          this.paymentMethods = res.data.body.payment_methods

          let all_cat = {
            id: 0,
            title: 'All',
            title_ar: 'الجميع',
            parent: 0,
          }
          this.categories.unshift(all_cat)
          this.user.language = res.data.body.language
          for (let index = 0; index < this.products.length; index++) {
            this.products[index].quant = 0
            let in_order = this.order.filter(x => {
              return x.item_id == this.products[index].id
            })
            if (in_order.length) {
              this.products[index].quant = in_order[0].quantity
              this.products[index].quantity =
                parseInt(this.products[index].quantity) -
                parseInt(in_order[0].quantity)
            }
          }
          this.paginateTotal = res.data.body.products.paginate.total
          this.current_page = res.data.body.products.paginate.current_page

          this.current_page = res.data.body.products.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.products.paginate.next_page_url
          this.prev_page_url = res.data.body.products.paginate.prev_page_url

          this.first_page_url = res.data.body.products.paginate.current_page

          this.last_page_url = res.data.body.products.paginate.last_page

          this.tables = res.data.body.tables.data

          this.loaded = true
          this.cashierLoaded = true
          this.updateOnlineStatus()
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    getProducts() {
      axios({
        method: 'GET',
        url: '/api/cashier/products',
        params: {
          search: this.filters.serial,

          page: this.filters.page,
        },
      })
        .then(res => {
          this.category = ''
          this.loaded = true

          this.test = res.data.body.products.data
          this.products = this.selectProducts = res.data.body.products.data
          this.paginate = res.data.body.products.paginate
          this.paginateTotal = res.data.body.products.paginate.total
          this.current_page = res.data.body.products.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.products.paginate.next_page_url
          this.prev_page_url = res.data.body.products.paginate.prev_page_url
          this.first_page_url = res.data.body.products.paginate.first_page_url
          this.last_page_url = res.data.body.products.paginate.last_page_url

          for (let i = 0; i < this.products.length; i++) {
            this.products[i].quantInput = 0
          }
          this.categoryObject = ''
          this.filters.category_id = []
        })
        .catch(err => {})
    },

    getDiscounts() {
      axios({
        method: 'GET',
        url: '/api/cashier/discounts',
      }).then(res => {
        this.discounts = res.data.body.discounts.data
      })
    },
    getCategories() {
      axios({
        method: 'get',
        url: '/api/cashier/product-categories',
      })
        .then(res => {
          this.categories = res.data.body.product_categories.data
          this.paginate = res.data.body.product_categories.paginate
          this.total = res.data.body.product_categories.paginate.total
          this.categories_current_page =
            res.data.body.product_categories.paginate.current_page
          this.categories_prev_page = this.current_page - 1
          this.categories_next_page = this.current_page + 1
          this.categories_last_page =
            res.data.body.product_categories.paginate.last_page
          this.categories_next_page_url =
            res.data.body.product_categories.paginate.next_page_url
          this.categories_prev_page_url =
            res.data.body.product_categories.paginate.prev_page_url
          this.categories_first_page_url =
            res.data.body.product_categories.paginate.first_page_url
          this.categories_last_page_url =
            res.data.body.product_categories.paginate.last_page_url
        })
        .catch(err => {
          console.log(err)
        })
    },
    goTo(url) {
      this.products = []

      let str = ''
      for (var key in this.filter) {
        if (this.filter[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.filter[key]
      }
      url = url.includes('?') ? url + '&' + str : url + '?' + str

      axios
        .get(url)
        .then(res => {
          this.products = res.data.body.products.data
          this.paginate = res.data.body.products.paginate
          this.paginateTotal = res.data.body.products.paginate.total
          this.current_page = res.data.body.products.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.products.paginate.next_page_url
          this.prev_page_url = res.data.body.products.paginate.prev_page_url
          this.first_page_url = res.data.body.products.paginate.first_page_url
          this.last_page_url = res.data.body.products.paginate.last_page_url
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,

            error.response.data.custom_code
          )
        })
    },

    goToCat(url) {
      console.log('url')
      console.log(url)
      this.categories = []

      let str = ''
      for (var key in this.filter) {
        if (this.filter[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.filter[key]
      }
      url = url.includes('?') ? url + '&' + str : url + '?' + str
      axios
        .get(url)
        .then(res => {
          this.categories = res.data.body.product_categories.data
          this.paginate = res.data.body.product_categories.paginate
          this.total = res.data.body.product_categories.paginate.total
          this.categories_current_page =
            res.data.body.product_categories.paginate.current_page
          this.categories_prev_page = this.current_page - 1
          this.categories_next_page = this.current_page + 1
          this.categories_last_page =
            res.data.body.product_categories.paginate.last_page
          this.categories_next_page_url =
            res.data.body.product_categories.paginate.next_page_url
          this.categories_prev_page_url =
            res.data.body.product_categories.paginate.prev_page_url
          this.categories_first_page_url =
            res.data.body.product_categories.paginate.first_page_url
          this.categories_last_page_url =
            res.data.body.product_categories.paginate.last_page_url
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,

            error.response.data.custom_code
          )
        })
    },

    updateOnlineStatus() {
      let reachable = this.online
      this.isOnline = reachable
      this.isOffline = !reachable
      if (this.isOffline) {
        this.fmessage = this.trans('you are offline')
        this.alertType = 'danger'
      } else {
        if (!this.submittingOfflineOrders) {
          if (this.fmessage == this.trans('you are offline')) {
            this.fmessage = ''
            this.alertType = 'info'
          }
          if (this.offlineOrders.length) {
            this.fmessage =
              '<span class="btn submit-offline-link btn-link">' +
              this.trans('you are back online') +
              '</span>'
            this.alertType = 'success'
          }
        }
      }
    },
    clearOrder() {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this order'), {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal',
        })
        .then(willDelete => {
          if (willDelete) {
            this.table_id = 0
            this.showReceipt = 0
            this.invoiceID = 0
            this.extraDiscounts = []
            this.discountsId = []
            this.showPMethod = false
            this.pMethod = ''

            this.order.forEach(item => {
              let pro_exists = this.products.filter(x => {
                return x.id == item.item_id
              })
              if (pro_exists[0]) {
                pro_exists[0].quantity =
                  pro_exists[0].quantity + pro_exists[0].quant
                pro_exists[0].quant = 0
              } else {
                this.products.forEach(product => {
                  if (product.variations) {
                    let var_exists = product.variations.filter(x => {
                      return x.serial == item.id
                    })
                    var_exists[0].quantity =
                      var_exists[0].quantity + var_exists[0].quant
                    var_exists[0].quant = 0
                  }
                })
              }
            })

            this.order = []
            this.refund = []
            this.invoice = {}
            this.showRefundForm = 0
            this.customer = {}
            this.fmessage = ''
            this.lockOrder = 0
            this.payment_in_arrear = 0
            this.showOrderDueDate = false
            this.due_date = ''

            for (let index = 0; index < this.products.length; index++) {
              this.products[index].quant = 0
            }

            if (this.table_id) {
              this.fmessage = "<i class='fa fa-spinner fa-spin'></i>"
              this.alertType = 'info'
              let data = {
                fields: [],
                busy: 0,
                table_id: this.table_id,
              }
              axios
                .post('/api/cashier/save-table', data)
                .then(res => {
                  if (res.data.success) {
                    this.fmessage = ''
                    this.tables = res.data.tables
                    this.table_id = 0
                  } else {
                    this.showToastError(
                      res.data.message,

                      res.data.custom_code
                    )
                  }
                })
                .catch(error => {
                  this.showToastError(
                    error.response.data.message,
                    error.response.data.custom_code
                  )
                })
            }
            this.updateCheckOut(this.order.length)
          }
        })
    },
    closeOrder() {
      this.showReceipt = 0
      this.invoiceID = 0
      this.extraDiscounts = []
      this.discountsId = []
      this.showPMethod = false
      this.pMethod = ''
      this.order = []
      this.refund = []

      this.invoice = {}
      this.showRefundForm = 0
      this.customer = {}
      this.payment_in_arrear = 0
      this.showOrderDueDate = false
      this.due_date = ''
      this.table_id = 0
      this.updateOnlineStatus()
      if (this.submittingOfflineOrders == true) {
        this.submittingOfflineOrdersIndex++
        let length = this.offlineOrders.length
        this.fmessage = this.trans('order was submitted successfully')
        this.fmessage +=
          '<span class="btn btn-link submit-offline-link" >' +
          '#' +
          parseInt(this.submittingOfflineOrdersIndex + 1) +
          ' of ' +
          length +
          '. Click to continue.</span>'
        this.alertType = 'success'
        this.reloadProducts()
      }
      if (this.isOffline) {
        this.reloadProducts()
      }
      this.saveTab()
      if (this.isOnline && this.submittingOfflineOrders !== true) {
      }
    },
    setTable(data) {
      let table = data.table
      let index = data.index
      this.table_id = table.id
      let filds = this.tables[index].fields
        ? this.tables[index].fields
        : this.order
      this.order = filds

      this.showPMethod = 0
      this.ShowTables = 0
      for (let index = 0; index < this.products.length; index++) {
        this.products[index].quant = 0
        let in_order = this.order.filter(x => {
          return x.item_id == this.products[index].id
        })
        if (in_order.length) {
          this.products[index].quant = in_order[0].quantity
          this.products[index].quantity =
            parseInt(this.products[index].quantity) -
            parseInt(in_order[0].quantity)
        }
      }
    },
    setCustomer(data) {
      if (data.customer != undefined) {
        this.customer = data.customer
        this.longitude = this.customer.latitude
        this.latitude = this.customer.longitude
      }
    },
    checkout(data) {
      this.setTable(data)
    },
    checkoutTableOrder() {
      this.showPMethod = true
      this.lockOrder = true
      this.payment_type = this.paymentTypes.full
    },
    saveTable() {
      if (!this.table_id) return
      this.fmessage = "<i class='fa fa-spinner fa-spin'></i>"
      this.alertType = 'info'
      let data = {
        fields: this.order,
        table_id: this.table_id,
        busy: true,
      }
      axios.post('/api/cashier/save-table', data).then(res => {
        if (res.data.status) {
          this.fmessage = ''
          this.tables = res.data.body.tables.data
          this.table_id = 0
          this.order = []
          for (let i = 0; i < this.products.length; i++) {
            this.products[i].quant = 0
          }
        } else {
          this.showToastError(res.data.message, error.response.data.custom_code)
        }
      })
    },

    selectdCategory(cat_id, cat) {
      this.category = cat_id

      if (cat_id > 0) {
        let current_cat = this.categories.filter(x => x.id == cat_id)[0]
        this.goTo('/api/products?category=' + cat_id)
        console.log(current_cat.child)
        if (cat.has_children) {
          axios({
            method: 'GET',
            url: '/api/product-categories?category_id=' + cat_id,
          }).then(res => {
            this.subcategories = res.data.body.categories.data
          })
        } else {
          this.subcategories = []
        }

        if (
          !this.categories.filter(
            x => x.parent == cat_id && x.id == parseInt(-cat_id)
          ).length
        ) {
          this.categories.unshift(back)
        }
      } else if (cat_id < 0) {
        this.category = 0
        this.categories = this.categories.filter(x => x.id != cat_id)
        this.goTo('/api/cashier')
      } else {
        this.goTo('/api/cashier')
      }
    },

    orderBank(method) {
      if (Object.keys(this.customer).length === 0) {
        this.openMenu()
        this.openCustomersModal()
      } else {
        return this.submitOrder(method)
      }
    },

    submitOrder(method) {
      let _this = this
      if (!this.order.length) return false

      let data = {
        items: this.order,
        subtotal: this.costNewBeforeDiscount,
        // subtotal: this.orderSubTotal,
        discounts: this.discountsId,
        total: this.total,
        // total: this.orderTotal,
        payment_method: method,
        treasury_account: this.main_account,
        payment_type: this.payment_type,
        customer_id: this.customer.id,
        customer: {},
        arrears: this.payment_in_arrear,
        due_date: this.due_date,
        discount_amount: this.totalDiscounts,
        tax_amount: this.totalTax,
        tax_percentage: (this.totalTax / this.costNew) * 100,
        invoice_date: this.Today,
      }

      if (data.payment_method == 'bank') {
        data.remaining_amount = this.total
      }
      if (data.payment_type == 'full') {
        data.paid_amount = this.total
        data.remaining_amount = 0
      } else {
        data.paid_amount = 0
        data.remaining_amount = this.total
      }
      if (Object.keys(_this.customer).length === 0) {
        data.customer.name = ''
        data.customer.phone = ''

        // this.openMenu()
        // this.openCustomersModal()
      } else {
        data.customer = this.customer
      }
      // if (this.longitude) {
      //   data.longitude = this.longitude.toString()
      //   data.latitude = this.latitude.toString()
      // } else {
      //   this.setLocation()
      //   data.longitude = this.longitude.toString()
      //   data.latitude = this.latitude.toString()
      // }

      if (this.table_id) {
        data.table_id = this.table_id
      }
      if (this.isOnline) {
        if (this.submittingOfflineOrders || this.savedCusomerWhileOffline) {
          if (!this.customer.name) {
            data.customer_phone = ''
            data.customer_name = ''
          } else {
            data.customer_phone = this.customer.phone
            data.customer_name = this.customer.name
          }
          data.offline = true
          if (this.offlineOrders[this.submittingOfflineOrdersIndex].table_id)
            data = this.offlineOrders[this.submittingOfflineOrdersIndex]
        }

        if (data && data.items.length > 1) {
          data.items.forEach(item => {
            console.log(_.get(item.unit, 'key'))
            item.unit_key = _.get(item.unit, 'key')
          })
        }
        this.openMenu()
        axios
          .post('/api/cashier/sales', data)

          .then(res => {
            // let invoiceData = {
            //   sale: data,
            //   settings: this.settings,
            //   language: this.language,
            //   user: this.user,
            //   strings: this.strings,
            //   has_refund: 1,
            //   refund: this.refund,
            //   refundSubtotal: this.refundSubtotal,
            //   refundTotal: this.refundTotal,
            //   qr: this.qr,
            // }

            if (res.data.status) {
              let invoiceData = {
                sale: res.data.body.invoice,
                settings: this.settings,
                user: res.data.body.invoice.user,
                cashierInvoice: true,
                has_refund: 0,
              }

              // eslint-disable-next-line no-undef
              SharedEvent.fire('open-sale-receipt-modal', invoiceData)

              this.showToastError(res.data.message, res.data.custom_code)
              this.lockOrder = 0
              // if (this.table_id) {
              //   this.tables = res.data.tables
              // }
              // this.lockOrder = 0
              // if (this.submittingOfflineOrders) {
              //   if (
              //     this.submittingOfflineOrdersIndex ===
              //     this.offlineOrders.length - 1
              //   ) {
              //     this.submittingOfflineOrders = false
              //     this.submittingOfflineOrdersIndex = 0
              //     this.offlineOrders = []
              //     localStorage.removeItem('offlineOrders')
              //     this.fmessage = this.trans(
              //       'All offline orders submitted successfully'
              //     )
              //     setTimeout(() => {
              //       this.fmessage = ''
              //       this.alertType = 'success'
              //     }, 5000)
              //   }
              // }

              // if (this.offlineOrders == []) {
              //   setTimeout(() => (this.fmessage = ''), 6000)
            }
            // } else {
            //   this.alertType = 'danger'
            //   this.fmessage = res.data.message
            //   setTimeout(() => {
            //     this.fmessage = ''
            //     this.alertType = 'success'
            //   }, 120000)
            //   this.loadingInvoice = false
            //   this.showReceipt = false
            // }
          })
          .catch(error => {
            this.showToastError(
              error.response.data.message,
              error.response.data.custom_code
            )
          })
      } else {
        let d = new Date().getTime()
        let order = {
          items: this.order,
          subtotal: this.orderSubTotal,
          discounts: this.discountsId,
          total: this.orderTotal,
          payment_method: method,
          payment_type: this.payment_type,
          customer_id: this.customer.id,
          customer_phone: this.customer.phone,
          customer_name: this.customer.name,
          arrears: this.payment_in_arrear,
          due_date: this.due_date,
        }
        if (order.payment_type == 'full') {
          order.paid_amount = this.orderTotal
          order.remaining_amount = 0
        } else {
          order.paid_amount = 0
          order.remaining_amount = this.orderTotal
        }
        this.offlineOrders.push(order)
        localStorage.setItem(
          'offlineOrders',
          JSON.stringify(this.offlineOrders)
        )
        this.invoiceID = 'offline-' + d
        this.loadingInvoice = false
        this.fmessage = ''
        this.paid = ''
        this.unpaid = ''
        this.payment_type = ''
        this.payment_in_arrear = 0
        this.sideMenu = false
        if (this.table_id) {
          let t = this.tables.filter(x => x.id == this.table_id)
          t.busy = 0
          t.fields = null
        }
        this.lockOrder = 0
        this.order = []
        this.showPMethod = false
        this.showOrderDueDate = false
        this.reloadProducts()
      }
      this.updateCheckOut(0)
    },
    submitPayment(type) {
      // this.updateMeta()
      this.submitPaymentType()
      this.payment_type = type
    },
    updateMeta() {
      if (!this.order.length) return false

      axios
        .get('/api/cashier/discounts')
        .then(res => {
          this.discounts = res.data.body.discounts.data
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    submitArrearsOrder() {
      this.discount_amount = this.totalDiscounts
      this.paid = parseFloat(this.total)
      this.unpaid = parseFloat(this.orderTotal) - this.paid
      this.payment_type = 'installment'
      this.payment_method = 'installment'

      if (Object.keys(this.customer).length === 0) {
        this.openMenu()
        this.openCustomersModal()
      } else if (this.customer.id == '1') {
        this.alertType = 'danger'
        this.fmessage = this.trans(
          'payment_in_arrears_not_allowed_to_this_customer'
        )
        return
      } else {
        this.payment_in_arrear = 1
        if (this.customer.arrears_max_time) {
          this.due_date = moment()
            .add(this.customer.arrears_max_time, 'days')
            .format('YYYY-MM-DD')
        } else {
          this.due_date = moment()
            .add(parseInt(this.settings.arrears_max_time), 'days')
            .format('YYYY-MM-DD')
        }
        this.showOrderDueDate = true
        this.lockOrder = true
      }
    },
    submitPaymentType() {
      if (this.payment_in_arrear) {
        this.submitOrder('cash')
      } else {
        this.showPMethod = true
      }
    },
    addDiscount(id) {
      this.discountsId.push(id)
      let disc = this.discounts.filter(x => {
        return x.id == id
      })[0]

      if (
        !this.extraDiscounts.filter(x => {
          return x.id == id
        }).length &&
        this.order.length
      ) {
        this.extraDiscounts.push(disc)
        for (let index = 0; index < disc.length; index++) {}
      }
      this.showDiscounts = 0
      this.addGlobalDiscount()
      this.calculateTotals()
    },
    removeDiscount(id, value) {
      this.order.map(el => {
        el['discount_amount'] = 0
        el['discount_percentage'] = 0
      })

      this.extraDiscounts = this.extraDiscounts.filter(x => {
        return x.id != id
      })
      this.discountsId = this.discountsId.filter(x => {
        return x != id
      })
      this.addGlobalDiscount()
      this.calculateTotals()
    },
    setLocation() {
      this.$getLocation({
        enableHighAccuracy: true,
      }).then(coordinates => {
        // this.longitude = coordinates.lat.toString()
        // this.latitude = coordinates.lng.toString()
        // localStorage.setItem('longitude', this.longitude)
        // localStorage.setItem('latitude', this.latitude)
      })
    },

    recordStockTotal(item, index) {
      $('.order-item-' + index).attr('readonly', false)
      this.order[index].stockTotal =
        parseInt(item.quantity) + parseInt(item.stock)
    },
    resetStockTotal(item, index) {
      $('.order-item-' + index).attr('readonly', true)
      this.order[index].stockTotal = null
    },
    orderUpdateQuant(item, index, $event) {
      if (item.quantity == '') {
        let pro_exists = this.products.filter(x => {
          return x.id == item.id
        })
        if (pro_exists[0]) {
          pro_exists[0].quantity = item.stockTotal
          pro_exists[0].unit = item.unit
          pro_exists[0].quant = 0
          this.order.splice(index, 1)
        } else {
          this.products.forEach(product => {
            if (product.variations) {
              let var_exists = product.variations.filter(x => {
                return x.serial == item.id
              })
              if (var_exists.length) {
                var_exists[0].quantity = item.stockTotal
                var_exists[0].quant = 0
                this.order.splice(index, 1)
              }
            }
          })
        }
        if (this.order.length == 0) {
          this.showPMethod = 0
          this.showOrderDueDate = false
          this.table_id = 0
        }
        return
      }
      if (this.lockOrder) return
      // resetting stock
      if (parseInt(item.quantity) > parseInt(item.stockTotal)) {
        this.order[index].quantity = item.stockTotal
        this.order[index].unit = item.unit
        this.order[index].stock =
          parseInt(item.stockTotal) - parseInt(item.quantity)
        this.order[index].subtotal =
          parseFloat(item.tax_after_price) *
          parseInt(this.order[index].quantity)
      } else if (parseInt(item.quantity) < 1) {
        this.order[index].quantity = 0
        this.order[index].unit = item.unit
        this.order[index].price_after_tax = parseInt(item.price_after_tax)
        this.order[index].stock = parseInt(item.stockTotal)
        this.order[index].subtotal =
          parseFloat(parseFloat(item.tax_after_price)) *
          parseInt(this.order[index].quantity)

        let pro_exists = this.products.filter(x => {
          return x.id == item.item_id
        })
        if (pro_exists.length) {
          pro_exists[0].quantity = this.order[index].stock
          pro_exists[0].quant = this.order[index].quantity
        }

        this.order = this.order.filter(x => {
          return x.item_id != item.item_id
        })
      } else {
        this.order[index].stock =
          parseInt(this.order[index].stockTotal) -
          parseInt(this.order[index].quantity)
        this.order[index].unit = item.unit
        this.order[index].subtotal =
          parseFloat(parseFloat(item.tax_after_price)) *
          parseInt(this.order[index].quantity)
        this.order[index].price_after_tax = parseInt(item.price_after_tax)
      }

      let pro_exists = this.products.filter(x => {
        return x.id == item.id
      })
      if (pro_exists.length) {
        pro_exists[0].quantity = this.order[index].stock
        pro_exists[0].quant = this.order[index].quantity
      }
      this.updateCheckOut(this.order.length)
      this.addGlobalDiscount()
      this.calculateTotals()
    },
    orderPlusQuant(item, index) {
      console.log(this.allItemData)
      if (this.lockOrder) return
      if (
        parseInt(this.order[index].stock) > 0 ||
        this.permissions.includes('sell_stock_zero')
      ) {
        this.order[index].quantity = parseInt(this.order[index].quantity) + 1
        this.order[index].stock = parseInt(this.order[index].stock) - 1
        this.order[index].product_tax =
          parseFloat(this.order[index].tax_percentage / 100) *
          parseFloat(this.order[index].price) *
          parseInt(this.order[index].quantity)
        this.order[index].subtotal =
          parseFloat(parseFloat(this.order[index].tax_after_price)) *
          parseInt(this.order[index].quantity)
        this.order[index].total =
          parseFloat(this.order[index].product_tax) +
          parseFloat(this.order[index].subtotal)
        let pro_exists = this.products.filter(x => {
          return x.id == item.item_id
        })
        if (pro_exists.length) {
          pro_exists[0].quant = this.order[index].quantity
          pro_exists[0].quantity--
        } else {
          this.products.forEach(product => {
            if (product.variations) {
              let var_exists = product.variations.filter(x => {
                return x.serial == item.id
              })
              if (var_exists.length) {
                var_exists[0].quantity--
                var_exists[0].quant = this.order[index].quantity
              }
            }
          })
        }
      }
      this.updateCheckOut(this.order.length)
      this.addGlobalDiscount()
      this.calculateTotals()
    },
    orderMinusQuant(item, index) {
      if (this.lockOrder) return
      this.order[index].quantity = parseInt(this.order[index].quantity) - 1
      this.order[index].stock = parseInt(this.order[index].stock) + 1

      let quant = this.order[index].quantity

      let pro_exists = this.products.filter(x => {
        return x.id == item.item_id
      })
      if (pro_exists.length) {
        pro_exists[0].quant = quant > 0 ? quant : 0
        pro_exists[0].quantity = parseInt(this.order[index].stock)
      } else {
        this.products.forEach(product => {
          if (product.variations) {
            let var_exists = product.variations.filter(x => {
              return x.serial == item.id
            })
            if (var_exists.length) {
              var_exists[0].quant = quant > 0 ? quant : 0
              var_exists[0].quantity = parseInt(this.order[index].stock)
            }
          }
        })
      }
      if (this.order[index].quantity > 0) {
        this.order[index].product_tax =
          parseFloat(this.order[index].tax_percentage / 100) *
          parseFloat(this.order[index].price) *
          parseInt(this.order[index].quantity)
        this.order[index].subtotal =
          parseFloat(parseFloat(this.order[index].tax_after_price)) *
          parseInt(this.order[index].quantity)
        this.order[index].total =
          parseFloat(this.order[index].product_tax) +
          parseFloat(this.order[index].subtotal)
      } else {
        this.order = this.order.filter(x => {
          return x.item_id != item.item_id
        })
      }
      this.updateCheckOut(this.order.length)
      this.addGlobalDiscount()
      this.calculateTotals()
    },
    increaseQuant(product, index) {
      console.log(product)
      let item = {
        item_id: product.id,
        unit: product.unit,
        title: product.title,

        price:
          product.sale_price && product.sale_price !== '0.00'
            ? product.sale_price
            : product.price,
        quantity: 1,
        stock: this.products[index].quantity,
        tax_percentage: product.tax,
        tax_amount:
          (product.tax /
            (product.sale_price_after_tax &&
            product.sale_price_after_tax !== '0.00'
              ? product.sale_price_after_tax
              : product.price_after_tax)) *
          100,
        price_after_tax:
          product.sale_price_after_tax &&
          product.sale_price_after_tax !== '0.00'
            ? product.sale_price_after_tax
            : product.price_after_tax,
        serial: product.serial,
        discount_percentage: 0,
        discount_amount: 0,
        tax_after_price:
          product.sale_price_after_tax &&
          product.sale_price_after_tax !== '0.00'
            ? product.sale_price_after_tax
            : product.price_after_tax,
        price_after_discount:
          product.sale_price && product.sale_price !== '0.00'
            ? product.sale_price
            : product.price,
        sale_price:
          product.sale_price && product.sale_price !== '0.00'
            ? product.sale_price
            : product.price,

        subtotal: product.price - product.discount_amount * product.quantity,

        //  product.tax_after_price * product.quantity,
        total:
          (product.price - product.discount_amount * product.quantity) *
          product.tax_percentage,
      }

      // Check if the item is already in the array
      const existingItem = this.order.find(el => el.item_id === product.id)

      if (existingItem) {
        // Increase the quantity of the existing item
        existingItem.quantity++
        product.quantity--

        existingItem.product_tax = parseFloat(
          parseFloat(existingItem.tax_percentage / 100) *
            parseFloat(existingItem.price) *
            parseInt(existingItem.quantity)
        ).toFixed(2)
        existingItem.stock--
        existingItem.subtotal = (
          parseFloat(parseFloat(existingItem.tax_after_price)) *
          parseInt(existingItem.quantity)
        ).toFixed(2)
        existingItem.total =
          parseFloat(existingItem.product_tax) +
          parseFloat(existingItem.subtotal)
      } else {
        // Push the new item to the array
        this.order.push(item)

        product.quantity--
      }
      this.updateCheckOut(this.order.length)
      this.addGlobalDiscount()
      this.calculateTotals()
    },
    updateQuant(product, index) {
      console.log(product)

      if (this.quantInput == '') {
        this.quantInput = 0
      }

      this.products[index].quantity =
        parseInt(product.quantity) + parseInt(product.quantity)
      this.products[index].quant = parseInt(this.quantInput)
      let item = this.order.filter(x => {
        return x.item_id == product.id
      })[0]

      // Set stock and quantity
      item.quantity = parseInt(product.quantity)

      this.products[index].quantity =
        parseInt(product.quantity) - parseInt(product.quantity)
      item.stock = this.products[index].quantity
      item.product_tax = (
        parseFloat(
          parseFloat(item.tax_percentage / 100) * parseFloat(item.price)
        ) * parseInt(item.quantity)
      ).toFixed(2)
      item.subtotal = (
        parseFloat(parseFloat(item.tax_after_price)) * parseInt(item.quantity)
      ).toFixed(2)
      if (item.quantity == 0) {
        this.order = this.order.filter(x => {
          return x.item_id != item.item_id
        })
      }

      this.updateCheckOut(this.order.length)
    },
    decreaseQuant(product, index) {
      if (this.lockOrder) return
      if (product.has_attributes) {
        this.showVariations = product.id
      } else {
        if (product.quantity > 0) {
          this.products[index].quant--
          this.products[index].quantity++

          let item = this.order.filter(x => {
            return x.item_id == product.id
          })[0]
          item.quantity--
          item.stock++
          item.product_tax = (
            parseFloat(
              parseFloat(item.tax_percentage / 100) * parseFloat(item.price)
            ) * parseInt(item.quantity)
          ).toFixed(2)
          item.subtotal = (
            parseFloat(parseFloat(item.tax_after_price)) *
            parseInt(item.quantity)
          ).toFixed(2)
          if (item.quantity == 0) {
            this.order = this.order.filter(x => {
              return x.item_id != item.item_id
            })
          }
        }
      }
      this.updateCheckOut(this.order.length)
    },
    reloadProducts() {
      for (let index = 0; index < this.products.length; index++) {
        this.products[index].quant = 0
        let in_order = this.order.filter(x => {
          return x.item_id == this.products[index].id
        })
        if (in_order.length) {
          this.products[index].quant = in_order[0].quantity
          this.products[index].quantity =
            parseInt(this.products[index].quantity) -
            parseInt(in_order[0].quantity)
        }
      }
    },
    saveTab() {
      this.tabs.filter(
        x => x.tab_index == this.current_tab_index
      )[0].tab_index = this.current_tab_index
      this.tabs.filter(x => x.tab_index == this.current_tab_index)[0].order =
        this.order

      this.tabs.filter(
        x => x.tab_index == this.current_tab_index
      )[0].discounts = this.discounts
      this.tabs.filter(
        x => x.tab_index == this.current_tab_index
      )[0].extraDiscounts = this.extraDiscounts
      this.tabs.filter(x => x.tab_index == this.current_tab_index)[0].customer =
        this.customer
      this.tabs.filter(
        x => x.tab_index == this.current_tab_index
      )[0].payment_in_arrear = this.payment_in_arrear
      this.tabs.filter(x => x.tab_index == this.current_tab_index)[0].table_id =
        this.table_id
      this.tabs.filter(
        x => x.tab_index == this.current_tab_index
      )[0].lockOrder = this.lockOrder
      this.tabs.filter(
        x => x.tab_index == this.current_tab_index
      )[0].showPMethod = this.showPMethod
      this.tabs.filter(
        x => x.tab_index == this.current_tab_index
      )[0].showOrderDueDate = this.showOrderDueDate
      this.tabs.filter(x => x.tab_index == this.current_tab_index)[0].due_date =
        this.due_date

      localStorage.setItem('tabs', JSON.stringify(this.tabs))
      localStorage.setItem('current_tab_index', this.current_tab_index)
    },
    alterTab(tab_index) {
      this.saveTab()
      this.current_tab_index = parseInt(tab_index)
      this.order = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).order
      this.discounts = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).discounts
      this.extraDiscounts = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).extraDiscounts
      this.customer = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).customer
      this.payment_in_arrear = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).payment_in_arrear
      this.table_id = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).table_id
      this.lockOrder = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).lockOrder
      this.showPMethod = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).showPMethod
      this.showOrderDueDate = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).showOrderDueDate
      this.due_date = this.tabs.find(
        x => x.tab_index == this.current_tab_index
      ).due_date

      this.saveTab()
      this.reloadProducts()
      this.updateCheckOut(this.order.length)
    },
    addTab() {
      let lastOne = {
        tab_index: this.tabs.length,
        order: [],
        taxes: [],
        discounts: [],
        extraDiscounts: [],
        discountsId: [],
        customer: {},
        payment_in_arrear: 0,
        table_id: 0,
        lockOrder: 0,
        creation_time: Date.now(),
        showPMethod: false,
        showOrderDueDate: false,
        due_date: '',
      }
      this.tabs.push(lastOne)
      this.update_tab_index()
      this.alterTab(this.tabs.length - 1)
    },
    removeTab(tab_index) {
      if (this.tabs.length > 1) {
        if (tab_index == this.current_tab_index) {
          this.current_tab_index =
            this.tabs.length - 1 == this.current_tab_index
              ? this.tabs.length - 2
              : 0
        } else {
          if (tab_index < this.current_tab_index && tab_index > 0) {
            this.current_tab_index = this.current_tab_index - 1
          }
        }
        this.tabs.splice(tab_index, 1)
        this.update_tab_index()
        localStorage.setItem('tabs', JSON.stringify(this.tabs))
        localStorage.setItem('current_tab_index', this.current_tab_index)
      }
    },
    update_tab_index() {
      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].tab_index = i
      }
    },
    hostReachable() {
      var xhr = new (window.ActiveXObject || XMLHttpRequest)(
        'Microsoft.XMLHTTP'
      )
      // Open new request as a HEAD to the root hostname with a random param to bust the cache
      xhr.open(
        'HEAD',
        '//' +
          window.location.hostname +
          '/api/test?rand=' +
          Math.floor((1 + Math.random()) * 0x10000),
        false
      )
      try {
        xhr.send()
        return xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)
      } catch (error) {
        return false
      }
    },
    formatTime(unix) {
      let d = new Date(unix)
      let h = (d.getHours() < 10 ? '0' : '') + d.getHours()
      let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
      return h + ':' + m
    },
    print_page() {
      window.print()
    },
    arrays_equal(a, b) {
      return !!a && !!b && !(a < b || b < a)
    },
    openWithdrawalModal() {
      let data = {
        strings: this.strings,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-withdrawal-modal', data)
    },
    openRefundModal() {
      let data = {
        strings: this.strings,
        language: this.user.language,
        paymentMethods: this.paymentMethods,
        settings: this.settings,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-refund-modal', data)
    },
    openDrawerModal() {
      let data = {
        strings: this.strings,
        language: this.user.language,
        settings: this.settings,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-drawer-modal', data)
    },
    openTablesModal() {
      let data = {
        strings: this.strings,
        language: this.user.language,
        settings: this.settings,
        tables: this.tables,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-tables-modal', data)
    },
    openVariationsModal(product, index) {
      if (this.lockOrder) return
      let data = {
        product: product,
        index: index,
        strings: this.strings,
        language: this.user.language,
        settings: this.settings,
        order: this.order,
        permissions: this.permissions,
        lockOrder: this.lockOrder,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-variations-modal', data)
    },
    updateOrder(order) {
      this.order = order
    },
    openCustomersModal() {
      let data = {
        settings: this.settings,
        permissions: this.permissions,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-customers-modal', data)
    },

    deleteTax(tax) {},
    isNumber(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    updateCheckOut(order) {
      this.$emit('orderItems', order)
    },
  },
}
</script>
<style>
.rtl .dropdown-menu,
[dir='rtl'] .dropdown-menu {
  top: 4px !important;
  left: 0px;
  transform: translate3d(0px, 50px, 0px) !important;
  min-width: 250px;
}
.table-checkout thead th {
  color: rgb(33, 37, 41) !important;
}
.content-wrapper {
  padding: 1px;
}

.cashier-wrapper {
  min-height: 80vh;
}

.categories {
  /* height: 100px; */
  width: 100%;
}

.categories-bar {
  white-space: nowrap;
  width: unset;
  height: 100%;
  background: linear-gradient(0deg, #f3f3f3, #e4e4e4, #ffffff);
  padding: 1px 0;
  border: 1px solid #a5a5a5;
  overflow-x: scroll;
}

.category {
  display: inline-block;
  width: 160px;
  height: 95%;
  margin: 3px;
  text-align: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.category .card-img-overlay {
  width: 100%;
  height: 100%;
  background: rgba(45, 45, 45, 0.7);
}

.category .category-text {
  color: #fff;
  text-shadow: 0 0 2px #000;
  font-size: 23px;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
}

.wrapper {
  width: 100%;
}

.pos-wrapper {
  min-height: calc(100vh - 165px);
}

.products-cont,
.point-of-sale {
  height: calc(100vh - 165px);
  display: inline-block;
}

.products-cont {
  width: 100%;
  background: #fff;
}

.point-of-sale {
  width: 28%;
  /*height: 100%;*/
  background: #ebebeb;
}

.point-of-sale table.table {
  background: #fff;
}

.products {
  width: 100%;
  background: #f0eeee;
  /*height: 100%;*/
}

.products .card-deck > .row {
  width: 100%;
}

.search-field {
  width: 50%;
  height: 100%;
  border: none;
  padding: 3px 20px;
  border-right: 1px solid #000;
  transition: 0.5s all ease;
}

.search-field:hover,
.search-field:active,
.search-field:focus {
  background: #ebebeb;
}

.products .product {
  overflow: hidden;
}

.product-img,
.product-content {
  display: inline-block;
}

.product-content {
  width: 100%;
  position: relative;
  height: 100%;
}

.product-img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 20px;
  right: 0;
  text-align: center;
}

.product-img img {
  max-height: 80px;
  width: auto;
  border: none;
}

.controls {
  display: block;
  width: 100%;
}

.clear {
  clear: both;
}

.product-txt {
  font-size: 12px;
  position: absolute;
  bottom: 0;
  padding: 4px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

.product-txt .product-cat {
  color: #a0a0a0;
  padding-left: 2px;
}

.product-desc {
  margin-bottom: 3px;
  position: absolute;
  bottom: -20px;
  display: none;
}

.product-controls {
  position: absolute;
  top: 0 !important;
  height: 10rem;
  right: 0;
  background: #00000073;
  left: 0;
  visibility: hidden;
  text-align: center;
  opacity: 0;
  -webkit-transition: 0.5s all ease;
  transition: 0.5s all ease;
  padding: 50px 0;
}

.product:hover .product-controls {
  visibility: visible;
  opacity: 0.9;
}

button.var-btn {
  margin-top: 25px;
}

.product-controls > span:first-child {
  display: block;
}

.quantity-field {
  border: none;
  width: 70% !important;
  text-align: center;
  background: white;
}

.btn.plus-btn,
.btn.minus-btn {
  background: #fff;
  color: #001a84;
  border: 1px solid #444;
  width: 30px;
  font-size: 12px;
  padding: 6px 3px;
}

.row.var {
  margin-left: 0;
}

.var-img,
.var-content {
  float: left;
  display: inline-block;
}

.var-img {
  width: 35%;
  padding-top: 25px;
  padding-left: 25px;
}

.var-img img {
  max-width: 100%;
  height: auto;
}

.var-content {
  width: 65%;
  padding: 22px 16px;
}

.var-attr {
  margin: 15px 0;
}

.color-opt,
.txt-opt {
  display: inline-block;
  height: 40px;
  cursor: pointer;
}

.color-opt {
  width: 40px;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  margin-bottom: -15px;
  margin-right: 10px;
}

.txt-opt {
  border: 1px solid #333;
  height: 28px;
  min-width: 28px;
  text-align: center;
  margin-right: 10px;
  margin-top: 15px;
}

.var-attr .selected {
  box-shadow: 1px 1px 3px #000;
  border: 2px solid #000;
  cursor: default;
}

.var-stock {
  margin: 25px 35px;
}

.var-content .product-controls {
  position: static;
  visibility: visible;
  opacity: 1;
  margin-left: 30px;
}

.price-box {
  position: absolute;
  top: -3px;
  right: 0;
  width: 100%;
  text-align: center;
}

.price-box .sale_price,
.price-box .price {
  display: inline-block;
}

.price-box .price:last-child {
  font-size: 12px;
  margin-top: -16px;
  background: #7f82ac;
  color: #fff;
  border-radius: 2px;
  padding: 0 6px;
  font-family: Helvetica, Verdana, Arial !important;
}

.price-box .price strike {
  font-size: 12px;
  color: #af0000;
  text-decoration: line-through;
}

.price-box .sale_price {
  font-size: 12px;
  margin-top: -16px;
  background: #7f82ac;
  color: #fff;
  border-radius: 2px;
  padding: 0 6px;
  font-family: Helvetica, Verdana, Arial !important;
}

.var .price-box {
  position: static;
  width: auto;
  text-align: left;
  padding-left: 36px;
}

.order-stock {
  opacity: 0;
  -webkit-transition: 0.5s all ease;
  -moz-transition: 0.5s all ease;
  -ms-transition: 0.5s all ease;
  -o-transition: 0.5s all ease;
  transition: 0.5s all ease;
}

.order-row:hover .order-stock {
  opacity: 1;
}

.pos-controls {
  background: #fff;
  display: block;
  width: 100%;
  height: 35px;
}

.pos-controls > button,
.pos-controls > .discount-trigger > button {
  background: #393939;
  border: 1px solid #393939;
  border-radius: 0;
  margin-right: 1px;
  float: left;
}

.order {
  height: calc(100% - 29px);
  position: relative;
  background: #fff;
}

.total-box {
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
  /*height: 150px;*/
  background: #fff;
  box-shadow: inset 0px 1px 5px #d2d2d2;
}

.total-row {
  display: flex;
  height: 50px;
}

.total-title,
.total-column {
  flex: auto;
}

.total-title {
  text-align: center;
  width: 30%;
  padding-top: 7px;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: 999;
}

.total-column {
  width: 70%;
  font-size: 29px;
  padding-top: 2px;
  font-weight: 999;
  text-align: right;
  padding-right: 20px;
}

.pay-row {
  height: 100px;
  width: 100%;
}

.pay-row .table-btns {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px !important;
}

.pay-row .table-btns .btn {
  flex: 0 0 auto;
  height: auto;
}

.btn-pay {
  width: 100%;
  height: 100%;
  border-radius: 0;
  font-weight: 999;
  font-size: 30px;
}

.discount-trigger {
  position: relative;
  display: inline-block;
  float: left;
}

.discounts-list {
  position: absolute;
  z-index: 500;
  top: 30px;
  box-shadow: 1px 1px 10px #999;
  width: 230px;
  left: 0px;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

.discounts-list li {
  cursor: pointer;
  background: #fff;
  border-bottom: 1px solid #999;
  padding: 8px 2px;
  -webkit-transition: 0.5s all ease;
  -moz-transition: 0.5s all ease;
  -ms-transition: 0.5s all ease;
  -o-transition: 0.5s all ease;
  transition: 0.5s all ease;
}

.discounts-list li:hover {
  background: #efefef;
}

.disc-row {
  background: #fdfdfd;
}

.payment-methods {
  width: 100%;
  height: 100%;
  display: flex;
}

.pmethod {
  width: 50%;
  font-size: 30px;
  padding-top: 25px;
  border: 1px solid #fff;
  color: #fff;
  background: #0f2990;
  cursor: pointer;
  -webkit-transition: 0.5s all ease;
  -moz-transition: 0.5s all ease;
  -ms-transition: 0.5s all ease;
  -o-transition: 0.5s all ease;
  transition: 0.5s all ease;
}

.pmethod:hover {
  background: #19d865;
}

.search-bar {
  display: flex;
}

.category.selected .card-img-overlay {
  background: rgba(26, 132, 0, 0.38);
}

/*
        Rtl Styles.
    */
.rtl .products .product {
  float: right;
}

.rtl .pos-wrapper {
  direction: rtl;
}

.rtl .products-cont,
.rtl .point-of-sale {
  float: right;
  direction: rtl;
}

.rtl .search-bar {
  text-align: right;
  direction: rtl;
}

.rtl .products .product,
.rtl .products .product * {
  direction: rtl;
}

.rtl .product-img,
.product-content {
  float: none;
}

.rtl .price-box {
  right: auto;
  left: 0;
}

.rtl .var-img,
.rtl .var-content {
  float: right;
}

.rtl .pos-controls > button,
.rtl .pos-controls > .discount-trigger > button {
  float: right;
}

.var .product-controls {
  text-align: right;
}

.rtl .var-img {
  padding-left: 10px;
  padding-right: 25px;
}

.rtl .var .price-box {
  text-align: right;
  padding-left: 0;
  padding-right: 36px;
}

.popup.receipt .popup-overlay {
  opacity: 1;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #d3d3d3;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #333;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

button.btn.btn-success.btn-pay {
  /*background: #fff;*/
  /*color: #000;*/
}

button.btn.btn-success.btn-pay:hover {
  /*background: #e8e8e8;*/
  /*color: #000;*/
}

.categories-bar {
  background: #d3d3d3;
}

.cashier .navbar.default-layout,
.cashier .navbar.default-layout .navbar-menu-wrapper,
.cashier .navbar.default-layout .navbar-brand-wrapper {
  color: #fff;
  background: #393939;
}

.cashier .navbar.default-layout .navbar-brand-wrapper,
.cashier .navbar.default-layout .navbar-menu-wrapper {
  height: 45px;
}

.cashier .navbar.fixed-top + .page-body-wrapper {
  padding-top: 44px;
}

.cashier .navbar.default-layout .navbar-brand-wrapper .navbar-brand {
  line-height: 36px;
}

.var .product-controls {
  background: transparent;
  text-align: left;
}

.tables-popup {
  position: absolute;
  background: #393939;
  width: 100%;
  height: 400px;
  z-index: 99;
  left: 0;
  right: 0;
  top: 177px;
  -webkit-transition: 0.5s all ease;
  -moz-transition: 0.5s all ease;
  -ms-transition: 0.5s all ease;
  -o-transition: 0.5s all ease;
  transition: 0.5s all ease;
  overflow-y: scroll;
  box-shadow: 1px 0px 10px #2f2c2c;
}

.tables-popup .tbl button {
  border-radius: 0;
  font-size: 15px;
}

.tbl {
  display: inline-block;
  float: left;
  width: 14%;
  color: #2f2e2e;
  text-align: center;
  background: #fff;
  padding: 15px;
  margin: 1.333333%;
  height: 110px;
  box-shadow: 1px 0px 5px #dadada;
}

.tbl:hover {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.tbl-txt {
  padding: 10px 0;
  font-size: 20px;
}

.table-declarmenet {
  background: #ebebeb;
  padding: 1px 13px;
}

.busy.tbl {
  background: #000;
  color: #fff;
}

.tables-popup .tbl button {
  border-radius: 0;
  font-size: 15px;
  display: inline-block;
  float: left;
}

.rtl .tables-popup .tbl {
  float: right;
}

.rtl .tables-popup .tbl button {
  float: right;
}

.rtl .discount-trigger {
  float: right;
}

.rtl .var .product-controls {
  direction: ltr;
}

.table-btns button {
  width: 50%;
  float: left;
  border-radius: 0;
  font-size: 23px;
  padding: 30px 5px;
}

.pos-controls button {
  font-size: 13px;
  padding-left: 8px;
  padding-right: 8px;
}

.btn-clear-order {
  width: 23px;
  padding: 3px 3px;
  float: right !important;
}

.rtl .btn-clear-order {
  float: left !important;
}

.list-inline li {
  display: inline-block;
}

nav.multi-tabs {
  width: 100%;
}

.multi-tabs ul {
  margin-bottom: 0;
}

.multi-tabs .tab {
  background: #888888;
  color: #fff;
  padding: 0px 8px;
  margin-right: 3px;
  margin-top: 2px;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  -webkit-transition: 0.5s all ease;
  -moz-transition: 0.5s all ease;
  -ms-transition: 0.5s all ease;
  -o-transition: 0.5s all ease;
  transition: 0.5s all ease;
}

.multi-tabs .tab:hover,
.multi-tabs .tab.current_tab {
  background: #d3d3d3;
  color: #000;
}

.multi-tabs .tab > span:first-child {
  padding: 0px 8px;
  display: inline-block;
  border-radius: 12px;
  margin-right: 2px;
}

.multi-tabs .tab.current_tab > span:first-child {
  background: #000;
  color: #fff;
}

.rtl .multi-tabs .tab > span:first-child {
  margin-right: 0;
  margin-left: 2px;
}

@media (max-width: 1100px) {
  .point-of-sale {
    width: 33%;
  }

  .products-cont {
    width: 100%;
  }
}

.card-img-top {
  height: 10rem;
  width: 10rem;
}

.delete-tax {
  cursor: pointer;
  color: #dc3545;
}

.cashier-btn .dropdown-toggle,
.cashier-btn:hover .dropdown-toggle {
  background: #f9f9f9 0% 0% no-repeat padding-box !important;
  border-radius: 10px !important;
  color: #000000 !important;
  border: none !important;
}

.cashier-btn .dropdown-toggle::after {
  color: #000000 !important;
}
</style>
<style scoped>
.products-section {
  background: #fff;
  border-radius: 18px 0 0 18px;
  padding-top: 40px;
  padding: 40px 15px 30px;
}

.cashier-btn,
.cashier-btn:hover {
  background: #f9f9f9 0% 0% no-repeat padding-box !important;
  border-radius: 10px !important;
  color: #000000 !important;
  border: none !important;
  padding: 15px 20px;
  text-align: start;
}

.cashier-btn.dropdown {
  padding: 1px 0;
}

.nav-tabs {
  border-bottom: none;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #495057;
  background-color: #fff;
  border-color: transparent;
  border-radius: 18px;
  box-shadow: 1px -3px 4px #0000001c;
}

.nav-tabs {
  background: #f9f9f9;
  border-radius: 18px 18px 0 0;
}

.nav-tabs .nav-link button {
  padding: 5px 6px !important;
  line-height: 1;
}

.categories-bar {
  background: transparent;
  border: none;
}

.products-card {
  background: transparent;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 18px 0 18px 18px;
}

img.category {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #f1f1f1;
  filter: grayscale(100);
}

.category-container {
  text-align: center;
}

img.category.selected,
img.category:hover {
  filter: grayscale(0);
}

.card-deck {
  margin: 0;
  padding: 15px 0;
}

.products-cont {
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.products {
  background-color: transparent;
}

.product {
  border-radius: 15px 15px 0 0;
  border: none;
  padding-top: 20px;
}

.product-cat {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #f1f1f1;
  padding: 2px 15px;
  border-radius: 18px;
}

.text-muted {
  font-weight: bold;
}

.product-controls {
  top: 40px;
}

.product img {
  width: auto;
  max-width: 100%;
  margin: 0 auto;
}

.product .card-body {
  padding: 0;
}

.product .card-title {
  padding-top: 15px;
}

.rtl .product .card-title .title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 0;
}
.product .card-title .title {
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
  margin-left: 0;
}
.product .card-title .price {
  font-size: 16px;
  text-align: end;
}
.product .card-title .price span {
  color: #3dc3d8;
}
.product .card-title .price del {
  color: #d8d8d8;
  margin-right: 10px;
}

.table-responsive {
  margin-top: 40px;
}

.table thead th {
  padding: 0;
  text-align: center;
  vertical-align: middle;
  height: 60px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.table tbody td {
  padding: 0;
  text-align: center;
  vertical-align: top;
  border-bottom: 2px solid #fff;
  padding: 30px 0;
}

.table tbody td .form-control {
  padding: 1px;
  width: 25px !important;
  height: 22px;
  border-radius: 50%;
  background: none;
  border: none;
  margin: 0 5px;
  color: #000;
}

.table tbody td .btn {
  padding: 1px;
  width: 25px !important;
  height: 22px;
  border-radius: 50%;
  background: #c2c2c2;
  border: none;
  margin: 0 3px;
  color: #fff;
}

/* .table tbody td .btn:hover ,
    .table tbody td .btn:focus {
        background: transparent;
    } */

.table tbody td .badge {
  padding: 5px 3px 5px;
  border-radius: 20px;
}

.table.table-striped tbody tr:nth-child(2n + 1) {
  background: transparent;
}

.total-cell {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.total-tbody {
  border-bottom: none !important;
}

.table-btns {
  border: none;
  padding: 0 20px;
}

.payment-methods {
  display: block;
}

.table-btns .btn,
.payment-methods .btn {
  flex: 0 0 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 30px;
}

.payment-methods .btn {
  display: block;
  width: 100%;
}

.table-btns .btn h3,
.payment-methods .btn h3 {
  font-size: 20px !important;
}

.btn-primary.btn-pay {
  background: #4d4c4c !important;
  border: 1px solid #4d4c4c !important;
}
.btn-success {
  background: #b6325f !important;
  border: 1px solid #b6325f !important;
}

.card-deck .card {
  flex: 0 0 41.666667%;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 2px 22px #0000000f !important;
  border-radius: 10px;
}

.card {
  border: none;
  border-radius: 0;
}

.cashier-responsive-times {
  display: none;
}

.no-tax {
  color: #fff;
  background: rgb(220, 53, 69);
  border-radius: 50%;
  padding: 5px;
}

.tooltip {
  z-index: 10000;
}

.cashier-responsive .table td,
.cashier-responsive .table th {
  white-space: normal;
}

.del-elements {
  float: left;
  margin: 4px 0 0 0;
  border-radius: 50px;
  font-size: 13px;
}

@media screen and (max-width: 991px) {
  .del-items {
    margin-top: 10px;
    padding: 0;
  }
  .cashier-responsive {
    position: fixed;
    top: 0;
    left: 0;
    right: 100%;
    bottom: 0;
    background: #1c45ef;
    overflow: scroll;
    z-index: 9999;
  }
  .cashier-responsive.ltr {
    right: 0;
    left: 100%;
  }

  .cashier-responsive-times {
    margin: 10px;
    display: block;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    z-index: 2;
  }

  .cashier-responsive.active {
    right: 0;
    transition: all 0.25s linear;
  }
  .cashier-responsive.active.ltr {
    left: 0;
  }

  .cashier-responsive .table thead th {
    border-top: none;
  }

  .cashier-responsive .table-responsive {
    margin-top: 0;
  }

  .cashier-responsive .table td,
  .cashier-responsive .table th,
  .cashier-responsive h6 {
    color: #000 !important;
    white-space: normal;
  }

  /* .cashier-responsive .table tbody td .form-control.price {
            color: #FFFFFF !important;
        } */

  .cashier-responsive .no-wrap td {
    white-space: nowrap;
    padding: 5px;
  }
}
@media screen and (max-width: 574px) {
  .card-deck .card {
    flex: 0 0 90%;
    margin-bottom: 15px;
  }
}
@media screen and (max-width: 374px) {
  .cashier-responsive .table tbody td .form-control {
    /* width: 100% !important; */
    margin: 5px 10px;
    border-radius: 15px;
  }
  .navbar.default-layout .navbar-brand-wrapper {
    width: 100px !important;
  }
  .navbar.default-layout .navbar-menu-wrapper {
    width: calc(100% - 100px) !important;
  }
}
.serial {
  background: #f1f1f1;
  padding: 0px 14px;
  border-radius: 18px;
  margin: 15px;
  width: max-content;
}
.res-display {
  display: none;
}

@media screen and (max-width: 767px) {
  .table-responsive {
    padding: 10px;
  }
  .cashier-responsive .table td {
    border: none;
    padding: 10px 0 10px;
  }
  .cashier-responsive .table .res-display td {
    border: none;
    padding: 0;
  }
  .res-hidden {
    display: none;
  }
  .res-display {
    display: table-row;
  }
  .res-display td {
  }
  .res-display td .card {
    background: #ffffff !important;
    border-radius: 9px;
    border: none !important;
    margin: 10px;
    text-align: right;
    font-size: 14px;
    letter-spacing: 0px;
    color: #060606;
    padding: 16px 10px 14px;
  }
  .res-display td .card p {
    font-size: 13px;
  }
  .res-display td .card i {
    font-weight: bold;
  }
  .res-display td .card .name {
    margin-bottom: 20px;
    font-size: 14px;
  }
  .res-display td .card .quantity input {
    display: inline-block;
  }
  .res-display td .card .quantity .badge {
    padding: 5px 3px;
    font-size: 10px;
  }
  .res-display td .card .quantity button {
    font-size: 8px;
    color: #000;
    width: 16px !important;
    height: 16px;
    box-shadow: 0px 3px 6px #3dc3d857;
    margin: 0;
    background: #f3f3f3;
  }
  .res-display td .card .quantity input {
    font-size: 8px;
    width: 16px !important;
    height: 16px;
    box-shadow: 0px 3px 6px #3dc3d857;
    margin: 0 3px;
  }
  .res-display td .card .price input {
    /* max-width: 150px; */
    background: transparent;
    padding: 0;
    margin: -5px 0 0;
    text-align: right;
    border-radius: 0;
    font-size: 0.875rem;
    line-height: 1px;
    color: #000 !important;
    display: inline-block;
    font-weight: bold;
    width: 150px !important;
  }
  .res-display td .card strong {
    margin: 0 9px;
  }
  .res-display td .card .total strong {
    min-width: 50px !important;
    display: inline-block;
    margin-right: 26px;
  }

  .res-display td .card .price:not(.form-control),
  .res-display td .card .total {
    border-top: 1px solid rgb(112, 112, 112, 0.05);
  }

  .res-display td .card p {
    padding: 6px 0;
    margin: 0;
  }
}

.table tbody + tbody {
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.table tbody tr:not(.res-display) td .form-control.price {
  width: auto !important;
  max-width: 100%;
  max-height: 100%;
  height: auto !important;
  background: transparent;
  color: #000;
  padding: 0;
  margin: -5px 0 0;
  text-align: center;
  border-radius: 0;
  font-size: 0.875rem;
  line-height: 1px;
  font-weight: 300;
}

.card-count {
  font-weight: bold;
  font-size: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding-right: 20px;
  overflow: hidden;
  color: #ffffff;
  background-image: linear-gradient(90deg, #fda5bd, #c01b1c);
  transition: all 0.3s ease;
  position: absolute;
  top: 10px;
  right: -20px;
}

.btn-pay h3 {
  padding-bottom: 0;
  border-bottom: none;
}
button:focus:not(:focus-visible) {
  outline: 0;
  box-shadow: none;
}
.vs__dropdown-menu {
  direction: rtl;
}
.vs__dropdown-toggle {
  border-radius: 20px !important;
}

.customer-card {
  border-radius: 13px;
  padding: 7px 17px;
  margin: 10px 0 !important;
  background: #fff;
  position: relative;
}
.close-card {
  position: absolute;
  background: #dc3545;
  top: -6px;
  left: -7px;
  padding: 6px 8px 2px;
  border-radius: 13px;
  color: #fff;
  font-size: 9px;
}

.cashier-map h4 {
  display: none;
}
.cashier-map input {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e8e8e8;
  border-radius: 13px;
}
.cashier-map .vue-map-container {
  height: 84px !important;
}
.dropdown-menu {
  width: 250px;
}

.disabledClass {
  pointer-events: none;
}
</style>
