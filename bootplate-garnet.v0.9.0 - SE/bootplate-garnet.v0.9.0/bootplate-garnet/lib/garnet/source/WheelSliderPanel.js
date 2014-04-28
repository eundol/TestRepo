//* @protected
/**
 _g.WheelSliderKnob is g.Knob with the bigger width when pressing it.
*/
enyo.kind({
	name: "g.WheelSliderKnob",
	kind: "g.Knob",
	published: {
		state: "up"
	},
	stateChanged: function() {
		if (this.state === "up") {
			this.setWidth(this._defaultKnowWidth);
			this.$.knob.applyStyle("margin-top", 0);
		} else if (this.state === "down") {
			this._defaultKnowWidth = this.getWidth();
			this.setWidth(31);
			this.$.knob.applyStyle("margin-top", ((this._defaultKnowWidth - 31) / 2) + "px");
		}
	}
});

//* @protected
/**
	The _g.WheelSlider_ kind is the UI component set a value within a value range.
*/
enyo.kind({
	//* @public
	name: "g.WheelSlider",
	//* @protected
	kind: "g.WheelGesture",
	//* @public
	published: {
		//* @protected
		/**
			The color of a track.

			range [color] example) red, blue, #454545, etc.
		*/
		trackColor: "#454545",
		/**
			The color of a slider arc.

			range [color] example) red, blue, #1DDBD9, etc.
		*/
		sliderColor: g.constant.colorPoint,
		/**
			The color of a knob.

			range [color] example) red, blue, #FFFFFF, etc.
		*/
		knobColor: g.constant.colorPoint,
		/**
			The width of a wheel.

			range [0 or greater in pixel]
		*/
		width: g.wheelSliderWidth * g.height,
		//* @public
		/**
			The minimum value.

			range [number]
		*/
		minimumValue: 0,
		/**
			The maximum value.

			range [number]
		*/
		maximumValue: 100,
		/**
			The step of the value.

			range [number]
		*/
		stepValue: 10,
		/**
			Tha value of a slider.

			range [minimumValue ~ maximumValue]
		*/
		value: 0
	},
	events: {
		/**
			fired when the value is set. (when draged or when tapped.)
		*/
		onChange: "",
		/**
			fired when the value is changed. (during dragging)
		*/
		onChanging: ""
	},
	//* @protected
	_constMinimumRadian: 0,
	_constMaximumRadian: 2 * Math.PI,
	_reversedRange: false,
	_signedStepValue: 0,
	_lastRadian: 0,
	_isRotating: false,
	_changeDelayMS: 50,
	classes: "g-wheelslider",
	bindings: [
		{from: ".trackColor", to: ".$.track.color"},
		{from: ".sliderColor", to: ".$.slider.color"},
		{from: ".knobColor", to: ".$.knob.color"},
		{from: ".width", to: ".$.track.width"},
		{from: ".width", to: ".$.slider.width"},
		{from: ".width", to: ".$.knob.width"}
	],
	//* @protected
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.components = null;
			sup.apply(this, arguments);
			this.createComponent({name: "track", kind: "g.Wheel"});
			this.createComponent({name: "slider", kind: "g.Arc"});
			this.createComponent({name: "knob", kind: "g.WheelSliderKnob"});
			// replace minimumValueChanged() and maximumValueChanged() to prevent valueChanged in these.
			this._reversedRange = (this.minimumValue > this.maximumValue)? true: false;
			this.stepValueChanged();
			this.valueChanged();
		};
	}),
	minimumValueChanged: function() { // model
		this._reversedRange = (this.minimumValue > this.maximumValue)? true: false;
		this.valueChanged();
	},
	maximumValueChanged: function() { // model
		this._reversedRange = (this.minimumValue > this.maximumValue)? true: false;
		this.valueChanged();
	},
	stepValueChanged: function() { // model
		var valueRange = Math.abs(this.maximumValue - this.minimumValue);
		if (this.stepValue > valueRange) {
			this.stepValue = valueRange;
		}
		this._signedStepValue = (this._reversedRange)? -this.stepValue: this.stepValue;
	},
	valueChanged: function() { // model
		if (!this._reversedRange) {
			if (this.value < this.minimumValue) {
				this.value = this.minimumValue;
			} else if (this.value > this.maximumValue) {
				this.value = this.maximumValue;
			}
		} else {
			if (this.value < this.maximumValue) {
				this.value = this.maximumValue;
			} else if (this.value > this.minimumValue) {
				this.value = this.minimumValue;
			}
		}

		this.value = (~~((this.value - this.minimumValue) / this._signedStepValue) * this._signedStepValue) + this.minimumValue;
		if (!this._isRotating) {
			this._draw((this.value - this.minimumValue) / (this.maximumValue - this.minimumValue) * Math.PI * 2);
		}
	},
	_eventObservingStart: function(inRadian) { // control
		this._isRotating = true;
		this._lastRadian = inRadian;
		this._overStatus = 0;
		this._setValueWithRadian(inRadian);
		this._sendChangingEvent({value: this.value});
		this.$.knob && this.$.knob.setState && this.$.knob.setState("down");
		return true;
	},
	_eventObservingStep: function(inRadian) { // control
		this._checkOverRotating(inRadian);
		if (this._overStatus === 0) {
			this._setValueWithRadian(inRadian);
			this._sendChangingEvent({value: this.value});
		}
		return true;
	},
	_eventObservingStop: function(inRadian) { // control
		this._checkOverRotating(inRadian);
		if (this._overStatus === 0) {
			this._setValueWithRadian(inRadian);
		}
		this._sendChangeEvent({value: this.value});
		this._isRotating = false;
		this.$.knob && this.$.knob.setState && this.$.knob.setState("up");
		return true;
	},
	_checkOverRotating: function(inRadian) { // control
		this._overStatus = this._overStatus + this._isOverRotating(inRadian);
		if (this._overStatus !== 0) {
			if (this._overStatus < -1) {
				this._overStatus = -1;
			} else if (this._overStatus > 1) {
				this._overStatus = 1;
			}
		}
	},
	_isOverRotating: function(inRadian) { // control
		var movedRadian = inRadian - this._lastRadian;
		this._lastRadian = inRadian;
		if (Math.abs(movedRadian) > Math.PI) {
			this.stopJob("sliderChanging");
			if (movedRadian > 0) {
				// from minimum to maximum
				this._setValueWithRadian(this._constMinimumRadian);
				this._sendChangingEvent({value: this.value});
				return 1;
			} else {
				// from maximum to minimum
				this._setValueWithRadian(this._constMaximumRadian);
				this._sendChangingEvent({value: this.value});
				return -1;
			}
		}
		return 0;
	},
	_sendChangeEvent: function(inEventData) { // control
		this.throttleJob("sliderChange", function() { this.doChange(inEventData); }, this._changeDelayMS);
	},
	_sendChangingEvent: function(inEventData) { // control
		this.throttleJob("sliderChanging", function() { this.doChanging(inEventData); }, this._changeDelayMS);
	},
	_draw: function(inRadian) { // view
		this.$.slider.draw(this._constMinimumRadian, inRadian);
		this.$.knob.draw(inRadian);
	},
	_setValueWithRadian: function(inRadian) { // model
		this.setValue((inRadian / (Math.PI * 2)) * (this._signedStepValue + this.maximumValue - this.minimumValue) + this.minimumValue);
		this._draw(inRadian);
	}
});

//* @public
/**
	_g.WheelSliderPanel_ is specilized _g.Panel_ contains a wheel slider.
	When a wheel slider is tapped or dragged,
	_g.WheelSliderPanel_ handles these events in 'onChange' and 'onChanging' event handlers.
	To use a wheel slider, override 'onChange' and/or 'onChaning' handler functions.
*/
enyo.kind({
	//* @public
	name: "g.WheelSliderPanel",
	kind: "g.Panel",
	published: {
		//* @protected
		/**
			The color of a track.

			range [color] example) red, blue, #454545, etc.
		*/
		trackColor: "#454545",
		/**
			The color of a slider arc.

			range [color] example) red, blue, #1DDBD9, etc.
		*/
		sliderColor: g.constant.colorPoint,
		/**
			The color of a knob.

			range [color] example) red, blue, #FFFFFF, etc.
		*/
		knobColor: g.constant.colorPoint,
		/**
			The width of a wheel.
			If it is less than 0, it will be set as 0.
			If it is greater than the half size of the device screen,
			it will be set as the half size of the device screen.

			range [0 or greater in pixel]
		*/
		width: g.wheelSliderWidth * g.height,
		//* @public
		/**
			The minimum value.

			range [number]
		*/
		minimumValue: 0,
		/**
			The maximum value.

			range [number]
		*/
		maximumValue: 9,
		/**
			The step of the value.

			range [number]
		*/
		stepValue: 1,
		/**
			Tha value of a slider.

			range [minimumValue ~ maximumValue]
		*/
		value: 0
	},
	//* @protected
	handlers: {
		onup: "eventHandler",
		ondown: "eventHandler",
		onhold: "eventHandler",
		ondragstart: "eventHandler",
		ondrag: "eventHandler",
		ondragfinish: "eventHandler",
		ontap: "eventHandler",
		onChange: "changeEventHandler",
		onChanging: "changingEventHandler"
	},
	bindings: [
		{from: ".trackColor", to: ".$.wheelController.trackColor"},
		{from: ".sliderColor", to: ".$.wheelController.sliderColor"},
		{from: ".knobColor", to: ".$.wheelController.knobColor"},
		{from: ".width", to: ".$.wheelController.width"},
		{from: ".$.wheelController.stepValue", to: ".stepValue"},
		{from: ".$.wheelController.value", to: ".value"}
	],
	initComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			if (this.minimumValue === undefined) {
				this.minimumValue = 0;
			}
			if (this.maximumValue === undefined) {
				this.maximumValue = 9;
			}
			if (this.stepValue === undefined) {
				this.stepValue = 1;
			}
			if (this.value === undefined) {
				this.value = 0;
			}
			// create a wheel controller component
			this.createComponent({
				name: "wheelController",
				kind: "g.WheelSlider",
				minimumValue: this.minimumValue,
				maximumValue: this.maximumValue,
				stepValue: this.stepValue,
				value: this.value
			});
		};
	}),
	trackColorChanged: function(inOld) {
		if (this.trackColor === undefined) {
			this.trackColor = inOld;
		}
	},
	sliderColorChanged: function(inOld) {
		if (this.sliderColor === undefined) {
			this.sliderColor = inOld;
		}
	},
	knobColorChanged: function(inOld) {
		if (this.knobColor === undefined) {
			this.knobColor = inOld;
		}
	},
	widthChanged: function(inOld) {
		if (this.width === undefined) {
			this.width = inOld;
		} else {
			if (this.width < 0) {
				this.width = 0;
			} else if (this.width > g.width / 2) {
				this.width = g.width / 2;
			}
		}
	},
	minimumValueChanged: function(inOld) {
		if (this.minimumValue === undefined) {
			this.minimumValue = inOld;
		} else {
			this.$.wheelController.setMinimumValue(this.minimumValue);
		}
	},
	maximumValueChanged: function(inOld) {
		if (this.maximumValue === undefined) {
			this.maximumValue = inOld;
		} else {
			this.$.wheelController.setMaximumValue(this.maximumValue);
		}
	},
	stepValueChanged: function(inOld) {
		if (this.stepValue === undefined) {
			this.stepValue = inOld;
		} else {
			this.$.wheelController.setStepValue(this.stepValue);
			this.stepValue = this.$.wheelController.getStepValue();
		}
	},
	valueChanged: function(inOld) {
		if (this.value === undefined) {
			this.value = inOld;
		} else {
			this.$.wheelController.setValue(this.value);
			this.value = this.$.wheelController.getValue();
		}
	},
	//* @protected
	eventHandler: enyo.inherit(function(sup) {
		return function(inSender, inEvent) {
			return sup.apply(this, arguments);
		};
	}),
	changeEventHandler: function() {
		return false;
	},
	changingEventHandler: function() {
		return false;
	}
});
