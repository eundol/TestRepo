//* @protected
/**
	The _g.Wheel_ kind is the UI component shows a wheel. (background)
*/
enyo.kind({
	//* @public
	name: "g.Wheel",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	//* @public
	published: {
		/**
			The color of a wheel.

			range [color] example) red, blue, #1DDBD9, etc.
		*/
		color: g.constant.colorPoint,
		/**
			The width of a wheel.

			range [0 or greater in pixel]
		*/
		width: g.wheelWidth
	},
	//* @protected
	classes: "g-wheel",
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.colorChanged();
			this.widthChanged();
		};
	}),
	colorChanged: function() {
		this.applyStyle("border-color", this.color);
	},
	widthChanged: function() {
		this.applyStyle("border-width", this.width + "px");
	}
});

//* @protected
/**
	The _g.Arc_ kind is the UI component shows an arc.
*/
enyo.kind({
	//* @public
	name: "g.Arc",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	//* @public
	published: {
		/**
			The color of an arc.

			range [color] example) red, blue, #1DDBD9, etc.
		*/
		color: g.constant.colorPoint,
		/**
			The width of an arc.

			range [0 or greater in pixel]
		*/
		width: g.wheelWidth
	},
	//* @protected
	classes: "g-arc",
	innerComponents: [
		{classes: "g-arc-window g-arc-left", components: [
			{name: "leftHalf", classes: "g-arc-half", components: [
				{name: "leftCircle", classes: "g-circle"}
			]}
		]},
		{classes: "g-arc-window g-arc-right", components: [
			{name: "rightHalf", classes: "g-arc-half", components: [
				{name: "rightCircle", classes: "g-circle"}
			]}
		]}
	],
	//* @protected
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.components = null;
			sup.apply(this, arguments);
			this.createComponents(this.innerComponents);
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.colorChanged();
			this.widthChanged();
		};
	}),
	colorChanged: function() {
		this.$.leftCircle.applyStyle("border-color", this.color);
		this.$.rightCircle.applyStyle("border-color", this.color);
	},
	widthChanged: function() {
		this.$.leftCircle.applyStyle("border-width", this.width + "px");
		this.$.rightCircle.applyStyle("border-width", this.width + "px");
	},
	//* @public
	draw: function(inStartRadian, inEndRadian) {
		var delta = inEndRadian - inStartRadian;
		this._rotateObject(this, inStartRadian);
		if (delta >= 0) {
			this._drawHalf(this.$.rightHalf, delta, 1); // 1: clockwise
			this._drawHalf(this.$.leftHalf, delta - Math.PI, 1); // 1: clockwise
		} else {
			this._drawHalf(this.$.leftHalf, -delta, -1); // -1: counter-clockwise
			this._drawHalf(this.$.rightHalf, -delta - Math.PI, -1); // -1: counter-clockwise
		}
	},
	//* @protected
	_drawHalf: function(inObject, inRadian, inClockwise) {
		if (inRadian < 0) {
			this._rotateObject(inObject, 0);
		} else if (inRadian < Math.PI) {
			this._rotateObject(inObject, inClockwise * inRadian);
		} else {
			this._rotateObject(inObject, inClockwise * Math.PI);
		}
	},
	_rotateObject: function(inObject, inRadian) {
		enyo.dom.transform(inObject, {
			rotateZ: inRadian + "rad"
		});
	}
});

//* @protected
/**
	The _g.HalfArc_ kind is the UI component shows a half of an arc.
*/
enyo.kind({
	//* @public
	name: "g.HalfArc",
	//* @protected
	kind: "g.Arc",
	innerComponents: [
		{components: [
			{name: "container", classes: "g-arc-window g-arc-right", components: [
				{name: "rightHalf", classes: "g-arc-half", components: [
					{name: "rightCircle", classes: "g-circle"}
				]}
			]}
		]}
	],
	//* @protected
	colorChanged: function() {
		this.$.rightCircle.applyStyle("border-color", this.color);
	},
	widthChanged: function() {
		this.$.rightCircle.applyStyle("border-width", this.width + "px");
	},
	//* @public
	draw: function(inStartRadian, inEndRadian) {
		var delta = inEndRadian - inStartRadian;
		if (delta < 0) {
			inStartRadian = inEndRadian + (inEndRadian = inStartRadian) - inStartRadian;
			delta = -delta;
		} else if (delta > Math.PI) {
			delta = Math.PI;
		}
		this._rotateObject(this.$.container, -delta / 2);
		this._rotateObject(this.$.rightHalf, delta);
	}
});

//* @protected
/**
	The _g.Knob_ kind is the UI component shows a knob on a wheel.
*/
enyo.kind({
	//* @public
	name: "g.Knob",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	//* @public
	published: {
		/**
			The color of a knob.

			range [color] example) red, blue, #FFFFFF, etc.
		*/
		color: "white",
		/**
			The width of a wheel.

			range [0 or greater in pixel]
		*/
		width: g.wheelWidth
	},
	//* @protected
	classes: "g-knob-container",
	innerComponents: [
		{name: "knob", classes: "g-knob-body"}
	],
	//* @protected
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.components = null;
			sup.apply(this, arguments);
			this.createComponents(this.innerComponents);
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.colorChanged();
			this.widthChanged();
		};
	}),
	colorChanged: function() {
		this.$.knob.applyStyle("background-color", this.color);
	},
	widthChanged: function() {
		this.$.knob.applyStyle("width", this.width + "px");
		this.$.knob.applyStyle("height", this.width + "px");
	},
	//* @public
	draw: function(inRadian) {
		enyo.dom.transform(this, {rotateZ: inRadian + "rad", translateZ: 0});
	}
});
