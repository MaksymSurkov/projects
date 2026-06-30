(() => {
    var __webpack_modules__ = {
        144(module) {
            !function(e, t) {
                true ? module.exports = t() : 0;
            }(0, function() {
                "use strict";
                const e = "undefined" != typeof window, t = e && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), a = e && window.devicePixelRatio > 1, n = {
                    elements_selector: ".lazy",
                    container: t || e ? document : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    data_bg_hidpi: "bg-hidpi",
                    data_bg_multi: "bg-multi",
                    data_bg_multi_hidpi: "bg-multi-hidpi",
                    data_bg_set: "bg-set",
                    data_poster: "poster",
                    class_applied: "applied",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    class_entered: "entered",
                    class_exited: "exited",
                    unobserve_completed: !0,
                    unobserve_entered: !1,
                    cancel_on_exit: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_applied: null,
                    callback_loading: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    callback_cancel: null,
                    use_native: !1,
                    restore_on_error: !1
                }, s = e => Object.assign({}, n, e), l = function(e, t) {
                    let a;
                    const n = "LazyLoad::Initialized", s = new e(t);
                    try {
                        a = new CustomEvent(n, {
                            detail: {
                                instance: s
                            }
                        });
                    } catch (e) {
                        a = document.createEvent("CustomEvent"), a.initCustomEvent(n, !1, !1, {
                            instance: s
                        });
                    }
                    window.dispatchEvent(a);
                }, o = "src", r = "srcset", i = "sizes", d = "poster", c = "llOriginalAttrs", _ = "data", u = "loading", g = "loaded", b = "applied", h = "error", m = "native", p = "data-", f = "ll-status", v = (e, t) => e.getAttribute(p + t), E = e => v(e, f), I = (e, t) => ((e, t, a) => {
                    const n = p + t;
                    null !== a ? e.setAttribute(n, a) : e.removeAttribute(n);
                })(e, f, t), y = e => I(e, null), k = e => null === E(e), A = e => E(e) === m, L = [ u, g, b, h ], w = (e, t, a, n) => {
                    e && "function" == typeof e && (void 0 === n ? void 0 === a ? e(t) : e(t, a) : e(t, a, n));
                }, x = (t, a) => {
                    e && "" !== a && t.classList.add(a);
                }, C = (t, a) => {
                    e && "" !== a && t.classList.remove(a);
                }, O = e => e.llTempImage, M = (e, t) => {
                    if (!t) return;
                    const a = t._observer;
                    a && a.unobserve(e);
                }, z = (e, t) => {
                    e && (e.loadingCount += t);
                }, N = (e, t) => {
                    e && (e.toLoadCount = t);
                }, T = e => {
                    let t = [];
                    for (let a, n = 0; a = e.children[n]; n += 1) "SOURCE" === a.tagName && t.push(a);
                    return t;
                }, R = (e, t) => {
                    const a = e.parentNode;
                    a && "PICTURE" === a.tagName && T(a).forEach(t);
                }, G = (e, t) => {
                    T(e).forEach(t);
                }, D = [ o ], H = [ o, d ], V = [ o, r, i ], F = [ _ ], j = e => !!e[c], B = e => e[c], J = e => delete e[c], S = (e, t) => {
                    if (j(e)) return;
                    const a = {};
                    t.forEach(t => {
                        a[t] = e.getAttribute(t);
                    }), e[c] = a;
                }, P = (e, t) => {
                    if (!j(e)) return;
                    const a = B(e);
                    t.forEach(t => {
                        ((e, t, a) => {
                            a ? e.setAttribute(t, a) : e.removeAttribute(t);
                        })(e, t, a[t]);
                    });
                }, U = (e, t, a) => {
                    x(e, t.class_applied), I(e, b), a && (t.unobserve_completed && M(e, t), w(t.callback_applied, e, a));
                }, $ = (e, t, a) => {
                    x(e, t.class_loading), I(e, u), a && (z(a, 1), w(t.callback_loading, e, a));
                }, q = (e, t, a) => {
                    a && e.setAttribute(t, a);
                }, K = (e, t) => {
                    q(e, i, v(e, t.data_sizes)), q(e, r, v(e, t.data_srcset)), q(e, o, v(e, t.data_src));
                }, Q = {
                    IMG: (e, t) => {
                        R(e, e => {
                            S(e, V), K(e, t);
                        }), S(e, V), K(e, t);
                    },
                    IFRAME: (e, t) => {
                        S(e, D), q(e, o, v(e, t.data_src));
                    },
                    VIDEO: (e, t) => {
                        G(e, e => {
                            S(e, D), q(e, o, v(e, t.data_src));
                        }), S(e, H), q(e, d, v(e, t.data_poster)), q(e, o, v(e, t.data_src)), e.load();
                    },
                    OBJECT: (e, t) => {
                        S(e, F), q(e, _, v(e, t.data_src));
                    }
                }, W = [ "IMG", "IFRAME", "VIDEO", "OBJECT" ], X = (e, t) => {
                    !t || (e => e.loadingCount > 0)(t) || (e => e.toLoadCount > 0)(t) || w(e.callback_finish, t);
                }, Y = (e, t, a) => {
                    e.addEventListener(t, a), e.llEvLisnrs[t] = a;
                }, Z = (e, t, a) => {
                    e.removeEventListener(t, a);
                }, ee = e => !!e.llEvLisnrs, te = e => {
                    if (!ee(e)) return;
                    const t = e.llEvLisnrs;
                    for (let a in t) {
                        const n = t[a];
                        Z(e, a, n);
                    }
                    delete e.llEvLisnrs;
                }, ae = (e, t, a) => {
                    (e => {
                        delete e.llTempImage;
                    })(e), z(a, -1), (e => {
                        e && (e.toLoadCount -= 1);
                    })(a), C(e, t.class_loading), t.unobserve_completed && M(e, a);
                }, ne = (e, t, a) => {
                    const n = O(e) || e;
                    ee(n) || ((e, t, a) => {
                        ee(e) || (e.llEvLisnrs = {});
                        const n = "VIDEO" === e.tagName ? "loadeddata" : "load";
                        Y(e, n, t), Y(e, "error", a);
                    })(n, s => {
                        ((e, t, a, n) => {
                            const s = A(t);
                            ae(t, a, n), x(t, a.class_loaded), I(t, g), w(a.callback_loaded, t, n), s || X(a, n);
                        })(0, e, t, a), te(n);
                    }, s => {
                        ((e, t, a, n) => {
                            const s = A(t);
                            ae(t, a, n), x(t, a.class_error), I(t, h), w(a.callback_error, t, n), a.restore_on_error && P(t, V), 
                            s || X(a, n);
                        })(0, e, t, a), te(n);
                    });
                }, se = (e, t, n) => {
                    (e => W.indexOf(e.tagName) > -1)(e) ? ((e, t, a) => {
                        ne(e, t, a), ((e, t, a) => {
                            const n = Q[e.tagName];
                            n && (n(e, t), $(e, t, a));
                        })(e, t, a);
                    })(e, t, n) : ((e, t, n) => {
                        (e => {
                            e.llTempImage = document.createElement("IMG");
                        })(e), ne(e, t, n), (e => {
                            j(e) || (e[c] = {
                                backgroundImage: e.style.backgroundImage
                            });
                        })(e), ((e, t, n) => {
                            const s = v(e, t.data_bg), l = v(e, t.data_bg_hidpi), r = a && l ? l : s;
                            r && (e.style.backgroundImage = `url("${r}")`, O(e).setAttribute(o, r), $(e, t, n));
                        })(e, t, n), ((e, t, n) => {
                            const s = v(e, t.data_bg_multi), l = v(e, t.data_bg_multi_hidpi), o = a && l ? l : s;
                            o && (e.style.backgroundImage = o, U(e, t, n));
                        })(e, t, n), ((e, t, a) => {
                            const n = v(e, t.data_bg_set);
                            if (!n) return;
                            let s = n.split("|").map(e => `image-set(${e})`);
                            e.style.backgroundImage = s.join(), U(e, t, a);
                        })(e, t, n);
                    })(e, t, n);
                }, le = e => {
                    e.removeAttribute(o), e.removeAttribute(r), e.removeAttribute(i);
                }, oe = e => {
                    R(e, e => {
                        P(e, V);
                    }), P(e, V);
                }, re = {
                    IMG: oe,
                    IFRAME: e => {
                        P(e, D);
                    },
                    VIDEO: e => {
                        G(e, e => {
                            P(e, D);
                        }), P(e, H), e.load();
                    },
                    OBJECT: e => {
                        P(e, F);
                    }
                }, ie = (e, t) => {
                    (e => {
                        const t = re[e.tagName];
                        t ? t(e) : (e => {
                            if (!j(e)) return;
                            const t = B(e);
                            e.style.backgroundImage = t.backgroundImage;
                        })(e);
                    })(e), ((e, t) => {
                        k(e) || A(e) || (C(e, t.class_entered), C(e, t.class_exited), C(e, t.class_applied), 
                        C(e, t.class_loading), C(e, t.class_loaded), C(e, t.class_error));
                    })(e, t), y(e), J(e);
                }, de = [ "IMG", "IFRAME", "VIDEO" ], ce = e => e.use_native && "loading" in HTMLImageElement.prototype, _e = (e, t, a) => {
                    e.forEach(e => (e => e.isIntersecting || e.intersectionRatio > 0)(e) ? ((e, t, a, n) => {
                        const s = (e => L.indexOf(E(e)) >= 0)(e);
                        I(e, "entered"), x(e, a.class_entered), C(e, a.class_exited), ((e, t, a) => {
                            t.unobserve_entered && M(e, a);
                        })(e, a, n), w(a.callback_enter, e, t, n), s || se(e, a, n);
                    })(e.target, e, t, a) : ((e, t, a, n) => {
                        k(e) || (x(e, a.class_exited), ((e, t, a, n) => {
                            a.cancel_on_exit && (e => E(e) === u)(e) && "IMG" === e.tagName && (te(e), (e => {
                                R(e, e => {
                                    le(e);
                                }), le(e);
                            })(e), oe(e), C(e, a.class_loading), z(n, -1), y(e), w(a.callback_cancel, e, t, n));
                        })(e, t, a, n), w(a.callback_exit, e, t, n));
                    })(e.target, e, t, a));
                }, ue = e => Array.prototype.slice.call(e), ge = e => e.container.querySelectorAll(e.elements_selector), be = e => (e => E(e) === h)(e), he = (e, t) => (e => ue(e).filter(k))(e || ge(t)), me = function(t, a) {
                    const n = s(t);
                    this._settings = n, this.loadingCount = 0, ((e, t) => {
                        ce(e) || (t._observer = new IntersectionObserver(a => {
                            _e(a, e, t);
                        }, (e => ({
                            root: e.container === document ? null : e.container,
                            rootMargin: e.thresholds || e.threshold + "px"
                        }))(e)));
                    })(n, this), ((t, a) => {
                        e && (a._onlineHandler = () => {
                            ((e, t) => {
                                var a;
                                (a = ge(e), ue(a).filter(be)).forEach(t => {
                                    C(t, e.class_error), y(t);
                                }), t.update();
                            })(t, a);
                        }, window.addEventListener("online", a._onlineHandler));
                    })(n, this), this.update(a);
                };
                return me.prototype = {
                    update: function(e) {
                        const a = this._settings, n = he(e, a);
                        var s, l;
                        N(this, n.length), t ? this.loadAll(n) : ce(a) ? ((e, t, a) => {
                            e.forEach(e => {
                                -1 !== de.indexOf(e.tagName) && ((e, t, a) => {
                                    e.setAttribute("loading", "lazy"), ne(e, t, a), ((e, t) => {
                                        const a = Q[e.tagName];
                                        a && a(e, t);
                                    })(e, t), I(e, m);
                                })(e, t, a);
                            }), N(a, 0);
                        })(n, a, this) : (l = n, (e => {
                            e.disconnect();
                        })(s = this._observer), ((e, t) => {
                            t.forEach(t => {
                                e.observe(t);
                            });
                        })(s, l));
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), e && window.removeEventListener("online", this._onlineHandler), 
                        ge(this._settings).forEach(e => {
                            J(e);
                        }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, 
                        delete this.toLoadCount;
                    },
                    loadAll: function(e) {
                        const t = this._settings;
                        he(e, t).forEach(e => {
                            M(e, this), se(e, t, this);
                        });
                    },
                    restoreAll: function() {
                        const e = this._settings;
                        ge(e).forEach(t => {
                            ie(t, e);
                        });
                    }
                }, me.load = (e, t) => {
                    const a = s(t);
                    se(e, a);
                }, me.resetStatus = e => {
                    y(e);
                }, e && ((e, t) => {
                    if (t) if (t.length) for (let a, n = 0; a = t[n]; n += 1) l(e, a); else l(e, t);
                })(me, window.lazyLoadOptions), me;
            });
        }
    };
    const __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        const cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        const module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                setTimeout(() => {
                    lockPaddingElements.forEach(lockPaddingElement => {
                        lockPaddingElement.style.paddingRight = "";
                    });
                    document.body.style.paddingRight = "";
                    document.documentElement.classList.remove("lock");
                }, delay);
                bodyLockStatus = false;
                setTimeout(function() {
                    bodyLockStatus = true;
                }, delay);
            }
        };
        let bodyLock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
                lockPaddingElements.forEach(lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = lockPaddingValue;
                });
                document.body.style.paddingRight = lockPaddingValue;
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout(function() {
                    bodyLockStatus = true;
                }, delay);
            }
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                document.addEventListener("click", setSpollerAction);
                const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                });
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    });
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach(spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                        }
                    });
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerItems = spollersBlock.querySelectorAll("details");
                    if (spollerItems.length) spollerItems.forEach(spollerItem => {
                        let spollerTitle = spollerItem.querySelector("summary");
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerItem.hasAttribute("data-open")) {
                                spollerItem.open = false;
                                spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.classList.add("_spoller-active");
                                spollerItem.open = true;
                            }
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.classList.remove("_spoller-active");
                            spollerItem.open = true;
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("summary") && el.closest("[data-spollers]")) {
                        e.preventDefault();
                        if (el.closest("[data-spollers]").classList.contains("_spoller-init")) {
                            const spollerTitle = el.closest("summary");
                            const spollerBlock = spollerTitle.closest("details");
                            const spollersBlock = spollerTitle.closest("[data-spollers]");
                            const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                            const scrollSpoller = spollerBlock.hasAttribute("data-spoller-scroll");
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            if (!spollersBlock.querySelectorAll("._slide").length) {
                                if (oneSpoller && !spollerBlock.open) hideSpollersBody(spollersBlock);
                                !spollerBlock.open ? spollerBlock.open = true : setTimeout(() => {
                                    spollerBlock.open = false;
                                }, spollerSpeed);
                                spollerTitle.classList.toggle("_spoller-active");
                                _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                                if (scrollSpoller && spollerTitle.classList.contains("_spoller-active")) {
                                    const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
                                    const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
                                    const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-spoller-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                                    window.scrollTo({
                                        top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                                        behavior: "smooth"
                                    });
                                }
                            }
                        }
                    }
                    if (!el.closest("[data-spollers]")) {
                        const spollersClose = document.querySelectorAll("[data-spoller-close]");
                        if (spollersClose.length) spollersClose.forEach(spollerClose => {
                            const spollersBlock = spollerClose.closest("[data-spollers]");
                            const spollerCloseBlock = spollerClose.parentNode;
                            if (spollersBlock.classList.contains("_spoller-init")) {
                                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                                spollerClose.classList.remove("_spoller-active");
                                _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                                setTimeout(() => {
                                    spollerCloseBlock.open = false;
                                }, spollerSpeed);
                            }
                        });
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveBlock = spollersBlock.querySelector("details[open]");
                    if (spollerActiveBlock && !spollersBlock.querySelectorAll("._slide").length) {
                        const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                        setTimeout(() => {
                            spollerActiveBlock.open = false;
                        }, spollerSpeed);
                    }
                }
            }
        }
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
                if (document.documentElement.classList.contains("menu-open") && e.target.closest(".menu__link")) menuClose();
            });
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function FLS(message) {
            setTimeout(() => {
                if (window.FLS) console.log(message);
            }, 0);
        }
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        var lazyload_min = __webpack_require__(144);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset]",
            class_loaded: "_lazy-loaded",
            use_native: true
        });
        const flsModules = {};
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                    let uniqParams = uniqArray(Array.from(items).map(function(item) {
                        if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                            let valueOfThreshold;
                            if (item.clientHeight > 2) {
                                valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                                if (valueOfThreshold > 1) valueOfThreshold = 1;
                            } else valueOfThreshold = 1;
                            item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                        }
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    }));
                    uniqParams.forEach(uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter(function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        });
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    });
                } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                    this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                    return;
                }
                if (paramsWatch.threshold === "prx") {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                console.log(configWatcher);
                this.observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        this.scrollWatcherCallback(entry, observer);
                    });
                }, configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach(item => this.observer.observe(item));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? FLS(`[Спостерігач]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
            }
        }
        flsModules.watcher = new ScrollWatcher({});
        let addWindowScrollEvent = false;
        setTimeout(() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", function(e) {
                    document.dispatchEvent(windowScroll);
                });
            }
        }, 0);
        const MODELS = {
            fastlane: {
                name: "Fastlane",
                accent: "#00E799",
                rgb: "0, 231, 153",
                logo: "/img/Logo-Green.svg",
                daily: .03,
                maxdd: .06,
                feePerK: 24,
                target: 0,
                desc: "Instant funding — trade without profit targets and qualify for payouts based on realized balance. A 3% balance-based daily limit and a 6% equity-based trailing drawdown apply, with a 60% consistency rule and a 5-day minimum (3 profitable). News, overnight and weekend holding are fully permitted.",
                params: [ [ "Funded account", "Up To $250,000" ], [ "Phases", "No phase" ], [ "Trading Period", "Unlimited" ], [ "Profit Split", "60% Profit Split" ], [ "Max. daily drawdown", "3% Limit" ], [ "Max. Drawdown", "6% Limit" ] ],
                sizes: [ 5, 10, 25, 50, 100, 250 ]
            },
            checkpoint: {
                name: "Checkpoint",
                accent: "#00F2EA",
                rgb: "0, 242, 234",
                logo: "/img/Logo-Cyan.svg",
                daily: .03,
                maxdd: .06,
                feePerK: 6.6,
                target: .1,
                desc: "1-Phase Challenge — the objective is a 10% profit target evaluated on realized balance. A 3% balance-based daily limit and a 6% equity-based trailing drawdown anchored to the high watermark. Unlimited trading period with a 5-day minimum and a 60% consistency rule across all stages.",
                params: [ [ "Funded account", "Up To $1,000,000" ], [ "Phases", "1 Phase" ], [ "Trading Period", "Unlimited" ], [ "Profit Split", "80% Profit Split" ], [ "Max. daily drawdown", "3% Limit" ], [ "Max. Drawdown", "6% Limit" ] ],
                sizes: [ 5, 10, 25, 50, 100, 250, 500, 1e3 ]
            },
            verified: {
                name: "Verified",
                accent: "#5555FF",
                rgb: "85, 85, 255",
                logo: "/img/Logo-Blue.svg",
                daily: .05,
                maxdd: .1,
                feePerK: 6.6,
                target: .1,
                desc: "2-Phase Challenge — complete two stages with a 10% target in Phase 1 and 5% in Phase 2, both on realized balance. 5% daily limit and 10% max drawdown up to $500K (4% / 8% at $1M). Unlimited trading with a 5-day minimum and a 60% consistency rule across all phases, including the funded stage.",
                params: [ [ "Funded account", "Up To $1,000,000" ], [ "Phases", "2 Phases" ], [ "Trading Period", "Unlimited" ], [ "Profit Split", "80% Profit Split" ], [ "Max. daily drawdown", "5% / 4% @ $1M" ], [ "Max. Drawdown", "10% / 8% @ $1M" ] ],
                sizes: [ 5, 10, 25, 50, 100, 250, 500, 1e3 ]
            }
        };
        const fmtMoney = n => "$" + Math.round(n).toLocaleString("en-US");
        const fmtSize = k => k >= 1e3 ? "$" + k / 1e3 + "M" : "$" + k + "K";
        function initFunding() {
            const root = document.getElementById("tx-funding");
            if (!root) return;
            const tiles = root.querySelectorAll("[data-tile]");
            const panel = root.querySelector("[data-panel]");
            const state = {
                id: "fastlane",
                size: 50
            };
            const buildRows = (m, size) => {
                let {daily, maxdd} = m;
                if (state.id === "verified" && size === 1e3) {
                    daily = .04;
                    maxdd = .08;
                }
                const usd = size * 1e3;
                const rows = [ [ "Fee — one-time", fmtMoney(size * m.feePerK) ], [ "Account size", fmtSize(size) ], [ "Trading period", "Unlimited" ], [ "Minimum trading days", "5" ], [ "Maximum daily loss", fmtMoney(usd * daily) ], [ "Maximum loss (trailing)", fmtMoney(usd * maxdd) ] ];
                if (m.target > 0) {
                    rows.push([ "Profit target — Phase 1", fmtMoney(usd * m.target) ]);
                    if (state.id === "verified") rows.push([ "Profit target — Phase 2", fmtMoney(usd * .05) ]);
                } else rows.push([ "Min. profit per day", fmtMoney(usd * .005) ]);
                return rows;
            };
            const render = () => {
                const m = MODELS[state.id];
                tiles.forEach(t => t.classList.toggle("is-active", t.dataset.tile === state.id));
                const params = m.params.map(p => `<div class="fund-param"><div class="fund-param__label">${p[0]}</div><div class="fund-param__value">${p[1]}</div></div>`).join("");
                const sizes = m.sizes.map(s => `<button class="fund-size${s === state.size ? " is-active" : ""}" type="button" data-size="${s}">${fmtSize(s)}</button>`).join("");
                const rows = buildRows(m, state.size).map(r => `<div class="fund-row"><span class="fund-row__label">${r[0]}</span><span class="fund-row__value">${r[1]}</span></div>`).join("");
                panel.innerHTML = `\n      <div class="fund-panel" style="--accent:${m.accent};--accent-rgb:${m.rgb}">\n        <div class="fund-panel__top">\n          <div class="fund-panel__intro">\n            <img class="fund-panel__logo" src="${m.logo}" alt="">\n            <h3 class="fund-panel__name">${m.name}</h3>\n            <p class="fund-panel__desc">${m.desc}</p>\n            <a class="fund-panel__cta" href="#start">Get funded →</a>\n          </div>\n          <div class="fund-panel__params">${params}</div>\n        </div>\n        <div class="fund-panel__sizes-wrap">\n          <div class="fund-panel__sizes-head">\n            <p class="fund-panel__sizes-title">Account sizes &amp; parameters</p>\n            <div class="fund-panel__sizes">${sizes}</div>\n          </div>\n          <div class="fund-panel__rows">${rows}</div>\n        </div>\n      </div>`;
                panel.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => {
                    state.size = Number(b.dataset.size);
                    render();
                }));
            };
            tiles.forEach(t => t.addEventListener("click", () => {
                state.id = t.dataset.tile;
                if (!MODELS[state.id].sizes.includes(state.size)) state.size = 50;
                render();
            }));
            render();
        }
        function initTilt() {
            if (window.matchMedia("(pointer: coarse)").matches) return;
            document.querySelectorAll("[data-tilt]").forEach(card => {
                const img = card.querySelector("[data-tilt-img]");
                card.style.transition = "transform .35s cubic-bezier(.16,1,.3,1)";
                if (img) img.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
                card.addEventListener("mousemove", e => {
                    const r = card.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - .5;
                    const py = (e.clientY - r.top) / r.height - .5;
                    card.style.transform = `perspective(1000px) rotateY(${(px * 4.5).toFixed(2)}deg) rotateX(${(-py * 4.5).toFixed(2)}deg) translateY(-5px)`;
                    if (img) img.style.transform = `scale(1.07) translate(${(-px * 16).toFixed(1)}px, ${(-py * 16).toFixed(1)}px)`;
                });
                card.addEventListener("mouseleave", () => {
                    card.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
                    if (img) img.style.transform = "scale(1)";
                });
            });
        }
        function initBoot() {
            const boot = document.getElementById("boot");
            if (!boot) return;
            const bar = document.getElementById("boot-bar");
            const pct = document.getElementById("boot-pct");
            const root = document.documentElement;
            root.style.overflow = "hidden";
            window.scrollTo(0, 0);
            const hide = () => {
                boot.style.display = "none";
                root.style.overflow = "";
            };
            const fade = () => {
                const f0 = performance.now();
                const fd = 500;
                const step = () => {
                    const p = Math.min((performance.now() - f0) / fd, 1);
                    boot.style.opacity = (1 - p).toFixed(3);
                    if (p < 1) requestAnimationFrame(step); else hide();
                };
                requestAnimationFrame(step);
            };
            const imgs = [ ...document.images ];
            const total = imgs.length;
            let loaded = imgs.filter(i => i.complete).length;
            imgs.forEach(img => {
                if (img.complete) return;
                const done = () => {
                    loaded += 1;
                };
                img.addEventListener("load", done, {
                    once: true
                });
                img.addEventListener("error", done, {
                    once: true
                });
            });
            let pageDone = document.readyState === "complete";
            let fontsDone = !(document.fonts && document.fonts.ready);
            window.addEventListener("load", () => {
                pageDone = true;
            }, {
                once: true
            });
            if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
                fontsDone = true;
            });
            const ease = (cur, tgt, k) => cur + (tgt - cur) * k;
            let shown = 0;
            const render = () => {
                const v = Math.round(shown * 100);
                if (bar) bar.style.width = `${v}%`;
                if (pct) pct.textContent = `${v}%`;
            };
            const tick = () => {
                if (pageDone && fontsDone) {
                    shown = ease(shown, 1, .3);
                    if (shown > .997) {
                        shown = 1;
                        render();
                        fade();
                        return;
                    }
                } else {
                    const imgFrac = total ? loaded / total : 1;
                    const target = Math.min(.92, .08 + imgFrac * .84);
                    shown = ease(shown, target, .08);
                }
                render();
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            setTimeout(() => {
                pageDone = true;
                fontsDone = true;
            }, 12e3);
        }
        function initHeroReveal() {
            const ease = t => 1 - Math.pow(1 - t, 3);
            const items = [];
            document.querySelectorAll(".js-rise").forEach(el => {
                items.push({
                    el,
                    delay: Number(el.dataset.delay) || 0,
                    dur: 1100,
                    type: "rise"
                });
                el.style.transform = "translateY(115%)";
            });
            document.querySelectorAll(".js-fade").forEach(el => {
                items.push({
                    el,
                    delay: Number(el.dataset.delay) || 0,
                    dur: 1e3,
                    type: "fade"
                });
                el.style.opacity = "0";
            });
            const start = performance.now();
            const tick = () => {
                const now = performance.now();
                let done = true;
                for (const it of items) {
                    const p = Math.max(0, Math.min((now - start - it.delay) / it.dur, 1));
                    if (p < 1) done = false;
                    const e = ease(p);
                    if (it.type === "rise") it.el.style.transform = `translateY(${((1 - e) * 115).toFixed(2)}%)`; else {
                        it.el.style.opacity = e.toFixed(3);
                        it.el.style.transform = `translateY(${((1 - e) * 14).toFixed(1)}px)`;
                    }
                }
                if (!done) requestAnimationFrame(tick); else items.forEach(it => {
                    if (it.type === "rise") it.el.style.transform = "translateY(0)"; else {
                        it.el.style.opacity = "1";
                        it.el.style.transform = "none";
                    }
                });
            };
            requestAnimationFrame(tick);
        }
        const scrollState = {
            g: 0
        };
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
        const ease = t => 1 - Math.pow(1 - t, 3);
        const PIN_MIN_H = 600;
        function initScrollEngine({animated = true} = {}) {
            const docEl = document.documentElement;
            const progress = document.getElementById("progress");
            const nav = document.getElementById("nav");
            const reveals = animated ? [ ...document.querySelectorAll("[data-reveal]") ] : [];
            const counters = animated ? [ ...document.querySelectorAll("[data-count]") ] : [];
            const eqPath = document.querySelector("[data-equity-path]");
            const eqDot = document.querySelector("[data-equity-dot]");
            const eqWrap = eqPath ? eqPath.closest("[data-pin-wrap]") : null;
            const eqProgs = [ ...document.querySelectorAll("[data-equity-prog]") ];
            const hlPin = document.querySelector("[data-hl-pin]");
            const hlPanels = [ ...document.querySelectorAll("[data-hl-panel]") ];
            const hlNavs = [ ...document.querySelectorAll("[data-hl-nav]") ];
            const commPin = document.querySelector("[data-comm-pin]");
            const commCards = document.querySelector("[data-comm-cards]");
            const commCardEls = [ ...document.querySelectorAll("[data-comm-card]") ];
            const commPhone = document.querySelector("[data-comm-phone]");
            const commSocials = document.querySelector("[data-comm-socials]");
            const commSocEls = [ ...document.querySelectorAll("[data-comm-soc]") ];
            const commHeads = [ ...document.querySelectorAll("[data-comm-head]") ];
            const ctaBand = document.querySelector("[data-cta-band]");
            const ctaTitle = ctaBand ? ctaBand.querySelector(".footer__cta-title") : null;
            const ctaWords = ctaBand ? [ ...ctaBand.querySelectorAll("[data-cta-word]") ] : [];
            const ctaBtn = ctaBand ? ctaBand.querySelector("[data-cta-btn]") : null;
            if (animated && ctaBand) ctaWords.forEach(word => {
                const text = word.textContent;
                word.textContent = "";
                for (const ch of text) {
                    const s = document.createElement("span");
                    s.className = "footer__cta-char";
                    s.textContent = ch === " " ? " " : ch;
                    word.appendChild(s);
                }
            });
            const ctaChars = ctaBand ? [ ...ctaBand.querySelectorAll(".footer__cta-char") ] : [];
            const startPin = document.querySelector("[data-start-pin]");
            const hPin = document.querySelector("[data-hpin]");
            const hTrack = document.querySelector("[data-htrack]");
            const hlFade = hlPin && hlPin.previousElementSibling ? hlPin.previousElementSibling.querySelector("[data-fade-when-climbed]") : null;
            const startFade = startPin && startPin.previousElementSibling ? startPin.previousElementSibling.querySelector("[data-fade-when-climbed]") : null;
            const clearStyle = el => {
                if (el) el.style.cssText = "";
            };
            const resetPins = () => {
                clearStyle(eqPath);
                clearStyle(eqDot);
                if (hlPin) {
                    clearStyle(hlPin.querySelector("[data-hl-bg]"));
                    clearStyle(hlPin.querySelector("[data-hl-stage]"));
                }
                hlPanels.forEach((el, i) => el.classList.toggle("is-active", i === 0));
                hlNavs.forEach((el, i) => el.classList.toggle("is-active", i === 0));
                clearStyle(commCards);
                commCardEls.forEach(clearStyle);
                clearStyle(commPhone);
                clearStyle(commSocials);
                commSocEls.forEach(clearStyle);
                commHeads.forEach(clearStyle);
                if (startPin) {
                    clearStyle(startPin.querySelector("[data-start-bg]"));
                    clearStyle(startPin.querySelector("[data-start-stage]"));
                    clearStyle(startPin.querySelector("[data-start-cta]"));
                    startPin.querySelectorAll("[data-start-head]").forEach(clearStyle);
                    startPin.querySelectorAll("[data-start-item]").forEach(clearStyle);
                }
                clearStyle(hTrack);
                clearStyle(hlFade);
                clearStyle(startFade);
            };
            let pinsOnPrev = true;
            const loop = () => {
                requestAnimationFrame(loop);
                const vh = window.innerHeight;
                const sy = window.scrollY;
                const g = clamp(sy / Math.max(1, docEl.scrollHeight - vh), 0, 1);
                scrollState.g = g;
                if (progress) progress.style.width = `${(g * 100).toFixed(2)}%`;
                if (nav) nav.classList.toggle("is-scrolled", sy > 30);
                if (!animated) return;
                const pinsOn = vh >= PIN_MIN_H;
                docEl.classList.toggle("no-pin", !pinsOn);
                if (!pinsOn && pinsOnPrev) resetPins();
                pinsOnPrev = pinsOn;
                for (const el of reveals) {
                    const r = el.getBoundingClientRect();
                    const p = clamp((vh * .9 - r.top) / (vh * .34), 0, 1);
                    const e = ease(p);
                    el.style.opacity = e.toFixed(3);
                    el.style.transform = `translateY(${((1 - e) * 30).toFixed(1)}px)`;
                }
                for (const el of counters) {
                    const r = el.getBoundingClientRect();
                    if (!el._done && r.top < vh * .86 && r.bottom > 0) {
                        if (el._t0 == null) el._t0 = performance.now();
                        const dur = parseInt(el.dataset.dur || "1500", 10);
                        const p = clamp((performance.now() - el._t0) / dur, 0, 1);
                        const e = ease(p);
                        const target = parseFloat(el.dataset.count);
                        const val = target % 1 !== 0 ? (target * e).toFixed(1) : Math.round(target * e);
                        el.textContent = (el.dataset.prefix || "") + val + (el.dataset.suffix || "");
                        if (p >= 1) el._done = true;
                    }
                }
                if (pinsOn && eqPath && eqWrap) {
                    const wr = eqWrap.getBoundingClientRect();
                    const pw = clamp(-wr.top / Math.max(1, eqWrap.offsetHeight - vh), 0, 1);
                    const len = eqPath._len || (eqPath._len = eqPath.getTotalLength());
                    eqPath.style.strokeDasharray = len;
                    eqPath.style.strokeDashoffset = (len * (1 - pw)).toFixed(1);
                    if (eqDot) {
                        const pt = eqPath.getPointAtLength(len * pw);
                        eqDot.setAttribute("cx", pt.x);
                        eqDot.setAttribute("cy", pt.y);
                        eqDot.style.opacity = pw > .01 && pw < .999 ? "1" : "0";
                    }
                    for (const n of eqProgs) {
                        const tgt = parseFloat(n.dataset.equityProg);
                        const dec = parseInt(n.dataset.dec || "0", 10);
                        const v = tgt * pw;
                        const out = dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US");
                        n.textContent = (n.dataset.prefix || "") + out + (n.dataset.suffix || "");
                    }
                }
                if (pinsOn && hlPin) {
                    const r = hlPin.getBoundingClientRect();
                    const p = clamp(-r.top / Math.max(1, hlPin.offsetHeight - vh), 0, 1);
                    const bg = hlPin.querySelector("[data-hl-bg]");
                    if (bg) bg.style.transform = `scale(${(1.18 - ease(p) * .1).toFixed(3)}) translateY(${(-(ease(p) - .5) * 24).toFixed(1)}px)`;
                    const riseT = clamp((vh - Math.max(0, r.top)) / vh, 0, 1);
                    const stage = hlPin.querySelector("[data-hl-stage]");
                    if (stage) stage.style.width = `${(80 + riseT * 20).toFixed(2)}%`;
                    if (hlFade) hlFade.style.opacity = (1 - clamp(riseT * 2.4, 0, 1)).toFixed(3);
                    const n = hlPanels.length || 1;
                    const active = Math.min(Math.floor(p * n * .999), n - 1);
                    hlPanels.forEach((el, i) => el.classList.toggle("is-active", i === active));
                    hlNavs.forEach((el, i) => el.classList.toggle("is-active", i === active));
                }
                if (pinsOn && commPin) {
                    const r = commPin.getBoundingClientRect();
                    const p = clamp(-r.top / Math.max(1, commPin.offsetHeight - vh), 0, 1);
                    const wide = window.innerWidth >= 992;
                    const c0 = clamp(p / .2, 0, 1);
                    const cOut = clamp((p - .22) / .1, 0, 1);
                    const outE = 1 - Math.pow(1 - cOut, 3);
                    if (commCards) {
                        const single = window.innerWidth <= 767.98;
                        if (single) {
                            commCards.style.opacity = "1";
                            commCards.style.pointerEvents = p < .3 ? "auto" : "none";
                            const seq = clamp(p / .3, 0, 1);
                            const N = commCardEls.length || 1;
                            commCardEls.forEach((el, i) => {
                                const local = (seq - i / N) * N;
                                let op = 0, ty = 60, sc = .95;
                                if (local >= 0 && local <= 1) {
                                    const fin = clamp(local / .3, 0, 1);
                                    const fout = 1 - clamp((local - .7) / .3, 0, 1);
                                    const v = Math.min(fin, fout);
                                    op = v;
                                    ty = (1 - fin) * 60 - (1 - fout) * 60;
                                    sc = .95 + v * .05;
                                } else if (local > 1) ty = -60;
                                el.style.opacity = op.toFixed(3);
                                el.style.transform = `translateY(${ty.toFixed(1)}px) scale(${sc.toFixed(3)})`;
                                el.style.zIndex = local >= 0 && local < 1 ? 2 : 1;
                            });
                        } else {
                            commCards.style.opacity = (Math.min(c0 * 2, 1) * (1 - cOut)).toFixed(3);
                            commCards.style.pointerEvents = cOut > .05 || c0 < .5 ? "none" : "auto";
                            const fanned = window.innerWidth > 767.98;
                            const dir = [ -1, 0, 1 ];
                            commCardEls.forEach((el, i) => {
                                const d = fanned ? dir[i] : 0;
                                const sp = clamp((c0 - i * .14) / .55, 0, 1);
                                const se = 1 - Math.pow(1 - sp, 3);
                                const inY = (1 - se) * 70;
                                const inScale = .86 + se * .14;
                                const inRot = (1 - se) * d * 5;
                                const outX = outE * d * (window.innerWidth * .34);
                                const outScale = 1 - outE * .12;
                                const outRot = outE * d * 7;
                                el.style.opacity = Math.min(sp * 1.5, 1).toFixed(3);
                                el.style.transform = `translate(${outX.toFixed(1)}px, ${(inY - outE * 30).toFixed(1)}px) scale(${(inScale * outScale).toFixed(3)}) rotate(${(inRot + outRot).toFixed(2)}deg)`;
                            });
                        }
                    }
                    const p1 = clamp((p - .3) / .24, 0, 1);
                    const e1 = 1 - Math.pow(1 - p1, 3);
                    const p2 = clamp((p - .56) / .18, 0, 1);
                    const e2 = 1 - Math.pow(1 - p2, 3);
                    const p3 = clamp((p - .66) / .34, 0, 1);
                    if (commPhone) {
                        const boxW = Math.min(1240, window.innerWidth * .92);
                        const rise = (1 - e1) * 60;
                        const scale = .7 + e1 * .3;
                        const shiftX = wide ? -e2 * (boxW * .3) : 0;
                        let shiftScale = scale * (1 - e2 * .16);
                        let phoneFade = 1;
                        if (!wide) {
                            const pf = clamp((p - .54) / .08, 0, 1);
                            phoneFade = 1 - pf;
                            shiftScale = scale * (1 - pf * .35);
                        }
                        commPhone.style.opacity = (e1 * phoneFade).toFixed(3);
                        commPhone.style.transform = `translateY(${rise.toFixed(1)}vh) translateX(${shiftX.toFixed(1)}px) scale(${shiftScale.toFixed(3)})`;
                    }
                    if (commSocials) {
                        commSocials.style.opacity = p3 > 0 ? "1" : "0";
                        commSocEls.forEach((el, i) => {
                            const sp = clamp((p3 - i * .085) / .32, 0, 1);
                            const se = 1 - Math.pow(1 - sp, 3);
                            el.style.opacity = se.toFixed(3);
                            el.style.transform = `translateX(${((1 - se) * 60).toFixed(1)}px)`;
                        });
                    }
                    commHeads.forEach(h => {
                        h.style.opacity = (clamp(c0 * 1.6, 0, 1) * (1 - e1)).toFixed(3);
                    });
                }
                if (ctaBand) {
                    const tTop = (ctaTitle || ctaBand).getBoundingClientRect().top;
                    const bp = clamp((vh * .95 - tTop) / (vh * .45), 0, 1);
                    const n = ctaChars.length || 1;
                    ctaChars.forEach((c, i) => {
                        const cp = clamp((bp - i / n * .6) / .4, 0, 1);
                        const e = 1 - Math.pow(1 - cp, 3);
                        c.style.opacity = e.toFixed(3);
                        c.style.transform = `translateY(${((1 - e) * .7).toFixed(3)}em)`;
                        c.style.filter = `blur(${((1 - e) * 6).toFixed(1)}px)`;
                    });
                    if (ctaBtn) {
                        const bcp = clamp((vh * .5 - tTop) / (vh * .22), 0, 1);
                        const ce = 1 - Math.pow(1 - bcp, 3);
                        ctaBtn.style.opacity = ce.toFixed(3);
                        ctaBtn.style.transform = `translateY(${((1 - ce) * 24).toFixed(1)}px) scale(${(.92 + ce * .08).toFixed(3)})`;
                    }
                }
                if (pinsOn && startPin) {
                    const r = startPin.getBoundingClientRect();
                    const p = clamp(-r.top / Math.max(1, startPin.offsetHeight - vh), 0, 1);
                    const bg = startPin.querySelector("[data-start-bg]");
                    if (bg) bg.style.transform = `scale(${(1.18 - ease(p) * .1).toFixed(3)}) translateY(${(-(ease(p) - .5) * 24).toFixed(1)}px)`;
                    const hp0 = clamp(p / .18, 0, 1);
                    const hpe = 1 - Math.pow(1 - hp0, 3);
                    startPin.querySelectorAll("[data-start-head]").forEach(h => {
                        h.style.opacity = hpe.toFixed(3);
                        h.style.transform = `translateY(${((1 - hpe) * 24).toFixed(1)}px)`;
                    });
                    startPin.querySelectorAll("[data-start-item]").forEach((el, i) => {
                        const ip = clamp((p - .18 - i * .1) / .18, 0, 1);
                        const ie = 1 - Math.pow(1 - ip, 3);
                        el.style.opacity = ie.toFixed(3);
                        el.style.transform = `translateY(${((1 - ie) * 30).toFixed(1)}px) scale(${(.94 + ie * .06).toFixed(3)})`;
                    });
                    const cta = startPin.querySelector("[data-start-cta]");
                    if (cta) {
                        const cp = clamp((p - .74) / .2, 0, 1);
                        const ce = 1 - Math.pow(1 - cp, 3);
                        cta.style.opacity = ce.toFixed(3);
                        cta.style.transform = `translateY(${((1 - ce) * 26).toFixed(1)}px) scale(${(.9 + ce * .1).toFixed(3)})`;
                    }
                    const riseT = clamp((vh - Math.max(0, r.top)) / vh, 0, 1);
                    const stage = startPin.querySelector("[data-start-stage]");
                    if (stage) stage.style.width = `${(80 + riseT * 20).toFixed(2)}%`;
                    if (startFade) startFade.style.opacity = (1 - clamp(riseT * 2.4, 0, 1)).toFixed(3);
                }
                if (pinsOn && hPin && hTrack) {
                    const r = hPin.getBoundingClientRect();
                    const ph = clamp(-r.top / Math.max(1, hPin.offsetHeight - vh), 0, 1);
                    const last = hTrack.lastElementChild;
                    const dist = last ? Math.max(0, last.offsetLeft + last.offsetWidth / 2 - window.innerWidth / 2) : Math.max(0, hTrack.scrollWidth - window.innerWidth);
                    const phTrack = clamp(ph / .45, 0, 1);
                    hTrack.style.transform = `translateX(${(-phTrack * dist).toFixed(1)}px)`;
                }
            };
            requestAnimationFrame(loop);
        }
        function initBackground() {
            const canvas = document.getElementById("glx");
            if (!canvas) return;
            const gl = canvas.getContext("webgl2", {
                antialias: true,
                preserveDrawingBuffer: true,
                alpha: false
            });
            if (!gl) {
                canvas.style.background = "radial-gradient(ellipse at 60% 40%,rgba(0,231,153,.25),transparent 60%),radial-gradient(ellipse at 30% 70%,rgba(0,242,234,.2),transparent 55%),#02060a";
                return;
            }
            const vsrc = "#version 300 es\nin vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}";
            const fsrc = `#version 300 es\nprecision highp float;\nout vec4 O;\nuniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;\nfloat hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p + 45.32);return fract(p.x*p.y);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));vec2 u=f*f*(3.0-2.0*f);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}\nfloat fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<6;i++){v+=a*noise(p);p=p*2.02+vec2(1.7,9.2);a*=0.5;}return v;}\nvoid main(){\n  vec2 uv=gl_FragCoord.xy/u_res.xy;\n  vec2 p=(gl_FragCoord.xy-0.5*u_res.xy)/u_res.y;\n  float t=u_time*0.05;\n  vec2 m=(u_mouse-0.5*u_res.xy)/u_res.y;\n  p+=m*0.08;\n  vec2 q=vec2(fbm(p*1.4+vec2(0.0,t)),fbm(p*1.4+vec2(5.2,1.3)-t));\n  vec2 r=vec2(fbm(p*1.4 + 3.5*q+vec2(1.7,9.2)+t*0.6),fbm(p*1.4 + 3.5*q+vec2(8.3,2.8)-t*0.4));\n  float f=fbm(p*1.4 + 3.5*r);\n  vec3 c1=vec3(0.004,0.023,0.039);\n  vec3 c2=vec3(0.0,0.905,0.60);\n  vec3 c3=vec3(0.0,0.95,0.92);\n  vec3 c4=vec3(0.04,0.07,0.22);\n  vec3 col=c1;\n  col=mix(col,c4,smoothstep(0.0,0.7,length(r)));\n  col=mix(col,c2,smoothstep(0.28,0.82,f));\n  col=mix(col,c3,smoothstep(0.5,1.02,f*length(q)*1.7));\n  col+=c2*0.12*pow(f,3.0);\n  float md=length(p-m);\n  col+=c2*0.30*exp(-md*3.2);\n  col*=1.06;\n  float vig=smoothstep(1.4,0.15,length(uv-0.5));\n  col*=mix(0.58,1.0,vig);\n  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.02;\n  O=vec4(col,1.0);\n}`;
            const mk = (type, src) => {
                const s = gl.createShader(type);
                gl.shaderSource(s, src);
                gl.compileShader(s);
                if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn("shader", gl.getShaderInfoLog(s));
                return s;
            };
            const prog = gl.createProgram();
            gl.attachShader(prog, mk(gl.VERTEX_SHADER, vsrc));
            gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, fsrc));
            gl.linkProgram(prog);
            if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
                console.warn("link", gl.getProgramInfoLog(prog));
                return;
            }
            gl.useProgram(prog);
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ -1, -1, 3, -1, -1, 3 ]), gl.STATIC_DRAW);
            const loc = gl.getAttribLocation(prog, "a");
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
            const uRes = gl.getUniformLocation(prog, "u_res");
            const uTime = gl.getUniformLocation(prog, "u_time");
            const uMouse = gl.getUniformLocation(prog, "u_mouse");
            const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
            let W, H;
            const resize = () => {
                W = canvas.clientWidth * dpr;
                H = canvas.clientHeight * dpr;
                canvas.width = W;
                canvas.height = H;
                gl.viewport(0, 0, W, H);
            };
            resize();
            window.addEventListener("resize", resize);
            let tmx = W / 2, tmy = H / 2, cmx = tmx, cmy = tmy;
            window.addEventListener("mousemove", e => {
                const r = canvas.getBoundingClientRect();
                tmx = (e.clientX - r.left) * dpr;
                tmy = H - (e.clientY - r.top) * dpr;
            });
            const start = performance.now();
            const draw = () => {
                requestAnimationFrame(draw);
                cmx += (tmx - cmx) * .05;
                cmy += (tmy - cmy) * .05;
                gl.uniform2f(uRes, W, H);
                gl.uniform1f(uTime, (performance.now() - start) / 1e3);
                gl.uniform2f(uMouse, cmx, cmy);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
            };
            draw();
        }
        const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        function start() {
            if (motionOK) document.documentElement.classList.add("is-animated");
            initFunding();
            initScrollEngine({
                animated: motionOK
            });
            if (motionOK) {
                initBoot();
                initHeroReveal();
                initTilt();
                initBackground();
            }
        }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
        window["FLS"] = true;
        menuInit();
        spollers();
        document.addEventListener("click", e => {
            if (e.target.closest(".menu__link") && document.documentElement.classList.contains("menu-open")) menuClose();
        });
    })();
})();