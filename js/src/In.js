/*!
 *  In.js v0.1.1
 *
 *  (c) Valentino Miazzo
 *
 *  MIT License
 */

/*jshint browser: true, bitwise: true, nomen: true, plusplus: true, indent: 4, expr: false, -W030 */
/*global define*/

//This code permits to use the library even without require.js.
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

    var _defaultAssert = function (trueish, message) {
        if (!trueish) {
            //TODO: add more details about the failure, like stack trace
            throw new Error(message || "_assert violated ...");
        }
    };
    var _assert = _defaultAssert;

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
    Configures the library.
    It expects a JSON like the following:

        {
            "assert" : assertCallback
        }

    It is called at load time by require.js passing as `config` the config of the module.

    Fields description:

    `assert`:
    Optional. The signature is `void assert(boolean, String)`.
    If you pass `null` then assertions are disabled.
    If you pass `undefined` then the default implementation is used.

    @method configure
    @static
    @param config {Object} the configuration object
    */
    In.configure = function(config) {
        _assert &&  _assert(config !== null, "config is null");
        if (config.assert) {
            _assert && _assert(typeof config.assert === "function", "assert is not a function");
            _assert = config.assert;
        } else if (config.assert === null) {
            _assert = null;
        } else {
            _assert = _defaultAssert;
        }
    };

    /**
    Declares that clazz inherits from zuper.
    @method inheritFrom
    @static
    @param clazz {Class} the class inheriting
    @param zuper {Class} the class inherited
    */
    In.inheritFrom = function (clazz, zuper) {
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

    /**
    @method inherit
    @static
    @deprecated please use inheritFrom
    */
    In.inherit = In.inheritFrom;

    In.configure(module.config());

    return In;
});