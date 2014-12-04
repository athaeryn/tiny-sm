var assert = require("assert"),
    TinySM = require("../");


describe("TinySM", function() {
  describe("#add", function() {
    it("should accept new states", function() {
      var sm = new TinySM;
      sm.add("foo", { enter: function() {} });
      assert(sm._states["foo"]);
    });
    it("should accept just a function", function() {
      var sm = new TinySM;
      sm.add("foo", function() {});
      assert(sm._states["foo"].enter.call);
    });
    it("shouldn't throw an error when adding an undefined state", function() {
      TinySM().add("foo");
    });
  });

  describe("#to", function() {
    it("should transition to a state", function() {
      var sm = new TinySM,
          entered = false;
      sm.add("foo", function() { entered = true; })
        .to("foo");
      assert(entered);
    });
    it("should transition from a state", function() {
      var sm = new TinySM,
          exited = false;
      sm.add("foo", { exit: function() { exited = true; } })
        .to("foo")
        .to("bar");
      assert(exited);
    });
    it("should pass arguments on to the state function", function() {
      var sm = new TinySM,
          arg_received;
      sm.add("foo", function() {
        arg_received = Array.prototype.slice.call(arguments, 0);
      }).to("foo", 4, 8, 15, 16, 23, 42);
      assert(arg_received.length === 6);
    });
  });
});
