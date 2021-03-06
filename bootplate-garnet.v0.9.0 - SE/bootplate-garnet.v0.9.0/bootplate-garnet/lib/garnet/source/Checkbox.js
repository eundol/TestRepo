//* @public
/**
	A box that shows or hides a check mark when clicked.
	The onChange event is fired when it is clicked. Use getValue() to fetch
	the checked status.

		{kind: "g.Checkbox", onchange: "checkboxClicked"}

		checkboxClicked: function(inSender) {
			if (inSender.getValue()) {
				this.log("I've been checked!");
			}
		}
*/
enyo.kind({
	name: "g.Checkbox",
	//* @protected
	kind: enyo.Checkbox,
	mixins: [
		"g.ValidationSupport"
	],
	handlers: {
		// prevent double onchange bubble in IE
		onclick: ""
	},
	tag: "div",
	classes: "g-checkbox",
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
