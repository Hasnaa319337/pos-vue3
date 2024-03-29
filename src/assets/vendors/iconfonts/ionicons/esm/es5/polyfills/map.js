export function applyPolyfill(window, document) {
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
}
