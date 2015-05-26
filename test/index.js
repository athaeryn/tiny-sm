var assert = require("assert"),
    TinySM = require("../");


describe("TinySM", function() {
  describe("#constructor", function() {
    it("should accept new states", function() {
      var sm = new TinySM({
        foo: { enter: function() {} }
      });
      assert(sm._states["foo"]);
    });
    it("should accept just a function", function() {
      var sm = new TinySM({
        foo: function() {}
      });
      assert(sm._states["foo"].enter.call);
    });
    it("should throw an error when you pass it nothing", function() {
      var sm;
      try {
        sm = new TinySM;
      } catch(e) {
        assert.equal(e.message, "Cannot create TinySM without states");
      }
    });
  });

  describe("#to", function() {
    it("should transition to a state", function() {
      var sm = new TinySM({
            foo: function() { entered = true; }
          }),
          entered = false;
      sm.to("foo");
      assert(entered);
    });
    it("should transition from a state", function() {
      var sm = new TinySM({
            foo: { exit: function() { exited = true; } }
          }),
          exited = false;
      sm.to("foo").to("bar");
      assert(exited);
    });
    it("should pass arguments on to the state function", function() {
      var sm = new TinySM({
          foo: function() {
            args_received = Array.prototype.slice.call(arguments, 0);
          }
        }),
        arg_received;
      sm.to("foo", 4, 8, 15, 16, 23, 42);
      assert.equal(6, args_received.length);
    });
  });
});
