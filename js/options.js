$(function () {

  var $optionsList = $('#options_list');

  FeatureFactory.each(function (feature) {

		var $feature = $('<li><input type="checkbox" name="' + feature.key + '" id="' + feature.key + '"><p><label for="' + feature.key + '">' + feature.title + '</label><br/>' + feature.description + '</p></li>');

    $feature.appendTo($optionsList);

    var $checkbox = $feature.find(':input');

    if (feature.enabled) $checkbox.attr('checked', 'checked');

    $checkbox.change(function () {

      var stateKey = 'feature:' + feature.key + ':state';

      if ($(this).is(':checked')) {

        localStorage[stateKey] = feature.state = 'enabled';


      } else {

        localStorage[stateKey] = feature.state = 'disabled';

      }

      feature.enabled = !(feature.disabled = feature.state == 'disabled');

    });

  });

});
