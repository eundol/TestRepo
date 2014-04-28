//* @public
/**
	_g.Button_ is a button with Garnet style.

	_g.Button_ has no default width.
	If no width is set, the length of buttons will be determined by the length of the text in the button,
	and some positioning style(CSS) does not work. If positioning is required, please set width of the button.
*/
enyo.kind({
	name: "g.Button",
	//* @protected
	kind: "g.ButtonIconBase",
	tag: "button",
	classes: "g-button",
	initComponents: enyo.inherit(function(sup) {
		return function() {
			if (!(this.components && this.components.length > 0)) {
				this.createComponent({
					name: "client",
					classes: "g-button-text g-button-client",
					isChrome: true
				});
			}
			sup.apply(this, arguments);
		};
	}),
	//* Override to handle potential child components.
	contentChanged: enyo.inherit(function(sup) {
		return function() {
			if (this.$.client) {
				this.$.client.setContent(this.getContent());
			} else {
				sup.apply(this, arguments);
			}
		};
	}),
	_effectDisabled: function() {
		this.setAttribute("disabled", this.disabled);
	},
	_effectPressed: function() {
		this.addRemoveClass("pressed", this.pressed);
	}
});
