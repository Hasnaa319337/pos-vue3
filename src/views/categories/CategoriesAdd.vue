<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('CategoriesAdd') }}</h4>
          <div class="dropdown">
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
                      <b-img
                        :src="category.previewImage"
                        class="uploading-image"
                      />
                      <ValidationProvider
                        rules=""
                        v-slot="{ valid, errors }"
                        :name="trans('image')"
                      >
                        <input
                          style="display: block"
                          ref="image"
                          type="file"
                          accept="image/*"
                          @change="uploadImage($event)"
                          id="file-input"
                          :state="errors[0] ? false : valid ? true : null"
                        />
                        <span
                          class="hint"
                          style="
                            font-size: 15px;
                            margin-top: 9px;
                            display: block;
                          "
                        >
                          {{ trans('the system accepts') }}
                        </span>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts English words only') }}
                        </b-form-invalid-feedback>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col lg="6">
                      <ValidationProvider
                        rules="required|englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + 'en'"
                      >
                        <b-form-group :label="trans('title') + '(EN)'">
                          <b-form-input
                            type="text"
                            v-model="category.translation.title.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col lg="6">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + 'ar'"
                      >
                        <b-form-group :label="trans('title') + '(AR)'">
                          <b-form-input
                            type="text"
                            v-model="category.translation.title.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        rules="required|englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('description') + '(EN)'"
                      >
                        <b-form-group :label="trans('description') + '(EN)'">
                          <b-form-textarea
                            v-model="category.translation.description.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-textarea>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col>
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('description') + '(AR)'"
                      >
                        <b-form-group :label="trans('description') + '(AR)'">
                          <b-form-textarea
                            v-model="category.translation.description.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-textarea>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        :name="trans('parent')"
                        v-slot="{ valid, errors }"
                      >
                        <b-form-group :label="trans('parent')">
                          <b-form-select
                            v-model="category.parent_id"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option value>
                              {{ trans('no_parent') }}
                            </b-form-select-option>
                            <b-form-select-option
                              v-for="cat in categories"
                              :value="cat.id"
                              :key="cat.id"
                            >
                              <span
                                ><span v-if="cat.parent"
                                  >&nbsp; &nbsp;&nbsp; &nbsp;</span
                                >{{ cat.title }}</span
                              >
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row class="justify-content-center">
                    <b-button variant="success" type="submit"
                      ><font-awesome-icon icon="fa-solid fa-check "
                    /></b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<script>
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
export default {
  name: 'AppCategoriesAdd',
  props: ['section', 'sections', 'user', 'langs'],
  components: { SkeletonLoader },
  data() {
    return {
      categories: [],
      category: {
        translation: {
          title: {
            ar: '',
            en: '',
          },
          description: {
            ar: '',
            en: '',
          },
        },
        previewImage: null,
        parent_id: null,
      },

      strings: [],
      loaded: false,
      img: null,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },

  methods: {
    uploadImage(e) {
      this.img = e
      console.log(e)
    },

    refresh() {
      this.loaded = false
      axios
        .get('/api/product-categories/create')
        .then(res => {
          this.categories = res.data.body.categories
          this.loaded = true
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    store(e) {
      const file = this.$refs.image.files[0]
      const form = new FormData()
      form.append('image', file || '')
      form.append('parent_id', this.category.parent_id || '')
      form.append('title[ar]', this.category.translation.title.ar)
      form.append('title[en]', this.category.translation.title.en)
      form.append('description[ar]', this.category.translation.description.ar)
      form.append('description[en]', this.category.translation.description.en)

      axios
        // store
        .post('/api/product-categories', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.data.status) {
            this.img = res.data.url
            this.showToastError(res.data.message, res.data.custom_code)
            setTimeout(() => {
              this.$router.push('/categories')
            }, 3000)
            ;(this.category = {
              translation: {
                title: {
                  ar: '',
                  en: '',
                },
                description: {
                  ar: '',
                  en: '',
                },
              },
              image: null,
              parent: 0,
            }),
              this.removeImage()

            this.$nextTick(() => {
              this.$refs.form.reset()
            })
          }
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
<style scoped>
.uploading-image {
  display: flex;
}
</style>
