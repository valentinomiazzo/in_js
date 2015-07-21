/*!
 *  In.js v0.1.1
 *
 *  (c) Valentino Miazzo
 *
 *  MIT License
 */

/*jshint browser: true, bitwise: true, nomen: true, plusplus: true, indent: 4, expr: false, -W030 */
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

            In.inheritFrom(Car, Thing);
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

            In.inheritFrom(Car, Thing);
            var i = new Car(2);

            expect(i.y).toBe(2);
        });

        it("allows changes to the prototype after the inheritance declaration", function() {
            function Car(y) {
                Thing.call(this, y);
            }
            Car.prototype.b = function (x) {
                return this.a(x) * 2;
            };
            Car.prototype.A = 0;
            In.inheritFrom(Car, Thing);
            //We can change the prototype after inheriting
            Car.prototype.c = function (x) {
                return this.a(x) * 3;
            };
            Car.prototype.B = 1;

            var i = new Car(2);

            expect(i.a(3)).toBe(6);
            expect(i.b(3)).toBe(12);
            expect(i.c(3)).toBe(18);
            expect(i.A).toBe(0);
            expect(i.B).toBe(1);
            expect(i instanceof Thing).toBe(true);
            expect(i instanceof Car).toBe(true);
        });

        it("points to the right constructor after the inheritance declaration", function() {
            function Car() { return; }

            In.inheritFrom(Car, Thing);
            var i = new Car();

            expect(i.constructor).toBe(Car);
        });

        it("detects multiple inherits of the same class", function() {
            function Base() { return; }
            function Special() { return; }

            In.inheritFrom(Special, Base);

            expect(In.inheritFrom.bind(Special, Base)).toThrow();
        });

        it("detects multiple inherits of the same class, even if a level away", function() {
            function Base() { return; }
            function Special() { return; }
            function Exclusive() { return; }

            In.inheritFrom(Special, Base);
            In.inheritFrom(Exclusive, Special);

            expect(In.inheritFrom.bind(Exclusive, Base)).toThrow();
        });

        it("allows to override the default assert callback. In this way you can inject your preferred framework (e.g. Chai)", function() {
            var assertCalled = false;
            var assertCallback = function (trueish, message) {
                if (!trueish) {
                    assertCalled = !trueish;
                    throw new Error(message);
                }
            };
            In.configure({
                "assert": assertCallback
            });

            expect(In.inheritFrom.bind(null, null)).toThrow();
            expect(assertCalled).toBe(true);

            In.configure({
                "assert": undefined
            });
        });

        it("allows you to disable assertions, if you want.", function() {
            In.configure({
                "assert": null
            });
            function Base() { return; }
            function Special() { return; }
            In.inheritFrom(Special, Base);

            try {
                In.inheritFrom(Special, Base); //double inherit doesn't throw
            } finally {
                In.configure({
                    "assert": undefined
                });
            }
        });

    });

    return null;
});