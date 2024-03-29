export function applyPolyfill(window, document) {
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
        Object.defineProperty(e.location, 'origin', {
          get: r,
          enumerable: true,
        })
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
}
