/*! Built with http://stenciljs.com */
;((w, d, x, n, h, c, r) => {
  ;(s => {
    s && (r = s.getAttribute('data-resources-url'))
  })(d.querySelector("script[data-namespace='ionicons']"))
  function e(e, t) {
    return 'sc-' + e.t + (t && t !== l ? '-' + t : '')
  }
  function t(e, t) {
    return e + (t ? '-h' : '-s')
  }
  function o(e, t) {
    let n,
      o,
      l = null,
      i = !1,
      s = !1,
      r = arguments.length
    for (; r-- > 2; ) k.push(arguments[r])
    for (; k.length > 0; ) {
      let t = k.pop()
      if (t && void 0 !== t.pop) for (r = t.length; r--; ) k.push(t[r])
      else
        'boolean' == typeof t && (t = null),
          (s = 'function' != typeof e) &&
            (null == t
              ? (t = '')
              : 'number' == typeof t
              ? (t = String(t))
              : 'string' != typeof t && (s = !1)),
          s && i
            ? (l[l.length - 1].vtext += t)
            : null === l
            ? (l = [s ? { vtext: t } : t])
            : l.push(s ? { vtext: t } : t),
          (i = s)
    }
    if (null != t) {
      if (
        (t.className && (t.class = t.className), 'object' == typeof t.class)
      ) {
        for (r in t.class) t.class[r] && k.push(r)
        ;(t.class = k.join(' ')), (k.length = 0)
      }
      null != t.key && (n = t.key), null != t.name && (o = t.name)
    }
    return 'function' == typeof e
      ? e(t, l || [], j)
      : {
          vtag: e,
          vchildren: l,
          vtext: void 0,
          vattrs: t,
          vkey: n,
          vname: o,
          o: void 0,
          l: !1,
        }
  }
  const l = '$',
    i = {},
    s = (t, n, o, i) => {
      let s = o.t + l,
        r = o[s]
      if (
        ((2 === o.i || (1 === o.i && !t.u.s)) &&
          (i['s-sc'] = r ? e(o, i.mode) : e(o)),
        r)
      ) {
        let e = n.p.head
        if (n.s)
          if (1 === o.i) e = i.shadowRoot
          else {
            const t = i.getRootNode()
            t.host && (e = t)
          }
        let l = t.m.get(e)
        if ((l || t.m.set(e, (l = {})), !l[s])) {
          let t
          {
            ;(t = r.content.cloneNode(!0)), (l[s] = !0)
            const o = e.querySelectorAll('[data-styles]')
            n.v(e, t, (o.length && o[o.length - 1].nextSibling) || e.firstChild)
          }
        }
      }
    },
    a = e => null != e,
    f = e => e.toLowerCase(),
    u = (e, t, n, o = 'boolean' == typeof n, l) => {
      ;(l = t !== (t = t.replace(/^xlink\:?/, ''))),
        null == n || (o && (!n || 'false' === n))
          ? l
            ? e.removeAttributeNS(p, f(t))
            : e.removeAttribute(t)
          : 'function' != typeof n &&
            ((n = o ? '' : n.toString()),
            l ? e.setAttributeNS(p, f(t), n) : e.setAttribute(t, n))
    },
    p = 'http://www.w3.org/1999/xlink',
    m = (e, t, n, o, l, i, s) => {
      if ('class' !== n || i)
        if ('style' === n) {
          for (const e in o)
            (l && null != l[e]) ||
              (/-/.test(e) ? t.style.removeProperty(e) : (t.style[e] = ''))
          for (const e in l)
            (o && l[e] === o[e]) ||
              (/-/.test(e) ? t.style.setProperty(e, l[e]) : (t.style[e] = l[e]))
        } else if (
          'o' !== n[0] ||
          'n' !== n[1] ||
          !/[A-Z]/.test(n[2]) ||
          n in t
        )
          if (
            'list' !== n &&
            'type' !== n &&
            !i &&
            (n in t ||
              (-1 !== ['object', 'function'].indexOf(typeof l) && null !== l))
          ) {
            const o = e.M(t)
            o && o.g && o.g[n]
              ? (v(t, n, l), s && o.g[n].k && u(t, o.g[n].j, l, 4 === o.g[n].C))
              : 'ref' !== n &&
                (v(t, n, null == l ? '' : l),
                (null != l && !1 !== l) || e.u.W(t, n))
          } else
            null != l && 'key' !== n
              ? u(t, n, l)
              : (i || (e.u.O(t, n) && (null == l || !1 === l))) && e.u.W(t, n)
        else
          (n = f(n) in t ? f(n.substring(2)) : f(n[2]) + n.substring(3)),
            l ? l !== o && e.u.N(t, n, l, 0) : e.u.S(t, n, 0)
      else if (o !== l) {
        const e = b(o),
          n = b(l),
          i = e.filter(e => !n.includes(e)),
          s = b(t.className).filter(e => !i.includes(e)),
          r = n.filter(t => !e.includes(t) && !s.includes(t))
        s.push(...r), (t.className = s.join(' '))
      }
    },
    b = e => (null == e || '' === e ? [] : e.trim().split(/\s+/)),
    v = (e, t, n) => {
      try {
        e[t] = n
      } catch (e) {}
    },
    y = (e, t, n, o, l) => {
      const s = 11 === n.o.nodeType && n.o.host ? n.o.host : n.o,
        r = (t && t.vattrs) || i,
        a = n.vattrs || i
      for (l in r)
        (a && null != a[l]) || null == r[l] || m(e, s, l, r[l], void 0, o, n.l)
      for (l in a)
        (l in r && a[l] === ('value' === l || 'checked' === l ? s[l] : r[l])) ||
          m(e, s, l, r[l], a[l], o, n.l)
    }
  let M = !1
  const $ = (e, t) => {
      e &&
        (e.vattrs && e.vattrs.ref && e.vattrs.ref(t ? null : e.o),
        e.vchildren &&
          e.vchildren.forEach(e => {
            $(e, t)
          }))
    },
    g = (e, t) => {
      {
        let n = 0,
          o = !1
        const l = () => t.performance.now(),
          i = !1 !== e.asyncQueue,
          s = Promise.resolve(),
          r = [],
          a = [],
          c = [],
          f = [],
          u = t => n => {
            t.push(n), o || ((o = !0), e.raf(m))
          },
          p = e => {
            for (let t = 0; t < e.length; t++)
              try {
                e[t](l())
              } catch (e) {
                console.error(e)
              }
            e.length = 0
          },
          d = (e, t) => {
            let n,
              o = 0
            for (; o < e.length && (n = l()) < t; )
              try {
                e[o++](n)
              } catch (e) {
                console.error(e)
              }
            o === e.length ? (e.length = 0) : 0 !== o && e.splice(0, o)
          },
          m = () => {
            n++, p(a)
            const t = i ? l() + 7 * Math.ceil(n * (1 / 22)) : Infinity
            d(c, t),
              d(f, t),
              c.length > 0 && (f.push(...c), (c.length = 0)),
              (o = a.length + c.length + f.length > 0) ? e.raf(m) : (n = 0)
          }
        return (
          e.raf || (e.raf = t.requestAnimationFrame.bind(t)),
          {
            tick(e) {
              r.push(e), 1 === r.length && s.then(() => p(r))
            },
            read: u(a),
            write: u(c),
          }
        )
      }
    },
    k = [],
    j = { forEach: (e, t) => e.forEach(t), map: (e, t) => e.map(t) },
    C = (e, t, n) => {
      const [o, l, , i, s, r] = e,
        a = { color: { j: 'color' } }
      if (i)
        for (t = 0; t < i.length; t++)
          a[(n = i[t])[0]] = {
            A: n[1],
            k: !!n[2],
            j: 'string' == typeof n[3] ? n[3] : n[3] ? n[0] : 0,
            C: n[4],
          }
      return {
        t: o,
        T: l,
        g: Object.assign({}, a),
        i: s,
        R: r ? r.map(W) : void 0,
      }
    },
    W = e => ({ L: e[0], D: e[1], q: !!e[2], B: !!e[3], I: !!e[4] }),
    O = (e, t) =>
      a(t) && 'object' != typeof t && 'function' != typeof t
        ? e === Boolean || 4 === e
          ? 'false' !== t && ('' === t || !!t)
          : e === Number || 8 === e
          ? parseFloat(t)
          : e === String || 2 === e
          ? t.toString()
          : t
        : t,
    N = (e, t, n) => {
      e.P.add(t),
        e.F.has(t) ||
          (e.F.set(t, !0),
          e.H
            ? e.queue.write(() => S(e, t, n))
            : e.queue.tick(() => S(e, t, n)))
    },
    S = async (e, n, l, i, s, r) => {
      if ((e.F.delete(n), !e.U.has(n))) {
        if (!(s = e.Z.get(n))) {
          if ((r = e.G.get(n)) && !r['s-rn'])
            return void (r['s-rc'] = r['s-rc'] || []).push(() => {
              S(e, n, l)
            })
          if ((s = D(e, n, e.J.get(n), l)))
            try {
              s.componentWillLoad && (await s.componentWillLoad())
            } catch (t) {
              e.K(t, 3, n)
            }
        }
        ;((e, n, l, i) => {
          try {
            const s = n.V.host,
              r = n.V.encapsulation,
              a = 'shadow' === r && e.u.s
            let c,
              f = l
            if (
              ((c = ((e, t, n) => (
                e &&
                  Object.keys(e).forEach(o => {
                    e[o].reflectToAttr && ((n = n || {})[o] = t[o])
                  }),
                n
              ))(n.V.properties, i)),
              a && (f = l.shadowRoot),
              !l['s-rn'])
            ) {
              e.X(e, e.u, n, l)
              const o = l['s-sc']
              o && (e.u.Y(l, t(o, !0)), 'scoped' === r && e.u.Y(l, t(o)))
            }
            if (i.render || i.hostData || s || c) {
              e._ = !0
              const t = i.render && i.render()
              let n
              ;(n = i.hostData && i.hostData()),
                c && (n = n ? Object.assign(n, c) : c),
                (e._ = !1)
              const s = o(null, n, t),
                u = e.ee.get(l) || {}
              ;(u.o = f), (s.l = !0), e.ee.set(l, e.render(l, u, s, a, r))
            }
            ;(l['s-rn'] = !0),
              l['s-rc'] && (l['s-rc'].forEach(e => e()), (l['s-rc'] = null))
          } catch (t) {
            ;(e._ = !1), e.K(t, 8, l, !0)
          }
        })(e, e.M(n), n, s),
          n['s-init']()
      }
    },
    E = (e, t, n, o, l, i, s, r, c) => {
      if (t.type || t.state) {
        const f = e.te.get(n)
        t.state ||
          (!t.attr ||
            (void 0 !== f[l] && '' !== f[l]) ||
            ((r = i && i.ne) && a((c = r[t.attr])) && (f[l] = O(t.type, c))),
          n.hasOwnProperty(l) &&
            (void 0 === f[l] && (f[l] = O(t.type, n[l])),
            'mode' !== l && delete n[l])),
          o.hasOwnProperty(l) && void 0 === f[l] && (f[l] = o[l]),
          t.watchCallbacks && (f[L + l] = t.watchCallbacks.slice()),
          R(
            o,
            l,
            function f(t) {
              return (t = e.te.get(e.oe.get(this))) && t[l]
            },
            function u(n, o) {
              ;(o = e.oe.get(this)) &&
                (t.state || t.mutable) &&
                A(e, o, l, n, s)
            }
          )
      } else if (t.elementRef) T(o, l, n)
      else if (t.context) {
        const i = e.le(t.context)
        void 0 !== i && T(o, l, (i.getContext && i.getContext(n)) || i)
      }
    },
    A = (e, t, n, o, l, i, s) => {
      ;(s = e.te.get(t)) || e.te.set(t, (s = {}))
      const r = s[n]
      if (o !== r && ((s[n] = o), (i = e.Z.get(t)))) {
        {
          const e = s[L + n]
          if (e)
            for (let t = 0; t < e.length; t++)
              try {
                i[e[t]].call(i, o, r, n)
              } catch (e) {
                console.error(e)
              }
        }
        !e._ && t['s-rn'] && N(e, t, l)
      }
    },
    T = (e, t, n) => {
      Object.defineProperty(e, t, { configurable: !0, value: n })
    },
    R = (e, t, n, o) => {
      Object.defineProperty(e, t, { configurable: !0, get: n, set: o })
    },
    L = 'wc-',
    D = (e, t, n, o, l, i) => {
      try {
        ;(l = new (i = e.M(t).V)()),
          ((e, t, n, o, l, i) => {
            e.oe.set(o, n),
              e.te.has(n) || e.te.set(n, {}),
              Object.entries(
                Object.assign({ color: { type: String } }, t.properties, {
                  mode: { type: String },
                })
              ).forEach(([t, s]) => {
                E(e, s, n, o, t, l, i)
              })
          })(e, i, t, l, n, o)
      } catch (n) {
        ;(l = {}), e.K(n, 7, t, !0)
      }
      return e.Z.set(t, l), l
    },
    q = (e, t, n, o, l, i) => {
      if (
        (e.P.delete(t),
        (l = e.G.get(t)) &&
          ((o = l['s-ld']) &&
            ((n = o.indexOf(t)) > -1 && o.splice(n, 1),
            o.length || (l['s-init'] && l['s-init']())),
          e.G.delete(t)),
        e.ie.length && !e.P.size)
      )
        for (; (i = e.ie.shift()); ) i()
    },
    B = (e, t, n, o) => {
      t.forEach(([t, l]) => {
        3 & l.A &&
          R(
            n,
            t,
            function n() {
              return (e.te.get(this) || {})[t]
            },
            function n(i) {
              A(e, this, t, O(l.C, i), o)
            }
          )
      })
    },
    I = (e, t, n, o, l) => {
      if (
        ((n.connectedCallback = function () {
          ;((e, t, n) => {
            e.U.delete(n),
              e.se.has(n) ||
                ((e.re = !0),
                e.P.add(n),
                e.se.set(n, !0),
                ((e, t, n) => {
                  for (n = t; (n = e.u.ae(n)); )
                    if (e.ce(n)) {
                      e.fe.has(t) ||
                        (e.G.set(t, n), (n['s-ld'] = n['s-ld'] || []).push(t))
                      break
                    }
                })(e, n),
                e.queue.tick(() => {
                  e.J.set(
                    n,
                    ((e, t, n, o, l) => (
                      n.mode || (n.mode = e.ue(n)),
                      n['s-cr'] ||
                        e.pe(n, 'ssrv') ||
                        (e.s && 1 === t.i) ||
                        ((n['s-cr'] = e.de('')),
                        (n['s-cr']['s-cn'] = !0),
                        e.v(n, n['s-cr'], e.me(n)[0])),
                      1 === t.i &&
                        e.s &&
                        !n.shadowRoot &&
                        e.be(n, { mode: 'open' }),
                      (o = { ne: {} }),
                      t.g &&
                        Object.keys(t.g).forEach(i => {
                          ;(l = t.g[i].j) && (o.ne[l] = e.pe(n, l))
                        }),
                      o
                    ))(e.u, t, n)
                  ),
                    e.ve(t, n)
                }))
          })(e, t, this)
        }),
        (n.disconnectedCallback = function () {
          ;((e, t) => {
            if (
              !e.he &&
              ((e, t) => {
                for (; t; ) {
                  if (!e.ye(t)) return 9 !== e.we(t)
                  t = e.ye(t)
                }
              })(e.u, t)
            ) {
              e.U.set(t, !0), q(e, t), $(e.ee.get(t), !0)
              {
                const n = e.Z.get(t)
                n && n.componentDidUnload && n.componentDidUnload()
              }
              e.u.S(t),
                e.Me.delete(t),
                [e.G, e.$e, e.J].forEach(e => e.delete(t))
            }
          })(e, this)
        }),
        (n['s-init'] = function () {
          ;((e, t, n, o, l, i) => {
            if (
              e.Z.get(t) &&
              !e.U.has(t) &&
              (!t['s-ld'] || !t['s-ld'].length)
            ) {
              e.fe.set(t, !0),
                e.ge.has(t) ||
                  (e.ge.set(t, !0), (t['s-ld'] = void 0), e.u.Y(t, n))
              try {
                $(e.ee.get(t)),
                  (i = e.$e.get(t)) && (i.forEach(e => e(t)), e.$e.delete(t))
              } catch (n) {
                e.K(n, 4, t)
              }
              q(e, t)
            }
          })(e, this, o)
        }),
        (n.forceUpdate = function () {
          N(e, this, l)
        }),
        t.g)
      ) {
        const o = Object.entries(t.g)
        {
          let e = {}
          o.forEach(([t, { j: n }]) => {
            n && (e[n] = t)
          }),
            (e = Object.assign({}, e)),
            (n.attributeChangedCallback = function (t, n, o) {
              ;(function l(e, t, n, o) {
                const l = e[f(n)]
                l && (t[l] = o)
              })(e, this, t, o)
            })
        }
        B(e, o, n, l)
      }
    }
  ;((e, t, n, i, r, c, u) => {
    const p = n.performance,
      d = { html: {} },
      m = (n[e] = n[e] || {}),
      b = ((e, t, n) => {
        const o = new WeakMap(),
          l = {
            p: n,
            s: !!n.documentElement.attachShadow,
            ke: !1,
            we: e => e.nodeType,
            je: e => n.createElement(e),
            Ce: (e, t) => n.createElementNS(e, t),
            de: e => n.createTextNode(e),
            We: e => n.createComment(e),
            v: (e, t, n) => e.insertBefore(t, n),
            Oe: e => e.remove(),
            Ne: (e, t) => e.appendChild(t),
            Y: (e, t) => {
              e.classList.add(t)
            },
            me: e => e.childNodes,
            ye: e => e.parentNode,
            Se: e => e.nextSibling,
            Ee: e => e.previousSibling,
            xe: e => f(e.nodeName),
            Ae: e => e.textContent,
            Te: (e, t) => (e.textContent = t),
            pe: (e, t) => e.getAttribute(t),
            Re: (e, t, n) => e.setAttribute(t, n),
            W: (e, t) => e.removeAttribute(t),
            O: (e, t) => e.hasAttribute(t),
            ue: t => t.getAttribute('mode') || (e.Context || {}).mode,
            Le: (e, o) =>
              'child' === o
                ? e.firstElementChild
                : 'parent' === o
                ? l.ae(e)
                : 'body' === o
                ? n.body
                : 'document' === o
                ? n
                : 'window' === o
                ? t
                : e,
            N: (t, n, i, s, r, a, c, f, u, p) => {
              let d = t,
                m = i,
                b = o.get(t)
              ;(p = n + s),
                b && b[p] && b[p](),
                'object' == typeof c && (d = c),
                d &&
                  ((f = l.ke ? { capture: !!r, passive: !!a } : !!r),
                  e.ael(d, n, m, f),
                  b || o.set(t, (b = {})),
                  (b[p] = () => {
                    d && e.rel(d, n, m, f), (b[p] = null)
                  }))
            },
            S: (e, t, n, l) => {
              ;(l = o.get(e)) &&
                (t
                  ? l[t + n] && l[t + n]()
                  : Object.keys(l).forEach(e => {
                      l[e] && l[e]()
                    }))
            },
            De: (e, n, o, l) => (
              (l = new t.CustomEvent(n, o)), e && e.dispatchEvent(l), l
            ),
            ae: (e, t) => ((t = l.ye(e)) && 11 === l.we(t) ? t.host : t),
            qe: (e, t, n, o) => e.setAttributeNS(t, n, o),
            be: (e, t) => e.attachShadow(t),
          }
        return (
          e.ael ||
            ((e.ael = (e, t, n, o) => e.addEventListener(t, n, o)),
            (e.rel = (e, t, n, o) => e.removeEventListener(t, n, o))),
          l
        )
      })(m, n, i),
      v = b.p.documentElement,
      h = (n['s-defined'] = n['s-defined'] || {}),
      w = (e, t) => {
        n.customElements.get(e.t) ||
          (I($, (d[e.t] = e), t.prototype, c, p),
          (t.observedAttributes = Object.values(e.g)
            .map(e => e.j)
            .filter(e => !!e)),
          n.customElements.define(e.t, t))
      },
      $ = {
        u: b,
        Be: w,
        M: e => d[b.xe(e)],
        le: e => t[e],
        isClient: !0,
        ce: e => !(!h[b.xe(e)] && !$.M(e)),
        K: (e, t, n) => console.error(e, t, n && n.tagName),
        queue: (t.queue = g(m, n)),
        ve: (e, t) => {
          {
            const n = e.T,
              o = !b.s
            let i = r + n + (o ? '.sc' : '') + '.entry.js'
            import(i).then(
              n => {
                try {
                  ;(e.V =
                    n[
                      (e =>
                        f(e)
                          .split('-')
                          .map(e => e.charAt(0).toUpperCase() + e.slice(1))
                          .join(''))(e.t)
                    ]),
                    (function o(e, t, n, i, s) {
                      if (i) {
                        const n = t.t + (s || l)
                        if (!t[n]) {
                          const o = e.je('template')
                          ;(t[n] = o),
                            (o.innerHTML = `<style>${i}</style>`),
                            e.Ne(e.p.head, o)
                        }
                      }
                    })(b, e, e.i, e.V.style, e.V.styleMode),
                    N($, t, p)
                } catch (t) {
                  console.error(t), (e.V = class {})
                }
              },
              e => console.error(e, i)
            )
          }
        },
        _: !1,
        H: !1,
        he: !1,
        X: s,
        G: new WeakMap(),
        m: new WeakMap(),
        se: new WeakMap(),
        Me: new WeakMap(),
        ge: new WeakMap(),
        fe: new WeakMap(),
        oe: new WeakMap(),
        J: new WeakMap(),
        Z: new WeakMap(),
        U: new WeakMap(),
        F: new WeakMap(),
        $e: new WeakMap(),
        Ie: new WeakMap(),
        ee: new WeakMap(),
        te: new WeakMap(),
        P: new Set(),
        ie: [],
      }
    return (
      (t.isServer = t.isPrerender = !(t.isClient = !0)),
      (t.window = n),
      (t.location = n.location),
      (t.document = i),
      (t.resourcesUrl = t.publicPath = r),
      (m.h = o),
      (m.Context = t),
      (m.onReady = () =>
        new Promise(e => $.queue.write(() => ($.P.size ? $.ie.push(e) : e())))),
      ($.render = ((e, t) => {
        let n, o, l, i, s, r, c
        const f = (l, p, d, m, b, v, h, w, $) => {
            if (
              ((w = p.vchildren[d]),
              n ||
                ((i = !0),
                'slot' === w.vtag &&
                  (o && t.Y(m, o + '-s'),
                  w.vchildren ? (w.Pe = !0) : (w.Fe = !0))),
              a(w.vtext))
            )
              w.o = t.de(w.vtext)
            else if (w.Fe) w.o = t.de('')
            else {
              if (
                ((v = w.o =
                  M || 'svg' === w.vtag
                    ? t.Ce('http://www.w3.org/2000/svg', w.vtag)
                    : t.je(w.Pe ? 'slot-fb' : w.vtag)),
                e.ce(v) && e.fe.delete(c),
                (M = 'svg' === w.vtag || ('foreignObject' !== w.vtag && M)),
                y(e, null, w, M),
                a(o) && v['s-si'] !== o && t.Y(v, (v['s-si'] = o)),
                w.vchildren)
              )
                for (b = 0; b < w.vchildren.length; ++b)
                  (h = f(l, w, b, v)) && t.Ne(v, h)
              'svg' === w.vtag && (M = !1)
            }
            return (
              (w.o['s-hn'] = r),
              (w.Pe || w.Fe) &&
                ((w.o['s-sr'] = !0),
                (w.o['s-cr'] = s),
                (w.o['s-sn'] = w.vname || ''),
                ($ = l && l.vchildren && l.vchildren[d]) &&
                  $.vtag === w.vtag &&
                  l.o &&
                  u(l.o)),
              w.o
            )
          },
          u = (n, o, l, s) => {
            e.he = !0
            const a = t.me(n)
            for (l = a.length - 1; l >= 0; l--)
              (s = a[l])['s-hn'] !== r &&
                s['s-ol'] &&
                (t.Oe(s),
                t.v(v(s), s, b(s)),
                t.Oe(s['s-ol']),
                (s['s-ol'] = null),
                (i = !0)),
                o && u(s, o)
            e.he = !1
          },
          p = (e, n, o, l, i, s, c, u) => {
            const p = e['s-cr']
            for (
              (c = (p && t.ye(p)) || e).shadowRoot &&
              t.xe(c) === r &&
              (c = c.shadowRoot);
              i <= s;
              ++i
            )
              l[i] &&
                (u = a(l[i].vtext) ? t.de(l[i].vtext) : f(null, o, i, e)) &&
                ((l[i].o = u), t.v(c, u, b(n)))
          },
          d = (e, n, o, i) => {
            for (; n <= o; ++n)
              a(e[n]) &&
                ((i = e[n].o),
                (l = !0),
                i['s-ol'] ? t.Oe(i['s-ol']) : u(i, !0),
                t.Oe(i))
          },
          m = (e, t) =>
            e.vtag === t.vtag &&
            e.vkey === t.vkey &&
            ('slot' !== e.vtag || e.vname === t.vname),
          b = e => (e && e['s-ol'] ? e['s-ol'] : e),
          v = e => t.ye(e['s-ol'] ? e['s-ol'] : e),
          h = (n, o, l) => {
            const i = (o.o = n.o),
              s = n.vchildren,
              r = o.vchildren
            ;(M = o.o && a(t.ae(o.o)) && void 0 !== o.o.ownerSVGElement),
              (M = 'svg' === o.vtag || ('foreignObject' !== o.vtag && M)),
              a(o.vtext)
                ? (l = i['s-cr'])
                  ? t.Te(t.ye(l), o.vtext)
                  : n.vtext !== o.vtext && t.Te(i, o.vtext)
                : ('slot' !== o.vtag && y(e, n, o, M),
                  a(s) && a(r)
                    ? ((e, n, o, l, i, s, r, c) => {
                        let y = 0,
                          w = 0,
                          M = n.length - 1,
                          $ = n[0],
                          g = n[M],
                          k = l.length - 1,
                          j = l[0],
                          C = l[k]
                        for (; y <= M && w <= k; )
                          if (null == $) $ = n[++y]
                          else if (null == g) g = n[--M]
                          else if (null == j) j = l[++w]
                          else if (null == C) C = l[--k]
                          else if (m($, j)) h($, j), ($ = n[++y]), (j = l[++w])
                          else if (m(g, C)) h(g, C), (g = n[--M]), (C = l[--k])
                          else if (m($, C))
                            ('slot' !== $.vtag && 'slot' !== C.vtag) ||
                              u(t.ye($.o)),
                              h($, C),
                              t.v(e, $.o, t.Se(g.o)),
                              ($ = n[++y]),
                              (C = l[--k])
                          else if (m(g, j))
                            ('slot' !== $.vtag && 'slot' !== C.vtag) ||
                              u(t.ye(g.o)),
                              h(g, j),
                              t.v(e, g.o, $.o),
                              (g = n[--M]),
                              (j = l[++w])
                          else {
                            for (i = null, s = y; s <= M; ++s)
                              if (
                                n[s] &&
                                a(n[s].vkey) &&
                                n[s].vkey === j.vkey
                              ) {
                                i = s
                                break
                              }
                            a(i)
                              ? ((c = n[i]).vtag !== j.vtag
                                  ? (r = f(n && n[w], o, i, e))
                                  : (h(c, j), (n[i] = void 0), (r = c.o)),
                                (j = l[++w]))
                              : ((r = f(n && n[w], o, w, e)), (j = l[++w])),
                              r && t.v(v($.o), r, b($.o))
                          }
                        y > M
                          ? p(
                              e,
                              null == l[k + 1] ? null : l[k + 1].o,
                              o,
                              l,
                              w,
                              k
                            )
                          : w > k && d(n, y, M)
                      })(i, s, o, r)
                    : a(r)
                    ? (a(n.vtext) && t.Te(i, ''),
                      p(i, null, o, r, 0, r.length - 1))
                    : a(s) && d(s, 0, s.length - 1)),
              M && 'svg' === o.vtag && (M = !1)
          },
          w = (e, n, o, l, i, s, r, a) => {
            for (l = 0, i = (o = t.me(e)).length; l < i; l++)
              if (((n = o[l]), 1 === t.we(n))) {
                if (n['s-sr'])
                  for (r = n['s-sn'], n.hidden = !1, s = 0; s < i; s++)
                    if (o[s]['s-hn'] !== n['s-hn'])
                      if (((a = t.we(o[s])), '' !== r)) {
                        if (1 === a && r === t.pe(o[s], 'slot')) {
                          n.hidden = !0
                          break
                        }
                      } else if (
                        1 === a ||
                        (3 === a && '' !== t.Ae(o[s]).trim())
                      ) {
                        n.hidden = !0
                        break
                      }
                w(n)
              }
          },
          $ = [],
          g = (e, n, o, i, s, r, a, c, f, u) => {
            for (s = 0, r = (n = t.me(e)).length; s < r; s++) {
              if ((o = n[s])['s-sr'] && (i = o['s-cr']))
                for (
                  c = t.me(t.ye(i)), f = o['s-sn'], a = c.length - 1;
                  a >= 0;
                  a--
                )
                  (i = c[a])['s-cn'] ||
                    i['s-nr'] ||
                    i['s-hn'] === o['s-hn'] ||
                    ((((3 === (u = t.we(i)) || 8 === u) && '' === f) ||
                      (1 === u && null === t.pe(i, 'slot') && '' === f) ||
                      (1 === u && t.pe(i, 'slot') === f)) &&
                      ($.some(e => e.He === i) ||
                        ((l = !0), (i['s-sn'] = f), $.push({ Qe: o, He: i }))))
              1 === t.we(o) && g(o)
            }
          }
        return (a, f, u, p, d, m, b, v, y, M, k, j) => {
          if (
            ((c = a),
            (r = t.xe(c)),
            (s = c['s-cr']),
            (n = p),
            (o = c['s-sc']),
            (i = l = !1),
            h(f, u),
            i)
          ) {
            for (g(u.o), b = 0; b < $.length; b++)
              (v = $[b]).He['s-ol'] ||
                (((y = t.de(''))['s-nr'] = v.He),
                t.v(t.ye(v.He), (v.He['s-ol'] = y), v.He))
            for (e.he = !0, b = 0; b < $.length; b++) {
              for (
                v = $[b], k = t.ye(v.Qe), j = t.Se(v.Qe), y = v.He['s-ol'];
                (y = t.Ee(y));

              )
                if (
                  (M = y['s-nr']) &&
                  M &&
                  M['s-sn'] === v.He['s-sn'] &&
                  k === t.ye(M) &&
                  (M = t.Se(M)) &&
                  M &&
                  !M['s-nr']
                ) {
                  j = M
                  break
                }
              ;((!j && k !== t.ye(v.He)) || t.Se(v.He) !== j) &&
                v.He !== j &&
                (t.Oe(v.He), t.v(k, v.He, j))
            }
            e.he = !1
          }
          return l && w(u.o), ($.length = 0), u
        }
      })($, b)),
      (v['s-ld'] = []),
      (v['s-rn'] = !0),
      (v['s-init'] = () => {
        $.fe.set(v, (m.loaded = $.H = !0)),
          b.De(n, 'appload', { detail: { namespace: e } })
      }),
      u.map(C).forEach(e => w(e, class extends HTMLElement {})),
      $.re || v['s-init'](),
      ((e, t, n, o, l, i) => {
        if (
          ((t.componentOnReady = (t, n) => {
            if (!t.nodeName.includes('-')) return n(null), !1
            const o = e.M(t)
            if (o)
              if (e.fe.has(t)) n(t)
              else {
                const o = e.$e.get(t) || []
                o.push(n), e.$e.set(t, o)
              }
            return !!o
          }),
          l)
        ) {
          for (i = l.length - 1; i >= 0; i--)
            t.componentOnReady(l[i][0], l[i][1]) && l.splice(i, 1)
          for (i = 0; i < o.length; i++) if (!n[o[i]].componentOnReady) return
          for (i = 0; i < l.length; i++) l[i][1](null)
          l.length = 0
        }
      })($, m, n, n['s-apps'], n['s-cr']),
      (m.initialized = !0),
      $
    )
  })(n, x, w, d, r, h, c)
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
