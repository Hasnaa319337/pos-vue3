// @ts-ignore

declare global {
    interface String {
        translate(): string
    }
}

import _ from 'lodash'
import {trans} from '../mixins/translation'

// @ts-ignore
String.prototype.translate = function (lang = null) {
    const key = String(this)

    return trans(key)
}
