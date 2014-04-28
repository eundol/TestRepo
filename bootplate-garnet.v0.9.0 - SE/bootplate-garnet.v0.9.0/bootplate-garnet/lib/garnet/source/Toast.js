//* @public
/**
	g.Toast is a popup that showing the message from down to up direction.
	The display time is set by duration(ms) property.

	The toast limits the line to show with 3 in maximum
*/

enyo.kind({
	name: "g.Toast",
	//* @protected
	kind: "g.Drawer",
	//* @public
	published: {
		/**
			line indicates how many lines in toast
			range [1 ~ 2]
		*/
		line: 2
	},
	//* @protected
	open: false,
	orient: "bottom",
	autoHidden: true,
	contentHeight: 82,
	classes: "g-toast",
	create: enyo.inherit(function(sup) {
		return function() {
			this.components = [
				{components: [
					{classes: "padding-left-top"},
					{classes: "padding-right-top"},

					{classes: "padding-left-bottom"},
					{classes: "padding-right-bottom"},
					{name: "toastText", content: this.content}
				]}
			];

			this.content = undefined;

			sup.apply(this, arguments);

			this.lineChanged();
		};
	}),
	lineChanged: function(inOld) {
		if (this.line === undefined) {
			this.line = inOld;
		} else if (this.line === 1 || this.line === 2) {
			this.addRemoveClass("one-line", (this.line == 1));
		}
	},
	contentChanged: function() {
		if (this.$.toastText && typeof this.content === "string")  {
			this.$.toastText.setContent(this.content);
		}
	}
});
