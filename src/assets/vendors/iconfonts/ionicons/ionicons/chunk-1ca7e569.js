let t
function e() {
  if (!t) {
    const e = window
    ;(e.Ionicons = e.Ionicons || {}),
      (t = e.Ionicons.map = e.Ionicons.map || new Map())
  }
  return t
}
function o(t) {
  const o = e()
  Object.keys(t).forEach(e => {
    o.set(e, t[e])
  })
}
function n(t, e, o, n) {
  return (
    (e = 'ios' === (e = (e || 'md').toLowerCase()) ? 'ios' : 'md'),
    o && 'ios' === e
      ? (t = o.toLowerCase())
      : n && 'md' === e
      ? (t = n.toLowerCase())
      : t &&
        ((t = t.toLowerCase()),
        /^md-|^ios-|^logo-/.test(t) || (t = `${e}-${t}`)),
    'string' != typeof t || '' === t.trim()
      ? null
      : '' !== t.replace(/[a-z]|-|\d/gi, '')
      ? null
      : t
  )
}
function r(t) {
  return 'string' == typeof t && s((t = t.trim())) ? t : null
}
function s(t) {
  return t.length > 0 && /(\/|\.)/.test(t)
}
function i(t) {
  if (1 === t.nodeType) {
    if ('script' === t.nodeName.toLowerCase()) return !1
    for (let e = 0; e < t.attributes.length; e++) {
      const o = t.attributes[e].value
      if ('string' == typeof o && 0 === o.toLowerCase().indexOf('on')) return !1
    }
    for (let e = 0; e < t.childNodes.length; e++)
      if (!i(t.childNodes[e])) return !1
  }
  return !0
}
window
export { n as a, s as b, r as c, e as d, i as e, o as f }
