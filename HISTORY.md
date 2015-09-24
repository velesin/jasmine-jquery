
2.1.1 / 2015-09-24
==================

  * Merge pull request #261 from just-boris/master
  * add CommonJS module definition
  * Merge pull request #257 from SimenB/package.json
  * Add main field to package.json
  * Merge pull request #254 from kkirsche/patch-1
  * Remove moot `version` property from bower.json
  * Fix version (close #253)
  * Merge pull request #234 from sharifmamun/jasmine-jquery-readme-patch-1
  * Merge pull request #240 from garrypolley/patch-2
  * fix jasmine links for repositories and main site
  * Updated the ReadMe file with toContain description

2.1.0 / 2015-02-16
==================

 * Added the call count functions found in jasmine

2.0.7 / 2015-02-07
==================

 * Improved installation advices
 * Adding test for nulls Correcting indentation
 * Fix order of arguments to util.equals in wasTriggeredWith.
 * scriptSrc undefined in loadFixtureIntoCache_
 * Removed chutzpah.json as requested
 * Fixed bug with HTML5 style booleans causing parsererror
 * Added test and improved check
 * Adding support for when actual is null

2.0.6 / 2015-01-20
==================

 * Remove debugger

# History

This is an overview and may be incomplete. https://github.com/velesin/jasmine-jquery/commits/master is where to see everything.

## v2.0.5 (2014-06-07)

  - fix: `toHaveText` to match text as in, as well as trimming (#163)

## v2.0.4 (2014-06-07)

  - fix: references to `jQuery` (#190)

## v2.0.3 (2014-02-49)

  - fix: xhr failure requests (#174)

## v2.0.2 (2014-01-23)

  - fix: don't load inline js in fixtures (for templates, etc.)

## v2.0.1 (Jan 14, 2014)

  - fix: ajax call to work with jquery 2

## v2.0.0 (Jan 13, 2014)

  Due to limitations with jasmine 2, e.g. not being able to add behavior to built-in matchers, there are some api changes in jasmine-jquery. Bug the jasmine maintainers to make modifying matchers possible again.

  - change: `toContain($el)` is now `toContainElement($el)`
  - change: `toBe($el/selector)` is now `toEqual($el/selector)`
  - add: support for jasmine v2


## v1.7.0 (Dec 27, 2013)
  - add: toBeInDOM() matcher

## v1.60 (Dec 22, 2013)
  - fix: usages of jQuery to use $ (#159)
  - change namespace to be jasmine.jQuery

## v1.5.93 (Nov 15, 2013)
  - fix: check strict equality in `hasProperty`

## v1.5.92 (Oct 22, 2013)
  - fix: cloning radio buttons maintains their checked value

## v1.5.91 (Oct 1, 2013)
  - fix: caching json data fixtures (#149)

## v1.5.9 (Sept 25, 2013)
  - fix: throw error when loading a fixture that doesn't exist (#146)
  - fix: toHaveCss() to support expecting a css property be auto (#147)
  - fix: toExist() for objects outside of the DOM (#64, #148)

## v1.5.1 (April 26, 2013)
  - add: matcher for jQuery's event.stopPropagation()
  - add: toHaveLength() matcher
  - add: toContainText() matcher
  - add: toHaveBeenTriggeredOnAndWith()
  - fix: stop toHaveValue from coercing types
  - fix: ajax call that was breaking JSONFixture
  - fix: loadStyleFixtures() in IE8
  - fix: make toBeFocused() compatible with PhantomJS
  - fix: update jQuery to 1.9
  - fix: performance improvements
  - fix: other minor fixes
