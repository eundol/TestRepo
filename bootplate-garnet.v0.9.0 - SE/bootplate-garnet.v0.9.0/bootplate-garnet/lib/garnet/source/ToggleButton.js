//* @public
/**
	_g.ToggleButton_, which extends [g.Button](#g.Button), is a button
	with two states, "on" and "off".  When the ToggleButton is tapped, it switches
	its state and fires an _onChange_ event.
*/
enyo.kind({
	name: "g.ToggleButton",
	//* @protected
	kind: "g.Button",
	//* @public
	published: {
		/**
			Boolean indicating whether the button is currently in the "on" state

			range [true, false]
		*/
		value: false,
		/**
			Label for toggle button's "on" state

			range [string]
		*/
		onContent: g.$L("On"),
		/**
			Label for toggle button's "off" state

			range [string]
		*/
		offContent: g.$L("Off"),
		/**
			Label for a separator between a text label(content) and an on/off state label(onContent/offContent)

			range [string]
		*/
		labelSeparator: g.$L(": ")
	},
	events: {
		/**
			Fires when the user changes the value of the toggle button,	but not
			when the value is changed programmatically.

			_inEvent.value_ contains the value of the toggle button.
		*/
		onChange: ""
	},
	//* @protected
	_prefix: "",
	classes: "g-button g-toggle-button",
	rendered: enyo.inherit(function(sup) {
		return function() {
			this._prefix = (this.content)? this.content : "";
			this.value = this.active = Boolean(this.value || this.active);
			if (this.value === undefined) {
				this.value = this.active = false;
			}
			this.onContentChanged(g.$L("On"));
			this.offContentChanged(g.$L("Off"));
			this.labelSeparatorChanged(g.$L(": "));
			this._updateContent();
			sup.apply(this, arguments);
		};
	}),
	activeChanged: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._updateValue();
		};
	}),
	valueChanged: function(inOld) {
		if (this.value === undefined) {
			this.value = inOld;
		} else {
			this.setActive(this.value);
		}
	},
	onContentChanged: function(inOld) {
		if (this.onContent === undefined) {
			this.onContent = inOld;
		} else {
			this._updateContent();
		}
	},
	offContentChanged: function(inOld) {
		if (this.offContent === undefined) {
			this.offContent = inOld;
		} else {
			this._updateContent();
		}
	},
	labelSeparatorChanged: function(inOld) {
		if (this.labelSeparator === undefined) {
			this.labelSeparator = inOld;
		} else {
			this._updateContent();
		}
	},
	_updateStatus: function() {
		this.setActive(!this.active);
	},
	_updateValue: function() {
		this.value = this.active;
		this._updateContent();
		if (!this.disabled) {
			this.doChange({value: this.value});
		}
	},
	_updateContent: function() {
		this._postfix = (this.active) ? this.onContent : this.offContent;
		this.setContent("");
		this.setContent((this._prefix || "") + (this.labelSeparator || ((this._prefix && this._postfix)? " ": "")) + (this._postfix || ""));
	},
	_effectActive: function() {
		this.addRemoveClass("active", this.active);
	}
});
