$(function() {
	
  // Adds the "My Followed Tickets" link to the page header	
	$('#user-box').find('span:first').before('<span>|</span><a href="/followed_tickets"><strong>My Followed Tickets</strong></a>');

  // Removes the sidebar in the Tickets index
  $('#tickets-right-col-wrap > tbody > tr > td:not(:last)').remove();
	
  // Turns square brackets in ticket titles into a "Component" column
  // on the tickets index
  componentsColumn();
	
	// Adds a dropdown menu to the header for jumping straight to a Space
	spacesMenu();

});

function componentsColumn () {
  	
	// Adds a dropdown menu to the header for jumping straight to a Space
  $('#ticket_list > table > thead > tr > th:first-child').after('<th class="component_column">Component</th>');

  var components = [];
  $('.component > li:not(:first)').each(function () {
    components[$(this).attr('class').split('_')[1]] = $(this).children().text();
  });

  $('.ticket_row').each(function () {
    var $this = $(this);
    $this.next().text().replace(/new ContextMenu\((.*)\)/, function (m, cap) {
      var component = components[$.parseJSON(cap).component_id] || '';
      $this.children().first().after('<td class="number custom" style="color: black">' + component + '</td>');

      // Replace expects a string to be returned
      return "";
    });
  });

}

function spacesMenu() {
	
	// Lets build the dropdown
	$('#main-menu').append($('<li><a href="/spaces/my_spaces" id="ass-spaces-menu-link">Spaces</a></li>'));
	$('body').prepend($('<div id="ass-spaces-menu"></div>'));
	
	
	$menuLink = $('#ass-spaces-menu-link');
	$menu = $('#ass-spaces-menu');
	
	// Set CSS for menu
	$menu.css({
		'position': 'absolute',
		'top': $('#header-w').height() + $('#main-menu-w').height(),
		'z-index': 1000,
		'background-color': '#E0ED9C',
		'padding': 6,
		'line-height': '1.8em'
	}).hide();
	
	$menuLink.add($menu).hover(function() {
		// Over
		$menu.css('left', $menuLink.offset().left).show();
		$menuLink.css('background-color', '#E0ED9C');
		clearTimeout(hideTimer);
	}, function() {
		// Out
		hideTimer = setTimeout(function() {
			$menu.hide();
			$menuLink.removeAttr('style');
		}, 400);
	});
	
	
	
	// Get XML list of Spaces
	$.ajax({
		url: "https://www.assembla.com/spaces/my_spaces",
		dataType: 'xml',
		success: function(data) {
			// We now have the list of Spaces in XML format
			$menu.empty(); // Clear "Loading list..." text
			// Lets loop through and find each Space
			$(data).find("space").each(function() {
				// Log the name of this space
				var spaceName = $(this).find('name').text();
				var spaceUrl = "/spaces/" + $(this).find('wiki-name').text();
				$menu.prepend($('<a href="' + spaceUrl + '">' + spaceName + '</a><br/>'));
			});
		}
	});
	
	
}
