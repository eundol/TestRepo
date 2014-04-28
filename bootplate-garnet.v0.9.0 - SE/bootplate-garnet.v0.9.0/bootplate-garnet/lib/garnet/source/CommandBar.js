//* @public
/**
	g.CommandBar is a popup that has one or two buttons.
*/

enyo.kind({
	name: "g.CommandBar",
	//* @protected
	kind: "g.Drawer",
	//* @public
	events: {
		/**
			onCommandCancel is firing when cancel button pressed.
		*/
		onCommandCancel: "",
		/**
			onCommandOk is firing when ok button pressed.
		*/
		onCommandOk: ""
	},
	//* @protected
	open: false,
	orient: "bottom",
	autoHidden: false,
	contentHeight: 72,
	classes: "g-command-bar",
	components: [
		{name: "Cancel", ontap: "cancel", classes: "g-cancel-image"},
		{classes: "g-divider-image"},
		{name: "Done", ontap: "ok", classes: "g-ok-image"}
	],
	cancel: function(inSender, inEvent) {
		this.doCommandCancel(inSender, inEvent);
		return true;
	},
	ok: function(inSender, inEvent) {
		this.doCommandOk(inSender, inEvent);
		return true;
	}
});
