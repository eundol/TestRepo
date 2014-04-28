enyo.kind({
	name: "g.sdet.CheckboxItem",
	mixins: [ "g.ValidationSupport" ],
	published: {
		/**
			The state of the checkbox

			range [true, false]
		*/
		checked: false,
		/**
			If true, checkbox will be displayed on the right side of the checkbox item

			range [true, false]
		*/
		checkboxOnRight: false,
		/**
			When true, button is shown as disabled and does not generate tap

			range [true, false]
		*/
		disabled: false
	},
	events: {
		/**
			Fires when the control is either checked or unchecked.

			_inEvent.checked_ indicates whether the checkbox is currently checked.

			_inEvent.toggledControl_ contains a reference to the CheckboxItem whose
			state toggled. (Note that the originator of this event is actually the
			g.Checkbox_ contained within the CheckboxItem, so use this property to
			reference the CheckboxItem.)
		*/
		onActivate: ""
	},
	//* @protected
	handlers: {
		ontap: "tap",
		onActivate: "decorateActivateEvent"
	},
	classes: "sdet g-item g-checkbox-item",
	components: [
		{name: "client", classes: "sdet g-checkbox-item-label-wrapper"},
		{name: "input", kind: "g.sdet.Checkbox", spotlight: false}
	],
	bindings: [
		{from: ".allowHtml", to: ".$.client.allowHtml"}
	],
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
		this.checkboxOnRightChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.checkedChanged();
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
		this.$.input.setDisabled(this.disabled);
	},
	checkedChanged: function() {
		this.$.input.setChecked(this.getChecked());
	},
	checkboxOnRightChanged: function() {
		this.addRemoveClass("left-handed", !this.getCheckboxOnRight());
	},
	contentChanged: function() {
		this.$.client.setContent(this.getContent());
	},
	tap: function(inSender, inEvent) {
		if (inSender != this.$.input) {
			this.waterfallDown("ontap", inEvent, inSender);
		}
	},
	decorateActivateEvent: function(inSender, inEvent) {
		inEvent.toggledControl = this;
		this.setChecked(this.$.input.getChecked());
		inEvent.checked = this.checked;
	}
});

enyo.kind({
	name: "g.sdet.Checkbox",
	kind: enyo.Checkbox,
	mixins: [
		"g.ValidationSupport"
	],
	handlers: {
		// prevent double onchange bubble in IE
		onclick: ""
	},
	tag: "div",
	classes: "sdet g-checkbox",
	tap: function() {
		if (!this.disabled) {
			this.setChecked(!this.getChecked());
			this.bubble("onchange");
		}
		return !this.disabled;
	},
	dragstart: function() {
		// Override enyo.Input dragstart handler, to allow drags to propagate for Checkbox
	}
});
