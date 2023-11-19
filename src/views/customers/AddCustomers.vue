<template>
  <div class="customers">
    <div class="">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card">
            <div
              class="card-header header-sm mb-3 d-flex justify-content-between align-items-center"
              style="margin: 0 10px"
            >
              <h4 class="card-title">{{ trans('add_customers') }}</h4>

              <div class="dropdown">
                <go-back-button />
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

      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form action="" @submit.prevent="handleSubmit(submitForm)">
          <div class="row">
            <div class="col-lg-6 col-12">
              <div class="user_info">
                <h3>{{ trans('customer data') }}</h3>
                <form>
                  <ValidationProvider
                    rules="required|arabicLettersAndNumbersOnly"
                    v-slot="{ valid, errors }"
                    :name="trans('name') + '(AR)'"
                  >
                    <b-form-group>
                      <label for=""
                        >{{ trans('customer name') }} (AR)
                        <font-awesome-icon
                          style="font-size: 11px; color: #b50808"
                          icon="fa-solid fa-star-of-life"
                        />
                      </label>
                      <b-form-input
                        type="text"
                        v-model="content.translation.name.ar"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts arabic words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|englishLettersAndNumbersOnly"
                    v-slot="{ valid, errors }"
                    :name="trans('name') + '(EN)'"
                  >
                    <b-form-group>
                      <label for=""
                        >{{ trans('customer name') }} (EN)
                        <font-awesome-icon
                          style="font-size: 11px; color: #b50808"
                          icon="fa-solid fa-star-of-life"
                        />
                      </label>
                      <b-form-input
                        type="text"
                        v-model="content.translation.name.en"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <b-form-group style="margin-bottom: 25px">
                    <label for="">{{ trans('main phone number') }}</label>

                    <vue-phone-number-input
                      :only-countries="['SA', 'EG']"
                      :countryCode="SA"
                      v-model="content.phone"
                      default-country-code="SA"
                      required
                      placeholder=""
                      length="10"
                      max-length="10"
                      @update="onCountryChange"
                    ></vue-phone-number-input>
                  </b-form-group>

                  <b-form-group>
                    <label for="">{{ trans('email') }}</label>
                    <b-form-input
                      placeholder="ADMIN@gmail.COM"
                      type="email"
                      v-model="content.email"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group>
                    <label for=""> {{ trans('tax_number') }}</label>
                    <b-form-input
                      placeholder="56325856325475"
                      type="number"
                      v-model="content.tax_num"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group>
                    <label for="">{{
                      trans('the maximum amount for sale on credit')
                    }}</label>
                    <b-form-input
                      placeholder="500"
                      type="text"
                      v-model="content.arrears_max_amount"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group>
                    <label for="">{{
                      trans('the maximum term for the sale on credit')
                    }}</label>
                    <b-form-input
                      placeholder="56325856325475"
                      type="text"
                      v-model="content.arrears_max_time"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group>
                    <label for=""> {{ trans('website') }}</label>
                    <b-form-input
                      placeholder="www.domain.com"
                      type="url"
                      v-model="content.website"
                    >
                    </b-form-input>
                  </b-form-group>

                  <div class="form-group">
                    <label>{{ trans('status') }}</label>
                    <select v-model="content.active">
                      <option value="1">{{ trans('active') }}</option>
                      <option value="0">{{ trans('in-active') }}</option>
                    </select>
                  </div>

                  <div class="form-group check_box">
                    <label>{{ trans('point of sale client') }}</label>
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
                      <b-form-group>
                        <label for="">{{ trans('street name') }}</label>
                        <b-form-input
                          :placeholder="trans('street name')"
                          type="text"
                          v-model="content.info.shipping_address.street_name"
                        >
                        </b-form-input>
                      </b-form-group>

                      <b-form-group>
                        <label for="">{{ trans('city') }}</label>
                        <b-form-input
                          :placeholder="trans('city')"
                          type="text"
                          v-model="content.info.shipping_address.city_name"
                        >
                        </b-form-input>
                      </b-form-group>

                      <b-form-group>
                        <label for="">{{ trans('region') }}</label>
                        <b-form-input
                          :placeholder="trans('region')"
                          type="text"
                          v-model="content.info.shipping_address.region_name"
                        >
                        </b-form-input>
                      </b-form-group>

                      <b-form-group>
                        <label for="">{{ trans('postal code') }}</label>
                        <b-form-input
                          placeholder="444"
                          type="text"
                          v-model="content.info.shipping_address.postal_code"
                        >
                        </b-form-input>
                      </b-form-group>
                    </form>
                  </div>
                </div>

                <div class="col-12">
                  <div class="user_info">
                    <h3>{{ trans('billing address') }}</h3>

                    <form>
                      <div class="form-group check_box">
                        <label>{{ trans('copy the shipping address') }}</label>
                        <input
                          type="checkbox"
                          v-model="check"
                          @click="copyData"
                        />
                      </div>

                      <b-form-group>
                        <label for="">{{ trans('street name') }}</label>
                        <b-form-input
                          :placeholder="trans('street name')"
                          type="text"
                          v-model="content.info.billing_address.street_name"
                        >
                        </b-form-input>
                      </b-form-group>

                      <b-form-group>
                        <label for="">{{ trans('city') }}</label>
                        <b-form-input
                          :placeholder="trans('city')"
                          type="text"
                          v-model="content.info.billing_address.city_name"
                        >
                        </b-form-input>
                      </b-form-group>

                      <b-form-group>
                        <label for="">{{ trans('region') }}</label>
                        <b-form-input
                          :placeholder="trans('region')"
                          type="text"
                          v-model="content.info.billing_address.region_name"
                        >
                        </b-form-input>
                      </b-form-group>

                      <b-form-group>
                        <label for="">{{ trans('postal code') }}</label>
                        <b-form-input
                          placeholder="444"
                          type="text"
                          v-model="content.info.billing_address.postal_code"
                        >
                        </b-form-input>
                      </b-form-group>
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
                    <!-- multiple -->
                    <input
                      type="file"
                      id="uploadfiles"
                      ref="uploadfiles"
                      @change="handleFileUpload()"
                    />

                    <div class="content">
                      <img
                        src="@/assets/images/upload.png"
                        style="width: 100px; margin-bottom: 20px"
                        alt=""
                      />
                      <p>{{ trans('drag files here') }}</p>
                    </div>
                  </div>

                  <div class="contain_photo">
                    <img
                      style="width: 100px; height: 100px; object-fit: contain"
                      :src="imagePreview"
                      v-if="showPreview"
                    />

                    <a
                      :href="filePreview"
                      target="_blank"
                      class="file_image"
                      v-show="showFile"
                    >
                      <div class="d-flex flex-column">
                        <font-awesome-icon
                          style="font-size: 35px"
                          class="icon"
                          icon="fa-solid fa-file-pdf"
                        />
                        <!-- <img src="https://demo.7lpos.com/images/logo-big.png"
                                                style="width:100px;height:100px;object-fit:contain" alt="file image" /> -->
                        <span>
                          {{ fileName }}
                        </span>
                      </div>
                    </a>

                    <button
                      v-if="showPreview || showFile"
                      class="close position-relative"
                      type="button"
                      @click="cancelImage"
                    >
                      <font-awesome-icon
                        class="close_mark"
                        icon="fa-solid fa-xmark"
                      />
                    </button>

                    <!-- <div v-for="(image, key) in images" class="group_image">

                                            <font-awesome-icon @click="removeImage(key)" class="close position-relative"
                                                icon="fa-solid fa-xmark" />

                                            <img class="preview" ref="empty_after_upload"
                                                v-bind:ref="'image' + parseInt(key)"
                                                style="width:150px;height:150px;object-fit: contain;" />
                                            {{ image.name }}

                                        </div> -->
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="btns">
              <button type="submit" class="save">
                <span></span>
                <span>{{ trans('save') }}</span>
              </button>
              <button class="close">
                <span></span>
                <span>{{ trans('cancel') }}</span>
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import parsePhoneNumber from 'libphonenumber-js'
export default {
  name: 'addCustomers',
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
      countryCode: 'SA',
      showPreview: false,
      imagePreview: '',

      showFile: false,
      filePreview: '',
      fileName: '',

      filenames: [],
      selectedFile: [],
      images: [],

      check: false,

      content: {
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
  mounted() {
    this.content.phone.length = 10
  },

  methods: {
    onCountryChange(e) {
      this.countryCode = e.countryCode

      console.log(e)
    },
    copyData() {
      // this.check = true;

      if (!this.check) {
        this.content.info.billing_address.street_name =
          this.content.info.shipping_address.street_name
        this.content.info.billing_address.city_name =
          this.content.info.shipping_address.city_name
        this.content.info.billing_address.region_name =
          this.content.info.shipping_address.region_name
        this.content.info.billing_address.postal_code =
          this.content.info.shipping_address.postal_code
      } else {
        // console.log('hi')
        this.content.info.billing_address.street_name = ''
        this.content.info.billing_address.city_name = ''
        this.content.info.billing_address.region_name = ''
        this.content.info.billing_address.postal_code = ''
      }
    },

    // onFileChange(e) {
    //     let files = e.target.files || e.dataTransfer.files;
    //     if (!files.length)
    //         return;
    //     this.createImage(files[0]);
    // },
    // createImage(file) {
    //     var image = new Image();
    //     var reader = new FileReader();
    //     // var vm = this;
    //
    //     reader.onload = (e) => {
    //         this.content.commercial_register_photo = reader.result;
    //     };
    //     reader.readAsDataURL(file);
    // },

    submitForm() {
      let data = {
        name: {
          ar: this.content.translation.name.ar,
          en: this.content.translation.name.en,
        },

        email: this.content.email,
        phone:
          this.countryCode == 'SA'
            ? '+966 ' + this.content.phone
            : '+20 ' + this.content.phone,
        tax_num: this.content.tax_num,
        active: this.content.active,
        address: this.content.address,
        arrears_max_amount: this.content.arrears_max_amount,
        arrears_max_time: this.content.arrears_max_time,
        available_contact: this.content.available_contact,
        website: this.content.website,
        commercial_register_photo: this.content.commercial_register_photo,

        info: {
          shipping_address: {
            street_name: this.content.info.shipping_address.street_name,
            city_name: this.content.info.shipping_address.city_name,
            region_name: this.content.info.shipping_address.region_name,
            postal_code: this.content.info.shipping_address.postal_code,
          },

          billing_address: {
            street_name: this.content.info.billing_address.street_name,
            city_name: this.content.info.billing_address.city_name,
            region_name: this.content.info.billing_address.region_name,
            postal_code: this.content.info.billing_address.postal_code,
          },
        },
      }

      axios
        .post('api/customers', data)
        .then(response => {
          this.showToastError(response.data.message, response.data.custom_code)
          this.$refs.uploadfiles.value = null
          this.showPreview = false
          this.showFile = false
          ;(this.content = {
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
          }),
            this.$router.push('/customers')
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    handleFileUpload() {
      this.file = this.$refs.uploadfiles.files[0]
      let reader = new FileReader()
      if (
        ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'].includes(
          this.$refs.uploadfiles.files[0]['type']
        )
      ) {
        reader.onload = e => {
          this.showPreview = true
          this.imagePreview = reader.result
          this.content.commercial_register_photo = reader.result
          this.showFile = false
        }
        reader.readAsDataURL(this.$refs.uploadfiles.files[0])
      } else if (
        [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(this.$refs.uploadfiles.files[0]['type'])
      ) {
        reader.onload = e => {
          this.showFile = true
          this.filePreview = reader.result
          this.content.commercial_register_photo = reader.result
          this.fileName = this.$refs.uploadfiles.files[0]['name']
          this.showPreview = false
        }

        reader.readAsDataURL(this.$refs.uploadfiles.files[0])
      } else {
        console.log('new extension')
      }
    },

    // handleFileUpload() {
    //     // this.file = this.$refs.uploadfiles.files;
    //     let reader = new FileReader();
    //     reader.onload = (e) => {

    //         // for (var index = 0; index < this.$refs.uploadfiles.files.length; index++) {
    //         // this.formData.append("commercial_register_photo[]", files[index]);
    //         this.content.commercial_register_photo[index] = reader.result;
    //         // }

    //     };
    //     reader.readAsDataURL(this.$refs.uploadfiles.files);
    // },

    // onFileChange(e) {
    //     // var selectedFiles = e.target.files;
    //     // for (let i = 0; i < selectedFiles.length; i++) {
    //     //     this.images.push(selectedFiles[i]);
    //     // }

    //     // for (let i = 0; i < this.images.length; i++) {
    //     let reader = new FileReader(); //instantiate a new file reader
    //     reader.addEventListener('load', function () {
    //         this.$refs['image' + parseInt(i)][0].src = reader.result;
    //     }.bind(this), false);  //add event listener

    //     reader.readAsDataURL(this.images[i]);
    //     // }

    // },

    // removeImage(index) {
    //     console.log(this.images);
    //     this.images.splice(this.images.indexOf(index), 1);
    //     // this.onFileChange();
    //     console.log(this.images);
    // },

    cancelImage() {
      this.$refs.uploadfiles.value = null
      this.showPreview = false
      this.showFile = false
    },

    // uploadFile() {

    //     // var el = this;

    //     let formData = new FormData();

    //     // Read selected files
    //     var files = this.$refs.uploadfiles.files;
    //     console.log(this.$refs.uploadfiles.files)
    //     var totalfiles = this.$refs.uploadfiles.files.length;

    //     for (var index = 0; index < totalfiles; index++) {
    //         formData.append("files[]", files[index]);
    //     }

    //     axios.post('api/customers', formData).then((response) => {

    //         this.filenames = response.data;

    //         alert(this.filenames.length + " files is been uploaded.");

    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    // }
  },
}
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  top: -6px;
  right: -33px;
  background: red;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50px;
}

.contain_photo {
  margin: 40px 0 0;
  display: flex;
  justify-content: center;

  gap: 30px;

  .group_image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

  .user_info form input,
  .user_info .form-control {
    border-radius: 0 !important;
  }
}
</style>

<style>
.user_info .form-control {
  border-radius: 5px !important;
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
.country-selector__list {
  height: 150px !important;
  overflow: hidden !important;
}
#MazPhoneNumberInput-23_country_selector {
  padding: 0 27px;
}

/* end phone number */
</style>
