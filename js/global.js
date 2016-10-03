$(function()
{
	$('form#clientLogin').submit(function()
	{
		return loginClient();
	});

	$('#clientLoginPassword').live("keypress", function(e) {
		if (e.keyCode == 13) {
			return loginClient();
		}
	});
});

function loginClient()
{
	$.getJSON("https://www.steviebphotography.com/proofing/login_process.php?password=" + $("#clientLoginPassword").val() + "&callback=?",
	// $.getJSON("http://steviebphotography.local/proofing/login_process.php?password=" + $("#clientLoginPassword").val() + "&callback=?",
			function(data){
				if (data.error == true)
				{
					alert('Your password appears to be invalid. Please try again.');
				}
				else
				{
					window.location = data.dst;
				}
			}
		 );

	return false;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function setCookie(c_name, value, exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()+"; path=/");
	document.cookie=c_name + "=" + c_value;
}

var referrer=getCookie("referrer");

if (referrer == null)
{
	setCookie("referrer", document.referrer, 730);
}
