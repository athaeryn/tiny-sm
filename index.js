module.exports = (function() {
  "use strict";

  var ErrorNoStatesGiven = "Cannot create TinySM without states";

  function TinySM(states, context) {
    if (!(this instanceof TinySM)) return new TinySM(context);
    this._states  = {};
    this._current = {};
    this._context = context || this;
    try {
      var stateNames = Object.keys(states);
    } catch (e) {
      throw new Error(ErrorNoStatesGiven);
    }
    if (!stateNames || stateNames.length < 1) {
      throw new Error(ErrorNoStatesGiven);
    }
    stateNames.forEach(function(name) {
      var state = states[name];
      this._states[name] = state && state.call ? { enter: state } : state;
    }.bind(this));
  }

  TinySM.prototype = {
    to: function toState(name) {
      var args;
      // Exit the old state.
      if (this._current && this._current.exit && this._current.exit.call) {
        this._current.exit.call(this._context);
      }
      // Set the new state.
      this._current = this._states[name];
      // Enter the new state.
      if (this._current && this._current.enter && this._current.enter.call) {
        args = Array.prototype.slice.call(arguments, 1);
        this._current.enter.apply(this._context, args);
      }
      return this;
    }
  };

  return TinySM;
}());
