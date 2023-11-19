<template>
  <div class="customers col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card">
            <div
              class="card-header header-sm mb-3 d-flex justify-content-between align-items-center"
            >
              <h4 class="card-title">{{ trans('show_customers') }}</h4>

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

      <form action="" class="">
        <div class="row">
          <div class="col-lg-6 col-12">
            <div class="user_info">
              <h3>{{ trans('customer data') }}</h3>
              <form>
                <div class="preview_data">
                  <span>{{ trans('customer name') }}</span> |
                  <span>{{ items.name }}</span>
                </div>

                <div class="preview_data">
                  <label> {{ trans('main contact') }}</label> |
                  <span>{{ items.phone }}</span>
                </div>

                <div class="preview_data">
                  <span>{{ trans('email') }} </span> |
                  <span>{{ items.email }}</span>
                </div>
                <div class="preview_data">
                  <span>{{ trans('tax_num') }} </span> |
                  <span>{{ items.tax_num }}</span>
                </div>
                <div class="preview_data">
                  <span>{{ trans('max_installment') }}</span> |
                  <span>{{ items.arrears_max_amount }}</span>
                </div>
                <div class="preview_data">
                  <span>{{ trans('max_installment_time') }}</span> |
                  <span>{{ items.arrears_max_time }}</span>
                </div>
                <div class="preview_data">
                  <span> {{ trans('website') }} </span> |
                  <span>{{ items.website }}</span>
                </div>
                <div class="preview_data">
                  <span>{{ trans('status') }}</span> |
                  <span v-if="items.active === true">{{
                    trans('active')
                  }}</span>
                  <span v-else>{{ trans('not_active') }}</span>
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
                    <div class="preview_data">
                      <span>{{ trans('street name') }} </span> |
                      <span>{{ items.street_name }}</span>
                    </div>
                    <div class="preview_data">
                      <span>{{ trans('city') }}</span> |
                      <span>{{ items.city_name }}</span>
                    </div>
                    <div class="preview_data">
                      <span>{{ trans('region') }}</span> |
                      <span>{{ items.region_name }}</span>
                    </div>
                    <div class="preview_data">
                      <span> {{ trans('postal code') }}</span> |
                      <span>{{ items.postal_code }}</span>
                    </div>
                  </form>
                </div>
              </div>

              <div class="col-12">
                <div class="user_info">
                  <h3>عنوان الفوترة</h3>

                  <form>
                    <div class="preview_data">
                      <span>{{ trans('street name') }} </span> |
                      <span>{{ items.street_name }}</span>
                    </div>
                    <div class="preview_data">
                      <span>{{ trans('city') }}</span> |
                      <span>{{ items.city_name }}</span>
                    </div>
                    <div class="preview_data">
                      <span>{{ trans('region') }}</span> |
                      <span>{{ items.region_name }}</span>
                    </div>
                    <div class="preview_data">
                      <span> {{ trans('postal code') }}</span> |
                      <span>{{ items.postal_code }}</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-12">
            <div class="user_info">
              <h3>{{ trans('attachments') }}</h3>

              <div
                class="box_image"
                v-if="items.commercial_register_photo.length"
              >
                <img
                  :src="items.commercial_register_photo"
                  alt="commercial_register_photo"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="btns">
            <b-button @click="$router.go(-1)" class="btn back">
              <span>{{ trans('back') }}</span>
              <font-awesome-icon icon="fa-solid fa-reply-all " />
            </b-button>
          </div>
        </div>
      </form>
    </div>
    <div class="card" v-else>
      <skeleton-loader />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

export default {
  components: { SkeletonLoader },
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

      items: [],
      loaded: false,
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    toggleData() {
      // console.log("ji")

      console.log(this.check)
      // this.check = true;

      if (!this.check) {
        this.items.info.billing_address.street_name =
          this.items.info.shipping_address.street_name
        this.items.info.billing_address.city_name =
          this.items.info.shipping_address.city_name
        this.items.info.billing_address.region_name =
          this.items.info.shipping_address.region_name
        this.items.info.billing_address.postal_code =
          this.items.info.shipping_address.postal_code
      } else {
        // console.log('hi')
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
          this.loaded = true

          this.items = res.data.body.customer
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    update(item) {
      // this.formData = new FormData();
      // this.formData.append("name", this.fileName);
      // name here is name is sent in api or name in input file here is ==> excel_file
      // this.formData.append("excel_file", this.$refs.file.files[0]);

      axios
        .post(`api/customers/update/${item}`, this.items)
        .then(response => {
          this.showToastError(response.data.message, response.data.custom_code)
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
.back {
  width: 160px;
  height: 42px;
  /* UI Properties */
  box-shadow: 0px 1px 8px #0000000d;
  border: 1px solid #137b97 !important;
  border-radius: 26px !important;
  outline: none;
  margin: auto;
  background-color: transparent;
  color: #137b97;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.customers form {
  width: 98%;
  margin: auto;
}

.box_image {
  padding: 13px 21px;
  background: #f6f6f6 0% 0% no-repeat padding-box;
  border: 2px solid #e5e5e5;
  border-radius: 17px;
  margin: 20px 0;

  img {
    object-fit: contain;
    width: 90px;
    height: 80px;
  }
}

.preview_data {
  gap: 16px;
  display: flex;
  // border: none;
  padding-bottom: 25px;
  margin-bottom: 33px;
  border-bottom: 1px solid #d9d6d6;

  span:first-child {
    color: #000000;
    font-size: 20px;
  }

  span:last-child {
    color: #000000;
    font-size: 18px;
  }
}

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
