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

$(document).ready(function() {
	$('#confirm-pass').bind('change', validateNewPassword);
	$('#password').bind('change', validateNewPassword);
});
