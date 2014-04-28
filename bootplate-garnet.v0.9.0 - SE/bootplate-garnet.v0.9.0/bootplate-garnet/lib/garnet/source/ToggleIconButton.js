//* @public
/**
	_g.ToggleIconButton_ is an icon that acts like a toggle switch. The icon
	image is specified by setting the _src_ property to a URL.

		{kind: "g.ToggleIconButton", src: "images/search.png", ontap: "buttonTap"}

	The image associated with the _src_ property is assumed	to be a 48-288 pixel strip,
	with 6 parts indicating button's status below (in order from top to bottom.)

		1st: normal inactive
		2nd: pressed during inactive
		3rd: disabled as inactive
		4th: normal active
		5th: pressed during active
		6th: disabled as active

	If the image has differenct size (for example, 60x360), style of this object must be set properly.
*/
enyo.kind({
	name: "g.ToggleIconButton",
	//* @protected
	kind: "g.IconButton",
	//* @public
	published: {
		/**
			Boolean indicating whether the button is currently in the "on" state

			range [true, false]
		*/
		value: false
	},
	events: {
		/**
			Fires when the value of the toggle button is changed.
			This event contains 'value' property that has the current value.
		*/
		onChange: ""
	},
	//* @protected
	classes: "g-icon-button",
	rendered: enyo.inherit(function(sup) {
		return function() {
			this.value = this.active = Boolean(this.value || this.active);
			if (this.value === undefined) {
				this.value = this.active = false;
			}
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
	_updateStatus: function() {
		this.setActive(!this.active);
	},
	_moveSrc: function() {
		var distance = (this.active)? 3: 0;
		if (this.disabled) {
			distance += 2;
		} else if (this.pressed) {
			distance += 1;
		}
		if (distance === 0) {
			this.applyStyle("background-position", null);
		} else {
			this.applyStyle("background-position", "0 -" + (this._srcHeight * distance) + "px");
		}
	},
	_updateValue: function() {
		this.value = this.active;
		if (!this.disabled) {
			this.doChange({value: this.value});
		}
	}
});
