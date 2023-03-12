"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! respimg lazysizes - v5.3.2 */
!function (e, t) {
  var _r;

  e && (_r = function r() {
    t(e.lazySizes), e.removeEventListener("lazyunveilread", _r, !0);
  }, t = t.bind(null, e, e.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? t(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], t) : e.lazySizes ? _r() : e.addEventListener("lazyunveilread", _r, !0));
}("undefined" != typeof window ? window : 0, function (d, n, p) {
  "use strict";

  var i,
      a,
      s,
      l,
      t,
      r,
      f,
      o,
      _c,
      _m,
      u,
      y = p.cfg,
      e = n.createElement("img"),
      g = "sizes" in e && "srcset" in e,
      h = /\s+\d+h/g,
      z = (a = /\s+(\d+)(w|h)\s+(\d+)(w|h)/, s = Array.prototype.forEach, function () {
    function r(e) {
      var t,
          r,
          i = e.getAttribute(y.srcsetAttr);
      i && (r = i.match(a)) && ((t = "w" == r[2] ? r[1] / r[3] : r[3] / r[1]) && e.setAttribute("data-aspectratio", t), e.setAttribute(y.srcsetAttr, i.replace(h, "")));
    }

    function e(e) {
      var t;
      e.detail.instance == p && ((t = e.target.parentNode) && "PICTURE" == t.nodeName && s.call(t.getElementsByTagName("source"), r), r(e.target));
    }

    function t() {
      i.currentSrc && n.removeEventListener("lazybeforeunveil", e);
    }

    var i = n.createElement("img");
    n.addEventListener("lazybeforeunveil", e), i.onload = t, i.onerror = t, i.srcset = "data:,a 1w 1h", i.complete && t();
  });

  function v(e, t) {
    return e.w - t.w;
  }

  function w(e, t, r, i) {
    l.push({
      c: t,
      u: r,
      w: +i
    });
  }

  function b(e, t) {
    var r,
        i = e.getAttribute("srcset") || e.getAttribute(y.srcsetAttr);
    !i && t && (i = e._lazypolyfill ? e._lazypolyfill._set : e.getAttribute(y.srcAttr) || e.getAttribute("src")), e._lazypolyfill && e._lazypolyfill._set == i || (r = o(i || ""), t && e.parentNode && (r.isPicture = "PICTURE" == e.parentNode.nodeName.toUpperCase(), r.isPicture && d.matchMedia && (p.aC(e, "lazymatchmedia"), _c())), r._set = i, Object.defineProperty(e, "_lazypolyfill", {
      value: r,
      writable: !0
    }));
  }

  function A(e) {
    var t,
        r,
        i,
        n,
        a,
        s,
        l,
        o,
        c,
        u = e;
    if (b(u, !0), (n = u._lazypolyfill).isPicture) for (r = 0, i = (t = e.parentNode.getElementsByTagName("source")).length; r < i; r++) {
      if (y.supportsType(t[r].getAttribute("type"), e) && _m(t[r].getAttribute("media"))) {
        u = t[r], b(u), n = u._lazypolyfill;
        break;
      }
    }
    return 1 < n.length ? (s = u.getAttribute("sizes") || "", s = f.test(s) && parseInt(s, 10) || p.gW(e, e.parentNode), n.d = (l = e, o = d.devicePixelRatio || 1, c = p.getX && p.getX(l), Math.min(c || o, 2.5, o)), !n.src || !n.w || n.w < s ? (n.w = s, a = function (e) {
      for (var t, r, i = e.length, n = e[i - 1], a = 0; a < i; a++) {
        if ((n = e[a]).d = n.w / e.w, n.d >= e.d) {
          !n.cached && (t = e[a - 1]) && t.d > e.d - .13 * Math.pow(e.d, 2.2) && (r = Math.pow(t.d - .6, 1.6), t.cached && (t.d += .15 * r), t.d + (n.d - e.d) * r > e.d && (n = t));
          break;
        }
      }

      return n;
    }(n.sort(v)), n.src = a) : a = n.src) : a = n[0], a;
  }

  function E(e) {
    var t;
    g && e.parentNode && "PICTURE" != e.parentNode.nodeName.toUpperCase() || (t = A(e)) && t.u && e._lazypolyfill.cur != t.u && (e._lazypolyfill.cur = t.u, t.cached = !0, e.setAttribute(y.srcAttr, t.u), e.setAttribute("src", t.u));
  }

  y.supportsType || (y.supportsType = function (e) {
    return !e;
  }), d.HTMLPictureElement && g ? !p.hasHDescriptorFix && n.msElementsFromPoint && (p.hasHDescriptorFix = !0, z()) : d.picturefill || y.pf || (y.pf = function (e) {
    var t, r;
    if (!d.picturefill) for (t = 0, r = e.elements.length; t < r; t++) {
      i(e.elements[t]);
    }
  }, f = /^\s*\d+\.*\d*px\s*$/, t = /(([^,\s].[^\s]+)\s+(\d+)w)/g, r = /\s/, _c = function c() {
    var e, r;

    function t() {
      for (var e = 0, t = r.length; e < t; e++) {
        i(r[e]);
      }
    }

    _c.init || (_c.init = !0, addEventListener("resize", (r = n.getElementsByClassName("lazymatchmedia"), function () {
      clearTimeout(e), e = setTimeout(t, 66);
    })));
  }, _m = function m(e) {
    return d.matchMedia ? (_m = function m(e) {
      return !e || (matchMedia(e) || {}).matches;
    })(e) : !e;
  }, E.parse = o = function o(e) {
    return l = [], (e = e.trim()).replace(h, "").replace(t, w), l.length || !e || r.test(e) || l.push({
      c: e,
      u: e,
      w: 99
    }), l;
  }, i = E, y.loadedClass && y.loadingClass && (u = [], ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function (e) {
    u.push(e + y.loadedClass), u.push(e + y.loadingClass);
  }), y.pf({
    elements: n.querySelectorAll(u.join(", "))
  })));
});
/*! rias lazysizes - v5.3.2 */

!function (t, e) {
  var r = function r() {
    e(t.lazySizes), t.removeEventListener("lazyunveilread", r, !0);
  };

  e = e.bind(null, t, t.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? e(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], e) : t.lazySizes ? r() : t.addEventListener("lazyunveilread", r, !0);
}(window, function (f, u, g) {
  "use strict";

  var b,
      m,
      i = g.cfg,
      d = {
    string: 1,
    number: 1
  },
      l = /^\-*\+*\d+\.*\d*$/,
      p = /^picture$/i,
      v = /\s*\{\s*width\s*\}\s*/i,
      y = /\s*\{\s*height\s*\}\s*/i,
      h = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
      z = /^\[.*\]|\{.*\}$/,
      A = /^(?:auto|\d+(px)?)$/,
      w = u.createElement("a"),
      t = u.createElement("img"),
      P = "srcset" in t && !("sizes" in t),
      E = !!f.HTMLPictureElement && !P;

  function N(a, t, s) {
    var e,
        r,
        i,
        n,
        o,
        c = f.getComputedStyle(a);

    if (s) {
      for (n in o = {}, s) {
        o[n] = s[n];
      }

      s = o;
    } else r = a.parentNode, s = {
      isPicture: !(!r || !p.test(r.nodeName || ""))
    };

    for (e in i = function i(t, e) {
      var r,
          i = a.getAttribute("data-" + t);

      if (i || (r = c.getPropertyValue("--ls-" + t)) && (i = r.trim()), i) {
        if ("true" == i) i = !0;else if ("false" == i) i = !1;else if (l.test(i)) i = parseFloat(i);else if ("function" == typeof m[t]) i = m[t](a, i);else if (z.test(i)) try {
          i = JSON.parse(i);
        } catch (t) {}
        s[t] = i;
      } else t in m && "function" != typeof m[t] && !s[t] ? s[t] = m[t] : e && "function" == typeof m[t] && (s[t] = m[t](a, i));
    }, m) {
      i(e);
    }

    return t.replace(h, function (t, e) {
      e in s || i(e, !0);
    }), s;
  }

  function _(t, e, r) {
    var s,
        n,
        o,
        i = 0,
        a = 0,
        c = r;

    if (t) {
      if ("container" === e.ratio) {
        for (i = c.scrollWidth, a = c.scrollHeight; !(i && a || c === u);) {
          i = (c = c.parentNode).scrollWidth, a = c.scrollHeight;
        }

        i && a && (e.ratio = e.traditionalRatio ? a / i : i / a);
      }

      s = t, n = e, (o = []).srcset = [], n.absUrl && (w.setAttribute("href", s), s = w.href), s = ((n.prefix || "") + s + (n.postfix || "")).replace(h, function (t, e) {
        return d[_typeof(n[e])] ? n[e] : t;
      }), n.widths.forEach(function (t) {
        var e = n.widthmap[t] || t,
            r = n.aspectratio || n.ratio,
            i = !n.aspectratio && m.traditionalRatio,
            a = {
          u: s.replace(v, e).replace(y, r ? i ? Math.round(t * r) : Math.round(t / r) : ""),
          w: t
        };
        o.push(a), o.srcset.push(a.c = a.u + " " + t + "w");
      }), (t = o).isPicture = e.isPicture, P && "IMG" == r.nodeName.toUpperCase() ? r.removeAttribute(b.srcsetAttr) : r.setAttribute(b.srcsetAttr, t.srcset.join(", ")), Object.defineProperty(r, "_lazyrias", {
        value: t,
        writable: !0
      });
    }
  }

  function x(t) {
    return t.getAttribute(t.getAttribute("data-srcattr") || m.srcAttr) || t.getAttribute(b.srcsetAttr) || t.getAttribute(b.srcAttr) || t.getAttribute("data-pfsrcset") || "";
  }

  !function () {
    var t,
        e = {
      prefix: "",
      postfix: "",
      srcAttr: "data-src",
      absUrl: !1,
      modifyOptions: function modifyOptions() {},
      widthmap: {},
      ratio: !1,
      traditionalRatio: !1,
      aspectratio: !1
    };

    for (t in (b = g && g.cfg).supportsType || (b.supportsType = function (t) {
      return !t;
    }), b.rias || (b.rias = {}), "widths" in (m = b.rias) || (m.widths = [], function (t) {
      for (var e, r = 0; !e || e < 3e3;) {
        30 < (r += 5) && (r += 1), e = 36 * r, t.push(e);
      }
    }(m.widths)), e) {
      t in m || (m[t] = e[t]);
    }
  }(), addEventListener("lazybeforesizes", function (t) {
    if (t.detail.instance == g) {
      var e,
          r,
          i,
          a,
          s,
          n,
          o,
          c,
          u,
          d,
          f,
          l = t.target;

      if (t.detail.dataAttr && !t.defaultPrevented && !m.disabled && (o = l.getAttribute(b.sizesAttr) || l.getAttribute("sizes")) && A.test(o)) {
        var p,
            y,
            h = x(l);
        if (y = N(p = l, h), m.modifyOptions.call(p, {
          target: p,
          details: y,
          detail: y
        }), g.fire(p, "lazyriasmodifyoptions", y), e = y, u = v.test(e.prefix) || v.test(e.postfix), e.isPicture && (r = l.parentNode)) for (a = 0, s = (i = r.getElementsByTagName("source")).length; a < s; a++) {
          (u || v.test(n = x(i[a]))) && (_(n, N(i[a], n, e), i[a]), d = !0);
        }
        u || v.test(h) ? (_(h, e, l), d = !0) : d && ((f = []).srcset = [], f.isPicture = !0, Object.defineProperty(l, "_lazyrias", {
          value: f,
          writable: !0
        })), d && (E ? l.removeAttribute(b.srcAttr) : "auto" != o && (c = {
          width: parseInt(o, 10)
        }, M({
          target: l,
          detail: c
        })));
      }
    }
  }, !0);

  var _a,
      M = (_a = function a(t) {
    var e, r;
    t.detail.instance == g && (r = t.target, P || !(f.respimage || f.picturefill || i.pf) ? ("_lazyrias" in r || t.detail.dataAttr && O(r, !0)) && (e = s(r, t.detail.width)) && e.u && r._lazyrias.cur != e.u && (r._lazyrias.cur = e.u, e.cached = !0, g.rAF(function () {
      r.setAttribute(b.srcAttr, e.u), r.setAttribute("src", e.u);
    })) : u.removeEventListener("lazybeforesizes", _a));
  }, E ? _a = function _a() {} : addEventListener("lazybeforesizes", _a), _a);

  function L(t, e) {
    return t.w - e.w;
  }

  function O(t, e) {
    var r;
    return !t._lazyrias && g.pWS && (r = g.pWS(t.getAttribute(b.srcsetAttr || ""))).length && (Object.defineProperty(t, "_lazyrias", {
      value: r,
      writable: !0
    }), e && t.parentNode && (r.isPicture = "PICTURE" == t.parentNode.nodeName.toUpperCase())), t._lazyrias;
  }

  function s(t, e) {
    var r,
        i,
        a,
        s,
        n,
        o,
        c,
        u,
        d = t._lazyrias;
    if (d.isPicture && f.matchMedia) for (i = 0, a = (r = t.parentNode.getElementsByTagName("source")).length; i < a; i++) {
      if (O(r[i]) && !r[i].getAttribute("type") && (!(s = r[i].getAttribute("media")) || (matchMedia(s) || {}).matches)) {
        d = r[i]._lazyrias;
        break;
      }
    }
    return (!d.w || d.w < e) && (d.w = e, d.d = (o = t, c = f.devicePixelRatio || 1, u = g.getX && g.getX(o), Math.min(u || c, 2.4, c)), n = function (t) {
      for (var e, r, i = t.length, a = t[i - 1], s = 0; s < i; s++) {
        if ((a = t[s]).d = a.w / t.w, a.d >= t.d) {
          !a.cached && (e = t[s - 1]) && e.d > t.d - .13 * Math.pow(t.d, 2.2) && (r = Math.pow(e.d - .6, 1.6), e.cached && (e.d += .15 * r), e.d + (a.d - t.d) * r > t.d && (a = e));
          break;
        }
      }

      return a;
    }(d.sort(L))), n;
  }
});
/*! parent-fit lazysizes - v5.3.2 */

!function (t, e) {
  var _i;

  t && (_i = function i() {
    e(t.lazySizes), t.removeEventListener("lazyunveilread", _i, !0);
  }, e = e.bind(null, t, t.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? e(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], e) : t.lazySizes ? _i() : t.addEventListener("lazyunveilread", _i, !0));
}("undefined" != typeof window ? window : 0, function (u, t, i) {
  "use strict";

  var l, s, d, f, g, o;
  u.addEventListener && (l = /\s+(\d+)(w|h)\s+(\d+)(w|h)/, s = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/, d = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/, f = /^picture$/i, g = i.cfg, o = {
    getParent: function getParent(t, e) {
      var i = t,
          a = t.parentNode;
      return e && "prev" != e || !a || !f.test(a.nodeName || "") || (a = a.parentNode), "self" != e && (i = "prev" == e ? t.previousElementSibling : e && (a.closest || u.jQuery) && (a.closest ? a.closest(e) : jQuery(a).closest(e)[0]) || a), i;
    },
    getFit: function getFit(t) {
      var e,
          i,
          a = getComputedStyle(t, null) || {},
          n = a.content || a.fontFamily,
          r = {
        fit: t._lazysizesParentFit || t.getAttribute("data-parent-fit")
      };
      return !r.fit && n && (e = n.match(s)) && (r.fit = e[1]), r.fit ? (!(i = t._lazysizesParentContainer || t.getAttribute("data-parent-container")) && n && (e = n.match(d)) && (i = e[1]), r.parent = o.getParent(t, i)) : r.fit = a.objectFit, r;
    },
    getImageRatio: function getImageRatio(t) {
      for (var e, i, a, n, r, s, d = t.parentNode, o = d && f.test(d.nodeName || "") ? d.querySelectorAll("source, img") : [t], c = 0; c < o.length; c++) {
        if (e = (t = o[c]).getAttribute(g.srcsetAttr) || t.getAttribute("srcset") || t.getAttribute("data-pfsrcset") || t.getAttribute("data-risrcset") || "", i = t._lsMedia || t.getAttribute("media"), i = g.customMedia[t.getAttribute("data-media") || i] || i, e && (!i || (u.matchMedia && matchMedia(i) || {}).matches)) {
          (a = parseFloat(t.getAttribute("data-aspectratio"))) || (s = (n = e.match(l)) ? "w" == n[2] ? (r = n[1], n[3]) : (r = n[3], n[1]) : (r = t.getAttribute("width"), t.getAttribute("height")), a = r / s);
          break;
        }
      }

      return a;
    },
    calculateSize: function calculateSize(t, e) {
      var i,
          a,
          n,
          r = this.getFit(t),
          s = r.fit,
          d = r.parent;
      return "width" == s || ("contain" == s || "cover" == s) && (a = this.getImageRatio(t)) ? (d ? e = d.clientWidth : d = t, n = e, "width" == s ? n = e : (i = e / d.clientHeight) && ("cover" == s && i < a || "contain" == s && a < i) && (n = e * (a / i)), n) : e;
    }
  }, i.parentFit = o, t.addEventListener("lazybeforesizes", function (t) {
    var e;
    t.defaultPrevented || t.detail.instance != i || (e = t.target, t.detail.width = o.calculateSize(e, t.detail.width));
  }));
});
/*! object-fit lazysizes - v5.3.2 */

!function (e, i) {
  var _a2;

  e && (_a2 = function a(t) {
    i(e.lazySizes, t), e.removeEventListener("lazyunveilread", _a2, !0);
  }, i = i.bind(null, e, e.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? i(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], i) : e.lazySizes ? _a2() : e.addEventListener("lazyunveilread", _a2, !0));
}("undefined" != typeof window ? window : 0, function (t, u, f, e) {
  "use strict";

  var y,
      i,
      a = u.createElement("a").style,
      r = ("objectFit" in a),
      s = /object-fit["']*\s*:\s*["']*(contain|cover)/,
      l = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,
      A = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
      n = /\(|\)|'/,
      d = {
    center: "center",
    "50% 50%": "center"
  };

  function c(o, r) {
    function s() {
      var t = o.currentSrc || o.src;
      t && i !== t && (i = t, d.backgroundImage = "url(" + (n.test(t) ? JSON.stringify(t) : t) + ")", e || (e = !0, f.rC(l, c.loadingClass), f.aC(l, c.loadedClass)));
    }

    function t() {
      f.rAF(s);
    }

    var e,
        i,
        l,
        d,
        c = f.cfg;
    o._lazysizesParentFit = r.fit, o.addEventListener("lazyloaded", t, !0), o.addEventListener("load", t, !0), f.rAF(function () {
      var t,
          e,
          i,
          a = o,
          n = o.parentNode;
      "PICTURE" == n.nodeName.toUpperCase() && (n = (a = n).parentNode), (e = (t = a).previousElementSibling) && f.hC(e, y) && (e.parentNode.removeChild(e), t.style.position = e.getAttribute("data-position") || "", t.style.visibility = e.getAttribute("data-visibility") || ""), y || y || (i = u.createElement("style"), y = f.cfg.objectFitClass || "lazysizes-display-clone", u.querySelector("head").appendChild(i)), l = o.cloneNode(!1), d = l.style, l.addEventListener("load", function () {
        var t = l.currentSrc || l.src;
        t && t != A && (l.src = A, l.srcset = "");
      }), f.rC(l, c.loadedClass), f.rC(l, c.lazyClass), f.rC(l, c.autosizesClass), f.aC(l, c.loadingClass), f.aC(l, y), ["data-parent-fit", "data-parent-container", "data-object-fit-polyfilled", c.srcsetAttr, c.srcAttr].forEach(function (t) {
        l.removeAttribute(t);
      }), l.src = A, l.srcset = "", d.backgroundRepeat = "no-repeat", d.backgroundPosition = r.position, d.backgroundSize = r.fit, l.setAttribute("data-position", a.style.position), l.setAttribute("data-visibility", a.style.visibility), a.style.visibility = "hidden", a.style.position = "absolute", o.setAttribute("data-parent-fit", r.fit), o.setAttribute("data-parent-container", "prev"), o.setAttribute("data-object-fit-polyfilled", ""), o._objectFitPolyfilledDisplay = l, n.insertBefore(l, a), o._lazysizesParentFit && delete o._lazysizesParentFit, o.complete && s();
    });
  }

  r && r && "objectPosition" in a || (i = function i(t) {
    if (t.detail.instance == f) {
      var e,
          i,
          a,
          n = t.target,
          o = (e = (getComputedStyle(n, null) || {}).fontFamily || "", i = e.match(s) || "", a = (a = i && e.match(l) || "") && a[1], {
        fit: i && i[1] || "",
        position: d[a] || a || "center"
      });
      return !(!o.fit || r && "center" == o.position) && (c(n, o), !0);
    }
  }, t.addEventListener("lazybeforesizes", function (t) {
    var e;
    t.detail.instance == f && (null == (e = t.target).getAttribute("data-object-fit-polyfilled") || e._objectFitPolyfilledDisplay || i(t) || f.rAF(function () {
      e.removeAttribute("data-object-fit-polyfilled");
    }));
  }), t.addEventListener("lazyunveilread", i, !0), e && e.detail && i(e));
});
/*! lazysizes - v5.3.2 */

!function (e) {
  var t = function (u, D, f) {
    "use strict";

    var k, H;

    if (function () {
      var e;
      var t = {
        lazyClass: "lazyload",
        loadedClass: "lazyloaded",
        loadingClass: "lazyloading",
        preloadClass: "lazypreload",
        errorClass: "lazyerror",
        autosizesClass: "lazyautosizes",
        fastLoadedClass: "ls-is-cached",
        iframeLoadMode: 0,
        srcAttr: "data-src",
        srcsetAttr: "data-srcset",
        sizesAttr: "data-sizes",
        minSize: 40,
        customMedia: {},
        init: true,
        expFactor: 1.5,
        hFac: .8,
        loadMode: 2,
        loadHidden: true,
        ricTimeout: 0,
        throttleDelay: 125
      };
      H = u.lazySizesConfig || u.lazysizesConfig || {};

      for (e in t) {
        if (!(e in H)) {
          H[e] = t[e];
        }
      }
    }(), !D || !D.getElementsByClassName) {
      return {
        init: function init() {},
        cfg: H,
        noSupport: true
      };
    }

    var O = D.documentElement,
        i = u.HTMLPictureElement,
        P = "addEventListener",
        $ = "getAttribute",
        q = u[P].bind(u),
        I = u.setTimeout,
        U = u.requestAnimationFrame || I,
        o = u.requestIdleCallback,
        j = /^picture$/i,
        r = ["load", "error", "lazyincluded", "_lazyloaded"],
        a = {},
        G = Array.prototype.forEach,
        J = function J(e, t) {
      if (!a[t]) {
        a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)");
      }

      return a[t].test(e[$]("class") || "") && a[t];
    },
        K = function K(e, t) {
      if (!J(e, t)) {
        e.setAttribute("class", (e[$]("class") || "").trim() + " " + t);
      }
    },
        Q = function Q(e, t) {
      var a;

      if (a = J(e, t)) {
        e.setAttribute("class", (e[$]("class") || "").replace(a, " "));
      }
    },
        V = function V(t, a, e) {
      var i = e ? P : "removeEventListener";

      if (e) {
        V(t, a);
      }

      r.forEach(function (e) {
        t[i](e, a);
      });
    },
        X = function X(e, t, a, i, r) {
      var n = D.createEvent("Event");

      if (!a) {
        a = {};
      }

      a.instance = k;
      n.initEvent(t, !i, !r);
      n.detail = a;
      e.dispatchEvent(n);
      return n;
    },
        Y = function Y(e, t) {
      var a;

      if (!i && (a = u.picturefill || H.pf)) {
        if (t && t.src && !e[$]("srcset")) {
          e.setAttribute("srcset", t.src);
        }

        a({
          reevaluate: true,
          elements: [e]
        });
      } else if (t && t.src) {
        e.src = t.src;
      }
    },
        Z = function Z(e, t) {
      return (getComputedStyle(e, null) || {})[t];
    },
        s = function s(e, t, a) {
      a = a || e.offsetWidth;

      while (a < H.minSize && t && !e._lazysizesWidth) {
        a = t.offsetWidth;
        t = t.parentNode;
      }

      return a;
    },
        ee = function () {
      var a, i;
      var t = [];
      var r = [];
      var n = t;

      var s = function s() {
        var e = n;
        n = t.length ? r : t;
        a = true;
        i = false;

        while (e.length) {
          e.shift()();
        }

        a = false;
      };

      var e = function e(_e, t) {
        if (a && !t) {
          _e.apply(this, arguments);
        } else {
          n.push(_e);

          if (!i) {
            i = true;
            (D.hidden ? I : U)(s);
          }
        }
      };

      e._lsFlush = s;
      return e;
    }(),
        te = function te(a, e) {
      return e ? function () {
        ee(a);
      } : function () {
        var e = this;
        var t = arguments;
        ee(function () {
          a.apply(e, t);
        });
      };
    },
        ae = function ae(e) {
      var a;
      var i = 0;
      var r = H.throttleDelay;
      var n = H.ricTimeout;

      var t = function t() {
        a = false;
        i = f.now();
        e();
      };

      var s = o && n > 49 ? function () {
        o(t, {
          timeout: n
        });

        if (n !== H.ricTimeout) {
          n = H.ricTimeout;
        }
      } : te(function () {
        I(t);
      }, true);
      return function (e) {
        var t;

        if (e = e === true) {
          n = 33;
        }

        if (a) {
          return;
        }

        a = true;
        t = r - (f.now() - i);

        if (t < 0) {
          t = 0;
        }

        if (e || t < 9) {
          s();
        } else {
          I(s, t);
        }
      };
    },
        ie = function ie(e) {
      var t, a;
      var i = 99;

      var r = function r() {
        t = null;
        e();
      };

      var n = function n() {
        var e = f.now() - a;

        if (e < i) {
          I(n, i - e);
        } else {
          (o || r)(r);
        }
      };

      return function () {
        a = f.now();

        if (!t) {
          t = I(n, i);
        }
      };
    },
        e = function () {
      var v, m, c, h, e;
      var y, z, g, p, C, b, A;
      var n = /^img$/i;
      var d = /^iframe$/i;
      var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
      var _ = 0;
      var w = 0;
      var M = 0;
      var N = -1;

      var L = function L(e) {
        M--;

        if (!e || M < 0 || !e.target) {
          M = 0;
        }
      };

      var x = function x(e) {
        if (A == null) {
          A = Z(D.body, "visibility") == "hidden";
        }

        return A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden");
      };

      var W = function W(e, t) {
        var a;
        var i = e;
        var r = x(e);
        g -= t;
        b += t;
        p -= t;
        C += t;

        while (r && (i = i.offsetParent) && i != D.body && i != O) {
          r = (Z(i, "opacity") || 1) > 0;

          if (r && Z(i, "overflow") != "visible") {
            a = i.getBoundingClientRect();
            r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1;
          }
        }

        return r;
      };

      var t = function t() {
        var e, t, a, i, r, n, s, o, l, u, f, c;
        var d = k.elements;

        if ((h = H.loadMode) && M < 8 && (e = d.length)) {
          t = 0;
          N++;

          for (; t < e; t++) {
            if (!d[t] || d[t]._lazyRace) {
              continue;
            }

            if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
              R(d[t]);
              continue;
            }

            if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
              n = w;
            }

            if (!u) {
              u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
              k._defEx = u;
              f = u * H.expFactor;
              c = H.hFac;
              A = null;

              if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                w = f;
                N = 0;
              } else if (h > 1 && N > 1 && M < 6) {
                w = u;
              } else {
                w = _;
              }
            }

            if (l !== n) {
              y = innerWidth + n * c;
              z = innerHeight + n;
              s = n * -1;
              l = n;
            }

            a = d[t].getBoundingClientRect();

            if ((b = a.bottom) >= s && (g = a.top) <= z && (C = a.right) >= s * c && (p = a.left) <= y && (b || C || p || g) && (H.loadHidden || x(d[t])) && (m && M < 3 && !o && (h < 3 || N < 4) || W(d[t], n))) {
              R(d[t]);
              r = true;

              if (M > 9) {
                break;
              }
            } else if (!r && m && !i && M < 4 && N < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
              i = v[0] || d[t];
            }
          }

          if (i && !r) {
            R(i);
          }
        }
      };

      var a = ae(t);

      var S = function S(e) {
        var t = e.target;

        if (t._lazyCache) {
          delete t._lazyCache;
          return;
        }

        L(e);
        K(t, H.loadedClass);
        Q(t, H.loadingClass);
        V(t, B);
        X(t, "lazyloaded");
      };

      var i = te(S);

      var B = function B(e) {
        i({
          target: e.target
        });
      };

      var T = function T(e, t) {
        var a = e.getAttribute("data-load-mode") || H.iframeLoadMode;

        if (a == 0) {
          e.contentWindow.location.replace(t);
        } else if (a == 1) {
          e.src = t;
        }
      };

      var F = function F(e) {
        var t;
        var a = e[$](H.srcsetAttr);

        if (t = H.customMedia[e[$]("data-media") || e[$]("media")]) {
          e.setAttribute("media", t);
        }

        if (a) {
          e.setAttribute("srcset", a);
        }
      };

      var s = te(function (t, e, a, i, r) {
        var n, s, o, l, u, f;

        if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
          if (i) {
            if (a) {
              K(t, H.autosizesClass);
            } else {
              t.setAttribute("sizes", i);
            }
          }

          s = t[$](H.srcsetAttr);
          n = t[$](H.srcAttr);

          if (r) {
            o = t.parentNode;
            l = o && j.test(o.nodeName || "");
          }

          f = e.firesLoad || "src" in t && (s || n || l);
          u = {
            target: t
          };
          K(t, H.loadingClass);

          if (f) {
            clearTimeout(c);
            c = I(L, 2500);
            V(t, B, true);
          }

          if (l) {
            G.call(o.getElementsByTagName("source"), F);
          }

          if (s) {
            t.setAttribute("srcset", s);
          } else if (n && !l) {
            if (d.test(t.nodeName)) {
              T(t, n);
            } else {
              t.src = n;
            }
          }

          if (r && (s || l)) {
            Y(t, {
              src: n
            });
          }
        }

        if (t._lazyRace) {
          delete t._lazyRace;
        }

        Q(t, H.lazyClass);
        ee(function () {
          var e = t.complete && t.naturalWidth > 1;

          if (!f || e) {
            if (e) {
              K(t, H.fastLoadedClass);
            }

            S(u);
            t._lazyCache = true;
            I(function () {
              if ("_lazyCache" in t) {
                delete t._lazyCache;
              }
            }, 9);
          }

          if (t.loading == "lazy") {
            M--;
          }
        }, true);
      });

      var R = function R(e) {
        if (e._lazyRace) {
          return;
        }

        var t;
        var a = n.test(e.nodeName);
        var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
        var r = i == "auto";

        if ((r || !m) && a && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
          return;
        }

        t = X(e, "lazyunveilread").detail;

        if (r) {
          re.updateElem(e, true, e.offsetWidth);
        }

        e._lazyRace = true;
        M++;
        s(e, t, r, i, a);
      };

      var r = ie(function () {
        H.loadMode = 3;
        a();
      });

      var o = function o() {
        if (H.loadMode == 3) {
          H.loadMode = 2;
        }

        r();
      };

      var l = function l() {
        if (m) {
          return;
        }

        if (f.now() - e < 999) {
          I(l, 999);
          return;
        }

        m = true;
        H.loadMode = 3;
        a();
        q("scroll", o, true);
      };

      return {
        _: function _() {
          e = f.now();
          k.elements = D.getElementsByClassName(H.lazyClass);
          v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
          q("scroll", a, true);
          q("resize", a, true);
          q("pageshow", function (e) {
            if (e.persisted) {
              var t = D.querySelectorAll("." + H.loadingClass);

              if (t.length && t.forEach) {
                U(function () {
                  t.forEach(function (e) {
                    if (e.complete) {
                      R(e);
                    }
                  });
                });
              }
            }
          });

          if (u.MutationObserver) {
            new MutationObserver(a).observe(O, {
              childList: true,
              subtree: true,
              attributes: true
            });
          } else {
            O[P]("DOMNodeInserted", a, true);
            O[P]("DOMAttrModified", a, true);
            setInterval(a, 999);
          }

          q("hashchange", a, true);
          ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (e) {
            D[P](e, a, true);
          });

          if (/d$|^c/.test(D.readyState)) {
            l();
          } else {
            q("load", l);
            D[P]("DOMContentLoaded", a);
            I(l, 2e4);
          }

          if (k.elements.length) {
            t();

            ee._lsFlush();
          } else {
            a();
          }
        },
        checkElems: a,
        unveil: R,
        _aLSL: o
      };
    }(),
        re = function () {
      var a;
      var n = te(function (e, t, a, i) {
        var r, n, s;
        e._lazysizesWidth = i;
        i += "px";
        e.setAttribute("sizes", i);

        if (j.test(t.nodeName || "")) {
          r = t.getElementsByTagName("source");

          for (n = 0, s = r.length; n < s; n++) {
            r[n].setAttribute("sizes", i);
          }
        }

        if (!a.detail.dataAttr) {
          Y(e, a.detail);
        }
      });

      var i = function i(e, t, a) {
        var i;
        var r = e.parentNode;

        if (r) {
          a = s(e, r, a);
          i = X(e, "lazybeforesizes", {
            width: a,
            dataAttr: !!t
          });

          if (!i.defaultPrevented) {
            a = i.detail.width;

            if (a && a !== e._lazysizesWidth) {
              n(e, r, i, a);
            }
          }
        }
      };

      var e = function e() {
        var e;
        var t = a.length;

        if (t) {
          e = 0;

          for (; e < t; e++) {
            i(a[e]);
          }
        }
      };

      var t = ie(e);
      return {
        _: function _() {
          a = D.getElementsByClassName(H.autosizesClass);
          q("resize", t);
        },
        checkElems: t,
        updateElem: i
      };
    }(),
        t = function t() {
      if (!t.i && D.getElementsByClassName) {
        t.i = true;

        re._();

        e._();
      }
    };

    return I(function () {
      H.init && t();
    }), k = {
      cfg: H,
      autoSizer: re,
      loader: e,
      init: t,
      uP: Y,
      aC: K,
      rC: Q,
      hC: J,
      fire: X,
      gW: s,
      rAF: ee
    };
  }(e, e.document, Date);

  e.lazySizes = t, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = t);
}("undefined" != typeof window ? window : {});