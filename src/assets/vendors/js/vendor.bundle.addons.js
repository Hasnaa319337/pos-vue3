/*!
 * Chart.js v2.8.0
 * https://www.chartjs.org
 * (c) 2019 Chart.js Contributors
 * Released under the MIT License
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e(
        (function () {
          try {
          } catch (t) {}
        })()
      ))
    : 'function' == typeof define && define.amd
})(this, function (t) {
  'use strict'
  t = t && t.hasOwnProperty('default') ? t.default : t
  var e = {
    rgb2hsl: i,
    rgb2hsv: n,
    rgb2hwb: a,
    rgb2cmyk: o,
    rgb2keyword: s,
    rgb2xyz: l,
    rgb2lab: d,
    rgb2lch: function (t) {
      return x(d(t))
    },
    hsl2rgb: u,
    hsl2hsv: function (t) {
      var e = t[0],
        i = t[1] / 100,
        n = t[2] / 100
      if (0 === n) return [0, 0, 0]
      return [
        e,
        100 * ((2 * (i *= (n *= 2) <= 1 ? n : 2 - n)) / (n + i)),
        100 * ((n + i) / 2),
      ]
    },
    hsl2hwb: function (t) {
      return a(u(t))
    },
    hsl2cmyk: function (t) {
      return o(u(t))
    },
    hsl2keyword: function (t) {
      return s(u(t))
    },
    hsv2rgb: h,
    hsv2hsl: function (t) {
      var e,
        i,
        n = t[0],
        a = t[1] / 100,
        o = t[2] / 100
      return (
        (e = a * o),
        [
          n,
          100 * (e = (e /= (i = (2 - a) * o) <= 1 ? i : 2 - i) || 0),
          100 * (i /= 2),
        ]
      )
    },
    hsv2hwb: function (t) {
      return a(h(t))
    },
    hsv2cmyk: function (t) {
      return o(h(t))
    },
    hsv2keyword: function (t) {
      return s(h(t))
    },
    hwb2rgb: c,
    hwb2hsl: function (t) {
      return i(c(t))
    },
    hwb2hsv: function (t) {
      return n(c(t))
    },
    hwb2cmyk: function (t) {
      return o(c(t))
    },
    hwb2keyword: function (t) {
      return s(c(t))
    },
    cmyk2rgb: f,
    cmyk2hsl: function (t) {
      return i(f(t))
    },
    cmyk2hsv: function (t) {
      return n(f(t))
    },
    cmyk2hwb: function (t) {
      return a(f(t))
    },
    cmyk2keyword: function (t) {
      return s(f(t))
    },
    keyword2rgb: w,
    keyword2hsl: function (t) {
      return i(w(t))
    },
    keyword2hsv: function (t) {
      return n(w(t))
    },
    keyword2hwb: function (t) {
      return a(w(t))
    },
    keyword2cmyk: function (t) {
      return o(w(t))
    },
    keyword2lab: function (t) {
      return d(w(t))
    },
    keyword2xyz: function (t) {
      return l(w(t))
    },
    xyz2rgb: p,
    xyz2lab: m,
    xyz2lch: function (t) {
      return x(m(t))
    },
    lab2xyz: v,
    lab2rgb: y,
    lab2lch: x,
    lch2lab: k,
    lch2xyz: function (t) {
      return v(k(t))
    },
    lch2rgb: function (t) {
      return y(k(t))
    },
  }
  function i(t) {
    var e,
      i,
      n = t[0] / 255,
      a = t[1] / 255,
      o = t[2] / 255,
      r = Math.min(n, a, o),
      s = Math.max(n, a, o),
      l = s - r
    return (
      s == r
        ? (e = 0)
        : n == s
        ? (e = (a - o) / l)
        : a == s
        ? (e = 2 + (o - n) / l)
        : o == s && (e = 4 + (n - a) / l),
      (e = Math.min(60 * e, 360)) < 0 && (e += 360),
      (i = (r + s) / 2),
      [
        e,
        100 * (s == r ? 0 : i <= 0.5 ? l / (s + r) : l / (2 - s - r)),
        100 * i,
      ]
    )
  }
  function n(t) {
    var e,
      i,
      n = t[0],
      a = t[1],
      o = t[2],
      r = Math.min(n, a, o),
      s = Math.max(n, a, o),
      l = s - r
    return (
      (i = 0 == s ? 0 : ((l / s) * 1e3) / 10),
      s == r
        ? (e = 0)
        : n == s
        ? (e = (a - o) / l)
        : a == s
        ? (e = 2 + (o - n) / l)
        : o == s && (e = 4 + (n - a) / l),
      (e = Math.min(60 * e, 360)) < 0 && (e += 360),
      [e, i, ((s / 255) * 1e3) / 10]
    )
  }
  function a(t) {
    var e = t[0],
      n = t[1],
      a = t[2]
    return [
      i(t)[0],
      100 * ((1 / 255) * Math.min(e, Math.min(n, a))),
      100 * (a = 1 - (1 / 255) * Math.max(e, Math.max(n, a))),
    ]
  }
  function o(t) {
    var e,
      i = t[0] / 255,
      n = t[1] / 255,
      a = t[2] / 255
    return [
      100 * ((1 - i - (e = Math.min(1 - i, 1 - n, 1 - a))) / (1 - e) || 0),
      100 * ((1 - n - e) / (1 - e) || 0),
      100 * ((1 - a - e) / (1 - e) || 0),
      100 * e,
    ]
  }
  function s(t) {
    return _[JSON.stringify(t)]
  }
  function l(t) {
    var e = t[0] / 255,
      i = t[1] / 255,
      n = t[2] / 255
    return [
      100 *
        (0.4124 *
          (e = e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92) +
          0.3576 *
            (i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92) +
          0.1805 *
            (n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92)),
      100 * (0.2126 * e + 0.7152 * i + 0.0722 * n),
      100 * (0.0193 * e + 0.1192 * i + 0.9505 * n),
    ]
  }
  function d(t) {
    var e = l(t),
      i = e[0],
      n = e[1],
      a = e[2]
    return (
      (n /= 100),
      (a /= 108.883),
      (i =
        (i /= 95.047) > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116),
      [
        116 * (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) -
          16,
        500 * (i - n),
        200 *
          (n - (a = a > 0.008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116)),
      ]
    )
  }
  function u(t) {
    var e,
      i,
      n,
      a,
      o,
      r = t[0] / 360,
      s = t[1] / 100,
      l = t[2] / 100
    if (0 == s) return [(o = 255 * l), o, o]
    ;(e = 2 * l - (i = l < 0.5 ? l * (1 + s) : l + s - l * s)), (a = [0, 0, 0])
    for (var d = 0; d < 3; d++)
      (n = r + (1 / 3) * -(d - 1)) < 0 && n++,
        n > 1 && n--,
        (o =
          6 * n < 1
            ? e + 6 * (i - e) * n
            : 2 * n < 1
            ? i
            : 3 * n < 2
            ? e + (i - e) * (2 / 3 - n) * 6
            : e),
        (a[d] = 255 * o)
    return a
  }
  function h(t) {
    var e = t[0] / 60,
      i = t[1] / 100,
      n = t[2] / 100,
      a = Math.floor(e) % 6,
      o = e - Math.floor(e),
      r = 255 * n * (1 - i),
      s = 255 * n * (1 - i * o),
      l = 255 * n * (1 - i * (1 - o))
    n *= 255
    switch (a) {
      case 0:
        return [n, l, r]
      case 1:
        return [s, n, r]
      case 2:
        return [r, n, l]
      case 3:
        return [r, s, n]
      case 4:
        return [l, r, n]
      case 5:
        return [n, r, s]
    }
  }
  function c(t) {
    var e,
      i,
      n,
      a,
      o = t[0] / 360,
      s = t[1] / 100,
      l = t[2] / 100,
      d = s + l
    switch (
      (d > 1 && ((s /= d), (l /= d)),
      (n = 6 * o - (e = Math.floor(6 * o))),
      0 != (1 & e) && (n = 1 - n),
      (a = s + n * ((i = 1 - l) - s)),
      e)
    ) {
      default:
      case 6:
      case 0:
        ;(r = i), (g = a), (b = s)
        break
      case 1:
        ;(r = a), (g = i), (b = s)
        break
      case 2:
        ;(r = s), (g = i), (b = a)
        break
      case 3:
        ;(r = s), (g = a), (b = i)
        break
      case 4:
        ;(r = a), (g = s), (b = i)
        break
      case 5:
        ;(r = i), (g = s), (b = a)
    }
    return [255 * r, 255 * g, 255 * b]
  }
  function f(t) {
    var e = t[0] / 100,
      i = t[1] / 100,
      n = t[2] / 100,
      a = t[3] / 100
    return [
      255 * (1 - Math.min(1, e * (1 - a) + a)),
      255 * (1 - Math.min(1, i * (1 - a) + a)),
      255 * (1 - Math.min(1, n * (1 - a) + a)),
    ]
  }
  function p(t) {
    var e,
      i,
      n,
      a = t[0] / 100,
      o = t[1] / 100,
      r = t[2] / 100
    return (
      (i = -0.9689 * a + 1.8758 * o + 0.0415 * r),
      (n = 0.0557 * a + -0.204 * o + 1.057 * r),
      (e =
        (e = 3.2406 * a + -1.5372 * o + -0.4986 * r) > 0.0031308
          ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055
          : (e *= 12.92)),
      (i = i > 0.0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - 0.055 : (i *= 12.92)),
      (n = n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : (n *= 12.92)),
      [
        255 * (e = Math.min(Math.max(0, e), 1)),
        255 * (i = Math.min(Math.max(0, i), 1)),
        255 * (n = Math.min(Math.max(0, n), 1)),
      ]
    )
  }
  function m(t) {
    var e = t[0],
      i = t[1],
      n = t[2]
    return (
      (i /= 100),
      (n /= 108.883),
      (e =
        (e /= 95.047) > 0.008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116),
      [
        116 * (i = i > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) -
          16,
        500 * (e - i),
        200 *
          (i - (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116)),
      ]
    )
  }
  function v(t) {
    var e,
      i,
      n,
      a,
      o = t[0],
      r = t[1],
      s = t[2]
    return (
      o <= 8
        ? (a = ((i = (100 * o) / 903.3) / 100) * 7.787 + 16 / 116)
        : ((i = 100 * Math.pow((o + 16) / 116, 3)),
          (a = Math.pow(i / 100, 1 / 3))),
      [
        (e =
          e / 95.047 <= 0.008856
            ? (e = (95.047 * (r / 500 + a - 16 / 116)) / 7.787)
            : 95.047 * Math.pow(r / 500 + a, 3)),
        i,
        (n =
          n / 108.883 <= 0.008859
            ? (n = (108.883 * (a - s / 200 - 16 / 116)) / 7.787)
            : 108.883 * Math.pow(a - s / 200, 3)),
      ]
    )
  }
  function x(t) {
    var e,
      i = t[0],
      n = t[1],
      a = t[2]
    return (
      (e = (360 * Math.atan2(a, n)) / 2 / Math.PI) < 0 && (e += 360),
      [i, Math.sqrt(n * n + a * a), e]
    )
  }
  function y(t) {
    return p(v(t))
  }
  function k(t) {
    var e,
      i = t[0],
      n = t[1]
    return (
      (e = (t[2] / 360) * 2 * Math.PI), [i, n * Math.cos(e), n * Math.sin(e)]
    )
  }
  function w(t) {
    return M[t]
  }
  var M = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50],
    },
    _ = {}
  for (var C in M) _[JSON.stringify(M[C])] = C
  var S = function () {
    return new T()
  }
  for (var P in e) {
    S[P + 'Raw'] = (function (t) {
      return function (i) {
        return (
          'number' == typeof i && (i = Array.prototype.slice.call(arguments)),
          e[t](i)
        )
      }
    })(P)
    var I = /(\w+)2(\w+)/.exec(P),
      A = I[1],
      D = I[2]
    ;(S[A] = S[A] || {})[D] = S[P] = (function (t) {
      return function (i) {
        'number' == typeof i && (i = Array.prototype.slice.call(arguments))
        var n = e[t](i)
        if ('string' == typeof n || void 0 === n) return n
        for (var a = 0; a < n.length; a++) n[a] = Math.round(n[a])
        return n
      }
    })(P)
  }
  var T = function () {
    this.convs = {}
  }
  ;(T.prototype.routeSpace = function (t, e) {
    var i = e[0]
    return void 0 === i
      ? this.getValues(t)
      : ('number' == typeof i && (i = Array.prototype.slice.call(e)),
        this.setValues(t, i))
  }),
    (T.prototype.setValues = function (t, e) {
      return (this.space = t), (this.convs = {}), (this.convs[t] = e), this
    }),
    (T.prototype.getValues = function (t) {
      var e = this.convs[t]
      if (!e) {
        var i = this.space,
          n = this.convs[i]
        ;(e = S[i][t](n)), (this.convs[t] = e)
      }
      return e
    }),
    ['rgb', 'hsl', 'hsv', 'cmyk', 'keyword'].forEach(function (t) {
      T.prototype[t] = function (e) {
        return this.routeSpace(t, arguments)
      }
    })
  var F = S,
    L = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50],
    },
    R = {
      getRgba: O,
      getHsla: z,
      getRgb: function (t) {
        var e = O(t)
        return e && e.slice(0, 3)
      },
      getHsl: function (t) {
        var e = z(t)
        return e && e.slice(0, 3)
      },
      getHwb: B,
      getAlpha: function (t) {
        var e = O(t)
        if (e) return e[3]
        if ((e = z(t))) return e[3]
        if ((e = B(t))) return e[3]
      },
      hexString: function (t, e) {
        var e = void 0 !== e && 3 === t.length ? e : t[3]
        return (
          '#' +
          H(t[0]) +
          H(t[1]) +
          H(t[2]) +
          (e >= 0 && e < 1 ? H(Math.round(255 * e)) : '')
        )
      },
      rgbString: function (t, e) {
        if (e < 1 || (t[3] && t[3] < 1)) return N(t, e)
        return 'rgb(' + t[0] + ', ' + t[1] + ', ' + t[2] + ')'
      },
      rgbaString: N,
      percentString: function (t, e) {
        if (e < 1 || (t[3] && t[3] < 1)) return W(t, e)
        var i = Math.round((t[0] / 255) * 100),
          n = Math.round((t[1] / 255) * 100),
          a = Math.round((t[2] / 255) * 100)
        return 'rgb(' + i + '%, ' + n + '%, ' + a + '%)'
      },
      percentaString: W,
      hslString: function (t, e) {
        if (e < 1 || (t[3] && t[3] < 1)) return V(t, e)
        return 'hsl(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%)'
      },
      hslaString: V,
      hwbString: function (t, e) {
        void 0 === e && (e = void 0 !== t[3] ? t[3] : 1)
        return (
          'hwb(' +
          t[0] +
          ', ' +
          t[1] +
          '%, ' +
          t[2] +
          '%' +
          (void 0 !== e && 1 !== e ? ', ' + e : '') +
          ')'
        )
      },
      keyword: function (t) {
        return j[t.slice(0, 3)]
      },
    }
  function O(t) {
    if (t) {
      var e = [0, 0, 0],
        i = 1,
        n = t.match(/^#([a-fA-F0-9]{3,4})$/i),
        a = ''
      if (n) {
        a = (n = n[1])[3]
        for (var o = 0; o < e.length; o++) e[o] = parseInt(n[o] + n[o], 16)
        a && (i = Math.round((parseInt(a + a, 16) / 255) * 100) / 100)
      } else if ((n = t.match(/^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i))) {
        ;(a = n[2]), (n = n[1])
        for (o = 0; o < e.length; o++)
          e[o] = parseInt(n.slice(2 * o, 2 * o + 2), 16)
        a && (i = Math.round((parseInt(a, 16) / 255) * 100) / 100)
      } else if (
        (n = t.match(
          /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i
        ))
      ) {
        for (o = 0; o < e.length; o++) e[o] = parseInt(n[o + 1])
        i = parseFloat(n[4])
      } else if (
        (n = t.match(
          /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i
        ))
      ) {
        for (o = 0; o < e.length; o++)
          e[o] = Math.round(2.55 * parseFloat(n[o + 1]))
        i = parseFloat(n[4])
      } else if ((n = t.match(/(\w+)/))) {
        if ('transparent' == n[1]) return [0, 0, 0, 0]
        if (!(e = L[n[1]])) return
      }
      for (o = 0; o < e.length; o++) e[o] = E(e[o], 0, 255)
      return (i = i || 0 == i ? E(i, 0, 1) : 1), (e[3] = i), e
    }
  }
  function z(t) {
    if (t) {
      var e = t.match(
        /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/
      )
      if (e) {
        var i = parseFloat(e[4])
        return [
          E(parseInt(e[1]), 0, 360),
          E(parseFloat(e[2]), 0, 100),
          E(parseFloat(e[3]), 0, 100),
          E(isNaN(i) ? 1 : i, 0, 1),
        ]
      }
    }
  }
  function B(t) {
    if (t) {
      var e = t.match(
        /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/
      )
      if (e) {
        var i = parseFloat(e[4])
        return [
          E(parseInt(e[1]), 0, 360),
          E(parseFloat(e[2]), 0, 100),
          E(parseFloat(e[3]), 0, 100),
          E(isNaN(i) ? 1 : i, 0, 1),
        ]
      }
    }
  }
  function N(t, e) {
    return (
      void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
      'rgba(' + t[0] + ', ' + t[1] + ', ' + t[2] + ', ' + e + ')'
    )
  }
  function W(t, e) {
    return (
      'rgba(' +
      Math.round((t[0] / 255) * 100) +
      '%, ' +
      Math.round((t[1] / 255) * 100) +
      '%, ' +
      Math.round((t[2] / 255) * 100) +
      '%, ' +
      (e || t[3] || 1) +
      ')'
    )
  }
  function V(t, e) {
    return (
      void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
      'hsla(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%, ' + e + ')'
    )
  }
  function E(t, e, i) {
    return Math.min(Math.max(e, t), i)
  }
  function H(t) {
    var e = t.toString(16).toUpperCase()
    return e.length < 2 ? '0' + e : e
  }
  var j = {}
  for (var q in L) j[L[q]] = q
  var Y = function (t) {
    return t instanceof Y
      ? t
      : this instanceof Y
      ? ((this.valid = !1),
        (this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1,
        }),
        void ('string' == typeof t
          ? (e = R.getRgba(t))
            ? this.setValues('rgb', e)
            : (e = R.getHsla(t))
            ? this.setValues('hsl', e)
            : (e = R.getHwb(t)) && this.setValues('hwb', e)
          : 'object' == typeof t &&
            (void 0 !== (e = t).r || void 0 !== e.red
              ? this.setValues('rgb', e)
              : void 0 !== e.l || void 0 !== e.lightness
              ? this.setValues('hsl', e)
              : void 0 !== e.v || void 0 !== e.value
              ? this.setValues('hsv', e)
              : void 0 !== e.w || void 0 !== e.whiteness
              ? this.setValues('hwb', e)
              : (void 0 === e.c && void 0 === e.cyan) ||
                this.setValues('cmyk', e))))
      : new Y(t)
    var e
  }
  ;(Y.prototype = {
    isValid: function () {
      return this.valid
    },
    rgb: function () {
      return this.setSpace('rgb', arguments)
    },
    hsl: function () {
      return this.setSpace('hsl', arguments)
    },
    hsv: function () {
      return this.setSpace('hsv', arguments)
    },
    hwb: function () {
      return this.setSpace('hwb', arguments)
    },
    cmyk: function () {
      return this.setSpace('cmyk', arguments)
    },
    rgbArray: function () {
      return this.values.rgb
    },
    hslArray: function () {
      return this.values.hsl
    },
    hsvArray: function () {
      return this.values.hsv
    },
    hwbArray: function () {
      var t = this.values
      return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
    },
    cmykArray: function () {
      return this.values.cmyk
    },
    rgbaArray: function () {
      var t = this.values
      return t.rgb.concat([t.alpha])
    },
    hslaArray: function () {
      var t = this.values
      return t.hsl.concat([t.alpha])
    },
    alpha: function (t) {
      return void 0 === t
        ? this.values.alpha
        : (this.setValues('alpha', t), this)
    },
    red: function (t) {
      return this.setChannel('rgb', 0, t)
    },
    green: function (t) {
      return this.setChannel('rgb', 1, t)
    },
    blue: function (t) {
      return this.setChannel('rgb', 2, t)
    },
    hue: function (t) {
      return (
        t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel('hsl', 0, t)
      )
    },
    saturation: function (t) {
      return this.setChannel('hsl', 1, t)
    },
    lightness: function (t) {
      return this.setChannel('hsl', 2, t)
    },
    saturationv: function (t) {
      return this.setChannel('hsv', 1, t)
    },
    whiteness: function (t) {
      return this.setChannel('hwb', 1, t)
    },
    blackness: function (t) {
      return this.setChannel('hwb', 2, t)
    },
    value: function (t) {
      return this.setChannel('hsv', 2, t)
    },
    cyan: function (t) {
      return this.setChannel('cmyk', 0, t)
    },
    magenta: function (t) {
      return this.setChannel('cmyk', 1, t)
    },
    yellow: function (t) {
      return this.setChannel('cmyk', 2, t)
    },
    black: function (t) {
      return this.setChannel('cmyk', 3, t)
    },
    hexString: function () {
      return R.hexString(this.values.rgb)
    },
    rgbString: function () {
      return R.rgbString(this.values.rgb, this.values.alpha)
    },
    rgbaString: function () {
      return R.rgbaString(this.values.rgb, this.values.alpha)
    },
    percentString: function () {
      return R.percentString(this.values.rgb, this.values.alpha)
    },
    hslString: function () {
      return R.hslString(this.values.hsl, this.values.alpha)
    },
    hslaString: function () {
      return R.hslaString(this.values.hsl, this.values.alpha)
    },
    hwbString: function () {
      return R.hwbString(this.values.hwb, this.values.alpha)
    },
    keyword: function () {
      return R.keyword(this.values.rgb, this.values.alpha)
    },
    rgbNumber: function () {
      var t = this.values.rgb
      return (t[0] << 16) | (t[1] << 8) | t[2]
    },
    luminosity: function () {
      for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
        var n = t[i] / 255
        e[i] = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4)
      }
      return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]
    },
    contrast: function (t) {
      var e = this.luminosity(),
        i = t.luminosity()
      return e > i ? (e + 0.05) / (i + 0.05) : (i + 0.05) / (e + 0.05)
    },
    level: function (t) {
      var e = this.contrast(t)
      return e >= 7.1 ? 'AAA' : e >= 4.5 ? 'AA' : ''
    },
    dark: function () {
      var t = this.values.rgb
      return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
    },
    light: function () {
      return !this.dark()
    },
    negate: function () {
      for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e]
      return this.setValues('rgb', t), this
    },
    lighten: function (t) {
      var e = this.values.hsl
      return (e[2] += e[2] * t), this.setValues('hsl', e), this
    },
    darken: function (t) {
      var e = this.values.hsl
      return (e[2] -= e[2] * t), this.setValues('hsl', e), this
    },
    saturate: function (t) {
      var e = this.values.hsl
      return (e[1] += e[1] * t), this.setValues('hsl', e), this
    },
    desaturate: function (t) {
      var e = this.values.hsl
      return (e[1] -= e[1] * t), this.setValues('hsl', e), this
    },
    whiten: function (t) {
      var e = this.values.hwb
      return (e[1] += e[1] * t), this.setValues('hwb', e), this
    },
    blacken: function (t) {
      var e = this.values.hwb
      return (e[2] += e[2] * t), this.setValues('hwb', e), this
    },
    greyscale: function () {
      var t = this.values.rgb,
        e = 0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2]
      return this.setValues('rgb', [e, e, e]), this
    },
    clearer: function (t) {
      var e = this.values.alpha
      return this.setValues('alpha', e - e * t), this
    },
    opaquer: function (t) {
      var e = this.values.alpha
      return this.setValues('alpha', e + e * t), this
    },
    rotate: function (t) {
      var e = this.values.hsl,
        i = (e[0] + t) % 360
      return (e[0] = i < 0 ? 360 + i : i), this.setValues('hsl', e), this
    },
    mix: function (t, e) {
      var i = t,
        n = void 0 === e ? 0.5 : e,
        a = 2 * n - 1,
        o = this.alpha() - i.alpha(),
        r = ((a * o == -1 ? a : (a + o) / (1 + a * o)) + 1) / 2,
        s = 1 - r
      return this.rgb(
        r * this.red() + s * i.red(),
        r * this.green() + s * i.green(),
        r * this.blue() + s * i.blue()
      ).alpha(this.alpha() * n + i.alpha() * (1 - n))
    },
    toJSON: function () {
      return this.rgb()
    },
    clone: function () {
      var t,
        e,
        i = new Y(),
        n = this.values,
        a = i.values
      for (var o in n)
        n.hasOwnProperty(o) &&
          ((t = n[o]),
          '[object Array]' === (e = {}.toString.call(t))
            ? (a[o] = t.slice(0))
            : '[object Number]' === e
            ? (a[o] = t)
            : console.error('unexpected color value:', t))
      return i
    },
  }),
    (Y.prototype.spaces = {
      rgb: ['red', 'green', 'blue'],
      hsl: ['hue', 'saturation', 'lightness'],
      hsv: ['hue', 'saturation', 'value'],
      hwb: ['hue', 'whiteness', 'blackness'],
      cmyk: ['cyan', 'magenta', 'yellow', 'black'],
    }),
    (Y.prototype.maxes = {
      rgb: [255, 255, 255],
      hsl: [360, 100, 100],
      hsv: [360, 100, 100],
      hwb: [360, 100, 100],
      cmyk: [100, 100, 100, 100],
    }),
    (Y.prototype.getValues = function (t) {
      for (var e = this.values, i = {}, n = 0; n < t.length; n++)
        i[t.charAt(n)] = e[t][n]
      return 1 !== e.alpha && (i.a = e.alpha), i
    }),
    (Y.prototype.setValues = function (t, e) {
      var i,
        n,
        a = this.values,
        o = this.spaces,
        r = this.maxes,
        s = 1
      if (((this.valid = !0), 'alpha' === t)) s = e
      else if (e.length) (a[t] = e.slice(0, t.length)), (s = e[t.length])
      else if (void 0 !== e[t.charAt(0)]) {
        for (i = 0; i < t.length; i++) a[t][i] = e[t.charAt(i)]
        s = e.a
      } else if (void 0 !== e[o[t][0]]) {
        var l = o[t]
        for (i = 0; i < t.length; i++) a[t][i] = e[l[i]]
        s = e.alpha
      }
      if (
        ((a.alpha = Math.max(0, Math.min(1, void 0 === s ? a.alpha : s))),
        'alpha' === t)
      )
        return !1
      for (i = 0; i < t.length; i++)
        (n = Math.max(0, Math.min(r[t][i], a[t][i]))), (a[t][i] = Math.round(n))
      for (var d in o) d !== t && (a[d] = F[t][d](a[t]))
      return !0
    }),
    (Y.prototype.setSpace = function (t, e) {
      var i = e[0]
      return void 0 === i
        ? this.getValues(t)
        : ('number' == typeof i && (i = Array.prototype.slice.call(e)),
          this.setValues(t, i),
          this)
    }),
    (Y.prototype.setChannel = function (t, e, i) {
      var n = this.values[t]
      return void 0 === i
        ? n[e]
        : i === n[e]
        ? this
        : ((n[e] = i), this.setValues(t, n), this)
    }),
    'undefined' != typeof window && (window.Color = Y)
  var U,
    X = Y,
    K = {
      noop: function () {},
      uid:
        ((U = 0),
        function () {
          return U++
        }),
      isNullOrUndef: function (t) {
        return null == t
      },
      isArray: function (t) {
        if (Array.isArray && Array.isArray(t)) return !0
        var e = Object.prototype.toString.call(t)
        return '[object' === e.substr(0, 7) && 'Array]' === e.substr(-6)
      },
      isObject: function (t) {
        return (
          null !== t && '[object Object]' === Object.prototype.toString.call(t)
        )
      },
      isFinite: function (t) {
        return ('number' == typeof t || t instanceof Number) && isFinite(t)
      },
      valueOrDefault: function (t, e) {
        return void 0 === t ? e : t
      },
      valueAtIndexOrDefault: function (t, e, i) {
        return K.valueOrDefault(K.isArray(t) ? t[e] : t, i)
      },
      callback: function (t, e, i) {
        if (t && 'function' == typeof t.call) return t.apply(i, e)
      },
      each: function (t, e, i, n) {
        var a, o, r
        if (K.isArray(t))
          if (((o = t.length), n))
            for (a = o - 1; a >= 0; a--) e.call(i, t[a], a)
          else for (a = 0; a < o; a++) e.call(i, t[a], a)
        else if (K.isObject(t))
          for (o = (r = Object.keys(t)).length, a = 0; a < o; a++)
            e.call(i, t[r[a]], r[a])
      },
      arrayEquals: function (t, e) {
        var i, n, a, o
        if (!t || !e || t.length !== e.length) return !1
        for (i = 0, n = t.length; i < n; ++i)
          if (
            ((a = t[i]), (o = e[i]), a instanceof Array && o instanceof Array)
          ) {
            if (!K.arrayEquals(a, o)) return !1
          } else if (a !== o) return !1
        return !0
      },
      clone: function (t) {
        if (K.isArray(t)) return t.map(K.clone)
        if (K.isObject(t)) {
          for (var e = {}, i = Object.keys(t), n = i.length, a = 0; a < n; ++a)
            e[i[a]] = K.clone(t[i[a]])
          return e
        }
        return t
      },
      _merger: function (t, e, i, n) {
        var a = e[t],
          o = i[t]
        K.isObject(a) && K.isObject(o) ? K.merge(a, o, n) : (e[t] = K.clone(o))
      },
      _mergerIf: function (t, e, i) {
        var n = e[t],
          a = i[t]
        K.isObject(n) && K.isObject(a)
          ? K.mergeIf(n, a)
          : e.hasOwnProperty(t) || (e[t] = K.clone(a))
      },
      merge: function (t, e, i) {
        var n,
          a,
          o,
          r,
          s,
          l = K.isArray(e) ? e : [e],
          d = l.length
        if (!K.isObject(t)) return t
        for (n = (i = i || {}).merger || K._merger, a = 0; a < d; ++a)
          if (((e = l[a]), K.isObject(e)))
            for (s = 0, r = (o = Object.keys(e)).length; s < r; ++s)
              n(o[s], t, e, i)
        return t
      },
      mergeIf: function (t, e) {
        return K.merge(t, e, { merger: K._mergerIf })
      },
      extend: function (t) {
        for (
          var e = function (e, i) {
              t[i] = e
            },
            i = 1,
            n = arguments.length;
          i < n;
          ++i
        )
          K.each(arguments[i], e)
        return t
      },
      inherits: function (t) {
        var e = this,
          i =
            t && t.hasOwnProperty('constructor')
              ? t.constructor
              : function () {
                  return e.apply(this, arguments)
                },
          n = function () {
            this.constructor = i
          }
        return (
          (n.prototype = e.prototype),
          (i.prototype = new n()),
          (i.extend = K.inherits),
          t && K.extend(i.prototype, t),
          (i.__super__ = e.prototype),
          i
        )
      },
    },
    G = K
  ;(K.callCallback = K.callback),
    (K.indexOf = function (t, e, i) {
      return Array.prototype.indexOf.call(t, e, i)
    }),
    (K.getValueOrDefault = K.valueOrDefault),
    (K.getValueAtIndexOrDefault = K.valueAtIndexOrDefault)
  var Z = {
      linear: function (t) {
        return t
      },
      easeInQuad: function (t) {
        return t * t
      },
      easeOutQuad: function (t) {
        return -t * (t - 2)
      },
      easeInOutQuad: function (t) {
        return (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1)
      },
      easeInCubic: function (t) {
        return t * t * t
      },
      easeOutCubic: function (t) {
        return (t -= 1) * t * t + 1
      },
      easeInOutCubic: function (t) {
        return (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2)
      },
      easeInQuart: function (t) {
        return t * t * t * t
      },
      easeOutQuart: function (t) {
        return -((t -= 1) * t * t * t - 1)
      },
      easeInOutQuart: function (t) {
        return (t /= 0.5) < 1
          ? 0.5 * t * t * t * t
          : -0.5 * ((t -= 2) * t * t * t - 2)
      },
      easeInQuint: function (t) {
        return t * t * t * t * t
      },
      easeOutQuint: function (t) {
        return (t -= 1) * t * t * t * t + 1
      },
      easeInOutQuint: function (t) {
        return (t /= 0.5) < 1
          ? 0.5 * t * t * t * t * t
          : 0.5 * ((t -= 2) * t * t * t * t + 2)
      },
      easeInSine: function (t) {
        return 1 - Math.cos(t * (Math.PI / 2))
      },
      easeOutSine: function (t) {
        return Math.sin(t * (Math.PI / 2))
      },
      easeInOutSine: function (t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1)
      },
      easeInExpo: function (t) {
        return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
      },
      easeOutExpo: function (t) {
        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
      },
      easeInOutExpo: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (t /= 0.5) < 1
          ? 0.5 * Math.pow(2, 10 * (t - 1))
          : 0.5 * (2 - Math.pow(2, -10 * --t))
      },
      easeInCirc: function (t) {
        return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)
      },
      easeOutCirc: function (t) {
        return Math.sqrt(1 - (t -= 1) * t)
      },
      easeInOutCirc: function (t) {
        return (t /= 0.5) < 1
          ? -0.5 * (Math.sqrt(1 - t * t) - 1)
          : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
      },
      easeInElastic: function (t) {
        var e = 1.70158,
          i = 0,
          n = 1
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (i || (i = 0.3),
            n < 1
              ? ((n = 1), (e = i / 4))
              : (e = (i / (2 * Math.PI)) * Math.asin(1 / n)),
            -n *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t - e) * (2 * Math.PI)) / i))
      },
      easeOutElastic: function (t) {
        var e = 1.70158,
          i = 0,
          n = 1
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (i || (i = 0.3),
            n < 1
              ? ((n = 1), (e = i / 4))
              : (e = (i / (2 * Math.PI)) * Math.asin(1 / n)),
            n * Math.pow(2, -10 * t) * Math.sin(((t - e) * (2 * Math.PI)) / i) +
              1)
      },
      easeInOutElastic: function (t) {
        var e = 1.70158,
          i = 0,
          n = 1
        return 0 === t
          ? 0
          : 2 == (t /= 0.5)
          ? 1
          : (i || (i = 0.45),
            n < 1
              ? ((n = 1), (e = i / 4))
              : (e = (i / (2 * Math.PI)) * Math.asin(1 / n)),
            t < 1
              ? n *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t - e) * (2 * Math.PI)) / i) *
                -0.5
              : n *
                  Math.pow(2, -10 * (t -= 1)) *
                  Math.sin(((t - e) * (2 * Math.PI)) / i) *
                  0.5 +
                1)
      },
      easeInBack: function (t) {
        var e = 1.70158
        return t * t * ((e + 1) * t - e)
      },
      easeOutBack: function (t) {
        var e = 1.70158
        return (t -= 1) * t * ((e + 1) * t + e) + 1
      },
      easeInOutBack: function (t) {
        var e = 1.70158
        return (t /= 0.5) < 1
          ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
          : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
      },
      easeInBounce: function (t) {
        return 1 - Z.easeOutBounce(1 - t)
      },
      easeOutBounce: function (t) {
        return t < 1 / 2.75
          ? 7.5625 * t * t
          : t < 2 / 2.75
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : t < 2.5 / 2.75
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
      },
      easeInOutBounce: function (t) {
        return t < 0.5
          ? 0.5 * Z.easeInBounce(2 * t)
          : 0.5 * Z.easeOutBounce(2 * t - 1) + 0.5
      },
    },
    $ = { effects: Z }
  G.easingEffects = Z
  var J = Math.PI,
    Q = J / 180,
    tt = 2 * J,
    et = J / 2,
    it = J / 4,
    nt = (2 * J) / 3,
    at = {
      clear: function (t) {
        t.ctx.clearRect(0, 0, t.width, t.height)
      },
      roundedRect: function (t, e, i, n, a, o) {
        if (o) {
          var r = Math.min(o, a / 2, n / 2),
            s = e + r,
            l = i + r,
            d = e + n - r,
            u = i + a - r
          t.moveTo(e, l),
            s < d && l < u
              ? (t.arc(s, l, r, -J, -et),
                t.arc(d, l, r, -et, 0),
                t.arc(d, u, r, 0, et),
                t.arc(s, u, r, et, J))
              : s < d
              ? (t.moveTo(s, i),
                t.arc(d, l, r, -et, et),
                t.arc(s, l, r, et, J + et))
              : l < u
              ? (t.arc(s, l, r, -J, 0), t.arc(s, u, r, 0, J))
              : t.arc(s, l, r, -J, J),
            t.closePath(),
            t.moveTo(e, i)
        } else t.rect(e, i, n, a)
      },
      drawPoint: function (t, e, i, n, a, o) {
        var r,
          s,
          l,
          d,
          u,
          h = (o || 0) * Q
        if (
          !e ||
          'object' != typeof e ||
          ('[object HTMLImageElement]' !== (r = e.toString()) &&
            '[object HTMLCanvasElement]' !== r)
        ) {
          if (!(isNaN(i) || i <= 0)) {
            switch ((t.beginPath(), e)) {
              default:
                t.arc(n, a, i, 0, tt), t.closePath()
                break
              case 'triangle':
                t.moveTo(n + Math.sin(h) * i, a - Math.cos(h) * i),
                  (h += nt),
                  t.lineTo(n + Math.sin(h) * i, a - Math.cos(h) * i),
                  (h += nt),
                  t.lineTo(n + Math.sin(h) * i, a - Math.cos(h) * i),
                  t.closePath()
                break
              case 'rectRounded':
                ;(d = i - (u = 0.516 * i)),
                  (s = Math.cos(h + it) * d),
                  (l = Math.sin(h + it) * d),
                  t.arc(n - s, a - l, u, h - J, h - et),
                  t.arc(n + l, a - s, u, h - et, h),
                  t.arc(n + s, a + l, u, h, h + et),
                  t.arc(n - l, a + s, u, h + et, h + J),
                  t.closePath()
                break
              case 'rect':
                if (!o) {
                  ;(d = Math.SQRT1_2 * i), t.rect(n - d, a - d, 2 * d, 2 * d)
                  break
                }
                h += it
              case 'rectRot':
                ;(s = Math.cos(h) * i),
                  (l = Math.sin(h) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + l, a - s),
                  t.lineTo(n + s, a + l),
                  t.lineTo(n - l, a + s),
                  t.closePath()
                break
              case 'crossRot':
                h += it
              case 'cross':
                ;(s = Math.cos(h) * i),
                  (l = Math.sin(h) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l),
                  t.moveTo(n + l, a - s),
                  t.lineTo(n - l, a + s)
                break
              case 'star':
                ;(s = Math.cos(h) * i),
                  (l = Math.sin(h) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l),
                  t.moveTo(n + l, a - s),
                  t.lineTo(n - l, a + s),
                  (h += it),
                  (s = Math.cos(h) * i),
                  (l = Math.sin(h) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l),
                  t.moveTo(n + l, a - s),
                  t.lineTo(n - l, a + s)
                break
              case 'line':
                ;(s = Math.cos(h) * i),
                  (l = Math.sin(h) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l)
                break
              case 'dash':
                t.moveTo(n, a),
                  t.lineTo(n + Math.cos(h) * i, a + Math.sin(h) * i)
            }
            t.fill(), t.stroke()
          }
        } else
          t.drawImage(e, n - e.width / 2, a - e.height / 2, e.width, e.height)
      },
      _isPointInArea: function (t, e) {
        return (
          t.x > e.left - 1e-6 &&
          t.x < e.right + 1e-6 &&
          t.y > e.top - 1e-6 &&
          t.y < e.bottom + 1e-6
        )
      },
      clipArea: function (t, e) {
        t.save(),
          t.beginPath(),
          t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
          t.clip()
      },
      unclipArea: function (t) {
        t.restore()
      },
      lineTo: function (t, e, i, n) {
        var a = i.steppedLine
        if (a) {
          if ('middle' === a) {
            var o = (e.x + i.x) / 2
            t.lineTo(o, n ? i.y : e.y), t.lineTo(o, n ? e.y : i.y)
          } else
            ('after' === a && !n) || ('after' !== a && n)
              ? t.lineTo(e.x, i.y)
              : t.lineTo(i.x, e.y)
          t.lineTo(i.x, i.y)
        } else
          i.tension
            ? t.bezierCurveTo(
                n ? e.controlPointPreviousX : e.controlPointNextX,
                n ? e.controlPointPreviousY : e.controlPointNextY,
                n ? i.controlPointNextX : i.controlPointPreviousX,
                n ? i.controlPointNextY : i.controlPointPreviousY,
                i.x,
                i.y
              )
            : t.lineTo(i.x, i.y)
      },
    },
    ot = at
  ;(G.clear = at.clear),
    (G.drawRoundedRectangle = function (t) {
      t.beginPath(), at.roundedRect.apply(at, arguments)
    })
  var rt = {
    _set: function (t, e) {
      return G.merge(this[t] || (this[t] = {}), e)
    },
  }
  rt._set('global', {
    defaultColor: 'rgba(0,0,0,0.1)',
    defaultFontColor: '#666',
    defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    defaultFontSize: 12,
    defaultFontStyle: 'normal',
    defaultLineHeight: 1.2,
    showLines: !0,
  })
  var st = rt,
    lt = G.valueOrDefault
  var dt = {
      toLineHeight: function (t, e) {
        var i = ('' + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/)
        if (!i || 'normal' === i[1]) return 1.2 * e
        switch (((t = +i[2]), i[3])) {
          case 'px':
            return t
          case '%':
            t /= 100
        }
        return e * t
      },
      toPadding: function (t) {
        var e, i, n, a
        return (
          G.isObject(t)
            ? ((e = +t.top || 0),
              (i = +t.right || 0),
              (n = +t.bottom || 0),
              (a = +t.left || 0))
            : (e = i = n = a = +t || 0),
          { top: e, right: i, bottom: n, left: a, height: e + n, width: a + i }
        )
      },
      _parseFont: function (t) {
        var e = st.global,
          i = lt(t.fontSize, e.defaultFontSize),
          n = {
            family: lt(t.fontFamily, e.defaultFontFamily),
            lineHeight: G.options.toLineHeight(
              lt(t.lineHeight, e.defaultLineHeight),
              i
            ),
            size: i,
            style: lt(t.fontStyle, e.defaultFontStyle),
            weight: null,
            string: '',
          }
        return (
          (n.string = (function (t) {
            return !t || G.isNullOrUndef(t.size) || G.isNullOrUndef(t.family)
              ? null
              : (t.style ? t.style + ' ' : '') +
                  (t.weight ? t.weight + ' ' : '') +
                  t.size +
                  'px ' +
                  t.family
          })(n)),
          n
        )
      },
      resolve: function (t, e, i) {
        var n, a, o
        for (n = 0, a = t.length; n < a; ++n)
          if (
            void 0 !== (o = t[n]) &&
            (void 0 !== e && 'function' == typeof o && (o = o(e)),
            void 0 !== i && G.isArray(o) && (o = o[i]),
            void 0 !== o)
          )
            return o
      },
    },
    ut = G,
    ht = $,
    ct = ot,
    ft = dt
  ;(ut.easing = ht), (ut.canvas = ct), (ut.options = ft)
  var gt = function (t) {
    ut.extend(this, t), this.initialize.apply(this, arguments)
  }
  ut.extend(gt.prototype, {
    initialize: function () {
      this.hidden = !1
    },
    pivot: function () {
      var t = this
      return t._view || (t._view = ut.clone(t._model)), (t._start = {}), t
    },
    transition: function (t) {
      var e = this,
        i = e._model,
        n = e._start,
        a = e._view
      return i && 1 !== t
        ? (a || (a = e._view = {}),
          n || (n = e._start = {}),
          (function (t, e, i, n) {
            var a,
              o,
              r,
              s,
              l,
              d,
              u,
              h,
              c,
              f = Object.keys(i)
            for (a = 0, o = f.length; a < o; ++a)
              if (
                ((d = i[(r = f[a])]),
                e.hasOwnProperty(r) || (e[r] = d),
                (s = e[r]) !== d && '_' !== r[0])
              ) {
                if (
                  (t.hasOwnProperty(r) || (t[r] = s),
                  (u = typeof d) == typeof (l = t[r]))
                )
                  if ('string' === u) {
                    if ((h = X(l)).valid && (c = X(d)).valid) {
                      e[r] = c.mix(h, n).rgbString()
                      continue
                    }
                  } else if (ut.isFinite(l) && ut.isFinite(d)) {
                    e[r] = l + (d - l) * n
                    continue
                  }
                e[r] = d
              }
          })(n, a, i, t),
          e)
        : ((e._view = i), (e._start = null), e)
    },
    tooltipPosition: function () {
      return { x: this._model.x, y: this._model.y }
    },
    hasValue: function () {
      return ut.isNumber(this._model.x) && ut.isNumber(this._model.y)
    },
  }),
    (gt.extend = ut.inherits)
  var pt = gt,
    mt = pt.extend({
      chart: null,
      currentStep: 0,
      numSteps: 60,
      easing: '',
      render: null,
      onAnimationProgress: null,
      onAnimationComplete: null,
    }),
    vt = mt
  Object.defineProperty(mt.prototype, 'animationObject', {
    get: function () {
      return this
    },
  }),
    Object.defineProperty(mt.prototype, 'chartInstance', {
      get: function () {
        return this.chart
      },
      set: function (t) {
        this.chart = t
      },
    }),
    st._set('global', {
      animation: {
        duration: 1e3,
        easing: 'easeOutQuart',
        onProgress: ut.noop,
        onComplete: ut.noop,
      },
    })
  var bt = {
      animations: [],
      request: null,
      addAnimation: function (t, e, i, n) {
        var a,
          o,
          r = this.animations
        for (
          e.chart = t,
            e.startTime = Date.now(),
            e.duration = i,
            n || (t.animating = !0),
            a = 0,
            o = r.length;
          a < o;
          ++a
        )
          if (r[a].chart === t) return void (r[a] = e)
        r.push(e), 1 === r.length && this.requestAnimationFrame()
      },
      cancelAnimation: function (t) {
        var e = ut.findIndex(this.animations, function (e) {
          return e.chart === t
        })
        ;-1 !== e && (this.animations.splice(e, 1), (t.animating = !1))
      },
      requestAnimationFrame: function () {
        var t = this
        null === t.request &&
          (t.request = ut.requestAnimFrame.call(window, function () {
            ;(t.request = null), t.startDigest()
          }))
      },
      startDigest: function () {
        this.advance(),
          this.animations.length > 0 && this.requestAnimationFrame()
      },
      advance: function () {
        for (var t, e, i, n, a = this.animations, o = 0; o < a.length; )
          (e = (t = a[o]).chart),
            (i = t.numSteps),
            (n = Math.floor(((Date.now() - t.startTime) / t.duration) * i) + 1),
            (t.currentStep = Math.min(n, i)),
            ut.callback(t.render, [e, t], e),
            ut.callback(t.onAnimationProgress, [t], e),
            t.currentStep >= i
              ? (ut.callback(t.onAnimationComplete, [t], e),
                (e.animating = !1),
                a.splice(o, 1))
              : ++o
      },
    },
    xt = ut.options.resolve,
    yt = ['push', 'pop', 'shift', 'splice', 'unshift']
  function kt(t, e) {
    var i = t._chartjs
    if (i) {
      var n = i.listeners,
        a = n.indexOf(e)
      ;-1 !== a && n.splice(a, 1),
        n.length > 0 ||
          (yt.forEach(function (e) {
            delete t[e]
          }),
          delete t._chartjs)
    }
  }
  var wt = function (t, e) {
    this.initialize(t, e)
  }
  ut.extend(wt.prototype, {
    datasetElementType: null,
    dataElementType: null,
    initialize: function (t, e) {
      ;(this.chart = t), (this.index = e), this.linkScales(), this.addElements()
    },
    updateIndex: function (t) {
      this.index = t
    },
    linkScales: function () {
      var t = this,
        e = t.getMeta(),
        i = t.getDataset()
      ;(null !== e.xAxisID && e.xAxisID in t.chart.scales) ||
        (e.xAxisID = i.xAxisID || t.chart.options.scales.xAxes[0].id),
        (null !== e.yAxisID && e.yAxisID in t.chart.scales) ||
          (e.yAxisID = i.yAxisID || t.chart.options.scales.yAxes[0].id)
    },
    getDataset: function () {
      return this.chart.data.datasets[this.index]
    },
    getMeta: function () {
      return this.chart.getDatasetMeta(this.index)
    },
    getScaleForId: function (t) {
      return this.chart.scales[t]
    },
    _getValueScaleId: function () {
      return this.getMeta().yAxisID
    },
    _getIndexScaleId: function () {
      return this.getMeta().xAxisID
    },
    _getValueScale: function () {
      return this.getScaleForId(this._getValueScaleId())
    },
    _getIndexScale: function () {
      return this.getScaleForId(this._getIndexScaleId())
    },
    reset: function () {
      this.update(!0)
    },
    destroy: function () {
      this._data && kt(this._data, this)
    },
    createMetaDataset: function () {
      var t = this.datasetElementType
      return t && new t({ _chart: this.chart, _datasetIndex: this.index })
    },
    createMetaData: function (t) {
      var e = this.dataElementType
      return (
        e && new e({ _chart: this.chart, _datasetIndex: this.index, _index: t })
      )
    },
    addElements: function () {
      var t,
        e,
        i = this.getMeta(),
        n = this.getDataset().data || [],
        a = i.data
      for (t = 0, e = n.length; t < e; ++t)
        a[t] = a[t] || this.createMetaData(t)
      i.dataset = i.dataset || this.createMetaDataset()
    },
    addElementAndReset: function (t) {
      var e = this.createMetaData(t)
      this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
    },
    buildOrUpdateElements: function () {
      var t,
        e,
        i = this,
        n = i.getDataset(),
        a = n.data || (n.data = [])
      i._data !== a &&
        (i._data && kt(i._data, i),
        a &&
          Object.isExtensible(a) &&
          ((e = i),
          (t = a)._chartjs
            ? t._chartjs.listeners.push(e)
            : (Object.defineProperty(t, '_chartjs', {
                configurable: !0,
                enumerable: !1,
                value: { listeners: [e] },
              }),
              yt.forEach(function (e) {
                var i = 'onData' + e.charAt(0).toUpperCase() + e.slice(1),
                  n = t[e]
                Object.defineProperty(t, e, {
                  configurable: !0,
                  enumerable: !1,
                  value: function () {
                    var e = Array.prototype.slice.call(arguments),
                      a = n.apply(this, e)
                    return (
                      ut.each(t._chartjs.listeners, function (t) {
                        'function' == typeof t[i] && t[i].apply(t, e)
                      }),
                      a
                    )
                  },
                })
              }))),
        (i._data = a)),
        i.resyncElements()
    },
    update: ut.noop,
    transition: function (t) {
      for (
        var e = this.getMeta(), i = e.data || [], n = i.length, a = 0;
        a < n;
        ++a
      )
        i[a].transition(t)
      e.dataset && e.dataset.transition(t)
    },
    draw: function () {
      var t = this.getMeta(),
        e = t.data || [],
        i = e.length,
        n = 0
      for (t.dataset && t.dataset.draw(); n < i; ++n) e[n].draw()
    },
    removeHoverStyle: function (t) {
      ut.merge(t._model, t.$previousStyle || {}), delete t.$previousStyle
    },
    setHoverStyle: function (t) {
      var e = this.chart.data.datasets[t._datasetIndex],
        i = t._index,
        n = t.custom || {},
        a = t._model,
        o = ut.getHoverColor
      ;(t.$previousStyle = {
        backgroundColor: a.backgroundColor,
        borderColor: a.borderColor,
        borderWidth: a.borderWidth,
      }),
        (a.backgroundColor = xt(
          [
            n.hoverBackgroundColor,
            e.hoverBackgroundColor,
            o(a.backgroundColor),
          ],
          void 0,
          i
        )),
        (a.borderColor = xt(
          [n.hoverBorderColor, e.hoverBorderColor, o(a.borderColor)],
          void 0,
          i
        )),
        (a.borderWidth = xt(
          [n.hoverBorderWidth, e.hoverBorderWidth, a.borderWidth],
          void 0,
          i
        ))
    },
    resyncElements: function () {
      var t = this.getMeta(),
        e = this.getDataset().data,
        i = t.data.length,
        n = e.length
      n < i ? t.data.splice(n, i - n) : n > i && this.insertElements(i, n - i)
    },
    insertElements: function (t, e) {
      for (var i = 0; i < e; ++i) this.addElementAndReset(t + i)
    },
    onDataPush: function () {
      var t = arguments.length
      this.insertElements(this.getDataset().data.length - t, t)
    },
    onDataPop: function () {
      this.getMeta().data.pop()
    },
    onDataShift: function () {
      this.getMeta().data.shift()
    },
    onDataSplice: function (t, e) {
      this.getMeta().data.splice(t, e),
        this.insertElements(t, arguments.length - 2)
    },
    onDataUnshift: function () {
      this.insertElements(0, arguments.length)
    },
  }),
    (wt.extend = ut.inherits)
  var Mt = wt
  st._set('global', {
    elements: {
      arc: {
        backgroundColor: st.global.defaultColor,
        borderColor: '#fff',
        borderWidth: 2,
        borderAlign: 'center',
      },
    },
  })
  var _t = pt.extend({
      inLabelRange: function (t) {
        var e = this._view
        return (
          !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
        )
      },
      inRange: function (t, e) {
        var i = this._view
        if (i) {
          for (
            var n = ut.getAngleFromPoint(i, { x: t, y: e }),
              a = n.angle,
              o = n.distance,
              r = i.startAngle,
              s = i.endAngle;
            s < r;

          )
            s += 2 * Math.PI
          for (; a > s; ) a -= 2 * Math.PI
          for (; a < r; ) a += 2 * Math.PI
          var l = a >= r && a <= s,
            d = o >= i.innerRadius && o <= i.outerRadius
          return l && d
        }
        return !1
      },
      getCenterPoint: function () {
        var t = this._view,
          e = (t.startAngle + t.endAngle) / 2,
          i = (t.innerRadius + t.outerRadius) / 2
        return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i }
      },
      getArea: function () {
        var t = this._view
        return (
          Math.PI *
          ((t.endAngle - t.startAngle) / (2 * Math.PI)) *
          (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
        )
      },
      tooltipPosition: function () {
        var t = this._view,
          e = t.startAngle + (t.endAngle - t.startAngle) / 2,
          i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius
        return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i }
      },
      draw: function () {
        var t,
          e = this._chart.ctx,
          i = this._view,
          n = i.startAngle,
          a = i.endAngle,
          o = 'inner' === i.borderAlign ? 0.33 : 0
        e.save(),
          e.beginPath(),
          e.arc(i.x, i.y, Math.max(i.outerRadius - o, 0), n, a),
          e.arc(i.x, i.y, i.innerRadius, a, n, !0),
          e.closePath(),
          (e.fillStyle = i.backgroundColor),
          e.fill(),
          i.borderWidth &&
            ('inner' === i.borderAlign
              ? (e.beginPath(),
                (t = o / i.outerRadius),
                e.arc(i.x, i.y, i.outerRadius, n - t, a + t),
                i.innerRadius > o
                  ? ((t = o / i.innerRadius),
                    e.arc(i.x, i.y, i.innerRadius - o, a + t, n - t, !0))
                  : e.arc(i.x, i.y, o, a + Math.PI / 2, n - Math.PI / 2),
                e.closePath(),
                e.clip(),
                e.beginPath(),
                e.arc(i.x, i.y, i.outerRadius, n, a),
                e.arc(i.x, i.y, i.innerRadius, a, n, !0),
                e.closePath(),
                (e.lineWidth = 2 * i.borderWidth),
                (e.lineJoin = 'round'))
              : ((e.lineWidth = i.borderWidth), (e.lineJoin = 'bevel')),
            (e.strokeStyle = i.borderColor),
            e.stroke()),
          e.restore()
      },
    }),
    Ct = ut.valueOrDefault,
    St = st.global.defaultColor
  st._set('global', {
    elements: {
      line: {
        tension: 0.4,
        backgroundColor: St,
        borderWidth: 3,
        borderColor: St,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: 'miter',
        capBezierPoints: !0,
        fill: !0,
      },
    },
  })
  var Pt = pt.extend({
      draw: function () {
        var t,
          e,
          i,
          n,
          a = this._view,
          o = this._chart.ctx,
          r = a.spanGaps,
          s = this._children.slice(),
          l = st.global,
          d = l.elements.line,
          u = -1
        for (
          this._loop && s.length && s.push(s[0]),
            o.save(),
            o.lineCap = a.borderCapStyle || d.borderCapStyle,
            o.setLineDash && o.setLineDash(a.borderDash || d.borderDash),
            o.lineDashOffset = Ct(a.borderDashOffset, d.borderDashOffset),
            o.lineJoin = a.borderJoinStyle || d.borderJoinStyle,
            o.lineWidth = Ct(a.borderWidth, d.borderWidth),
            o.strokeStyle = a.borderColor || l.defaultColor,
            o.beginPath(),
            u = -1,
            t = 0;
          t < s.length;
          ++t
        )
          (e = s[t]),
            (i = ut.previousItem(s, t)),
            (n = e._view),
            0 === t
              ? n.skip || (o.moveTo(n.x, n.y), (u = t))
              : ((i = -1 === u ? i : s[u]),
                n.skip ||
                  ((u !== t - 1 && !r) || -1 === u
                    ? o.moveTo(n.x, n.y)
                    : ut.canvas.lineTo(o, i._view, e._view),
                  (u = t)))
        o.stroke(), o.restore()
      },
    }),
    It = ut.valueOrDefault,
    At = st.global.defaultColor
  function Dt(t) {
    var e = this._view
    return !!e && Math.abs(t - e.x) < e.radius + e.hitRadius
  }
  st._set('global', {
    elements: {
      point: {
        radius: 3,
        pointStyle: 'circle',
        backgroundColor: At,
        borderColor: At,
        borderWidth: 1,
        hitRadius: 1,
        hoverRadius: 4,
        hoverBorderWidth: 1,
      },
    },
  })
  var Tt = pt.extend({
      inRange: function (t, e) {
        var i = this._view
        return (
          !!i &&
          Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) <
            Math.pow(i.hitRadius + i.radius, 2)
        )
      },
      inLabelRange: Dt,
      inXRange: Dt,
      inYRange: function (t) {
        var e = this._view
        return !!e && Math.abs(t - e.y) < e.radius + e.hitRadius
      },
      getCenterPoint: function () {
        var t = this._view
        return { x: t.x, y: t.y }
      },
      getArea: function () {
        return Math.PI * Math.pow(this._view.radius, 2)
      },
      tooltipPosition: function () {
        var t = this._view
        return { x: t.x, y: t.y, padding: t.radius + t.borderWidth }
      },
      draw: function (t) {
        var e = this._view,
          i = this._chart.ctx,
          n = e.pointStyle,
          a = e.rotation,
          o = e.radius,
          r = e.x,
          s = e.y,
          l = st.global,
          d = l.defaultColor
        e.skip ||
          ((void 0 === t || ut.canvas._isPointInArea(e, t)) &&
            ((i.strokeStyle = e.borderColor || d),
            (i.lineWidth = It(e.borderWidth, l.elements.point.borderWidth)),
            (i.fillStyle = e.backgroundColor || d),
            ut.canvas.drawPoint(i, n, o, r, s, a)))
      },
    }),
    Ft = st.global.defaultColor
  function Lt(t) {
    return t && void 0 !== t.width
  }
  function Rt(t) {
    var e, i, n, a, o
    return (
      Lt(t)
        ? ((o = t.width / 2),
          (e = t.x - o),
          (i = t.x + o),
          (n = Math.min(t.y, t.base)),
          (a = Math.max(t.y, t.base)))
        : ((o = t.height / 2),
          (e = Math.min(t.x, t.base)),
          (i = Math.max(t.x, t.base)),
          (n = t.y - o),
          (a = t.y + o)),
      { left: e, top: n, right: i, bottom: a }
    )
  }
  function Ot(t, e, i) {
    return t === e ? i : t === i ? e : t
  }
  function zt(t, e, i) {
    var n,
      a,
      o,
      r,
      s = t.borderWidth,
      l = (function (t) {
        var e = t.borderSkipped,
          i = {}
        return e
          ? (t.horizontal
              ? t.base > t.x && (e = Ot(e, 'left', 'right'))
              : t.base < t.y && (e = Ot(e, 'bottom', 'top')),
            (i[e] = !0),
            i)
          : i
      })(t)
    return (
      ut.isObject(s)
        ? ((n = +s.top || 0),
          (a = +s.right || 0),
          (o = +s.bottom || 0),
          (r = +s.left || 0))
        : (n = a = o = r = +s || 0),
      {
        t: l.top || n < 0 ? 0 : n > i ? i : n,
        r: l.right || a < 0 ? 0 : a > e ? e : a,
        b: l.bottom || o < 0 ? 0 : o > i ? i : o,
        l: l.left || r < 0 ? 0 : r > e ? e : r,
      }
    )
  }
  function Bt(t, e, i) {
    var n = null === e,
      a = null === i,
      o = !(!t || (n && a)) && Rt(t)
    return (
      o &&
      (n || (e >= o.left && e <= o.right)) &&
      (a || (i >= o.top && i <= o.bottom))
    )
  }
  st._set('global', {
    elements: {
      rectangle: {
        backgroundColor: Ft,
        borderColor: Ft,
        borderSkipped: 'bottom',
        borderWidth: 0,
      },
    },
  })
  var Nt = pt.extend({
      draw: function () {
        var t = this._chart.ctx,
          e = this._view,
          i = (function (t) {
            var e = Rt(t),
              i = e.right - e.left,
              n = e.bottom - e.top,
              a = zt(t, i / 2, n / 2)
            return {
              outer: { x: e.left, y: e.top, w: i, h: n },
              inner: {
                x: e.left + a.l,
                y: e.top + a.t,
                w: i - a.l - a.r,
                h: n - a.t - a.b,
              },
            }
          })(e),
          n = i.outer,
          a = i.inner
        ;(t.fillStyle = e.backgroundColor),
          t.fillRect(n.x, n.y, n.w, n.h),
          (n.w === a.w && n.h === a.h) ||
            (t.save(),
            t.beginPath(),
            t.rect(n.x, n.y, n.w, n.h),
            t.clip(),
            (t.fillStyle = e.borderColor),
            t.rect(a.x, a.y, a.w, a.h),
            t.fill('evenodd'),
            t.restore())
      },
      height: function () {
        var t = this._view
        return t.base - t.y
      },
      inRange: function (t, e) {
        return Bt(this._view, t, e)
      },
      inLabelRange: function (t, e) {
        var i = this._view
        return Lt(i) ? Bt(i, t, null) : Bt(i, null, e)
      },
      inXRange: function (t) {
        return Bt(this._view, t, null)
      },
      inYRange: function (t) {
        return Bt(this._view, null, t)
      },
      getCenterPoint: function () {
        var t,
          e,
          i = this._view
        return (
          Lt(i)
            ? ((t = i.x), (e = (i.y + i.base) / 2))
            : ((t = (i.x + i.base) / 2), (e = i.y)),
          { x: t, y: e }
        )
      },
      getArea: function () {
        var t = this._view
        return Lt(t)
          ? t.width * Math.abs(t.y - t.base)
          : t.height * Math.abs(t.x - t.base)
      },
      tooltipPosition: function () {
        var t = this._view
        return { x: t.x, y: t.y }
      },
    }),
    Wt = {},
    Vt = _t,
    Et = Pt,
    Ht = Tt,
    jt = Nt
  ;(Wt.Arc = Vt), (Wt.Line = Et), (Wt.Point = Ht), (Wt.Rectangle = jt)
  var qt = ut.options.resolve
  st._set('bar', {
    hover: { mode: 'label' },
    scales: {
      xAxes: [
        {
          type: 'category',
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          offset: !0,
          gridLines: { offsetGridLines: !0 },
        },
      ],
      yAxes: [{ type: 'linear' }],
    },
  })
  var Yt = Mt.extend({
      dataElementType: Wt.Rectangle,
      initialize: function () {
        var t
        Mt.prototype.initialize.apply(this, arguments),
          ((t = this.getMeta()).stack = this.getDataset().stack),
          (t.bar = !0)
      },
      update: function (t) {
        var e,
          i,
          n = this.getMeta().data
        for (this._ruler = this.getRuler(), e = 0, i = n.length; e < i; ++e)
          this.updateElement(n[e], e, t)
      },
      updateElement: function (t, e, i) {
        var n = this,
          a = n.getMeta(),
          o = n.getDataset(),
          r = n._resolveElementOptions(t, e)
        ;(t._xScale = n.getScaleForId(a.xAxisID)),
          (t._yScale = n.getScaleForId(a.yAxisID)),
          (t._datasetIndex = n.index),
          (t._index = e),
          (t._model = {
            backgroundColor: r.backgroundColor,
            borderColor: r.borderColor,
            borderSkipped: r.borderSkipped,
            borderWidth: r.borderWidth,
            datasetLabel: o.label,
            label: n.chart.data.labels[e],
          }),
          n._updateElementGeometry(t, e, i),
          t.pivot()
      },
      _updateElementGeometry: function (t, e, i) {
        var n = this,
          a = t._model,
          o = n._getValueScale(),
          r = o.getBasePixel(),
          s = o.isHorizontal(),
          l = n._ruler || n.getRuler(),
          d = n.calculateBarValuePixels(n.index, e),
          u = n.calculateBarIndexPixels(n.index, e, l)
        ;(a.horizontal = s),
          (a.base = i ? r : d.base),
          (a.x = s ? (i ? r : d.head) : u.center),
          (a.y = s ? u.center : i ? r : d.head),
          (a.height = s ? u.size : void 0),
          (a.width = s ? void 0 : u.size)
      },
      _getStacks: function (t) {
        var e,
          i,
          n = this.chart,
          a = this._getIndexScale().options.stacked,
          o = void 0 === t ? n.data.datasets.length : t + 1,
          r = []
        for (e = 0; e < o; ++e)
          (i = n.getDatasetMeta(e)).bar &&
            n.isDatasetVisible(e) &&
            (!1 === a ||
              (!0 === a && -1 === r.indexOf(i.stack)) ||
              (void 0 === a &&
                (void 0 === i.stack || -1 === r.indexOf(i.stack)))) &&
            r.push(i.stack)
        return r
      },
      getStackCount: function () {
        return this._getStacks().length
      },
      getStackIndex: function (t, e) {
        var i = this._getStacks(t),
          n = void 0 !== e ? i.indexOf(e) : -1
        return -1 === n ? i.length - 1 : n
      },
      getRuler: function () {
        var t,
          e,
          i = this._getIndexScale(),
          n = this.getStackCount(),
          a = this.index,
          o = i.isHorizontal(),
          r = o ? i.left : i.top,
          s = r + (o ? i.width : i.height),
          l = []
        for (t = 0, e = this.getMeta().data.length; t < e; ++t)
          l.push(i.getPixelForValue(null, t, a))
        return {
          min: ut.isNullOrUndef(i.options.barThickness)
            ? (function (t, e) {
                var i,
                  n,
                  a,
                  o,
                  r = t.isHorizontal() ? t.width : t.height,
                  s = t.getTicks()
                for (a = 1, o = e.length; a < o; ++a)
                  r = Math.min(r, Math.abs(e[a] - e[a - 1]))
                for (a = 0, o = s.length; a < o; ++a)
                  (n = t.getPixelForTick(a)),
                    (r = a > 0 ? Math.min(r, n - i) : r),
                    (i = n)
                return r
              })(i, l)
            : -1,
          pixels: l,
          start: r,
          end: s,
          stackCount: n,
          scale: i,
        }
      },
      calculateBarValuePixels: function (t, e) {
        var i,
          n,
          a,
          o,
          r,
          s,
          l = this.chart,
          d = this.getMeta(),
          u = this._getValueScale(),
          h = u.isHorizontal(),
          c = l.data.datasets,
          f = +u.getRightValue(c[t].data[e]),
          g = u.options.minBarLength,
          p = u.options.stacked,
          m = d.stack,
          v = 0
        if (p || (void 0 === p && void 0 !== m))
          for (i = 0; i < t; ++i)
            (n = l.getDatasetMeta(i)).bar &&
              n.stack === m &&
              n.controller._getValueScaleId() === u.id &&
              l.isDatasetVisible(i) &&
              ((a = +u.getRightValue(c[i].data[e])),
              ((f < 0 && a < 0) || (f >= 0 && a > 0)) && (v += a))
        return (
          (o = u.getPixelForValue(v)),
          (s = (r = u.getPixelForValue(v + f)) - o),
          void 0 !== g &&
            Math.abs(s) < g &&
            ((s = g), (r = (f >= 0 && !h) || (f < 0 && h) ? o - g : o + g)),
          { size: s, base: o, head: r, center: r + s / 2 }
        )
      },
      calculateBarIndexPixels: function (t, e, i) {
        var n = i.scale.options,
          a =
            'flex' === n.barThickness
              ? (function (t, e, i) {
                  var n,
                    a = e.pixels,
                    o = a[t],
                    r = t > 0 ? a[t - 1] : null,
                    s = t < a.length - 1 ? a[t + 1] : null,
                    l = i.categoryPercentage
                  return (
                    null === r &&
                      (r = o - (null === s ? e.end - e.start : s - o)),
                    null === s && (s = o + o - r),
                    (n = o - ((o - Math.min(r, s)) / 2) * l),
                    {
                      chunk: ((Math.abs(s - r) / 2) * l) / e.stackCount,
                      ratio: i.barPercentage,
                      start: n,
                    }
                  )
                })(e, i, n)
              : (function (t, e, i) {
                  var n,
                    a,
                    o = i.barThickness,
                    r = e.stackCount,
                    s = e.pixels[t]
                  return (
                    ut.isNullOrUndef(o)
                      ? ((n = e.min * i.categoryPercentage),
                        (a = i.barPercentage))
                      : ((n = o * r), (a = 1)),
                    { chunk: n / r, ratio: a, start: s - n / 2 }
                  )
                })(e, i, n),
          o = this.getStackIndex(t, this.getMeta().stack),
          r = a.start + a.chunk * o + a.chunk / 2,
          s = Math.min(
            ut.valueOrDefault(n.maxBarThickness, 1 / 0),
            a.chunk * a.ratio
          )
        return { base: r - s / 2, head: r + s / 2, center: r, size: s }
      },
      draw: function () {
        var t = this.chart,
          e = this._getValueScale(),
          i = this.getMeta().data,
          n = this.getDataset(),
          a = i.length,
          o = 0
        for (ut.canvas.clipArea(t.ctx, t.chartArea); o < a; ++o)
          isNaN(e.getRightValue(n.data[o])) || i[o].draw()
        ut.canvas.unclipArea(t.ctx)
      },
      _resolveElementOptions: function (t, e) {
        var i,
          n,
          a,
          o = this.chart,
          r = o.data.datasets[this.index],
          s = t.custom || {},
          l = o.options.elements.rectangle,
          d = {},
          u = { chart: o, dataIndex: e, dataset: r, datasetIndex: this.index },
          h = ['backgroundColor', 'borderColor', 'borderSkipped', 'borderWidth']
        for (i = 0, n = h.length; i < n; ++i)
          d[(a = h[i])] = qt([s[a], r[a], l[a]], u, e)
        return d
      },
    }),
    Ut = ut.valueOrDefault,
    Xt = ut.options.resolve
  st._set('bubble', {
    hover: { mode: 'single' },
    scales: {
      xAxes: [{ type: 'linear', position: 'bottom', id: 'x-axis-0' }],
      yAxes: [{ type: 'linear', position: 'left', id: 'y-axis-0' }],
    },
    tooltips: {
      callbacks: {
        title: function () {
          return ''
        },
        label: function (t, e) {
          var i = e.datasets[t.datasetIndex].label || '',
            n = e.datasets[t.datasetIndex].data[t.index]
          return i + ': (' + t.xLabel + ', ' + t.yLabel + ', ' + n.r + ')'
        },
      },
    },
  })
  var Kt = Mt.extend({
      dataElementType: Wt.Point,
      update: function (t) {
        var e = this,
          i = e.getMeta().data
        ut.each(i, function (i, n) {
          e.updateElement(i, n, t)
        })
      },
      updateElement: function (t, e, i) {
        var n = this,
          a = n.getMeta(),
          o = t.custom || {},
          r = n.getScaleForId(a.xAxisID),
          s = n.getScaleForId(a.yAxisID),
          l = n._resolveElementOptions(t, e),
          d = n.getDataset().data[e],
          u = n.index,
          h = i
            ? r.getPixelForDecimal(0.5)
            : r.getPixelForValue('object' == typeof d ? d : NaN, e, u),
          c = i ? s.getBasePixel() : s.getPixelForValue(d, e, u)
        ;(t._xScale = r),
          (t._yScale = s),
          (t._options = l),
          (t._datasetIndex = u),
          (t._index = e),
          (t._model = {
            backgroundColor: l.backgroundColor,
            borderColor: l.borderColor,
            borderWidth: l.borderWidth,
            hitRadius: l.hitRadius,
            pointStyle: l.pointStyle,
            rotation: l.rotation,
            radius: i ? 0 : l.radius,
            skip: o.skip || isNaN(h) || isNaN(c),
            x: h,
            y: c,
          }),
          t.pivot()
      },
      setHoverStyle: function (t) {
        var e = t._model,
          i = t._options,
          n = ut.getHoverColor
        ;(t.$previousStyle = {
          backgroundColor: e.backgroundColor,
          borderColor: e.borderColor,
          borderWidth: e.borderWidth,
          radius: e.radius,
        }),
          (e.backgroundColor = Ut(
            i.hoverBackgroundColor,
            n(i.backgroundColor)
          )),
          (e.borderColor = Ut(i.hoverBorderColor, n(i.borderColor))),
          (e.borderWidth = Ut(i.hoverBorderWidth, i.borderWidth)),
          (e.radius = i.radius + i.hoverRadius)
      },
      _resolveElementOptions: function (t, e) {
        var i,
          n,
          a,
          o = this.chart,
          r = o.data.datasets[this.index],
          s = t.custom || {},
          l = o.options.elements.point,
          d = r.data[e],
          u = {},
          h = { chart: o, dataIndex: e, dataset: r, datasetIndex: this.index },
          c = [
            'backgroundColor',
            'borderColor',
            'borderWidth',
            'hoverBackgroundColor',
            'hoverBorderColor',
            'hoverBorderWidth',
            'hoverRadius',
            'hitRadius',
            'pointStyle',
            'rotation',
          ]
        for (i = 0, n = c.length; i < n; ++i)
          u[(a = c[i])] = Xt([s[a], r[a], l[a]], h, e)
        return (
          (u.radius = Xt(
            [s.radius, d ? d.r : void 0, r.radius, l.radius],
            h,
            e
          )),
          u
        )
      },
    }),
    Gt = ut.options.resolve,
    Zt = ut.valueOrDefault
  st._set('doughnut', {
    animation: { animateRotate: !0, animateScale: !1 },
    hover: { mode: 'single' },
    legendCallback: function (t) {
      var e = []
      e.push('<ul class="' + t.id + '-legend">')
      var i = t.data,
        n = i.datasets,
        a = i.labels
      if (n.length)
        for (var o = 0; o < n[0].data.length; ++o)
          e.push(
            '<li><span style="background-color:' +
              n[0].backgroundColor[o] +
              '"></span>'
          ),
            a[o] && e.push(a[o]),
            e.push('</li>')
      return e.push('</ul>'), e.join('')
    },
    legend: {
      labels: {
        generateLabels: function (t) {
          var e = t.data
          return e.labels.length && e.datasets.length
            ? e.labels.map(function (i, n) {
                var a = t.getDatasetMeta(0),
                  o = e.datasets[0],
                  r = a.data[n],
                  s = (r && r.custom) || {},
                  l = t.options.elements.arc
                return {
                  text: i,
                  fillStyle: Gt(
                    [s.backgroundColor, o.backgroundColor, l.backgroundColor],
                    void 0,
                    n
                  ),
                  strokeStyle: Gt(
                    [s.borderColor, o.borderColor, l.borderColor],
                    void 0,
                    n
                  ),
                  lineWidth: Gt(
                    [s.borderWidth, o.borderWidth, l.borderWidth],
                    void 0,
                    n
                  ),
                  hidden: isNaN(o.data[n]) || a.data[n].hidden,
                  index: n,
                }
              })
            : []
        },
      },
      onClick: function (t, e) {
        var i,
          n,
          a,
          o = e.index,
          r = this.chart
        for (i = 0, n = (r.data.datasets || []).length; i < n; ++i)
          (a = r.getDatasetMeta(i)).data[o] &&
            (a.data[o].hidden = !a.data[o].hidden)
        r.update()
      },
    },
    cutoutPercentage: 50,
    rotation: -0.5 * Math.PI,
    circumference: 2 * Math.PI,
    tooltips: {
      callbacks: {
        title: function () {
          return ''
        },
        label: function (t, e) {
          var i = e.labels[t.index],
            n = ': ' + e.datasets[t.datasetIndex].data[t.index]
          return ut.isArray(i) ? ((i = i.slice())[0] += n) : (i += n), i
        },
      },
    },
  })
  var $t = Mt.extend({
    dataElementType: Wt.Arc,
    linkScales: ut.noop,
    getRingIndex: function (t) {
      for (var e = 0, i = 0; i < t; ++i) this.chart.isDatasetVisible(i) && ++e
      return e
    },
    update: function (t) {
      var e,
        i,
        n = this,
        a = n.chart,
        o = a.chartArea,
        r = a.options,
        s = o.right - o.left,
        l = o.bottom - o.top,
        d = Math.min(s, l),
        u = { x: 0, y: 0 },
        h = n.getMeta(),
        c = h.data,
        f = r.cutoutPercentage,
        g = r.circumference,
        p = n._getRingWeight(n.index)
      if (g < 2 * Math.PI) {
        var m = r.rotation % (2 * Math.PI),
          v =
            (m += 2 * Math.PI * (m >= Math.PI ? -1 : m < -Math.PI ? 1 : 0)) + g,
          b = { x: Math.cos(m), y: Math.sin(m) },
          x = { x: Math.cos(v), y: Math.sin(v) },
          y = (m <= 0 && v >= 0) || (m <= 2 * Math.PI && 2 * Math.PI <= v),
          k =
            (m <= 0.5 * Math.PI && 0.5 * Math.PI <= v) ||
            (m <= 2.5 * Math.PI && 2.5 * Math.PI <= v),
          w =
            (m <= -Math.PI && -Math.PI <= v) || (m <= Math.PI && Math.PI <= v),
          M =
            (m <= 0.5 * -Math.PI && 0.5 * -Math.PI <= v) ||
            (m <= 1.5 * Math.PI && 1.5 * Math.PI <= v),
          _ = f / 100,
          C = {
            x: w
              ? -1
              : Math.min(b.x * (b.x < 0 ? 1 : _), x.x * (x.x < 0 ? 1 : _)),
            y: M
              ? -1
              : Math.min(b.y * (b.y < 0 ? 1 : _), x.y * (x.y < 0 ? 1 : _)),
          },
          S = {
            x: y
              ? 1
              : Math.max(b.x * (b.x > 0 ? 1 : _), x.x * (x.x > 0 ? 1 : _)),
            y: k
              ? 1
              : Math.max(b.y * (b.y > 0 ? 1 : _), x.y * (x.y > 0 ? 1 : _)),
          },
          P = { width: 0.5 * (S.x - C.x), height: 0.5 * (S.y - C.y) }
        ;(d = Math.min(s / P.width, l / P.height)),
          (u = { x: -0.5 * (S.x + C.x), y: -0.5 * (S.y + C.y) })
      }
      for (e = 0, i = c.length; e < i; ++e)
        c[e]._options = n._resolveElementOptions(c[e], e)
      for (
        a.borderWidth = n.getMaxBorderWidth(),
          a.outerRadius = Math.max((d - a.borderWidth) / 2, 0),
          a.innerRadius = Math.max(f ? (a.outerRadius / 100) * f : 0, 0),
          a.radiusLength =
            (a.outerRadius - a.innerRadius) /
            (n._getVisibleDatasetWeightTotal() || 1),
          a.offsetX = u.x * a.outerRadius,
          a.offsetY = u.y * a.outerRadius,
          h.total = n.calculateTotal(),
          n.outerRadius =
            a.outerRadius - a.radiusLength * n._getRingWeightOffset(n.index),
          n.innerRadius = Math.max(n.outerRadius - a.radiusLength * p, 0),
          e = 0,
          i = c.length;
        e < i;
        ++e
      )
        n.updateElement(c[e], e, t)
    },
    updateElement: function (t, e, i) {
      var n = this,
        a = n.chart,
        o = a.chartArea,
        r = a.options,
        s = r.animation,
        l = (o.left + o.right) / 2,
        d = (o.top + o.bottom) / 2,
        u = r.rotation,
        h = r.rotation,
        c = n.getDataset(),
        f =
          i && s.animateRotate
            ? 0
            : t.hidden
            ? 0
            : n.calculateCircumference(c.data[e]) *
              (r.circumference / (2 * Math.PI)),
        g = i && s.animateScale ? 0 : n.innerRadius,
        p = i && s.animateScale ? 0 : n.outerRadius,
        m = t._options || {}
      ut.extend(t, {
        _datasetIndex: n.index,
        _index: e,
        _model: {
          backgroundColor: m.backgroundColor,
          borderColor: m.borderColor,
          borderWidth: m.borderWidth,
          borderAlign: m.borderAlign,
          x: l + a.offsetX,
          y: d + a.offsetY,
          startAngle: u,
          endAngle: h,
          circumference: f,
          outerRadius: p,
          innerRadius: g,
          label: ut.valueAtIndexOrDefault(c.label, e, a.data.labels[e]),
        },
      })
      var v = t._model
      ;(i && s.animateRotate) ||
        ((v.startAngle =
          0 === e ? r.rotation : n.getMeta().data[e - 1]._model.endAngle),
        (v.endAngle = v.startAngle + v.circumference)),
        t.pivot()
    },
    calculateTotal: function () {
      var t,
        e = this.getDataset(),
        i = this.getMeta(),
        n = 0
      return (
        ut.each(i.data, function (i, a) {
          ;(t = e.data[a]), isNaN(t) || i.hidden || (n += Math.abs(t))
        }),
        n
      )
    },
    calculateCircumference: function (t) {
      var e = this.getMeta().total
      return e > 0 && !isNaN(t) ? 2 * Math.PI * (Math.abs(t) / e) : 0
    },
    getMaxBorderWidth: function (t) {
      var e,
        i,
        n,
        a,
        o,
        r,
        s,
        l,
        d = 0,
        u = this.chart
      if (!t)
        for (e = 0, i = u.data.datasets.length; e < i; ++e)
          if (u.isDatasetVisible(e)) {
            ;(t = (n = u.getDatasetMeta(e)).data),
              e !== this.index && (o = n.controller)
            break
          }
      if (!t) return 0
      for (e = 0, i = t.length; e < i; ++e)
        (a = t[e]),
          'inner' !==
            (r = o ? o._resolveElementOptions(a, e) : a._options).borderAlign &&
            ((s = r.borderWidth),
            (d = (l = r.hoverBorderWidth) > (d = s > d ? s : d) ? l : d))
      return d
    },
    setHoverStyle: function (t) {
      var e = t._model,
        i = t._options,
        n = ut.getHoverColor
      ;(t.$previousStyle = {
        backgroundColor: e.backgroundColor,
        borderColor: e.borderColor,
        borderWidth: e.borderWidth,
      }),
        (e.backgroundColor = Zt(i.hoverBackgroundColor, n(i.backgroundColor))),
        (e.borderColor = Zt(i.hoverBorderColor, n(i.borderColor))),
        (e.borderWidth = Zt(i.hoverBorderWidth, i.borderWidth))
    },
    _resolveElementOptions: function (t, e) {
      var i,
        n,
        a,
        o = this.chart,
        r = this.getDataset(),
        s = t.custom || {},
        l = o.options.elements.arc,
        d = {},
        u = { chart: o, dataIndex: e, dataset: r, datasetIndex: this.index },
        h = [
          'backgroundColor',
          'borderColor',
          'borderWidth',
          'borderAlign',
          'hoverBackgroundColor',
          'hoverBorderColor',
          'hoverBorderWidth',
        ]
      for (i = 0, n = h.length; i < n; ++i)
        d[(a = h[i])] = Gt([s[a], r[a], l[a]], u, e)
      return d
    },
    _getRingWeightOffset: function (t) {
      for (var e = 0, i = 0; i < t; ++i)
        this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i))
      return e
    },
    _getRingWeight: function (t) {
      return Math.max(Zt(this.chart.data.datasets[t].weight, 1), 0)
    },
    _getVisibleDatasetWeightTotal: function () {
      return this._getRingWeightOffset(this.chart.data.datasets.length)
    },
  })
  st._set('horizontalBar', {
    hover: { mode: 'index', axis: 'y' },
    scales: {
      xAxes: [{ type: 'linear', position: 'bottom' }],
      yAxes: [
        {
          type: 'category',
          position: 'left',
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          offset: !0,
          gridLines: { offsetGridLines: !0 },
        },
      ],
    },
    elements: { rectangle: { borderSkipped: 'left' } },
    tooltips: { mode: 'index', axis: 'y' },
  })
  var Jt = Yt.extend({
      _getValueScaleId: function () {
        return this.getMeta().xAxisID
      },
      _getIndexScaleId: function () {
        return this.getMeta().yAxisID
      },
    }),
    Qt = ut.valueOrDefault,
    te = ut.options.resolve,
    ee = ut.canvas._isPointInArea
  function ie(t, e) {
    return Qt(t.showLine, e.showLines)
  }
  st._set('line', {
    showLines: !0,
    spanGaps: !1,
    hover: { mode: 'label' },
    scales: {
      xAxes: [{ type: 'category', id: 'x-axis-0' }],
      yAxes: [{ type: 'linear', id: 'y-axis-0' }],
    },
  })
  var ne = Mt.extend({
      datasetElementType: Wt.Line,
      dataElementType: Wt.Point,
      update: function (t) {
        var e,
          i,
          n = this,
          a = n.getMeta(),
          o = a.dataset,
          r = a.data || [],
          s = n.getScaleForId(a.yAxisID),
          l = n.getDataset(),
          d = ie(l, n.chart.options)
        for (
          d &&
            (void 0 !== l.tension &&
              void 0 === l.lineTension &&
              (l.lineTension = l.tension),
            (o._scale = s),
            (o._datasetIndex = n.index),
            (o._children = r),
            (o._model = n._resolveLineOptions(o)),
            o.pivot()),
            e = 0,
            i = r.length;
          e < i;
          ++e
        )
          n.updateElement(r[e], e, t)
        for (
          d && 0 !== o._model.tension && n.updateBezierControlPoints(),
            e = 0,
            i = r.length;
          e < i;
          ++e
        )
          r[e].pivot()
      },
      updateElement: function (t, e, i) {
        var n,
          a,
          o = this,
          r = o.getMeta(),
          s = t.custom || {},
          l = o.getDataset(),
          d = o.index,
          u = l.data[e],
          h = o.getScaleForId(r.yAxisID),
          c = o.getScaleForId(r.xAxisID),
          f = r.dataset._model,
          g = o._resolvePointOptions(t, e)
        ;(n = c.getPixelForValue('object' == typeof u ? u : NaN, e, d)),
          (a = i ? h.getBasePixel() : o.calculatePointY(u, e, d)),
          (t._xScale = c),
          (t._yScale = h),
          (t._options = g),
          (t._datasetIndex = d),
          (t._index = e),
          (t._model = {
            x: n,
            y: a,
            skip: s.skip || isNaN(n) || isNaN(a),
            radius: g.radius,
            pointStyle: g.pointStyle,
            rotation: g.rotation,
            backgroundColor: g.backgroundColor,
            borderColor: g.borderColor,
            borderWidth: g.borderWidth,
            tension: Qt(s.tension, f ? f.tension : 0),
            steppedLine: !!f && f.steppedLine,
            hitRadius: g.hitRadius,
          })
      },
      _resolvePointOptions: function (t, e) {
        var i,
          n,
          a,
          o = this.chart,
          r = o.data.datasets[this.index],
          s = t.custom || {},
          l = o.options.elements.point,
          d = {},
          u = { chart: o, dataIndex: e, dataset: r, datasetIndex: this.index },
          h = {
            backgroundColor: 'pointBackgroundColor',
            borderColor: 'pointBorderColor',
            borderWidth: 'pointBorderWidth',
            hitRadius: 'pointHitRadius',
            hoverBackgroundColor: 'pointHoverBackgroundColor',
            hoverBorderColor: 'pointHoverBorderColor',
            hoverBorderWidth: 'pointHoverBorderWidth',
            hoverRadius: 'pointHoverRadius',
            pointStyle: 'pointStyle',
            radius: 'pointRadius',
            rotation: 'pointRotation',
          },
          c = Object.keys(h)
        for (i = 0, n = c.length; i < n; ++i)
          d[(a = c[i])] = te([s[a], r[h[a]], r[a], l[a]], u, e)
        return d
      },
      _resolveLineOptions: function (t) {
        var e,
          i,
          n,
          a = this.chart,
          o = a.data.datasets[this.index],
          r = t.custom || {},
          s = a.options,
          l = s.elements.line,
          d = {},
          u = [
            'backgroundColor',
            'borderWidth',
            'borderColor',
            'borderCapStyle',
            'borderDash',
            'borderDashOffset',
            'borderJoinStyle',
            'fill',
            'cubicInterpolationMode',
          ]
        for (e = 0, i = u.length; e < i; ++e)
          d[(n = u[e])] = te([r[n], o[n], l[n]])
        return (
          (d.spanGaps = Qt(o.spanGaps, s.spanGaps)),
          (d.tension = Qt(o.lineTension, l.tension)),
          (d.steppedLine = te([r.steppedLine, o.steppedLine, l.stepped])),
          d
        )
      },
      calculatePointY: function (t, e, i) {
        var n,
          a,
          o,
          r = this.chart,
          s = this.getMeta(),
          l = this.getScaleForId(s.yAxisID),
          d = 0,
          u = 0
        if (l.options.stacked) {
          for (n = 0; n < i; n++)
            if (
              ((a = r.data.datasets[n]),
              'line' === (o = r.getDatasetMeta(n)).type &&
                o.yAxisID === l.id &&
                r.isDatasetVisible(n))
            ) {
              var h = Number(l.getRightValue(a.data[e]))
              h < 0 ? (u += h || 0) : (d += h || 0)
            }
          var c = Number(l.getRightValue(t))
          return c < 0 ? l.getPixelForValue(u + c) : l.getPixelForValue(d + c)
        }
        return l.getPixelForValue(t)
      },
      updateBezierControlPoints: function () {
        var t,
          e,
          i,
          n,
          a = this.chart,
          o = this.getMeta(),
          r = o.dataset._model,
          s = a.chartArea,
          l = o.data || []
        function d(t, e, i) {
          return Math.max(Math.min(t, i), e)
        }
        if (
          (r.spanGaps &&
            (l = l.filter(function (t) {
              return !t._model.skip
            })),
          'monotone' === r.cubicInterpolationMode)
        )
          ut.splineCurveMonotone(l)
        else
          for (t = 0, e = l.length; t < e; ++t)
            (i = l[t]._model),
              (n = ut.splineCurve(
                ut.previousItem(l, t)._model,
                i,
                ut.nextItem(l, t)._model,
                r.tension
              )),
              (i.controlPointPreviousX = n.previous.x),
              (i.controlPointPreviousY = n.previous.y),
              (i.controlPointNextX = n.next.x),
              (i.controlPointNextY = n.next.y)
        if (a.options.elements.line.capBezierPoints)
          for (t = 0, e = l.length; t < e; ++t)
            (i = l[t]._model),
              ee(i, s) &&
                (t > 0 &&
                  ee(l[t - 1]._model, s) &&
                  ((i.controlPointPreviousX = d(
                    i.controlPointPreviousX,
                    s.left,
                    s.right
                  )),
                  (i.controlPointPreviousY = d(
                    i.controlPointPreviousY,
                    s.top,
                    s.bottom
                  ))),
                t < l.length - 1 &&
                  ee(l[t + 1]._model, s) &&
                  ((i.controlPointNextX = d(
                    i.controlPointNextX,
                    s.left,
                    s.right
                  )),
                  (i.controlPointNextY = d(
                    i.controlPointNextY,
                    s.top,
                    s.bottom
                  ))))
      },
      draw: function () {
        var t,
          e = this.chart,
          i = this.getMeta(),
          n = i.data || [],
          a = e.chartArea,
          o = n.length,
          r = 0
        for (
          ie(this.getDataset(), e.options) &&
          ((t = (i.dataset._model.borderWidth || 0) / 2),
          ut.canvas.clipArea(e.ctx, {
            left: a.left,
            right: a.right,
            top: a.top - t,
            bottom: a.bottom + t,
          }),
          i.dataset.draw(),
          ut.canvas.unclipArea(e.ctx));
          r < o;
          ++r
        )
          n[r].draw(a)
      },
      setHoverStyle: function (t) {
        var e = t._model,
          i = t._options,
          n = ut.getHoverColor
        ;(t.$previousStyle = {
          backgroundColor: e.backgroundColor,
          borderColor: e.borderColor,
          borderWidth: e.borderWidth,
          radius: e.radius,
        }),
          (e.backgroundColor = Qt(
            i.hoverBackgroundColor,
            n(i.backgroundColor)
          )),
          (e.borderColor = Qt(i.hoverBorderColor, n(i.borderColor))),
          (e.borderWidth = Qt(i.hoverBorderWidth, i.borderWidth)),
          (e.radius = Qt(i.hoverRadius, i.radius))
      },
    }),
    ae = ut.options.resolve
  st._set('polarArea', {
    scale: {
      type: 'radialLinear',
      angleLines: { display: !1 },
      gridLines: { circular: !0 },
      pointLabels: { display: !1 },
      ticks: { beginAtZero: !0 },
    },
    animation: { animateRotate: !0, animateScale: !0 },
    startAngle: -0.5 * Math.PI,
    legendCallback: function (t) {
      var e = []
      e.push('<ul class="' + t.id + '-legend">')
      var i = t.data,
        n = i.datasets,
        a = i.labels
      if (n.length)
        for (var o = 0; o < n[0].data.length; ++o)
          e.push(
            '<li><span style="background-color:' +
              n[0].backgroundColor[o] +
              '"></span>'
          ),
            a[o] && e.push(a[o]),
            e.push('</li>')
      return e.push('</ul>'), e.join('')
    },
    legend: {
      labels: {
        generateLabels: function (t) {
          var e = t.data
          return e.labels.length && e.datasets.length
            ? e.labels.map(function (i, n) {
                var a = t.getDatasetMeta(0),
                  o = e.datasets[0],
                  r = a.data[n].custom || {},
                  s = t.options.elements.arc
                return {
                  text: i,
                  fillStyle: ae(
                    [r.backgroundColor, o.backgroundColor, s.backgroundColor],
                    void 0,
                    n
                  ),
                  strokeStyle: ae(
                    [r.borderColor, o.borderColor, s.borderColor],
                    void 0,
                    n
                  ),
                  lineWidth: ae(
                    [r.borderWidth, o.borderWidth, s.borderWidth],
                    void 0,
                    n
                  ),
                  hidden: isNaN(o.data[n]) || a.data[n].hidden,
                  index: n,
                }
              })
            : []
        },
      },
      onClick: function (t, e) {
        var i,
          n,
          a,
          o = e.index,
          r = this.chart
        for (i = 0, n = (r.data.datasets || []).length; i < n; ++i)
          (a = r.getDatasetMeta(i)).data[o].hidden = !a.data[o].hidden
        r.update()
      },
    },
    tooltips: {
      callbacks: {
        title: function () {
          return ''
        },
        label: function (t, e) {
          return e.labels[t.index] + ': ' + t.yLabel
        },
      },
    },
  })
  var oe = Mt.extend({
    dataElementType: Wt.Arc,
    linkScales: ut.noop,
    update: function (t) {
      var e,
        i,
        n,
        a = this,
        o = a.getDataset(),
        r = a.getMeta(),
        s = a.chart.options.startAngle || 0,
        l = (a._starts = []),
        d = (a._angles = []),
        u = r.data
      for (
        a._updateRadius(),
          r.count = a.countVisibleElements(),
          e = 0,
          i = o.data.length;
        e < i;
        e++
      )
        (l[e] = s), (n = a._computeAngle(e)), (d[e] = n), (s += n)
      for (e = 0, i = u.length; e < i; ++e)
        (u[e]._options = a._resolveElementOptions(u[e], e)),
          a.updateElement(u[e], e, t)
    },
    _updateRadius: function () {
      var t = this,
        e = t.chart,
        i = e.chartArea,
        n = e.options,
        a = Math.min(i.right - i.left, i.bottom - i.top)
      ;(e.outerRadius = Math.max(a / 2, 0)),
        (e.innerRadius = Math.max(
          n.cutoutPercentage ? (e.outerRadius / 100) * n.cutoutPercentage : 1,
          0
        )),
        (e.radiusLength =
          (e.outerRadius - e.innerRadius) / e.getVisibleDatasetCount()),
        (t.outerRadius = e.outerRadius - e.radiusLength * t.index),
        (t.innerRadius = t.outerRadius - e.radiusLength)
    },
    updateElement: function (t, e, i) {
      var n = this,
        a = n.chart,
        o = n.getDataset(),
        r = a.options,
        s = r.animation,
        l = a.scale,
        d = a.data.labels,
        u = l.xCenter,
        h = l.yCenter,
        c = r.startAngle,
        f = t.hidden ? 0 : l.getDistanceFromCenterForValue(o.data[e]),
        g = n._starts[e],
        p = g + (t.hidden ? 0 : n._angles[e]),
        m = s.animateScale ? 0 : l.getDistanceFromCenterForValue(o.data[e]),
        v = t._options || {}
      ut.extend(t, {
        _datasetIndex: n.index,
        _index: e,
        _scale: l,
        _model: {
          backgroundColor: v.backgroundColor,
          borderColor: v.borderColor,
          borderWidth: v.borderWidth,
          borderAlign: v.borderAlign,
          x: u,
          y: h,
          innerRadius: 0,
          outerRadius: i ? m : f,
          startAngle: i && s.animateRotate ? c : g,
          endAngle: i && s.animateRotate ? c : p,
          label: ut.valueAtIndexOrDefault(d, e, d[e]),
        },
      }),
        t.pivot()
    },
    countVisibleElements: function () {
      var t = this.getDataset(),
        e = this.getMeta(),
        i = 0
      return (
        ut.each(e.data, function (e, n) {
          isNaN(t.data[n]) || e.hidden || i++
        }),
        i
      )
    },
    setHoverStyle: function (t) {
      var e = t._model,
        i = t._options,
        n = ut.getHoverColor,
        a = ut.valueOrDefault
      ;(t.$previousStyle = {
        backgroundColor: e.backgroundColor,
        borderColor: e.borderColor,
        borderWidth: e.borderWidth,
      }),
        (e.backgroundColor = a(i.hoverBackgroundColor, n(i.backgroundColor))),
        (e.borderColor = a(i.hoverBorderColor, n(i.borderColor))),
        (e.borderWidth = a(i.hoverBorderWidth, i.borderWidth))
    },
    _resolveElementOptions: function (t, e) {
      var i,
        n,
        a,
        o = this.chart,
        r = this.getDataset(),
        s = t.custom || {},
        l = o.options.elements.arc,
        d = {},
        u = { chart: o, dataIndex: e, dataset: r, datasetIndex: this.index },
        h = [
          'backgroundColor',
          'borderColor',
          'borderWidth',
          'borderAlign',
          'hoverBackgroundColor',
          'hoverBorderColor',
          'hoverBorderWidth',
        ]
      for (i = 0, n = h.length; i < n; ++i)
        d[(a = h[i])] = ae([s[a], r[a], l[a]], u, e)
      return d
    },
    _computeAngle: function (t) {
      var e = this,
        i = this.getMeta().count,
        n = e.getDataset(),
        a = e.getMeta()
      if (isNaN(n.data[t]) || a.data[t].hidden) return 0
      var o = {
        chart: e.chart,
        dataIndex: t,
        dataset: n,
        datasetIndex: e.index,
      }
      return ae([e.chart.options.elements.arc.angle, (2 * Math.PI) / i], o, t)
    },
  })
  st._set('pie', ut.clone(st.doughnut)), st._set('pie', { cutoutPercentage: 0 })
  var re = $t,
    se = ut.valueOrDefault,
    le = ut.options.resolve
  st._set('radar', {
    scale: { type: 'radialLinear' },
    elements: { line: { tension: 0 } },
  })
  var de = Mt.extend({
    datasetElementType: Wt.Line,
    dataElementType: Wt.Point,
    linkScales: ut.noop,
    update: function (t) {
      var e,
        i,
        n = this,
        a = n.getMeta(),
        o = a.dataset,
        r = a.data || [],
        s = n.chart.scale,
        l = n.getDataset()
      for (
        void 0 !== l.tension &&
          void 0 === l.lineTension &&
          (l.lineTension = l.tension),
          o._scale = s,
          o._datasetIndex = n.index,
          o._children = r,
          o._loop = !0,
          o._model = n._resolveLineOptions(o),
          o.pivot(),
          e = 0,
          i = r.length;
        e < i;
        ++e
      )
        n.updateElement(r[e], e, t)
      for (n.updateBezierControlPoints(), e = 0, i = r.length; e < i; ++e)
        r[e].pivot()
    },
    updateElement: function (t, e, i) {
      var n = this,
        a = t.custom || {},
        o = n.getDataset(),
        r = n.chart.scale,
        s = r.getPointPositionForValue(e, o.data[e]),
        l = n._resolvePointOptions(t, e),
        d = n.getMeta().dataset._model,
        u = i ? r.xCenter : s.x,
        h = i ? r.yCenter : s.y
      ;(t._scale = r),
        (t._options = l),
        (t._datasetIndex = n.index),
        (t._index = e),
        (t._model = {
          x: u,
          y: h,
          skip: a.skip || isNaN(u) || isNaN(h),
          radius: l.radius,
          pointStyle: l.pointStyle,
          rotation: l.rotation,
          backgroundColor: l.backgroundColor,
          borderColor: l.borderColor,
          borderWidth: l.borderWidth,
          tension: se(a.tension, d ? d.tension : 0),
          hitRadius: l.hitRadius,
        })
    },
    _resolvePointOptions: function (t, e) {
      var i,
        n,
        a,
        o = this.chart,
        r = o.data.datasets[this.index],
        s = t.custom || {},
        l = o.options.elements.point,
        d = {},
        u = { chart: o, dataIndex: e, dataset: r, datasetIndex: this.index },
        h = {
          backgroundColor: 'pointBackgroundColor',
          borderColor: 'pointBorderColor',
          borderWidth: 'pointBorderWidth',
          hitRadius: 'pointHitRadius',
          hoverBackgroundColor: 'pointHoverBackgroundColor',
          hoverBorderColor: 'pointHoverBorderColor',
          hoverBorderWidth: 'pointHoverBorderWidth',
          hoverRadius: 'pointHoverRadius',
          pointStyle: 'pointStyle',
          radius: 'pointRadius',
          rotation: 'pointRotation',
        },
        c = Object.keys(h)
      for (i = 0, n = c.length; i < n; ++i)
        d[(a = c[i])] = le([s[a], r[h[a]], r[a], l[a]], u, e)
      return d
    },
    _resolveLineOptions: function (t) {
      var e,
        i,
        n,
        a = this.chart,
        o = a.data.datasets[this.index],
        r = t.custom || {},
        s = a.options.elements.line,
        l = {},
        d = [
          'backgroundColor',
          'borderWidth',
          'borderColor',
          'borderCapStyle',
          'borderDash',
          'borderDashOffset',
          'borderJoinStyle',
          'fill',
        ]
      for (e = 0, i = d.length; e < i; ++e)
        l[(n = d[e])] = le([r[n], o[n], s[n]])
      return (l.tension = se(o.lineTension, s.tension)), l
    },
    updateBezierControlPoints: function () {
      var t,
        e,
        i,
        n,
        a = this.getMeta(),
        o = this.chart.chartArea,
        r = a.data || []
      function s(t, e, i) {
        return Math.max(Math.min(t, i), e)
      }
      for (t = 0, e = r.length; t < e; ++t)
        (i = r[t]._model),
          (n = ut.splineCurve(
            ut.previousItem(r, t, !0)._model,
            i,
            ut.nextItem(r, t, !0)._model,
            i.tension
          )),
          (i.controlPointPreviousX = s(n.previous.x, o.left, o.right)),
          (i.controlPointPreviousY = s(n.previous.y, o.top, o.bottom)),
          (i.controlPointNextX = s(n.next.x, o.left, o.right)),
          (i.controlPointNextY = s(n.next.y, o.top, o.bottom))
    },
    setHoverStyle: function (t) {
      var e = t._model,
        i = t._options,
        n = ut.getHoverColor
      ;(t.$previousStyle = {
        backgroundColor: e.backgroundColor,
        borderColor: e.borderColor,
        borderWidth: e.borderWidth,
        radius: e.radius,
      }),
        (e.backgroundColor = se(i.hoverBackgroundColor, n(i.backgroundColor))),
        (e.borderColor = se(i.hoverBorderColor, n(i.borderColor))),
        (e.borderWidth = se(i.hoverBorderWidth, i.borderWidth)),
        (e.radius = se(i.hoverRadius, i.radius))
    },
  })
  st._set('scatter', {
    hover: { mode: 'single' },
    scales: {
      xAxes: [{ id: 'x-axis-1', type: 'linear', position: 'bottom' }],
      yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left' }],
    },
    showLines: !1,
    tooltips: {
      callbacks: {
        title: function () {
          return ''
        },
        label: function (t) {
          return '(' + t.xLabel + ', ' + t.yLabel + ')'
        },
      },
    },
  })
  var ue = {
    bar: Yt,
    bubble: Kt,
    doughnut: $t,
    horizontalBar: Jt,
    line: ne,
    polarArea: oe,
    pie: re,
    radar: de,
    scatter: ne,
  }
  function he(t, e) {
    return t.native ? { x: t.x, y: t.y } : ut.getRelativePosition(t, e)
  }
  function ce(t, e) {
    var i, n, a, o, r
    for (n = 0, o = t.data.datasets.length; n < o; ++n)
      if (t.isDatasetVisible(n))
        for (a = 0, r = (i = t.getDatasetMeta(n)).data.length; a < r; ++a) {
          var s = i.data[a]
          s._view.skip || e(s)
        }
  }
  function fe(t, e) {
    var i = []
    return (
      ce(t, function (t) {
        t.inRange(e.x, e.y) && i.push(t)
      }),
      i
    )
  }
  function ge(t, e, i, n) {
    var a = Number.POSITIVE_INFINITY,
      o = []
    return (
      ce(t, function (t) {
        if (!i || t.inRange(e.x, e.y)) {
          var r = t.getCenterPoint(),
            s = n(e, r)
          s < a ? ((o = [t]), (a = s)) : s === a && o.push(t)
        }
      }),
      o
    )
  }
  function pe(t) {
    var e = -1 !== t.indexOf('x'),
      i = -1 !== t.indexOf('y')
    return function (t, n) {
      var a = e ? Math.abs(t.x - n.x) : 0,
        o = i ? Math.abs(t.y - n.y) : 0
      return Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2))
    }
  }
  function me(t, e, i) {
    var n = he(e, t)
    i.axis = i.axis || 'x'
    var a = pe(i.axis),
      o = i.intersect ? fe(t, n) : ge(t, n, !1, a),
      r = []
    return o.length
      ? (t.data.datasets.forEach(function (e, i) {
          if (t.isDatasetVisible(i)) {
            var n = t.getDatasetMeta(i).data[o[0]._index]
            n && !n._view.skip && r.push(n)
          }
        }),
        r)
      : []
  }
  var ve = {
    modes: {
      single: function (t, e) {
        var i = he(e, t),
          n = []
        return (
          ce(t, function (t) {
            if (t.inRange(i.x, i.y)) return n.push(t), n
          }),
          n.slice(0, 1)
        )
      },
      label: me,
      index: me,
      dataset: function (t, e, i) {
        var n = he(e, t)
        i.axis = i.axis || 'xy'
        var a = pe(i.axis),
          o = i.intersect ? fe(t, n) : ge(t, n, !1, a)
        return (
          o.length > 0 && (o = t.getDatasetMeta(o[0]._datasetIndex).data), o
        )
      },
      'x-axis': function (t, e) {
        return me(t, e, { intersect: !1 })
      },
      point: function (t, e) {
        return fe(t, he(e, t))
      },
      nearest: function (t, e, i) {
        var n = he(e, t)
        i.axis = i.axis || 'xy'
        var a = pe(i.axis)
        return ge(t, n, i.intersect, a)
      },
      x: function (t, e, i) {
        var n = he(e, t),
          a = [],
          o = !1
        return (
          ce(t, function (t) {
            t.inXRange(n.x) && a.push(t), t.inRange(n.x, n.y) && (o = !0)
          }),
          i.intersect && !o && (a = []),
          a
        )
      },
      y: function (t, e, i) {
        var n = he(e, t),
          a = [],
          o = !1
        return (
          ce(t, function (t) {
            t.inYRange(n.y) && a.push(t), t.inRange(n.x, n.y) && (o = !0)
          }),
          i.intersect && !o && (a = []),
          a
        )
      },
    },
  }
  function be(t, e) {
    return ut.where(t, function (t) {
      return t.position === e
    })
  }
  function xe(t, e) {
    t.forEach(function (t, e) {
      return (t._tmpIndex_ = e), t
    }),
      t.sort(function (t, i) {
        var n = e ? i : t,
          a = e ? t : i
        return n.weight === a.weight
          ? n._tmpIndex_ - a._tmpIndex_
          : n.weight - a.weight
      }),
      t.forEach(function (t) {
        delete t._tmpIndex_
      })
  }
  function ye(t, e) {
    ut.each(t, function (t) {
      e[t.position] += t.isHorizontal() ? t.height : t.width
    })
  }
  st._set('global', {
    layout: { padding: { top: 0, right: 0, bottom: 0, left: 0 } },
  })
  var ke = {
    defaults: {},
    addBox: function (t, e) {
      t.boxes || (t.boxes = []),
        (e.fullWidth = e.fullWidth || !1),
        (e.position = e.position || 'top'),
        (e.weight = e.weight || 0),
        t.boxes.push(e)
    },
    removeBox: function (t, e) {
      var i = t.boxes ? t.boxes.indexOf(e) : -1
      ;-1 !== i && t.boxes.splice(i, 1)
    },
    configure: function (t, e, i) {
      for (
        var n, a = ['fullWidth', 'position', 'weight'], o = a.length, r = 0;
        r < o;
        ++r
      )
        (n = a[r]), i.hasOwnProperty(n) && (e[n] = i[n])
    },
    update: function (t, e, i) {
      if (t) {
        var n = t.options.layout || {},
          a = ut.options.toPadding(n.padding),
          o = a.left,
          r = a.right,
          s = a.top,
          l = a.bottom,
          d = be(t.boxes, 'left'),
          u = be(t.boxes, 'right'),
          h = be(t.boxes, 'top'),
          c = be(t.boxes, 'bottom'),
          f = be(t.boxes, 'chartArea')
        xe(d, !0), xe(u, !1), xe(h, !0), xe(c, !1)
        var g,
          p = d.concat(u),
          m = h.concat(c),
          v = p.concat(m),
          b = e - o - r,
          x = i - s - l,
          y = (e - b / 2) / p.length,
          k = b,
          w = x,
          M = { top: s, left: o, bottom: l, right: r },
          _ = []
        ut.each(v, function (t) {
          var e,
            i = t.isHorizontal()
          i
            ? ((e = t.update(t.fullWidth ? b : k, x / 2)), (w -= e.height))
            : ((e = t.update(y, w)), (k -= e.width)),
            _.push({ horizontal: i, width: e.width, box: t })
        }),
          (g = (function (t) {
            var e = 0,
              i = 0,
              n = 0,
              a = 0
            return (
              ut.each(t, function (t) {
                if (t.getPadding) {
                  var o = t.getPadding()
                  ;(e = Math.max(e, o.top)),
                    (i = Math.max(i, o.left)),
                    (n = Math.max(n, o.bottom)),
                    (a = Math.max(a, o.right))
                }
              }),
              { top: e, left: i, bottom: n, right: a }
            )
          })(v)),
          ut.each(p, T),
          ye(p, M),
          ut.each(m, T),
          ye(m, M),
          ut.each(p, function (t) {
            var e = ut.findNextWhere(_, function (e) {
                return e.box === t
              }),
              i = { left: 0, right: 0, top: M.top, bottom: M.bottom }
            e && t.update(e.width, w, i)
          }),
          ye(v, (M = { top: s, left: o, bottom: l, right: r }))
        var C = Math.max(g.left - M.left, 0)
        ;(M.left += C), (M.right += Math.max(g.right - M.right, 0))
        var S = Math.max(g.top - M.top, 0)
        ;(M.top += S), (M.bottom += Math.max(g.bottom - M.bottom, 0))
        var P = i - M.top - M.bottom,
          I = e - M.left - M.right
        ;(I === k && P === w) ||
          (ut.each(p, function (t) {
            t.height = P
          }),
          ut.each(m, function (t) {
            t.fullWidth || (t.width = I)
          }),
          (w = P),
          (k = I))
        var A = o + C,
          D = s + S
        ut.each(d.concat(h), F),
          (A += k),
          (D += w),
          ut.each(u, F),
          ut.each(c, F),
          (t.chartArea = {
            left: M.left,
            top: M.top,
            right: M.left + k,
            bottom: M.top + w,
          }),
          ut.each(f, function (e) {
            ;(e.left = t.chartArea.left),
              (e.top = t.chartArea.top),
              (e.right = t.chartArea.right),
              (e.bottom = t.chartArea.bottom),
              e.update(k, w)
          })
      }
      function T(t) {
        var e = ut.findNextWhere(_, function (e) {
          return e.box === t
        })
        if (e)
          if (e.horizontal) {
            var i = {
              left: Math.max(M.left, g.left),
              right: Math.max(M.right, g.right),
              top: 0,
              bottom: 0,
            }
            t.update(t.fullWidth ? b : k, x / 2, i)
          } else t.update(e.width, w)
      }
      function F(t) {
        t.isHorizontal()
          ? ((t.left = t.fullWidth ? o : M.left),
            (t.right = t.fullWidth ? e - r : M.left + k),
            (t.top = D),
            (t.bottom = D + t.height),
            (D = t.bottom))
          : ((t.left = A),
            (t.right = A + t.width),
            (t.top = M.top),
            (t.bottom = M.top + w),
            (A = t.right))
      }
    },
  }
  var we,
    Me =
      ((we = Object.freeze({
        default:
          '@keyframes chartjs-render-animation{from{opacity:.99}to{opacity:1}}.chartjs-render-monitor{animation:chartjs-render-animation 1ms}.chartjs-size-monitor,.chartjs-size-monitor-expand,.chartjs-size-monitor-shrink{position:absolute;direction:ltr;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1}.chartjs-size-monitor-expand>div{position:absolute;width:1000000px;height:1000000px;left:0;top:0}.chartjs-size-monitor-shrink>div{position:absolute;width:200%;height:200%;left:0;top:0}',
      })) &&
        we.default) ||
      we,
    _e = '$chartjs',
    Ce = 'chartjs-size-monitor',
    Se = 'chartjs-render-monitor',
    Pe = 'chartjs-render-animation',
    Ie = ['animationstart', 'webkitAnimationStart'],
    Ae = {
      touchstart: 'mousedown',
      touchmove: 'mousemove',
      touchend: 'mouseup',
      pointerenter: 'mouseenter',
      pointerdown: 'mousedown',
      pointermove: 'mousemove',
      pointerup: 'mouseup',
      pointerleave: 'mouseout',
      pointerout: 'mouseout',
    }
  function De(t, e) {
    var i = ut.getStyle(t, e),
      n = i && i.match(/^(\d+)(\.\d+)?px$/)
    return n ? Number(n[1]) : void 0
  }
  var Te = !!(function () {
    var t = !1
    try {
      var e = Object.defineProperty({}, 'passive', {
        get: function () {
          t = !0
        },
      })
      window.addEventListener('e', null, e)
    } catch (t) {}
    return t
  })() && { passive: !0 }
  function Fe(t, e, i) {
    t.addEventListener(e, i, Te)
  }
  function Le(t, e, i) {
    t.removeEventListener(e, i, Te)
  }
  function Re(t, e, i, n, a) {
    return {
      type: t,
      chart: e,
      native: a || null,
      x: void 0 !== i ? i : null,
      y: void 0 !== n ? n : null,
    }
  }
  function Oe(t) {
    var e = document.createElement('div')
    return (e.className = t || ''), e
  }
  function ze(t, e, i) {
    var n,
      a,
      o,
      r,
      s = t[_e] || (t[_e] = {}),
      l = (s.resizer = (function (t) {
        var e = Oe(Ce),
          i = Oe(Ce + '-expand'),
          n = Oe(Ce + '-shrink')
        i.appendChild(Oe()),
          n.appendChild(Oe()),
          e.appendChild(i),
          e.appendChild(n),
          (e._reset = function () {
            ;(i.scrollLeft = 1e6),
              (i.scrollTop = 1e6),
              (n.scrollLeft = 1e6),
              (n.scrollTop = 1e6)
          })
        var a = function () {
          e._reset(), t()
        }
        return (
          Fe(i, 'scroll', a.bind(i, 'expand')),
          Fe(n, 'scroll', a.bind(n, 'shrink')),
          e
        )
      })(
        ((n = function () {
          if (s.resizer) {
            var n = i.options.maintainAspectRatio && t.parentNode,
              a = n ? n.clientWidth : 0
            e(Re('resize', i)),
              n && n.clientWidth < a && i.canvas && e(Re('resize', i))
          }
        }),
        (o = !1),
        (r = []),
        function () {
          ;(r = Array.prototype.slice.call(arguments)),
            (a = a || this),
            o ||
              ((o = !0),
              ut.requestAnimFrame.call(window, function () {
                ;(o = !1), n.apply(a, r)
              }))
        })
      ))
    !(function (t, e) {
      var i = t[_e] || (t[_e] = {}),
        n = (i.renderProxy = function (t) {
          t.animationName === Pe && e()
        })
      ut.each(Ie, function (e) {
        Fe(t, e, n)
      }),
        (i.reflow = !!t.offsetParent),
        t.classList.add(Se)
    })(t, function () {
      if (s.resizer) {
        var e = t.parentNode
        e && e !== l.parentNode && e.insertBefore(l, e.firstChild), l._reset()
      }
    })
  }
  function Be(t) {
    var e = t[_e] || {},
      i = e.resizer
    delete e.resizer,
      (function (t) {
        var e = t[_e] || {},
          i = e.renderProxy
        i &&
          (ut.each(Ie, function (e) {
            Le(t, e, i)
          }),
          delete e.renderProxy),
          t.classList.remove(Se)
      })(t),
      i && i.parentNode && i.parentNode.removeChild(i)
  }
  var Ne = {
    disableCSSInjection: !1,
    _enabled: 'undefined' != typeof window && 'undefined' != typeof document,
    _ensureLoaded: function () {
      var t, e, i
      this._loaded ||
        ((this._loaded = !0),
        this.disableCSSInjection ||
          ((e = Me),
          (i = (t = this)._style || document.createElement('style')),
          t._style ||
            ((t._style = i),
            (e = '/* Chart.js */\n' + e),
            i.setAttribute('type', 'text/css'),
            document.getElementsByTagName('head')[0].appendChild(i)),
          i.appendChild(document.createTextNode(e))))
    },
    acquireContext: function (t, e) {
      'string' == typeof t
        ? (t = document.getElementById(t))
        : t.length && (t = t[0]),
        t && t.canvas && (t = t.canvas)
      var i = t && t.getContext && t.getContext('2d')
      return (
        this._ensureLoaded(),
        i && i.canvas === t
          ? ((function (t, e) {
              var i = t.style,
                n = t.getAttribute('height'),
                a = t.getAttribute('width')
              if (
                ((t[_e] = {
                  initial: {
                    height: n,
                    width: a,
                    style: {
                      display: i.display,
                      height: i.height,
                      width: i.width,
                    },
                  },
                }),
                (i.display = i.display || 'block'),
                null === a || '' === a)
              ) {
                var o = De(t, 'width')
                void 0 !== o && (t.width = o)
              }
              if (null === n || '' === n)
                if ('' === t.style.height)
                  t.height = t.width / (e.options.aspectRatio || 2)
                else {
                  var r = De(t, 'height')
                  void 0 !== o && (t.height = r)
                }
            })(t, e),
            i)
          : null
      )
    },
    releaseContext: function (t) {
      var e = t.canvas
      if (e[_e]) {
        var i = e[_e].initial
        ;['height', 'width'].forEach(function (t) {
          var n = i[t]
          ut.isNullOrUndef(n) ? e.removeAttribute(t) : e.setAttribute(t, n)
        }),
          ut.each(i.style || {}, function (t, i) {
            e.style[i] = t
          }),
          (e.width = e.width),
          delete e[_e]
      }
    },
    addEventListener: function (t, e, i) {
      var n = t.canvas
      if ('resize' !== e) {
        var a = i[_e] || (i[_e] = {})
        Fe(
          n,
          e,
          ((a.proxies || (a.proxies = {}))[t.id + '_' + e] = function (e) {
            i(
              (function (t, e) {
                var i = Ae[t.type] || t.type,
                  n = ut.getRelativePosition(t, e)
                return Re(i, e, n.x, n.y, t)
              })(e, t)
            )
          })
        )
      } else ze(n, i, t)
    },
    removeEventListener: function (t, e, i) {
      var n = t.canvas
      if ('resize' !== e) {
        var a = ((i[_e] || {}).proxies || {})[t.id + '_' + e]
        a && Le(n, e, a)
      } else Be(n)
    },
  }
  ;(ut.addEvent = Fe), (ut.removeEvent = Le)
  var We = Ne._enabled
      ? Ne
      : {
          acquireContext: function (t) {
            return (
              t && t.canvas && (t = t.canvas), (t && t.getContext('2d')) || null
            )
          },
        },
    Ve = ut.extend(
      {
        initialize: function () {},
        acquireContext: function () {},
        releaseContext: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
      },
      We
    )
  st._set('global', { plugins: {} })
  var Ee = {
      _plugins: [],
      _cacheId: 0,
      register: function (t) {
        var e = this._plugins
        ;[].concat(t).forEach(function (t) {
          ;-1 === e.indexOf(t) && e.push(t)
        }),
          this._cacheId++
      },
      unregister: function (t) {
        var e = this._plugins
        ;[].concat(t).forEach(function (t) {
          var i = e.indexOf(t)
          ;-1 !== i && e.splice(i, 1)
        }),
          this._cacheId++
      },
      clear: function () {
        ;(this._plugins = []), this._cacheId++
      },
      count: function () {
        return this._plugins.length
      },
      getAll: function () {
        return this._plugins
      },
      notify: function (t, e, i) {
        var n,
          a,
          o,
          r,
          s,
          l = this.descriptors(t),
          d = l.length
        for (n = 0; n < d; ++n)
          if (
            'function' == typeof (s = (o = (a = l[n]).plugin)[e]) &&
            ((r = [t].concat(i || [])).push(a.options), !1 === s.apply(o, r))
          )
            return !1
        return !0
      },
      descriptors: function (t) {
        var e = t.$plugins || (t.$plugins = {})
        if (e.id === this._cacheId) return e.descriptors
        var i = [],
          n = [],
          a = (t && t.config) || {},
          o = (a.options && a.options.plugins) || {}
        return (
          this._plugins.concat(a.plugins || []).forEach(function (t) {
            if (-1 === i.indexOf(t)) {
              var e = t.id,
                a = o[e]
              !1 !== a &&
                (!0 === a && (a = ut.clone(st.global.plugins[e])),
                i.push(t),
                n.push({ plugin: t, options: a || {} }))
            }
          }),
          (e.descriptors = n),
          (e.id = this._cacheId),
          n
        )
      },
      _invalidate: function (t) {
        delete t.$plugins
      },
    },
    He = {
      constructors: {},
      defaults: {},
      registerScaleType: function (t, e, i) {
        ;(this.constructors[t] = e), (this.defaults[t] = ut.clone(i))
      },
      getScaleConstructor: function (t) {
        return this.constructors.hasOwnProperty(t)
          ? this.constructors[t]
          : void 0
      },
      getScaleDefaults: function (t) {
        return this.defaults.hasOwnProperty(t)
          ? ut.merge({}, [st.scale, this.defaults[t]])
          : {}
      },
      updateScaleDefaults: function (t, e) {
        this.defaults.hasOwnProperty(t) &&
          (this.defaults[t] = ut.extend(this.defaults[t], e))
      },
      addScalesToLayout: function (t) {
        ut.each(t.scales, function (e) {
          ;(e.fullWidth = e.options.fullWidth),
            (e.position = e.options.position),
            (e.weight = e.options.weight),
            ke.addBox(t, e)
        })
      },
    },
    je = ut.valueOrDefault
  st._set('global', {
    tooltips: {
      enabled: !0,
      custom: null,
      mode: 'nearest',
      position: 'average',
      intersect: !0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleFontStyle: 'bold',
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleFontColor: '#fff',
      titleAlign: 'left',
      bodySpacing: 2,
      bodyFontColor: '#fff',
      bodyAlign: 'left',
      footerFontStyle: 'bold',
      footerSpacing: 2,
      footerMarginTop: 6,
      footerFontColor: '#fff',
      footerAlign: 'left',
      yPadding: 6,
      xPadding: 6,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      multiKeyBackground: '#fff',
      displayColors: !0,
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      callbacks: {
        beforeTitle: ut.noop,
        title: function (t, e) {
          var i = '',
            n = e.labels,
            a = n ? n.length : 0
          if (t.length > 0) {
            var o = t[0]
            o.label
              ? (i = o.label)
              : o.xLabel
              ? (i = o.xLabel)
              : a > 0 && o.index < a && (i = n[o.index])
          }
          return i
        },
        afterTitle: ut.noop,
        beforeBody: ut.noop,
        beforeLabel: ut.noop,
        label: function (t, e) {
          var i = e.datasets[t.datasetIndex].label || ''
          return (
            i && (i += ': '),
            ut.isNullOrUndef(t.value) ? (i += t.yLabel) : (i += t.value),
            i
          )
        },
        labelColor: function (t, e) {
          var i = e.getDatasetMeta(t.datasetIndex).data[t.index]._view
          return {
            borderColor: i.borderColor,
            backgroundColor: i.backgroundColor,
          }
        },
        labelTextColor: function () {
          return this._options.bodyFontColor
        },
        afterLabel: ut.noop,
        afterBody: ut.noop,
        beforeFooter: ut.noop,
        footer: ut.noop,
        afterFooter: ut.noop,
      },
    },
  })
  var qe = {
    average: function (t) {
      if (!t.length) return !1
      var e,
        i,
        n = 0,
        a = 0,
        o = 0
      for (e = 0, i = t.length; e < i; ++e) {
        var r = t[e]
        if (r && r.hasValue()) {
          var s = r.tooltipPosition()
          ;(n += s.x), (a += s.y), ++o
        }
      }
      return { x: n / o, y: a / o }
    },
    nearest: function (t, e) {
      var i,
        n,
        a,
        o = e.x,
        r = e.y,
        s = Number.POSITIVE_INFINITY
      for (i = 0, n = t.length; i < n; ++i) {
        var l = t[i]
        if (l && l.hasValue()) {
          var d = l.getCenterPoint(),
            u = ut.distanceBetweenPoints(e, d)
          u < s && ((s = u), (a = l))
        }
      }
      if (a) {
        var h = a.tooltipPosition()
        ;(o = h.x), (r = h.y)
      }
      return { x: o, y: r }
    },
  }
  function Ye(t, e) {
    return (
      e && (ut.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
    )
  }
  function Ue(t) {
    return ('string' == typeof t || t instanceof String) && t.indexOf('\n') > -1
      ? t.split('\n')
      : t
  }
  function Xe(t) {
    var e = st.global
    return {
      xPadding: t.xPadding,
      yPadding: t.yPadding,
      xAlign: t.xAlign,
      yAlign: t.yAlign,
      bodyFontColor: t.bodyFontColor,
      _bodyFontFamily: je(t.bodyFontFamily, e.defaultFontFamily),
      _bodyFontStyle: je(t.bodyFontStyle, e.defaultFontStyle),
      _bodyAlign: t.bodyAlign,
      bodyFontSize: je(t.bodyFontSize, e.defaultFontSize),
      bodySpacing: t.bodySpacing,
      titleFontColor: t.titleFontColor,
      _titleFontFamily: je(t.titleFontFamily, e.defaultFontFamily),
      _titleFontStyle: je(t.titleFontStyle, e.defaultFontStyle),
      titleFontSize: je(t.titleFontSize, e.defaultFontSize),
      _titleAlign: t.titleAlign,
      titleSpacing: t.titleSpacing,
      titleMarginBottom: t.titleMarginBottom,
      footerFontColor: t.footerFontColor,
      _footerFontFamily: je(t.footerFontFamily, e.defaultFontFamily),
      _footerFontStyle: je(t.footerFontStyle, e.defaultFontStyle),
      footerFontSize: je(t.footerFontSize, e.defaultFontSize),
      _footerAlign: t.footerAlign,
      footerSpacing: t.footerSpacing,
      footerMarginTop: t.footerMarginTop,
      caretSize: t.caretSize,
      cornerRadius: t.cornerRadius,
      backgroundColor: t.backgroundColor,
      opacity: 0,
      legendColorBackground: t.multiKeyBackground,
      displayColors: t.displayColors,
      borderColor: t.borderColor,
      borderWidth: t.borderWidth,
    }
  }
  function Ke(t, e) {
    return 'center' === e
      ? t.x + t.width / 2
      : 'right' === e
      ? t.x + t.width - t.xPadding
      : t.x + t.xPadding
  }
  function Ge(t) {
    return Ye([], Ue(t))
  }
  var Ze = pt.extend({
      initialize: function () {
        ;(this._model = Xe(this._options)), (this._lastActive = [])
      },
      getTitle: function () {
        var t = this._options.callbacks,
          e = t.beforeTitle.apply(this, arguments),
          i = t.title.apply(this, arguments),
          n = t.afterTitle.apply(this, arguments),
          a = []
        return (a = Ye(a, Ue(e))), (a = Ye(a, Ue(i))), (a = Ye(a, Ue(n)))
      },
      getBeforeBody: function () {
        return Ge(this._options.callbacks.beforeBody.apply(this, arguments))
      },
      getBody: function (t, e) {
        var i = this,
          n = i._options.callbacks,
          a = []
        return (
          ut.each(t, function (t) {
            var o = { before: [], lines: [], after: [] }
            Ye(o.before, Ue(n.beforeLabel.call(i, t, e))),
              Ye(o.lines, n.label.call(i, t, e)),
              Ye(o.after, Ue(n.afterLabel.call(i, t, e))),
              a.push(o)
          }),
          a
        )
      },
      getAfterBody: function () {
        return Ge(this._options.callbacks.afterBody.apply(this, arguments))
      },
      getFooter: function () {
        var t = this._options.callbacks,
          e = t.beforeFooter.apply(this, arguments),
          i = t.footer.apply(this, arguments),
          n = t.afterFooter.apply(this, arguments),
          a = []
        return (a = Ye(a, Ue(e))), (a = Ye(a, Ue(i))), (a = Ye(a, Ue(n)))
      },
      update: function (t) {
        var e,
          i,
          n,
          a,
          o,
          r,
          s,
          l,
          d,
          u,
          h = this,
          c = h._options,
          f = h._model,
          g = (h._model = Xe(c)),
          p = h._active,
          m = h._data,
          v = { xAlign: f.xAlign, yAlign: f.yAlign },
          b = { x: f.x, y: f.y },
          x = { width: f.width, height: f.height },
          y = { x: f.caretX, y: f.caretY }
        if (p.length) {
          g.opacity = 1
          var k = [],
            w = []
          y = qe[c.position].call(h, p, h._eventPosition)
          var M = []
          for (e = 0, i = p.length; e < i; ++e)
            M.push(
              ((n = p[e]),
              (a = void 0),
              (o = void 0),
              (r = void 0),
              (s = void 0),
              (l = void 0),
              (d = void 0),
              (u = void 0),
              (a = n._xScale),
              (o = n._yScale || n._scale),
              (r = n._index),
              (s = n._datasetIndex),
              (l = n._chart.getDatasetMeta(s).controller),
              (d = l._getIndexScale()),
              (u = l._getValueScale()),
              {
                xLabel: a ? a.getLabelForIndex(r, s) : '',
                yLabel: o ? o.getLabelForIndex(r, s) : '',
                label: d ? '' + d.getLabelForIndex(r, s) : '',
                value: u ? '' + u.getLabelForIndex(r, s) : '',
                index: r,
                datasetIndex: s,
                x: n._model.x,
                y: n._model.y,
              })
            )
          c.filter &&
            (M = M.filter(function (t) {
              return c.filter(t, m)
            })),
            c.itemSort &&
              (M = M.sort(function (t, e) {
                return c.itemSort(t, e, m)
              })),
            ut.each(M, function (t) {
              k.push(c.callbacks.labelColor.call(h, t, h._chart)),
                w.push(c.callbacks.labelTextColor.call(h, t, h._chart))
            }),
            (g.title = h.getTitle(M, m)),
            (g.beforeBody = h.getBeforeBody(M, m)),
            (g.body = h.getBody(M, m)),
            (g.afterBody = h.getAfterBody(M, m)),
            (g.footer = h.getFooter(M, m)),
            (g.x = y.x),
            (g.y = y.y),
            (g.caretPadding = c.caretPadding),
            (g.labelColors = k),
            (g.labelTextColors = w),
            (g.dataPoints = M),
            (x = (function (t, e) {
              var i = t._chart.ctx,
                n = 2 * e.yPadding,
                a = 0,
                o = e.body,
                r = o.reduce(function (t, e) {
                  return t + e.before.length + e.lines.length + e.after.length
                }, 0)
              r += e.beforeBody.length + e.afterBody.length
              var s = e.title.length,
                l = e.footer.length,
                d = e.titleFontSize,
                u = e.bodyFontSize,
                h = e.footerFontSize
              ;(n += s * d),
                (n += s ? (s - 1) * e.titleSpacing : 0),
                (n += s ? e.titleMarginBottom : 0),
                (n += r * u),
                (n += r ? (r - 1) * e.bodySpacing : 0),
                (n += l ? e.footerMarginTop : 0),
                (n += l * h),
                (n += l ? (l - 1) * e.footerSpacing : 0)
              var c = 0,
                f = function (t) {
                  a = Math.max(a, i.measureText(t).width + c)
                }
              return (
                (i.font = ut.fontString(
                  d,
                  e._titleFontStyle,
                  e._titleFontFamily
                )),
                ut.each(e.title, f),
                (i.font = ut.fontString(
                  u,
                  e._bodyFontStyle,
                  e._bodyFontFamily
                )),
                ut.each(e.beforeBody.concat(e.afterBody), f),
                (c = e.displayColors ? u + 2 : 0),
                ut.each(o, function (t) {
                  ut.each(t.before, f), ut.each(t.lines, f), ut.each(t.after, f)
                }),
                (c = 0),
                (i.font = ut.fontString(
                  h,
                  e._footerFontStyle,
                  e._footerFontFamily
                )),
                ut.each(e.footer, f),
                { width: (a += 2 * e.xPadding), height: n }
              )
            })(this, g)),
            (b = (function (t, e, i, n) {
              var a = t.x,
                o = t.y,
                r = t.caretSize,
                s = t.caretPadding,
                l = t.cornerRadius,
                d = i.xAlign,
                u = i.yAlign,
                h = r + s,
                c = l + s
              return (
                'right' === d
                  ? (a -= e.width)
                  : 'center' === d &&
                    ((a -= e.width / 2) + e.width > n.width &&
                      (a = n.width - e.width),
                    a < 0 && (a = 0)),
                'top' === u
                  ? (o += h)
                  : (o -= 'bottom' === u ? e.height + h : e.height / 2),
                'center' === u
                  ? 'left' === d
                    ? (a += h)
                    : 'right' === d && (a -= h)
                  : 'left' === d
                  ? (a -= c)
                  : 'right' === d && (a += c),
                { x: a, y: o }
              )
            })(
              g,
              x,
              (v = (function (t, e) {
                var i,
                  n,
                  a,
                  o,
                  r,
                  s = t._model,
                  l = t._chart,
                  d = t._chart.chartArea,
                  u = 'center',
                  h = 'center'
                s.y < e.height
                  ? (h = 'top')
                  : s.y > l.height - e.height && (h = 'bottom')
                var c = (d.left + d.right) / 2,
                  f = (d.top + d.bottom) / 2
                'center' === h
                  ? ((i = function (t) {
                      return t <= c
                    }),
                    (n = function (t) {
                      return t > c
                    }))
                  : ((i = function (t) {
                      return t <= e.width / 2
                    }),
                    (n = function (t) {
                      return t >= l.width - e.width / 2
                    })),
                  (a = function (t) {
                    return t + e.width + s.caretSize + s.caretPadding > l.width
                  }),
                  (o = function (t) {
                    return t - e.width - s.caretSize - s.caretPadding < 0
                  }),
                  (r = function (t) {
                    return t <= f ? 'top' : 'bottom'
                  }),
                  i(s.x)
                    ? ((u = 'left'), a(s.x) && ((u = 'center'), (h = r(s.y))))
                    : n(s.x) &&
                      ((u = 'right'), o(s.x) && ((u = 'center'), (h = r(s.y))))
                var g = t._options
                return {
                  xAlign: g.xAlign ? g.xAlign : u,
                  yAlign: g.yAlign ? g.yAlign : h,
                }
              })(this, x)),
              h._chart
            ))
        } else g.opacity = 0
        return (
          (g.xAlign = v.xAlign),
          (g.yAlign = v.yAlign),
          (g.x = b.x),
          (g.y = b.y),
          (g.width = x.width),
          (g.height = x.height),
          (g.caretX = y.x),
          (g.caretY = y.y),
          (h._model = g),
          t && c.custom && c.custom.call(h, g),
          h
        )
      },
      drawCaret: function (t, e) {
        var i = this._chart.ctx,
          n = this._view,
          a = this.getCaretPosition(t, e, n)
        i.lineTo(a.x1, a.y1), i.lineTo(a.x2, a.y2), i.lineTo(a.x3, a.y3)
      },
      getCaretPosition: function (t, e, i) {
        var n,
          a,
          o,
          r,
          s,
          l,
          d = i.caretSize,
          u = i.cornerRadius,
          h = i.xAlign,
          c = i.yAlign,
          f = t.x,
          g = t.y,
          p = e.width,
          m = e.height
        if ('center' === c)
          (s = g + m / 2),
            'left' === h
              ? ((a = (n = f) - d), (o = n), (r = s + d), (l = s - d))
              : ((a = (n = f + p) + d), (o = n), (r = s - d), (l = s + d))
        else if (
          ('left' === h
            ? ((n = (a = f + u + d) - d), (o = a + d))
            : 'right' === h
            ? ((n = (a = f + p - u - d) - d), (o = a + d))
            : ((n = (a = i.caretX) - d), (o = a + d)),
          'top' === c)
        )
          (s = (r = g) - d), (l = r)
        else {
          ;(s = (r = g + m) + d), (l = r)
          var v = o
          ;(o = n), (n = v)
        }
        return { x1: n, x2: a, x3: o, y1: r, y2: s, y3: l }
      },
      drawTitle: function (t, e, i) {
        var n = e.title
        if (n.length) {
          ;(t.x = Ke(e, e._titleAlign)),
            (i.textAlign = e._titleAlign),
            (i.textBaseline = 'top')
          var a,
            o,
            r = e.titleFontSize,
            s = e.titleSpacing
          for (
            i.fillStyle = e.titleFontColor,
              i.font = ut.fontString(r, e._titleFontStyle, e._titleFontFamily),
              a = 0,
              o = n.length;
            a < o;
            ++a
          )
            i.fillText(n[a], t.x, t.y),
              (t.y += r + s),
              a + 1 === n.length && (t.y += e.titleMarginBottom - s)
        }
      },
      drawBody: function (t, e, i) {
        var n,
          a = e.bodyFontSize,
          o = e.bodySpacing,
          r = e._bodyAlign,
          s = e.body,
          l = e.displayColors,
          d = e.labelColors,
          u = 0,
          h = l ? Ke(e, 'left') : 0
        ;(i.textAlign = r),
          (i.textBaseline = 'top'),
          (i.font = ut.fontString(a, e._bodyFontStyle, e._bodyFontFamily)),
          (t.x = Ke(e, r))
        var c = function (e) {
          i.fillText(e, t.x + u, t.y), (t.y += a + o)
        }
        ;(i.fillStyle = e.bodyFontColor),
          ut.each(e.beforeBody, c),
          (u = l && 'right' !== r ? ('center' === r ? a / 2 + 1 : a + 2) : 0),
          ut.each(s, function (o, r) {
            ;(n = e.labelTextColors[r]),
              (i.fillStyle = n),
              ut.each(o.before, c),
              ut.each(o.lines, function (o) {
                l &&
                  ((i.fillStyle = e.legendColorBackground),
                  i.fillRect(h, t.y, a, a),
                  (i.lineWidth = 1),
                  (i.strokeStyle = d[r].borderColor),
                  i.strokeRect(h, t.y, a, a),
                  (i.fillStyle = d[r].backgroundColor),
                  i.fillRect(h + 1, t.y + 1, a - 2, a - 2),
                  (i.fillStyle = n)),
                  c(o)
              }),
              ut.each(o.after, c)
          }),
          (u = 0),
          ut.each(e.afterBody, c),
          (t.y -= o)
      },
      drawFooter: function (t, e, i) {
        var n = e.footer
        n.length &&
          ((t.x = Ke(e, e._footerAlign)),
          (t.y += e.footerMarginTop),
          (i.textAlign = e._footerAlign),
          (i.textBaseline = 'top'),
          (i.fillStyle = e.footerFontColor),
          (i.font = ut.fontString(
            e.footerFontSize,
            e._footerFontStyle,
            e._footerFontFamily
          )),
          ut.each(n, function (n) {
            i.fillText(n, t.x, t.y), (t.y += e.footerFontSize + e.footerSpacing)
          }))
      },
      drawBackground: function (t, e, i, n) {
        ;(i.fillStyle = e.backgroundColor),
          (i.strokeStyle = e.borderColor),
          (i.lineWidth = e.borderWidth)
        var a = e.xAlign,
          o = e.yAlign,
          r = t.x,
          s = t.y,
          l = n.width,
          d = n.height,
          u = e.cornerRadius
        i.beginPath(),
          i.moveTo(r + u, s),
          'top' === o && this.drawCaret(t, n),
          i.lineTo(r + l - u, s),
          i.quadraticCurveTo(r + l, s, r + l, s + u),
          'center' === o && 'right' === a && this.drawCaret(t, n),
          i.lineTo(r + l, s + d - u),
          i.quadraticCurveTo(r + l, s + d, r + l - u, s + d),
          'bottom' === o && this.drawCaret(t, n),
          i.lineTo(r + u, s + d),
          i.quadraticCurveTo(r, s + d, r, s + d - u),
          'center' === o && 'left' === a && this.drawCaret(t, n),
          i.lineTo(r, s + u),
          i.quadraticCurveTo(r, s, r + u, s),
          i.closePath(),
          i.fill(),
          e.borderWidth > 0 && i.stroke()
      },
      draw: function () {
        var t = this._chart.ctx,
          e = this._view
        if (0 !== e.opacity) {
          var i = { width: e.width, height: e.height },
            n = { x: e.x, y: e.y },
            a = Math.abs(e.opacity < 0.001) ? 0 : e.opacity,
            o =
              e.title.length ||
              e.beforeBody.length ||
              e.body.length ||
              e.afterBody.length ||
              e.footer.length
          this._options.enabled &&
            o &&
            (t.save(),
            (t.globalAlpha = a),
            this.drawBackground(n, e, t, i),
            (n.y += e.yPadding),
            this.drawTitle(n, e, t),
            this.drawBody(n, e, t),
            this.drawFooter(n, e, t),
            t.restore())
        }
      },
      handleEvent: function (t) {
        var e,
          i = this,
          n = i._options
        return (
          (i._lastActive = i._lastActive || []),
          'mouseout' === t.type
            ? (i._active = [])
            : (i._active = i._chart.getElementsAtEventForMode(t, n.mode, n)),
          (e = !ut.arrayEquals(i._active, i._lastActive)) &&
            ((i._lastActive = i._active),
            (n.enabled || n.custom) &&
              ((i._eventPosition = { x: t.x, y: t.y }),
              i.update(!0),
              i.pivot())),
          e
        )
      },
    }),
    $e = qe,
    Je = Ze
  Je.positioners = $e
  var Qe = ut.valueOrDefault
  function ti() {
    return ut.merge({}, [].slice.call(arguments), {
      merger: function (t, e, i, n) {
        if ('xAxes' === t || 'yAxes' === t) {
          var a,
            o,
            r,
            s = i[t].length
          for (e[t] || (e[t] = []), a = 0; a < s; ++a)
            (r = i[t][a]),
              (o = Qe(r.type, 'xAxes' === t ? 'category' : 'linear')),
              a >= e[t].length && e[t].push({}),
              !e[t][a].type || (r.type && r.type !== e[t][a].type)
                ? ut.merge(e[t][a], [He.getScaleDefaults(o), r])
                : ut.merge(e[t][a], r)
        } else ut._merger(t, e, i, n)
      },
    })
  }
  function ei() {
    return ut.merge({}, [].slice.call(arguments), {
      merger: function (t, e, i, n) {
        var a = e[t] || {},
          o = i[t]
        'scales' === t
          ? (e[t] = ti(a, o))
          : 'scale' === t
          ? (e[t] = ut.merge(a, [He.getScaleDefaults(o.type), o]))
          : ut._merger(t, e, i, n)
      },
    })
  }
  function ii(t) {
    return 'top' === t || 'bottom' === t
  }
  st._set('global', {
    elements: {},
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    hover: {
      onHover: null,
      mode: 'nearest',
      intersect: !0,
      animationDuration: 400,
    },
    onClick: null,
    maintainAspectRatio: !0,
    responsive: !0,
    responsiveAnimationDuration: 0,
  })
  var ni = function (t, e) {
    return this.construct(t, e), this
  }
  ut.extend(ni.prototype, {
    construct: function (t, e) {
      var i = this
      e = (function (t) {
        var e = ((t = t || {}).data = t.data || {})
        return (
          (e.datasets = e.datasets || []),
          (e.labels = e.labels || []),
          (t.options = ei(st.global, st[t.type], t.options || {})),
          t
        )
      })(e)
      var n = Ve.acquireContext(t, e),
        a = n && n.canvas,
        o = a && a.height,
        r = a && a.width
      ;(i.id = ut.uid()),
        (i.ctx = n),
        (i.canvas = a),
        (i.config = e),
        (i.width = r),
        (i.height = o),
        (i.aspectRatio = o ? r / o : null),
        (i.options = e.options),
        (i._bufferedRender = !1),
        (i.chart = i),
        (i.controller = i),
        (ni.instances[i.id] = i),
        Object.defineProperty(i, 'data', {
          get: function () {
            return i.config.data
          },
          set: function (t) {
            i.config.data = t
          },
        }),
        n && a
          ? (i.initialize(), i.update())
          : console.error(
              "Failed to create chart: can't acquire context from the given item"
            )
    },
    initialize: function () {
      var t = this
      return (
        Ee.notify(t, 'beforeInit'),
        ut.retinaScale(t, t.options.devicePixelRatio),
        t.bindEvents(),
        t.options.responsive && t.resize(!0),
        t.ensureScalesHaveIDs(),
        t.buildOrUpdateScales(),
        t.initToolTip(),
        Ee.notify(t, 'afterInit'),
        t
      )
    },
    clear: function () {
      return ut.canvas.clear(this), this
    },
    stop: function () {
      return bt.cancelAnimation(this), this
    },
    resize: function (t) {
      var e = this,
        i = e.options,
        n = e.canvas,
        a = (i.maintainAspectRatio && e.aspectRatio) || null,
        o = Math.max(0, Math.floor(ut.getMaximumWidth(n))),
        r = Math.max(0, Math.floor(a ? o / a : ut.getMaximumHeight(n)))
      if (
        (e.width !== o || e.height !== r) &&
        ((n.width = e.width = o),
        (n.height = e.height = r),
        (n.style.width = o + 'px'),
        (n.style.height = r + 'px'),
        ut.retinaScale(e, i.devicePixelRatio),
        !t)
      ) {
        var s = { width: o, height: r }
        Ee.notify(e, 'resize', [s]),
          i.onResize && i.onResize(e, s),
          e.stop(),
          e.update({ duration: i.responsiveAnimationDuration })
      }
    },
    ensureScalesHaveIDs: function () {
      var t = this.options,
        e = t.scales || {},
        i = t.scale
      ut.each(e.xAxes, function (t, e) {
        t.id = t.id || 'x-axis-' + e
      }),
        ut.each(e.yAxes, function (t, e) {
          t.id = t.id || 'y-axis-' + e
        }),
        i && (i.id = i.id || 'scale')
    },
    buildOrUpdateScales: function () {
      var t = this,
        e = t.options,
        i = t.scales || {},
        n = [],
        a = Object.keys(i).reduce(function (t, e) {
          return (t[e] = !1), t
        }, {})
      e.scales &&
        (n = n.concat(
          (e.scales.xAxes || []).map(function (t) {
            return { options: t, dtype: 'category', dposition: 'bottom' }
          }),
          (e.scales.yAxes || []).map(function (t) {
            return { options: t, dtype: 'linear', dposition: 'left' }
          })
        )),
        e.scale &&
          n.push({
            options: e.scale,
            dtype: 'radialLinear',
            isDefault: !0,
            dposition: 'chartArea',
          }),
        ut.each(n, function (e) {
          var n = e.options,
            o = n.id,
            r = Qe(n.type, e.dtype)
          ii(n.position) !== ii(e.dposition) && (n.position = e.dposition),
            (a[o] = !0)
          var s = null
          if (o in i && i[o].type === r)
            ((s = i[o]).options = n), (s.ctx = t.ctx), (s.chart = t)
          else {
            var l = He.getScaleConstructor(r)
            if (!l) return
            ;(s = new l({ id: o, type: r, options: n, ctx: t.ctx, chart: t })),
              (i[s.id] = s)
          }
          s.mergeTicksOptions(), e.isDefault && (t.scale = s)
        }),
        ut.each(a, function (t, e) {
          t || delete i[e]
        }),
        (t.scales = i),
        He.addScalesToLayout(this)
    },
    buildOrUpdateControllers: function () {
      var t = this,
        e = []
      return (
        ut.each(
          t.data.datasets,
          function (i, n) {
            var a = t.getDatasetMeta(n),
              o = i.type || t.config.type
            if (
              (a.type &&
                a.type !== o &&
                (t.destroyDatasetMeta(n), (a = t.getDatasetMeta(n))),
              (a.type = o),
              a.controller)
            )
              a.controller.updateIndex(n), a.controller.linkScales()
            else {
              var r = ue[a.type]
              if (void 0 === r)
                throw new Error('"' + a.type + '" is not a chart type.')
              ;(a.controller = new r(t, n)), e.push(a.controller)
            }
          },
          t
        ),
        e
      )
    },
    resetElements: function () {
      var t = this
      ut.each(
        t.data.datasets,
        function (e, i) {
          t.getDatasetMeta(i).controller.reset()
        },
        t
      )
    },
    reset: function () {
      this.resetElements(), this.tooltip.initialize()
    },
    update: function (t) {
      var e,
        i,
        n = this
      if (
        ((t && 'object' == typeof t) ||
          (t = { duration: t, lazy: arguments[1] }),
        (i = (e = n).options),
        ut.each(e.scales, function (t) {
          ke.removeBox(e, t)
        }),
        (i = ei(st.global, st[e.config.type], i)),
        (e.options = e.config.options = i),
        e.ensureScalesHaveIDs(),
        e.buildOrUpdateScales(),
        (e.tooltip._options = i.tooltips),
        e.tooltip.initialize(),
        Ee._invalidate(n),
        !1 !== Ee.notify(n, 'beforeUpdate'))
      ) {
        n.tooltip._data = n.data
        var a = n.buildOrUpdateControllers()
        ut.each(
          n.data.datasets,
          function (t, e) {
            n.getDatasetMeta(e).controller.buildOrUpdateElements()
          },
          n
        ),
          n.updateLayout(),
          n.options.animation &&
            n.options.animation.duration &&
            ut.each(a, function (t) {
              t.reset()
            }),
          n.updateDatasets(),
          n.tooltip.initialize(),
          (n.lastActive = []),
          Ee.notify(n, 'afterUpdate'),
          n._bufferedRender
            ? (n._bufferedRequest = {
                duration: t.duration,
                easing: t.easing,
                lazy: t.lazy,
              })
            : n.render(t)
      }
    },
    updateLayout: function () {
      !1 !== Ee.notify(this, 'beforeLayout') &&
        (ke.update(this, this.width, this.height),
        Ee.notify(this, 'afterScaleUpdate'),
        Ee.notify(this, 'afterLayout'))
    },
    updateDatasets: function () {
      if (!1 !== Ee.notify(this, 'beforeDatasetsUpdate')) {
        for (var t = 0, e = this.data.datasets.length; t < e; ++t)
          this.updateDataset(t)
        Ee.notify(this, 'afterDatasetsUpdate')
      }
    },
    updateDataset: function (t) {
      var e = this.getDatasetMeta(t),
        i = { meta: e, index: t }
      !1 !== Ee.notify(this, 'beforeDatasetUpdate', [i]) &&
        (e.controller.update(), Ee.notify(this, 'afterDatasetUpdate', [i]))
    },
    render: function (t) {
      var e = this
      ;(t && 'object' == typeof t) || (t = { duration: t, lazy: arguments[1] })
      var i = e.options.animation,
        n = Qe(t.duration, i && i.duration),
        a = t.lazy
      if (!1 !== Ee.notify(e, 'beforeRender')) {
        var o = function (t) {
          Ee.notify(e, 'afterRender'), ut.callback(i && i.onComplete, [t], e)
        }
        if (i && n) {
          var r = new vt({
            numSteps: n / 16.66,
            easing: t.easing || i.easing,
            render: function (t, e) {
              var i = ut.easing.effects[e.easing],
                n = e.currentStep,
                a = n / e.numSteps
              t.draw(i(a), a, n)
            },
            onAnimationProgress: i.onProgress,
            onAnimationComplete: o,
          })
          bt.addAnimation(e, r, n, a)
        } else e.draw(), o(new vt({ numSteps: 0, chart: e }))
        return e
      }
    },
    draw: function (t) {
      var e = this
      e.clear(),
        ut.isNullOrUndef(t) && (t = 1),
        e.transition(t),
        e.width <= 0 ||
          e.height <= 0 ||
          (!1 !== Ee.notify(e, 'beforeDraw', [t]) &&
            (ut.each(
              e.boxes,
              function (t) {
                t.draw(e.chartArea)
              },
              e
            ),
            e.drawDatasets(t),
            e._drawTooltip(t),
            Ee.notify(e, 'afterDraw', [t])))
    },
    transition: function (t) {
      for (var e = 0, i = (this.data.datasets || []).length; e < i; ++e)
        this.isDatasetVisible(e) &&
          this.getDatasetMeta(e).controller.transition(t)
      this.tooltip.transition(t)
    },
    drawDatasets: function (t) {
      var e = this
      if (!1 !== Ee.notify(e, 'beforeDatasetsDraw', [t])) {
        for (var i = (e.data.datasets || []).length - 1; i >= 0; --i)
          e.isDatasetVisible(i) && e.drawDataset(i, t)
        Ee.notify(e, 'afterDatasetsDraw', [t])
      }
    },
    drawDataset: function (t, e) {
      var i = this.getDatasetMeta(t),
        n = { meta: i, index: t, easingValue: e }
      !1 !== Ee.notify(this, 'beforeDatasetDraw', [n]) &&
        (i.controller.draw(e), Ee.notify(this, 'afterDatasetDraw', [n]))
    },
    _drawTooltip: function (t) {
      var e = this.tooltip,
        i = { tooltip: e, easingValue: t }
      !1 !== Ee.notify(this, 'beforeTooltipDraw', [i]) &&
        (e.draw(), Ee.notify(this, 'afterTooltipDraw', [i]))
    },
    getElementAtEvent: function (t) {
      return ve.modes.single(this, t)
    },
    getElementsAtEvent: function (t) {
      return ve.modes.label(this, t, { intersect: !0 })
    },
    getElementsAtXAxis: function (t) {
      return ve.modes['x-axis'](this, t, { intersect: !0 })
    },
    getElementsAtEventForMode: function (t, e, i) {
      var n = ve.modes[e]
      return 'function' == typeof n ? n(this, t, i) : []
    },
    getDatasetAtEvent: function (t) {
      return ve.modes.dataset(this, t, { intersect: !0 })
    },
    getDatasetMeta: function (t) {
      var e = this.data.datasets[t]
      e._meta || (e._meta = {})
      var i = e._meta[this.id]
      return (
        i ||
          (i = e._meta[this.id] =
            {
              type: null,
              data: [],
              dataset: null,
              controller: null,
              hidden: null,
              xAxisID: null,
              yAxisID: null,
            }),
        i
      )
    },
    getVisibleDatasetCount: function () {
      for (var t = 0, e = 0, i = this.data.datasets.length; e < i; ++e)
        this.isDatasetVisible(e) && t++
      return t
    },
    isDatasetVisible: function (t) {
      var e = this.getDatasetMeta(t)
      return 'boolean' == typeof e.hidden
        ? !e.hidden
        : !this.data.datasets[t].hidden
    },
    generateLegend: function () {
      return this.options.legendCallback(this)
    },
    destroyDatasetMeta: function (t) {
      var e = this.id,
        i = this.data.datasets[t],
        n = i._meta && i._meta[e]
      n && (n.controller.destroy(), delete i._meta[e])
    },
    destroy: function () {
      var t,
        e,
        i = this,
        n = i.canvas
      for (i.stop(), t = 0, e = i.data.datasets.length; t < e; ++t)
        i.destroyDatasetMeta(t)
      n &&
        (i.unbindEvents(),
        ut.canvas.clear(i),
        Ve.releaseContext(i.ctx),
        (i.canvas = null),
        (i.ctx = null)),
        Ee.notify(i, 'destroy'),
        delete ni.instances[i.id]
    },
    toBase64Image: function () {
      return this.canvas.toDataURL.apply(this.canvas, arguments)
    },
    initToolTip: function () {
      var t = this
      t.tooltip = new Je(
        {
          _chart: t,
          _chartInstance: t,
          _data: t.data,
          _options: t.options.tooltips,
        },
        t
      )
    },
    bindEvents: function () {
      var t = this,
        e = (t._listeners = {}),
        i = function () {
          t.eventHandler.apply(t, arguments)
        }
      ut.each(t.options.events, function (n) {
        Ve.addEventListener(t, n, i), (e[n] = i)
      }),
        t.options.responsive &&
          ((i = function () {
            t.resize()
          }),
          Ve.addEventListener(t, 'resize', i),
          (e.resize = i))
    },
    unbindEvents: function () {
      var t = this,
        e = t._listeners
      e &&
        (delete t._listeners,
        ut.each(e, function (e, i) {
          Ve.removeEventListener(t, i, e)
        }))
    },
    updateHoverStyle: function (t, e, i) {
      var n,
        a,
        o,
        r = i ? 'setHoverStyle' : 'removeHoverStyle'
      for (a = 0, o = t.length; a < o; ++a)
        (n = t[a]) && this.getDatasetMeta(n._datasetIndex).controller[r](n)
    },
    eventHandler: function (t) {
      var e = this,
        i = e.tooltip
      if (!1 !== Ee.notify(e, 'beforeEvent', [t])) {
        ;(e._bufferedRender = !0), (e._bufferedRequest = null)
        var n = e.handleEvent(t)
        i && (n = i._start ? i.handleEvent(t) : n | i.handleEvent(t)),
          Ee.notify(e, 'afterEvent', [t])
        var a = e._bufferedRequest
        return (
          a
            ? e.render(a)
            : n &&
              !e.animating &&
              (e.stop(),
              e.render({
                duration: e.options.hover.animationDuration,
                lazy: !0,
              })),
          (e._bufferedRender = !1),
          (e._bufferedRequest = null),
          e
        )
      }
    },
    handleEvent: function (t) {
      var e,
        i = this,
        n = i.options || {},
        a = n.hover
      return (
        (i.lastActive = i.lastActive || []),
        'mouseout' === t.type
          ? (i.active = [])
          : (i.active = i.getElementsAtEventForMode(t, a.mode, a)),
        ut.callback(n.onHover || n.hover.onHover, [t.native, i.active], i),
        ('mouseup' !== t.type && 'click' !== t.type) ||
          (n.onClick && n.onClick.call(i, t.native, i.active)),
        i.lastActive.length && i.updateHoverStyle(i.lastActive, a.mode, !1),
        i.active.length && a.mode && i.updateHoverStyle(i.active, a.mode, !0),
        (e = !ut.arrayEquals(i.active, i.lastActive)),
        (i.lastActive = i.active),
        e
      )
    },
  }),
    (ni.instances = {})
  var ai = ni
  ;(ni.Controller = ni),
    (ni.types = {}),
    (ut.configMerge = ei),
    (ut.scaleMerge = ti)
  function oi() {
    throw new Error(
      'This method is not implemented: either no adapter can be found or an incomplete integration was provided.'
    )
  }
  function ri(t) {
    this.options = t || {}
  }
  ut.extend(ri.prototype, {
    formats: oi,
    parse: oi,
    format: oi,
    add: oi,
    diff: oi,
    startOf: oi,
    endOf: oi,
    _create: function (t) {
      return t
    },
  }),
    (ri.override = function (t) {
      ut.extend(ri.prototype, t)
    })
  var si = { _date: ri },
    li = {
      formatters: {
        values: function (t) {
          return ut.isArray(t) ? t : '' + t
        },
        linear: function (t, e, i) {
          var n = i.length > 3 ? i[2] - i[1] : i[1] - i[0]
          Math.abs(n) > 1 && t !== Math.floor(t) && (n = t - Math.floor(t))
          var a = ut.log10(Math.abs(n)),
            o = ''
          if (0 !== t)
            if (Math.max(Math.abs(i[0]), Math.abs(i[i.length - 1])) < 1e-4) {
              var r = ut.log10(Math.abs(t))
              o = t.toExponential(Math.floor(r) - Math.floor(a))
            } else {
              var s = -1 * Math.floor(a)
              ;(s = Math.max(Math.min(s, 20), 0)), (o = t.toFixed(s))
            }
          else o = '0'
          return o
        },
        logarithmic: function (t, e, i) {
          var n = t / Math.pow(10, Math.floor(ut.log10(t)))
          return 0 === t
            ? '0'
            : 1 === n || 2 === n || 5 === n || 0 === e || e === i.length - 1
            ? t.toExponential()
            : ''
        },
      },
    },
    di = ut.valueOrDefault,
    ui = ut.valueAtIndexOrDefault
  function hi(t) {
    var e,
      i,
      n = []
    for (e = 0, i = t.length; e < i; ++e) n.push(t[e].label)
    return n
  }
  function ci(t, e, i) {
    return ut.isArray(e) ? ut.longestText(t, i, e) : t.measureText(e).width
  }
  st._set('scale', {
    display: !0,
    position: 'left',
    offset: !1,
    gridLines: {
      display: !0,
      color: 'rgba(0, 0, 0, 0.1)',
      lineWidth: 1,
      drawBorder: !0,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickMarkLength: 10,
      zeroLineWidth: 1,
      zeroLineColor: 'rgba(0,0,0,0.25)',
      zeroLineBorderDash: [],
      zeroLineBorderDashOffset: 0,
      offsetGridLines: !1,
      borderDash: [],
      borderDashOffset: 0,
    },
    scaleLabel: {
      display: !1,
      labelString: '',
      padding: { top: 4, bottom: 4 },
    },
    ticks: {
      beginAtZero: !1,
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      padding: 0,
      reverse: !1,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 0,
      labelOffset: 0,
      callback: li.formatters.values,
      minor: {},
      major: {},
    },
  })
  var fi = pt.extend({
      getPadding: function () {
        return {
          left: this.paddingLeft || 0,
          top: this.paddingTop || 0,
          right: this.paddingRight || 0,
          bottom: this.paddingBottom || 0,
        }
      },
      getTicks: function () {
        return this._ticks
      },
      mergeTicksOptions: function () {
        var t = this.options.ticks
        for (var e in (!1 === t.minor && (t.minor = { display: !1 }),
        !1 === t.major && (t.major = { display: !1 }),
        t))
          'major' !== e &&
            'minor' !== e &&
            (void 0 === t.minor[e] && (t.minor[e] = t[e]),
            void 0 === t.major[e] && (t.major[e] = t[e]))
      },
      beforeUpdate: function () {
        ut.callback(this.options.beforeUpdate, [this])
      },
      update: function (t, e, i) {
        var n,
          a,
          o,
          r,
          s,
          l,
          d = this
        for (
          d.beforeUpdate(),
            d.maxWidth = t,
            d.maxHeight = e,
            d.margins = ut.extend({ left: 0, right: 0, top: 0, bottom: 0 }, i),
            d._maxLabelLines = 0,
            d.longestLabelWidth = 0,
            d.longestTextCache = d.longestTextCache || {},
            d.beforeSetDimensions(),
            d.setDimensions(),
            d.afterSetDimensions(),
            d.beforeDataLimits(),
            d.determineDataLimits(),
            d.afterDataLimits(),
            d.beforeBuildTicks(),
            s = d.buildTicks() || [],
            s = d.afterBuildTicks(s) || s,
            d.beforeTickToLabelConversion(),
            o = d.convertTicksToLabels(s) || d.ticks,
            d.afterTickToLabelConversion(),
            d.ticks = o,
            n = 0,
            a = o.length;
          n < a;
          ++n
        )
          (r = o[n]),
            (l = s[n]) ? (l.label = r) : s.push((l = { label: r, major: !1 }))
        return (
          (d._ticks = s),
          d.beforeCalculateTickRotation(),
          d.calculateTickRotation(),
          d.afterCalculateTickRotation(),
          d.beforeFit(),
          d.fit(),
          d.afterFit(),
          d.afterUpdate(),
          d.minSize
        )
      },
      afterUpdate: function () {
        ut.callback(this.options.afterUpdate, [this])
      },
      beforeSetDimensions: function () {
        ut.callback(this.options.beforeSetDimensions, [this])
      },
      setDimensions: function () {
        var t = this
        t.isHorizontal()
          ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width))
          : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
          (t.paddingLeft = 0),
          (t.paddingTop = 0),
          (t.paddingRight = 0),
          (t.paddingBottom = 0)
      },
      afterSetDimensions: function () {
        ut.callback(this.options.afterSetDimensions, [this])
      },
      beforeDataLimits: function () {
        ut.callback(this.options.beforeDataLimits, [this])
      },
      determineDataLimits: ut.noop,
      afterDataLimits: function () {
        ut.callback(this.options.afterDataLimits, [this])
      },
      beforeBuildTicks: function () {
        ut.callback(this.options.beforeBuildTicks, [this])
      },
      buildTicks: ut.noop,
      afterBuildTicks: function (t) {
        var e = this
        return ut.isArray(t) && t.length
          ? ut.callback(e.options.afterBuildTicks, [e, t])
          : ((e.ticks =
              ut.callback(e.options.afterBuildTicks, [e, e.ticks]) || e.ticks),
            t)
      },
      beforeTickToLabelConversion: function () {
        ut.callback(this.options.beforeTickToLabelConversion, [this])
      },
      convertTicksToLabels: function () {
        var t = this.options.ticks
        this.ticks = this.ticks.map(t.userCallback || t.callback, this)
      },
      afterTickToLabelConversion: function () {
        ut.callback(this.options.afterTickToLabelConversion, [this])
      },
      beforeCalculateTickRotation: function () {
        ut.callback(this.options.beforeCalculateTickRotation, [this])
      },
      calculateTickRotation: function () {
        var t = this,
          e = t.ctx,
          i = t.options.ticks,
          n = hi(t._ticks),
          a = ut.options._parseFont(i)
        e.font = a.string
        var o = i.minRotation || 0
        if (n.length && t.options.display && t.isHorizontal())
          for (
            var r,
              s = ut.longestText(e, a.string, n, t.longestTextCache),
              l = s,
              d = t.getPixelForTick(1) - t.getPixelForTick(0) - 6;
            l > d && o < i.maxRotation;

          ) {
            var u = ut.toRadians(o)
            if (((r = Math.cos(u)), Math.sin(u) * s > t.maxHeight)) {
              o--
              break
            }
            o++, (l = r * s)
          }
        t.labelRotation = o
      },
      afterCalculateTickRotation: function () {
        ut.callback(this.options.afterCalculateTickRotation, [this])
      },
      beforeFit: function () {
        ut.callback(this.options.beforeFit, [this])
      },
      fit: function () {
        var t = this,
          e = (t.minSize = { width: 0, height: 0 }),
          i = hi(t._ticks),
          n = t.options,
          a = n.ticks,
          o = n.scaleLabel,
          r = n.gridLines,
          s = t._isVisible(),
          l = n.position,
          d = t.isHorizontal(),
          u = ut.options._parseFont,
          h = u(a),
          c = n.gridLines.tickMarkLength
        if (
          ((e.width = d
            ? t.isFullWidth()
              ? t.maxWidth - t.margins.left - t.margins.right
              : t.maxWidth
            : s && r.drawTicks
            ? c
            : 0),
          (e.height = d ? (s && r.drawTicks ? c : 0) : t.maxHeight),
          o.display && s)
        ) {
          var f = u(o),
            g = ut.options.toPadding(o.padding),
            p = f.lineHeight + g.height
          d ? (e.height += p) : (e.width += p)
        }
        if (a.display && s) {
          var m = ut.longestText(t.ctx, h.string, i, t.longestTextCache),
            v = ut.numberOfLabelLines(i),
            b = 0.5 * h.size,
            x = t.options.ticks.padding
          if (((t._maxLabelLines = v), (t.longestLabelWidth = m), d)) {
            var y = ut.toRadians(t.labelRotation),
              k = Math.cos(y),
              w = Math.sin(y) * m + h.lineHeight * v + b
            ;(e.height = Math.min(t.maxHeight, e.height + w + x)),
              (t.ctx.font = h.string)
            var M,
              _,
              C = ci(t.ctx, i[0], h.string),
              S = ci(t.ctx, i[i.length - 1], h.string),
              P = t.getPixelForTick(0) - t.left,
              I = t.right - t.getPixelForTick(i.length - 1)
            0 !== t.labelRotation
              ? ((M = 'bottom' === l ? k * C : k * b),
                (_ = 'bottom' === l ? k * b : k * S))
              : ((M = C / 2), (_ = S / 2)),
              (t.paddingLeft = Math.max(M - P, 0) + 3),
              (t.paddingRight = Math.max(_ - I, 0) + 3)
          } else
            a.mirror ? (m = 0) : (m += x + b),
              (e.width = Math.min(t.maxWidth, e.width + m)),
              (t.paddingTop = h.size / 2),
              (t.paddingBottom = h.size / 2)
        }
        t.handleMargins(), (t.width = e.width), (t.height = e.height)
      },
      handleMargins: function () {
        var t = this
        t.margins &&
          ((t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0)),
          (t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0)),
          (t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0)),
          (t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0)))
      },
      afterFit: function () {
        ut.callback(this.options.afterFit, [this])
      },
      isHorizontal: function () {
        return (
          'top' === this.options.position || 'bottom' === this.options.position
        )
      },
      isFullWidth: function () {
        return this.options.fullWidth
      },
      getRightValue: function (t) {
        if (ut.isNullOrUndef(t)) return NaN
        if (('number' == typeof t || t instanceof Number) && !isFinite(t))
          return NaN
        if (t)
          if (this.isHorizontal()) {
            if (void 0 !== t.x) return this.getRightValue(t.x)
          } else if (void 0 !== t.y) return this.getRightValue(t.y)
        return t
      },
      getLabelForIndex: ut.noop,
      getPixelForValue: ut.noop,
      getValueForPixel: ut.noop,
      getPixelForTick: function (t) {
        var e = this,
          i = e.options.offset
        if (e.isHorizontal()) {
          var n =
              (e.width - (e.paddingLeft + e.paddingRight)) /
              Math.max(e._ticks.length - (i ? 0 : 1), 1),
            a = n * t + e.paddingLeft
          i && (a += n / 2)
          var o = e.left + a
          return (o += e.isFullWidth() ? e.margins.left : 0)
        }
        var r = e.height - (e.paddingTop + e.paddingBottom)
        return e.top + t * (r / (e._ticks.length - 1))
      },
      getPixelForDecimal: function (t) {
        var e = this
        if (e.isHorizontal()) {
          var i =
              (e.width - (e.paddingLeft + e.paddingRight)) * t + e.paddingLeft,
            n = e.left + i
          return (n += e.isFullWidth() ? e.margins.left : 0)
        }
        return e.top + t * e.height
      },
      getBasePixel: function () {
        return this.getPixelForValue(this.getBaseValue())
      },
      getBaseValue: function () {
        var t = this.min,
          e = this.max
        return this.beginAtZero
          ? 0
          : t < 0 && e < 0
          ? e
          : t > 0 && e > 0
          ? t
          : 0
      },
      _autoSkip: function (t) {
        var e,
          i,
          n = this,
          a = n.isHorizontal(),
          o = n.options.ticks.minor,
          r = t.length,
          s = !1,
          l = o.maxTicksLimit,
          d = n._tickSize() * (r - 1),
          u = a
            ? n.width - (n.paddingLeft + n.paddingRight)
            : n.height - (n.paddingTop + n.PaddingBottom),
          h = []
        for (
          d > u && (s = 1 + Math.floor(d / u)),
            r > l && (s = Math.max(s, 1 + Math.floor(r / l))),
            e = 0;
          e < r;
          e++
        )
          (i = t[e]), s > 1 && e % s > 0 && delete i.label, h.push(i)
        return h
      },
      _tickSize: function () {
        var t = this,
          e = t.isHorizontal(),
          i = t.options.ticks.minor,
          n = ut.toRadians(t.labelRotation),
          a = Math.abs(Math.cos(n)),
          o = Math.abs(Math.sin(n)),
          r = i.autoSkipPadding || 0,
          s = t.longestLabelWidth + r || 0,
          l = ut.options._parseFont(i),
          d = t._maxLabelLines * l.lineHeight + r || 0
        return e
          ? d * a > s * o
            ? s / a
            : d / o
          : d * o < s * a
          ? d / a
          : s / o
      },
      _isVisible: function () {
        var t,
          e,
          i,
          n = this.chart,
          a = this.options.display
        if ('auto' !== a) return !!a
        for (t = 0, e = n.data.datasets.length; t < e; ++t)
          if (
            n.isDatasetVisible(t) &&
            ((i = n.getDatasetMeta(t)).xAxisID === this.id ||
              i.yAxisID === this.id)
          )
            return !0
        return !1
      },
      draw: function (t) {
        var e = this,
          i = e.options
        if (e._isVisible()) {
          var n,
            a,
            o,
            r = e.chart,
            s = e.ctx,
            l = st.global.defaultFontColor,
            d = i.ticks.minor,
            u = i.ticks.major || d,
            h = i.gridLines,
            c = i.scaleLabel,
            f = i.position,
            g = 0 !== e.labelRotation,
            p = d.mirror,
            m = e.isHorizontal(),
            v = ut.options._parseFont,
            b =
              d.display && d.autoSkip
                ? e._autoSkip(e.getTicks())
                : e.getTicks(),
            x = di(d.fontColor, l),
            y = v(d),
            k = y.lineHeight,
            w = di(u.fontColor, l),
            M = v(u),
            _ = d.padding,
            C = d.labelOffset,
            S = h.drawTicks ? h.tickMarkLength : 0,
            P = di(c.fontColor, l),
            I = v(c),
            A = ut.options.toPadding(c.padding),
            D = ut.toRadians(e.labelRotation),
            T = [],
            F = h.drawBorder ? ui(h.lineWidth, 0, 0) : 0,
            L = ut._alignPixel
          'top' === f
            ? ((n = L(r, e.bottom, F)), (a = e.bottom - S), (o = n - F / 2))
            : 'bottom' === f
            ? ((n = L(r, e.top, F)), (a = n + F / 2), (o = e.top + S))
            : 'left' === f
            ? ((n = L(r, e.right, F)), (a = e.right - S), (o = n - F / 2))
            : ((n = L(r, e.left, F)), (a = n + F / 2), (o = e.left + S))
          if (
            (ut.each(b, function (n, s) {
              if (!ut.isNullOrUndef(n.label)) {
                var l,
                  d,
                  u,
                  c,
                  v,
                  b,
                  x,
                  y,
                  w,
                  M,
                  P,
                  I,
                  A,
                  R,
                  O,
                  z,
                  B = n.label
                s === e.zeroLineIndex && i.offset === h.offsetGridLines
                  ? ((l = h.zeroLineWidth),
                    (d = h.zeroLineColor),
                    (u = h.zeroLineBorderDash || []),
                    (c = h.zeroLineBorderDashOffset || 0))
                  : ((l = ui(h.lineWidth, s)),
                    (d = ui(h.color, s)),
                    (u = h.borderDash || []),
                    (c = h.borderDashOffset || 0))
                var N = ut.isArray(B) ? B.length : 1,
                  W = (function (t, e, i) {
                    var n = t.getPixelForTick(e)
                    return (
                      i &&
                        (1 === t.getTicks().length
                          ? (n -= t.isHorizontal()
                              ? Math.max(n - t.left, t.right - n)
                              : Math.max(n - t.top, t.bottom - n))
                          : (n -=
                              0 === e
                                ? (t.getPixelForTick(1) - n) / 2
                                : (n - t.getPixelForTick(e - 1)) / 2)),
                      n
                    )
                  })(e, s, h.offsetGridLines)
                if (m) {
                  var V = S + _
                  W < e.left - 1e-7 && (d = 'rgba(0,0,0,0)'),
                    (v = x = w = P = L(r, W, l)),
                    (b = a),
                    (y = o),
                    (A = e.getPixelForTick(s) + C),
                    'top' === f
                      ? ((M = L(r, t.top, F) + F / 2),
                        (I = t.bottom),
                        (O = ((g ? 1 : 0.5) - N) * k),
                        (z = g ? 'left' : 'center'),
                        (R = e.bottom - V))
                      : ((M = t.top),
                        (I = L(r, t.bottom, F) - F / 2),
                        (O = (g ? 0 : 0.5) * k),
                        (z = g ? 'right' : 'center'),
                        (R = e.top + V))
                } else {
                  var E = (p ? 0 : S) + _
                  W < e.top - 1e-7 && (d = 'rgba(0,0,0,0)'),
                    (v = a),
                    (x = o),
                    (b = y = M = I = L(r, W, l)),
                    (R = e.getPixelForTick(s) + C),
                    (O = ((1 - N) * k) / 2),
                    'left' === f
                      ? ((w = L(r, t.left, F) + F / 2),
                        (P = t.right),
                        (z = p ? 'left' : 'right'),
                        (A = e.right - E))
                      : ((w = t.left),
                        (P = L(r, t.right, F) - F / 2),
                        (z = p ? 'right' : 'left'),
                        (A = e.left + E))
                }
                T.push({
                  tx1: v,
                  ty1: b,
                  tx2: x,
                  ty2: y,
                  x1: w,
                  y1: M,
                  x2: P,
                  y2: I,
                  labelX: A,
                  labelY: R,
                  glWidth: l,
                  glColor: d,
                  glBorderDash: u,
                  glBorderDashOffset: c,
                  rotation: -1 * D,
                  label: B,
                  major: n.major,
                  textOffset: O,
                  textAlign: z,
                })
              }
            }),
            ut.each(T, function (t) {
              var e = t.glWidth,
                i = t.glColor
              if (
                (h.display &&
                  e &&
                  i &&
                  (s.save(),
                  (s.lineWidth = e),
                  (s.strokeStyle = i),
                  s.setLineDash &&
                    (s.setLineDash(t.glBorderDash),
                    (s.lineDashOffset = t.glBorderDashOffset)),
                  s.beginPath(),
                  h.drawTicks &&
                    (s.moveTo(t.tx1, t.ty1), s.lineTo(t.tx2, t.ty2)),
                  h.drawOnChartArea &&
                    (s.moveTo(t.x1, t.y1), s.lineTo(t.x2, t.y2)),
                  s.stroke(),
                  s.restore()),
                d.display)
              ) {
                s.save(),
                  s.translate(t.labelX, t.labelY),
                  s.rotate(t.rotation),
                  (s.font = t.major ? M.string : y.string),
                  (s.fillStyle = t.major ? w : x),
                  (s.textBaseline = 'middle'),
                  (s.textAlign = t.textAlign)
                var n = t.label,
                  a = t.textOffset
                if (ut.isArray(n))
                  for (var o = 0; o < n.length; ++o)
                    s.fillText('' + n[o], 0, a), (a += k)
                else s.fillText(n, 0, a)
                s.restore()
              }
            }),
            c.display)
          ) {
            var R,
              O,
              z = 0,
              B = I.lineHeight / 2
            if (m)
              (R = e.left + (e.right - e.left) / 2),
                (O =
                  'bottom' === f ? e.bottom - B - A.bottom : e.top + B + A.top)
            else {
              var N = 'left' === f
              ;(R = N ? e.left + B + A.top : e.right - B - A.top),
                (O = e.top + (e.bottom - e.top) / 2),
                (z = N ? -0.5 * Math.PI : 0.5 * Math.PI)
            }
            s.save(),
              s.translate(R, O),
              s.rotate(z),
              (s.textAlign = 'center'),
              (s.textBaseline = 'middle'),
              (s.fillStyle = P),
              (s.font = I.string),
              s.fillText(c.labelString, 0, 0),
              s.restore()
          }
          if (F) {
            var W,
              V,
              E,
              H,
              j = F,
              q = ui(h.lineWidth, b.length - 1, 0)
            m
              ? ((W = L(r, e.left, j) - j / 2),
                (V = L(r, e.right, q) + q / 2),
                (E = H = n))
              : ((E = L(r, e.top, j) - j / 2),
                (H = L(r, e.bottom, q) + q / 2),
                (W = V = n)),
              (s.lineWidth = F),
              (s.strokeStyle = ui(h.color, 0)),
              s.beginPath(),
              s.moveTo(W, E),
              s.lineTo(V, H),
              s.stroke()
          }
        }
      },
    }),
    gi = fi.extend({
      getLabels: function () {
        var t = this.chart.data
        return (
          this.options.labels ||
          (this.isHorizontal() ? t.xLabels : t.yLabels) ||
          t.labels
        )
      },
      determineDataLimits: function () {
        var t,
          e = this,
          i = e.getLabels()
        ;(e.minIndex = 0),
          (e.maxIndex = i.length - 1),
          void 0 !== e.options.ticks.min &&
            ((t = i.indexOf(e.options.ticks.min)),
            (e.minIndex = -1 !== t ? t : e.minIndex)),
          void 0 !== e.options.ticks.max &&
            ((t = i.indexOf(e.options.ticks.max)),
            (e.maxIndex = -1 !== t ? t : e.maxIndex)),
          (e.min = i[e.minIndex]),
          (e.max = i[e.maxIndex])
      },
      buildTicks: function () {
        var t = this,
          e = t.getLabels()
        t.ticks =
          0 === t.minIndex && t.maxIndex === e.length - 1
            ? e
            : e.slice(t.minIndex, t.maxIndex + 1)
      },
      getLabelForIndex: function (t, e) {
        var i = this,
          n = i.chart
        return n.getDatasetMeta(e).controller._getValueScaleId() === i.id
          ? i.getRightValue(n.data.datasets[e].data[t])
          : i.ticks[t - i.minIndex]
      },
      getPixelForValue: function (t, e) {
        var i,
          n = this,
          a = n.options.offset,
          o = Math.max(n.maxIndex + 1 - n.minIndex - (a ? 0 : 1), 1)
        if (
          (null != t && (i = n.isHorizontal() ? t.x : t.y),
          void 0 !== i || (void 0 !== t && isNaN(e)))
        ) {
          t = i || t
          var r = n.getLabels().indexOf(t)
          e = -1 !== r ? r : e
        }
        if (n.isHorizontal()) {
          var s = n.width / o,
            l = s * (e - n.minIndex)
          return a && (l += s / 2), n.left + l
        }
        var d = n.height / o,
          u = d * (e - n.minIndex)
        return a && (u += d / 2), n.top + u
      },
      getPixelForTick: function (t) {
        return this.getPixelForValue(this.ticks[t], t + this.minIndex, null)
      },
      getValueForPixel: function (t) {
        var e = this,
          i = e.options.offset,
          n = Math.max(e._ticks.length - (i ? 0 : 1), 1),
          a = e.isHorizontal(),
          o = (a ? e.width : e.height) / n
        return (
          (t -= a ? e.left : e.top),
          i && (t -= o / 2),
          (t <= 0 ? 0 : Math.round(t / o)) + e.minIndex
        )
      },
      getBasePixel: function () {
        return this.bottom
      },
    }),
    pi = { position: 'bottom' }
  gi._defaults = pi
  var mi = ut.noop,
    vi = ut.isNullOrUndef
  var bi = fi.extend({
      getRightValue: function (t) {
        return 'string' == typeof t
          ? +t
          : fi.prototype.getRightValue.call(this, t)
      },
      handleTickRangeOptions: function () {
        var t = this,
          e = t.options.ticks
        if (e.beginAtZero) {
          var i = ut.sign(t.min),
            n = ut.sign(t.max)
          i < 0 && n < 0 ? (t.max = 0) : i > 0 && n > 0 && (t.min = 0)
        }
        var a = void 0 !== e.min || void 0 !== e.suggestedMin,
          o = void 0 !== e.max || void 0 !== e.suggestedMax
        void 0 !== e.min
          ? (t.min = e.min)
          : void 0 !== e.suggestedMin &&
            (null === t.min
              ? (t.min = e.suggestedMin)
              : (t.min = Math.min(t.min, e.suggestedMin))),
          void 0 !== e.max
            ? (t.max = e.max)
            : void 0 !== e.suggestedMax &&
              (null === t.max
                ? (t.max = e.suggestedMax)
                : (t.max = Math.max(t.max, e.suggestedMax))),
          a !== o &&
            t.min >= t.max &&
            (a ? (t.max = t.min + 1) : (t.min = t.max - 1)),
          t.min === t.max && (t.max++, e.beginAtZero || t.min--)
      },
      getTickLimit: function () {
        var t,
          e = this.options.ticks,
          i = e.stepSize,
          n = e.maxTicksLimit
        return (
          i
            ? (t = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1)
            : ((t = this._computeTickLimit()), (n = n || 11)),
          n && (t = Math.min(n, t)),
          t
        )
      },
      _computeTickLimit: function () {
        return Number.POSITIVE_INFINITY
      },
      handleDirectionalChanges: mi,
      buildTicks: function () {
        var t = this,
          e = t.options.ticks,
          i = t.getTickLimit(),
          n = {
            maxTicks: (i = Math.max(2, i)),
            min: e.min,
            max: e.max,
            precision: e.precision,
            stepSize: ut.valueOrDefault(e.fixedStepSize, e.stepSize),
          },
          a = (t.ticks = (function (t, e) {
            var i,
              n,
              a,
              o,
              r = [],
              s = t.stepSize,
              l = s || 1,
              d = t.maxTicks - 1,
              u = t.min,
              h = t.max,
              c = t.precision,
              f = e.min,
              g = e.max,
              p = ut.niceNum((g - f) / d / l) * l
            if (p < 1e-14 && vi(u) && vi(h)) return [f, g]
            ;(o = Math.ceil(g / p) - Math.floor(f / p)) > d &&
              (p = ut.niceNum((o * p) / d / l) * l),
              s || vi(c)
                ? (i = Math.pow(10, ut._decimalPlaces(p)))
                : ((i = Math.pow(10, c)), (p = Math.ceil(p * i) / i)),
              (n = Math.floor(f / p) * p),
              (a = Math.ceil(g / p) * p),
              s &&
                (!vi(u) && ut.almostWhole(u / p, p / 1e3) && (n = u),
                !vi(h) && ut.almostWhole(h / p, p / 1e3) && (a = h)),
              (o = (a - n) / p),
              (o = ut.almostEquals(o, Math.round(o), p / 1e3)
                ? Math.round(o)
                : Math.ceil(o)),
              (n = Math.round(n * i) / i),
              (a = Math.round(a * i) / i),
              r.push(vi(u) ? n : u)
            for (var m = 1; m < o; ++m) r.push(Math.round((n + m * p) * i) / i)
            return r.push(vi(h) ? a : h), r
          })(n, t))
        t.handleDirectionalChanges(),
          (t.max = ut.max(a)),
          (t.min = ut.min(a)),
          e.reverse
            ? (a.reverse(), (t.start = t.max), (t.end = t.min))
            : ((t.start = t.min), (t.end = t.max))
      },
      convertTicksToLabels: function () {
        var t = this
        ;(t.ticksAsNumbers = t.ticks.slice()),
          (t.zeroLineIndex = t.ticks.indexOf(0)),
          fi.prototype.convertTicksToLabels.call(t)
      },
    }),
    xi = { position: 'left', ticks: { callback: li.formatters.linear } },
    yi = bi.extend({
      determineDataLimits: function () {
        var t = this,
          e = t.options,
          i = t.chart,
          n = i.data.datasets,
          a = t.isHorizontal()
        function o(e) {
          return a ? e.xAxisID === t.id : e.yAxisID === t.id
        }
        ;(t.min = null), (t.max = null)
        var r = e.stacked
        if (
          (void 0 === r &&
            ut.each(n, function (t, e) {
              if (!r) {
                var n = i.getDatasetMeta(e)
                i.isDatasetVisible(e) && o(n) && void 0 !== n.stack && (r = !0)
              }
            }),
          e.stacked || r)
        ) {
          var s = {}
          ut.each(n, function (n, a) {
            var r = i.getDatasetMeta(a),
              l = [
                r.type,
                void 0 === e.stacked && void 0 === r.stack ? a : '',
                r.stack,
              ].join('.')
            void 0 === s[l] &&
              (s[l] = { positiveValues: [], negativeValues: [] })
            var d = s[l].positiveValues,
              u = s[l].negativeValues
            i.isDatasetVisible(a) &&
              o(r) &&
              ut.each(n.data, function (i, n) {
                var a = +t.getRightValue(i)
                isNaN(a) ||
                  r.data[n].hidden ||
                  ((d[n] = d[n] || 0),
                  (u[n] = u[n] || 0),
                  e.relativePoints
                    ? (d[n] = 100)
                    : a < 0
                    ? (u[n] += a)
                    : (d[n] += a))
              })
          }),
            ut.each(s, function (e) {
              var i = e.positiveValues.concat(e.negativeValues),
                n = ut.min(i),
                a = ut.max(i)
              ;(t.min = null === t.min ? n : Math.min(t.min, n)),
                (t.max = null === t.max ? a : Math.max(t.max, a))
            })
        } else
          ut.each(n, function (e, n) {
            var a = i.getDatasetMeta(n)
            i.isDatasetVisible(n) &&
              o(a) &&
              ut.each(e.data, function (e, i) {
                var n = +t.getRightValue(e)
                isNaN(n) ||
                  a.data[i].hidden ||
                  (null === t.min ? (t.min = n) : n < t.min && (t.min = n),
                  null === t.max ? (t.max = n) : n > t.max && (t.max = n))
              })
          })
        ;(t.min = isFinite(t.min) && !isNaN(t.min) ? t.min : 0),
          (t.max = isFinite(t.max) && !isNaN(t.max) ? t.max : 1),
          this.handleTickRangeOptions()
      },
      _computeTickLimit: function () {
        var t
        return this.isHorizontal()
          ? Math.ceil(this.width / 40)
          : ((t = ut.options._parseFont(this.options.ticks)),
            Math.ceil(this.height / t.lineHeight))
      },
      handleDirectionalChanges: function () {
        this.isHorizontal() || this.ticks.reverse()
      },
      getLabelForIndex: function (t, e) {
        return +this.getRightValue(this.chart.data.datasets[e].data[t])
      },
      getPixelForValue: function (t) {
        var e = this,
          i = e.start,
          n = +e.getRightValue(t),
          a = e.end - i
        return e.isHorizontal()
          ? e.left + (e.width / a) * (n - i)
          : e.bottom - (e.height / a) * (n - i)
      },
      getValueForPixel: function (t) {
        var e = this,
          i = e.isHorizontal(),
          n = i ? e.width : e.height,
          a = (i ? t - e.left : e.bottom - t) / n
        return e.start + (e.end - e.start) * a
      },
      getPixelForTick: function (t) {
        return this.getPixelForValue(this.ticksAsNumbers[t])
      },
    }),
    ki = xi
  yi._defaults = ki
  var wi = ut.valueOrDefault
  var Mi = { position: 'left', ticks: { callback: li.formatters.logarithmic } }
  function _i(t, e) {
    return ut.isFinite(t) && t >= 0 ? t : e
  }
  var Ci = fi.extend({
      determineDataLimits: function () {
        var t = this,
          e = t.options,
          i = t.chart,
          n = i.data.datasets,
          a = t.isHorizontal()
        function o(e) {
          return a ? e.xAxisID === t.id : e.yAxisID === t.id
        }
        ;(t.min = null), (t.max = null), (t.minNotZero = null)
        var r = e.stacked
        if (
          (void 0 === r &&
            ut.each(n, function (t, e) {
              if (!r) {
                var n = i.getDatasetMeta(e)
                i.isDatasetVisible(e) && o(n) && void 0 !== n.stack && (r = !0)
              }
            }),
          e.stacked || r)
        ) {
          var s = {}
          ut.each(n, function (n, a) {
            var r = i.getDatasetMeta(a),
              l = [
                r.type,
                void 0 === e.stacked && void 0 === r.stack ? a : '',
                r.stack,
              ].join('.')
            i.isDatasetVisible(a) &&
              o(r) &&
              (void 0 === s[l] && (s[l] = []),
              ut.each(n.data, function (e, i) {
                var n = s[l],
                  a = +t.getRightValue(e)
                isNaN(a) ||
                  r.data[i].hidden ||
                  a < 0 ||
                  ((n[i] = n[i] || 0), (n[i] += a))
              }))
          }),
            ut.each(s, function (e) {
              if (e.length > 0) {
                var i = ut.min(e),
                  n = ut.max(e)
                ;(t.min = null === t.min ? i : Math.min(t.min, i)),
                  (t.max = null === t.max ? n : Math.max(t.max, n))
              }
            })
        } else
          ut.each(n, function (e, n) {
            var a = i.getDatasetMeta(n)
            i.isDatasetVisible(n) &&
              o(a) &&
              ut.each(e.data, function (e, i) {
                var n = +t.getRightValue(e)
                isNaN(n) ||
                  a.data[i].hidden ||
                  n < 0 ||
                  (null === t.min ? (t.min = n) : n < t.min && (t.min = n),
                  null === t.max ? (t.max = n) : n > t.max && (t.max = n),
                  0 !== n &&
                    (null === t.minNotZero || n < t.minNotZero) &&
                    (t.minNotZero = n))
              })
          })
        this.handleTickRangeOptions()
      },
      handleTickRangeOptions: function () {
        var t = this,
          e = t.options.ticks
        ;(t.min = _i(e.min, t.min)),
          (t.max = _i(e.max, t.max)),
          t.min === t.max &&
            (0 !== t.min && null !== t.min
              ? ((t.min = Math.pow(10, Math.floor(ut.log10(t.min)) - 1)),
                (t.max = Math.pow(10, Math.floor(ut.log10(t.max)) + 1)))
              : ((t.min = 1), (t.max = 10))),
          null === t.min &&
            (t.min = Math.pow(10, Math.floor(ut.log10(t.max)) - 1)),
          null === t.max &&
            (t.max =
              0 !== t.min ? Math.pow(10, Math.floor(ut.log10(t.min)) + 1) : 10),
          null === t.minNotZero &&
            (t.min > 0
              ? (t.minNotZero = t.min)
              : t.max < 1
              ? (t.minNotZero = Math.pow(10, Math.floor(ut.log10(t.max))))
              : (t.minNotZero = 1))
      },
      buildTicks: function () {
        var t = this,
          e = t.options.ticks,
          i = !t.isHorizontal(),
          n = { min: _i(e.min), max: _i(e.max) },
          a = (t.ticks = (function (t, e) {
            var i,
              n,
              a = [],
              o = wi(t.min, Math.pow(10, Math.floor(ut.log10(e.min)))),
              r = Math.floor(ut.log10(e.max)),
              s = Math.ceil(e.max / Math.pow(10, r))
            0 === o
              ? ((i = Math.floor(ut.log10(e.minNotZero))),
                (n = Math.floor(e.minNotZero / Math.pow(10, i))),
                a.push(o),
                (o = n * Math.pow(10, i)))
              : ((i = Math.floor(ut.log10(o))),
                (n = Math.floor(o / Math.pow(10, i))))
            var l = i < 0 ? Math.pow(10, Math.abs(i)) : 1
            do {
              a.push(o),
                10 == ++n && ((n = 1), (l = ++i >= 0 ? 1 : l)),
                (o = Math.round(n * Math.pow(10, i) * l) / l)
            } while (i < r || (i === r && n < s))
            var d = wi(t.max, o)
            return a.push(d), a
          })(n, t))
        ;(t.max = ut.max(a)),
          (t.min = ut.min(a)),
          e.reverse
            ? ((i = !i), (t.start = t.max), (t.end = t.min))
            : ((t.start = t.min), (t.end = t.max)),
          i && a.reverse()
      },
      convertTicksToLabels: function () {
        ;(this.tickValues = this.ticks.slice()),
          fi.prototype.convertTicksToLabels.call(this)
      },
      getLabelForIndex: function (t, e) {
        return +this.getRightValue(this.chart.data.datasets[e].data[t])
      },
      getPixelForTick: function (t) {
        return this.getPixelForValue(this.tickValues[t])
      },
      _getFirstTickValue: function (t) {
        var e = Math.floor(ut.log10(t))
        return Math.floor(t / Math.pow(10, e)) * Math.pow(10, e)
      },
      getPixelForValue: function (t) {
        var e,
          i,
          n,
          a,
          o,
          r = this,
          s = r.options.ticks,
          l = s.reverse,
          d = ut.log10,
          u = r._getFirstTickValue(r.minNotZero),
          h = 0
        return (
          (t = +r.getRightValue(t)),
          l
            ? ((n = r.end), (a = r.start), (o = -1))
            : ((n = r.start), (a = r.end), (o = 1)),
          r.isHorizontal()
            ? ((e = r.width), (i = l ? r.right : r.left))
            : ((e = r.height), (o *= -1), (i = l ? r.top : r.bottom)),
          t !== n &&
            (0 === n &&
              ((e -= h = wi(s.fontSize, st.global.defaultFontSize)), (n = u)),
            0 !== t && (h += (e / (d(a) - d(n))) * (d(t) - d(n))),
            (i += o * h)),
          i
        )
      },
      getValueForPixel: function (t) {
        var e,
          i,
          n,
          a,
          o = this,
          r = o.options.ticks,
          s = r.reverse,
          l = ut.log10,
          d = o._getFirstTickValue(o.minNotZero)
        if (
          (s ? ((i = o.end), (n = o.start)) : ((i = o.start), (n = o.end)),
          o.isHorizontal()
            ? ((e = o.width), (a = s ? o.right - t : t - o.left))
            : ((e = o.height), (a = s ? t - o.top : o.bottom - t)),
          a !== i)
        ) {
          if (0 === i) {
            var u = wi(r.fontSize, st.global.defaultFontSize)
            ;(a -= u), (e -= u), (i = d)
          }
          ;(a *= l(n) - l(i)), (a /= e), (a = Math.pow(10, l(i) + a))
        }
        return a
      },
    }),
    Si = Mi
  Ci._defaults = Si
  var Pi = ut.valueOrDefault,
    Ii = ut.valueAtIndexOrDefault,
    Ai = ut.options.resolve,
    Di = {
      display: !0,
      animate: !0,
      position: 'chartArea',
      angleLines: {
        display: !0,
        color: 'rgba(0, 0, 0, 0.1)',
        lineWidth: 1,
        borderDash: [],
        borderDashOffset: 0,
      },
      gridLines: { circular: !1 },
      ticks: {
        showLabelBackdrop: !0,
        backdropColor: 'rgba(255,255,255,0.75)',
        backdropPaddingY: 2,
        backdropPaddingX: 2,
        callback: li.formatters.linear,
      },
      pointLabels: {
        display: !0,
        fontSize: 10,
        callback: function (t) {
          return t
        },
      },
    }
  function Ti(t) {
    var e = t.options
    return e.angleLines.display || e.pointLabels.display
      ? t.chart.data.labels.length
      : 0
  }
  function Fi(t) {
    var e = t.ticks
    return e.display && t.display
      ? Pi(e.fontSize, st.global.defaultFontSize) + 2 * e.backdropPaddingY
      : 0
  }
  function Li(t, e, i, n, a) {
    return t === n || t === a
      ? { start: e - i / 2, end: e + i / 2 }
      : t < n || t > a
      ? { start: e - i, end: e }
      : { start: e, end: e + i }
  }
  function Ri(t) {
    return 0 === t || 180 === t ? 'center' : t < 180 ? 'left' : 'right'
  }
  function Oi(t, e, i, n) {
    var a,
      o,
      r = i.y + n / 2
    if (ut.isArray(e))
      for (a = 0, o = e.length; a < o; ++a) t.fillText(e[a], i.x, r), (r += n)
    else t.fillText(e, i.x, r)
  }
  function zi(t, e, i) {
    90 === t || 270 === t
      ? (i.y -= e.h / 2)
      : (t > 270 || t < 90) && (i.y -= e.h)
  }
  function Bi(t) {
    return ut.isNumber(t) ? t : 0
  }
  var Ni = bi.extend({
      setDimensions: function () {
        var t = this
        ;(t.width = t.maxWidth),
          (t.height = t.maxHeight),
          (t.paddingTop = Fi(t.options) / 2),
          (t.xCenter = Math.floor(t.width / 2)),
          (t.yCenter = Math.floor((t.height - t.paddingTop) / 2)),
          (t.drawingArea = Math.min(t.height - t.paddingTop, t.width) / 2)
      },
      determineDataLimits: function () {
        var t = this,
          e = t.chart,
          i = Number.POSITIVE_INFINITY,
          n = Number.NEGATIVE_INFINITY
        ut.each(e.data.datasets, function (a, o) {
          if (e.isDatasetVisible(o)) {
            var r = e.getDatasetMeta(o)
            ut.each(a.data, function (e, a) {
              var o = +t.getRightValue(e)
              isNaN(o) ||
                r.data[a].hidden ||
                ((i = Math.min(o, i)), (n = Math.max(o, n)))
            })
          }
        }),
          (t.min = i === Number.POSITIVE_INFINITY ? 0 : i),
          (t.max = n === Number.NEGATIVE_INFINITY ? 0 : n),
          t.handleTickRangeOptions()
      },
      _computeTickLimit: function () {
        return Math.ceil(this.drawingArea / Fi(this.options))
      },
      convertTicksToLabels: function () {
        var t = this
        bi.prototype.convertTicksToLabels.call(t),
          (t.pointLabels = t.chart.data.labels.map(
            t.options.pointLabels.callback,
            t
          ))
      },
      getLabelForIndex: function (t, e) {
        return +this.getRightValue(this.chart.data.datasets[e].data[t])
      },
      fit: function () {
        var t = this.options
        t.display && t.pointLabels.display
          ? (function (t) {
              var e,
                i,
                n,
                a = ut.options._parseFont(t.options.pointLabels),
                o = { l: 0, r: t.width, t: 0, b: t.height - t.paddingTop },
                r = {}
              ;(t.ctx.font = a.string), (t._pointLabelSizes = [])
              var s,
                l,
                d,
                u = Ti(t)
              for (e = 0; e < u; e++) {
                ;(n = t.getPointPosition(e, t.drawingArea + 5)),
                  (s = t.ctx),
                  (l = a.lineHeight),
                  (d = t.pointLabels[e] || ''),
                  (i = ut.isArray(d)
                    ? { w: ut.longestText(s, s.font, d), h: d.length * l }
                    : { w: s.measureText(d).width, h: l }),
                  (t._pointLabelSizes[e] = i)
                var h = t.getIndexAngle(e),
                  c = ut.toDegrees(h) % 360,
                  f = Li(c, n.x, i.w, 0, 180),
                  g = Li(c, n.y, i.h, 90, 270)
                f.start < o.l && ((o.l = f.start), (r.l = h)),
                  f.end > o.r && ((o.r = f.end), (r.r = h)),
                  g.start < o.t && ((o.t = g.start), (r.t = h)),
                  g.end > o.b && ((o.b = g.end), (r.b = h))
              }
              t.setReductions(t.drawingArea, o, r)
            })(this)
          : this.setCenterPoint(0, 0, 0, 0)
      },
      setReductions: function (t, e, i) {
        var n = this,
          a = e.l / Math.sin(i.l),
          o = Math.max(e.r - n.width, 0) / Math.sin(i.r),
          r = -e.t / Math.cos(i.t),
          s = -Math.max(e.b - (n.height - n.paddingTop), 0) / Math.cos(i.b)
        ;(a = Bi(a)),
          (o = Bi(o)),
          (r = Bi(r)),
          (s = Bi(s)),
          (n.drawingArea = Math.min(
            Math.floor(t - (a + o) / 2),
            Math.floor(t - (r + s) / 2)
          )),
          n.setCenterPoint(a, o, r, s)
      },
      setCenterPoint: function (t, e, i, n) {
        var a = this,
          o = a.width - e - a.drawingArea,
          r = t + a.drawingArea,
          s = i + a.drawingArea,
          l = a.height - a.paddingTop - n - a.drawingArea
        ;(a.xCenter = Math.floor((r + o) / 2 + a.left)),
          (a.yCenter = Math.floor((s + l) / 2 + a.top + a.paddingTop))
      },
      getIndexAngle: function (t) {
        return (
          t * ((2 * Math.PI) / Ti(this)) +
          ((this.chart.options && this.chart.options.startAngle
            ? this.chart.options.startAngle
            : 0) *
            Math.PI *
            2) /
            360
        )
      },
      getDistanceFromCenterForValue: function (t) {
        var e = this
        if (null === t) return 0
        var i = e.drawingArea / (e.max - e.min)
        return e.options.ticks.reverse ? (e.max - t) * i : (t - e.min) * i
      },
      getPointPosition: function (t, e) {
        var i = this.getIndexAngle(t) - Math.PI / 2
        return {
          x: Math.cos(i) * e + this.xCenter,
          y: Math.sin(i) * e + this.yCenter,
        }
      },
      getPointPositionForValue: function (t, e) {
        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
      },
      getBasePosition: function () {
        var t = this.min,
          e = this.max
        return this.getPointPositionForValue(
          0,
          this.beginAtZero ? 0 : t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
        )
      },
      draw: function () {
        var t = this,
          e = t.options,
          i = e.gridLines,
          n = e.ticks
        if (e.display) {
          var a = t.ctx,
            o = this.getIndexAngle(0),
            r = ut.options._parseFont(n)
          ;(e.angleLines.display || e.pointLabels.display) &&
            (function (t) {
              var e = t.ctx,
                i = t.options,
                n = i.angleLines,
                a = i.gridLines,
                o = i.pointLabels,
                r = Pi(n.lineWidth, a.lineWidth),
                s = Pi(n.color, a.color),
                l = Fi(i)
              e.save(),
                (e.lineWidth = r),
                (e.strokeStyle = s),
                e.setLineDash &&
                  (e.setLineDash(Ai([n.borderDash, a.borderDash, []])),
                  (e.lineDashOffset = Ai([
                    n.borderDashOffset,
                    a.borderDashOffset,
                    0,
                  ])))
              var d = t.getDistanceFromCenterForValue(
                  i.ticks.reverse ? t.min : t.max
                ),
                u = ut.options._parseFont(o)
              ;(e.font = u.string), (e.textBaseline = 'middle')
              for (var h = Ti(t) - 1; h >= 0; h--) {
                if (n.display && r && s) {
                  var c = t.getPointPosition(h, d)
                  e.beginPath(),
                    e.moveTo(t.xCenter, t.yCenter),
                    e.lineTo(c.x, c.y),
                    e.stroke()
                }
                if (o.display) {
                  var f = 0 === h ? l / 2 : 0,
                    g = t.getPointPosition(h, d + f + 5),
                    p = Ii(o.fontColor, h, st.global.defaultFontColor)
                  e.fillStyle = p
                  var m = t.getIndexAngle(h),
                    v = ut.toDegrees(m)
                  ;(e.textAlign = Ri(v)),
                    zi(v, t._pointLabelSizes[h], g),
                    Oi(e, t.pointLabels[h] || '', g, u.lineHeight)
                }
              }
              e.restore()
            })(t),
            ut.each(t.ticks, function (e, s) {
              if (s > 0 || n.reverse) {
                var l = t.getDistanceFromCenterForValue(t.ticksAsNumbers[s])
                if (
                  (i.display &&
                    0 !== s &&
                    (function (t, e, i, n) {
                      var a,
                        o = t.ctx,
                        r = e.circular,
                        s = Ti(t),
                        l = Ii(e.color, n - 1),
                        d = Ii(e.lineWidth, n - 1)
                      if ((r || s) && l && d) {
                        if (
                          (o.save(),
                          (o.strokeStyle = l),
                          (o.lineWidth = d),
                          o.setLineDash &&
                            (o.setLineDash(e.borderDash || []),
                            (o.lineDashOffset = e.borderDashOffset || 0)),
                          o.beginPath(),
                          r)
                        )
                          o.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI)
                        else {
                          ;(a = t.getPointPosition(0, i)), o.moveTo(a.x, a.y)
                          for (var u = 1; u < s; u++)
                            (a = t.getPointPosition(u, i)), o.lineTo(a.x, a.y)
                        }
                        o.closePath(), o.stroke(), o.restore()
                      }
                    })(t, i, l, s),
                  n.display)
                ) {
                  var d = Pi(n.fontColor, st.global.defaultFontColor)
                  if (
                    ((a.font = r.string),
                    a.save(),
                    a.translate(t.xCenter, t.yCenter),
                    a.rotate(o),
                    n.showLabelBackdrop)
                  ) {
                    var u = a.measureText(e).width
                    ;(a.fillStyle = n.backdropColor),
                      a.fillRect(
                        -u / 2 - n.backdropPaddingX,
                        -l - r.size / 2 - n.backdropPaddingY,
                        u + 2 * n.backdropPaddingX,
                        r.size + 2 * n.backdropPaddingY
                      )
                  }
                  ;(a.textAlign = 'center'),
                    (a.textBaseline = 'middle'),
                    (a.fillStyle = d),
                    a.fillText(e, 0, -l),
                    a.restore()
                }
              }
            })
        }
      },
    }),
    Wi = Di
  Ni._defaults = Wi
  var Vi = ut.valueOrDefault,
    Ei = Number.MIN_SAFE_INTEGER || -9007199254740991,
    Hi = Number.MAX_SAFE_INTEGER || 9007199254740991,
    ji = {
      millisecond: {
        common: !0,
        size: 1,
        steps: [1, 2, 5, 10, 20, 50, 100, 250, 500],
      },
      second: { common: !0, size: 1e3, steps: [1, 2, 5, 10, 15, 30] },
      minute: { common: !0, size: 6e4, steps: [1, 2, 5, 10, 15, 30] },
      hour: { common: !0, size: 36e5, steps: [1, 2, 3, 6, 12] },
      day: { common: !0, size: 864e5, steps: [1, 2, 5] },
      week: { common: !1, size: 6048e5, steps: [1, 2, 3, 4] },
      month: { common: !0, size: 2628e6, steps: [1, 2, 3] },
      quarter: { common: !1, size: 7884e6, steps: [1, 2, 3, 4] },
      year: { common: !0, size: 3154e7 },
    },
    qi = Object.keys(ji)
  function Yi(t, e) {
    return t - e
  }
  function Ui(t) {
    var e,
      i,
      n,
      a = {},
      o = []
    for (e = 0, i = t.length; e < i; ++e)
      a[(n = t[e])] || ((a[n] = !0), o.push(n))
    return o
  }
  function Xi(t, e, i, n) {
    var a = (function (t, e, i) {
        for (var n, a, o, r = 0, s = t.length - 1; r >= 0 && r <= s; ) {
          if (((a = t[(n = (r + s) >> 1) - 1] || null), (o = t[n]), !a))
            return { lo: null, hi: o }
          if (o[e] < i) r = n + 1
          else {
            if (!(a[e] > i)) return { lo: a, hi: o }
            s = n - 1
          }
        }
        return { lo: o, hi: null }
      })(t, e, i),
      o = a.lo ? (a.hi ? a.lo : t[t.length - 2]) : t[0],
      r = a.lo ? (a.hi ? a.hi : t[t.length - 1]) : t[1],
      s = r[e] - o[e],
      l = s ? (i - o[e]) / s : 0,
      d = (r[n] - o[n]) * l
    return o[n] + d
  }
  function Ki(t, e) {
    var i = t._adapter,
      n = t.options.time,
      a = n.parser,
      o = a || n.format,
      r = e
    return (
      'function' == typeof a && (r = a(r)),
      ut.isFinite(r) || (r = 'string' == typeof o ? i.parse(r, o) : i.parse(r)),
      null !== r
        ? +r
        : (a ||
            'function' != typeof o ||
            ((r = o(e)), ut.isFinite(r) || (r = i.parse(r))),
          r)
    )
  }
  function Gi(t, e) {
    if (ut.isNullOrUndef(e)) return null
    var i = t.options.time,
      n = Ki(t, t.getRightValue(e))
    return null === n
      ? n
      : (i.round && (n = +t._adapter.startOf(n, i.round)), n)
  }
  function Zi(t) {
    for (var e = qi.indexOf(t) + 1, i = qi.length; e < i; ++e)
      if (ji[qi[e]].common) return qi[e]
  }
  function $i(t, e, i, n) {
    var a,
      o = t._adapter,
      r = t.options,
      s = r.time,
      l =
        s.unit ||
        (function (t, e, i, n) {
          var a,
            o,
            r,
            s = qi.length
          for (a = qi.indexOf(t); a < s - 1; ++a)
            if (
              ((r = (o = ji[qi[a]]).steps ? o.steps[o.steps.length - 1] : Hi),
              o.common && Math.ceil((i - e) / (r * o.size)) <= n)
            )
              return qi[a]
          return qi[s - 1]
        })(s.minUnit, e, i, n),
      d = Zi(l),
      u = Vi(s.stepSize, s.unitStepSize),
      h = 'week' === l && s.isoWeekday,
      c = r.ticks.major.enabled,
      f = ji[l],
      g = e,
      p = i,
      m = []
    for (
      u ||
        (u = (function (t, e, i, n) {
          var a,
            o,
            r,
            s = e - t,
            l = ji[i],
            d = l.size,
            u = l.steps
          if (!u) return Math.ceil(s / (n * d))
          for (
            a = 0, o = u.length;
            a < o && ((r = u[a]), !(Math.ceil(s / (d * r)) <= n));
            ++a
          );
          return r
        })(e, i, l, n)),
        h &&
          ((g = +o.startOf(g, 'isoWeek', h)),
          (p = +o.startOf(p, 'isoWeek', h))),
        g = +o.startOf(g, h ? 'day' : l),
        (p = +o.startOf(p, h ? 'day' : l)) < i && (p = +o.add(p, 1, l)),
        a = g,
        c &&
          d &&
          !h &&
          !s.round &&
          ((a = +o.startOf(a, d)),
          (a = +o.add(a, ~~((g - a) / (f.size * u)) * u, l)));
      a < p;
      a = +o.add(a, u, l)
    )
      m.push(+a)
    return m.push(+a), m
  }
  var Ji = fi.extend({
      initialize: function () {
        this.mergeTicksOptions(), fi.prototype.initialize.call(this)
      },
      update: function () {
        var t = this.options,
          e = t.time || (t.time = {}),
          i = (this._adapter = new si._date(t.adapters.date))
        return (
          e.format &&
            console.warn(
              'options.time.format is deprecated and replaced by options.time.parser.'
            ),
          ut.mergeIf(e.displayFormats, i.formats()),
          fi.prototype.update.apply(this, arguments)
        )
      },
      getRightValue: function (t) {
        return (
          t && void 0 !== t.t && (t = t.t),
          fi.prototype.getRightValue.call(this, t)
        )
      },
      determineDataLimits: function () {
        var t,
          e,
          i,
          n,
          a,
          o,
          r = this,
          s = r.chart,
          l = r._adapter,
          d = r.options.time,
          u = d.unit || 'day',
          h = Hi,
          c = Ei,
          f = [],
          g = [],
          p = [],
          m = s.data.labels || []
        for (t = 0, i = m.length; t < i; ++t) p.push(Gi(r, m[t]))
        for (t = 0, i = (s.data.datasets || []).length; t < i; ++t)
          if (s.isDatasetVisible(t))
            if (((a = s.data.datasets[t].data), ut.isObject(a[0])))
              for (g[t] = [], e = 0, n = a.length; e < n; ++e)
                (o = Gi(r, a[e])), f.push(o), (g[t][e] = o)
            else {
              for (e = 0, n = p.length; e < n; ++e) f.push(p[e])
              g[t] = p.slice(0)
            }
          else g[t] = []
        p.length &&
          ((p = Ui(p).sort(Yi)),
          (h = Math.min(h, p[0])),
          (c = Math.max(c, p[p.length - 1]))),
          f.length &&
            ((f = Ui(f).sort(Yi)),
            (h = Math.min(h, f[0])),
            (c = Math.max(c, f[f.length - 1]))),
          (h = Gi(r, d.min) || h),
          (c = Gi(r, d.max) || c),
          (h = h === Hi ? +l.startOf(Date.now(), u) : h),
          (c = c === Ei ? +l.endOf(Date.now(), u) + 1 : c),
          (r.min = Math.min(h, c)),
          (r.max = Math.max(h + 1, c)),
          (r._horizontal = r.isHorizontal()),
          (r._table = []),
          (r._timestamps = { data: f, datasets: g, labels: p })
      },
      buildTicks: function () {
        var t,
          e,
          i,
          n = this,
          a = n.min,
          o = n.max,
          r = n.options,
          s = r.time,
          l = [],
          d = []
        switch (r.ticks.source) {
          case 'data':
            l = n._timestamps.data
            break
          case 'labels':
            l = n._timestamps.labels
            break
          case 'auto':
          default:
            l = $i(n, a, o, n.getLabelCapacity(a))
        }
        for (
          'ticks' === r.bounds &&
            l.length &&
            ((a = l[0]), (o = l[l.length - 1])),
            a = Gi(n, s.min) || a,
            o = Gi(n, s.max) || o,
            t = 0,
            e = l.length;
          t < e;
          ++t
        )
          (i = l[t]) >= a && i <= o && d.push(i)
        return (
          (n.min = a),
          (n.max = o),
          (n._unit =
            s.unit ||
            (function (t, e, i, n, a) {
              var o, r
              for (o = qi.length - 1; o >= qi.indexOf(i); o--)
                if (
                  ((r = qi[o]),
                  ji[r].common && t._adapter.diff(a, n, r) >= e.length)
                )
                  return r
              return qi[i ? qi.indexOf(i) : 0]
            })(n, d, s.minUnit, n.min, n.max)),
          (n._majorUnit = Zi(n._unit)),
          (n._table = (function (t, e, i, n) {
            if ('linear' === n || !t.length)
              return [
                { time: e, pos: 0 },
                { time: i, pos: 1 },
              ]
            var a,
              o,
              r,
              s,
              l,
              d = [],
              u = [e]
            for (a = 0, o = t.length; a < o; ++a)
              (s = t[a]) > e && s < i && u.push(s)
            for (u.push(i), a = 0, o = u.length; a < o; ++a)
              (l = u[a + 1]),
                (r = u[a - 1]),
                (s = u[a]),
                (void 0 !== r &&
                  void 0 !== l &&
                  Math.round((l + r) / 2) === s) ||
                  d.push({ time: s, pos: a / (o - 1) })
            return d
          })(n._timestamps.data, a, o, r.distribution)),
          (n._offsets = (function (t, e, i, n, a) {
            var o,
              r,
              s = 0,
              l = 0
            return (
              a.offset &&
                e.length &&
                (a.time.min ||
                  ((o = Xi(t, 'time', e[0], 'pos')),
                  (s =
                    1 === e.length
                      ? 1 - o
                      : (Xi(t, 'time', e[1], 'pos') - o) / 2)),
                a.time.max ||
                  ((r = Xi(t, 'time', e[e.length - 1], 'pos')),
                  (l =
                    1 === e.length
                      ? r
                      : (r - Xi(t, 'time', e[e.length - 2], 'pos')) / 2))),
              { start: s, end: l }
            )
          })(n._table, d, 0, 0, r)),
          r.ticks.reverse && d.reverse(),
          (function (t, e, i) {
            var n,
              a,
              o,
              r,
              s = []
            for (n = 0, a = e.length; n < a; ++n)
              (o = e[n]),
                (r = !!i && o === +t._adapter.startOf(o, i)),
                s.push({ value: o, major: r })
            return s
          })(n, d, n._majorUnit)
        )
      },
      getLabelForIndex: function (t, e) {
        var i = this,
          n = i._adapter,
          a = i.chart.data,
          o = i.options.time,
          r = a.labels && t < a.labels.length ? a.labels[t] : '',
          s = a.datasets[e].data[t]
        return (
          ut.isObject(s) && (r = i.getRightValue(s)),
          o.tooltipFormat
            ? n.format(Ki(i, r), o.tooltipFormat)
            : 'string' == typeof r
            ? r
            : n.format(Ki(i, r), o.displayFormats.datetime)
        )
      },
      tickFormatFunction: function (t, e, i, n) {
        var a = this._adapter,
          o = this.options,
          r = o.time.displayFormats,
          s = r[this._unit],
          l = this._majorUnit,
          d = r[l],
          u = +a.startOf(t, l),
          h = o.ticks.major,
          c = h.enabled && l && d && t === u,
          f = a.format(t, n || (c ? d : s)),
          g = c ? h : o.ticks.minor,
          p = Vi(g.callback, g.userCallback)
        return p ? p(f, e, i) : f
      },
      convertTicksToLabels: function (t) {
        var e,
          i,
          n = []
        for (e = 0, i = t.length; e < i; ++e)
          n.push(this.tickFormatFunction(t[e].value, e, t))
        return n
      },
      getPixelForOffset: function (t) {
        var e = this,
          i = e.options.ticks.reverse,
          n = e._horizontal ? e.width : e.height,
          a = e._horizontal ? (i ? e.right : e.left) : i ? e.bottom : e.top,
          o = Xi(e._table, 'time', t, 'pos'),
          r =
            (n * (e._offsets.start + o)) /
            (e._offsets.start + 1 + e._offsets.end)
        return i ? a - r : a + r
      },
      getPixelForValue: function (t, e, i) {
        var n = null
        if (
          (void 0 !== e &&
            void 0 !== i &&
            (n = this._timestamps.datasets[i][e]),
          null === n && (n = Gi(this, t)),
          null !== n)
        )
          return this.getPixelForOffset(n)
      },
      getPixelForTick: function (t) {
        var e = this.getTicks()
        return t >= 0 && t < e.length
          ? this.getPixelForOffset(e[t].value)
          : null
      },
      getValueForPixel: function (t) {
        var e = this,
          i = e._horizontal ? e.width : e.height,
          n = e._horizontal ? e.left : e.top,
          a =
            (i ? (t - n) / i : 0) * (e._offsets.start + 1 + e._offsets.start) -
            e._offsets.end,
          o = Xi(e._table, 'pos', a, 'time')
        return e._adapter._create(o)
      },
      getLabelWidth: function (t) {
        var e = this.options.ticks,
          i = this.ctx.measureText(t).width,
          n = ut.toRadians(e.maxRotation),
          a = Math.cos(n),
          o = Math.sin(n)
        return i * a + Vi(e.fontSize, st.global.defaultFontSize) * o
      },
      getLabelCapacity: function (t) {
        var e = this,
          i = e.options.time.displayFormats.millisecond,
          n = e.tickFormatFunction(t, 0, [], i),
          a = e.getLabelWidth(n),
          o = e.isHorizontal() ? e.width : e.height,
          r = Math.floor(o / a)
        return r > 0 ? r : 1
      },
    }),
    Qi = {
      position: 'bottom',
      distribution: 'linear',
      bounds: 'data',
      adapters: {},
      time: {
        parser: !1,
        format: !1,
        unit: !1,
        round: !1,
        displayFormat: !1,
        isoWeekday: !1,
        minUnit: 'millisecond',
        displayFormats: {},
      },
      ticks: { autoSkip: !1, source: 'auto', major: { enabled: !1 } },
    }
  Ji._defaults = Qi
  var tn = {
      category: gi,
      linear: yi,
      logarithmic: Ci,
      radialLinear: Ni,
      time: Ji,
    },
    en = {
      datetime: 'MMM D, YYYY, h:mm:ss a',
      millisecond: 'h:mm:ss.SSS a',
      second: 'h:mm:ss a',
      minute: 'h:mm a',
      hour: 'hA',
      day: 'MMM D',
      week: 'll',
      month: 'MMM YYYY',
      quarter: '[Q]Q - YYYY',
      year: 'YYYY',
    }
  si._date.override(
    'function' == typeof t
      ? {
          _id: 'moment',
          formats: function () {
            return en
          },
          parse: function (e, i) {
            return (
              'string' == typeof e && 'string' == typeof i
                ? (e = t(e, i))
                : e instanceof t || (e = t(e)),
              e.isValid() ? e.valueOf() : null
            )
          },
          format: function (e, i) {
            return t(e).format(i)
          },
          add: function (e, i, n) {
            return t(e).add(i, n).valueOf()
          },
          diff: function (e, i, n) {
            return t.duration(t(e).diff(t(i))).as(n)
          },
          startOf: function (e, i, n) {
            return (
              (e = t(e)),
              'isoWeek' === i
                ? e.isoWeekday(n).valueOf()
                : e.startOf(i).valueOf()
            )
          },
          endOf: function (e, i) {
            return t(e).endOf(i).valueOf()
          },
          _create: function (e) {
            return t(e)
          },
        }
      : {}
  ),
    st._set('global', { plugins: { filler: { propagate: !0 } } })
  var nn = {
    dataset: function (t) {
      var e = t.fill,
        i = t.chart,
        n = i.getDatasetMeta(e),
        a = (n && i.isDatasetVisible(e) && n.dataset._children) || [],
        o = a.length || 0
      return o
        ? function (t, e) {
            return (e < o && a[e]._view) || null
          }
        : null
    },
    boundary: function (t) {
      var e = t.boundary,
        i = e ? e.x : null,
        n = e ? e.y : null
      return function (t) {
        return { x: null === i ? t.x : i, y: null === n ? t.y : n }
      }
    },
  }
  function an(t, e, i) {
    var n,
      a = t._model || {},
      o = a.fill
    if ((void 0 === o && (o = !!a.backgroundColor), !1 === o || null === o))
      return !1
    if (!0 === o) return 'origin'
    if (((n = parseFloat(o, 10)), isFinite(n) && Math.floor(n) === n))
      return (
        ('-' !== o[0] && '+' !== o[0]) || (n = e + n),
        !(n === e || n < 0 || n >= i) && n
      )
    switch (o) {
      case 'bottom':
        return 'start'
      case 'top':
        return 'end'
      case 'zero':
        return 'origin'
      case 'origin':
      case 'start':
      case 'end':
        return o
      default:
        return !1
    }
  }
  function on(t) {
    var e,
      i = t.el._model || {},
      n = t.el._scale || {},
      a = t.fill,
      o = null
    if (isFinite(a)) return null
    if (
      ('start' === a
        ? (o = void 0 === i.scaleBottom ? n.bottom : i.scaleBottom)
        : 'end' === a
        ? (o = void 0 === i.scaleTop ? n.top : i.scaleTop)
        : void 0 !== i.scaleZero
        ? (o = i.scaleZero)
        : n.getBasePosition
        ? (o = n.getBasePosition())
        : n.getBasePixel && (o = n.getBasePixel()),
      null != o)
    ) {
      if (void 0 !== o.x && void 0 !== o.y) return o
      if (ut.isFinite(o))
        return { x: (e = n.isHorizontal()) ? o : null, y: e ? null : o }
    }
    return null
  }
  function rn(t, e, i) {
    var n,
      a = t[e].fill,
      o = [e]
    if (!i) return a
    for (; !1 !== a && -1 === o.indexOf(a); ) {
      if (!isFinite(a)) return a
      if (!(n = t[a])) return !1
      if (n.visible) return a
      o.push(a), (a = n.fill)
    }
    return !1
  }
  function sn(t) {
    var e = t.fill,
      i = 'dataset'
    return !1 === e ? null : (isFinite(e) || (i = 'boundary'), nn[i](t))
  }
  function ln(t) {
    return t && !t.skip
  }
  function dn(t, e, i, n, a) {
    var o
    if (n && a) {
      for (t.moveTo(e[0].x, e[0].y), o = 1; o < n; ++o)
        ut.canvas.lineTo(t, e[o - 1], e[o])
      for (t.lineTo(i[a - 1].x, i[a - 1].y), o = a - 1; o > 0; --o)
        ut.canvas.lineTo(t, i[o], i[o - 1], !0)
    }
  }
  var un = {
      id: 'filler',
      afterDatasetsUpdate: function (t, e) {
        var i,
          n,
          a,
          o,
          r = (t.data.datasets || []).length,
          s = e.propagate,
          l = []
        for (n = 0; n < r; ++n)
          (o = null),
            (a = (i = t.getDatasetMeta(n)).dataset) &&
              a._model &&
              a instanceof Wt.Line &&
              (o = {
                visible: t.isDatasetVisible(n),
                fill: an(a, n, r),
                chart: t,
                el: a,
              }),
            (i.$filler = o),
            l.push(o)
        for (n = 0; n < r; ++n)
          (o = l[n]) &&
            ((o.fill = rn(l, n, s)), (o.boundary = on(o)), (o.mapper = sn(o)))
      },
      beforeDatasetDraw: function (t, e) {
        var i = e.meta.$filler
        if (i) {
          var n = t.ctx,
            a = i.el,
            o = a._view,
            r = a._children || [],
            s = i.mapper,
            l = o.backgroundColor || st.global.defaultColor
          s &&
            l &&
            r.length &&
            (ut.canvas.clipArea(n, t.chartArea),
            (function (t, e, i, n, a, o) {
              var r,
                s,
                l,
                d,
                u,
                h,
                c,
                f = e.length,
                g = n.spanGaps,
                p = [],
                m = [],
                v = 0,
                b = 0
              for (t.beginPath(), r = 0, s = f + !!o; r < s; ++r)
                (u = i((d = e[(l = r % f)]._view), l, n)),
                  (h = ln(d)),
                  (c = ln(u)),
                  h && c
                    ? ((v = p.push(d)), (b = m.push(u)))
                    : v &&
                      b &&
                      (g
                        ? (h && p.push(d), c && m.push(u))
                        : (dn(t, p, m, v, b), (v = b = 0), (p = []), (m = [])))
              dn(t, p, m, v, b), t.closePath(), (t.fillStyle = a), t.fill()
            })(n, r, s, o, l, a._loop),
            ut.canvas.unclipArea(n))
        }
      },
    },
    hn = ut.noop,
    cn = ut.valueOrDefault
  function fn(t, e) {
    return t.usePointStyle && t.boxWidth > e ? e : t.boxWidth
  }
  st._set('global', {
    legend: {
      display: !0,
      position: 'top',
      fullWidth: !0,
      reverse: !1,
      weight: 1e3,
      onClick: function (t, e) {
        var i = e.datasetIndex,
          n = this.chart,
          a = n.getDatasetMeta(i)
        ;(a.hidden = null === a.hidden ? !n.data.datasets[i].hidden : null),
          n.update()
      },
      onHover: null,
      onLeave: null,
      labels: {
        boxWidth: 40,
        padding: 10,
        generateLabels: function (t) {
          var e = t.data
          return ut.isArray(e.datasets)
            ? e.datasets.map(function (e, i) {
                return {
                  text: e.label,
                  fillStyle: ut.isArray(e.backgroundColor)
                    ? e.backgroundColor[0]
                    : e.backgroundColor,
                  hidden: !t.isDatasetVisible(i),
                  lineCap: e.borderCapStyle,
                  lineDash: e.borderDash,
                  lineDashOffset: e.borderDashOffset,
                  lineJoin: e.borderJoinStyle,
                  lineWidth: e.borderWidth,
                  strokeStyle: e.borderColor,
                  pointStyle: e.pointStyle,
                  datasetIndex: i,
                }
              }, this)
            : []
        },
      },
    },
    legendCallback: function (t) {
      var e = []
      e.push('<ul class="' + t.id + '-legend">')
      for (var i = 0; i < t.data.datasets.length; i++)
        e.push(
          '<li><span style="background-color:' +
            t.data.datasets[i].backgroundColor +
            '"></span>'
        ),
          t.data.datasets[i].label && e.push(t.data.datasets[i].label),
          e.push('</li>')
      return e.push('</ul>'), e.join('')
    },
  })
  var gn = pt.extend({
    initialize: function (t) {
      ut.extend(this, t),
        (this.legendHitBoxes = []),
        (this._hoveredItem = null),
        (this.doughnutMode = !1)
    },
    beforeUpdate: hn,
    update: function (t, e, i) {
      var n = this
      return (
        n.beforeUpdate(),
        (n.maxWidth = t),
        (n.maxHeight = e),
        (n.margins = i),
        n.beforeSetDimensions(),
        n.setDimensions(),
        n.afterSetDimensions(),
        n.beforeBuildLabels(),
        n.buildLabels(),
        n.afterBuildLabels(),
        n.beforeFit(),
        n.fit(),
        n.afterFit(),
        n.afterUpdate(),
        n.minSize
      )
    },
    afterUpdate: hn,
    beforeSetDimensions: hn,
    setDimensions: function () {
      var t = this
      t.isHorizontal()
        ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width))
        : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
        (t.paddingLeft = 0),
        (t.paddingTop = 0),
        (t.paddingRight = 0),
        (t.paddingBottom = 0),
        (t.minSize = { width: 0, height: 0 })
    },
    afterSetDimensions: hn,
    beforeBuildLabels: hn,
    buildLabels: function () {
      var t = this,
        e = t.options.labels || {},
        i = ut.callback(e.generateLabels, [t.chart], t) || []
      e.filter &&
        (i = i.filter(function (i) {
          return e.filter(i, t.chart.data)
        })),
        t.options.reverse && i.reverse(),
        (t.legendItems = i)
    },
    afterBuildLabels: hn,
    beforeFit: hn,
    fit: function () {
      var t = this,
        e = t.options,
        i = e.labels,
        n = e.display,
        a = t.ctx,
        o = ut.options._parseFont(i),
        r = o.size,
        s = (t.legendHitBoxes = []),
        l = t.minSize,
        d = t.isHorizontal()
      if (
        (d
          ? ((l.width = t.maxWidth), (l.height = n ? 10 : 0))
          : ((l.width = n ? 10 : 0), (l.height = t.maxHeight)),
        n)
      )
        if (((a.font = o.string), d)) {
          var u = (t.lineWidths = [0]),
            h = 0
          ;(a.textAlign = 'left'),
            (a.textBaseline = 'top'),
            ut.each(t.legendItems, function (t, e) {
              var n = fn(i, r) + r / 2 + a.measureText(t.text).width
              ;(0 === e || u[u.length - 1] + n + i.padding > l.width) &&
                ((h += r + i.padding),
                (u[u.length - (e > 0 ? 0 : 1)] = i.padding)),
                (s[e] = { left: 0, top: 0, width: n, height: r }),
                (u[u.length - 1] += n + i.padding)
            }),
            (l.height += h)
        } else {
          var c = i.padding,
            f = (t.columnWidths = []),
            g = i.padding,
            p = 0,
            m = 0,
            v = r + c
          ut.each(t.legendItems, function (t, e) {
            var n = fn(i, r) + r / 2 + a.measureText(t.text).width
            e > 0 &&
              m + v > l.height - c &&
              ((g += p + i.padding), f.push(p), (p = 0), (m = 0)),
              (p = Math.max(p, n)),
              (m += v),
              (s[e] = { left: 0, top: 0, width: n, height: r })
          }),
            (g += p),
            f.push(p),
            (l.width += g)
        }
      ;(t.width = l.width), (t.height = l.height)
    },
    afterFit: hn,
    isHorizontal: function () {
      return (
        'top' === this.options.position || 'bottom' === this.options.position
      )
    },
    draw: function () {
      var t = this,
        e = t.options,
        i = e.labels,
        n = st.global,
        a = n.defaultColor,
        o = n.elements.line,
        r = t.width,
        s = t.lineWidths
      if (e.display) {
        var l,
          d = t.ctx,
          u = cn(i.fontColor, n.defaultFontColor),
          h = ut.options._parseFont(i),
          c = h.size
        ;(d.textAlign = 'left'),
          (d.textBaseline = 'middle'),
          (d.lineWidth = 0.5),
          (d.strokeStyle = u),
          (d.fillStyle = u),
          (d.font = h.string)
        var f = fn(i, c),
          g = t.legendHitBoxes,
          p = t.isHorizontal()
        l = p
          ? {
              x: t.left + (r - s[0]) / 2 + i.padding,
              y: t.top + i.padding,
              line: 0,
            }
          : { x: t.left + i.padding, y: t.top + i.padding, line: 0 }
        var m = c + i.padding
        ut.each(t.legendItems, function (n, u) {
          var h = d.measureText(n.text).width,
            v = f + c / 2 + h,
            b = l.x,
            x = l.y
          p
            ? u > 0 &&
              b + v + i.padding > t.left + t.minSize.width &&
              ((x = l.y += m),
              l.line++,
              (b = l.x = t.left + (r - s[l.line]) / 2 + i.padding))
            : u > 0 &&
              x + m > t.top + t.minSize.height &&
              ((b = l.x = b + t.columnWidths[l.line] + i.padding),
              (x = l.y = t.top + i.padding),
              l.line++),
            (function (t, i, n) {
              if (!(isNaN(f) || f <= 0)) {
                d.save()
                var r = cn(n.lineWidth, o.borderWidth)
                if (
                  ((d.fillStyle = cn(n.fillStyle, a)),
                  (d.lineCap = cn(n.lineCap, o.borderCapStyle)),
                  (d.lineDashOffset = cn(n.lineDashOffset, o.borderDashOffset)),
                  (d.lineJoin = cn(n.lineJoin, o.borderJoinStyle)),
                  (d.lineWidth = r),
                  (d.strokeStyle = cn(n.strokeStyle, a)),
                  d.setLineDash && d.setLineDash(cn(n.lineDash, o.borderDash)),
                  e.labels && e.labels.usePointStyle)
                ) {
                  var s = (f * Math.SQRT2) / 2,
                    l = t + f / 2,
                    u = i + c / 2
                  ut.canvas.drawPoint(d, n.pointStyle, s, l, u)
                } else
                  0 !== r && d.strokeRect(t, i, f, c), d.fillRect(t, i, f, c)
                d.restore()
              }
            })(b, x, n),
            (g[u].left = b),
            (g[u].top = x),
            (function (t, e, i, n) {
              var a = c / 2,
                o = f + a + t,
                r = e + a
              d.fillText(i.text, o, r),
                i.hidden &&
                  (d.beginPath(),
                  (d.lineWidth = 2),
                  d.moveTo(o, r),
                  d.lineTo(o + n, r),
                  d.stroke())
            })(b, x, n, h),
            p ? (l.x += v + i.padding) : (l.y += m)
        })
      }
    },
    _getLegendItemAt: function (t, e) {
      var i,
        n,
        a,
        o = this
      if (t >= o.left && t <= o.right && e >= o.top && e <= o.bottom)
        for (a = o.legendHitBoxes, i = 0; i < a.length; ++i)
          if (
            t >= (n = a[i]).left &&
            t <= n.left + n.width &&
            e >= n.top &&
            e <= n.top + n.height
          )
            return o.legendItems[i]
      return null
    },
    handleEvent: function (t) {
      var e,
        i = this,
        n = i.options,
        a = 'mouseup' === t.type ? 'click' : t.type
      if ('mousemove' === a) {
        if (!n.onHover && !n.onLeave) return
      } else {
        if ('click' !== a) return
        if (!n.onClick) return
      }
      ;(e = i._getLegendItemAt(t.x, t.y)),
        'click' === a
          ? e && n.onClick && n.onClick.call(i, t.native, e)
          : (n.onLeave &&
              e !== i._hoveredItem &&
              (i._hoveredItem && n.onLeave.call(i, t.native, i._hoveredItem),
              (i._hoveredItem = e)),
            n.onHover && e && n.onHover.call(i, t.native, e))
    },
  })
  function pn(t, e) {
    var i = new gn({ ctx: t.ctx, options: e, chart: t })
    ke.configure(t, i, e), ke.addBox(t, i), (t.legend = i)
  }
  var mn = {
      id: 'legend',
      _element: gn,
      beforeInit: function (t) {
        var e = t.options.legend
        e && pn(t, e)
      },
      beforeUpdate: function (t) {
        var e = t.options.legend,
          i = t.legend
        e
          ? (ut.mergeIf(e, st.global.legend),
            i ? (ke.configure(t, i, e), (i.options = e)) : pn(t, e))
          : i && (ke.removeBox(t, i), delete t.legend)
      },
      afterEvent: function (t, e) {
        var i = t.legend
        i && i.handleEvent(e)
      },
    },
    vn = ut.noop
  st._set('global', {
    title: {
      display: !1,
      fontStyle: 'bold',
      fullWidth: !0,
      padding: 10,
      position: 'top',
      text: '',
      weight: 2e3,
    },
  })
  var bn = pt.extend({
    initialize: function (t) {
      ut.extend(this, t), (this.legendHitBoxes = [])
    },
    beforeUpdate: vn,
    update: function (t, e, i) {
      var n = this
      return (
        n.beforeUpdate(),
        (n.maxWidth = t),
        (n.maxHeight = e),
        (n.margins = i),
        n.beforeSetDimensions(),
        n.setDimensions(),
        n.afterSetDimensions(),
        n.beforeBuildLabels(),
        n.buildLabels(),
        n.afterBuildLabels(),
        n.beforeFit(),
        n.fit(),
        n.afterFit(),
        n.afterUpdate(),
        n.minSize
      )
    },
    afterUpdate: vn,
    beforeSetDimensions: vn,
    setDimensions: function () {
      var t = this
      t.isHorizontal()
        ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width))
        : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
        (t.paddingLeft = 0),
        (t.paddingTop = 0),
        (t.paddingRight = 0),
        (t.paddingBottom = 0),
        (t.minSize = { width: 0, height: 0 })
    },
    afterSetDimensions: vn,
    beforeBuildLabels: vn,
    buildLabels: vn,
    afterBuildLabels: vn,
    beforeFit: vn,
    fit: function () {
      var t = this,
        e = t.options,
        i = e.display,
        n = t.minSize,
        a = ut.isArray(e.text) ? e.text.length : 1,
        o = ut.options._parseFont(e),
        r = i ? a * o.lineHeight + 2 * e.padding : 0
      t.isHorizontal()
        ? ((n.width = t.maxWidth), (n.height = r))
        : ((n.width = r), (n.height = t.maxHeight)),
        (t.width = n.width),
        (t.height = n.height)
    },
    afterFit: vn,
    isHorizontal: function () {
      var t = this.options.position
      return 'top' === t || 'bottom' === t
    },
    draw: function () {
      var t = this,
        e = t.ctx,
        i = t.options
      if (i.display) {
        var n,
          a,
          o,
          r = ut.options._parseFont(i),
          s = r.lineHeight,
          l = s / 2 + i.padding,
          d = 0,
          u = t.top,
          h = t.left,
          c = t.bottom,
          f = t.right
        ;(e.fillStyle = ut.valueOrDefault(
          i.fontColor,
          st.global.defaultFontColor
        )),
          (e.font = r.string),
          t.isHorizontal()
            ? ((a = h + (f - h) / 2), (o = u + l), (n = f - h))
            : ((a = 'left' === i.position ? h + l : f - l),
              (o = u + (c - u) / 2),
              (n = c - u),
              (d = Math.PI * ('left' === i.position ? -0.5 : 0.5))),
          e.save(),
          e.translate(a, o),
          e.rotate(d),
          (e.textAlign = 'center'),
          (e.textBaseline = 'middle')
        var g = i.text
        if (ut.isArray(g))
          for (var p = 0, m = 0; m < g.length; ++m)
            e.fillText(g[m], 0, p, n), (p += s)
        else e.fillText(g, 0, 0, n)
        e.restore()
      }
    },
  })
  function xn(t, e) {
    var i = new bn({ ctx: t.ctx, options: e, chart: t })
    ke.configure(t, i, e), ke.addBox(t, i), (t.titleBlock = i)
  }
  var yn = {},
    kn = un,
    wn = mn,
    Mn = {
      id: 'title',
      _element: bn,
      beforeInit: function (t) {
        var e = t.options.title
        e && xn(t, e)
      },
      beforeUpdate: function (t) {
        var e = t.options.title,
          i = t.titleBlock
        e
          ? (ut.mergeIf(e, st.global.title),
            i ? (ke.configure(t, i, e), (i.options = e)) : xn(t, e))
          : i && (ke.removeBox(t, i), delete t.titleBlock)
      },
    }
  for (var _n in ((yn.filler = kn),
  (yn.legend = wn),
  (yn.title = Mn),
  (ai.helpers = ut),
  (function () {
    function t(t, e, i) {
      var n
      return (
        'string' == typeof t
          ? ((n = parseInt(t, 10)),
            -1 !== t.indexOf('%') && (n = (n / 100) * e.parentNode[i]))
          : (n = t),
        n
      )
    }
    function e(t) {
      return null != t && 'none' !== t
    }
    function i(i, n, a) {
      var o = document.defaultView,
        r = ut._getParentNode(i),
        s = o.getComputedStyle(i)[n],
        l = o.getComputedStyle(r)[n],
        d = e(s),
        u = e(l),
        h = Number.POSITIVE_INFINITY
      return d || u ? Math.min(d ? t(s, i, a) : h, u ? t(l, r, a) : h) : 'none'
    }
    ;(ut.where = function (t, e) {
      if (ut.isArray(t) && Array.prototype.filter) return t.filter(e)
      var i = []
      return (
        ut.each(t, function (t) {
          e(t) && i.push(t)
        }),
        i
      )
    }),
      (ut.findIndex = Array.prototype.findIndex
        ? function (t, e, i) {
            return t.findIndex(e, i)
          }
        : function (t, e, i) {
            i = void 0 === i ? t : i
            for (var n = 0, a = t.length; n < a; ++n)
              if (e.call(i, t[n], n, t)) return n
            return -1
          }),
      (ut.findNextWhere = function (t, e, i) {
        ut.isNullOrUndef(i) && (i = -1)
        for (var n = i + 1; n < t.length; n++) {
          var a = t[n]
          if (e(a)) return a
        }
      }),
      (ut.findPreviousWhere = function (t, e, i) {
        ut.isNullOrUndef(i) && (i = t.length)
        for (var n = i - 1; n >= 0; n--) {
          var a = t[n]
          if (e(a)) return a
        }
      }),
      (ut.isNumber = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
      }),
      (ut.almostEquals = function (t, e, i) {
        return Math.abs(t - e) < i
      }),
      (ut.almostWhole = function (t, e) {
        var i = Math.round(t)
        return i - e < t && i + e > t
      }),
      (ut.max = function (t) {
        return t.reduce(function (t, e) {
          return isNaN(e) ? t : Math.max(t, e)
        }, Number.NEGATIVE_INFINITY)
      }),
      (ut.min = function (t) {
        return t.reduce(function (t, e) {
          return isNaN(e) ? t : Math.min(t, e)
        }, Number.POSITIVE_INFINITY)
      }),
      (ut.sign = Math.sign
        ? function (t) {
            return Math.sign(t)
          }
        : function (t) {
            return 0 == (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1
          }),
      (ut.log10 = Math.log10
        ? function (t) {
            return Math.log10(t)
          }
        : function (t) {
            var e = Math.log(t) * Math.LOG10E,
              i = Math.round(e)
            return t === Math.pow(10, i) ? i : e
          }),
      (ut.toRadians = function (t) {
        return t * (Math.PI / 180)
      }),
      (ut.toDegrees = function (t) {
        return t * (180 / Math.PI)
      }),
      (ut._decimalPlaces = function (t) {
        if (ut.isFinite(t)) {
          for (var e = 1, i = 0; Math.round(t * e) / e !== t; ) (e *= 10), i++
          return i
        }
      }),
      (ut.getAngleFromPoint = function (t, e) {
        var i = e.x - t.x,
          n = e.y - t.y,
          a = Math.sqrt(i * i + n * n),
          o = Math.atan2(n, i)
        return (
          o < -0.5 * Math.PI && (o += 2 * Math.PI), { angle: o, distance: a }
        )
      }),
      (ut.distanceBetweenPoints = function (t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
      }),
      (ut.aliasPixel = function (t) {
        return t % 2 == 0 ? 0 : 0.5
      }),
      (ut._alignPixel = function (t, e, i) {
        var n = t.currentDevicePixelRatio,
          a = i / 2
        return Math.round((e - a) * n) / n + a
      }),
      (ut.splineCurve = function (t, e, i, n) {
        var a = t.skip ? e : t,
          o = e,
          r = i.skip ? e : i,
          s = Math.sqrt(Math.pow(o.x - a.x, 2) + Math.pow(o.y - a.y, 2)),
          l = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)),
          d = s / (s + l),
          u = l / (s + l),
          h = n * (d = isNaN(d) ? 0 : d),
          c = n * (u = isNaN(u) ? 0 : u)
        return {
          previous: { x: o.x - h * (r.x - a.x), y: o.y - h * (r.y - a.y) },
          next: { x: o.x + c * (r.x - a.x), y: o.y + c * (r.y - a.y) },
        }
      }),
      (ut.EPSILON = Number.EPSILON || 1e-14),
      (ut.splineCurveMonotone = function (t) {
        var e,
          i,
          n,
          a,
          o,
          r,
          s,
          l,
          d,
          u = (t || []).map(function (t) {
            return { model: t._model, deltaK: 0, mK: 0 }
          }),
          h = u.length
        for (e = 0; e < h; ++e)
          if (!(n = u[e]).model.skip) {
            if (
              ((i = e > 0 ? u[e - 1] : null),
              (a = e < h - 1 ? u[e + 1] : null) && !a.model.skip)
            ) {
              var c = a.model.x - n.model.x
              n.deltaK = 0 !== c ? (a.model.y - n.model.y) / c : 0
            }
            !i || i.model.skip
              ? (n.mK = n.deltaK)
              : !a || a.model.skip
              ? (n.mK = i.deltaK)
              : this.sign(i.deltaK) !== this.sign(n.deltaK)
              ? (n.mK = 0)
              : (n.mK = (i.deltaK + n.deltaK) / 2)
          }
        for (e = 0; e < h - 1; ++e)
          (n = u[e]),
            (a = u[e + 1]),
            n.model.skip ||
              a.model.skip ||
              (ut.almostEquals(n.deltaK, 0, this.EPSILON)
                ? (n.mK = a.mK = 0)
                : ((o = n.mK / n.deltaK),
                  (r = a.mK / n.deltaK),
                  (l = Math.pow(o, 2) + Math.pow(r, 2)) <= 9 ||
                    ((s = 3 / Math.sqrt(l)),
                    (n.mK = o * s * n.deltaK),
                    (a.mK = r * s * n.deltaK))))
        for (e = 0; e < h; ++e)
          (n = u[e]).model.skip ||
            ((i = e > 0 ? u[e - 1] : null),
            (a = e < h - 1 ? u[e + 1] : null),
            i &&
              !i.model.skip &&
              ((d = (n.model.x - i.model.x) / 3),
              (n.model.controlPointPreviousX = n.model.x - d),
              (n.model.controlPointPreviousY = n.model.y - d * n.mK)),
            a &&
              !a.model.skip &&
              ((d = (a.model.x - n.model.x) / 3),
              (n.model.controlPointNextX = n.model.x + d),
              (n.model.controlPointNextY = n.model.y + d * n.mK)))
      }),
      (ut.nextItem = function (t, e, i) {
        return i
          ? e >= t.length - 1
            ? t[0]
            : t[e + 1]
          : e >= t.length - 1
          ? t[t.length - 1]
          : t[e + 1]
      }),
      (ut.previousItem = function (t, e, i) {
        return i
          ? e <= 0
            ? t[t.length - 1]
            : t[e - 1]
          : e <= 0
          ? t[0]
          : t[e - 1]
      }),
      (ut.niceNum = function (t, e) {
        var i = Math.floor(ut.log10(t)),
          n = t / Math.pow(10, i)
        return (
          (e
            ? n < 1.5
              ? 1
              : n < 3
              ? 2
              : n < 7
              ? 5
              : 10
            : n <= 1
            ? 1
            : n <= 2
            ? 2
            : n <= 5
            ? 5
            : 10) * Math.pow(10, i)
        )
      }),
      (ut.requestAnimFrame =
        'undefined' == typeof window
          ? function (t) {
              t()
            }
          : window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (t) {
              return window.setTimeout(t, 1e3 / 60)
            }),
      (ut.getRelativePosition = function (t, e) {
        var i,
          n,
          a = t.originalEvent || t,
          o = t.target || t.srcElement,
          r = o.getBoundingClientRect(),
          s = a.touches
        s && s.length > 0
          ? ((i = s[0].clientX), (n = s[0].clientY))
          : ((i = a.clientX), (n = a.clientY))
        var l = parseFloat(ut.getStyle(o, 'padding-left')),
          d = parseFloat(ut.getStyle(o, 'padding-top')),
          u = parseFloat(ut.getStyle(o, 'padding-right')),
          h = parseFloat(ut.getStyle(o, 'padding-bottom')),
          c = r.right - r.left - l - u,
          f = r.bottom - r.top - d - h
        return {
          x: (i = Math.round(
            (((i - r.left - l) / c) * o.width) / e.currentDevicePixelRatio
          )),
          y: (n = Math.round(
            (((n - r.top - d) / f) * o.height) / e.currentDevicePixelRatio
          )),
        }
      }),
      (ut.getConstraintWidth = function (t) {
        return i(t, 'max-width', 'clientWidth')
      }),
      (ut.getConstraintHeight = function (t) {
        return i(t, 'max-height', 'clientHeight')
      }),
      (ut._calculatePadding = function (t, e, i) {
        return (e = ut.getStyle(t, e)).indexOf('%') > -1
          ? (i * parseInt(e, 10)) / 100
          : parseInt(e, 10)
      }),
      (ut._getParentNode = function (t) {
        var e = t.parentNode
        return e && '[object ShadowRoot]' === e.toString() && (e = e.host), e
      }),
      (ut.getMaximumWidth = function (t) {
        var e = ut._getParentNode(t)
        if (!e) return t.clientWidth
        var i = e.clientWidth,
          n =
            i -
            ut._calculatePadding(e, 'padding-left', i) -
            ut._calculatePadding(e, 'padding-right', i),
          a = ut.getConstraintWidth(t)
        return isNaN(a) ? n : Math.min(n, a)
      }),
      (ut.getMaximumHeight = function (t) {
        var e = ut._getParentNode(t)
        if (!e) return t.clientHeight
        var i = e.clientHeight,
          n =
            i -
            ut._calculatePadding(e, 'padding-top', i) -
            ut._calculatePadding(e, 'padding-bottom', i),
          a = ut.getConstraintHeight(t)
        return isNaN(a) ? n : Math.min(n, a)
      }),
      (ut.getStyle = function (t, e) {
        return t.currentStyle
          ? t.currentStyle[e]
          : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
      }),
      (ut.retinaScale = function (t, e) {
        var i = (t.currentDevicePixelRatio =
          e || ('undefined' != typeof window && window.devicePixelRatio) || 1)
        if (1 !== i) {
          var n = t.canvas,
            a = t.height,
            o = t.width
          ;(n.height = a * i),
            (n.width = o * i),
            t.ctx.scale(i, i),
            n.style.height ||
              n.style.width ||
              ((n.style.height = a + 'px'), (n.style.width = o + 'px'))
        }
      }),
      (ut.fontString = function (t, e, i) {
        return e + ' ' + t + 'px ' + i
      }),
      (ut.longestText = function (t, e, i, n) {
        var a = ((n = n || {}).data = n.data || {}),
          o = (n.garbageCollect = n.garbageCollect || [])
        n.font !== e &&
          ((a = n.data = {}), (o = n.garbageCollect = []), (n.font = e)),
          (t.font = e)
        var r = 0
        ut.each(i, function (e) {
          null != e && !0 !== ut.isArray(e)
            ? (r = ut.measureText(t, a, o, r, e))
            : ut.isArray(e) &&
              ut.each(e, function (e) {
                null == e ||
                  ut.isArray(e) ||
                  (r = ut.measureText(t, a, o, r, e))
              })
        })
        var s = o.length / 2
        if (s > i.length) {
          for (var l = 0; l < s; l++) delete a[o[l]]
          o.splice(0, s)
        }
        return r
      }),
      (ut.measureText = function (t, e, i, n, a) {
        var o = e[a]
        return (
          o || ((o = e[a] = t.measureText(a).width), i.push(a)),
          o > n && (n = o),
          n
        )
      }),
      (ut.numberOfLabelLines = function (t) {
        var e = 1
        return (
          ut.each(t, function (t) {
            ut.isArray(t) && t.length > e && (e = t.length)
          }),
          e
        )
      }),
      (ut.color = X
        ? function (t) {
            return (
              t instanceof CanvasGradient && (t = st.global.defaultColor), X(t)
            )
          }
        : function (t) {
            return console.error('Color.js not found!'), t
          }),
      (ut.getHoverColor = function (t) {
        return t instanceof CanvasPattern || t instanceof CanvasGradient
          ? t
          : ut.color(t).saturate(0.5).darken(0.1).rgbString()
      })
  })(),
  (ai._adapters = si),
  (ai.Animation = vt),
  (ai.animationService = bt),
  (ai.controllers = ue),
  (ai.DatasetController = Mt),
  (ai.defaults = st),
  (ai.Element = pt),
  (ai.elements = Wt),
  (ai.Interaction = ve),
  (ai.layouts = ke),
  (ai.platform = Ve),
  (ai.plugins = Ee),
  (ai.Scale = fi),
  (ai.scaleService = He),
  (ai.Ticks = li),
  (ai.Tooltip = Je),
  ai.helpers.each(tn, function (t, e) {
    ai.scaleService.registerScaleType(e, t, t._defaults)
  }),
  yn))
    yn.hasOwnProperty(_n) && ai.plugins.register(yn[_n])
  ai.platform.initialize()
  var Cn = ai
  return (
    'undefined' != typeof window && (window.Chart = ai),
    (ai.Chart = ai),
    (ai.Legend = yn.legend._element),
    (ai.Title = yn.title._element),
    (ai.pluginService = ai.plugins),
    (ai.PluginBase = ai.Element.extend({})),
    (ai.canvasHelpers = ai.helpers.canvas),
    (ai.layoutService = ai.layouts),
    (ai.LinearScaleBase = bi),
    ai.helpers.each(
      ['Bar', 'Bubble', 'Doughnut', 'Line', 'PolarArea', 'Radar', 'Scatter'],
      function (t) {
        ai[t] = function (e, i) {
          return new ai(
            e,
            ai.helpers.merge(i || {}, {
              type: t.charAt(0).toLowerCase() + t.slice(1),
            })
          )
        }
      }
    ),
    Cn
  )
})

!(function ($) {
  var apiParams = {
    set: {
      colors: 1,
      values: 1,
      backgroundColor: 1,
      scaleColors: 1,
      normalizeFunction: 1,
      focus: 1,
    },
    get: {
      selectedRegions: 1,
      selectedMarkers: 1,
      mapObject: 1,
      regionName: 1,
    },
  }
  $.fn.vectorMap = function (options) {
    var map,
      methodName,
      map = this.children('.jvectormap-container').data('mapObject')
    if ('addMap' === options) jvm.Map.maps[arguments[1]] = arguments[2]
    else {
      if (
        ('set' === options || 'get' === options) &&
        apiParams[options][arguments[1]]
      )
        return (
          (methodName =
            arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1)),
          map[options + methodName].apply(
            map,
            Array.prototype.slice.call(arguments, 2)
          )
        )
      ;(options = options || {}),
        (options.container = this),
        (map = new jvm.Map(options))
    }
    return this
  }
})(jQuery),
  (function (factory) {
    'function' == typeof define && define.amd
      ? define(['jquery'], factory)
      : 'object' == typeof exports
      ? (module.exports = factory)
      : factory(jQuery)
  })(function ($) {
    function handler(event) {
      var orgEvent = event || window.event,
        args = slice.call(arguments, 1),
        delta = 0,
        deltaX = 0,
        deltaY = 0,
        absDelta = 0
      if (
        ((event = $.event.fix(orgEvent)),
        (event.type = 'mousewheel'),
        'detail' in orgEvent && (deltaY = -1 * orgEvent.detail),
        'wheelDelta' in orgEvent && (deltaY = orgEvent.wheelDelta),
        'wheelDeltaY' in orgEvent && (deltaY = orgEvent.wheelDeltaY),
        'wheelDeltaX' in orgEvent && (deltaX = -1 * orgEvent.wheelDeltaX),
        'axis' in orgEvent &&
          orgEvent.axis === orgEvent.HORIZONTAL_AXIS &&
          ((deltaX = -1 * deltaY), (deltaY = 0)),
        (delta = 0 === deltaY ? deltaX : deltaY),
        'deltaY' in orgEvent &&
          ((deltaY = -1 * orgEvent.deltaY), (delta = deltaY)),
        'deltaX' in orgEvent &&
          ((deltaX = orgEvent.deltaX), 0 === deltaY && (delta = -1 * deltaX)),
        0 !== deltaY || 0 !== deltaX)
      ) {
        if (1 === orgEvent.deltaMode) {
          var lineHeight = $.data(this, 'mousewheel-line-height')
          ;(delta *= lineHeight), (deltaY *= lineHeight), (deltaX *= lineHeight)
        } else if (2 === orgEvent.deltaMode) {
          var pageHeight = $.data(this, 'mousewheel-page-height')
          ;(delta *= pageHeight), (deltaY *= pageHeight), (deltaX *= pageHeight)
        }
        return (
          (absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX))),
          (!lowestDelta || lowestDelta > absDelta) &&
            ((lowestDelta = absDelta),
            shouldAdjustOldDeltas(orgEvent, absDelta) && (lowestDelta /= 40)),
          shouldAdjustOldDeltas(orgEvent, absDelta) &&
            ((delta /= 40), (deltaX /= 40), (deltaY /= 40)),
          (delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta)),
          (deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta)),
          (deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta)),
          (event.deltaX = deltaX),
          (event.deltaY = deltaY),
          (event.deltaFactor = lowestDelta),
          (event.deltaMode = 0),
          args.unshift(event, delta, deltaX, deltaY),
          nullLowestDeltaTimeout && clearTimeout(nullLowestDeltaTimeout),
          (nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200)),
          ($.event.dispatch || $.event.handle).apply(this, args)
        )
      }
    }
    function nullLowestDelta() {
      lowestDelta = null
    }
    function shouldAdjustOldDeltas(orgEvent, absDelta) {
      return (
        special.settings.adjustOldDeltas &&
        'mousewheel' === orgEvent.type &&
        absDelta % 120 === 0
      )
    }
    var nullLowestDeltaTimeout,
      lowestDelta,
      toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
      toBind =
        'onwheel' in document || document.documentMode >= 9
          ? ['wheel']
          : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
      slice = Array.prototype.slice
    if ($.event.fixHooks)
      for (var i = toFix.length; i; )
        $.event.fixHooks[toFix[--i]] = $.event.mouseHooks
    var special = ($.event.special.mousewheel = {
      version: '3.1.9',
      setup: function () {
        if (this.addEventListener)
          for (var i = toBind.length; i; )
            this.addEventListener(toBind[--i], handler, !1)
        else this.onmousewheel = handler
        $.data(this, 'mousewheel-line-height', special.getLineHeight(this)),
          $.data(this, 'mousewheel-page-height', special.getPageHeight(this))
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var i = toBind.length; i; )
            this.removeEventListener(toBind[--i], handler, !1)
        else this.onmousewheel = null
      },
      getLineHeight: function (elem) {
        return parseInt(
          $(elem)
            ['offsetParent' in $.fn ? 'offsetParent' : 'parent']()
            .css('fontSize'),
          10
        )
      },
      getPageHeight: function (elem) {
        return $(elem).height()
      },
      settings: { adjustOldDeltas: !0 },
    })
    $.fn.extend({
      mousewheel: function (fn) {
        return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel')
      },
      unmousewheel: function (fn) {
        return this.unbind('mousewheel', fn)
      },
    })
  })
var jvm = {
  inherits: function (child, parent) {
    function temp() {}
    ;(temp.prototype = parent.prototype),
      (child.prototype = new temp()),
      (child.prototype.constructor = child),
      (child.parentClass = parent)
  },
  mixin: function (target, source) {
    var prop
    for (prop in source.prototype)
      source.prototype.hasOwnProperty(prop) &&
        (target.prototype[prop] = source.prototype[prop])
  },
  min: function (values) {
    var i,
      min = Number.MAX_VALUE
    if (values instanceof Array)
      for (i = 0; i < values.length; i++) values[i] < min && (min = values[i])
    else for (i in values) values[i] < min && (min = values[i])
    return min
  },
  max: function (values) {
    var i,
      max = Number.MIN_VALUE
    if (values instanceof Array)
      for (i = 0; i < values.length; i++) values[i] > max && (max = values[i])
    else for (i in values) values[i] > max && (max = values[i])
    return max
  },
  keys: function (object) {
    var key,
      keys = []
    for (key in object) keys.push(key)
    return keys
  },
  values: function (object) {
    var key,
      i,
      values = []
    for (i = 0; i < arguments.length; i++) {
      object = arguments[i]
      for (key in object) values.push(object[key])
    }
    return values
  },
  whenImageLoaded: function (url) {
    var deferred = new jvm.$.Deferred(),
      img = jvm.$('<img/>')
    return (
      img
        .error(function () {
          deferred.reject()
        })
        .load(function () {
          deferred.resolve(img)
        }),
      img.attr('src', url),
      deferred
    )
  },
  isImageUrl: function (s) {
    return /\.\w{3,4}$/.test(s)
  },
}
;(jvm.$ = jQuery),
  Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (searchElement, fromIndex) {
      var k
      if (null == this) throw new TypeError('"this" is null or not defined')
      var O = Object(this),
        len = O.length >>> 0
      if (0 === len) return -1
      var n = +fromIndex || 0
      if ((Math.abs(n) === 1 / 0 && (n = 0), n >= len)) return -1
      for (k = Math.max(n >= 0 ? n : len - Math.abs(n), 0); len > k; ) {
        if (k in O && O[k] === searchElement) return k
        k++
      }
      return -1
    }),
  (jvm.AbstractElement = function (name, config) {
    ;(this.node = this.createElement(name)),
      (this.name = name),
      (this.properties = {}),
      config && this.set(config)
  }),
  (jvm.AbstractElement.prototype.set = function (property, value) {
    var key
    if ('object' == typeof property)
      for (key in property)
        (this.properties[key] = property[key]),
          this.applyAttr(key, property[key])
    else (this.properties[property] = value), this.applyAttr(property, value)
  }),
  (jvm.AbstractElement.prototype.get = function (property) {
    return this.properties[property]
  }),
  (jvm.AbstractElement.prototype.applyAttr = function (property, value) {
    this.node.setAttribute(property, value)
  }),
  (jvm.AbstractElement.prototype.remove = function () {
    jvm.$(this.node).remove()
  }),
  (jvm.AbstractCanvasElement = function (container, width, height) {
    ;(this.container = container),
      this.setSize(width, height),
      (this.rootElement = new jvm[this.classPrefix + 'GroupElement']()),
      this.node.appendChild(this.rootElement.node),
      this.container.appendChild(this.node)
  }),
  (jvm.AbstractCanvasElement.prototype.add = function (element, group) {
    ;(group = group || this.rootElement),
      group.add(element),
      (element.canvas = this)
  }),
  (jvm.AbstractCanvasElement.prototype.addPath = function (
    config,
    style,
    group
  ) {
    var el = new jvm[this.classPrefix + 'PathElement'](config, style)
    return this.add(el, group), el
  }),
  (jvm.AbstractCanvasElement.prototype.addCircle = function (
    config,
    style,
    group
  ) {
    var el = new jvm[this.classPrefix + 'CircleElement'](config, style)
    return this.add(el, group), el
  }),
  (jvm.AbstractCanvasElement.prototype.addImage = function (
    config,
    style,
    group
  ) {
    var el = new jvm[this.classPrefix + 'ImageElement'](config, style)
    return this.add(el, group), el
  }),
  (jvm.AbstractCanvasElement.prototype.addText = function (
    config,
    style,
    group
  ) {
    var el = new jvm[this.classPrefix + 'TextElement'](config, style)
    return this.add(el, group), el
  }),
  (jvm.AbstractCanvasElement.prototype.addGroup = function (parentGroup) {
    var el = new jvm[this.classPrefix + 'GroupElement']()
    return (
      parentGroup
        ? parentGroup.node.appendChild(el.node)
        : this.node.appendChild(el.node),
      (el.canvas = this),
      el
    )
  }),
  (jvm.AbstractShapeElement = function (name, config, style) {
    ;(this.style = style || {}),
      (this.style.current = this.style.current || {}),
      (this.isHovered = !1),
      (this.isSelected = !1),
      this.updateStyle()
  }),
  (jvm.AbstractShapeElement.prototype.setStyle = function (property, value) {
    var styles = {}
    'object' == typeof property
      ? (styles = property)
      : (styles[property] = value),
      jvm.$.extend(this.style.current, styles),
      this.updateStyle()
  }),
  (jvm.AbstractShapeElement.prototype.updateStyle = function () {
    var attrs = {}
    jvm.AbstractShapeElement.mergeStyles(attrs, this.style.initial),
      jvm.AbstractShapeElement.mergeStyles(attrs, this.style.current),
      this.isHovered &&
        jvm.AbstractShapeElement.mergeStyles(attrs, this.style.hover),
      this.isSelected &&
        (jvm.AbstractShapeElement.mergeStyles(attrs, this.style.selected),
        this.isHovered &&
          jvm.AbstractShapeElement.mergeStyles(
            attrs,
            this.style.selectedHover
          )),
      this.set(attrs)
  }),
  (jvm.AbstractShapeElement.mergeStyles = function (styles, newStyles) {
    var key
    newStyles = newStyles || {}
    for (key in newStyles)
      null === newStyles[key]
        ? delete styles[key]
        : (styles[key] = newStyles[key])
  }),
  (jvm.SVGElement = function () {
    jvm.SVGElement.parentClass.apply(this, arguments)
  }),
  jvm.inherits(jvm.SVGElement, jvm.AbstractElement),
  (jvm.SVGElement.svgns = 'http://www.w3.org/2000/svg'),
  (jvm.SVGElement.prototype.createElement = function (tagName) {
    return document.createElementNS(jvm.SVGElement.svgns, tagName)
  }),
  (jvm.SVGElement.prototype.addClass = function (className) {
    this.node.setAttribute('class', className)
  }),
  (jvm.SVGElement.prototype.getElementCtr = function (ctr) {
    return jvm['SVG' + ctr]
  }),
  (jvm.SVGElement.prototype.getBBox = function () {
    return this.node.getBBox()
  }),
  (jvm.SVGGroupElement = function () {
    jvm.SVGGroupElement.parentClass.call(this, 'g')
  }),
  jvm.inherits(jvm.SVGGroupElement, jvm.SVGElement),
  (jvm.SVGGroupElement.prototype.add = function (element) {
    this.node.appendChild(element.node)
  }),
  (jvm.SVGCanvasElement = function () {
    ;(this.classPrefix = 'SVG'),
      jvm.SVGCanvasElement.parentClass.call(this, 'svg'),
      (this.defsElement = new jvm.SVGElement('defs')),
      this.node.appendChild(this.defsElement.node),
      jvm.AbstractCanvasElement.apply(this, arguments)
  }),
  jvm.inherits(jvm.SVGCanvasElement, jvm.SVGElement),
  jvm.mixin(jvm.SVGCanvasElement, jvm.AbstractCanvasElement),
  (jvm.SVGCanvasElement.prototype.setSize = function (width, height) {
    ;(this.width = width),
      (this.height = height),
      this.node.setAttribute('width', width),
      this.node.setAttribute('height', height)
  }),
  (jvm.SVGCanvasElement.prototype.applyTransformParams = function (
    scale,
    transX,
    transY
  ) {
    ;(this.scale = scale),
      (this.transX = transX),
      (this.transY = transY),
      this.rootElement.node.setAttribute(
        'transform',
        'scale(' + scale + ') translate(' + transX + ', ' + transY + ')'
      )
  }),
  (jvm.SVGShapeElement = function (name, config) {
    jvm.SVGShapeElement.parentClass.call(this, name, config),
      jvm.AbstractShapeElement.apply(this, arguments)
  }),
  jvm.inherits(jvm.SVGShapeElement, jvm.SVGElement),
  jvm.mixin(jvm.SVGShapeElement, jvm.AbstractShapeElement),
  (jvm.SVGShapeElement.prototype.applyAttr = function (attr, value) {
    var patternEl,
      imageEl,
      that = this
    'fill' === attr && jvm.isImageUrl(value)
      ? jvm.SVGShapeElement.images[value]
        ? this.applyAttr(
            'fill',
            'url(#image' + jvm.SVGShapeElement.images[value] + ')'
          )
        : jvm.whenImageLoaded(value).then(function (img) {
            ;(imageEl = new jvm.SVGElement('image')),
              imageEl.node.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'href',
                value
              ),
              imageEl.applyAttr('x', '0'),
              imageEl.applyAttr('y', '0'),
              imageEl.applyAttr('width', img[0].width),
              imageEl.applyAttr('height', img[0].height),
              (patternEl = new jvm.SVGElement('pattern')),
              patternEl.applyAttr(
                'id',
                'image' + jvm.SVGShapeElement.imageCounter
              ),
              patternEl.applyAttr('x', 0),
              patternEl.applyAttr('y', 0),
              patternEl.applyAttr('width', img[0].width / 2),
              patternEl.applyAttr('height', img[0].height / 2),
              patternEl.applyAttr(
                'viewBox',
                '0 0 ' + img[0].width + ' ' + img[0].height
              ),
              patternEl.applyAttr('patternUnits', 'userSpaceOnUse'),
              patternEl.node.appendChild(imageEl.node),
              that.canvas.defsElement.node.appendChild(patternEl.node),
              (jvm.SVGShapeElement.images[value] = jvm.SVGShapeElement
                .imageCounter++),
              that.applyAttr(
                'fill',
                'url(#image' + jvm.SVGShapeElement.images[value] + ')'
              )
          })
      : jvm.SVGShapeElement.parentClass.prototype.applyAttr.apply(
          this,
          arguments
        )
  }),
  (jvm.SVGShapeElement.imageCounter = 1),
  (jvm.SVGShapeElement.images = {}),
  (jvm.SVGPathElement = function (config, style) {
    jvm.SVGPathElement.parentClass.call(this, 'path', config, style),
      this.node.setAttribute('fill-rule', 'evenodd')
  }),
  jvm.inherits(jvm.SVGPathElement, jvm.SVGShapeElement),
  (jvm.SVGCircleElement = function (config, style) {
    jvm.SVGCircleElement.parentClass.call(this, 'circle', config, style)
  }),
  jvm.inherits(jvm.SVGCircleElement, jvm.SVGShapeElement),
  (jvm.SVGImageElement = function (config, style) {
    jvm.SVGImageElement.parentClass.call(this, 'image', config, style)
  }),
  jvm.inherits(jvm.SVGImageElement, jvm.SVGShapeElement),
  (jvm.SVGImageElement.prototype.applyAttr = function (attr, value) {
    var that = this
    'image' == attr
      ? jvm.whenImageLoaded(value).then(function (img) {
          that.node.setAttributeNS(
            'http://www.w3.org/1999/xlink',
            'href',
            value
          ),
            (that.width = img[0].width),
            (that.height = img[0].height),
            that.applyAttr('width', that.width),
            that.applyAttr('height', that.height),
            that.applyAttr('x', that.cx - that.width / 2),
            that.applyAttr('y', that.cy - that.height / 2),
            jvm.$(that.node).trigger('imageloaded', [img])
        })
      : 'cx' == attr
      ? ((this.cx = value),
        this.width && this.applyAttr('x', value - this.width / 2))
      : 'cy' == attr
      ? ((this.cy = value),
        this.height && this.applyAttr('y', value - this.height / 2))
      : jvm.SVGImageElement.parentClass.prototype.applyAttr.apply(
          this,
          arguments
        )
  }),
  (jvm.SVGTextElement = function (config, style) {
    jvm.SVGTextElement.parentClass.call(this, 'text', config, style)
  }),
  jvm.inherits(jvm.SVGTextElement, jvm.SVGShapeElement),
  (jvm.SVGTextElement.prototype.applyAttr = function (attr, value) {
    'text' === attr
      ? (this.node.textContent = value)
      : jvm.SVGTextElement.parentClass.prototype.applyAttr.apply(
          this,
          arguments
        )
  }),
  (jvm.VMLElement = function () {
    jvm.VMLElement.VMLInitialized || jvm.VMLElement.initializeVML(),
      jvm.VMLElement.parentClass.apply(this, arguments)
  }),
  jvm.inherits(jvm.VMLElement, jvm.AbstractElement),
  (jvm.VMLElement.VMLInitialized = !1),
  (jvm.VMLElement.initializeVML = function () {
    try {
      document.namespaces.rvml ||
        document.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml'),
        (jvm.VMLElement.prototype.createElement = function (tagName) {
          return document.createElement('<rvml:' + tagName + ' class="rvml">')
        })
    } catch (e) {
      jvm.VMLElement.prototype.createElement = function (tagName) {
        return document.createElement(
          '<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'
        )
      }
    }
    document.createStyleSheet().addRule('.rvml', 'behavior:url(#default#VML)'),
      (jvm.VMLElement.VMLInitialized = !0)
  }),
  (jvm.VMLElement.prototype.getElementCtr = function (ctr) {
    return jvm['VML' + ctr]
  }),
  (jvm.VMLElement.prototype.addClass = function (className) {
    jvm.$(this.node).addClass(className)
  }),
  (jvm.VMLElement.prototype.applyAttr = function (attr, value) {
    this.node[attr] = value
  }),
  (jvm.VMLElement.prototype.getBBox = function () {
    var node = jvm.$(this.node)
    return {
      x: node.position().left / this.canvas.scale,
      y: node.position().top / this.canvas.scale,
      width: node.width() / this.canvas.scale,
      height: node.height() / this.canvas.scale,
    }
  }),
  (jvm.VMLGroupElement = function () {
    jvm.VMLGroupElement.parentClass.call(this, 'group'),
      (this.node.style.left = '0px'),
      (this.node.style.top = '0px'),
      (this.node.coordorigin = '0 0')
  }),
  jvm.inherits(jvm.VMLGroupElement, jvm.VMLElement),
  (jvm.VMLGroupElement.prototype.add = function (element) {
    this.node.appendChild(element.node)
  }),
  (jvm.VMLCanvasElement = function () {
    ;(this.classPrefix = 'VML'),
      jvm.VMLCanvasElement.parentClass.call(this, 'group'),
      jvm.AbstractCanvasElement.apply(this, arguments),
      (this.node.style.position = 'absolute')
  }),
  jvm.inherits(jvm.VMLCanvasElement, jvm.VMLElement),
  jvm.mixin(jvm.VMLCanvasElement, jvm.AbstractCanvasElement),
  (jvm.VMLCanvasElement.prototype.setSize = function (width, height) {
    var paths, groups, i, l
    if (
      ((this.width = width),
      (this.height = height),
      (this.node.style.width = width + 'px'),
      (this.node.style.height = height + 'px'),
      (this.node.coordsize = width + ' ' + height),
      (this.node.coordorigin = '0 0'),
      this.rootElement)
    ) {
      for (
        paths = this.rootElement.node.getElementsByTagName('shape'),
          i = 0,
          l = paths.length;
        l > i;
        i++
      )
        (paths[i].coordsize = width + ' ' + height),
          (paths[i].style.width = width + 'px'),
          (paths[i].style.height = height + 'px')
      for (
        groups = this.node.getElementsByTagName('group'),
          i = 0,
          l = groups.length;
        l > i;
        i++
      )
        (groups[i].coordsize = width + ' ' + height),
          (groups[i].style.width = width + 'px'),
          (groups[i].style.height = height + 'px')
    }
  }),
  (jvm.VMLCanvasElement.prototype.applyTransformParams = function (
    scale,
    transX,
    transY
  ) {
    ;(this.scale = scale),
      (this.transX = transX),
      (this.transY = transY),
      (this.rootElement.node.coordorigin =
        this.width -
        transX -
        this.width / 100 +
        ',' +
        (this.height - transY - this.height / 100)),
      (this.rootElement.node.coordsize =
        this.width / scale + ',' + this.height / scale)
  }),
  (jvm.VMLShapeElement = function (name, config) {
    jvm.VMLShapeElement.parentClass.call(this, name, config),
      (this.fillElement = new jvm.VMLElement('fill')),
      (this.strokeElement = new jvm.VMLElement('stroke')),
      this.node.appendChild(this.fillElement.node),
      this.node.appendChild(this.strokeElement.node),
      (this.node.stroked = !1),
      jvm.AbstractShapeElement.apply(this, arguments)
  }),
  jvm.inherits(jvm.VMLShapeElement, jvm.VMLElement),
  jvm.mixin(jvm.VMLShapeElement, jvm.AbstractShapeElement),
  (jvm.VMLShapeElement.prototype.applyAttr = function (attr, value) {
    switch (attr) {
      case 'fill':
        this.node.fillcolor = value
        break
      case 'fill-opacity':
        this.fillElement.node.opacity = Math.round(100 * value) + '%'
        break
      case 'stroke':
        ;(this.node.stroked = 'none' === value ? !1 : !0),
          (this.node.strokecolor = value)
        break
      case 'stroke-opacity':
        this.strokeElement.node.opacity = Math.round(100 * value) + '%'
        break
      case 'stroke-width':
        ;(this.node.stroked = 0 === parseInt(value, 10) ? !1 : !0),
          (this.node.strokeweight = value)
        break
      case 'd':
        this.node.path = jvm.VMLPathElement.pathSvgToVml(value)
        break
      default:
        jvm.VMLShapeElement.parentClass.prototype.applyAttr.apply(
          this,
          arguments
        )
    }
  }),
  (jvm.VMLPathElement = function (config, style) {
    var scale = new jvm.VMLElement('skew')
    jvm.VMLPathElement.parentClass.call(this, 'shape', config, style),
      (this.node.coordorigin = '0 0'),
      (scale.node.on = !0),
      (scale.node.matrix = '0.01,0,0,0.01,0,0'),
      (scale.node.offset = '0,0'),
      this.node.appendChild(scale.node)
  }),
  jvm.inherits(jvm.VMLPathElement, jvm.VMLShapeElement),
  (jvm.VMLPathElement.prototype.applyAttr = function (attr, value) {
    'd' === attr
      ? (this.node.path = jvm.VMLPathElement.pathSvgToVml(value))
      : jvm.VMLShapeElement.prototype.applyAttr.call(this, attr, value)
  }),
  (jvm.VMLPathElement.pathSvgToVml = function (path) {
    var ctrlx,
      ctrly,
      cx = 0,
      cy = 0
    return (
      (path = path.replace(/(-?\d+)e(-?\d+)/g, '0')),
      path
        .replace(
          /([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g,
          function (segment, letter, coords) {
            ;(coords = coords
              .replace(/(\d)-/g, '$1,-')
              .replace(/^\s+/g, '')
              .replace(/\s+$/g, '')
              .replace(/\s+/g, ',')
              .split(',')),
              coords[0] || coords.shift()
            for (var i = 0, l = coords.length; l > i; i++)
              coords[i] = Math.round(100 * coords[i])
            switch (letter) {
              case 'm':
                return (
                  (cx += coords[0]), (cy += coords[1]), 't' + coords.join(',')
                )
              case 'M':
                return (
                  (cx = coords[0]), (cy = coords[1]), 'm' + coords.join(',')
                )
              case 'l':
                return (
                  (cx += coords[0]), (cy += coords[1]), 'r' + coords.join(',')
                )
              case 'L':
                return (
                  (cx = coords[0]), (cy = coords[1]), 'l' + coords.join(',')
                )
              case 'h':
                return (cx += coords[0]), 'r' + coords[0] + ',0'
              case 'H':
                return (cx = coords[0]), 'l' + cx + ',' + cy
              case 'v':
                return (cy += coords[0]), 'r0,' + coords[0]
              case 'V':
                return (cy = coords[0]), 'l' + cx + ',' + cy
              case 'c':
                return (
                  (ctrlx = cx + coords[coords.length - 4]),
                  (ctrly = cy + coords[coords.length - 3]),
                  (cx += coords[coords.length - 2]),
                  (cy += coords[coords.length - 1]),
                  'v' + coords.join(',')
                )
              case 'C':
                return (
                  (ctrlx = coords[coords.length - 4]),
                  (ctrly = coords[coords.length - 3]),
                  (cx = coords[coords.length - 2]),
                  (cy = coords[coords.length - 1]),
                  'c' + coords.join(',')
                )
              case 's':
                return (
                  coords.unshift(cy - ctrly),
                  coords.unshift(cx - ctrlx),
                  (ctrlx = cx + coords[coords.length - 4]),
                  (ctrly = cy + coords[coords.length - 3]),
                  (cx += coords[coords.length - 2]),
                  (cy += coords[coords.length - 1]),
                  'v' + coords.join(',')
                )
              case 'S':
                return (
                  coords.unshift(cy + cy - ctrly),
                  coords.unshift(cx + cx - ctrlx),
                  (ctrlx = coords[coords.length - 4]),
                  (ctrly = coords[coords.length - 3]),
                  (cx = coords[coords.length - 2]),
                  (cy = coords[coords.length - 1]),
                  'c' + coords.join(',')
                )
            }
            return ''
          }
        )
        .replace(/z/g, 'e')
    )
  }),
  (jvm.VMLCircleElement = function (config, style) {
    jvm.VMLCircleElement.parentClass.call(this, 'oval', config, style)
  }),
  jvm.inherits(jvm.VMLCircleElement, jvm.VMLShapeElement),
  (jvm.VMLCircleElement.prototype.applyAttr = function (attr, value) {
    switch (attr) {
      case 'r':
        ;(this.node.style.width = 2 * value + 'px'),
          (this.node.style.height = 2 * value + 'px'),
          this.applyAttr('cx', this.get('cx') || 0),
          this.applyAttr('cy', this.get('cy') || 0)
        break
      case 'cx':
        if (!value) return
        this.node.style.left = value - (this.get('r') || 0) + 'px'
        break
      case 'cy':
        if (!value) return
        this.node.style.top = value - (this.get('r') || 0) + 'px'
        break
      default:
        jvm.VMLCircleElement.parentClass.prototype.applyAttr.call(
          this,
          attr,
          value
        )
    }
  }),
  (jvm.VectorCanvas = function (container, width, height) {
    return (
      (this.mode = window.SVGAngle ? 'svg' : 'vml'),
      (this.impl =
        'svg' == this.mode
          ? new jvm.SVGCanvasElement(container, width, height)
          : new jvm.VMLCanvasElement(container, width, height)),
      (this.impl.mode = this.mode),
      this.impl
    )
  }),
  (jvm.SimpleScale = function (scale) {
    this.scale = scale
  }),
  (jvm.SimpleScale.prototype.getValue = function (value) {
    return value
  }),
  (jvm.OrdinalScale = function (scale) {
    this.scale = scale
  }),
  (jvm.OrdinalScale.prototype.getValue = function (value) {
    return this.scale[value]
  }),
  (jvm.OrdinalScale.prototype.getTicks = function () {
    var key,
      ticks = []
    for (key in this.scale) ticks.push({ label: key, value: this.scale[key] })
    return ticks
  }),
  (jvm.NumericScale = function (scale, normalizeFunction, minValue, maxValue) {
    ;(this.scale = []),
      (normalizeFunction = normalizeFunction || 'linear'),
      scale && this.setScale(scale),
      normalizeFunction && this.setNormalizeFunction(normalizeFunction),
      'undefined' != typeof minValue && this.setMin(minValue),
      'undefined' != typeof maxValue && this.setMax(maxValue)
  }),
  (jvm.NumericScale.prototype = {
    setMin: function (min) {
      ;(this.clearMinValue = min),
        (this.minValue =
          'function' == typeof this.normalize ? this.normalize(min) : min)
    },
    setMax: function (max) {
      ;(this.clearMaxValue = max),
        (this.maxValue =
          'function' == typeof this.normalize ? this.normalize(max) : max)
    },
    setScale: function (scale) {
      var i
      for (this.scale = [], i = 0; i < scale.length; i++)
        this.scale[i] = [scale[i]]
    },
    setNormalizeFunction: function (f) {
      'polynomial' === f
        ? (this.normalize = function (value) {
            return Math.pow(value, 0.2)
          })
        : 'linear' === f
        ? delete this.normalize
        : (this.normalize = f),
        this.setMin(this.clearMinValue),
        this.setMax(this.clearMaxValue)
    },
    getValue: function (value) {
      var l,
        c,
        lengthes = [],
        fullLength = 0,
        i = 0
      for (
        'function' == typeof this.normalize && (value = this.normalize(value)),
          i = 0;
        i < this.scale.length - 1;
        i++
      )
        (l = this.vectorLength(
          this.vectorSubtract(this.scale[i + 1], this.scale[i])
        )),
          lengthes.push(l),
          (fullLength += l)
      for (
        c = (this.maxValue - this.minValue) / fullLength, i = 0;
        i < lengthes.length;
        i++
      )
        lengthes[i] *= c
      for (i = 0, value -= this.minValue; value - lengthes[i] >= 0; )
        (value -= lengthes[i]), i++
      return (value = this.vectorToNum(
        i == this.scale.length - 1
          ? this.scale[i]
          : this.vectorAdd(
              this.scale[i],
              this.vectorMult(
                this.vectorSubtract(this.scale[i + 1], this.scale[i]),
                value / lengthes[i]
              )
            )
      ))
    },
    vectorToNum: function (vector) {
      var i,
        num = 0
      for (i = 0; i < vector.length; i++)
        num += Math.round(vector[i]) * Math.pow(256, vector.length - i - 1)
      return num
    },
    vectorSubtract: function (vector1, vector2) {
      var i,
        vector = []
      for (i = 0; i < vector1.length; i++) vector[i] = vector1[i] - vector2[i]
      return vector
    },
    vectorAdd: function (vector1, vector2) {
      var i,
        vector = []
      for (i = 0; i < vector1.length; i++) vector[i] = vector1[i] + vector2[i]
      return vector
    },
    vectorMult: function (vector, num) {
      var i,
        result = []
      for (i = 0; i < vector.length; i++) result[i] = vector[i] * num
      return result
    },
    vectorLength: function (vector) {
      var i,
        result = 0
      for (i = 0; i < vector.length; i++) result += vector[i] * vector[i]
      return Math.sqrt(result)
    },
    getTicks: function () {
      var tick,
        v,
        m = 5,
        extent = [this.clearMinValue, this.clearMaxValue],
        span = extent[1] - extent[0],
        step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
        err = (m / span) * step,
        ticks = []
      for (
        0.15 >= err
          ? (step *= 10)
          : 0.35 >= err
          ? (step *= 5)
          : 0.75 >= err && (step *= 2),
          extent[0] = Math.floor(extent[0] / step) * step,
          extent[1] = Math.ceil(extent[1] / step) * step,
          tick = extent[0];
        tick <= extent[1];

      )
        (v =
          tick == extent[0]
            ? this.clearMinValue
            : tick == extent[1]
            ? this.clearMaxValue
            : tick),
          ticks.push({ label: tick, value: this.getValue(v) }),
          (tick += step)
      return ticks
    },
  }),
  (jvm.ColorScale = function () {
    jvm.ColorScale.parentClass.apply(this, arguments)
  }),
  jvm.inherits(jvm.ColorScale, jvm.NumericScale),
  (jvm.ColorScale.prototype.setScale = function (scale) {
    var i
    for (i = 0; i < scale.length; i++)
      this.scale[i] = jvm.ColorScale.rgbToArray(scale[i])
  }),
  (jvm.ColorScale.prototype.getValue = function (value) {
    return jvm.ColorScale.numToRgb(
      jvm.ColorScale.parentClass.prototype.getValue.call(this, value)
    )
  }),
  (jvm.ColorScale.arrayToRgb = function (ar) {
    var d,
      i,
      rgb = '#'
    for (i = 0; i < ar.length; i++)
      (d = ar[i].toString(16)), (rgb += 1 == d.length ? '0' + d : d)
    return rgb
  }),
  (jvm.ColorScale.numToRgb = function (num) {
    for (num = num.toString(16); num.length < 6; ) num = '0' + num
    return '#' + num
  }),
  (jvm.ColorScale.rgbToArray = function (rgb) {
    return (
      (rgb = rgb.substr(1)),
      [
        parseInt(rgb.substr(0, 2), 16),
        parseInt(rgb.substr(2, 2), 16),
        parseInt(rgb.substr(4, 2), 16),
      ]
    )
  }),
  (jvm.Legend = function (params) {
    ;(this.params = params || {}),
      (this.map = this.params.map),
      (this.series = this.params.series),
      (this.body = jvm.$('<div/>')),
      this.body.addClass('jvectormap-legend'),
      this.params.cssClass && this.body.addClass(this.params.cssClass),
      params.vertical
        ? this.map.legendCntVertical.append(this.body)
        : this.map.legendCntHorizontal.append(this.body),
      this.render()
  }),
  (jvm.Legend.prototype.render = function () {
    var i,
      tick,
      sample,
      label,
      ticks = this.series.scale.getTicks(),
      inner = jvm.$('<div/>').addClass('jvectormap-legend-inner')
    for (
      this.body.html(''),
        this.params.title &&
          this.body.append(
            jvm
              .$('<div/>')
              .addClass('jvectormap-legend-title')
              .html(this.params.title)
          ),
        this.body.append(inner),
        i = 0;
      i < ticks.length;
      i++
    ) {
      switch (
        ((tick = jvm.$('<div/>').addClass('jvectormap-legend-tick')),
        (sample = jvm.$('<div/>').addClass('jvectormap-legend-tick-sample')),
        this.series.params.attribute)
      ) {
        case 'fill':
          jvm.isImageUrl(ticks[i].value)
            ? sample.css('background', 'url(' + ticks[i].value + ')')
            : sample.css('background', ticks[i].value)
          break
        case 'stroke':
          sample.css('background', ticks[i].value)
          break
        case 'image':
          sample.css(
            'background',
            'url(' + ticks[i].value + ') no-repeat center center'
          )
          break
        case 'r':
          jvm
            .$('<div/>')
            .css({
              'border-radius': ticks[i].value,
              border:
                this.map.params.markerStyle.initial['stroke-width'] +
                'px ' +
                this.map.params.markerStyle.initial.stroke +
                ' solid',
              width: 2 * ticks[i].value + 'px',
              height: 2 * ticks[i].value + 'px',
              background: this.map.params.markerStyle.initial.fill,
            })
            .appendTo(sample)
      }
      tick.append(sample),
        (label = ticks[i].label),
        this.params.labelRender && (label = this.params.labelRender(label)),
        tick.append(
          jvm
            .$('<div>' + label + ' </div>')
            .addClass('jvectormap-legend-tick-text')
        ),
        inner.append(tick)
    }
    inner.append(jvm.$('<div/>').css('clear', 'both'))
  }),
  (jvm.DataSeries = function (params, elements, map) {
    var scaleConstructor
    ;(params = params || {}),
      (params.attribute = params.attribute || 'fill'),
      (this.elements = elements),
      (this.params = params),
      (this.map = map),
      params.attributes && this.setAttributes(params.attributes),
      jvm.$.isArray(params.scale)
        ? ((scaleConstructor =
            'fill' === params.attribute || 'stroke' === params.attribute
              ? jvm.ColorScale
              : jvm.NumericScale),
          (this.scale = new scaleConstructor(
            params.scale,
            params.normalizeFunction,
            params.min,
            params.max
          )))
        : (this.scale = params.scale
            ? new jvm.OrdinalScale(params.scale)
            : new jvm.SimpleScale(params.scale)),
      (this.values = params.values || {}),
      this.setValues(this.values),
      this.params.legend &&
        (this.legend = new jvm.Legend(
          $.extend({ map: this.map, series: this }, this.params.legend)
        ))
  }),
  (jvm.DataSeries.prototype = {
    setAttributes: function (key, attr) {
      var code,
        attrs = key
      if ('string' == typeof key)
        this.elements[key] &&
          this.elements[key].setStyle(this.params.attribute, attr)
      else
        for (code in attrs)
          this.elements[code] &&
            this.elements[code].element.setStyle(
              this.params.attribute,
              attrs[code]
            )
    },
    setValues: function (values) {
      var val,
        cc,
        max = -Number.MAX_VALUE,
        min = Number.MAX_VALUE,
        attrs = {}
      if (
        this.scale instanceof jvm.OrdinalScale ||
        this.scale instanceof jvm.SimpleScale
      )
        for (cc in values)
          attrs[cc] = values[cc]
            ? this.scale.getValue(values[cc])
            : this.elements[cc].element.style.initial[this.params.attribute]
      else {
        if (
          'undefined' == typeof this.params.min ||
          'undefined' == typeof this.params.max
        )
          for (cc in values)
            (val = parseFloat(values[cc])),
              val > max && (max = val),
              min > val && (min = val)
        'undefined' == typeof this.params.min
          ? (this.scale.setMin(min), (this.params.min = min))
          : this.scale.setMin(this.params.min),
          'undefined' == typeof this.params.max
            ? (this.scale.setMax(max), (this.params.max = max))
            : this.scale.setMax(this.params.max)
        for (cc in values)
          'indexOf' != cc &&
            ((val = parseFloat(values[cc])),
            (attrs[cc] = isNaN(val)
              ? this.elements[cc].element.style.initial[this.params.attribute]
              : this.scale.getValue(val)))
      }
      this.setAttributes(attrs), jvm.$.extend(this.values, values)
    },
    clear: function () {
      var key,
        attrs = {}
      for (key in this.values)
        this.elements[key] &&
          (attrs[key] =
            this.elements[key].element.shape.style.initial[
              this.params.attribute
            ])
      this.setAttributes(attrs), (this.values = {})
    },
    setScale: function (scale) {
      this.scale.setScale(scale), this.values && this.setValues(this.values)
    },
    setNormalizeFunction: function (f) {
      this.scale.setNormalizeFunction(f),
        this.values && this.setValues(this.values)
    },
  }),
  (jvm.Proj = {
    degRad: 180 / Math.PI,
    radDeg: Math.PI / 180,
    radius: 6381372,
    sgn: function (n) {
      return n > 0 ? 1 : 0 > n ? -1 : n
    },
    mill: function (lat, lng, c) {
      return {
        x: this.radius * (lng - c) * this.radDeg,
        y:
          (-this.radius * Math.log(Math.tan((45 + 0.4 * lat) * this.radDeg))) /
          0.8,
      }
    },
    mill_inv: function (x, y, c) {
      return {
        lat:
          (2.5 * Math.atan(Math.exp((0.8 * y) / this.radius)) -
            (5 * Math.PI) / 8) *
          this.degRad,
        lng: (c * this.radDeg + x / this.radius) * this.degRad,
      }
    },
    merc: function (lat, lng, c) {
      return {
        x: this.radius * (lng - c) * this.radDeg,
        y:
          -this.radius *
          Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)),
      }
    },
    merc_inv: function (x, y, c) {
      return {
        lat:
          (2 * Math.atan(Math.exp(y / this.radius)) - Math.PI / 2) *
          this.degRad,
        lng: (c * this.radDeg + x / this.radius) * this.degRad,
      }
    },
    aea: function (lat, lng, c) {
      var fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 29.5 * this.radDeg,
        fi2 = 45.5 * this.radDeg,
        fi = lat * this.radDeg,
        lambda = lng * this.radDeg,
        n = (Math.sin(fi1) + Math.sin(fi2)) / 2,
        C = Math.cos(fi1) * Math.cos(fi1) + 2 * n * Math.sin(fi1),
        theta = n * (lambda - lambda0),
        ro = Math.sqrt(C - 2 * n * Math.sin(fi)) / n,
        ro0 = Math.sqrt(C - 2 * n * Math.sin(fi0)) / n
      return {
        x: ro * Math.sin(theta) * this.radius,
        y: -(ro0 - ro * Math.cos(theta)) * this.radius,
      }
    },
    aea_inv: function (xCoord, yCoord, c) {
      var x = xCoord / this.radius,
        y = yCoord / this.radius,
        fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 29.5 * this.radDeg,
        fi2 = 45.5 * this.radDeg,
        n = (Math.sin(fi1) + Math.sin(fi2)) / 2,
        C = Math.cos(fi1) * Math.cos(fi1) + 2 * n * Math.sin(fi1),
        ro0 = Math.sqrt(C - 2 * n * Math.sin(fi0)) / n,
        ro = Math.sqrt(x * x + (ro0 - y) * (ro0 - y)),
        theta = Math.atan(x / (ro0 - y))
      return {
        lat: Math.asin((C - ro * ro * n * n) / (2 * n)) * this.degRad,
        lng: (lambda0 + theta / n) * this.degRad,
      }
    },
    lcc: function (lat, lng, c) {
      var fi0 = 0,
        lambda0 = c * this.radDeg,
        lambda = lng * this.radDeg,
        fi1 = 33 * this.radDeg,
        fi2 = 45 * this.radDeg,
        fi = lat * this.radDeg,
        n =
          Math.log(Math.cos(fi1) * (1 / Math.cos(fi2))) /
          Math.log(
            Math.tan(Math.PI / 4 + fi2 / 2) *
              (1 / Math.tan(Math.PI / 4 + fi1 / 2))
          ),
        F = (Math.cos(fi1) * Math.pow(Math.tan(Math.PI / 4 + fi1 / 2), n)) / n,
        ro = F * Math.pow(1 / Math.tan(Math.PI / 4 + fi / 2), n),
        ro0 = F * Math.pow(1 / Math.tan(Math.PI / 4 + fi0 / 2), n)
      return {
        x: ro * Math.sin(n * (lambda - lambda0)) * this.radius,
        y: -(ro0 - ro * Math.cos(n * (lambda - lambda0))) * this.radius,
      }
    },
    lcc_inv: function (xCoord, yCoord, c) {
      var x = xCoord / this.radius,
        y = yCoord / this.radius,
        fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 33 * this.radDeg,
        fi2 = 45 * this.radDeg,
        n =
          Math.log(Math.cos(fi1) * (1 / Math.cos(fi2))) /
          Math.log(
            Math.tan(Math.PI / 4 + fi2 / 2) *
              (1 / Math.tan(Math.PI / 4 + fi1 / 2))
          ),
        F = (Math.cos(fi1) * Math.pow(Math.tan(Math.PI / 4 + fi1 / 2), n)) / n,
        ro0 = F * Math.pow(1 / Math.tan(Math.PI / 4 + fi0 / 2), n),
        ro = this.sgn(n) * Math.sqrt(x * x + (ro0 - y) * (ro0 - y)),
        theta = Math.atan(x / (ro0 - y))
      return {
        lat:
          (2 * Math.atan(Math.pow(F / ro, 1 / n)) - Math.PI / 2) * this.degRad,
        lng: (lambda0 + theta / n) * this.degRad,
      }
    },
  }),
  (jvm.MapObject = function () {}),
  (jvm.MapObject.prototype.getLabelText = function (key) {
    var text
    return (text = this.config.label
      ? 'function' == typeof this.config.label.render
        ? this.config.label.render(key)
        : key
      : null)
  }),
  (jvm.MapObject.prototype.getLabelOffsets = function (key) {
    var offsets
    return (
      this.config.label &&
        ('function' == typeof this.config.label.offsets
          ? (offsets = this.config.label.offsets(key))
          : 'object' == typeof this.config.label.offsets &&
            (offsets = this.config.label.offsets[key])),
      offsets || [0, 0]
    )
  }),
  (jvm.MapObject.prototype.setHovered = function (isHovered) {
    this.isHovered !== isHovered &&
      ((this.isHovered = isHovered),
      (this.shape.isHovered = isHovered),
      this.shape.updateStyle(),
      this.label &&
        ((this.label.isHovered = isHovered), this.label.updateStyle()))
  }),
  (jvm.MapObject.prototype.setSelected = function (isSelected) {
    this.isSelected !== isSelected &&
      ((this.isSelected = isSelected),
      (this.shape.isSelected = isSelected),
      this.shape.updateStyle(),
      this.label &&
        ((this.label.isSelected = isSelected), this.label.updateStyle()),
      jvm.$(this.shape).trigger('selected', [isSelected]))
  }),
  (jvm.MapObject.prototype.setStyle = function () {
    this.shape.setStyle.apply(this.shape, arguments)
  }),
  (jvm.MapObject.prototype.remove = function () {
    this.shape.remove(), this.label && this.label.remove()
  }),
  (jvm.Region = function (config) {
    var bbox, text, offsets
    ;(this.config = config),
      (this.map = this.config.map),
      (this.shape = config.canvas.addPath(
        { d: config.path, 'data-code': config.code },
        config.style,
        config.canvas.rootElement
      )),
      this.shape.addClass('jvectormap-region jvectormap-element'),
      (bbox = this.shape.getBBox()),
      (text = this.getLabelText(config.code)),
      this.config.label &&
        text &&
        ((offsets = this.getLabelOffsets(config.code)),
        (this.labelX = bbox.x + bbox.width / 2 + offsets[0]),
        (this.labelY = bbox.y + bbox.height / 2 + offsets[1]),
        (this.label = config.canvas.addText(
          {
            text: text,
            'text-anchor': 'middle',
            'alignment-baseline': 'central',
            x: this.labelX,
            y: this.labelY,
            'data-code': config.code,
          },
          config.labelStyle,
          config.labelsGroup
        )),
        this.label.addClass('jvectormap-region jvectormap-element'))
  }),
  jvm.inherits(jvm.Region, jvm.MapObject),
  (jvm.Region.prototype.updateLabelPosition = function () {
    this.label &&
      this.label.set({
        x: this.labelX * this.map.scale + this.map.transX * this.map.scale,
        y: this.labelY * this.map.scale + this.map.transY * this.map.scale,
      })
  }),
  (jvm.Marker = function (config) {
    var text
    ;(this.config = config),
      (this.map = this.config.map),
      (this.isImage = !!this.config.style.initial.image),
      this.createShape(),
      (text = this.getLabelText(config.index)),
      this.config.label &&
        text &&
        ((this.offsets = this.getLabelOffsets(config.index)),
        (this.labelX = config.cx / this.map.scale - this.map.transX),
        (this.labelY = config.cy / this.map.scale - this.map.transY),
        (this.label = config.canvas.addText(
          {
            text: text,
            'data-index': config.index,
            dy: '0.6ex',
            x: this.labelX,
            y: this.labelY,
          },
          config.labelStyle,
          config.labelsGroup
        )),
        this.label.addClass('jvectormap-marker jvectormap-element'))
  }),
  jvm.inherits(jvm.Marker, jvm.MapObject),
  (jvm.Marker.prototype.createShape = function () {
    var that = this
    this.shape && this.shape.remove(),
      (this.shape = this.config.canvas[this.isImage ? 'addImage' : 'addCircle'](
        {
          'data-index': this.config.index,
          cx: this.config.cx,
          cy: this.config.cy,
        },
        this.config.style,
        this.config.group
      )),
      this.shape.addClass('jvectormap-marker jvectormap-element'),
      this.isImage &&
        jvm.$(this.shape.node).on('imageloaded', function () {
          that.updateLabelPosition()
        })
  }),
  (jvm.Marker.prototype.updateLabelPosition = function () {
    this.label &&
      this.label.set({
        x:
          this.labelX * this.map.scale +
          this.offsets[0] +
          this.map.transX * this.map.scale +
          5 +
          (this.isImage
            ? (this.shape.width || 0) / 2
            : this.shape.properties.r),
        y:
          this.labelY * this.map.scale +
          this.map.transY * this.map.scale +
          this.offsets[1],
      })
  }),
  (jvm.Marker.prototype.setStyle = function (property) {
    var isImage
    jvm.Marker.parentClass.prototype.setStyle.apply(this, arguments),
      'r' === property && this.updateLabelPosition(),
      (isImage = !!this.shape.get('image')),
      isImage != this.isImage &&
        ((this.isImage = isImage),
        (this.config.style = jvm.$.extend(!0, {}, this.shape.style)),
        this.createShape())
  }),
  (jvm.Map = function (params) {
    var e,
      map = this
    if (
      ((this.params = jvm.$.extend(!0, {}, jvm.Map.defaultParams, params)),
      !jvm.Map.maps[this.params.map])
    )
      throw new Error(
        'Attempt to use map which was not loaded: ' + this.params.map
      )
    ;(this.mapData = jvm.Map.maps[this.params.map]),
      (this.markers = {}),
      (this.regions = {}),
      (this.regionsColors = {}),
      (this.regionsData = {}),
      (this.container = jvm.$('<div>').addClass('jvectormap-container')),
      this.params.container && this.params.container.append(this.container),
      this.container.data('mapObject', this),
      (this.defaultWidth = this.mapData.width),
      (this.defaultHeight = this.mapData.height),
      this.setBackgroundColor(this.params.backgroundColor),
      (this.onResize = function () {
        map.updateSize()
      }),
      jvm.$(window).resize(this.onResize)
    for (e in jvm.Map.apiEvents)
      this.params[e] &&
        this.container.bind(
          jvm.Map.apiEvents[e] + '.jvectormap',
          this.params[e]
        )
    ;(this.canvas = new jvm.VectorCanvas(
      this.container[0],
      this.width,
      this.height
    )),
      this.params.bindTouchEvents &&
        ('ontouchstart' in window ||
        (window.DocumentTouch && document instanceof DocumentTouch)
          ? this.bindContainerTouchEvents()
          : window.MSGesture && this.bindContainerPointerEvents()),
      this.bindContainerEvents(),
      this.bindElementEvents(),
      this.createTip(),
      this.params.zoomButtons && this.bindZoomButtons(),
      this.createRegions(),
      this.createMarkers(this.params.markers || {}),
      this.updateSize(),
      this.params.focusOn &&
        ('string' == typeof this.params.focusOn
          ? (this.params.focusOn = { region: this.params.focusOn })
          : jvm.$.isArray(this.params.focusOn) &&
            (this.params.focusOn = { regions: this.params.focusOn }),
        this.setFocus(this.params.focusOn)),
      this.params.selectedRegions &&
        this.setSelectedRegions(this.params.selectedRegions),
      this.params.selectedMarkers &&
        this.setSelectedMarkers(this.params.selectedMarkers),
      (this.legendCntHorizontal = jvm
        .$('<div/>')
        .addClass('jvectormap-legend-cnt jvectormap-legend-cnt-h')),
      (this.legendCntVertical = jvm
        .$('<div/>')
        .addClass('jvectormap-legend-cnt jvectormap-legend-cnt-v')),
      this.container.append(this.legendCntHorizontal),
      this.container.append(this.legendCntVertical),
      this.params.series && this.createSeries()
  }),
  (jvm.Map.prototype = {
    transX: 0,
    transY: 0,
    scale: 1,
    baseTransX: 0,
    baseTransY: 0,
    baseScale: 1,
    width: 0,
    height: 0,
    setBackgroundColor: function (backgroundColor) {
      this.container.css('background-color', backgroundColor)
    },
    resize: function () {
      var curBaseScale = this.baseScale
      this.width / this.height > this.defaultWidth / this.defaultHeight
        ? ((this.baseScale = this.height / this.defaultHeight),
          (this.baseTransX =
            Math.abs(this.width - this.defaultWidth * this.baseScale) /
            (2 * this.baseScale)))
        : ((this.baseScale = this.width / this.defaultWidth),
          (this.baseTransY =
            Math.abs(this.height - this.defaultHeight * this.baseScale) /
            (2 * this.baseScale))),
        (this.scale *= this.baseScale / curBaseScale),
        (this.transX *= this.baseScale / curBaseScale),
        (this.transY *= this.baseScale / curBaseScale)
    },
    updateSize: function () {
      ;(this.width = this.container.width()),
        (this.height = this.container.height()),
        this.resize(),
        this.canvas.setSize(this.width, this.height),
        this.applyTransform()
    },
    reset: function () {
      var key, i
      for (key in this.series)
        for (i = 0; i < this.series[key].length; i++)
          this.series[key][i].clear()
      ;(this.scale = this.baseScale),
        (this.transX = this.baseTransX),
        (this.transY = this.baseTransY),
        this.applyTransform()
    },
    applyTransform: function () {
      var maxTransX, maxTransY, minTransX, minTransY
      this.defaultWidth * this.scale <= this.width
        ? ((maxTransX =
            (this.width - this.defaultWidth * this.scale) / (2 * this.scale)),
          (minTransX =
            (this.width - this.defaultWidth * this.scale) / (2 * this.scale)))
        : ((maxTransX = 0),
          (minTransX =
            (this.width - this.defaultWidth * this.scale) / this.scale)),
        this.defaultHeight * this.scale <= this.height
          ? ((maxTransY =
              (this.height - this.defaultHeight * this.scale) /
              (2 * this.scale)),
            (minTransY =
              (this.height - this.defaultHeight * this.scale) /
              (2 * this.scale)))
          : ((maxTransY = 0),
            (minTransY =
              (this.height - this.defaultHeight * this.scale) / this.scale)),
        this.transY > maxTransY
          ? (this.transY = maxTransY)
          : this.transY < minTransY && (this.transY = minTransY),
        this.transX > maxTransX
          ? (this.transX = maxTransX)
          : this.transX < minTransX && (this.transX = minTransX),
        this.canvas.applyTransformParams(this.scale, this.transX, this.transY),
        this.markers && this.repositionMarkers(),
        this.repositionLabels(),
        this.container.trigger('viewportChange', [
          this.scale / this.baseScale,
          this.transX,
          this.transY,
        ])
    },
    bindContainerEvents: function () {
      var oldPageX,
        oldPageY,
        mouseDown = !1,
        map = this
      this.params.panOnDrag &&
        (this.container
          .mousemove(function (e) {
            return (
              mouseDown &&
                ((map.transX -= (oldPageX - e.pageX) / map.scale),
                (map.transY -= (oldPageY - e.pageY) / map.scale),
                map.applyTransform(),
                (oldPageX = e.pageX),
                (oldPageY = e.pageY)),
              !1
            )
          })
          .mousedown(function (e) {
            return (
              (mouseDown = !0), (oldPageX = e.pageX), (oldPageY = e.pageY), !1
            )
          }),
        (this.onContainerMouseUp = function () {
          mouseDown = !1
        }),
        jvm.$('body').mouseup(this.onContainerMouseUp)),
        this.params.zoomOnScroll &&
          this.container.mousewheel(function (event) {
            var offset = jvm.$(map.container).offset(),
              centerX = event.pageX - offset.left,
              centerY = event.pageY - offset.top,
              zoomStep = Math.pow(
                1 + map.params.zoomOnScrollSpeed / 1e3,
                event.deltaFactor * event.deltaY
              )
            map.tip.hide(),
              map.setScale(map.scale * zoomStep, centerX, centerY),
              event.preventDefault()
          })
    },
    bindContainerTouchEvents: function () {
      var touchStartScale,
        touchStartDistance,
        touchX,
        touchY,
        centerTouchX,
        centerTouchY,
        lastTouchesLength,
        map = this,
        handleTouchEvent = function (e) {
          var offset,
            scale,
            transXOld,
            transYOld,
            touches = e.originalEvent.touches
          'touchstart' == e.type && (lastTouchesLength = 0),
            1 == touches.length
              ? (1 == lastTouchesLength &&
                  ((transXOld = map.transX),
                  (transYOld = map.transY),
                  (map.transX -= (touchX - touches[0].pageX) / map.scale),
                  (map.transY -= (touchY - touches[0].pageY) / map.scale),
                  map.applyTransform(),
                  map.tip.hide(),
                  (transXOld != map.transX || transYOld != map.transY) &&
                    e.preventDefault()),
                (touchX = touches[0].pageX),
                (touchY = touches[0].pageY))
              : 2 == touches.length &&
                (2 == lastTouchesLength
                  ? ((scale =
                      Math.sqrt(
                        Math.pow(touches[0].pageX - touches[1].pageX, 2) +
                          Math.pow(touches[0].pageY - touches[1].pageY, 2)
                      ) / touchStartDistance),
                    map.setScale(
                      touchStartScale * scale,
                      centerTouchX,
                      centerTouchY
                    ),
                    map.tip.hide(),
                    e.preventDefault())
                  : ((offset = jvm.$(map.container).offset()),
                    (centerTouchX =
                      touches[0].pageX > touches[1].pageX
                        ? touches[1].pageX +
                          (touches[0].pageX - touches[1].pageX) / 2
                        : touches[0].pageX +
                          (touches[1].pageX - touches[0].pageX) / 2),
                    (centerTouchY =
                      touches[0].pageY > touches[1].pageY
                        ? touches[1].pageY +
                          (touches[0].pageY - touches[1].pageY) / 2
                        : touches[0].pageY +
                          (touches[1].pageY - touches[0].pageY) / 2),
                    (centerTouchX -= offset.left),
                    (centerTouchY -= offset.top),
                    (touchStartScale = map.scale),
                    (touchStartDistance = Math.sqrt(
                      Math.pow(touches[0].pageX - touches[1].pageX, 2) +
                        Math.pow(touches[0].pageY - touches[1].pageY, 2)
                    )))),
            (lastTouchesLength = touches.length)
        }
      jvm.$(this.container).bind('touchstart', handleTouchEvent),
        jvm.$(this.container).bind('touchmove', handleTouchEvent)
    },
    bindContainerPointerEvents: function () {
      var map = this,
        gesture = new MSGesture(),
        element = this.container[0],
        handlePointerDownEvent = function (e) {
          gesture.addPointer(e.pointerId)
        },
        handleGestureEvent = function (e) {
          var transXOld, transYOld
          ;(0 != e.translationX || 0 != e.translationY) &&
            ((transXOld = map.transX),
            (transYOld = map.transY),
            (map.transX += e.translationX / map.scale),
            (map.transY += e.translationY / map.scale),
            map.applyTransform(),
            map.tip.hide(),
            (transXOld != map.transX || transYOld != map.transY) &&
              e.preventDefault()),
            1 != e.scale &&
              (map.setScale(map.scale * e.scale, e.offsetX, e.offsetY),
              map.tip.hide(),
              e.preventDefault())
        }
      ;(gesture.target = element),
        element.addEventListener('MSGestureChange', handleGestureEvent, !1),
        element.addEventListener('pointerdown', handlePointerDownEvent, !1)
    },
    bindElementEvents: function () {
      var pageX,
        pageY,
        mouseMoved,
        map = this
      this.container.mousemove(function (e) {
        Math.abs(pageX - e.pageX) + Math.abs(pageY - e.pageY) > 2 &&
          (mouseMoved = !0)
      }),
        this.container.delegate(
          "[class~='jvectormap-element']",
          'mouseover mouseout',
          function (e) {
            var baseVal =
                jvm.$(this).attr('class').baseVal || jvm.$(this).attr('class'),
              type =
                -1 === baseVal.indexOf('jvectormap-region')
                  ? 'marker'
                  : 'region',
              code = jvm
                .$(this)
                .attr('region' == type ? 'data-code' : 'data-index'),
              element =
                'region' == type
                  ? map.regions[code].element
                  : map.markers[code].element,
              tipText =
                'region' == type
                  ? map.mapData.paths[code].name
                  : map.markers[code].config.name || '',
              tipShowEvent = jvm.$.Event(type + 'TipShow.jvectormap'),
              overEvent = jvm.$.Event(type + 'Over.jvectormap')
            'mouseover' == e.type
              ? (map.container.trigger(overEvent, [code]),
                overEvent.isDefaultPrevented() || element.setHovered(!0),
                map.tip.text(tipText),
                map.container.trigger(tipShowEvent, [map.tip, code]),
                tipShowEvent.isDefaultPrevented() ||
                  (map.tip.show(),
                  (map.tipWidth = map.tip.width()),
                  (map.tipHeight = map.tip.height())))
              : (element.setHovered(!1),
                map.tip.hide(),
                map.container.trigger(type + 'Out.jvectormap', [code]))
          }
        ),
        this.container.delegate(
          "[class~='jvectormap-element']",
          'mousedown',
          function (e) {
            ;(pageX = e.pageX), (pageY = e.pageY), (mouseMoved = !1)
          }
        ),
        this.container.delegate(
          "[class~='jvectormap-element']",
          'mouseup',
          function () {
            var baseVal = jvm.$(this).attr('class').baseVal
                ? jvm.$(this).attr('class').baseVal
                : jvm.$(this).attr('class'),
              type =
                -1 === baseVal.indexOf('jvectormap-region')
                  ? 'marker'
                  : 'region',
              code = jvm
                .$(this)
                .attr('region' == type ? 'data-code' : 'data-index'),
              clickEvent = jvm.$.Event(type + 'Click.jvectormap'),
              element =
                'region' == type
                  ? map.regions[code].element
                  : map.markers[code].element
            mouseMoved ||
              (map.container.trigger(clickEvent, [code]),
              (('region' === type && map.params.regionsSelectable) ||
                ('marker' === type && map.params.markersSelectable)) &&
                (clickEvent.isDefaultPrevented() ||
                  (map.params[type + 'sSelectableOne'] &&
                    map.clearSelected(type + 's'),
                  element.setSelected(!element.isSelected))))
          }
        )
    },
    bindZoomButtons: function () {
      var map = this
      jvm
        .$('<div/>')
        .addClass('jvectormap-zoomin')
        .text('+')
        .appendTo(this.container),
        jvm
          .$('<div/>')
          .addClass('jvectormap-zoomout')
          .html('&#x2212;')
          .appendTo(this.container),
        this.container.find('.jvectormap-zoomin').click(function () {
          map.setScale(
            map.scale * map.params.zoomStep,
            map.width / 2,
            map.height / 2,
            !1,
            map.params.zoomAnimate
          )
        }),
        this.container.find('.jvectormap-zoomout').click(function () {
          map.setScale(
            map.scale / map.params.zoomStep,
            map.width / 2,
            map.height / 2,
            !1,
            map.params.zoomAnimate
          )
        })
    },
    createTip: function () {
      var map = this
      ;(this.tip = jvm
        .$('<div/>')
        .addClass('jvectormap-tip')
        .appendTo(jvm.$('body'))),
        this.container.mousemove(function (e) {
          var left = e.pageX - 15 - map.tipWidth,
            top = e.pageY - 15 - map.tipHeight
          5 > left && (left = e.pageX + 15),
            5 > top && (top = e.pageY + 15),
            map.tip.css({ left: left, top: top })
        })
    },
    setScale: function (scale, anchorX, anchorY, isCentered, animate) {
      var interval,
        scaleStart,
        scaleDiff,
        transXStart,
        transXDiff,
        transYStart,
        transYDiff,
        transX,
        transY,
        viewportChangeEvent = jvm.$.Event('zoom.jvectormap'),
        that = this,
        i = 0,
        count = Math.abs(
          Math.round((60 * (scale - this.scale)) / Math.max(scale, this.scale))
        ),
        deferred = new jvm.$.Deferred()
      return (
        scale > this.params.zoomMax * this.baseScale
          ? (scale = this.params.zoomMax * this.baseScale)
          : scale < this.params.zoomMin * this.baseScale &&
            (scale = this.params.zoomMin * this.baseScale),
        'undefined' != typeof anchorX &&
          'undefined' != typeof anchorY &&
          ((zoomStep = scale / this.scale),
          isCentered
            ? ((transX =
                anchorX +
                (this.defaultWidth *
                  (this.width / (this.defaultWidth * scale))) /
                  2),
              (transY =
                anchorY +
                (this.defaultHeight *
                  (this.height / (this.defaultHeight * scale))) /
                  2))
            : ((transX = this.transX - ((zoomStep - 1) / scale) * anchorX),
              (transY = this.transY - ((zoomStep - 1) / scale) * anchorY))),
        animate && count > 0
          ? ((scaleStart = this.scale),
            (scaleDiff = (scale - scaleStart) / count),
            (transXStart = this.transX * this.scale),
            (transYStart = this.transY * this.scale),
            (transXDiff = (transX * scale - transXStart) / count),
            (transYDiff = (transY * scale - transYStart) / count),
            (interval = setInterval(function () {
              ;(i += 1),
                (that.scale = scaleStart + scaleDiff * i),
                (that.transX = (transXStart + transXDiff * i) / that.scale),
                (that.transY = (transYStart + transYDiff * i) / that.scale),
                that.applyTransform(),
                i == count &&
                  (clearInterval(interval),
                  that.container.trigger(viewportChangeEvent, [
                    scale / that.baseScale,
                  ]),
                  deferred.resolve())
            }, 10)))
          : ((this.transX = transX),
            (this.transY = transY),
            (this.scale = scale),
            this.applyTransform(),
            this.container.trigger(viewportChangeEvent, [
              scale / this.baseScale,
            ]),
            deferred.resolve()),
        deferred
      )
    },
    setFocus: function (config) {
      var bbox, itemBbox, newBbox, codes, i, point
      if (
        ((config = config || {}),
        config.region
          ? (codes = [config.region])
          : config.regions && (codes = config.regions),
        codes)
      ) {
        for (i = 0; i < codes.length; i++)
          this.regions[codes[i]] &&
            ((itemBbox = this.regions[codes[i]].element.shape.getBBox()),
            itemBbox &&
              ('undefined' == typeof bbox
                ? (bbox = itemBbox)
                : ((newBbox = {
                    x: Math.min(bbox.x, itemBbox.x),
                    y: Math.min(bbox.y, itemBbox.y),
                    width:
                      Math.max(
                        bbox.x + bbox.width,
                        itemBbox.x + itemBbox.width
                      ) - Math.min(bbox.x, itemBbox.x),
                    height:
                      Math.max(
                        bbox.y + bbox.height,
                        itemBbox.y + itemBbox.height
                      ) - Math.min(bbox.y, itemBbox.y),
                  }),
                  (bbox = newBbox))))
        return this.setScale(
          Math.min(this.width / bbox.width, this.height / bbox.height),
          -(bbox.x + bbox.width / 2),
          -(bbox.y + bbox.height / 2),
          !0,
          config.animate
        )
      }
      return (
        config.lat && config.lng
          ? ((point = this.latLngToPoint(config.lat, config.lng)),
            (config.x = this.transX - point.x / this.scale),
            (config.y = this.transY - point.y / this.scale))
          : config.x &&
            config.y &&
            ((config.x *= -this.defaultWidth),
            (config.y *= -this.defaultHeight)),
        this.setScale(
          config.scale * this.baseScale,
          config.x,
          config.y,
          !0,
          config.animate
        )
      )
    },
    getSelected: function (type) {
      var key,
        selected = []
      for (key in this[type])
        this[type][key].element.isSelected && selected.push(key)
      return selected
    },
    getSelectedRegions: function () {
      return this.getSelected('regions')
    },
    getSelectedMarkers: function () {
      return this.getSelected('markers')
    },
    setSelected: function (type, keys) {
      var i
      if (('object' != typeof keys && (keys = [keys]), jvm.$.isArray(keys)))
        for (i = 0; i < keys.length; i++)
          this[type][keys[i]].element.setSelected(!0)
      else for (i in keys) this[type][i].element.setSelected(!!keys[i])
    },
    setSelectedRegions: function (keys) {
      this.setSelected('regions', keys)
    },
    setSelectedMarkers: function (keys) {
      this.setSelected('markers', keys)
    },
    clearSelected: function (type) {
      var i,
        select = {},
        selected = this.getSelected(type)
      for (i = 0; i < selected.length; i++) select[selected[i]] = !1
      this.setSelected(type, select)
    },
    clearSelectedRegions: function () {
      this.clearSelected('regions')
    },
    clearSelectedMarkers: function () {
      this.clearSelected('markers')
    },
    getMapObject: function () {
      return this
    },
    getRegionName: function (code) {
      return this.mapData.paths[code].name
    },
    createRegions: function () {
      var key,
        region,
        map = this
      this.regionLabelsGroup = this.regionLabelsGroup || this.canvas.addGroup()
      for (key in this.mapData.paths)
        (region = new jvm.Region({
          map: this,
          path: this.mapData.paths[key].path,
          code: key,
          style: jvm.$.extend(!0, {}, this.params.regionStyle),
          labelStyle: jvm.$.extend(!0, {}, this.params.regionLabelStyle),
          canvas: this.canvas,
          labelsGroup: this.regionLabelsGroup,
          label:
            'vml' != this.canvas.mode
              ? this.params.labels && this.params.labels.regions
              : null,
        })),
          jvm.$(region.shape).bind('selected', function (e, isSelected) {
            map.container.trigger('regionSelected.jvectormap', [
              jvm.$(this.node).attr('data-code'),
              isSelected,
              map.getSelectedRegions(),
            ])
          }),
          (this.regions[key] = {
            element: region,
            config: this.mapData.paths[key],
          })
    },
    createMarkers: function (markers) {
      var i,
        marker,
        point,
        markerConfig,
        markersArray,
        map = this
      if (
        ((this.markersGroup = this.markersGroup || this.canvas.addGroup()),
        (this.markerLabelsGroup =
          this.markerLabelsGroup || this.canvas.addGroup()),
        jvm.$.isArray(markers))
      )
        for (
          markersArray = markers.slice(), markers = {}, i = 0;
          i < markersArray.length;
          i++
        )
          markers[i] = markersArray[i]
      for (i in markers)
        (markerConfig =
          markers[i] instanceof Array ? { latLng: markers[i] } : markers[i]),
          (point = this.getMarkerPosition(markerConfig)),
          point !== !1 &&
            ((marker = new jvm.Marker({
              map: this,
              style: jvm.$.extend(!0, {}, this.params.markerStyle, {
                initial: markerConfig.style || {},
              }),
              labelStyle: jvm.$.extend(!0, {}, this.params.markerLabelStyle),
              index: i,
              cx: point.x,
              cy: point.y,
              group: this.markersGroup,
              canvas: this.canvas,
              labelsGroup: this.markerLabelsGroup,
              label:
                'vml' != this.canvas.mode
                  ? this.params.labels && this.params.labels.markers
                  : null,
            })),
            jvm.$(marker.shape).bind('selected', function (e, isSelected) {
              map.container.trigger('markerSelected.jvectormap', [
                jvm.$(this.node).attr('data-index'),
                isSelected,
                map.getSelectedMarkers(),
              ])
            }),
            this.markers[i] && this.removeMarkers([i]),
            (this.markers[i] = { element: marker, config: markerConfig }))
    },
    repositionMarkers: function () {
      var i, point
      for (i in this.markers)
        (point = this.getMarkerPosition(this.markers[i].config)),
          point !== !1 &&
            this.markers[i].element.setStyle({ cx: point.x, cy: point.y })
    },
    repositionLabels: function () {
      var key
      for (key in this.regions) this.regions[key].element.updateLabelPosition()
      for (key in this.markers) this.markers[key].element.updateLabelPosition()
    },
    getMarkerPosition: function (markerConfig) {
      return jvm.Map.maps[this.params.map].projection
        ? this.latLngToPoint.apply(this, markerConfig.latLng || [0, 0])
        : {
            x: markerConfig.coords[0] * this.scale + this.transX * this.scale,
            y: markerConfig.coords[1] * this.scale + this.transY * this.scale,
          }
    },
    addMarker: function (key, marker, seriesData) {
      var values,
        i,
        markers = {},
        data = [],
        seriesData = seriesData || []
      for (markers[key] = marker, i = 0; i < seriesData.length; i++)
        (values = {}),
          'undefined' != typeof seriesData[i] && (values[key] = seriesData[i]),
          data.push(values)
      this.addMarkers(markers, data)
    },
    addMarkers: function (markers, seriesData) {
      var i
      for (
        seriesData = seriesData || [], this.createMarkers(markers), i = 0;
        i < seriesData.length;
        i++
      )
        this.series.markers[i].setValues(seriesData[i] || {})
    },
    removeMarkers: function (markers) {
      var i
      for (i = 0; i < markers.length; i++)
        this.markers[markers[i]].element.remove(),
          delete this.markers[markers[i]]
    },
    removeAllMarkers: function () {
      var i,
        markers = []
      for (i in this.markers) markers.push(i)
      this.removeMarkers(markers)
    },
    latLngToPoint: function (lat, lng) {
      var point,
        inset,
        bbox,
        proj = jvm.Map.maps[this.params.map].projection,
        centralMeridian = proj.centralMeridian
      return (
        -180 + centralMeridian > lng && (lng += 360),
        (point = jvm.Proj[proj.type](lat, lng, centralMeridian)),
        (inset = this.getInsetForPoint(point.x, point.y)),
        inset
          ? ((bbox = inset.bbox),
            (point.x =
              ((point.x - bbox[0].x) / (bbox[1].x - bbox[0].x)) *
              inset.width *
              this.scale),
            (point.y =
              ((point.y - bbox[0].y) / (bbox[1].y - bbox[0].y)) *
              inset.height *
              this.scale),
            {
              x: point.x + this.transX * this.scale + inset.left * this.scale,
              y: point.y + this.transY * this.scale + inset.top * this.scale,
            })
          : !1
      )
    },
    pointToLatLng: function (x, y) {
      var i,
        inset,
        bbox,
        nx,
        ny,
        proj = jvm.Map.maps[this.params.map].projection,
        centralMeridian = proj.centralMeridian,
        insets = jvm.Map.maps[this.params.map].insets
      for (i = 0; i < insets.length; i++)
        if (
          ((inset = insets[i]),
          (bbox = inset.bbox),
          (nx = x - (this.transX * this.scale + inset.left * this.scale)),
          (ny = y - (this.transY * this.scale + inset.top * this.scale)),
          (nx =
            (nx / (inset.width * this.scale)) * (bbox[1].x - bbox[0].x) +
            bbox[0].x),
          (ny =
            (ny / (inset.height * this.scale)) * (bbox[1].y - bbox[0].y) +
            bbox[0].y),
          nx > bbox[0].x && nx < bbox[1].x && ny > bbox[0].y && ny < bbox[1].y)
        )
          return jvm.Proj[proj.type + '_inv'](nx, -ny, centralMeridian)
      return !1
    },
    getInsetForPoint: function (x, y) {
      var i,
        bbox,
        insets = jvm.Map.maps[this.params.map].insets
      for (i = 0; i < insets.length; i++)
        if (
          ((bbox = insets[i].bbox),
          x > bbox[0].x && x < bbox[1].x && y > bbox[0].y && y < bbox[1].y)
        )
          return insets[i]
    },
    createSeries: function () {
      var i, key
      this.series = { markers: [], regions: [] }
      for (key in this.params.series)
        for (i = 0; i < this.params.series[key].length; i++)
          this.series[key][i] = new jvm.DataSeries(
            this.params.series[key][i],
            this[key],
            this
          )
    },
    remove: function () {
      this.tip.remove(),
        this.container.remove(),
        jvm.$(window).unbind('resize', this.onResize),
        jvm.$('body').unbind('mouseup', this.onContainerMouseUp)
    },
  }),
  (jvm.Map.maps = {}),
  (jvm.Map.defaultParams = {
    map: 'world_mill_en',
    backgroundColor: '#505050',
    zoomButtons: !0,
    zoomOnScroll: !0,
    zoomOnScrollSpeed: 3,
    panOnDrag: !0,
    zoomMax: 8,
    zoomMin: 1,
    zoomStep: 1.6,
    zoomAnimate: !0,
    regionsSelectable: !1,
    markersSelectable: !1,
    bindTouchEvents: !0,
    regionStyle: {
      initial: {
        fill: 'white',
        'fill-opacity': 1,
        stroke: 'none',
        'stroke-width': 0,
        'stroke-opacity': 1,
      },
      hover: { 'fill-opacity': 0.8, cursor: 'pointer' },
      selected: { fill: 'yellow' },
      selectedHover: {},
    },
    regionLabelStyle: {
      initial: {
        'font-family': 'Verdana',
        'font-size': '12',
        'font-weight': 'bold',
        cursor: 'default',
        fill: 'black',
      },
      hover: { cursor: 'pointer' },
    },
    markerStyle: {
      initial: {
        fill: 'grey',
        stroke: '#505050',
        'fill-opacity': 1,
        'stroke-width': 1,
        'stroke-opacity': 1,
        r: 5,
      },
      hover: { stroke: 'black', 'stroke-width': 2, cursor: 'pointer' },
      selected: { fill: 'blue' },
      selectedHover: {},
    },
    markerLabelStyle: {
      initial: {
        'font-family': 'Verdana',
        'font-size': '12',
        'font-weight': 'bold',
        cursor: 'default',
        fill: 'black',
      },
      hover: { cursor: 'pointer' },
    },
  }),
  (jvm.Map.apiEvents = {
    onRegionTipShow: 'regionTipShow',
    onRegionOver: 'regionOver',
    onRegionOut: 'regionOut',
    onRegionClick: 'regionClick',
    onRegionSelected: 'regionSelected',
    onMarkerTipShow: 'markerTipShow',
    onMarkerOver: 'markerOver',
    onMarkerOut: 'markerOut',
    onMarkerClick: 'markerClick',
    onMarkerSelected: 'markerSelected',
    onViewportChange: 'viewportChange',
  }),
  (jvm.MultiMap = function (params) {
    var that = this
    ;(this.maps = {}),
      (this.params = jvm.$.extend(!0, {}, jvm.MultiMap.defaultParams, params)),
      (this.params.maxLevel = this.params.maxLevel || Number.MAX_VALUE),
      (this.params.main = this.params.main || {}),
      (this.params.main.multiMapLevel = 0),
      (this.history = [this.addMap(this.params.main.map, this.params.main)]),
      (this.defaultProjection = this.history[0].mapData.projection.type),
      (this.mapsLoaded = {}),
      this.params.container.css({ position: 'relative' }),
      (this.backButton = jvm
        .$('<div/>')
        .addClass('jvectormap-goback')
        .text('Back')
        .appendTo(this.params.container)),
      this.backButton.hide(),
      this.backButton.click(function () {
        that.goBack()
      }),
      (this.spinner = jvm
        .$('<div/>')
        .addClass('jvectormap-spinner')
        .appendTo(this.params.container)),
      this.spinner.hide()
  }),
  (jvm.MultiMap.prototype = {
    addMap: function (name, config) {
      var cnt = jvm.$('<div/>').css({ width: '100%', height: '100%' })
      return (
        this.params.container.append(cnt),
        (this.maps[name] = new jvm.Map(
          jvm.$.extend(config, { container: cnt })
        )),
        this.params.maxLevel > config.multiMapLevel &&
          this.maps[name].container.on(
            'regionClick.jvectormap',
            { scope: this },
            function (e, code) {
              var multimap = e.data.scope,
                mapName = multimap.params.mapNameByCode(code, multimap)
              ;(multimap.drillDownPromise &&
                'pending' === multimap.drillDownPromise.state()) ||
                multimap.drillDown(mapName, code)
            }
          ),
        this.maps[name]
      )
    },
    downloadMap: function (code) {
      var that = this,
        deferred = jvm.$.Deferred()
      return (
        this.mapsLoaded[code]
          ? deferred.resolve()
          : jvm.$.get(this.params.mapUrlByCode(code, this)).then(
              function () {
                ;(that.mapsLoaded[code] = !0), deferred.resolve()
              },
              function () {
                deferred.reject()
              }
            ),
        deferred
      )
    },
    drillDown: function (name, code) {
      var currentMap = this.history[this.history.length - 1],
        that = this,
        focusPromise = currentMap.setFocus({ region: code, animate: !0 }),
        downloadPromise = this.downloadMap(code)
      focusPromise.then(function () {
        'pending' === downloadPromise.state() && that.spinner.show()
      }),
        downloadPromise.always(function () {
          that.spinner.hide()
        }),
        (this.drillDownPromise = jvm.$.when(downloadPromise, focusPromise)),
        this.drillDownPromise.then(function () {
          currentMap.params.container.hide(),
            that.maps[name]
              ? that.maps[name].params.container.show()
              : that.addMap(name, {
                  map: name,
                  multiMapLevel: currentMap.params.multiMapLevel + 1,
                }),
            that.history.push(that.maps[name]),
            that.backButton.show()
        })
    },
    goBack: function () {
      var currentMap = this.history.pop(),
        prevMap = this.history[this.history.length - 1],
        that = this
      currentMap
        .setFocus({ scale: 1, x: 0.5, y: 0.5, animate: !0 })
        .then(function () {
          currentMap.params.container.hide(),
            prevMap.params.container.show(),
            prevMap.updateSize(),
            1 === that.history.length && that.backButton.hide(),
            prevMap.setFocus({ scale: 1, x: 0.5, y: 0.5, animate: !0 })
        })
    },
  }),
  (jvm.MultiMap.defaultParams = {
    mapNameByCode: function (code, multiMap) {
      return code.toLowerCase() + '_' + multiMap.defaultProjection + '_en'
    },
    mapUrlByCode: function (code, multiMap) {
      return (
        'jquery-jvectormap-data-' +
        code.toLowerCase() +
        '-' +
        multiMap.defaultProjection +
        '-en.js'
      )
    },
  })
jQuery.fn.vectorMap('addMap', 'world_mill_en', {
  insets: [
    {
      width: 900,
      top: 0,
      height: 440.70631074413296,
      bbox: [
        { y: -12671671.123330014, x: -20004297.151525836 },
        { y: 6930392.025135122, x: 20026572.39474939 },
      ],
      left: 0,
    },
  ],
  paths: {
    BD: {
      path: 'M651.84,230.21l-0.6,-2.0l-1.36,-1.71l-2.31,-0.11l-0.41,0.48l0.2,0.94l-0.53,0.99l-0.72,-0.36l-0.68,0.35l-1.2,-0.36l-0.37,-2.0l-0.81,-1.86l0.39,-1.46l-0.22,-0.47l-1.14,-0.53l0.29,-0.5l1.48,-0.94l0.03,-0.65l-1.55,-1.22l0.55,-1.14l1.61,0.94l1.04,0.15l0.18,1.54l0.34,0.35l5.64,0.63l-0.84,1.64l-1.22,0.34l-0.77,1.51l0.07,0.47l1.37,1.37l0.67,-0.19l0.42,-1.39l1.21,3.84l-0.03,1.21l-0.33,-0.15l-0.4,0.28Z',
      name: 'Bangladesh',
    },
    BE: {
      path: 'M429.29,144.05l1.91,0.24l2.1,-0.63l2.63,1.99l-0.21,1.66l-0.69,0.4l-0.18,1.2l-1.66,-1.13l-1.39,0.15l-2.73,-2.7l-1.17,-0.18l-0.16,-0.52l1.54,-0.5Z',
      name: 'Belgium',
    },
    BF: {
      path: 'M421.42,247.64l-0.11,0.95l0.34,1.16l1.4,1.71l0.07,1.1l0.32,0.37l2.55,0.51l-0.04,1.28l-0.38,0.53l-1.07,0.21l-0.72,1.18l-0.63,0.21l-3.22,-0.25l-0.94,0.39l-5.4,-0.05l-0.39,0.38l0.16,2.73l-1.23,-0.43l-1.17,0.1l-0.89,0.57l-2.27,-1.72l-0.13,-1.11l0.61,-0.96l0.02,-0.93l1.87,-1.98l0.44,-1.81l0.43,-0.39l1.28,0.26l1.05,-0.52l0.47,-0.73l1.84,-1.09l0.55,-0.83l2.2,-1.0l1.15,-0.3l0.72,0.45l1.13,-0.01Z',
      name: 'Burkina Faso',
    },
    BG: {
      path: 'M491.65,168.18l-0.86,0.88l-0.91,2.17l0.48,1.34l-1.6,-0.24l-2.55,0.95l-0.28,1.51l-1.8,0.22l-2.0,-1.0l-1.92,0.79l-1.42,-0.07l-0.15,-1.63l-1.05,-0.97l0.0,-0.8l1.2,-1.57l0.01,-0.56l-1.14,-1.23l-0.05,-0.94l0.88,0.97l0.88,-0.2l1.91,0.47l3.68,0.16l1.42,-0.81l2.72,-0.66l2.55,1.24Z',
      name: 'Bulgaria',
    },
    BA: {
      path: 'M463.49,163.65l2.1,0.5l1.72,-0.03l1.52,0.68l-0.36,0.78l0.08,0.45l1.04,1.02l-0.25,0.98l-1.81,1.15l-0.38,1.38l-1.67,-0.87l-0.89,-1.2l-2.11,-1.83l-1.63,-2.22l0.23,-0.57l0.48,0.38l0.55,-0.06l0.43,-0.51l0.94,-0.06Z',
      name: 'Bosnia and Herz.',
    },
    BN: {
      path: 'M707.48,273.58l0.68,-0.65l1.41,-0.91l-0.15,1.63l-0.81,-0.05l-0.61,0.58l-0.53,-0.6Z',
      name: 'Brunei',
    },
    BO: {
      path: 'M263.83,340.69l-3.09,-0.23l-0.38,0.23l-0.7,1.52l-1.31,-1.53l-3.28,-0.64l-2.37,2.4l-1.31,0.26l-0.88,-3.26l-1.3,-2.86l0.74,-2.37l-0.13,-0.43l-1.2,-1.01l-0.37,-1.89l-1.08,-1.55l1.45,-2.56l-0.96,-2.33l0.47,-1.06l-0.34,-0.73l0.91,-1.32l0.16,-3.84l0.5,-1.18l-1.81,-3.41l2.46,0.07l0.8,-0.85l3.4,-1.91l2.66,-0.35l-0.19,1.38l0.3,1.07l-0.05,1.97l2.72,2.27l2.88,0.49l0.89,0.86l1.79,0.58l0.98,0.7l1.71,0.05l1.17,0.61l0.6,2.7l-0.7,0.54l0.96,2.99l0.37,0.28l4.3,0.1l-0.25,1.2l0.27,1.02l1.43,0.9l0.5,1.35l-0.41,1.86l-0.65,1.08l0.12,1.35l-2.69,-1.65l-2.4,-0.03l-4.36,0.76l-1.49,2.5l-0.11,1.52l-0.75,2.37Z',
      name: 'Bolivia',
    },
    JP: {
      path: 'M781.12,166.87l1.81,0.68l1.62,-0.97l0.39,2.42l-3.35,0.75l-2.23,2.88l-3.63,-1.9l-0.56,0.2l-1.26,3.05l-2.16,0.03l-0.29,-2.51l1.08,-2.03l2.45,-0.16l0.37,-0.33l1.25,-5.94l2.47,2.71l2.03,1.12ZM773.56,187.34l-0.91,2.22l0.37,1.52l-1.14,1.75l-3.02,1.26l-4.58,0.27l-3.34,3.01l-1.25,-0.8l-0.09,-1.9l-0.46,-0.38l-4.35,0.62l-3.0,1.32l-2.85,0.05l-0.37,0.27l0.13,0.44l2.32,1.89l-1.54,4.34l-1.26,0.9l-0.79,-0.7l0.56,-2.27l-0.21,-0.45l-1.47,-0.75l-0.74,-1.4l2.12,-0.84l1.26,-1.7l2.45,-1.42l1.83,-1.91l4.78,-0.81l2.6,0.57l0.44,-0.21l2.39,-4.66l1.29,1.06l0.5,0.01l5.1,-4.02l1.69,-3.73l-0.38,-3.4l0.9,-1.61l2.14,-0.44l1.23,3.72l-0.07,2.18l-2.23,2.84l-0.04,3.16ZM757.78,196.26l0.19,0.56l-1.01,1.21l-1.16,-0.68l-1.28,0.65l-0.69,1.45l-1.02,-0.5l0.01,-0.93l1.14,-1.38l1.57,0.14l0.85,-0.98l1.4,0.46Z',
      name: 'Japan',
    },
    BI: {
      path: 'M495.45,295.49l-1.08,-2.99l1.14,-0.11l0.64,-1.19l0.76,0.09l0.65,1.83l-2.1,2.36Z',
      name: 'Burundi',
    },
    BJ: {
      path: 'M429.57,255.75l-0.05,0.8l0.5,1.34l-0.42,0.86l0.17,0.79l-1.81,2.12l-0.57,1.76l-0.08,5.42l-1.41,0.2l-0.48,-1.36l0.11,-5.71l-0.52,-0.7l-0.2,-1.35l-1.48,-1.48l0.21,-0.9l0.89,-0.43l0.42,-0.92l1.27,-0.36l1.22,-1.34l0.61,-0.0l1.62,1.24Z',
      name: 'Benin',
    },
    BT: {
      path: 'M650.32,213.86l0.84,0.71l-0.12,1.1l-3.76,-0.11l-1.57,0.4l-1.93,-0.87l1.48,-1.96l1.13,-0.57l1.63,0.57l1.33,0.08l0.99,0.65Z',
      name: 'Bhutan',
    },
    JM: {
      path: 'M228.38,239.28l-0.8,0.4l-2.26,-1.06l0.84,-0.23l2.14,0.3l1.17,0.56l-1.08,0.03Z',
      name: 'Jamaica',
    },
    BW: {
      path: 'M483.92,330.07l2.27,4.01l2.83,2.86l0.96,0.31l0.78,2.43l2.13,0.61l1.02,0.76l-3.0,1.64l-2.32,2.02l-1.54,2.69l-1.52,0.45l-0.64,1.94l-1.34,0.52l-1.85,-0.12l-1.21,-0.74l-1.35,-0.3l-1.22,0.62l-0.75,1.37l-2.31,1.9l-1.4,0.21l-0.35,-0.59l0.16,-1.75l-1.48,-2.54l-0.62,-0.43l-0.0,-7.1l2.08,-0.08l0.39,-0.4l0.07,-8.9l5.19,-0.93l0.8,0.89l0.51,0.07l1.5,-0.95l2.21,-0.49Z',
      name: 'Botswana',
    },
    BR: {
      path: 'M259.98,275.05l3.24,0.7l0.65,-0.53l4.55,-1.32l1.08,-1.06l-0.02,-0.63l0.55,-0.05l0.28,0.28l-0.26,0.87l0.22,0.48l0.73,0.32l0.4,0.81l-0.62,0.86l-0.4,2.13l0.82,2.56l1.69,1.43l1.43,0.2l3.17,-1.68l3.18,0.3l0.65,-0.75l-0.27,-0.92l1.9,-0.09l2.39,0.99l1.06,-0.61l0.84,0.78l1.2,-0.18l1.18,-1.06l0.84,-1.94l1.36,-2.11l0.37,-0.05l1.89,5.45l1.33,0.59l0.05,1.28l-1.77,1.94l0.02,0.56l1.02,0.87l4.07,0.36l0.08,2.16l0.66,0.29l1.74,-1.5l6.97,2.32l1.02,1.22l-0.35,1.18l0.49,0.5l2.81,-0.74l4.77,1.3l3.75,-0.08l3.57,2.0l3.29,2.86l1.93,0.72l2.12,0.12l0.71,0.62l1.21,4.51l-0.95,3.98l-4.72,5.06l-1.64,2.92l-1.72,2.05l-0.8,0.3l-0.72,2.03l0.18,4.75l-0.94,5.53l-0.81,1.13l-0.43,3.36l-2.55,3.5l-0.4,2.51l-1.86,1.04l-0.67,1.53l-2.54,0.01l-3.94,1.01l-1.83,1.2l-2.87,0.82l-3.03,2.19l-2.2,2.83l-0.36,2.0l0.4,1.58l-0.44,2.6l-0.51,1.2l-1.77,1.54l-2.75,4.78l-3.83,3.42l-1.24,2.74l-1.18,1.15l-0.36,-0.83l0.95,-1.14l0.01,-0.5l-1.52,-1.97l-4.56,-3.32l-1.03,-0.0l-2.38,-2.02l-0.81,-0.0l5.34,-5.45l3.77,-2.58l0.22,-2.46l-1.35,-1.81l-0.91,0.07l0.58,-2.33l0.01,-1.54l-1.11,-0.83l-1.75,0.3l-0.44,-3.11l-0.52,-0.95l-1.88,-0.88l-1.24,0.47l-2.17,-0.41l0.15,-3.21l-0.62,-1.34l0.66,-0.73l-0.22,-1.34l0.66,-1.13l0.44,-2.04l-0.61,-1.83l-1.4,-0.86l-0.2,-0.75l0.34,-1.39l-0.38,-0.5l-4.52,-0.1l-0.72,-2.22l0.59,-0.42l-0.03,-1.1l-0.5,-0.87l-0.32,-1.7l-1.45,-0.76l-1.63,-0.02l-1.05,-0.72l-1.6,-0.48l-1.13,-0.99l-2.69,-0.4l-2.47,-2.06l0.13,-4.35l-0.45,-0.45l-3.46,0.5l-3.44,1.94l-0.6,0.74l-2.9,-0.17l-1.47,0.42l-0.72,-0.18l0.15,-3.52l-0.63,-0.34l-1.94,1.41l-1.87,-0.06l-0.83,-1.18l-1.37,-0.26l0.21,-1.01l-1.35,-1.49l-0.88,-1.91l0.56,-0.6l-0.0,-0.81l1.29,-0.62l0.22,-0.43l-0.22,-1.19l0.61,-0.91l0.15,-0.99l2.65,-1.58l1.99,-0.47l0.42,-0.36l2.06,0.11l0.42,-0.33l1.19,-8.0l-0.41,-1.56l-1.1,-1.0l0.01,-1.33l1.91,-0.42l0.08,-0.96l-0.33,-0.43l-1.14,-0.2l-0.02,-0.83l4.47,0.05l0.82,-0.67l0.82,1.81l0.8,0.07l1.15,1.1l2.26,-0.05l0.71,-0.83l2.78,-0.96l0.48,-1.13l1.6,-0.64l0.24,-0.47l-0.48,-0.82l-1.83,-0.19l-0.36,-3.22Z',
      name: 'Brazil',
    },
    BS: {
      path: 'M226.4,223.87l-0.48,-1.15l-0.84,-0.75l0.36,-1.11l0.95,1.95l0.01,1.06ZM225.56,216.43l-1.87,0.29l-0.04,-0.22l0.74,-0.14l1.17,0.06Z',
      name: 'Bahamas',
    },
    BY: {
      path: 'M493.84,128.32l0.29,0.7l0.49,0.23l1.19,-0.38l2.09,0.72l0.19,1.26l-0.45,1.24l1.57,2.26l0.89,0.59l0.17,0.81l1.58,0.56l0.4,0.5l-0.53,0.41l-1.87,-0.11l-0.73,0.38l-0.13,0.52l1.04,2.74l-1.91,0.26l-0.89,0.99l-0.11,1.18l-2.73,-0.04l-0.53,-0.62l-0.52,-0.08l-0.75,0.46l-0.91,-0.42l-1.92,-0.07l-2.75,-0.79l-2.6,-0.28l-2.0,0.07l-1.5,0.92l-0.67,0.07l-0.08,-1.22l-0.59,-1.19l1.36,-0.88l0.01,-1.35l-0.7,-1.41l-0.07,-1.0l2.16,-0.02l2.72,-1.3l0.75,-2.04l1.91,-1.04l0.2,-0.41l-0.19,-1.25l3.8,-1.78l2.3,0.77Z',
      name: 'Belarus',
    },
    BZ: {
      path: 'M198.03,244.38l0.1,-4.49l0.69,-0.06l0.74,-1.3l0.34,0.28l-0.4,1.3l0.17,0.58l-0.34,2.25l-1.3,1.42Z',
      name: 'Belize',
    },
    RU: {
      path: 'M491.55,115.25l2.55,-1.85l-0.01,-0.65l-2.2,-1.5l7.32,-6.76l1.03,-2.11l-0.13,-0.49l-3.46,-2.52l0.86,-2.7l-2.11,-2.81l1.56,-3.67l-2.77,-4.52l2.15,-2.99l-0.08,-0.55l-3.65,-2.73l0.3,-2.54l1.81,-0.37l4.26,-1.77l2.42,-1.45l4.06,2.61l6.79,1.04l9.34,4.85l1.78,1.88l0.14,2.46l-2.55,2.02l-3.9,1.06l-11.07,-3.14l-2.06,0.53l-0.13,0.7l3.94,2.94l0.31,5.86l0.26,0.36l5.14,2.24l0.58,-0.29l0.32,-1.94l-1.35,-1.78l1.13,-1.09l6.13,2.42l2.11,-0.98l0.18,-0.56l-1.51,-2.67l5.41,-3.76l2.07,0.22l2.26,1.41l0.57,-0.16l1.46,-2.87l-0.05,-0.44l-1.92,-2.32l1.12,-2.32l-1.32,-2.27l5.87,1.16l1.04,1.75l-2.59,0.43l-0.33,0.4l0.02,2.36l2.46,1.83l3.87,-0.91l0.86,-2.8l13.69,-5.65l0.99,0.11l-1.92,2.06l0.23,0.67l3.11,0.45l2.0,-1.48l4.56,-0.12l3.64,-1.73l2.65,2.44l0.56,-0.01l2.85,-2.88l-0.01,-0.57l-2.35,-2.29l0.9,-1.01l7.14,1.3l3.41,1.36l9.05,4.97l0.51,-0.11l1.67,-2.27l-0.05,-0.53l-2.43,-2.21l-0.06,-0.78l-0.34,-0.36l-2.52,-0.36l0.64,-1.93l-1.32,-3.46l-0.06,-1.21l4.48,-4.06l1.69,-4.29l1.6,-0.81l6.23,1.18l0.44,2.21l-2.29,3.64l0.06,0.5l1.47,1.39l0.76,3.0l-0.56,6.03l2.69,2.82l-0.96,2.57l-4.86,5.95l0.23,0.64l2.86,0.61l0.42,-0.17l0.93,-1.4l2.64,-1.03l0.87,-2.24l2.09,-1.96l0.07,-0.5l-1.36,-2.28l1.09,-2.69l-0.32,-0.55l-2.47,-0.33l-0.5,-2.06l1.94,-4.38l-0.06,-0.42l-2.96,-3.4l4.12,-2.88l0.16,-0.4l-0.51,-2.93l0.54,-0.05l1.13,2.25l-0.96,4.35l0.27,0.47l2.68,0.84l0.5,-0.51l-1.02,-2.99l3.79,-1.66l5.01,-0.24l4.53,2.61l0.48,-0.06l0.07,-0.48l-2.18,-3.82l-0.23,-4.67l3.98,-0.9l5.97,0.21l5.49,-0.64l0.27,-0.65l-1.83,-2.31l2.56,-2.9l2.87,-0.17l4.8,-2.47l6.54,-0.67l1.03,-1.42l6.25,-0.45l2.32,1.11l5.53,-2.7l4.5,0.08l0.39,-0.28l0.66,-2.15l2.26,-2.12l5.69,-2.11l3.21,1.29l-2.46,0.94l-0.25,0.42l0.34,0.35l5.41,0.77l0.61,2.33l0.58,0.25l2.2,-1.22l7.13,0.07l5.51,2.47l1.79,1.72l-0.53,2.24l-9.16,4.15l-1.97,1.52l0.16,0.71l6.77,1.91l2.16,-0.78l1.13,2.74l0.67,0.11l1.01,-1.15l3.81,-0.73l7.7,0.77l0.54,1.99l0.36,0.29l10.47,0.71l0.43,-0.38l0.13,-3.23l4.87,0.78l3.95,-0.02l3.83,2.4l1.03,2.71l-1.35,1.79l0.02,0.5l3.15,3.64l4.07,1.96l0.53,-0.18l2.23,-4.47l3.95,1.93l4.16,-1.21l4.73,1.39l2.05,-1.26l3.94,0.62l0.43,-0.55l-1.68,-4.02l2.89,-1.8l22.31,3.03l2.16,2.75l6.55,3.51l10.29,-0.81l4.82,0.73l1.85,1.66l-0.29,3.08l0.25,0.41l3.08,1.26l3.56,-0.88l4.35,-0.11l4.8,0.87l4.57,-0.47l4.23,3.79l0.43,0.07l3.1,-1.4l0.16,-0.6l-1.88,-2.62l0.85,-1.52l7.71,1.21l5.22,-0.26l7.09,2.09l9.59,5.22l6.35,4.11l-0.2,2.38l1.88,1.41l0.6,-0.42l-0.48,-2.53l6.15,0.57l4.4,3.51l-1.97,1.43l-4.0,0.41l-0.36,0.39l-0.06,3.79l-0.74,0.62l-2.07,-0.11l-1.91,-1.39l-3.14,-1.11l-0.78,-1.85l-2.72,-0.68l-2.63,0.49l-1.04,-1.1l0.46,-1.31l-0.5,-0.51l-3.0,0.98l-0.22,0.58l0.99,1.7l-1.21,1.48l-3.04,1.68l-3.12,-0.28l-0.4,0.23l0.09,0.46l2.2,2.09l1.46,3.2l1.15,1.1l0.24,1.33l-0.42,0.67l-4.63,-0.77l-6.96,2.9l-2.19,0.44l-7.6,5.06l-0.84,1.45l-3.61,-2.37l-6.24,2.82l-0.94,-1.15l-0.53,-0.08l-2.28,1.52l-3.2,-0.49l-0.44,0.27l-0.78,2.37l-3.05,3.78l0.09,1.47l0.29,0.36l2.54,0.72l-0.29,4.53l-1.97,0.11l-0.35,0.26l-1.07,2.94l0.8,1.45l-3.91,1.58l-1.05,3.95l-3.48,0.77l-0.3,0.3l-0.72,3.29l-3.09,2.65l-0.7,-1.74l-2.44,-12.44l1.16,-4.71l2.04,-2.06l0.22,-1.64l3.8,-0.86l4.46,-4.61l4.28,-3.81l4.48,-3.01l2.17,-5.63l-0.42,-0.54l-3.04,0.33l-1.77,3.31l-5.86,3.86l-1.86,-4.25l-0.45,-0.23l-6.46,1.3l-6.47,6.44l-0.01,0.55l1.58,1.74l-8.24,1.17l0.15,-2.2l-0.34,-0.42l-3.89,-0.56l-3.25,1.81l-7.62,-0.62l-8.45,1.19l-17.71,15.41l0.22,0.7l3.74,0.41l1.36,2.17l2.43,0.76l1.88,-1.68l2.4,0.2l3.4,3.54l0.08,2.6l-1.95,3.42l-0.21,3.9l-1.1,5.06l-3.71,4.54l-0.87,2.21l-8.29,8.89l-3.19,1.7l-1.32,0.03l-1.45,-1.36l-0.49,-0.04l-2.27,1.5l0.41,-3.65l-0.59,-2.47l1.75,-0.89l2.91,0.53l0.42,-0.2l1.68,-3.03l0.87,-3.46l0.97,-1.18l1.32,-2.88l-0.45,-0.56l-4.14,0.95l-2.19,1.25l-3.41,-0.0l-1.06,-2.93l-2.97,-2.3l-4.28,-1.06l-1.75,-5.07l-2.66,-5.01l-2.29,-1.29l-3.75,-1.01l-3.44,0.08l-3.18,0.62l-2.24,1.77l0.05,0.66l1.18,0.69l0.02,1.43l-1.33,1.05l-2.26,3.51l-0.04,1.43l-3.16,1.84l-2.82,-1.16l-3.01,0.23l-1.35,-1.07l-1.5,-0.35l-3.9,2.31l-3.22,0.52l-2.27,0.79l-3.05,-0.51l-2.21,0.03l-1.48,-1.6l-2.6,-1.63l-2.63,-0.43l-5.46,1.01l-3.23,-1.25l-0.72,-2.57l-5.2,-1.24l-2.75,-1.36l-0.5,0.12l-2.59,3.45l0.84,2.1l-2.06,1.93l-3.41,-0.77l-2.42,-0.12l-1.83,-1.54l-2.53,-0.05l-2.42,-0.98l-3.86,1.57l-4.72,2.78l-3.3,0.75l-1.55,-1.92l-3.0,0.41l-1.11,-1.33l-1.62,-0.59l-1.31,-1.94l-1.38,-0.6l-3.7,0.79l-3.31,-1.83l-0.51,0.11l-0.99,1.29l-5.29,-8.05l-2.96,-2.48l0.65,-0.77l0.01,-0.51l-0.5,-0.11l-6.2,3.21l-1.84,0.15l0.15,-1.39l-0.26,-0.42l-3.22,-1.17l-2.46,0.7l-0.69,-3.16l-0.32,-0.31l-4.5,-0.75l-2.47,1.47l-6.19,1.27l-1.29,0.86l-9.51,1.3l-1.15,1.17l-0.03,0.53l1.47,1.9l-1.89,0.69l-0.22,0.56l0.31,0.6l-2.11,1.44l0.03,0.68l3.75,2.12l-0.39,0.98l-3.23,-0.13l-0.86,0.86l-3.09,-1.59l-3.97,0.07l-2.66,1.35l-8.32,-3.56l-4.07,0.06l-5.39,3.68l-0.39,2.0l-2.03,-1.5l-0.59,0.13l-2.0,3.59l0.57,0.93l-1.28,2.16l0.06,0.48l2.13,2.17l1.95,0.04l1.37,1.82l-0.23,1.46l0.25,0.43l0.83,0.33l-0.8,1.31l-2.49,0.62l-2.49,3.2l0.0,0.49l2.17,2.78l-0.15,2.18l2.5,3.24l-1.58,1.59l-0.7,-0.13l-1.63,-1.72l-2.29,-0.84l-0.94,-1.31l-2.34,-0.63l-1.48,0.4l-0.43,-0.47l-3.51,-1.48l-5.76,-1.01l-0.45,0.19l-2.89,-2.34l-2.9,-1.2l-1.53,-1.29l1.29,-0.43l2.08,-2.61l-0.05,-0.55l-0.89,-0.79l3.05,-1.06l0.27,-0.42l-0.07,-0.69l-0.49,-0.35l-1.73,0.39l0.04,-0.68l1.04,-0.72l2.66,-0.48l0.4,-1.32l-0.5,-1.6l0.92,-1.54l0.03,-1.17l-0.29,-0.37l-3.69,-1.06l-1.41,0.02l-1.42,-1.41l-2.19,0.38l-2.77,-1.01l-0.03,-0.59l-0.89,-1.43l-2.0,-0.32l-0.11,-0.54l0.49,-0.53l0.01,-0.53l-1.6,-1.9l-3.58,0.02l-0.88,0.73l-0.46,-0.07l-1.0,-2.79l2.22,-0.02l0.97,-0.74l0.07,-0.57l-0.9,-1.04l-1.35,-0.48l-0.11,-0.7l-0.95,-0.58l-1.38,-1.99l0.46,-0.98l-0.51,-1.96l-2.45,-0.84l-1.21,0.3l-0.46,-0.76l-2.46,-0.83l-0.72,-1.87l-0.21,-1.69l-0.99,-0.85l0.85,-1.17l-0.7,-3.21l1.66,-1.97l-0.16,-0.79ZM749.2,170.72l-0.6,0.4l-0.13,0.16l-0.01,-0.51l0.74,-0.05ZM874.85,67.94l-5.63,0.48l-0.26,-0.84l3.15,-1.89l1.94,0.01l3.19,1.16l-2.39,1.09ZM797.39,48.49l-2.0,1.36l-3.8,-0.42l-4.25,-1.8l0.35,-0.97l9.69,1.83ZM783.67,46.12l-1.63,3.09l-8.98,-0.13l-4.09,1.14l-4.54,-2.97l1.16,-3.01l3.05,-0.89l6.5,0.22l8.54,2.56ZM778.2,134.98l-0.56,-0.9l0.27,-0.12l0.29,1.01ZM778.34,135.48l0.94,3.53l-0.05,3.38l1.05,3.39l2.18,5.0l-2.89,-0.83l-0.49,0.26l-1.54,4.65l2.42,3.5l-0.04,1.13l-1.24,-1.24l-0.61,0.06l-1.09,1.61l-0.28,-1.61l0.27,-3.1l-0.28,-3.4l0.58,-2.47l0.11,-4.39l-1.46,-3.36l0.21,-4.32l2.15,-1.46l0.07,-0.34ZM771.95,56.61l1.76,-1.42l2.89,-0.42l3.28,1.71l0.14,0.6l-3.27,0.03l-4.81,-0.5ZM683.76,31.09l-13.01,1.93l4.03,-6.35l1.82,-0.56l1.73,0.34l5.99,2.98l-0.56,1.66ZM670.85,27.93l-5.08,0.64l-6.86,-1.57l-3.99,-2.05l-2.1,-4.16l-2.6,-0.87l5.72,-3.5l5.2,-1.28l4.69,2.85l5.59,5.4l-0.56,4.53ZM564.15,68.94l-0.64,0.17l-7.85,-0.57l-0.86,-2.04l-4.28,-1.17l-0.28,-1.94l2.27,-0.89l0.25,-0.39l-0.08,-2.38l4.81,-3.97l-0.15,-0.7l-1.47,-0.38l5.3,-3.81l0.15,-0.44l-0.58,-1.94l5.28,-2.51l8.21,-3.27l8.28,-0.96l4.35,-1.94l4.6,-0.64l1.36,1.61l-1.34,1.28l-16.43,4.94l-7.97,4.88l-7.74,9.63l0.66,4.14l4.16,3.27ZM548.81,18.48l-5.5,1.18l-0.58,1.02l-2.59,0.84l-2.13,-1.07l1.12,-1.42l-0.3,-0.65l-2.33,-0.07l1.68,-0.36l3.47,-0.06l0.42,1.29l0.66,0.16l1.38,-1.34l2.15,-0.88l2.94,1.01l-0.39,0.36ZM477.37,133.15l-4.08,0.05l-2.56,-0.32l0.33,-0.87l3.17,-1.03l3.24,0.96l-0.09,1.23Z',
      name: 'Russia',
    },
    RW: {
      path: 'M497.0,288.25l0.71,1.01l-0.11,1.09l-1.63,0.03l-1.04,1.39l-0.83,-0.11l0.51,-1.2l0.08,-1.34l0.42,-0.41l0.7,0.14l1.19,-0.61Z',
      name: 'Rwanda',
    },
    RS: {
      path: 'M469.4,163.99l0.42,-0.5l-0.01,-0.52l-1.15,-1.63l1.43,-0.62l1.33,0.12l1.17,1.06l0.46,1.13l1.34,0.64l0.35,1.35l1.46,0.9l0.76,-0.29l0.2,0.69l-0.48,0.78l0.22,1.12l1.05,1.22l-0.77,0.8l-0.37,1.52l-1.21,0.08l0.24,-0.64l-0.39,-0.54l-2.08,-1.64l-0.9,0.05l-0.48,0.94l-2.12,-1.37l0.53,-1.6l-1.11,-1.37l0.51,-1.1l-0.41,-0.57Z',
      name: 'Serbia',
    },
    LT: {
      path: 'M486.93,129.3l0.17,1.12l-1.81,0.98l-0.72,2.02l-2.47,1.18l-2.1,-0.02l-0.73,-1.05l-1.06,-0.3l-0.09,-1.87l-3.56,-1.13l-0.43,-2.36l2.48,-0.94l4.12,0.22l2.25,-0.31l0.52,0.69l1.24,0.21l2.19,1.56Z',
      name: 'Lithuania',
    },
    LU: {
      path: 'M436.08,149.45l-0.48,-0.07l0.3,-1.28l0.27,0.4l-0.09,0.96Z',
      name: 'Luxembourg',
    },
    LR: {
      path: 'M399.36,265.97l0.18,1.54l-0.48,0.99l0.08,0.47l2.47,1.8l-0.33,2.8l-2.65,-1.13l-5.78,-4.61l0.58,-1.32l2.1,-2.33l0.86,-0.22l0.77,1.14l-0.14,0.85l0.59,0.87l1.0,0.14l0.76,-0.99Z',
      name: 'Liberia',
    },
    RO: {
      path: 'M487.53,154.23l0.6,0.24l2.87,3.98l-0.17,2.69l0.45,1.42l1.32,0.81l1.35,-0.42l0.76,0.36l0.02,0.31l-0.83,0.45l-0.59,-0.22l-0.54,0.3l-0.62,3.3l-1.0,-0.22l-2.07,-1.13l-2.95,0.71l-1.25,0.76l-3.51,-0.15l-1.89,-0.47l-0.87,0.16l-0.82,-1.3l0.29,-0.26l-0.06,-0.64l-1.09,-0.34l-0.56,0.5l-1.05,-0.64l-0.39,-1.39l-1.36,-0.65l-0.35,-1.0l-0.83,-0.75l1.54,-0.54l2.66,-4.21l2.4,-1.24l2.96,0.34l1.48,0.73l0.79,-0.45l1.78,-0.3l0.75,-0.74l0.79,0.0Z',
      name: 'Romania',
    },
    GW: {
      path: 'M386.23,253.6l-0.29,0.84l0.15,0.6l-2.21,0.59l-0.86,0.96l-1.04,-0.83l-1.09,-0.23l-0.54,-1.06l-0.66,-0.49l2.41,-0.48l4.13,0.1Z',
      name: 'Guinea-Bissau',
    },
    GT: {
      path: 'M195.08,249.77l-2.48,-0.37l-1.03,-0.45l-1.14,-0.89l0.3,-0.99l-0.24,-0.68l0.96,-1.66l2.98,-0.01l0.4,-0.37l-0.19,-1.28l-1.67,-1.4l0.51,-0.4l0.0,-1.05l3.85,0.02l-0.21,4.53l0.4,0.43l1.46,0.38l-1.48,0.98l-0.35,0.7l0.12,0.57l-2.2,1.96Z',
      name: 'Guatemala',
    },
    GR: {
      path: 'M487.07,174.59l-0.59,1.43l-0.37,0.21l-2.84,-0.35l-3.03,0.77l-0.18,0.68l1.28,1.23l-0.61,0.23l-1.14,0.0l-1.2,-1.39l-0.63,0.03l-0.53,1.01l0.56,1.76l1.03,1.19l-0.56,0.38l-0.05,0.62l2.52,2.12l0.02,0.87l-1.78,-0.59l-0.48,0.56l0.5,1.0l-1.07,0.2l-0.3,0.53l0.75,2.01l-0.98,0.02l-1.84,-1.12l-1.37,-4.2l-2.21,-2.95l-0.11,-0.56l1.04,-1.28l0.2,-0.95l0.85,-0.66l0.03,-0.46l1.32,-0.21l1.01,-0.64l1.22,0.05l0.65,-0.56l2.26,-0.0l1.82,-0.75l1.85,1.0l2.28,-0.28l0.35,-0.39l0.01,-0.77l0.34,0.22ZM480.49,192.16l0.58,0.4l-0.68,-0.12l0.11,-0.28ZM482.52,192.82l2.51,0.06l0.24,0.32l-1.99,0.13l-0.77,-0.51Z',
      name: 'Greece',
    },
    GQ: {
      path: 'M448.79,279.62l0.02,2.22l-4.09,0.0l0.69,-2.27l3.38,0.05Z',
      name: 'Eq. Guinea',
    },
    GY: {
      path: 'M277.42,270.07l-0.32,1.83l-1.32,0.57l-0.23,0.46l-0.28,2.0l1.11,1.82l0.83,0.19l0.32,1.25l1.13,1.62l-1.21,-0.19l-1.08,0.71l-1.77,0.5l-0.44,0.46l-0.86,-0.09l-1.32,-1.01l-0.77,-2.27l0.36,-1.9l0.68,-1.23l-0.57,-1.17l-0.74,-0.43l0.12,-1.16l-0.9,-0.69l-1.1,0.09l-1.31,-1.48l0.53,-0.72l-0.04,-0.84l1.99,-0.86l0.05,-0.59l-0.71,-0.78l0.14,-0.57l1.66,-1.24l1.36,0.77l1.41,1.49l0.06,1.15l0.37,0.38l0.8,0.05l2.06,1.86Z',
      name: 'Guyana',
    },
    GE: {
      path: 'M521.71,168.93l5.29,0.89l4.07,2.01l1.41,-0.44l2.07,0.56l0.68,1.1l1.07,0.55l-0.12,0.59l0.98,1.29l-1.01,-0.13l-1.81,-0.83l-0.94,0.47l-3.23,0.43l-2.29,-1.39l-2.33,0.05l0.21,-0.97l-0.76,-2.26l-1.45,-1.12l-1.43,-0.39l-0.41,-0.42Z',
      name: 'Georgia',
    },
    GB: {
      path: 'M412.61,118.72l-2.19,3.22l-0.0,0.45l5.13,-0.3l-0.53,2.37l-2.2,3.12l0.29,0.63l2.37,0.21l2.33,4.3l1.76,0.69l2.2,5.12l2.94,0.77l-0.23,1.62l-1.15,0.88l-0.1,0.52l0.82,1.42l-1.86,1.43l-3.3,-0.02l-4.12,0.87l-1.04,-0.58l-0.47,0.06l-1.51,1.41l-2.12,-0.34l-1.86,1.18l-0.6,-0.29l3.19,-3.0l2.16,-0.69l0.28,-0.41l-0.34,-0.36l-3.73,-0.53l-0.4,-0.76l2.2,-0.87l0.17,-0.61l-1.26,-1.67l0.36,-1.7l3.38,0.28l0.43,-0.33l0.37,-1.99l-1.79,-2.49l-3.11,-0.72l-0.38,-0.59l0.79,-1.35l-0.04,-0.46l-0.82,-0.97l-0.61,0.01l-0.68,0.84l-0.1,-2.34l-1.23,-1.88l0.85,-3.47l1.77,-2.68l1.85,0.26l2.17,-0.22ZM406.26,132.86l-1.01,1.77l-1.57,-0.59l-1.16,0.01l0.37,-1.54l-0.39,-1.39l1.45,-0.1l2.3,1.84Z',
      name: 'United Kingdom',
    },
    GA: {
      path: 'M453.24,279.52l-0.08,0.98l0.7,1.29l2.36,0.24l-0.98,2.63l1.18,1.79l0.25,1.78l-0.29,1.52l-0.6,0.93l-1.84,-0.09l-1.23,-1.11l-0.66,0.23l-0.15,0.84l-1.42,0.26l-1.02,0.7l-0.11,0.52l0.77,1.35l-1.34,0.97l-3.94,-4.3l-1.44,-2.45l0.06,-0.6l0.54,-0.81l1.05,-3.46l4.17,-0.07l0.4,-0.4l-0.02,-2.66l2.39,0.21l1.25,-0.27Z',
      name: 'Gabon',
    },
    GN: {
      path: 'M391.8,254.11l0.47,0.8l1.11,-0.32l0.98,0.7l1.07,0.2l2.26,-1.22l0.64,0.44l1.13,1.56l-0.48,1.4l0.8,0.3l-0.08,0.48l0.46,0.68l-0.35,1.36l1.05,2.61l-1.0,0.69l0.03,1.41l-0.72,-0.06l-1.08,1.0l-0.24,-0.27l0.07,-1.11l-1.05,-1.54l-1.79,0.21l-0.35,-2.01l-1.6,-2.18l-2.0,-0.0l-1.31,0.54l-1.95,2.18l-1.86,-2.19l-1.2,-0.78l-0.3,-1.11l-0.8,-0.85l0.65,-0.72l0.81,-0.03l1.64,-0.8l0.23,-1.87l2.67,0.64l0.89,-0.3l1.21,0.15Z',
      name: 'Guinea',
    },
    GM: {
      path: 'M379.31,251.39l0.1,-0.35l2.43,-0.07l0.74,-0.61l0.51,-0.03l0.77,0.49l-1.03,-0.3l-1.87,0.9l-1.65,-0.04ZM384.03,250.91l0.91,0.05l0.75,-0.24l-0.59,0.31l-1.08,-0.13Z',
      name: 'Gambia',
    },
    GL: {
      path: 'M353.02,1.2l14.69,4.67l-3.68,1.89l-22.97,0.86l-0.36,0.27l0.12,0.43l1.55,1.18l8.79,-0.66l7.48,2.07l4.86,-1.77l1.66,1.73l-2.53,3.19l-0.01,0.48l0.46,0.15l6.35,-2.2l12.06,-2.31l7.24,1.13l1.09,1.99l-9.79,4.01l-1.44,1.32l-7.87,0.98l-0.35,0.41l0.38,0.38l5.07,0.24l-2.53,3.58l-2.07,3.81l0.08,6.05l2.57,3.11l-3.22,0.2l-4.12,1.66l-0.05,0.72l4.45,2.65l0.51,3.75l-2.3,0.4l-0.25,0.64l2.79,3.69l-4.82,0.31l-0.36,0.29l0.16,0.44l2.62,1.8l-0.59,1.22l-3.3,0.7l-3.45,0.01l-0.29,0.68l3.03,3.12l0.02,1.34l-4.4,-1.73l-1.72,1.35l0.15,0.66l3.31,1.15l3.13,2.71l0.81,3.16l-3.85,0.75l-4.89,-4.26l-0.47,-0.03l-0.17,0.44l0.79,2.86l-2.71,2.21l-0.13,0.44l0.37,0.27l8.73,0.34l-12.32,6.64l-7.24,1.48l-2.94,0.08l-2.69,1.75l-3.43,4.41l-5.24,2.84l-1.73,0.18l-7.12,2.1l-2.15,2.52l-0.13,2.99l-1.19,2.45l-4.01,3.09l-0.14,0.44l0.97,2.9l-2.28,6.48l-3.1,0.2l-3.83,-3.07l-4.86,-0.02l-2.25,-1.93l-1.7,-3.79l-4.3,-4.84l-1.21,-2.49l-0.44,-3.8l-3.32,-3.63l0.84,-2.86l-1.56,-1.7l2.28,-4.6l3.83,-1.74l1.03,-1.96l0.52,-3.47l-0.59,-0.41l-4.17,2.21l-2.07,0.58l-2.72,-1.28l-0.15,-2.71l0.85,-2.09l2.01,-0.06l5.06,1.2l0.46,-0.23l-0.14,-0.49l-6.54,-4.47l-2.67,0.55l-1.58,-0.86l2.56,-4.01l-0.03,-0.48l-1.5,-1.74l-4.98,-8.5l-3.13,-1.96l0.03,-1.88l-0.24,-0.37l-6.85,-3.02l-5.36,-0.38l-12.7,0.58l-2.78,-1.57l-3.66,-2.77l5.73,-1.45l5.0,-0.28l0.38,-0.38l-0.35,-0.41l-10.67,-1.38l-5.3,-2.06l0.25,-1.54l18.41,-5.26l1.22,-2.27l-0.25,-0.55l-6.14,-1.86l1.68,-1.77l8.55,-4.03l3.59,-0.63l0.3,-0.54l-0.88,-2.27l5.47,-1.47l7.65,-0.95l7.55,-0.05l3.04,1.85l6.48,-3.27l5.81,2.22l3.56,0.5l5.16,1.94l0.5,-0.21l-0.17,-0.52l-5.71,-3.13l0.28,-2.13l8.12,-3.6l8.7,0.28l3.35,-2.34l8.71,-0.6l19.93,0.8Z',
      name: 'Greenland',
    },
    KW: {
      path: 'M540.81,207.91l0.37,0.86l-0.17,0.76l0.6,1.53l-0.95,0.04l-0.82,-1.28l-1.57,-0.18l1.31,-1.88l1.22,0.17Z',
      name: 'Kuwait',
    },
    GH: {
      path: 'M420.53,257.51l-0.01,0.72l0.96,1.2l0.24,3.73l0.59,0.95l-0.51,2.1l0.19,1.41l1.02,2.21l-6.97,2.84l-1.8,-0.57l0.04,-0.89l-1.02,-2.04l0.61,-2.65l1.07,-2.32l-0.96,-6.47l5.01,0.07l0.94,-0.39l0.61,0.11Z',
      name: 'Ghana',
    },
    OM: {
      path: 'M568.09,230.93l-0.91,1.67l-1.22,0.04l-0.6,0.76l-0.41,1.51l0.27,1.58l-1.16,0.05l-1.56,0.97l-0.76,1.74l-1.62,0.05l-0.98,0.65l-0.17,1.15l-0.89,0.52l-1.49,-0.18l-2.4,0.94l-2.47,-5.4l7.35,-2.71l1.67,-5.23l-1.12,-2.09l0.05,-0.83l0.67,-1.0l0.07,-1.05l0.9,-0.42l-0.05,-2.07l0.7,-0.01l1.0,1.62l1.51,1.08l3.3,0.84l1.73,2.29l0.81,0.37l-1.23,2.35l-0.99,0.79Z',
      name: 'Oman',
    },
    _2: {
      path: 'M531.15,258.94l1.51,0.12l5.13,-0.95l5.3,-1.48l-0.01,4.4l-2.67,3.39l-1.85,0.01l-8.04,-2.94l-2.55,-3.17l1.12,-1.71l2.04,2.34Z',
      name: 'Somaliland',
    },
    _1: {
      path: 'M472.77,172.64l-1.08,-1.29l0.96,-0.77l0.29,-0.83l1.98,1.64l-0.36,0.67l-1.79,0.58Z',
      name: 'Kosovo',
    },
    _0: {
      path: 'M504.91,192.87l0.34,0.01l0.27,-0.07l-0.29,0.26l-0.31,-0.2Z',
      name: 'N. Cyprus',
    },
    JO: {
      path: 'M518.64,201.38l-5.14,1.56l-0.19,0.65l2.16,2.39l-0.89,1.14l-1.71,0.34l-1.71,1.8l-2.34,-0.37l1.21,-4.32l0.56,-4.07l2.8,0.94l4.46,-2.71l0.79,2.66Z',
      name: 'Jordan',
    },
    HR: {
      path: 'M455.59,162.84l1.09,0.07l-0.82,0.94l-0.27,-1.01ZM456.96,162.92l0.62,-0.41l1.73,0.45l0.42,-0.4l-0.01,-0.59l0.86,-0.52l0.2,-1.05l1.63,-0.68l2.57,1.68l2.07,0.6l0.87,-0.31l1.05,1.57l-0.52,0.63l-1.05,-0.56l-1.68,0.04l-2.1,-0.5l-1.29,0.06l-0.57,0.49l-0.59,-0.47l-0.62,0.16l-0.46,1.7l1.79,2.42l2.79,2.75l-1.18,-0.87l-2.21,-0.87l-1.67,-1.78l0.13,-0.63l-1.05,-1.19l-0.32,-1.27l-1.42,-0.43Z',
      name: 'Croatia',
    },
    HT: {
      path: 'M237.05,238.38l-1.16,0.43l-0.91,-0.55l0.05,-0.2l2.02,0.31ZM237.53,238.43l1.06,0.12l-0.05,0.01l-1.01,-0.12ZM239.25,238.45l0.79,-0.51l0.06,-0.62l-1.02,-1.0l0.02,-0.82l-0.3,-0.4l-0.93,-0.32l3.16,0.45l0.02,1.84l-0.48,0.34l-0.08,0.58l0.54,0.72l-1.78,-0.26Z',
      name: 'Haiti',
    },
    HU: {
      path: 'M462.08,157.89l0.65,-1.59l-0.09,-0.44l0.64,-0.0l0.39,-0.34l0.1,-0.69l1.75,0.87l2.32,-0.37l0.43,-0.66l3.49,-0.78l0.69,-0.78l0.57,-0.14l2.57,0.93l0.67,-0.23l1.03,0.65l0.08,0.37l-1.42,0.71l-2.59,4.14l-1.8,0.53l-1.68,-0.1l-2.74,1.23l-1.85,-0.54l-2.54,-1.66l-0.66,-1.1Z',
      name: 'Hungary',
    },
    HN: {
      path: 'M199.6,249.52l-1.7,-1.21l0.06,-0.94l3.04,-2.14l2.37,0.28l1.27,-0.09l1.1,-0.52l1.3,0.28l1.14,-0.25l1.38,0.37l2.23,1.37l-2.36,0.93l-1.23,-0.39l-0.88,1.3l-1.28,0.99l-0.98,-0.22l-0.42,0.52l-0.96,0.05l-0.36,0.41l0.04,0.88l-0.52,0.6l-0.3,0.04l-0.3,-0.55l-0.66,-0.31l0.11,-0.67l-0.48,-0.65l-0.87,-0.26l-0.73,0.2Z',
      name: 'Honduras',
    },
    PR: {
      path: 'M256.17,238.73l-0.26,0.27l-2.83,0.05l-0.07,-0.55l1.95,-0.1l1.22,0.33Z',
      name: 'Puerto Rico',
    },
    PS: {
      path: 'M509.21,203.07l0.1,-0.06l-0.02,0.03l-0.09,0.03ZM509.36,202.91l-0.02,-0.63l-0.33,-0.16l0.31,-1.09l0.24,0.1l-0.2,1.78Z',
      name: 'Palestine',
    },
    PT: {
      path: 'M401.84,187.38l-0.64,0.47l-1.13,-0.35l-0.91,0.17l0.28,-1.78l-0.24,-1.78l-1.25,-0.56l-0.45,-0.84l0.17,-1.66l1.01,-1.18l0.69,-2.92l-0.04,-1.39l-0.59,-1.9l1.3,-0.85l0.84,1.35l3.1,-0.3l0.46,0.99l-1.05,0.94l-0.03,2.16l-0.41,0.57l-0.08,1.1l-0.79,0.18l-0.26,0.59l0.91,1.6l-0.63,1.75l0.76,1.09l-1.1,1.52l0.07,1.05Z',
      name: 'Portugal',
    },
    PY: {
      path: 'M274.9,336.12l0.74,1.52l-0.16,3.45l0.32,0.41l2.64,0.5l1.11,-0.47l1.4,0.59l0.36,0.6l0.53,3.42l1.27,0.4l0.98,-0.38l0.51,0.27l-0.0,1.18l-1.21,5.32l-2.09,1.9l-1.8,0.4l-4.71,-0.98l2.2,-3.63l-0.32,-1.5l-2.78,-1.28l-3.03,-1.94l-2.07,-0.44l-4.34,-4.06l0.91,-2.9l0.08,-1.42l1.07,-2.04l4.13,-0.72l2.18,0.03l2.05,1.17l0.03,0.59Z',
      name: 'Paraguay',
    },
    PA: {
      path: 'M213.8,263.68l0.26,-1.52l-0.36,-0.26l-0.01,-0.49l0.44,-0.1l0.93,1.4l1.26,0.03l0.77,0.49l1.38,-0.23l2.51,-1.11l0.86,-0.72l3.45,0.85l1.4,1.18l0.41,1.74l-0.21,0.34l-0.53,-0.12l-0.47,0.29l-0.16,0.6l-0.68,-1.28l0.45,-0.49l-0.19,-0.66l-0.47,-0.13l-0.54,-0.84l-1.5,-0.75l-1.1,0.16l-0.75,0.99l-1.62,0.84l-0.18,0.96l0.85,0.97l-0.58,0.45l-0.69,0.08l-0.34,-1.18l-1.27,0.03l-0.71,-1.05l-2.59,-0.46Z',
      name: 'Panama',
    },
    PG: {
      path: 'M808.58,298.86l2.54,2.56l-0.13,0.26l-0.33,0.12l-0.87,-0.78l-1.22,-2.16ZM801.41,293.04l0.5,0.29l0.26,0.27l-0.49,-0.35l-0.27,-0.21ZM803.17,294.58l0.59,0.5l0.08,1.06l-0.29,-0.91l-0.38,-0.65ZM796.68,298.41l0.52,0.75l1.43,-0.19l2.27,-1.81l-0.01,-1.43l1.12,0.16l-0.04,1.1l-0.7,1.28l-1.12,0.18l-0.62,0.79l-2.46,1.11l-1.17,-0.0l-3.08,-1.25l3.41,0.0l0.45,-0.68ZM789.15,303.55l2.31,1.8l1.59,2.61l1.34,0.13l-0.06,0.66l0.31,0.43l1.06,0.24l0.06,0.65l2.25,1.05l-1.22,0.13l-0.72,-0.63l-4.56,-0.65l-3.22,-2.87l-1.49,-2.34l-3.27,-1.1l-2.38,0.72l-1.59,0.86l-0.2,0.42l0.27,1.55l-1.55,0.68l-1.36,-0.4l-2.21,-0.09l-0.08,-15.41l8.39,2.93l2.95,2.4l0.6,1.64l4.02,1.49l0.31,0.68l-1.76,0.21l-0.33,0.52l0.55,1.68Z',
      name: 'Papua New Guinea',
    },
    PE: {
      path: 'M244.96,295.21l-1.26,-0.07l-0.57,0.42l-1.93,0.45l-2.98,1.75l-0.36,1.36l-0.58,0.8l0.12,1.37l-1.24,0.59l-0.22,1.22l-0.62,0.84l1.04,2.27l1.28,1.44l-0.41,0.84l0.32,0.57l1.48,0.13l1.16,1.37l2.21,0.07l1.63,-1.08l-0.13,3.02l0.3,0.4l1.14,0.29l1.31,-0.34l1.9,3.59l-0.48,0.85l-0.17,3.85l-0.94,1.59l0.35,0.75l-0.47,1.07l0.98,1.97l-2.1,3.82l-0.98,0.5l-2.17,-1.28l-0.39,-1.16l-4.95,-2.58l-4.46,-2.79l-1.84,-1.51l-0.91,-1.84l0.3,-0.96l-2.11,-3.33l-4.82,-9.68l-1.04,-1.2l-0.87,-1.94l-3.4,-2.48l0.58,-1.18l-1.13,-2.23l0.66,-1.49l1.45,-1.15l-0.6,0.98l0.07,0.92l0.47,0.36l1.74,0.03l0.97,1.17l0.54,0.07l1.42,-1.03l0.6,-1.84l1.42,-2.02l3.04,-1.04l2.73,-2.62l0.86,-1.74l-0.1,-1.87l1.44,1.02l0.9,1.25l1.06,0.59l1.7,2.73l1.86,0.31l1.45,-0.61l0.96,0.39l1.36,-0.19l1.45,0.89l-1.4,2.21l0.31,0.61l0.59,0.05l0.47,0.5Z',
      name: 'Peru',
    },
    PK: {
      path: 'M615.09,192.34l-1.83,1.81l-2.6,0.39l-3.73,-0.68l-1.58,1.33l-0.09,0.42l1.77,4.39l1.7,1.23l-1.69,1.27l-0.12,2.14l-2.33,2.64l-1.6,2.8l-2.46,2.67l-3.03,-0.07l-2.76,2.83l0.05,0.6l1.5,1.11l0.26,1.9l1.44,1.5l0.37,1.68l-5.01,-0.01l-1.78,1.7l-1.42,-0.52l-0.76,-1.87l-2.27,-2.15l-11.61,0.86l0.71,-2.34l3.43,-1.32l0.25,-0.44l-0.21,-1.24l-1.2,-0.65l-0.28,-2.46l-2.29,-1.14l-1.28,-1.94l2.82,0.94l2.62,-0.38l1.42,0.33l0.76,-0.56l1.71,0.19l3.25,-1.14l0.27,-0.36l0.08,-2.19l1.18,-1.32l1.68,0.0l0.58,-0.82l1.6,-0.3l1.19,0.16l0.98,-0.78l0.02,-1.88l0.93,-1.47l1.48,-0.66l0.19,-0.55l-0.66,-1.25l2.04,-0.11l0.69,-1.01l-0.02,-1.16l1.11,-1.06l-0.17,-1.78l-0.49,-1.03l1.15,-0.98l5.42,-0.91l2.6,-0.82l1.6,1.16l0.97,2.34l3.45,0.97Z',
      name: 'Pakistan',
    },
    PH: {
      path: 'M737.01,263.84l0.39,2.97l-0.44,1.18l-0.55,-1.53l-0.67,-0.14l-1.17,1.28l0.65,2.09l-0.42,0.69l-2.48,-1.23l-0.57,-1.49l0.65,-1.03l-0.1,-0.54l-1.59,-1.19l-0.56,0.08l-0.65,0.87l-1.23,0.0l-1.58,0.97l0.83,-1.8l2.56,-1.42l0.65,0.84l0.45,0.13l1.9,-0.69l0.56,-1.11l1.5,-0.06l0.38,-0.43l-0.09,-1.19l1.21,0.71l0.36,2.02ZM733.59,256.58l0.05,0.75l0.08,0.26l-0.8,-0.42l-0.18,-0.71l0.85,0.12ZM734.08,256.1l-0.12,-1.12l-1.0,-1.27l1.36,0.03l0.53,0.73l0.51,2.04l-1.27,-0.4ZM733.76,257.68l0.38,0.98l-0.32,0.15l-0.07,-1.13ZM724.65,238.43l1.46,0.7l0.72,-0.31l-0.32,1.17l0.79,1.71l-0.57,1.84l-1.53,1.04l-0.39,2.25l0.56,2.04l1.63,0.57l1.16,-0.27l2.71,1.23l-0.19,1.08l0.76,0.84l-0.08,0.36l-1.4,-0.9l-0.88,-1.27l-0.66,0.0l-0.38,0.55l-1.6,-1.31l-2.15,0.36l-0.87,-0.39l0.07,-0.61l0.66,-0.55l-0.01,-0.62l-0.75,-0.59l-0.72,0.44l-0.74,-0.87l-0.39,-2.49l0.32,0.27l0.66,-0.28l0.26,-3.97l0.7,-2.02l1.14,0.0ZM731.03,258.87l-0.88,0.85l-1.19,1.94l-1.05,-1.19l0.93,-1.1l0.32,-1.47l0.52,-0.06l-0.27,1.15l0.22,0.45l0.49,-0.12l1.0,-1.32l-0.08,0.85ZM726.83,255.78l0.83,0.38l1.17,-0.0l-0.02,0.48l-2.0,1.4l0.03,-2.26ZM724.81,252.09l-0.38,1.27l-1.42,-1.95l1.2,0.05l0.6,0.63ZM716.55,261.82l1.1,-0.95l0.03,-0.03l-0.28,0.36l-0.85,0.61ZM719.22,259.06l0.04,-0.06l0.8,-1.53l0.16,0.75l-1.0,0.84Z',
      name: 'Philippines',
    },
    PL: {
      path: 'M468.44,149.42l-1.11,-1.54l-1.86,-0.33l-0.48,-1.05l-1.72,-0.37l-0.65,0.69l-0.72,-0.36l0.11,-0.61l-0.33,-0.46l-1.75,-0.27l-1.04,-0.93l-0.94,-1.94l0.16,-1.22l-0.62,-1.8l-0.78,-1.07l0.57,-1.04l-0.48,-1.43l1.41,-0.83l6.91,-2.71l2.14,0.5l0.52,0.91l5.51,0.44l4.55,-0.05l1.07,0.31l0.48,0.84l0.15,1.58l0.65,1.2l-0.01,0.99l-1.27,0.58l-0.19,0.54l0.73,1.48l0.08,1.55l1.2,2.76l-0.17,0.58l-1.23,0.44l-2.27,2.72l0.18,0.95l-1.97,-1.03l-1.98,0.4l-1.36,-0.28l-1.24,0.58l-1.07,-0.97l-1.16,0.24Z',
      name: 'Poland',
    },
    ZM: {
      path: 'M481.47,313.3l0.39,0.31l2.52,0.14l0.99,1.17l2.01,0.35l1.4,-0.64l0.69,1.17l1.78,0.33l1.84,2.35l2.23,0.18l0.4,-0.43l-0.21,-2.74l-0.62,-0.3l-0.48,0.32l-1.98,-1.17l0.72,-5.29l-0.51,-1.18l0.57,-1.3l3.68,-0.62l0.26,0.63l1.21,0.63l0.9,-0.22l2.16,0.67l1.33,0.71l1.07,1.02l0.56,1.87l-0.88,2.7l0.43,2.09l-0.73,0.87l-0.76,2.37l0.59,0.68l-6.6,1.83l-0.29,0.44l0.19,1.45l-1.68,0.35l-1.43,1.02l-0.38,0.87l-0.87,0.26l-3.48,3.69l-4.16,-0.53l-1.52,-1.0l-1.77,-0.13l-1.83,0.52l-3.04,-3.4l0.11,-7.59l4.82,0.03l0.39,-0.49l-0.18,-0.76l0.33,-0.83l-0.4,-1.36l0.24,-1.05Z',
      name: 'Zambia',
    },
    EH: {
      path: 'M384.42,230.28l0.25,-0.79l1.06,-1.29l0.8,-3.51l3.38,-2.78l0.7,-1.81l0.06,4.84l-1.98,0.2l-0.94,1.59l0.39,3.56l-3.7,-0.01ZM392.01,218.1l0.7,-1.8l1.77,-0.24l2.09,0.34l0.95,-0.62l1.28,-0.07l-0.0,2.51l-6.79,-0.12Z',
      name: 'W. Sahara',
    },
    EE: {
      path: 'M485.71,115.04l2.64,0.6l2.56,0.11l-1.6,1.91l0.61,3.54l-0.81,0.87l-1.78,-0.01l-3.22,-1.76l-1.8,0.45l0.21,-1.53l-0.58,-0.41l-0.69,0.34l-1.26,-1.03l-0.17,-1.63l2.83,-0.92l3.05,-0.52Z',
      name: 'Estonia',
    },
    EG: {
      path: 'M492.06,205.03l1.46,0.42l2.95,-1.64l2.04,-0.21l1.53,0.3l0.59,1.19l0.69,0.04l0.41,-0.64l1.81,0.58l1.95,0.16l1.04,-0.51l1.42,4.08l-2.03,4.54l-1.66,-1.77l-1.76,-3.85l-0.64,-0.12l-0.36,0.67l1.04,2.88l3.44,6.95l1.78,3.04l2.03,2.65l-0.36,0.53l0.23,2.01l2.7,2.19l-28.41,0.0l0.0,-18.96l-0.73,-2.2l0.59,-1.56l-0.32,-1.26l0.68,-0.99l3.06,-0.04l4.82,1.52Z',
      name: 'Egypt',
    },
    ZA: {
      path: 'M467.14,373.21l-0.13,-1.96l-0.68,-1.56l0.7,-0.68l-0.13,-2.33l-4.56,-8.19l0.77,-0.86l0.6,0.45l0.69,1.31l2.83,0.72l1.5,-0.26l2.24,-1.39l0.19,-9.55l1.35,2.3l-0.21,1.5l0.61,1.2l0.4,0.19l1.79,-0.27l2.6,-2.07l0.69,-1.32l0.96,-0.48l2.19,1.04l2.04,0.13l1.77,-0.65l0.85,-2.12l1.38,-0.33l1.59,-2.76l2.15,-1.89l3.41,-1.87l2.0,0.45l1.02,-0.28l0.99,0.2l1.75,5.29l-0.38,3.25l-0.81,-0.23l-1.0,0.46l-0.87,1.68l-0.05,1.16l1.97,1.84l1.47,-0.29l0.69,-1.18l1.09,0.01l-0.76,3.69l-0.58,1.09l-2.2,1.79l-3.17,4.76l-2.8,2.83l-3.57,2.88l-2.53,1.05l-1.22,0.14l-0.51,0.7l-1.18,-0.32l-1.39,0.5l-2.59,-0.52l-1.61,0.33l-1.18,-0.11l-2.55,1.1l-2.1,0.44l-1.6,1.07l-0.85,0.05l-0.93,-0.89l-0.93,-0.15l-0.97,-1.13l-0.25,0.05ZM491.45,364.19l0.62,-0.93l1.48,-0.59l1.18,-2.19l-0.07,-0.49l-1.99,-1.69l-1.66,0.56l-1.43,1.14l-1.34,1.73l0.02,0.51l1.88,2.11l1.31,-0.16Z',
      name: 'South Africa',
    },
    EC: {
      path: 'M231.86,285.53l0.29,1.59l-0.69,1.45l-2.61,2.51l-3.13,1.11l-1.53,2.18l-0.49,1.68l-1.0,0.73l-1.02,-1.11l-1.78,-0.16l0.67,-1.15l-0.24,-0.86l1.25,-2.13l-0.54,-1.09l-0.67,-0.08l-0.72,0.87l-0.87,-0.64l0.35,-0.69l-0.36,-1.96l0.81,-0.51l0.45,-1.51l0.92,-1.57l-0.07,-0.97l2.65,-1.33l2.75,1.35l0.77,1.05l2.12,0.35l0.76,-0.32l1.96,1.21Z',
      name: 'Ecuador',
    },
    AL: {
      path: 'M470.32,171.8l0.74,0.03l0.92,0.89l-0.17,1.95l0.36,1.28l1.01,0.82l-1.82,2.83l-0.19,-0.61l-1.25,-0.89l-0.18,-1.2l0.53,-2.82l-0.54,-1.47l0.6,-0.83Z',
      name: 'Albania',
    },
    AO: {
      path: 'M461.55,300.03l1.26,3.15l1.94,2.36l2.47,-0.53l1.25,0.32l0.44,-0.18l0.93,-1.92l1.31,-0.08l0.41,-0.44l0.47,-0.0l-0.1,0.41l0.39,0.49l2.65,-0.02l0.03,1.19l0.48,1.01l-0.34,1.52l0.18,1.55l0.83,1.04l-0.13,2.85l0.54,0.39l3.96,-0.41l-0.1,1.79l0.39,1.05l-0.24,1.43l-4.7,-0.03l-0.4,0.39l-0.12,8.13l2.92,3.49l-3.83,0.88l-5.89,-0.36l-1.88,-1.24l-10.47,0.22l-1.3,-1.01l-1.85,-0.16l-2.4,0.77l-0.15,-1.06l0.33,-2.16l1.0,-3.45l1.35,-3.2l2.24,-2.8l0.33,-2.06l-0.13,-1.53l-0.8,-1.08l-1.21,-2.87l0.87,-1.62l-1.27,-4.12l-1.17,-1.53l2.47,-0.63l7.03,0.03ZM451.71,298.87l-0.47,-1.25l1.25,-1.11l0.32,0.3l-0.99,1.03l-0.12,1.03Z',
      name: 'Angola',
    },
    KZ: {
      path: 'M552.8,172.89l0.46,-1.27l-0.48,-1.05l-2.96,-1.19l-1.06,-2.58l-1.37,-0.87l-0.03,-0.3l1.95,0.23l0.45,-0.38l0.08,-1.96l1.75,-0.41l2.1,0.45l0.48,-0.33l0.45,-3.04l-0.45,-2.09l-0.41,-0.31l-2.42,0.15l-2.36,-0.73l-2.87,1.37l-2.17,0.61l-0.85,-0.34l0.13,-1.61l-1.6,-2.12l-2.02,-0.08l-1.78,-1.82l1.29,-2.18l-0.57,-0.95l1.62,-2.91l2.21,1.63l0.63,-0.27l0.29,-2.22l4.92,-3.43l3.71,-0.08l8.4,3.6l2.92,-1.36l3.77,-0.06l3.11,1.66l0.51,-0.11l0.6,-0.81l3.31,0.13l0.39,-0.25l0.63,-1.57l-0.17,-0.5l-3.5,-1.98l1.87,-1.27l-0.13,-1.03l1.98,-0.72l0.18,-0.62l-1.59,-2.06l0.81,-0.82l9.23,-1.18l1.33,-0.88l6.18,-1.26l2.26,-1.42l4.08,0.68l0.73,3.33l0.51,0.3l2.48,-0.8l2.79,1.02l-0.17,1.56l0.43,0.44l2.55,-0.24l4.89,-2.53l0.03,0.32l3.15,2.61l5.56,8.47l0.65,0.02l1.12,-1.46l3.15,1.74l3.76,-0.78l1.15,0.49l1.14,1.8l1.84,0.76l0.99,1.29l3.35,-0.25l1.02,1.52l-1.6,1.81l-1.93,0.28l-0.34,0.38l-0.11,3.05l-1.13,1.16l-4.75,-1.0l-0.46,0.27l-1.76,5.47l-1.1,0.59l-4.91,1.23l-0.27,0.54l2.1,4.97l-1.37,0.63l-0.23,0.41l0.13,1.13l-0.88,-0.25l-1.42,-1.13l-7.89,-0.4l-0.92,0.31l-3.73,-1.22l-1.42,0.63l-0.53,1.66l-3.72,-0.94l-1.85,0.43l-0.76,1.4l-4.65,2.62l-1.13,2.08l-0.44,0.01l-0.92,-1.4l-2.87,-0.09l-0.45,-2.14l-0.38,-0.32l-0.8,-0.01l0.0,-2.96l-3.0,-2.22l-7.31,0.58l-2.35,-2.68l-6.71,-3.69l-6.45,1.83l-0.29,0.39l0.1,10.85l-0.7,0.08l-1.62,-2.17l-1.83,-0.96l-3.11,0.59l-0.64,0.51Z',
      name: 'Kazakhstan',
    },
    ET: {
      path: 'M516.04,247.79l1.1,0.84l1.63,-0.45l0.68,0.47l1.63,0.03l2.01,0.94l1.73,1.66l1.64,2.07l-1.52,2.04l0.16,1.72l0.39,0.38l2.05,0.0l-0.36,1.03l2.86,3.58l8.32,3.08l1.31,0.02l-6.32,6.75l-3.1,0.11l-2.36,1.77l-1.47,0.04l-0.86,0.79l-1.38,-0.0l-1.32,-0.81l-2.29,1.05l-0.76,0.98l-3.29,-0.41l-3.07,-2.07l-1.8,-0.07l-0.62,-0.6l0.0,-1.24l-0.28,-0.38l-1.15,-0.37l-1.4,-2.59l-1.19,-0.68l-0.47,-1.0l-1.27,-1.23l-1.16,-0.22l0.43,-0.72l1.45,-0.28l0.41,-0.95l-0.03,-2.21l0.68,-2.44l1.05,-0.63l1.43,-3.06l1.57,-1.37l1.02,-2.51l0.35,-1.88l2.52,0.46l0.44,-0.24l0.58,-1.43Z',
      name: 'Ethiopia',
    },
    ZW: {
      path: 'M498.91,341.09l-1.11,-0.22l-0.92,0.28l-2.09,-0.44l-1.5,-1.11l-1.89,-0.43l-0.62,-1.4l-0.01,-0.84l-0.3,-0.38l-0.97,-0.25l-2.71,-2.74l-1.92,-3.32l3.83,0.45l3.73,-3.82l1.08,-0.44l0.26,-0.77l1.25,-0.9l1.41,-0.26l0.5,0.89l1.99,-0.05l1.72,1.17l1.11,0.17l1.05,0.66l0.01,2.99l-0.59,3.76l0.38,0.86l-0.23,1.23l-0.39,0.35l-0.63,1.81l-2.43,2.75Z',
      name: 'Zimbabwe',
    },
    ES: {
      path: 'M416.0,169.21l1.07,1.17l4.61,1.38l1.06,-0.57l2.6,1.26l2.71,-0.3l0.09,1.12l-2.14,1.8l-3.11,0.61l-0.31,0.31l-0.2,0.89l-1.54,1.69l-0.97,2.4l0.84,1.74l-1.32,1.27l-0.48,1.68l-1.88,0.65l-1.66,2.07l-5.36,-0.01l-1.79,1.08l-0.89,0.98l-0.88,-0.17l-0.79,-0.82l-0.68,-1.59l-2.37,-0.63l-0.11,-0.5l1.21,-1.82l-0.77,-1.13l0.61,-1.68l-0.76,-1.62l0.87,-0.49l0.09,-1.25l0.42,-0.6l0.03,-2.11l0.99,-0.69l0.13,-0.5l-1.03,-1.73l-1.46,-0.11l-0.61,0.38l-1.06,0.0l-0.52,-1.23l-0.53,-0.21l-1.32,0.67l-0.01,-1.49l-0.75,-0.96l3.03,-1.88l2.99,0.53l3.32,-0.02l2.63,0.51l6.01,-0.06Z',
      name: 'Spain',
    },
    ER: {
      path: 'M520.38,246.23l3.42,2.43l3.5,3.77l0.84,0.54l-0.95,-0.01l-3.51,-3.89l-2.33,-1.15l-1.73,-0.07l-0.91,-0.51l-1.26,0.51l-1.34,-1.02l-0.61,0.17l-0.66,1.61l-2.35,-0.43l-0.17,-0.67l1.29,-5.29l0.61,-0.61l1.95,-0.53l0.87,-1.01l1.17,2.41l0.68,2.33l1.49,1.43Z',
      name: 'Eritrea',
    },
    ME: {
      path: 'M468.91,172.53l-1.22,-1.02l0.47,-1.81l0.89,-0.72l2.26,1.51l-0.5,0.57l-0.75,-0.27l-1.14,1.73Z',
      name: 'Montenegro',
    },
    MD: {
      path: 'M488.41,153.73l1.4,-0.27l1.72,0.93l1.07,0.15l0.85,0.65l-0.14,0.84l0.96,0.85l1.12,2.47l-1.15,-0.07l-0.66,-0.41l-0.52,0.25l-0.09,0.86l-1.08,1.89l-0.27,-0.86l0.25,-1.34l-0.16,-1.6l-3.29,-4.34Z',
      name: 'Moldova',
    },
    MG: {
      path: 'M545.91,319.14l0.4,3.03l0.62,1.21l-0.21,1.02l-0.57,-0.8l-0.69,-0.01l-0.47,0.76l0.41,2.12l-0.18,0.87l-0.73,0.78l-0.15,2.14l-4.71,15.2l-1.06,2.88l-3.92,1.64l-3.12,-1.49l-0.6,-1.21l-0.19,-2.4l-0.86,-2.05l-0.21,-1.77l0.38,-1.62l1.21,-0.75l0.01,-0.76l1.19,-2.04l0.23,-1.66l-1.06,-2.99l-0.19,-2.21l0.81,-1.33l0.32,-1.46l4.63,-1.22l3.44,-3.0l0.85,-1.4l-0.08,-0.7l0.78,-0.04l1.38,-1.77l0.13,-1.64l0.45,-0.61l1.16,1.69l0.59,1.6Z',
      name: 'Madagascar',
    },
    MA: {
      path: 'M378.78,230.02l0.06,-0.59l0.92,-0.73l0.82,-1.37l-0.09,-1.04l0.79,-1.7l1.31,-1.58l0.96,-0.59l0.66,-1.55l0.09,-1.47l0.81,-1.48l1.72,-1.07l1.55,-2.69l1.16,-0.96l2.44,-0.39l1.94,-1.82l1.31,-0.78l2.09,-2.28l-0.51,-3.65l1.24,-3.7l1.5,-1.75l4.46,-2.57l2.37,-4.47l1.44,0.01l1.68,1.21l2.32,-0.19l3.47,0.65l0.8,1.54l0.16,1.71l0.86,2.96l0.56,0.59l-0.26,0.61l-3.05,0.44l-1.26,1.05l-1.33,0.22l-0.33,0.37l-0.09,1.78l-2.68,1.0l-1.07,1.42l-4.47,1.13l-4.04,2.01l-0.54,4.64l-1.15,0.06l-0.92,0.61l-1.96,-0.35l-2.42,0.54l-0.74,1.9l-0.86,0.4l-1.14,3.26l-3.53,3.01l-0.8,3.55l-0.96,1.1l-0.29,0.82l-4.95,0.18Z',
      name: 'Morocco',
    },
    UZ: {
      path: 'M598.64,172.75l-1.63,1.52l0.06,0.64l1.85,1.12l1.97,-0.64l2.21,1.17l-2.52,1.68l-2.59,-0.22l-0.18,-0.41l0.46,-1.23l-0.45,-0.53l-3.35,0.69l-2.1,3.51l-1.87,-0.12l-1.03,1.51l0.22,0.55l1.64,0.62l0.46,1.83l-1.19,2.49l-2.66,-0.53l0.05,-1.36l-0.26,-0.39l-3.3,-1.23l-2.56,-1.4l-4.4,-3.34l-1.34,-3.14l-1.08,-0.6l-2.58,0.13l-0.69,-0.44l-0.47,-2.52l-3.37,-1.6l-0.43,0.05l-2.07,1.72l-2.1,1.01l-0.21,0.47l0.28,1.01l-1.91,0.03l-0.09,-10.5l5.99,-1.7l6.19,3.54l2.71,2.84l7.05,-0.67l2.71,2.01l-0.17,2.81l0.39,0.42l0.9,0.02l0.44,2.14l0.38,0.32l2.94,0.09l0.95,1.42l1.28,-0.24l1.05,-2.04l4.43,-2.5Z',
      name: 'Uzbekistan',
    },
    MM: {
      path: 'M673.9,230.21l-1.97,1.57l-0.57,0.96l-1.4,0.6l-1.36,1.05l-1.99,0.36l-1.08,2.66l-0.91,0.4l-0.19,0.55l1.21,2.27l2.52,3.43l-0.79,1.91l-0.74,0.41l-0.17,0.52l0.65,1.37l1.61,1.95l0.25,2.58l0.9,2.13l-1.92,3.57l0.68,-2.25l-0.81,-1.74l0.19,-2.65l-1.05,-1.53l-1.24,-6.17l-1.12,-2.26l-0.6,-0.13l-4.34,3.02l-2.39,-0.65l0.77,-2.84l-0.52,-2.61l-1.91,-2.96l0.25,-0.75l-0.29,-0.51l-1.33,-0.3l-1.61,-1.93l-0.1,-1.3l0.82,-0.24l0.04,-1.64l1.02,-0.52l0.21,-0.45l-0.23,-0.95l0.54,-0.96l0.08,-2.22l1.46,0.45l0.47,-0.2l1.12,-2.19l0.16,-1.35l1.33,-2.16l-0.0,-1.52l2.89,-1.66l1.63,0.44l0.5,-0.44l-0.17,-1.4l0.64,-0.36l0.08,-1.04l0.77,-0.11l0.71,1.35l1.06,0.69l-0.03,3.86l-2.38,2.37l-0.3,3.15l0.46,0.43l2.28,-0.38l0.51,2.08l1.47,0.67l-0.6,1.8l0.19,0.48l2.97,1.48l1.64,-0.55l0.02,0.32Z',
      name: 'Myanmar',
    },
    ML: {
      path: 'M392.61,254.08l-0.19,-2.37l-0.99,-0.87l-0.44,-1.3l-0.09,-1.28l0.81,-0.58l0.35,-1.24l2.37,0.65l1.31,-0.47l0.86,0.15l0.66,-0.56l9.83,-0.04l0.38,-0.28l0.56,-1.8l-0.44,-0.65l-2.35,-21.95l3.27,-0.04l16.7,11.38l0.74,1.31l2.5,1.09l0.02,1.38l0.44,0.39l2.34,-0.21l0.01,5.38l-1.28,1.61l-0.26,1.49l-5.31,0.57l-1.07,0.92l-2.9,0.1l-0.86,-0.48l-1.38,0.36l-2.4,1.08l-0.6,0.87l-1.85,1.09l-0.43,0.7l-0.79,0.39l-1.44,-0.21l-0.81,0.84l-0.34,1.64l-1.91,2.02l-0.06,1.03l-0.67,1.22l0.13,1.16l-0.97,0.39l-0.23,-0.64l-0.52,-0.24l-1.35,0.4l-0.34,0.55l-2.69,-0.28l-0.37,-0.35l-0.02,-0.9l-0.65,-0.35l0.45,-0.64l-0.03,-0.53l-2.12,-2.44l-0.76,-0.01l-2.0,1.16l-0.78,-0.15l-0.8,-0.67l-1.21,0.23Z',
      name: 'Mali',
    },
    MN: {
      path: 'M676.61,146.48l3.81,1.68l5.67,-1.0l2.37,0.41l2.34,1.5l1.79,1.75l2.29,-0.03l3.12,0.52l2.47,-0.81l3.41,-0.59l3.53,-2.21l1.25,0.29l1.53,1.13l2.27,-0.21l-2.66,5.01l0.64,1.68l0.47,0.21l1.32,-0.38l2.38,0.48l2.02,-1.11l1.76,0.89l2.06,2.02l-0.13,0.53l-1.72,-0.29l-3.77,0.46l-1.88,0.99l-1.76,1.99l-3.71,1.17l-2.45,1.6l-3.83,-0.87l-0.41,0.17l-1.31,1.99l1.04,2.24l-1.52,0.9l-1.74,1.57l-2.79,1.02l-3.78,0.13l-4.05,1.05l-2.77,1.52l-1.16,-0.85l-2.94,0.0l-3.62,-1.79l-2.58,-0.49l-3.4,0.41l-5.12,-0.67l-2.63,0.06l-1.31,-1.6l-1.4,-3.0l-1.48,-0.33l-3.13,-1.94l-6.16,-0.93l-0.71,-1.06l0.86,-3.82l-1.93,-2.71l-3.5,-1.18l-1.95,-1.58l-0.5,-1.72l2.34,-0.52l4.75,-2.8l3.62,-1.47l2.18,0.97l2.46,0.05l1.81,1.53l2.46,0.12l3.95,0.71l2.43,-2.28l0.08,-0.48l-0.9,-1.72l2.24,-2.98l2.62,1.27l4.94,1.17l0.43,2.24Z',
      name: 'Mongolia',
    },
    MK: {
      path: 'M472.8,173.98l0.49,-0.71l3.57,-0.71l1.0,0.77l0.13,1.45l-0.65,0.53l-1.15,-0.05l-1.12,0.67l-1.39,0.22l-0.79,-0.55l-0.29,-1.03l0.19,-0.6Z',
      name: 'Macedonia',
    },
    MW: {
      path: 'M505.5,309.31l0.85,1.95l0.15,2.86l-0.69,1.65l0.71,1.8l0.06,1.28l0.49,0.64l0.07,1.06l0.4,0.55l0.8,-0.23l0.55,0.61l0.69,-0.21l0.34,0.6l0.19,2.94l-1.04,0.62l-0.54,1.25l-1.11,-1.08l-0.16,-1.56l0.51,-1.31l-0.32,-1.3l-0.99,-0.65l-0.82,0.12l-2.36,-1.64l0.63,-1.96l0.82,-1.18l-0.46,-2.01l0.9,-2.86l-0.94,-2.51l0.96,0.18l0.29,0.4Z',
      name: 'Malawi',
    },
    MR: {
      path: 'M407.36,220.66l-2.58,0.03l-0.39,0.44l2.42,22.56l0.36,0.43l-0.39,1.24l-9.75,0.04l-0.56,0.53l-0.91,-0.11l-1.27,0.45l-1.61,-0.66l-0.97,0.03l-0.36,0.29l-0.38,1.35l-0.42,0.23l-2.93,-3.4l-2.96,-1.52l-1.62,-0.03l-1.27,0.54l-1.12,-0.2l-0.65,0.4l-0.08,-0.49l0.68,-1.29l0.31,-2.43l-0.57,-3.91l0.23,-1.21l-0.69,-1.5l-1.15,-1.02l0.25,-0.39l9.58,0.02l0.4,-0.45l-0.46,-3.68l0.47,-1.04l2.12,-0.21l0.36,-0.4l-0.08,-6.4l7.81,0.13l0.41,-0.4l0.01,-3.31l7.76,5.35Z',
      name: 'Mauritania',
    },
    UG: {
      path: 'M498.55,276.32l0.7,-0.46l1.65,0.5l1.96,-0.57l1.7,0.01l1.45,-0.98l0.91,1.33l1.33,3.95l-2.57,4.03l-1.46,-0.4l-2.54,0.91l-1.37,1.61l-0.01,0.81l-2.42,-0.01l-2.26,1.01l-0.17,-1.59l0.58,-1.04l0.14,-1.94l1.37,-2.28l1.78,-1.58l-0.17,-0.65l-0.72,-0.24l0.13,-2.43Z',
      name: 'Uganda',
    },
    MY: {
      path: 'M717.47,273.46l-1.39,0.65l-2.12,-0.41l-2.88,-0.0l-0.38,0.28l-0.84,2.75l-0.99,0.96l-1.21,3.29l-1.73,0.45l-2.45,-0.68l-1.39,0.31l-1.33,1.15l-1.59,-0.14l-1.41,0.44l-1.44,-1.19l-0.18,-0.73l1.34,0.53l1.93,-0.47l0.75,-2.22l4.02,-1.03l2.75,-3.21l0.82,0.94l0.64,-0.05l0.4,-0.65l0.96,0.06l0.42,-0.36l0.24,-2.68l1.81,-1.64l1.21,-1.86l0.63,-0.01l1.07,1.05l0.34,1.28l3.44,1.35l-0.06,0.35l-1.37,0.1l-0.35,0.54l0.32,0.88ZM673.68,269.59l0.17,1.09l0.47,0.33l1.65,-0.3l0.87,-0.94l1.61,1.52l0.98,1.56l-0.12,2.81l0.41,2.29l0.95,0.9l0.88,2.44l-1.27,0.12l-5.1,-3.67l-0.34,-1.29l-1.37,-1.59l-0.33,-1.97l-0.88,-1.4l0.25,-1.68l-0.46,-1.05l1.63,0.84Z',
      name: 'Malaysia',
    },
    MX: {
      path: 'M133.12,200.41l0.2,0.47l9.63,3.33l6.96,-0.02l0.4,-0.4l0.0,-0.74l3.77,0.0l3.55,2.93l1.39,2.83l1.52,1.04l2.08,0.82l0.47,-0.14l1.46,-2.0l1.73,-0.04l1.59,0.98l2.05,3.35l1.47,1.56l1.26,3.14l2.18,1.02l2.26,0.58l-1.18,3.72l-0.42,5.04l1.79,4.89l1.62,1.89l0.61,1.52l1.2,1.42l2.55,0.66l1.37,1.1l7.54,-1.89l1.86,-1.3l1.14,-4.3l4.1,-1.21l3.57,-0.11l0.32,0.3l-0.06,0.94l-1.26,1.45l-0.67,1.71l0.38,0.7l-0.72,2.27l-0.49,-0.3l-1.0,0.08l-1.0,1.39l-0.47,-0.11l-0.53,0.47l-4.26,-0.02l-0.4,0.4l-0.0,1.06l-1.1,0.26l0.1,0.44l1.82,1.44l0.56,0.91l-3.19,0.21l-1.21,2.09l0.24,0.72l-0.2,0.44l-2.24,-2.18l-1.45,-0.93l-2.22,-0.69l-1.52,0.22l-3.07,1.16l-10.55,-3.85l-2.86,-1.96l-3.78,-0.92l-1.08,-1.19l-2.62,-1.43l-1.18,-1.54l-0.38,-0.81l0.66,-0.63l-0.18,-0.53l0.52,-0.76l0.01,-0.91l-2.0,-3.82l-2.21,-2.63l-2.53,-2.09l-1.19,-1.62l-2.2,-1.17l-0.3,-0.43l0.34,-1.48l-0.21,-0.45l-1.23,-0.6l-1.36,-1.2l-0.59,-1.78l-1.54,-0.47l-2.44,-2.55l-0.16,-0.9l-1.33,-2.03l-0.84,-1.99l-0.16,-1.33l-1.81,-1.1l-0.97,0.05l-1.31,-0.7l-0.57,0.22l-0.4,1.12l0.72,3.77l3.51,3.89l0.28,0.78l0.53,0.26l0.41,1.43l1.33,1.73l1.58,1.41l0.8,2.39l1.43,2.41l0.13,1.32l0.37,0.36l1.04,0.08l1.67,2.28l-0.85,0.76l-0.66,-1.51l-1.68,-1.54l-2.91,-1.87l0.06,-1.82l-0.54,-1.68l-2.91,-2.03l-0.55,0.09l-1.95,-1.1l-0.88,-0.94l0.68,-0.08l0.93,-1.01l0.08,-1.78l-1.93,-1.94l-1.46,-0.77l-3.75,-7.56l4.88,-0.42Z',
      name: 'Mexico',
    },
    VU: {
      path: 'M839.04,322.8l0.22,1.14l-0.44,0.03l-0.2,-1.45l0.42,0.27Z',
      name: 'Vanuatu',
    },
    FR: {
      path: 'M444.48,172.62l-0.64,1.78l-0.58,-0.31l-0.49,-1.72l0.4,-0.89l1.0,-0.72l0.3,1.85ZM429.64,147.1l1.78,1.58l1.46,-0.13l2.1,1.42l1.35,0.27l1.23,0.83l3.04,0.5l-1.03,1.85l-0.3,2.12l-0.41,0.32l-0.95,-0.24l-0.5,0.43l0.06,0.61l-1.81,1.92l-0.04,1.42l0.55,0.38l0.88,-0.36l0.61,0.97l-0.03,1.0l0.57,0.91l-0.75,1.09l0.65,2.39l1.27,0.57l-0.18,0.82l-2.01,1.53l-4.77,-0.8l-3.82,1.0l-0.53,1.85l-2.49,0.34l-2.71,-1.31l-1.16,0.57l-4.31,-1.29l-0.72,-0.86l1.19,-1.78l0.39,-6.45l-2.58,-3.3l-1.9,-1.66l-3.72,-1.23l-0.19,-1.72l2.81,-0.61l4.12,0.81l0.47,-0.48l-0.6,-2.77l1.94,0.95l5.83,-2.54l0.92,-2.74l1.6,-0.49l0.24,0.78l1.36,0.33l1.05,1.19ZM289.01,278.39l-0.81,0.8l-0.78,0.12l-0.5,-0.66l-0.56,-0.1l-0.91,0.6l-0.46,-0.22l1.09,-2.96l-0.96,-1.77l-0.17,-1.49l1.07,-1.77l2.32,0.75l2.51,2.01l0.3,0.74l-2.14,3.96Z',
      name: 'France',
    },
    FI: {
      path: 'M492.17,76.39l-0.23,3.5l3.52,2.63l-2.08,2.88l-0.02,0.44l2.8,4.56l-1.59,3.31l2.16,3.24l-0.94,2.39l0.14,0.47l3.44,2.51l-0.77,1.62l-7.52,6.95l-4.5,0.31l-4.38,1.37l-3.8,0.74l-1.44,-1.96l-2.17,-1.11l0.5,-3.66l-1.16,-3.33l1.09,-2.08l2.21,-2.42l5.67,-4.32l1.64,-0.83l0.21,-0.42l-0.46,-2.02l-3.38,-1.89l-0.75,-1.43l-0.22,-6.74l-6.79,-4.8l0.8,-0.62l2.54,2.12l3.46,-0.12l3.0,0.96l2.51,-2.11l1.17,-3.08l3.55,-1.38l2.76,1.53l-0.95,2.79Z',
      name: 'Finland',
    },
    FJ: {
      path: 'M871.53,326.34l-2.8,1.05l-0.08,-0.23l2.97,-1.21l-0.1,0.39ZM867.58,329.25l0.43,0.37l-0.27,0.88l-1.24,0.28l-1.04,-0.24l-0.14,-0.66l0.63,-0.58l0.92,0.26l0.7,-0.31Z',
      name: 'Fiji',
    },
    FK: {
      path: 'M274.36,425.85l1.44,1.08l-0.47,0.73l-3.0,0.89l-0.96,-1.0l-0.52,-0.05l-1.83,1.29l-0.73,-0.88l2.46,-1.64l1.93,0.76l1.67,-1.19Z',
      name: 'Falkland Is.',
    },
    NI: {
      path: 'M202.33,252.67l0.81,-0.18l1.03,-1.02l-0.04,-0.88l0.68,-0.0l0.63,-0.54l0.97,0.22l1.53,-1.26l0.58,-0.99l1.17,0.34l2.41,-0.94l0.13,1.32l-0.81,1.94l0.1,2.74l-0.36,0.37l-0.11,1.75l-0.47,0.81l0.18,1.14l-1.73,-0.85l-0.71,0.27l-1.47,-0.6l-0.52,0.16l-4.01,-3.81Z',
      name: 'Nicaragua',
    },
    NL: {
      path: 'M430.31,143.39l0.6,-0.5l2.13,-4.8l3.2,-1.33l1.74,0.08l0.33,0.8l-0.59,2.92l-0.5,0.99l-1.26,0.0l-0.4,0.45l0.33,2.7l-2.2,-1.78l-2.62,0.58l-0.75,-0.11Z',
      name: 'Netherlands',
    },
    NO: {
      path: 'M491.44,67.41l6.8,2.89l-2.29,0.86l-0.15,0.65l2.33,2.38l-4.98,1.79l0.84,-2.45l-0.18,-0.48l-3.55,-1.8l-3.89,1.52l-1.42,3.38l-2.12,1.72l-2.64,-1.0l-3.11,0.21l-2.66,-2.22l-0.5,-0.01l-1.41,1.1l-1.44,0.17l-0.35,0.35l-0.32,2.47l-4.32,-0.64l-0.44,0.29l-0.58,2.11l-2.45,0.2l-4.15,7.68l-3.88,5.76l0.78,1.62l-0.64,1.16l-2.24,-0.06l-0.38,0.24l-1.66,3.89l0.15,5.17l1.57,2.04l-0.78,4.16l-2.02,2.48l-0.85,1.63l-1.3,-1.75l-0.58,-0.07l-4.87,4.19l-3.1,0.79l-3.16,-1.7l-0.85,-3.77l-0.77,-8.55l2.14,-2.31l6.55,-3.27l5.02,-4.17l10.63,-13.84l10.98,-8.7l5.35,-1.91l4.34,0.12l3.69,-3.64l4.49,0.19l4.37,-0.89ZM484.55,20.04l4.26,1.75l-3.1,2.55l-7.1,0.65l-7.08,-0.9l-0.37,-1.31l-0.37,-0.29l-3.44,-0.1l-2.08,-2.0l6.87,-1.44l3.9,1.31l2.39,-1.64l6.13,1.4ZM481.69,33.93l-4.45,1.74l-3.54,-0.99l1.12,-0.9l0.05,-0.58l-1.06,-1.22l4.22,-0.89l1.09,1.97l2.57,0.87ZM466.44,24.04l7.43,3.77l-5.41,1.86l-1.58,4.08l-2.26,1.2l-1.12,4.11l-2.61,0.18l-4.79,-2.86l1.84,-1.54l-0.1,-0.68l-3.69,-1.53l-4.77,-4.51l-1.73,-3.89l6.11,-1.82l1.54,1.92l3.57,-0.08l1.2,-1.96l3.32,-0.18l3.05,1.92Z',
      name: 'Norway',
    },
    NA: {
      path: 'M474.26,330.66l-0.97,0.04l-0.38,0.4l-0.07,8.9l-2.09,0.08l-0.39,0.4l-0.0,17.42l-1.98,1.23l-1.17,0.17l-2.44,-0.66l-0.48,-1.13l-0.99,-0.74l-0.54,0.05l-0.9,1.01l-1.53,-1.68l-0.93,-1.88l-1.99,-8.56l-0.06,-3.12l-0.33,-1.52l-2.3,-3.34l-1.91,-4.83l-1.96,-2.43l-0.12,-1.57l2.33,-0.79l1.43,0.07l1.81,1.13l10.23,-0.25l1.84,1.23l5.87,0.35ZM474.66,330.64l6.51,-1.6l1.9,0.39l-1.69,0.4l-1.31,0.83l-1.12,-0.94l-4.29,0.92Z',
      name: 'Namibia',
    },
    NC: {
      path: 'M838.78,341.24l-0.33,0.22l-2.9,-1.75l-3.26,-3.37l1.65,0.83l4.85,4.07Z',
      name: 'New Caledonia',
    },
    NE: {
      path: 'M454.75,226.53l1.33,1.37l0.48,0.07l1.27,-0.7l0.53,3.52l0.94,0.83l0.17,0.92l0.81,0.69l-0.44,0.95l-0.96,5.26l-0.13,3.22l-3.04,2.31l-1.22,3.57l1.02,1.24l-0.0,1.46l0.39,0.4l1.13,0.04l-0.9,1.25l-1.47,-2.42l-0.86,-0.29l-2.09,1.37l-1.74,-0.67l-1.45,-0.17l-0.85,0.35l-1.36,-0.07l-1.64,1.09l-1.06,0.05l-2.94,-1.28l-1.44,0.59l-1.01,-0.03l-0.97,-0.94l-2.7,-0.98l-2.69,0.3l-0.87,0.64l-0.47,1.6l-0.75,1.16l-0.12,1.53l-1.57,-1.1l-1.31,0.24l0.03,-0.81l-0.32,-0.41l-2.59,-0.52l-0.15,-1.16l-1.35,-1.6l-0.29,-1.0l0.13,-0.84l1.29,-0.08l1.08,-0.92l3.31,-0.22l2.22,-0.41l0.32,-0.34l0.2,-1.47l1.39,-1.88l-0.01,-5.66l3.36,-1.12l7.24,-5.12l8.42,-4.92l3.69,1.06Z',
      name: 'Niger',
    },
    NG: {
      path: 'M456.32,253.89l0.64,0.65l-0.28,1.04l-2.11,2.01l-2.03,5.18l-1.37,1.16l-1.15,3.18l-1.33,0.66l-1.46,-0.97l-1.21,0.16l-1.38,1.36l-0.91,0.24l-1.79,4.06l-2.33,0.81l-1.11,-0.07l-0.86,0.5l-1.71,-0.05l-1.19,-1.39l-0.89,-1.89l-1.77,-1.66l-3.95,-0.08l0.07,-5.21l0.42,-1.43l1.95,-2.3l-0.14,-0.91l0.43,-1.18l-0.53,-1.41l0.25,-2.92l0.72,-1.07l0.32,-1.34l0.46,-0.39l2.47,-0.28l2.34,0.89l1.15,1.02l1.28,0.04l1.22,-0.58l3.03,1.27l1.49,-0.14l1.36,-1.0l1.33,0.07l0.82,-0.35l3.45,0.8l1.82,-1.32l1.84,2.67l0.66,0.16Z',
      name: 'Nigeria',
    },
    NZ: {
      path: 'M857.8,379.65l1.86,3.12l0.44,0.18l0.3,-0.38l0.03,-1.23l0.38,0.27l0.57,2.31l2.02,0.94l1.81,0.27l1.57,-1.06l0.7,0.18l-1.15,3.59l-1.98,0.11l-0.74,1.2l0.2,1.11l-2.42,3.98l-1.49,0.92l-1.04,-0.85l1.21,-2.05l-0.81,-2.01l-2.63,-1.25l0.04,-0.57l1.82,-1.19l0.43,-2.34l-0.16,-2.03l-0.95,-1.82l-0.06,-0.72l-3.11,-3.64l-0.79,-1.52l1.56,1.45l1.76,0.66l0.65,2.34ZM853.83,393.59l0.57,1.24l0.59,0.16l1.42,-0.97l0.46,0.79l0.0,1.03l-2.47,3.48l-1.26,1.2l-0.06,0.5l0.55,0.87l-1.41,0.07l-2.33,1.38l-2.03,5.02l-3.02,2.16l-2.06,-0.06l-1.71,-1.04l-2.47,-0.2l-0.27,-0.73l1.22,-2.1l3.05,-2.94l1.62,-0.59l4.02,-2.82l1.57,-1.67l1.07,-2.16l0.88,-0.7l0.48,-1.75l1.24,-0.97l0.35,0.79Z',
      name: 'New Zealand',
    },
    NP: {
      path: 'M641.14,213.62l0.01,3.19l-1.74,0.04l-4.8,-0.86l-1.58,-1.39l-3.37,-0.34l-7.65,-3.7l0.8,-2.09l2.33,-1.7l1.77,0.75l2.49,1.76l1.38,0.41l0.99,1.35l1.9,0.52l1.99,1.17l5.49,0.9Z',
      name: 'Nepal',
    },
    CI: {
      path: 'M407.4,259.27l0.86,0.42l0.56,0.9l1.13,0.53l1.19,-0.61l0.97,-0.08l1.42,0.54l0.6,3.24l-1.03,2.08l-0.65,2.84l1.06,2.33l-0.06,0.53l-2.54,-0.47l-1.66,0.03l-3.06,0.46l-4.11,1.6l0.32,-3.06l-1.18,-1.31l-1.32,-0.66l0.42,-0.85l-0.2,-1.4l0.5,-0.67l0.01,-1.59l0.84,-0.32l0.26,-0.5l-1.15,-3.01l0.12,-0.5l0.51,-0.25l0.66,0.31l1.93,0.02l0.67,-0.71l0.71,-0.14l0.25,0.69l0.57,0.22l1.4,-0.61Z',
      name: "C\u00c3\u00b4te d'Ivoire",
    },
    CH: {
      path: 'M444.62,156.35l-0.29,0.87l0.18,0.53l1.13,0.58l1.0,0.1l-0.1,0.65l-0.79,0.38l-1.72,-0.37l-0.45,0.23l-0.45,1.04l-0.75,0.06l-0.84,-0.4l-1.32,1.0l-0.96,0.12l-0.88,-0.55l-0.81,-1.3l-0.49,-0.16l-0.63,0.26l0.02,-0.65l1.71,-1.66l0.1,-0.56l0.93,0.08l0.58,-0.46l1.99,0.02l0.66,-0.61l2.19,0.79Z',
      name: 'Switzerland',
    },
    CO: {
      path: 'M242.07,254.93l-1.7,0.59l-0.59,1.18l-1.7,1.69l-0.38,1.93l-0.67,1.43l0.31,0.57l1.03,0.13l0.25,0.9l0.57,0.64l-0.04,2.34l1.64,1.42l3.16,-0.24l1.26,0.28l1.67,2.06l0.41,0.13l4.09,-0.39l0.45,0.22l-0.92,1.95l-0.2,1.8l0.52,1.83l0.75,1.05l-1.12,1.1l0.07,0.63l0.84,0.51l0.74,1.29l-0.39,-0.45l-0.59,-0.01l-0.71,0.74l-4.71,-0.05l-0.4,0.41l0.03,1.57l0.33,0.39l1.11,0.2l-1.68,0.4l-0.29,0.38l-0.01,1.82l1.16,1.14l0.34,1.25l-1.05,7.05l-1.04,-0.87l1.26,-1.99l-0.13,-0.56l-2.18,-1.23l-1.38,0.2l-1.14,-0.38l-1.27,0.61l-1.55,-0.26l-1.38,-2.46l-1.23,-0.75l-0.85,-1.2l-1.67,-1.19l-0.86,0.13l-2.11,-1.32l-1.01,0.31l-1.8,-0.29l-0.52,-0.91l-3.09,-1.68l0.77,-0.52l-0.1,-1.12l0.41,-0.64l1.34,-0.32l2.0,-2.88l-0.11,-0.57l-0.66,-0.43l0.39,-1.38l-0.52,-2.1l0.49,-0.83l-0.4,-2.13l-0.97,-1.35l0.17,-0.66l0.86,-0.08l0.47,-0.75l-0.46,-1.63l1.41,-0.07l1.8,-1.69l0.93,-0.24l0.3,-0.38l0.45,-2.76l1.22,-1.0l1.44,-0.04l0.45,-0.5l1.91,0.12l2.93,-1.84l1.15,-1.14l0.91,0.46l-0.25,0.45Z',
      name: 'Colombia',
    },
    CN: {
      path: 'M740.23,148.97l4.57,1.3l2.8,2.17l0.98,2.9l0.38,0.27l3.8,0.0l2.32,-1.28l3.29,-0.75l-0.96,2.09l-1.02,1.28l-0.85,3.4l-1.52,2.73l-2.76,-0.5l-2.4,1.13l-0.21,0.45l0.64,2.57l-0.32,3.2l-0.94,0.06l-0.37,0.89l-0.91,-1.01l-0.64,0.07l-0.92,1.57l-3.73,1.25l-0.26,0.48l0.26,1.06l-1.5,-0.08l-1.09,-0.86l-0.56,0.06l-1.67,2.06l-2.7,1.56l-2.03,1.88l-3.4,0.83l-1.93,1.4l-1.15,0.34l0.33,-0.7l-0.41,-0.89l1.79,-1.79l0.02,-0.54l-1.32,-1.56l-0.48,-0.1l-2.24,1.09l-2.83,2.06l-1.51,1.83l-2.28,0.13l-1.55,1.49l-0.04,0.5l1.32,1.97l2.0,0.58l0.31,1.35l1.98,0.84l3.0,-1.96l2.0,1.02l1.49,0.11l0.22,0.83l-3.37,0.86l-1.12,1.48l-2.5,1.52l-1.29,1.99l0.14,0.56l2.57,1.48l0.97,2.7l3.17,4.63l-0.03,1.66l-1.35,0.65l-0.2,0.51l0.6,1.47l1.4,0.91l-0.89,3.82l-1.43,0.38l-3.85,6.44l-2.27,3.11l-6.78,4.57l-2.73,0.29l-1.45,1.04l-0.62,-0.61l-0.55,-0.01l-1.36,1.25l-3.39,1.27l-2.61,0.4l-1.1,2.79l-0.81,0.09l-0.49,-1.42l0.5,-0.85l-0.25,-0.59l-3.36,-0.84l-1.3,0.4l-2.31,-0.62l-0.94,-0.84l0.33,-1.28l-0.3,-0.49l-2.19,-0.46l-1.13,-0.93l-0.47,-0.02l-2.06,1.36l-4.29,0.28l-2.76,1.05l-0.28,0.43l0.32,2.53l-0.59,-0.03l-0.19,-1.34l-0.55,-0.34l-1.68,0.7l-2.46,-1.23l0.62,-1.87l-0.26,-0.51l-1.37,-0.44l-0.54,-2.22l-0.45,-0.3l-2.13,0.35l0.24,-2.48l2.39,-2.4l0.03,-4.31l-1.19,-0.92l-0.78,-1.49l-0.41,-0.21l-1.41,0.19l-1.98,-0.3l0.46,-1.07l-1.17,-1.7l-0.55,-0.11l-1.63,1.05l-2.25,-0.57l-2.89,1.73l-2.25,1.98l-1.75,0.29l-1.17,-0.71l-3.31,-0.65l-1.48,0.79l-1.04,1.27l-0.12,-1.17l-0.54,-0.34l-1.44,0.54l-5.55,-0.86l-1.98,-1.16l-1.89,-0.54l-0.99,-1.35l-1.34,-0.37l-2.55,-1.79l-2.01,-0.84l-1.21,0.56l-5.57,-3.45l-0.53,-2.31l1.19,0.25l0.48,-0.37l0.08,-1.42l-0.98,-1.56l0.15,-2.44l-2.69,-3.32l-4.12,-1.23l-0.67,-2.0l-1.92,-1.48l-0.38,-0.7l-0.51,-3.01l-1.52,-0.66l-0.7,0.13l-0.48,-2.05l0.55,-0.51l-0.09,-0.82l2.03,-1.19l1.6,-0.54l2.56,0.38l0.42,-0.22l0.85,-1.7l3.0,-0.33l1.1,-1.26l4.05,-1.77l0.39,-0.91l-0.17,-1.44l1.45,-0.67l0.2,-0.52l-2.07,-4.9l4.51,-1.12l1.37,-0.73l1.89,-5.51l4.98,0.86l1.51,-1.7l0.11,-2.87l1.99,-0.38l1.83,-2.06l0.49,-0.13l0.68,2.08l2.23,1.77l3.44,1.16l1.55,2.29l-0.92,3.49l0.96,1.67l6.54,1.13l2.95,1.87l1.47,0.35l1.06,2.62l1.53,1.91l3.05,0.08l5.14,0.67l3.37,-0.41l2.36,0.43l3.65,1.8l3.06,0.04l1.45,0.88l2.87,-1.59l3.95,-1.02l3.83,-0.14l3.06,-1.14l1.77,-1.6l1.72,-1.01l0.17,-0.49l-1.1,-2.05l1.02,-1.54l4.02,0.8l2.45,-1.61l3.76,-1.19l1.96,-2.13l1.63,-0.83l3.51,-0.4l1.92,0.34l0.46,-0.3l0.17,-1.5l-2.27,-2.22l-2.11,-1.09l-2.18,1.11l-2.32,-0.47l-1.29,0.32l-0.4,-0.82l2.73,-5.16l3.02,1.06l3.53,-2.06l0.18,-1.68l2.16,-3.35l1.49,-1.35l-0.03,-1.85l-1.07,-0.85l1.54,-1.26l2.98,-0.59l3.23,-0.09l3.64,0.99l2.04,1.16l3.29,6.71l0.92,3.19ZM696.92,237.31l-1.87,1.08l-1.63,-0.64l-0.06,-1.79l1.03,-0.98l2.58,-0.69l1.16,0.05l0.3,0.54l-0.98,1.06l-0.53,1.37Z',
      name: 'China',
    },
    CM: {
      path: 'M457.92,257.49l1.05,1.91l-1.4,0.16l-1.05,-0.23l-0.45,0.22l-0.54,1.19l0.08,0.45l1.48,1.47l1.05,0.45l1.01,2.46l-1.52,2.99l-0.68,0.68l-0.13,3.69l2.38,3.84l1.09,0.8l0.24,2.48l-3.67,-1.14l-11.27,-0.13l0.23,-1.79l-0.98,-1.66l-1.19,-0.54l-0.44,-0.97l-0.6,-0.42l1.71,-4.27l0.75,-0.13l1.38,-1.36l0.65,-0.03l1.71,0.99l1.93,-1.12l1.14,-3.18l1.38,-1.17l2.0,-5.14l2.17,-2.13l0.3,-1.64l-0.86,-0.88l0.03,-0.33l0.94,1.28l0.07,3.22Z',
      name: 'Cameroon',
    },
    CL: {
      path: 'M246.5,429.18l-3.14,1.83l-0.57,3.16l-0.64,0.05l-2.68,-1.06l-2.82,-2.33l-3.04,-1.89l-0.69,-1.85l0.63,-2.14l-1.21,-2.11l-0.31,-5.37l1.01,-2.91l2.57,-2.38l-0.18,-0.68l-3.16,-0.77l2.05,-2.47l0.77,-4.65l2.32,0.9l0.54,-0.29l1.31,-6.31l-0.22,-0.44l-1.68,-0.8l-0.56,0.28l-0.7,3.36l-0.81,-0.22l1.56,-9.41l1.15,-2.24l-0.71,-2.82l-0.18,-2.84l1.01,-0.33l3.26,-9.14l1.07,-4.22l-0.56,-4.21l0.74,-2.34l-0.29,-3.27l1.46,-3.34l2.04,-16.59l-0.66,-7.76l1.03,-0.53l0.54,-0.9l0.79,1.14l0.32,1.78l1.25,1.16l-0.69,2.55l1.33,2.9l0.97,3.59l0.46,0.29l1.5,-0.3l0.11,0.23l-0.76,2.44l-2.57,1.23l-0.23,0.37l0.08,4.33l-0.46,0.77l0.56,1.21l-1.58,1.51l-1.68,2.62l-0.89,2.47l0.2,2.7l-1.48,2.73l1.12,5.09l0.64,0.61l-0.01,2.29l-1.38,2.68l0.01,2.4l-1.89,2.04l0.02,2.75l0.69,2.57l-1.43,1.13l-1.26,5.68l0.39,3.51l-0.97,0.89l0.58,3.5l1.02,1.14l-0.65,1.02l0.15,0.57l1.0,0.53l0.16,0.69l-1.03,0.85l0.26,1.75l-0.89,4.03l-1.31,2.66l0.24,1.75l-0.71,1.83l-1.99,1.7l0.3,3.67l0.88,1.19l1.58,0.01l0.01,2.21l1.04,1.95l5.98,0.63ZM248.69,430.79l0.0,7.33l0.4,0.4l3.52,0.05l-0.44,0.75l-1.94,0.98l-2.49,-0.37l-1.88,-1.06l-2.55,-0.49l-5.59,-3.71l-2.38,-2.63l4.1,2.48l3.32,1.23l0.45,-0.12l1.29,-1.57l0.83,-2.32l2.05,-1.24l1.31,0.29Z',
      name: 'Chile',
    },
    CA: {
      path: 'M280.06,145.6l-1.67,2.88l0.07,0.49l0.5,0.04l1.46,-0.98l1.0,0.42l-0.56,0.72l0.17,0.62l2.22,0.89l1.35,-0.71l1.95,0.78l-0.66,2.01l0.5,0.51l1.32,-0.42l0.98,3.17l-0.91,2.41l-0.8,0.08l-1.23,-0.45l0.47,-2.25l-0.89,-0.83l-0.48,0.06l-2.78,2.63l-0.34,-0.02l1.02,-0.85l-0.14,-0.69l-2.4,-0.77l-7.4,0.08l-0.17,-0.41l1.3,-0.94l0.02,-0.64l-0.73,-0.58l1.85,-1.74l2.57,-5.16l1.47,-1.79l1.99,-1.05l0.46,0.06l-1.53,2.45ZM68.32,74.16l4.13,0.95l4.02,2.14l2.61,0.4l2.47,-1.89l2.88,-1.31l3.85,0.48l3.71,-1.94l3.82,-1.04l1.56,1.68l0.49,0.08l1.87,-1.04l0.65,-1.98l1.24,0.35l4.16,3.94l0.54,0.01l2.75,-2.49l0.26,2.59l0.49,0.35l3.08,-0.73l1.04,-1.27l2.73,0.23l3.83,1.86l5.86,1.61l3.47,0.75l2.44,-0.26l2.73,1.78l-2.98,1.81l-0.19,0.41l0.31,0.32l4.53,0.92l6.87,-0.5l2.0,-0.69l2.49,2.39l0.53,0.02l2.72,-2.16l-0.02,-0.64l-2.16,-1.54l1.15,-1.06l4.83,-0.61l1.84,0.95l2.48,2.31l3.01,-0.23l4.55,1.92l3.85,-0.67l3.61,0.1l0.41,-0.44l-0.25,-2.36l1.79,-0.61l3.49,1.32l-0.01,3.77l0.31,0.39l0.45,-0.22l1.48,-3.16l1.74,0.1l0.41,-0.3l1.13,-4.37l-2.78,-3.11l-2.8,-1.74l0.19,-4.64l2.71,-3.07l2.98,0.67l2.41,1.95l3.19,4.8l-1.99,1.97l0.21,0.68l4.33,0.84l-0.01,4.15l0.25,0.37l0.44,-0.09l3.07,-3.15l2.54,2.39l-0.61,3.33l2.42,2.88l0.61,0.0l2.61,-3.08l1.88,-3.82l0.17,-4.58l6.72,0.94l3.13,2.04l0.13,1.82l-1.76,2.19l-0.01,0.49l1.66,2.16l-0.26,1.71l-4.68,2.8l-3.28,0.61l-2.47,-1.2l-0.55,0.23l-0.73,2.04l-2.38,3.43l-0.74,1.77l-2.74,2.57l-3.44,0.25l-2.21,1.78l-0.28,2.53l-2.82,0.55l-3.12,3.22l-2.72,4.31l-1.03,3.17l-0.14,4.31l0.33,0.41l3.44,0.57l2.24,5.95l0.45,0.23l3.4,-0.69l4.52,1.51l2.43,1.31l1.91,1.73l3.1,0.96l2.62,1.46l6.6,0.54l-0.35,2.74l0.81,3.53l1.81,3.78l3.83,3.3l0.45,0.04l2.1,-1.28l1.37,-3.69l-1.31,-5.38l-1.45,-1.58l3.57,-1.47l2.84,-2.46l1.52,-2.8l-0.25,-2.55l-1.7,-3.07l-2.85,-2.61l2.8,-3.95l-1.08,-3.37l-0.79,-5.67l1.36,-0.7l6.76,1.41l2.12,-0.96l5.12,3.36l1.05,1.61l4.08,0.26l-0.06,2.87l0.83,4.7l0.3,0.32l2.16,0.54l1.73,2.06l0.5,0.09l3.63,-2.03l2.52,-4.19l1.26,-1.32l7.6,11.72l-0.92,2.04l0.16,0.51l3.3,1.97l2.22,1.98l4.1,0.98l1.43,0.99l0.95,2.79l2.1,0.68l0.84,1.08l0.17,3.45l-3.37,2.26l-4.22,1.24l-3.06,2.63l-4.06,0.51l-5.35,-0.69l-6.39,0.2l-2.3,2.41l-3.26,1.51l-6.47,7.15l-0.06,0.48l0.44,0.19l2.13,-0.52l4.17,-4.24l5.12,-2.62l3.52,-0.3l1.69,1.21l-2.12,2.21l0.81,3.47l1.02,2.61l3.47,1.6l4.14,-0.45l2.15,-2.8l0.26,1.48l1.14,0.8l-2.56,1.69l-5.5,1.82l-2.54,1.27l-2.74,2.15l-1.4,-0.16l-0.07,-2.01l4.14,-2.44l0.18,-0.45l-0.39,-0.29l-6.63,0.45l-1.39,-1.49l-0.14,-4.43l-1.11,-0.91l-1.82,0.39l-0.66,-0.66l-0.6,0.03l-1.91,2.39l-0.82,2.52l-0.8,1.27l-1.67,0.56l-0.46,0.76l-8.31,0.07l-1.21,0.62l-2.35,1.97l-0.71,-0.14l-1.37,0.96l-1.12,-0.48l-4.74,1.26l-0.9,1.17l0.21,0.62l1.73,0.3l-1.81,0.31l-1.85,0.81l-2.11,-0.13l-2.95,1.78l-0.69,-0.09l1.39,-2.1l1.73,-1.21l0.1,-2.29l1.16,-1.99l0.49,0.53l2.03,0.42l1.2,-1.16l0.02,-0.47l-2.66,-3.51l-2.28,-0.61l-5.64,-0.71l-0.4,-0.57l-0.79,0.13l0.2,-0.41l-0.22,-0.55l-0.68,-0.26l0.19,-1.26l-0.78,-0.73l0.31,-0.64l-0.29,-0.57l-2.6,-0.44l-0.75,-1.63l-0.94,-0.66l-4.31,-0.65l-1.13,1.19l-1.48,0.59l-0.85,1.06l-2.83,-0.76l-2.09,0.39l-2.39,-0.97l-4.24,-0.7l-0.57,-0.4l-0.41,-1.63l-0.4,-0.3l-0.85,0.02l-0.39,0.4l-0.01,0.85l-69.13,-0.01l-6.51,-4.52l-4.5,-1.38l-1.26,-2.66l0.33,-1.93l-0.23,-0.43l-3.01,-1.35l-0.55,-2.77l-2.89,-2.38l-0.04,-1.45l1.39,-1.83l-0.28,-2.55l-4.16,-2.2l-4.07,-6.6l-4.02,-3.22l-1.3,-1.88l-0.5,-0.13l-2.51,1.21l-2.23,1.87l-3.85,-3.88l-2.44,-1.04l-2.22,-0.13l0.03,-37.49ZM260.37,148.65l3.04,0.76l2.26,1.2l-3.78,-0.95l-1.53,-1.01ZM249.4,3.81l6.68,0.49l5.32,0.79l4.26,1.57l-0.07,1.1l-5.85,2.53l-6.02,1.21l-2.39,1.39l-0.18,0.45l0.39,0.29l4.01,-0.02l-4.65,2.82l-4.2,1.74l-4.19,4.59l-5.03,0.92l-1.67,1.15l-7.47,0.59l-0.37,0.37l0.32,0.42l2.41,0.49l-0.81,0.47l-0.12,0.59l1.83,2.41l-2.02,1.59l-3.81,1.51l-1.32,2.16l-3.38,1.53l-0.22,0.48l0.35,1.19l0.4,0.29l3.88,-0.18l0.03,0.61l-6.33,2.95l-6.41,-1.4l-7.43,0.79l-3.72,-0.62l-4.4,-0.25l-0.23,-1.83l4.29,-1.11l0.28,-0.51l-1.1,-3.45l1.0,-0.25l6.58,2.28l0.47,-0.16l-0.05,-0.49l-3.41,-3.45l-3.58,-0.98l1.48,-1.55l4.34,-1.29l0.97,-2.19l-0.16,-0.48l-3.42,-2.13l-0.81,-2.26l6.2,0.22l2.24,0.58l3.91,-2.1l0.2,-0.43l-0.35,-0.32l-5.64,-0.67l-8.73,0.36l-4.26,-1.9l-2.12,-2.4l-2.78,-1.66l-0.41,-1.52l3.31,-1.03l2.93,-0.2l4.91,-0.99l3.7,-2.27l2.87,0.3l2.62,1.67l0.56,-0.14l1.82,-3.2l3.13,-0.94l4.44,-0.69l7.53,-0.26l1.48,0.67l7.19,-1.06l10.8,0.79ZM203.85,57.54l0.01,0.42l1.97,2.97l0.68,-0.02l2.24,-3.72l5.95,-1.86l4.01,4.64l-0.35,2.91l0.5,0.43l4.95,-1.36l2.32,-1.8l5.31,2.28l3.27,2.11l0.3,1.84l0.48,0.33l4.42,-0.99l2.64,2.87l5.97,1.77l2.06,1.72l2.11,3.71l-4.19,1.86l-0.01,0.73l5.9,2.83l3.94,0.94l3.78,3.95l3.46,0.25l-0.63,2.37l-4.11,4.47l-2.76,-1.56l-3.9,-3.94l-3.59,0.41l-0.33,0.34l-0.19,2.72l2.63,2.38l3.42,1.89l0.94,0.97l1.55,3.75l-0.7,2.29l-2.74,-0.92l-6.25,-3.15l-0.51,0.13l0.05,0.52l6.07,5.69l0.18,0.59l-6.09,-1.39l-5.31,-2.24l-2.63,-1.66l0.6,-0.77l-0.12,-0.6l-7.39,-4.01l-0.59,0.37l0.03,0.79l-6.73,0.6l-1.69,-1.1l1.36,-2.46l4.51,-0.07l5.15,-0.52l0.31,-0.6l-0.74,-1.3l0.78,-1.84l3.21,-4.05l-0.67,-2.35l-1.11,-1.6l-3.84,-2.1l-4.35,-1.28l0.91,-0.63l0.06,-0.61l-2.65,-2.75l-2.34,-0.36l-1.89,-1.46l-0.53,0.03l-1.24,1.23l-4.36,0.55l-9.04,-0.99l-9.26,-1.98l-1.6,-1.22l2.22,-1.77l0.13,-0.44l-0.38,-0.27l-3.22,-0.02l-0.72,-4.25l1.83,-4.04l2.42,-1.85l5.5,-1.1l-1.39,2.35ZM261.19,159.33l2.07,0.61l1.44,-0.04l-1.15,0.63l-2.94,-1.23l-0.4,-0.68l0.36,-0.37l0.61,1.07ZM230.83,84.39l-2.37,0.18l-0.49,-1.63l0.93,-2.09l1.94,-0.51l1.62,0.99l0.02,1.52l-1.66,1.54ZM229.43,58.25l0.11,0.65l-4.87,-0.21l-2.72,0.62l-3.1,-2.57l0.08,-1.26l0.86,-0.23l5.57,0.51l4.08,2.5ZM222.0,105.02l-0.72,1.49l-0.63,-0.19l-0.48,-0.84l0.81,-0.99l0.65,0.05l0.37,0.46ZM183.74,38.32l2.9,1.7l4.79,-0.01l1.84,1.46l-0.49,1.68l0.23,0.48l2.82,1.14l1.76,1.26l7.01,0.65l4.1,-1.1l5.03,-0.43l3.93,0.35l2.48,1.77l0.46,1.7l-1.3,1.1l-3.56,1.01l-3.23,-0.59l-7.17,0.76l-5.09,0.09l-3.99,-0.6l-6.42,-1.54l-0.79,-2.51l-0.3,-2.49l-2.64,-2.5l-5.32,-0.72l-2.52,-1.4l0.68,-1.57l4.78,0.31ZM207.38,91.35l0.4,1.56l0.56,0.26l1.06,-0.52l1.32,0.96l5.42,2.57l0.2,1.68l0.46,0.35l1.68,-0.28l1.15,0.85l-1.55,0.87l-3.61,-0.88l-1.32,-1.69l-0.57,-0.06l-2.45,2.1l-3.12,1.79l-0.7,-1.87l-0.42,-0.26l-2.16,0.24l1.39,-1.39l0.32,-3.14l0.76,-3.35l1.18,0.22ZM215.49,102.6l-2.67,1.95l-1.4,-0.07l-0.3,-0.58l1.53,-1.48l2.84,0.18ZM202.7,24.12l2.53,1.59l-2.87,1.4l-4.53,4.05l-4.25,0.38l-5.03,-0.68l-2.45,-2.04l0.03,-1.62l1.82,-1.37l0.14,-0.45l-0.38,-0.27l-4.45,0.04l-2.59,-1.76l-1.41,-2.29l1.57,-2.32l1.62,-1.66l2.44,-0.39l0.25,-0.65l-0.6,-0.74l4.86,-0.25l3.24,3.11l8.16,2.3l1.9,3.61ZM187.47,59.2l-2.76,3.49l-2.38,-0.15l-1.44,-3.84l0.04,-2.2l1.19,-1.88l2.3,-1.23l5.07,0.17l4.11,1.02l-3.24,3.72l-2.88,0.89ZM186.07,48.79l-1.08,1.53l-3.34,-0.34l-2.56,-1.1l1.03,-1.75l3.25,-1.23l1.95,1.58l0.75,1.3ZM185.71,35.32l-5.3,-0.2l-0.32,-0.71l4.31,0.07l1.3,0.84ZM180.68,32.48l-3.34,1.0l-1.79,-1.1l-0.98,-1.87l-0.15,-1.73l4.1,0.53l2.67,1.7l-0.51,1.47ZM180.9,76.31l-1.1,1.08l-3.13,-1.23l-2.12,0.43l-2.71,-1.57l1.72,-1.09l1.55,-1.72l3.81,1.9l1.98,2.2ZM169.74,54.87l2.96,0.97l4.17,-0.57l0.41,0.88l-2.14,2.11l0.09,0.64l3.55,1.92l-0.4,3.72l-3.79,1.65l-2.17,-0.35l-1.72,-1.74l-6.02,-3.5l0.03,-0.85l4.68,0.54l0.4,-0.21l-0.05,-0.45l-2.48,-2.81l2.46,-1.95ZM174.45,40.74l1.37,1.73l0.07,2.44l-1.05,3.45l-3.79,0.47l-2.32,-0.69l0.05,-2.64l-0.44,-0.41l-3.68,0.35l-0.12,-3.1l2.45,0.1l3.67,-1.73l3.41,0.29l0.37,-0.26ZM170.05,31.55l0.67,1.56l-3.33,-0.49l-4.22,-1.77l-4.35,-0.16l1.4,-0.94l-0.06,-0.7l-2.81,-1.23l-0.12,-1.39l4.39,0.68l6.62,1.98l1.81,2.47ZM134.5,58.13l-1.02,1.82l0.45,0.58l5.4,-1.39l3.33,2.29l0.49,-0.03l2.6,-2.23l1.94,1.32l2.0,4.5l0.7,0.06l1.3,-2.29l-1.63,-4.46l1.69,-0.54l2.31,0.71l2.65,1.81l2.49,7.92l8.48,4.27l-0.19,1.35l-3.79,0.33l-0.26,0.67l1.4,1.49l-0.58,1.1l-4.23,-0.64l-4.43,-1.19l-3.0,0.28l-4.66,1.47l-10.52,1.04l-1.43,-2.02l-3.42,-1.2l-2.21,0.43l-2.51,-2.86l4.84,-1.05l3.6,0.19l3.27,-0.78l0.31,-0.39l-0.31,-0.39l-4.84,-1.06l-8.79,0.27l-0.85,-1.07l5.26,-1.66l0.27,-0.45l-0.4,-0.34l-3.8,0.06l-3.81,-1.06l1.81,-3.01l1.66,-1.79l6.48,-2.81l1.97,0.71ZM158.7,56.61l-1.7,2.44l-3.2,-2.75l0.37,-0.3l3.11,-0.18l1.42,0.79ZM149.61,42.73l1.01,1.89l0.5,0.18l2.14,-0.82l2.23,0.19l0.36,2.04l-1.33,2.09l-8.28,0.76l-6.35,2.15l-3.41,0.1l-0.19,-0.96l4.9,-2.08l0.23,-0.46l-0.41,-0.31l-11.25,0.59l-2.89,-0.74l3.04,-4.44l2.14,-1.32l6.81,1.69l4.58,3.06l4.37,0.39l0.36,-0.63l-3.36,-4.6l1.85,-1.53l2.18,0.51l0.77,2.26ZM144.76,34.41l-4.36,1.44l-3.0,-1.4l1.46,-1.24l3.47,-0.52l2.96,0.71l-0.52,1.01ZM145.13,29.83l-1.9,0.66l-3.67,-0.0l2.27,-1.61l3.3,0.95ZM118.92,65.79l-6.03,2.02l-1.33,-1.9l-5.38,-2.28l2.59,-5.05l2.16,-3.14l-0.02,-0.48l-1.97,-2.41l7.64,-0.7l3.6,1.02l6.3,0.27l4.42,2.95l-2.53,0.98l-6.24,3.43l-3.1,3.28l-0.11,2.01ZM129.54,35.53l-0.28,3.37l-1.72,1.62l-2.33,0.28l-4.61,2.19l-3.86,0.76l-2.64,-0.87l3.72,-3.4l5.01,-3.34l3.72,0.07l3.0,-0.67ZM111.09,152.69l-0.67,0.24l-3.85,-1.37l-0.83,-1.17l-2.12,-1.07l-0.66,-1.02l-2.4,-0.55l-0.74,-1.71l6.02,1.45l2.0,2.55l2.52,1.39l0.73,1.27ZM87.8,134.64l0.89,0.29l1.86,-0.21l-0.65,3.34l1.69,2.33l-1.31,-1.33l-0.99,-1.62l-1.17,-0.98l-0.33,-1.82Z',
      name: 'Canada',
    },
    CG: {
      path: 'M466.72,276.48l-0.1,1.03l-1.25,2.97l-0.19,3.62l-0.46,1.78l-0.23,0.63l-1.61,1.19l-1.21,1.39l-1.09,2.43l0.04,2.09l-3.25,3.24l-0.5,-0.24l-0.5,-0.83l-1.36,-0.02l-0.98,0.89l-1.68,-0.99l-1.54,1.24l-1.52,-1.96l1.57,-1.14l0.11,-0.52l-0.77,-1.35l2.1,-0.66l0.39,-0.73l1.05,0.82l2.21,0.11l1.12,-1.37l0.37,-1.81l-0.27,-2.09l-1.13,-1.5l1.0,-2.69l-0.13,-0.45l-0.92,-0.58l-1.6,0.17l-0.51,-0.94l0.1,-0.61l2.75,0.09l3.97,1.24l0.51,-0.33l0.17,-1.28l1.24,-2.21l1.28,-1.14l2.76,0.49Z',
      name: 'Congo',
    },
    CF: {
      path: 'M461.16,278.2l-0.26,-1.19l-1.09,-0.77l-0.84,-1.17l-0.29,-1.0l-1.04,-1.15l0.08,-3.43l0.58,-0.49l1.16,-2.35l1.85,-0.17l0.61,-0.62l0.97,0.58l3.15,-0.96l2.48,-1.92l0.02,-0.96l2.81,0.02l2.36,-1.17l1.93,-2.85l1.16,-0.93l1.11,-0.3l0.27,0.86l1.34,1.47l-0.39,2.01l0.3,1.01l4.01,2.75l0.17,0.93l2.63,2.31l0.6,1.44l2.08,1.4l-3.84,-0.21l-1.94,0.88l-1.23,-0.49l-2.67,1.2l-1.29,-0.18l-0.51,0.36l-0.6,1.22l-3.35,-0.65l-1.57,-0.91l-2.42,-0.83l-1.45,0.91l-0.97,1.27l-0.26,1.56l-3.22,-0.43l-1.49,1.33l-0.94,1.62Z',
      name: 'Central African Rep.',
    },
    CD: {
      path: 'M487.01,272.38l2.34,-0.14l1.35,1.84l1.34,0.45l0.86,-0.39l1.21,0.12l1.07,-0.41l0.54,0.89l2.04,1.54l-0.14,2.72l0.7,0.54l-1.38,1.13l-1.53,2.54l-0.17,2.05l-0.59,1.08l-0.02,1.72l-0.72,0.84l-0.66,3.01l0.63,1.32l-0.44,4.26l0.64,1.47l-0.37,1.22l0.86,1.8l1.53,1.41l0.3,1.26l0.44,0.5l-4.08,0.75l-0.92,1.81l0.51,1.34l-0.74,5.43l0.17,0.38l2.45,1.46l0.54,-0.1l0.12,1.62l-1.28,-0.01l-1.85,-2.35l-1.94,-0.45l-0.48,-1.13l-0.55,-0.2l-1.41,0.74l-1.71,-0.3l-1.01,-1.18l-2.49,-0.19l-0.44,-0.77l-1.98,-0.21l-2.88,0.36l0.11,-2.41l-0.85,-1.13l-0.16,-1.36l0.32,-1.73l-0.46,-0.89l-0.04,-1.49l-0.4,-0.39l-2.53,0.02l0.1,-0.41l-0.39,-0.49l-1.28,0.01l-0.43,0.45l-1.62,0.32l-0.83,1.79l-1.09,-0.28l-2.4,0.52l-1.37,-1.91l-1.3,-3.3l-0.38,-0.27l-7.39,-0.03l-2.46,0.42l0.5,-0.45l0.37,-1.47l0.66,-0.38l0.92,0.08l0.73,-0.82l0.87,0.02l0.31,0.68l1.4,0.36l3.59,-3.63l0.01,-2.23l1.02,-2.29l2.69,-2.39l0.43,-0.99l0.49,-1.96l0.17,-3.51l1.25,-2.95l0.36,-3.14l0.86,-1.13l1.1,-0.66l3.57,1.73l3.65,0.73l0.46,-0.21l0.8,-1.46l1.24,0.19l2.61,-1.17l0.81,0.44l1.04,-0.03l0.59,-0.66l0.7,-0.16l1.81,0.25Z',
      name: 'Dem. Rep. Congo',
    },
    CZ: {
      path: 'M458.46,144.88l1.22,1.01l1.47,0.23l0.13,0.93l1.36,0.68l0.54,-0.2l0.24,-0.55l1.15,0.25l0.53,1.09l1.68,0.18l0.6,0.84l-1.04,0.73l-0.96,1.28l-1.6,0.17l-0.55,0.56l-1.04,-0.46l-1.05,0.15l-2.12,-0.96l-1.05,0.34l-1.2,1.12l-1.56,-0.87l-2.57,-2.1l-0.53,-1.88l4.7,-2.52l0.71,0.26l0.9,-0.28Z',
      name: 'Czech Rep.',
    },
    CY: {
      path: 'M504.36,193.47l0.43,0.28l-1.28,0.57l-0.92,-0.28l-0.24,-0.46l2.01,-0.13Z',
      name: 'Cyprus',
    },
    CR: {
      path: 'M211.34,258.05l0.48,0.99l1.6,1.6l-0.54,0.45l0.29,1.42l-0.25,1.19l-1.09,-0.59l-0.05,-1.25l-2.46,-1.42l-0.28,-0.77l-0.66,-0.45l-0.45,-0.0l-0.11,1.04l-1.32,-0.95l0.31,-1.3l-0.36,-0.6l0.31,-0.27l1.42,0.58l1.29,-0.14l0.56,0.56l0.74,0.17l0.55,-0.27Z',
      name: 'Costa Rica',
    },
    CU: {
      path: 'M221.21,227.25l1.27,1.02l2.19,-0.28l4.43,3.33l2.08,0.43l-0.1,0.38l0.36,0.5l1.75,0.1l1.48,0.84l-3.11,0.51l-4.15,-0.03l0.77,-0.67l-0.04,-0.64l-1.2,-0.74l-1.49,-0.16l-0.7,-0.61l-0.56,-1.4l-0.4,-0.25l-1.34,0.1l-2.2,-0.66l-0.88,-0.58l-3.18,-0.4l-0.27,-0.16l0.58,-0.74l-0.36,-0.29l-2.72,-0.05l-1.7,1.29l-0.91,0.03l-0.61,0.69l-1.01,0.22l1.11,-1.29l1.01,-0.52l3.69,-1.01l3.98,0.21l2.21,0.84Z',
      name: 'Cuba',
    },
    SZ: {
      path: 'M500.35,351.36l0.5,2.04l-0.38,0.89l-1.05,0.21l-1.23,-1.2l-0.02,-0.64l0.83,-1.57l1.34,0.27Z',
      name: 'Swaziland',
    },
    SY: {
      path: 'M511.0,199.79l0.05,-1.33l0.54,-1.36l1.28,-0.99l0.13,-0.45l-0.41,-1.11l-1.14,-0.36l-0.19,-1.74l0.52,-1.0l1.29,-1.21l0.2,-1.18l0.59,0.23l2.62,-0.76l1.36,0.52l2.06,-0.01l2.95,-1.08l3.25,-0.26l-0.67,0.94l-1.28,0.66l-0.21,0.4l0.23,2.01l-0.88,3.19l-10.15,5.73l-2.15,-0.85Z',
      name: 'Syria',
    },
    KG: {
      path: 'M621.35,172.32l-3.87,1.69l-0.96,1.18l-3.04,0.34l-1.13,1.86l-2.36,-0.35l-1.99,0.63l-2.39,1.4l0.06,0.95l-0.4,0.37l-4.52,0.43l-3.02,-0.93l-2.37,0.17l0.11,-0.79l2.32,0.42l1.13,-0.88l1.99,0.2l3.21,-2.14l-0.03,-0.69l-2.97,-1.57l-1.94,0.65l-1.22,-0.74l1.71,-1.58l-0.12,-0.67l-0.36,-0.15l0.32,-0.77l1.36,-0.35l4.02,1.02l0.49,-0.3l0.35,-1.59l1.09,-0.48l3.42,1.22l1.11,-0.31l7.64,0.39l1.16,1.0l1.23,0.39Z',
      name: 'Kyrgyzstan',
    },
    KE: {
      path: 'M506.26,284.69l1.87,-2.56l0.93,-2.15l-1.38,-4.08l-1.06,-1.6l2.82,-2.75l0.79,0.26l0.12,1.41l0.86,0.83l1.9,0.11l3.28,2.13l3.57,0.44l1.05,-1.12l1.96,-0.9l0.82,0.68l1.16,0.09l-1.78,2.45l0.03,9.12l1.3,1.94l-1.37,0.78l-0.67,1.03l-1.08,0.46l-0.34,1.67l-0.81,1.07l-0.45,1.55l-0.68,0.56l-3.2,-2.23l-0.35,-1.58l-8.86,-4.98l0.14,-1.6l-0.57,-1.04Z',
      name: 'Kenya',
    },
    SS: {
      path: 'M481.71,263.34l1.07,-0.72l1.2,-3.18l1.36,-0.26l1.61,1.99l0.87,0.34l1.1,-0.41l1.5,0.07l0.57,0.53l2.49,0.0l0.44,-0.63l1.07,-0.4l0.45,-0.84l0.59,-0.33l1.9,1.33l1.6,-0.2l2.83,-3.33l-0.32,-2.21l1.59,-0.52l-0.24,1.6l0.3,1.83l1.35,1.18l0.2,1.87l0.35,0.41l0.02,1.53l-0.23,0.47l-1.42,0.25l-0.85,1.44l0.3,0.6l1.4,0.16l1.11,1.08l0.59,1.13l1.03,0.53l1.28,2.36l-4.41,3.98l-1.74,0.01l-1.89,0.55l-1.47,-0.52l-1.15,0.57l-2.96,-2.62l-1.3,0.49l-1.06,-0.15l-0.79,0.39l-0.82,-0.22l-1.8,-2.7l-1.91,-1.1l-0.66,-1.5l-2.62,-2.32l-0.18,-0.94l-2.37,-1.6Z',
      name: 'S. Sudan',
    },
    SR: {
      path: 'M283.12,270.19l2.1,0.53l-1.08,1.95l0.2,1.72l0.93,1.49l-0.59,2.03l-0.43,0.71l-1.12,-0.42l-1.32,0.22l-0.93,-0.2l-0.46,0.26l-0.25,0.73l0.33,0.7l-0.89,-0.13l-1.39,-1.97l-0.31,-1.34l-0.97,-0.31l-0.89,-1.47l0.35,-1.61l1.45,-0.82l0.33,-1.87l2.61,0.44l0.57,-0.47l1.75,-0.16Z',
      name: 'Suriname',
    },
    KH: {
      path: 'M689.52,249.39l0.49,1.45l-0.28,2.74l-4.0,1.86l-0.16,0.6l0.68,0.95l-2.06,0.17l-2.05,0.97l-1.82,-0.32l-2.12,-3.7l-0.55,-2.85l1.4,-1.85l3.02,-0.45l2.23,0.35l2.01,0.98l0.51,-0.14l0.95,-1.48l1.74,0.74Z',
      name: 'Cambodia',
    },
    SV: {
      path: 'M195.8,250.13l1.4,-1.19l2.24,1.45l0.98,-0.27l0.44,0.2l-0.27,1.05l-1.14,-0.03l-3.64,-1.21Z',
      name: 'El Salvador',
    },
    SK: {
      path: 'M476.82,151.17l-1.14,1.9l-2.73,-0.92l-0.82,0.2l-0.74,0.8l-3.46,0.73l-0.47,0.69l-1.76,0.33l-1.88,-1.0l-0.18,-0.81l0.38,-0.75l1.87,-0.32l1.74,-1.89l0.83,0.16l0.79,-0.34l1.51,1.04l1.34,-0.63l1.25,0.3l1.65,-0.42l1.81,0.95Z',
      name: 'Slovakia',
    },
    KR: {
      path: 'M737.51,185.84l0.98,-0.1l0.87,-1.17l2.69,-0.32l0.33,-0.29l1.76,2.79l0.58,1.76l0.02,3.12l-0.8,1.32l-2.21,0.55l-1.93,1.13l-1.8,0.19l-0.2,-1.1l0.43,-2.28l-0.95,-2.56l1.43,-0.37l0.23,-0.62l-1.43,-2.06Z',
      name: 'Korea',
    },
    SI: {
      path: 'M456.18,162.07l-0.51,-1.32l0.18,-1.05l1.69,0.2l1.42,-0.71l2.09,-0.07l0.62,-0.51l0.21,0.47l-1.61,0.67l-0.44,1.34l-0.66,0.24l-0.26,0.82l-1.22,-0.49l-0.84,0.46l-0.69,-0.04Z',
      name: 'Slovenia',
    },
    KP: {
      path: 'M736.77,185.16l-0.92,-0.42l-0.88,0.62l-1.21,-0.88l0.96,-1.15l0.59,-2.59l-0.46,-0.74l-2.09,-0.77l1.64,-1.52l2.72,-1.58l1.58,-1.91l1.11,0.78l2.17,0.11l0.41,-0.5l-0.3,-1.22l3.52,-1.18l0.94,-1.4l0.98,1.08l-2.19,2.18l0.01,2.14l-1.06,0.54l-1.41,1.4l-1.7,0.52l-1.25,1.09l-0.14,1.98l0.94,0.45l1.15,1.04l-0.13,0.26l-2.6,0.29l-1.13,1.29l-1.22,0.08Z',
      name: 'Dem. Rep. Korea',
    },
    SO: {
      path: 'M525.13,288.48l-1.13,-1.57l-0.03,-8.86l2.66,-3.38l1.67,-0.13l2.13,-1.69l3.41,-0.23l7.08,-7.55l2.91,-3.69l0.08,-4.82l2.98,-0.67l1.24,-0.86l0.45,-0.0l-0.2,3.0l-1.21,3.62l-2.73,5.97l-2.13,3.65l-5.03,6.16l-8.56,6.4l-2.78,3.08l-0.8,1.56Z',
      name: 'Somalia',
    },
    SN: {
      path: 'M390.09,248.21l0.12,1.55l0.49,1.46l0.96,0.82l0.05,1.28l-1.26,-0.19l-0.75,0.33l-1.84,-0.61l-5.84,-0.13l-2.54,0.51l-0.22,-1.03l1.77,0.04l2.01,-0.91l1.03,0.48l1.09,0.04l1.29,-0.62l0.14,-0.58l-0.51,-0.74l-1.81,0.25l-1.13,-0.63l-0.79,0.04l-0.72,0.61l-2.31,0.06l-0.92,-1.77l-0.81,-0.64l0.64,-0.35l2.46,-3.74l1.04,0.19l1.38,-0.56l1.19,-0.02l2.72,1.37l3.03,3.48Z',
      name: 'Senegal',
    },
    SL: {
      path: 'M394.46,264.11l-1.73,1.98l-0.58,1.33l-2.07,-1.06l-1.22,-1.26l-0.65,-2.39l1.16,-0.96l0.67,-1.17l1.21,-0.52l1.66,0.0l1.03,1.64l0.52,2.41Z',
      name: 'Sierra Leone',
    },
    SB: {
      path: 'M826.69,311.6l-0.61,0.09l-0.2,-0.33l0.37,0.15l0.44,0.09ZM824.18,307.38l-0.26,-0.3l-0.31,-0.91l0.03,0.0l0.54,1.21ZM823.04,309.33l-1.66,-0.22l-0.2,-0.52l1.16,0.28l0.69,0.46ZM819.28,304.68l1.14,0.65l0.02,0.03l-0.81,-0.44l-0.35,-0.23Z',
      name: 'Solomon Is.',
    },
    SA: {
      path: 'M537.53,210.34l2.0,0.24l0.9,1.32l1.49,-0.06l0.87,2.08l1.29,0.76l0.51,0.99l1.56,1.03l-0.1,1.9l0.32,0.9l1.58,2.47l0.76,0.53l0.7,-0.04l1.68,4.23l7.53,1.33l0.51,-0.29l0.77,1.25l-1.55,4.87l-7.29,2.52l-7.3,1.03l-2.34,1.17l-1.88,2.74l-0.76,0.28l-0.82,-0.78l-0.91,0.12l-2.88,-0.51l-3.51,0.25l-0.86,-0.56l-0.57,0.15l-0.66,1.27l0.16,1.11l-0.43,0.32l-0.93,-1.4l-0.33,-1.16l-1.23,-0.88l-1.27,-2.06l-0.78,-2.22l-1.73,-1.79l-1.14,-0.48l-1.54,-2.31l-0.21,-3.41l-1.44,-2.93l-1.27,-1.16l-1.33,-0.57l-1.31,-3.37l-0.77,-0.67l-0.97,-1.97l-2.8,-4.03l-1.06,-0.17l0.37,-1.96l0.2,-0.72l2.74,0.3l1.08,-0.84l0.6,-0.94l1.74,-0.35l0.65,-1.03l0.71,-0.4l0.1,-0.62l-2.06,-2.28l4.39,-1.22l0.48,-0.37l2.77,0.69l3.66,1.9l7.03,5.5l4.87,0.3Z',
      name: 'Saudi Arabia',
    },
    SE: {
      path: 'M480.22,89.3l-4.03,1.17l-2.43,2.86l0.26,2.57l-8.77,6.64l-1.78,5.79l1.78,2.68l2.22,1.96l-2.07,3.77l-2.72,1.13l-0.95,6.04l-1.29,3.01l-2.74,-0.31l-0.4,0.22l-1.31,2.59l-2.34,0.13l-0.75,-3.09l-2.08,-4.03l-1.83,-4.96l1.0,-1.93l2.14,-2.7l0.83,-4.45l-1.6,-2.17l-0.15,-4.94l1.48,-3.39l2.58,-0.15l0.87,-1.59l-0.78,-1.57l3.76,-5.59l4.04,-7.48l2.17,0.01l0.39,-0.29l0.57,-2.07l4.37,0.64l0.46,-0.34l0.33,-2.56l1.1,-0.13l6.94,4.87l0.06,6.32l0.66,1.36Z',
      name: 'Sweden',
    },
    SD: {
      path: 'M505.98,259.4l-0.34,-0.77l-1.17,-0.9l-0.26,-1.61l0.29,-1.81l-0.34,-0.46l-1.16,-0.17l-0.54,0.59l-1.23,0.11l-0.28,0.65l0.53,0.65l0.17,1.22l-2.44,3.0l-0.96,0.19l-2.39,-1.4l-0.95,0.52l-0.38,0.78l-1.11,0.41l-0.29,0.5l-1.94,0.0l-0.54,-0.52l-1.81,-0.09l-0.95,0.4l-2.45,-2.35l-2.07,0.54l-0.73,1.26l-0.6,2.1l-1.25,0.58l-0.75,-0.62l0.27,-2.65l-1.48,-1.78l-0.22,-1.48l-0.92,-0.96l-0.02,-1.29l-0.57,-1.16l-0.68,-0.16l0.69,-1.29l-0.18,-1.14l0.65,-0.62l0.03,-0.55l-0.36,-0.41l1.55,-2.97l1.91,0.16l0.43,-0.4l-0.1,-10.94l2.49,-0.01l0.4,-0.4l-0.0,-4.82l29.02,0.0l0.64,2.04l-0.49,0.66l0.36,2.69l0.93,3.16l2.12,1.55l-0.89,1.04l-1.72,0.39l-0.98,0.9l-1.43,5.65l0.24,1.15l-0.38,2.06l-0.96,2.38l-1.53,1.31l-1.32,2.91l-1.22,0.86l-0.37,1.34Z',
      name: 'Sudan',
    },
    DO: {
      path: 'M241.8,239.2l0.05,-0.65l-0.46,-0.73l0.42,-0.44l0.19,-1.0l-0.09,-1.53l1.66,0.01l1.99,0.63l0.33,0.67l1.28,0.19l0.33,0.76l1.0,0.08l0.8,0.62l-0.45,0.51l-1.13,-0.47l-1.88,-0.01l-1.27,0.59l-0.75,-0.55l-1.01,0.54l-0.79,1.4l-0.23,-0.61Z',
      name: 'Dominican Rep.',
    },
    DJ: {
      path: 'M528.43,256.18l-0.45,0.66l-0.58,-0.25l-1.51,0.13l-0.18,-1.01l1.45,-1.95l0.83,0.17l0.77,-0.44l0.2,1.0l-1.2,0.51l-0.06,0.7l0.73,0.47Z',
      name: 'Djibouti',
    },
    DK: {
      path: 'M452.28,129.07l-1.19,2.24l-2.13,-1.6l-0.23,-0.95l2.98,-0.95l0.57,1.26ZM447.74,126.31l-0.26,0.57l-0.88,-0.07l-1.8,2.53l0.48,1.69l-1.09,0.36l-1.61,-0.39l-0.89,-1.69l-0.07,-3.43l0.96,-1.73l2.02,-0.2l1.09,-1.07l1.33,-0.67l-0.05,1.06l-0.73,1.41l0.3,1.0l1.2,0.64Z',
      name: 'Denmark',
    },
    DE: {
      path: 'M453.14,155.55l-0.55,-0.36l-1.2,-0.1l-1.87,0.57l-2.13,-0.13l-0.56,0.63l-0.86,-0.6l-0.96,0.09l-2.57,-0.93l-0.85,0.67l-1.47,-0.02l0.24,-1.75l1.23,-2.14l-0.28,-0.59l-3.52,-0.58l-0.92,-0.66l0.12,-1.2l-0.48,-0.88l0.27,-2.17l-0.37,-3.03l1.41,-0.22l0.63,-1.26l0.66,-3.19l-0.41,-1.18l0.26,-0.39l1.66,-0.15l0.33,0.54l0.62,0.07l1.7,-1.69l-0.54,-3.02l1.37,0.33l1.31,-0.37l0.31,1.18l2.25,0.71l-0.02,0.92l0.5,0.4l2.55,-0.65l1.34,-0.87l2.57,1.24l1.06,0.98l0.48,1.44l-0.57,0.74l-0.0,0.48l0.87,1.15l0.57,1.64l-0.14,1.29l0.82,1.7l-1.5,-0.07l-0.56,0.57l-4.47,2.15l-0.22,0.54l0.68,2.26l2.58,2.16l-0.66,1.11l-0.79,0.36l-0.23,0.43l0.32,1.87Z',
      name: 'Germany',
    },
    YE: {
      path: 'M528.27,246.72l0.26,-0.42l-0.22,-1.01l0.19,-1.5l0.92,-0.69l-0.07,-1.35l0.39,-0.75l1.01,0.47l3.34,-0.27l3.76,0.41l0.95,0.81l1.36,-0.58l1.74,-2.62l2.18,-1.09l6.86,-0.94l2.48,5.41l-1.64,0.76l-0.56,1.9l-6.23,2.16l-2.29,1.8l-1.93,0.05l-1.41,1.02l-4.24,0.74l-1.72,1.49l-3.28,0.19l-0.52,-1.18l0.02,-1.51l-1.34,-3.29Z',
      name: 'Yemen',
    },
    AT: {
      path: 'M462.89,152.8l0.04,2.25l-1.07,0.0l-0.33,0.63l0.36,0.51l-1.04,2.13l-2.02,0.07l-1.33,0.7l-5.29,-0.99l-0.47,-0.93l-0.44,-0.21l-2.47,0.55l-0.42,0.51l-3.18,-0.81l0.43,-0.91l1.12,0.78l0.6,-0.17l0.25,-0.58l1.93,0.12l1.86,-0.56l1.0,0.08l0.68,0.57l0.62,-0.15l0.26,-0.77l-0.3,-1.78l0.8,-0.44l0.68,-1.15l1.52,0.85l0.47,-0.06l1.34,-1.25l0.64,-0.17l1.81,0.92l1.28,-0.11l0.7,0.37Z',
      name: 'Austria',
    },
    DZ: {
      path: 'M441.46,188.44l-0.32,1.07l0.39,2.64l-0.54,2.16l-1.58,1.82l0.37,2.39l1.91,1.55l0.18,0.8l1.42,1.03l1.84,7.23l0.12,1.16l-0.57,5.0l0.2,1.51l-0.87,0.99l-0.02,0.51l1.41,1.86l0.14,1.2l0.89,1.48l0.5,0.16l0.98,-0.41l1.73,1.08l0.82,1.23l-8.22,4.81l-7.23,5.11l-3.43,1.13l-2.3,0.21l-0.28,-1.59l-2.56,-1.09l-0.67,-1.25l-26.12,-17.86l0.01,-3.47l3.77,-1.88l2.44,-0.41l2.12,-0.75l1.08,-1.42l2.81,-1.05l0.35,-2.08l1.33,-0.29l1.04,-0.94l3.47,-0.69l0.46,-1.08l-0.1,-0.45l-0.58,-0.52l-0.82,-2.81l-0.19,-1.83l-0.78,-1.49l2.03,-1.31l2.63,-0.48l1.7,-1.22l2.31,-0.84l8.24,-0.73l1.49,0.38l2.28,-1.1l2.46,-0.02l0.92,0.6l1.35,-0.05Z',
      name: 'Algeria',
    },
    US: {
      path: 'M892.72,99.2l1.31,0.53l1.41,-0.37l1.89,0.98l1.89,0.42l-1.32,0.58l-2.9,-1.53l-2.08,0.22l-0.26,-0.15l0.07,-0.67ZM183.22,150.47l0.37,1.47l1.12,0.85l4.23,0.7l2.39,0.98l2.17,-0.38l1.85,0.5l-1.55,0.65l-3.49,2.61l-0.16,0.77l0.5,0.39l2.33,-0.61l1.77,1.02l5.15,-2.4l-0.31,0.65l0.25,0.56l1.36,0.38l1.71,1.16l4.7,-0.88l0.67,0.85l1.31,0.21l0.58,0.58l-1.34,0.17l-2.18,-0.32l-3.6,0.89l-2.71,3.25l0.35,0.9l0.59,-0.0l0.55,-0.6l-1.36,4.65l0.29,3.09l0.67,1.58l0.61,0.45l1.77,-0.44l1.6,-1.96l0.14,-2.21l-0.82,-1.96l0.11,-1.13l1.19,-2.37l0.44,-0.33l0.48,0.75l0.4,-0.29l0.4,-1.37l0.6,-0.47l0.24,-0.8l1.69,0.49l1.65,1.08l-0.03,2.37l-1.27,1.13l-0.0,1.13l0.87,0.36l1.66,-1.29l0.5,0.17l0.5,2.6l-2.49,3.75l0.17,0.61l1.54,0.62l1.48,0.17l1.92,-0.44l4.72,-2.15l2.16,-1.8l-0.05,-1.24l0.75,-0.22l3.92,0.36l2.12,-1.05l0.21,-0.4l-0.28,-1.48l3.27,-2.4l8.32,-0.02l0.56,-0.82l1.9,-0.77l0.93,-1.51l0.74,-2.37l1.58,-1.98l0.92,0.62l1.47,-0.47l0.8,0.66l-0.0,4.09l1.96,2.6l-2.34,1.31l-5.37,2.09l-1.83,2.72l0.02,1.79l0.83,1.59l0.54,0.23l-6.19,0.94l-2.2,0.89l-0.23,0.48l0.45,0.29l2.99,-0.46l-2.19,0.56l-1.13,0.0l-0.15,-0.32l-0.48,0.08l-0.76,0.82l0.22,0.67l0.32,0.06l-0.41,1.62l-1.27,1.58l-1.48,-1.07l-0.49,-0.04l-0.16,0.46l0.52,1.58l0.61,0.59l0.03,0.79l-0.95,1.38l-1.21,-1.22l-0.27,-2.27l-0.35,-0.35l-0.42,0.25l-0.48,1.27l0.33,1.41l-0.97,-0.27l-0.48,0.24l0.18,0.5l1.52,0.83l0.1,2.52l0.79,0.51l0.52,3.42l-1.42,1.88l-2.47,0.8l-1.71,1.66l-1.31,0.25l-1.27,1.03l-0.43,0.99l-2.69,1.78l-2.64,3.03l-0.45,2.12l0.45,2.08l0.85,2.38l1.09,1.9l0.04,1.2l1.16,3.06l-0.18,2.69l-0.55,1.43l-0.47,0.21l-0.89,-0.23l-0.49,-1.18l-0.87,-0.56l-2.75,-5.16l0.48,-1.68l-0.72,-1.78l-2.01,-2.38l-1.12,-0.53l-2.72,1.18l-1.47,-1.35l-1.57,-0.68l-2.99,0.31l-2.17,-0.3l-2.0,0.19l-1.15,0.46l-0.19,0.58l0.39,0.63l0.14,1.34l-0.84,-0.2l-0.84,0.46l-1.58,-0.07l-2.08,-1.44l-2.09,0.33l-1.91,-0.62l-3.73,0.84l-2.39,2.07l-2.54,1.22l-1.45,1.41l-0.61,1.38l0.34,3.71l-0.29,0.02l-3.5,-1.33l-1.25,-3.11l-1.44,-1.5l-2.24,-3.56l-1.76,-1.09l-2.27,-0.01l-1.71,2.07l-1.76,-0.69l-1.16,-0.74l-1.52,-2.98l-3.93,-3.16l-4.34,-0.0l-0.4,0.4l-0.0,0.74l-6.5,0.02l-9.02,-3.14l-0.34,-0.71l-5.7,0.49l-0.43,-1.29l-1.62,-1.61l-1.14,-0.38l-0.55,-0.88l-1.28,-0.13l-1.01,-0.77l-2.22,-0.27l-0.43,-0.3l-0.36,-1.58l-2.4,-2.83l-2.01,-3.85l-0.06,-0.9l-2.92,-3.26l-0.33,-2.29l-1.3,-1.66l0.52,-2.37l-0.09,-2.57l-0.78,-2.3l0.95,-2.82l0.61,-5.68l-0.47,-4.27l-1.46,-4.08l3.19,0.79l1.26,2.83l0.69,0.08l0.69,-1.14l-1.1,-4.79l68.76,-0.0l0.4,-0.4l0.14,-0.86ZM32.44,67.52l1.73,1.97l0.55,0.05l0.99,-0.79l3.65,0.24l-0.09,0.62l0.32,0.45l3.83,0.77l2.61,-0.43l5.19,1.4l4.84,0.43l1.89,0.57l3.42,-0.7l6.14,1.87l-0.03,38.06l0.38,0.4l2.39,0.11l2.31,0.98l3.9,3.99l0.55,0.04l2.4,-2.03l2.16,-1.04l1.2,1.71l3.95,3.14l4.09,6.63l4.2,2.29l0.06,1.83l-1.02,1.23l-1.16,-1.08l-2.04,-1.03l-0.67,-2.89l-3.28,-3.03l-1.65,-3.57l-6.35,-0.32l-2.82,-1.01l-5.26,-3.85l-6.77,-2.04l-3.53,0.3l-4.81,-1.69l-3.25,-1.63l-2.78,0.8l-0.28,0.46l0.44,2.21l-3.91,0.96l-2.26,1.27l-2.3,0.65l-0.27,-1.65l1.05,-3.42l2.49,-1.09l0.16,-0.6l-0.69,-0.96l-0.55,-0.1l-3.19,2.12l-1.78,2.56l-3.55,2.61l-0.04,0.61l1.56,1.52l-2.07,2.29l-5.11,2.57l-0.77,1.66l-3.76,1.77l-0.92,1.73l-2.69,1.38l-1.81,-0.22l-6.95,3.32l-3.97,0.91l4.85,-2.5l2.59,-1.86l3.26,-0.52l1.19,-1.4l3.42,-2.1l2.59,-2.27l0.42,-2.68l1.23,-2.1l-0.04,-0.46l-0.45,-0.11l-2.68,1.03l-0.63,-0.49l-0.53,0.03l-1.05,1.04l-1.36,-1.54l-0.66,0.08l-0.32,0.62l-0.58,-1.14l-0.56,-0.16l-2.41,1.42l-1.07,-0.0l-0.17,-1.75l0.3,-1.71l-1.61,-1.33l-3.41,0.59l-1.96,-1.63l-1.57,-0.84l-0.15,-2.21l-1.7,-1.43l0.82,-1.88l1.99,-2.12l0.88,-1.92l1.71,-0.24l2.04,0.51l1.87,-1.77l1.91,0.25l1.91,-1.23l0.17,-0.43l-0.47,-1.82l-1.07,-0.7l1.39,-1.17l0.12,-0.45l-0.39,-0.26l-1.65,0.07l-2.66,0.88l-0.75,0.78l-1.92,-0.8l-3.46,0.44l-3.44,-0.91l-1.06,-1.61l-2.65,-1.99l2.91,-1.43l5.5,-2.0l1.52,0.0l-0.26,1.62l0.41,0.46l5.29,-0.16l0.3,-0.65l-2.03,-2.59l-3.14,-1.68l-1.79,-2.12l-2.4,-1.83l-3.09,-1.24l1.04,-1.69l4.23,-0.14l3.36,-2.07l0.73,-2.27l2.39,-1.99l2.42,-0.52l4.65,-1.97l2.46,0.23l3.71,-2.35l3.5,0.89ZM37.6,123.41l-2.25,1.23l-0.95,-0.69l-0.29,-1.24l3.21,-1.63l1.42,0.21l0.67,0.7l-1.8,1.42ZM31.06,234.03l0.98,0.47l0.74,0.87l-1.77,1.07l-0.44,-1.53l0.49,-0.89ZM29.34,232.07l0.18,0.05l0.08,0.05l-0.16,0.03l-0.11,-0.14ZM25.16,230.17l0.05,-0.03l0.18,0.22l-0.13,-0.01l-0.1,-0.18ZM5.89,113.26l-1.08,0.41l-2.21,-1.12l1.53,-0.4l1.62,0.28l0.14,0.83Z',
      name: 'United States',
    },
    LV: {
      path: 'M489.16,122.85l0.96,0.66l0.22,1.65l0.68,1.76l-3.65,1.7l-2.23,-1.58l-1.29,-0.26l-0.68,-0.77l-2.42,0.34l-4.16,-0.23l-2.47,0.9l0.06,-1.98l1.13,-2.06l1.95,-1.02l2.12,2.58l2.01,-0.07l0.38,-0.33l0.44,-2.52l1.76,-0.53l3.06,1.7l2.15,0.07Z',
      name: 'Latvia',
    },
    UY: {
      path: 'M286.85,372.74l-0.92,1.5l-2.59,1.44l-1.69,-0.52l-1.42,0.26l-2.39,-1.19l-1.52,0.08l-1.27,-1.3l0.16,-1.5l0.56,-0.79l-0.02,-2.73l1.21,-4.74l1.19,-0.21l2.37,2.0l1.08,0.03l4.36,3.17l1.22,1.6l-0.96,1.5l0.61,1.4Z',
      name: 'Uruguay',
    },
    LB: {
      path: 'M510.37,198.01l-0.88,0.51l1.82,-3.54l0.62,0.08l0.22,0.61l-1.13,0.88l-0.65,1.47Z',
      name: 'Lebanon',
    },
    LA: {
      path: 'M689.54,248.53l-1.76,-0.74l-0.49,0.15l-0.94,1.46l-1.32,-0.64l0.62,-0.98l0.11,-2.17l-2.04,-2.42l-0.25,-2.65l-1.9,-2.1l-2.15,-0.31l-0.78,0.91l-1.12,0.06l-1.05,-0.4l-2.06,1.2l-0.04,-1.59l0.61,-2.68l-0.36,-0.49l-1.35,-0.1l-0.11,-1.23l-0.96,-0.88l1.96,-1.89l0.39,0.36l1.33,0.07l0.42,-0.45l-0.34,-2.66l0.7,-0.21l1.28,1.81l1.11,2.35l0.36,0.23l2.82,0.02l0.71,1.67l-1.39,0.65l-0.72,0.93l0.13,0.6l2.91,1.51l3.6,5.25l1.88,1.78l0.56,1.62l-0.35,1.96Z',
      name: 'Lao PDR',
    },
    TW: {
      path: 'M724.01,226.68l-0.74,1.48l-0.9,-1.52l-0.25,-1.74l1.38,-2.44l1.73,-1.74l0.64,0.44l-1.85,5.52Z',
      name: 'Taiwan',
    },
    TT: {
      path: 'M266.64,259.32l0.28,-1.16l1.13,-0.22l-0.06,1.2l-1.35,0.18Z',
      name: 'Trinidad and Tobago',
    },
    TR: {
      path: 'M513.21,175.47l3.64,1.17l3.05,-0.44l2.1,0.26l3.11,-1.56l2.46,-0.13l2.19,1.33l0.33,0.82l-0.22,1.33l0.25,0.44l2.28,1.13l-1.17,0.57l-0.21,0.45l0.75,3.2l-0.41,1.16l1.13,1.92l-0.55,0.22l-0.9,-0.67l-2.91,-0.37l-1.24,0.46l-4.23,0.41l-2.81,1.05l-1.91,0.01l-1.52,-0.53l-2.58,0.75l-0.66,-0.45l-0.62,0.3l-0.12,1.45l-0.89,0.84l-0.47,-0.67l0.79,-1.3l-0.41,-0.2l-1.43,0.23l-2.0,-0.63l-2.02,1.65l-3.51,0.3l-2.13,-1.53l-2.7,-0.1l-0.86,1.24l-1.38,0.27l-2.29,-1.44l-2.71,-0.01l-1.37,-2.65l-1.68,-1.52l1.07,-1.99l-0.09,-0.49l-1.27,-1.12l2.37,-2.41l3.7,-0.11l1.28,-2.24l4.49,0.37l3.21,-1.97l2.81,-0.82l3.99,-0.06l4.29,2.07ZM488.79,176.72l-1.72,1.31l-0.5,-0.88l1.37,-2.57l-0.7,-0.85l1.7,-0.63l1.8,0.34l0.46,1.17l1.76,0.78l-2.87,0.32l-1.3,1.01Z',
      name: 'Turkey',
    },
    LK: {
      path: 'M624.16,268.99l-1.82,0.48l-0.99,-1.67l-0.42,-3.46l0.95,-3.43l1.21,0.98l2.26,4.19l-0.34,2.33l-0.85,0.58Z',
      name: 'Sri Lanka',
    },
    TN: {
      path: 'M448.1,188.24l-1.0,1.27l-0.02,1.32l0.84,0.88l-0.28,2.09l-1.53,1.32l-0.12,0.42l0.48,1.54l1.42,0.32l0.53,1.11l0.9,0.52l-0.11,1.67l-3.54,2.64l-0.1,2.38l-0.58,0.3l-0.96,-4.45l-1.54,-1.25l-0.16,-0.78l-1.92,-1.56l-0.18,-1.76l1.51,-1.62l0.59,-2.34l-0.38,-2.78l0.42,-1.21l2.45,-1.05l1.29,0.26l-0.06,1.11l0.58,0.38l1.47,-0.73Z',
      name: 'Tunisia',
    },
    TL: {
      path: 'M734.55,307.93l-0.1,-0.97l4.5,-0.86l-2.82,1.28l-1.59,0.55Z',
      name: 'Timor-Leste',
    },
    TM: {
      path: 'M553.03,173.76l-0.04,0.34l-0.09,-0.22l0.13,-0.12ZM555.87,172.66l0.45,-0.1l1.48,0.74l2.06,2.43l4.07,-0.18l0.38,-0.51l-0.32,-1.19l1.92,-0.94l1.91,-1.59l2.94,1.39l0.43,2.47l1.19,0.67l2.58,-0.13l0.62,0.4l1.32,3.12l4.54,3.44l2.67,1.45l3.06,1.14l-0.04,1.05l-1.33,-0.75l-0.59,0.19l-0.32,0.84l-2.2,0.81l-0.46,2.13l-1.21,0.74l-1.91,0.42l-0.73,1.33l-1.56,0.31l-2.22,-0.94l-0.2,-2.17l-0.38,-0.36l-1.73,-0.09l-2.76,-2.46l-2.14,-0.4l-2.84,-1.48l-1.78,-0.27l-1.24,0.53l-1.57,-0.08l-2.0,1.69l-1.7,0.43l-0.36,-1.58l0.36,-2.98l-0.22,-0.4l-1.65,-0.84l0.54,-1.69l-0.34,-0.52l-1.22,-0.13l0.36,-1.64l2.22,0.59l2.2,-0.95l0.12,-0.65l-1.77,-1.74l-0.66,-1.57Z',
      name: 'Turkmenistan',
    },
    TJ: {
      path: 'M597.75,178.82l-2.54,-0.44l-0.47,0.34l-0.24,1.7l0.43,0.45l2.64,-0.22l3.18,0.95l4.39,-0.41l0.56,2.37l0.52,0.29l0.67,-0.24l1.11,0.49l0.21,2.13l-3.76,-0.21l-1.8,1.32l-1.76,0.74l-0.61,-0.58l0.21,-2.23l-0.64,-0.49l-0.07,-0.93l-1.36,-0.66l-0.45,0.07l-1.08,1.01l-0.55,1.48l-1.31,-0.05l-0.95,1.16l-0.9,-0.35l-1.86,0.74l1.26,-2.83l-0.54,-2.17l-1.67,-0.82l0.33,-0.66l2.18,-0.04l1.19,-1.63l0.76,-1.79l2.43,-0.5l-0.26,1.0l0.73,1.05Z',
      name: 'Tajikistan',
    },
    LS: {
      path: 'M491.06,363.48l-0.49,0.15l-1.49,-1.67l1.1,-1.43l2.19,-1.44l1.51,1.27l-0.98,1.82l-1.23,0.38l-0.62,0.93Z',
      name: 'Lesotho',
    },
    TH: {
      path: 'M670.27,255.86l-1.41,3.87l0.15,2.0l0.38,0.36l1.38,0.07l0.9,2.04l0.55,2.34l1.4,1.44l1.61,0.38l0.96,0.97l-0.5,0.64l-1.1,0.2l-0.34,-1.18l-2.04,-1.1l-0.63,0.23l-0.63,-0.62l-0.48,-1.3l-2.56,-2.63l-0.73,0.41l0.95,-3.89l2.16,-4.22ZM670.67,254.77l-0.92,-2.18l-0.26,-2.61l-2.14,-3.06l0.71,-0.49l0.89,-2.59l-3.61,-5.45l0.87,-0.51l1.05,-2.58l1.74,-0.18l2.6,-1.59l0.76,0.56l0.13,1.39l0.37,0.36l1.23,0.09l-0.51,2.28l0.05,2.42l0.6,0.34l2.43,-1.42l0.77,0.39l1.47,-0.07l0.71,-0.88l1.48,0.14l1.71,1.88l0.25,2.65l1.92,2.11l-0.1,1.89l-0.61,0.86l-2.22,-0.33l-3.5,0.64l-1.6,2.12l0.36,2.58l-1.51,-0.79l-1.84,-0.01l0.28,-1.52l-0.4,-0.47l-2.21,0.01l-0.4,0.37l-0.19,2.74l-0.34,0.93Z',
      name: 'Thailand',
    },
    TF: {
      path: 'M596.68,420.38l-3.2,0.18l-0.05,-1.26l0.39,-1.41l1.3,0.78l2.08,0.35l-0.52,1.36Z',
      name: 'Fr. S. Antarctic Lands',
    },
    TG: {
      path: 'M422.7,257.63l-0.09,1.23l1.53,1.52l0.08,1.09l0.5,0.65l-0.11,5.62l0.49,1.47l-1.31,0.35l-1.02,-2.13l-0.18,-1.12l0.53,-2.19l-0.63,-1.16l-0.22,-3.68l-1.01,-1.4l0.07,-0.28l1.37,0.03Z',
      name: 'Togo',
    },
    TD: {
      path: 'M480.25,235.49l0.12,9.57l-2.1,0.05l-1.14,1.89l-0.69,1.63l0.34,0.73l-0.66,0.91l0.24,0.89l-0.86,1.95l0.45,0.5l0.6,-0.1l0.34,0.64l0.03,1.38l0.9,1.04l-1.45,0.43l-1.27,1.03l-1.83,2.76l-2.16,1.07l-2.31,-0.15l-0.86,0.25l-0.26,0.49l0.17,0.61l-2.11,1.68l-2.85,0.87l-1.09,-0.57l-0.73,0.66l-1.12,0.1l-1.1,-3.12l-1.25,-0.64l-1.22,-1.22l0.29,-0.64l3.01,0.04l0.35,-0.6l-1.3,-2.2l-0.08,-3.31l-0.97,-1.66l0.22,-1.04l-0.38,-0.48l-1.22,-0.04l0.0,-1.25l-0.98,-1.07l0.96,-3.01l3.25,-2.65l0.13,-3.33l0.95,-5.18l0.52,-1.07l-0.1,-0.48l-0.91,-0.78l-0.2,-0.96l-0.8,-0.58l-0.55,-3.65l2.1,-1.2l19.57,9.83Z',
      name: 'Chad',
    },
    LY: {
      path: 'M483.48,203.15l-0.75,1.1l0.29,1.39l-0.6,1.83l0.73,2.14l0.0,24.12l-2.48,0.01l-0.41,0.85l-19.41,-9.76l-4.41,2.28l-1.37,-1.33l-3.82,-1.1l-1.14,-1.65l-1.98,-1.23l-1.22,0.32l-0.66,-1.11l-0.17,-1.26l-1.28,-1.69l0.87,-1.19l-0.07,-4.34l0.43,-2.27l-0.86,-3.45l1.13,-0.76l0.22,-1.16l-0.2,-1.03l3.48,-2.61l0.29,-1.94l2.45,0.8l1.18,-0.21l1.98,0.44l3.15,1.18l1.37,2.54l5.72,1.67l2.64,1.35l1.61,-0.72l1.29,-1.34l-0.44,-2.34l0.66,-1.13l1.67,-1.21l1.57,-0.35l3.14,0.53l1.08,1.28l3.99,0.78l0.36,0.54Z',
      name: 'Libya',
    },
    AE: {
      path: 'M550.76,223.97l1.88,-0.4l3.84,0.02l4.78,-4.75l0.19,0.36l0.26,1.58l-0.81,0.01l-0.39,0.35l-0.08,2.04l-0.81,0.63l-0.01,0.96l-0.66,0.99l-0.39,1.41l-7.08,-1.25l-0.7,-1.96Z',
      name: 'United Arab Emirates',
    },
    VE: {
      path: 'M240.68,256.69l0.53,0.75l-0.02,1.06l-1.07,1.78l0.95,2.0l0.42,0.22l1.4,-0.44l0.56,-1.83l-0.77,-1.17l-0.1,-1.47l2.82,-0.93l0.26,-0.49l-0.28,-0.96l0.3,-0.28l0.66,1.31l1.96,0.26l1.4,1.22l0.08,0.68l0.39,0.35l4.81,-0.22l1.49,1.11l1.92,0.31l1.67,-0.84l0.22,-0.6l3.44,-0.14l-0.17,0.55l0.86,1.19l2.19,0.35l1.67,1.1l0.37,1.86l0.41,0.32l1.55,0.17l-1.66,1.35l-0.22,0.92l0.65,0.97l-1.67,0.54l-0.3,0.4l0.04,0.99l-0.56,0.57l-0.01,0.55l1.85,2.27l-0.66,0.69l-4.47,1.29l-0.72,0.54l-3.69,-0.9l-0.71,0.27l-0.02,0.7l0.91,0.53l-0.08,1.54l0.35,1.58l0.35,0.31l1.66,0.17l-1.3,0.52l-0.48,1.13l-2.68,0.91l-0.6,0.77l-1.57,0.13l-1.17,-1.13l-0.8,-2.52l-1.25,-1.26l1.02,-1.23l-1.29,-2.95l0.18,-1.62l1.0,-2.21l-0.2,-0.49l-1.14,-0.46l-4.02,0.36l-1.82,-2.1l-1.57,-0.33l-2.99,0.22l-1.06,-0.97l0.25,-1.23l-0.2,-1.01l-0.59,-0.69l-0.29,-1.06l-1.08,-0.39l0.78,-2.79l1.9,-2.11Z',
      name: 'Venezuela',
    },
    AF: {
      path: 'M600.7,188.88l-1.57,1.3l-0.1,0.48l0.8,2.31l-1.09,1.04l-0.03,1.27l-0.48,0.71l-2.16,-0.08l-0.37,0.59l0.78,1.48l-1.38,0.69l-1.06,1.69l0.06,1.7l-0.65,0.52l-0.91,-0.21l-1.91,0.36l-0.48,0.77l-1.88,0.13l-1.4,1.56l-0.18,2.32l-2.91,1.02l-1.65,-0.23l-0.71,0.55l-1.41,-0.3l-2.41,0.39l-3.52,-1.17l1.96,-2.35l-0.21,-1.78l-0.3,-0.34l-1.63,-0.4l-0.19,-1.58l-0.75,-2.03l0.95,-1.36l-0.19,-0.6l-0.73,-0.28l1.47,-4.8l2.14,0.9l2.12,-0.36l0.74,-1.34l1.77,-0.39l1.54,-0.92l0.63,-2.31l1.87,-0.5l0.49,-0.81l0.94,0.56l2.13,0.11l2.55,0.92l1.95,-0.83l0.65,0.43l0.56,-0.13l0.69,-1.12l1.57,-0.08l0.72,-1.66l0.79,-0.74l0.8,0.39l-0.17,0.56l0.71,0.58l-0.08,2.39l1.11,0.95ZM601.37,188.71l1.73,-0.71l1.43,-1.18l4.03,0.35l-2.23,0.74l-4.95,0.8Z',
      name: 'Afghanistan',
    },
    IQ: {
      path: 'M530.82,187.47l0.79,0.66l1.26,-0.28l1.46,3.08l1.63,0.94l0.14,1.23l-1.22,1.05l-0.53,2.52l1.73,2.67l3.12,1.62l1.15,1.88l-0.38,1.85l0.39,0.48l0.41,-0.0l0.02,1.07l0.76,0.94l-2.47,-0.1l-1.71,2.44l-4.31,-0.2l-7.02,-5.48l-3.73,-1.94l-2.88,-0.73l-0.85,-2.87l5.45,-3.02l0.95,-3.43l-0.19,-1.96l1.27,-0.7l1.22,-1.7l0.87,-0.36l2.69,0.34Z',
      name: 'Iraq',
    },
    IS: {
      path: 'M384.14,88.06l-0.37,2.61l2.54,2.51l-2.9,2.75l-9.19,3.4l-9.25,-1.66l1.7,-1.22l-0.1,-0.7l-4.05,-1.47l2.96,-0.53l0.33,-0.43l-0.11,-1.2l-0.33,-0.36l-4.67,-0.85l1.28,-2.04l3.45,-0.56l3.77,2.72l0.44,0.02l3.64,-2.16l3.3,1.08l3.98,-2.16l3.58,0.26Z',
      name: 'Iceland',
    },
    IR: {
      path: 'M533.43,187.16l-1.27,-2.15l0.42,-0.98l-0.71,-3.04l1.03,-0.5l0.33,0.83l1.26,1.35l2.05,0.51l1.11,-0.16l2.89,-2.11l0.62,-0.14l0.39,0.46l-0.72,1.2l0.06,0.49l1.56,1.53l0.65,0.04l0.67,1.81l2.56,0.83l1.87,1.48l3.69,0.49l3.91,-0.76l0.47,-0.73l2.17,-0.6l1.66,-1.54l1.51,0.08l1.18,-0.53l1.59,0.24l2.83,1.48l1.88,0.3l2.77,2.47l1.77,0.18l0.18,1.99l-1.68,5.49l0.24,0.5l0.61,0.23l-0.82,1.48l0.8,2.18l0.19,1.71l0.3,0.34l1.63,0.4l0.15,1.32l-2.15,2.35l-0.01,0.53l2.21,3.03l2.34,1.24l0.06,2.14l1.24,0.72l0.11,0.69l-3.31,1.27l-1.08,3.03l-9.68,-1.68l-0.99,-3.05l-1.43,-0.73l-2.17,0.46l-2.47,1.26l-2.83,-0.82l-2.46,-2.02l-2.41,-0.8l-3.42,-6.06l-0.48,-0.2l-1.18,0.39l-1.44,-0.82l-0.5,0.08l-0.65,0.74l-0.97,-1.01l-0.02,-1.31l-0.71,-0.39l0.26,-1.81l-1.29,-2.11l-3.13,-1.63l-1.58,-2.43l0.5,-1.9l1.31,-1.26l-0.19,-1.66l-1.74,-1.1l-1.57,-3.3Z',
      name: 'Iran',
    },
    AM: {
      path: 'M536.99,182.33l-0.28,0.03l-1.23,-2.13l-0.93,0.01l-0.62,-0.66l-0.69,-0.07l-0.96,-0.81l-1.56,-0.62l0.19,-1.12l-0.26,-0.79l2.72,-0.36l1.09,1.01l-0.17,0.92l1.02,0.78l-0.47,0.62l0.08,0.56l2.04,1.23l0.04,1.4Z',
      name: 'Armenia',
    },
    IT: {
      path: 'M451.59,158.63l3.48,0.94l-0.21,1.17l0.3,0.83l-1.49,-0.24l-2.04,1.1l-0.21,0.39l0.13,1.45l-0.25,1.12l0.82,1.57l2.39,1.63l1.31,2.54l2.79,2.43l2.05,0.08l0.21,0.23l-0.39,0.33l0.09,0.67l4.05,1.97l2.17,1.76l-0.16,0.36l-1.17,-1.08l-2.18,-0.49l-0.44,0.2l-1.05,1.91l0.14,0.54l1.57,0.95l-0.19,0.98l-1.06,0.33l-1.25,2.34l-0.37,0.08l0.0,-0.33l1.0,-2.45l-1.73,-3.17l-1.12,-0.51l-0.88,-1.33l-1.51,-0.51l-1.27,-1.25l-1.75,-0.18l-4.12,-3.21l-1.62,-1.65l-1.03,-3.19l-3.53,-1.36l-1.3,0.51l-1.69,1.41l0.16,-0.72l-0.28,-0.47l-1.14,-0.33l-0.53,-1.96l0.72,-0.78l0.04,-0.48l-0.65,-1.17l0.8,0.39l1.4,-0.23l1.11,-0.84l0.52,0.35l1.19,-0.1l0.75,-1.2l1.53,0.33l1.36,-0.56l0.35,-1.14l1.08,0.32l0.68,-0.64l1.98,-0.44l0.42,0.82ZM459.19,184.75l-0.65,1.65l0.32,1.05l-0.31,0.89l-1.5,-0.85l-4.5,-1.67l0.19,-0.82l2.67,0.23l3.78,-0.48ZM443.93,176.05l1.18,1.66l-0.3,3.32l-1.06,-0.01l-0.77,0.73l-0.53,-0.44l-0.1,-3.37l-0.39,-1.22l1.04,0.01l0.92,-0.68Z',
      name: 'Italy',
    },
    VN: {
      path: 'M690.56,230.25l-2.7,1.82l-2.09,2.46l-0.63,1.95l4.31,6.45l2.32,1.65l1.43,1.94l1.11,4.59l-0.32,4.24l-1.93,1.54l-2.84,1.61l-2.11,2.15l-2.73,2.06l-0.59,-1.05l0.63,-1.53l-0.13,-0.47l-1.34,-1.04l1.51,-0.71l2.55,-0.18l0.3,-0.63l-0.82,-1.14l4.0,-2.07l0.31,-3.05l-0.57,-1.77l0.42,-2.66l-0.73,-1.97l-1.86,-1.76l-3.63,-5.29l-2.72,-1.46l0.36,-0.47l1.5,-0.64l0.21,-0.52l-0.97,-2.27l-0.37,-0.24l-2.83,-0.02l-2.24,-3.9l0.83,-0.4l4.39,-0.29l2.06,-1.31l1.15,0.89l1.88,0.4l-0.17,1.51l1.35,1.16l1.67,0.45Z',
      name: 'Vietnam',
    },
    AR: {
      path: 'M249.29,428.93l-2.33,-0.52l-5.83,-0.43l-0.89,-1.66l0.05,-2.37l-0.45,-0.4l-1.43,0.18l-0.67,-0.91l-0.2,-3.13l1.88,-1.47l0.79,-2.04l-0.25,-1.7l1.3,-2.68l0.91,-4.15l-0.22,-1.69l0.85,-0.45l0.2,-0.44l-0.27,-1.16l-0.98,-0.68l0.59,-0.92l-0.05,-0.5l-1.04,-1.07l-0.52,-3.1l0.97,-0.86l-0.42,-3.58l1.2,-5.43l1.38,-0.98l0.16,-0.43l-0.75,-2.79l-0.01,-2.43l1.78,-1.75l0.06,-2.57l1.43,-2.85l0.01,-2.58l-0.69,-0.74l-1.09,-4.52l1.47,-2.7l-0.18,-2.79l0.85,-2.35l1.59,-2.46l1.73,-1.64l0.05,-0.52l-0.6,-0.84l0.44,-0.85l-0.07,-4.19l2.7,-1.44l0.86,-2.75l-0.21,-0.71l1.76,-2.01l2.9,0.57l1.38,1.78l0.68,-0.08l0.87,-1.87l2.39,0.09l4.95,4.77l2.17,0.49l3.0,1.92l2.47,1.0l0.25,0.82l-2.37,3.93l0.23,0.59l5.39,1.16l2.12,-0.44l2.45,-2.16l0.5,-2.38l0.76,-0.31l0.98,1.2l-0.04,1.8l-3.67,2.51l-2.85,2.66l-3.43,3.88l-1.3,5.07l0.01,2.72l-0.54,0.73l-0.36,3.28l3.14,2.64l-0.16,2.11l1.4,1.11l-0.1,1.09l-2.29,3.52l-3.55,1.49l-4.92,0.6l-2.71,-0.29l-0.43,0.51l0.5,1.65l-0.49,2.1l0.38,1.42l-1.19,0.83l-2.36,0.38l-2.3,-1.04l-1.38,0.83l0.41,3.64l1.69,0.91l1.4,-0.71l0.36,0.76l-2.04,0.86l-2.01,1.89l-0.97,4.63l-2.34,0.1l-2.09,1.78l-0.61,2.75l2.46,2.31l2.17,0.63l-0.7,2.32l-2.83,1.73l-1.73,3.86l-2.17,1.22l-1.16,1.67l0.75,3.76l1.04,1.28ZM256.71,438.88l-2.0,0.15l-1.4,-1.22l-3.82,-0.1l-0.0,-5.83l1.6,3.05l3.26,2.07l3.08,0.78l-0.71,1.1Z',
      name: 'Argentina',
    },
    AU: {
      path: 'M705.8,353.26l0.26,0.04l0.17,-0.47l-0.48,-1.42l0.92,1.11l0.45,0.15l0.27,-0.39l-0.1,-1.56l-1.98,-3.63l1.09,-3.31l-0.24,-1.57l0.34,-0.62l0.38,1.06l0.43,-0.19l0.99,-1.7l1.91,-0.83l1.29,-1.15l1.81,-0.91l0.96,-0.17l0.92,0.26l1.92,-0.95l1.47,-0.28l1.03,-0.8l1.43,0.04l2.78,-0.84l1.36,-1.15l0.71,-1.45l1.41,-1.26l0.3,-2.58l1.27,-1.59l0.78,1.65l0.54,0.19l1.07,-0.51l0.15,-0.6l-0.73,-1.0l0.45,-0.71l0.78,0.39l0.58,-0.3l0.28,-1.82l1.87,-2.14l1.12,-0.39l0.28,-0.58l0.62,0.17l0.53,-0.73l1.87,-0.57l1.65,1.05l1.35,1.48l3.39,0.38l0.43,-0.54l-0.46,-1.23l1.05,-1.79l1.04,-0.61l0.14,-0.55l-0.25,-0.41l0.88,-1.17l1.31,-0.77l1.3,0.27l2.1,-0.48l0.31,-0.4l-0.05,-1.3l-0.92,-0.77l1.48,0.56l1.41,1.07l2.11,0.65l0.81,-0.2l1.4,0.7l1.69,-0.66l0.8,0.19l0.64,-0.33l0.71,0.77l-1.33,1.94l-0.71,0.07l-0.35,0.51l0.24,0.86l-1.52,2.35l0.12,1.05l2.15,1.65l1.97,0.85l3.04,2.36l1.97,0.65l0.55,0.88l2.72,0.85l1.84,-1.1l2.07,-5.97l-0.42,-3.59l0.3,-1.73l0.47,-0.87l-0.31,-0.68l1.09,-3.28l0.46,-0.47l0.4,0.71l0.16,1.51l0.65,0.52l0.16,1.04l0.85,1.21l0.12,2.38l0.9,2.0l0.57,0.18l1.3,-0.78l1.69,1.7l-0.2,1.08l0.53,2.2l0.39,1.3l0.68,0.48l0.6,1.95l-0.19,1.48l0.81,1.76l6.01,3.69l-0.11,0.76l1.38,1.58l0.95,2.77l0.58,0.22l0.72,-0.41l0.8,0.9l0.61,0.01l0.46,2.41l4.81,4.71l0.66,2.02l-0.07,3.31l1.14,2.2l-0.13,2.24l-1.1,3.68l0.03,1.64l-0.47,1.89l-1.05,2.4l-1.9,1.47l-1.72,3.51l-2.38,6.09l-0.24,2.82l-1.14,0.8l-2.85,0.15l-2.31,1.19l-2.51,2.25l-3.09,-1.57l0.3,-1.15l-0.54,-0.47l-1.5,0.63l-2.01,1.94l-7.12,-2.18l-1.48,-1.63l-1.14,-3.74l-1.45,-1.26l-1.81,-0.26l0.56,-1.18l-0.61,-2.1l-0.72,-0.1l-1.14,1.82l-0.9,0.21l0.63,-0.82l0.36,-1.55l0.92,-1.31l-0.13,-2.34l-0.7,-0.22l-2.0,2.34l-1.51,0.93l-0.94,2.01l-1.35,-0.81l-0.02,-1.52l-1.57,-2.04l-1.09,-0.88l0.24,-0.33l-0.14,-0.59l-3.21,-1.69l-1.83,-0.12l-2.54,-1.35l-4.58,0.28l-6.02,1.9l-2.53,-0.13l-2.62,1.41l-2.13,0.63l-1.49,2.6l-3.49,0.31l-2.29,-0.5l-3.48,0.43l-1.6,1.47l-0.81,-0.04l-2.37,1.63l-3.26,-0.1l-3.72,-2.21l0.04,-1.05l1.19,-0.46l0.49,-0.89l0.21,-2.97l-0.28,-1.64l-1.34,-2.86l-0.38,-1.47l0.05,-1.72l-0.95,-1.7l-0.18,-0.97l-1.01,-0.99l-0.29,-1.98l-1.13,-1.75ZM784.92,393.44l2.65,1.02l3.23,-0.96l1.09,0.14l0.15,3.06l-0.85,1.13l-0.17,1.63l-0.87,-0.24l-1.57,1.91l-1.68,-0.18l-1.4,-2.36l-0.37,-2.04l-1.39,-2.51l0.04,-0.8l1.15,0.18Z',
      name: 'Australia',
    },
    IL: {
      path: 'M507.76,203.05l0.4,-0.78l0.18,0.4l-0.33,1.03l0.52,0.44l0.68,-0.22l-0.86,3.6l-1.16,-3.32l0.59,-0.74l-0.03,-0.41ZM508.73,200.34l0.37,-1.02l0.64,0.0l0.52,-0.51l-0.49,1.53l-0.56,-0.24l-0.48,0.23Z',
      name: 'Israel',
    },
    IN: {
      path: 'M623.34,207.03l-1.24,1.04l-0.97,2.55l0.22,0.51l8.04,3.87l3.42,0.37l1.57,1.38l4.92,0.88l2.18,-0.04l0.38,-0.3l0.29,-1.24l-0.32,-1.64l0.14,-0.87l0.82,-0.31l0.45,2.48l2.28,1.02l1.77,-0.38l4.14,0.1l0.38,-0.36l0.18,-1.66l-0.5,-0.65l1.37,-0.29l2.25,-1.99l2.7,-1.62l1.93,0.62l1.8,-0.98l0.79,1.14l-0.68,0.91l0.26,0.63l2.42,0.36l0.09,0.47l-0.83,0.75l0.13,1.07l-1.52,-0.29l-3.24,1.86l-0.13,1.78l-1.32,2.14l-0.18,1.39l-0.93,1.82l-1.64,-0.5l-0.52,0.37l-0.09,2.63l-0.56,1.11l0.19,0.81l-0.53,0.27l-1.18,-3.73l-1.08,-0.27l-0.38,0.31l-0.24,1.0l-0.66,-0.66l0.54,-1.06l1.22,-0.34l1.15,-2.25l-0.24,-0.56l-1.57,-0.47l-4.34,-0.28l-0.18,-1.56l-0.35,-0.35l-1.11,-0.12l-1.91,-1.12l-0.56,0.17l-0.88,1.82l0.11,0.49l1.36,1.07l-1.09,0.69l-0.69,1.11l0.18,0.56l1.24,0.57l-0.32,1.54l0.85,1.94l0.36,2.01l-0.22,0.59l-4.58,0.52l-0.33,0.42l0.13,1.8l-1.17,1.36l-3.65,1.81l-2.79,3.03l-4.32,3.28l-0.18,1.27l-4.65,1.79l-0.77,2.16l0.64,5.3l-1.06,2.49l-0.01,3.94l-1.24,0.28l-1.14,1.93l0.39,0.84l-1.68,0.53l-1.04,1.83l-0.65,0.47l-2.06,-2.05l-2.1,-6.02l-2.2,-3.64l-1.05,-4.75l-2.29,-3.57l-1.76,-8.2l0.01,-3.11l-0.49,-2.53l-0.55,-0.29l-3.53,1.52l-1.53,-0.27l-2.86,-2.77l0.85,-0.67l0.08,-0.55l-0.74,-1.03l-2.67,-2.06l1.24,-1.32l5.34,0.01l0.39,-0.49l-0.5,-2.29l-1.42,-1.46l-0.27,-1.93l-1.43,-1.2l2.31,-2.37l3.05,0.06l2.62,-2.85l1.6,-2.81l2.4,-2.73l0.07,-2.04l1.97,-1.48l-0.02,-0.65l-1.93,-1.31l-0.82,-1.78l-0.8,-2.21l0.9,-0.89l3.59,0.65l2.92,-0.42l2.33,-2.19l2.31,2.85l-0.24,2.13l0.99,1.59l-0.05,0.82l-1.34,-0.28l-0.47,0.48l0.7,3.06l2.62,1.99l2.99,1.65Z',
      name: 'India',
    },
    TZ: {
      path: 'M495.56,296.42l2.8,-3.12l-0.02,-0.81l-0.64,-1.3l0.68,-0.52l0.14,-1.47l-0.76,-1.25l0.31,-0.11l2.26,0.03l-0.51,2.76l0.76,1.3l0.5,0.12l1.05,-0.53l1.19,-0.12l0.61,0.24l1.43,-0.62l0.1,-0.67l-0.71,-0.62l1.57,-1.7l8.65,4.86l0.32,1.53l3.34,2.33l-1.05,2.8l0.13,1.61l1.63,1.12l-0.6,1.76l-0.01,2.33l1.89,4.03l0.57,0.43l-1.46,1.08l-2.61,0.94l-1.43,-0.04l-1.06,0.77l-2.29,0.36l-2.87,-0.68l-0.83,0.07l-0.63,-0.75l-0.31,-2.78l-1.32,-1.35l-3.25,-0.77l-3.96,-1.58l-1.18,-2.41l-0.32,-1.75l-1.76,-1.49l0.42,-1.05l-0.44,-0.89l0.08,-0.96l-0.46,-0.58l0.06,-0.56Z',
      name: 'Tanzania',
    },
    AZ: {
      path: 'M539.29,175.73l1.33,0.32l1.94,-1.8l2.3,3.34l1.43,0.43l-1.26,0.15l-0.35,0.32l-0.8,3.14l-0.99,0.96l0.05,1.11l-1.26,-1.13l0.7,-1.18l-0.04,-0.47l-0.74,-0.86l-1.48,0.15l-2.34,1.71l-0.03,-1.27l-2.03,-1.35l0.47,-0.62l-0.08,-0.56l-1.03,-0.79l0.29,-0.43l-0.14,-0.58l-1.13,-0.86l1.89,0.68l1.69,0.06l0.37,-0.87l-0.81,-1.37l0.42,0.06l1.63,1.72ZM533.78,180.57l0.61,0.46l0.69,-0.0l0.59,1.15l-0.68,-0.15l-1.21,-1.45Z',
      name: 'Azerbaijan',
    },
    IE: {
      path: 'M405.08,135.42l0.35,2.06l-1.75,2.78l-4.22,1.88l-2.84,-0.4l1.73,-3.0l-1.18,-3.53l4.6,-3.74l0.32,1.15l-0.49,1.74l0.4,0.51l1.47,-0.04l1.6,0.6Z',
      name: 'Ireland',
    },
    ID: {
      path: 'M756.47,287.89l0.69,4.01l2.79,1.78l0.51,-0.1l2.04,-2.59l2.71,-1.43l2.05,-0.0l3.9,1.73l2.46,0.45l0.08,15.12l-1.75,-1.54l-2.54,-0.51l-0.88,0.71l-2.32,0.06l0.69,-1.33l1.45,-0.64l0.23,-0.46l-0.65,-2.74l-1.24,-2.21l-5.04,-2.29l-2.09,-0.23l-3.68,-2.27l-0.55,0.13l-0.65,1.07l-0.52,0.12l-0.55,-1.89l-1.21,-0.78l1.84,-0.62l1.72,0.05l0.39,-0.52l-0.21,-0.66l-0.38,-0.28l-3.45,-0.0l-1.13,-1.48l-2.1,-0.43l-0.52,-0.6l2.69,-0.48l1.28,-0.78l3.66,0.94l0.3,0.71ZM757.91,300.34l-0.62,0.82l-0.1,-0.8l0.59,-1.12l0.13,1.1ZM747.38,292.98l0.34,0.72l-1.22,-0.57l-4.68,-0.1l0.27,-0.62l2.78,-0.09l2.52,0.67ZM741.05,285.25l-0.67,-2.88l0.64,-2.01l0.41,0.86l1.21,0.18l0.16,0.7l-0.1,1.68l-0.84,-0.16l-0.46,0.3l-0.34,1.34ZM739.05,293.5l-0.5,0.44l-1.34,-0.36l-0.17,-0.37l1.73,-0.08l0.27,0.36ZM721.45,284.51l-0.19,1.97l2.24,2.23l0.54,0.02l1.27,-1.07l2.75,-0.5l-0.9,1.21l-2.11,0.93l-0.16,0.6l2.22,3.01l-0.3,1.07l1.36,1.74l-2.26,0.85l-0.28,-0.31l0.12,-1.19l-1.64,-1.34l0.17,-2.23l-0.56,-0.39l-1.67,0.76l-0.23,0.39l0.3,6.17l-1.1,0.25l-0.69,-0.47l0.64,-2.21l-0.39,-2.42l-0.39,-0.34l-0.8,-0.01l-0.58,-1.29l0.98,-1.6l0.35,-1.96l1.32,-3.87ZM728.59,296.27l0.38,0.49l-0.02,1.28l-0.88,0.49l-0.53,-0.47l1.04,-1.79ZM729.04,286.98l0.27,-0.05l-0.02,0.13l-0.24,-0.08ZM721.68,284.05l0.16,-0.32l1.89,-1.65l1.83,0.68l3.16,0.35l2.94,-0.1l2.39,-1.66l-1.73,2.13l-1.66,0.43l-2.41,-0.48l-4.17,0.13l-2.39,0.51ZM730.55,310.47l1.11,-1.93l2.03,-0.82l0.08,0.62l-1.45,1.67l-1.77,0.46ZM728.12,305.88l-0.1,0.38l-3.46,0.66l-2.91,-0.27l-0.0,-0.25l1.54,-0.41l1.66,0.73l1.67,-0.19l1.61,-0.65ZM722.9,310.24l-0.64,0.03l-2.26,-1.2l1.11,-0.24l1.78,1.41ZM716.26,305.77l0.88,0.51l1.28,-0.17l0.2,0.35l-4.65,0.73l0.39,-0.67l1.15,-0.02l0.75,-0.73ZM711.66,293.84l-0.38,-0.16l-2.54,1.01l-1.12,-1.44l-1.69,-0.13l-1.16,-0.75l-3.04,0.77l-1.1,-1.15l-3.31,-0.11l-0.35,-3.05l-1.35,-0.95l-1.11,-1.98l-0.33,-2.06l0.27,-2.14l0.9,-1.01l0.37,1.15l2.09,1.49l1.53,-0.48l1.82,0.08l1.38,-1.19l1.0,-0.18l2.28,0.67l2.26,-0.53l1.52,-3.64l1.01,-0.99l0.78,-2.57l4.1,0.3l-1.11,1.77l0.02,0.46l1.7,2.2l-0.23,1.39l2.07,1.71l-2.33,0.42l-0.88,1.9l0.1,2.05l-2.4,1.9l-0.06,2.45l-0.7,2.79ZM692.58,302.03l0.35,0.26l4.8,0.25l0.78,-0.97l4.17,1.09l1.13,1.68l3.69,0.45l2.13,1.04l-1.8,0.6l-2.77,-0.99l-4.8,-0.12l-5.24,-1.41l-1.84,-0.25l-1.11,0.3l-4.26,-0.97l-0.7,-1.14l-1.59,-0.13l1.18,-1.65l2.74,0.13l2.87,1.13l0.26,0.68ZM685.53,299.17l-2.22,0.04l-2.06,-2.03l-3.15,-2.01l-2.93,-3.51l-3.11,-5.33l-2.2,-2.12l-1.64,-4.06l-2.32,-1.69l-1.27,-2.07l-1.96,-1.5l-2.51,-2.65l-0.11,-0.66l4.81,0.53l2.15,2.38l3.31,2.74l2.35,2.66l2.7,0.17l1.95,1.59l1.54,2.17l1.59,0.95l-0.84,1.71l0.15,0.52l1.44,0.87l0.79,0.1l0.4,1.58l0.87,1.4l1.96,0.39l1.0,1.31l-0.6,3.01l-0.09,3.5Z',
      name: 'Indonesia',
    },
    UA: {
      path: 'M492.5,162.44l1.28,-2.49l1.82,0.19l0.66,-0.23l0.09,-0.71l-0.25,-0.75l-0.79,-0.72l-0.33,-1.21l-0.86,-0.62l-0.02,-1.19l-1.13,-0.86l-1.15,-0.19l-2.04,-1.0l-1.66,0.32l-0.66,0.47l-0.92,-0.0l-0.84,0.78l-2.48,0.7l-1.18,-0.71l-3.07,-0.36l-0.89,0.43l-0.24,-0.55l-1.11,-0.7l0.35,-0.93l1.26,-1.02l-0.54,-1.23l2.04,-2.43l1.4,-0.62l0.25,-1.19l-1.04,-2.39l0.83,-0.13l1.28,-0.84l1.8,-0.07l2.47,0.26l2.86,0.81l1.88,0.06l0.86,0.44l1.04,-0.41l0.77,0.66l2.18,-0.15l0.92,0.3l0.52,-0.34l0.15,-1.53l0.56,-0.54l2.85,-0.05l0.84,-0.72l3.04,-0.18l1.23,1.46l-0.48,0.77l0.21,1.03l0.36,0.32l1.8,0.14l0.93,2.08l3.18,1.15l1.94,-0.45l1.67,1.49l1.4,-0.03l3.35,0.96l0.02,0.54l-0.96,1.59l0.47,1.97l-0.26,0.7l-2.36,0.28l-1.29,0.89l-0.23,1.38l-1.83,0.27l-1.58,0.97l-2.41,0.21l-2.16,1.17l-0.21,0.38l0.34,2.26l1.23,0.75l2.13,-0.08l-0.14,0.31l-2.65,0.53l-3.23,1.69l-0.87,-0.39l0.42,-1.1l-0.25,-0.52l-2.21,-0.73l2.35,-1.06l0.12,-0.65l-0.93,-0.82l-3.62,-0.74l-0.13,-0.89l-0.46,-0.34l-2.61,0.59l-0.91,1.69l-1.71,2.04l-0.86,-0.4l-1.62,0.27Z',
      name: 'Ukraine',
    },
    QA: {
      path: 'M549.33,221.64l-0.76,-0.23l-0.14,-1.64l0.84,-1.29l0.47,0.52l0.04,1.34l-0.45,1.3Z',
      name: 'Qatar',
    },
    MZ: {
      path: 'M508.58,318.75l-0.34,-2.57l0.51,-2.05l3.55,0.63l2.5,-0.38l1.02,-0.76l1.49,0.01l2.74,-0.98l1.66,-1.2l0.5,9.24l0.41,1.23l-0.68,1.67l-0.93,1.71l-1.5,1.5l-5.16,2.28l-2.78,2.73l-1.02,0.53l-1.71,1.8l-0.98,0.57l-0.35,2.41l1.16,1.94l0.49,2.17l0.43,0.31l-0.06,2.06l-0.39,1.17l0.5,0.72l-0.25,0.73l-0.92,0.83l-5.12,2.39l-1.22,1.36l0.21,1.13l0.58,0.39l-0.11,0.72l-1.22,-0.01l-0.73,-2.97l0.42,-3.09l-1.78,-5.37l2.49,-2.81l0.69,-1.89l0.44,-0.43l0.28,-1.53l-0.39,-0.93l0.59,-3.65l-0.01,-3.26l-1.49,-1.16l-1.2,-0.22l-1.74,-1.17l-1.92,0.01l-0.29,-2.08l7.06,-1.96l1.28,1.09l0.89,-0.1l0.67,0.44l0.1,0.73l-0.51,1.29l0.19,1.81l1.75,1.83l0.65,-0.13l0.71,-1.65l1.17,-0.86l-0.26,-3.47l-1.05,-1.85l-1.04,-0.94Z',
      name: 'Mozambique',
    },
  },
  height: 440.70631074413296,
  projection: { type: 'mill', centralMeridian: 11.5 },
  width: 900.0,
})
// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.4 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\
!(function (a, b) {
  'function' == typeof define && define.amd
    ? define('eve', function () {
        return b()
      })
    : ''
})(this, function () {
  var a,
    b,
    c = '0.4.2',
    d = 'hasOwnProperty',
    e = /[\.\/]/,
    f = '*',
    g = function () {},
    h = function (a, b) {
      return a - b
    },
    i = { n: {} },
    j = function (c, d) {
      c = String(c)
      var e,
        f = b,
        g = Array.prototype.slice.call(arguments, 2),
        i = j.listeners(c),
        k = 0,
        l = [],
        m = {},
        n = [],
        o = a
      ;(a = c), (b = 0)
      for (var p = 0, q = i.length; q > p; p++)
        'zIndex' in i[p] &&
          (l.push(i[p].zIndex), i[p].zIndex < 0 && (m[i[p].zIndex] = i[p]))
      for (l.sort(h); l[k] < 0; )
        if (((e = m[l[k++]]), n.push(e.apply(d, g)), b)) return (b = f), n
      for (p = 0; q > p; p++)
        if (((e = i[p]), 'zIndex' in e))
          if (e.zIndex == l[k]) {
            if ((n.push(e.apply(d, g)), b)) break
            do if ((k++, (e = m[l[k]]), e && n.push(e.apply(d, g)), b)) break
            while (e)
          } else m[e.zIndex] = e
        else if ((n.push(e.apply(d, g)), b)) break
      return (b = f), (a = o), n.length ? n : null
    }
  return (
    (j._events = i),
    (j.listeners = function (a) {
      var b,
        c,
        d,
        g,
        h,
        j,
        k,
        l,
        m = a.split(e),
        n = i,
        o = [n],
        p = []
      for (g = 0, h = m.length; h > g; g++) {
        for (l = [], j = 0, k = o.length; k > j; j++)
          for (n = o[j].n, c = [n[m[g]], n[f]], d = 2; d--; )
            (b = c[d]), b && (l.push(b), (p = p.concat(b.f || [])))
        o = l
      }
      return p
    }),
    (j.on = function (a, b) {
      if (((a = String(a)), 'function' != typeof b)) return function () {}
      for (var c = a.split(e), d = i, f = 0, h = c.length; h > f; f++)
        (d = d.n),
          (d = (d.hasOwnProperty(c[f]) && d[c[f]]) || (d[c[f]] = { n: {} }))
      for (d.f = d.f || [], f = 0, h = d.f.length; h > f; f++)
        if (d.f[f] == b) return g
      return (
        d.f.push(b),
        function (a) {
          ;+a == +a && (b.zIndex = +a)
        }
      )
    }),
    (j.f = function (a) {
      var b = [].slice.call(arguments, 1)
      return function () {
        j.apply(null, [a, null].concat(b).concat([].slice.call(arguments, 0)))
      }
    }),
    (j.stop = function () {
      b = 1
    }),
    (j.nt = function (b) {
      return b ? new RegExp('(?:\\.|\\/|^)' + b + '(?:\\.|\\/|$)').test(a) : a
    }),
    (j.nts = function () {
      return a.split(e)
    }),
    (j.off = j.unbind =
      function (a, b) {
        if (!a) return void (j._events = i = { n: {} })
        var c,
          g,
          h,
          k,
          l,
          m,
          n,
          o = a.split(e),
          p = [i]
        for (k = 0, l = o.length; l > k; k++)
          for (m = 0; m < p.length; m += h.length - 2) {
            if (((h = [m, 1]), (c = p[m].n), o[k] != f))
              c[o[k]] && h.push(c[o[k]])
            else for (g in c) c[d](g) && h.push(c[g])
            p.splice.apply(p, h)
          }
        for (k = 0, l = p.length; l > k; k++)
          for (c = p[k]; c.n; ) {
            if (b) {
              if (c.f) {
                for (m = 0, n = c.f.length; n > m; m++)
                  if (c.f[m] == b) {
                    c.f.splice(m, 1)
                    break
                  }
                !c.f.length && delete c.f
              }
              for (g in c.n)
                if (c.n[d](g) && c.n[g].f) {
                  var q = c.n[g].f
                  for (m = 0, n = q.length; n > m; m++)
                    if (q[m] == b) {
                      q.splice(m, 1)
                      break
                    }
                  !q.length && delete c.n[g].f
                }
            } else {
              delete c.f
              for (g in c.n) c.n[d](g) && c.n[g].f && delete c.n[g].f
            }
            c = c.n
          }
      }),
    (j.once = function (a, b) {
      var c = function () {
        return j.unbind(a, c), b.apply(this, arguments)
      }
      return j.on(a, c)
    }),
    (j.version = c),
    (j.toString = function () {
      return 'You are running Eve ' + c
    }),
    j
  )
}),
  (this,
  function (a) {
    function b(c) {
      if (b.is(c, 'function')) return t ? c() : a.on('raphael.DOMload', c)
      if (b.is(c, U))
        return b._engine.create[C](b, c.splice(0, 3 + b.is(c[0], S))).add(c)
      var d = Array.prototype.slice.call(arguments, 0)
      if (b.is(d[d.length - 1], 'function')) {
        var e = d.pop()
        return t
          ? e.call(b._engine.create[C](b, d))
          : a.on('raphael.DOMload', function () {
              e.call(b._engine.create[C](b, d))
            })
      }
      return b._engine.create[C](b, arguments)
    }
    function c(a) {
      if ('function' == typeof a || Object(a) !== a) return a
      var b = new a.constructor()
      for (var d in a) a[y](d) && (b[d] = c(a[d]))
      return b
    }
    function d(a, b) {
      for (var c = 0, d = a.length; d > c; c++)
        if (a[c] === b) return a.push(a.splice(c, 1)[0])
    }
    function e(a, b, c) {
      function e() {
        var f = Array.prototype.slice.call(arguments, 0),
          g = f.join('␀'),
          h = (e.cache = e.cache || {}),
          i = (e.count = e.count || [])
        return h[y](g)
          ? (d(i, g), c ? c(h[g]) : h[g])
          : (i.length >= 1e3 && delete h[i.shift()],
            i.push(g),
            (h[g] = a[C](b, f)),
            c ? c(h[g]) : h[g])
      }
      return e
    }
    function f() {
      return this.hex
    }
    function g(a, b) {
      for (var c = [], d = 0, e = a.length; e - 2 * !b > d; d += 2) {
        var f = [
          { x: +a[d - 2], y: +a[d - 1] },
          { x: +a[d], y: +a[d + 1] },
          { x: +a[d + 2], y: +a[d + 3] },
          { x: +a[d + 4], y: +a[d + 5] },
        ]
        b
          ? d
            ? e - 4 == d
              ? (f[3] = { x: +a[0], y: +a[1] })
              : e - 2 == d &&
                ((f[2] = { x: +a[0], y: +a[1] }),
                (f[3] = { x: +a[2], y: +a[3] }))
            : (f[0] = { x: +a[e - 2], y: +a[e - 1] })
          : e - 4 == d
          ? (f[3] = f[2])
          : d || (f[0] = { x: +a[d], y: +a[d + 1] }),
          c.push([
            'C',
            (-f[0].x + 6 * f[1].x + f[2].x) / 6,
            (-f[0].y + 6 * f[1].y + f[2].y) / 6,
            (f[1].x + 6 * f[2].x - f[3].x) / 6,
            (f[1].y + 6 * f[2].y - f[3].y) / 6,
            f[2].x,
            f[2].y,
          ])
      }
      return c
    }
    function h(a, b, c, d, e) {
      var f = -3 * b + 9 * c - 9 * d + 3 * e,
        g = a * f + 6 * b - 12 * c + 6 * d
      return a * g - 3 * b + 3 * c
    }
    function i(a, b, c, d, e, f, g, i, j) {
      null == j && (j = 1), (j = j > 1 ? 1 : 0 > j ? 0 : j)
      for (
        var k = j / 2,
          l = 12,
          m = [
            -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699,
            -0.9041, 0.9041, -0.9816, 0.9816,
          ],
          n = [
            0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601,
            0.1069, 0.1069, 0.0472, 0.0472,
          ],
          o = 0,
          p = 0;
        l > p;
        p++
      ) {
        var q = k * m[p] + k,
          r = h(q, a, c, e, g),
          s = h(q, b, d, f, i),
          t = r * r + s * s
        o += n[p] * M.sqrt(t)
      }
      return k * o
    }
    function j(a, b, c, d, e, f, g, h, j) {
      if (!(0 > j || i(a, b, c, d, e, f, g, h) < j)) {
        var k,
          l = 1,
          m = l / 2,
          n = l - m,
          o = 0.01
        for (k = i(a, b, c, d, e, f, g, h, n); P(k - j) > o; )
          (m /= 2),
            (n += (j > k ? 1 : -1) * m),
            (k = i(a, b, c, d, e, f, g, h, n))
        return n
      }
    }
    function k(a, b, c, d, e, f, g, h) {
      if (
        !(
          N(a, c) < O(e, g) ||
          O(a, c) > N(e, g) ||
          N(b, d) < O(f, h) ||
          O(b, d) > N(f, h)
        )
      ) {
        var i = (a * d - b * c) * (e - g) - (a - c) * (e * h - f * g),
          j = (a * d - b * c) * (f - h) - (b - d) * (e * h - f * g),
          k = (a - c) * (f - h) - (b - d) * (e - g)
        if (k) {
          var l = i / k,
            m = j / k,
            n = +l.toFixed(2),
            o = +m.toFixed(2)
          if (
            !(
              n < +O(a, c).toFixed(2) ||
              n > +N(a, c).toFixed(2) ||
              n < +O(e, g).toFixed(2) ||
              n > +N(e, g).toFixed(2) ||
              o < +O(b, d).toFixed(2) ||
              o > +N(b, d).toFixed(2) ||
              o < +O(f, h).toFixed(2) ||
              o > +N(f, h).toFixed(2)
            )
          )
            return { x: l, y: m }
        }
      }
    }
    function l(a, c, d) {
      var e = b.bezierBBox(a),
        f = b.bezierBBox(c)
      if (!b.isBBoxIntersect(e, f)) return d ? 0 : []
      for (
        var g = i.apply(0, a),
          h = i.apply(0, c),
          j = N(~~(g / 5), 1),
          l = N(~~(h / 5), 1),
          m = [],
          n = [],
          o = {},
          p = d ? 0 : [],
          q = 0;
        j + 1 > q;
        q++
      ) {
        var r = b.findDotsAtSegment.apply(b, a.concat(q / j))
        m.push({ x: r.x, y: r.y, t: q / j })
      }
      for (q = 0; l + 1 > q; q++)
        (r = b.findDotsAtSegment.apply(b, c.concat(q / l))),
          n.push({ x: r.x, y: r.y, t: q / l })
      for (q = 0; j > q; q++)
        for (var s = 0; l > s; s++) {
          var t = m[q],
            u = m[q + 1],
            v = n[s],
            w = n[s + 1],
            x = P(u.x - t.x) < 0.001 ? 'y' : 'x',
            y = P(w.x - v.x) < 0.001 ? 'y' : 'x',
            z = k(t.x, t.y, u.x, u.y, v.x, v.y, w.x, w.y)
          if (z) {
            if (o[z.x.toFixed(4)] == z.y.toFixed(4)) continue
            o[z.x.toFixed(4)] = z.y.toFixed(4)
            var A = t.t + P((z[x] - t[x]) / (u[x] - t[x])) * (u.t - t.t),
              B = v.t + P((z[y] - v[y]) / (w[y] - v[y])) * (w.t - v.t)
            A >= 0 &&
              1.001 >= A &&
              B >= 0 &&
              1.001 >= B &&
              (d ? p++ : p.push({ x: z.x, y: z.y, t1: O(A, 1), t2: O(B, 1) }))
          }
        }
      return p
    }
    function m(a, c, d) {
      ;(a = b._path2curve(a)), (c = b._path2curve(c))
      for (
        var e, f, g, h, i, j, k, m, n, o, p = d ? 0 : [], q = 0, r = a.length;
        r > q;
        q++
      ) {
        var s = a[q]
        if ('M' == s[0]) (e = i = s[1]), (f = j = s[2])
        else {
          'C' == s[0]
            ? ((n = [e, f].concat(s.slice(1))), (e = n[6]), (f = n[7]))
            : ((n = [e, f, e, f, i, j, i, j]), (e = i), (f = j))
          for (var t = 0, u = c.length; u > t; t++) {
            var v = c[t]
            if ('M' == v[0]) (g = k = v[1]), (h = m = v[2])
            else {
              'C' == v[0]
                ? ((o = [g, h].concat(v.slice(1))), (g = o[6]), (h = o[7]))
                : ((o = [g, h, g, h, k, m, k, m]), (g = k), (h = m))
              var w = l(n, o, d)
              if (d) p += w
              else {
                for (var x = 0, y = w.length; y > x; x++)
                  (w[x].segment1 = q),
                    (w[x].segment2 = t),
                    (w[x].bez1 = n),
                    (w[x].bez2 = o)
                p = p.concat(w)
              }
            }
          }
        }
      }
      return p
    }
    function n(a, b, c, d, e, f) {
      null != a
        ? ((this.a = +a),
          (this.b = +b),
          (this.c = +c),
          (this.d = +d),
          (this.e = +e),
          (this.f = +f))
        : ((this.a = 1),
          (this.b = 0),
          (this.c = 0),
          (this.d = 1),
          (this.e = 0),
          (this.f = 0))
    }
    function o() {
      return this.x + G + this.y + G + this.width + ' × ' + this.height
    }
    function p(a, b, c, d, e, f) {
      function g(a) {
        return ((l * a + k) * a + j) * a
      }
      function h(a, b) {
        var c = i(a, b)
        return ((o * c + n) * c + m) * c
      }
      function i(a, b) {
        var c, d, e, f, h, i
        for (e = a, i = 0; 8 > i; i++) {
          if (((f = g(e) - a), P(f) < b)) return e
          if (((h = (3 * l * e + 2 * k) * e + j), P(h) < 1e-6)) break
          e -= f / h
        }
        if (((c = 0), (d = 1), (e = a), c > e)) return c
        if (e > d) return d
        for (; d > c; ) {
          if (((f = g(e)), P(f - a) < b)) return e
          a > f ? (c = e) : (d = e), (e = (d - c) / 2 + c)
        }
        return e
      }
      var j = 3 * b,
        k = 3 * (d - b) - j,
        l = 1 - j - k,
        m = 3 * c,
        n = 3 * (e - c) - m,
        o = 1 - m - n
      return h(a, 1 / (200 * f))
    }
    function q(a, b) {
      var c = [],
        d = {}
      if (((this.ms = b), (this.times = 1), a)) {
        for (var e in a) a[y](e) && ((d[$(e)] = a[e]), c.push($(e)))
        c.sort(ka)
      }
      ;(this.anim = d), (this.top = c[c.length - 1]), (this.percents = c)
    }
    function r(c, d, e, f, g, h) {
      e = $(e)
      var i,
        j,
        k,
        l,
        m,
        o,
        q = c.ms,
        r = {},
        s = {},
        t = {}
      if (f)
        for (w = 0, x = fb.length; x > w; w++) {
          var u = fb[w]
          if (u.el.id == d.id && u.anim == c) {
            u.percent != e ? (fb.splice(w, 1), (k = 1)) : (j = u),
              d.attr(u.totalOrigin)
            break
          }
        }
      else f = +s
      for (var w = 0, x = c.percents.length; x > w; w++) {
        if (c.percents[w] == e || c.percents[w] > f * c.top) {
          ;(e = c.percents[w]),
            (m = c.percents[w - 1] || 0),
            (q = (q / c.top) * (e - m)),
            (l = c.percents[w + 1]),
            (i = c.anim[e])
          break
        }
        f && d.attr(c.anim[c.percents[w]])
      }
      if (i) {
        if (j) (j.initstatus = f), (j.start = new Date() - j.ms * f)
        else {
          for (var z in i)
            if (i[y](z) && (ca[y](z) || d.paper.customAttributes[y](z)))
              switch (
                ((r[z] = d.attr(z)),
                null == r[z] && (r[z] = ba[z]),
                (s[z] = i[z]),
                ca[z])
              ) {
                case S:
                  t[z] = (s[z] - r[z]) / q
                  break
                case 'colour':
                  r[z] = b.getRGB(r[z])
                  var A = b.getRGB(s[z])
                  t[z] = {
                    r: (A.r - r[z].r) / q,
                    g: (A.g - r[z].g) / q,
                    b: (A.b - r[z].b) / q,
                  }
                  break
                case 'path':
                  var B = Ia(r[z], s[z]),
                    C = B[1]
                  for (
                    r[z] = B[0], t[z] = [], w = 0, x = r[z].length;
                    x > w;
                    w++
                  ) {
                    t[z][w] = [0]
                    for (var E = 1, F = r[z][w].length; F > E; E++)
                      t[z][w][E] = (C[w][E] - r[z][w][E]) / q
                  }
                  break
                case 'transform':
                  var G = d._,
                    J = Na(G[z], s[z])
                  if (J)
                    for (
                      r[z] = J.from,
                        s[z] = J.to,
                        t[z] = [],
                        t[z].real = !0,
                        w = 0,
                        x = r[z].length;
                      x > w;
                      w++
                    )
                      for (
                        t[z][w] = [r[z][w][0]], E = 1, F = r[z][w].length;
                        F > E;
                        E++
                      )
                        t[z][w][E] = (s[z][w][E] - r[z][w][E]) / q
                  else {
                    var K = d.matrix || new n(),
                      L = {
                        _: { transform: G.transform },
                        getBBox: function () {
                          return d.getBBox(1)
                        },
                      }
                    ;(r[z] = [K.a, K.b, K.c, K.d, K.e, K.f]),
                      La(L, s[z]),
                      (s[z] = L._.transform),
                      (t[z] = [
                        (L.matrix.a - K.a) / q,
                        (L.matrix.b - K.b) / q,
                        (L.matrix.c - K.c) / q,
                        (L.matrix.d - K.d) / q,
                        (L.matrix.e - K.e) / q,
                        (L.matrix.f - K.f) / q,
                      ])
                  }
                  break
                case 'csv':
                  var M = H(i[z])[I](v),
                    N = H(r[z])[I](v)
                  if ('clip-rect' == z)
                    for (r[z] = N, t[z] = [], w = N.length; w--; )
                      t[z][w] = (M[w] - r[z][w]) / q
                  s[z] = M
                  break
                default:
                  for (
                    M = [][D](i[z]),
                      N = [][D](r[z]),
                      t[z] = [],
                      w = d.paper.customAttributes[z].length;
                    w--;

                  )
                    t[z][w] = ((M[w] || 0) - (N[w] || 0)) / q
              }
          var O = i.easing,
            P = b.easing_formulas[O]
          if (!P)
            if (((P = H(O).match(Y)), P && 5 == P.length)) {
              var Q = P
              P = function (a) {
                return p(a, +Q[1], +Q[2], +Q[3], +Q[4], q)
              }
            } else P = la
          if (
            ((o = i.start || c.start || +new Date()),
            (u = {
              anim: c,
              percent: e,
              timestamp: o,
              start: o + (c.del || 0),
              status: 0,
              initstatus: f || 0,
              stop: !1,
              ms: q,
              easing: P,
              from: r,
              diff: t,
              to: s,
              el: d,
              callback: i.callback,
              prev: m,
              next: l,
              repeat: h || c.times,
              origin: d.attr(),
              totalOrigin: g,
            }),
            fb.push(u),
            f &&
              !j &&
              !k &&
              ((u.stop = !0), (u.start = new Date() - q * f), 1 == fb.length))
          )
            return hb()
          k && (u.start = new Date() - u.ms * f), 1 == fb.length && gb(hb)
        }
        a('raphael.anim.start.' + d.id, d, c)
      }
    }
    function s(a) {
      for (var b = 0; b < fb.length; b++)
        fb[b].el.paper == a && fb.splice(b--, 1)
    }
    ;(b.version = '2.1.4'), (b.eve = a)
    var t,
      u,
      v = /[, ]+/,
      w = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
      x = /\{(\d+)\}/g,
      y = 'hasOwnProperty',
      z = { doc: document, win: window },
      A = {
        was: Object.prototype[y].call(z.win, 'Raphael'),
        is: z.win.Raphael,
      },
      B = function () {
        this.ca = this.customAttributes = {}
      },
      C = 'apply',
      D = 'concat',
      E =
        'ontouchstart' in z.win ||
        (z.win.DocumentTouch && z.doc instanceof DocumentTouch),
      F = '',
      G = ' ',
      H = String,
      I = 'split',
      J =
        'click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel'[
          I
        ](G),
      K = {
        mousedown: 'touchstart',
        mousemove: 'touchmove',
        mouseup: 'touchend',
      },
      L = H.prototype.toLowerCase,
      M = Math,
      N = M.max,
      O = M.min,
      P = M.abs,
      Q = M.pow,
      R = M.PI,
      S = 'number',
      T = 'string',
      U = 'array',
      V = Object.prototype.toString,
      W =
        ((b._ISURL = /^url\(['"]?(.+?)['"]?\)$/i),
        /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
      X = { NaN: 1, Infinity: 1, '-Infinity': 1 },
      Y = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
      Z = M.round,
      $ = parseFloat,
      _ = parseInt,
      aa = H.prototype.toUpperCase,
      ba = (b._availableAttrs = {
        'arrow-end': 'none',
        'arrow-start': 'none',
        blur: 0,
        'clip-rect': '0 0 1e9 1e9',
        cursor: 'default',
        cx: 0,
        cy: 0,
        fill: '#fff',
        'fill-opacity': 1,
        font: '10px "Arial"',
        'font-family': '"Arial"',
        'font-size': '10',
        'font-style': 'normal',
        'font-weight': 400,
        gradient: 0,
        height: 0,
        href: 'http://raphaeljs.com/',
        'letter-spacing': 0,
        opacity: 1,
        path: 'M0,0',
        r: 0,
        rx: 0,
        ry: 0,
        src: '',
        stroke: '#000',
        'stroke-dasharray': '',
        'stroke-linecap': 'butt',
        'stroke-linejoin': 'butt',
        'stroke-miterlimit': 0,
        'stroke-opacity': 1,
        'stroke-width': 1,
        target: '_blank',
        'text-anchor': 'middle',
        title: 'Raphael',
        transform: '',
        width: 0,
        x: 0,
        y: 0,
      }),
      ca = (b._availableAnimAttrs = {
        blur: S,
        'clip-rect': 'csv',
        cx: S,
        cy: S,
        fill: 'colour',
        'fill-opacity': S,
        'font-size': S,
        height: S,
        opacity: S,
        path: 'path',
        r: S,
        rx: S,
        ry: S,
        stroke: 'colour',
        'stroke-opacity': S,
        'stroke-width': S,
        transform: 'transform',
        width: S,
        x: S,
        y: S,
      }),
      da =
        /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
      ea = { hs: 1, rg: 1 },
      fa = /,?([achlmqrstvxz]),?/gi,
      ga =
        /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
      ha =
        /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
      ia =
        /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
      ja =
        ((b._radial_gradient =
          /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/),
        {}),
      ka = function (a, b) {
        return $(a) - $(b)
      },
      la = function (a) {
        return a
      },
      ma = (b._rectPath = function (a, b, c, d, e) {
        return e
          ? [
              ['M', a + e, b],
              ['l', c - 2 * e, 0],
              ['a', e, e, 0, 0, 1, e, e],
              ['l', 0, d - 2 * e],
              ['a', e, e, 0, 0, 1, -e, e],
              ['l', 2 * e - c, 0],
              ['a', e, e, 0, 0, 1, -e, -e],
              ['l', 0, 2 * e - d],
              ['a', e, e, 0, 0, 1, e, -e],
              ['z'],
            ]
          : [['M', a, b], ['l', c, 0], ['l', 0, d], ['l', -c, 0], ['z']]
      }),
      na = function (a, b, c, d) {
        return (
          null == d && (d = c),
          [
            ['M', a, b],
            ['m', 0, -d],
            ['a', c, d, 0, 1, 1, 0, 2 * d],
            ['a', c, d, 0, 1, 1, 0, -2 * d],
            ['z'],
          ]
        )
      },
      oa = (b._getPath = {
        path: function (a) {
          return a.attr('path')
        },
        circle: function (a) {
          var b = a.attrs
          return na(b.cx, b.cy, b.r)
        },
        ellipse: function (a) {
          var b = a.attrs
          return na(b.cx, b.cy, b.rx, b.ry)
        },
        rect: function (a) {
          var b = a.attrs
          return ma(b.x, b.y, b.width, b.height, b.r)
        },
        image: function (a) {
          var b = a.attrs
          return ma(b.x, b.y, b.width, b.height)
        },
        text: function (a) {
          var b = a._getBBox()
          return ma(b.x, b.y, b.width, b.height)
        },
        set: function (a) {
          var b = a._getBBox()
          return ma(b.x, b.y, b.width, b.height)
        },
      }),
      pa = (b.mapPath = function (a, b) {
        if (!b) return a
        var c, d, e, f, g, h, i
        for (a = Ia(a), e = 0, g = a.length; g > e; e++)
          for (i = a[e], f = 1, h = i.length; h > f; f += 2)
            (c = b.x(i[f], i[f + 1])),
              (d = b.y(i[f], i[f + 1])),
              (i[f] = c),
              (i[f + 1] = d)
        return a
      })
    if (
      ((b._g = z),
      (b.type =
        z.win.SVGAngle ||
        z.doc.implementation.hasFeature(
          'http://www.w3.org/TR/SVG11/feature#BasicStructure',
          '1.1'
        )
          ? 'SVG'
          : 'VML'),
      'VML' == b.type)
    ) {
      var qa,
        ra = z.doc.createElement('div')
      if (
        ((ra.innerHTML = '<v:shape adj="1"/>'),
        (qa = ra.firstChild),
        (qa.style.behavior = 'url(#default#VML)'),
        !qa || 'object' != typeof qa.adj)
      )
        return (b.type = F)
      ra = null
    }
    ;(b.svg = !(b.vml = 'VML' == b.type)),
      (b._Paper = B),
      (b.fn = u = B.prototype = b.prototype),
      (b._id = 0),
      (b._oid = 0),
      (b.is = function (a, b) {
        return (
          (b = L.call(b)),
          'finite' == b
            ? !X[y](+a)
            : 'array' == b
            ? a instanceof Array
            : ('null' == b && null === a) ||
              (b == typeof a && null !== a) ||
              ('object' == b && a === Object(a)) ||
              ('array' == b && Array.isArray && Array.isArray(a)) ||
              V.call(a).slice(8, -1).toLowerCase() == b
        )
      }),
      (b.angle = function (a, c, d, e, f, g) {
        if (null == f) {
          var h = a - d,
            i = c - e
          return h || i ? (180 + (180 * M.atan2(-i, -h)) / R + 360) % 360 : 0
        }
        return b.angle(a, c, f, g) - b.angle(d, e, f, g)
      }),
      (b.rad = function (a) {
        return ((a % 360) * R) / 180
      }),
      (b.deg = function (a) {
        return Math.round((((180 * a) / R) % 360) * 1e3) / 1e3
      }),
      (b.snapTo = function (a, c, d) {
        if (((d = b.is(d, 'finite') ? d : 10), b.is(a, U))) {
          for (var e = a.length; e--; ) if (P(a[e] - c) <= d) return a[e]
        } else {
          a = +a
          var f = c % a
          if (d > f) return c - f
          if (f > a - d) return c - f + a
        }
        return c
      })
    b.createUUID = (function (a, b) {
      return function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
          .replace(a, b)
          .toUpperCase()
      }
    })(/[xy]/g, function (a) {
      var b = (16 * M.random()) | 0,
        c = 'x' == a ? b : (3 & b) | 8
      return c.toString(16)
    })
    b.setWindow = function (c) {
      a('raphael.setWindow', b, z.win, c),
        (z.win = c),
        (z.doc = z.win.document),
        b._engine.initWin && b._engine.initWin(z.win)
    }
    var sa = function (a) {
        if (b.vml) {
          var c,
            d = /^\s+|\s+$/g
          try {
            var f = new ActiveXObject('htmlfile')
            f.write('<body>'), f.close(), (c = f.body)
          } catch (g) {
            c = createPopup().document.body
          }
          var h = c.createTextRange()
          sa = e(function (a) {
            try {
              c.style.color = H(a).replace(d, F)
              var b = h.queryCommandValue('ForeColor')
              return (
                (b = ((255 & b) << 16) | (65280 & b) | ((16711680 & b) >>> 16)),
                '#' + ('000000' + b.toString(16)).slice(-6)
              )
            } catch (e) {
              return 'none'
            }
          })
        } else {
          var i = z.doc.createElement('i')
          ;(i.title = 'Raphaël Colour Picker'),
            (i.style.display = 'none'),
            z.doc.body.appendChild(i),
            (sa = e(function (a) {
              return (
                (i.style.color = a),
                z.doc.defaultView
                  .getComputedStyle(i, F)
                  .getPropertyValue('color')
              )
            }))
        }
        return sa(a)
      },
      ta = function () {
        return 'hsb(' + [this.h, this.s, this.b] + ')'
      },
      ua = function () {
        return 'hsl(' + [this.h, this.s, this.l] + ')'
      },
      va = function () {
        return this.hex
      },
      wa = function (a, c, d) {
        if (
          (null == c &&
            b.is(a, 'object') &&
            'r' in a &&
            'g' in a &&
            'b' in a &&
            ((d = a.b), (c = a.g), (a = a.r)),
          null == c && b.is(a, T))
        ) {
          var e = b.getRGB(a)
          ;(a = e.r), (c = e.g), (d = e.b)
        }
        return (
          (a > 1 || c > 1 || d > 1) && ((a /= 255), (c /= 255), (d /= 255)),
          [a, c, d]
        )
      },
      xa = function (a, c, d, e) {
        ;(a *= 255), (c *= 255), (d *= 255)
        var f = { r: a, g: c, b: d, hex: b.rgb(a, c, d), toString: va }
        return b.is(e, 'finite') && (f.opacity = e), f
      }
    ;(b.color = function (a) {
      var c
      return (
        b.is(a, 'object') && 'h' in a && 's' in a && 'b' in a
          ? ((c = b.hsb2rgb(a)),
            (a.r = c.r),
            (a.g = c.g),
            (a.b = c.b),
            (a.hex = c.hex))
          : b.is(a, 'object') && 'h' in a && 's' in a && 'l' in a
          ? ((c = b.hsl2rgb(a)),
            (a.r = c.r),
            (a.g = c.g),
            (a.b = c.b),
            (a.hex = c.hex))
          : (b.is(a, 'string') && (a = b.getRGB(a)),
            b.is(a, 'object') && 'r' in a && 'g' in a && 'b' in a
              ? ((c = b.rgb2hsl(a)),
                (a.h = c.h),
                (a.s = c.s),
                (a.l = c.l),
                (c = b.rgb2hsb(a)),
                (a.v = c.b))
              : ((a = { hex: 'none' }),
                (a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1))),
        (a.toString = va),
        a
      )
    }),
      (b.hsb2rgb = function (a, b, c, d) {
        this.is(a, 'object') &&
          'h' in a &&
          's' in a &&
          'b' in a &&
          ((c = a.b), (b = a.s), (d = a.o), (a = a.h)),
          (a *= 360)
        var e, f, g, h, i
        return (
          (a = (a % 360) / 60),
          (i = c * b),
          (h = i * (1 - P((a % 2) - 1))),
          (e = f = g = c - i),
          (a = ~~a),
          (e += [i, h, 0, 0, h, i][a]),
          (f += [h, i, i, h, 0, 0][a]),
          (g += [0, 0, h, i, i, h][a]),
          xa(e, f, g, d)
        )
      }),
      (b.hsl2rgb = function (a, b, c, d) {
        this.is(a, 'object') &&
          'h' in a &&
          's' in a &&
          'l' in a &&
          ((c = a.l), (b = a.s), (a = a.h)),
          (a > 1 || b > 1 || c > 1) && ((a /= 360), (b /= 100), (c /= 100)),
          (a *= 360)
        var e, f, g, h, i
        return (
          (a = (a % 360) / 60),
          (i = 2 * b * (0.5 > c ? c : 1 - c)),
          (h = i * (1 - P((a % 2) - 1))),
          (e = f = g = c - i / 2),
          (a = ~~a),
          (e += [i, h, 0, 0, h, i][a]),
          (f += [h, i, i, h, 0, 0][a]),
          (g += [0, 0, h, i, i, h][a]),
          xa(e, f, g, d)
        )
      }),
      (b.rgb2hsb = function (a, b, c) {
        ;(c = wa(a, b, c)), (a = c[0]), (b = c[1]), (c = c[2])
        var d, e, f, g
        return (
          (f = N(a, b, c)),
          (g = f - O(a, b, c)),
          (d =
            0 == g
              ? null
              : f == a
              ? (b - c) / g
              : f == b
              ? (c - a) / g + 2
              : (a - b) / g + 4),
          (d = (((d + 360) % 6) * 60) / 360),
          (e = 0 == g ? 0 : g / f),
          { h: d, s: e, b: f, toString: ta }
        )
      }),
      (b.rgb2hsl = function (a, b, c) {
        ;(c = wa(a, b, c)), (a = c[0]), (b = c[1]), (c = c[2])
        var d, e, f, g, h, i
        return (
          (g = N(a, b, c)),
          (h = O(a, b, c)),
          (i = g - h),
          (d =
            0 == i
              ? null
              : g == a
              ? (b - c) / i
              : g == b
              ? (c - a) / i + 2
              : (a - b) / i + 4),
          (d = (((d + 360) % 6) * 60) / 360),
          (f = (g + h) / 2),
          (e = 0 == i ? 0 : 0.5 > f ? i / (2 * f) : i / (2 - 2 * f)),
          { h: d, s: e, l: f, toString: ua }
        )
      }),
      (b._path2string = function () {
        return this.join(',').replace(fa, '$1')
      })
    b._preload = function (a, b) {
      var c = z.doc.createElement('img')
      ;(c.style.cssText = 'position:absolute;left:-9999em;top:-9999em'),
        (c.onload = function () {
          b.call(this), (this.onload = null), z.doc.body.removeChild(this)
        }),
        (c.onerror = function () {
          z.doc.body.removeChild(this)
        }),
        z.doc.body.appendChild(c),
        (c.src = a)
    }
    ;(b.getRGB = e(function (a) {
      if (!a || (a = H(a)).indexOf('-') + 1)
        return { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: f }
      if ('none' == a) return { r: -1, g: -1, b: -1, hex: 'none', toString: f }
      !(ea[y](a.toLowerCase().substring(0, 2)) || '#' == a.charAt()) &&
        (a = sa(a))
      var c,
        d,
        e,
        g,
        h,
        i,
        j = a.match(W)
      return j
        ? (j[2] &&
            ((e = _(j[2].substring(5), 16)),
            (d = _(j[2].substring(3, 5), 16)),
            (c = _(j[2].substring(1, 3), 16))),
          j[3] &&
            ((e = _((h = j[3].charAt(3)) + h, 16)),
            (d = _((h = j[3].charAt(2)) + h, 16)),
            (c = _((h = j[3].charAt(1)) + h, 16))),
          j[4] &&
            ((i = j[4][I](da)),
            (c = $(i[0])),
            '%' == i[0].slice(-1) && (c *= 2.55),
            (d = $(i[1])),
            '%' == i[1].slice(-1) && (d *= 2.55),
            (e = $(i[2])),
            '%' == i[2].slice(-1) && (e *= 2.55),
            'rgba' == j[1].toLowerCase().slice(0, 4) && (g = $(i[3])),
            i[3] && '%' == i[3].slice(-1) && (g /= 100)),
          j[5]
            ? ((i = j[5][I](da)),
              (c = $(i[0])),
              '%' == i[0].slice(-1) && (c *= 2.55),
              (d = $(i[1])),
              '%' == i[1].slice(-1) && (d *= 2.55),
              (e = $(i[2])),
              '%' == i[2].slice(-1) && (e *= 2.55),
              ('deg' == i[0].slice(-3) || '°' == i[0].slice(-1)) && (c /= 360),
              'hsba' == j[1].toLowerCase().slice(0, 4) && (g = $(i[3])),
              i[3] && '%' == i[3].slice(-1) && (g /= 100),
              b.hsb2rgb(c, d, e, g))
            : j[6]
            ? ((i = j[6][I](da)),
              (c = $(i[0])),
              '%' == i[0].slice(-1) && (c *= 2.55),
              (d = $(i[1])),
              '%' == i[1].slice(-1) && (d *= 2.55),
              (e = $(i[2])),
              '%' == i[2].slice(-1) && (e *= 2.55),
              ('deg' == i[0].slice(-3) || '°' == i[0].slice(-1)) && (c /= 360),
              'hsla' == j[1].toLowerCase().slice(0, 4) && (g = $(i[3])),
              i[3] && '%' == i[3].slice(-1) && (g /= 100),
              b.hsl2rgb(c, d, e, g))
            : ((j = { r: c, g: d, b: e, toString: f }),
              (j.hex =
                '#' +
                (16777216 | e | (d << 8) | (c << 16)).toString(16).slice(1)),
              b.is(g, 'finite') && (j.opacity = g),
              j))
        : { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: f }
    }, b)),
      (b.hsb = e(function (a, c, d) {
        return b.hsb2rgb(a, c, d).hex
      })),
      (b.hsl = e(function (a, c, d) {
        return b.hsl2rgb(a, c, d).hex
      })),
      (b.rgb = e(function (a, b, c) {
        function d(a) {
          return (a + 0.5) | 0
        }
        return (
          '#' +
          (16777216 | d(c) | (d(b) << 8) | (d(a) << 16)).toString(16).slice(1)
        )
      })),
      (b.getColor = function (a) {
        var b = (this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: a || 0.75,
          }),
          c = this.hsb2rgb(b.h, b.s, b.b)
        return (
          (b.h += 0.075),
          b.h > 1 &&
            ((b.h = 0),
            (b.s -= 0.2),
            b.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: b.b })),
          c.hex
        )
      }),
      (b.getColor.reset = function () {
        delete this.start
      }),
      (b.parsePathString = function (a) {
        if (!a) return null
        var c = ya(a)
        if (c.arr) return Aa(c.arr)
        var d = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0,
          },
          e = []
        return (
          b.is(a, U) && b.is(a[0], U) && (e = Aa(a)),
          e.length ||
            H(a).replace(ga, function (a, b, c) {
              var f = [],
                g = b.toLowerCase()
              if (
                (c.replace(ia, function (a, b) {
                  b && f.push(+b)
                }),
                'm' == g &&
                  f.length > 2 &&
                  (e.push([b][D](f.splice(0, 2))),
                  (g = 'l'),
                  (b = 'm' == b ? 'l' : 'L')),
                'r' == g)
              )
                e.push([b][D](f))
              else
                for (
                  ;
                  f.length >= d[g] && (e.push([b][D](f.splice(0, d[g]))), d[g]);

                );
            }),
          (e.toString = b._path2string),
          (c.arr = Aa(e)),
          e
        )
      }),
      (b.parseTransformString = e(function (a) {
        if (!a) return null
        var c = []
        return (
          b.is(a, U) && b.is(a[0], U) && (c = Aa(a)),
          c.length ||
            H(a).replace(ha, function (a, b, d) {
              {
                var e = []
                L.call(b)
              }
              d.replace(ia, function (a, b) {
                b && e.push(+b)
              }),
                c.push([b][D](e))
            }),
          (c.toString = b._path2string),
          c
        )
      }))
    var ya = function (a) {
      var b = (ya.ps = ya.ps || {})
      return (
        b[a] ? (b[a].sleep = 100) : (b[a] = { sleep: 100 }),
        setTimeout(function () {
          for (var c in b)
            b[y](c) && c != a && (b[c].sleep--, !b[c].sleep && delete b[c])
        }),
        b[a]
      )
    }
    ;(b.findDotsAtSegment = function (a, b, c, d, e, f, g, h, i) {
      var j = 1 - i,
        k = Q(j, 3),
        l = Q(j, 2),
        m = i * i,
        n = m * i,
        o = k * a + 3 * l * i * c + 3 * j * i * i * e + n * g,
        p = k * b + 3 * l * i * d + 3 * j * i * i * f + n * h,
        q = a + 2 * i * (c - a) + m * (e - 2 * c + a),
        r = b + 2 * i * (d - b) + m * (f - 2 * d + b),
        s = c + 2 * i * (e - c) + m * (g - 2 * e + c),
        t = d + 2 * i * (f - d) + m * (h - 2 * f + d),
        u = j * a + i * c,
        v = j * b + i * d,
        w = j * e + i * g,
        x = j * f + i * h,
        y = 90 - (180 * M.atan2(q - s, r - t)) / R
      return (
        (q > s || t > r) && (y += 180),
        {
          x: o,
          y: p,
          m: { x: q, y: r },
          n: { x: s, y: t },
          start: { x: u, y: v },
          end: { x: w, y: x },
          alpha: y,
        }
      )
    }),
      (b.bezierBBox = function (a, c, d, e, f, g, h, i) {
        b.is(a, 'array') || (a = [a, c, d, e, f, g, h, i])
        var j = Ha.apply(null, a)
        return {
          x: j.min.x,
          y: j.min.y,
          x2: j.max.x,
          y2: j.max.y,
          width: j.max.x - j.min.x,
          height: j.max.y - j.min.y,
        }
      }),
      (b.isPointInsideBBox = function (a, b, c) {
        return b >= a.x && b <= a.x2 && c >= a.y && c <= a.y2
      }),
      (b.isBBoxIntersect = function (a, c) {
        var d = b.isPointInsideBBox
        return (
          d(c, a.x, a.y) ||
          d(c, a.x2, a.y) ||
          d(c, a.x, a.y2) ||
          d(c, a.x2, a.y2) ||
          d(a, c.x, c.y) ||
          d(a, c.x2, c.y) ||
          d(a, c.x, c.y2) ||
          d(a, c.x2, c.y2) ||
          (((a.x < c.x2 && a.x > c.x) || (c.x < a.x2 && c.x > a.x)) &&
            ((a.y < c.y2 && a.y > c.y) || (c.y < a.y2 && c.y > a.y)))
        )
      }),
      (b.pathIntersection = function (a, b) {
        return m(a, b)
      }),
      (b.pathIntersectionNumber = function (a, b) {
        return m(a, b, 1)
      }),
      (b.isPointInsidePath = function (a, c, d) {
        var e = b.pathBBox(a)
        return (
          b.isPointInsideBBox(e, c, d) &&
          m(
            a,
            [
              ['M', c, d],
              ['H', e.x2 + 10],
            ],
            1
          ) %
            2 ==
            1
        )
      }),
      (b._removedFactory = function (b) {
        return function () {
          a(
            'raphael.log',
            null,
            'Raphaël: you are calling to method “' + b + '” of removed object',
            b
          )
        }
      })
    var za = (b.pathBBox = function (a) {
        var b = ya(a)
        if (b.bbox) return c(b.bbox)
        if (!a) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 }
        a = Ia(a)
        for (
          var d, e = 0, f = 0, g = [], h = [], i = 0, j = a.length;
          j > i;
          i++
        )
          if (((d = a[i]), 'M' == d[0]))
            (e = d[1]), (f = d[2]), g.push(e), h.push(f)
          else {
            var k = Ha(e, f, d[1], d[2], d[3], d[4], d[5], d[6])
            ;(g = g[D](k.min.x, k.max.x)),
              (h = h[D](k.min.y, k.max.y)),
              (e = d[5]),
              (f = d[6])
          }
        var l = O[C](0, g),
          m = O[C](0, h),
          n = N[C](0, g),
          o = N[C](0, h),
          p = n - l,
          q = o - m,
          r = {
            x: l,
            y: m,
            x2: n,
            y2: o,
            width: p,
            height: q,
            cx: l + p / 2,
            cy: m + q / 2,
          }
        return (b.bbox = c(r)), r
      }),
      Aa = function (a) {
        var d = c(a)
        return (d.toString = b._path2string), d
      },
      Ba = (b._pathToRelative = function (a) {
        var c = ya(a)
        if (c.rel) return Aa(c.rel)
        ;(b.is(a, U) && b.is(a && a[0], U)) || (a = b.parsePathString(a))
        var d = [],
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0
        'M' == a[0][0] &&
          ((e = a[0][1]),
          (f = a[0][2]),
          (g = e),
          (h = f),
          i++,
          d.push(['M', e, f]))
        for (var j = i, k = a.length; k > j; j++) {
          var l = (d[j] = []),
            m = a[j]
          if (m[0] != L.call(m[0]))
            switch (((l[0] = L.call(m[0])), l[0])) {
              case 'a':
                ;(l[1] = m[1]),
                  (l[2] = m[2]),
                  (l[3] = m[3]),
                  (l[4] = m[4]),
                  (l[5] = m[5]),
                  (l[6] = +(m[6] - e).toFixed(3)),
                  (l[7] = +(m[7] - f).toFixed(3))
                break
              case 'v':
                l[1] = +(m[1] - f).toFixed(3)
                break
              case 'm':
                ;(g = m[1]), (h = m[2])
              default:
                for (var n = 1, o = m.length; o > n; n++)
                  l[n] = +(m[n] - (n % 2 ? e : f)).toFixed(3)
            }
          else {
            ;(l = d[j] = []), 'm' == m[0] && ((g = m[1] + e), (h = m[2] + f))
            for (var p = 0, q = m.length; q > p; p++) d[j][p] = m[p]
          }
          var r = d[j].length
          switch (d[j][0]) {
            case 'z':
              ;(e = g), (f = h)
              break
            case 'h':
              e += +d[j][r - 1]
              break
            case 'v':
              f += +d[j][r - 1]
              break
            default:
              ;(e += +d[j][r - 2]), (f += +d[j][r - 1])
          }
        }
        return (d.toString = b._path2string), (c.rel = Aa(d)), d
      }),
      Ca = (b._pathToAbsolute = function (a) {
        var c = ya(a)
        if (c.abs) return Aa(c.abs)
        if (
          ((b.is(a, U) && b.is(a && a[0], U)) || (a = b.parsePathString(a)),
          !a || !a.length)
        )
          return [['M', 0, 0]]
        var d = [],
          e = 0,
          f = 0,
          h = 0,
          i = 0,
          j = 0
        'M' == a[0][0] &&
          ((e = +a[0][1]),
          (f = +a[0][2]),
          (h = e),
          (i = f),
          j++,
          (d[0] = ['M', e, f]))
        for (
          var k,
            l,
            m =
              3 == a.length &&
              'M' == a[0][0] &&
              'R' == a[1][0].toUpperCase() &&
              'Z' == a[2][0].toUpperCase(),
            n = j,
            o = a.length;
          o > n;
          n++
        ) {
          if ((d.push((k = [])), (l = a[n]), l[0] != aa.call(l[0])))
            switch (((k[0] = aa.call(l[0])), k[0])) {
              case 'A':
                ;(k[1] = l[1]),
                  (k[2] = l[2]),
                  (k[3] = l[3]),
                  (k[4] = l[4]),
                  (k[5] = l[5]),
                  (k[6] = +(l[6] + e)),
                  (k[7] = +(l[7] + f))
                break
              case 'V':
                k[1] = +l[1] + f
                break
              case 'H':
                k[1] = +l[1] + e
                break
              case 'R':
                for (
                  var p = [e, f][D](l.slice(1)), q = 2, r = p.length;
                  r > q;
                  q++
                )
                  (p[q] = +p[q] + e), (p[++q] = +p[q] + f)
                d.pop(), (d = d[D](g(p, m)))
                break
              case 'M':
                ;(h = +l[1] + e), (i = +l[2] + f)
              default:
                for (q = 1, r = l.length; r > q; q++)
                  k[q] = +l[q] + (q % 2 ? e : f)
            }
          else if ('R' == l[0])
            (p = [e, f][D](l.slice(1))),
              d.pop(),
              (d = d[D](g(p, m))),
              (k = ['R'][D](l.slice(-2)))
          else for (var s = 0, t = l.length; t > s; s++) k[s] = l[s]
          switch (k[0]) {
            case 'Z':
              ;(e = h), (f = i)
              break
            case 'H':
              e = k[1]
              break
            case 'V':
              f = k[1]
              break
            case 'M':
              ;(h = k[k.length - 2]), (i = k[k.length - 1])
            default:
              ;(e = k[k.length - 2]), (f = k[k.length - 1])
          }
        }
        return (d.toString = b._path2string), (c.abs = Aa(d)), d
      }),
      Da = function (a, b, c, d) {
        return [a, b, c, d, c, d]
      },
      Ea = function (a, b, c, d, e, f) {
        var g = 1 / 3,
          h = 2 / 3
        return [
          g * a + h * c,
          g * b + h * d,
          g * e + h * c,
          g * f + h * d,
          e,
          f,
        ]
      },
      Fa = function (a, b, c, d, f, g, h, i, j, k) {
        var l,
          m = (120 * R) / 180,
          n = (R / 180) * (+f || 0),
          o = [],
          p = e(function (a, b, c) {
            var d = a * M.cos(c) - b * M.sin(c),
              e = a * M.sin(c) + b * M.cos(c)
            return { x: d, y: e }
          })
        if (k) (y = k[0]), (z = k[1]), (w = k[2]), (x = k[3])
        else {
          ;(l = p(a, b, -n)),
            (a = l.x),
            (b = l.y),
            (l = p(i, j, -n)),
            (i = l.x),
            (j = l.y)
          var q = (M.cos((R / 180) * f), M.sin((R / 180) * f), (a - i) / 2),
            r = (b - j) / 2,
            s = (q * q) / (c * c) + (r * r) / (d * d)
          s > 1 && ((s = M.sqrt(s)), (c = s * c), (d = s * d))
          var t = c * c,
            u = d * d,
            v =
              (g == h ? -1 : 1) *
              M.sqrt(
                P((t * u - t * r * r - u * q * q) / (t * r * r + u * q * q))
              ),
            w = (v * c * r) / d + (a + i) / 2,
            x = (v * -d * q) / c + (b + j) / 2,
            y = M.asin(((b - x) / d).toFixed(9)),
            z = M.asin(((j - x) / d).toFixed(9))
          ;(y = w > a ? R - y : y),
            (z = w > i ? R - z : z),
            0 > y && (y = 2 * R + y),
            0 > z && (z = 2 * R + z),
            h && y > z && (y -= 2 * R),
            !h && z > y && (z -= 2 * R)
        }
        var A = z - y
        if (P(A) > m) {
          var B = z,
            C = i,
            E = j
          ;(z = y + m * (h && z > y ? 1 : -1)),
            (i = w + c * M.cos(z)),
            (j = x + d * M.sin(z)),
            (o = Fa(i, j, c, d, f, 0, h, C, E, [z, B, w, x]))
        }
        A = z - y
        var F = M.cos(y),
          G = M.sin(y),
          H = M.cos(z),
          J = M.sin(z),
          K = M.tan(A / 4),
          L = (4 / 3) * c * K,
          N = (4 / 3) * d * K,
          O = [a, b],
          Q = [a + L * G, b - N * F],
          S = [i + L * J, j - N * H],
          T = [i, j]
        if (((Q[0] = 2 * O[0] - Q[0]), (Q[1] = 2 * O[1] - Q[1]), k))
          return [Q, S, T][D](o)
        o = [Q, S, T][D](o).join()[I](',')
        for (var U = [], V = 0, W = o.length; W > V; V++)
          U[V] = V % 2 ? p(o[V - 1], o[V], n).y : p(o[V], o[V + 1], n).x
        return U
      },
      Ga = function (a, b, c, d, e, f, g, h, i) {
        var j = 1 - i
        return {
          x:
            Q(j, 3) * a + 3 * Q(j, 2) * i * c + 3 * j * i * i * e + Q(i, 3) * g,
          y:
            Q(j, 3) * b + 3 * Q(j, 2) * i * d + 3 * j * i * i * f + Q(i, 3) * h,
        }
      },
      Ha = e(function (a, b, c, d, e, f, g, h) {
        var i,
          j = e - 2 * c + a - (g - 2 * e + c),
          k = 2 * (c - a) - 2 * (e - c),
          l = a - c,
          m = (-k + M.sqrt(k * k - 4 * j * l)) / 2 / j,
          n = (-k - M.sqrt(k * k - 4 * j * l)) / 2 / j,
          o = [b, h],
          p = [a, g]
        return (
          P(m) > '1e12' && (m = 0.5),
          P(n) > '1e12' && (n = 0.5),
          m > 0 &&
            1 > m &&
            ((i = Ga(a, b, c, d, e, f, g, h, m)), p.push(i.x), o.push(i.y)),
          n > 0 &&
            1 > n &&
            ((i = Ga(a, b, c, d, e, f, g, h, n)), p.push(i.x), o.push(i.y)),
          (j = f - 2 * d + b - (h - 2 * f + d)),
          (k = 2 * (d - b) - 2 * (f - d)),
          (l = b - d),
          (m = (-k + M.sqrt(k * k - 4 * j * l)) / 2 / j),
          (n = (-k - M.sqrt(k * k - 4 * j * l)) / 2 / j),
          P(m) > '1e12' && (m = 0.5),
          P(n) > '1e12' && (n = 0.5),
          m > 0 &&
            1 > m &&
            ((i = Ga(a, b, c, d, e, f, g, h, m)), p.push(i.x), o.push(i.y)),
          n > 0 &&
            1 > n &&
            ((i = Ga(a, b, c, d, e, f, g, h, n)), p.push(i.x), o.push(i.y)),
          {
            min: { x: O[C](0, p), y: O[C](0, o) },
            max: { x: N[C](0, p), y: N[C](0, o) },
          }
        )
      }),
      Ia = (b._path2curve = e(
        function (a, b) {
          var c = !b && ya(a)
          if (!b && c.curve) return Aa(c.curve)
          for (
            var d = Ca(a),
              e = b && Ca(b),
              f = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
              g = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
              h = function (a, b, c) {
                var d,
                  e,
                  f = { T: 1, Q: 1 }
                if (!a) return ['C', b.x, b.y, b.x, b.y, b.x, b.y]
                switch ((!(a[0] in f) && (b.qx = b.qy = null), a[0])) {
                  case 'M':
                    ;(b.X = a[1]), (b.Y = a[2])
                    break
                  case 'A':
                    a = ['C'][D](Fa[C](0, [b.x, b.y][D](a.slice(1))))
                    break
                  case 'S':
                    'C' == c || 'S' == c
                      ? ((d = 2 * b.x - b.bx), (e = 2 * b.y - b.by))
                      : ((d = b.x), (e = b.y)),
                      (a = ['C', d, e][D](a.slice(1)))
                    break
                  case 'T':
                    'Q' == c || 'T' == c
                      ? ((b.qx = 2 * b.x - b.qx), (b.qy = 2 * b.y - b.qy))
                      : ((b.qx = b.x), (b.qy = b.y)),
                      (a = ['C'][D](Ea(b.x, b.y, b.qx, b.qy, a[1], a[2])))
                    break
                  case 'Q':
                    ;(b.qx = a[1]),
                      (b.qy = a[2]),
                      (a = ['C'][D](Ea(b.x, b.y, a[1], a[2], a[3], a[4])))
                    break
                  case 'L':
                    a = ['C'][D](Da(b.x, b.y, a[1], a[2]))
                    break
                  case 'H':
                    a = ['C'][D](Da(b.x, b.y, a[1], b.y))
                    break
                  case 'V':
                    a = ['C'][D](Da(b.x, b.y, b.x, a[1]))
                    break
                  case 'Z':
                    a = ['C'][D](Da(b.x, b.y, b.X, b.Y))
                }
                return a
              },
              i = function (a, b) {
                if (a[b].length > 7) {
                  a[b].shift()
                  for (var c = a[b]; c.length; )
                    (k[b] = 'A'),
                      e && (l[b] = 'A'),
                      a.splice(b++, 0, ['C'][D](c.splice(0, 6)))
                  a.splice(b, 1), (p = N(d.length, (e && e.length) || 0))
                }
              },
              j = function (a, b, c, f, g) {
                a &&
                  b &&
                  'M' == a[g][0] &&
                  'M' != b[g][0] &&
                  (b.splice(g, 0, ['M', f.x, f.y]),
                  (c.bx = 0),
                  (c.by = 0),
                  (c.x = a[g][1]),
                  (c.y = a[g][2]),
                  (p = N(d.length, (e && e.length) || 0)))
              },
              k = [],
              l = [],
              m = '',
              n = '',
              o = 0,
              p = N(d.length, (e && e.length) || 0);
            p > o;
            o++
          ) {
            d[o] && (m = d[o][0]),
              'C' != m && ((k[o] = m), o && (n = k[o - 1])),
              (d[o] = h(d[o], f, n)),
              'A' != k[o] && 'C' == m && (k[o] = 'C'),
              i(d, o),
              e &&
                (e[o] && (m = e[o][0]),
                'C' != m && ((l[o] = m), o && (n = l[o - 1])),
                (e[o] = h(e[o], g, n)),
                'A' != l[o] && 'C' == m && (l[o] = 'C'),
                i(e, o)),
              j(d, e, f, g, o),
              j(e, d, g, f, o)
            var q = d[o],
              r = e && e[o],
              s = q.length,
              t = e && r.length
            ;(f.x = q[s - 2]),
              (f.y = q[s - 1]),
              (f.bx = $(q[s - 4]) || f.x),
              (f.by = $(q[s - 3]) || f.y),
              (g.bx = e && ($(r[t - 4]) || g.x)),
              (g.by = e && ($(r[t - 3]) || g.y)),
              (g.x = e && r[t - 2]),
              (g.y = e && r[t - 1])
          }
          return e || (c.curve = Aa(d)), e ? [d, e] : d
        },
        null,
        Aa
      )),
      Ja =
        ((b._parseDots = e(function (a) {
          for (var c = [], d = 0, e = a.length; e > d; d++) {
            var f = {},
              g = a[d].match(/^([^:]*):?([\d\.]*)/)
            if (((f.color = b.getRGB(g[1])), f.color.error)) return null
            ;(f.opacity = f.color.opacity),
              (f.color = f.color.hex),
              g[2] && (f.offset = g[2] + '%'),
              c.push(f)
          }
          for (d = 1, e = c.length - 1; e > d; d++)
            if (!c[d].offset) {
              for (
                var h = $(c[d - 1].offset || 0), i = 0, j = d + 1;
                e > j;
                j++
              )
                if (c[j].offset) {
                  i = c[j].offset
                  break
                }
              i || ((i = 100), (j = e)), (i = $(i))
              for (var k = (i - h) / (j - d + 1); j > d; d++)
                (h += k), (c[d].offset = h + '%')
            }
          return c
        })),
        (b._tear = function (a, b) {
          a == b.top && (b.top = a.prev),
            a == b.bottom && (b.bottom = a.next),
            a.next && (a.next.prev = a.prev),
            a.prev && (a.prev.next = a.next)
        })),
      Ka =
        ((b._tofront = function (a, b) {
          b.top !== a &&
            (Ja(a, b),
            (a.next = null),
            (a.prev = b.top),
            (b.top.next = a),
            (b.top = a))
        }),
        (b._toback = function (a, b) {
          b.bottom !== a &&
            (Ja(a, b),
            (a.next = b.bottom),
            (a.prev = null),
            (b.bottom.prev = a),
            (b.bottom = a))
        }),
        (b._insertafter = function (a, b, c) {
          Ja(a, c),
            b == c.top && (c.top = a),
            b.next && (b.next.prev = a),
            (a.next = b.next),
            (a.prev = b),
            (b.next = a)
        }),
        (b._insertbefore = function (a, b, c) {
          Ja(a, c),
            b == c.bottom && (c.bottom = a),
            b.prev && (b.prev.next = a),
            (a.prev = b.prev),
            (b.prev = a),
            (a.next = b)
        }),
        (b.toMatrix = function (a, b) {
          var c = za(a),
            d = {
              _: { transform: F },
              getBBox: function () {
                return c
              },
            }
          return La(d, b), d.matrix
        })),
      La =
        ((b.transformPath = function (a, b) {
          return pa(a, Ka(a, b))
        }),
        (b._extractTransform = function (a, c) {
          if (null == c) return a._.transform
          c = H(c).replace(/\.{3}|\u2026/g, a._.transform || F)
          var d = b.parseTransformString(c),
            e = 0,
            f = 0,
            g = 0,
            h = 1,
            i = 1,
            j = a._,
            k = new n()
          if (((j.transform = d || []), d))
            for (var l = 0, m = d.length; m > l; l++) {
              var o,
                p,
                q,
                r,
                s,
                t = d[l],
                u = t.length,
                v = H(t[0]).toLowerCase(),
                w = t[0] != v,
                x = w ? k.invert() : 0
              't' == v && 3 == u
                ? w
                  ? ((o = x.x(0, 0)),
                    (p = x.y(0, 0)),
                    (q = x.x(t[1], t[2])),
                    (r = x.y(t[1], t[2])),
                    k.translate(q - o, r - p))
                  : k.translate(t[1], t[2])
                : 'r' == v
                ? 2 == u
                  ? ((s = s || a.getBBox(1)),
                    k.rotate(t[1], s.x + s.width / 2, s.y + s.height / 2),
                    (e += t[1]))
                  : 4 == u &&
                    (w
                      ? ((q = x.x(t[2], t[3])),
                        (r = x.y(t[2], t[3])),
                        k.rotate(t[1], q, r))
                      : k.rotate(t[1], t[2], t[3]),
                    (e += t[1]))
                : 's' == v
                ? 2 == u || 3 == u
                  ? ((s = s || a.getBBox(1)),
                    k.scale(
                      t[1],
                      t[u - 1],
                      s.x + s.width / 2,
                      s.y + s.height / 2
                    ),
                    (h *= t[1]),
                    (i *= t[u - 1]))
                  : 5 == u &&
                    (w
                      ? ((q = x.x(t[3], t[4])),
                        (r = x.y(t[3], t[4])),
                        k.scale(t[1], t[2], q, r))
                      : k.scale(t[1], t[2], t[3], t[4]),
                    (h *= t[1]),
                    (i *= t[2]))
                : 'm' == v &&
                  7 == u &&
                  k.add(t[1], t[2], t[3], t[4], t[5], t[6]),
                (j.dirtyT = 1),
                (a.matrix = k)
            }
          ;(a.matrix = k),
            (j.sx = h),
            (j.sy = i),
            (j.deg = e),
            (j.dx = f = k.e),
            (j.dy = g = k.f),
            1 == h && 1 == i && !e && j.bbox
              ? ((j.bbox.x += +f), (j.bbox.y += +g))
              : (j.dirtyT = 1)
        })),
      Ma = function (a) {
        var b = a[0]
        switch (b.toLowerCase()) {
          case 't':
            return [b, 0, 0]
          case 'm':
            return [b, 1, 0, 0, 1, 0, 0]
          case 'r':
            return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0]
          case 's':
            return 5 == a.length
              ? [b, 1, 1, a[3], a[4]]
              : 3 == a.length
              ? [b, 1, 1]
              : [b, 1]
        }
      },
      Na = (b._equaliseTransform = function (a, c) {
        ;(c = H(c).replace(/\.{3}|\u2026/g, a)),
          (a = b.parseTransformString(a) || []),
          (c = b.parseTransformString(c) || [])
        for (
          var d, e, f, g, h = N(a.length, c.length), i = [], j = [], k = 0;
          h > k;
          k++
        ) {
          if (
            ((f = a[k] || Ma(c[k])),
            (g = c[k] || Ma(f)),
            f[0] != g[0] ||
              ('r' == f[0].toLowerCase() && (f[2] != g[2] || f[3] != g[3])) ||
              ('s' == f[0].toLowerCase() && (f[3] != g[3] || f[4] != g[4])))
          )
            return
          for (
            i[k] = [], j[k] = [], d = 0, e = N(f.length, g.length);
            e > d;
            d++
          )
            d in f && (i[k][d] = f[d]), d in g && (j[k][d] = g[d])
        }
        return { from: i, to: j }
      })
    ;(b._getContainer = function (a, c, d, e) {
      var f
      return (
        (f = null != e || b.is(a, 'object') ? a : z.doc.getElementById(a)),
        null != f
          ? f.tagName
            ? null == c
              ? {
                  container: f,
                  width: f.style.pixelWidth || f.offsetWidth,
                  height: f.style.pixelHeight || f.offsetHeight,
                }
              : { container: f, width: c, height: d }
            : { container: 1, x: a, y: c, width: d, height: e }
          : void 0
      )
    }),
      (b.pathToRelative = Ba),
      (b._engine = {}),
      (b.path2curve = Ia),
      (b.matrix = function (a, b, c, d, e, f) {
        return new n(a, b, c, d, e, f)
      }),
      (function (a) {
        function c(a) {
          return a[0] * a[0] + a[1] * a[1]
        }
        function d(a) {
          var b = M.sqrt(c(a))
          a[0] && (a[0] /= b), a[1] && (a[1] /= b)
        }
        ;(a.add = function (a, b, c, d, e, f) {
          var g,
            h,
            i,
            j,
            k = [[], [], []],
            l = [
              [this.a, this.c, this.e],
              [this.b, this.d, this.f],
              [0, 0, 1],
            ],
            m = [
              [a, c, e],
              [b, d, f],
              [0, 0, 1],
            ]
          for (
            a &&
              a instanceof n &&
              (m = [
                [a.a, a.c, a.e],
                [a.b, a.d, a.f],
                [0, 0, 1],
              ]),
              g = 0;
            3 > g;
            g++
          )
            for (h = 0; 3 > h; h++) {
              for (j = 0, i = 0; 3 > i; i++) j += l[g][i] * m[i][h]
              k[g][h] = j
            }
          ;(this.a = k[0][0]),
            (this.b = k[1][0]),
            (this.c = k[0][1]),
            (this.d = k[1][1]),
            (this.e = k[0][2]),
            (this.f = k[1][2])
        }),
          (a.invert = function () {
            var a = this,
              b = a.a * a.d - a.b * a.c
            return new n(
              a.d / b,
              -a.b / b,
              -a.c / b,
              a.a / b,
              (a.c * a.f - a.d * a.e) / b,
              (a.b * a.e - a.a * a.f) / b
            )
          }),
          (a.clone = function () {
            return new n(this.a, this.b, this.c, this.d, this.e, this.f)
          }),
          (a.translate = function (a, b) {
            this.add(1, 0, 0, 1, a, b)
          }),
          (a.scale = function (a, b, c, d) {
            null == b && (b = a),
              (c || d) && this.add(1, 0, 0, 1, c, d),
              this.add(a, 0, 0, b, 0, 0),
              (c || d) && this.add(1, 0, 0, 1, -c, -d)
          }),
          (a.rotate = function (a, c, d) {
            ;(a = b.rad(a)), (c = c || 0), (d = d || 0)
            var e = +M.cos(a).toFixed(9),
              f = +M.sin(a).toFixed(9)
            this.add(e, f, -f, e, c, d), this.add(1, 0, 0, 1, -c, -d)
          }),
          (a.x = function (a, b) {
            return a * this.a + b * this.c + this.e
          }),
          (a.y = function (a, b) {
            return a * this.b + b * this.d + this.f
          }),
          (a.get = function (a) {
            return +this[H.fromCharCode(97 + a)].toFixed(4)
          }),
          (a.toString = function () {
            return b.svg
              ? 'matrix(' +
                  [
                    this.get(0),
                    this.get(1),
                    this.get(2),
                    this.get(3),
                    this.get(4),
                    this.get(5),
                  ].join() +
                  ')'
              : [
                  this.get(0),
                  this.get(2),
                  this.get(1),
                  this.get(3),
                  0,
                  0,
                ].join()
          }),
          (a.toFilter = function () {
            return (
              'progid:DXImageTransform.Microsoft.Matrix(M11=' +
              this.get(0) +
              ', M12=' +
              this.get(2) +
              ', M21=' +
              this.get(1) +
              ', M22=' +
              this.get(3) +
              ', Dx=' +
              this.get(4) +
              ', Dy=' +
              this.get(5) +
              ", sizingmethod='auto expand')"
            )
          }),
          (a.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)]
          }),
          (a.split = function () {
            var a = {}
            ;(a.dx = this.e), (a.dy = this.f)
            var e = [
              [this.a, this.c],
              [this.b, this.d],
            ]
            ;(a.scalex = M.sqrt(c(e[0]))),
              d(e[0]),
              (a.shear = e[0][0] * e[1][0] + e[0][1] * e[1][1]),
              (e[1] = [
                e[1][0] - e[0][0] * a.shear,
                e[1][1] - e[0][1] * a.shear,
              ]),
              (a.scaley = M.sqrt(c(e[1]))),
              d(e[1]),
              (a.shear /= a.scaley)
            var f = -e[0][1],
              g = e[1][1]
            return (
              0 > g
                ? ((a.rotate = b.deg(M.acos(g))),
                  0 > f && (a.rotate = 360 - a.rotate))
                : (a.rotate = b.deg(M.asin(f))),
              (a.isSimple = !(
                +a.shear.toFixed(9) ||
                (a.scalex.toFixed(9) != a.scaley.toFixed(9) && a.rotate)
              )),
              (a.isSuperSimple =
                !+a.shear.toFixed(9) &&
                a.scalex.toFixed(9) == a.scaley.toFixed(9) &&
                !a.rotate),
              (a.noRotation = !+a.shear.toFixed(9) && !a.rotate),
              a
            )
          }),
          (a.toTransformString = function (a) {
            var b = a || this[I]()
            return b.isSimple
              ? ((b.scalex = +b.scalex.toFixed(4)),
                (b.scaley = +b.scaley.toFixed(4)),
                (b.rotate = +b.rotate.toFixed(4)),
                (b.dx || b.dy ? 't' + [b.dx, b.dy] : F) +
                  (1 != b.scalex || 1 != b.scaley
                    ? 's' + [b.scalex, b.scaley, 0, 0]
                    : F) +
                  (b.rotate ? 'r' + [b.rotate, 0, 0] : F))
              : 'm' +
                  [
                    this.get(0),
                    this.get(1),
                    this.get(2),
                    this.get(3),
                    this.get(4),
                    this.get(5),
                  ]
          })
      })(n.prototype)
    for (
      var Oa = function () {
          this.returnValue = !1
        },
        Pa = function () {
          return this.originalEvent.preventDefault()
        },
        Qa = function () {
          this.cancelBubble = !0
        },
        Ra = function () {
          return this.originalEvent.stopPropagation()
        },
        Sa = function (a) {
          var b = z.doc.documentElement.scrollTop || z.doc.body.scrollTop,
            c = z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft
          return { x: a.clientX + c, y: a.clientY + b }
        },
        Ta = (function () {
          return z.doc.addEventListener
            ? function (a, b, c, d) {
                var e = function (a) {
                  var b = Sa(a)
                  return c.call(d, a, b.x, b.y)
                }
                if ((a.addEventListener(b, e, !1), E && K[b])) {
                  var f = function (b) {
                    for (
                      var e = Sa(b),
                        f = b,
                        g = 0,
                        h = b.targetTouches && b.targetTouches.length;
                      h > g;
                      g++
                    )
                      if (b.targetTouches[g].target == a) {
                        ;(b = b.targetTouches[g]),
                          (b.originalEvent = f),
                          (b.preventDefault = Pa),
                          (b.stopPropagation = Ra)
                        break
                      }
                    return c.call(d, b, e.x, e.y)
                  }
                  a.addEventListener(K[b], f, !1)
                }
                return function () {
                  return (
                    a.removeEventListener(b, e, !1),
                    E && K[b] && a.removeEventListener(K[b], f, !1),
                    !0
                  )
                }
              }
            : z.doc.attachEvent
            ? function (a, b, c, d) {
                var e = function (a) {
                  a = a || z.win.event
                  var b =
                      z.doc.documentElement.scrollTop || z.doc.body.scrollTop,
                    e =
                      z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft,
                    f = a.clientX + e,
                    g = a.clientY + b
                  return (
                    (a.preventDefault = a.preventDefault || Oa),
                    (a.stopPropagation = a.stopPropagation || Qa),
                    c.call(d, a, f, g)
                  )
                }
                a.attachEvent('on' + b, e)
                var f = function () {
                  return a.detachEvent('on' + b, e), !0
                }
                return f
              }
            : void 0
        })(),
        Ua = [],
        Va = function (b) {
          for (
            var c,
              d = b.clientX,
              e = b.clientY,
              f = z.doc.documentElement.scrollTop || z.doc.body.scrollTop,
              g = z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft,
              h = Ua.length;
            h--;

          ) {
            if (((c = Ua[h]), E && b.touches)) {
              for (var i, j = b.touches.length; j--; )
                if (((i = b.touches[j]), i.identifier == c.el._drag.id)) {
                  ;(d = i.clientX),
                    (e = i.clientY),
                    (b.originalEvent ? b.originalEvent : b).preventDefault()
                  break
                }
            } else b.preventDefault()
            var k,
              l = c.el.node,
              m = l.nextSibling,
              n = l.parentNode,
              o = l.style.display
            z.win.opera && n.removeChild(l),
              (l.style.display = 'none'),
              (k = c.el.paper.getElementByPoint(d, e)),
              (l.style.display = o),
              z.win.opera && (m ? n.insertBefore(l, m) : n.appendChild(l)),
              k && a('raphael.drag.over.' + c.el.id, c.el, k),
              (d += g),
              (e += f),
              a(
                'raphael.drag.move.' + c.el.id,
                c.move_scope || c.el,
                d - c.el._drag.x,
                e - c.el._drag.y,
                d,
                e,
                b
              )
          }
        },
        Wa = function (c) {
          b.unmousemove(Va).unmouseup(Wa)
          for (var d, e = Ua.length; e--; )
            (d = Ua[e]),
              (d.el._drag = {}),
              a(
                'raphael.drag.end.' + d.el.id,
                d.end_scope || d.start_scope || d.move_scope || d.el,
                c
              )
          Ua = []
        },
        Xa = (b.el = {}),
        Ya = J.length;
      Ya--;

    )
      !(function (a) {
        ;(b[a] = Xa[a] =
          function (c, d) {
            return (
              b.is(c, 'function') &&
                ((this.events = this.events || []),
                this.events.push({
                  name: a,
                  f: c,
                  unbind: Ta(this.shape || this.node || z.doc, a, c, d || this),
                })),
              this
            )
          }),
          (b['un' + a] = Xa['un' + a] =
            function (c) {
              for (var d = this.events || [], e = d.length; e--; )
                d[e].name != a ||
                  (!b.is(c, 'undefined') && d[e].f != c) ||
                  (d[e].unbind(),
                  d.splice(e, 1),
                  !d.length && delete this.events)
              return this
            })
      })(J[Ya])
    ;(Xa.data = function (c, d) {
      var e = (ja[this.id] = ja[this.id] || {})
      if (0 == arguments.length) return e
      if (1 == arguments.length) {
        if (b.is(c, 'object')) {
          for (var f in c) c[y](f) && this.data(f, c[f])
          return this
        }
        return a('raphael.data.get.' + this.id, this, e[c], c), e[c]
      }
      return (e[c] = d), a('raphael.data.set.' + this.id, this, d, c), this
    }),
      (Xa.removeData = function (a) {
        return (
          null == a ? (ja[this.id] = {}) : ja[this.id] && delete ja[this.id][a],
          this
        )
      }),
      (Xa.getData = function () {
        return c(ja[this.id] || {})
      }),
      (Xa.hover = function (a, b, c, d) {
        return this.mouseover(a, c).mouseout(b, d || c)
      }),
      (Xa.unhover = function (a, b) {
        return this.unmouseover(a).unmouseout(b)
      })
    var Za = []
    ;(Xa.drag = function (c, d, e, f, g, h) {
      function i(i) {
        ;(i.originalEvent || i).preventDefault()
        var j = i.clientX,
          k = i.clientY,
          l = z.doc.documentElement.scrollTop || z.doc.body.scrollTop,
          m = z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft
        if (((this._drag.id = i.identifier), E && i.touches))
          for (var n, o = i.touches.length; o--; )
            if (
              ((n = i.touches[o]),
              (this._drag.id = n.identifier),
              n.identifier == this._drag.id)
            ) {
              ;(j = n.clientX), (k = n.clientY)
              break
            }
        ;(this._drag.x = j + m),
          (this._drag.y = k + l),
          !Ua.length && b.mousemove(Va).mouseup(Wa),
          Ua.push({ el: this, move_scope: f, start_scope: g, end_scope: h }),
          d && a.on('raphael.drag.start.' + this.id, d),
          c && a.on('raphael.drag.move.' + this.id, c),
          e && a.on('raphael.drag.end.' + this.id, e),
          a(
            'raphael.drag.start.' + this.id,
            g || f || this,
            i.clientX + m,
            i.clientY + l,
            i
          )
      }
      return (
        (this._drag = {}),
        Za.push({ el: this, start: i }),
        this.mousedown(i),
        this
      )
    }),
      (Xa.onDragOver = function (b) {
        b
          ? a.on('raphael.drag.over.' + this.id, b)
          : a.unbind('raphael.drag.over.' + this.id)
      }),
      (Xa.undrag = function () {
        for (var c = Za.length; c--; )
          Za[c].el == this &&
            (this.unmousedown(Za[c].start),
            Za.splice(c, 1),
            a.unbind('raphael.drag.*.' + this.id))
        !Za.length && b.unmousemove(Va).unmouseup(Wa), (Ua = [])
      }),
      (u.circle = function (a, c, d) {
        var e = b._engine.circle(this, a || 0, c || 0, d || 0)
        return this.__set__ && this.__set__.push(e), e
      }),
      (u.rect = function (a, c, d, e, f) {
        var g = b._engine.rect(this, a || 0, c || 0, d || 0, e || 0, f || 0)
        return this.__set__ && this.__set__.push(g), g
      }),
      (u.ellipse = function (a, c, d, e) {
        var f = b._engine.ellipse(this, a || 0, c || 0, d || 0, e || 0)
        return this.__set__ && this.__set__.push(f), f
      }),
      (u.path = function (a) {
        a && !b.is(a, T) && !b.is(a[0], U) && (a += F)
        var c = b._engine.path(b.format[C](b, arguments), this)
        return this.__set__ && this.__set__.push(c), c
      }),
      (u.image = function (a, c, d, e, f) {
        var g = b._engine.image(
          this,
          a || 'about:blank',
          c || 0,
          d || 0,
          e || 0,
          f || 0
        )
        return this.__set__ && this.__set__.push(g), g
      }),
      (u.text = function (a, c, d) {
        var e = b._engine.text(this, a || 0, c || 0, H(d))
        return this.__set__ && this.__set__.push(e), e
      }),
      (u.set = function (a) {
        !b.is(a, 'array') &&
          (a = Array.prototype.splice.call(arguments, 0, arguments.length))
        var c = new jb(a)
        return (
          this.__set__ && this.__set__.push(c),
          (c.paper = this),
          (c.type = 'set'),
          c
        )
      }),
      (u.setStart = function (a) {
        this.__set__ = a || this.set()
      }),
      (u.setFinish = function (a) {
        var b = this.__set__
        return delete this.__set__, b
      }),
      (u.getSize = function () {
        var a = this.canvas.parentNode
        return { width: a.offsetWidth, height: a.offsetHeight }
      }),
      (u.setSize = function (a, c) {
        return b._engine.setSize.call(this, a, c)
      }),
      (u.setViewBox = function (a, c, d, e, f) {
        return b._engine.setViewBox.call(this, a, c, d, e, f)
      }),
      (u.top = u.bottom = null),
      (u.raphael = b)
    var $a = function (a) {
      var b = a.getBoundingClientRect(),
        c = a.ownerDocument,
        d = c.body,
        e = c.documentElement,
        f = e.clientTop || d.clientTop || 0,
        g = e.clientLeft || d.clientLeft || 0,
        h = b.top + (z.win.pageYOffset || e.scrollTop || d.scrollTop) - f,
        i = b.left + (z.win.pageXOffset || e.scrollLeft || d.scrollLeft) - g
      return { y: h, x: i }
    }
    ;(u.getElementByPoint = function (a, b) {
      var c = this,
        d = c.canvas,
        e = z.doc.elementFromPoint(a, b)
      if (z.win.opera && 'svg' == e.tagName) {
        var f = $a(d),
          g = d.createSVGRect()
        ;(g.x = a - f.x), (g.y = b - f.y), (g.width = g.height = 1)
        var h = d.getIntersectionList(g, null)
        h.length && (e = h[h.length - 1])
      }
      if (!e) return null
      for (; e.parentNode && e != d.parentNode && !e.raphael; ) e = e.parentNode
      return (
        e == c.canvas.parentNode && (e = d),
        (e = e && e.raphael ? c.getById(e.raphaelid) : null)
      )
    }),
      (u.getElementsByBBox = function (a) {
        var c = this.set()
        return (
          this.forEach(function (d) {
            b.isBBoxIntersect(d.getBBox(), a) && c.push(d)
          }),
          c
        )
      }),
      (u.getById = function (a) {
        for (var b = this.bottom; b; ) {
          if (b.id == a) return b
          b = b.next
        }
        return null
      }),
      (u.forEach = function (a, b) {
        for (var c = this.bottom; c; ) {
          if (a.call(b, c) === !1) return this
          c = c.next
        }
        return this
      }),
      (u.getElementsByPoint = function (a, b) {
        var c = this.set()
        return (
          this.forEach(function (d) {
            d.isPointInside(a, b) && c.push(d)
          }),
          c
        )
      }),
      (Xa.isPointInside = function (a, c) {
        var d = (this.realPath = oa[this.type](this))
        return (
          this.attr('transform') &&
            this.attr('transform').length &&
            (d = b.transformPath(d, this.attr('transform'))),
          b.isPointInsidePath(d, a, c)
        )
      }),
      (Xa.getBBox = function (a) {
        if (this.removed) return {}
        var b = this._
        return a
          ? ((b.dirty || !b.bboxwt) &&
              ((this.realPath = oa[this.type](this)),
              (b.bboxwt = za(this.realPath)),
              (b.bboxwt.toString = o),
              (b.dirty = 0)),
            b.bboxwt)
          : ((b.dirty || b.dirtyT || !b.bbox) &&
              ((b.dirty || !this.realPath) &&
                ((b.bboxwt = 0), (this.realPath = oa[this.type](this))),
              (b.bbox = za(pa(this.realPath, this.matrix))),
              (b.bbox.toString = o),
              (b.dirty = b.dirtyT = 0)),
            b.bbox)
      }),
      (Xa.clone = function () {
        if (this.removed) return null
        var a = this.paper[this.type]().attr(this.attr())
        return this.__set__ && this.__set__.push(a), a
      }),
      (Xa.glow = function (a) {
        if ('text' == this.type) return null
        a = a || {}
        var b = {
            width: (a.width || 10) + (+this.attr('stroke-width') || 1),
            fill: a.fill || !1,
            opacity: null == a.opacity ? 0.5 : a.opacity,
            offsetx: a.offsetx || 0,
            offsety: a.offsety || 0,
            color: a.color || '#000',
          },
          c = b.width / 2,
          d = this.paper,
          e = d.set(),
          f = this.realPath || oa[this.type](this)
        f = this.matrix ? pa(f, this.matrix) : f
        for (var g = 1; c + 1 > g; g++)
          e.push(
            d.path(f).attr({
              stroke: b.color,
              fill: b.fill ? b.color : 'none',
              'stroke-linejoin': 'round',
              'stroke-linecap': 'round',
              'stroke-width': +((b.width / c) * g).toFixed(3),
              opacity: +(b.opacity / c).toFixed(3),
            })
          )
        return e.insertBefore(this).translate(b.offsetx, b.offsety)
      })
    var _a = function (a, c, d, e, f, g, h, k, l) {
        return null == l
          ? i(a, c, d, e, f, g, h, k)
          : b.findDotsAtSegment(
              a,
              c,
              d,
              e,
              f,
              g,
              h,
              k,
              j(a, c, d, e, f, g, h, k, l)
            )
      },
      ab = function (a, c) {
        return function (d, e, f) {
          d = Ia(d)
          for (
            var g, h, i, j, k, l = '', m = {}, n = 0, o = 0, p = d.length;
            p > o;
            o++
          ) {
            if (((i = d[o]), 'M' == i[0])) (g = +i[1]), (h = +i[2])
            else {
              if (
                ((j = _a(g, h, i[1], i[2], i[3], i[4], i[5], i[6])), n + j > e)
              ) {
                if (c && !m.start) {
                  if (
                    ((k = _a(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n)),
                    (l += ['C' + k.start.x, k.start.y, k.m.x, k.m.y, k.x, k.y]),
                    f)
                  )
                    return l
                  ;(m.start = l),
                    (l = [
                      'M' + k.x,
                      k.y + 'C' + k.n.x,
                      k.n.y,
                      k.end.x,
                      k.end.y,
                      i[5],
                      i[6],
                    ].join()),
                    (n += j),
                    (g = +i[5]),
                    (h = +i[6])
                  continue
                }
                if (!a && !c)
                  return (
                    (k = _a(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n)),
                    { x: k.x, y: k.y, alpha: k.alpha }
                  )
              }
              ;(n += j), (g = +i[5]), (h = +i[6])
            }
            l += i.shift() + i
          }
          return (
            (m.end = l),
            (k = a
              ? n
              : c
              ? m
              : b.findDotsAtSegment(
                  g,
                  h,
                  i[0],
                  i[1],
                  i[2],
                  i[3],
                  i[4],
                  i[5],
                  1
                )),
            k.alpha && (k = { x: k.x, y: k.y, alpha: k.alpha }),
            k
          )
        }
      },
      bb = ab(1),
      cb = ab(),
      db = ab(0, 1)
    ;(b.getTotalLength = bb),
      (b.getPointAtLength = cb),
      (b.getSubpath = function (a, b, c) {
        if (this.getTotalLength(a) - c < 1e-6) return db(a, b).end
        var d = db(a, c, 1)
        return b ? db(d, b).end : d
      }),
      (Xa.getTotalLength = function () {
        var a = this.getPath()
        if (a)
          return this.node.getTotalLength ? this.node.getTotalLength() : bb(a)
      }),
      (Xa.getPointAtLength = function (a) {
        var b = this.getPath()
        if (b) return cb(b, a)
      }),
      (Xa.getPath = function () {
        var a,
          c = b._getPath[this.type]
        if ('text' != this.type && 'set' != this.type)
          return c && (a = c(this)), a
      }),
      (Xa.getSubpath = function (a, c) {
        var d = this.getPath()
        if (d) return b.getSubpath(d, a, c)
      })
    var eb = (b.easing_formulas = {
      linear: function (a) {
        return a
      },
      '<': function (a) {
        return Q(a, 1.7)
      },
      '>': function (a) {
        return Q(a, 0.48)
      },
      '<>': function (a) {
        var b = 0.48 - a / 1.04,
          c = M.sqrt(0.1734 + b * b),
          d = c - b,
          e = Q(P(d), 1 / 3) * (0 > d ? -1 : 1),
          f = -c - b,
          g = Q(P(f), 1 / 3) * (0 > f ? -1 : 1),
          h = e + g + 0.5
        return 3 * (1 - h) * h * h + h * h * h
      },
      backIn: function (a) {
        var b = 1.70158
        return a * a * ((b + 1) * a - b)
      },
      backOut: function (a) {
        a -= 1
        var b = 1.70158
        return a * a * ((b + 1) * a + b) + 1
      },
      elastic: function (a) {
        return a == !!a
          ? a
          : Q(2, -10 * a) * M.sin((2 * (a - 0.075) * R) / 0.3) + 1
      },
      bounce: function (a) {
        var b,
          c = 7.5625,
          d = 2.75
        return (
          1 / d > a
            ? (b = c * a * a)
            : 2 / d > a
            ? ((a -= 1.5 / d), (b = c * a * a + 0.75))
            : 2.5 / d > a
            ? ((a -= 2.25 / d), (b = c * a * a + 0.9375))
            : ((a -= 2.625 / d), (b = c * a * a + 0.984375)),
          b
        )
      },
    })
    ;(eb.easeIn = eb['ease-in'] = eb['<']),
      (eb.easeOut = eb['ease-out'] = eb['>']),
      (eb.easeInOut = eb['ease-in-out'] = eb['<>']),
      (eb['back-in'] = eb.backIn),
      (eb['back-out'] = eb.backOut)
    var fb = [],
      gb =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (a) {
          setTimeout(a, 16)
        },
      hb = function () {
        for (var c = +new Date(), d = 0; d < fb.length; d++) {
          var e = fb[d]
          if (!e.el.removed && !e.paused) {
            var f,
              g,
              h = c - e.start,
              i = e.ms,
              j = e.easing,
              k = e.from,
              l = e.diff,
              m = e.to,
              n = (e.t, e.el),
              o = {},
              p = {}
            if (
              (e.initstatus
                ? ((h =
                    ((e.initstatus * e.anim.top - e.prev) /
                      (e.percent - e.prev)) *
                    i),
                  (e.status = e.initstatus),
                  delete e.initstatus,
                  e.stop && fb.splice(d--, 1))
                : (e.status =
                    (e.prev + (e.percent - e.prev) * (h / i)) / e.anim.top),
              !(0 > h))
            )
              if (i > h) {
                var q = j(h / i)
                for (var s in k)
                  if (k[y](s)) {
                    switch (ca[s]) {
                      case S:
                        f = +k[s] + q * i * l[s]
                        break
                      case 'colour':
                        f =
                          'rgb(' +
                          [
                            ib(Z(k[s].r + q * i * l[s].r)),
                            ib(Z(k[s].g + q * i * l[s].g)),
                            ib(Z(k[s].b + q * i * l[s].b)),
                          ].join(',') +
                          ')'
                        break
                      case 'path':
                        f = []
                        for (var t = 0, u = k[s].length; u > t; t++) {
                          f[t] = [k[s][t][0]]
                          for (var v = 1, w = k[s][t].length; w > v; v++)
                            f[t][v] = +k[s][t][v] + q * i * l[s][t][v]
                          f[t] = f[t].join(G)
                        }
                        f = f.join(G)
                        break
                      case 'transform':
                        if (l[s].real)
                          for (f = [], t = 0, u = k[s].length; u > t; t++)
                            for (
                              f[t] = [k[s][t][0]], v = 1, w = k[s][t].length;
                              w > v;
                              v++
                            )
                              f[t][v] = k[s][t][v] + q * i * l[s][t][v]
                        else {
                          var x = function (a) {
                            return +k[s][a] + q * i * l[s][a]
                          }
                          f = [['m', x(0), x(1), x(2), x(3), x(4), x(5)]]
                        }
                        break
                      case 'csv':
                        if ('clip-rect' == s)
                          for (f = [], t = 4; t--; )
                            f[t] = +k[s][t] + q * i * l[s][t]
                        break
                      default:
                        var z = [][D](k[s])
                        for (
                          f = [], t = n.paper.customAttributes[s].length;
                          t--;

                        )
                          f[t] = +z[t] + q * i * l[s][t]
                    }
                    o[s] = f
                  }
                n.attr(o),
                  (function (b, c, d) {
                    setTimeout(function () {
                      a('raphael.anim.frame.' + b, c, d)
                    })
                  })(n.id, n, e.anim)
              } else {
                if (
                  ((function (c, d, e) {
                    setTimeout(function () {
                      a('raphael.anim.frame.' + d.id, d, e),
                        a('raphael.anim.finish.' + d.id, d, e),
                        b.is(c, 'function') && c.call(d)
                    })
                  })(e.callback, n, e.anim),
                  n.attr(m),
                  fb.splice(d--, 1),
                  e.repeat > 1 && !e.next)
                ) {
                  for (g in m) m[y](g) && (p[g] = e.totalOrigin[g])
                  e.el.attr(p),
                    r(
                      e.anim,
                      e.el,
                      e.anim.percents[0],
                      null,
                      e.totalOrigin,
                      e.repeat - 1
                    )
                }
                e.next &&
                  !e.stop &&
                  r(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat)
              }
          }
        }
        fb.length && gb(hb)
      },
      ib = function (a) {
        return a > 255 ? 255 : 0 > a ? 0 : a
      }
    ;(Xa.animateWith = function (a, c, d, e, f, g) {
      var h = this
      if (h.removed) return g && g.call(h), h
      var i = d instanceof q ? d : b.animation(d, e, f, g)
      r(i, h, i.percents[0], null, h.attr())
      for (var j = 0, k = fb.length; k > j; j++)
        if (fb[j].anim == c && fb[j].el == a) {
          fb[k - 1].start = fb[j].start
          break
        }
      return h
    }),
      (Xa.onAnimation = function (b) {
        return (
          b
            ? a.on('raphael.anim.frame.' + this.id, b)
            : a.unbind('raphael.anim.frame.' + this.id),
          this
        )
      }),
      (q.prototype.delay = function (a) {
        var b = new q(this.anim, this.ms)
        return (b.times = this.times), (b.del = +a || 0), b
      }),
      (q.prototype.repeat = function (a) {
        var b = new q(this.anim, this.ms)
        return (b.del = this.del), (b.times = M.floor(N(a, 0)) || 1), b
      }),
      (b.animation = function (a, c, d, e) {
        if (a instanceof q) return a
        ;(b.is(d, 'function') || !d) && ((e = e || d || null), (d = null)),
          (a = Object(a)),
          (c = +c || 0)
        var f,
          g,
          h = {}
        for (g in a)
          a[y](g) && $(g) != g && $(g) + '%' != g && ((f = !0), (h[g] = a[g]))
        if (f)
          return (
            d && (h.easing = d), e && (h.callback = e), new q({ 100: h }, c)
          )
        if (e) {
          var i = 0
          for (var j in a) {
            var k = _(j)
            a[y](j) && k > i && (i = k)
          }
          ;(i += '%'), !a[i].callback && (a[i].callback = e)
        }
        return new q(a, c)
      }),
      (Xa.animate = function (a, c, d, e) {
        var f = this
        if (f.removed) return e && e.call(f), f
        var g = a instanceof q ? a : b.animation(a, c, d, e)
        return r(g, f, g.percents[0], null, f.attr()), f
      }),
      (Xa.setTime = function (a, b) {
        return a && null != b && this.status(a, O(b, a.ms) / a.ms), this
      }),
      (Xa.status = function (a, b) {
        var c,
          d,
          e = [],
          f = 0
        if (null != b) return r(a, this, -1, O(b, 1)), this
        for (c = fb.length; c > f; f++)
          if (((d = fb[f]), d.el.id == this.id && (!a || d.anim == a))) {
            if (a) return d.status
            e.push({ anim: d.anim, status: d.status })
          }
        return a ? 0 : e
      }),
      (Xa.pause = function (b) {
        for (var c = 0; c < fb.length; c++)
          fb[c].el.id != this.id ||
            (b && fb[c].anim != b) ||
            (a('raphael.anim.pause.' + this.id, this, fb[c].anim) !== !1 &&
              (fb[c].paused = !0))
        return this
      }),
      (Xa.resume = function (b) {
        for (var c = 0; c < fb.length; c++)
          if (fb[c].el.id == this.id && (!b || fb[c].anim == b)) {
            var d = fb[c]
            a('raphael.anim.resume.' + this.id, this, d.anim) !== !1 &&
              (delete d.paused, this.status(d.anim, d.status))
          }
        return this
      }),
      (Xa.stop = function (b) {
        for (var c = 0; c < fb.length; c++)
          fb[c].el.id != this.id ||
            (b && fb[c].anim != b) ||
            (a('raphael.anim.stop.' + this.id, this, fb[c].anim) !== !1 &&
              fb.splice(c--, 1))
        return this
      }),
      a.on('raphael.remove', s),
      a.on('raphael.clear', s),
      (Xa.toString = function () {
        return 'Raphaël’s object'
      })
    var jb = function (a) {
        if (((this.items = []), (this.length = 0), (this.type = 'set'), a))
          for (var b = 0, c = a.length; c > b; b++)
            !a[b] ||
              (a[b].constructor != Xa.constructor && a[b].constructor != jb) ||
              ((this[this.items.length] = this.items[this.items.length] = a[b]),
              this.length++)
      },
      kb = jb.prototype
    ;(kb.push = function () {
      for (var a, b, c = 0, d = arguments.length; d > c; c++)
        (a = arguments[c]),
          !a ||
            (a.constructor != Xa.constructor && a.constructor != jb) ||
            ((b = this.items.length),
            (this[b] = this.items[b] = a),
            this.length++)
      return this
    }),
      (kb.pop = function () {
        return this.length && delete this[this.length--], this.items.pop()
      }),
      (kb.forEach = function (a, b) {
        for (var c = 0, d = this.items.length; d > c; c++)
          if (a.call(b, this.items[c], c) === !1) return this
        return this
      })
    for (var lb in Xa)
      Xa[y](lb) &&
        (kb[lb] = (function (a) {
          return function () {
            var b = arguments
            return this.forEach(function (c) {
              c[a][C](c, b)
            })
          }
        })(lb))
    return (
      (kb.attr = function (a, c) {
        if (a && b.is(a, U) && b.is(a[0], 'object'))
          for (var d = 0, e = a.length; e > d; d++) this.items[d].attr(a[d])
        else
          for (var f = 0, g = this.items.length; g > f; f++)
            this.items[f].attr(a, c)
        return this
      }),
      (kb.clear = function () {
        for (; this.length; ) this.pop()
      }),
      (kb.splice = function (a, b, c) {
        ;(a = 0 > a ? N(this.length + a, 0) : a),
          (b = N(0, O(this.length - a, b)))
        var d,
          e = [],
          f = [],
          g = []
        for (d = 2; d < arguments.length; d++) g.push(arguments[d])
        for (d = 0; b > d; d++) f.push(this[a + d])
        for (; d < this.length - a; d++) e.push(this[a + d])
        var h = g.length
        for (d = 0; d < h + e.length; d++)
          this.items[a + d] = this[a + d] = h > d ? g[d] : e[d - h]
        for (d = this.items.length = this.length -= b - h; this[d]; )
          delete this[d++]
        return new jb(f)
      }),
      (kb.exclude = function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (this[b] == a) return this.splice(b, 1), !0
      }),
      (kb.animate = function (a, c, d, e) {
        ;(b.is(d, 'function') || !d) && (e = d || null)
        var f,
          g,
          h = this.items.length,
          i = h,
          j = this
        if (!h) return this
        e &&
          (g = function () {
            !--h && e.call(j)
          }),
          (d = b.is(d, T) ? d : g)
        var k = b.animation(a, c, d, g)
        for (f = this.items[--i].animate(k); i--; )
          this.items[i] &&
            !this.items[i].removed &&
            this.items[i].animateWith(f, k, k),
            (this.items[i] && !this.items[i].removed) || h--
        return this
      }),
      (kb.insertAfter = function (a) {
        for (var b = this.items.length; b--; ) this.items[b].insertAfter(a)
        return this
      }),
      (kb.getBBox = function () {
        for (var a = [], b = [], c = [], d = [], e = this.items.length; e--; )
          if (!this.items[e].removed) {
            var f = this.items[e].getBBox()
            a.push(f.x),
              b.push(f.y),
              c.push(f.x + f.width),
              d.push(f.y + f.height)
          }
        return (
          (a = O[C](0, a)),
          (b = O[C](0, b)),
          (c = N[C](0, c)),
          (d = N[C](0, d)),
          { x: a, y: b, x2: c, y2: d, width: c - a, height: d - b }
        )
      }),
      (kb.clone = function (a) {
        a = this.paper.set()
        for (var b = 0, c = this.items.length; c > b; b++)
          a.push(this.items[b].clone())
        return a
      }),
      (kb.toString = function () {
        return 'Raphaël‘s set'
      }),
      (kb.glow = function (a) {
        var b = this.paper.set()
        return (
          this.forEach(function (c, d) {
            var e = c.glow(a)
            null != e &&
              e.forEach(function (a, c) {
                b.push(a)
              })
          }),
          b
        )
      }),
      (kb.isPointInside = function (a, b) {
        var c = !1
        return (
          this.forEach(function (d) {
            return d.isPointInside(a, b) ? ((c = !0), !1) : void 0
          }),
          c
        )
      }),
      (b.registerFont = function (a) {
        if (!a.face) return a
        this.fonts = this.fonts || {}
        var b = { w: a.w, face: {}, glyphs: {} },
          c = a.face['font-family']
        for (var d in a.face) a.face[y](d) && (b.face[d] = a.face[d])
        if (
          (this.fonts[c] ? this.fonts[c].push(b) : (this.fonts[c] = [b]),
          !a.svg)
        ) {
          b.face['units-per-em'] = _(a.face['units-per-em'], 10)
          for (var e in a.glyphs)
            if (a.glyphs[y](e)) {
              var f = a.glyphs[e]
              if (
                ((b.glyphs[e] = {
                  w: f.w,
                  k: {},
                  d:
                    f.d &&
                    'M' +
                      f.d.replace(/[mlcxtrv]/g, function (a) {
                        return (
                          { l: 'L', c: 'C', x: 'z', t: 'm', r: 'l', v: 'c' }[
                            a
                          ] || 'M'
                        )
                      }) +
                      'z',
                }),
                f.k)
              )
                for (var g in f.k) f[y](g) && (b.glyphs[e].k[g] = f.k[g])
            }
        }
        return a
      }),
      (u.getFont = function (a, c, d, e) {
        if (
          ((e = e || 'normal'),
          (d = d || 'normal'),
          (c =
            +c ||
            { normal: 400, bold: 700, lighter: 300, bolder: 800 }[c] ||
            400),
          b.fonts)
        ) {
          var f = b.fonts[a]
          if (!f) {
            var g = new RegExp(
              '(^|\\s)' + a.replace(/[^\w\d\s+!~.:_-]/g, F) + '(\\s|$)',
              'i'
            )
            for (var h in b.fonts)
              if (b.fonts[y](h) && g.test(h)) {
                f = b.fonts[h]
                break
              }
          }
          var i
          if (f)
            for (
              var j = 0, k = f.length;
              k > j &&
              ((i = f[j]),
              i.face['font-weight'] != c ||
                (i.face['font-style'] != d && i.face['font-style']) ||
                i.face['font-stretch'] != e);
              j++
            );
          return i
        }
      }),
      (u.print = function (a, c, d, e, f, g, h, i) {
        ;(g = g || 'middle'),
          (h = N(O(h || 0, 1), -1)),
          (i = N(O(i || 1, 3), 1))
        var j,
          k = H(d)[I](F),
          l = 0,
          m = 0,
          n = F
        if ((b.is(e, 'string') && (e = this.getFont(e)), e)) {
          j = (f || 16) / e.face['units-per-em']
          for (
            var o = e.face.bbox[I](v),
              p = +o[0],
              q = o[3] - o[1],
              r = 0,
              s = +o[1] + ('baseline' == g ? q + +e.face.descent : q / 2),
              t = 0,
              u = k.length;
            u > t;
            t++
          ) {
            if ('\n' == k[t]) (l = 0), (x = 0), (m = 0), (r += q * i)
            else {
              var w = (m && e.glyphs[k[t - 1]]) || {},
                x = e.glyphs[k[t]]
              ;(l += m
                ? (w.w || e.w) + ((w.k && w.k[k[t]]) || 0) + e.w * h
                : 0),
                (m = 1)
            }
            x &&
              x.d &&
              (n += b.transformPath(x.d, [
                't',
                l * j,
                r * j,
                's',
                j,
                j,
                p,
                s,
                't',
                (a - p) / j,
                (c - s) / j,
              ]))
          }
        }
        return this.path(n).attr({ fill: '#000', stroke: 'none' })
      }),
      (u.add = function (a) {
        if (b.is(a, 'array'))
          for (var c, d = this.set(), e = 0, f = a.length; f > e; e++)
            (c = a[e] || {}), w[y](c.type) && d.push(this[c.type]().attr(c))
        return d
      }),
      (b.format = function (a, c) {
        var d = b.is(c, U) ? [0][D](c) : arguments
        return (
          a &&
            b.is(a, T) &&
            d.length - 1 &&
            (a = a.replace(x, function (a, b) {
              return null == d[++b] ? F : d[b]
            })),
          a || F
        )
      }),
      (b.fullfill = (function () {
        var a = /\{([^\}]+)\}/g,
          b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
          c = function (a, c, d) {
            var e = d
            return (
              c.replace(b, function (a, b, c, d, f) {
                ;(b = b || d),
                  e &&
                    (b in e && (e = e[b]),
                    'function' == typeof e && f && (e = e()))
              }),
              (e = (null == e || e == d ? a : e) + '')
            )
          }
        return function (b, d) {
          return String(b).replace(a, function (a, b) {
            return c(a, b, d)
          })
        }
      })()),
      (b.ninja = function () {
        return A.was ? (z.win.Raphael = A.is) : '', b
      }),
      (b.st = kb),
      a.on('raphael.DOMload', function () {
        t = !0
      }),
      (function (a, c, d) {
        function e() {
          ;/in/.test(a.readyState) ? setTimeout(e, 9) : b.eve('raphael.DOMload')
        }
        null == a.readyState &&
          a.addEventListener &&
          (a.addEventListener(
            c,
            (d = function () {
              a.removeEventListener(c, d, !1), (a.readyState = 'complete')
            }),
            !1
          ),
          (a.readyState = 'loading')),
          e()
      })(document, 'DOMContentLoaded'),
      b
    )
  }),
  (function (a, b) {})(this, function (a) {
    if (!a || a.svg) {
      var b = 'hasOwnProperty',
        c = String,
        d = parseFloat,
        e = parseInt,
        f = Math,
        g = f.max,
        h = f.abs,
        i = f.pow,
        j = /[, ]+/,
        k = a.eve,
        l = '',
        m = ' ',
        n = 'http://www.w3.org/1999/xlink',
        o = {
          block: 'M5,0 0,2.5 5,5z',
          classic: 'M5,0 0,2.5 5,5 3.5,3 3.5,2z',
          diamond: 'M2.5,0 5,2.5 2.5,5 0,2.5z',
          open: 'M6,1 1,3.5 6,6',
          oval: 'M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z',
        },
        p = {}
      a.toString = function () {
        return (
          'Your browser supports SVG.\nYou are running Raphaël ' + this.version
        )
      }
      var q = function (d, e) {
          if (e) {
            'string' == typeof d && (d = q(d))
            for (var f in e)
              e[b](f) &&
                ('xlink:' == f.substring(0, 6)
                  ? d.setAttributeNS(n, f.substring(6), c(e[f]))
                  : d.setAttribute(f, c(e[f])))
          } else
            (d = a._g.doc.createElementNS('http://www.w3.org/2000/svg', d)),
              d.style && (d.style.webkitTapHighlightColor = 'rgba(0,0,0,0)')
          return d
        },
        r = function (b, e) {
          var j = 'linear',
            k = b.id + e,
            m = 0.5,
            n = 0.5,
            o = b.node,
            p = b.paper,
            r = o.style,
            s = a._g.doc.getElementById(k)
          if (!s) {
            if (
              ((e = c(e).replace(a._radial_gradient, function (a, b, c) {
                if (((j = 'radial'), b && c)) {
                  ;(m = d(b)), (n = d(c))
                  var e = 2 * (n > 0.5) - 1
                  i(m - 0.5, 2) + i(n - 0.5, 2) > 0.25 &&
                    (n = f.sqrt(0.25 - i(m - 0.5, 2)) * e + 0.5) &&
                    0.5 != n &&
                    (n = n.toFixed(5) - 1e-5 * e)
                }
                return l
              })),
              (e = e.split(/\s*\-\s*/)),
              'linear' == j)
            ) {
              var t = e.shift()
              if (((t = -d(t)), isNaN(t))) return null
              var u = [0, 0, f.cos(a.rad(t)), f.sin(a.rad(t))],
                v = 1 / (g(h(u[2]), h(u[3])) || 1)
              ;(u[2] *= v),
                (u[3] *= v),
                u[2] < 0 && ((u[0] = -u[2]), (u[2] = 0)),
                u[3] < 0 && ((u[1] = -u[3]), (u[3] = 0))
            }
            var w = a._parseDots(e)
            if (!w) return null
            if (
              ((k = k.replace(/[\(\)\s,\xb0#]/g, '_')),
              b.gradient &&
                k != b.gradient.id &&
                (p.defs.removeChild(b.gradient), delete b.gradient),
              !b.gradient)
            ) {
              ;(s = q(j + 'Gradient', { id: k })),
                (b.gradient = s),
                q(
                  s,
                  'radial' == j
                    ? { fx: m, fy: n }
                    : {
                        x1: u[0],
                        y1: u[1],
                        x2: u[2],
                        y2: u[3],
                        gradientTransform: b.matrix.invert(),
                      }
                ),
                p.defs.appendChild(s)
              for (var x = 0, y = w.length; y > x; x++)
                s.appendChild(
                  q('stop', {
                    offset: w[x].offset ? w[x].offset : x ? '100%' : '0%',
                    'stop-color': w[x].color || '#fff',
                    'stop-opacity': isFinite(w[x].opacity) ? w[x].opacity : 1,
                  })
                )
            }
          }
          return (
            q(o, {
              fill:
                "url('" +
                document.location.origin +
                document.location.pathname +
                '#' +
                k +
                "')",
              opacity: 1,
              'fill-opacity': 1,
            }),
            (r.fill = l),
            (r.opacity = 1),
            (r.fillOpacity = 1),
            1
          )
        },
        s = function (a) {
          var b = a.getBBox(1)
          q(a.pattern, {
            patternTransform:
              a.matrix.invert() + ' translate(' + b.x + ',' + b.y + ')',
          })
        },
        t = function (d, e, f) {
          if ('path' == d.type) {
            for (
              var g,
                h,
                i,
                j,
                k,
                m = c(e).toLowerCase().split('-'),
                n = d.paper,
                r = f ? 'end' : 'start',
                s = d.node,
                t = d.attrs,
                u = t['stroke-width'],
                v = m.length,
                w = 'classic',
                x = 3,
                y = 3,
                z = 5;
              v--;

            )
              switch (m[v]) {
                case 'block':
                case 'classic':
                case 'oval':
                case 'diamond':
                case 'open':
                case 'none':
                  w = m[v]
                  break
                case 'wide':
                  y = 5
                  break
                case 'narrow':
                  y = 2
                  break
                case 'long':
                  x = 5
                  break
                case 'short':
                  x = 2
              }
            if (
              ('open' == w
                ? ((x += 2),
                  (y += 2),
                  (z += 2),
                  (i = 1),
                  (j = f ? 4 : 1),
                  (k = { fill: 'none', stroke: t.stroke }))
                : ((j = i = x / 2), (k = { fill: t.stroke, stroke: 'none' })),
              d._.arrows
                ? f
                  ? (d._.arrows.endPath && p[d._.arrows.endPath]--,
                    d._.arrows.endMarker && p[d._.arrows.endMarker]--)
                  : (d._.arrows.startPath && p[d._.arrows.startPath]--,
                    d._.arrows.startMarker && p[d._.arrows.startMarker]--)
                : (d._.arrows = {}),
              'none' != w)
            ) {
              var A = 'raphael-marker-' + w,
                B = 'raphael-marker-' + r + w + x + y + '-obj' + d.id
              a._g.doc.getElementById(A)
                ? p[A]++
                : (n.defs.appendChild(
                    q(q('path'), { 'stroke-linecap': 'round', d: o[w], id: A })
                  ),
                  (p[A] = 1))
              var C,
                D = a._g.doc.getElementById(B)
              D
                ? (p[B]++, (C = D.getElementsByTagName('use')[0]))
                : ((D = q(q('marker'), {
                    id: B,
                    markerHeight: y,
                    markerWidth: x,
                    orient: 'auto',
                    refX: j,
                    refY: y / 2,
                  })),
                  (C = q(q('use'), {
                    'xlink:href': '#' + A,
                    transform:
                      (f ? 'rotate(180 ' + x / 2 + ' ' + y / 2 + ') ' : l) +
                      'scale(' +
                      x / z +
                      ',' +
                      y / z +
                      ')',
                    'stroke-width': (1 / ((x / z + y / z) / 2)).toFixed(4),
                  })),
                  D.appendChild(C),
                  n.defs.appendChild(D),
                  (p[B] = 1)),
                q(C, k)
              var E = i * ('diamond' != w && 'oval' != w)
              f
                ? ((g = d._.arrows.startdx * u || 0),
                  (h = a.getTotalLength(t.path) - E * u))
                : ((g = E * u),
                  (h = a.getTotalLength(t.path) - (d._.arrows.enddx * u || 0))),
                (k = {}),
                (k['marker-' + r] = 'url(#' + B + ')'),
                (h || g) && (k.d = a.getSubpath(t.path, g, h)),
                q(s, k),
                (d._.arrows[r + 'Path'] = A),
                (d._.arrows[r + 'Marker'] = B),
                (d._.arrows[r + 'dx'] = E),
                (d._.arrows[r + 'Type'] = w),
                (d._.arrows[r + 'String'] = e)
            } else
              f
                ? ((g = d._.arrows.startdx * u || 0),
                  (h = a.getTotalLength(t.path) - g))
                : ((g = 0),
                  (h = a.getTotalLength(t.path) - (d._.arrows.enddx * u || 0))),
                d._.arrows[r + 'Path'] &&
                  q(s, { d: a.getSubpath(t.path, g, h) }),
                delete d._.arrows[r + 'Path'],
                delete d._.arrows[r + 'Marker'],
                delete d._.arrows[r + 'dx'],
                delete d._.arrows[r + 'Type'],
                delete d._.arrows[r + 'String']
            for (k in p)
              if (p[b](k) && !p[k]) {
                var F = a._g.doc.getElementById(k)
                F && F.parentNode.removeChild(F)
              }
          }
        },
        u = {
          '-': [3, 1],
          '.': [1, 1],
          '-.': [3, 1, 1, 1],
          '-..': [3, 1, 1, 1, 1, 1],
          '. ': [1, 3],
          '- ': [4, 3],
          '--': [8, 3],
          '- .': [4, 3, 1, 3],
          '--.': [8, 3, 1, 3],
          '--..': [8, 3, 1, 3, 1, 3],
        },
        v = function (a, b, d) {
          if ((b = u[c(b).toLowerCase()])) {
            for (
              var e = a.attrs['stroke-width'] || '1',
                f =
                  { round: e, square: e, butt: 0 }[
                    a.attrs['stroke-linecap'] || d['stroke-linecap']
                  ] || 0,
                g = [],
                h = b.length;
              h--;

            )
              g[h] = b[h] * e + (h % 2 ? 1 : -1) * f
            q(a.node, { 'stroke-dasharray': g.join(',') })
          } else q(a.node, { 'stroke-dasharray': 'none' })
        },
        w = function (d, f) {
          var i = d.node,
            k = d.attrs,
            m = i.style.visibility
          i.style.visibility = 'hidden'
          for (var o in f)
            if (f[b](o)) {
              if (!a._availableAttrs[b](o)) continue
              var p = f[o]
              switch (((k[o] = p), o)) {
                case 'blur':
                  d.blur(p)
                  break
                case 'title':
                  var u = i.getElementsByTagName('title')
                  if (u.length && (u = u[0])) u.firstChild.nodeValue = p
                  else {
                    u = q('title')
                    var w = a._g.doc.createTextNode(p)
                    u.appendChild(w), i.appendChild(u)
                  }
                  break
                case 'href':
                case 'target':
                  var x = i.parentNode
                  if ('a' != x.tagName.toLowerCase()) {
                    var z = q('a')
                    x.insertBefore(z, i), z.appendChild(i), (x = z)
                  }
                  'target' == o
                    ? x.setAttributeNS(n, 'show', 'blank' == p ? 'new' : p)
                    : x.setAttributeNS(n, o, p)
                  break
                case 'cursor':
                  i.style.cursor = p
                  break
                case 'transform':
                  d.transform(p)
                  break
                case 'arrow-start':
                  t(d, p)
                  break
                case 'arrow-end':
                  t(d, p, 1)
                  break
                case 'clip-rect':
                  var A = c(p).split(j)
                  if (4 == A.length) {
                    d.clip &&
                      d.clip.parentNode.parentNode.removeChild(
                        d.clip.parentNode
                      )
                    var B = q('clipPath'),
                      C = q('rect')
                    ;(B.id = a.createUUID()),
                      q(C, { x: A[0], y: A[1], width: A[2], height: A[3] }),
                      B.appendChild(C),
                      d.paper.defs.appendChild(B),
                      q(i, { 'clip-path': 'url(#' + B.id + ')' }),
                      (d.clip = C)
                  }
                  if (!p) {
                    var D = i.getAttribute('clip-path')
                    if (D) {
                      var E = a._g.doc.getElementById(
                        D.replace(/(^url\(#|\)$)/g, l)
                      )
                      E && E.parentNode.removeChild(E),
                        q(i, { 'clip-path': l }),
                        delete d.clip
                    }
                  }
                  break
                case 'path':
                  'path' == d.type &&
                    (q(i, { d: p ? (k.path = a._pathToAbsolute(p)) : 'M0,0' }),
                    (d._.dirty = 1),
                    d._.arrows &&
                      ('startString' in d._.arrows &&
                        t(d, d._.arrows.startString),
                      'endString' in d._.arrows &&
                        t(d, d._.arrows.endString, 1)))
                  break
                case 'width':
                  if ((i.setAttribute(o, p), (d._.dirty = 1), !k.fx)) break
                  ;(o = 'x'), (p = k.x)
                case 'x':
                  k.fx && (p = -k.x - (k.width || 0))
                case 'rx':
                  if ('rx' == o && 'rect' == d.type) break
                case 'cx':
                  i.setAttribute(o, p), d.pattern && s(d), (d._.dirty = 1)
                  break
                case 'height':
                  if ((i.setAttribute(o, p), (d._.dirty = 1), !k.fy)) break
                  ;(o = 'y'), (p = k.y)
                case 'y':
                  k.fy && (p = -k.y - (k.height || 0))
                case 'ry':
                  if ('ry' == o && 'rect' == d.type) break
                case 'cy':
                  i.setAttribute(o, p), d.pattern && s(d), (d._.dirty = 1)
                  break
                case 'r':
                  'rect' == d.type
                    ? q(i, { rx: p, ry: p })
                    : i.setAttribute(o, p),
                    (d._.dirty = 1)
                  break
                case 'src':
                  'image' == d.type && i.setAttributeNS(n, 'href', p)
                  break
                case 'stroke-width':
                  ;(1 != d._.sx || 1 != d._.sy) &&
                    (p /= g(h(d._.sx), h(d._.sy)) || 1),
                    i.setAttribute(o, p),
                    k['stroke-dasharray'] && v(d, k['stroke-dasharray'], f),
                    d._.arrows &&
                      ('startString' in d._.arrows &&
                        t(d, d._.arrows.startString),
                      'endString' in d._.arrows &&
                        t(d, d._.arrows.endString, 1))
                  break
                case 'stroke-dasharray':
                  v(d, p, f)
                  break
                case 'fill':
                  var F = c(p).match(a._ISURL)
                  if (F) {
                    B = q('pattern')
                    var G = q('image')
                    ;(B.id = a.createUUID()),
                      q(B, {
                        x: 0,
                        y: 0,
                        patternUnits: 'userSpaceOnUse',
                        height: 1,
                        width: 1,
                      }),
                      q(G, { x: 0, y: 0, 'xlink:href': F[1] }),
                      B.appendChild(G),
                      (function (b) {
                        a._preload(F[1], function () {
                          var a = this.offsetWidth,
                            c = this.offsetHeight
                          q(b, { width: a, height: c }),
                            q(G, { width: a, height: c })
                        })
                      })(B),
                      d.paper.defs.appendChild(B),
                      q(i, { fill: 'url(#' + B.id + ')' }),
                      (d.pattern = B),
                      d.pattern && s(d)
                    break
                  }
                  var H = a.getRGB(p)
                  if (H.error) {
                    if (
                      ('circle' == d.type ||
                        'ellipse' == d.type ||
                        'r' != c(p).charAt()) &&
                      r(d, p)
                    ) {
                      if ('opacity' in k || 'fill-opacity' in k) {
                        var I = a._g.doc.getElementById(
                          i.getAttribute('fill').replace(/^url\(#|\)$/g, l)
                        )
                        if (I) {
                          var J = I.getElementsByTagName('stop')
                          q(J[J.length - 1], {
                            'stop-opacity':
                              ('opacity' in k ? k.opacity : 1) *
                              ('fill-opacity' in k ? k['fill-opacity'] : 1),
                          })
                        }
                      }
                      ;(k.gradient = p), (k.fill = 'none')
                      break
                    }
                  } else
                    delete f.gradient,
                      delete k.gradient,
                      !a.is(k.opacity, 'undefined') &&
                        a.is(f.opacity, 'undefined') &&
                        q(i, { opacity: k.opacity }),
                      !a.is(k['fill-opacity'], 'undefined') &&
                        a.is(f['fill-opacity'], 'undefined') &&
                        q(i, { 'fill-opacity': k['fill-opacity'] })
                  H[b]('opacity') &&
                    q(i, {
                      'fill-opacity':
                        H.opacity > 1 ? H.opacity / 100 : H.opacity,
                    })
                case 'stroke':
                  ;(H = a.getRGB(p)),
                    i.setAttribute(o, H.hex),
                    'stroke' == o &&
                      H[b]('opacity') &&
                      q(i, {
                        'stroke-opacity':
                          H.opacity > 1 ? H.opacity / 100 : H.opacity,
                      }),
                    'stroke' == o &&
                      d._.arrows &&
                      ('startString' in d._.arrows &&
                        t(d, d._.arrows.startString),
                      'endString' in d._.arrows &&
                        t(d, d._.arrows.endString, 1))
                  break
                case 'gradient':
                  ;('circle' == d.type ||
                    'ellipse' == d.type ||
                    'r' != c(p).charAt()) &&
                    r(d, p)

                  break
                case 'opacity':
                  k.gradient &&
                    !k[b]('stroke-opacity') &&
                    q(i, { 'stroke-opacity': p > 1 ? p / 100 : p })
                case 'fill-opacity':
                  if (k.gradient) {
                    ;(I = a._g.doc.getElementById(
                      i.getAttribute('fill').replace(/^url\(#|\)$/g, l)
                    )),
                      I &&
                        ((J = I.getElementsByTagName('stop')),
                        q(J[J.length - 1], { 'stop-opacity': p }))
                    break
                  }
                default:
                  'font-size' == o && (p = e(p, 10) + 'px')
                  var K = o.replace(/(\-.)/g, function (a) {
                    return a.substring(1).toUpperCase()
                  })
                  ;(i.style[K] = p), (d._.dirty = 1), i.setAttribute(o, p)
              }
            }
          y(d, f), (i.style.visibility = m)
        },
        x = 1.2,
        y = function (d, f) {
          if (
            'text' == d.type &&
            (f[b]('text') ||
              f[b]('font') ||
              f[b]('font-size') ||
              f[b]('x') ||
              f[b]('y'))
          ) {
            var g = d.attrs,
              h = d.node,
              i = h.firstChild
                ? e(
                    a._g.doc.defaultView
                      .getComputedStyle(h.firstChild, l)
                      .getPropertyValue('font-size'),
                    10
                  )
                : 10
            if (f[b]('text')) {
              for (g.text = f.text; h.firstChild; ) h.removeChild(h.firstChild)
              for (
                var j, k = c(f.text).split('\n'), m = [], n = 0, o = k.length;
                o > n;
                n++
              )
                (j = q('tspan')),
                  n && q(j, { dy: i * x, x: g.x }),
                  j.appendChild(a._g.doc.createTextNode(k[n])),
                  h.appendChild(j),
                  (m[n] = j)
            } else
              for (
                m = h.getElementsByTagName('tspan'), n = 0, o = m.length;
                o > n;
                n++
              )
                n ? q(m[n], { dy: i * x, x: g.x }) : q(m[0], { dy: 0 })
            q(h, { x: g.x, y: g.y }), (d._.dirty = 1)
            var p = d._getBBox(),
              r = g.y - (p.y + p.height / 2)
            r && a.is(r, 'finite') && q(m[0], { dy: r })
          }
        },
        z = function (a) {
          return a.parentNode && 'a' === a.parentNode.tagName.toLowerCase()
            ? a.parentNode
            : a
        },
        A = function (b, c) {
          ;(this[0] = this.node = b),
            (b.raphael = !0),
            (this.id = a._oid++),
            (b.raphaelid = this.id),
            (this.matrix = a.matrix()),
            (this.realPath = null),
            (this.paper = c),
            (this.attrs = this.attrs || {}),
            (this._ = {
              transform: [],
              sx: 1,
              sy: 1,
              deg: 0,
              dx: 0,
              dy: 0,
              dirty: 1,
            }),
            !c.bottom && (c.bottom = this),
            (this.prev = c.top),
            c.top && (c.top.next = this),
            (c.top = this),
            (this.next = null)
        },
        B = a.el
      ;(A.prototype = B),
        (B.constructor = A),
        (a._engine.path = function (a, b) {
          var c = q('path')
          b.canvas && b.canvas.appendChild(c)
          var d = new A(c, b)
          return (
            (d.type = 'path'),
            w(d, { fill: 'none', stroke: '#000', path: a }),
            d
          )
        }),
        (B.rotate = function (a, b, e) {
          if (this.removed) return this
          if (
            ((a = c(a).split(j)),
            a.length - 1 && ((b = d(a[1])), (e = d(a[2]))),
            (a = d(a[0])),
            null == e && (b = e),
            null == b || null == e)
          ) {
            var f = this.getBBox(1)
            ;(b = f.x + f.width / 2), (e = f.y + f.height / 2)
          }
          return this.transform(this._.transform.concat([['r', a, b, e]])), this
        }),
        (B.scale = function (a, b, e, f) {
          if (this.removed) return this
          if (
            ((a = c(a).split(j)),
            a.length - 1 && ((b = d(a[1])), (e = d(a[2])), (f = d(a[3]))),
            (a = d(a[0])),
            null == b && (b = a),
            null == f && (e = f),
            null == e || null == f)
          )
            var g = this.getBBox(1)
          return (
            (e = null == e ? g.x + g.width / 2 : e),
            (f = null == f ? g.y + g.height / 2 : f),
            this.transform(this._.transform.concat([['s', a, b, e, f]])),
            this
          )
        }),
        (B.translate = function (a, b) {
          return this.removed
            ? this
            : ((a = c(a).split(j)),
              a.length - 1 && (b = d(a[1])),
              (a = d(a[0]) || 0),
              (b = +b || 0),
              this.transform(this._.transform.concat([['t', a, b]])),
              this)
        }),
        (B.transform = function (c) {
          var d = this._
          if (null == c) return d.transform
          if (
            (a._extractTransform(this, c),
            this.clip && q(this.clip, { transform: this.matrix.invert() }),
            this.pattern && s(this),
            this.node && q(this.node, { transform: this.matrix }),
            1 != d.sx || 1 != d.sy)
          ) {
            var e = this.attrs[b]('stroke-width')
              ? this.attrs['stroke-width']
              : 1
            this.attr({ 'stroke-width': e })
          }
          return this
        }),
        (B.hide = function () {
          return this.removed || (this.node.style.display = 'none'), this
        }),
        (B.show = function () {
          return this.removed || (this.node.style.display = ''), this
        }),
        (B.remove = function () {
          var b = z(this.node)
          if (!this.removed && b.parentNode) {
            var c = this.paper
            c.__set__ && c.__set__.exclude(this),
              k.unbind('raphael.*.*.' + this.id),
              this.gradient && c.defs.removeChild(this.gradient),
              a._tear(this, c),
              b.parentNode.removeChild(b),
              this.removeData()
            for (var d in this)
              this[d] =
                'function' == typeof this[d] ? a._removedFactory(d) : null
            this.removed = !0
          }
        }),
        (B._getBBox = function () {
          if ('none' == this.node.style.display) {
            this.show()
            var a = !0
          }
          var b,
            c = !1
          this.paper.canvas.parentElement
            ? (b = this.paper.canvas.parentElement.style)
            : this.paper.canvas.parentNode &&
              (b = this.paper.canvas.parentNode.style),
            b && 'none' == b.display && ((c = !0), (b.display = ''))
          var d = {}
          try {
            d = this.node.getBBox()
          } catch (e) {
            d = {
              x: this.node.clientLeft,
              y: this.node.clientTop,
              width: this.node.clientWidth,
              height: this.node.clientHeight,
            }
          } finally {
            ;(d = d || {}), c && (b.display = 'none')
          }
          return a && this.hide(), d
        }),
        (B.attr = function (c, d) {
          if (this.removed) return this
          if (null == c) {
            var e = {}
            for (var f in this.attrs) this.attrs[b](f) && (e[f] = this.attrs[f])
            return (
              e.gradient &&
                'none' == e.fill &&
                (e.fill = e.gradient) &&
                delete e.gradient,
              (e.transform = this._.transform),
              e
            )
          }
          if (null == d && a.is(c, 'string')) {
            if ('fill' == c && 'none' == this.attrs.fill && this.attrs.gradient)
              return this.attrs.gradient
            if ('transform' == c) return this._.transform
            for (var g = c.split(j), h = {}, i = 0, l = g.length; l > i; i++)
              (c = g[i]),
                c in this.attrs
                  ? (h[c] = this.attrs[c])
                  : a.is(this.paper.customAttributes[c], 'function')
                  ? (h[c] = this.paper.customAttributes[c].def)
                  : (h[c] = a._availableAttrs[c])
            return l - 1 ? h : h[g[0]]
          }
          if (null == d && a.is(c, 'array')) {
            for (h = {}, i = 0, l = c.length; l > i; i++)
              h[c[i]] = this.attr(c[i])
            return h
          }
          if (null != d) {
            var m = {}
            m[c] = d
          } else null != c && a.is(c, 'object') && (m = c)
          for (var n in m) k('raphael.attr.' + n + '.' + this.id, this, m[n])
          for (n in this.paper.customAttributes)
            if (
              this.paper.customAttributes[b](n) &&
              m[b](n) &&
              a.is(this.paper.customAttributes[n], 'function')
            ) {
              var o = this.paper.customAttributes[n].apply(
                this,
                [].concat(m[n])
              )
              this.attrs[n] = m[n]
              for (var p in o) o[b](p) && (m[p] = o[p])
            }
          return w(this, m), this
        }),
        (B.toFront = function () {
          if (this.removed) return this
          var b = z(this.node)
          b.parentNode.appendChild(b)
          var c = this.paper
          return c.top != this && a._tofront(this, c), this
        }),
        (B.toBack = function () {
          if (this.removed) return this
          var b = z(this.node),
            c = b.parentNode
          c.insertBefore(b, c.firstChild), a._toback(this, this.paper)
          this.paper
          return this
        }),
        (B.insertAfter = function (b) {
          if (this.removed || !b) return this
          var c = z(this.node),
            d = z(b.node || b[b.length - 1].node)
          return (
            d.nextSibling
              ? d.parentNode.insertBefore(c, d.nextSibling)
              : d.parentNode.appendChild(c),
            a._insertafter(this, b, this.paper),
            this
          )
        }),
        (B.insertBefore = function (b) {
          if (this.removed || !b) return this
          var c = z(this.node),
            d = z(b.node || b[0].node)
          return (
            d.parentNode.insertBefore(c, d),
            a._insertbefore(this, b, this.paper),
            this
          )
        }),
        (B.blur = function (b) {
          var c = this
          if (0 !== +b) {
            var d = q('filter'),
              e = q('feGaussianBlur')
            ;(c.attrs.blur = b),
              (d.id = a.createUUID()),
              q(e, { stdDeviation: +b || 1.5 }),
              d.appendChild(e),
              c.paper.defs.appendChild(d),
              (c._blur = d),
              q(c.node, { filter: 'url(#' + d.id + ')' })
          } else
            c._blur &&
              (c._blur.parentNode.removeChild(c._blur),
              delete c._blur,
              delete c.attrs.blur),
              c.node.removeAttribute('filter')
          return c
        }),
        (a._engine.circle = function (a, b, c, d) {
          var e = q('circle')
          a.canvas && a.canvas.appendChild(e)
          var f = new A(e, a)
          return (
            (f.attrs = { cx: b, cy: c, r: d, fill: 'none', stroke: '#000' }),
            (f.type = 'circle'),
            q(e, f.attrs),
            f
          )
        }),
        (a._engine.rect = function (a, b, c, d, e, f) {
          var g = q('rect')
          a.canvas && a.canvas.appendChild(g)
          var h = new A(g, a)
          return (
            (h.attrs = {
              x: b,
              y: c,
              width: d,
              height: e,
              rx: f || 0,
              ry: f || 0,
              fill: 'none',
              stroke: '#000',
            }),
            (h.type = 'rect'),
            q(g, h.attrs),
            h
          )
        }),
        (a._engine.ellipse = function (a, b, c, d, e) {
          var f = q('ellipse')
          a.canvas && a.canvas.appendChild(f)
          var g = new A(f, a)
          return (
            (g.attrs = {
              cx: b,
              cy: c,
              rx: d,
              ry: e,
              fill: 'none',
              stroke: '#000',
            }),
            (g.type = 'ellipse'),
            q(f, g.attrs),
            g
          )
        }),
        (a._engine.image = function (a, b, c, d, e, f) {
          var g = q('image')
          q(g, {
            x: c,
            y: d,
            width: e,
            height: f,
            preserveAspectRatio: 'none',
          }),
            g.setAttributeNS(n, 'href', b),
            a.canvas && a.canvas.appendChild(g)
          var h = new A(g, a)
          return (
            (h.attrs = { x: c, y: d, width: e, height: f, src: b }),
            (h.type = 'image'),
            h
          )
        }),
        (a._engine.text = function (b, c, d, e) {
          var f = q('text')
          b.canvas && b.canvas.appendChild(f)
          var g = new A(f, b)
          return (
            (g.attrs = {
              x: c,
              y: d,
              'text-anchor': 'middle',
              text: e,
              'font-family': a._availableAttrs['font-family'],
              'font-size': a._availableAttrs['font-size'],
              stroke: 'none',
              fill: '#000',
            }),
            (g.type = 'text'),
            w(g, g.attrs),
            g
          )
        }),
        (a._engine.setSize = function (a, b) {
          return (
            (this.width = a || this.width),
            (this.height = b || this.height),
            this.canvas.setAttribute('width', this.width),
            this.canvas.setAttribute('height', this.height),
            this._viewBox && this.setViewBox.apply(this, this._viewBox),
            this
          )
        }),
        (a._engine.create = function () {
          var b = a._getContainer.apply(0, arguments),
            c = b && b.container,
            d = b.x,
            e = b.y,
            f = b.width,
            g = b.height
          if (!c) throw new Error('SVG container not found.')
          var h,
            i = q('svg'),
            j = 'overflow:hidden;'
          return (
            (d = d || 0),
            (e = e || 0),
            (f = f || 512),
            (g = g || 342),
            q(i, {
              height: g,
              version: 1.1,
              width: f,
              xmlns: 'http://www.w3.org/2000/svg',
              'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            }),
            1 == c
              ? ((i.style.cssText =
                  j + 'position:absolute;left:' + d + 'px;top:' + e + 'px'),
                a._g.doc.body.appendChild(i),
                (h = 1))
              : ((i.style.cssText = j + 'position:relative'),
                c.firstChild
                  ? c.insertBefore(i, c.firstChild)
                  : c.appendChild(i)),
            (c = new a._Paper()),
            (c.width = f),
            (c.height = g),
            (c.canvas = i),
            c.clear(),
            (c._left = c._top = 0),
            h && (c.renderfix = function () {}),
            c.renderfix(),
            c
          )
        }),
        (a._engine.setViewBox = function (a, b, c, d, e) {
          k('raphael.setViewBox', this, this._viewBox, [a, b, c, d, e])
          var f,
            h,
            i = this.getSize(),
            j = g(c / i.width, d / i.height),
            l = this.top,
            n = e ? 'xMidYMid meet' : 'xMinYMin'
          for (
            null == a
              ? (this._vbSize && (j = 1),
                delete this._vbSize,
                (f = '0 0 ' + this.width + m + this.height))
              : ((this._vbSize = j), (f = a + m + b + m + c + m + d)),
              q(this.canvas, { viewBox: f, preserveAspectRatio: n });
            j && l;

          )
            (h = 'stroke-width' in l.attrs ? l.attrs['stroke-width'] : 1),
              l.attr({ 'stroke-width': h }),
              (l._.dirty = 1),
              (l._.dirtyT = 1),
              (l = l.prev)
          return (this._viewBox = [a, b, c, d, !!e]), this
        }),
        (a.prototype.renderfix = function () {
          var a,
            b = this.canvas,
            c = b.style
          try {
            a = b.getScreenCTM() || b.createSVGMatrix()
          } catch (d) {
            a = b.createSVGMatrix()
          }
          var e = -a.e % 1,
            f = -a.f % 1
          ;(e || f) &&
            (e &&
              ((this._left = (this._left + e) % 1),
              (c.left = this._left + 'px')),
            f &&
              ((this._top = (this._top + f) % 1), (c.top = this._top + 'px')))
        }),
        (a.prototype.clear = function () {
          a.eve('raphael.clear', this)
          for (var b = this.canvas; b.firstChild; ) b.removeChild(b.firstChild)
          ;(this.bottom = this.top = null),
            (this.desc = q('desc')).appendChild(
              a._g.doc.createTextNode('Created with Raphaël ' + a.version)
            ),
            b.appendChild(this.desc),
            b.appendChild((this.defs = q('defs')))
        }),
        (a.prototype.remove = function () {
          k('raphael.remove', this),
            this.canvas.parentNode &&
              this.canvas.parentNode.removeChild(this.canvas)
          for (var b in this)
            this[b] = 'function' == typeof this[b] ? a._removedFactory(b) : null
        })
      var C = a.st
      for (var D in B)
        B[b](D) &&
          !C[b](D) &&
          (C[D] = (function (a) {
            return function () {
              var b = arguments
              return this.forEach(function (c) {
                c[a].apply(c, b)
              })
            }
          })(D))
    }
  }),
  (function (a, b) {
    'function' == typeof define && define.amd
      ? define('raphael.vml', ['raphael.core'], function (a) {
          return b(a)
        })
      : b('object' == typeof exports ? require('./raphael.core') : a.Raphael)
  })(this, function (a) {
    if (!a || a.vml) {
      var b = 'hasOwnProperty',
        c = String,
        d = parseFloat,
        e = Math,
        f = e.round,
        g = e.max,
        h = e.min,
        i = e.abs,
        j = 'fill',
        k = /[, ]+/,
        l = a.eve,
        m = ' progid:DXImageTransform.Microsoft',
        n = ' ',
        o = '',
        p = { M: 'm', L: 'l', C: 'c', Z: 'x', m: 't', l: 'r', c: 'v', z: 'x' },
        q = /([clmz]),?([^clmz]*)/gi,
        r = / progid:\S+Blur\([^\)]+\)/g,
        s = /-?[^,\s-]+/g,
        t =
          'position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)',
        u = 21600,
        v = { path: 1, rect: 1, image: 1 },
        w = { circle: 1, ellipse: 1 },
        x = function (b) {
          var d = /[ahqstv]/gi,
            e = a._pathToAbsolute
          if (
            (c(b).match(d) && (e = a._path2curve),
            (d = /[clmz]/g),
            e == a._pathToAbsolute && !c(b).match(d))
          ) {
            var g = c(b).replace(q, function (a, b, c) {
              var d = [],
                e = 'm' == b.toLowerCase(),
                g = p[b]
              return (
                c.replace(s, function (a) {
                  e &&
                    2 == d.length &&
                    ((g += d + p['m' == b ? 'l' : 'L']), (d = [])),
                    d.push(f(a * u))
                }),
                g + d
              )
            })
            return g
          }
          var h,
            i,
            j = e(b)
          g = []
          for (var k = 0, l = j.length; l > k; k++) {
            ;(h = j[k]), (i = j[k][0].toLowerCase()), 'z' == i && (i = 'x')
            for (var m = 1, r = h.length; r > m; m++)
              i += f(h[m] * u) + (m != r - 1 ? ',' : o)
            g.push(i)
          }
          return g.join(n)
        },
        y = function (b, c, d) {
          var e = a.matrix()
          return e.rotate(-b, 0.5, 0.5), { dx: e.x(c, d), dy: e.y(c, d) }
        },
        z = function (a, b, c, d, e, f) {
          var g = a._,
            h = a.matrix,
            k = g.fillpos,
            l = a.node,
            m = l.style,
            o = 1,
            p = '',
            q = u / b,
            r = u / c
          if (((m.visibility = 'hidden'), b && c)) {
            if (
              ((l.coordsize = i(q) + n + i(r)),
              (m.rotation = f * (0 > b * c ? -1 : 1)),
              f)
            ) {
              var s = y(f, d, e)
              ;(d = s.dx), (e = s.dy)
            }
            if (
              (0 > b && (p += 'x'),
              0 > c && (p += ' y') && (o = -1),
              (m.flip = p),
              (l.coordorigin = d * -q + n + e * -r),
              k || g.fillsize)
            ) {
              var t = l.getElementsByTagName(j)
              ;(t = t && t[0]),
                l.removeChild(t),
                k &&
                  ((s = y(f, h.x(k[0], k[1]), h.y(k[0], k[1]))),
                  (t.position = s.dx * o + n + s.dy * o)),
                g.fillsize &&
                  (t.size = g.fillsize[0] * i(b) + n + g.fillsize[1] * i(c)),
                l.appendChild(t)
            }
            m.visibility = 'visible'
          }
        }
      a.toString = function () {
        return (
          'Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël ' +
          this.version
        )
      }
      var A = function (a, b, d) {
          for (
            var e = c(b).toLowerCase().split('-'),
              f = d ? 'end' : 'start',
              g = e.length,
              h = 'classic',
              i = 'medium',
              j = 'medium';
            g--;

          )
            switch (e[g]) {
              case 'block':
              case 'classic':
              case 'oval':
              case 'diamond':
              case 'open':
              case 'none':
                h = e[g]
                break
              case 'wide':
              case 'narrow':
                j = e[g]
                break
              case 'long':
              case 'short':
                i = e[g]
            }
          var k = a.node.getElementsByTagName('stroke')[0]
          ;(k[f + 'arrow'] = h),
            (k[f + 'arrowlength'] = i),
            (k[f + 'arrowwidth'] = j)
        },
        B = function (e, i) {
          e.attrs = e.attrs || {}
          var l = e.node,
            m = e.attrs,
            p = l.style,
            q =
              v[e.type] &&
              (i.x != m.x ||
                i.y != m.y ||
                i.width != m.width ||
                i.height != m.height ||
                i.cx != m.cx ||
                i.cy != m.cy ||
                i.rx != m.rx ||
                i.ry != m.ry ||
                i.r != m.r),
            r =
              w[e.type] &&
              (m.cx != i.cx ||
                m.cy != i.cy ||
                m.r != i.r ||
                m.rx != i.rx ||
                m.ry != i.ry),
            s = e
          for (var t in i) i[b](t) && (m[t] = i[t])
          if (
            (q && ((m.path = a._getPath[e.type](e)), (e._.dirty = 1)),
            i.href && (l.href = i.href),
            i.title && (l.title = i.title),
            i.target && (l.target = i.target),
            i.cursor && (p.cursor = i.cursor),
            'blur' in i && e.blur(i.blur),
            ((i.path && 'path' == e.type) || q) &&
              ((l.path = x(
                ~c(m.path).toLowerCase().indexOf('r')
                  ? a._pathToAbsolute(m.path)
                  : m.path
              )),
              (e._.dirty = 1),
              'image' == e.type &&
                ((e._.fillpos = [m.x, m.y]),
                (e._.fillsize = [m.width, m.height]),
                z(e, 1, 1, 0, 0, 0))),
            'transform' in i && e.transform(i.transform),
            r)
          ) {
            var y = +m.cx,
              B = +m.cy,
              D = +m.rx || +m.r || 0,
              E = +m.ry || +m.r || 0
            ;(l.path = a.format(
              'ar{0},{1},{2},{3},{4},{1},{4},{1}x',
              f((y - D) * u),
              f((B - E) * u),
              f((y + D) * u),
              f((B + E) * u),
              f(y * u)
            )),
              (e._.dirty = 1)
          }
          if ('clip-rect' in i) {
            var G = c(i['clip-rect']).split(k)
            if (4 == G.length) {
              ;(G[2] = +G[2] + +G[0]), (G[3] = +G[3] + +G[1])
              var H = l.clipRect || a._g.doc.createElement('div'),
                I = H.style
              ;(I.clip = a.format('rect({1}px {2}px {3}px {0}px)', G)),
                l.clipRect ||
                  ((I.position = 'absolute'),
                  (I.top = 0),
                  (I.left = 0),
                  (I.width = e.paper.width + 'px'),
                  (I.height = e.paper.height + 'px'),
                  l.parentNode.insertBefore(H, l),
                  H.appendChild(l),
                  (l.clipRect = H))
            }
            i['clip-rect'] || (l.clipRect && (l.clipRect.style.clip = 'auto'))
          }
          if (e.textpath) {
            var J = e.textpath.style
            i.font && (J.font = i.font),
              i['font-family'] &&
                (J.fontFamily =
                  '"' +
                  i['font-family'].split(',')[0].replace(/^['"]+|['"]+$/g, o) +
                  '"'),
              i['font-size'] && (J.fontSize = i['font-size']),
              i['font-weight'] && (J.fontWeight = i['font-weight']),
              i['font-style'] && (J.fontStyle = i['font-style'])
          }
          if (
            ('arrow-start' in i && A(s, i['arrow-start']),
            'arrow-end' in i && A(s, i['arrow-end'], 1),
            null != i.opacity ||
              null != i['stroke-width'] ||
              null != i.fill ||
              null != i.src ||
              null != i.stroke ||
              null != i['stroke-width'] ||
              null != i['stroke-opacity'] ||
              null != i['fill-opacity'] ||
              null != i['stroke-dasharray'] ||
              null != i['stroke-miterlimit'] ||
              null != i['stroke-linejoin'] ||
              null != i['stroke-linecap'])
          ) {
            var K = l.getElementsByTagName(j),
              L = !1
            if (
              ((K = K && K[0]),
              !K && (L = K = F(j)),
              'image' == e.type && i.src && (K.src = i.src),
              i.fill && (K.on = !0),
              (null == K.on || 'none' == i.fill || null === i.fill) &&
                (K.on = !1),
              K.on && i.fill)
            ) {
              var M = c(i.fill).match(a._ISURL)
              if (M) {
                K.parentNode == l && l.removeChild(K),
                  (K.rotate = !0),
                  (K.src = M[1]),
                  (K.type = 'tile')
                var N = e.getBBox(1)
                ;(K.position = N.x + n + N.y),
                  (e._.fillpos = [N.x, N.y]),
                  a._preload(M[1], function () {
                    e._.fillsize = [this.offsetWidth, this.offsetHeight]
                  })
              } else
                (K.color = a.getRGB(i.fill).hex),
                  (K.src = o),
                  (K.type = 'solid'),
                  a.getRGB(i.fill).error &&
                    (s.type in { circle: 1, ellipse: 1 } ||
                      'r' != c(i.fill).charAt()) &&
                    C(s, i.fill, K) &&
                    ((m.fill = 'none'), (m.gradient = i.fill), (K.rotate = !1))
            }
            if ('fill-opacity' in i || 'opacity' in i) {
              var O =
                ((+m['fill-opacity'] + 1 || 2) - 1) *
                ((+m.opacity + 1 || 2) - 1) *
                ((+a.getRGB(i.fill).o + 1 || 2) - 1)
              ;(O = h(g(O, 0), 1)), (K.opacity = O), K.src && (K.color = 'none')
            }
            l.appendChild(K)
            var P =
                l.getElementsByTagName('stroke') &&
                l.getElementsByTagName('stroke')[0],
              Q = !1
            !P && (Q = P = F('stroke')),
              ((i.stroke && 'none' != i.stroke) ||
                i['stroke-width'] ||
                null != i['stroke-opacity'] ||
                i['stroke-dasharray'] ||
                i['stroke-miterlimit'] ||
                i['stroke-linejoin'] ||
                i['stroke-linecap']) &&
                (P.on = !0),
              ('none' == i.stroke ||
                null === i.stroke ||
                null == P.on ||
                0 == i.stroke ||
                0 == i['stroke-width']) &&
                (P.on = !1)
            var R = a.getRGB(i.stroke)
            P.on && i.stroke && (P.color = R.hex),
              (O =
                ((+m['stroke-opacity'] + 1 || 2) - 1) *
                ((+m.opacity + 1 || 2) - 1) *
                ((+R.o + 1 || 2) - 1))
            var S = 0.75 * (d(i['stroke-width']) || 1)
            if (
              ((O = h(g(O, 0), 1)),
              null == i['stroke-width'] && (S = m['stroke-width']),
              i['stroke-width'] && (P.weight = S),
              S && 1 > S && (O *= S) && (P.weight = 1),
              (P.opacity = O),
              i['stroke-linejoin'] &&
                (P.joinstyle = i['stroke-linejoin'] || 'miter'),
              (P.miterlimit = i['stroke-miterlimit'] || 8),
              i['stroke-linecap'] &&
                (P.endcap =
                  'butt' == i['stroke-linecap']
                    ? 'flat'
                    : 'square' == i['stroke-linecap']
                    ? 'square'
                    : 'round'),
              'stroke-dasharray' in i)
            ) {
              var T = {
                '-': 'shortdash',
                '.': 'shortdot',
                '-.': 'shortdashdot',
                '-..': 'shortdashdotdot',
                '. ': 'dot',
                '- ': 'dash',
                '--': 'longdash',
                '- .': 'dashdot',
                '--.': 'longdashdot',
                '--..': 'longdashdotdot',
              }
              P.dashstyle = T[b](i['stroke-dasharray'])
                ? T[i['stroke-dasharray']]
                : o
            }
            Q && l.appendChild(P)
          }
          if ('text' == s.type) {
            s.paper.canvas.style.display = o
            var U = s.paper.span,
              V = 100,
              W = m.font && m.font.match(/\d+(?:\.\d*)?(?=px)/)
            ;(p = U.style),
              m.font && (p.font = m.font),
              m['font-family'] && (p.fontFamily = m['font-family']),
              m['font-weight'] && (p.fontWeight = m['font-weight']),
              m['font-style'] && (p.fontStyle = m['font-style']),
              (W = d(m['font-size'] || (W && W[0])) || 10),
              (p.fontSize = W * V + 'px'),
              s.textpath.string &&
                (U.innerHTML = c(s.textpath.string)
                  .replace(/</g, '&#60;')
                  .replace(/&/g, '&#38;')
                  .replace(/\n/g, '<br>'))
            var X = U.getBoundingClientRect()
            ;(s.W = m.w = (X.right - X.left) / V),
              (s.H = m.h = (X.bottom - X.top) / V),
              (s.X = m.x),
              (s.Y = m.y + s.H / 2),
              ('x' in i || 'y' in i) &&
                (s.path.v = a.format(
                  'm{0},{1}l{2},{1}',
                  f(m.x * u),
                  f(m.y * u),
                  f(m.x * u) + 1
                ))
            for (
              var Y = [
                  'x',
                  'y',
                  'text',
                  'font',
                  'font-family',
                  'font-weight',
                  'font-style',
                  'font-size',
                ],
                Z = 0,
                $ = Y.length;
              $ > Z;
              Z++
            )
              if (Y[Z] in i) {
                s._.dirty = 1
                break
              }
            switch (m['text-anchor']) {
              case 'start':
                ;(s.textpath.style['v-text-align'] = 'left'), (s.bbx = s.W / 2)
                break
              case 'end':
                ;(s.textpath.style['v-text-align'] = 'right'),
                  (s.bbx = -s.W / 2)
                break
              default:
                ;(s.textpath.style['v-text-align'] = 'center'), (s.bbx = 0)
            }
            s.textpath.style['v-text-kern'] = !0
          }
        },
        C = function (b, f, g) {
          b.attrs = b.attrs || {}
          var h = (b.attrs, Math.pow),
            i = 'linear',
            j = '.5 .5'
          if (
            ((b.attrs.gradient = f),
            (f = c(f).replace(a._radial_gradient, function (a, b, c) {
              return (
                (i = 'radial'),
                b &&
                  c &&
                  ((b = d(b)),
                  (c = d(c)),
                  h(b - 0.5, 2) + h(c - 0.5, 2) > 0.25 &&
                    (c =
                      e.sqrt(0.25 - h(b - 0.5, 2)) * (2 * (c > 0.5) - 1) + 0.5),
                  (j = b + n + c)),
                o
              )
            })),
            (f = f.split(/\s*\-\s*/)),
            'linear' == i)
          ) {
            var k = f.shift()
            if (((k = -d(k)), isNaN(k))) return null
          }
          var l = a._parseDots(f)
          if (!l) return null
          if (((b = b.shape || b.node), l.length)) {
            b.removeChild(g),
              (g.on = !0),
              (g.method = 'none'),
              (g.color = l[0].color),
              (g.color2 = l[l.length - 1].color)
            for (var m = [], p = 0, q = l.length; q > p; p++)
              l[p].offset && m.push(l[p].offset + n + l[p].color)
            ;(g.colors = m.length ? m.join() : '0% ' + g.color),
              'radial' == i
                ? ((g.type = 'gradientTitle'),
                  (g.focus = '100%'),
                  (g.focussize = '0 0'),
                  (g.focusposition = j),
                  (g.angle = 0))
                : ((g.type = 'gradient'), (g.angle = (270 - k) % 360)),
              b.appendChild(g)
          }
          return 1
        },
        D = function (b, c) {
          ;(this[0] = this.node = b),
            (b.raphael = !0),
            (this.id = a._oid++),
            (b.raphaelid = this.id),
            (this.X = 0),
            (this.Y = 0),
            (this.attrs = {}),
            (this.paper = c),
            (this.matrix = a.matrix()),
            (this._ = {
              transform: [],
              sx: 1,
              sy: 1,
              dx: 0,
              dy: 0,
              deg: 0,
              dirty: 1,
              dirtyT: 1,
            }),
            !c.bottom && (c.bottom = this),
            (this.prev = c.top),
            c.top && (c.top.next = this),
            (c.top = this),
            (this.next = null)
        },
        E = a.el
      ;(D.prototype = E),
        (E.constructor = D),
        (E.transform = function (b) {
          if (null == b) return this._.transform
          var d,
            e = this.paper._viewBoxShift,
            f = e ? 's' + [e.scale, e.scale] + '-1-1t' + [e.dx, e.dy] : o
          e && (d = b = c(b).replace(/\.{3}|\u2026/g, this._.transform || o)),
            a._extractTransform(this, f + b)
          var g,
            h = this.matrix.clone(),
            i = this.skew,
            j = this.node,
            k = ~c(this.attrs.fill).indexOf('-'),
            l = !c(this.attrs.fill).indexOf('url(')
          if ((h.translate(1, 1), l || k || 'image' == this.type))
            if (
              ((i.matrix = '1 0 0 1'),
              (i.offset = '0 0'),
              (g = h.split()),
              (k && g.noRotation) || !g.isSimple)
            ) {
              j.style.filter = h.toFilter()
              var m = this.getBBox(),
                p = this.getBBox(1),
                q = m.x - p.x,
                r = m.y - p.y
              ;(j.coordorigin = q * -u + n + r * -u), z(this, 1, 1, q, r, 0)
            } else
              (j.style.filter = o),
                z(this, g.scalex, g.scaley, g.dx, g.dy, g.rotate)
          else (j.style.filter = o), (i.matrix = c(h)), (i.offset = h.offset())
          return (
            null !== d &&
              ((this._.transform = d), a._extractTransform(this, d)),
            this
          )
        }),
        (E.rotate = function (a, b, e) {
          if (this.removed) return this
          if (null != a) {
            if (
              ((a = c(a).split(k)),
              a.length - 1 && ((b = d(a[1])), (e = d(a[2]))),
              (a = d(a[0])),
              null == e && (b = e),
              null == b || null == e)
            ) {
              var f = this.getBBox(1)
              ;(b = f.x + f.width / 2), (e = f.y + f.height / 2)
            }
            return (
              (this._.dirtyT = 1),
              this.transform(this._.transform.concat([['r', a, b, e]])),
              this
            )
          }
        }),
        (E.translate = function (a, b) {
          return this.removed
            ? this
            : ((a = c(a).split(k)),
              a.length - 1 && (b = d(a[1])),
              (a = d(a[0]) || 0),
              (b = +b || 0),
              this._.bbox && ((this._.bbox.x += a), (this._.bbox.y += b)),
              this.transform(this._.transform.concat([['t', a, b]])),
              this)
        }),
        (E.scale = function (a, b, e, f) {
          if (this.removed) return this
          if (
            ((a = c(a).split(k)),
            a.length - 1 &&
              ((b = d(a[1])),
              (e = d(a[2])),
              (f = d(a[3])),
              isNaN(e) && (e = null),
              isNaN(f) && (f = null)),
            (a = d(a[0])),
            null == b && (b = a),
            null == f && (e = f),
            null == e || null == f)
          )
            var g = this.getBBox(1)
          return (
            (e = null == e ? g.x + g.width / 2 : e),
            (f = null == f ? g.y + g.height / 2 : f),
            this.transform(this._.transform.concat([['s', a, b, e, f]])),
            (this._.dirtyT = 1),
            this
          )
        }),
        (E.hide = function () {
          return !this.removed && (this.node.style.display = 'none'), this
        }),
        (E.show = function () {
          return !this.removed && (this.node.style.display = o), this
        }),
        (E.auxGetBBox = a.el.getBBox),
        (E.getBBox = function () {
          var a = this.auxGetBBox()
          if (this.paper && this.paper._viewBoxShift) {
            var b = {},
              c = 1 / this.paper._viewBoxShift.scale
            return (
              (b.x = a.x - this.paper._viewBoxShift.dx),
              (b.x *= c),
              (b.y = a.y - this.paper._viewBoxShift.dy),
              (b.y *= c),
              (b.width = a.width * c),
              (b.height = a.height * c),
              (b.x2 = b.x + b.width),
              (b.y2 = b.y + b.height),
              b
            )
          }
          return a
        }),
        (E._getBBox = function () {
          return this.removed
            ? {}
            : {
                x: this.X + (this.bbx || 0) - this.W / 2,
                y: this.Y - this.H,
                width: this.W,
                height: this.H,
              }
        }),
        (E.remove = function () {
          if (!this.removed && this.node.parentNode) {
            this.paper.__set__ && this.paper.__set__.exclude(this),
              a.eve.unbind('raphael.*.*.' + this.id),
              a._tear(this, this.paper),
              this.node.parentNode.removeChild(this.node),
              this.shape && this.shape.parentNode.removeChild(this.shape)
            for (var b in this)
              this[b] =
                'function' == typeof this[b] ? a._removedFactory(b) : null
            this.removed = !0
          }
        }),
        (E.attr = function (c, d) {
          if (this.removed) return this
          if (null == c) {
            var e = {}
            for (var f in this.attrs) this.attrs[b](f) && (e[f] = this.attrs[f])
            return (
              e.gradient &&
                'none' == e.fill &&
                (e.fill = e.gradient) &&
                delete e.gradient,
              (e.transform = this._.transform),
              e
            )
          }
          if (null == d && a.is(c, 'string')) {
            if (c == j && 'none' == this.attrs.fill && this.attrs.gradient)
              return this.attrs.gradient
            for (var g = c.split(k), h = {}, i = 0, m = g.length; m > i; i++)
              (c = g[i]),
                c in this.attrs
                  ? (h[c] = this.attrs[c])
                  : a.is(this.paper.customAttributes[c], 'function')
                  ? (h[c] = this.paper.customAttributes[c].def)
                  : (h[c] = a._availableAttrs[c])
            return m - 1 ? h : h[g[0]]
          }
          if (this.attrs && null == d && a.is(c, 'array')) {
            for (h = {}, i = 0, m = c.length; m > i; i++)
              h[c[i]] = this.attr(c[i])
            return h
          }
          var n
          null != d && ((n = {}), (n[c] = d)),
            null == d && a.is(c, 'object') && (n = c)
          for (var o in n) l('raphael.attr.' + o + '.' + this.id, this, n[o])
          if (n) {
            for (o in this.paper.customAttributes)
              if (
                this.paper.customAttributes[b](o) &&
                n[b](o) &&
                a.is(this.paper.customAttributes[o], 'function')
              ) {
                var p = this.paper.customAttributes[o].apply(
                  this,
                  [].concat(n[o])
                )
                this.attrs[o] = n[o]
                for (var q in p) p[b](q) && (n[q] = p[q])
              }
            n.text && 'text' == this.type && (this.textpath.string = n.text),
              B(this, n)
          }
          return this
        }),
        (E.toFront = function () {
          return (
            !this.removed && this.node.parentNode.appendChild(this.node),
            this.paper &&
              this.paper.top != this &&
              a._tofront(this, this.paper),
            this
          )
        }),
        (E.toBack = function () {
          return this.removed
            ? this
            : (this.node.parentNode.firstChild != this.node &&
                (this.node.parentNode.insertBefore(
                  this.node,
                  this.node.parentNode.firstChild
                ),
                a._toback(this, this.paper)),
              this)
        }),
        (E.insertAfter = function (b) {
          return this.removed
            ? this
            : (b.constructor == a.st.constructor && (b = b[b.length - 1]),
              b.node.nextSibling
                ? b.node.parentNode.insertBefore(this.node, b.node.nextSibling)
                : b.node.parentNode.appendChild(this.node),
              a._insertafter(this, b, this.paper),
              this)
        }),
        (E.insertBefore = function (b) {
          return this.removed
            ? this
            : (b.constructor == a.st.constructor && (b = b[0]),
              b.node.parentNode.insertBefore(this.node, b.node),
              a._insertbefore(this, b, this.paper),
              this)
        }),
        (E.blur = function (b) {
          var c = this.node.runtimeStyle,
            d = c.filter
          return (
            (d = d.replace(r, o)),
            0 !== +b
              ? ((this.attrs.blur = b),
                (c.filter =
                  d + n + m + '.Blur(pixelradius=' + (+b || 1.5) + ')'),
                (c.margin = a.format('-{0}px 0 0 -{0}px', f(+b || 1.5))))
              : ((c.filter = d), (c.margin = 0), delete this.attrs.blur),
            this
          )
        }),
        (a._engine.path = function (a, b) {
          var c = F('shape')
          ;(c.style.cssText = t),
            (c.coordsize = u + n + u),
            (c.coordorigin = b.coordorigin)
          var d = new D(c, b),
            e = { fill: 'none', stroke: '#000' }
          a && (e.path = a),
            (d.type = 'path'),
            (d.path = []),
            (d.Path = o),
            B(d, e),
            b.canvas.appendChild(c)
          var f = F('skew')
          return (f.on = !0), c.appendChild(f), (d.skew = f), d.transform(o), d
        }),
        (a._engine.rect = function (b, c, d, e, f, g) {
          var h = a._rectPath(c, d, e, f, g),
            i = b.path(h),
            j = i.attrs
          return (
            (i.X = j.x = c),
            (i.Y = j.y = d),
            (i.W = j.width = e),
            (i.H = j.height = f),
            (j.r = g),
            (j.path = h),
            (i.type = 'rect'),
            i
          )
        }),
        (a._engine.ellipse = function (a, b, c, d, e) {
          {
            var f = a.path()
            f.attrs
          }
          return (
            (f.X = b - d),
            (f.Y = c - e),
            (f.W = 2 * d),
            (f.H = 2 * e),
            (f.type = 'ellipse'),
            B(f, { cx: b, cy: c, rx: d, ry: e }),
            f
          )
        }),
        (a._engine.circle = function (a, b, c, d) {
          {
            var e = a.path()
            e.attrs
          }
          return (
            (e.X = b - d),
            (e.Y = c - d),
            (e.W = e.H = 2 * d),
            (e.type = 'circle'),
            B(e, { cx: b, cy: c, r: d }),
            e
          )
        }),
        (a._engine.image = function (b, c, d, e, f, g) {
          var h = a._rectPath(d, e, f, g),
            i = b.path(h).attr({ stroke: 'none' }),
            k = i.attrs,
            l = i.node,
            m = l.getElementsByTagName(j)[0]
          return (
            (k.src = c),
            (i.X = k.x = d),
            (i.Y = k.y = e),
            (i.W = k.width = f),
            (i.H = k.height = g),
            (k.path = h),
            (i.type = 'image'),
            m.parentNode == l && l.removeChild(m),
            (m.rotate = !0),
            (m.src = c),
            (m.type = 'tile'),
            (i._.fillpos = [d, e]),
            (i._.fillsize = [f, g]),
            l.appendChild(m),
            z(i, 1, 1, 0, 0, 0),
            i
          )
        }),
        (a._engine.text = function (b, d, e, g) {
          var h = F('shape'),
            i = F('path'),
            j = F('textpath')
          ;(d = d || 0),
            (e = e || 0),
            (g = g || ''),
            (i.v = a.format(
              'm{0},{1}l{2},{1}',
              f(d * u),
              f(e * u),
              f(d * u) + 1
            )),
            (i.textpathok = !0),
            (j.string = c(g)),
            (j.on = !0),
            (h.style.cssText = t),
            (h.coordsize = u + n + u),
            (h.coordorigin = '0 0')
          var k = new D(h, b),
            l = {
              fill: '#000',
              stroke: 'none',
              font: a._availableAttrs.font,
              text: g,
            }
          ;(k.shape = h),
            (k.path = i),
            (k.textpath = j),
            (k.type = 'text'),
            (k.attrs.text = c(g)),
            (k.attrs.x = d),
            (k.attrs.y = e),
            (k.attrs.w = 1),
            (k.attrs.h = 1),
            B(k, l),
            h.appendChild(j),
            h.appendChild(i),
            b.canvas.appendChild(h)
          var m = F('skew')
          return (m.on = !0), h.appendChild(m), (k.skew = m), k.transform(o), k
        }),
        (a._engine.setSize = function (b, c) {
          var d = this.canvas.style
          return (
            (this.width = b),
            (this.height = c),
            b == +b && (b += 'px'),
            c == +c && (c += 'px'),
            (d.width = b),
            (d.height = c),
            (d.clip = 'rect(0 ' + b + ' ' + c + ' 0)'),
            this._viewBox && a._engine.setViewBox.apply(this, this._viewBox),
            this
          )
        }),
        (a._engine.setViewBox = function (b, c, d, e, f) {
          a.eve('raphael.setViewBox', this, this._viewBox, [b, c, d, e, f])
          var g,
            h,
            i = this.getSize(),
            j = i.width,
            k = i.height
          return (
            f &&
              ((g = k / e),
              (h = j / d),
              j > d * g && (b -= (j - d * g) / 2 / g),
              k > e * h && (c -= (k - e * h) / 2 / h)),
            (this._viewBox = [b, c, d, e, !!f]),
            (this._viewBoxShift = { dx: -b, dy: -c, scale: i }),
            this.forEach(function (a) {
              a.transform('...')
            }),
            this
          )
        })
      var F
      ;(a._engine.initWin = function (a) {
        var b = a.document
        b.styleSheets.length < 31
          ? b.createStyleSheet().addRule('.rvml', 'behavior:url(#default#VML)')
          : b.styleSheets[0].addRule('.rvml', 'behavior:url(#default#VML)')
        try {
          !b.namespaces.rvml &&
            b.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml'),
            (F = function (a) {
              return b.createElement('<rvml:' + a + ' class="rvml">')
            })
        } catch (c) {
          F = function (a) {
            return b.createElement(
              '<' + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'
            )
          }
        }
      }),
        a._engine.initWin(a._g.win),
        (a._engine.create = function () {
          var b = a._getContainer.apply(0, arguments),
            c = b.container,
            d = b.height,
            e = b.width,
            f = b.x,
            g = b.y
          if (!c) throw new Error('VML container not found.')
          var h = new a._Paper(),
            i = (h.canvas = a._g.doc.createElement('div')),
            j = i.style
          return (
            (f = f || 0),
            (g = g || 0),
            (e = e || 512),
            (d = d || 342),
            (h.width = e),
            (h.height = d),
            e == +e && (e += 'px'),
            d == +d && (d += 'px'),
            (h.coordsize = 1e3 * u + n + 1e3 * u),
            (h.coordorigin = '0 0'),
            (h.span = a._g.doc.createElement('span')),
            (h.span.style.cssText =
              'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;'),
            i.appendChild(h.span),
            (j.cssText = a.format(
              'top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden',
              e,
              d
            )),
            1 == c
              ? (a._g.doc.body.appendChild(i),
                (j.left = f + 'px'),
                (j.top = g + 'px'),
                (j.position = 'absolute'))
              : c.firstChild
              ? c.insertBefore(i, c.firstChild)
              : c.appendChild(i),
            (h.renderfix = function () {}),
            h
          )
        }),
        (a.prototype.clear = function () {
          a.eve('raphael.clear', this),
            (this.canvas.innerHTML = o),
            (this.span = a._g.doc.createElement('span')),
            (this.span.style.cssText =
              'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;'),
            this.canvas.appendChild(this.span),
            (this.bottom = this.top = null)
        }),
        (a.prototype.remove = function () {
          a.eve('raphael.remove', this),
            this.canvas.parentNode.removeChild(this.canvas)
          for (var b in this)
            this[b] = 'function' == typeof this[b] ? a._removedFactory(b) : null
          return !0
        })
      var G = a.st
      for (var H in E)
        E[b](H) &&
          !G[b](H) &&
          (G[H] = (function (a) {
            return function () {
              var b = arguments
              return this.forEach(function (c) {
                c[a].apply(c, b)
              })
            }
          })(H))
    }
  })
/**
 * JustGage - animated gauges using RaphaelJS
 * Check http://www.justgage.com for official releases
 * Licensed under MIT.
 * @author Bojan Djuricic (@Toorshia)
 **/

JustGage = function (config) {
  var obj = this

  // Helps in case developer wants to debug it. unobtrusive
  if (config === null || config === undefined) {
    console.log('* justgage: Make sure to pass options to the constructor!')
    return false
  }

  var node

  if (config.id !== null && config.id !== undefined) {
    node = document.getElementById(config.id)
    if (!node) {
      console.log('* justgage: No element with id : %s found', config.id)
      return false
    }
  } else if (config.parentNode !== null && config.parentNode !== undefined) {
    node = config.parentNode
  } else {
    console.log(
      '* justgage: Make sure to pass the existing element id or parentNode to the constructor.'
    )
    return false
  }

  var dataset = node.dataset ? node.dataset : {}

  // check for defaults
  var defaults =
    config.defaults !== null && config.defaults !== undefined
      ? config.defaults
      : false
  if (defaults !== false) {
    config = extend({}, config, defaults)
    delete config.defaults
  }

  // configurable parameters
  obj.config = {
    // id : string
    // this is container element id
    id: config.id,

    // value : float
    // value gauge is showing
    value: kvLookup('value', config, dataset, 0, 'float'),

    // defaults : bool
    // defaults parameter to use
    defaults: kvLookup('defaults', config, dataset, 0, false),

    // parentNode : node object
    // this is container element
    parentNode: kvLookup('parentNode', config, dataset, null),

    // width : int
    // gauge width
    width: kvLookup('width', config, dataset, null),

    // height : int
    // gauge height
    height: kvLookup('height', config, dataset, null),

    // title : string
    // gauge title
    title: kvLookup('title', config, dataset, ''),

    // titleFontColor : string
    // color of gauge title
    titleFontColor: kvLookup('titleFontColor', config, dataset, '#999999'),

    // titleFontFamily : string
    // color of gauge title
    titleFontFamily: kvLookup('titleFontFamily', config, dataset, 'sans-serif'),

    // titlePosition : string
    // 'above' or 'below'
    titlePosition: kvLookup('titlePosition', config, dataset, 'above'),

    // valueFontColor : string
    // color of label showing current value
    valueFontColor: kvLookup('valueFontColor', config, dataset, '#010101'),

    // valueFontFamily : string
    // color of label showing current value
    valueFontFamily: kvLookup('valueFontFamily', config, dataset, 'Arial'),

    // symbol : string
    // special symbol to show next to value
    symbol: kvLookup('symbol', config, dataset, ''),

    // min : float
    // min value
    min: kvLookup('min', config, dataset, 0, 'float'),

    // max : float
    // max value
    max: kvLookup('max', config, dataset, 100, 'float'),

    // reverse : bool
    // reverse min and max
    reverse: kvLookup('reverse', config, dataset, false),

    // humanFriendlyDecimal : int
    // number of decimal places for our human friendly number to contain
    humanFriendlyDecimal: kvLookup('humanFriendlyDecimal', config, dataset, 0),

    // textRenderer: func
    // function applied before rendering text
    textRenderer: kvLookup('textRenderer', config, dataset, null),

    // gaugeWidthScale : float
    // width of the gauge element
    gaugeWidthScale: kvLookup('gaugeWidthScale', config, dataset, 1.0),

    // gaugeColor : string
    // background color of gauge element
    gaugeColor: kvLookup('gaugeColor', config, dataset, '#edebeb'),

    // label : string
    // text to show below value
    label: kvLookup('label', config, dataset, ''),

    // labelFontColor : string
    // color of label showing label under value
    labelFontColor: kvLookup('labelFontColor', config, dataset, '#b3b3b3'),

    // shadowOpacity : int
    // 0 ~ 1
    shadowOpacity: kvLookup('shadowOpacity', config, dataset, 0.2),

    // shadowSize: int
    // inner shadow size
    shadowSize: kvLookup('shadowSize', config, dataset, 5),

    // shadowVerticalOffset : int
    // how much shadow is offset from top
    shadowVerticalOffset: kvLookup('shadowVerticalOffset', config, dataset, 3),

    // levelColors : string[]
    // colors of indicator, from lower to upper, in RGB format
    levelColors: kvLookup(
      'levelColors',
      config,
      dataset,
      ['#a9d70b', '#f9c802', '#ff0000'],
      'array',
      ','
    ),

    // startAnimationTime : int
    // length of initial animation
    startAnimationTime: kvLookup('startAnimationTime', config, dataset, 700),

    // startAnimationType : string
    // type of initial animation (linear, >, <,  <>, bounce)
    startAnimationType: kvLookup('startAnimationType', config, dataset, '>'),

    // refreshAnimationTime : int
    // length of refresh animation
    refreshAnimationTime: kvLookup(
      'refreshAnimationTime',
      config,
      dataset,
      700
    ),

    // refreshAnimationType : string
    // type of refresh animation (linear, >, <,  <>, bounce)
    refreshAnimationType: kvLookup(
      'refreshAnimationType',
      config,
      dataset,
      '>'
    ),

    // donutStartAngle : int
    // angle to start from when in donut mode
    donutStartAngle: kvLookup('donutStartAngle', config, dataset, 90),

    // valueMinFontSize : int
    // absolute minimum font size for the value
    valueMinFontSize: kvLookup('valueMinFontSize', config, dataset, 16),

    // titleMinFontSize
    // absolute minimum font size for the title
    titleMinFontSize: kvLookup('titleMinFontSize', config, dataset, 10),

    // labelMinFontSize
    // absolute minimum font size for the label
    labelMinFontSize: kvLookup('labelMinFontSize', config, dataset, 10),

    // minLabelMinFontSize
    // absolute minimum font size for the minimum label
    minLabelMinFontSize: kvLookup('minLabelMinFontSize', config, dataset, 10),

    // maxLabelMinFontSize
    // absolute minimum font size for the maximum label
    maxLabelMinFontSize: kvLookup('maxLabelMinFontSize', config, dataset, 10),

    // hideValue : bool
    // hide value text
    hideValue: kvLookup('hideValue', config, dataset, false),

    // hideMinMax : bool
    // hide min and max values
    hideMinMax: kvLookup('hideMinMax', config, dataset, false),

    // hideInnerShadow : bool
    // hide inner shadow
    hideInnerShadow: kvLookup('hideInnerShadow', config, dataset, false),

    // humanFriendly : bool
    // convert large numbers for min, max, value to human friendly (e.g. 1234567 -> 1.23M)
    humanFriendly: kvLookup('humanFriendly', config, dataset, false),

    // noGradient : bool
    // whether to use gradual color change for value, or sector-based
    noGradient: kvLookup('noGradient', config, dataset, false),

    // donut : bool
    // show full donut gauge
    donut: kvLookup('donut', config, dataset, false),

    // relativeGaugeSize : bool
    // whether gauge size should follow changes in container element size
    relativeGaugeSize: kvLookup('relativeGaugeSize', config, dataset, false),

    // counter : bool
    // animate level number change
    counter: kvLookup('counter', config, dataset, false),

    // decimals : int
    // number of digits after floating point
    decimals: kvLookup('decimals', config, dataset, 0),

    // customSectors : [] of objects
    // number of digits after floating point
    customSectors: kvLookup('customSectors', config, dataset, []),

    // formatNumber: boolean
    // formats numbers with commas where appropriate
    formatNumber: kvLookup('formatNumber', config, dataset, false),

    // pointer : bool
    // show value pointer
    pointer: kvLookup('pointer', config, dataset, false),

    // pointerOptions : object
    // define pointer look
    pointerOptions: kvLookup('pointerOptions', config, dataset, []),
  }

  // variables
  var canvasW,
    canvasH,
    widgetW,
    widgetH,
    aspect,
    dx,
    dy,
    titleFontSize,
    titleX,
    titleY,
    valueFontSize,
    valueX,
    valueY,
    labelFontSize,
    labelX,
    labelY,
    minFontSize,
    minX,
    minY,
    maxFontSize,
    maxX,
    maxY

  // overflow values
  if (obj.config.value > obj.config.max) obj.config.value = obj.config.max
  if (obj.config.value < obj.config.min) obj.config.value = obj.config.min
  obj.originalValue = kvLookup('value', config, dataset, -1, 'float')

  // create canvas
  if (
    obj.config.id !== null &&
    document.getElementById(obj.config.id) !== null
  ) {
    obj.canvas = Raphael(obj.config.id, '100%', '100%')
  } else if (obj.config.parentNode !== null) {
    obj.canvas = Raphael(obj.config.parentNode, '100%', '100%')
  }

  if (obj.config.relativeGaugeSize === true) {
    obj.canvas.setViewBox(0, 0, 200, 150, true)
  }

  // canvas dimensions
  if (obj.config.relativeGaugeSize === true) {
    canvasW = 200
    canvasH = 150
  } else if (obj.config.width !== null && obj.config.height !== null) {
    canvasW = obj.config.width
    canvasH = obj.config.height
  } else if (obj.config.parentNode !== null) {
    obj.canvas.setViewBox(0, 0, 200, 150, true)
    canvasW = 200
    canvasH = 150
  } else {
    canvasW =
      getStyle(document.getElementById(obj.config.id), 'width').slice(0, -2) * 1
    canvasH =
      getStyle(document.getElementById(obj.config.id), 'height').slice(0, -2) *
      1
  }

  // widget dimensions
  if (obj.config.donut === true) {
    // DONUT *******************************

    // width more than height
    if (canvasW > canvasH) {
      widgetH = canvasH
      widgetW = widgetH
      // width less than height
    } else if (canvasW < canvasH) {
      widgetW = canvasW
      widgetH = widgetW
      // if height don't fit, rescale both
      if (widgetH > canvasH) {
        aspect = widgetH / canvasH
        widgetH = widgetH / aspect
        widgetW = widgetH / aspect
      }
      // equal
    } else {
      widgetW = canvasW
      widgetH = widgetW
    }

    // delta
    dx = (canvasW - widgetW) / 2
    dy = (canvasH - widgetH) / 2

    // title
    titleFontSize = widgetH / 8 > 10 ? widgetH / 10 : 10
    titleX = dx + widgetW / 2
    titleY = dy + widgetH / 11

    // value
    valueFontSize = widgetH / 6.4 > 16 ? widgetH / 5.4 : 18
    valueX = dx + widgetW / 2
    if (obj.config.label !== '') {
      valueY = dy + widgetH / 1.85
    } else {
      valueY = dy + widgetH / 1.7
    }

    // label
    labelFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10
    labelX = dx + widgetW / 2
    labelY = valueY + labelFontSize

    // min
    minFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10
    minX =
      dx +
      widgetW / 10 +
      ((widgetW / 6.666666666666667) * obj.config.gaugeWidthScale) / 2
    minY = labelY

    // max
    maxFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10
    maxX =
      dx +
      widgetW -
      widgetW / 10 -
      ((widgetW / 6.666666666666667) * obj.config.gaugeWidthScale) / 2
    maxY = labelY
  } else {
    // HALF *******************************

    // width more than height
    if (canvasW > canvasH) {
      widgetH = canvasH
      widgetW = widgetH * 1.25
      //if width doesn't fit, rescale both
      if (widgetW > canvasW) {
        aspect = widgetW / canvasW
        widgetW = widgetW / aspect
        widgetH = widgetH / aspect
      }
      // width less than height
    } else if (canvasW < canvasH) {
      widgetW = canvasW
      widgetH = widgetW / 1.25
      // if height don't fit, rescale both
      if (widgetH > canvasH) {
        aspect = widgetH / canvasH
        widgetH = widgetH / aspect
        widgetW = widgetH / aspect
      }
      // equal
    } else {
      widgetW = canvasW
      widgetH = widgetW * 0.75
    }

    // delta
    dx = (canvasW - widgetW) / 2
    dy = (canvasH - widgetH) / 2
    if (obj.config.titlePosition === 'below') {
      // shift whole thing down
      dy -= widgetH / 6.4
    }

    // title
    titleFontSize =
      widgetH / 8 > obj.config.titleMinFontSize
        ? widgetH / 10
        : obj.config.titleMinFontSize
    titleX = dx + widgetW / 2
    titleY =
      dy +
      (obj.config.titlePosition === 'below' ? widgetH * 1.07 : widgetH / 6.4)

    // value
    valueFontSize =
      widgetH / 6.5 > obj.config.valueMinFontSize
        ? widgetH / 6.5
        : obj.config.valueMinFontSize
    valueX = dx + widgetW / 2
    valueY = dy + widgetH / 1.275

    // label
    labelFontSize =
      widgetH / 16 > obj.config.labelMinFontSize
        ? widgetH / 16
        : obj.config.labelMinFontSize
    labelX = dx + widgetW / 2
    labelY = valueY + valueFontSize / 2 + 5

    // min
    minFontSize =
      widgetH / 16 > obj.config.minLabelMinFontSize
        ? widgetH / 16
        : obj.config.minLabelMinFontSize
    minX =
      dx +
      widgetW / 10 +
      ((widgetW / 6.666666666666667) * obj.config.gaugeWidthScale) / 2
    minY = labelY

    // max
    maxFontSize =
      widgetH / 16 > obj.config.maxLabelMinFontSize
        ? widgetH / 16
        : obj.config.maxLabelMinFontSize
    maxX =
      dx +
      widgetW -
      widgetW / 10 -
      ((widgetW / 6.666666666666667) * obj.config.gaugeWidthScale) / 2
    maxY = labelY
  }

  // parameters
  obj.params = {
    canvasW: canvasW,
    canvasH: canvasH,
    widgetW: widgetW,
    widgetH: widgetH,
    dx: dx,
    dy: dy,
    titleFontSize: titleFontSize,
    titleX: titleX,
    titleY: titleY,
    valueFontSize: valueFontSize,
    valueX: valueX,
    valueY: valueY,
    labelFontSize: labelFontSize,
    labelX: labelX,
    labelY: labelY,
    minFontSize: minFontSize,
    minX: minX,
    minY: minY,
    maxFontSize: maxFontSize,
    maxX: maxX,
    maxY: maxY,
  }

  // var clear
  canvasW,
    canvasH,
    widgetW,
    widgetH,
    aspect,
    dx,
    dy,
    titleFontSize,
    titleX,
    titleY,
    valueFontSize,
    valueX,
    valueY,
    labelFontSize,
    labelX,
    labelY,
    minFontSize,
    minX,
    minY,
    maxFontSize,
    maxX,
    (maxY = null)

  // pki - custom attribute for generating gauge paths
  obj.canvas.customAttributes.pki = function (
    value,
    min,
    max,
    w,
    h,
    dx,
    dy,
    gws,
    donut,
    reverse
  ) {
    var alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi, path

    if (donut) {
      alpha = (1 - (2 * (value - min)) / (max - min)) * Math.PI
      Ro = w / 2 - w / 7
      Ri = Ro - (w / 6.666666666666667) * gws

      Cx = w / 2 + dx
      Cy = h / 1.95 + dy

      Xo = w / 2 + dx + Ro * Math.cos(alpha)
      Yo = h - (h - Cy) - Ro * Math.sin(alpha)
      Xi = w / 2 + dx + Ri * Math.cos(alpha)
      Yi = h - (h - Cy) - Ri * Math.sin(alpha)

      path = 'M' + (Cx - Ri) + ',' + Cy + ' '
      path += 'L' + (Cx - Ro) + ',' + Cy + ' '
      if (value > (max - min) / 2) {
        path += 'A' + Ro + ',' + Ro + ' 0 0 1 ' + (Cx + Ro) + ',' + Cy + ' '
      }
      path += 'A' + Ro + ',' + Ro + ' 0 0 1 ' + Xo + ',' + Yo + ' '
      path += 'L' + Xi + ',' + Yi + ' '
      if (value > (max - min) / 2) {
        path += 'A' + Ri + ',' + Ri + ' 0 0 0 ' + (Cx + Ri) + ',' + Cy + ' '
      }
      path += 'A' + Ri + ',' + Ri + ' 0 0 0 ' + (Cx - Ri) + ',' + Cy + ' '
      path += 'Z '

      return {
        path: path,
      }
    } else {
      alpha = (1 - (value - min) / (max - min)) * Math.PI
      Ro = w / 2 - w / 10
      Ri = Ro - (w / 6.666666666666667) * gws

      Cx = w / 2 + dx
      Cy = h / 1.25 + dy

      Xo = w / 2 + dx + Ro * Math.cos(alpha)
      Yo = h - (h - Cy) - Ro * Math.sin(alpha)
      Xi = w / 2 + dx + Ri * Math.cos(alpha)
      Yi = h - (h - Cy) - Ri * Math.sin(alpha)

      path = 'M' + (Cx - Ri) + ',' + Cy + ' '
      path += 'L' + (Cx - Ro) + ',' + Cy + ' '
      path += 'A' + Ro + ',' + Ro + ' 0 0 1 ' + Xo + ',' + Yo + ' '
      path += 'L' + Xi + ',' + Yi + ' '
      path += 'A' + Ri + ',' + Ri + ' 0 0 0 ' + (Cx - Ri) + ',' + Cy + ' '
      path += 'Z '

      return {
        path: path,
      }
    }

    // var clear
    alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi, (path = null)
  }

  // ndl - custom attribute for generating needle path
  obj.canvas.customAttributes.ndl = function (
    value,
    min,
    max,
    w,
    h,
    dx,
    dy,
    gws,
    donut
  ) {
    var dlt = (w * 3.5) / 100
    var dlb = w / 15
    var dw = w / 100

    if (
      obj.config.pointerOptions.toplength != null &&
      obj.config.pointerOptions.toplength != undefined
    )
      dlt = obj.config.pointerOptions.toplength
    if (
      obj.config.pointerOptions.bottomlength != null &&
      obj.config.pointerOptions.bottomlength != undefined
    )
      dlb = obj.config.pointerOptions.bottomlength
    if (
      obj.config.pointerOptions.bottomwidth != null &&
      obj.config.pointerOptions.bottomwidth != undefined
    )
      dw = obj.config.pointerOptions.bottomwidth

    var alpha,
      Ro,
      Ri,
      Cx,
      Cy,
      Xo,
      Yo,
      Xi,
      Yi,
      Xc,
      Yc,
      Xz,
      Yz,
      Xa,
      Ya,
      Xb,
      Yb,
      path

    if (donut) {
      alpha = (1 - (2 * (value - min)) / (max - min)) * Math.PI
      Ro = w / 2 - w / 7
      Ri = Ro - (w / 6.666666666666667) * gws

      Cx = w / 2 + dx
      Cy = h / 1.95 + dy

      Xo = w / 2 + dx + Ro * Math.cos(alpha)
      Yo = h - (h - Cy) - Ro * Math.sin(alpha)
      Xi = w / 2 + dx + Ri * Math.cos(alpha)
      Yi = h - (h - Cy) - Ri * Math.sin(alpha)

      Xc = Xo + dlt * Math.cos(alpha)
      Yc = Yo - dlt * Math.sin(alpha)
      Xz = Xi - dlb * Math.cos(alpha)
      Yz = Yi + dlb * Math.sin(alpha)

      Xa = Xz + dw * Math.sin(alpha)
      Ya = Yz + dw * Math.cos(alpha)
      Xb = Xz - dw * Math.sin(alpha)
      Yb = Yz - dw * Math.cos(alpha)

      path = 'M' + Xa + ',' + Ya + ' '
      path += 'L' + Xb + ',' + Yb + ' '
      path += 'L' + Xc + ',' + Yc + ' '
      path += 'Z '

      return {
        path: path,
      }
    } else {
      alpha = (1 - (value - min) / (max - min)) * Math.PI
      Ro = w / 2 - w / 10
      Ri = Ro - (w / 6.666666666666667) * gws

      Cx = w / 2 + dx
      Cy = h / 1.25 + dy

      Xo = w / 2 + dx + Ro * Math.cos(alpha)
      Yo = h - (h - Cy) - Ro * Math.sin(alpha)
      Xi = w / 2 + dx + Ri * Math.cos(alpha)
      Yi = h - (h - Cy) - Ri * Math.sin(alpha)

      Xc = Xo + dlt * Math.cos(alpha)
      Yc = Yo - dlt * Math.sin(alpha)
      Xz = Xi - dlb * Math.cos(alpha)
      Yz = Yi + dlb * Math.sin(alpha)

      Xa = Xz + dw * Math.sin(alpha)
      Ya = Yz + dw * Math.cos(alpha)
      Xb = Xz - dw * Math.sin(alpha)
      Yb = Yz - dw * Math.cos(alpha)

      path = 'M' + Xa + ',' + Ya + ' '
      path += 'L' + Xb + ',' + Yb + ' '
      path += 'L' + Xc + ',' + Yc + ' '
      path += 'Z '

      return {
        path: path,
      }
    }

    // var clear
    alpha,
      Ro,
      Ri,
      Cx,
      Cy,
      Xo,
      Yo,
      Xi,
      Yi,
      Xc,
      Yc,
      Xz,
      Yz,
      Xa,
      Ya,
      Xb,
      Yb,
      (path = null)
  }

  // gauge
  obj.gauge = obj.canvas.path().attr({
    stroke: 'none',
    fill: obj.config.gaugeColor,
    pki: [
      obj.config.max,
      obj.config.min,
      obj.config.max,
      obj.params.widgetW,
      obj.params.widgetH,
      obj.params.dx,
      obj.params.dy,
      obj.config.gaugeWidthScale,
      obj.config.donut,
      obj.config.reverse,
    ],
  })

  // level
  obj.level = obj.canvas.path().attr({
    stroke: 'none',
    fill: getColor(
      obj.config.value,
      (obj.config.value - obj.config.min) / (obj.config.max - obj.config.min),
      obj.config.levelColors,
      obj.config.noGradient,
      obj.config.customSectors
    ),
    pki: [
      obj.config.min,
      obj.config.min,
      obj.config.max,
      obj.params.widgetW,
      obj.params.widgetH,
      obj.params.dx,
      obj.params.dy,
      obj.config.gaugeWidthScale,
      obj.config.donut,
      obj.config.reverse,
    ],
  })
  if (obj.config.donut) {
    obj.level.transform(
      'r' +
        obj.config.donutStartAngle +
        ', ' +
        (obj.params.widgetW / 2 + obj.params.dx) +
        ', ' +
        (obj.params.widgetH / 1.95 + obj.params.dy)
    )
  }

  if (obj.config.pointer) {
    // needle
    obj.needle = obj.canvas.path().attr({
      stroke:
        obj.config.pointerOptions.stroke !== null &&
        obj.config.pointerOptions.stroke !== undefined
          ? obj.config.pointerOptions.stroke
          : 'none',
      'stroke-width':
        obj.config.pointerOptions.stroke_width !== null &&
        obj.config.pointerOptions.stroke_width !== undefined
          ? obj.config.pointerOptions.stroke_width
          : 0,
      'stroke-linecap':
        obj.config.pointerOptions.stroke_linecap !== null &&
        obj.config.pointerOptions.stroke_linecap !== undefined
          ? obj.config.pointerOptions.stroke_linecap
          : 'square',
      fill:
        obj.config.pointerOptions.color !== null &&
        obj.config.pointerOptions.color !== undefined
          ? obj.config.pointerOptions.color
          : '#000000',
      ndl: [
        obj.config.min,
        obj.config.min,
        obj.config.max,
        obj.params.widgetW,
        obj.params.widgetH,
        obj.params.dx,
        obj.params.dy,
        obj.config.gaugeWidthScale,
        obj.config.donut,
      ],
    })

    if (obj.config.donut) {
      obj.needle.transform(
        'r' +
          obj.config.donutStartAngle +
          ', ' +
          (obj.params.widgetW / 2 + obj.params.dx) +
          ', ' +
          (obj.params.widgetH / 1.95 + obj.params.dy)
      )
    }
  }

  // title
  obj.txtTitle = obj.canvas.text(
    obj.params.titleX,
    obj.params.titleY,
    obj.config.title
  )
  obj.txtTitle.attr({
    'font-size': obj.params.titleFontSize,
    'font-weight': 'bold',
    'font-family': obj.config.titleFontFamily,
    fill: obj.config.titleFontColor,
    'fill-opacity': '1',
  })
  setDy(obj.txtTitle, obj.params.titleFontSize, obj.params.titleY)

  // value
  obj.txtValue = obj.canvas.text(obj.params.valueX, obj.params.valueY, 0)
  obj.txtValue.attr({
    'font-size': obj.params.valueFontSize,
    'font-weight': 'bold',
    'font-family': obj.config.valueFontFamily,
    fill: obj.config.valueFontColor,
    'fill-opacity': '0',
  })
  setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY)

  // label
  obj.txtLabel = obj.canvas.text(
    obj.params.labelX,
    obj.params.labelY,
    obj.config.label
  )
  obj.txtLabel.attr({
    'font-size': obj.params.labelFontSize,
    'font-weight': 'normal',
    'font-family': 'Arial',
    fill: obj.config.labelFontColor,
    'fill-opacity': '0',
  })
  setDy(obj.txtLabel, obj.params.labelFontSize, obj.params.labelY)

  // min
  var min = obj.config.min
  if (obj.config.reverse) {
    min = obj.config.max
  }

  obj.txtMinimum = min
  if (obj.config.humanFriendly) {
    obj.txtMinimum = humanFriendlyNumber(min, obj.config.humanFriendlyDecimal)
  } else if (obj.config.formatNumber) {
    obj.txtMinimum = formatNumber(min)
  }
  obj.txtMin = obj.canvas.text(obj.params.minX, obj.params.minY, obj.txtMinimum)
  obj.txtMin.attr({
    'font-size': obj.params.minFontSize,
    'font-weight': 'normal',
    'font-family': 'Arial',
    fill: obj.config.labelFontColor,
    'fill-opacity': obj.config.hideMinMax || obj.config.donut ? '0' : '1',
  })
  setDy(obj.txtMin, obj.params.minFontSize, obj.params.minY)

  // max
  var max = obj.config.max
  if (obj.config.reverse) {
    max = obj.config.min
  }
  obj.txtMaximum = max
  if (obj.config.humanFriendly) {
    obj.txtMaximum = humanFriendlyNumber(max, obj.config.humanFriendlyDecimal)
  } else if (obj.config.formatNumber) {
    obj.txtMaximum = formatNumber(max)
  }
  obj.txtMax = obj.canvas.text(obj.params.maxX, obj.params.maxY, obj.txtMaximum)
  obj.txtMax.attr({
    'font-size': obj.params.maxFontSize,
    'font-weight': 'normal',
    'font-family': 'Arial',
    fill: obj.config.labelFontColor,
    'fill-opacity': obj.config.hideMinMax || obj.config.donut ? '0' : '1',
  })
  setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY)

  var defs = obj.canvas.canvas.childNodes[1]
  var svg = 'http://www.w3.org/2000/svg'

  if (ie !== 'undefined' && ie < 9) {
    // VML mode - no SVG & SVG filter support
  } else if (ie !== 'undefined') {
    onCreateElementNsReady(function () {
      obj.generateShadow(svg, defs)
    })
  } else {
    obj.generateShadow(svg, defs)
  }

  // var clear
  defs, (svg = null)

  // set value to display
  if (obj.config.textRenderer) {
    obj.originalValue = obj.config.textRenderer(obj.originalValue)
  } else if (obj.config.humanFriendly) {
    obj.originalValue =
      humanFriendlyNumber(obj.originalValue, obj.config.humanFriendlyDecimal) +
      obj.config.symbol
  } else if (obj.config.formatNumber) {
    obj.originalValue = formatNumber(obj.originalValue) + obj.config.symbol
  } else {
    obj.originalValue =
      (obj.originalValue * 1).toFixed(obj.config.decimals) + obj.config.symbol
  }

  if (obj.config.counter === true) {
    //on each animation frame
    eve.on('raphael.anim.frame.' + obj.level.id, function () {
      var currentValue = obj.level.attr('pki')[0]
      if (obj.config.reverse) {
        currentValue =
          obj.config.max * 1 + obj.config.min * 1 - obj.level.attr('pki')[0] * 1
      }
      if (obj.config.textRenderer) {
        obj.txtValue.attr(
          'text',
          obj.config.textRenderer(Math.floor(currentValue))
        )
      } else if (obj.config.humanFriendly) {
        obj.txtValue.attr(
          'text',
          humanFriendlyNumber(
            Math.floor(currentValue),
            obj.config.humanFriendlyDecimal
          ) + obj.config.symbol
        )
      } else if (obj.config.formatNumber) {
        obj.txtValue.attr(
          'text',
          formatNumber(Math.floor(currentValue)) + obj.config.symbol
        )
      } else {
        obj.txtValue.attr(
          'text',
          (currentValue * 1).toFixed(obj.config.decimals) + obj.config.symbol
        )
      }
      setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY)
      currentValue = null
    })
    //on animation end
    eve.on('raphael.anim.finish.' + obj.level.id, function () {
      obj.txtValue.attr({
        text: obj.originalValue,
      })
      setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY)
    })
  } else {
    //on animation start
    eve.on('raphael.anim.start.' + obj.level.id, function () {
      obj.txtValue.attr({
        text: obj.originalValue,
      })
      setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY)
    })
  }

  // animate gauge level, value & label
  var rvl = obj.config.value
  if (obj.config.reverse) {
    rvl = obj.config.max * 1 + obj.config.min * 1 - obj.config.value * 1
  }
  obj.level.animate(
    {
      pki: [
        rvl,
        obj.config.min,
        obj.config.max,
        obj.params.widgetW,
        obj.params.widgetH,
        obj.params.dx,
        obj.params.dy,
        obj.config.gaugeWidthScale,
        obj.config.donut,
        obj.config.reverse,
      ],
    },
    obj.config.startAnimationTime,
    obj.config.startAnimationType
  )

  if (obj.config.pointer) {
    obj.needle.animate(
      {
        ndl: [
          rvl,
          obj.config.min,
          obj.config.max,
          obj.params.widgetW,
          obj.params.widgetH,
          obj.params.dx,
          obj.params.dy,
          obj.config.gaugeWidthScale,
          obj.config.donut,
        ],
      },
      obj.config.startAnimationTime,
      obj.config.startAnimationType
    )
  }

  obj.txtValue.animate(
    {
      'fill-opacity': obj.config.hideValue ? '0' : '1',
    },
    obj.config.startAnimationTime,
    obj.config.startAnimationType
  )
  obj.txtLabel.animate(
    {
      'fill-opacity': '1',
    },
    obj.config.startAnimationTime,
    obj.config.startAnimationType
  )
}

/** Refresh gauge level */
JustGage.prototype.refresh = function (val, max) {
  var obj = this
  var displayVal,
    color,
    max = max || null

  // set new max
  if (max !== null) {
    obj.config.max = max
    // TODO: update customSectors

    obj.txtMaximum = obj.config.max
    if (obj.config.humanFriendly) {
      obj.txtMaximum = humanFriendlyNumber(
        obj.config.max,
        obj.config.humanFriendlyDecimal
      )
    } else if (obj.config.formatNumber) {
      obj.txtMaximum = formatNumber(obj.config.max)
    }
    if (!obj.config.reverse) {
      obj.txtMax.attr({
        text: obj.txtMaximum,
      })
      setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY)
    } else {
      obj.txtMin.attr({
        text: obj.txtMaximum,
      })
      setDy(obj.txtMin, obj.params.minFontSize, obj.params.minY)
    }
  }

  // overflow values
  displayVal = val
  if (val * 1 > obj.config.max * 1) {
    val = obj.config.max * 1
  }
  if (val * 1 < obj.config.min * 1) {
    val = obj.config.min * 1
  }

  color = getColor(
    val,
    (val - obj.config.min) / (obj.config.max - obj.config.min),
    obj.config.levelColors,
    obj.config.noGradient,
    obj.config.customSectors
  )

  if (obj.config.textRenderer) {
    displayVal = obj.config.textRenderer(displayVal)
  } else if (obj.config.humanFriendly) {
    displayVal =
      humanFriendlyNumber(displayVal, obj.config.humanFriendlyDecimal) +
      obj.config.symbol
  } else if (obj.config.formatNumber) {
    displayVal =
      formatNumber((displayVal * 1).toFixed(obj.config.decimals)) +
      obj.config.symbol
  } else {
    displayVal =
      (displayVal * 1).toFixed(obj.config.decimals) + obj.config.symbol
  }
  obj.originalValue = displayVal
  obj.config.value = val * 1

  if (!obj.config.counter) {
    obj.txtValue.attr({
      text: displayVal,
    })
    setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY)
  }

  var rvl = obj.config.value
  if (obj.config.reverse) {
    rvl = obj.config.max * 1 + obj.config.min * 1 - obj.config.value * 1
  }
  obj.level.animate(
    {
      pki: [
        rvl,
        obj.config.min,
        obj.config.max,
        obj.params.widgetW,
        obj.params.widgetH,
        obj.params.dx,
        obj.params.dy,
        obj.config.gaugeWidthScale,
        obj.config.donut,
        obj.config.reverse,
      ],
      fill: color,
    },
    obj.config.refreshAnimationTime,
    obj.config.refreshAnimationType
  )

  if (obj.config.pointer) {
    obj.needle.animate(
      {
        ndl: [
          rvl,
          obj.config.min,
          obj.config.max,
          obj.params.widgetW,
          obj.params.widgetH,
          obj.params.dx,
          obj.params.dy,
          obj.config.gaugeWidthScale,
          obj.config.donut,
        ],
      },
      obj.config.refreshAnimationTime,
      obj.config.refreshAnimationType
    )
  }

  // var clear
  obj, displayVal, color, (max = null)
}

/** Generate shadow */
JustGage.prototype.generateShadow = function (svg, defs) {
  var obj = this
  var sid = 'inner-shadow-' + obj.config.id
  var gaussFilter,
    feOffset,
    feGaussianBlur,
    feComposite1,
    feFlood,
    feComposite2,
    feComposite3

  // FILTER
  gaussFilter = document.createElementNS(svg, 'filter')
  gaussFilter.setAttribute('id', sid)
  defs.appendChild(gaussFilter)

  // offset
  feOffset = document.createElementNS(svg, 'feOffset')
  feOffset.setAttribute('dx', 0)
  feOffset.setAttribute('dy', obj.config.shadowVerticalOffset)
  gaussFilter.appendChild(feOffset)

  // blur
  feGaussianBlur = document.createElementNS(svg, 'feGaussianBlur')
  feGaussianBlur.setAttribute('result', 'offset-blur')
  feGaussianBlur.setAttribute('stdDeviation', obj.config.shadowSize)
  gaussFilter.appendChild(feGaussianBlur)

  // composite 1
  feComposite1 = document.createElementNS(svg, 'feComposite')
  feComposite1.setAttribute('operator', 'out')
  feComposite1.setAttribute('in', 'SourceGraphic')
  feComposite1.setAttribute('in2', 'offset-blur')
  feComposite1.setAttribute('result', 'inverse')
  gaussFilter.appendChild(feComposite1)

  // flood
  feFlood = document.createElementNS(svg, 'feFlood')
  feFlood.setAttribute('flood-color', 'black')
  feFlood.setAttribute('flood-opacity', obj.config.shadowOpacity)
  feFlood.setAttribute('result', 'color')
  gaussFilter.appendChild(feFlood)

  // composite 2
  feComposite2 = document.createElementNS(svg, 'feComposite')
  feComposite2.setAttribute('operator', 'in')
  feComposite2.setAttribute('in', 'color')
  feComposite2.setAttribute('in2', 'inverse')
  feComposite2.setAttribute('result', 'shadow')
  gaussFilter.appendChild(feComposite2)

  // composite 3
  feComposite3 = document.createElementNS(svg, 'feComposite')
  feComposite3.setAttribute('operator', 'over')
  feComposite3.setAttribute('in', 'shadow')
  feComposite3.setAttribute('in2', 'SourceGraphic')
  gaussFilter.appendChild(feComposite3)

  // set shadow
  if (!obj.config.hideInnerShadow) {
    obj.canvas.canvas.childNodes[2].setAttribute('filter', 'url(#' + sid + ')')
    obj.canvas.canvas.childNodes[3].setAttribute('filter', 'url(#' + sid + ')')
  }

  // var clear
  gaussFilter,
    feOffset,
    feGaussianBlur,
    feComposite1,
    feFlood,
    feComposite2,
    (feComposite3 = null)
}

//
// tiny helper function to lookup value of a key from two hash tables
// if none found, return defaultvalue
//
// key: string
// tablea: object
// tableb: DOMStringMap|object
// defval: string|integer|float|null
// datatype: return datatype
// delimiter: delimiter to be used in conjunction with datatype formatting
//
function kvLookup(key, tablea, tableb, defval, datatype, delimiter) {
  var val = defval
  var canConvert = false
  if (!(key === null || key === undefined)) {
    if (
      tableb !== null &&
      tableb !== undefined &&
      typeof tableb === 'object' &&
      key in tableb
    ) {
      val = tableb[key]
      canConvert = true
    } else if (
      tablea !== null &&
      tablea !== undefined &&
      typeof tablea === 'object' &&
      key in tablea
    ) {
      val = tablea[key]
      canConvert = true
    } else {
      val = defval
    }
    if (canConvert === true) {
      if (datatype !== null && datatype !== undefined) {
        switch (datatype) {
          case 'int':
            val = parseInt(val, 10)
            break
          case 'float':
            val = parseFloat(val)
            break
          default:
            break
        }
      }
    }
  }
  return val
}

/** Get color for value */
function getColor(val, pct, col, noGradient, custSec) {
  var no,
    inc,
    colors,
    percentage,
    rval,
    gval,
    bval,
    lower,
    upper,
    range,
    rangePct,
    pctLower,
    pctUpper,
    color
  var noGradient = noGradient || custSec.length > 0

  if (custSec.length > 0) {
    for (var i = 0; i < custSec.length; i++) {
      if (val > custSec[i].lo && val <= custSec[i].hi) {
        return custSec[i].color
      }
    }
  }

  no = col.length
  if (no === 1) return col[0]
  inc = noGradient ? 1 / no : 1 / (no - 1)
  colors = []
  for (i = 0; i < col.length; i++) {
    percentage = noGradient ? inc * (i + 1) : inc * i
    rval = parseInt(cutHex(col[i]).substring(0, 2), 16)
    gval = parseInt(cutHex(col[i]).substring(2, 4), 16)
    bval = parseInt(cutHex(col[i]).substring(4, 6), 16)
    colors[i] = {
      pct: percentage,
      color: {
        r: rval,
        g: gval,
        b: bval,
      },
    }
  }

  if (pct === 0) {
    return (
      'rgb(' +
      [colors[0].color.r, colors[0].color.g, colors[0].color.b].join(',') +
      ')'
    )
  }

  for (var j = 0; j < colors.length; j++) {
    if (pct <= colors[j].pct) {
      if (noGradient) {
        return (
          'rgb(' +
          [colors[j].color.r, colors[j].color.g, colors[j].color.b].join(',') +
          ')'
        )
      } else {
        lower = colors[j - 1]
        upper = colors[j]
        range = upper.pct - lower.pct
        rangePct = (pct - lower.pct) / range
        pctLower = 1 - rangePct
        pctUpper = rangePct
        color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
        }
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
      }
    }
  }
}

/** Fix Raphael display:none tspan dy attribute bug */
function setDy(elem, fontSize, txtYpos) {
  if ((!ie || ie > 9) && elem.node.firstChild.attributes.dy) {
    elem.node.firstChild.attributes.dy.value = 0
  }
}

/** Random integer  */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**  Cut hex  */
function cutHex(str) {
  return str.charAt(0) == '#' ? str.substring(1, 7) : str
}

/**  Human friendly number suffix - From: http://stackoverflow.com/questions/2692323/code-golf-friendly-number-abbreviator */
function humanFriendlyNumber(n, d) {
  var p, d2, i, s

  p = Math.pow
  d2 = p(10, d)
  i = 7
  while (i) {
    s = p(10, i-- * 3)
    if (s <= n) {
      n = Math.round((n * d2) / s) / d2 + 'KMGTPE'[i]
    }
  }
  return n
}

/** Format numbers with commas - From: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript */
function formatNumber(x) {
  var parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**  Get style  */
function getStyle(oElm, strCssRule) {
  var strValue = ''
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView
      .getComputedStyle(oElm, '')
      .getPropertyValue(strCssRule)
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase()
    })
    strValue = oElm.currentStyle[strCssRule]
  }
  return strValue
}

/**  Create Element NS Ready  */
function onCreateElementNsReady(func) {
  if (document.createElementNS !== undefined) {
    func()
  } else {
    setTimeout(function () {
      onCreateElementNsReady(func)
    }, 100)
  }
}

/**  Get IE version  */
// ----------------------------------------------------------
// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
// ie === undefined
// If you're in IE (>=5) then you can determine which version:
// ie === 7; // IE7
// Thus, to detect IE:
// if (ie) {}
// And to detect the version:
// ie === 6 // IE6
// ie > 7 // IE8, IE9 ...
// ie < 9 // Anything less than IE9
// ----------------------------------------------------------
// UPDATE: Now using Live NodeList idea from @jdalton
var ie = (function () {
  var undef,
    v = 3,
    div = document.createElement('div'),
    all = div.getElementsByTagName('i')

  while (
    ((div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->'), all[0])
  );
  return v > 4 ? v : undef
})()

// extend target object with second object
function extend(out) {
  out = out || {}

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key]
    }
  }

  return out
}
