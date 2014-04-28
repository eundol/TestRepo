//* @protected
enyo.kind({
	name: "g.Drawer",
	//* @protected
	noDefer: true,
	mixins: [
		"g.ValidationSupport"
	],
	_minDuration : 0,
	//* @public
	published: {
		//* The visibility state of the drawer's associated control
		open : true,
		orient : "top",
		contentHeight: 56,
		autoHidden: false,
		/**
			Default display time of toast

			range [1000 or higher in milliseconds] example) 1000,2000 (ms).. etc
		*/
		duration: 1000
	},
	//* @protected
	ignoreWheelControl: true,
	classes: "g-drawer g-common-hw-accelerated",
	tools: [
		{name: "contentContainer", classes: "g-drawer-container", components: [
			{name: "text", classes: "g-drawer-content"}
		]}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			var content = this.content;
			var components = this.components;
			this.content = this.components = undefined;
			sup.apply(this, arguments);

			this.createComponents(this.tools);
			if (content) {
				this.$.text.setContent(content);
			} else if (components) {
				this.$.text.createComponents(components, {owner: this});
			}

			this.openChanged();
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.durationChanged();
			this.openChanged();

			this.applyStyle("height", this.contentHeight + "px");
			this.$.contentContainer.applyStyle("height", this.contentHeight + "px");
		};
	}),
	openChanged: function() {
		var translate3dSet = {
				top: {
					open: {translate3d: "0, 0, 0"},
					close: {translate3d: "0, -" + this.contentHeight + "px, 0"}
				},
				bottom: {
					open: {translate3d: "0, 0, 0"},
					close: {translate3d: "0, " + this.contentHeight + "px, 0"}
				}
			},
			translate3d = (translate3dSet[this.orient])[this.open ? "open" : "close"];

		enyo.dom.transform(this.$.contentContainer, translate3d);

		if (this.autoHidden && this.open) {
			var bounds = this.getBounds();
			if (bounds !== undefined && bounds.height !== undefined) {
				this.startJob("hide", this._hide, this.duration);
			}
		}
	},
	durationChanged: function(inSender, inEvent) {
		if (this.duration <= this._minDuration) {
			this.duration = this._minDuration;
			this.setOpen(false);
		}
	},
	contentChanged: function() {
		if ((this.$.text.content || this.$.text.content === "") && typeof this.content === "string")  {
			this.$.text.setContent(this.content);
		}
	},
	_hide: function() {
		this.setOpen(false);
	}
});
