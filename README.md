# In.js : prototypal inheritance done right #

IN comes from INheritance since this is what the lib provides.
More accurately, it provides prototypal inheritance.

It takes care of some details often overlooked:
- it provides a zuper member to access the parent class
- the constructor of an instance of T points to function T, as expected
- the In.inherit(...) method can be called at any point of the class definition.
  Just after the Ctor definition or after the last member definition or at any point
  in between.

### How do I get set up? ###

* Summary of set up
    * clone this repository
    * install [Node.js](http://nodejs.org/) (tested with 0.10.31)
    * install [Bower](http://bower.io/)
        * `npm install -g bower`
    * install [Grunt](http://gruntjs.com/)
        * `npm install -g bower`
* How to build the lib
    * in the root of the cloned repo, type:
        * `npm install`
        * `bower install`
        * `grunt`
* How to run tests
    * in the root of the cloned repo, type:
        * `./node_modules/karma/bin/karma start`
        * tests reports are in `build/tests`
        * coverage reports are in `build/coverage`

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact