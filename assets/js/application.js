function validateNewPassword() {
	var confirmPass = $('#confirm-pass'),
			pass = $('#password');
	if(isNullorWhitespace(confirmPass.val()) || isNullorWhitespace(pass.val())) {
		return;
	} else if(confirmPass.val() != pass.val()) {
		confirmPass.parent().addClass('has-error');
		pass.parent().addClass('has-error');
	} else {
		confirmPass.parent().removeClass('has-error');
		confirmPass.parent().addClass('has-success');
		pass.parent().removeClass('has-error');
		pass.parent().addClass('has-success');
	}
}

function isNullorWhitespace(string) {
	if(string === '' || string == null) {
		return true;
	} else {
		return false;
	}
}

function dismissAlerts() {
	$('.alert-dismissible').alert('close');
}

function resize() {
  var heights = window.innerHeight;
  $('.scrollable').css('max-height', heights - 246);
}

$(document).ready(function() {

  resize();
  window.onresize = function() {
    resize();
  };

	$('#confirm-pass').bind('change', validateNewPassword);
	$('#password').bind('change', validateNewPassword);

	$('#logout-button').click(function() {
		$('#logout-form').submit();
	});

  // home page login and register button click events
	$('#login-button').click(function() {
		$('#login-link').tab('show');
		$('#login-modal').modal('show');
	});

	$('#register-button').click(function() {
		$('#register-link').tab('show');
		$('#login-modal').modal('show');
	});

	// close alerts after 5 seconds
	setTimeout(function() { dismissAlerts(); }, 5000);

	// change accordian caret glyphicons on click
	$('.panel-heading').click(function(event) {
  	var caret = $(this).find("span");
  	if(caret.hasClass('glyphicon-menu-down')) {
  		caret.removeClass('glyphicon-menu-down');
  		caret.addClass('glyphicon-menu-up');
  	} else if(caret.hasClass('glyphicon-menu-up')) {
  		caret.removeClass('glyphicon-menu-up');
  		caret.addClass('glyphicon-menu-down');
  	}
	});
});
