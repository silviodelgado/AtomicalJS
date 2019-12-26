/*!
  * AtomicalJS v1.0 - Vanilla Javascript Ultra Light jQuery alternative.
  * Copyright 2019 Silvio Delgado (https://github.com/silviodelgado)
  * Licensed under MIT (https://opensource.org/licenses/MIT)
  * https://github.com/silviodelgado/AtomicalJS
  */
var $ = function (selector, context) {

    var workObj = {
        element: null,
        on: function (eventName, callback) {
            if (typeof callback === 'function') {
                workObj.element.addEventListener(eventName, callback);
            }
            return workObj;
        },
        off: function () {
            workObj.element.parentNode.replaceChild(workObj.element.cloneNode(true), workObj.element);
            return workObj;
        },
        attr: function (name, value) {
            if (value !== undefined) {
                workObj.element.setAttribute(name, value);
                return workObj;
            }
            return workObj.element.getAttribute(name);
        },
        hasClass: function (className) {
            return workObj.element.className.indexOf(className) >= 0;
        },
        addClass: function (className) {
            workObj.element.className += ' ' + className;
            return workObj;
        },
        removeClass: function (className) {
            workObj.element.className = workObj.element.className
                .replace(className, '').replace('  ', ' ').trim();
            return workObj;
        },
        toggleClass: function (className) {
            if (workObj.hasClass(className)) {
                workObj.removeClass(className);
            } else {
                workObj.addClass(className);
            }
            return workObj;
        },
        css: function (property, style) {
            workObj.element.style[property] = style;
            return workObj;
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

            var request = new XMLHttpRequest();
            request.open(values.method, values.url, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        if (typeof values.success === 'function') {
                            values.success(JSON.parse(this.response));
                        }
                    } else {
                        if (typeof values.error === 'function') {
                            values.error(this);
                        }
                    }
                }
            }
            request.onerror = function () {
                if (typeof values.exception === 'function') {
                    values.exception();
                    return;
                }
                throw new Error(this.response);
            }
            request.send(values.params);
        },
        post: function (url, params, callback_success, callback_error, callback_exception) {
            workObj.ajax({
                method: 'POST',
                url,
                params: params || {},
                success: callback_success,
                error: callback_error,
                exception: callback_exception
            });
        },
        get: function (url, callback_success, callback_error, callback_exception) {
            workObj.ajax({
                method: 'GET',
                url,
                params: {},
                success: callback_success,
                error: callback_error,
                exception: callback_exception
            });
        },
        appendTo: function (appendSelector, appendContext) {
            var appendObj = getSelector(appendSelector, appendContext);
            appendObj.element.appendChild(workObj.element);
        },
        append: function (domStructure) {
            var outer = document.createElement('div');
            outer.innerHTML = domStructure;
            workObj.element.appendChild(outer.children[0]);
            return workObj;
        },
        extend: function (target, source) {
            Object.assign(target, source);
            return target;
        }
    };

    var getSelector = function (selector, context) {
        if (typeof selector === 'function') {
            if (document.readyState === 'complete')
                window.setTimeout(selector);
            else
                document.addEventListener('DOMContentLoaded', selector);
            return workObj.element;
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
    }

    workObj.element = getSelector(selector, context);

    return workObj;
}