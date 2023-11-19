<template>
  <div class="customers">
    <div class="">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card">
            <div
              class="card-header header-sm mb-3 d-flex justify-content-between align-items-center"
            >
              <h4
                class="card-title"
                v-if="user.language"
                v-text="trans('update_customers')"
              ></h4>

              <div class="dropdown">
                <GoBackButton />
              </div>
              <!-- <b-button variant="primary"> -->
              <!-- <router-link class="btn btn-success btn-md mb-1"
                                    to="/customers/add">
                                    <font-awesome-icon icon="fa-solid fa-circle-plus " />
                                </router-link> -->
              <!-- </b-button> -->
            </div>
          </div>
        </div>
      </div>

      <form action="">
        <div class="row">
          <div class="col-lg-6 col-12">
            <div class="user_info">
              <h3>{{ trans('customer_data') }}</h3>
              <form>
                <div class="form-group position-relative">
                  <label>
                    {{ trans('customer_name') }} (Ar)
                    <font-awesome-icon
                      style="font-size: 11px; color: #b50808"
                      icon="fa-solid fa-star-of-life"
                    />
                  </label>
                  <input
                    type="text"
                    v-model="items.translation.name.ar"
                    :placeholder="trans('enter_name')"
                  />
                </div>
                <div class="form-group position-relative">
                  <label>
                    {{ trans('customer_name') }} (En)
                    <font-awesome-icon
                      style="font-size: 11px; color: #b50808"
                      icon="fa-solid fa-star-of-life"
                    />
                  </label>
                  <input
                    type="text"
                    v-model="items.translation.name.en"
                    :placeholder="trans('enter_name')"
                  />
                </div>

                <b-form-group style="margin-bottom: 25px">
                  <label for="">{{ trans('main phone number') }}</label>

                  <vue-phone-number-input
                    :only-countries="['SA', 'EG']"
                    :countryCode="SA"
                    v-model="items.phone"
                    default-country-code="SA"
                    required
                    placeholder=""
                    length="10"
                    max-length="10"
                    @update="onCountryChange"
                  ></vue-phone-number-input>
                </b-form-group>
                <div class="form-group">
                  <label>{{ trans('Email') }}</label>
                  <input
                    type="email"
                    v-model="items.email"
                    placeholder="ADMIN@gmail.COM"
                  />
                </div>
                <div class="form-group">
                  <label>{{ trans('tax_num') }}</label>
                  <input
                    type="text"
                    v-model="items.tax_num"
                    placeholder="56325856325475"
                  />
                </div>
                <div class="form-group">
                  <label>{{ trans('max_installment') }}</label>
                  <input
                    type="text"
                    v-model="items.arrears_max_amount"
                    placeholder="500000"
                  />
                </div>
                <div class="form-group">
                  <label>{{ trans('max_installment_time') }}</label>
                  <input
                    type="text"
                    v-model="items.arrears_max_time"
                    placeholder="5"
                  />
                </div>
                <div class="form-group">
                  <label>{{ trans('website') }}</label>
                  <input
                    type="url"
                    v-model="items.website"
                    placeholder="www.domain.com"
                  />
                </div>
                <div class="form-group">
                  <label>{{ trans('status') }}</label>
                  <select v-model="items.active">
                    <option value="1">{{ trans('active') }}</option>
                    <option value="0">{{ trans('not_active') }}</option>
                  </select>
                </div>
                <div class="form-group check_box">
                  <label> {{ trans('customer_point') }}</label>
                  <input type="checkbox" />
                </div>
              </form>
            </div>
          </div>

          <div class="col-lg-6 col-12">
            <div class="row">
              <div class="col-12">
                <div class="user_info">
                  <h3>{{ trans('shipping Address') }}</h3>
                  <form>
                    <div class="form-group">
                      <label>{{ trans('street name') }}</label>
                      <input
                        type="text"
                        v-model="items.info.shipping_address.street_name"
                        :placeholder="trans('enter_st_name')"
                      />
                    </div>
                    <div class="form-group">
                      <label>{{ trans('city') }}</label>
                      <input
                        type="text"
                        v-model="items.info.shipping_address.city_name"
                        placeholder=" جدة"
                      />
                    </div>
                    <div class="form-group">
                      <label>{{ trans('region') }}</label>
                      <input
                        type="text"
                        v-model="items.info.shipping_address.region_name"
                        :placeholder="trans('enter_region_here')"
                      />
                    </div>
                    <div class="form-group">
                      <label>{{ trans('postal code') }} </label>
                      <input
                        type="text"
                        v-model="items.info.shipping_address.postal_code"
                        placeholder="523214"
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div class="col-12">
                <div class="user_info">
                  <h3>{{ trans('invoice_address') }}</h3>

                  <form>
                    <div class="form-group check_box">
                      <label>{{ trans('copy the shipping address') }}</label>
                      <input
                        type="checkbox"
                        v-model="check"
                        @click="toggleData"
                      />
                    </div>

                    <div class="form-group">
                      <label>{{ trans('street name') }}</label>
                      <input
                        type="text"
                        v-model="items.info.billing_address.street_name"
                        :placeholder="trans('enter_st_name')"
                      />
                    </div>
                    <div class="form-group">
                      <label>{{ trans('city') }}</label>
                      <input
                        type="text"
                        v-model="items.info.billing_address.city_name"
                        placeholder="جدة"
                      />
                    </div>
                    <div class="form-group">
                      <label>{{ trans('region') }}</label>
                      <input
                        type="text"
                        v-model="items.info.billing_address.region_name"
                        :placeholder="trans('enter_region_here')"
                      />
                    </div>
                    <div class="form-group">
                      <label>{{ trans('postal code') }} </label>
                      <input
                        type="text"
                        v-model="items.info.billing_address.postal_code"
                        placeholder="523214"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="user_info">
              <h3>{{ trans('attachments') }}</h3>
              <form>
                <div class="form-group upload">
                  <input type="file" name="" multiple />

                  <div class="content">
                    <img
                      src="@/assets/images/upload.png"
                      style="width: 100px; margin-bottom: 20px"
                      alt=""
                    />
                    <p>{{ trans('drag_files_here') }}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="btns">
            <button type="button" class="save">
              <span @click="update(items.id)">{{ trans('save') }}</span>
            </button>
            <button class="close">
              <span></span>
              <span>{{ trans('cancel') }}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'updateCustomers',
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'langs',
    'permissions',
  ],

  data() {
    return {
      check: false,

      countryCode: 'SA',
      items: {
        translation: {
          name: {
            ar: '',
            en: '',
          },
        },
        phone: '',
        tax_num: '',
        arrears_max_amount: '',
        arrears_max_time: '',
        address: '',
        available_contact: '',
        website: '',
        email: '',
        commercial_register_photo: '',
        active: 1,
        info: {
          shipping_address: {
            street_name: '',
            city_name: '',
            region_name: '',
            postal_code: '',
          },
          billing_address: {
            street_name: '',
            city_name: '',
            region_name: '',
            postal_code: '',
          },
        },
      },
    }
  },

  created() {
    this.getData()
  },

  methods: {
    onCountryChange(e) {
      this.countryCode = e.countryCode

      console.log(e)
    },
    toggleData() {
      if (!this.check && this.items.info) {
        this.items.info.billing_address.street_name =
          this.items.info.shipping_address.street_name
        this.items.info.billing_address.city_name =
          this.items.info.shipping_address.city_name
        this.items.info.billing_address.region_name =
          this.items.info.shipping_address.region_name
        this.items.info.billing_address.postal_code =
          this.items.info.shipping_address.postal_code
      } else {
        this.items.info.billing_address.street_name = ''
        this.items.info.billing_address.city_name = ''
        this.items.info.billing_address.region_name = ''
        this.items.info.billing_address.postal_code = ''
      }
    },

    getData() {
      axios
        .get(`api/customers/${this.$route.params.id}`)
        .then(res => {
          this.items = res.data.body.customer

          if (Object.keys(this.items.info).length <= 0) {
            this.items.info = {}
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    update(item) {
      let data = {
        name: {
          ar: this.items.translation.name.ar,
          en: this.items.translation.name.en,
        },

        email: this.items.email,
        phone:
          this.countryCode == 'SA'
            ? '+966 ' + this.items.phone
            : '+20 ' + this.items.phone,
        tax_num: this.items.tax_num,
        active: this.items.active,
        address: this.items.address,
        arrears_max_amount: this.items.arrears_max_amount,
        arrears_max_time: this.items.arrears_max_time,
        available_contact: this.items.available_contact,
        website: this.items.website,
        commercial_register_photo: this.items.commercial_register_photo,

        info: {
          shipping_address: {
            street_name: this.items.info.shipping_address.street_name,
            city_name: this.items.info.shipping_address.city_name,
            region_name: this.items.info.shipping_address.region_name,
            postal_code: this.items.info.shipping_address.postal_code,
          },

          billing_address: {
            street_name: this.items.info.billing_address.street_name,
            city_name: this.items.info.billing_address.city_name,
            region_name: this.items.info.billing_address.region_name,
            postal_code: this.items.info.billing_address.postal_code,
          },
        },
      }
      axios
        .post(`api/customers/update/${item}`, data)
        .then(response => {
          this.showToastError(response.data.message, response.data.custom_code)

          this.items = {
            translation: {
              name: {
                ar: '',
                en: '',
              },
            },
            phone: '',
            tax_num: '',
            arrears_max_amount: '',
            arrears_max_time: '',
            address: '',
            available_contact: '',
            website: '',
            email: '',
            commercial_register_photo: '',
            active: 1,
            info: {
              shipping_address: {
                street_name: '',
                city_name: '',
                region_name: '',
                postal_code: '',
              },
              billing_address: {
                street_name: '',
                city_name: '',
                region_name: '',
                postal_code: '',
              },
            },
          }

          this.$router.push({ path: '/customers' })
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

<style lang="scss" scoped>
.icon_star {
  position: absolute;
  top: 62px;
  right: 23px;
  font-size: 12px;
  color: red;
}

.name {
  border: 1px solid red !important;
  margin-bottom: 5px !important;
  text-indent: 40px !important;
}

.reuired {
  color: red;
  margin-inline-start: 20px;
}

.customers {
  height: 100% !important;

  form {
    width: 98%;
    margin: auto;
  }
}

.customers .card {
  margin-bottom: 30px;
}

.user_info {
  margin-bottom: 25px;

  h3 {
    color: #161616;
    font-size: 24px;
    padding: 11px 35px;
    background: #f9f9f9 0% 0% no-repeat padding-box;
    border: 1px solid #f9f9f9;
    border-radius: 22px 22px 0px 0px;
    margin-bottom: 0;
    font-weight: bold;
  }

  form {
    width: 100%;
    border: 1px solid #d9d6d6;
    border-radius: 0px 0px 22px 22px;
    padding: 40px 30px;

    .check_box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;

      input {
        width: 20px;
      }
    }

    label {
      color: #000000;
      font-size: 20px;
      margin-bottom: 18px;
    }

    input {
      width: 100%;
      height: 60px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #e2e2e2;
      border-radius: 58px;
      margin-bottom: 18px;
      text-indent: 23px;
      font-weight: 500;
      // color: #D1D1D1;

      &::placeholder {
        color: #d1d1d1;
      }
    }
  }

  .upload {
    position: relative;
    height: 200px;
    background: #f5fcff 0% 0% no-repeat padding-box;
    border: 2px dashed #80c7e6;
    text-align: center;
    padding-top: 40px;

    .content {
      // position: absolute;
      // top: 30%;
      // left: 2%;

      p {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 20px;
        color: #000;
        font-family: Arial;
      }
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      outline: none;
      opacity: 0;
    }
  }
}

.btns {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: auto;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 8px #0000000d;
    border-radius: 26px;
    width: 128px;
    height: 42px;
    font-size: 17px !important;
    outline: none;
    border: none;
  }

  button.save {
    background: transparent linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0%
      0% no-repeat padding-box;
    color: #ffffff;
  }

  button.close {
    background: #fff !important;
    border: 1px solid #137b97 !important;
    color: #137b97 !important;
  }
}
</style>

<style>
.user_info form input {
  border-radius: 5px !important;
}
.country-selector__label {
  display: none !important;
}

.country-selector__country-flag {
  top: 18px !important;
  left: 32px !important;
}
.country-selector.has-value .country-selector__input {
  padding-top: 0 !important;
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
  font-size: 18px;
  height: 50px !important;
}
.country-selector__input {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-left: 0 !important;
}

.input-tel__input:not(.no-country-selector) {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
#MazPhoneNumberInput-403_phone_number {
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
}
#MazPhoneNumberInput-23_phone_number::placeholder {
  opacity: 0 !important;
}

.input-tel__input {
  height: 50px !important;
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  box-shadow: none !important;
  border-color: #ccc !important ;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;

  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
}
.country-selector__input {
  border-color: #ccc !important;
  box-shadow: none !important;
}
.input-tel.has-value .input-tel__input {
  padding-top: 2px !important;
  font-size: 18px;
}

/* end phone number */
</style>
