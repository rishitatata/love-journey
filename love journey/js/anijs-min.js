!function (a, b) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document) throw new Error("AniJS-RWWD");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    var c = function (b) {
        var c = "data-anijs",
            d = "default",
            e = "|",
            f = "$",
            g = "if",
            h = "on",
            i = ["do", "after", "before", "to"];
        j = "(\\s+|^)", k = "(\\s+|$)", l = "animationend", m = "transitionend", n = "target";
        b = {
            rootDOMTravelScope: {},
            notifierCollection: {},
            init: function () {
                o._t = {};
                var a = o._a();
                b.registerHelper(d, a), o._u = d, b.rootDOMTravelScope = document, b.Parser = o.Parser, o._v = o._p(), o._w = ""
            },
            setDOMRootTravelScope: function (a) {
                var c, d = document;
                try {
                    "document" === a ? c = d : (c = d.querySelector(a), c || (c = d))
                } catch (e) {
                    c = d
                }
                b.rootDOMTravelScope = c
            },
            run: function () {
                var a = [],
                    d = {};
                b.purgeAll(), b.notifierCollection = {}, a = o._o(b.rootDOMTravelScope);
                var e, f = a.length,
                    g = 0;
                for (g; f > g; g++) e = a[g], d = o._n(e.getAttribute(c)), o._c(e, d);
                var h = b.getNotifier("AniJSNotifier");
                h && h.dispatchEvent("onRunFinished")
            },
            createAnimation: function (a, b) {
                var c = b || "";
                o._c(c, a)
            },
            getHelper: function (a) {
                var b = o._t;
                return b[a] || b[d]
            },
            registerHelper: function (a, b) {
                o._t[a] = b
            },
            purge: function (a) {
                if (a && "" !== a && " " !== a) {
                    var c = document.querySelectorAll(a),
                        d = c.length,
                        e = 0;
                    for (e; d > e; e++) b.EventSystem.purgeEventTarget(c[e])
                }
            },
            purgeAll: function () {
                b.EventSystem.purgeAll()
            },
            purgeEventTarget: function (a) {
                b.EventSystem.purgeEventTarget(a)
            },
            setClassNamesWhenAnim: function (a) {
                o._w = " " + a
            },
            createNotifier: function () {
                return b.EventSystem.createEventTarget()
            },
            registerNotifier: function (a) {
                var c = b.notifierCollection;
                return a.id && a.value && b.EventSystem.isEventTarget(a.value) ? (c[a.id] = a.value, 1) : ""
            },
            getNotifier: function (a) {
                return b.notifierCollection[a]
            }
        };
        var o = {};
        return o._a = function () {
            var a = {
                removeAnim: function (a, b) {
                    a.target && a.type && b.nodeHelper.removeClass(a.target, b.behavior)
                },
                holdAnimClass: function () {},
                fireOnce: function (a, b) {
                    b.eventSystem.removeEventListenerHelper(b.eventTarget, b.event.type, b.listener)
                },
                emit: function (a, c, d) {
                    var e = d[0] || null,
                        f = "";
                    if (null !== e) {
                        e = e.split(".");
                        e.length > 1 ? (f = e[0], e = e[1]) : (f = "", e = e[0]);
                        var g = b.getNotifier(f) || null;
                        null !== g && g.dispatchEvent(e)
                    }
                    c.hasRunned || c.run()
                }
            };
            return a
        }, o._b = function () {
            return new Parser
        }, o._c = function (a, b) {
            var c, d, e, f, g = b.length,
                h = 0;
            for (h; g > h; h++) c = b[h], e = c.after, d = c.before, f = c.behavior, e && (c.after = o.Parser.parseDoDefinition(e)), d && (c.before = o.Parser.parseDoDefinition(d)), f && (c.behavior = o.Parser.parseDoDefinition(f)), o._d(a, c)
        }, o._d = function (a, c) {
            var d, e = o._e(c),
                f = o._f(a, c);
            if (c.after && o.Util._x(c.after) && (d = c.after[0]), "" !== e) {
                var g, h = f.length,
                    i = 0;
                for (i; h > i; i++)
                    if (g = f[i], b.EventSystem.isEventTarget(g)) {
                        var j = function (e) {
                            var f = o._g(a, c, e),
                                g = o._h(c),
                                h = o._j(a, c),
                                i = o._i(a, c);
                            "" !== o._w && (o.Util._x(g) || (g += o._w));
                            var k = {
                                    behaviorTargetList: f,
                                    nodeHelper: o.NodeHelper,
                                    animationEndEvent: o._v,
                                    behavior: g,
                                    after: i,
                                    eventSystem: b.EventSystem,
                                    eventTarget: e.currentTarget,
                                    afterFunctionName: d,
                                    dataAniJSOwner: a,
                                    listener: j,
                                    event: e,
                                    before: h
                                },
                                l = new b.AnimationContext(k);
                            l.runAll(k)
                        };
                        b.EventSystem.addEventListenerHelper(g, e, j, !1), b.EventSystem.registerEventHandle(g, e, j)
                    }
            }
        }, o._e = function (a) {
            var b = "",
                c = a.event || b;
            return c === l ? c = o._p() : c === m && (c = o._q()), c
        }, o._f = function (c, d) {
            var e, f = c.behaviorTargetList[0];
            if (d.eventTarget) {
                if (e = o._notifierHelper(d.eventTarget), e.length > 0) return e;
                if ("document" === d.eventTarget) return [document];
                if ("window" === d.eventTarget) return [a];
