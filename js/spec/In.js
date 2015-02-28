/*jslint browser: true, bitwise: true, nomen: true, todo: true, vars: true, plusplus: true, indent: 4 */
/*global define, describe, it, expect */

define([
    "In"
], function(In) {
    "use strict";

    function Thing(y) {
        this.y = y;
    }
    Thing.prototype.a = function (x) {
        return x * this.y;
    };

    describe("The In module", function() {

        it("supports standard prototypal inheritance", function() {
            function Car(y) {
                Thing.call(this, y);
            }
            Car.prototype.b = function (x) {
                return this.a(x) * 2;
            };
            Car.prototype.c = function () {
                return "hello";
            };
            In.inherit(Car, Thing);

            var i = new Car(2);
            expect(i.a(3)).toBe(6);
            expect(i.b(3)).toBe(12);
            expect(i.c()).toBe("hello");
            expect(i instanceof Thing).toBe(true);
            expect(i instanceof Car).toBe(true);
        });

        it("provides a reference to the super class", function() {
            function Car(y) {
                this.zuper(y);
            }
            In.inherit(Car, Thing);

            var i = new Car(2);
            expect(i.y).toBe(2);
        });

        it("allows changes to the protoype after the inheritance declaration", function() {
            function Car(y) {
                Thing.call(this, y);
            }
            In.inherit(Car, Thing);
            //We can change the prototype after inheriting
            Car.prototype.b = function (x) {
                return this.a(x) * 2;
            };

            var i = new Car(2);
            expect(i.a(3)).toBe(6);
            expect(i.b(3)).toBe(12);
            expect(i instanceof Thing).toBe(true);
            expect(i instanceof Car).toBe(true);
        });

        it("points to the right constructor after the inheritance declaration", function() {
            function Car() { return; }
            In.inherit(Car, Thing);

            var i = new Car();
            expect(i.constructor).toBe(Car);
        });

        it("detects multiple inherits of the same class", function() {
            function Base() { return; }

            function Special() { return; }
            In.inherit(Special, Base);

            try {
                expect(In.inherit(Special, Base)).toBe('throws an exception');
            } finally { return; }
        });

        it("detects multiple inherits of the same class, even if a level away", function() {
            function Base() { return; }

            function Special() { return; }
            In.inherit(Special, Base);

            function Exclusive() { return; }
            In.inherit(Exclusive, Special);

            try {
                expect(In.inherit(Exclusive, Base)).toBe('throws an exception');
            } finally { return; }
        });

    });

    return null;
});