# History

This is an overview and may be incomplete. https://github.com/velesin/jasmine-jquery/commits/master is where to see everything.

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
