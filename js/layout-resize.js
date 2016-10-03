if (window.location.pathname == '/gallery/abbie')
{
	var layoutMaxWidth = 3888;
	var layoutMaxHeight = 3240;
	var layoutMinWidth = 740;
	var layoutMinHeight = 616;
}
else
{
	var layoutMaxWidth = 3888;
	var layoutMaxHeight = 2226;
	var layoutMinWidth = 740;
	var layoutMinHeight = 528;
}

var layoutWidth;
var layoutSizeOptions = [740, 996, 1252, 1508, 1764, 2020, 2276, 2532, 2788, 3044, 3300, 3556, 3812];
var resizeTimer = undefined;

$(document).ready(function()
{
	if (typeof layoutResizeDisable != 'undefined' && layoutResizeDisable == true)
	{
		$('#content').fadeIn('fast', function () {
			galleryImgLoaded();
		});
	}
	else
	{
		$(window).bind("resize", function() {
			layoutResize();
		});

		layoutResize();
	}
});

function layoutResize()
{
	// console.log('handling resize event');
	
	if ( ($(window).width() / $(window).height()) > 1.8)
	{
		var layoutHeight = $(window).height() - 300;
		if (layoutHeight < layoutMinHeight) layoutHeight = layoutMinHeight;
		layoutWidth = Math.round(layoutMaxWidth / layoutMaxHeight * layoutHeight);
	}
	else
	{
		layoutWidth = $(window).width() - 450;
		if (layoutWidth < layoutMinWidth) layoutWidth = layoutMinWidth;
		var layoutHeight = Math.round(layoutMaxHeight / layoutMaxWidth * layoutWidth);
	}

	if ($('#content').width() != layoutWidth)
	{	
		$('#content').width(layoutWidth);
		$('#header').width(layoutWidth);
		$('#header #clientLogin').css('left', (layoutWidth - 211));
		$('#menu').width(layoutWidth);
		$('#menu img.line').width(layoutWidth);

		if ($('.input').length > 0)
		{
			$('.input').width(layoutWidth - 397);
		}

		if ($('#blogNavigation').length > 0)
		{
			$('#blogNavigation').width(layoutWidth);
		}
	}

	photosResize();

	$('#content').fadeIn('fast');
}

function photosResize()
{
	// console.log('resizing photos');
	
	if ($('#photoContainer').length > 0)
	{
		// calculate the image width for the url
		for (key in layoutSizeOptions)
		{
			if (layoutWidth < (layoutSizeOptions[key]))
			{
				imageWidth = layoutSizeOptions[key];
				break;
			}
		}

		// calculate the max height based on the images dimentions
		var minRatio = 1;
		$('#photo img').each(function(index)
		{
			if ( ($(this).attr('data-src-height') == undefined) || ($(this).attr('data-src-height') == '') ) {
				$(this).attr('data-src-height', 2182);
			}
			if ( ($(this).attr('data-src-width') == undefined) || ($(this).attr('data-src-width') == '') ) {
				$(this).attr('data-src-width', 3812);
			}

			var ratio = ($(this).attr('data-src-height') / $(this).attr('data-src-width'));
				
			// console.log($(this).attr('data-src-height'));
			// console.log(ratio);
				
			if (ratio < minRatio)
			{
				minRatio = ratio;
			}
		});

		var layoutHeight = Math.round(layoutWidth * minRatio);

		$('#photoContainer').width(layoutWidth).height(layoutHeight);
		$('#photo').width(layoutWidth).height(layoutHeight);

		$('#photo img').each(function(index)
		{
			var ratio = $(this).attr('data-src-height') / $(this).attr('data-src-width');
			var image_src = $(this).attr('data-' + imageWidth + '-src');
			var image_height = Math.round(layoutWidth * ratio);

			if (index == 0 && galleryStarted == 0)
			{
				$(this).one('load', function() {
					galleryImgLoaded();
				});
			}

			// console.log('setting width to: ' + layoutWidth);
			// console.log('setting height to: ' + image_height);
			$(this).width(layoutWidth).height(image_height);
			// $(this).css('width', layoutWidth).css('height', image_height);

			if (image_height < layoutHeight)
			{
				$(this).css('padding-top', Math.round( (layoutHeight - image_height) / 2 ));
				$(this).css('padding-bottom', Math.round( (layoutHeight - image_height) / 2 ));
			}

			if ($(this).attr('src') != image_src)
			{
				$(this).attr('src', image_src);
			}
			else if (galleryStarted == 0)
			{
				var image_src = $(this).attr('src');
				$(this).attr('src', "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==");
				$(this).attr('src', image_src);
			}
		});
	}

	// if (resizeTimer != undefined)
	// {
	// 	clearTimeout(resizeTimer);	
	// }
	// resizeTimer = setTimeout("photosResize();", 1000);
}
