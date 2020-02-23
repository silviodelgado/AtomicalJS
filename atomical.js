/*!
  * AtomicalJS v1.2 - Vanilla Javascript Ultra Lightweight jQuery alternative.
  * Copyright 2019-2020 Silvio Delgado (https://github.com/silviodelgado)
  * Licensed under MIT (https://opensource.org/licenses/MIT)
  * https://github.com/silviodelgado/AtomicalJS
  */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.$ = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';

    var internal = {
        $el: null,
        $elements: [],
        $request: null,
        ready: function (callback) {
            if (typeof callback === 'function') {
                if (document.readyState != 'loading') {
                    callback();
                } else {
                    internal.$el.addEventListener('DOMContentLoaded', callback);
                }
            }
            return internal;
        },
        on: function (eventName, callback) {
            if (typeof internal.$el === 'object' && internal.$el.length == 0) {
                return;
            }
            if (typeof callback === 'function') {
                internal.$el.addEventListener(eventName, callback);
            }
            return internal;
        },
        off: function () {
            if (typeof internal.$el === 'object' && internal.$el.length == 0) {
                return;
            }
            internal.$el.parentNode.replaceChild(internal.$el.cloneNode(true), internal.$el);
            return internal;
        },
        attr: function (attributeName, value) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (value !== undefined) {
                internal.$el.setAttribute(attributeName, value);
                return internal;
            }
            return internal.$el.getAttribute(attributeName);
        },
        removeAttr: function (attributeName) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            internal.$el.removeAttribute(attributeName);
            return internal;
        },
        data: function (attributeName, value) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (value !== undefined) {
                internal.$el.setAttribute('data-' + attributeName, value);
                return internal;
            }
            return internal.$el.getAttribute('data-' + attributeName);
        },
        hasClass: function (className) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return false;
            }
            return internal.$el.className.indexOf(className) >= 0;
        },
        addClass: function (className) {
            internal.$el.classList.add(className);
            return internal;
        },
        removeClass: function (className) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            internal.$el.classList.remove(className);
            return internal;
        },
        toggleClass: function (className) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (internal.$el.length === 'undefined') {
                internal.$el.classList.toggle(className);
                return internal;
            }
            Array.prototype.forEach.call(internal.$el, function (elem, idx) {
                elem.classList.toggle(className);
            });
            return internal;
        },
        css: function (property, style) {
            if (typeof style !== undefined) {
                internal.$el.style[property] = style;
                return internal;
            }
            return internal.$el.style[property];
        },
        ajax: function (params) {
            var values = {
                method: params.method || 'GET',
                url: params.url || '',
                params: params.params || {},
                success: params.success || null,
                error: params.error || null,
                exception: params.exception || null
            };
            internal.$request = new XMLHttpRequest();
            internal.$request.open(values.method, values.url, true);
            internal.$request.onreadystatechange = function (evt) {
                if (internal.$request.readyState === 4) {
                    if (internal.$request.status === 200) {
                        if (typeof values.success === 'function') {
                            values.success(JSON.parse(this.response));
                        }
                    } else {
                        if (typeof values.error === 'function') {
                            values.error(this);
                        }
                    }

                    for (var method in window.onAjaxComplete) {
                        if (typeof window.onAjaxComplete[method] === 'function') {
                            window.onAjaxComplete[method](this);
                        }
                    }
                }
            }
            internal.$request.onerror = function () {
                if (typeof values.exception === 'function') {
                    values.exception();
                    return;
                }
                throw new Error(this.response);
            }

            for (var method in window.onAjaxStart) {
                if (typeof window.onAjaxStart[method] === 'function') {
                    window.onAjaxStart[method](this);
                }
            }
            internal.$request.send(values.params);
            return internal;
        },
        post: function (url, params, callback_success, callback_error, callback_exception) {
            internal.ajax({
                method: 'POST',
                url,
                params: params || {},
                success: callback_success,
                error: callback_error,
                exception: callback_exception
            });
            return internal;
        },
        get: function (url, callback_success, callback_error, callback_exception) {
            internal.ajax({
                method: 'GET',
                url,
                params: {},
                success: callback_success,
                error: callback_error,
                exception: callback_exception
            });
            return internal;
        },
        ajaxStart: function (callback) {
            if (typeof callback === 'function') {
                if (typeof window.onAjaxStart === 'undefined') {
                    window.onAjaxStart = [];
                }
                window.onAjaxStart.push(callback);
            }
            return internal;
        },
        ajaxComplete: function (callback) {
            if (typeof callback === 'function') {
                if (typeof window.onAjaxComplete === 'undefined') {
                    window.onAjaxComplete = [];
                }
                window.onAjaxComplete.push(callback);
            }
            return internal;
        },
        appendTo: function (appendSelector, appendContext) {
            var appendObj = getSelector(appendSelector, appendContext);
            appendObj.appendChild(internal.$el);
            return internal;
        },
        append: function (domStructure) {
            var outer = document.createElement('div');
            outer.innerHTML = domStructure;
            internal.$el.appendChild(outer.children[0]);
            return internal;
        },
        first: function () {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            return internal.$elements.slice(0, 1)[0];
        },
        last: function () {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            return internal.$elements.slice(-1)[0];
        },
        remove: function () {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            internal.$el.parentNode.removeChild(internal.$el);
        },
        parent: function () {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            return internal.$el.parentNode;
        },
        trigger: function (eventName, eventDetail) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (window.CustomEvent && typeof window.CustomEvent === 'function') {
                var event = new CustomEvent(eventName, { detail: eventDetail });
            } else {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, true, true, eventDetail);
            }
            internal.$el.dispatchEvent(event);
        },
        focus: function () {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            internal.$el.focus();
        },
        show: function () {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (internal.$el.length === 'undefined') {
                internal.$el.style.display = '';
                return internal;
            }
            Array.prototype.forEach.call(internal.$el, function (elem, idx) {
                elem.style.display = '';
            });
        },
        hide: function () {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (internal.$el.length === 'undefined') {
                internal.$el.style.display = 'none';
                return internal;
            }
            Array.prototype.forEach.call(internal.$el, function (elem, idx) {
                elem.style.display = 'none';
            });
        },
        fadeIn: function (velocity, display) {
            if (['fast', 'slow'].indexOf(velocity) < 0) {
                display = velocity;
            }
            var grade = .04;
            switch (velocity) {
                case 'fast': grade = .1; break;
                case 'slow': grade = .02; break;
                default: break;
            }
            internal.$el.style.opacity = 0;
            internal.$el.style.display = display || 'inline-block';

            (function fade() {
                var val = parseFloat(internal.$el.style.opacity);
                if ((val += grade) <= 1) {
                    internal.$el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            })();
        },
        fadeOut: function (velocity) {
            var grade = .04;
            switch (velocity) {
                case 'fast': grade = .1; break;
                case 'slow': grade = .02; break;
                default: break;
            }
            internal.$el.style.opacity = 1;
            (function fade() {
                if ((internal.$el.style.opacity -= grade) < 0) {
                    internal.$el.style.display = 'none';
                    internal.$el.style.opacity = 1;
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        },
        html: function (content) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (typeof content !== undefined) {
                internal.$el.innerHTML = content;
                return internal;
            }
            return internal.$el.innerHTML;
        },
        text: function (content) {
            if (typeof internal.$el === 'undefined' || internal.$el.length == 0) {
                return;
            }
            if (typeof content !== undefined) {
                internal.$el.textContent = content;
                return internal;
            }
            return internal.$el.textContent;
        },
        each: function (items, callback) {
            if (!Array.isArray(items) || items.length == 0 || typeof callback !== 'function') {
                return;
            }

            Array.prototype.forEach.call(items, callback);
        },
        extend: function (target, source) {
            if (typeof target !== 'object' || typeof source !== 'object') return false;
            var workObj = Object.assign({}, target);
            for (var prop in source) {
                if (!source.hasOwnProperty(prop)) continue;
                if (prop in workObj) {
                    if (typeof workObj[prop] !== 'object') {
                        workObj[prop] = source[prop];
                    } else {
                        if (typeof source[prop] !== 'object') {
                            workObj[prop] = source[prop];
                        } else {
                            if (workObj[prop].concat && source[prop].concat) {
                                workObj[prop] = targworket[prop].concat(source[prop]);
                            } else {
                                workObj[prop] = internal.extend(workObj[prop], source[prop]);
                            }
                        }
                    }
                } else {
                    workObj[prop] = source[prop];
                }
            }
            return workObj;
        }
    };

    var getSelector = function (selector, context) {
        if (typeof selector === 'function') {
            if (document.readyState === 'complete')
                window.setTimeout(selector);
            else
                document.addEventListener('DOMContentLoaded', selector);
            return internal.$el;
        }

        if (typeof selector === 'string' && selector.indexOf('<') === 0) {
            var outer = document.createElement('div');
            outer.innerHTML = selector;
            return outer.children.length === 1 ? outer.children[0] : outer.children;
        }

        if (typeof selector === 'object') {
            return selector;
        }

        if (selector) {
            var result = (context || document).querySelectorAll(selector);
            return result.length === 1 ? result[0] : result;
        }
    };

    return function (selector, context) {
        internal.$el = getSelector(selector, context);
        internal.$elements = Array.prototype.slice.call(internal.$el || {});
        return internal;
    };
});