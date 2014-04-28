//* @public
/**
	_g.Scroller_ extends <a href="#enyo.Scroller">enyo.Scroller</a>.

	In addition, _g.Scroller_ responds to explicit/programmatic requests from
	controls to be scrolled into view via the _onRequestScrollIntoView_ event.

	For more information, see the documentation on
	[Scrollers](https://github.com/enyojs/enyo/wiki/Scrollers) in the Enyo Developer
	Guide.
*/
enyo.kind({
	name: "g.Scroller",
	//* @protected
	kind: "enyo.Scroller",
	mixins: [
		"g.ValidationSupport"
	],
	strategyKind: "g.ScrollStrategy",
	//* @public
	/**
		scrollIndicatorEnabled is for displaying gradients to indicate more contents to scroll.

		range [ true, false ]
	*/
	scrollIndicatorEnabled: false,
	//* @protected
	classes: "g-scroller",
	initComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			if (this.scrollIndicatorEnabled) {
				this.parent.createComponents([
					{name: "prevInd", kind: "g.ScrollIndicator", direction: "previous", classes: "g-common-point-events-none"},
					{name: "nextInd", kind: "g.ScrollIndicator", direction: "next", classes: "g-common-point-events-none"}
				]);
				this.parent.$.prevInd.hide();
			}
		};
	}),
	showThumbs: function() {
		this.$.strategy.showThumbs();
	},
	hideThumbs: function() {
		this.$.strategy.hideThumbs();
	},
	getScrollHeight: function() {
		return this.$.strategy.getScrollBounds().height;
	},
	getClientHeight: function() {
		return this.$.strategy.getScrollBounds().clientHeight;
	},
	scrollStop: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			if (this.scrollIndicatorEnabled) {
				var bounds = this.getScrollBounds();
				if (bounds.top <= 0) {
					this.parent.$.prevInd.hide();
				} else {
					this.parent.$.prevInd.show();
				}
				if (bounds.top >= bounds.maxTop) {
					this.parent.$.nextInd.hide();
				} else {
					this.parent.$.nextInd.show();
				}
			}
		};
	})
});
