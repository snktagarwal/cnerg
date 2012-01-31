(function() {

if (!window.Weebly) {
	Weebly = {};
}

Weebly.Slideshow = window.wSlideshow = {
	getSlideshowImages: getSlideshowImages,
	updateSize: updateSize,
	generateHTML: generateHTML,
	init: init,
	updatePhotos: updatePhotos,
	render: render
};


var slideshowOptions = {};
var slideshows = {};


function getSlideshowImages(elementID) {
	return slideshows[elementID].getPhotos();
}


function updateSize() { // TODO: rename to updateSizes
	var changed = false;
	$H(slideshows).each(function(pair) {
		whenThemeCSSLoaded(function() {
			pair[1].updateSize();
		});
		changed = true;
	});
	return changed;
}


function generateHTML(elementID, rawOptions) {
	slideshowOptions[elementID] = processElementOptions(rawOptions);
	return "<div id='" + elementID + "-slideshow' style='height:1000px'></div>"; // to maintain scroll state
}


function init(elementID) {
	var e = $(elementID + '-slideshow');
	var slideshow = new Slideshow(e, slideshowOptions[elementID]);
	slideshows[elementID] = slideshow;
	whenThemeCSSLoaded(function() {
		slideshow.render();
		e.style.height = '';
	});
}


function updatePhotos(elementID, photos) { // TODO: rename to updateImages
	if (slideshows[elementID]) {
		slideshows[elementID].destroy();
		var options = slideshowOptions[elementID];
		options.images = photos;
		slideshows[elementID] = new Slideshow($(elementID + '-slideshow'), options);
		slideshows[elementID].render();
	}
}


function render(rawOptions) {
	var options = processElementOptions(rawOptions);
	var elementID = options.elementID;
	var slideshow = new Slideshow($(elementID + "-slideshow"), options);
	slideshows[elementID] = slideshow;
	whenThemeCSSLoaded(function() {
		slideshow.render();
	});
}


function processElementOptions(rawOptions) {
	var links = rawOptions.nav;
	var linkTiers = 1;
	if (links == 'double_thumbnails') {
		links = 'thumbnails';
		linkTiers = 2;
	}
	else if (links == 'none') {
		links = false;
	}
	return {
		elementID: rawOptions.elementID,
		links: links,
		linkLocation: rawOptions.navLocation,
		linkTiers: linkTiers,
		captionLocation: rawOptions.captionLocation,
		slide: rawOptions.transition == 'slide',
		autoplay: parseInt(rawOptions.autoplay),
		speed: parseInt(rawOptions.speed),
		aspectRatio: rawOptions.aspectRatio || 'auto',
		images: rawOptions.images || []
	};
}



var PRELOAD = 5;
var ASPECT_RATIOS = {
	'16:9' : 16/9,
	'3:2'  : 3/2,
	'4:3'  : 4/3
};
var LINK_MOVE_EDGES = .40;
var LINK_ACCELERATION = 1;
var LINK_MAX_VELOCITY_SQRT = 4;


function Slideshow(element, options) {
	var t = this;
	t.render = render;
	t.destroy = destroy;
	t.getPhotos = function() { return photos };
	t.updateSize = updateSize;
	
	
	element = $(element);
	options = options || {};
	
	
	var photos = options.images || [];
	var content;
	var slideContainer;
	var slides = [];
	var slideImgs = [];
	var slideImgWidths = [];
	var slideImgHeights = [];
	var slideImgWraps = [];
	var linkContainer;
	var linkContainerInner;
	var links;
	
	var slideIndex;
	var prevButton;
	var nextButton;
	var horizontalLinks; // bool
	var overlayTopLeft, overlayTopRight, overlayLeft, overlayRight;
	var playing = false;
	var playPauseID = 0;
	var playButton;
	var pauseButton;
	var playTimeoutID;
	var controlsVisible = true;
	var controlsFadeEffect;
	var mouseActionID = 0;
	var contentWidth;
	var contentHeight;
	var thumbnailWidth;
	var thumbnailHeight;
	
	var linkContainerX;
	var linkContainerY;
	var linkContainerWidth;
	var linkContainerHeight;
	var linkContainerInnerWidth;
	var linkContainerInnerHeight;
	var linkX = 0;
	var linkY = 0;
	var linkMin;
	var linkMax;
	var isMouseOverLinks = false;
	var linkHoverID = 0;
	var linkTargetVelocity = 0;
	var linkVelocity = 0;
	var linkIntervalID;
	



	/* rendering
	-------------------------------------------------------------------------------*/
	

	function render() {
		element
			.addClassName('wslide')
			.update(
				"<table class='wslide-main'><tbody></tbody></table>"
			);
		var table = $(element.getElementsByTagName('table')[0]); // with select(), dom errors were being thrown!?
		var tbody = $(table.firstChild);
		var content = renderContent()
			.observe('mousemove', mouseAction)
			.observe('mousedown', mouseAction);
		if (!options.links || !photos.length) {
			var tr = new Element('tr');
			var td = new Element('td');
			td.insert(content);
			tr.insert(td);
			tbody.insert(tr);
		}else{
			links = [];
			var linkLocation = options.linkLocation;
			horizontalLinks = linkLocation == 'top' || linkLocation == 'bottom';
			var linkContainer = renderLinks();
			var linkCell = new Element('td', { 'class': 'wslide-link-cell' })
				.insert(linkContainer);
			var contentCell = new Element('td')
				.insert(content);
			if (horizontalLinks) {
				linkCell.style.width = 'auto'; // for IE
				var tr1 = new Element('tr');
				var tr2 = new Element('tr');
				if (linkLocation == 'top') {
					tr1.insert(linkCell);
					tr2.insert(contentCell);
				}else{
					tr1.insert(contentCell);
					tr2.insert(linkCell);
				}
				tbody.insert(tr1);
				tbody.insert(tr2);
			}else{
				var tr = new Element('tr');
				if (linkLocation == 'left') {
					tr.insert(linkCell);
					tr.insert(contentCell);
				}else{
					tr.insert(contentCell);
					tr.insert(linkCell);
				}
				tbody.insert(tr);
			}
		}
		initSize();
		if (photos.length) {
			go(0);
		}
		hideControls();
		if (options.autoplay) {
			play();
		}
		Element.observe(window, 'resize', windowResize);
	}
	
	
	function destroy() {
		element.update();
		_destroy();
	}
	
	
	function _destroy() {
		playing = false;
		if (playTimeoutID) {
			clearTimeout(playTimeoutID);
			playTimeoutID = null;
		}
		Element.stopObserving(window, 'resize', windowResize);
	}
	
	
	function renderContent() {
		content = new Element('div', { 'class': 'wslide-content' })
			.update(
				"&nbsp;" + // for IE
				"<div class='wslide-content-inner'>" +
					"<div class='wslide-slides'></div>" +
				"</div>" +
				"<div class='wslide-overlay-top-left'></div>" +
				"<div class='wslide-overlay-top-right'></div>" +
				"<div class='wslide-overlay-left'></div>" +
				"<div class='wslide-overlay-right'></div>"
			);
		slideContainer = content.select('div.wslide-slides')[0];
		overlayTopLeft = content.select('div.wslide-overlay-top-left')[0];
		overlayTopRight = content.select('div.wslide-overlay-top-right')[0];
		overlayLeft = content.select('div.wslide-overlay-left')[0];
		overlayRight = content.select('div.wslide-overlay-right')[0];
		if (photos.length > 1) {
			overlayTopLeft
				.insert(renderPlay())
				.insert(renderPause());
			if (!options.links) {
				if (options.slide) {
					overlayLeft.insert(renderPrev());
					overlayRight.insert(renderNext());
				}else{
					overlayTopRight
						.insert(renderPrev())
						.insert('&nbsp;')
						.insert(renderNext());
				}
			}
		}
		return content;
	}
	
	
	function renderPlay() {
		playButton = new Element('span', { 'class': 'wslide-play wslide-button' })
			.update(
				"<span class='wslide-button-inner'>Play <span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>"
			)
			.observe('click', play);
		return playButton;
	}
	
	
	function renderPause() {
		pauseButton = new Element('span', { 'class': 'wslide-pause wslide-button' })
			.update(
				"<span class='wslide-button-inner'>Pause <span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>"
			)
			.observe('click', pause);
		return pauseButton;
	}
	
	
	function renderPrev() {
		prevButton = new Element('span', { 'class': 'wslide-prev wslide-button' })
			.update(
				"<span class='wslide-button-inner'><span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>"
			)
			.observe('click', function() {
				pause();
				prev();
			});
		return prevButton;
	}
	
	
	function renderNext() {
		nextButton = new Element('span', { 'class': 'wslide-next wslide-button' })
			.update(
				"<span class='wslide-button-inner'><span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>"
			)
			.observe('click', function() {
				pause();
				next();
			});
		return nextButton;
	}
	
	
	function renderLinks() {
		var linkLocation = options.linkLocation;
		var linkTiers = options.linkTiers;
		var classes = 'wslide-links wslide-links-' + options.linkLocation;
		if (options.links) {
			if (options.links == 'thumbnails') {
				classes += ' wslide-thumbnail-links';
			}else{
				classes += ' wslide-number-links';
			}
		}
		linkContainer = new Element('div', { 'class': classes })
			.update(
				"<div class='wslide-links-inner'>" +
					"<table><tbody></tbody></table>" +
				"</div>"
			)
			.observe('mouseover', linkContainerMouseover)
			.observe('mousemove', linkContainerMousemove)
			.observe('mouseout', linkContainerMouseout);
		linkContainerInner = linkContainer.down();
		var tbody = linkContainer.select('tbody')[0];
		if (horizontalLinks) {
			var trs = [];
			for (var i=0; i<linkTiers; i++) {
				trs[i] = new Element('tr');
				tbody.insert(trs[i]);
			}
			for (var i=0; i<photos.length; i++) {
				trs[i % linkTiers].insert(renderLink(photos[i], i));
			}
		}else{
			var photoCnt = photos.length;
			for (var r=0, i=0; i<photoCnt; r++) {
				var tr = new Element('tr');
				for (var c=0; c<linkTiers && i<photoCnt; c++, i++) {
					tr.insert(renderLink(photos[i], i));
				}
				tbody.insert(tr);
			}
		}
		return linkContainer;
	}
	
	
	function renderLink(photo, i) {
		var td = new Element('td');
		if (options.links == 'numbers') {
			td.insert(
				"<a class='wslide-link wslide-link-number'>" +
					"<div class='wslide-link-inner1'>" +
						"<div class='wslide-link-inner2'>" +
							(i + 1) +
						"</div>" +
					"</div>" +
				"</a>"
			);
		}else{
			td.insert(
				"<a class='wslide-link wslide-link-thumbnail'>" +
					"<div class='wslide-link-inner1'>" +
						"<div class='wslide-link-inner2'>" +
							"<img style='visibility:hidden' />" +
						"</div>" +
					"</div>" +
				"</a>"
			);
			var img = td.select('img')[0];
			setTimeout(function() {
				loadImage(img, thumbnailURL(photo), function() {
					sizeThumbnail(img, photo);
					img.style.visibility = '';
				});
			},0); // let the first slide load first
		}
		var a = td.select('a')[0].observe('click', function() {
			pause();
			go(i);
		});
		links[i] = a;
		return td;
	}
	
	
	function addSlide(photo, i) {
		var linkNewWindow = false;
		var link = photo.link;
		if (link) {
			var origLink = link;
			link = link.replace('weeblylink_new_window', '');
			if (link != origLink) {
				linkNewWindow = true;
			}
		}
		var slide = new Element('div', { 'class': 'wslide-slide wslide-slide-loading' })
			.update(
				"<div class='wslide-slide-inner1'>" +
					"<div class='wslide-slide-inner2' style='visibility:hidden'>" +
						(link ? "<a>" : '') +
						"<img />" +
						(photo.caption ?
							"<div class='wslide-caption " +
								(options.captionLocation=='top' ? 'wslide-caption-top' : 'wslide-caption-bottom') + "'>" +
								"<div class='wslide-caption-text'>" + photo.caption + "</div>" + // already escaped
								"<div class='wslide-caption-bg'></div>" +
							"</div>"
							: '') +
						(link ? "</a>" : '') +
					"</div>" +
				"</div>"
			);
		slide.select('a').each(function(a) {
			if (window.currentSite) {
				// in editor
				a.href = '#';
				a.observe('click', function(ev) { ev.stop() });
				a.title = /*tl(*/"Links active once published"/*)tl*/;
			}else{
				if (link) {
					a.href = link;
					if (linkNewWindow) {
						a.target = '_blank';
					}
				}
			}
		});
		slide.style.left = '-101%'; // "hide"
		slideContainer.insert(slide);
		var img = slide.select('img')[0];
		var imgWrap = img.up('.wslide-slide-inner2');
		slides[i] = slide;
		slideImgs[i] = img;
		slideImgWraps[i] = imgWrap;
		loadImage(img, largeURL(photo), function() {
			slide.removeClassName('wslide-slide-loading');
			slideImgWidths[i] = img.width;
			slideImgHeights[i] = img.height;
			sizeImage(i);
			if (i == slideIndex) { // is current slide
				sizeOverlays(i);
				if (playing) {
					timedNext();
				}
			}
			imgWrap.style.visibility = '';
		});
		return slide;
	}
	
	



	/* sizing
	------------------------------------------------------------------------------------*/
	

	function initSize() {
		calcThumbnailDims();
		updateSize();
	}
	
	
	function updateSize() {
	
		if (isDead() || !content) {
			return;
		}
	
		if (linkContainer && !horizontalLinks) {
			// need to set width of vertical link container
			linkContainerWidth = linkContainerInner.getWidth();
			linkContainer.style.width = linkContainerWidth + 'px';
		}
		
		contentWidth = content.getWidth();
		contentHeight = Math.round(contentWidth / getAspectRatio());
		content.style.height = contentHeight + 'px';
		
		if (linkContainer) {
			linkContainerInnerWidth = linkContainerInner.getWidth();
			linkContainerInnerHeight = linkContainerInner.getHeight();
			if (horizontalLinks) {
				linkContainerWidth = contentWidth;
				linkContainerHeight = linkContainerInner.getHeight();
				linkContainer.style.height = linkContainerHeight + 'px';
				linkMin = linkContainerWidth - linkContainerInnerWidth;
				linkMax = 0;
				/* center
				if (linkContainerInnerWidth < linkContainerWidth) {
					linkContainerInner.style.left = linkContainerWidth/2 - linkContainerInnerWidth/2 + 'px';
				}
				*/
			}else{
				// (linkContainerWidth calculated above)
				linkContainerHeight = contentHeight;
				linkContainer.style.height = linkContainerHeight + 'px';
				linkMin = linkContainerHeight - linkContainerInnerHeight;
				linkMax = 0;
			}
		}
		
		if (slideImgWidths[slideIndex] && slideImgHeights[slideIndex]) { // is current image loaded?
			sizeImage(slideIndex);
			sizeOverlays(slideIndex);
		}
		
	}
	
	
	function getAspectRatio() {
		if (options.aspectRatio == 'auto') {
			if (!photos.length) {
				return 16/9;
			}
			var scores = {};
			for (var i=0; i<photos.length; i++) {
				var photoRatio = photos[i].width / photos[i].height;
				var bestKey;
				var bestDiff = false;
				$H(ASPECT_RATIOS).each(function(pair) {
					var aspectRatio = pair[1];
					var diff = Math.abs(aspectRatio - photoRatio);
					if (bestDiff === false || diff < bestDiff) {
						bestDiff = diff;
						bestKey = pair[0];
					}
				});
				scores[bestKey] = (scores[bestKey] || 0) + 1;
			}
			var winnerKey;
			var winnerScore = false;
			$H(scores).each(function(pair) {
				if (winnerScore === false || pair[1] > winnerScore) {
					winnerScore = pair[1];
					winnerKey = pair[0];
				}
			});
			return ASPECT_RATIOS[winnerKey];
		}else{
			return ASPECT_RATIOS[options.aspectRatio];
		}
	}
	
	
	function calcThumbnailDims() {
		thumbnailWidth = 0;
		thumbnailHeight = 0;
		if (linkContainer) {
			var thumbnails = linkContainer.select('a.wslide-link-thumbnail');
			if (thumbnails.length) {
				var inner = thumbnails[0].down();
				thumbnailWidth = inner.getWidth();
				thumbnailHeight = inner.getHeight();
			}
		}
	}
	
	
	function sizeThumbnail(img, photo) {
		var naturalWidth = parseInt(photo.width);
		var naturalHeight = parseInt(photo.height);
		var sx = thumbnailWidth / naturalWidth;
		var sy = thumbnailHeight / naturalHeight;
		var s = Math.max(sx, sy);
		var w = Math.ceil(naturalWidth * s);
		var h = Math.ceil(naturalHeight * s);
		img.width = w;
		img.height = h;
		img.style.top = -Math.round(h/2) + 'px';
		img.style.left = -Math.round(w/2) + 'px';
	}
	
	 
	function sizeImage(i) {
		var imgWrap = slideImgWraps[i];
		var img = slideImgs[i];
		var scale = Math.min(
			contentWidth / slideImgWidths[i],
			contentHeight / slideImgHeights[i],
			1
		);
		var w = Math.ceil(slideImgWidths[i] * scale);
		var h = Math.ceil(slideImgHeights[i] * scale);
		if (w+1 <= slideImgWidths[i]) {
			w++;
			h++;
		}
		img.style.width = w + 'px';
		imgWrap.style.width = w + 'px';
		imgWrap.style.left = -Math.round(w / 2) + 'px';
		imgWrap.style.top = -Math.round(h / 2) + 'px';
	}
	

	var indentLeft = 0;
	var indentRight = 0;
	var indentTop = 0;
	var indentBottom = 0;
	
	
	function sizeOverlays(i) {
		var slide = slides[i];
		var slideOffset = safeCumulativeOffset(slide);
		var slideWidth = slide.offsetWidth;
		var slideHeight = slide.offsetHeight;
		var img = slideImgs[i];
		var imgOffset = safeCumulativeOffset(img);
		var imgWidth = img.offsetWidth || 0;
		var imgHeight = img.offsetHeight || 0;
		indentLeft = Math.max(0, imgOffset.left - slideOffset.left);
		indentRight = Math.max(0, (slideOffset.left + slideWidth) - (imgOffset.left + imgWidth));
		indentTop = Math.max(0, imgOffset.top - slideOffset.top);
		if (photos[i].caption && options.captionLocation == 'top') {
			indentTop += slides[i].select('div.wslide-caption')[0].getHeight();
		}
		indentBottom = Math.max(0, (slideOffset.top + slideHeight) - (imgOffset.top + imgHeight));
	}
	
	
	
	
	/* slide transition
	-----------------------------------------------------------------------------------*/
	
	
	function go(newIndex, transitionForward) {
	
		if (newIndex != slideIndex) {
		
			var needSizeOverlays = false;
			var oldIndex = slideIndex;
			slideIndex = newIndex;
		
			if (slides[newIndex]) {
				if (slideImgWidths[newIndex] && slideImgHeights[newIndex]) { // is loaded?
					sizeImage(newIndex);
					needSizeOverlays = true;
					if (playing) {
						timedNext();
					}
				}
			}
			
			for (var i=newIndex; i<=newIndex+PRELOAD && i<photos.length; i++) {
				if (!slides[i]) {
					addSlide(photos[i], i); // populates slides[i]
				}
			}
			
			if (links) {
				if (oldIndex !== undefined) {
					links[oldIndex].removeClassName('wslide-link-active');
				}
				links[newIndex].addClassName('wslide-link-active');
			}
			
			if (prevButton) {
				if (newIndex > 0) {
					prevButton.show();
				}else{
					prevButton.hide();
				}
			}
			
			updatePlayPauseButtons();
			
			if (options.slide) {
			
				if (oldIndex === undefined) {
				
					slides[newIndex].style.left = 0; // "show"
					if (needSizeOverlays) {
						sizeOverlays(newIndex);
					}
				
				}else{
			
					var sign = (transitionForward || newIndex > oldIndex) ? 1 : -1;
				
					new Effect.Tween(
						null, 0, 1,
						{
							duration: .5,
							queue: { position: 'end', scope: element.id },
							beforeSetup: function() {
								slides[newIndex].style.left = contentWidth * sign + 'px';
								if (needSizeOverlays) {
									sizeOverlays(newIndex);
								}
							},
							afterFinish: function() {
								if (oldIndex !== undefined) {
									slides[oldIndex].style.left = '-101%'; // "hide"
								}
							}
						},
						function(n) {
							slides[newIndex].style.left = sign * Math.round(contentWidth * (1 - n)) + 'px';
							if (oldIndex !== undefined) {
								slides[oldIndex].style.left = -sign * Math.round(contentWidth * n) + 'px';
							}
						}
					);
					
				}
				
			}else{

				var newSlideInner = slides[newIndex].down('.wslide-slide-inner2');
				var oldSlideInner;
				if (oldIndex !== undefined) {
					oldSlideInner = slides[oldIndex].down('.wslide-slide-inner2');
				}
			
				new Effect.Tween(
					null, 0, 1,
					{
						duration: .5,
						queue: { position: 'end', scope: element.id },
						beforeSetup: function() {
							mySetOpacity(newSlideInner, 0);
							slides[newIndex].style.left = 0; // "show"
							if (needSizeOverlays) {
								sizeOverlays(newIndex);
							}
						},
						afterFinish: function() {
							if (oldIndex !== undefined) {
								slides[oldIndex].style.left = '-101%'; // "hide"
							}
						}
					},
					function(n) {
						if (oldIndex !== undefined) {
							mySetOpacity(oldSlideInner, 1 - n);
						}
						mySetOpacity(newSlideInner, n);
					}
				);
				
			}
		}
	}


	function mySetOpacity(e, n) {
		e.style.opacity = n;
		e.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + Math.round(n * 100) + ')';
	}
	
	
	

	/* 	navigation methods
	-----------------------------------------------------------------------*/
	
	
	function prev() {
		var i = slideIndex - 1;
		if (i >= 0) {
			go(i);
			putLinkInView(i, false);
		}
	}
	
	
	function next() {
		var i = (slideIndex + 1) % photos.length;
		go(i, true);
		putLinkInView(i, true);
	}
	
	
	function timedNext() {
		playTimeoutID = setTimeout(
			function() {
				if (!isDead()) {
					next();
				}
			},
			options.speed * 1000
		);
	}
	
	
	
	/* link mouseover sliding
	--------------------------------------------------------------------------*/
	
	
	function linkContainerMouseover(ev) {
		isMouseOverLinks = true;
		linkHoverID++;
		if (horizontalLinks) {
			linkContainerX = safeCumulativeOffset(linkContainer).left;
		}else{
			linkContainerY = safeCumulativeOffset(linkContainer).top;
		}
	}
	
	
	function linkContainerMousemove(ev) {
		if (horizontalLinks && linkContainerInnerWidth < linkContainerWidth ||
		    !horizontalLinks && linkContainerInnerHeight < linkContainerHeight) {
		    	return;
		    }
		var n;
		if (horizontalLinks) {
			n = (ev.pageX - linkContainerX) / linkContainerWidth;
		}else{
			n = (ev.pageY - linkContainerY) / linkContainerHeight;
		}
		var v;
		if (n < LINK_MOVE_EDGES) {
			v = (1 - (n / LINK_MOVE_EDGES)) * LINK_MAX_VELOCITY_SQRT;
			v *= v;
		}
		else if (n > (1-LINK_MOVE_EDGES)) {
			v = ((n - (1-LINK_MOVE_EDGES)) / LINK_MOVE_EDGES) * LINK_MAX_VELOCITY_SQRT;
			v *= -v;
		}
		else {
			v = 0;
		}
		v = Math.round(v);
		if (linkTargetVelocity != v) {
			linkTargetVelocity = v;
			if (!linkIntervalID) {
				linkIntervalID = setInterval(linkMove, 35);
			}
		}
	}
	
	
	function linkMove() {
		if (linkVelocity < linkTargetVelocity) {
			linkVelocity += LINK_ACCELERATION;
		}
		else if (linkVelocity > linkTargetVelocity) {
			linkVelocity -= LINK_ACCELERATION;
		}
		if (!linkVelocity && !linkTargetVelocity) {
			clearInterval(linkIntervalID);
			linkIntervalID = null;
		}else{
			if (horizontalLinks) {
				linkX = Math.min(linkMax, Math.max(linkMin, linkX + linkVelocity));
				linkContainerInner.style.left = linkX + 'px';
			}else{
				linkY = Math.min(linkMax, Math.max(linkMin, linkY + linkVelocity));
				linkContainerInner.style.top = linkY + 'px';
			}
		}
	}


	function linkContainerMouseout(ev) {
		var savedID = ++linkHoverID;
		setTimeout(function() {
			if (savedID == linkHoverID) {
				linkTargetVelocity = 0;
				isMouseOverLinks = false;
			}
		}, 10);
	}
	
	
	
	
	/* putting links in view
	---------------------------------------------------------------------------*/
	
	
	function putLinkInView(i, toFront) {
		if (links && !isMouseOverLinks) {
			var link = links[i];
			if (horizontalLinks) {
				var localLeft = link.positionedOffset().left;
				var left = localLeft + linkContainerInner.positionedOffset().left;
				var width = link.getWidth();
				if (left < 0 || left + width > linkContainerWidth) {
					if (toFront) {
						tweenLinkX(-localLeft);
					}else{
						tweenLinkX(-(localLeft + width - linkContainerWidth));
					}
				}
			}else{
				var localTop = link.positionedOffset().top;
				var top = localTop + linkContainerInner.positionedOffset().top;
				var height = link.getHeight();
				if (top < 0 || top + height > linkContainerHeight) {
					if (toFront) {
						tweenLinkY(-localTop);
					}else{
						tweenLinkY(-(localTop + height - linkContainerHeight));
					}
				}
			}	
		}
	}
	
	
	function tweenLinkX(newX) {
		var oldX = linkX;
		newX = Math.min(linkMax, Math.max(linkMin, newX));
		new Effect.Tween(
			null, oldX, newX,
			{
				duration: .5,
				queue: { position: 'end', scope: 'slideshow-move' }
			},
			function(n) {
				linkX = Math.round(n);
				linkContainerInner.style.left = linkX + 'px';
			}
		);
	}
	
	
	function tweenLinkY(newY) {
		var oldY = linkY;
		newY = Math.min(linkMax, Math.max(linkMin, newY));
		new Effect.Tween(
			null, oldY, newY,
			{
				duration: .5,
				queue: { position: 'end', scope: 'slideshow-move' }
			},
			function(n) {
				linkY = Math.round(n);
				linkContainerInner.style.top = linkY + 'px';
			}
		);
	}
	
	
	
	function isDead() {
		if (!element.up('body')) {
			// element is gone now (might have switched to a different page in editor)
			_destroy();
			return true;
		}
		return false;
	}
	
	
	
	/* playing / pausing
	-------------------------------------------------------------------------*/
	
	
	function play() {
		if (photos.length > 1 && !playing) {
			element.addClassName('wslide-playing');
			playing = true;
			updatePlayPauseButtons();
			var savedID = ++playPauseID;
			setTimeout(function() {
				if (savedID == playPauseID) {
					fadeControls();
				}
			}, 1000);
			if (slideImgWidths[slideIndex] && slideImgHeights[slideIndex]) { // current slide already loaded
				timedNext();
			}
		}
	}
	
	
	function pause() {
		if (playing) {
			element.removeClassName('wslide-playing');
			playing = false;
			updatePlayPauseButtons();
			clearTimeout(playTimeoutID);
			playTimeoutID = null;
			playPauseID++;
		}
	}
	
	
	function updatePlayPauseButtons() {
		if (photos.length > 1) {
			if (playing) {
				playButton.setOpacity(0).hide();
				pauseButton.setOpacity(1).show();
			}else{
				playButton.setOpacity(1).show();
				pauseButton.setOpacity(0).hide();
			}
		}
	}
	
	
	
	/* control fading
	---------------------------------------------------------------------------*/
	
	
	function showControls(skipIndent) {
		stopFadeControls();
		if (!skipIndent) {
			indentControls();
		}
		overlayTopLeft.show().setOpacity(1);
		overlayTopRight.show().setOpacity(1);
		overlayLeft.show().setOpacity(1);
		overlayRight.show().setOpacity(1);
		controlsVisible = true;
	}
	
	
	function indentControls() {
		overlayTopLeft.style.paddingTop = indentTop + 'px';		
		overlayTopLeft.style.paddingLeft = indentLeft + 'px';
		overlayTopRight.style.paddingTop = indentTop + 'px';
		overlayTopRight.style.paddingRight = indentRight + 'px';
		overlayLeft.style.paddingLeft = indentLeft + 'px';
		overlayRight.style.paddingRight = indentRight + 'px';
	}
	
	
	function hideControls() {
		stopFadeControls();
		overlayTopLeft.hide();
		overlayTopRight.hide();
		overlayLeft.hide();
		overlayRight.hide();
		controlsVisible = false;
	}
	
	
	function fadeControls() {
		if (controlsVisible) {
			controlsVisible = false;
			controlsFadeEffect = new Effect.Tween(
				null, 1, 0,
				{
					duration: 1,
					queue: { position: 'end', scope: 'slideshow-fade-controls' },
					afterFinish: function() {
						hideControls();
						controlsFadeEffect = null;
					}
				},
				function(n) {
					overlayTopLeft.show().setOpacity(n);
					overlayTopRight.show().setOpacity(n);
					overlayLeft.show().setOpacity(n);
					overlayRight.show().setOpacity(n);
				}
			);
		}
	}
	
	
	function stopFadeControls() {
		if (controlsFadeEffect) {
			controlsFadeEffect.cancel();
			controlsFadeEffect = null;
		}
	}
	
	
	function mouseAction() {
		if (!controlsVisible) {
			if (controlsFadeEffect) {
				showControls(true);
			}else{
				showControls();
			}
		}
		var savedID = ++mouseActionID;
		setTimeout(function() {
			if (savedID == mouseActionID) {
				if (controlsVisible) {
					fadeControls();
				}
			}
		}, 1000);
	}
	
	
	
	/* window resizing
	--------------------------------------------------------------*/
	
	var windowResizeID = 0;
	
	function windowResize() {
		var savedID = ++windowResizeID;
		setTimeout(function() {
			if (savedID == windowResizeID) {
				if (!isDead()) {
					updateSize();
				}
			}
		}, 500);
	}


}



function thumbnailURL(photo) {
	var url = photo.url;
	if (!url.match("/weebly/images/")) {
		url = '/uploads/' + url;
	}
	return url;
}


function largeURL(photo) {
	var url = photo.url;
	if (!url.match("/weebly/images/")) {
		url = '/uploads/' + url;
		url = url.replace(/^(.*)\.([^\.]+)$/, "$1_orig.$2");
	}
	return url;
}


function stopEvent(ev) {
	ev.stop();
}


function loadImage(img, src, onload) {
	var intervalID = null;
	var called = false;
	function done() {
		if (intervalID) {
			clearInterval(intervalID);
			intervalID = null;
		}
		if (!called) {
			called = true;
			onload();
		}
	};
	img.onload = done;
	img.src = src;
	if (img.complete) {
		done();
	}else{
		intervalID = setInterval(function() {
			if (img.complete) {
				done();
			}
		}, 500);
	}
}



/************************** helpers for theme-css-loaded detection ***********************/
// ripped from flyout_menus.js


function isThemeCSSLoaded() {
	var stylePrefix = window.STYLE_PREFIX || 'weebly';
    if (window.isMobileTheme) {
		return true; // hack
	}
	for (var i=0; i<document.styleSheets.length; i++) {
		try {
			if (document.styleSheets[i].title == stylePrefix+'-theme-css') {
				var sheet = document.styleSheets[i];
				var rules = sheet.cssRules || sheet.rules;
				return rules && rules.length > 0;
			}
		}
		catch (err) {}
	}
	if (window.currentSite) {
		// in the editor
		// there will always be a weebly-theme-css, so if it isn't in the DOM yet, it is coming
		return false;
	}else{
		// on published site
		// if there is no weebly-theme-css stylesheet at this point, there will never be, so we are done
		return true;
	}
}


function whenThemeCSSLoaded(callback) {
	if (isThemeCSSLoaded()) {
		callback();
	}else{
		var iters = 0;
		var maxIters = 10;
		var intervalID = setInterval(function() {
			if (++iters > maxIters) {
				clearInterval(intervalID);
			}
			else if (isThemeCSSLoaded()) {
				clearInterval(intervalID);
				callback();
			}
		}, 200);
	}
}


// copied from flyout_menus.js
function safeCumulativeOffset(e) {
	if (e.getBoundingClientRect && e.nodeName != 'BODY' && e.nodeName != 'HTML') {
		// heavily inspired by jquery's offset method
		var rect = e.getBoundingClientRect(),
			body = document.body,
			docElem = document.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
			scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
			top = rect.top + scrollTop - clientTop,
			left = rect.left + scrollLeft - clientLeft,
			a = [left, top];
		a.left = left;
		a.top = top;
		return a;
	}else{
		return $(e).cumulativeOffset();
	}
}


})();
