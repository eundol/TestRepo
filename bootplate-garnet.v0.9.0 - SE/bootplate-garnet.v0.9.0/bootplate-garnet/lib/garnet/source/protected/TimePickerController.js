//* @protected
/**
	The _g.TimePickerController_ kind is the UI component set a value within a value range.
*/
enyo.kind({
	name: "g.TimePickerController",
	//* @protected
	kind: "g.WheelSlider",
	//* @public
	published: {
		/**
			To disable a controller, set this as true.

			range [true, false]
		*/
		disabled: false
	},
	//* @protected
	minimumValue: 0,
	trackColor: "transparent",
	stepValue: 1,
	_deltaPortion: null,
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this._deltaPortion = ((Math.PI * 2)/(this.maximumValue+1));
			this.components = null;
			this.createComponent({name: "track", kind: "g.Wheel"});
			this.createComponent({name: "knob", kind: "g.Knob"});
			// replace minimumValueChanged() and maximumValueChanged() to prevent valueChanged in these.
			this._reversedRange = (this.minimumValue > this.maximumValue)? true: false;
			this.stepValueChanged();
			this.valueChanged();
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.disabledChanged();
		};
	}),
	valueChanged: function() {
		if (this.value > this.maximumValue) {
			this.value = 0;
		}
		if (!this._isRotating) {
			this._draw(this.value*this._deltaPortion);
		}
	},
	disabledChanged: function() {
		if (this.disabled) {
			this._releaseEvents();
		} else {
			this._captureEvents();
		}
	},
	_eventObservingStep: function(inRadian) { // control
		this._checkOverRotating(inRadian);
		this._setValueWithRadian(inRadian);
		this._sendChangingEvent({value: this.value});
		return true;
	},
	_draw: function(inRadian) { // view
		this.$.knob.draw(inRadian);
	},
	_setValueWithRadian: function(inRadian) { // model
		var dValue = this._getDiscreteValue(inRadian);
		this.setValue(dValue);
		this._draw(dValue*this._deltaPortion);
	},
	_getDiscreteValue: function(inRadian) {
		return Math.floor((inRadian+0.1)/this._deltaPortion);
	}
});
