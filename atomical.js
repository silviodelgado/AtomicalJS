/*!
  * AtomicalJS v2.1 - Ultra Lightweight Vanilla Javascript jQuery alternative.
  * Copyright 2019-2020 Silvio Delgado (https://github.com/silviodelgado)
  * Licensed under MIT (https://opensource.org/licenses/MIT)
  * https://github.com/silviodelgado/AtomicalJS
  */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else {
        root.$ = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';

    const internal = {
        $el: null,
        $elems: []
    };

    const initSelector = function (selector, context, returnResult) {
        if (typeof selector === 'string' && selector.indexOf('<') === 0) {
            var outer = document.createElement('div');
            outer.innerHTML = selector;
            if (returnResult || false) {
                return outer.children.length === 1
                    ? outer.children[0]
                    : outer.children;
            }
            internal.$elems = Array.from(outer.children);
            internal.$el = outer.children.length === 1
                ? outer.children[0]
                : outer.children;
            return;
        }

        if (typeof selector === 'object') {
            if (returnResult || false) {
                return selector;
            }
            internal.$elems = [selector];
            internal.$el = selector;
            return;
        }

        if (selector) {
            let result = (context || document).querySelectorAll(selector);
            let results = Array.from(result);
            if (returnResult || false) {
                return result.length === 1
                    ? results[0]
                    : result;
            }
            internal.$elems = results;
            internal.$el = result.length === 1
                ? results[0]
                : result;
            return;
        }
    };

    const atomical = (selector, context) => {
        initSelector(selector, context);
        return atomical;
    };

    atomical.count = () => {
        return internal.$elems.length;
    };

    atomical.off = () => {
        if (typeof internal.$el === 'object' && internal.$elems.length == 0) return atomical;
        internal.$elems.forEach((elem, i) => {
            if (elem.parentNode == null) return atomical;
            elem.parentNode.replaceChild(elem.cloneNode(true), elem);
        });
        return atomical;
    };

    atomical.on = (eventName, callback) => {
        if (typeof internal.$el === 'object' && internal.$elems.length == 0) return atomical;
        if (typeof callback !== 'function') return atomical;
        internal.$elems.forEach((elem, i) => {
            elem.addEventListener(eventName, callback);
        });
        return atomical;
    };

    atomical.show = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof internal.$el.length === 'undefined') {
            internal.$el.style.display = '';
            return atomical;
        }
        internal.$elems.forEach((elem, i) => {
            elem.style.display = '';
        })
        return atomical;
    };

    atomical.hide = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof internal.$el.length === 'undefined') {
            internal.$el.style.display = 'none';
            return atomical;
        }
        internal.$elems.forEach((elem, i) => {
            elem.style.display = 'none';
        })
        return atomical;
    };

    atomical.toggle = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        internal.$elems.forEach((elem, i) => {
            elem.style.display = (elem.style.display == 'none') ? null : 'none';
        });
        return atomical;
    };

    atomical.fadeIn = (callback) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        internal.$elems.forEach((elem, i) => {
            elem.style.opacity = 0;
            elem.style.display = null;
            setTimeout(() => {
                elem.style.transition = 'opacity 400ms ease 0s';
                elem.style.opacity = 1;
                if (callback && typeof callback === 'function') {
                    callback.call(this);
                }
            }, 50);
        });
        return atomical;
    };

    atomical.fadeOut = (callback) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        internal.$elems.forEach((elem, i) => {
            elem.style.transition = 'opacity 400ms ease 0s';
            elem.style.opacity = 0;
            setTimeout(() => {
                elem.style.display = 'none';
                if (callback && typeof callback === 'function') {
                    callback.call(this);
                }
            }, 400);
        });
        return atomical;
    };

    atomical.attr = (attributeName, value) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (value !== undefined) {
            internal.$elems.forEach((elem, i) => {
                elem.setAttribute(attributeName, value);
            })
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return;
        return internal.$el.getAttribute(attributeName);
    }

    atomical.removeAttr = (attributeName) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        internal.$elems.forEach((elem, i) => {
            elem.removeAttribute(attributeName);
        });
        return atomical;
    };

    atomical.val = (value) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (value !== undefined) {
            internal.$elems.forEach((elem, i) => {
                elem.value = value;
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return;
        return internal.$el.value;
    };

    atomical.focus = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof internal.$el.length !== 'undefined') return atomical;
        internal.$el.focus();
        return atomical;
    };

    atomical.data = (attributeName, value) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (value !== undefined) {
            internal.$elems.forEach((elem, i) => {
                elem.setAttribute('data-' + attributeName, value);
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return;
        return internal.$el.getAttribute('data-' + attributeName);
    };

    atomical.hasClass = (className) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return false;
        if (typeof internal.$el.length !== 'undefined') return false;
        return internal.$el.className.indexOf(className) >= 0;
    };

    atomical.addClass = (className) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        let classes = className.split(' ').join(',');
        internal.$elems.forEach((elem, i) => {
            elem.classList.add(classes);
        });
        return atomical;
    };

    atomical.removeClass = (className) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        let classes = className.split(' ');
        internal.$elems.forEach((elem, i) => {
            classes.map((className) => {
                elem.classList.remove(className);
            });
        });
        return atomical;
    };

    atomical.toggleClass = (className) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        let classes = className.split(' ');
        internal.$elems.forEach((elem, i) => {
            classes.map((className) => {
                elem.classList.toggle(className);
            });
        });
        return atomical;
    };

    atomical.css = (property, style) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof style !== 'undefined') {
            internal.$elems.forEach((elem, i) => {
                elem.style[property] = style;
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return atomical;
        internal.$el.style[property];
        return atomical;
    };

    atomical.toggleProperty = (property, value) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof value !== 'undefined') {
            internal.$elems.forEach((elem, i) => {
                elem.style[property] = (elem.style[property] == '') ? value : null;
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return atomical;
        internal.$el[property] = value;
        return atomical;
    };

    atomical.appendTo = (appendSelector, appendContext) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        let appendObj = initSelector(appendSelector, appendContext, true);
        if (typeof appendObj !== 'object') return atomical;
        appendObj.appendChild(internal.$el);
        return atomical;
    };

    atomical.append = (domStructure) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        var outer = document.createElement('div');
        outer.innerHTML = domStructure;
        let children = Array.from(outer.children);
        internal.$elems.forEach((elem, i) => {
            children.map((child) => {
                let newElem = document.createElement(child.tagName);
                newElem.innerHTML = child.innerHTML;
                elem.appendChild(newElem);
            });
        });
        return atomical;
    };

    atomical.first = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return null;
        return internal.$elems[0];
    };

    atomical.last = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return null;
        return internal.$elems[internal.$elems.length - 1];
    };

    atomical.parent = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return null;
        if (typeof internal.$el.length !== 'undefined') return null;
        return internal.$el.parentNode;
    };

    atomical.remove = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        internal.$elems.forEach((elem, i) => {
            elem.parentNode.removeChild(elem);
        });
        return atomical;
        if (typeof internal.$el.length !== 'undefined') return atomical;
        if (typeof internal.$el.parentNode === 'undefined') return atomical;
        internal.$el.parentNode.removeChild(internal.$el);
    };

    atomical.html = (content) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof content !== 'undefined') {
            internal.$elems.forEach((elem, i) => {
                elem.innerHTML = content;
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return atomical;
        return internal.$el.innerHTML;
    };

    atomical.text = (content) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof content !== 'undefined') {
            internal.$elems.forEach((elem, i) => {
                elem.textContent = content;
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return atomical;
        return internal.$el.textContent;
    };

    atomical.width = (value) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof value !== 'undefined') {
            internal.$elems.forEach((elem, i) => {
                elem.style.width = value + 'px';
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return;
        return parseFloat(getComputedStyle(internal.$el, null).width.replace("px", ""));
    };

    atomical.height = (value) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return;
        if (typeof value !== 'undefined') {
            internal.$elems.forEach((elem, i) => {
                elem.style.height = value + 'px';
            });
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return;
        return parseFloat(getComputedStyle(internal.$el, null).height.replace("px", ""));
    };

    atomical.trigger = (evt_name) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        internal.$elems.forEach((elem, i) => {
            if (evt_name === 'click') {
                let evt = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                elem.dispatchEvent(evt);
                return;
            }
            let evt = document.createEvent('HTMLEvents');
            evt.initEvent(evt_name, true, false);
            elem.dispatchEvent(evt);
        });
        return atomical;
    };

    atomical.el = () => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length === 0) return null;
        return internal.$elems;
    };

    atomical.extend = function (target, source) {
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
                            workObj[prop] = target[prop].concat(source[prop]);
                        } else {
                            workObj[prop] = atomical.extend(workObj[prop], source[prop]);
                        }
                    }
                }
            } else {
                workObj[prop] = source[prop];
            }
        }
        return workObj;
    }

    const ajax_config = {
        request: {
            data: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'IsAjaxRequest': true
            },
            callback: () => { },
            error: () => { }
        },
        response: {
            data: {},
            callback: () => { },
            error: () => { }
        }
    };

    atomical.interceptors = {
        request: {
            use: (callback, error) => {
                ajax_config.request.callback = callback;
                ajax_config.request.error = error;
            }
        },
        response: {
            use: (callback, error) => {
                ajax_config.response.callback = callback;
                ajax_config.response.error = error;
            }
        }
    };

    const ajax_request = (params) => {
        const options = atomical.extend({
            isJSON: true,
            resultJSON: true,
            replaceHeaders: false,
            timeout: 30000
        }, params);
        if (options.url == null || options.url == '') {
            return;
        }
        let ajax_controller = new AbortController();
        let data = options.data || {};
        if (ajax_config.request.callback && typeof ajax_config.request.callback === 'function') {
            ajax_config.request.data = ajax_config.request.callback.call(this, ajax_config.request.data) || ajax_config.request.data;
        }
        const defaults = {
            method: options.method,
            headers: ajax_config.request.data,
            timeout: options.timeout,
            signal: ajax_controller.signal
        }
        if (options.replaceHeaders) {
            defaults.headers = {};
        }
        if (typeof options.mode !== 'undefined') {
            defaults.mode = options.mode;
        }
        defaults.headers = atomical.extend(defaults.headers, options.headers || {});
        if (options.method === 'POST') {
            defaults.body = options.isJSON ? JSON.stringify(data) : data
        }
        let promise = fetch(options.url, defaults);
        let timeoutId = setTimeout(() => ajax_controller.abort(), defaults.timeout);

        promise
            .then(response => {
                if (!response.ok) {
                    if (ajax_config.response.error && typeof ajax_config.response.error === 'function') {
                        ajax_config.response.error.call(this, response.statusText);
                    }
                    throw Error(response.status + ' ' + response.statusText);
                }
                return options.resultJSON ? response.json() : response.text();
            })
            .then(result => {
                ajax_config.response.data.data = result || {};
                if (ajax_config.response.callback && typeof ajax_config.response.callback === 'function') {
                    ajax_config.response.data = ajax_config.response.callback.call(this, ajax_config.response.data) || ajax_config.response.data;
                }
                if (options.success && typeof options.success === 'function') {
                    options.success.call(this, ajax_config.response.data);
                }
            })
            .catch(err => {
                if (options.error && typeof options.error === 'function') {
                    options.error.call(this, err);
                }
                if (ajax_config.request.error && typeof ajax_config.request.error === 'function') {
                    ajax_config.request.error.call(this, err);
                }
                console.error('err', err);
            })
            .finally(() => {
                clearTimeout(timeoutId);
                if (options.always && typeof options.always === 'function') {
                    options.always.call(this, err);
                }
            });
    };

    atomical.post = (params) => {
        let options = atomical.extend(params, {
            method: 'POST'
        });
        ajax_request(options);
    };

    atomical.get = (url, params) => {
        let options = atomical.extend(params, {
            url,
            method: 'GET',
            resultJSON: false
        });
        ajax_request(options);
    };

    atomical.ready = (callback) => {
        if (typeof internal.$el === 'undefined' || internal.$elems.length == 0) return atomical;
        if (typeof callback !== 'function') return;
        if (document.readyState === 'complete') {
            window.setTimeout(callback);
            return atomical;
        }
        if (typeof internal.$el.length !== 'undefined') return atomical;
        internal.$el.addEventListener('DOMContentLoaded', callback);
        return atomical;
    };

    atomical.each = (items, callback) => {
        if (typeof items === 'function') {
            callback = items;
            items = internal.$elems;
        }
        if (!Array.isArray(items) || items.length == 0 || typeof callback !== 'function') {
            return atomical;
        }
        Array.prototype.forEach.call(items, callback);
        return atomical;
    };

    atomical.fn = atomical.prototype = {};

    return atomical;
});