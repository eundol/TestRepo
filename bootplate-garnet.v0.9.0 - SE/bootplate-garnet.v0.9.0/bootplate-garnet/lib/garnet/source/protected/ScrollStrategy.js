//* @protected
/**
	_g.ScrollStrategy_ inherits from
	<a href="#enyo.TouchScrollStrategy">enyo.TouchScrollStrategy</a>. Its main
	purpose is to handle scroller paging for
	<a href="#g.Scroller">g.Scroller</a> and
	<a href="#g.DataList">g.DataList</a>.
*/
enyo.kind({
	name: "g.ScrollStrategy",
	//* @protected
	kind: "enyo.TouchScrollStrategy",
	mixins: [ "g.ValidationSupport" ],
	alwaysShowThumbs: false,
	hideThumbsTimer: 3000,
	alertThumbsTimer: 3000,
	_verticalGestureTangent: 0.577, // or lower, Math.abs(dx / dy), tangent(30degree)
	_horizontalGestureTangent: 1.732, // or higher, Math.abs(dx / dy), tangent (60degree)
	tools: [
		{kind: "ScrollMath", onScrollStart: "scrollMathStart", onScroll: "scrollMathScroll", onScrollStop: "scrollMathStop"},
		{name: "vthumb", kind: "g.CircularThumb", axis: "v", showing: true},
		{name: "hthumb", kind: "g.CircularThumb", axis: "h", showing: false}
	],
	rendered: enyo.inherit(function(sup) { // overrided
		return function() {
			var i;
			sup.apply(this, arguments);
			for (i = this.$.client.children.length - 1; i >= 0; i--) {
				enyo.dom.transform(this.$.client.children[i], {translate3d: "0, 0, 0"});
				this.$.client.children[i].applyStyle("z-index: 0;");
			}
		};
	}),
	// Event handling

	//* Dragging on Y-axis only
	dragstart: enyo.inherit(function(sup) { // overrided
		return function(inSender, inEvent) {
			if (this._isWheelEvent(inEvent) || !this._isScrollEvent(inEvent)) {
				this._ignoreEvent = true;
				return false;
			} else {
				inEvent._ComponentHandled = true;
				this._ignoreEvent = false;
			}
			return sup.apply(this, arguments);
		};
	}),
	//* Dragging on Y-axis only
	drag: enyo.inherit(function(sup) { // overrided
		return function(inSender, inEvent) {
			if (this._ignoreEvent) {
				return false;
			} else {
				inEvent._ComponentHandled = true;
			}
			return sup.apply(this, arguments);
		};
	}),
	//* Dragging on Y-axis only
	dragfinish: enyo.inherit(function(sup) { // overrided
		return function(inSender, inEvent) {
			if (this._ignoreEvent) {
				return false;
			} else {
				inEvent._ComponentHandled = true;
			}
			return sup.apply(this, arguments);
		};
	}),
	//* Dragging on Y-axis only
	flick: enyo.inherit(function(sup) { // overrided
		return function(inSender, inEvent) {
			if (this._isWheelEvent(inEvent)) {
				return false;
			}
			return sup.apply(this, arguments);
		};
	}),
	//* On _hold_, stops scrolling.
	hold: enyo.inherit(function(sup) { // overrided
		return function(inSender, inEvent) {
			if (this._isWheelEvent(inEvent)) {
				return false;
			}
			return sup.apply(this, arguments);
		};
	}),
	//* On _down_, stops scrolling.
	down: enyo.inherit(function(sup) { // overrided
		return function(inSender, inEvent) {
			if (this._isWheelEvent(inEvent)) {
				return false;
			}
			if (this.isScrolling() && !this.isOverscrolling()) {
				this.stop();
			}
			return sup.apply(this, arguments);
		};
	}),
	scrollMathStop: function() { // overrided
		this.effectScrollStop();
		if (this.thumb) {
			this.delayHideThumbs(this.hideThumbsTimer);
		}
	},
	alertThumbs: function() { // overrided
		this.showThumbs();
		this.syncThumbs();
		this.delayHideThumbs(this.alertThumbsTimer);
	},
	showThumbs: enyo.inherit(function(sup) { // overrided
		return function() {
			sup.apply(this, arguments);
		};
	}),
	hideThumbs: enyo.inherit(function(sup) { // overrided
		return function() {
			if (this.alwaysShowThumbs) {
				return;
			} else {
				sup.apply(this, arguments);
			}
		};
	}),
	delayHideThumbs: enyo.inherit(function(sup) { // overrided
		return function() {
			if (this.alwaysShowThumbs) {
				return;
			} else {
				sup.apply(this, arguments);
			}
		};
	}),
	//* @protected
	_isScrollEvent: function(inEvent) {
		var dx = inEvent.dx;
		var dy = inEvent.dy;
		var absoluteTangent = Math.abs(dx / dy);
		if (absoluteTangent < this._verticalGestureTangent) {
			if (this.vertical !== "hidden") {
				return true;
			}
		} else if (absoluteTangent > this._horizontalGestureTangent) {
			if (this.horizontal !== "hidden") {
				return true;
			}
		}
		return false;
	},
	_isWheelEvent: function(inEvent) {
		var $wheelChecker = this.parent;
		while ($wheelChecker && !$wheelChecker.isWheelEvent) {
			$wheelChecker = $wheelChecker.parent;
		}
		if ($wheelChecker && $wheelChecker.isWheelEvent(inEvent)) {
			return true;
		}
		return false;
	}
});
