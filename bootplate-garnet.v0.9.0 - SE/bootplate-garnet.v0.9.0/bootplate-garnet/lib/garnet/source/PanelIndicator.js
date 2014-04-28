//* @public
/**
	__g.PageIndicator__ shows the current page index.
*/
enyo.kind({
	name: "g.PanelIndicator",
	published: {
		/**
			current enabled indicator index
		*/
		index: 0,
		/**
			Default number of indicators
		*/
		count: 5,
		/**
			Whether show the indicator over the compoenent, or not
			defulat is true.
		*/
		open : true,
		/**
			Default display time of toast

			range [integer] example) 1000,2000 (ms).. etc
		*/
		duration: 2000
	},
	//* @protected
	handlers: {
		onStartPanelAnimation: "onStartPanelAnimation",
		onEndPanelAnimation: "onEndPanelAnimation"
	},
	_clientHeight: 0,
	_animating: false,
	classes: "g-panel-indicator",
	tools: [
		{name: "client", kind: "ToolDecorator", classes: "g-panel-indicator-decorator"},
		{name: "showHideAnimator", kind: "g.StyleAnimator", onComplete: "animationComplete"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			this.createComponents(this.tools);
			this._createIndicators();
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.updateClientHeight();
			this.indexChanged(0);
			// this.countChanged(5);
			this.openChanged(true);
			this.durationChanged(2000);
			this._animating = true;
		};
	}),
	indexChanged: function(inOld) {
		if (this.index === undefined) {
			this.index = inOld;
		} else {
			this.$.client.children[inOld] && this.$.client.children[inOld].removeClass("current");
			this.$.client.children[this.index] && this.$.client.children[this.index].addClass("current");
		}
	},
	countChanged: function(inOld) {
		if (this.count === undefined) {
			this.count = inOld;
		} else {
			this.$.client.destroyClientControls();
			this._createIndicators();
			this.render();
		}
	},
	openChanged: function(inOld) {
		if (this.open === undefined) {
			this.open = inOld;
		} else {
			if (!this.open) {
				this._hide();
			} else if (this.open) {
				if (this.open && this._clientHeight !== 0) {
					this.stopJob("hide");
					this.startJob("hide", this._hide, this.duration);
				}
				this._show();
			}
		}
	},
	durationChanged: function(inOld) {
		if (this.duration === undefined) {
			this.duration = inOld;
		}
	},
	onStartPanelAnimation: function() {
		this._animating = false;
		this._show(true);
		this._animating = true;
	},
	onEndPanelAnimation: function() {
		this.stopJob("hide");
		this.startJob("hide", this._hide, this.duration);
	},
	updateClientHeight: function() {
		var bounds = this.getBounds();

		if (bounds !== undefined && bounds.height !== undefined && bounds.top !== undefined) {
			this._clientHeight = bounds.height + bounds.top;
		}
	},
	_createIndicators: function() {
		for (var i = 0; i < this.count; i++) {
			this.$.client.createComponent({kind: "Control", classes: "g-panel-indicator-icon" + ((this.index == i)?" current":"")});
		}
	},
	_hide: function() {
		this._transition(false);
	},
	_show: function() {
		this._transition(true);
	},
	_transition: function(isOpen) {
		if (this._animating) {
			if (isOpen) {
				this.$.showHideAnimator.play(this.createShowAnimation(isOpen).name);
			} else {
				this.$.showHideAnimator.play(this.createHideAnimation(isOpen).name);
			}
		} else {
			var translate3dSet = {
					open: {translate3d: "0, 0, 0"},
					close: {translate3d: "0, -" + this._clientHeight + "px, 0"}
				},
				translate3d = translate3dSet[this.open ? "open" : "close"];

			enyo.dom.transform(this, translate3d);
		}
	},
	createShowAnimation: function(isOpen) {
		var translate3dSet = {
				open: "translate3d(0, 0, 0)",
				close: "translate3d(0, -" + this._clientHeight + "px, 0)"
			};

		return this.$.showHideAnimator.newAnimation({
			name: "show",
			duration: 500,
			timingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
			keyframes: {
				0: [
					{control: this, properties: { "-webkit-transform": translate3dSet.close }}
				],
				100: [
					{control: this, properties: { "-webkit-transform": translate3dSet.open }}
				]
			}
		});
	},
	createHideAnimation: function(isOpen) {
		var translate3dSet = {
				open: "translate3d(0, 0, 0)",
				close: "translate3d(0, -" + this._clientHeight + "px, 0)"
			};

		return this.$.showHideAnimator.newAnimation({
			name: "hide",
			duration: 500,
			timingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
			keyframes: {
				0: [
					{control: this, properties: { "-webkit-transform": translate3dSet.open }}
				],
				100: [
					{control: this, properties: { "-webkit-transform": translate3dSet.close }}
				]
			}
		});
	}
});
