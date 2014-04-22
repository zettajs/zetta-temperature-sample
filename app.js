var App = module.exports = function() {
  this.name = 'iphone-app';
};

App.prototype.init = function(zetta) {
  zetta.observe('type="iphone"')
    .subscribe(function(device) {
      zetta.expose(device);
      console.log(device);
    });
};
