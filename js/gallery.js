var loadedImgCount = 0;
var galleryStarted = 0;

$(document).ready(function()
{
	// disable right click
	$(this).bind("contextmenu", function(e) {
		e.preventDefault();
	});

	var deviceAgent = navigator.userAgent.toLowerCase();
	var AppleIOSDevice = deviceAgent.match(/(iphone|ipod|ipad)/);

	if (AppleIOSDevice == null)
	{
		$('#photoPrevious, #photoNext').hover(
			function()
			{
				$(this).fadeTo('fast', 0.3);
			},
			function()
			{
				$(this).fadeTo('fast', 0.0);
			}
		);
	}
});

function galleryStart()
{
	if ($('#photo img').length == 1)
	{
		$('#photo img').each(function(index)
		{
			$(this).show();
		});
	}
	else
	{
		// start the gallery
		$('#photo').cycle({
			before: galleryOnBefore,
			after: galleryOnBefore,
			requeueOnImageNotLoaded: false,
			prev:    '#photoPrevious',
			next:    '#photoNext',
			aspect:  true,
			fit:     true,
			center:  true
		});
	}
}

function galleryOnBefore(curr, next, opts){
	photosResize();
};

function galleryImgLoaded()
{
	if (galleryStarted == 0)
	{
		galleryStarted = 1;

		$('#photoLoading').remove();
		galleryStart();
	}
}

$(document).keydown(function(e){
	if (e.keyCode == 37)
	{
		$('#photoPrevious').click();
	}
	else if (e.keyCode == 39)
	{
		$('#photoNext').click();
	}
});
