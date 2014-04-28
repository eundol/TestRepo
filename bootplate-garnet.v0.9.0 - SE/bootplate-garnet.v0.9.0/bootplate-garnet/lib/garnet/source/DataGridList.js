//* @public
/**
	_g.DataGridListHandlers_ handles defined events.
	It can be used as a list handler for grid list in handlerMappings.
*/
g.DataGridListHandlers = {
	onWheelDataListMove: "eventHandler"
};

//* @protected
enyo.kind({
	name: "g.DataGridListEventDelegate",
	list: null,
	eventHandler: function(inSender, inEvent) {
		if (inEvent.type == "onWheelDataListMove") {
			this.list.scrollTo(this.list.getScrollTop() + inEvent.deltaIndex * this.list.delegate.childSize(this.list));
			return true;
		}
		return false;
	}
});

//* @public
/**
	_g.DataGridList_ is an [enyo.DataGridList](#enyo.DataGridList) with
	Garnet visual styling applied.
*/
enyo.kind({
	name: "g.DataGridList",
	//* @protected
	kind: "enyo.DataGridList",
	mixins: [
		"g.ValidationSupport"
	],
	delegateKind: "g.DataGridListEventDelegate",
	noDefer: true,
	allowTransitions: false,
	controlsPerPage: 100,
	classes: "g-data-grid-list",
	//* @public
	/**
		headerComponents are components placed on the top of list.
	*/
	headerComponents: [{classes: "g-data-list-header-comp"}],
	/**
		footerComponents are components placed on the bottom of list.
	*/
	footerComponents: [{classes: "g-data-list-footer-comp"}],
	//* @protected
	create: enyo.inherit(function(sup) {
		return function() {
			this.containerOptions = {
				name: "scroller",
				kind: "g.Scroller",
				horizontal: "hidden",
				vertical: "scroll",
				canGenerate: false,
				classes: "enyo-fit enyo-data-list-scroller",
				components: [
					{name: "header"},
					{name: "active", classes: "active", components: [
						{name: "page1", classes: "page page1"},
						{name: "page2", classes: "page page2"},
						{name: "buffer", classes: "buffer"}
					]},
					{name: "footer"},
					{name: "eventDelegate", kind: this.delegateKind, list: this}
				]
			};

			sup.apply(this, arguments);
			// FIXME: Need to determine whether headerComponents was passed on the instance or kind to get the ownership correct
			if (this.headerComponents) {
				var ownerH = this.hasOwnProperty("headerComponents") ? this.getInstanceOwner() : this;
				this.$.header.createComponents(this.headerComponents, {owner: ownerH});
			}
			if (this.footerComponents) {
				var ownerF = this.hasOwnProperty("footerComponents") ? this.getInstanceOwner() : this;
				this.$.footer.createComponents(this.footerComponents, {owner: ownerF});
			}
		};
	}),
	initComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
		};
	}),
	/**
		Overloaded from base kind to ensure that the container options correctly apply
		the scroller options before instantiating it.
	*/
	initContainer: enyo.inherit(function (sup) {
		return function () {
			var o = enyo.clone(this.get("containerOptions")),
				s = this.get("scrollerOptions");
			if (s) { enyo.mixin(o, s); }
			this.set("containerOptions", o);
			this.set("scrollerOptions", null);
			sup.apply(this, arguments);
		};
	}),
	eventHandler: function(inSender, inEvent) {
		return this.$.eventDelegate.eventHandler(inSender, inEvent);
	},
	scrollTo: function(inY) {
		this.$.scroller.scrollTo(0, inY);
	},
	getScrollTop: function() {
		return this.$.scroller.getScrollTop();
	},
	/**
		Pass in an integer within the bounds of the lists's collection to have it
		scroll to the position of that index in the list.
	*/
	animatedScrollToIndex: function(inIndex) {
		if (inIndex >= 0 && inIndex < this.length) {
			this.scrollTo();
		}
	},
	scrollToPage: function(inPage) {
		this.$.scroller.scrollTo(0, inPage * this.$.scroller.getClientHeight());
	}
});
