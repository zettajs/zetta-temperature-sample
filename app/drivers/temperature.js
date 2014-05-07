var querystring = require('querystring');

var Temperature = module.exports = function(prototype) {
  prototype = prototype || {};
  this.type = 'temperature';
  this.value = prototype.value || null;
  this.name = prototype.name;
  this.state = prototype.state || 'off';
  this._tempEmitter = null;
};

Temperature.prototype.init = function(config) {
  config
    .when('off', { allow: ['change', 'on'] })
    .when('on', { allow: ['change', 'off'] })
    .map('change', this.change, [{ name: 'value', type: 'text' }])
    .stream('value', this.stream);
};

Temperature.prototype.change = function(value, cb) {
  this.value = value;

  if (this._tempEmitter) {
    this._tempEmitter.emit('data', this.value);
  }

  if (cb) {
    cb();
  }
};

Temperature.prototype.stream = function(emitter) {
  this._tempEmitter = emitter;
};
