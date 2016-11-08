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
	setTimeout(function() { $('.alert-dismissible').alert('close'); }, 5000);
}

function resize() {
  var heights = window.innerHeight;
  if(heights < 740) $('.scrollable').css('max-height', heights - 246);
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

	// tournament upload smasher quicksearch
	$('#search-smashers').change(function() {
    var tag = $(this).val().toLowerCase();
    if(tag == "") {
      $('.smasher').each(function() {
        if(!$(this).is(":visible"))
          $(this).slideToggle();
      })
    } else {
      $('.smasher').each(function() {
      	if($(this).text().toLowerCase().indexOf(tag) != -1 && !$(this).is(":visible")) $(this).slideToggle();
      	else if($(this).text().toLowerCase().indexOf(tag) == -1 && $(this).is(":visible")) $(this).slideToggle();
      });
    }
	});

	// ajax call to check if a smasher exists in a community
	$('input.tag-upload').change(function() {
    var tag = $(this).val(),
    		community = $('#community_id').val(),
      	dom = $(this),
      	status = false;

    $.ajax ({
      type: 'GET',
      url: "/smashers/doesExist",
      dataType: "json",
      data: { tag: tag, community: community },
      success: function(data) {
        var status = dom.parent().parent().find(".tag-status");
        if(data.exists == true) {
        	status.removeClass('glyphicon-warning-sign alert-warning');
        	status.addClass('glyphicon-ok alert-success');
        } else {
          status.removeClass('glyphicon-ok alert-success');
          status.addClass('glyphicon-warning-sign alert-warning');
        }
      }
    });
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
  			console.log(data);
  			if(data.err) {
  				element = '<div class="alert alert-dismissible alert-error fade in member-alert><strong>Error: </strong>' + data.message + '</div>';
  				$('#member-alert').append(element);
  			} else if(data.success) {
  				element = '<div class="alert alert-dismissible alert-success fade in member-alert">Request has been sent to ' + user + '</div>';
  				$('#member-alert').append(element);
  			}
  			dismissAlerts();
  		}
  	});
  })
});
