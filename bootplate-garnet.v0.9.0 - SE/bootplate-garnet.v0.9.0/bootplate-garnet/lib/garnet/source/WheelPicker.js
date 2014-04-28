//* @public
/**
	The _g.WheelPicker_ kind is the UI component shows arc with wheel and/or knob.
*/
enyo.kind({
	//* @public
	name: "g.WheelPicker",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	//* @public
	published: {
		/**
			The width of wheel.
			If it is less than 0, it will be set as 0.
			If it is greater than the half size of the device screen,
			it will be set as the half size of the device screen.

			range [0 ~ the device screen width / 2 in pixel]
		*/
		wheelWidth: g.wheelWidth,
		/**
			The color of wheel.

			range [color] example) red, blue, #1DDBD9, etc.
		*/
		wheelColor: g.constant.colorPoint,
		/**
			The background color of wheel.

			range [color] example) red, blue, #222222, etc.
		*/
		backgroundColor: "#222222",
		/**
			The color of knob.

			range [color] example) red, blue, #FFFFFF, etc.
		*/
		knobColor: "white"
	},
	/**
		The option to display a background color or not.

		range [true, false]
	*/
	backgroundEnabled: true,
	/**
		The option to display a knob or not.

		range [true, false]
	*/
	knobEnabled: true,
	//* @protected
	classes: "g-wheelpicker",
	//* @protected
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.components = null;
			sup.apply(this, arguments);

			if (this.backgroundEnabled === undefined) {
				this.backgroundEnabled = true;
			}
			if (this.backgroundEnabled) {
				this.createComponent({name: "background", classes: "g-circle"});
			}
			this.createComponent({name: "arc", kind: "g.Arc"});
			if (this.knobEnabled === undefined) {
				this.knobEnabled = true;
			}
			if (this.knobEnabled) {
				this.createComponent({
					name: "knobWrapper",
					classes: "g-knob-wrapper",
					components: [{name: "knob", classes: "g-knob"}]
				});
			}
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.wheelWidthChanged(g.wheelWidth);
			this.wheelColorChanged(g.constant.colorPoint);
			this.backgroundColorChanged("#222222");
			this.knobColorChanged("white");
		};
	}),
	wheelWidthChanged: function(inOld) {
		if (this.wheelWidth === undefined) {
			this.wheelWidth = inOld;
		} else {
			if (this.wheelWidth < 0) {
				this.wheelWidth = 0;
			} else if (this.wheelWidth > g.width / 2) {
				this.wheelWidth = g.width / 2;
			}
			if (this.backgroundEnabled) {
				this.$.background.applyStyle("border-width", this.wheelWidth + "px");
			}
			this.$.arc.setWidth(this.wheelWidth);
			if (this.knobEnabled) {
				this.$.knob.applyStyle("width", this.wheelWidth + "px");
				this.$.knob.applyStyle("height", this.wheelWidth + "px");
			}
		}
	},
	wheelColorChanged: function(inOld) {
		if (this.wheelColor === undefined) {
			this.wheelColor = inOld;
		} else {
			this.$.arc.setColor(this.wheelColor);
		}
	},
	backgroundColorChanged: function(inOld) {
		if (this.backgroundColor === undefined) {
			this.backgroundColor = inOld;
		} else if (this.backgroundEnabled) {
			this.$.background.applyStyle("border-color", this.backgroundColor);
		}
	},
	knobColorChanged: function(inOld) {
		if (this.knobColor === undefined) {
			this.knobColor = inOld;
		} else if (this.knobEnabled) {
			this.$.knob.applyStyle("background-color", this.knobColor);
		}
	},
	//* @public
	draw: function(inStartRadian, inEndRadian) {
		if (inStartRadian !== undefined && inEndRadian !== undefined) {
			this.$.arc.draw(inStartRadian, inEndRadian);
			this._drawKnob(inEndRadian);
		}
	},
	//* @protected
	_drawKnob: function(inRadian) {
		if (this.knobEnabled) {
			enyo.dom.transform(this.$.knobWrapper, {rotateZ: inRadian + "rad"});
		}
	}
});
