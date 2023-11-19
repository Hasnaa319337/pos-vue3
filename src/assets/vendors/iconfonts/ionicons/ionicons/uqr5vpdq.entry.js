const t = window.ionicons.h
import { a as e, b as i, c as s, d as n, e as o } from './chunk-1ca7e569.js'
class r {
  constructor() {
    ;(this.isVisible = !1), (this.lazy = !1)
  }
  componentWillLoad() {
    this.waitUntilVisible(this.el, '50px', () => {
      ;(this.isVisible = !0), this.loadIcon()
    })
  }
  componentDidUnload() {
    this.io && (this.io.disconnect(), (this.io = void 0))
  }
  waitUntilVisible(t, e, i) {
    if (this.lazy && this.win && this.win.IntersectionObserver) {
      const s = (this.io = new this.win.IntersectionObserver(
        t => {
          t[0].isIntersecting && (s.disconnect(), (this.io = void 0), i())
        },
        { rootMargin: e }
      ))
      s.observe(t)
    } else i()
  }
  loadIcon() {
    if (!this.isServer && this.isVisible) {
      const t = this.getUrl()
      t
        ? (function (t, e, i) {
            let s = a.get(e)
            return (
              s ||
                ((s = fetch(e, { cache: 'force-cache' })
                  .then(t =>
                    !(function (e) {
                      return t.status <= 299
                    })()
                      ? Promise.resolve(null)
                      : t.text()
                  )
                  .then(e =>
                    (function (t, e, i) {
                      if (e) {
                        const i = t.createDocumentFragment(),
                          s = t.createElement('div')
                        ;(s.innerHTML = e), i.appendChild(s)
                        for (let t = s.childNodes.length - 1; t >= 0; t--)
                          'svg' !== s.childNodes[t].nodeName.toLowerCase() &&
                            s.removeChild(s.childNodes[t])
                        const n = s.firstElementChild
                        if (
                          n &&
                          'svg' === n.nodeName.toLowerCase() &&
                          (n.setAttribute('class', 's-ion-icon'), o(n))
                        )
                          return s.innerHTML
                      }
                      return ''
                    })(t, e)
                  )),
                a.set(e, s)),
              s
            )
          })(this.doc, t).then(t => (this.svgContent = t))
        : console.error('icon was not resolved')
    }
    if (!this.ariaLabel) {
      const t = e(this.getName(), this.mode, this.ios, this.md)
      t &&
        (this.ariaLabel = t
          .replace('ios-', '')
          .replace('md-', '')
          .replace(/\-/g, ' '))
    }
  }
  getName() {
    return void 0 !== this.name
      ? this.name
      : this.icon && !i(this.icon)
      ? this.icon
      : void 0
  }
  getUrl() {
    let t = s(this.src)
    return (
      t ||
      ((t = e(this.getName(), this.mode, this.ios, this.md))
        ? this.getNamedUrl(t)
        : (t = s(this.icon)) || null)
    )
  }
  getNamedUrl(t) {
    return n().get(t) || `${this.resourcesUrl}svg/${t}.svg`
  }
  hostData() {
    const t =
      this.flipRtl ||
      (this.ariaLabel &&
        this.ariaLabel.indexOf('arrow') > -1 &&
        !1 !== this.flipRtl)
    return {
      role: 'img',
      class: Object.assign(
        {},
        ((e = this.color),
        e ? { 'ion-color': !0, [`ion-color-${e}`]: !0 } : null),
        {
          [`icon-${this.size}`]: !!this.size,
          'flip-rtl': t && 'rtl' === this.doc.dir,
        }
      ),
    }
    var e
  }
  render() {
    return t(
      'div',
      !this.isServer && this.svgContent
        ? { class: 'icon-inner', innerHTML: this.svgContent }
        : { class: 'icon-inner' }
    )
  }
  static get is() {
    return 'ion-icon'
  }
  static get encapsulation() {
    return 'shadow'
  }
  static get properties() {
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
  }
  static get style() {
    return ':host{display:inline-block;width:1em;height:1em;contain:strict;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}.icon-inner,svg{display:block;fill:currentColor;stroke:currentColor;height:100%;width:100%}:host(.flip-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}:host(.icon-small){font-size:18px!important}:host(.icon-large){font-size:32px!important}:host(.ion-color){color:var(--ion-color-base)!important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary,#3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary,#0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary,#f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success,#10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning,#ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger,#f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light,#f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium,#989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark,#222428)}'
  }
}
const a = new Map()
export { r as IonIcon }
