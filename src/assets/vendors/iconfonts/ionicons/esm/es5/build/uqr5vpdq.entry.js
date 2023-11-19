import { h } from '../ionicons.core.js'
import {
  a as getName,
  b as isSrc,
  c as getSrc,
  d as getIconMap,
  e as isValid,
} from './chunk-1ca7e569.js'
var Icon = (function () {
    function t() {
      ;(this.isVisible = !1), (this.lazy = !1)
    }
    return (
      (t.prototype.componentWillLoad = function () {
        var t = this
        this.waitUntilVisible(this.el, '50px', function () {
          ;(t.isVisible = !0), t.loadIcon()
        })
      }),
      (t.prototype.componentDidUnload = function () {
        this.io && (this.io.disconnect(), (this.io = void 0))
      }),
      (t.prototype.waitUntilVisible = function (t, e, i) {
        var n = this
        if (this.lazy && this.win && this.win.IntersectionObserver) {
          var r = (this.io = new this.win.IntersectionObserver(
            function (t) {
              t[0].isIntersecting && (r.disconnect(), (n.io = void 0), i())
            },
            { rootMargin: e }
          ))
          r.observe(t)
        } else i()
      }),
      (t.prototype.loadIcon = function () {
        var t = this
        if (!this.isServer && this.isVisible) {
          var e = this.getUrl()
          e
            ? getSvgContent(this.doc, e, 's-ion-icon').then(function (e) {
                return (t.svgContent = e)
              })
            : console.error('icon was not resolved')
        }
        if (!this.ariaLabel) {
          var i = getName(this.getName(), this.mode, this.ios, this.md)
          i &&
            (this.ariaLabel = i
              .replace('ios-', '')
              .replace('md-', '')
              .replace(/\-/g, ' '))
        }
      }),
      (t.prototype.getName = function () {
        return void 0 !== this.name
          ? this.name
          : this.icon && !isSrc(this.icon)
          ? this.icon
          : void 0
      }),
      (t.prototype.getUrl = function () {
        var t = getSrc(this.src)
        return (
          t ||
          ((t = getName(this.getName(), this.mode, this.ios, this.md))
            ? this.getNamedUrl(t)
            : (t = getSrc(this.icon)) || null)
        )
      }),
      (t.prototype.getNamedUrl = function (t) {
        return getIconMap().get(t) || this.resourcesUrl + 'svg/' + t + '.svg'
      }),
      (t.prototype.hostData = function () {
        var t,
          e =
            this.flipRtl ||
            (this.ariaLabel &&
              this.ariaLabel.indexOf('arrow') > -1 &&
              !1 !== this.flipRtl)
        return {
          role: 'img',
          class: Object.assign(
            {},
            createColorClasses(this.color),
            ((t = {}),
            (t['icon-' + this.size] = !!this.size),
            (t['flip-rtl'] = e && 'rtl' === this.doc.dir),
            t)
          ),
        }
      }),
      (t.prototype.render = function () {
        return h(
          'div',
          !this.isServer && this.svgContent
            ? { class: 'icon-inner', innerHTML: this.svgContent }
            : { class: 'icon-inner' }
        )
      }),
      Object.defineProperty(t, 'is', {
        get: function () {
          return 'ion-icon'
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t, 'encapsulation', {
        get: function () {
          return 'shadow'
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t, 'properties', {
        get: function () {
          return {
            ariaLabel: {
              type: String,
              attr: 'aria-label',
              reflectToAttr: !0,
              mutable: !0,
            },
            color: { type: String, attr: 'color' },
            doc: { context: 'document' },
            el: { elementRef: !0 },
            flipRtl: { type: Boolean, attr: 'flip-rtl' },
            icon: { type: String, attr: 'icon', watchCallbacks: ['loadIcon'] },
            ios: { type: String, attr: 'ios' },
            isServer: { context: 'isServer' },
            isVisible: { state: !0 },
            lazy: { type: Boolean, attr: 'lazy' },
            md: { type: String, attr: 'md' },
            mode: { type: String, attr: 'mode' },
            name: { type: String, attr: 'name', watchCallbacks: ['loadIcon'] },
            resourcesUrl: { context: 'resourcesUrl' },
            size: { type: String, attr: 'size' },
            src: { type: String, attr: 'src', watchCallbacks: ['loadIcon'] },
            svgContent: { state: !0 },
            win: { context: 'window' },
          }
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t, 'style', {
        get: function () {
          return ':host{display:inline-block;width:1em;height:1em;contain:strict;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}.icon-inner,svg{display:block;fill:currentColor;stroke:currentColor;height:100%;width:100%}:host(.flip-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}:host(.icon-small){font-size:18px!important}:host(.icon-large){font-size:32px!important}:host(.ion-color){color:var(--ion-color-base)!important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary,#3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary,#0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary,#f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success,#10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning,#ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger,#f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light,#f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium,#989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark,#222428)}'
        },
        enumerable: !0,
        configurable: !0,
      }),
      t
    )
  })(),
  requests = new Map()
function getSvgContent(t, e, i) {
  var n = requests.get(e)
  return (
    n ||
      ((n = fetch(e, { cache: 'force-cache' })
        .then(function (t) {
          return isStatusValid(t.status) ? t.text() : Promise.resolve(null)
        })
        .then(function (e) {
          return validateContent(t, e, i)
        })),
      requests.set(e, n)),
    n
  )
}
function isStatusValid(t) {
  return t <= 299
}
function validateContent(t, e, i) {
  if (e) {
    var n = t.createDocumentFragment(),
      r = t.createElement('div')
    ;(r.innerHTML = e), n.appendChild(r)
    for (var o = r.childNodes.length - 1; o >= 0; o--)
      'svg' !== r.childNodes[o].nodeName.toLowerCase() &&
        r.removeChild(r.childNodes[o])
    var s = r.firstElementChild
    if (
      s &&
      'svg' === s.nodeName.toLowerCase() &&
      (i && s.setAttribute('class', i), isValid(s))
    )
      return r.innerHTML
  }
  return ''
}
function createColorClasses(t) {
  var e
  return t ? (((e = { 'ion-color': !0 })['ion-color-' + t] = !0), e) : null
}
export { Icon as IonIcon }