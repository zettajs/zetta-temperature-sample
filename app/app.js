var App = module.exports = function() {
  this.name = 'temp-sample';
};

App.prototype.init = function(zetta) {
  zetta.observe('type="temperature"')
    .subscribe(function(device) {
      zetta.expose(device);
      console.log(device);
    });
};
