# In.js : prototypal inheritance done right #

**In** comes from **In**heritance because this is what the lib addresses. More accurately, it simplifies prototypal inheritance. `In.js` is under MIT license.

It is minimal by design and it takes care of some details often overlooked:

* the constructor of an instance of T points to the function T, as expected
```javascript
function Base() {}
Base.prototype.K = 0;

//Bad free style
function Sub() {}
Sub.prototype = new Base();
var s = new Sub();
s.K === 0; //true
s.constructor === Sub; //false

//With In.js
function Sub2() {}
In.inheritFrom(Sub2, Base);
s.K === 0; //true
s.constructor === Sub2; //true
```
* it provides a zuper member with which to access the parent class and constructor
```javascript
function Base(x) { this.x = x; }
function Sub(x) { this.zuper(x); }
In.inheritFrom(Sub, Base);
var s = new Sub(2);
s.x === 2; //true
```
* the `In.inheritFrom(...)` method can be called at any point of the class definition.
  Just after the Ctor definition, after the last member definition or at any point
  in between.
```javascript
function Base() {}
function Sub() {}
Sub.prototype.Y = 1; //not overwritten by the following call
In.inheritFrom(Sub, Base);
Sub.prototype.Z = 2; //not ignored when done after inheriting

var s = new Sub();
s.Y === 1; //true
s.Z === 2; //true
```
* ... and it performs checks like avoiding the repeated inheritance of the same class

### Docs and examples ###

Documentation is available [here](https://rawgit.com/valentinomiazzo/in_js/master/build/docs/classes/In.html).

The [spec file](js/spec/In.js) contains some examples of use.
A [coverage report](https://rawgit.com/valentinomiazzo/in_js/master/build/coverage/PhantomJS%201.9.8%20(Windows%207)/js/src/In.js.html) is available too.

### How do I get set up? ###

* How to use the lib (basic)
    * copy `js/src/In.js` in your project
    * add it to your HTML in a script tag. The module will be attached to `window.In`
* How to use the lib (advanced)
    * The lib is a [Bower](http://bower.io) component. You can add it to your dependencies in this way:
    ```javascript
    "dependencies": {
        "in_js": "git+https://github.com/valentinomiazzo/in_js.git"
    }
    ```
    * The lib is a [Require.js](http://require.js) module. Remember to add it to your `require.config()`
* How to modify the lib, run tests, etc...
    * Prerequisites
        * install [Node.js](http://nodejs.org/)
        * install [Npm](https://www.npmjs.com/)
        * `npm install grunt-cli -g`
    * Install
        * clone this repository
        * in the root of the cloned repo, type (on Windows you may need to disable antivirus if you get strange issues during the install):
        * `npm install`
    * Build
        * `grunt`
        * docs are generated in `build/docs`
    * Test
        * [Jasmine](https://jasmine.github.io/) it is used for testing.
        * tests are in `js/spec`
        * tests reports are in `build/tests`
        * coverage reports are in `build/coverage`

### Contribution guidelines ###

* For pull requests
    * go [here](../../pulls)
* For issues
    * go [here](../../issues)
