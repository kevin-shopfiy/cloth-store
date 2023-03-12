class ShopTheLookSection extends HTMLElement {
    constructor() {
        super(),
            (this.usePocketMode = window.innerWidth <= 989),
            (this.pocketActivatorButton = this.querySelector('[data-action="open-look"]')),
            (this.shopLooks = Array.from(this.querySelectorAll(".shop-the-look__item"))),
            (this.outerSlider = this.querySelector(".shop-the-look > .slider")),
            this.shopLooks[0].classList.add("is-selected"),
            this.rePlacePopovers(),
            this.bindEvents(),
            this.createPocketPopovers();
    }
    bindEvents() {
        this.querySelectorAll(".shop-the-look__dot").forEach((e) => e.addEventListener("click", this.onDotClicked.bind(this))),
            this.querySelector(".shop-the-look ").addEventListener("slideChanged", this.onLookChange.bind(this)),
            this.querySelectorAll(".shop-the-look slideshow-component.shop-the-look__product-list").forEach((e) => e.addEventListener("slideChanged", this.onProductChanged.bind(this)));
    }
    rePlacePopovers() {
        var e = this.querySelectorAll(".popover");
        Array.from(e).forEach((e) => {
            this.querySelector(".shop-the-look").insertBefore(e, this.outerSlider);
        });
    }
    createPocketPopovers() {
        (this.popovers = []),
            this.querySelectorAll(".popover").forEach((e) => {
                this.popovers.push(new Popover(e, { activator: this.pocketActivatorButton, showOverlay: !1, onOpen: this.openPocketZoom.bind(this), onClose: this.closePocketZoom.bind(this) }));
            });
    }
    onDotClicked(e) {
        const t = e.currentTarget;
        let o = !1;
        console.log(t);
        const s = parseInt(t.getAttribute("data-product-index")) - 1;
        var i = parseInt(t.getAttribute("data-look-index")),
            e = parseInt(t.getAttribute("data-look-indexMob"));
        if (i) {
            const r = this.shopLooks[i];
            r.querySelectorAll(".shop-the-look__dot");
        }
        if (e) {
            const l = this.shopLooks[e];
            l.querySelectorAll(".shop-the-look__dot");
        }
        this.popovers.forEach(function (e) {
            e.isOpen && (o = !0);
        }),
            (t.classList.contains("mobile_dot") ? this.querySelectorAll('.shop-the-look__product-list[data-look-indexMob="' + e + '"]') : this.querySelectorAll('.shop-the-look__product-list[data-look-index="' + i + '"]')).forEach((e) => {
                const t = e.nextElementSibling;
                t && ((e = t.querySelectorAll(".slider-counter__link")), Array.from(e)[s].click());
            }),
            window.innerWidth <= 989 && !o && this.popovers[e].open();
    }
    onProductChanged(e) {
        let o;
        const t = this.querySelector(".shop-the-look__item.is-selected"),
            s = e.detail.currentPage;
        t.querySelectorAll(".shop-the-look__dot").forEach(function (e, t) {
            e.classList.remove("is-active"), t + 1 === s && (e.classList.add("is-active"), (o = e));
        }),
            t.querySelectorAll(".shop-the-look__dot.mobile_dot").forEach(function (e, t) {
                e.classList.remove("is-active"), t + 1 === s && (e.classList.add("is-active"), (o = e));
            });
    }
    onLookChange(e) {
        this.querySelector(".shop-the-look__item.is-selected").classList.remove("is-selected"), e.detail.currentElement.classList.add("is-selected");
        e = e.detail.currentElement.getAttribute("data-popover-id");
        this.pocketActivatorButton.setAttribute("aria-controls", e);
    }
    openPocketZoom(e) {
        this.calculateImageTransform(e),
            console.log("openPocketZoom()"),
            setTimeout(() => {
                (document.getElementById("shopify-section-header").style.cssText = "transform: translateY(-100%); transition: transform 0.3s ease-in-out;"), this.outerSlider.parentNode.classList.add("is-zoomed");
            });
    }
    calculateImageTransform(e) {
        parseInt(e.element.getAttribute("data-popover-index"));
        var o = this.querySelector(".shop-the-look__item.is-selected");
        console.log("selectedCell", o);
        var s = parseInt(window.getComputedStyle(o).paddingLeft),
            i = window.innerWidth / (o.offsetWidth - 2 * parseInt(window.getComputedStyle(o).paddingLeft)),
            t = Math.round(o.offsetHeight * i),
            e = (Math.round(o.clientWidth * i), Math.round(Math.max(t - (window.innerHeight - e.element.offsetHeight), 0))),
            r = t - e,
            l = Math.round(-(o.getBoundingClientRect().top - (t - o.offsetHeight) / 2)),
            n = Math.round(l - e);
        (this._calculateTransformForDotListener = (e) => {
            var e = Math.round((e.detail.dot.offsetTop + e.detail.dot.offsetHeight / 2) * i),
                e = Math.round(e - r / 2),
                t = Math.min(Math.max(l - e, n), l);
            setTimeout(() => {
                (this.outerSlider.style.transitionDuration = "0s"), (this.outerSlider.style.transform = "translate3d(0, " + Math.round(t) + "px, 0) scale(" + i + ")");
                var e = Math.round(-1 * (o.getBoundingClientRect().left + s * i));
                (this.outerSlider.style.transitionDuration = ""), (this.outerSlider.style.transform = "translate3d(" + e + "px, " + Math.round(t) + "px, 0) scale(" + i + ")");
            });
        }),
            o.addEventListener("product:changed", this._calculateTransformForDotListener),
            o.dispatchEvent(new CustomEvent("product:changed", { detail: { dot: o.querySelector(".shop-the-look__dot.is-active") } }));
    }
    closePocketZoom() {
        console.log("closePocketZoom()"),
            this.querySelector(".shop-the-look__item.is-selected").removeEventListener("product:changed", this._calculateTransformForDotListener),
            (document.getElementById("shopify-section-header").style.cssText = ""),
            this.outerSlider.parentNode.classList.remove("is-zoomed"),
            (this.outerSlider.style.transform = null);
    }
}
customElements.define("shop-the-look", ShopTheLookSection);
