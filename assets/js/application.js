function validateNewPassword() {
	var confirmPass = $('#confirm-pass'),
			pass = $('#password');
	if(isNullorWhitespace(confirmPass.val()) || isNullorWhitespace(pass.val()))
	{
		return;
	}
	else if(confirmPass.val() != pass.val())
	{
		confirmPass.parent().addClass('has-error');
		pass.parent().addClass('has-error');
	}
	else
	{
		confirmPass.parent().removeClass('has-error');
		confirmPass.parent().addClass('has-success');
		pass.parent().removeClass('has-error');
		pass.parent().addClass('has-success');
	}
}

function isNullorWhitespace(string) {
	if(string === '' || string == null)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function dismissAlerts() {
	$('.alert').alert('close');
}

$(document).ready(function() {
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

	// close alerts after 10 seconds
	setTimeout(function() { dismissAlerts(); }, 10000);
});
