/*jslint browser: true, bitwise: true, nomen: true, todo: true, vars: true, plusplus: true, indent: 4 */
/*global define */

define = define || function (deps, fn) {
    "use strict";
    window.In = window.In || {};
    fn({ config: function() { return window.In.config || {}; } });
};

define([
    "module"
], function(module) {
    "use strict";

    /**
    This is the collection of static methods exposed by In.js
    @class In
    @static
    */
    var In = window.In || {};

    var _config = module.config();

    var _assert;
    if (_config.assert === undefined || _config.assert) {
        _assert = function (trueish, message) {
            if (!trueish) {
                //TODO: add more details about the failure, like stack trace
                throw new Error(message || "_assert violated ...");
            }
        };
    }

    function _simpleCopy(dst, src) {
        var member;
        for (member in src) {
            if (src.hasOwnProperty(member)) {
                if (_assert) {
                    _assert(
                        !dst.hasOwnProperty(member),
                        "Member '" + member + "' already present in the destination"
                    );
                }
                dst[member] = src[member];
            }
        }
    }

    /**
    Declares that clazz inherits from zuper.
    @method inherit
    @static
    @param clazz {Class} the class inheriting
    @param zuper {Class} the class inherited
    */
    In.inherit = function (clazz, zuper) {
        if (_assert) { _assert(clazz, "clazz is null"); }
        if (_assert) { _assert(typeof clazz === 'function', "clazz is not a function"); }
        if (_assert) { _assert(zuper, "zuper is null"); }
        if (_assert) { _assert(typeof zuper === 'function', "zuper is not a function"); }
        //instanceof automatically explores all the proto chain
        if (_assert) { _assert(!(clazz.prototype instanceof zuper), "Inherited the same class multiple times. Target=" + clazz + " Super=" + zuper); }
        var oldPrototype = clazz.prototype;
        clazz.prototype = Object.create(zuper.prototype); //we avoid to use __proto__
        clazz.prototype.constructor = clazz; //fix ctor
        clazz.prototype.zuper = zuper;
        _simpleCopy(clazz.prototype, oldPrototype); //restore members already added before calling this
    };

    return In;
});