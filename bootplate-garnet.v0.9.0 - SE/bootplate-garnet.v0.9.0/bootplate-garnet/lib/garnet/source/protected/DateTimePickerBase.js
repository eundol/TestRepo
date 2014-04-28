//* @protected
/**
	_g.DateTimePickerBase_ is a base kind implementing fuctionality shared
	by [g.DatePicker](#g.DatePicker) and [g.TimePicker](#g.TimePicker).
	It is not intended to be used directly.
*/
enyo.kind({
	name: "g.DateTimePickerBase",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	defaultKind: "enyo.Control",
	//* @public
	published: {
		//* Text to be displayed in the _currentValue_ control if no item is
		//* currently selected
		noneText: "",
		/**
			The locale (in IETF format) used for picker formatting.

			This setting only applies when the _ilib_ library is loaded.

			* When ilib is not present, US English (en-US) formatting is applied.

			* When ilib is present and _locale_ is set to the default value (_null_),
			the picker uses ilib's current locale (which ilib tries to determine
			from the system).

			* When ilib is present and an explicit _locale_ is provided, that locale
			will be used (regardless of ilib's current locale).

			_locale_ may be changed after the picker is created, in which case the
			picker will	be reformatted to match the new setting.

		*/
		locale: "",
		/**
			The value, expressed as a standard JavaScript Date object. When a Date object
			is passed to _set("value")_, the control is updated to reflect the new
			value. _get("value")_ returns a Date object.
		*/
		value: undefined,
		/**
			When true, the picker uses a 12-hour clock (this value is ignored when ilib
			is loaded, since the meridiem will be set by the current locale)
		*/
		meridiemEnable: false
	},
	events: {
		/**
			Fires when the value changes.

			_inEvent.name_ contains the name of this control.

			_inEvent.value_ contains a standard JavaScript Date object representing
			the current value.
		*/
		onChange: ""
	},
	//* @protected
	handlers: {
		//* Handler for _onChange_ events coming from constituent controls
		onChange: "handleChangeEvent",
		ondown: "downEvent"
	},
	iLibFormatType: null, // set in subkind
	defaultOrdering: null, // set in subkind
	classes: "g-date-picker",
	components: [
		{name: "currentValue", classes: "g-date-picker-current-value", content: ""}
	],
	create: function() {
		this.inherited(arguments);
		this.createComponent({kind: "enyo.Signals", onlocalechange: "handleLocaleChangeEvent"});
		this.initDefaults();
	},
	initILib: function() {
		var fmtParams = {
			type: this.iLibFormatType,
			timezone: "local",
			length: "full"
		};
		if (this.locale) {
			fmtParams.locale = this.locale;
			this.iLibLocale = null;
		} else {
			this.iLibLocale = ilib.getLocale();
		}
		this._tf = new ilib.DateFmt(fmtParams);
	},
	initDefaults: function() {
		var ordering;
		this.value = this.value || new Date();
		//Attempt to use the ilib lib (assuming that it is loaded)
		if (typeof ilib !== "undefined") {
			this.initILib();
			ordering = this._tf.getTemplate();
		} else {
			ordering = this.defaultOrdering;
		}
		this.setupPickers(ordering);
		this.noneTextChanged();
	},
	setupPickers: function(ordering) {
		// implement in subkind, calling this.inherited() at the end
		this.pickers = this.getClientControls();
	},
	formatValue: function() {
		// implement in subkind
	},
	handleChangeEvent: function(inSender, inEvent) {
		if (inEvent && inEvent.originator === this) {
			// Don't handle our own change events
			return;
		} else {
			this.updateValue(inSender, inEvent);
			return true;
		}
	},
	updateValue: function(inSender, inEvent) {
		// implement in subkind
	},
	valueChanged: function(inOld) {
		this.setChildPickers(inOld);
		if (this.value) {
			this.doChange({name:this.name, value:this.value});
		}
	},
	setChildPickers: function(inOld) {
		// implement in subkind
	},
	// If no item is selected, uses _this.noneText_ as current value.
	noneTextChanged: function() {
		if (this.value == null) {
			this.$.currentValue.setContent(this.getNoneText());
		} else {
			this.$.currentValue.setContent(this.formatValue());
		}
	},
	localeChanged: function() {
		// Our own locale property has changed, so we need to rebuild our child pickers
		this.refresh();
	},
	handleLocaleChangeEvent: function() {
		// We've received a localechange event from the system, which means either the system
		// locale or the timzezone may have changed.
		if (ilib && ilib.getLocale() !== this.iLibLocale) {
			// We're using iLib locale, and it has changed, so we'll rebuild the child pickers entirely
			this.refresh();
		} else {
			// We don't care about the iLib locale or it hasn't changed, but timezone might have changed,
			// so we'll just update the child pickers
			this.setChildPickers();
		}
	},
	refresh: function() {
		// -> ?????
		this.destroyClientControls();
		// -> ?????
		this.pickers = null;
		if (this._tf) {
			delete this._tf;
		}
		this.initDefaults();
		this.render();
	},
	downEvent: function(inSender, inEvent) {
		this.down(inSender, inEvent);
		return true;
	}
});
