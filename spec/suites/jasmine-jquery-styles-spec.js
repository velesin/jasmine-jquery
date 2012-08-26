describe("jasmine.StyleFixtures", function() {
  var ajaxData = 'some ajax data'
  var fixtureUrl = 'some_url'
  var anotherFixtureUrl = 'another_url'
  var fixturesContainer = function() {
    return $('head style').last()
  }

  beforeEach(function() {
    jasmine.getStyleFixtures().clearCache()
    spyOn(jasmine.StyleFixtures.prototype, 'loadFixtureIntoCache_').andCallFake(function(relativeUrl){
      this.fixturesCache_[relativeUrl] = ajaxData
    })
  })

  describe("default initial config values", function() {
    it("should set 'spec/javascripts/fixtures' as the default style fixtures path", function() {
      expect(jasmine.getStyleFixtures().fixturesPath).toEqual('spec/javascripts/fixtures')
    })
  })

  describe("load", function() {
    it("should insert CSS fixture within style tag into HEAD", function() {
      var stylesNumOld = $('head style').length

      jasmine.getStyleFixtures().load(fixtureUrl)
      expect($('head style').length - stylesNumOld).toEqual(1);
      expect(fixturesContainer().html()).toEqual(ajaxData);
    })

    it("should insert duplicated CSS fixture into one style tag when the same url is provided twice in a single call", function() {
      jasmine.getStyleFixtures().load(fixtureUrl, fixtureUrl)
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData)
    })

    it("should insert merged CSS of two fixtures into one style tag when two different urls are provided in a single call", function() {
      jasmine.getStyleFixtures().load(fixtureUrl, anotherFixtureUrl)
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData)
    })

    it("should have shortcut global method loadStyleFixtures", function() {
      loadStyleFixtures(fixtureUrl, anotherFixtureUrl)
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData)
    })
  })

  describe("appendLoad", function() {
    beforeEach(function(){
      ajaxData = 'some ajax data'
    })

    it("should insert CSS fixture within style tag into HEAD", function() {
      var stylesNumOld = $('head style').length

      jasmine.getStyleFixtures().appendLoad(fixtureUrl)
      expect($('head style').length - stylesNumOld).toEqual(1);
      expect(fixturesContainer().html()).toEqual(ajaxData);
    })

    it("should insert duplicated CSS fixture into one style tag when the same url is provided twice in a single call", function() {
      jasmine.getStyleFixtures().appendLoad(fixtureUrl, fixtureUrl)
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData)
    })

    it("should insert merged CSS of two fixtures into one style tag when two different urls are provided in a single call", function() {
      jasmine.getStyleFixtures().appendLoad(fixtureUrl, anotherFixtureUrl)
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData)
    })

    it("should have shortcut global method appendLoadStyleFixtures", function() {
      appendLoadStyleFixtures(fixtureUrl, anotherFixtureUrl)
      expect(fixturesContainer().html()).toEqual(ajaxData + ajaxData)
    })

    describe("with a prexisting fixture",function(){
      beforeEach(function() {
        jasmine.getStyleFixtures().appendLoad(fixtureUrl)
      })

      it("should add new content within new style tag in HEAD", function() {
        jasmine.getStyleFixtures().appendLoad(anotherFixtureUrl)
        expect(fixturesContainer().html()).toEqual(ajaxData)
      })

      it("should not delete prexisting fixtures", function() {
        jasmine.getStyleFixtures().appendLoad(anotherFixtureUrl)
        expect(fixturesContainer().prev().html()).toEqual(ajaxData)
      })
    })
  })

  describe("preload", function() {
    describe("read after preload", function() {
      it("should go from cache", function() {
        jasmine.getStyleFixtures().preload(fixtureUrl, anotherFixtureUrl)
        jasmine.getStyleFixtures().read(fixtureUrl, anotherFixtureUrl)
        expect(jasmine.StyleFixtures.prototype.loadFixtureIntoCache_.callCount).toEqual(2)
      })

      it("should return correct CSSs", function() {
        jasmine.getStyleFixtures().preload(fixtureUrl, anotherFixtureUrl)
        var css = jasmine.getStyleFixtures().read(fixtureUrl, anotherFixtureUrl)
        expect(css).toEqual(ajaxData + ajaxData)
      })
    })

    it("should not preload the same fixture twice", function() {
      jasmine.getStyleFixtures().preload(fixtureUrl, fixtureUrl)
      expect(jasmine.StyleFixtures.prototype.loadFixtureIntoCache_.callCount).toEqual(1)
    })

    it("should have shortcut global method preloadStyleFixtures", function() {
      preloadStyleFixtures(fixtureUrl, anotherFixtureUrl)
      jasmine.getStyleFixtures().read(fixtureUrl, anotherFixtureUrl)
      expect(jasmine.StyleFixtures.prototype.loadFixtureIntoCache_.callCount).toEqual(2)
    })
  })

  describe("set", function() {
    var css = 'body { color: red }'

    it("should insert CSS within style tag into HEAD", function() {
      var stylesNumOld = $('head style').length

      jasmine.getStyleFixtures().set(css)
      expect($('head style').length - stylesNumOld).toEqual(1)
      expect(fixturesContainer().html()).toEqual(css)
    })

    it("should have shortcut global method setStyleFixtures", function() {
      setStyleFixtures(css)
      expect(fixturesContainer().html()).toEqual(css)
    })
  })

  describe("appendSet",function(){
    var css = 'body { color: red }'

    it("should insert CSS within style tag into HEAD", function() {
      var stylesNumOld = $('head style').length

      jasmine.getStyleFixtures().appendSet(css)
      expect($('head style').length - stylesNumOld).toEqual(1)
      expect(fixturesContainer().html()).toEqual(css)
    })

    it("should have shortcut global method appendSetStyleFixtures", function() {
      appendSetStyleFixtures(css)
      expect(fixturesContainer().html()).toEqual(css)
    })

    describe("when fixture container exists", function() {
      beforeEach(function() {
        jasmine.getStyleFixtures().appendSet(css)
      })

      it("should add new content within new style tag in HEAD", function() {
        jasmine.getStyleFixtures().appendSet(css)
        expect(fixturesContainer().html()).toEqual(css)
      })

      it("should not delete prexisting fixtures", function() {
        jasmine.getStyleFixtures().appendSet(css)
        expect(fixturesContainer().prev().html()).toEqual(css)
      })
    })
  })

  describe("cleanUp", function() {
    it("should remove CSS fixtures from DOM", function() {
      var stylesNumOld = $('head style').length

      jasmine.getStyleFixtures().load(fixtureUrl, anotherFixtureUrl)
      jasmine.getStyleFixtures().cleanUp();

      expect($('head style').length).toEqual(stylesNumOld);
    })
  })

  describe("automatic DOM clean-up between tests", function() {
    var stylesNumOld = $('head style').length

    // WARNING: this test must be invoked first (before 'SECOND TEST')!
    it("FIRST TEST: should pollute the DOM", function() {
      jasmine.getStyleFixtures().load(fixtureUrl)
      expect($('head style').length).toEqual(stylesNumOld + 1)
    })

    // WARNING: this test must be invoked second (after 'FIRST TEST')!
    it("SECOND TEST: should see the DOM in a blank state", function() {
      expect($('head style').length).toEqual(stylesNumOld)
    })
  })
})

describe("jasmine.StyleFixtures using real AJAX call", function() {
  var defaultFixturesPath

  beforeEach(function() {
    defaultFixturesPath = jasmine.getStyleFixtures().fixturesPath
    jasmine.getStyleFixtures().fixturesPath = 'spec/fixtures'
  })

  afterEach(function() {
    jasmine.getStyleFixtures().fixturesPath = defaultFixturesPath
  })

  describe("when fixture file exists", function() {
    var fixtureUrl = "real_non_mocked_fixture_style.css"

    it("should load content of fixture file", function() {
      var fixtureContent = jasmine.getStyleFixtures().read(fixtureUrl)
      expect(fixtureContent).toEqual('body { background: red; }')
    })
  })
})

