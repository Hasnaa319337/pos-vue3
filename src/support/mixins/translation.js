import _ from 'lodash'
import {getStorage} from "@/support/mixins/getStorage";

const translationList = JSON.parse(getStorage('translationList', '{}'));

export function trans(key) {
    return _.get(translationList, key, `trans-${key}`) ?? key
}




