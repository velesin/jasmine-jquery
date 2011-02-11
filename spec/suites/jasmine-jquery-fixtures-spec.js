describe("jasmine.Fixtures", function() {
  var ajaxData = 'some ajax data';
  var fixtureUrl = 'some_url';
  var anotherFixtureUrl = 'another_url';
  var fixturesContainer = function() {
    return $('#' + jasmine.getFixtures().containerId);
  };
  var appendFixturesContainerToDom = function() {
    $('body').append('<div id="' + jasmine.getFixtures().containerId + '">old content</div>');
  };

  beforeEach(function() {
    jasmine.getFixtures().clearCache();
    spyOn($, 'ajax').andCallFake(function(options) {
      options.success(ajaxData);
    });
  });

  describe("default initial config values", function() {
    it("should set 'jasmine-fixtures' as the default container id", function() {
      expect(jasmine.getFixtures().containerId).toEqual('jasmine-fixtures');
    });

    it("should set 'spec/javascripts/fixtures' as the default fixtures path", function() {
      expect(jasmine.getFixtures().fixturesPath).toEqual('spec/javascripts/fixtures');
    });
  });

  describe("cache", function() {
    describe("clearCache", function() {
      it("should clear cache and in effect force subsequent AJAX call", function() {
        jasmine.getFixtures().read(fixtureUrl);
        jasmine.getFixtures().clearCache();
        jasmine.getFixtures().read(fixtureUrl);
        expect($.ajax.callCount).toEqual(2);
      });
    });

    it("first-time read should go through AJAX", function() {
      jasmine.getFixtures().read(fixtureUrl);
      expect($.ajax.callCount).toEqual(1);
    });

    it("subsequent read from the same URL should go from cache", function() {
      jasmine.getFixtures().read(fixtureUrl, fixtureUrl);
      expect($.ajax.callCount).toEqual(1);
    });
  });

  describe("read", function() {
    it("should return fixture HTML", function() {
      var html = jasmine.getFixtures().read(fixtureUrl);
      expect(html).toEqual(ajaxData);
    });

    it("should return duplicated HTML of a fixture when its url is provided twice in a single call", function() {
      var html = jasmine.getFixtures().read(fixtureUrl, fixtureUrl);
      expect(html).toEqual(ajaxData + ajaxData);
    });

    it("should return merged HTML of two fixtures when two different urls are provided in a single call", function() {
      var html = jasmine.getFixtures().read(fixtureUrl, anotherFixtureUrl);
      expect(html).toEqual(ajaxData + ajaxData);
    });

    it("should have shortcut global method readFixtures", function() {
      var html = readFixtures(fixtureUrl, anotherFixtureUrl);
      expect(html).toEqual(ajaxData + ajaxData);
    });

    it("should use the configured fixtures path concatenating it to the requested url (without concatenating a slash if it already has an ending one)", function() {
      jasmine.getFixtures().fixturesPath = 'a path ending with slash/'
      readFixtures(fixtureUrl);
      expect($.ajax.mostRecentCall.args[0].url).toEqual('a path ending with slash/'+fixtureUrl);
    });

    it("should use the configured fixtures path concatenating it to the requested url (concatenating a slash if it doesn't have an ending one)", function() {
      jasmine.getFixtures().fixturesPath = 'a path without an ending slash'
      readFixtures(fixtureUrl);
      expect($.ajax.mostRecentCall.args[0].url).toEqual('a path without an ending slash/'+fixtureUrl);
    });
  });

  describe("load", function() {
    it("should insert fixture HTML into container", function() {
      jasmine.getFixtures().load(fixtureUrl);
      expect(fixturesContainer().html()).toEqual(ajaxData);
    });

    it("should insert duplicated fixture HTML into container when the same url is provided twice in a single call", function() {
      jasmine.getFixtures().load(fixtureUrl, fixtureUrl);
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData);
    });

    it("should insert merged HTML of two fixtures into container when two different urls are provided in a single call", function() {
      jasmine.getFixtures().load(fixtureUrl, anotherFixtureUrl);
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData);
    });

    it("should have shortcut global method loadFixtures", function() {
      loadFixtures(fixtureUrl, anotherFixtureUrl);
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData);
    });

    describe("when fixture container does not exist", function() {
      it("should automatically create fixtures container and append it to DOM", function() {
        jasmine.getFixtures().load(fixtureUrl);
        expect(fixturesContainer().size()).toEqual(1);
      });
    });

    describe("when fixture container exists", function() {
      beforeEach(function() {
        appendFixturesContainerToDom();
      });

      it("should replace it with new content", function() {
        jasmine.getFixtures().load(fixtureUrl);
        expect(fixturesContainer().html()).toEqual(ajaxData);
      });
    });
  });

  describe("set", function() {
    var html = '<div>some HTML</div>';

    it("should insert HTML into container", function() {
      jasmine.getFixtures().set(html);
      expect(fixturesContainer().html()).toEqual(jasmine.JQuery.browserTagCaseIndependentHtml(html));
    });

    it("should insert jQuery element into container", function() {
      jasmine.getFixtures().set($(html));
      expect(fixturesContainer().html()).toEqual(jasmine.JQuery.browserTagCaseIndependentHtml(html));
    });

    it("should have shortcut global method setFixtures", function() {
      setFixtures(html);
      expect(fixturesContainer().html()).toEqual(jasmine.JQuery.browserTagCaseIndependentHtml(html));
    });

    describe("when fixture container does not exist", function() {
      it("should automatically create fixtures container and append it to DOM", function() {
        jasmine.getFixtures().set(html);
        expect(fixturesContainer().size()).toEqual(1);
      });
    });

    describe("when fixture container exists", function() {
      beforeEach(function() {
        appendFixturesContainerToDom();
      });

      it("should replace it with new content", function() {
        jasmine.getFixtures().set(html);
        expect(fixturesContainer().html()).toEqual(jasmine.JQuery.browserTagCaseIndependentHtml(html));
      });
    });
  });

  describe("sandbox", function() {
    describe("with no attributes parameter specified", function() {
      it("should create DIV with id #sandbox", function() {
        expect(jasmine.getFixtures().sandbox().html()).toEqual($('<div id="sandbox" />').html());
      });
    });

    describe("with attributes parameter specified", function() {
      it("should create DIV with attributes", function() {
        var attributes = {
          attr1: 'attr1 value',
          attr2: 'attr2 value'
        };
        var element = $(jasmine.getFixtures().sandbox(attributes));

        expect(element.attr('attr1')).toEqual(attributes.attr1);
        expect(element.attr('attr2')).toEqual(attributes.attr2);
      });

      it("should be able to override id by setting it as attribute", function() {
        var idOverride = 'overridden';
        var element = $(jasmine.getFixtures().sandbox({id: idOverride}));
        expect(element.attr('id')).toEqual(idOverride);
      });
    });

    it("should have shortcut global method sandbox", function() {
      var attributes = {
        id: 'overridden'
      };
      var element = $(sandbox(attributes));
      expect(element.attr('id')).toEqual(attributes.id);
    });
  });

  describe("cleanUp", function() {
    it("should remove fixtures container from DOM", function() {
      appendFixturesContainerToDom();
      jasmine.getFixtures().cleanUp();
      expect(fixturesContainer().size()).toEqual(0);
    });
  });

  // WARNING: this block requires its two tests to be invoked in order!
  // (Really ugly solution, but unavoidable in this specific case)
  describe("automatic DOM clean-up between tests", function() {
    // WARNING: this test must be invoked first (before 'SECOND TEST')!
    it("FIRST TEST: should pollute the DOM", function() {
      appendFixturesContainerToDom();
    });

    // WARNING: this test must be invoked second (after 'FIRST TEST')!
    it("SECOND TEST: should see the DOM in a blank state", function() {
      expect(fixturesContainer().size()).toEqual(0);
    });
  });
});
