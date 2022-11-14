// class Popover extends HTMLElement {
//   constructor() {
//     super();
//   }
//
// }
//
// customElements.define('pop-over', Popover);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Popover = function () {
  function Popover(element, options) {

    this.element = element;
    // this.delegateElement = new domDelegate.Delegate(this.element);
    this.activator = options['activator'] || document.querySelector("[aria-controls=\"".concat(element.getAttribute('id'), "\"]"));
    this.preferredPosition = options['preferredPosition'] || 'bottom';
    this.preferredAlignment = options['preferredAlignment'] || undefined;
    this.threshold = options['threshold'] || 20;
    this.isOpen = false;

    this.onValueChanged = options['onValueChanged'] || function () {};

    this.onOpen = options['onOpen'] || function () {};

    this.onClose = options['onClose'] || function () {};

    this.showOverlay = options['showOverlay'] === undefined ? true : options['showOverlay'];
    this.pageOverlayElement = document.querySelector('.PageOverlay');

    this._attachListeners();
  }

  _createClass(Popover, [{
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('keyup', this._handleKeyboardListener);
      // this.delegateElement.off('click');
      this.activator.removeEventListener('click', this._toggleListener);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }, {
    key: "open",
    value: function open() {
      var _this = this;

      // Note: the additional check on the aria-controls is used here so that a given activator can be used on different
      //       popovers and be modified dynamically in JavaScript
      if (this.isOpen || this.activator.getAttribute('aria-controls') !== this.element.id) {
        return;
      }

      this.element.setAttribute('aria-hidden', 'false');
      this.activator.setAttribute('aria-expanded', 'true');
      // disableBodyScroll(true, '[data-scrollable]');
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('overflow-hidden-all-screens'); // Prevent scrolling when popover is open

      if (window.innerWidth > 989) {
        document.body.addEventListener('click', this._clickOutsideListener);

        this._position();

        this.element.setAttribute('tabindex', '-1');
        this.element.addEventListener('transitionend', function () {
          _this.element.focus();
        }, {
          once: true
        });
      } else {
        this.element.removeAttribute('style');

        if (this.showOverlay) {
          this.pageOverlayElement.classList.add('is-visible');
          this.pageOverlayElement.addEventListener('click', this._closeListener);
        }
      }

      this.onOpen(this); // Call the callback to allow other code to hook their logic

      this.isOpen = true;
    }
  }, {
    key: "close",
    value: function close() {
      console.log(this.isOpen);
      if (!this.isOpen) {
        return;
      }

      this.element.setAttribute('aria-hidden', 'true');
      this.activator.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('overflow-hidden-all-screens'); // Prevent scrolling when popover is open
      document.body.style.overflow = 'auto';
      if (window.innerWidth > 989) {
        document.body.removeEventListener('click', this._clickOutsideListener);
      } else if (this.showOverlay) {
        this.pageOverlayElement.classList.remove('is-visible');
        this.pageOverlayElement.removeEventListener('click', this._closeListener);
      }

      this.element.removeAttribute('tabindex');
      this.activator.focus();
      this.onClose(this); // Call the callback to allow other code to hook their logic

      this.isOpen = false;
    }
  }, {
    key: "_attachListeners",
    value: function _attachListeners() {
      this._handleKeyboardListener = this._handleKeyboard.bind(this);
      this._clickOutsideListener = this._clickOutside.bind(this);
      this._closeListener = this.close.bind(this);
      this._toggleListener = this.toggle.bind(this);
      this.element.addEventListener('keyup', this._handleKeyboardListener);
      this.activator.addEventListener('click', this._toggleListener);
      this.element.querySelectorAll('[data-action="close-popover"]').forEach(item => item.addEventListener('click', this.close.bind(this)));
      this.element.querySelectorAll('[data-action="select-value"]').forEach(item => item.addEventListener('click', this._valueChanged.bind(this)));

      if (this.element.hasAttribute('id')) {
        this.element.querySelectorAll("#".concat(this.element.getAttribute('id'))).forEach(item => item.addEventListener('focusout', this._onFocusOut.bind(this)));
      }
    }
    /**
     * Whenever a value is selected, it can notify a callback so that the calling code can do its own logic in response
     * of the value change
     */

  }, {
    key: "_valueChanged",
    value: function _valueChanged(event) {
      Dom.getSiblings(event.target, '.is-selected').forEach(function (item) {
        return item.classList.remove('is-selected');
      });
      event.target.classList.add('is-selected'); // If there is a callback in option we call it with the value

      this.onValueChanged(event.target.getAttribute('data-value'), event.target, this.activator);
      this.close();
    }
  }, {
    key: "_onFocusOut",
    value: function _onFocusOut(event) {
      if (!this.element.contains(event.relatedTarget) && event.relatedTarget !== this.activator) {
        this.close();
      }
    }
    /**
     * Callback that is called to decide if we should close the popover when a click is captured outside
     */

  }, {
    key: "_clickOutside",
    value: function _clickOutside(event) {
      if (!event.target.closest('.Popover') && !event.target.closest('.Modal') && event.target !== this.activator && !this.activator.contains(event.target)) {
        this.close();
      }
    }
    /**
     * On desktop, we reposition the popover in JavaScript by doing some smart logic to detect the most appropriate area
     */

  }, {
    key: "_position",
    value: function _position() {
      var _this2 = this;

      var topPosition = 0,
          rightPosition = 0,
          position = '',
          alignment = '',
          threshold = this.threshold;

      var windowHeight = window.innerHeight,
          activatorBoundingRect = _this2.activator.getBoundingClientRect(),
          halfHeight = windowHeight / 2;

      if (_this2.preferredPosition === 'bottom') {
        alignment = 'right';

        if (_this2.element.clientHeight <= windowHeight - (activatorBoundingRect.bottom + threshold) || windowHeight - activatorBoundingRect.bottom >= halfHeight) {
          position = 'bottom';
        } else {
          position = 'top';
        }
      } else if (_this2.preferredPosition === 'top') {
        alignment = 'right';

        if (_this2.element.clientHeight <= activatorBoundingRect.top - threshold || activatorBoundingRect.top >= halfHeight) {
          position = 'top';
        } else {
          position = 'bottom';
        }
      } else {
        position = 'left'; // Is there enough space to use the center alignment (which is preferred)?

        var halfElementHeight = _this2.element.clientHeight / 2;

        if (activatorBoundingRect.top >= halfElementHeight && windowHeight - activatorBoundingRect.bottom >= halfElementHeight) {
          alignment = 'center';
        } else if (windowHeight - activatorBoundingRect.bottom >= halfElementHeight) {
          alignment = 'bottom';
        } else {
          alignment = 'top';
        }
      }

      if (_this2.preferredAlignment) {
        alignment = _this2.preferredAlignment;
      }

      if (position === 'top') {
        topPosition = activatorBoundingRect.top - _this2.element.clientHeight - threshold;

        if (alignment === 'center') {
          rightPosition = window.innerWidth - activatorBoundingRect.right - _this2.element.clientWidth / 2 + 3;
        } else {
          rightPosition = window.innerWidth - activatorBoundingRect.right;
        }
      } else if (position === 'bottom') {
        topPosition = activatorBoundingRect.bottom + threshold;

        if (alignment === 'center') {
          rightPosition = window.innerWidth - activatorBoundingRect.right - _this2.element.clientWidth / 2 + 3;
        } else {
          rightPosition = window.innerWidth - activatorBoundingRect.right;
        }
      } else {
        rightPosition = window.innerWidth - activatorBoundingRect.left + threshold;

        if (alignment === 'center') {
          topPosition = activatorBoundingRect.top - _this2.element.clientHeight / 2 + _this2.activator.clientHeight / 2;
        } else if (alignment === 'top') {
          topPosition = activatorBoundingRect.bottom - _this2.element.clientHeight;
        } else {
          topPosition = activatorBoundingRect.top;
        }
      }

      setTimeout(() => {
        ['popover--position-bottom', 'popover--position-top', 'popover--position-center', 'popover--align-top', 'popover--align-center', 'popover--align-bottom'].map(function (item) {
          return _this2.element.classList.remove(item);
        });

        _this2.element.classList.add("popover--position".concat(position.charAt(0).toUpperCase() + position.slice(1)));

        _this2.element.classList.add("popover--align".concat(alignment.charAt(0).toUpperCase() + alignment.slice(1)));

        _this2.element.setAttribute('style', "top: ".concat(parseInt(topPosition), "px; right: ").concat(parseInt(rightPosition), "px;"));
      });
    }
    /**
     * Handle a11y events
     */

  }, {
    key: "_handleKeyboard",
    value: function _handleKeyboard(event) {
      if (this.isOpen && event.keyCode === 27) {
        this.close();
      }
    }
  }]);

  return Popover;
}();
