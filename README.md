# In.js : prototypal inheritance done right #

**In** comes from **In**heritance and this is what the lib provides.
More accurately, it provides prototypal inheritance.

It takes care of some details often overlooked:

* the constructor of an instance of T points to function T, as expected
```javascript
function Base() {}
Base.prototype.X = 0;

//Bad free style
function Sub() {}
Sub.prototype = new Base();
var s = new Sub();
s.X==0; //true
s.constructor==Sub; //false

//With In.js
function Sub() {}
In.inherit(Sub, Base);
s.x==0; //true
s.constructor==Sub; //true
```
* it provides a zuper member to access the parent class
```javascript
function Base(x) { this.x = x; }
function Sub(x) { this.zuper(x); }
In.inherit(Sub, Base);
var s = new Sub(2);
s.x==2; //true
```
* the `In.inherit(...)` method can be called at any point of the class definition.
  Just after the Ctor definition, after the last member definition or at any point
  in between.
```javascript
function Base() {}
function Sub() {}
Sub.prototype.Y = 1; //not overwritten
In.inherit(Sub, Base);
Sub.prototype.Z = 2; //not ignored

var s = new Sub();
s.Y==1; //true
s.Z==2; //true
```
* ... and it performs checks like avoiding the repeated inheritance of the same class

### How do I get set up? ###

* How to use the lib (basic)
    * copy `js/src/In.js` in your project
    * add it to your HTML in a script tag the module will be attached to window.In
* How to use the lib (advanced)
    * The lib is a [Require.js](http://require.js) compatible module so you can include in this way.
* Summary of set up
    * install [Node.js](http://nodejs.org/) (tested with 0.10.31)
    * install [Npm](https://www.npmjs.com/) (tested with 2.8.3)
    * `npm install grunt-cli -g`
    * clone this repository
    * in the root of the cloned repo, type (on Windows you may need to disable antivirus if you get strange issues during the install):
        * `npm install`
* How to run tests and generate docs
    * in the root of the cloned repo, type:
        * `grunt`
        * tests reports are in `build/tests`
        * coverage reports are in `build/coverage`
        * docs are generated in `build/docs`

### Contribution guidelines ###

* Writing tests
    * [Jasmine](https://jasmine.github.io/) it is used for testing.
    * tests are in `js/spec`
* For pull requests
    * go [here](../../pulls)
* For issues
    * go [here](../../issues)
