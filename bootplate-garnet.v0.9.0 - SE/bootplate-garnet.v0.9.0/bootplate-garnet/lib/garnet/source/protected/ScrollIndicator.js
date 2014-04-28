//* @protected
/**
	_g.ScrollIndicator_ implements way to indicate exsitence of previous or next page.
*/
enyo.kind({
	name: "g.ScrollIndicator",
	mixins: ["g.ValidationSupport"],
	//* @public
	published: {
		/**
			Position of scroll indicator.
			range ["previous", "next"]
		*/
		direction: "next"
	},
	//* @protected
	classes: "g-scroll-indicator g-next-indicator",
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.directionChanged();
		};
	}),
	directionChanged: function() {
		if (this.direction == "next") {
			this.addRemoveClass("g-next-indicator", true);
			this.addRemoveClass("g-pre-indicator", false);
		} else if (this.direction == "previous") {
			this.addRemoveClass("g-next-indicator", false);
			this.addRemoveClass("g-pre-indicator", true);
		} else {
			this.addRemoveClass("g-next-indicator", false);
			this.addRemoveClass("g-pre-indicator", false);
		}
	},
	//* @public
	show: function() {
		this.applyStyle("-webkit-transform", "translate3d(0, 0, 0)");
	},
	hide: function() {
		this.applyStyle("-webkit-transform", "translate3d(-9999px, 0, 0)");
	}
});
