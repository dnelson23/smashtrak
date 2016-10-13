$(document).ready(function() {
	
  $('.panel-heading').click(function(event) {
  	var caret = $(this).find("span");
  	if(caret.hasClass('glyphicon-triangle-bottom')) {
  		caret.removeClass('glyphicon-triangle-bottom');
  		caret.addClass('glyphicon-triangle-top');
  	} else if(caret.hasClass('glyphicon-triangle-top')) {
  		caret.removeClass('glyphicon-triangle-top');
  		caret.addClass('glyphicon-triangle-bottom');
  	}
	});

});