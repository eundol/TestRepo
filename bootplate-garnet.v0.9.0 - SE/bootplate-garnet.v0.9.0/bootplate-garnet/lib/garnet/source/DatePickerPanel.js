//* @protected
enyo.kind({
	name: "g.DateLabel",
	kind: "enyo.Control",
	published: {
		value: 0,
		min: 0,
		max: 0
	},
	bindings: [
		{from: ".value", to: ".content", transform: function (v) { return ("00" + v).slice(-this.digits); }}
	],
	digits: 2,
	valueChanged: function() {
		if (this.value > this.max) {
			this.setValue(this.max - 1);
		} else if (this.value < this.min) {
			this.setValue(this.min);
		}
	}
});

//* @protected
/**
	_g.DatePicker is a control that can display--or allow the selection of--a
	day expressed in month, day, year.

		{kind: "g.DatePicker", content: "Day", onChange: "changed"}

	Set the _value_ property to a standard JavaScript Date object
	to initialize the picker, or to change it programmatically at runtime.
*/
enyo.kind({
	name: "g.DatePicker",
	kind: "g.DateTimePickerBase",
	published: {
		/**
			Optional minimum year value. Must be specified using the Gregorian
			calendar, regardless of the calendar type used by the specified locale.
		*/
		minYear: 1900,
		/*
			Optional maximum year value. Must be specified using the Gregorian
			calendar, regardless of the calendar type used by the specified locale.
		*/
		maxYear: 2099,
		/**
			When true, the picker uses a 12-hour clock. (This value is ignored when
			_ilib_ is loaded, since the meridiem will be set by the current locale.)
		*/
		//* Optional label for hour
		yearText: g.$L("year"),			// year label in g.DatePicker widget
		//* Optional label for minute
		monthText: g.$L("month"),		// month label in g.DatePicker widget
		//* Optional label for meridiem
		dayText: g.$L("day")	// day label in g.DatePicker widget
	},
	//*@protected
	iLibFormatType: "date",
	defaultOrdering: "Mdy",
	curPicker: null,
	isChanging: false,
	yearOffset: 0,
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.$.month.addClass("selected");
		this.$.curPicker = this.$.month;
		this.createComponents([
			{name: "cancel", kind: "g.IconButton", classes: "g-cancel-image"},
			{name: "ok", kind: "g.IconButton", classes: "g-ok-image"}
		]);
	},
	initILib: function() {
		this.inherited(arguments);
		var time = this.value.getTime();
		var gregYear = new ilib.Date.newInstance({type: "gregorian", unixtime: time, timezone:"UTC"}).getYears();
		var localeYear = new ilib.Date.newInstance({type: this._tf.getCalendar(), unixtime: time, timezone:"UTC"}).getYears();
		this.yearOffset = gregYear - localeYear;
	},
	setupPickers: function(ordering) {
		var orderingArr = ordering.split("");
		var doneArr = [];
		var o, f, l, digits;
		for (f = 0, l = orderingArr.length; f < l; f++) {
			o = orderingArr[f];
			if (doneArr.indexOf(o) < 0) {
				doneArr.push(o);
			}
		}

		for (f = 0, l = doneArr.length; f < l; f++) {
			o = doneArr[f];

			switch (o) {
			case 'd':
				digits = (ordering.indexOf("dd") > -1) ? 2 : null;
				this.createComponent(
					{classes: "g-date-picker-wrap day", components:[
						{
							name: "day",
							kind: "g.DateLabel",
							wrap: true,
							min: 1,
							max: this.monthLength(this.value.getFullYear(), this.value.getMonth()),
							value: this.value.getDate(),
							itemHeight: 78,
							classes: "g-date-picker-field"
						}
					]});
				break;
			case 'M':
				digits = (ordering.indexOf("MM") > -1) ? 2 : null;
				this.createComponent(
					{classes: "g-date-picker-wrap month", components:[
						{
							name: "month",
							kind: "g.DateLabel",
							wrap: true,
							min: 1,
							max: 12,
							value: this.value.getMonth()+1,
							itemHeight: 78,
							classes: "g-date-picker-field"
						}
					]});
				break;
			case 'y':
				this.createComponent(
					{classes: "g-date-picker-wrap year", components:[
						{
							kind: "g.DateLabel",
							name: "year",
							value: this.value.getFullYear() - this.yearOffset,
							min: this.minYear - this.yearOffset,
							max: this.maxYear - this.yearOffset,
							digits: 4,
							itemHeight: 78,
							classes: "g-date-picker-field"
						}
					]});
				break;
			default:
				break;
			}
		}
		this.$.currentValue.setShowing(false);
		this.inherited(arguments);
	},
	updateValue: function(inSender, inEvent) {
		var day = this.$.day.getValue(),
			month = this.$.month.getValue()-1,
			year = this.$.year.getValue() + this.yearOffset;

		var maxDays = this.monthLength(year, month);
		this.setValue(new Date(year, month, (day <= maxDays) ? day : maxDays));
	},
	setChildPickers: function(inOld) {
		var updateDays = inOld &&
			(inOld.getFullYear() != this.value.getFullYear() ||
			inOld.getMonth() != this.value.getMonth());
		this.$.year.setValue(this.value.getFullYear() - this.yearOffset);
		this.$.month.setValue(this.value.getMonth()+1);

		if (updateDays) {
			this.$.day.setMax(this.monthLength(this.value.getFullYear(), this.value.getMonth()));
		}
		this.$.day.setValue(this.value.getDate());
	},
	down: function(inSender, inEvent) {
		if (inEvent.originator==this.$.cancel) {

		} else if (inEvent.originator==this.$.ok) {

		} else if (inSender.controls[0].name == "day" || inSender.controls[0].name == "month" || inSender.controls[0].name == "year") {
			this.$.day.removeClass("selected");
			this.$.month.removeClass("selected");
			this.$.year.removeClass("selected");
			inSender.controls[0].addClass("selected");
			this.$.curPicker = inSender.controls[0];
		}
	},
	changeCurPickerValue: function(val) {
		if (this.$.curPicker !== undefined && !this.isChanging) {
			this.isChanging = true;
			var newVal = this.$.curPicker.getValue()+val;
			var diff = this.$.curPicker.max - this.$.curPicker.min + 1;
			if (newVal > this.$.curPicker.max) {
				newVal -= diff;
			} else if (newVal < this.$.curPicker.min) {
				newVal += diff;
			}
			this.$.curPicker.setValue(newVal);
			this.isChanging = false;
		}
	},
	//* Returns number of days in a particular month/year.
	monthLength: function(inYear, inMonth) {
		return 32 - new Date(inYear, inMonth, 32).getDate();
	}
});

//* @public
/**
	_g.DatePickerPanel is specilized _g.Panel_ contains a date picker.
*/
enyo.kind({
	name: "g.DatePickerPanel",
	kind: "g.Panel",
	//* @public
	published: {
		/**
			Current locale used for formatting (only valid when ilib is loaded).
			May be set after control creation, in which case the control will be
			updated to reflect the new value.

			range [String] ex: "en-US, ko-KR ..."
		*/
		locale: "",
		/**
			The current date as a standard JavaScript Date object. When a Date object
			is passed to _set("value")_, the control is updated to reflect the new
			value. _get("value")_ returns a Date object.

			Format examples of a standard JavaScript Date object.
			> new Date("2001/2/3")

			> new Date("2001.2.3")

			> new Date(2001,**1**,3) // month value range: 0~11

			range [Object]
		*/
		value: null
	},
	//* @protected
	handlers: {
		ondown: "eventHandler",
		onhold: "eventHandler",
		ondragstart: "eventHandler",
		ondrag: "eventHandler",
		ondragfinish: "eventHandler",
		ontap: "eventHandler",
		onWheelPickerChange: "onWheelPickerChange",
		onWheelPickerReleased: "onWheelPickerReleased"
	},
	enableWheelEvent: true,
	_lastWheelPickerValue: 0,
	// classes: "",
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.innerComponents = this.components || this.kindComponents;
			this.components = this.kindComponents = null;

			sup.apply(this, arguments);

			// create a picker component
			this.createComponent({
				name: "picker",
				kind: "g.DatePicker",
				locale: this.locale,
				value: this.value,
				classes: "g-layout-absolute-center"
			});
			new enyo.Binding({source: this, target: this.$.picker,
				from: ".locale", to: ".locale", oneWay: false});
			if (this.value === null) {
				this.value = new Date();
			}
			new enyo.Binding({source: this, target: this.$.picker,
				from: ".value", to: ".value", oneWay: false});

			// create a wheel controller component
			this.createComponent({
				name: "wheelController",
				kind: "g.WheelPickerController"
			});
		};
	}),
	eventHandler: enyo.inherit(function(sup) {
		return function(inSender, inEvent) {
			if (!this.enableWheelEvent) {
				return false;
			}

			if (inEvent.type === "tap" && inEvent.originator.name === "cancel") {
				this.onCancel();
			} else if (inEvent.type === "tap" && inEvent.originator.name === "ok") {
				this.onOK();
			}

			var control = this.$.wheelController;
			if (control) {
				if (control.dispatch(control.handlers["on"+inEvent.type], inEvent, inSender) === true)
				{
					return true;
				}
			}

			return sup.apply(this, arguments);
		};
	}),
	localeChanged: function(inOld) {
		if (this.locale === undefined) {
			this.locale = inOld;
		}
	},
	valueChanged: function(inOld) {
		if (this.value === undefined) {
			this.value = inOld;
		}
	},
	onWheelPickerChange: function(inSender, inEvent) {
		var diff = inEvent.value - this._lastWheelPickerValue;
		if (diff !== 0) {
			this.$.picker.changeCurPickerValue(diff);
			this._lastWheelPickerValue = inEvent.value;
		}
	},
	onWheelPickerReleased: function() {
		this._lastWheelPickerValue = 0;
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
