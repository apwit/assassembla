var Features = new function Features () {

  var features = [];

  this.register = function (feature) {

    // Validate feature
    if (!feature.key || !feature.title || !feature.description)
      throw "Invalid feature. Please supply a key, title and description";

    features.push(feature);

  };

  this.onready = function () {

    $.each(features, function (i, feature) {

      if (feature.onready) feature.onready();

    });

  };

  this.onload = function () {

    $.each(features, function (i, feature) {

      if (feature.onload) feature.onload();

    });

  };

}

$(Features.onready);

$(window).load(Features.onload);
