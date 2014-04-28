//* @public
/**
	_g.Loading_ is a control that shows a loading animation.
*/
enyo.kind({
	name: "g.Loading",
	//* @protected
	mixins: [ "g.ValidationSupport" ],
	//* @public
	/**
		loading speed. It's unit is second and must positive value.

		range [0 ~ ]
	*/
	speed: 1,
	//* @protected
	initComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.speedChanged();
		};
	}),
	speedChanged: function(inOld) {
		if (this.speed === undefined) {
			this.speed = inOld;
		} else if (this.speed < 0) {
			this.speed = 0;
		}
		this.applyStyle("-webkit-animation-duration", this.speed + "s");
		this.applyStyle("-moz-animation-duration", this.speed + "s");
		this.applyStyle("-o-animation-duration", this.speed + "s");
		this.applyStyle("animation-duration", this.speed + "s");
	},
	//* @public
	/**
		Start the loading animation.
	*/
	start: function() {
		this.addRemoveClass("g-loading", true);
	},
	/**
		Stop the loading animation.
	*/
	stop: function() {
		this.addRemoveClass("g-loading", false);
	}
});
