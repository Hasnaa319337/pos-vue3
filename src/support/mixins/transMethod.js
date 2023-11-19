import _ from 'lodash'
import { getStorage } from '@/support/mixins/getStorage'

const trans = {
  methods: {
    trans(key) {
      const translationList = JSON.parse(getStorage('translationList', '{}'))
      return _.get(translationList, key, `trans-${key}`) ?? key
    }
  }
}

export default trans
