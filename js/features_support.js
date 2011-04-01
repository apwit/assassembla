var Features = new function Features () {

  // A key of all the currently registered features
  var features = {};

  // A default templafe for features. Contains all possible attributes
  var template = {
    key: null,
    title: null,
    description: null,
    onready: null,
    onload: null,
    defaultState: 'enabled',
    state: 'enabled'
  };


  // Adds a new feature to the factory
  this.register = function (feature) {

    // Set any defaults
    feature = $.extend({}, template, feature);

    // Validate feature
    if (!feature.key || !feature.title || !feature.description)
      throw "Invalid feature. Please supply a key, title and description";

    // Find out whether or not this feature is enabled
    var stateKey = 'feature:' + feature.key + ':state';
    if (!localStorage[stateKey])
      localStorage[stateKey] = feature.state = feature.defaultState;
    else
      feature.state = localStorage[stateKey];

    // Set some easy access points for the state
    feature.enabled = feature.state == 'enabled' ? true : false;
    feature.disabled = !feature.enabled;

    // Save this feature
    features[feature.key] = feature;

  };


  // Called when the DOM has been loaded and sets up any features
  this.onready = function () {

    // Loop through all registered features
    $.each(features, function (key, feature) {

      // Call the on ready callback if one is defined
      if (feature.enabled && feature.onready) feature.onready();

    });

  };


  // Called when the page resources have been laoded and sets up any features
  this.onload = function () {

    // Loop through all the registered features
    $.each(features, function (i, feature) {

      // Call the onload callback if one is defined
      if (feature.enabled && feature.onload) feature.onload();

    });

  };


  // Iterates over all features and executes the given function
  this.each = function (callback) {

    $.each(features, function (key, feature) {

      callback(feature);

    });

  };

};

// Bind jQuery's onready
$(Features.onready);

// Bind jQuery's onload
$(window).load(Features.onload);
