//* @public
/**
	_g.Notification is a message that showing from up to down direction
*/
enyo.kind({
	name: "g.Notification",
	//* @protected
	noDefer: true,
	mixins: [
		"g.ValidationSupport"
	],
	//* @public
	published: {
		/**
		The visibility state of the drawer's associated control

		range [true, false]
		*/
		open: false
	},
	/**
	duration of notification showting time

	range [0 or higher integer]
	*/
	duration: 5000,
	//* @protected
	classes: "g-notification",
	bindings: [
		{from: ".open", to: ".$.drawer.open", oneWay: false},
		{from: ".duration", to: ".$.drawer.duration", oneWay: false}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			var components = [{
				components: [
					{name: "icon", kind: "g.IconButton", src: this.iconSrc, classes: "g-notification-icon"},
					{content: this.content, classes: "g-notification-title"}
				]
			}];
			delete this.content;

			sup.apply(this, arguments);

			this.createComponent({
				name: "scrim",
				classes: "g-notification-scrim",
				showing: this.open,
				ontap: "closeNotification"
			});
			this.createComponent({
				name: "drawer",
				kind:"g.Drawer",
				open: this.open,
				autoHidden: true,
				contentHeight: 120,
				duration : this.duration,
				classes: "g-notification-drawer",
				components: components
			});
		};
	}),
	openChanged: function(inOld) {
		if (this.open === undefined) {
			this.open = inOld;
		}
		this.$.scrim.setShowing(this.open);
	},
	closeNotification: function() {
		this.setOpen(false);
		return true;
	}
});
