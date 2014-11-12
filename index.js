module.exports = (function() {
  "use strict";

  function TinySM(context) {
    if (!(this instanceof TinySM)) return new TinySM(context);
    this._states  = [];
    this._current = {};
    this._context = context || {};
  }

  TinySM.prototype = {
    add: function addState(name, stateObject) {
      this._states[name] = stateObject;
    },
    to: function toState(name) {
      try { this._current.exit.call(this._context);  } catch (e) {}
      try { this._current = this._states[name];      } catch (e) {}
      try { this._current.enter.call(this._context); } catch (e) {}
    }
  };

  return TinySM;
}());
