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
  var StyleNode = (function () {
    return function () {
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
    }
  })()
  function parse(e) {
    return parseCss(lex((e = clean(e))), e)
  }
  function clean(e) {
    return e.replace(RX.comments, '').replace(RX.port, '')
  }
  function lex(e) {
    var t = new StyleNode()
    ;(t.start = 0), (t.end = e.length)
    for (var r = t, n = 0, s = e.length; n < s; n++)
      if (e[n] === OPEN_BRACE) {
        r.rules || (r.rules = [])
        var a = r,
          o = a.rules[a.rules.length - 1] || null
        ;((r = new StyleNode()).start = n + 1),
          (r.parent = a),
          (r.previous = o),
          a.rules.push(r)
      } else e[n] === CLOSE_BRACE && ((r.end = n + 1), (r = r.parent || t))
    return t
  }
  function parseCss(e, t) {
    var r = t.substring(e.start, e.end - 1)
    if (((e.parsedCssText = e.cssText = r.trim()), e.parent)) {
      var n = e.previous ? e.previous.end : e.parent.start
      r = (r = (r = _expandUnicodeEscapes(
        (r = t.substring(n, e.start - 1))
      )).replace(RX.multipleSpaces, ' ')).substring(r.lastIndexOf(';') + 1)
      var s = (e.parsedSelector = e.selector = r.trim())
      ;(e.atRule = 0 === s.indexOf(AT_START)),
        e.atRule
          ? 0 === s.indexOf(MEDIA_START)
            ? (e.type = types.MEDIA_RULE)
            : s.match(RX.keyframesRule) &&
              ((e.type = types.KEYFRAMES_RULE),
              (e.keyframesName = e.selector.split(RX.multipleSpaces).pop()))
          : 0 === s.indexOf(VAR_START)
          ? (e.type = types.MIXIN_RULE)
          : (e.type = types.STYLE_RULE)
    }
    var a = e.rules
    if (a)
      for (var o = 0, i = a.length, l = void 0; o < i && (l = a[o]); o++)
        parseCss(l, t)
    return e
  }
  function _expandUnicodeEscapes(e) {
    return e.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
      for (var e = arguments[1], t = 6 - e.length; t--; ) e = '0' + e
      return '\\' + e
    })
  }
  var types = {
      STYLE_RULE: 1,
      KEYFRAMES_RULE: 7,
      MEDIA_RULE: 4,
      MIXIN_RULE: 1e3,
    },
    OPEN_BRACE = '{',
    CLOSE_BRACE = '}',
    RX = {
      comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
      port: /@import[^;]*;/gim,
      customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      keyframesRule: /^@[^\s]*keyframes/,
      multipleSpaces: /\s+/g,
    },
    VAR_START = '--',
    MEDIA_START = '@media',
    AT_START = '@'
  function findRegex(e, t, r) {
    e.lastIndex = 0
    var n = t.substring(r).match(e)
    if (n) {
      var s = r + n.index
      return { start: s, end: s + n[0].length }
    }
    return null
  }
  var VAR_USAGE_START = /\bvar\(/,
    VAR_ASSIGN_START = /\B--[\w-]+\s*:/,
    COMMENTS = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
    TRAILING_LINES = /^[\t ]+\n/gm
  function resolveVar(e, t, r) {
    return e[t] ? e[t] : r ? executeTemplate(r, e) : ''
  }
  function findVarEndIndex(e, t) {
    for (var r = 0, n = t; n < e.length; n++) {
      var s = e[n]
      if ('(' === s) r++
      else if (')' === s && --r <= 0) return n + 1
    }
    return n
  }
  function parseVar(e, t) {
    var r = findRegex(VAR_USAGE_START, e, t)
    if (!r) return null
    var n = findVarEndIndex(e, r.start),
      s = e.substring(r.end, n - 1).split(','),
      a = s[0],
      o = s.slice(1)
    return {
      start: r.start,
      end: n,
      propName: a.trim(),
      fallback: o.length > 0 ? o.join(',').trim() : void 0,
    }
  }
  function compileVar(e, t, r) {
    var n = parseVar(e, r)
    if (!n) return t.push(e.substring(r, e.length)), e.length
    var s = n.propName,
      a = null != n.fallback ? compileTemplate(n.fallback) : void 0
    return (
      t.push(e.substring(r, n.start), function (e) {
        return resolveVar(e, s, a)
      }),
      n.end
    )
  }
  function executeTemplate(e, t) {
    for (var r = '', n = 0; n < e.length; n++) {
      var s = e[n]
      r += 'string' == typeof s ? s : s(t)
    }
    return r
  }
  function findEndValue(e, t) {
    for (var r = !1, n = !1, s = t; s < e.length; s++) {
      var a = e[s]
      if (r) n && '"' === a && (r = !1), n || "'" !== a || (r = !1)
      else if ('"' === a) (r = !0), (n = !0)
      else if ("'" === a) (r = !0), (n = !1)
      else {
        if (';' === a) return s + 1
        if ('}' === a) return s
      }
    }
    return s
  }
  function removeCustomAssigns(e) {
    for (var t = '', r = 0; ; ) {
      var n = findRegex(VAR_ASSIGN_START, e, r),
        s = n ? n.start : e.length
      if (((t += e.substring(r, s)), !n)) break
      r = findEndValue(e, s)
    }
    return t
  }
  function compileTemplate(e) {
    var t = 0
    e = removeCustomAssigns((e = e.replace(COMMENTS, ''))).replace(
      TRAILING_LINES,
      ''
    )
    for (var r = []; t < e.length; ) t = compileVar(e, r, t)
    return r
  }
  function resolveValues(e) {
    var t = {}
    e.forEach(function (e) {
      e.declarations.forEach(function (e) {
        t[e.prop] = e.value
      })
    })
    for (
      var r = {},
        n = Object.entries(t),
        s = function (e) {
          var t = !1
          if (
            (n.forEach(function (e) {
              var n = e[0],
                s = executeTemplate(e[1], r)
              s !== r[n] && ((r[n] = s), (t = !0))
            }),
            !t)
          )
            return 'break'
        },
        a = 0;
      a < 10;
      a++
    ) {
      if ('break' === s()) break
    }
    return r
  }
  function getSelectors(e, t) {
    if ((void 0 === t && (t = 0), !e.rules)) return []
    var r = []
    return (
      e.rules
        .filter(function (e) {
          return e.type === types.STYLE_RULE
        })
        .forEach(function (e) {
          var n = getDeclarations(e.cssText)
          n.length > 0 &&
            e.parsedSelector.split(',').forEach(function (e) {
              ;(e = e.trim()),
                r.push({
                  selector: e,
                  declarations: n,
                  specificity: computeSpecificity(e),
                  nu: t,
                })
            }),
            t++
        }),
      r
    )
  }
  function computeSpecificity(e) {
    return 1
  }
  var IMPORTANT = '!important',
    FIND_DECLARATIONS =
      /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gm
  function getDeclarations(e) {
    for (var t, r = []; (t = FIND_DECLARATIONS.exec(e.trim())); ) {
      var n = normalizeValue(t[2]),
        s = n.value,
        a = n.important
      r.push({ prop: t[1].trim(), value: compileTemplate(s), important: a })
    }
    return r
  }
  function normalizeValue(e) {
    var t = (e = e.replace(/\s+/gim, ' ').trim()).endsWith(IMPORTANT)
    return (
      t && (e = e.substr(0, e.length - IMPORTANT.length).trim()),
      { value: e, important: t }
    )
  }
  function getActiveSelectors(e, t, r) {
    return sortSelectors(
      getSelectorsForScopes(r.concat(getScopesForElement(t, e))).filter(
        function (t) {
          return matches(e, t.selector)
        }
      )
    )
  }
  function getScopesForElement(e, t) {
    for (var r = []; t; ) {
      var n = e.get(t)
      n && r.push(n), (t = t.parentElement)
    }
    return r
  }
  function getSelectorsForScopes(e) {
    var t = []
    return (
      e.forEach(function (e) {
        t.push.apply(t, e.selectors)
      }),
      t
    )
  }
  function sortSelectors(e) {
    return (
      e.sort(function (e, t) {
        return e.specificity === t.specificity
          ? e.nu - t.nu
          : e.specificity - t.specificity
      }),
      e
    )
  }
  function matches(e, t) {
    return e.matches(t)
  }
  function parseCSS(e) {
    var t = parse(e),
      r = compileTemplate(e)
    return {
      original: e,
      template: r,
      selectors: getSelectors(t),
      isDynamic: r.length > 1,
    }
  }
  function addGlobalStyle(e, t) {
    var r = parseCSS(t.innerHTML)
    ;(r.styleEl = t), e.push(r)
  }
  function updateGlobalScopes(e) {
    var t = resolveValues(getSelectorsForScopes(e))
    e.forEach(function (e) {
      e.isDynamic && (e.styleEl.innerHTML = executeTemplate(e.template, t))
    })
  }
  function reScope(e, t) {
    var r = e.template.map(function (r) {
        return 'string' == typeof r ? replaceScope(r, e.cssScopeId, t) : r
      }),
      n = e.selectors.map(function (r) {
        return Object.assign({}, r, {
          selector: replaceScope(r.selector, e.cssScopeId, t),
        })
      })
    return Object.assign({}, e, { template: r, selectors: n, cssScopeId: t })
  }
  function replaceScope(e, t, r) {
    return (e = replaceAll(e, '\\.' + t, '.' + r))
  }
  function replaceAll(e, t, r) {
    return e.replace(new RegExp(t, 'g'), r)
  }
  function loadDocument(e, t) {
    return loadDocumentLinks(e, t).then(function () {
      loadDocumentStyles(e, t)
    })
  }
  function loadDocumentLinks(e, t) {
    for (
      var r = [], n = e.querySelectorAll('link[rel="stylesheet"][href]'), s = 0;
      s < n.length;
      s++
    )
      r.push(addGlobalLink(e, t, n[s]))
    return Promise.all(r)
  }
  function loadDocumentStyles(e, t) {
    for (var r = e.querySelectorAll('style'), n = 0; n < r.length; n++)
      addGlobalStyle(t, r[n])
  }
  function addGlobalLink(e, t, r) {
    var n = r.href
    return fetch(n)
      .then(function (e) {
        return e.text()
      })
      .then(function (s) {
        if (hasCssVariables(s) && r.parentNode) {
          hasRelativeUrls(s) && (s = fixRelativeUrls(s, n))
          var a = e.createElement('style')
          ;(a.innerHTML = s),
            addGlobalStyle(t, a),
            r.parentNode.insertBefore(a, r),
            r.remove()
        }
      })
      .catch(function (e) {
        console.error(e)
      })
  }
  var CSS_VARIABLE_REGEXP = /[\s;{]--[-a-zA-Z0-9]+\s*:/m
  function hasCssVariables(e) {
    return e.indexOf('var(') > -1 || CSS_VARIABLE_REGEXP.test(e)
  }
  var CSS_URL_REGEXP =
    /url[\s]*\([\s]*['"]?(?![http|\/])([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim
  function hasRelativeUrls(e) {
    return (CSS_URL_REGEXP.lastIndex = 0), CSS_URL_REGEXP.test(e)
  }
  function fixRelativeUrls(e, t) {
    var r = t.replace(/[^\/]*$/, '')
    return e.replace(CSS_URL_REGEXP, function (e, t) {
      var n = r + t
      return e.replace(t, n)
    })
  }
  var CustomStyle = (function () {
    function e(e, t) {
      ;(this.win = e),
        (this.doc = t),
        (this.count = 0),
        (this.hostStyleMap = new WeakMap()),
        (this.hostScopeMap = new WeakMap()),
        (this.globalScopes = []),
        (this.scopesMap = new Map())
    }
    return (
      (e.prototype.initShim = function () {
        var e = this
        return new Promise(function (t) {
          e.win.requestAnimationFrame(function () {
            loadDocument(e.doc, e.globalScopes).then(function () {
              return t()
            })
          })
        })
      }),
      (e.prototype.addLink = function (e) {
        var t = this
        return addGlobalLink(this.doc, this.globalScopes, e).then(function () {
          t.updateGlobal()
        })
      }),
      (e.prototype.addGlobalStyle = function (e) {
        addGlobalStyle(this.globalScopes, e), this.updateGlobal()
      }),
      (e.prototype.createHostStyle = function (e, t, r) {
        if (this.hostScopeMap.has(e)) return null
        var n = e['s-sc'],
          s = this.registerHostTemplate(r, t, n),
          a = s.isDynamic && s.cssScopeId
        if (!(a || !s.styleEl)) return null
        var o = this.doc.createElement('style')
        if (a) {
          var i = s.cssScopeId + '-' + this.count
          ;(e['s-sc'] = i),
            this.hostStyleMap.set(e, o),
            this.hostScopeMap.set(e, reScope(s, i)),
            this.count++
        } else
          (s.styleEl = o),
            s.isDynamic || (o.innerHTML = executeTemplate(s.template, {})),
            this.globalScopes.push(s),
            this.updateGlobal(),
            this.hostScopeMap.set(e, s)
        return o
      }),
      (e.prototype.removeHost = function (e) {
        var t = this.hostStyleMap.get(e)
        t && t.remove(),
          this.hostStyleMap.delete(e),
          this.hostScopeMap.delete(e)
      }),
      (e.prototype.updateHost = function (e) {
        var t = this.hostScopeMap.get(e)
        if (t && t.isDynamic && t.cssScopeId) {
          var r = this.hostStyleMap.get(e)
          if (r) {
            var n = resolveValues(
              getActiveSelectors(e, this.hostScopeMap, this.globalScopes)
            )
            r.innerHTML = executeTemplate(t.template, n)
          }
        }
      }),
      (e.prototype.updateGlobal = function () {
        updateGlobalScopes(this.globalScopes)
      }),
      (e.prototype.registerHostTemplate = function (e, t, r) {
        var n = this.scopesMap.get(t)
        return (
          n || (((n = parseCSS(e)).cssScopeId = r), this.scopesMap.set(t, n)), n
        )
      }),
      e
    )
  })()
  window.customStyleShim = new CustomStyle(window, document)
}
