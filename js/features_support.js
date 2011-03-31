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
    defaultState: 'enabled'
  };


  // Adds a new feature to the factory
  this.register = function (feature) {

    // Set any defaults
    feature = $.extend({}, template, feature);

    // Validate feature
    if (!feature.key || !feature.title || !feature.description)
      throw "Invalid feature. Please supply a key, title and description";

    // Save this feature
    features[feature.key] = feature;

  };


  // Called when the DOM has been loaded and sets up any features
  this.onready = function () {

    // Loop through all registered features
    $.each(features, function (key, feature) {
      console.log(feature);

      // Call the on ready callback if one is defined
      if (feature.onready) feature.onready();

    });

  };


  // Called when the page resources have been laoded and sets up any features
  this.onload = function () {

    // Loop through all the registered features
    $.each(features, function (i, feature) {

      // Call the onload callback if one is defined
      if (feature.onload) feature.onload();

    });

  };

};

// Bind jQuery's onready
$(Features.onready);

// Bind jQuery's onload
$(window).load(Features.onload);
