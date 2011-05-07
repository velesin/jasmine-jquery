describe("jQuery matchers", function() {
  describe("when jQuery matcher hides original Jasmine matcher", function() {
    describe("and tested item is jQuery object", function() {
      it("should invoke jQuery version of matcher", function() {
        expect($('<div />')).toBe('div');
      });
    });

    describe("and tested item is not jQuery object", function() {
      it("should invoke original version of matcher", function() {
        expect(true).toBe(true);
      });
    });
  });

  describe("when jQuery matcher does not hide any original Jasmine matcher", function() {
    describe("and tested item in not jQuery object", function() {
      it("should pass negated", function() {
        expect({}).not.toHaveClass("some-class");
      });
    });
  });

  describe("when invoked multiple times on the same fixture", function() {
    it("should not reset fixture after first call", function() {
      setFixtures(sandbox());
      expect($('#sandbox')).toExist();
      expect($('#sandbox')).toExist();
    });
  });

  describe("toHaveClass", function() {
    var className = "some-class";

    it("should pass when class found", function() {
      setFixtures(sandbox({'class': className}));
      expect($('#sandbox')).toHaveClass(className);
    });

    it("should pass negated when class not found", function() {
      setFixtures(sandbox());
      expect($('#sandbox')).not.toHaveClass(className);
    });    
  });

  describe("toHaveAttr", function() {
    var attributeName = 'attr1';
    var attributeValue = 'attr1 value';
    var wrongAttributeName = 'wrongName';
    var wrongAttributeValue = 'wrong value';

    beforeEach(function() {
      var attributes = {};
      attributes[attributeName] = attributeValue;
      setFixtures(sandbox(attributes));
    });

    describe("when only attribute name is provided", function() {
      it("should pass if element has matching attribute", function() {
        expect($('#sandbox')).toHaveAttr(attributeName);
      });

      it("should pass negated if element has no matching attribute", function() {
        expect($('#sandbox')).not.toHaveAttr(wrongAttributeName);
      });
    });

    describe("when both attribute name and value are provided", function() {
      it("should pass if element has matching attribute with matching value", function() {
        expect($('#sandbox')).toHaveAttr(attributeName, attributeValue);
      });

      it("should pass negated if element has matching attribute but with wrong value", function() {
        expect($('#sandbox')).not.toHaveAttr(attributeName, wrongAttributeValue);
      });

      it("should pass negated if element has no matching attribute", function() {
        expect($('#sandbox')).not.toHaveAttr(wrongAttributeName, attributeValue);
      });
    });
  });

  describe("toHaveId", function() {
    beforeEach(function() {
      setFixtures(sandbox());
    });

    it("should pass if id attribute matches expectation", function() {
      expect($('#sandbox')).toHaveId('sandbox');
    });

    it("should pass negated if id attribute does not match expectation", function() {
      expect($('#sandbox')).not.toHaveId('wrongId');
    });

    it("should pass negated if id attribute is not present", function() {
      expect($('<div />')).not.toHaveId('sandbox');
    });
  });

  describe("toHaveHtml", function() {
    var html = '<div>some text</div>';
    var wrongHtml = '<span>some text</span>';
    var element;

    beforeEach(function() {
      element = $('<div/>').append(html);
    });

    it("should pass when html matches", function() {
      expect(element).toHaveHtml(html);
    });

    it("should pass negated when html does not match", function() {
      expect(element).not.toHaveHtml(wrongHtml);
    });
  });

  describe("toHaveText", function() {
    var text = 'some text';
    var wrongText = 'some other text';
    var element;

    beforeEach(function() {
      element = $('<div/>').append(text);
    });

    it("should pass when text matches", function() {
      expect(element).toHaveText(text);
    });

    it("should pass negated when text does not match", function() {
      expect(element).not.toHaveText(wrongText);
    });

    it('should pass when text matches a regex', function() {
      expect(element).toHaveText(/some/);
    });

    it('should pass negated when text does not match a regex', function() {
      expect(element).not.toHaveText(/other/);
    });
  });

  describe("toHaveValue", function() {
    var value = 'some value';
    var differentValue = 'different value'

    beforeEach(function() {
      setFixtures($('<input id="sandbox" type="text" />').val(value));
    });

    it("should pass if value matches expectation", function() {
      expect($('#sandbox')).toHaveValue(value);
    });

    it("should pass negated if value does not match expectation", function() {
      expect($('#sandbox')).not.toHaveValue(differentValue);
    });

    it("should pass negated if value attribute is not present", function() {
      expect(sandbox()).not.toHaveValue(value);
    });
  });

  describe("toHaveData", function() {
    var key = 'some key';
    var value = 'some value';
    var wrongKey = 'wrong key';
    var wrongValue = 'wrong value';

    beforeEach(function() {
      setFixtures(sandbox().data(key, value));
    });

    describe("when only key is provided", function() {
      it("should pass if element has matching data key", function() {
        expect($('#sandbox')).toHaveData(key);
      });

      it("should pass negated if element has no matching data key", function() {
        expect($('#sandbox')).not.toHaveData(wrongKey);
      });
    });

    describe("when both key and value are provided", function() {
      it("should pass if element has matching key with matching value", function() {
        expect($('#sandbox')).toHaveData(key, value);
      });

      it("should pass negated if element has matching key but with wrong value", function() {
        expect($('#sandbox')).not.toHaveData(key, wrongValue);
      });

      it("should pass negated if element has no matching key", function() {
        expect($('#sandbox')).not.toHaveData(wrongKey, value);
      });
    });
  });

  describe("toBeVisible", function() {
    it("should pass on visible element", function() {
      setFixtures(sandbox());
      expect($('#sandbox')).toBeVisible();
    });

    it("should pass negated on hidden element", function() {
      setFixtures(sandbox().hide());
      expect($('#sandbox')).not.toBeVisible();
    });
  });

  describe("toBeHidden", function() {
    it("should pass on hidden element", function() {
      setFixtures(sandbox().hide());
      expect($('#sandbox')).toBeHidden();
    });

    it("should pass negated on visible element", function() {
      setFixtures(sandbox());
      expect($('#sandbox')).not.toBeHidden();
    });
  });

  describe("toBeSelected", function() {
    beforeEach(function() {
      setFixtures('\
        <select>\n\
          <option id="not-selected"></option>\n\
          <option id="selected" selected="selected"></option>\n\
        </select>');
    });

    it("should pass on selected element", function() {
      expect($('#selected')).toBeSelected();
    });

    it("should pass negated on not selected element", function() {
      expect($('#not-selected')).not.toBeSelected();
    });
  });

  describe("toBeChecked", function() {
    beforeEach(function() {
      setFixtures('\
        <input type="checkbox" id="checked" checked="checked" />\n\
        <input type="checkbox" id="not-checked" />');
    });

    it("should pass on checked element", function() {
      expect($('#checked')).toBeChecked();
    });

    it("should pass negated on not checked element", function() {
      expect($('#not-checked')).not.toBeChecked();
    });
  });

  describe("toBeEmpty", function() {
    it("should pass on empty element", function() {
      setFixtures(sandbox());
      expect($('#sandbox')).toBeEmpty();
    });

    it("should pass negated on element with a tag inside", function() {
      setFixtures(sandbox().html($('<span />')));
      expect($('#sandbox')).not.toBeEmpty();
    });

    it("should pass negated on element with text inside", function() {
      setFixtures(sandbox().text('some text'));
      expect($('#sandbox')).not.toBeEmpty();
    });
  });

  describe("toExist", function() {
    it("should pass on visible element", function() {
      setFixtures(sandbox());
      expect($('#sandbox')).toExist();
    });

    it("should pass on hidden element", function() {
      setFixtures(sandbox().hide());
      expect($('#sandbox')).toExist();
    });

    it("should pass negated if element is not present in DOM", function() {
      expect($('#non-existent-element')).not.toExist();
    });
  });

  describe("toBe", function() {
    beforeEach(function() {
      setFixtures(sandbox());
    });

    it("should pass if object matches selector", function() {
      expect($('#sandbox')).toBe('#sandbox');
    });

    it("should pass negated if object does not match selector", function() {
      expect($('#sandbox')).not.toBe('#wrong-id');
    });
  });

  describe("toContain", function() {
    beforeEach(function() {
      setFixtures(sandbox().html('<span />'));
    });

    it("should pass if object contains selector", function() {
      expect($('#sandbox')).toContain('span');
    });

    it("should pass negated if object does not contain selector", function() {
      expect($('#sandbox')).not.toContain('div');
    });
  });

  describe("toBeDisabled", function() {
    beforeEach(function() {
      setFixtures('\
        <input type="text" disabled="disabled" id="disabled"/>\n\
        <input type="text" id="enabled"/>');
    });

    it("should pass on disabled element", function() {
      expect($('#disabled')).toBeDisabled();
    });

    it("should pass negated on not selected element", function() {
      expect($('#enabled')).not.toBeDisabled();
    });
  });

  describe('toHaveBeenTriggeredOn', function() {
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'));
      spyOnEvent($('#clickme'), 'click');
    });

    it('should pass if the event was triggered on the object', function() {
      $('#clickme').click();
      expect('click').toHaveBeenTriggeredOn($('#clickme'));
    });

    it('should pass negated if the event was never triggered', function() {
      expect('click').not.toHaveBeenTriggeredOn($('#clickme'));
    });

    it('should pass negated if the event was triggered on another non-descendant object', function() {
      $('#otherlink').click();
      expect('click').not.toHaveBeenTriggeredOn($('#clickme'));
    });
  });
});

