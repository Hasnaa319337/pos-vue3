/*!
 * ionicons: Core, es2017
 * Built with http://stenciljs.com
 */
function e(e, t) {
  return 'sc-' + e.t + (t && t !== l ? '-' + t : '')
}
function t(e, t) {
  return e + (t ? '-h' : '-s')
}
function n(e, t) {
  let n,
    o,
    i = null,
    l = !1,
    s = !1,
    r = arguments.length
  for (; r-- > 2; ) M.push(arguments[r])
  for (; M.length > 0; ) {
    let t = M.pop()
    if (t && void 0 !== t.pop) for (r = t.length; r--; ) M.push(t[r])
    else
      'boolean' == typeof t && (t = null),
        (s = 'function' != typeof e) &&
          (null == t
            ? (t = '')
            : 'number' == typeof t
            ? (t = String(t))
            : 'string' != typeof t && (s = !1)),
        s && l
          ? (i[i.length - 1].vtext += t)
          : null === i
          ? (i = [s ? { vtext: t } : t])
          : i.push(s ? { vtext: t } : t),
        (l = s)
  }
  if (null != t) {
    if ((t.className && (t.class = t.className), 'object' == typeof t.class)) {
      for (r in t.class) t.class[r] && M.push(r)
      ;(t.class = M.join(' ')), (M.length = 0)
    }
    null != t.key && (n = t.key), null != t.name && (o = t.name)
  }
  return 'function' == typeof e
    ? e(t, i || [], $)
    : {
        vtag: e,
        vchildren: i,
        vtext: void 0,
        vattrs: t,
        vkey: n,
        vname: o,
        o: void 0,
        i: !1,
      }
}
function o(e, t, n = {}) {
  let o = Array.isArray(t) ? t : [t]
  const l = e.document,
    s = n.hydratedCssClass || 'hydrated',
    r = n.exclude
  r && (o = o.filter(e => -1 === r.indexOf(e[0])))
  const c = o.map(e => e[0])
  if (c.length > 0) {
    const e = l.createElement('style')
    ;(e.innerHTML =
      c.join() + '{visibility:hidden}.' + s + '{visibility:inherit}'),
      e.setAttribute('data-styles', ''),
      l.head.insertBefore(e, l.head.firstChild)
  }
  const a = n.namespace || 'ionicons'
  return (
    D ||
      ((D = !0),
      (function u(e, t, n) {
        ;(e['s-apps'] = e['s-apps'] || []).push(t),
          n.componentOnReady ||
            (n.componentOnReady = function t() {
              function n(t) {
                if (o.nodeName.indexOf('-') > 0) {
                  for (var n = e['s-apps'], i = 0, l = 0; l < n.length; l++)
                    if (e[n[l]].componentOnReady) {
                      if (e[n[l]].componentOnReady(o, t)) return
                      i++
                    }
                  if (i < n.length)
                    return void (e['s-cr'] = e['s-cr'] || []).push([o, t])
                }
                t(null)
              }
              var o = this
              return e.Promise ? new e.Promise(n) : { then: n }
            })
      })(e, a, e.HTMLElement.prototype)),
    applyPolyfills(e).then(() => {
      if (!T[a]) {
        const t = {},
          r = n.resourcesUrl || './'
        i(a, t, e, l, r, s), (T[a] = R(a, t, e, l, r, s, o))
      }
      ;(function t() {
        o.forEach(t => {
          let n
          !(function o(e) {
            return /\{\s*\[native code\]\s*\}/.test('' + e)
          })(e.customElements.define)
            ? ((n = function (t) {
                return e.HTMLElement.call(this, t)
              }).prototype = Object.create(e.HTMLElement.prototype, {
                constructor: { value: n, configurable: !0 },
              }))
            : (n = new Function('w', 'return class extends w.HTMLElement{}')(
                e
              )),
            T[a].l(
              (function i(e) {
                const t = g(e),
                  n = t.s,
                  o = f(e[0])
                return (
                  (t.s = ({ mode: e, scoped: t }) =>
                    (function i(e, t, n) {
                      return import(
                        /* webpackInclude: /\.entry\.js$/ */
                        /* webpackMode: "lazy" */
                        `./build/${e}${t ? '.sc' : ''}.entry.js`
                      ).then(e => e[n])
                    })('string' == typeof n ? n : n[e], t, o)),
                  t
                )
              })(t),
              n
            )
        })
      })()
    })
  )
}
var i = function () {}
function applyPolyfills() {
  return Promise.resolve()
}
const l = '$',
  s = {},
  r = (t, n, o, i) => {
    let s = o.t + l,
      r = o[s]
    if (
      ((2 === o.u || (1 === o.u && !t.v.p)) &&
        (i['s-sc'] = r ? e(o, i.mode) : e(o)),
      r)
    ) {
      let e = n.m.head
      if (n.p)
        if (1 === o.u) e = i.shadowRoot
        else {
          const t = i.getRootNode()
          t.host && (e = t)
        }
      let l = t.M.get(e)
      if ((l || t.M.set(e, (l = {})), !l[s])) {
        let t
        {
          ;(t = r.content.cloneNode(!0)), (l[s] = !0)
          const o = e.querySelectorAll('[data-styles]')
          n.g(e, t, (o.length && o[o.length - 1].nextSibling) || e.firstChild)
        }
      }
    }
  },
  c = e => null != e,
  a = e => e.toLowerCase(),
  f = e =>
    a(e)
      .split('-')
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
      .join(''),
  u = (e, t, n, o = 'boolean' == typeof n, i) => {
    ;(i = t !== (t = t.replace(/^xlink\:?/, ''))),
      null == n || (o && (!n || 'false' === n))
        ? i
          ? e.removeAttributeNS(p, a(t))
          : e.removeAttribute(t)
        : 'function' != typeof n &&
          ((n = o ? '' : n.toString()),
          i ? e.setAttributeNS(p, a(t), n) : e.setAttribute(t, n))
  },
  p = 'http://www.w3.org/1999/xlink',
  d = (e, t, n, o, i, l, s) => {
    if ('class' !== n || l)
      if ('style' === n) {
        for (const e in o)
          (i && null != i[e]) ||
            (/-/.test(e) ? t.style.removeProperty(e) : (t.style[e] = ''))
        for (const e in i)
          (o && i[e] === o[e]) ||
            (/-/.test(e) ? t.style.setProperty(e, i[e]) : (t.style[e] = i[e]))
      } else if ('o' !== n[0] || 'n' !== n[1] || !/[A-Z]/.test(n[2]) || n in t)
        if (
          'list' !== n &&
          'type' !== n &&
          !l &&
          (n in t ||
            (-1 !== ['object', 'function'].indexOf(typeof i) && null !== i))
        ) {
          const o = e.k(t)
          o && o.C && o.C[n]
            ? (b(t, n, i), s && o.C[n].j && u(t, o.C[n].A, i, 4 === o.C[n].O))
            : 'ref' !== n &&
              (b(t, n, null == i ? '' : i),
              (null != i && !1 !== i) || e.v._(t, n))
        } else
          null != i && 'key' !== n
            ? u(t, n, i)
            : (l || (e.v.S(t, n) && (null == i || !1 === i))) && e.v._(t, n)
      else
        (n = a(n) in t ? a(n.substring(2)) : a(n[2]) + n.substring(3)),
          i ? i !== o && e.v.W(t, n, i, 0) : e.v.N(t, n, 0)
    else if (o !== i) {
      const e = v(o),
        n = v(i),
        l = e.filter(e => !n.includes(e)),
        s = v(t.className).filter(e => !l.includes(e)),
        r = n.filter(t => !e.includes(t) && !s.includes(t))
      s.push(...r), (t.className = s.join(' '))
    }
  },
  v = e => (null == e || '' === e ? [] : e.trim().split(/\s+/)),
  b = (e, t, n) => {
    try {
      e[t] = n
    } catch (e) {}
  },
  m = (e, t, n, o, i) => {
    const l = 11 === n.o.nodeType && n.o.host ? n.o.host : n.o,
      r = (t && t.vattrs) || s,
      c = n.vattrs || s
    for (i in r)
      (c && null != c[i]) || null == r[i] || d(e, l, i, r[i], void 0, o, n.i)
    for (i in c)
      (i in r && c[i] === ('value' === i || 'checked' === i ? l[i] : r[i])) ||
        d(e, l, i, r[i], c[i], o, n.i)
  }
let y = !1
const h = (e, t) => {
    e &&
      (e.vattrs && e.vattrs.ref && e.vattrs.ref(t ? null : e.o),
      e.vchildren &&
        e.vchildren.forEach(e => {
          h(e, t)
        }))
  },
  w = (e, t) => {
    {
      let n = 0,
        o = !1
      const i = () => t.performance.now(),
        l = !1 !== e.asyncQueue,
        s = Promise.resolve(),
        r = [],
        c = [],
        a = [],
        f = [],
        u = t => n => {
          t.push(n), o || ((o = !0), e.raf(v))
        },
        p = e => {
          for (let t = 0; t < e.length; t++)
            try {
              e[t](i())
            } catch (e) {
              console.error(e)
            }
          e.length = 0
        },
        d = (e, t) => {
          let n,
            o = 0
          for (; o < e.length && (n = i()) < t; )
            try {
              e[o++](n)
            } catch (e) {
              console.error(e)
            }
          o === e.length ? (e.length = 0) : 0 !== o && e.splice(0, o)
        },
        v = () => {
          n++, p(c)
          const t = l ? i() + 7 * Math.ceil(n * (1 / 22)) : Infinity
          d(a, t),
            d(f, t),
            a.length > 0 && (f.push(...a), (a.length = 0)),
            (o = c.length + a.length + f.length > 0) ? e.raf(v) : (n = 0)
        }
      return (
        e.raf || (e.raf = t.requestAnimationFrame.bind(t)),
        {
          tick(e) {
            r.push(e), 1 === r.length && s.then(() => p(r))
          },
          read: u(c),
          write: u(a),
        }
      )
    }
  },
  M = [],
  $ = { forEach: (e, t) => e.forEach(t), map: (e, t) => e.map(t) },
  g = (e, t, n) => {
    const [o, i, , l, s, r] = e,
      c = { color: { A: 'color' } }
    if (l)
      for (t = 0; t < l.length; t++)
        c[(n = l[t])[0]] = {
          P: n[1],
          j: !!n[2],
          A: 'string' == typeof n[3] ? n[3] : n[3] ? n[0] : 0,
          O: n[4],
        }
    return {
      t: o,
      s: i,
      C: Object.assign({}, c),
      u: s,
      L: r ? r.map(k) : void 0,
    }
  },
  k = e => ({ R: e[0], T: e[1], D: !!e[2], H: !!e[3], q: !!e[4] }),
  C = (e, t) =>
    c(t) && 'object' != typeof t && 'function' != typeof t
      ? e === Boolean || 4 === e
        ? 'false' !== t && ('' === t || !!t)
        : e === Number || 8 === e
        ? parseFloat(t)
        : e === String || 2 === e
        ? t.toString()
        : t
      : t,
  j = (e, t, n) => {
    e.B.add(t),
      e.F.has(t) ||
        (e.F.set(t, !0),
        e.I ? e.queue.write(() => E(e, t, n)) : e.queue.tick(() => E(e, t, n)))
  },
  E = async (e, o, i, l, s, r) => {
    if ((e.F.delete(o), !e.U.has(o))) {
      if (!(s = e.Y.get(o))) {
        if ((r = e.Z.get(o)) && !r['s-rn'])
          return void (r['s-rc'] = r['s-rc'] || []).push(() => {
            E(e, o, i)
          })
        if ((s = N(e, o, e.G.get(o), i)))
          try {
            s.componentWillLoad && (await s.componentWillLoad())
          } catch (t) {
            e.J(t, 3, o)
          }
      }
      ;((e, o, i, l) => {
        try {
          const s = o.K.host,
            r = o.K.encapsulation,
            c = 'shadow' === r && e.v.p
          let a,
            f = i
          if (
            ((a = ((e, t, n) => (
              e &&
                Object.keys(e).forEach(o => {
                  e[o].reflectToAttr && ((n = n || {})[o] = t[o])
                }),
              n
            ))(o.K.properties, l)),
            c && (f = i.shadowRoot),
            !i['s-rn'])
          ) {
            e.V(e, e.v, o, i)
            const n = i['s-sc']
            n && (e.v.X(i, t(n, !0)), 'scoped' === r && e.v.X(i, t(n)))
          }
          if (l.render || l.hostData || s || a) {
            e.ee = !0
            const t = l.render && l.render()
            let o
            ;(o = l.hostData && l.hostData()),
              a && (o = o ? Object.assign(o, a) : a),
              (e.ee = !1)
            const s = n(null, o, t),
              u = e.te.get(i) || {}
            ;(u.o = f), (s.i = !0), e.te.set(i, e.render(i, u, s, c, r))
          }
          ;(i['s-rn'] = !0),
            i['s-rc'] && (i['s-rc'].forEach(e => e()), (i['s-rc'] = null))
        } catch (t) {
          ;(e.ee = !1), e.J(t, 8, i, !0)
        }
      })(e, e.k(o), o, s),
        o['s-init']()
    }
  },
  A = (e, t, n, o, i, l, s, r, a) => {
    if (t.type || t.state) {
      const f = e.ne.get(n)
      t.state ||
        (!t.attr ||
          (void 0 !== f[i] && '' !== f[i]) ||
          ((r = l && l.oe) && c((a = r[t.attr])) && (f[i] = C(t.type, a))),
        n.hasOwnProperty(i) &&
          (void 0 === f[i] && (f[i] = C(t.type, n[i])),
          'mode' !== i && delete n[i])),
        o.hasOwnProperty(i) && void 0 === f[i] && (f[i] = o[i]),
        t.watchCallbacks && (f[W + i] = t.watchCallbacks.slice()),
        S(
          o,
          i,
          function f(t) {
            return (t = e.ne.get(e.ie.get(this))) && t[i]
          },
          function u(n, o) {
            ;(o = e.ie.get(this)) && (t.state || t.mutable) && O(e, o, i, n, s)
          }
        )
    } else if (t.elementRef) _(o, i, n)
    else if (t.context) {
      const l = e.le(t.context)
      void 0 !== l && _(o, i, (l.getContext && l.getContext(n)) || l)
    }
  },
  O = (e, t, n, o, i, l, s) => {
    ;(s = e.ne.get(t)) || e.ne.set(t, (s = {}))
    const r = s[n]
    if (o !== r && ((s[n] = o), (l = e.Y.get(t)))) {
      {
        const e = s[W + n]
        if (e)
          for (let t = 0; t < e.length; t++)
            try {
              l[e[t]].call(l, o, r, n)
            } catch (e) {
              console.error(e)
            }
      }
      !e.ee && t['s-rn'] && j(e, t, i)
    }
  },
  _ = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, value: n })
  },
  S = (e, t, n, o) => {
    Object.defineProperty(e, t, { configurable: !0, get: n, set: o })
  },
  W = 'wc-',
  N = (e, t, n, o, i, l) => {
    try {
      ;(i = new (l = e.k(t).K)()),
        ((e, t, n, o, i, l) => {
          e.ie.set(o, n),
            e.ne.has(n) || e.ne.set(n, {}),
            Object.entries(
              Object.assign({ color: { type: String } }, t.properties, {
                mode: { type: String },
              })
            ).forEach(([t, s]) => {
              A(e, s, n, o, t, i, l)
            })
        })(e, l, t, i, n, o)
    } catch (n) {
      ;(i = {}), e.J(n, 7, t, !0)
    }
    return e.Y.set(t, i), i
  },
  x = (e, t, n, o, i, l) => {
    if (
      (e.B.delete(t),
      (i = e.Z.get(t)) &&
        ((o = i['s-ld']) &&
          ((n = o.indexOf(t)) > -1 && o.splice(n, 1),
          o.length || (i['s-init'] && i['s-init']())),
        e.Z.delete(t)),
      e.se.length && !e.B.size)
    )
      for (; (l = e.se.shift()); ) l()
  },
  P = (e, t, n, o) => {
    t.forEach(([t, i]) => {
      3 & i.P &&
        S(
          n,
          t,
          function n() {
            return (e.ne.get(this) || {})[t]
          },
          function n(l) {
            O(e, this, t, C(i.O, l), o)
          }
        )
    })
  },
  L = (e, t, n, o, i) => {
    if (
      ((n.connectedCallback = function () {
        ;((e, t, n) => {
          e.U.delete(n),
            e.re.has(n) ||
              ((e.ce = !0),
              e.B.add(n),
              e.re.set(n, !0),
              ((e, t, n) => {
                for (n = t; (n = e.v.ae(n)); )
                  if (e.fe(n)) {
                    e.ue.has(t) ||
                      (e.Z.set(t, n), (n['s-ld'] = n['s-ld'] || []).push(t))
                    break
                  }
              })(e, n),
              e.queue.tick(() => {
                e.G.set(
                  n,
                  ((e, t, n, o, i) => (
                    n.mode || (n.mode = e.pe(n)),
                    n['s-cr'] ||
                      e.de(n, 'ssrv') ||
                      (e.p && 1 === t.u) ||
                      ((n['s-cr'] = e.ve('')),
                      (n['s-cr']['s-cn'] = !0),
                      e.g(n, n['s-cr'], e.be(n)[0])),
                    1 === t.u &&
                      e.p &&
                      !n.shadowRoot &&
                      e.me(n, { mode: 'open' }),
                    (o = { oe: {} }),
                    t.C &&
                      Object.keys(t.C).forEach(l => {
                        ;(i = t.C[l].A) && (o.oe[i] = e.de(n, i))
                      }),
                    o
                  ))(e.v, t, n)
                ),
                  e.ye(t, n)
              }))
        })(e, t, this)
      }),
      (n.disconnectedCallback = function () {
        ;((e, t) => {
          if (
            !e.he &&
            ((e, t) => {
              for (; t; ) {
                if (!e.we(t)) return 9 !== e.Me(t)
                t = e.we(t)
              }
            })(e.v, t)
          ) {
            e.U.set(t, !0), x(e, t), h(e.te.get(t), !0)
            {
              const n = e.Y.get(t)
              n && n.componentDidUnload && n.componentDidUnload()
            }
            e.v.N(t), e.$e.delete(t), [e.Z, e.ge, e.G].forEach(e => e.delete(t))
          }
        })(e, this)
      }),
      (n['s-init'] = function () {
        ;((e, t, n, o, i, l) => {
          if (e.Y.get(t) && !e.U.has(t) && (!t['s-ld'] || !t['s-ld'].length)) {
            e.ue.set(t, !0),
              e.ke.has(t) ||
                (e.ke.set(t, !0), (t['s-ld'] = void 0), e.v.X(t, n))
            try {
              h(e.te.get(t)),
                (l = e.ge.get(t)) && (l.forEach(e => e(t)), e.ge.delete(t))
            } catch (n) {
              e.J(n, 4, t)
            }
            x(e, t)
          }
        })(e, this, o)
      }),
      (n.forceUpdate = function () {
        j(e, this, i)
      }),
      t.C)
    ) {
      const o = Object.entries(t.C)
      {
        let e = {}
        o.forEach(([t, { A: n }]) => {
          n && (e[n] = t)
        }),
          (e = Object.assign({}, e)),
          (n.attributeChangedCallback = function (t, n, o) {
            ;(function i(e, t, n, o) {
              const i = e[a(n)]
              i && (t[i] = o)
            })(e, this, t, o)
          })
      }
      P(e, o, n, i)
    }
  },
  R = (e, t, o, i, s, f) => {
    const u = o.performance,
      p = { html: {} },
      d = (o[e] = o[e] || {}),
      v = ((e, t, n) => {
        const o = new WeakMap(),
          i = {
            m: n,
            p: !!n.documentElement.attachShadow,
            Ce: !1,
            Me: e => e.nodeType,
            je: e => n.createElement(e),
            Ee: (e, t) => n.createElementNS(e, t),
            ve: e => n.createTextNode(e),
            Ae: e => n.createComment(e),
            g: (e, t, n) => e.insertBefore(t, n),
            Oe: e => e.remove(),
            _e: (e, t) => e.appendChild(t),
            X: (e, t) => {
              e.classList.add(t)
            },
            be: e => e.childNodes,
            we: e => e.parentNode,
            Se: e => e.nextSibling,
            We: e => e.previousSibling,
            Ne: e => a(e.nodeName),
            xe: e => e.textContent,
            Pe: (e, t) => (e.textContent = t),
            de: (e, t) => e.getAttribute(t),
            Le: (e, t, n) => e.setAttribute(t, n),
            _: (e, t) => e.removeAttribute(t),
            S: (e, t) => e.hasAttribute(t),
            pe: t => t.getAttribute('mode') || (e.Context || {}).mode,
            Re: (e, o) =>
              'child' === o
                ? e.firstElementChild
                : 'parent' === o
                ? i.ae(e)
                : 'body' === o
                ? n.body
                : 'document' === o
                ? n
                : 'window' === o
                ? t
                : e,
            W: (t, n, l, s, r, c, a, f, u, p) => {
              let d = t,
                v = l,
                b = o.get(t)
              ;(p = n + s),
                b && b[p] && b[p](),
                'object' == typeof a && (d = a),
                d &&
                  ((f = i.Ce ? { capture: !!r, passive: !!c } : !!r),
                  e.ael(d, n, v, f),
                  b || o.set(t, (b = {})),
                  (b[p] = () => {
                    d && e.rel(d, n, v, f), (b[p] = null)
                  }))
            },
            N: (e, t, n, i) => {
              ;(i = o.get(e)) &&
                (t
                  ? i[t + n] && i[t + n]()
                  : Object.keys(i).forEach(e => {
                      i[e] && i[e]()
                    }))
            },
            Te: (e, n, o, i) => (
              (i = new t.CustomEvent(n, o)), e && e.dispatchEvent(i), i
            ),
            ae: (e, t) => ((t = i.we(e)) && 11 === i.Me(t) ? t.host : t),
            De: (e, t, n, o) => e.setAttributeNS(t, n, o),
            me: (e, t) => e.attachShadow(t),
          }
        return (
          e.ael ||
            ((e.ael = (e, t, n, o) => e.addEventListener(t, n, o)),
            (e.rel = (e, t, n, o) => e.removeEventListener(t, n, o))),
          i
        )
      })(d, o, i),
      b = v.m.documentElement,
      h = (o['s-defined'] = o['s-defined'] || {}),
      M = {
        v,
        l: (e, t) => {
          o.customElements.get(e.t) ||
            (L(M, (p[e.t] = e), t.prototype, f, u),
            (t.observedAttributes = Object.values(e.C)
              .map(e => e.A)
              .filter(e => !!e)),
            o.customElements.define(e.t, t))
        },
        k: e => p[v.Ne(e)],
        le: e => t[e],
        isClient: !0,
        fe: e => !(!h[v.Ne(e)] && !M.k(e)),
        J: (e, t, n) => console.error(e, t, n && n.tagName),
        queue: (t.queue = w(d, o)),
        ye: (e, t) => {
          {
            const n = !v.p,
              o = { mode: t.mode, scoped: n }
            e.s(o).then(n => {
              try {
                ;(e.K = n),
                  (function o(e, t, n, i, s) {
                    if (i) {
                      const n = t.t + (s || l)
                      if (!t[n]) {
                        const o = e.je('template')
                        ;(t[n] = o),
                          (o.innerHTML = `<style>${i}</style>`),
                          e._e(e.m.head, o)
                      }
                    }
                  })(v, e, e.u, n.style, n.styleMode)
              } catch (t) {
                console.error(t), (e.K = class {})
              }
              j(M, t, u)
            })
          }
        },
        ee: !1,
        I: !1,
        he: !1,
        V: r,
        Z: new WeakMap(),
        M: new WeakMap(),
        re: new WeakMap(),
        $e: new WeakMap(),
        ke: new WeakMap(),
        ue: new WeakMap(),
        ie: new WeakMap(),
        G: new WeakMap(),
        Y: new WeakMap(),
        U: new WeakMap(),
        F: new WeakMap(),
        ge: new WeakMap(),
        He: new WeakMap(),
        te: new WeakMap(),
        ne: new WeakMap(),
        B: new Set(),
        se: [],
      }
    return (
      (t.isServer = t.isPrerender = !(t.isClient = !0)),
      (t.window = o),
      (t.location = o.location),
      (t.document = i),
      (t.resourcesUrl = t.publicPath = s),
      (d.h = n),
      (d.Context = t),
      (d.onReady = () =>
        new Promise(e => M.queue.write(() => (M.B.size ? M.se.push(e) : e())))),
      (M.render = ((e, t) => {
        let n, o, i, l, s, r, a
        const f = (i, p, d, v, b, h, w, M, $) => {
            if (
              ((M = p.vchildren[d]),
              n ||
                ((l = !0),
                'slot' === M.vtag &&
                  (o && t.X(v, o + '-s'),
                  M.vchildren ? (M.qe = !0) : (M.Be = !0))),
              c(M.vtext))
            )
              M.o = t.ve(M.vtext)
            else if (M.Be) M.o = t.ve('')
            else {
              if (
                ((h = M.o =
                  y || 'svg' === M.vtag
                    ? t.Ee('http://www.w3.org/2000/svg', M.vtag)
                    : t.je(M.qe ? 'slot-fb' : M.vtag)),
                e.fe(h) && e.ue.delete(a),
                (y = 'svg' === M.vtag || ('foreignObject' !== M.vtag && y)),
                m(e, null, M, y),
                c(o) && h['s-si'] !== o && t.X(h, (h['s-si'] = o)),
                M.vchildren)
              )
                for (b = 0; b < M.vchildren.length; ++b)
                  (w = f(i, M, b, h)) && t._e(h, w)
              'svg' === M.vtag && (y = !1)
            }
            return (
              (M.o['s-hn'] = r),
              (M.qe || M.Be) &&
                ((M.o['s-sr'] = !0),
                (M.o['s-cr'] = s),
                (M.o['s-sn'] = M.vname || ''),
                ($ = i && i.vchildren && i.vchildren[d]) &&
                  $.vtag === M.vtag &&
                  i.o &&
                  u(i.o)),
              M.o
            )
          },
          u = (n, o, i, s) => {
            e.he = !0
            const c = t.be(n)
            for (i = c.length - 1; i >= 0; i--)
              (s = c[i])['s-hn'] !== r &&
                s['s-ol'] &&
                (t.Oe(s),
                t.g(h(s), s, b(s)),
                t.Oe(s['s-ol']),
                (s['s-ol'] = null),
                (l = !0)),
                o && u(s, o)
            e.he = !1
          },
          p = (e, n, o, i, l, s, a, u) => {
            const p = e['s-cr']
            for (
              (a = (p && t.we(p)) || e).shadowRoot &&
              t.Ne(a) === r &&
              (a = a.shadowRoot);
              l <= s;
              ++l
            )
              i[l] &&
                (u = c(i[l].vtext) ? t.ve(i[l].vtext) : f(null, o, l, e)) &&
                ((i[l].o = u), t.g(a, u, b(n)))
          },
          d = (e, n, o, l) => {
            for (; n <= o; ++n)
              c(e[n]) &&
                ((l = e[n].o),
                (i = !0),
                l['s-ol'] ? t.Oe(l['s-ol']) : u(l, !0),
                t.Oe(l))
          },
          v = (e, t) =>
            e.vtag === t.vtag &&
            e.vkey === t.vkey &&
            ('slot' !== e.vtag || e.vname === t.vname),
          b = e => (e && e['s-ol'] ? e['s-ol'] : e),
          h = e => t.we(e['s-ol'] ? e['s-ol'] : e),
          w = (n, o, i) => {
            const l = (o.o = n.o),
              s = n.vchildren,
              r = o.vchildren
            ;(y = o.o && c(t.ae(o.o)) && void 0 !== o.o.ownerSVGElement),
              (y = 'svg' === o.vtag || ('foreignObject' !== o.vtag && y)),
              c(o.vtext)
                ? (i = l['s-cr'])
                  ? t.Pe(t.we(i), o.vtext)
                  : n.vtext !== o.vtext && t.Pe(l, o.vtext)
                : ('slot' !== o.vtag && m(e, n, o, y),
                  c(s) && c(r)
                    ? ((e, n, o, i, l, s, r, a) => {
                        let m = 0,
                          y = 0,
                          M = n.length - 1,
                          $ = n[0],
                          g = n[M],
                          k = i.length - 1,
                          C = i[0],
                          j = i[k]
                        for (; m <= M && y <= k; )
                          if (null == $) $ = n[++m]
                          else if (null == g) g = n[--M]
                          else if (null == C) C = i[++y]
                          else if (null == j) j = i[--k]
                          else if (v($, C)) w($, C), ($ = n[++m]), (C = i[++y])
                          else if (v(g, j)) w(g, j), (g = n[--M]), (j = i[--k])
                          else if (v($, j))
                            ('slot' !== $.vtag && 'slot' !== j.vtag) ||
                              u(t.we($.o)),
                              w($, j),
                              t.g(e, $.o, t.Se(g.o)),
                              ($ = n[++m]),
                              (j = i[--k])
                          else if (v(g, C))
                            ('slot' !== $.vtag && 'slot' !== j.vtag) ||
                              u(t.we(g.o)),
                              w(g, C),
                              t.g(e, g.o, $.o),
                              (g = n[--M]),
                              (C = i[++y])
                          else {
                            for (l = null, s = m; s <= M; ++s)
                              if (
                                n[s] &&
                                c(n[s].vkey) &&
                                n[s].vkey === C.vkey
                              ) {
                                l = s
                                break
                              }
                            c(l)
                              ? ((a = n[l]).vtag !== C.vtag
                                  ? (r = f(n && n[y], o, l, e))
                                  : (w(a, C), (n[l] = void 0), (r = a.o)),
                                (C = i[++y]))
                              : ((r = f(n && n[y], o, y, e)), (C = i[++y])),
                              r && t.g(h($.o), r, b($.o))
                          }
                        m > M
                          ? p(
                              e,
                              null == i[k + 1] ? null : i[k + 1].o,
                              o,
                              i,
                              y,
                              k
                            )
                          : y > k && d(n, m, M)
                      })(l, s, o, r)
                    : c(r)
                    ? (c(n.vtext) && t.Pe(l, ''),
                      p(l, null, o, r, 0, r.length - 1))
                    : c(s) && d(s, 0, s.length - 1)),
              y && 'svg' === o.vtag && (y = !1)
          },
          M = (e, n, o, i, l, s, r, c) => {
            for (i = 0, l = (o = t.be(e)).length; i < l; i++)
              if (((n = o[i]), 1 === t.Me(n))) {
                if (n['s-sr'])
                  for (r = n['s-sn'], n.hidden = !1, s = 0; s < l; s++)
                    if (o[s]['s-hn'] !== n['s-hn'])
                      if (((c = t.Me(o[s])), '' !== r)) {
                        if (1 === c && r === t.de(o[s], 'slot')) {
                          n.hidden = !0
                          break
                        }
                      } else if (
                        1 === c ||
                        (3 === c && '' !== t.xe(o[s]).trim())
                      ) {
                        n.hidden = !0
                        break
                      }
                M(n)
              }
          },
          $ = [],
          g = (e, n, o, l, s, r, c, a, f, u) => {
            for (s = 0, r = (n = t.be(e)).length; s < r; s++) {
              if ((o = n[s])['s-sr'] && (l = o['s-cr']))
                for (
                  a = t.be(t.we(l)), f = o['s-sn'], c = a.length - 1;
                  c >= 0;
                  c--
                )
                  (l = a[c])['s-cn'] ||
                    l['s-nr'] ||
                    l['s-hn'] === o['s-hn'] ||
                    ((((3 === (u = t.Me(l)) || 8 === u) && '' === f) ||
                      (1 === u && null === t.de(l, 'slot') && '' === f) ||
                      (1 === u && t.de(l, 'slot') === f)) &&
                      ($.some(e => e.Fe === l) ||
                        ((i = !0), (l['s-sn'] = f), $.push({ Ie: o, Fe: l }))))
              1 === t.Me(o) && g(o)
            }
          }
        return (c, f, u, p, d, v, b, m, y, h, k, C) => {
          if (
            ((a = c),
            (r = t.Ne(a)),
            (s = a['s-cr']),
            (n = p),
            (o = a['s-sc']),
            (l = i = !1),
            w(f, u),
            l)
          ) {
            for (g(u.o), b = 0; b < $.length; b++)
              (m = $[b]).Fe['s-ol'] ||
                (((y = t.ve(''))['s-nr'] = m.Fe),
                t.g(t.we(m.Fe), (m.Fe['s-ol'] = y), m.Fe))
            for (e.he = !0, b = 0; b < $.length; b++) {
              for (
                m = $[b], k = t.we(m.Ie), C = t.Se(m.Ie), y = m.Fe['s-ol'];
                (y = t.We(y));

              )
                if (
                  (h = y['s-nr']) &&
                  h &&
                  h['s-sn'] === m.Fe['s-sn'] &&
                  k === t.we(h) &&
                  (h = t.Se(h)) &&
                  h &&
                  !h['s-nr']
                ) {
                  C = h
                  break
                }
              ;((!C && k !== t.we(m.Fe)) || t.Se(m.Fe) !== C) &&
                m.Fe !== C &&
                (t.Oe(m.Fe), t.g(k, m.Fe, C))
            }
            e.he = !1
          }
          return i && M(u.o), ($.length = 0), u
        }
      })(M, v)),
      (b['s-ld'] = []),
      (b['s-rn'] = !0),
      (b['s-init'] = () => {
        M.ue.set(b, (d.loaded = M.I = !0)),
          v.Te(o, 'appload', { detail: { namespace: e } })
      }),
      ((e, t, n, o, i, l) => {
        if (
          ((t.componentOnReady = (t, n) => {
            if (!t.nodeName.includes('-')) return n(null), !1
            const o = e.k(t)
            if (o)
              if (e.ue.has(t)) n(t)
              else {
                const o = e.ge.get(t) || []
                o.push(n), e.ge.set(t, o)
              }
            return !!o
          }),
          i)
        ) {
          for (l = i.length - 1; l >= 0; l--)
            t.componentOnReady(i[l][0], i[l][1]) && i.splice(l, 1)
          for (l = 0; l < o.length; l++) if (!n[o[l]].componentOnReady) return
          for (l = 0; l < i.length; l++) i[l][1](null)
          i.length = 0
        }
      })(M, d, o, o['s-apps'], o['s-cr']),
      (d.initialized = !0),
      M
    )
  },
  T = {}
let D = !1
export { o as defineCustomElement, n as h }
