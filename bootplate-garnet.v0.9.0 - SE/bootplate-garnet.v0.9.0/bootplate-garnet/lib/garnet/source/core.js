(function() {

	//* @public
	if (window.PalmSystem) {
		g.debug = false;
	} else {
		g.debug = true;
	}

	g.sample = g.sample || {};

	g.constant = {
		colorPoint: "#1DDBD9"
	};

	/**
		The width of a circular thumb. It's a constant.
	*/
	g.circularThumbWidth = 0.0125; // 4px / 320px
	/**
		The width of a wheel. It's a constant.
	*/
	// g.wheelWidth = 0.0625; // 20px / 320px
	/**
		The width of a expanded wheel. It's a constant.
	*/
	// g.wheelExpandedWidth = 0.125; // 40px / 320px
	/**
		The width of touch sensing on a tap or a drag-starting event. It's a constant.
	*/
	// g.wheelGestureWidth = 0.125; // 40px / 320px
	/**
		The width of touch sensing on a dragging event. It's a constant.
	*/
	g.wheelGestureDraggingWidth = 0.375; // 120px / 320px
	/**
		The width of a wheel slider. It's a constant.
	*/
	g.wheelSliderWidth = 0.046875; // 15px / 320px

	// Support multi-versions
	g.setActiveStyleSheet = function(title) {
		var i, a;
		for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
			if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
				a.disabled = true;
				if (a.getAttribute("title") == title) {
					a.disabled = false;
				}
			}
		}
	};

	g.getActiveStyleSheet = function() {
		var i, a;
		for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
			if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) {
				return a.getAttribute("title");
			}
		}
		return null;
	};

	g.getVersion = function() {
		var ver = enyo && enyo.version && enyo.version.garnet;
		return ver;
	};

	g.setVersion = function(inVer) {
		if (inVer === undefined || inVer === "") {
			inVer = "0.7.3";
		}
		g.setActiveStyleSheet(inVer);
		g = garnet && garnet[inVer] || g;
		enyo.version.garnet = inVer;
	};
})();
