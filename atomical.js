/*!
  * AtomicalJS v1.2 - Vanilla Javascript Ultra Light jQuery alternative.
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
        $element: null,
        $request: null,
        ready: function (callback) {
            if (typeof callback === 'function') {
                if (document.readyState != 'loading') {
                    callback();
                } else {
                    internal.$element.addEventListener('DOMContentLoaded', callback);
                }
            }
            return internal;
        },
        on: function (eventName, callback) {
            if (typeof callback === 'function') {
                internal.$element.addEventListener(eventName, callback);
            }
            return internal;
        },
        off: function () {
            internal.$element.parentNode.replaceChild(internal.$element.cloneNode(true), internal.$element);
            return internal;
        },
        attr: function (attributeName, value) {
            if (value !== undefined) {
                internal.$element.setAttribute(attributeName, value);
                return internal;
            }
            return internal.$element.getAttribute(attributeName);
        },
        removeAttr: function (attributeName) {
            internal.$element.removeAttribute(attributeName);
            return internal;
        },
        hasClass: function (className) {
            return internal.$element.className.indexOf(className) >= 0;
        },
        addClass: function (className) {
            internal.$element.classList.add(className);
            return internal;
        },
        removeClass: function (className) {
            internal.$element.classList.remove(className);
            return internal;
        },
        toggleClass: function (className) {
            internal.$element.classList.toggle(className);
            return internal;
        },
        css: function (property, style) {
            if (typeof style !== undefined) {
                internal.$element.style[property] = style;
                return internal;
            }
            return internal.$element.style[property];
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
            appendObj.appendChild(internal.$element);
            return internal;
        },
        append: function (domStructure) {
            var outer = document.createElement('div');
            outer.innerHTML = domStructure;
            internal.$element.appendChild(outer.children[0]);
            return internal;
        },
        remove: function () {
            internal.$element.parentNode.removeChild(internal.$element);
        },
        parent: function () {
            return internal.$element.parentNode;
        },
        trigger: function (eventName, eventDetail) {
            if (window.CustomEvent && typeof window.CustomEvent === 'function') {
                var event = new CustomEvent(eventName, { detail: eventDetail });
            } else {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, true, true, eventDetail);
            }
            internal.$element.dispatchEvent(event);
        },
        focus: function () {
            internal.$element.focus();
        },
        show: function () {
            internal.$element.style.display = '';
        },
        hide: function () {
            internal.$element.style.display = 'none';
        },
        html: function (content) {
            if (typeof content !== undefined) {
                internal.$element.innerHTML = content;
                return internal;
            }
            return internal.$element.innerHTML;
        },
        text: function (content) {
            if (typeof content !== undefined) {
                internal.$element.textContent = content;
                return internal;
            }
            return internal.$element.textContent;
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
            return internal.$element;
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
            return result || result.length === 1 ? result[0] : result;
        }
    };

<<<<<<< HEAD
    return function (selector, context) {
        internal.$element = getSelector(selector, context);
        return internal;
    };
});
=======
    return internal;
}
>>>>>>> b3ca452f9e96d8b0a59ac9773e121ea37eb2cda2
