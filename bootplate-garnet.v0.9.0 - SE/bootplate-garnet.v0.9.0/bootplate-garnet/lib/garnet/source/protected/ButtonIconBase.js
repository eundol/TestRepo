//* @protected
/**
	_g.ButtonIconBase_, which extends [enyo.ToolDecorator](#Enyo.ToolDecorator),
	is the base kind for Button, ToggleButton, Icon, IconButton, ToggleIconButton.
	_g.ButtonIconBase_ supports _Enyo.Group_ and can handle active status in a group.
*/
enyo.kind({
	name: "g.ButtonIconBase",
	//* @protected
	kind: "enyo.ToolDecorator",
	mixins: ["g.ValidationSupport"],
	//* @public
	published: {
		//* @public
		/**
			Used when the ToggleIconButton is part of an Enyo.Group;
			set to true to indicate that this is the active button in the group.

			range [true, false]
		*/
		active: false,
		/**
			When true, button is shown as disabled and does not generate tap events.
		*/
		disabled: false,
		//* @protected
		/**
			Indicating whether this button/icon is pressed now or net.
		*/
		pressed: false
	},
	//* @protected
	handlers: {
		ondown: "_eventDown",
		onup: "_eventUp",
		onenter: "_eventEnter",
		onleave: "_eventLeave"
	},
	_isInControl: false,
	classes: "",
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.activeChanged(false);
			this.disabledChanged(false);
			this.pressedChanged(false);
		};
	}),
	activeChanged: enyo.inherit(function(sup) {
		return function(inOld) {
			if (this.active === undefined) {
				this.active = inOld;
			} else if (this.disabled) {
				this.active = false;
			} else {
				sup.apply(this, arguments);
				this._effectActive(this.active);
			}
		};
	}),
	disabledChanged: function(inOld) {
		if (this.disabled === undefined) {
			this.disabled = inOld;
		} else if (this.disabled) {
			this.setPressed(false);
		}
		this._effectDisabled(this.disabled);
	},
	pressedChanged: function(inOld) {
		if (this.pressed === undefined) {
			this.pressed = inOld;
		} else if (this.disabled) {
			this.pressed = false;
		} else {
			this._effectPressed(this.pressed);
		}
	},
	_eventDown: function(inSender, inEvent) {
		if (!this.disabled) {
			this._isInControl = true;
			this.setPressed(true);
		}
		return false;
	},
	_eventUp: function(inSender, inEvent) {
		if (!this.disabled && this._isInControl) {
			this._updateStatus();
		}
		this.setPressed(false);
		this._isInControl = false;
		return false;
	},
	_eventEnter: function(inSender, inEvent) {
		if (this._isInControl) {
			this.setPressed(true);
		}
		return false;
	},
	_eventLeave: function(inSender, inEvent) {
		this.setPressed(false);
		this._isInControl = false;
		return false;
	},
	tap: function() {
		if (this.disabled) {
			return true;
		}
		return false;
	},
	_updateStatus: function() {
		this.setActive(true);
	},
	_effectActive: function() {
	},
	_effectDisabled: function() {
	},
	_effectPressed: function() {
	}
});
