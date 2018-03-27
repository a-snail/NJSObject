/*!
 * NJSObject v1.0.0
 * https://github.com/a-snail/NJSObject
 *
 * Jaeo Bok <snail.bok@gmail.com>
 * Released under the MIT license
 */

'use strict';

if (!window.njs) window.njs = {};

if (window.njs && !njs.Object) {

    njs.Object = (function() {

        var _name     = 'njs.Object',
            _verBuild = 0,
            _verMajor = 1,
            _verMinor = 0,
            _version  = _verMajor + '.' + _verMinor + '.' + _verBuild;

        var _bind     = function(method, target) {
                return function() {
                    return method.apply(target, arguments);
                };
            },
            _copy     = function(target) {
                var copy = {}, prop;
                for (prop in target) {
                    if (target.hasOwnProperty(prop)) {
                        copy[prop] = target[prop];
                    }
                }
                return copy;
            },
            _deepCopy = function(target) {
                var copy = null;
                if (target && (target instanceof Array)) {
                    copy = [];
                    for (var i = 0; i < target.length; i++) {
                        copy[i] = _deepCopy(target[i]);
                    }
                    return copy;
                }

                if (
                    target === null ||
                    typeof target !== 'object' ||
                    target instanceof String ||
                    target instanceof Number ||
                    target instanceof Boolean ||
                    target instanceof Date ||
                    target instanceof RegExp ||
                    target.nodeType ||
                    target.window === target
                ) {
                    return target;
                }

                copy = new target.constructor();
                for (var prop in target) {
                    if (target.hasOwnProperty(prop)) {
                        copy[prop] = _deepCopy(target[prop]);
                    }
                }

                return copy;
            },
            _each     = function(target, method, scope) {
                if (!target) return null;
                if (!method || typeof method !== 'function' || !method.call) return target;

                for (var prop in target) {
                    if (target.hasOwnProperty(prop)) {
                        method.call(scope || target, prop, target[prop]);
                    }
                }
                return target;
            },
            _extend   = function() {
                var args = arguments, len = args.length;
                if (len < 1) return null;

                var original = args[0];
                if (len < 2) return original;

                var overwrite, properties = null;

                if (typeof(overwrite = args[len - 1]) === 'boolean') {
                    len--;
                }
                else if (typeof(overwrite = args[len - 2]) === 'boolean') {
                    properties = args[len - 1];
                    len -= 2;
                }

                var target;
                for (var i = 1; i < len; i++) {
                    target = args[i];
                    for (var prop in target) {
                        if (target.hasOwnProperty(prop)) {
                            if (overwrite === true || !original.hasOwnProperty(prop)) {
                                if (!properties || properties.hasOwnProperty(prop)) {
                                    original[prop] = target[prop];
                                }
                            }
                        }
                    }
                }

                return original;
            },
            _isArray  = function(target) {
                if (Object.prototype.toString.call(target) === '[object Array]') return true;
                return target instanceof Array;
            },
            _isObject = function(target) {
                if (Object.prototype.toString.call(target) !== '[object Object]') return false;

                var prop;
                for (prop in target) {}

                return (!prop || Object.prototype.hasOwnProperty.call(target, prop));
            },
            _toString = function() {
                return '[class ' + _name + '] v' + _version;
            };

        return {

            version: _version,

            bind    : _bind,
            copy    : _copy,
            deepCopy: _deepCopy,
            each    : _each,
            extend  : _extend,
            isArray : _isArray,
            isObject: _isObject,
            toString: _toString

        };

    })();

}
