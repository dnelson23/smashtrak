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
	if($('.alert-dismissible').length > 0) setTimeout(function() { $('.alert-dismissible').alert('close'); }, 5000);
}

function resize() {
  var heights = window.innerHeight;
  //if(heights < 740) $('.scrollable').css('max-height', heights - 246);
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
		$('#login-modal').modal({ show: true, keyboard: true });
	});

	$('#register-button').click(function() {
		$('#register-link').tab('show');
		$('#login-modal').modal({ show: true, keyboard: true });
	});

    $('#delete-account').click(function() {
        $('#delete-account-modal').modal({ show: true, keyboard: true });
    });

	// close dismissible alerts after 5 seconds
	dismissAlerts();

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

	// tournament delete click form submit
	$('.tournament-delete').click(function(el) {
		$(el.currentTarget).parent().submit();
	});

  // add community member ajax call
  $('#add-member-send').click(function() {
  	var user = $('#add-member-user').val(),
  			community = $('#community-id').val(),
  			role = $('#add-member-role').val(),
  			csrf = $('input[name="_csrf"]').val(),
  			error = false,
  			element;

  	if(isNullorWhitespace(user)) { $('#user-field').addClass('has-error'); error = true; }
  	else $('#role-field').removeClass('has-error');

  	if(isNullorWhitespace(role)) { $('#role-field').addClass('has-error'); error = true; }
  	else { $('#role-field').removeClass('has-error'); }

  	if(error) return;

  	$.ajax ({
  		type: 'POST',
  		url: "/c/" + community + "/addMember",
  		dataType: "json",
  		data: { user: user, community: community, _csrf: csrf, role: role },
  		success: function(data) {
  			if(data.err) {
  				element = '<div class="alert alert-dismissible alert-danger fade in member-alert"><strong>Error: </strong>' + data.message + '</div>';
  				$('#member-alert-container').append(element);
  			} else if(data.success) {
  				element = '<div class="alert alert-dismissible alert-success fade in member-alert">Request has been sent to ' + user + '</div>';
  				$('#member-alert-container').append(element);
  			}
  			dismissAlerts();
  		}
  	});
  });
});
