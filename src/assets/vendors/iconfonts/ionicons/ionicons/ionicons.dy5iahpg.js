/*! document-register-element, 1.7.0
https://github.com/WebReflection/document-register-element
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
if (!window['s-ce1']) {
  window['s-ce1'] = true
  ;(function (e, t) {
    'use strict'
    function Ht() {
      var e = wt.splice(0, wt.length)
      Et = 0
      while (e.length) e.shift().call(null, e.shift())
    }
    function Bt(e, t) {
      for (var n = 0, r = e.length; n < r; n++) Jt(e[n], t)
    }
    function jt(e) {
      for (var t = 0, n = e.length, r; t < n; t++) (r = e[t]), Pt(r, A[It(r)])
    }
    function Ft(e) {
      return function (t) {
        ut(t) && (Jt(t, e), O.length && Bt(t.querySelectorAll(O), e))
      }
    }
    function It(e) {
      var t = ht.call(e, 'is'),
        n = e.nodeName.toUpperCase(),
        r = _.call(L, t ? N + t.toUpperCase() : T + n)
      return t && -1 < r && !qt(n, t) ? -1 : r
    }
    function qt(e, t) {
      return -1 < O.indexOf(e + '[is="' + t + '"]')
    }
    function Rt(e) {
      var t = e.currentTarget,
        n = e.attrChange,
        r = e.attrName,
        i = e.target,
        s = e[y] || 2,
        o = e[w] || 3
      kt &&
        (!i || i === t) &&
        t[h] &&
        r !== 'style' &&
        (e.prevValue !== e.newValue ||
          (e.newValue === '' && (n === s || n === o))) &&
        t[h](r, n === s ? null : e.prevValue, n === o ? null : e.newValue)
    }
    function Ut(e) {
      var t = Ft(e)
      return function (e) {
        wt.push(t, e.target), Et && clearTimeout(Et), (Et = setTimeout(Ht, 1))
      }
    }
    function zt(e) {
      Ct && ((Ct = !1), e.currentTarget.removeEventListener(S, zt)),
        O.length &&
          Bt((e.target || n).querySelectorAll(O), e.detail === l ? l : a),
        st && Vt()
    }
    function Wt(e, t) {
      var n = this
      vt.call(n, e, t), Lt.call(n, { target: n })
    }
    function Xt(e, t) {
      nt(e, t),
        Mt
          ? Mt.observe(e, yt)
          : (Nt && ((e.setAttribute = Wt), (e[o] = Ot(e)), e[u](x, Lt)),
            e[u](E, Rt)),
        e[m] && kt && ((e.created = !0), e[m](), (e.created = !1))
    }
    function Vt() {
      for (var e, t = 0, n = at.length; t < n; t++)
        (e = at[t]), M.contains(e) || (n--, at.splice(t--, 1), Jt(e, l))
    }
    function $t(e) {
      throw new Error('A ' + e + ' type is already registered')
    }
    function Jt(e, t) {
      var n,
        r = It(e),
        i
      ;-1 < r &&
        (Dt(e, A[r]),
        (r = 0),
        t === a && !e[a]
          ? ((e[l] = !1),
            (e[a] = !0),
            (i = 'connected'),
            (r = 1),
            st && _.call(at, e) < 0 && at.push(e))
          : t === l &&
            !e[l] &&
            ((e[a] = !1), (e[l] = !0), (i = 'disconnected'), (r = 1)),
        r && (n = e[t + f] || e[i + f]) && n.call(e))
    }
    function Kt() {}
    function Qt(e, t, r) {
      var i = (r && r[c]) || '',
        o = t.prototype,
        u = tt(o),
        a = t.observedAttributes || j,
        f = { prototype: u }
      ot(u, m, {
        value: function () {
          if (Q) Q = !1
          else if (!this[W]) {
            ;(this[W] = !0), new t(this), o[m] && o[m].call(this)
            var e = G[Z.get(t)]
            ;(!V || e.create.length > 1) && Zt(this)
          }
        },
      }),
        ot(u, h, {
          value: function (e) {
            ;-1 < _.call(a, e) && o[h].apply(this, arguments)
          },
        }),
        o[d] && ot(u, p, { value: o[d] }),
        o[v] && ot(u, g, { value: o[v] }),
        i && (f[c] = i),
        (e = e.toUpperCase()),
        (G[e] = { constructor: t, create: i ? [i, et(e)] : [e] }),
        Z.set(t, e),
        n[s](e.toLowerCase(), f),
        en(e),
        Y[e].r()
    }
    function Gt(e) {
      var t = G[e.toUpperCase()]
      return t && t.constructor
    }
    function Yt(e) {
      return typeof e == 'string' ? e : (e && e.is) || ''
    }
    function Zt(e) {
      var t = e[h],
        n = t ? e.attributes : j,
        r = n.length,
        i
      while (r--)
        (i = n[r]),
          t.call(e, i.name || i.nodeName, null, i.value || i.nodeValue)
    }
    function en(e) {
      return (
        (e = e.toUpperCase()),
        e in Y ||
          ((Y[e] = {}),
          (Y[e].p = new K(function (t) {
            Y[e].r = t
          }))),
        Y[e].p
      )
    }
    function tn() {
      X && delete e.customElements,
        B(e, 'customElements', { configurable: !0, value: new Kt() }),
        B(e, 'CustomElementRegistry', { configurable: !0, value: Kt })
      for (
        var t = function (t) {
            var r = e[t]
            if (r) {
              ;(e[t] = function (t) {
                var i, s
                return (
                  t || (t = this),
                  t[W] ||
                    ((Q = !0),
                    (i = G[Z.get(t.constructor)]),
                    (s = V && i.create.length === 1),
                    (t = s
                      ? Reflect.construct(r, j, i.constructor)
                      : n.createElement.apply(n, i.create)),
                    (t[W] = !0),
                    (Q = !1),
                    s || Zt(t)),
                  t
                )
              }),
                (e[t].prototype = r.prototype)
              try {
                r.prototype.constructor = e[t]
              } catch (i) {
                ;(z = !0), B(r, W, { value: e[t] })
              }
            }
          },
          r = i.get(/^HTML[A-Z]*[a-z]/),
          o = r.length;
        o--;
        t(r[o])
      );
      ;(n.createElement = function (e, t) {
        var n = Yt(t)
        return n ? gt.call(this, e, et(n)) : gt.call(this, e)
      }),
        St || ((Tt = !0), n[s](''))
    }
    var n = e.document,
      r = e.Object,
      i = (function (e) {
        var t = /^[A-Z]+[a-z]/,
          n = function (e) {
            var t = [],
              n
            for (n in s) e.test(n) && t.push(n)
            return t
          },
          i = function (e, t) {
            ;(t = t.toLowerCase()),
              t in s ||
                ((s[e] = (s[e] || []).concat(t)),
                (s[t] = s[t.toUpperCase()] = e))
          },
          s = (r.create || r)(null),
          o = {},
          u,
          a,
          f,
          l
        for (a in e)
          for (l in e[a]) {
            ;(f = e[a][l]), (s[l] = f)
            for (u = 0; u < f.length; u++)
              s[f[u].toLowerCase()] = s[f[u].toUpperCase()] = l
          }
        return (
          (o.get = function (r) {
            return typeof r == 'string' ? s[r] || (t.test(r) ? [] : '') : n(r)
          }),
          (o.set = function (n, r) {
            return t.test(n) ? i(n, r) : i(r, n), o
          }),
          o
        )
      })({
        collections: {
          HTMLAllCollection: ['all'],
          HTMLCollection: ['forms'],
          HTMLFormControlsCollection: ['elements'],
          HTMLOptionsCollection: ['options'],
        },
        elements: {
          Element: ['element'],
          HTMLAnchorElement: ['a'],
          HTMLAppletElement: ['applet'],
          HTMLAreaElement: ['area'],
          HTMLAttachmentElement: ['attachment'],
          HTMLAudioElement: ['audio'],
          HTMLBRElement: ['br'],
          HTMLBaseElement: ['base'],
          HTMLBodyElement: ['body'],
          HTMLButtonElement: ['button'],
          HTMLCanvasElement: ['canvas'],
          HTMLContentElement: ['content'],
          HTMLDListElement: ['dl'],
          HTMLDataElement: ['data'],
          HTMLDataListElement: ['datalist'],
          HTMLDetailsElement: ['details'],
          HTMLDialogElement: ['dialog'],
          HTMLDirectoryElement: ['dir'],
          HTMLDivElement: ['div'],
          HTMLDocument: ['document'],
          HTMLElement: [
            'element',
            'abbr',
            'address',
            'article',
            'aside',
            'b',
            'bdi',
            'bdo',
            'cite',
            'code',
            'command',
            'dd',
            'dfn',
            'dt',
            'em',
            'figcaption',
            'figure',
            'footer',
            'header',
            'i',
            'kbd',
            'mark',
            'nav',
            'noscript',
            'rp',
            'rt',
            'ruby',
            's',
            'samp',
            'section',
            'small',
            'strong',
            'sub',
            'summary',
            'sup',
            'u',
            'var',
            'wbr',
          ],
          HTMLEmbedElement: ['embed'],
          HTMLFieldSetElement: ['fieldset'],
          HTMLFontElement: ['font'],
          HTMLFormElement: ['form'],
          HTMLFrameElement: ['frame'],
          HTMLFrameSetElement: ['frameset'],
          HTMLHRElement: ['hr'],
          HTMLHeadElement: ['head'],
          HTMLHeadingElement: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          HTMLHtmlElement: ['html'],
          HTMLIFrameElement: ['iframe'],
          HTMLImageElement: ['img'],
          HTMLInputElement: ['input'],
          HTMLKeygenElement: ['keygen'],
          HTMLLIElement: ['li'],
          HTMLLabelElement: ['label'],
          HTMLLegendElement: ['legend'],
          HTMLLinkElement: ['link'],
          HTMLMapElement: ['map'],
          HTMLMarqueeElement: ['marquee'],
          HTMLMediaElement: ['media'],
          HTMLMenuElement: ['menu'],
          HTMLMenuItemElement: ['menuitem'],
          HTMLMetaElement: ['meta'],
          HTMLMeterElement: ['meter'],
          HTMLModElement: ['del', 'ins'],
          HTMLOListElement: ['ol'],
          HTMLObjectElement: ['object'],
          HTMLOptGroupElement: ['optgroup'],
          HTMLOptionElement: ['option'],
          HTMLOutputElement: ['output'],
          HTMLParagraphElement: ['p'],
          HTMLParamElement: ['param'],
          HTMLPictureElement: ['picture'],
          HTMLPreElement: ['pre'],
          HTMLProgressElement: ['progress'],
          HTMLQuoteElement: ['blockquote', 'q', 'quote'],
          HTMLScriptElement: ['script'],
          HTMLSelectElement: ['select'],
          HTMLShadowElement: ['shadow'],
          HTMLSlotElement: ['slot'],
          HTMLSourceElement: ['source'],
          HTMLSpanElement: ['span'],
          HTMLStyleElement: ['style'],
          HTMLTableCaptionElement: ['caption'],
          HTMLTableCellElement: ['td', 'th'],
          HTMLTableColElement: ['col', 'colgroup'],
          HTMLTableElement: ['table'],
          HTMLTableRowElement: ['tr'],
          HTMLTableSectionElement: ['thead', 'tbody', 'tfoot'],
          HTMLTemplateElement: ['template'],
          HTMLTextAreaElement: ['textarea'],
          HTMLTimeElement: ['time'],
          HTMLTitleElement: ['title'],
          HTMLTrackElement: ['track'],
          HTMLUListElement: ['ul'],
          HTMLUnknownElement: ['unknown', 'vhgroupv', 'vkeygen'],
          HTMLVideoElement: ['video'],
        },
        nodes: {
          Attr: ['node'],
          Audio: ['audio'],
          CDATASection: ['node'],
          CharacterData: ['node'],
          Comment: ['#comment'],
          Document: ['#document'],
          DocumentFragment: ['#document-fragment'],
          DocumentType: ['node'],
          HTMLDocument: ['#document'],
          Image: ['img'],
          Option: ['option'],
          ProcessingInstruction: ['node'],
          ShadowRoot: ['#shadow-root'],
          Text: ['#text'],
          XMLDocument: ['xml'],
        },
      })
    typeof t != 'object' && (t = { type: t || 'auto' })
    var s = 'registerElement',
      o = '__' + s + ((e.Math.random() * 1e5) >> 0),
      u = 'addEventListener',
      a = 'attached',
      f = 'Callback',
      l = 'detached',
      c = 'extends',
      h = 'attributeChanged' + f,
      p = a + f,
      d = 'connected' + f,
      v = 'disconnected' + f,
      m = 'created' + f,
      g = l + f,
      y = 'ADDITION',
      b = 'MODIFICATION',
      w = 'REMOVAL',
      E = 'DOMAttrModified',
      S = 'DOMContentLoaded',
      x = 'DOMSubtreeModified',
      T = '<',
      N = '=',
      C = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
      k = [
        'ANNOTATION-XML',
        'COLOR-PROFILE',
        'FONT-FACE',
        'FONT-FACE-SRC',
        'FONT-FACE-URI',
        'FONT-FACE-FORMAT',
        'FONT-FACE-NAME',
        'MISSING-GLYPH',
      ],
      L = [],
      A = [],
      O = '',
      M = n.documentElement,
      _ =
        L.indexOf ||
        function (e) {
          for (var t = this.length; t-- && this[t] !== e; );
          return t
        },
      D = r.prototype,
      P = D.hasOwnProperty,
      H = D.isPrototypeOf,
      B = r.defineProperty,
      j = [],
      F = r.getOwnPropertyDescriptor,
      I = r.getOwnPropertyNames,
      q = r.getPrototypeOf,
      R = r.setPrototypeOf,
      U = !!r.__proto__,
      z = !1,
      W = '__dreCEv1',
      X = e.customElements,
      V = !/^force/.test(t.type) && !!(X && X.define && X.get && X.whenDefined),
      $ = r.create || r,
      J =
        e.Map ||
        function () {
          var t = [],
            n = [],
            r
          return {
            get: function (e) {
              return n[_.call(t, e)]
            },
            set: function (e, i) {
              ;(r = _.call(t, e)), r < 0 ? (n[t.push(e) - 1] = i) : (n[r] = i)
            },
          }
        },
      K =
        e.Promise ||
        function (e) {
          function i(e) {
            n = !0
            while (t.length) t.shift()(e)
          }
          var t = [],
            n = !1,
            r = {
              catch: function () {
                return r
              },
              then: function (e) {
                return t.push(e), n && setTimeout(i, 1), r
              },
            }
          return e(i), r
        },
      Q = !1,
      G = $(null),
      Y = $(null),
      Z = new J(),
      et = function (e) {
        return e.toLowerCase()
      },
      tt =
        r.create ||
        function sn(e) {
          return e ? ((sn.prototype = e), new sn()) : this
        },
      nt =
        R ||
        (U
          ? function (e, t) {
              return (e.__proto__ = t), e
            }
          : I && F
          ? (function () {
              function e(e, t) {
                for (var n, r = I(t), i = 0, s = r.length; i < s; i++)
                  (n = r[i]), P.call(e, n) || B(e, n, F(t, n))
              }
              return function (t, n) {
                do e(t, n)
                while ((n = q(n)) && !H.call(n, t))
                return t
              }
            })()
          : function (e, t) {
              for (var n in t) e[n] = t[n]
              return e
            }),
      rt = e.MutationObserver || e.WebKitMutationObserver,
      it = (e.HTMLElement || e.Element || e.Node).prototype,
      st = !H.call(it, M),
      ot = st
        ? function (e, t, n) {
            return (e[t] = n.value), e
          }
        : B,
      ut = st
        ? function (e) {
            return e.nodeType === 1
          }
        : function (e) {
            return H.call(it, e)
          },
      at = st && [],
      ft = it.attachShadow,
      lt = it.cloneNode,
      ct = it.dispatchEvent,
      ht = it.getAttribute,
      pt = it.hasAttribute,
      dt = it.removeAttribute,
      vt = it.setAttribute,
      mt = n.createElement,
      gt = mt,
      yt = rt && { attributes: !0, characterData: !0, attributeOldValue: !0 },
      bt =
        rt ||
        function (e) {
          ;(Nt = !1), M.removeEventListener(E, bt)
        },
      wt,
      Et = 0,
      St = s in n && !/^force-all/.test(t.type),
      xt = !0,
      Tt = !1,
      Nt = !0,
      Ct = !0,
      kt = !0,
      Lt,
      At,
      Ot,
      Mt,
      _t,
      Dt,
      Pt
    St ||
      (R || U
        ? ((Dt = function (e, t) {
            H.call(t, e) || Xt(e, t)
          }),
          (Pt = Xt))
        : ((Dt = function (e, t) {
            e[o] || ((e[o] = r(!0)), Xt(e, t))
          }),
          (Pt = Dt)),
      st
        ? ((Nt = !1),
          (function () {
            var e = F(it, u),
              t = e.value,
              n = function (e) {
                var t = new CustomEvent(E, { bubbles: !0 })
                ;(t.attrName = e),
                  (t.prevValue = ht.call(this, e)),
                  (t.newValue = null),
                  (t[w] = t.attrChange = 2),
                  dt.call(this, e),
                  ct.call(this, t)
              },
              r = function (e, t) {
                var n = pt.call(this, e),
                  r = n && ht.call(this, e),
                  i = new CustomEvent(E, { bubbles: !0 })
                vt.call(this, e, t),
                  (i.attrName = e),
                  (i.prevValue = n ? r : null),
                  (i.newValue = t),
                  n ? (i[b] = i.attrChange = 1) : (i[y] = i.attrChange = 0),
                  ct.call(this, i)
              },
              i = function (e) {
                var t = e.currentTarget,
                  n = t[o],
                  r = e.propertyName,
                  i
                n.hasOwnProperty(r) &&
                  ((n = n[r]),
                  (i = new CustomEvent(E, { bubbles: !0 })),
                  (i.attrName = n.name),
                  (i.prevValue = n.value || null),
                  (i.newValue = n.value = t[r] || null),
                  i.prevValue == null
                    ? (i[y] = i.attrChange = 0)
                    : (i[b] = i.attrChange = 1),
                  ct.call(t, i))
              }
            ;(e.value = function (e, s, u) {
              e === E &&
                this[h] &&
                this.setAttribute !== r &&
                ((this[o] = {
                  className: { name: 'class', value: this.className },
                }),
                (this.setAttribute = r),
                (this.removeAttribute = n),
                t.call(this, 'propertychange', i)),
                t.call(this, e, s, u)
            }),
              B(it, u, e)
          })())
        : rt ||
          (M[u](E, bt),
          M.setAttribute(o, 1),
          M.removeAttribute(o),
          Nt &&
            ((Lt = function (e) {
              var t = this,
                n,
                r,
                i
              if (t === e.target) {
                ;(n = t[o]), (t[o] = r = Ot(t))
                for (i in r) {
                  if (!(i in n)) return At(0, t, i, n[i], r[i], y)
                  if (r[i] !== n[i]) return At(1, t, i, n[i], r[i], b)
                }
                for (i in n) if (!(i in r)) return At(2, t, i, n[i], r[i], w)
              }
            }),
            (At = function (e, t, n, r, i, s) {
              var o = {
                attrChange: e,
                currentTarget: t,
                attrName: n,
                prevValue: r,
                newValue: i,
              }
              ;(o[s] = e), Rt(o)
            }),
            (Ot = function (e) {
              for (
                var t, n, r = {}, i = e.attributes, s = 0, o = i.length;
                s < o;
                s++
              )
                (t = i[s]),
                  (n = t.name),
                  n !== 'setAttribute' && (r[n] = t.value)
              return r
            }))),
      (n[s] = function (t, r) {
        ;(p = t.toUpperCase()),
          xt &&
            ((xt = !1),
            rt
              ? ((Mt = (function (e, t) {
                  function n(e, t) {
                    for (var n = 0, r = e.length; n < r; t(e[n++]));
                  }
                  return new rt(function (r) {
                    for (var i, s, o, u = 0, a = r.length; u < a; u++)
                      (i = r[u]),
                        i.type === 'childList'
                          ? (n(i.addedNodes, e), n(i.removedNodes, t))
                          : ((s = i.target),
                            kt &&
                              s[h] &&
                              i.attributeName !== 'style' &&
                              ((o = ht.call(s, i.attributeName)),
                              o !== i.oldValue &&
                                s[h](i.attributeName, i.oldValue, o)))
                  })
                })(Ft(a), Ft(l))),
                (_t = function (e) {
                  return Mt.observe(e, { childList: !0, subtree: !0 }), e
                }),
                _t(n),
                ft &&
                  (it.attachShadow = function () {
                    return _t(ft.apply(this, arguments))
                  }))
              : ((wt = []),
                n[u]('DOMNodeInserted', Ut(a)),
                n[u]('DOMNodeRemoved', Ut(l))),
            n[u](S, zt),
            n[u]('readystatechange', zt),
            (it.cloneNode = function (e) {
              var t = lt.call(this, !!e),
                n = It(t)
              return (
                -1 < n && Pt(t, A[n]),
                e && O.length && jt(t.querySelectorAll(O)),
                t
              )
            }))
        if (Tt) return (Tt = !1)
        ;-2 < _.call(L, N + p) + _.call(L, T + p) && $t(t)
        if (!C.test(p) || -1 < _.call(k, p))
          throw new Error('The type ' + t + ' is invalid')
        var i = function () {
            return o ? n.createElement(f, p) : n.createElement(f)
          },
          s = r || D,
          o = P.call(s, c),
          f = o ? r[c].toUpperCase() : p,
          p,
          d
        return (
          o && -1 < _.call(L, T + f) && $t(f),
          (d = L.push((o ? N : T) + p) - 1),
          (O = O.concat(
            O.length ? ',' : '',
            o ? f + '[is="' + t.toLowerCase() + '"]' : f
          )),
          (i.prototype = A[d] = P.call(s, 'prototype') ? s.prototype : tt(it)),
          O.length && Bt(n.querySelectorAll(O), a),
          i
        )
      }),
      (n.createElement = gt =
        function (e, t) {
          var r = Yt(t),
            i = r ? mt.call(n, e, et(r)) : mt.call(n, e),
            s = '' + e,
            o = _.call(L, (r ? N : T) + (r || s).toUpperCase()),
            u = -1 < o
          return (
            r &&
              (i.setAttribute('is', (r = r.toLowerCase())),
              u && (u = qt(s.toUpperCase(), r))),
            (kt = !n.createElement.innerHTMLHelper),
            u && Pt(i, A[o]),
            i
          )
        })),
      (Kt.prototype = {
        constructor: Kt,
        define: V
          ? function (e, t, n) {
              if (n) Qt(e, t, n)
              else {
                var r = e.toUpperCase()
                ;(G[r] = { constructor: t, create: [r] }),
                  Z.set(t, r),
                  X.define(e, t)
              }
            }
          : Qt,
        get: V
          ? function (e) {
              return X.get(e) || Gt(e)
            }
          : Gt,
        whenDefined: V
          ? function (e) {
              return K.race([X.whenDefined(e), en(e)])
            }
          : en,
      })
    if (!X || /^force/.test(t.type)) tn()
    else if (!t.noBuiltIn)
      try {
        ;(function (t, r, i) {
          ;(r[c] = 'a'),
            (t.prototype = tt(HTMLAnchorElement.prototype)),
            (t.prototype.constructor = t),
            e.customElements.define(i, t, r)
          if (
            ht.call(n.createElement('a', { is: i }), 'is') !== i ||
            (V && ht.call(new t(), 'is') !== i)
          )
            throw r
        })(
          function on() {
            return Reflect.construct(HTMLAnchorElement, [], on)
          },
          {},
          'document-register-element-a'
        )
      } catch (nn) {
        tn()
      }
    if (!t.noBuiltIn)
      try {
        mt.call(n, 'a', 'a')
      } catch (rn) {
        et = function (e) {
          return { is: e.toLowerCase() }
        }
      }
  })(window)
}
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
;(function (a) {
  'function' !== typeof a.matches &&
    (a.matches =
      a.msMatchesSelector ||
      a.mozMatchesSelector ||
      a.webkitMatchesSelector ||
      function (a) {
        a = (this.document || this.ownerDocument).querySelectorAll(a)
        for (var b = 0; a[b] && a[b] !== this; ) ++b
        return !!a[b]
      })
  'function' !== typeof a.closest &&
    (a.closest = function (a) {
      for (var b = this; b && 1 === b.nodeType; ) {
        if (b.matches(a)) return b
        b = b.parentNode
      }
      return null
    })
})(window.Element.prototype)
/*!
Element.getRootNode()
*/
;(function (c) {
  function d(a) {
    a = b(a)
    return 11 === a.nodeType ? d(a.host) : a
  }
  function b(a) {
    return a.parentNode ? b(a.parentNode) : a
  }
  'function' !== typeof c.getRootNode &&
    (c.getRootNode = function (a) {
      return a && a.composed ? d(this) : b(this)
    })
})(Element.prototype)
/*!
Element.remove()
*/
;(function (b) {
  b.forEach(function (a) {
    a.hasOwnProperty('remove') ||
      Object.defineProperty(a, 'remove', {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: function () {
          null !== this.parentNode && this.parentNode.removeChild(this)
        },
      })
  })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype])

/*!
Array.prototype.fill
*/
Array.prototype.fill ||
  Object.defineProperty(Array.prototype, 'fill', {
    value: function (t) {
      var r, e, i, n, o, a, l
      if (null == this) throw new TypeError('this is null or not defined')
      for (
        e = (r = Object(this)).length >>> 0,
          n = (i = arguments[1] >> 0) < 0 ? Math.max(e + i, 0) : Math.min(i, e),
          l =
            (a = void 0 === (o = arguments[2]) ? e : o >> 0) < 0
              ? Math.max(e + a, 0)
              : Math.min(a, e);
        n < l;

      )
        (r[n] = t), n++
      return r
    },
  })

/*!
Array.prototype.find
*/
Array.prototype.find ||
  Object.defineProperty(Array.prototype, 'find', {
    writable: !0,
    configurable: !0,
    value: function (c, e) {
      if (null == this) throw new TypeError('"this" is null or not defined')
      var b = Object(this),
        f = b.length >>> 0
      if ('function' !== typeof c)
        throw new TypeError('predicate must be a function')
      for (var a = 0; a < f; ) {
        var d = b[a]
        if (c.call(e, d, a, b)) return d
        a++
      }
    },
  })
/*!
Array.prototype.findIndex
*/
Array.prototype.findIndex ||
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function (c, d) {
      if (null == this) throw new TypeError('"this" is null or not defined')
      var b = Object(this),
        e = b.length >>> 0
      if ('function' !== typeof c)
        throw new TypeError('predicate must be a function')
      for (var a = 0; a < e; ) {
        if (c.call(d, b[a], a, b)) return a
        a++
      }
      return -1
    },
    configurable: !0,
    writable: !0,
  })
/*!
Array.from
*/
Array.from ||
  (Array.from = (function () {
    var l = Object.prototype.toString,
      h = function (c) {
        return 'function' === typeof c || '[object Function]' === l.call(c)
      },
      m = Math.pow(2, 53) - 1
    return function (c) {
      var k = Object(c)
      if (null == c)
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        )
      var d = 1 < arguments.length ? arguments[1] : void 0,
        f
      if ('undefined' !== typeof d) {
        if (!h(d))
          throw new TypeError(
            'Array.from: when provided, the second argument must be a function'
          )
        2 < arguments.length && (f = arguments[2])
      }
      var a = Number(k.length)
      a = isNaN(a)
        ? 0
        : 0 !== a && isFinite(a)
        ? (0 < a ? 1 : -1) * Math.floor(Math.abs(a))
        : a
      a = Math.min(Math.max(a, 0), m)
      for (var g = h(this) ? Object(new this(a)) : Array(a), b = 0, e; b < a; )
        (e = k[b]),
          (g[b] = d
            ? 'undefined' === typeof f
              ? d(e, b)
              : d.call(f, e, b)
            : e),
          (b += 1)
      g.length = a
      return g
    }
  })())
/*!
Array.prototype.includes
*/
Array.prototype.includes ||
  Object.defineProperty(Array.prototype, 'includes', {
    writable: !0,
    configurable: !0,
    value: function (r, e) {
      if (null == this) throw new TypeError('"this" is null or not defined')
      var t = Object(this),
        n = t.length >>> 0
      if (0 === n) return !1
      var i,
        o,
        a = 0 | e,
        u = Math.max(0 <= a ? a : n - Math.abs(a), 0)
      for (; u < n; ) {
        if (
          (i = t[u]) === (o = r) ||
          ('number' == typeof i && 'number' == typeof o && isNaN(i) && isNaN(o))
        )
          return !0
        u++
      }
      return !1
    },
  })

/*!
Object.assign
*/
'function' != typeof Object.assign &&
  Object.defineProperty(Object, 'assign', {
    value: function (d, f) {
      if (null == d)
        throw new TypeError('Cannot convert undefined or null to object')
      for (var e = Object(d), b = 1; b < arguments.length; b++) {
        var a = arguments[b]
        if (null != a)
          for (var c in a)
            Object.prototype.hasOwnProperty.call(a, c) && (e[c] = a[c])
      }
      return e
    },
    writable: !0,
    configurable: !0,
  })
/*!
Object.entries
*/
Object.entries ||
  (Object.entries = function (c) {
    for (var b = Object.keys(c), a = b.length, d = Array(a); a--; )
      d[a] = [b[a], c[b[a]]]
    return d
  })
/*!
Object.values
*/
Object.values ||
  (Object.values = function (n) {
    return Object.keys(n).map(function (r) {
      return n[r]
    })
  })

/*!
Number
*/
void 0 === Number.isFinite &&
  (Number.isFinite = function (a) {
    return 'number' === typeof a && isFinite(a)
  })
Number.isNaN =
  Number.isNaN ||
  function (a) {
    return a !== a
  }
Number.isInteger =
  Number.isInteger ||
  function (a) {
    return 'number' === typeof a && isFinite(a) && Math.floor(a) === a
  }

/*!
String.prototype.endsWith
*/
String.prototype.endsWith ||
  Object.defineProperty(String.prototype, 'endsWith', {
    writable: !0,
    configurable: !0,
    value: function (b, a) {
      if (void 0 === a || a > this.length) a = this.length
      return this.substring(a - b.length, a) === b
    },
  })
/*!
String.prototype.includes
*/
String.prototype.includes ||
  (String.prototype.includes = function (b, a) {
    'number' !== typeof a && (a = 0)
    return a + b.length > this.length ? !1 : -1 !== this.indexOf(b, a)
  })
/*!
String.prototype.startsWith
*/
String.prototype.startsWith ||
  Object.defineProperty(String.prototype, 'startsWith', {
    writable: !0,
    configurable: !0,
    value: function (b, a) {
      return this.substr(!a || 0 > a ? 0 : +a, b.length) === b
    },
  })
/*!
es6-promise - a tiny implementation of Promises/A+.
Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
Licensed under MIT license
See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
v4.2.4+314e4831
*/
window.ES6Promise = (function () {
  function t() {
    var t = setTimeout
    return function () {
      return t(r, 1)
    }
  }
  function r() {
    for (var t = 0; t < y; t += 2)
      (0, C[t])(C[t + 1]), (C[t] = void 0), (C[t + 1] = void 0)
    y = 0
  }
  function e(t, r) {
    var e = this,
      n = new this.constructor(o)
    void 0 === n[O] && _(n)
    var i = e._state
    if (i) {
      var s = arguments[i - 1]
      g(function () {
        return v(i, n, s, e._result)
      })
    } else l(e, n, t, r)
    return n
  }
  function n(t) {
    if (t && 'object' == typeof t && t.constructor === this) return t
    var r = new this(o)
    return u(r, t), r
  }
  function o() {}
  function i(t) {
    try {
      return t.then
    } catch (t) {
      return (q.error = t), q
    }
  }
  function s(t, r, o) {
    r.constructor === t.constructor && o === e && r.constructor.resolve === n
      ? (function (t, r) {
          r._state === x
            ? a(t, r._result)
            : r._state === F
            ? f(t, r._result)
            : l(
                r,
                void 0,
                function (r) {
                  return u(t, r)
                },
                function (r) {
                  return f(t, r)
                }
              )
        })(t, r)
      : o === q
      ? (f(t, q.error), (q.error = null))
      : void 0 === o
      ? a(t, r)
      : 'function' == typeof o
      ? (function (t, r, e) {
          g(function (t) {
            var n = !1,
              o = (function (t, r, e, n) {
                try {
                  t.call(r, e, n)
                } catch (t) {
                  return t
                }
              })(
                e,
                r,
                function (e) {
                  n || ((n = !0), r !== e ? u(t, e) : a(t, e))
                },
                function (r) {
                  n || ((n = !0), f(t, r))
                },
                t._label
              )
            !n && o && ((n = !0), f(t, o))
          }, t)
        })(t, r, o)
      : a(t, r)
  }
  function u(t, r) {
    if (t === r) f(t, new TypeError('cannot resolve promise w/ itself'))
    else {
      var e = typeof r
      null === r || ('object' !== e && 'function' !== e)
        ? a(t, r)
        : s(t, r, i(r))
    }
  }
  function c(t) {
    t._onerror && t._onerror(t._result), h(t)
  }
  function a(t, r) {
    t._state === P &&
      ((t._result = r), (t._state = x), 0 !== t._subscribers.length && g(h, t))
  }
  function f(t, r) {
    t._state === P && ((t._state = F), (t._result = r), g(c, t))
  }
  function l(t, r, e, n) {
    var o = t._subscribers,
      i = o.length
    ;(t._onerror = null),
      (o[i] = r),
      (o[i + x] = e),
      (o[i + F] = n),
      0 === i && t._state && g(h, t)
  }
  function h(t) {
    var r = t._subscribers,
      e = t._state
    if (0 !== r.length) {
      for (var n, o, i = t._result, s = 0; s < r.length; s += 3)
        (n = r[s]), (o = r[s + e]), n ? v(e, n, o, i) : o(i)
      t._subscribers.length = 0
    }
  }
  function v(t, r, e, n) {
    var o = 'function' == typeof e,
      i = void 0,
      s = void 0,
      c = void 0,
      l = void 0
    if (o) {
      try {
        i = e(n)
      } catch (t) {
        ;(q.error = t), (i = q)
      }
      if (
        (i === q ? ((l = !0), (s = i.error), (i.error = null)) : (c = !0),
        r === i)
      )
        return void f(r, new TypeError('Cannot return same promise'))
    } else (i = n), (c = !0)
    r._state === P &&
      (o && c ? u(r, i) : l ? f(r, s) : t === x ? a(r, i) : t === F && f(r, i))
  }
  function _(t) {
    ;(t[O] = U++),
      (t._state = void 0),
      (t._result = void 0),
      (t._subscribers = [])
  }
  var p,
    d = Array.isArray
      ? Array.isArray
      : function (t) {
          return '[object Array]' === Object.prototype.toString.call(t)
        },
    y = 0,
    w = void 0,
    m = void 0,
    g = function (t, e) {
      ;(C[y] = t), (C[y + 1] = e), 2 === (y += 2) && (m ? m(r) : T())
    },
    b = (p = 'undefined' != typeof window ? window : void 0) || {},
    A = b.MutationObserver || b.WebKitMutationObserver
  b = 'undefined' == typeof self
  var E,
    S,
    M,
    j =
      'undefined' != typeof Uint8ClampedArray &&
      'undefined' != typeof importScripts &&
      'undefined' != typeof MessageChannel,
    C = Array(1e3),
    T = void 0
  T = A
    ? ((E = 0),
      (S = new A(r)),
      (M = document.createTextNode('')),
      S.observe(M, { characterData: !0 }),
      function () {
        M.data = E = ++E % 2
      })
    : j
    ? (function () {
        var t = new MessageChannel()
        return (
          (t.port1.onmessage = r),
          function () {
            return t.port2.postMessage(0)
          }
        )
      })()
    : void 0 === p && 'function' == typeof require
    ? (function () {
        try {
          var e = Function('return this')().require('vertx')
          return void 0 !== (w = e.runOnLoop || e.runOnContext)
            ? function () {
                w(r)
              }
            : t()
        } catch (r) {
          return t()
        }
      })()
    : t()
  var O = Math.random().toString(36).substring(2),
    P = void 0,
    x = 1,
    F = 2,
    q = { error: null },
    U = 0,
    D = (function () {
      function t(t, r) {
        ;(this._instanceConstructor = t),
          (this.promise = new t(o)),
          this.promise[O] || _(this.promise),
          d(r)
            ? ((this._remaining = this.length = r.length),
              (this._result = Array(this.length)),
              0 === this.length
                ? a(this.promise, this._result)
                : ((this.length = this.length || 0),
                  this._enumerate(r),
                  0 === this._remaining && a(this.promise, this._result)))
            : f(this.promise, Error('Array Methods must be provided an Array'))
      }
      return (
        (t.prototype._enumerate = function (t) {
          for (var r = 0; this._state === P && r < t.length; r++)
            this._eachEntry(t[r], r)
        }),
        (t.prototype._eachEntry = function (t, r) {
          var u = this._instanceConstructor,
            c = u.resolve
          c === n
            ? (c = i(t)) === e && t._state !== P
              ? this._settledAt(t._state, r, t._result)
              : 'function' != typeof c
              ? (this._remaining--, (this._result[r] = t))
              : u === K
              ? (s((u = new u(o)), t, c), this._willSettleAt(u, r))
              : this._willSettleAt(
                  new u(function (r) {
                    return r(t)
                  }),
                  r
                )
            : this._willSettleAt(c(t), r)
        }),
        (t.prototype._settledAt = function (t, r, e) {
          var n = this.promise
          n._state === P &&
            (this._remaining--, t === F ? f(n, e) : (this._result[r] = e)),
            0 === this._remaining && a(n, this._result)
        }),
        (t.prototype._willSettleAt = function (t, r) {
          var e = this
          l(
            t,
            void 0,
            function (t) {
              return e._settledAt(x, r, t)
            },
            function (t) {
              return e._settledAt(F, r, t)
            }
          )
        }),
        t
      )
    })(),
    K = (function () {
      function t(r) {
        if (
          ((this[O] = U++),
          (this._result = this._state = void 0),
          (this._subscribers = []),
          o !== r)
        ) {
          if ('function' != typeof r)
            throw new TypeError('Must pass a resolver fn as 1st arg')
          if (!(this instanceof t))
            throw new TypeError(
              "Failed to construct 'Promise': Use the 'new' operator."
            )
          !(function (t, r) {
            try {
              r(
                function (r) {
                  u(t, r)
                },
                function (r) {
                  f(t, r)
                }
              )
            } catch (r) {
              f(t, r)
            }
          })(this, r)
        }
      }
      return (
        (t.prototype.catch = function (t) {
          return this.then(null, t)
        }),
        (t.prototype.finally = function (t) {
          var r = this.constructor
          return this.then(
            function (e) {
              return r.resolve(t()).then(function () {
                return e
              })
            },
            function (e) {
              return r.resolve(t()).then(function () {
                throw e
              })
            }
          )
        }),
        t
      )
    })()
  return (
    (K.prototype.then = e),
    (K.all = function (t) {
      return new D(this, t).promise
    }),
    (K.race = function (t) {
      var r = this
      return d(t)
        ? new r(function (e, n) {
            for (var o = t.length, i = 0; i < o; i++) r.resolve(t[i]).then(e, n)
          })
        : new r(function (t, r) {
            return r(new TypeError('Must pass array to race'))
          })
    }),
    (K.resolve = n),
    (K.reject = function (t) {
      var r = new this(o)
      return f(r, t), r
    }),
    (K._setScheduler = function (t) {
      m = t
    }),
    (K._setAsap = function (t) {
      g = t
    }),
    (K._asap = g),
    (K.polyfill = function () {
      var t = void 0
      if ('undefined' != typeof global) t = global
      else if ('undefined' != typeof self) t = self
      else
        try {
          t = Function('return this')()
        } catch (t) {
          throw Error('polyfill failed')
        }
      var r = t.Promise
      if (r) {
        var e = null
        try {
          e = Object.prototype.toString.call(r.resolve())
        } catch (t) {}
        if ('[object Promise]' === e && !r.cast) return
      }
      t.Promise = K
    }),
    (K.Promise = K),
    K.polyfill(),
    K
  )
})()
/*! https://github.com/WebReflection/es6-collections
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
;(function (e) {
  function d(a, b) {
    function c(a) {
      if (!this || this.constructor !== c) return new c(a)
      this._keys = []
      this._values = []
      this._itp = []
      this.objectOnly = b
      a && v.call(this, a)
    }
    b || w(a, 'size', { get: x })
    a.constructor = c
    c.prototype = a
    return c
  }
  function v(a) {
    this.add
      ? a.forEach(this.add, this)
      : a.forEach(function (a) {
          this.set(a[0], a[1])
        }, this)
  }
  function f(a) {
    this.has(a) &&
      (this._keys.splice(c, 1),
      this._values.splice(c, 1),
      this._itp.forEach(function (a) {
        c < a[0] && a[0]--
      }))
    return -1 < c
  }
  function m(a) {
    return this.has(a) ? this._values[c] : void 0
  }
  function n(a, b) {
    if (this.objectOnly && b !== Object(b))
      throw new TypeError('Invalid value used as weak collection key')
    if (b != b || 0 === b) for (c = a.length; c-- && !y(a[c], b); );
    else c = a.indexOf(b)
    return -1 < c
  }
  function p(a) {
    return n.call(this, this._values, a)
  }
  function q(a) {
    return n.call(this, this._keys, a)
  }
  function r(a, b) {
    this.has(a)
      ? (this._values[c] = b)
      : (this._values[this._keys.push(a) - 1] = b)
    return this
  }
  function t(a) {
    this.has(a) || this._values.push(a)
    return this
  }
  function h() {
    ;(this._keys || 0).length = this._values.length = 0
  }
  function z() {
    return k(this._itp, this._keys)
  }
  function l() {
    return k(this._itp, this._values)
  }
  function A() {
    return k(this._itp, this._keys, this._values)
  }
  function B() {
    return k(this._itp, this._values, this._values)
  }
  function k(a, b, c) {
    var g = [0],
      e = !1
    a.push(g)
    return {
      next: function () {
        var d = g[0]
        if (!e && d < b.length) {
          var f = c ? [b[d], c[d]] : b[d]
          g[0]++
        } else (e = !0), a.splice(a.indexOf(g), 1)
        return { done: e, value: f }
      },
    }
  }
  function x() {
    return this._values.length
  }
  function u(a, b) {
    for (var c = this.entries(); ; ) {
      var d = c.next()
      if (d.done) break
      a.call(b, d.value[1], d.value[0], this)
    }
  }
  var c,
    w = Object.defineProperty,
    y = function (a, b) {
      return a === b || (a !== a && b !== b)
    }
  'undefined' == typeof WeakMap &&
    (e.WeakMap = d({ delete: f, clear: h, get: m, has: q, set: r }, !0))
  ;('undefined' != typeof Map &&
    'function' === typeof new Map().values &&
    new Map().values().next) ||
    (e.Map = d({
      delete: f,
      has: q,
      get: m,
      set: r,
      keys: z,
      values: l,
      entries: A,
      forEach: u,
      clear: h,
    }))
  ;('undefined' != typeof Set &&
    'function' === typeof new Set().values &&
    new Set().values().next) ||
    (e.Set = d({
      has: p,
      add: t,
      delete: f,
      clear: h,
      keys: l,
      values: l,
      entries: B,
      forEach: u,
    }))
  'undefined' == typeof WeakSet &&
    (e.WeakSet = d({ delete: f, add: t, clear: h, has: p }, !0))
})(window)
/*!
whatwg-fetch, 2.0.3
https://github.com/github/fetch
Copyright (c) 2014-2016 GitHub, Inc. - MIT License
*/
;(function (e) {
  function l(a) {
    'string' !== typeof a && (a = String(a))
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))
      throw new TypeError('Invalid character in header field name')
    return a.toLowerCase()
  }
  function q(a) {
    'string' !== typeof a && (a = String(a))
    return a
  }
  function n(a) {
    var b = {
      next: function () {
        var b = a.shift()
        return { done: void 0 === b, value: b }
      },
    }
    g.iterable &&
      (b[Symbol.iterator] = function () {
        return b
      })
    return b
  }
  function d(a) {
    this.map = {}
    a instanceof d
      ? a.forEach(function (a, c) {
          this.append(c, a)
        }, this)
      : Array.isArray(a)
      ? a.forEach(function (a) {
          this.append(a[0], a[1])
        }, this)
      : a &&
        Object.getOwnPropertyNames(a).forEach(function (b) {
          this.append(b, a[b])
        }, this)
  }
  function p(a) {
    if (a.bodyUsed) return Promise.reject(new TypeError('Already read'))
    a.bodyUsed = !0
  }
  function r(a) {
    return new Promise(function (b, c) {
      a.onload = function () {
        b(a.result)
      }
      a.onerror = function () {
        c(a.error)
      }
    })
  }
  function w(a) {
    var b = new FileReader(),
      c = r(b)
    b.readAsArrayBuffer(a)
    return c
  }
  function x(a) {
    a = new Uint8Array(a)
    for (var b = Array(a.length), c = 0; c < a.length; c++)
      b[c] = String.fromCharCode(a[c])
    return b.join('')
  }
  function t(a) {
    if (a.slice) return a.slice(0)
    var b = new Uint8Array(a.byteLength)
    b.set(new Uint8Array(a))
    return b.buffer
  }
  function u() {
    this.bodyUsed = !1
    this._initBody = function (a) {
      if ((this._bodyInit = a))
        if ('string' === typeof a) this._bodyText = a
        else if (g.blob && Blob.prototype.isPrototypeOf(a)) this._bodyBlob = a
        else if (g.formData && FormData.prototype.isPrototypeOf(a))
          this._bodyFormData = a
        else if (g.searchParams && URLSearchParams.prototype.isPrototypeOf(a))
          this._bodyText = a.toString()
        else if (g.arrayBuffer && g.blob && y(a))
          (this._bodyArrayBuffer = t(a.buffer)),
            (this._bodyInit = new Blob([this._bodyArrayBuffer]))
        else if (
          g.arrayBuffer &&
          (ArrayBuffer.prototype.isPrototypeOf(a) || z(a))
        )
          this._bodyArrayBuffer = t(a)
        else throw Error('unsupported BodyInit type')
      else this._bodyText = ''
      this.headers.get('content-type') ||
        ('string' === typeof a
          ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
          : this._bodyBlob && this._bodyBlob.type
          ? this.headers.set('content-type', this._bodyBlob.type)
          : g.searchParams &&
            URLSearchParams.prototype.isPrototypeOf(a) &&
            this.headers.set(
              'content-type',
              'application/x-www-form-urlencoded;charset=UTF-8'
            ))
    }
    g.blob &&
      ((this.blob = function () {
        var a = p(this)
        if (a) return a
        if (this._bodyBlob) return Promise.resolve(this._bodyBlob)
        if (this._bodyArrayBuffer)
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        if (this._bodyFormData)
          throw Error('could not read FormData body as blob')
        return Promise.resolve(new Blob([this._bodyText]))
      }),
      (this.arrayBuffer = function () {
        return this._bodyArrayBuffer
          ? p(this) || Promise.resolve(this._bodyArrayBuffer)
          : this.blob().then(w)
      }))
    this.text = function () {
      var a = p(this)
      if (a) return a
      if (this._bodyBlob) {
        a = this._bodyBlob
        var b = new FileReader(),
          c = r(b)
        b.readAsText(a)
        return c
      }
      if (this._bodyArrayBuffer)
        return Promise.resolve(x(this._bodyArrayBuffer))
      if (this._bodyFormData)
        throw Error('could not read FormData body as text')
      return Promise.resolve(this._bodyText)
    }
    g.formData &&
      (this.formData = function () {
        return this.text().then(A)
      })
    this.json = function () {
      return this.text().then(JSON.parse)
    }
    return this
  }
  function k(a, b) {
    b = b || {}
    var c = b.body
    if (a instanceof k) {
      if (a.bodyUsed) throw new TypeError('Already read')
      this.url = a.url
      this.credentials = a.credentials
      b.headers || (this.headers = new d(a.headers))
      this.method = a.method
      this.mode = a.mode
      c || null == a._bodyInit || ((c = a._bodyInit), (a.bodyUsed = !0))
    } else this.url = String(a)
    this.credentials = b.credentials || this.credentials || 'omit'
    if (b.headers || !this.headers) this.headers = new d(b.headers)
    var v = b.method || this.method || 'GET',
      g = v.toUpperCase()
    this.method = -1 < B.indexOf(g) ? g : v
    this.mode = b.mode || this.mode || null
    this.referrer = null
    if (('GET' === this.method || 'HEAD' === this.method) && c)
      throw new TypeError('Body not allowed for GET or HEAD requests')
    this._initBody(c)
  }
  function A(a) {
    var b = new FormData()
    a.trim()
      .split('&')
      .forEach(function (a) {
        if (a) {
          var c = a.split('=')
          a = c.shift().replace(/\+/g, ' ')
          c = c.join('=').replace(/\+/g, ' ')
          b.append(decodeURIComponent(a), decodeURIComponent(c))
        }
      })
    return b
  }
  function C(a) {
    var b = new d()
    a.replace(/\r?\n[\t ]+/g, ' ')
      .split(/\r?\n/)
      .forEach(function (a) {
        var c = a.split(':')
        if ((a = c.shift().trim())) (c = c.join(':').trim()), b.append(a, c)
      })
    return b
  }
  function h(a, b) {
    b || (b = {})
    this.type = 'default'
    this.status = void 0 === b.status ? 200 : b.status
    this.ok = 200 <= this.status && 300 > this.status
    this.statusText = 'statusText' in b ? b.statusText : 'OK'
    this.headers = new d(b.headers)
    this.url = b.url || ''
    this._initBody(a)
  }
  if (!e.fetch) {
    var D = 'Symbol' in e && 'iterator' in Symbol,
      m
    if ((m = 'FileReader' in e && 'Blob' in e))
      try {
        new Blob(), (m = !0)
      } catch (a) {
        m = !1
      }
    var g = {
      searchParams: 'URLSearchParams' in e,
      iterable: D,
      blob: m,
      formData: 'FormData' in e,
      arrayBuffer: 'ArrayBuffer' in e,
    }
    if (g.arrayBuffer) {
      var E =
        '[object Int8Array];[object Uint8Array];[object Uint8ClampedArray];[object Int16Array];[object Uint16Array];[object Int32Array];[object Uint32Array];[object Float32Array];[object Float64Array]'.split(
          ';'
        )
      var y = function (a) {
        return a && DataView.prototype.isPrototypeOf(a)
      }
      var z =
        ArrayBuffer.isView ||
        function (a) {
          return a && -1 < E.indexOf(Object.prototype.toString.call(a))
        }
    }
    d.prototype.append = function (a, b) {
      a = l(a)
      b = q(b)
      var c = this.map[a]
      this.map[a] = c ? c + ',' + b : b
    }
    d.prototype['delete'] = function (a) {
      delete this.map[l(a)]
    }
    d.prototype.get = function (a) {
      a = l(a)
      return this.has(a) ? this.map[a] : null
    }
    d.prototype.has = function (a) {
      return this.map.hasOwnProperty(l(a))
    }
    d.prototype.set = function (a, b) {
      this.map[l(a)] = q(b)
    }
    d.prototype.forEach = function (a, b) {
      for (var c in this.map)
        this.map.hasOwnProperty(c) && a.call(b, this.map[c], c, this)
    }
    d.prototype.keys = function () {
      var a = []
      this.forEach(function (b, c) {
        a.push(c)
      })
      return n(a)
    }
    d.prototype.values = function () {
      var a = []
      this.forEach(function (b) {
        a.push(b)
      })
      return n(a)
    }
    d.prototype.entries = function () {
      var a = []
      this.forEach(function (b, c) {
        a.push([c, b])
      })
      return n(a)
    }
    g.iterable && (d.prototype[Symbol.iterator] = d.prototype.entries)
    var B = 'DELETE GET HEAD OPTIONS POST PUT'.split(' ')
    k.prototype.clone = function () {
      return new k(this, { body: this._bodyInit })
    }
    u.call(k.prototype)
    u.call(h.prototype)
    h.prototype.clone = function () {
      return new h(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new d(this.headers),
        url: this.url,
      })
    }
    h.error = function () {
      var a = new h(null, { status: 0, statusText: '' })
      a.type = 'error'
      return a
    }
    var F = [301, 302, 303, 307, 308]
    h.redirect = function (a, b) {
      if (-1 === F.indexOf(b)) throw new RangeError('Invalid status code')
      return new h(null, { status: b, headers: { location: a } })
    }
    e.Headers = d
    e.Request = k
    e.Response = h
    e.fetch = function (a, b) {
      return new Promise(function (c, d) {
        var e = new k(a, b),
          f = new XMLHttpRequest()
        f.onload = function () {
          var a = {
            status: f.status,
            statusText: f.statusText,
            headers: C(f.getAllResponseHeaders() || ''),
          }
          a.url =
            'responseURL' in f ? f.responseURL : a.headers.get('X-Request-URL')
          c(new h('response' in f ? f.response : f.responseText, a))
        }
        f.onerror = function () {
          d(new TypeError('Network request failed'))
        }
        f.ontimeout = function () {
          d(new TypeError('Network request failed'))
        }
        f.open(e.method, e.url, !0)
        'include' === e.credentials
          ? (f.withCredentials = !0)
          : 'omit' === e.credentials && (f.withCredentials = !1)
        'responseType' in f && g.blob && (f.responseType = 'blob')
        e.headers.forEach(function (a, b) {
          f.setRequestHeader(b, a)
        })
        f.send('undefined' === typeof e._bodyInit ? null : e._bodyInit)
      })
    }
    e.fetch.polyfill = !0
  }
})('undefined' !== typeof self ? self : window)
/*!
url-polyfill, 1.0.14
https://github.com/lifaon74/url-polyfill
MIT Licensed
*/
;(function (e) {
  var t = function () {
    try {
      return !!Symbol.iterator
    } catch (e) {
      return false
    }
  }
  var n = t()
  var r = function (e) {
    var t = {
      next: function () {
        var t = e.shift()
        return { done: t === void 0, value: t }
      },
    }
    if (n) {
      t[Symbol.iterator] = function () {
        return t
      }
    }
    return t
  }
  var i = function (e) {
    return encodeURIComponent(e).replace(/%20/g, '+')
  }
  var o = function (e) {
    return decodeURIComponent(e).replace(/\+/g, ' ')
  }
  var a = function () {
    var t = function (e) {
      Object.defineProperty(this, '_entries', { value: {} })
      if (typeof e === 'string') {
        if (e !== '') {
          e = e.replace(/^\?/, '')
          var n = e.split('&')
          var r
          for (var i = 0; i < n.length; i++) {
            r = n[i].split('=')
            this.append(o(r[0]), r.length > 1 ? o(r[1]) : '')
          }
        }
      } else if (e instanceof t) {
        var a = this
        e.forEach(function (e, t) {
          a.append(e, t)
        })
      }
    }
    var a = t.prototype
    a.append = function (e, t) {
      if (e in this._entries) {
        this._entries[e].push(t.toString())
      } else {
        this._entries[e] = [t.toString()]
      }
    }
    a.delete = function (e) {
      delete this._entries[e]
    }
    a.get = function (e) {
      return e in this._entries ? this._entries[e][0] : null
    }
    a.getAll = function (e) {
      return e in this._entries ? this._entries[e].slice(0) : []
    }
    a.has = function (e) {
      return e in this._entries
    }
    a.set = function (e, t) {
      this._entries[e] = [t.toString()]
    }
    a.forEach = function (e, t) {
      var n
      for (var r in this._entries) {
        if (this._entries.hasOwnProperty(r)) {
          n = this._entries[r]
          for (var i = 0; i < n.length; i++) {
            e.call(t, n[i], r, this)
          }
        }
      }
    }
    a.keys = function () {
      var e = []
      this.forEach(function (t, n) {
        e.push(n)
      })
      return r(e)
    }
    a.values = function () {
      var e = []
      this.forEach(function (t) {
        e.push(t)
      })
      return r(e)
    }
    a.entries = function () {
      var e = []
      this.forEach(function (t, n) {
        e.push([n, t])
      })
      return r(e)
    }
    if (n) {
      a[Symbol.iterator] = a.entries
    }
    a.toString = function () {
      var e = []
      this.forEach(function (t, n) {
        e.push(i(n) + '=' + i(t))
      })
      return e.join('&')
    }
    e.URLSearchParams = t
  }
  if (
    !('URLSearchParams' in e) ||
    new URLSearchParams('?a=1').toString() !== 'a=1'
  ) {
    a()
  }
})(
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
    ? window
    : typeof self !== 'undefined'
    ? self
    : this
)
;(function (e) {
  var t = function () {
    try {
      var e = new URL('b', 'http://a')
      e.pathname = 'c%20d'
      return e.href === 'http://a/c%20d' && e.searchParams
    } catch (e) {
      return false
    }
  }
  var n = function () {
    var t = e.URL
    var n = function (e, t) {
      if (typeof e !== 'string') e = String(e)
      var n = document.implementation.createHTMLDocument('')
      window.doc = n
      if (t) {
        var r = n.createElement('base')
        r.href = t
        n.head.appendChild(r)
      }
      var i = n.createElement('a')
      i.href = e
      n.body.appendChild(i)
      i.href = i.href
      if (i.protocol === ':' || !/:/.test(i.href)) {
        throw new TypeError('Invalid URL')
      }
      Object.defineProperty(this, '_anchorElement', { value: i })
    }
    var r = n.prototype
    var i = function (e) {
      Object.defineProperty(r, e, {
        get: function () {
          return this._anchorElement[e]
        },
        set: function (t) {
          this._anchorElement[e] = t
        },
        enumerable: true,
      })
    }
    ;['hash', 'host', 'hostname', 'port', 'protocol', 'search'].forEach(
      function (e) {
        i(e)
      }
    )
    Object.defineProperties(r, {
      toString: {
        get: function () {
          var e = this
          return function () {
            return e.href
          }
        },
      },
      href: {
        get: function () {
          return this._anchorElement.href.replace(/\?$/, '')
        },
        set: function (e) {
          this._anchorElement.href = e
        },
        enumerable: true,
      },
      pathname: {
        get: function () {
          return this._anchorElement.pathname.replace(/(^\/?)/, '/')
        },
        set: function (e) {
          this._anchorElement.pathname = e
        },
        enumerable: true,
      },
      origin: {
        get: function () {
          var e = { 'http:': 80, 'https:': 443, 'ftp:': 21 }[
            this._anchorElement.protocol
          ]
          var t =
            this._anchorElement.port != e && this._anchorElement.port !== ''
          return (
            this._anchorElement.protocol +
            '//' +
            this._anchorElement.hostname +
            (t ? ':' + this._anchorElement.port : '')
          )
        },
        enumerable: true,
      },
      password: {
        get: function () {
          return ''
        },
        set: function (e) {},
        enumerable: true,
      },
      username: {
        get: function () {
          return ''
        },
        set: function (e) {},
        enumerable: true,
      },
      searchParams: {
        get: function () {
          var e = new URLSearchParams(this.search)
          var t = this
          ;['append', 'delete', 'set'].forEach(function (n) {
            var r = e[n]
            e[n] = function () {
              r.apply(e, arguments)
              t.search = e.toString()
            }
          })
          return e
        },
        enumerable: true,
      },
    })
    n.createObjectURL = function (e) {
      return t.createObjectURL.apply(t, arguments)
    }
    n.revokeObjectURL = function (e) {
      return t.revokeObjectURL.apply(t, arguments)
    }
    e.URL = n
  }
  if (!t()) {
    n()
  }
  if (e.location !== void 0 && !('origin' in e.location)) {
    var r = function () {
      return (
        e.location.protocol +
        '//' +
        e.location.hostname +
        (e.location.port ? ':' + e.location.port : '')
      )
    }
    try {
      Object.defineProperty(e.location, 'origin', { get: r, enumerable: true })
    } catch (t) {
      setInterval(function () {
        e.location.origin = r()
      }, 100)
    }
  }
})(
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
    ? window
    : typeof self !== 'undefined'
    ? self
    : this
)
/*! Built with http://stenciljs.com */
;(function (w, d, x, n, h, c, r) {
  'use strict'
  ;(function (s) {
    s && (r = s.getAttribute('data-resources-url'))
  })(d.querySelector("script[data-namespace='ionicons']"))
  function t(n, t) {
    return 'sc-' + n.t + (t && t !== S ? '-' + t : '')
  }
  function e(n, t) {
    return n + (t ? '-h' : '-s')
  }
  function i(n, t, r, e, i) {
    if (e) {
      var u = t.t + (i || S)
      t[u] || (t[u] = e)
    }
  }
  function u(n, t) {
    for (var r, e, i = null, u = !1, o = !1, f = arguments.length; f-- > 2; )
      B.push(arguments[f])
    for (; B.length > 0; ) {
      var c = B.pop()
      if (c && void 0 !== c.pop) for (f = c.length; f--; ) B.push(c[f])
      else
        'boolean' == typeof c && (c = null),
          (o = 'function' != typeof n) &&
            (null == c
              ? (c = '')
              : 'number' == typeof c
              ? (c = String(c))
              : 'string' != typeof c && (o = !1)),
          o && u
            ? (i[i.length - 1].vtext += c)
            : null === i
            ? (i = [o ? { vtext: c } : c])
            : i.push(o ? { vtext: c } : c),
          (u = o)
    }
    if (null != t) {
      if (
        (t.className && (t.class = t.className), 'object' == typeof t.class)
      ) {
        for (f in t.class) t.class[f] && B.push(f)
        ;(t.class = B.join(' ')), (B.length = 0)
      }
      null != t.key && (r = t.key), null != t.name && (e = t.name)
    }
    return 'function' == typeof n
      ? n(t, i || [], _)
      : {
          vtag: n,
          vchildren: i,
          vtext: void 0,
          vattrs: t,
          vkey: r,
          vname: e,
          i: void 0,
          u: !1,
        }
  }
  function o(n, t, r) {
    n.lastIndex = 0
    var e = t.substring(r).match(n)
    if (e) {
      var i = r + e.index
      return { start: i, end: i + e[0].length }
    }
    return null
  }
  function f(n, t, r) {
    var e = (function i(n, t) {
      var r = o(vn, n, t)
      if (!r) return null
      var e = (function i(n, t) {
          for (var r = 0, e = t; e < n.length; e++) {
            var i = n[e]
            if ('(' === i) r++
            else if (')' === i && --r <= 0) return e + 1
          }
          return e
        })(n, r.start),
        u = n.substring(r.end, e - 1).split(','),
        f = u[0],
        c = u.slice(1)
      return {
        start: r.start,
        end: e,
        o: f.trim(),
        fallback: c.length > 0 ? c.join(',').trim() : void 0,
      }
    })(n, r)
    if (!e) return t.push(n.substring(r, n.length)), n.length
    var u = e.o,
      f = null != e.fallback ? l(e.fallback) : void 0
    return (
      t.push(n.substring(r, e.start), function (n) {
        return (function t(n, r, e) {
          return n[r] ? n[r] : e ? a(e, n) : ''
        })(n, u, f)
      }),
      e.end
    )
  }
  function a(n, t) {
    for (var r = '', e = 0; e < n.length; e++) {
      var i = n[e]
      r += 'string' == typeof i ? i : i(t)
    }
    return r
  }
  function s(n, t) {
    for (var r = !1, e = !1, i = t; i < n.length; i++) {
      var u = n[i]
      if (r) e && '"' === u && (r = !1), e || "'" !== u || (r = !1)
      else if ('"' === u) (r = !0), (e = !0)
      else if ("'" === u) (r = !0), (e = !1)
      else {
        if (';' === u) return i + 1
        if ('}' === u) return i
      }
    }
    return i
  }
  function l(n) {
    var t = 0
    n = (function r(n) {
      for (var t = '', r = 0; ; ) {
        var e = o(pn, n, r),
          i = e ? e.start : n.length
        if (((t += n.substring(r, i)), !e)) break
        r = s(n, i)
      }
      return t
    })((n = n.replace(hn, ''))).replace(dn, '')
    for (var e = []; t < n.length; ) t = f(n, e, t)
    return e
  }
  function v(n) {
    var t = {}
    n.forEach(function (n) {
      n.s.forEach(function (n) {
        t[n.l] = n.value
      })
    })
    for (
      var r = {},
        e = Object.entries(t),
        i = function () {
          var n = !1
          if (
            (e.forEach(function (t) {
              var e = t[0],
                i = a(t[1], r)
              i !== r[e] && ((r[e] = i), (n = !0))
            }),
            !n)
          )
            return 'break'
        },
        u = 0;
      u < 10 && 'break' !== i();
      u++
    );
    return r
  }
  function p(n, t) {
    if ((void 0 === t && (t = 0), !n.rules)) return []
    var r = []
    return (
      n.rules
        .filter(function (n) {
          return n.type === un.STYLE_RULE
        })
        .forEach(function (n) {
          var e = (function i(n) {
            for (var t, r = []; (t = yn.exec(n.trim())); ) {
              var e = m(t[2]),
                i = e.value,
                u = e.v
              r.push({ l: t[1].trim(), value: l(i), v: u })
            }
            return r
          })(n.cssText)
          e.length > 0 &&
            n.parsedSelector.split(',').forEach(function (n) {
              ;(n = n.trim()), r.push({ selector: n, s: e, p: 1, m: t })
            }),
            t++
        }),
      r
    )
  }
  function m(n) {
    var t = (n = n.replace(/\s+/gim, ' ').trim()).endsWith(mn)
    return (
      t && (n = n.substr(0, n.length - mn.length).trim()), { value: n, v: t }
    )
  }
  function y(n) {
    var t = []
    return (
      n.forEach(function (n) {
        t.push.apply(t, n.g)
      }),
      t
    )
  }
  function b(n) {
    var t = (function r(n) {
        return (function n(t, r) {
          var e = r.substring(t.start, t.end - 1)
          if (((t.parsedCssText = t.cssText = e.trim()), t.parent)) {
            var i = t.previous ? t.previous.end : t.parent.start
            e = (e = (e = (function u(n) {
              return n.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
                for (var n = arguments[1], t = 6 - n.length; t--; ) n = '0' + n
                return '\\' + n
              })
            })((e = r.substring(i, t.start - 1)))).replace(
              cn.k,
              ' '
            )).substring(e.lastIndexOf(';') + 1)
            var o = (t.parsedSelector = t.selector = e.trim())
            ;(t.atRule = 0 === o.indexOf(ln)),
              t.atRule
                ? 0 === o.indexOf(sn)
                  ? (t.type = un.MEDIA_RULE)
                  : o.match(cn.M) &&
                    ((t.type = un.KEYFRAMES_RULE),
                    (t.keyframesName = t.selector.split(cn.k).pop()))
                : 0 === o.indexOf(an)
                ? (t.type = un.j)
                : (t.type = un.STYLE_RULE)
          }
          var f = t.rules
          if (f)
            for (var c = 0, a = f.length, s = void 0; c < a && (s = f[c]); c++)
              n(s, r)
          return t
        })(
          (function r(n) {
            var t = new en()
            ;(t.start = 0), (t.end = n.length)
            for (var r = t, e = 0, i = n.length; e < i; e++)
              if (n[e] === on) {
                r.rules || (r.rules = [])
                var u = r,
                  o = u.rules[u.rules.length - 1] || null
                ;((r = new en()).start = e + 1),
                  (r.parent = u),
                  (r.previous = o),
                  u.rules.push(r)
              } else n[e] === fn && ((r.end = e + 1), (r = r.parent || t))
            return t
          })(
            (n = (function t(n) {
              return n.replace(cn.O, '').replace(cn.port, '')
            })(n))
          ),
          n
        )
      })(n),
      e = l(n)
    return { S: n, C: e, g: p(t), W: e.length > 1 }
  }
  function g(n, t) {
    var r = b(t.innerHTML)
    ;(r.A = t), n.push(r)
  }
  function k(n, t, r) {
    return (function e(n, t, r) {
      return n.replace(new RegExp(t, 'g'), r)
    })(n, '\\.' + t, '.' + r)
  }
  function M(n, t, r) {
    var e = r.href
    return fetch(e)
      .then(function (n) {
        return n.text()
      })
      .then(function (i) {
        if (
          (function u(n) {
            return n.indexOf('var(') > -1 || bn.test(n)
          })(i) &&
          r.parentNode
        ) {
          ;(function o(n) {
            return (wn.lastIndex = 0), wn.test(n)
          })(i) &&
            (i = (function f(n, t) {
              var r = t.replace(/[^\/]*$/, '')
              return n.replace(wn, function (n, t) {
                var e = r + t
                return n.replace(t, e)
              })
            })(i, e))
          var c = n.createElement('style')
          ;(c.innerHTML = i),
            g(t, c),
            r.parentNode.insertBefore(c, r),
            r.remove()
        }
      })
      .catch(function (n) {
        console.error(n)
      })
  }
  var $,
    j =
      (this && this.R) ||
      function (n, t, r, e) {
        return new (r || (r = Promise))(function (i, u) {
          function o(n) {
            try {
              c(e.next(n))
            } catch (n) {
              u(n)
            }
          }
          function f(n) {
            try {
              c(e.throw(n))
            } catch (n) {
              u(n)
            }
          }
          function c(n) {
            n.done
              ? i(n.value)
              : new r(function (t) {
                  t(n.value)
                }).then(o, f)
          }
          c((e = e.apply(n, t || [])).next())
        })
      },
    E =
      (this && this.N) ||
      function (n, t) {
        function r(r) {
          return function (o) {
            return (function c(r) {
              if (e) throw new TypeError('Generator is already executing.')
              for (; f; )
                try {
                  if (
                    ((e = 1),
                    i &&
                      (u =
                        2 & r[0]
                          ? i.return
                          : r[0]
                          ? i.throw || ((u = i.return) && u.call(i), 0)
                          : i.next) &&
                      !(u = u.call(i, r[1])).done)
                  )
                    return u
                  switch (((i = 0), u && (r = [2 & r[0], u.value]), r[0])) {
                    case 0:
                    case 1:
                      u = r
                      break
                    case 4:
                      return f.label++, { value: r[1], done: !1 }
                    case 5:
                      f.label++, (i = r[1]), (r = [0])
                      continue
                    case 7:
                      ;(r = f.T.pop()), f.L.pop()
                      continue
                    default:
                      if (
                        !(u = (u = f.L).length > 0 && u[u.length - 1]) &&
                        (6 === r[0] || 2 === r[0])
                      ) {
                        f = 0
                        continue
                      }
                      if (3 === r[0] && (!u || (r[1] > u[0] && r[1] < u[3]))) {
                        f.label = r[1]
                        break
                      }
                      if (6 === r[0] && f.label < u[1]) {
                        ;(f.label = u[1]), (u = r)
                        break
                      }
                      if (u && f.label < u[2]) {
                        ;(f.label = u[2]), f.T.push(r)
                        break
                      }
                      u[2] && f.T.pop(), f.L.pop()
                      continue
                  }
                  r = t.call(n, f)
                } catch (n) {
                  ;(r = [6, n]), (i = 0)
                } finally {
                  e = u = 0
                }
              if (5 & r[0]) throw r[1]
              return { value: r[0] ? r[1] : void 0, done: !0 }
            })([r, o])
          }
        }
        var e,
          i,
          u,
          o,
          f = {
            label: 0,
            P: function () {
              if (1 & u[0]) throw u[1]
              return u[1]
            },
            L: [],
            T: [],
          }
        return (
          (o = { next: r(0), throw: r(1), return: r(2) }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this
            }),
          o
        )
      },
    O = this,
    S = '$',
    C = {},
    W = function (n) {
      return null != n
    },
    A = function (n) {
      return n.toLowerCase()
    },
    R = function (n, t, r, e, i) {
      void 0 === e && (e = 'boolean' == typeof r),
        (i = t !== (t = t.replace(/^xlink\:?/, ''))),
        null == r || (e && (!r || 'false' === r))
          ? i
            ? n.removeAttributeNS(N, A(t))
            : n.removeAttribute(t)
          : 'function' != typeof r &&
            ((r = e ? '' : r.toString()),
            i ? n.setAttributeNS(N, A(t), r) : n.setAttribute(t, r))
    },
    N = 'http://www.w3.org/1999/xlink',
    T = function (n, t, r, e, i, u, o) {
      if ('class' !== r || u)
        if ('style' === r) {
          for (var f in e)
            (i && null != i[f]) ||
              (/-/.test(f) ? t.style.removeProperty(f) : (t.style[f] = ''))
          for (var f in i)
            (e && i[f] === e[f]) ||
              (/-/.test(f) ? t.style.setProperty(f, i[f]) : (t.style[f] = i[f]))
        } else if (
          'o' !== r[0] ||
          'n' !== r[1] ||
          !/[A-Z]/.test(r[2]) ||
          r in t
        )
          if (
            'list' !== r &&
            'type' !== r &&
            !u &&
            (r in t ||
              (-1 !== ['object', 'function'].indexOf(typeof i) && null !== i))
          ) {
            var c = n.I(t)
            c && c.D && c.D[r]
              ? (P(t, r, i), o && c.D[r].q && R(t, c.D[r].U, i, 4 === c.D[r].B))
              : 'ref' !== r &&
                (P(t, r, null == i ? '' : i),
                (null != i && !1 !== i) || n.F._(t, r))
          } else
            null != i && 'key' !== r
              ? R(t, r, i)
              : (u || (n.F.H(t, r) && (null == i || !1 === i))) && n.F._(t, r)
        else
          (r = A(r) in t ? A(r.substring(2)) : A(r[2]) + r.substring(3)),
            i ? i !== e && n.F.Y(t, r, i, 0) : n.F.Z(t, r, 0)
      else if (e !== i) {
        var a = L(e),
          s = L(i),
          l = a.filter(function (n) {
            return !s.includes(n)
          }),
          v = L(t.className).filter(function (n) {
            return !l.includes(n)
          }),
          p = s.filter(function (n) {
            return !a.includes(n) && !v.includes(n)
          })
        v.push.apply(v, p), (t.className = v.join(' '))
      }
    },
    L = function (n) {
      return null == n || '' === n ? [] : n.trim().split(/\s+/)
    },
    P = function (n, t, r) {
      try {
        n[t] = r
      } catch (n) {}
    },
    I = function (n, t, r, e, i) {
      var u = 11 === r.i.nodeType && r.i.host ? r.i.host : r.i,
        o = (t && t.vattrs) || C,
        f = r.vattrs || C
      for (i in o)
        (f && null != f[i]) || null == o[i] || T(n, u, i, o[i], void 0, e, r.u)
      for (i in f)
        (i in o && f[i] === ('value' === i || 'checked' === i ? u[i] : o[i])) ||
          T(n, u, i, o[i], f[i], e, r.u)
    },
    D = !1,
    q = function (n, t) {
      n &&
        (n.vattrs && n.vattrs.ref && n.vattrs.ref(t ? null : n.i),
        n.vchildren &&
          n.vchildren.forEach(function (n) {
            q(n, t)
          }))
    },
    U = function (n, t) {
      var r = 0,
        e = !1,
        i = function () {
          return t.performance.now()
        },
        u = !1 !== n.asyncQueue,
        o = Promise.resolve(),
        f = [],
        c = [],
        a = [],
        s = [],
        l = function (t) {
          return function (r) {
            t.push(r), e || ((e = !0), n.raf(h))
          }
        },
        v = function (n) {
          for (var t = 0; t < n.length; t++)
            try {
              n[t](i())
            } catch (n) {
              console.error(n)
            }
          n.length = 0
        },
        p = function (n, t) {
          for (var r, e = 0; e < n.length && (r = i()) < t; )
            try {
              n[e++](r)
            } catch (n) {
              console.error(n)
            }
          e === n.length ? (n.length = 0) : 0 !== e && n.splice(0, e)
        },
        h = function () {
          r++, v(c)
          var t = u ? i() + 7 * Math.ceil(r * (1 / 22)) : Infinity
          p(a, t),
            p(s, t),
            a.length > 0 && (s.push.apply(s, a), (a.length = 0)),
            (e = c.length + a.length + s.length > 0) ? n.raf(h) : (r = 0)
        }
      return (
        n.raf || (n.raf = t.requestAnimationFrame.bind(t)),
        {
          tick: function (n) {
            f.push(n),
              1 === f.length &&
                o.then(function () {
                  return v(f)
                })
          },
          read: l(c),
          write: l(a),
        }
      )
    },
    B = [],
    _ = {
      forEach: function (n, t) {
        return n.forEach(t)
      },
      map: function (n, t) {
        return n.map(t)
      },
    },
    F = function (n) {
      return { G: n[0], K: n[1], X: !!n[2], J: !!n[3], V: !!n[4] }
    },
    H = function (n, t) {
      return W(t) && 'object' != typeof t && 'function' != typeof t
        ? n === Boolean || 4 === n
          ? 'false' !== t && ('' === t || !!t)
          : n === Number || 8 === n
          ? parseFloat(t)
          : n === String || 2 === n
          ? t.toString()
          : t
        : t
    },
    Y = function (n, t, r) {
      n.nn.add(t),
        n.tn.has(t) ||
          (n.tn.set(t, !0),
          n.rn
            ? n.queue.write(function () {
                return Z(n, t, r)
              })
            : n.queue.tick(function () {
                return Z(n, t, r)
              }))
    },
    Z = function (n, t, r, i, o, f) {
      return j(O, void 0, void 0, function () {
        var i, c
        return E(this, function (a) {
          switch (a.label) {
            case 0:
              if ((n.tn.delete(t), n.en.has(t))) return [3, 12]
              if ((o = n.in.get(t))) return [3, 6]
              if ((f = n.un.get(t)) && !f['s-rn'])
                return (
                  (f['s-rc'] = f['s-rc'] || []).push(function () {
                    Z(n, t, r)
                  }),
                  [2]
                )
              if (!(o = X(n, t, n.on.get(t), r))) return [3, 5]
              a.label = 1
            case 1:
              return (
                a.L.push([1, 4, , 5]),
                o.componentWillLoad ? [4, o.componentWillLoad()] : [3, 3]
              )
            case 2:
              a.P(), (a.label = 3)
            case 3:
              return [3, 5]
            case 4:
              return (i = a.P()), n.fn(i, 3, t), [3, 5]
            case 5:
            case 6:
              return [3, 11]
            case 7:
              return (
                a.L.push([7, 10, , 11]),
                o.componentWillUpdate ? [4, o.componentWillUpdate()] : [3, 9]
              )
            case 8:
              a.P(), (a.label = 9)
            case 9:
              return [3, 11]
            case 10:
              return (c = a.P()), n.fn(c, 5, t), [3, 11]
            case 11:
              ;(function (n, t, r, i) {
                try {
                  var o,
                    f = t.cn.host,
                    c = t.cn.encapsulation,
                    a = 'shadow' === c && n.F.an,
                    s = r
                  if (
                    ((o = (function (n, t, r) {
                      return (
                        n &&
                          Object.keys(n).forEach(function (e) {
                            n[e].reflectToAttr && ((r = r || {})[e] = t[e])
                          }),
                        r
                      )
                    })(t.cn.properties, i)),
                    a && (s = r.shadowRoot),
                    !r['s-rn'])
                  ) {
                    n.sn(n, n.F, t, r)
                    var l = r['s-sc']
                    l &&
                      (n.F.ln(r, e(l, !0)), 'scoped' === c && n.F.ln(r, e(l)))
                  }
                  if (i.render || i.hostData || f || o) {
                    n.vn = !0
                    var v = i.render && i.render(),
                      p = void 0
                    ;(p = i.hostData && i.hostData()),
                      o && (p = p ? Object.assign(p, o) : o),
                      (n.vn = !1)
                    var h = u(null, p, v),
                      d = n.pn.get(r) || {}
                    ;(d.i = s), (h.u = !0), n.pn.set(r, n.render(r, d, h, a, c))
                  }
                  n.hn && n.hn.updateHost(r),
                    (r['s-rn'] = !0),
                    r['s-rc'] &&
                      (r['s-rc'].forEach(function (n) {
                        return n()
                      }),
                      (r['s-rc'] = null))
                } catch (t) {
                  ;(n.vn = !1), n.fn(t, 8, r, !0)
                }
              })(n, n.I(t), t, o),
                t['s-init'](),
                (a.label = 12)
            case 12:
              return [2]
          }
        })
      })
    },
    z = function (n, t, r, e, i, u, o) {
      ;(o = n.dn.get(t)) || n.dn.set(t, (o = {}))
      var f = o[r]
      if (e !== f && ((o[r] = e), (u = n.in.get(t)))) {
        var c = o[Q + r]
        if (c)
          for (var a = 0; a < c.length; a++)
            try {
              u[c[a]].call(u, e, f, r)
            } catch (n) {
              console.error(n)
            }
        !n.vn && t['s-rn'] && Y(n, t, i)
      }
    },
    G = function (n, t, r) {
      Object.defineProperty(n, t, { configurable: !0, value: r })
    },
    K = function (n, t, r, e) {
      Object.defineProperty(n, t, { configurable: !0, get: r, set: e })
    },
    Q = 'wc-',
    X = function (n, t, r, e, i, u) {
      try {
        ;(i = new (u = n.I(t).cn)()),
          (function (n, t, r, e, i, u) {
            n.mn.set(e, r),
              n.dn.has(r) || n.dn.set(r, {}),
              Object.entries(
                Object.assign({ color: { type: String } }, t.properties, {
                  mode: { type: String },
                })
              ).forEach(function (t) {
                var o = t[0],
                  f = t[1]
                ;(function (n, t, r, e, i, u, o, f, c) {
                  if (t.type || t.state) {
                    var a = n.dn.get(r)
                    t.state ||
                      (!t.attr ||
                        (void 0 !== a[i] && '' !== a[i]) ||
                        ((f = u && u.yn) &&
                          W((c = f[t.attr])) &&
                          (a[i] = H(t.type, c))),
                      r.hasOwnProperty(i) &&
                        (void 0 === a[i] && (a[i] = H(t.type, r[i])),
                        'mode' !== i && delete r[i])),
                      e.hasOwnProperty(i) && void 0 === a[i] && (a[i] = e[i]),
                      t.watchCallbacks && (a[Q + i] = t.watchCallbacks.slice()),
                      K(
                        e,
                        i,
                        function s(t) {
                          return (t = n.dn.get(n.mn.get(this))) && t[i]
                        },
                        function l(r, e) {
                          ;(e = n.mn.get(this)) &&
                            (t.state || t.mutable) &&
                            z(n, e, i, r, o)
                        }
                      )
                  } else if (t.elementRef) G(e, i, r)
                  else if (t.context) {
                    var v = n.bn(t.context)
                    void 0 !== v &&
                      G(e, i, (v.getContext && v.getContext(r)) || v)
                  }
                })(n, f, r, e, o, i, u)
              })
          })(n, u, t, i, r, e)
      } catch (r) {
        ;(i = {}), n.fn(r, 7, t, !0)
      }
      return n.in.set(t, i), i
    },
    J = function (n, t) {
      for (var r = 0; r < t.childNodes.length; r++) {
        var e = t.childNodes[r]
        if (1 === e.nodeType) {
          if (n.I(e) && !n.wn.has(e)) return !1
          if (!J(n, e)) return !1
        }
      }
      return !0
    },
    V = function (n, t, r, e, i, u) {
      if (
        (n.nn.delete(t),
        (i = n.un.get(t)) &&
          ((e = i['s-ld']) &&
            ((r = e.indexOf(t)) > -1 && e.splice(r, 1),
            e.length || (i['s-init'] && i['s-init']())),
          n.un.delete(t)),
        n.gn.length && !n.nn.size)
      )
        for (; (u = n.gn.shift()); ) u()
    },
    nn = function (n, t, r, e, i) {
      if (
        ((r.connectedCallback = function () {
          ;(function (n, t, r) {
            n.en.delete(r),
              n.wn.has(r) ||
                ((n.kn = !0),
                n.nn.add(r),
                n.wn.set(r, !0),
                (function (n, t, r) {
                  for (r = t; (r = n.F.Mn(r)); )
                    if (n.$n(r)) {
                      n.jn.has(t) ||
                        (n.un.set(t, r), (r['s-ld'] = r['s-ld'] || []).push(t))
                      break
                    }
                })(n, r),
                n.queue.tick(function () {
                  n.on.set(
                    r,
                    (function (n, t, r, e, i) {
                      return (
                        r.mode || (r.mode = n.En(r)),
                        r['s-cr'] ||
                          n.On(r, 'ssrv') ||
                          (n.an && 1 === t.Sn) ||
                          ((r['s-cr'] = n.xn('')),
                          (r['s-cr']['s-cn'] = !0),
                          n.Cn(r, r['s-cr'], n.Wn(r)[0])),
                        n.an ||
                          1 !== t.Sn ||
                          !window.HTMLElement ||
                          'shadowRoot' in window.HTMLElement.prototype ||
                          (r.shadowRoot = r),
                        1 === t.Sn &&
                          n.an &&
                          !r.shadowRoot &&
                          n.An(r, { mode: 'open' }),
                        (e = { yn: {} }),
                        t.D &&
                          Object.keys(t.D).forEach(function (u) {
                            ;(i = t.D[u].U) && (e.yn[i] = n.On(r, i))
                          }),
                        e
                      )
                    })(n.F, t, r)
                  ),
                    n.Rn(t, r)
                }))
          })(n, t, this)
        }),
        (r.disconnectedCallback = function () {
          ;(function (n, t) {
            if (
              !n.Nn &&
              (function (n, t) {
                for (; t; ) {
                  if (!n.Tn(t)) return 9 !== n.Ln(t)
                  t = n.Tn(t)
                }
              })(n.F, t)
            ) {
              n.en.set(t, !0), V(n, t), q(n.pn.get(t), !0)
              var r = n.in.get(t)
              r && r.componentDidUnload && r.componentDidUnload(),
                n.F.Z(t),
                n.Pn.delete(t),
                n.hn && n.hn.removeHost(t),
                [n.un, n.In, n.on].forEach(function (n) {
                  return n.delete(t)
                })
            }
          })(n, this)
        }),
        (r['s-init'] = function () {
          ;(function (n, t, r, e, i, u) {
            if (
              J(n, t) &&
              n.in.get(t) &&
              !n.en.has(t) &&
              (!t['s-ld'] || !t['s-ld'].length)
            ) {
              n.jn.set(t, !0),
                n.Dn.has(t) ||
                  (n.Dn.set(t, !0), (t['s-ld'] = void 0), n.F.ln(t, r))
              try {
                q(n.pn.get(t)),
                  (u = n.In.get(t)) &&
                    (u.forEach(function (n) {
                      return n(t)
                    }),
                    n.In.delete(t))
              } catch (r) {
                n.fn(r, 4, t)
              }
              V(n, t)
            }
          })(n, this, e)
        }),
        (r.forceUpdate = function () {
          Y(n, this, i)
        }),
        t.D)
      ) {
        var u = Object.entries(t.D),
          o = {}
        u.forEach(function (n) {
          var t = n[0],
            r = n[1].U
          r && (o[r] = t)
        }),
          (o = Object.assign({}, o)),
          (r.attributeChangedCallback = function (n, t, r) {
            ;(function e(n, t, r, i) {
              var u = n[A(r)]
              u && (t[u] = i)
            })(o, this, n, r)
          }),
          (function (n, t, r, e) {
            u.forEach(function (t) {
              var i = t[0],
                u = t[1]
              3 & u.qn &&
                K(
                  r,
                  i,
                  function t() {
                    return (n.dn.get(this) || {})[i]
                  },
                  function t(r) {
                    z(n, this, i, H(u.B, r), e)
                  }
                )
            })
          })(n, 0, r, i)
      }
    },
    tn = function (n, t, r, e) {
      return function () {
        var i = arguments
        return rn(n, t, r).then(function (n) {
          return n[e].apply(n, i)
        })
      }
    },
    rn = function (n, t, r, e, i) {
      return (
        (e = t[r]),
        (i = n.Un.body)
          ? (e || (e = i.querySelector(r)),
            e || ((e = t[r] = n.Bn(r)), n._n(i, e)),
            e.componentOnReady())
          : Promise.resolve()
      )
    },
    en = function en() {
      ;(this.start = 0),
        (this.end = 0),
        (this.previous = null),
        (this.parent = null),
        (this.rules = null),
        (this.parsedCssText = ''),
        (this.cssText = ''),
        (this.atRule = !1),
        (this.type = 0),
        (this.keyframesName = ''),
        (this.selector = ''),
        (this.parsedSelector = '')
    },
    un = { STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, j: 1e3 },
    on = '{',
    fn = '}',
    cn = {
      O: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
      port: /@import[^;]*;/gim,
      Fn: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      Hn: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      Yn: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      Zn: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      M: /^@[^\s]*keyframes/,
      k: /\s+/g,
    },
    an = '--',
    sn = '@media',
    ln = '@',
    vn = /\bvar\(/,
    pn = /\B--[\w-]+\s*:/,
    hn = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
    dn = /^[\t ]+\n/gm,
    mn = '!important',
    yn =
      /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gm,
    bn = /[\s;{]--[-a-zA-Z0-9]+\s*:/m,
    wn = /url[\s]*\([\s]*['"]?(?![http|\/])([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim,
    gn = (function () {
      function n(n, t) {
        ;(this.zn = n),
          (this.Gn = t),
          (this.count = 0),
          (this.Kn = new WeakMap()),
          (this.Qn = new WeakMap()),
          (this.Xn = []),
          (this.Jn = new Map())
      }
      return (
        (n.prototype.initShim = function () {
          var n = this
          return new Promise(function (t) {
            n.zn.requestAnimationFrame(function () {
              ;(function r(n, t) {
                return (function r(n, t) {
                  for (
                    var r = [],
                      e = n.querySelectorAll('link[rel="stylesheet"][href]'),
                      i = 0;
                    i < e.length;
                    i++
                  )
                    r.push(M(n, t, e[i]))
                  return Promise.all(r)
                })(n, t).then(function () {
                  ;(function r(n, t) {
                    for (
                      var r = n.querySelectorAll('style'), e = 0;
                      e < r.length;
                      e++
                    )
                      g(t, r[e])
                  })(n, t)
                })
              })(n.Gn, n.Xn).then(function () {
                return t()
              })
            })
          })
        }),
        (n.prototype.Vn = function (n) {
          var t = this
          return M(this.Gn, this.Xn, n).then(function () {
            t.updateGlobal()
          })
        }),
        (n.prototype.nt = function (n) {
          g(this.Xn, n), this.updateGlobal()
        }),
        (n.prototype.createHostStyle = function (n, t, r) {
          if (this.Qn.has(n)) return null
          var e = n['s-sc'],
            i = this.tt(r, t, e),
            u = i.W && i.rt
          if (!u && i.A) return null
          var o = this.Gn.createElement('style')
          if (u) {
            var f = i.rt + '-' + this.count
            ;(n['s-sc'] = f),
              this.Kn.set(n, o),
              this.Qn.set(
                n,
                (function c(n, t) {
                  var r = n.C.map(function (r) {
                      return 'string' == typeof r ? k(r, n.rt, t) : r
                    }),
                    e = n.g.map(function (r) {
                      return Object.assign({}, r, {
                        selector: k(r.selector, n.rt, t),
                      })
                    })
                  return Object.assign({}, n, { C: r, g: e, rt: t })
                })(i, f)
              ),
              this.count++
          } else
            (i.A = o),
              i.W || (o.innerHTML = a(i.C, {})),
              this.Xn.push(i),
              this.updateGlobal(),
              this.Qn.set(n, i)
          return o
        }),
        (n.prototype.removeHost = function (n) {
          var t = this.Kn.get(n)
          t && t.remove(), this.Kn.delete(n), this.Qn.delete(n)
        }),
        (n.prototype.updateHost = function (n) {
          var t = this.Qn.get(n)
          if (t && t.W && t.rt) {
            var r = this.Kn.get(n)
            if (r) {
              var e = v(
                (function i(n, t, r) {
                  return (function i(n) {
                    return (
                      n.sort(function (n, t) {
                        return n.p === t.p ? n.m - t.m : n.p - t.p
                      }),
                      n
                    )
                  })(
                    y(
                      r.concat(
                        (function e(n, t) {
                          for (var r = []; t; ) {
                            var e = n.get(t)
                            e && r.push(e), (t = t.parentElement)
                          }
                          return r
                        })(t, n)
                      )
                    ).filter(function (t) {
                      return (function r(n, t) {
                        return n.matches(t)
                      })(n, t.selector)
                    })
                  )
                })(n, this.Qn, this.Xn)
              )
              r.innerHTML = a(t.C, e)
            }
          }
        }),
        (n.prototype.updateGlobal = function () {
          ;(function n(t) {
            var r = v(y(t))
            t.forEach(function (n) {
              n.W && (n.A.innerHTML = a(n.C, r))
            })
          })(this.Xn)
        }),
        (n.prototype.tt = function (n, t, r) {
          var e = this.Jn.get(t)
          return e || (((e = b(n)).rt = r), this.Jn.set(t, e)), e
        }),
        n
      )
    })()
  !(function kn(n) {
    return !!(n.CSS && n.CSS.supports && n.CSS.supports('color', 'var(--c)'))
  })(window) && ($ = new gn(w, d)),
    (function Mn(n, r, e, o, f, c, a, s) {
      function l(n, t) {
        if (!e.customElements.get(n.t)) {
          ;(C[n.t] = !0), nn(N, (k[n.t] = n), t.prototype, c, g)
          var r = []
          for (var i in n.D) n.D[i].U && r.push(n.D[i].U)
          ;(t.observedAttributes = r), e.customElements.define(n.t, t)
        }
      }
      function v(n) {
        return null == n ? null : $.get(n.replace(/^\.\//, ''))
      }
      function p(n) {
        return 'exports' === n || 'require' === n || !!v(n)
      }
      function h(n, t, r) {
        var e = {}
        try {
          r.apply(
            null,
            t.map(function (n) {
              return 'exports' === n ? e : 'require' === n ? d : v(n)
            })
          )
        } catch (n) {
          console.error(n)
        }
        void 0 !== n &&
          ($.set(n, e),
          n &&
            !n.endsWith('.js') &&
            Object.keys(e).forEach(function (n) {
              for (
                var t = n.replace(/-/g, '').toLowerCase(),
                  r = Object.keys(k),
                  u = 0;
                u < r.length;
                u++
              )
                if (r[u].replace(/-/g, '').toLowerCase() === t) {
                  var o = k[r[u]]
                  o &&
                    ((o.cn = e[n]), i(0, o, o.Sn, o.cn.style, o.cn.styleMode))
                  break
                }
            }))
      }
      function d(n, t) {
        y(void 0, n, t)
      }
      function m() {
        for (var n = M.length - 1; n >= 0; n--) {
          var t = M[n],
            r = t[0],
            e = t[1],
            i = t[2]
          e.every(p) && !p(r) && (M.splice(n, 1), h(r, e, i))
        }
      }
      function y(n, t, r) {
        if (Array.isArray(t)) {
          var e = t.filter(function (n) {
            return !p(n)
          })
          e.forEach(function (n) {
            w(f + n.replace('.js', '.es5.js'))
          }),
            M.push([n, t, r]),
            0 === e.length && m()
        } else 'function' == typeof t && m()
      }
      function b(n) {
        var t = !x.an
        w(f + n + (t ? '.sc' : '') + '.es5.entry.js')
      }
      function w(n) {
        function t() {
          clearTimeout(r), (e.onerror = e.onload = null), x.et(e), j.delete(n)
        }
        var r, e
        j.has(n) ||
          (j.add(n),
          ((e = x.Bn('script')).charset = 'utf-8'),
          (e.async = !0),
          (e.src = n),
          (r = setTimeout(t, 12e4)),
          (e.onerror = e.onload = t),
          x._n(x.Un.head, e))
      }
      var g = e.performance,
        k = { html: {} },
        M = [],
        $ = new Map(),
        j = new Set(),
        E = {},
        O = (e[n] = e[n] || {}),
        x = (function (n, t, r) {
          var e = new WeakMap(),
            i = {
              Un: r,
              an: !!r.documentElement.attachShadow,
              it: !1,
              Ln: function (n) {
                return n.nodeType
              },
              Bn: function (n) {
                return r.createElement(n)
              },
              ut: function (n, t) {
                return r.createElementNS(n, t)
              },
              xn: function (n) {
                return r.createTextNode(n)
              },
              ot: function (n) {
                return r.createComment(n)
              },
              Cn: function (n, t, r) {
                return n.insertBefore(t, r)
              },
              et: function (n) {
                return n.remove()
              },
              _n: function (n, t) {
                return n.appendChild(t)
              },
              ln: function (n, t) {
                if (n.classList) n.classList.add(t)
                else if ('svg' === n.nodeName.toLowerCase()) {
                  var r = n.getAttribute('class') || ''
                  r.split(' ').includes(t) || (r += ' ' + t),
                    n.setAttribute('class', r.trim())
                }
              },
              Wn: function (n) {
                return n.childNodes
              },
              Tn: function (n) {
                return n.parentNode
              },
              ft: function (n) {
                return n.nextSibling
              },
              ct: function (n) {
                return n.previousSibling
              },
              at: function (n) {
                return A(n.nodeName)
              },
              st: function (n) {
                return n.textContent
              },
              lt: function (n, t) {
                return (n.textContent = t)
              },
              On: function (n, t) {
                return n.getAttribute(t)
              },
              vt: function (n, t, r) {
                return n.setAttribute(t, r)
              },
              _: function (n, t) {
                return n.removeAttribute(t)
              },
              H: function (n, t) {
                return n.hasAttribute(t)
              },
              En: function (t) {
                return t.getAttribute('mode') || (n.Context || {}).mode
              },
              pt: function (n, e) {
                return 'child' === e
                  ? n.firstElementChild
                  : 'parent' === e
                  ? i.Mn(n)
                  : 'body' === e
                  ? r.body
                  : 'document' === e
                  ? r
                  : 'window' === e
                  ? t
                  : n
              },
              Y: function (t, r, u, o, f, c, a, s, l, v) {
                var p = t,
                  h = u,
                  d = e.get(t)
                ;(v = r + o),
                  d && d[v] && d[v](),
                  'object' == typeof a && (p = a),
                  p &&
                    ((s = i.it ? { capture: !!f, passive: !!c } : !!f),
                    n.ael(p, r, h, s),
                    d || e.set(t, (d = {})),
                    (d[v] = function () {
                      p && n.rel(p, r, h, s), (d[v] = null)
                    }))
              },
              Z: function (n, t, r, i) {
                ;(i = e.get(n)) &&
                  (t
                    ? i[t + r] && i[t + r]()
                    : Object.keys(i).forEach(function (n) {
                        i[n] && i[n]()
                      }))
              },
              ht: function (n, r, e, i) {
                return (i = new t.CustomEvent(r, e)), n && n.dispatchEvent(i), i
              },
              Mn: function (n, t) {
                return (t = i.Tn(n)) && 11 === i.Ln(t) ? t.host : t
              },
              dt: function (n, t, r, e) {
                return n.setAttributeNS(t, r, e)
              },
              An: function (n, t) {
                return n.attachShadow(t)
              },
            }
          return (
            'function' != typeof t.CustomEvent &&
              ((t.CustomEvent = function (n, t, e) {
                return (
                  (t = t || {}),
                  (e = r.createEvent('CustomEvent')).initCustomEvent(
                    n,
                    t.bubbles,
                    t.cancelable,
                    t.detail
                  ),
                  e
                )
              }),
              (t.CustomEvent.prototype = t.Event.prototype)),
            n.ael ||
              ((n.ael = function (n, t, r, e) {
                return n.addEventListener(t, r, e)
              }),
              (n.rel = function (n, t, r, e) {
                return n.removeEventListener(t, r, e)
              })),
            i
          )
        })(O, e, o)
      ;(r.isServer = r.isPrerender = !(r.isClient = !0)),
        (r.window = e),
        (r.location = e.location),
        (r.document = o),
        (r.resourcesUrl = r.publicPath = f),
        (O.h = u),
        (O.Context = r)
      var C = (e['s-defined'] = e['s-defined'] || {}),
        R = 0,
        N = {
          F: x,
          yt: l,
          bt: r.emit,
          hn: s,
          I: function (n) {
            return k[x.at(n)]
          },
          bn: function (n) {
            return r[n]
          },
          isClient: !0,
          $n: function (n) {
            return !(!C[x.at(n)] && !N.I(n))
          },
          fn: function (n, t, r) {
            return console.error(n, t, r && r.tagName)
          },
          wt: function () {
            return n + R++
          },
          gt: function (n) {
            return (function (n, t, r) {
              return {
                create: tn(n, t, r, 'create'),
                componentOnReady: tn(n, t, r, 'componentOnReady'),
              }
            })(x, E, n)
          },
          queue: (r.queue = U(O, e)),
          Rn: function T(n, t) {
            var r = 'string' == typeof n.kt ? n.kt : n.kt[t.mode]
            v(r)
              ? Y(N, t, g)
              : (M.push([
                  void 0,
                  [r],
                  function () {
                    Y(N, t, g)
                  },
                ]),
                s && P
                  ? P.push(function () {
                      return b(r)
                    })
                  : b(r))
          },
          rn: !1,
          vn: !1,
          Nn: !1,
          un: new WeakMap(),
          Mt: new WeakMap(),
          wn: new WeakMap(),
          Pn: new WeakMap(),
          Dn: new WeakMap(),
          jn: new WeakMap(),
          mn: new WeakMap(),
          on: new WeakMap(),
          in: new WeakMap(),
          en: new WeakMap(),
          tn: new WeakMap(),
          In: new WeakMap(),
          $t: new WeakMap(),
          pn: new WeakMap(),
          dn: new WeakMap(),
          nn: new Set(),
          gn: [],
        }
      ;(O.onReady = function () {
        return new Promise(function (n) {
          return N.queue.write(function () {
            return N.nn.size ? N.gn.push(n) : n()
          })
        })
      }),
        (N.render = (function (n, t) {
          var r,
            e,
            i,
            u,
            o,
            f,
            c,
            a = function (i, l, v, p, h, d, m, y, b) {
              if (
                ((y = l.vchildren[v]),
                r ||
                  ((u = !0),
                  'slot' === y.vtag &&
                    (e && t.ln(p, e + '-s'),
                    y.vchildren ? (y.jt = !0) : (y.Et = !0))),
                W(y.vtext))
              )
                y.i = t.xn(y.vtext)
              else if (y.Et) y.i = t.xn('')
              else {
                if (
                  ((d = y.i =
                    D || 'svg' === y.vtag
                      ? t.ut('http://www.w3.org/2000/svg', y.vtag)
                      : t.Bn(y.jt ? 'slot-fb' : y.vtag)),
                  n.$n(d) && n.jn.delete(c),
                  (D = 'svg' === y.vtag || ('foreignObject' !== y.vtag && D)),
                  I(n, null, y, D),
                  W(e) && d['s-si'] !== e && t.ln(d, (d['s-si'] = e)),
                  y.vchildren)
                )
                  for (h = 0; h < y.vchildren.length; ++h)
                    (m = a(i, y, h, d)) && t._n(d, m)
                'svg' === y.vtag && (D = !1)
              }
              return (
                (y.i['s-hn'] = f),
                (y.jt || y.Et) &&
                  ((y.i['s-sr'] = !0),
                  (y.i['s-cr'] = o),
                  (y.i['s-sn'] = y.vname || ''),
                  (b = i && i.vchildren && i.vchildren[v]) &&
                    b.vtag === y.vtag &&
                    i.i &&
                    s(i.i)),
                y.i
              )
            },
            s = function (r, e, i, o) {
              n.Nn = !0
              var c = t.Wn(r)
              for (i = c.length - 1; i >= 0; i--)
                (o = c[i])['s-hn'] !== f &&
                  o['s-ol'] &&
                  (t.et(o),
                  t.Cn(d(o), o, h(o)),
                  t.et(o['s-ol']),
                  (o['s-ol'] = null),
                  (u = !0)),
                  e && s(o, e)
              n.Nn = !1
            },
            l = function (n, r, e, i, u, o, c, s) {
              var l = n['s-cr']
              for (
                (c = (l && t.Tn(l)) || n).shadowRoot &&
                t.at(c) === f &&
                (c = c.shadowRoot);
                u <= o;
                ++u
              )
                i[u] &&
                  (s = W(i[u].vtext) ? t.xn(i[u].vtext) : a(null, e, u, n)) &&
                  ((i[u].i = s), t.Cn(c, s, h(r)))
            },
            v = function (n, r, e, u) {
              for (; r <= e; ++r)
                W(n[r]) &&
                  ((u = n[r].i),
                  (i = !0),
                  u['s-ol'] ? t.et(u['s-ol']) : s(u, !0),
                  t.et(u))
            },
            p = function (n, t) {
              return (
                n.vtag === t.vtag &&
                n.vkey === t.vkey &&
                ('slot' !== n.vtag || n.vname === t.vname)
              )
            },
            h = function (n) {
              return n && n['s-ol'] ? n['s-ol'] : n
            },
            d = function (n) {
              return t.Tn(n['s-ol'] ? n['s-ol'] : n)
            },
            m = function (r, e, i) {
              var u = (e.i = r.i),
                o = r.vchildren,
                f = e.vchildren
              ;(D = e.i && W(t.Mn(e.i)) && void 0 !== e.i.ownerSVGElement),
                (D = 'svg' === e.vtag || ('foreignObject' !== e.vtag && D)),
                W(e.vtext)
                  ? (i = u['s-cr'])
                    ? t.lt(t.Tn(i), e.vtext)
                    : r.vtext !== e.vtext && t.lt(u, e.vtext)
                  : ('slot' !== e.vtag && I(n, r, e, D),
                    W(o) && W(f)
                      ? (function (n, r, e, i, u, o, f, c) {
                          for (
                            var y = 0,
                              b = 0,
                              w = r.length - 1,
                              g = r[0],
                              k = r[w],
                              M = i.length - 1,
                              $ = i[0],
                              j = i[M];
                            y <= w && b <= M;

                          )
                            if (null == g) g = r[++y]
                            else if (null == k) k = r[--w]
                            else if (null == $) $ = i[++b]
                            else if (null == j) j = i[--M]
                            else if (p(g, $))
                              m(g, $), (g = r[++y]), ($ = i[++b])
                            else if (p(k, j))
                              m(k, j), (k = r[--w]), (j = i[--M])
                            else if (p(g, j))
                              ('slot' !== g.vtag && 'slot' !== j.vtag) ||
                                s(t.Tn(g.i)),
                                m(g, j),
                                t.Cn(n, g.i, t.ft(k.i)),
                                (g = r[++y]),
                                (j = i[--M])
                            else if (p(k, $))
                              ('slot' !== g.vtag && 'slot' !== j.vtag) ||
                                s(t.Tn(k.i)),
                                m(k, $),
                                t.Cn(n, k.i, g.i),
                                (k = r[--w]),
                                ($ = i[++b])
                            else {
                              for (u = null, o = y; o <= w; ++o)
                                if (
                                  r[o] &&
                                  W(r[o].vkey) &&
                                  r[o].vkey === $.vkey
                                ) {
                                  u = o
                                  break
                                }
                              W(u)
                                ? ((c = r[u]).vtag !== $.vtag
                                    ? (f = a(r && r[b], e, u, n))
                                    : (m(c, $), (r[u] = void 0), (f = c.i)),
                                  ($ = i[++b]))
                                : ((f = a(r && r[b], e, b, n)), ($ = i[++b])),
                                f && t.Cn(d(g.i), f, h(g.i))
                            }
                          y > w
                            ? l(
                                n,
                                null == i[M + 1] ? null : i[M + 1].i,
                                e,
                                i,
                                b,
                                M
                              )
                            : b > M && v(r, y, w)
                        })(u, o, e, f)
                      : W(f)
                      ? (W(r.vtext) && t.lt(u, ''),
                        l(u, null, e, f, 0, f.length - 1))
                      : W(o) && v(o, 0, o.length - 1)),
                D && 'svg' === e.vtag && (D = !1)
            },
            y = function (n, r, e, i, u, o, f, c) {
              for (i = 0, u = (e = t.Wn(n)).length; i < u; i++)
                if (((r = e[i]), 1 === t.Ln(r))) {
                  if (r['s-sr'])
                    for (f = r['s-sn'], r.hidden = !1, o = 0; o < u; o++)
                      if (e[o]['s-hn'] !== r['s-hn'])
                        if (((c = t.Ln(e[o])), '' !== f)) {
                          if (1 === c && f === t.On(e[o], 'slot')) {
                            r.hidden = !0
                            break
                          }
                        } else if (
                          1 === c ||
                          (3 === c && '' !== t.st(e[o]).trim())
                        ) {
                          r.hidden = !0
                          break
                        }
                  y(r)
                }
            },
            b = [],
            w = function (n, r, e, u, o, f, c, a, s, l) {
              for (o = 0, f = (r = t.Wn(n)).length; o < f; o++) {
                if ((e = r[o])['s-sr'] && (u = e['s-cr']))
                  for (
                    a = t.Wn(t.Tn(u)), s = e['s-sn'], c = a.length - 1;
                    c >= 0;
                    c--
                  )
                    (u = a[c])['s-cn'] ||
                      u['s-nr'] ||
                      u['s-hn'] === e['s-hn'] ||
                      ((((3 === (l = t.Ln(u)) || 8 === l) && '' === s) ||
                        (1 === l && null === t.On(u, 'slot') && '' === s) ||
                        (1 === l && t.On(u, 'slot') === s)) &&
                        (b.some(function (n) {
                          return n.Ot === u
                        }) ||
                          ((i = !0),
                          (u['s-sn'] = s),
                          b.push({ St: e, Ot: u }))))
                1 === t.Ln(e) && w(e)
              }
            }
          return function (a, s, l, v, p, h, d, g, k, M, $, j) {
            if (
              ((c = a),
              (f = t.at(c)),
              (o = c['s-cr']),
              (r = v),
              (e = c['s-sc']),
              (u = i = !1),
              m(s, l),
              u)
            ) {
              for (w(l.i), d = 0; d < b.length; d++)
                (g = b[d]).Ot['s-ol'] ||
                  (((k = t.xn(''))['s-nr'] = g.Ot),
                  t.Cn(t.Tn(g.Ot), (g.Ot['s-ol'] = k), g.Ot))
              for (n.Nn = !0, d = 0; d < b.length; d++) {
                for (
                  g = b[d], $ = t.Tn(g.St), j = t.ft(g.St), k = g.Ot['s-ol'];
                  (k = t.ct(k));

                )
                  if (
                    (M = k['s-nr']) &&
                    M &&
                    M['s-sn'] === g.Ot['s-sn'] &&
                    $ === t.Tn(M) &&
                    (M = t.ft(M)) &&
                    M &&
                    !M['s-nr']
                  ) {
                    j = M
                    break
                  }
                ;((!j && $ !== t.Tn(g.Ot)) || t.ft(g.Ot) !== j) &&
                  g.Ot !== j &&
                  (t.et(g.Ot), t.Cn($, g.Ot, j))
              }
              n.Nn = !1
            }
            return i && y(l.i), (b.length = 0), l
          }
        })(N, x))
      var L = x.Un.documentElement
      ;(L['s-ld'] = []),
        (L['s-rn'] = !0),
        (L['s-init'] = function () {
          N.jn.set(L, (O.loaded = N.rn = !0)),
            x.ht(e, 'appload', { detail: { namespace: n } })
        }),
        (O.loadBundle = y)
      var P = []
      s &&
        s.initShim().then(function () {
          for (; P.length; ) P.shift()()
          P = null
        }),
        (N.sn = function (n, r, e, i) {
          ;(function (n, r, e, i) {
            var u = e.t + S,
              o = e[u]
            if (
              ((2 === e.Sn || (1 === e.Sn && !n.F.an)) &&
                (i['s-sc'] = o ? t(e, i.mode) : t(e)),
              o)
            ) {
              var f = r.Un.head
              if (r.an)
                if (1 === e.Sn) f = i.shadowRoot
                else {
                  var c = i.getRootNode()
                  c.host && (f = c)
                }
              var a = n.Mt.get(f)
              if ((a || n.Mt.set(f, (a = {})), !a[u])) {
                var s = void 0
                if (
                  (n.hn
                    ? (s = n.hn.createHostStyle(i, u, o))
                    : (((s = r.Bn('style')).innerHTML = o), (a[u] = !0)),
                  s)
                ) {
                  var l = f.querySelectorAll('[data-styles]')
                  r.Cn(
                    f,
                    s,
                    (l.length && l[l.length - 1].nextSibling) || f.firstChild
                  )
                }
              }
            }
          })(n, r, e, i)
        }),
        a
          .map(function (n) {
            var t = (function (n, t, r) {
              var e = n[0],
                i = n[1],
                u = n[3],
                o = n[4],
                f = n[5],
                c = { color: { U: 'color' } }
              if (u)
                for (t = 0; t < u.length; t++)
                  c[(r = u[t])[0]] = {
                    qn: r[1],
                    q: !!r[2],
                    U: 'string' == typeof r[3] ? r[3] : r[3] ? r[0] : 0,
                    B: r[4],
                  }
              return {
                t: e,
                kt: i,
                D: Object.assign({}, c),
                Sn: o,
                xt: f ? f.map(F) : void 0,
              }
            })(n)
            return (k[t.t] = t)
          })
          .forEach(function (n) {
            function t(n) {
              return HTMLElement.call(this, n)
            }
            ;(t.prototype = Object.create(HTMLElement.prototype, {
              constructor: { value: t, configurable: !0 },
            })),
              l(n, t)
          }),
        N.kn || L['s-init'](),
        (function (n, t, r, e, i, u) {
          if (
            ((t.componentOnReady = function (t, r) {
              if (!t.nodeName.includes('-')) return r(null), !1
              var e = n.I(t)
              if (e)
                if (n.jn.has(t)) r(t)
                else {
                  var i = n.In.get(t) || []
                  i.push(r), n.In.set(t, i)
                }
              return !!e
            }),
            i)
          ) {
            for (u = i.length - 1; u >= 0; u--)
              t.componentOnReady(i[u][0], i[u][1]) && i.splice(u, 1)
            for (u = 0; u < e.length; u++) if (!r[e[u]].componentOnReady) return
            for (u = 0; u < i.length; u++) i[u][1](null)
            i.length = 0
          }
        })(N, O, e, e['s-apps'], e['s-cr']),
        (O.initialized = !0)
    })(n, x, w, d, r, h, c, $)
})(window, document, {}, 'ionicons', 'hydrated', [
  [
    'ion-icon',
    'uqr5vpdq',
    1,
    [
      ['ariaLabel', 2, 1, 'aria-label', 2],
      ['color', 1, 0, 1, 2],
      ['doc', 4, 0, 0, 0, 'document'],
      ['el', 64],
      ['flipRtl', 1, 0, 'flip-rtl', 4],
      ['icon', 1, 0, 1, 2],
      ['ios', 1, 0, 1, 2],
      ['isServer', 4, 0, 0, 0, 'isServer'],
      ['isVisible', 16],
      ['lazy', 1, 0, 1, 4],
      ['md', 1, 0, 1, 2],
      ['mode', 1, 0, 1, 2],
      ['name', 1, 0, 1, 2],
      ['resourcesUrl', 4, 0, 0, 0, 'resourcesUrl'],
      ['size', 1, 0, 1, 2],
      ['src', 1, 0, 1, 2],
      ['svgContent', 16],
      ['win', 4, 0, 0, 0, 'window'],
    ],
    1,
  ],
])
