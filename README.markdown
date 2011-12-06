# jasmine-jquery

jasmine-jquery provides two extensions for [Jasmine](http://pivotal.github.com/jasmine/) JavaScript Testing Framework:
  
- a set of custom matchers for jQuery framework
- an API for handling HTML fixtures in your specs
  
## Installation

Simply download _jasmine-jquery.js_ from the [downloads page](http://github.com/velesin/jasmine-jquery/downloads) and include it in your Jasmine's test runner file (or add it to _jasmine.yml_ file if you're using Ruby with [jasmine-gem](http://github.com/pivotal/jasmine-gem)). Remember to include also jQuery library as jasmine-jquery relies on it.

For Ruby on Rails I recommend to comply with the standard RSpec and Jasmine frameworks dir structure and keep your tests in `spec/javascripts/` dir. I put jasmine-jquery (and other libraries like jasmine-ajax) into `spec/javascripts/helpers` dir (so they are automatically loaded) and fixtures into `spec/javascripts/fixtures` dir.

## jQuery matchers

jasmine-jquery provides following custom matchers (in alphabetical order):

- `toBe(jQuerySelector)`
  - e.g. `expect($('<div id="some-id"></div>')).toBe('div#some-id')`
- `toBeChecked()`
  - only for tags that have checked attribute
  - e.g. `expect($('<input type="checkbox" checked="checked"/>')).toBeChecked()` 
- `toBeEmpty()`  
- `toBeHidden()`
- `toBeSelected()`
  - only for tags that have selected attribute
  - e.g. `expect($('<option selected="selected"></option>')).toBeSelected()`
- `toBeVisible()`
- `toContain(jQuerySelector)`
  - e.g. `expect($('<div><span class="some-class"></span></div>')).toContain('span.some-class')`
- `toExist()`
- `toHaveAttr(attributeName, attributeValue)`
  - attribute value is optional, if omitted it will check only if attribute exists
- `toHaveBeenTriggeredOn(selector)`
  - if event has been triggered on `selector` (see "Event Spies", below)
- `toHaveBeenPreventedOn(selector)`
  - if event has been prevented on `selector` (see "Event Spies", below)
- `toHaveClass(className)`
  - e.g. `expect($('<div class="some-class"></div>')).toHaveClass("some-class")`  
- `toHaveData(key, value)`
  - value is optional, if omitted it will check only if an entry for that key exists
- `toHaveHtml(string)`
  - e.g. `expect($('<div><span></span></div>')).toHaveHtml('<span></span>')`
- `toHaveId(id)`
  - e.g. `expect($('<div id="some-id"></div>')).toHaveId("some-id")`
- `toHaveText(string)`
  - accepts a String or regular expression
  - e.g. `expect($('<div>some text</div>')).toHaveText('some text')`
- `toHaveValue(value)`
  - only for tags that have value attribute
  - e.g. `expect($('<input type="text" value="some text"/>')).toHaveValue('some text')`
- `toBeDisabled()`
  - e.g. 'expect('<input type='submit' disabled='disabled'/>').toBeDisabled()'
- `toHandle(eventName)`
  - e.g. 'expect($form).toHandle("submit")'
- `toHandleWith(eventName, eventHandler)`
  - e.g. 'expect($form).toHandle("submit", yourSubmitCallback)'
  
The same as with standard Jasmine matchers, all of above custom matchers may be inverted by using `.not` prefix, e.g.:

    expect($('<div>some text</div>')).not.toHaveText(/other/)

## Fixtures

Fixture module of jasmine-jquery allows you to load HTML content to be used by your tests. The overall workflow is like follows:

In _myfixture.html_ file:

    <div id="my-fixture">some complex content here</div>
    
Inside your test:

    loadFixtures('myfixture.html');
    $('#my-fixture').myTestedPlugin();
    expect($('#my-fixture')).to...;
    
By default, fixtures are loaded from `spec/javascripts/fixtures`. You can configure this path: `jasmine.getFixtures().fixturesPath = 'my/new/path';`.

Your fixture is being loaded into `<div id="jasmine-fixtures"></div>` container that is automatically added to the DOM by the Fixture module (If you _REALLY_ must change id of this container, try: `jasmine.getFixtures().containerId = 'my-new-id';` in your test runner). To make tests fully independent, fixtures container is automatically cleaned-up between tests, so you don't have to worry about left-overs from fixtures loaded in preceeding test. Also, fixtures are internally cached by the Fixture module, so you can load the same fixture file in several tests without penalty to your test suite's speed.

To invoke fixture related methods, obtain Fixtures singleton through a factory and invoke a method on it:

    jasmine.getFixtures().load(...);
    
There are also global short cut functions available for the most used methods, so the above example can be rewritten to just:

    loadFixtures(...);
    
Several methods for loading fixtures are provided:

- `load(fixtureUrl[, fixtureUrl, ...])`
  - Loads fixture(s) from one or more files and automatically appends them to the DOM (to the fixtures container).
- `read(fixtureUrl[, fixtureUrl, ...])`
  - Loads fixture(s) from one or more files but instead of appending them to the DOM returns them as a string (useful if you want to process fixture's content directly in your test).
- `set(html)`
  - Doesn't load fixture from file, but instead gets it directly as a parameter (html parameter may be a string or a jQuery element, so both `set('<div></div>')` and `set($('<div/>'))` will work). Automatically appends fixture to the DOM (to the fixtures container). It is useful if your fixture is too simple to keep it in an external file or is constructed procedurally, but you still want Fixture module to automatically handle DOM insertion and clean-up between tests for you.
- `preload(fixtureUrl[, fixtureUrl, ...])`
  - Pre-loads fixture(s) from one or more files and stores them into cache, without returning them or appending them to the DOM. All subsequent calls to `load` or `read` methods will then get fixtures content from cache, without making any AJAX calls (unless cache is manually purged by using `clearCache` method). Pre-loading all fixtures before a test suite is run may be useful when working with libraries like jasmine-ajax that block or otherwise modify the inner workings of JS or jQuery AJAX calls.
  
All of above methods have matching global short cuts:

- `loadFixtures(fixtureUrl[, fixtureUrl, ...])`
- `readFixtures(fixtureUrl[, fixtureUrl, ...])`
- `setFixtures(html)`

Also, a helper method for creating HTML elements for your tests is provided:

- `sandbox([{attributeName: value[, attributeName: value, ...]}])`

It creates an empty DIV element with a default id="sandbox". If a hash of attributes is provided, they will be set for this DIV tag. If a hash of attributes contains id attribute it will override the default value. Custom attributes can also be set. So e.g.:

    sandbox();
    
Will return:

    <div id="sandbox"></div>    
    
And:

    sandbox({
      id: 'my-id',
      class: 'my-class',
      myattr: 'my-attr'
    });
    
Will return:

    <div id="my-id" class="my-class" myattr="my-attr"></div>

Sandbox method is useful if you want to quickly create simple fixtures in your tests without polluting them with HTML strings:

    setFixtures(sandbox({class: 'my-class'}));
    $('#sandbox').myTestedClassRemoverPlugin();
    expect($('#sandbox')).not.toHaveClass('my-class');

This method also has a global short cut available:

- `sandbox([{attributeName: value[, attributeName: value, ...]}])`

Additionally, two clean up methods are provided:

- `clearCache()`
  - purges Fixture module internal cache (you should need it only in very special cases; typically, if you need to use it, it may indicate a smell in your test code)
- `cleanUp()`
  - cleans-up fixtures container (this is done automatically between tests by Fixtures module, so there is no need to ever invoke this manually, unless you're testing a really fancy special case and need to clean-up fixtures in the middle of your test)
  
These two methods do not have global short cut functions.

## Event Spies

Spying on jQuery events can be done with `spyOnEvent` and
`assert(eventName).toHaveBeenTriggeredOn(selector)`. First, spy on the event:

    spyOnEvent($('#some_element'), 'click');
    $('#some_element').click();
    expect('click').toHaveBeenTriggeredOn($('#some_element'));

You can similarly check if triggered event was prevented:

    spyOnEvent($('#some_element'), 'click');
    $('#some_element').click();
    expect('click').toHaveBeenPreventedOn($('#some_element'));

Much thanks to Luiz Fernando Ribeiro for his
[article on Jasmine event spies](http://luizfar.wordpress.com/2011/01/10/testing-events-on-jquery-objects-with-jasmine/).

## Dependencies

jasmine-jquery was tested with Jasmine 1.1 and jQuery 1.6 on IE, FF and Chrome. There is a high chance it will work with older versions and other browsers as well, but I don't typically run test suite against them when adding new features.

## Cross domain policy problems under Chrome

Newer versions of Chrome don't allow file:// URIs read other file:// URIs. In effect, jasmine-jquery cannot properly load fixtures under some versions of Chrome. An override for this is to run Chrome with a switch `--allow-file-access-from-files` (I have not verified if this works for all Chrome versions though). The full discussion on this topic can be found in [this GitHub ticket](https://github.com/velesin/jasmine-jquery/issues/4).

## Mocking with jasmine-ajax

[jasmine-ajax](https://github.com/pivotal/jasmine-ajax) library doesn't let user to manually start / stop XMLHttpRequest mocking, but instead it overrides XMLHttpRequest automatically when loaded. This breaks jasmine-jquery fixtures as fixture loading mechanism uses jQuery.ajax, that stops to function the very moment jasmine-ajax is loaded. A workaround for this may be to invoke jasmine-jquery `preloadFixtures` function (specifying all required fixtures) before jasmine-ajax is loaded. This way subsequent calls to `loadFixtures` or `readFixtures` methods will get fixtures content from cache, without need to use jQuery.ajax and thus will work correctly even after jasmine-ajax is loaded.

## Testing with Javascript Test Driver

When using [jstd](http://code.google.com/p/js-test-driver/) and the jasmine adapter you will need to include jasmine-jquery.js after your jasmine-jstd-adapter files, otherwise jasmine-jquery matchers will not be available when tests are executed. 

