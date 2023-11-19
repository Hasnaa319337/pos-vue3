<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title">{{ trans('settings') }}</h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>

        <div class="card-body">
          <div
            v-for="(group, key) in settingGroups"
            :key="key"
            style="background: #f6f6f6; padding: 16px; margin: 50px 0; border-radius: 10px"
          >
            <h2 style="text-align: center; font-size: 31px !important; margin: 10px 0 40px">
              {{ trans(key) }}
            </h2>

            <b-form @submit.prevent="save(group)">
              <div class="container">
                <div class="row">
                  <b-form-group
                    v-for="setting in group"
                    :key="setting.id"
                    v-if="setting.type !== 'translated_text'"
                    :label="setting.type === 'translated_text' ? '' : setting.title"
                    class="col-md-6 col-sm-12"
                  >
                    <!-- radio -->
                    <b-form-select v-model="setting.value" v-if="setting.type === 'radio'">
                      <b-form-select-option
                        v-for="val in setting.options"
                        :key="val"
                        type="radio"
                        :value="val"
                        >{{ val }}</b-form-select-option
                      >
                    </b-form-select>

                    <!-- phone -->
                    <b-form-input
                      v-else-if="setting.type === 'phone'"
                      :type="setting.type == 'phone' ? 'tel' : setting.type"
                      v-model="setting.value"
                    ></b-form-input>

                    <!-- number -->
                    <b-form-input
                      v-else-if="setting.type === 'number'"
                      type="number"
                      v-model="setting.value"
                    ></b-form-input>

                    <!-- text -->
                    <b-form-input
                      v-else-if="setting.type === 'text'"
                      type="text"
                      v-model="setting.value"
                    ></b-form-input>

                    <!-- image -->
                    <b-row
                      v-else-if="setting.type === 'image' && setting.key === 'logo'"
                      style="align-items: end; width: 114%"
                    >
                      <div class="col-1" style="padding: 10px 0">
                        <b-img
                          :src="setting.value.src"
                          width="70"
                          height="60"
                          v-if="setting.value.src"
                          style="border-radius: 5px; margin-top: 0"
                        />
                        <b-img
                          :src="setting.value"
                          width="70"
                          height="60"
                          v-else
                          style="border-radius: 5px; margin-top: 0"
                        />
                      </div>

                      <div class="col-10">
                        <b-form-file
                          ref="logoImage"
                          style="margin: 0 7px"
                          type="image"
                          @change="uploadImage($event, setting)"
                        ></b-form-file>
                      </div>
                    </b-row>

                    <!-- image -->
                    <b-row
                      v-else-if="setting.type === 'image' && setting.key == 'default_image'"
                      style="align-items: end; width: 114%"
                    >
                      <div class="col-1" style="padding: 10px 0">
                        <b-img
                          :src="setting.value.src"
                          width="70"
                          height="60"
                          v-if="setting.value.src"
                          style="border-radius: 5px; margin-top: 0"
                        />
                        <b-img
                          :src="setting.value"
                          width="70"
                          height="60"
                          v-else
                          style="border-radius: 5px; margin-top: 0"
                        />
                      </div>

                      <div class="col-10">
                        <b-form-file
                          style="margin: 0 7px"
                          type="image"
                          @change="uploadImage($event, setting)"
                        ></b-form-file>
                      </div>
                    </b-row>
                  </b-form-group>
                  <!-- Translated text -->
                  <b-form-group
                    class="col-md-12 col-sm-12"
                    v-for="setting in group"
                    :key="setting.id"
                    v-if="setting.type === 'translated_text'"
                  >
                    <b-row>
                      <b-form-group
                        class="col-md-6 col-sm-12"
                        :label="setting.translation.title.ar"
                      >
                        <b-form-input
                          type="text"
                          v-model="setting.translation.translated_value.ar"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        class="col-md-6 col-sm-12"
                        :label="setting.translation.title.en"
                      >
                        <b-form-input
                          type="text"
                          v-model="setting.translation.translated_value.en"
                        ></b-form-input>
                      </b-form-group>
                    </b-row>
                  </b-form-group>
                </div>
              </div>

              <div class="col-sm-12 text-center">
                <b-button
                  :loading="btnLoading"
                  :disabled="btnLoading"
                  variant="success"
                  type="submit"
                >
                  <font-awesome-icon icon="fa-solid fa-check" />
                  {{ trans('save') }}
                </b-button>
              </div>
            </b-form>
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
  name: 'AppSettings',
  props: ['section', 'sections', 'user', 'user_language', 'permissions', 'language'],
  components: {
    SkeletonLoader
  },
  data() {
    return {
      settingGroups: [],
      languages: localStorage.getItem('languages'),
      newSettings: [],
      langs: [],

      EditMode: 0,
      loaded: false,
      btnLoading: false,
      settings: []
    }
  },

  mounted() {
    window.scrollTo(0, 0)
    this.getSettings()
    this.getLanguages()
  },
  methods: {
    getSettings() {
      this.loaded = false
      axios
        .get('/api/settings')
        .then((res) => {
          this.loaded = true
          const found = res.data.body.settings.find((el) => el.type == 'image')
          if (found) {
            found.value = {
              file: null,
              src: found.value
            }
          }

          this.settings = res.data.body.settings
          this.settingGroups = _.groupBy(res.data.body.settings, 'group')

          console.log(localStorage.getItem('Tokens_Expire'))
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    getLanguages() {
      axios.get('/api/languages').then((res) => {
        this.langs = res.data.body.languages.data
      })
    },

    edit(setting) {
      this.EditMode = 1
      this.setting = setting
    },

    save(group) {
      this.btnLoading = true
      const frmData = new FormData()

      group.map((setting, index) => {
        if (setting.type == 'translated_text') {
          // settings[0][translated_value][ar]
          // settings[0][translated_value][en]
          frmData.append(`settings[${index}][id]`, setting.id)
          frmData.append(`settings[${index}][key]`, setting.key)
          frmData.append(`settings[${index}][type]`, setting.type)
          frmData.append(
            `settings[${index}][translated_value][en]`,
            setting.translation.translated_value.en
          )
          frmData.append(
            `settings[${index}][translated_value][ar]`,
            setting.translation.translated_value.ar
          )
          frmData.append(`settings[${index}][group]`, setting.group)
          frmData.append(`settings[${index}][options]`, setting.options)
        } else {
          frmData.append(`settings[${index}][id]`, setting.id)
          frmData.append(`settings[${index}][key]`, setting.key)
          frmData.append(`settings[${index}][type]`, setting.type)

          frmData.append(`settings[${index}][value]`, setting.value)
          frmData.append(`settings[${index}][group]`, setting.group)
          frmData.append(`settings[${index}][options]`, setting.options)
        }
      })

      axios
        .post('/api/settings', frmData)
        .then((res) => {
          this.btnLoading = false
          this.showToastError(res.data.message, res.data.custom_code)

          const result = this.settings.find((el) => {
            if (el.key === 'tokens_expire') {
              return el.value
            }
          })
          localStorage.setItem('Tokens_Expire', result.value)
        })
        .catch((error) => {
          this.btnLoading = false
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    uploadImage(e, setting) {
      let rawImg
      const file = e.target.files[0]
      const reader = new FileReader()
      console.log(file)
      console.log(e)

      reader.onloadend = () => {
        rawImg = reader.result
        console.log(rawImg)
        setting.value = rawImg
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.box {
  margin: 60px 0 !important;
  display: block;
  border-radius: 15px;
  display: flex;
}
h5 {
  margin: auto;
  text-align: center;
  display: block;
  width: 100%;
  font-size: 30px !important;
}
tr.select-setting {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}
.nav .nav-item {
  display: inline-block;
}
.nav .nav-item a {
  padding: 15px 5px 15px 5px;
}
.nav-pills {
  padding: 0 !important;
  margin-bottom: 20px;
  font-size: 18px;
}
</style>
