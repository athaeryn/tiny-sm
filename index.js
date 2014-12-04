module.exports = (function() {
  "use strict";

  function TinySM(context) {
    if (!(this instanceof TinySM)) return new TinySM(context);
    this._states  = [];
    this._current = {};
    this._context = context || {};
  }

  TinySM.prototype = {
    add: function addState(name, state) {
      this._states[name] = state && state.call ? { enter: state} : state;
      return this;
    },
    to: function toState(name) {
      var args = Array.prototype.slice.call(arguments, 1);
      try {
        this._current.exit.call(this._context);
      } catch (e) {}
      try {
        this._current = this._states[name];
      } catch (e) {}
      try {
        this._current.enter.apply(this._context, args);
      } catch (e) {}
      return this;
    }
  };

  return TinySM;
}());
