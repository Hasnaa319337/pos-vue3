ionicons.loadBundle('chunk-033a0284.js', ['exports'], function (n) {
  var o
  function e() {
    if (!o) {
      var n = window
      ;(n.Ionicons = n.Ionicons || {}),
        (o = n.Ionicons.map = n.Ionicons.map || new Map())
    }
    return o
  }
  function t(n) {
    return n.length > 0 && /(\/|\.)/.test(n)
  }
  window,
    (n.getName = function (n, o, e, t) {
      return (
        (o = 'ios' === (o = (o || 'md').toLowerCase()) ? 'ios' : 'md'),
        e && 'ios' === o
          ? (n = e.toLowerCase())
          : t && 'md' === o
          ? (n = t.toLowerCase())
          : n &&
            ((n = n.toLowerCase()),
            /^md-|^ios-|^logo-/.test(n) || (n = o + '-' + n)),
        'string' != typeof n || '' === n.trim()
          ? null
          : '' !== n.replace(/[a-z]|-|\d/gi, '')
          ? null
          : n
      )
    }),
    (n.isSrc = t),
    (n.getSrc = function (n) {
      return 'string' == typeof n && t((n = n.trim())) ? n : null
    }),
    (n.getIconMap = e),
    (n.isValid = function n(o) {
      if (1 === o.nodeType) {
        if ('script' === o.nodeName.toLowerCase()) return !1
        for (var e = 0; e < o.attributes.length; e++) {
          var t = o.attributes[e].value
          if ('string' == typeof t && 0 === t.toLowerCase().indexOf('on'))
            return !1
        }
        for (e = 0; e < o.childNodes.length; e++)
          if (!n(o.childNodes[e])) return !1
      }
      return !0
    }),
    (n.addIcons = function (n) {
      var o = e()
      Object.keys(n).forEach(function (e) {
        o.set(e, n[e])
      })
    })
})
