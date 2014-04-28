//* @public
/**
	_g.DataListHandlers_ handles defined events.
	It can be used as a list handler for list in handlerMappings.
*/
g.DataListHandlers = {
	onWheelDataListMove: "eventHandler"
};
/**
	_g.DataIndexListHandlers_ handles defined events.
	It can be used as a list handler for index list in handlerMappings.
*/
g.DataIndexListHandlers = {
	onSectionChanged: "eventHandler"
};

//* @protected
enyo.kind({
	name: "g.DataListEventDelegate",
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
	_g.DataList_ is an <a href="#enyo.DataList">enyo.DataList</a> with
	garnet styling applied.  It uses <a href="#g.Scroller">g.Scroller</a>
	as its default scroller.
*/
enyo.kind({
	name: "g.DataList",
	//* @protected
	kind: "enyo.DataList",
	mixins: [
		"g.ValidationSupport"
	],
	delegateKind: "g.DataListEventDelegate",
	noDefer: true,
	controlsPerPage: 100,
	classes: "g-data-list",
	//* @public
	/**
		headerComponents are components go to the top of list.
	*/
	headerComponents: [{classes: "g-data-list-header-comp"}],
	/**
		footerComponents are components go to the bottom of list.
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
	//* @public
	/**
		Jump to the top of list.
	*/
	jumpToTop: function() {
		this.$.scroller.setScrollTop(0);
	},
	//* @protected
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

//*@protected
/**
	Overload the delegate strategy to incorporate measurements for our scrollers
	when they are visible.
*/
(function (enyo, g) {
	var p = g.DataList.delegates.vertical = enyo.clone(enyo.DataList.delegates.vertical);
	enyo.kind.extendMethods(p, {
		_getLastPageSize: function(list) {
			var dc = this.childSize(list),
				lx = this.pageCount(list) - 1,
				pn = this.controlsPerPage(list),
				cn = list.collection.length - lx * pn;
			return dc * cn;
		},
		adjustBuffer: function (list) {
			var pc = this.pageCount(list),
				ds = this.defaultPageSize(list),
				bs = 0, sp = list.psizeProp, ss = list.ssizeProp,
				n = list.$.buffer.node || list.$.buffer.hasNode(), p;
			if (n) {
				if (pc !== 0) {
					for (var i=0; i<pc; ++i) {
						p = list.metrics.pages[i];
						bs += (p && p[sp]) || (i == pc-1 ? this._getLastPageSize(list) : ds);
					}
				}
				list.bufferSize = bs;
				n.style[sp] = bs + "px";
				n.style[ss] = this[ss](list) + "px";
			}
		}
	}, true);
})(enyo, g);
