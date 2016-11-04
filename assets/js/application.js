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
});
