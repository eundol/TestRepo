//* @public
/**
	_g.WheelPickerController_ implements the control for picker controls which looks like circular slider.
*/
enyo.kind({
	//* @public
	name: "g.WheelPickerController",
	//* @protected
	kind: "g.WheelGesture",
	//* @public
	events: {
		//* Fires when the knob position is set. The _value_ property contains the variation degree.
		onWheelPickerChange: "",
		//* Fires when the knob is released.
		onWheelPickerReleased: "",
		//* Fires when animation to a position finishes.
		onAnimateFinish: ""
	},
	/**
		The base position of the knob.

		range [0 ~ Math.PI * 2]
	*/
	baseRadian: 0,
	/**
		Whether knob should be start from the base position or not.
		If it is false, the starting position of rotation is the refence position.

		range [true or false]
	*/
	baseFixed: true,
	/**
		Whether knob is rewinded to the starting position at the end of touching.
		If it is false, the knob is remained in the ending position.

		range [true or false]
	*/
	rewindEnabled: true,
	//* @protected
	_unitRadian: 0.5,
	_widthVisible: g.wheelWidth,
	_knobColor: g.constant.colorPoint,
	_rewindEnabledAnimation: false,
	_rangeOfBase: 0.2,
	_radian: 0,
	_radianAccumulated: 0,
	_changeDelayMS: 100,
	classes: "g g-wheel-picker-controller",
	components: [
		{kind: "Animator", onStep: "_animationStep", onEnd: "_animationFinish", duration: 350},
		{name: "wheel", kind: "g.WheelPicker"}
	],
	//* @protected
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._draw(this.baseRadian);
			this._redraw();
		};
	}),
	//* @protected
	_eventObservingStart: function(inRadian) {
		if (!this.baseFixed) {
			this.baseRadian = inRadian;
		} else if (!this._checkStartPosition(inRadian)) {
			this._isObserving = false;
			return false;
		}
		this._radian = this.baseRadian;
		this._radianAccumulated = 0;
		this._update(inRadian);
		return true;
	},
	_eventObservingStep: function(inRadian) {
		this._update(inRadian);
		return true;
	},
	_eventObservingStop: function(inRadian) {
		this._update(inRadian);
		this._rewind();
		return true;
	},
	_animationStart: function(inStartValue, inEndValue) {
		this.$.animator.play({
			startValue: inStartValue,
			endValue: inEndValue,
			node: this.hasNode()
		});
	},
	_animationStep: function(inSender) {
		this._radianAccumulated = inSender.value - this.baseRadian;
		this._draw(inSender.value);
		return true;
	},
	_animationFinish: function(inSender) {
		this.doAnimateFinish(inSender);
		return true;
	},
	_initVariables: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			if (this.baseRadian === undefined || this.baseRadian < 0) {
				this.baseRadian = 0;
			} else if (this.baseRadian > Math.PI * 2) {
				this.baseRadian = Math.PI * 2;
			}
			if (this.baseFixed === undefined) {
				this.baseFixed = true;
			}
			if (this.rewindEnabled === undefined) {
				this.rewindEnabled = true;
			}
			this._radian = this.baseRadian;
		};
	}),
	_checkStartPosition: function(inRadian) {
		var diff;
		diff = Math.abs(inRadian - this.baseRadian);
		if (diff > Math.PI) {
			diff = this._constMaxRadians - diff;
		}
		if (diff > this._rangeOfBase) {
			return false;
		}
		return true;
	},
	_redraw: function() {
		this.$.wheel.setWheelWidth(this._widthVisible);
		this.$.wheel.setKnobColor(this._knobColor);
	},
	_rewind: function() {
		if (this.rewindEnabled) {
			if (this._rewindEnabledAnimation && this._radianAccumulated !== this.baseRadian) {
				this._animationStart(this.baseRadian + this._radianAccumulated, this.baseRadian);
			} else {
				this._radian = this.baseRadian;
				this._radianAccumulated = 0;
				this._draw(this.baseRadian);
			}
		} else {
			this.baseRadian = this._radian;
			this._radianAccumulated = 0;
			this._draw(this.baseRadian);
		}
		this._bubbleEventReleased();
	},
	_update: function(inRadian) {
		this._radianAccumulated += this._computeRadianDifference(inRadian, this._radian);
		this._radian = inRadian;
		this._draw(this.baseRadian + this._radianAccumulated);
		this._bubbleEventChange();
	},
	_computeRadianDifference: function(inToRadian, inFromRadian) {
		var diff = inToRadian - inFromRadian;
		if (diff > Math.PI) {
			diff -= this._constMaxRadians;
		} else if (diff < -Math.PI) {
			diff += this._constMaxRadians;
		}
		return diff;
	},
	_draw: function(inRadian) {
		this.$.wheel.draw(this.baseRadian, inRadian);
	},
	_bubbleEventChange: function(inEventData) {
		this.throttleJob("WheelPickerController_Event", function() {
			this.doWheelPickerChange({value: Math.round(this._radianAccumulated / this._unitRadian)});
		}, this._changeDelayMS);
	},
	_bubbleEventReleased: function() {
		this.doWheelPickerReleased();
	}
});
