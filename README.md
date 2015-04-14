# In.js : prototypal inheritance done right #

IN comes from INheritance and this is what the lib provides.
More accurately, it provides prototypal inheritance.

It takes care of some details often overlooked:

* it provides a zuper member to access the parent class
* the constructor of an instance of T points to function T, as expected
* the In.inherit(...) method can be called at any point of the class definition.
  Just after the Ctor definition, after the last member definition or at any point
  in between.

### How do I get set up? ###

* How to use the lib (basic)
    * copy js/src/In.js in your project
    * add it to your HTML in a script tag the module will be attached to window.IN
* How to use the lib (advanced)
    * The lib is a [Require.js](http://require.js) compatible module so you can include in this way.
* Summary of set up
    * clone this repository
    * install [Node.js](http://nodejs.org/) (tested with 0.10.31)
    * install [Grunt](http://gruntjs.com/)
        * `npm install -g grunt`
    * in the root of the cloned repo, type (on Windows you may need to disable antivirus if you get strange issues during the install):
        * `npm install`
* How to run tests and generate docs
    * in the root of the cloned repo, type:
        * `grunt`
        * tests reports are in `build/tests`
        * coverage reports are in `build/coverage`
        * docs are generated in build/docs

### Contribution guidelines ###

* Writing tests
    * Jasmine it is used for testing.
    * tests are in js/spec
* For pull requests and tickets use lib's website