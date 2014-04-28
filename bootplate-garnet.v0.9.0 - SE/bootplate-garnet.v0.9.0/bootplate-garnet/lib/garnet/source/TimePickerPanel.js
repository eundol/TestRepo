//* @public
/**
	_g.TimePickerPanel_ is specilized _g.Panel_ contains TimePicker.
	It has hour, minute, meridiem parts. Hour and minute parts have each picker controller respectively.
	You can set any time you want at first otherwise it sets current time automatically.
*/
enyo.kind({
	//* @public
	name: "g.TimePickerPanel",
	//* @protected
	kind: "g.Panel",
	//* @public
	published: {
		/**
			The initial value of hour part.

			range [1~12]
		*/
		hourValue: 0,
		/**
			The initial value of minute part.

			range [0~59]
		*/
		minuteValue: 0,
		/**
			The initial value of meridiem part.

			range [AM, PM]
		*/
		meridiemValue: "AM"
	},
	//* @protected
	handlers: {
		ontap: "eventHandler",
		onChange: "changeEventHandler",
		onChanging: "changingEventHandler"
	},
	_hourView: undefined,
	_minuteView: undefined,
	_dotView: undefined,
	_hourLabel: ["12", "3", "6", "9"],
	_minuteLabel: ["00", "15", "30", "45"],
	_isHourMode: true,
	classes: "g-time-picker-panel",
	components: [
		{name:"hourText", classes: "g-hour-text", content: "12"},
		{name:"colonText", classes: "g-colon-text", content: ":"},
		{name:"minuteText", classes: "g-minute-text", content: "59"},
		{name:"meridiemText", classes: "g-meridiem-text", content: "PM"},
		{name: "cancel", kind: "g.IconButton", classes: "g-cancel-image"},
		{name: "ok", kind: "g.IconButton", classes: "g-ok-image"}
	],
	bindings: [
		{from: ".hourValue", to: ".$.hourText.content", transform: function(val) {
				if (val<10 && val>0) {
					return "0" + val;
				} else if (val===0) {
					return "12";
				} else {
					return val;
				}
			}
		},
		{from: ".minuteValue", to: ".$.minuteText.content", transform: function(val) {
				if (val<10 && val>=0) {
					return "0" + val;
				} else {
					return val;
				}
			}
		},
		{from: ".meridiemValue", to: ".$.meridiemText.content"}
	],
	initComponents: enyo.inherit(function(sup) {
		return function() {
			//set current time as a default value
			if (this.hourValue <= 0) {
				var today = new Date();
				this.setHourValue(today.getHours());
				if (this.hourValue > 12) {
					this.setMeridiemValue("PM");
					this.hourValue -= 12;
				}
				this.setMinuteValue(today.getMinutes());
			}

			this.components = null;
			sup.apply(this, arguments);

			//views
			this._dotView = this.createComponent({name: "dots"});
			this._hourView = this.createComponent({name: "hours"});
			this._minuteView = this.createComponent({name: "mins"});
			var theta = (Math.PI/6);
			var startTheta = -(Math.PI/2);
			var x0 = g.width/2 -25;
			var y0 = g.height/2 -25;
			for (var i=0; i<12; i++) {
				var xx = x0 + (x0)*Math.cos(startTheta + theta*i);
				var yy = y0 + (y0)*Math.sin(startTheta + theta*i);
				if (i%3===0) {
					this._hourView.createComponent({
						name: "hour" + i,
						content: this._hourLabel[(i/3)],
						classes: "g-hour-label",
						style: "left: " + xx + "px; top: " + yy + "px;"
					});
					this._minuteView.createComponent({
						name: "min" + i,
						content: this._minuteLabel[(i/3)],
						classes: "g-minute-label",
						style: "left: " + xx + "px; top: " + yy + "px;"
					});
				} else {
					this._dotView.createComponent({
						name: "dot" + i,
						classes: "g-dot-label",
						style:"left: " + xx + "px; top: " + yy + "px;"
					});
				}
			}

			//controllers
			this.createComponent({
				name: "hourPicker",
				kind: "g.TimePickerController",
				knobColor: g.constant.colorPoint,
				width: 30,
				maximumValue: 11,
				value: this.hourValue
			});
			this.createComponent({
				name: "minutePicker",
				kind: "g.TimePickerController",
				knobColor: g.constant.colorPoint,
				width: 30,
				maximumValue: 59,
				value: this.minuteValue
			});


			this.hourValueChanged();
			this.minuteValueChanged();
			this.meridiemValueChanged();
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._isHourModeChanged();
		};
	}),
	hourValueChanged: function(inOld) {
		// set hour, check range
		if (this.hourValue === undefined) {
			this.hourValue = inOld;
		} else if (this.hourValue < 0) {
			this.hourValue = 0;
		} else if (this.hourValue > 11) {
			this.hourValue = 12;
		}
	},
	minuteValueChanged: function(inOld) {
		// set min, check range
		if (this.minuteValue === undefined) {
			this.minuteValue = inOld;
		} else if (this.minuteValue < 0) {
			this.minuteValue = 0;
		} else if (this.minuteValue > 59) {
			this.minuteValue = 59;
		}
	},
	meridiemValueChanged: function(inOld) {
		if (this.meridiemValue === undefined) {
			this.meridiemValue = inOld;
		}
	},
	_isHourModeChanged: function() {
		if (this._isHourMode) {
			// this.$.hourText.applyStyle("color", g.constant.colorPoint);
			// this.$.minuteText.applyStyle("color", "white");
			this._hourView.show();
			this._minuteView.hide();
			this.$.hourPicker.show();
			this.$.minutePicker.hide();
			this.$.minutePicker.setDisabled(true);
			this.$.hourPicker.setDisabled(false);
		} else {
			// this.$.hourText.applyStyle("color", "white");
			// this.$.minuteText.applyStyle("color", g.constant.colorPoint);
			this._hourView.hide();
			this._minuteView.show();
			this.$.hourPicker.hide();
			this.$.minutePicker.show();
			this.$.hourPicker.setDisabled(true);
			this.$.minutePicker.setDisabled(false);
		}

		this.$.hourText.addRemoveClass("active", this._isHourMode);
		this.$.minuteText.addRemoveClass("active", !this._isHourMode);
	},
	_changeHourMode: function(isHour) {
		if (this._isHourMode!=isHour) {
			this.set("_isHourMode", isHour);
		}
	},
	_changeMeridiemMode: function() {
		if (this.meridiemValue=="AM") {
			this.setMeridiemValue("PM");
		} else if (this.meridiemValue=="PM") {
			this.setMeridiemValue("AM");
		}
	},
	eventHandler: enyo.inherit(function(sup) {
		return function(inSender, inEvent) {
			if (inEvent.type == "tap") {
				if (inEvent.originator==this.$.hourText) {
					this._changeHourMode(true);
				} else if (inEvent.originator==this.$.minuteText) {
					this._changeHourMode(false);
				} else if (inEvent.originator==this.$.meridiemText) {
					this._changeMeridiemMode();
				} else if (inEvent.originator==this.$.cancel) {
					this.onCancel();
				} else if (inEvent.originator==this.$.ok) {
					this.onOK();
				}
			}

			return sup.apply(this, arguments);
		};
	}),
	changeEventHandler: function() {
		if (this._isHourMode) {
			this.$.hourPicker.$.knob.setWidth(30);
			this.$.hourPicker.$.knob.$.knob.removeClass("g-big-dot");
			this.setHourValue(this.$.hourPicker.getValue());
		} else {
			this.$.minutePicker.$.knob.setWidth(30);
			this.$.minutePicker.$.knob.$.knob.removeClass("g-big-dot");
			this.setMinuteValue(this.$.minutePicker.getValue());
		}
		return false;
	},
	changingEventHandler: function() {
		if (this._isHourMode) {
			this.$.hourPicker.$.knob.setWidth(50);
			this.$.hourPicker.$.knob.$.knob.addClass("g-big-dot");
			this.setHourValue(this.$.hourPicker.getValue());
		} else {
			this.$.minutePicker.$.knob.setWidth(50);
			this.$.minutePicker.$.knob.$.knob.addClass("g-big-dot");
			this.setMinuteValue(this.$.minutePicker.getValue());
		}
		return false;
	},
	//* @public
	/**
		onOK function is for what to do after OK button is pressed.
	*/
	onOK: function() {
		//override!!
	},
	/**
		onOK function is for what to do after Cancel button is pressed.
	*/
	onCancel: function() {
		//override!!
	}
});
