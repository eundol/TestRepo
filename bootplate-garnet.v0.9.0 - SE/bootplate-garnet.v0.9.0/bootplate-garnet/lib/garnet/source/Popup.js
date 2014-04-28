//* @public
/**
	_g.Popup_ is the basic popup which has no UI.
*/
enyo.kind({
	name: "g.Popup",
	//* @protected
	kind: "enyo.Popup",
	mixins: [
		"g.ValidationSupport"
	],
	published: {
		/**
			Determines whether a scrim will appear when the dialog is modal.
			Note that modal scrims are transparent, so you won't see them.

			range [true, false]
		*/
		scrimWhenModal: true,
		//* Determines whether or not to display a scrim. Only displays scrims
		//* when floating.
		scrim: false,
		/**
			Optional class name to apply to the scrim. Be aware that the scrim
			is a singleton and you will be modifying the scrim instance used for
			other popups.
		*/
		scrimClassName: "",
		instanceOwned: true
	},
	handlers: {
		onflick: "preventDrag",
		ondragstart: "startScrim",
		ondrop: "hideScrim",
		ondrag: "preventDrag",
		ondragover: "preventDrag",
		ondragout: "preventDrag",
		ondragfinish: "closePopup",
		onhold: "preventEvent",
		onholdpulse: "preventEvent",
		ontap: "preventEvent",
		ondown: "preventEvent",
		onup: "preventEvent",
		onomve: "preventEvent",
		onenter: "preventEvent",
		onleave: "preventEvent",
		onrelease: "preventEvent"
	},
	//* @public
	/**
		popupType is for what type of toast will be displayed.
		range ["", "halfToast", "fullToast"]
	*/
	popupType: "",
	//* @protected
	modal: true,
	centered: true,
	floating: true,
	ignoreWheelControl: true,
	defaultZ: 120,
	classes: "g-popup enyo-unselectable",
	create: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);

			this.initPopupType();
		};
	}),
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.contentComponents = this.components || this.kindComponents;
			this.components = this.kindComponents = null;
			var owner =
				!this.instanceOwned ? this :
				this.hasOwnProperty("components") ? this.getInstanceOwner() : this;
			this.createComponents(this.contentComponents, {owner: owner});
			sup.apply(this, arguments);
		};
	}),
	showingChanged: enyo.inherit(function(sup) {
		return function() {
			if (this.showing) {
				g.Popup.count++;
				this.applyZIndex();
			}
			else {
				if (g.Popup.count > 0) {
					g.Popup.count--;
				}
			}
			this.showHideScrim(this.showing);
			sup.apply(this, arguments);
		};
	}),
	initPopupType: function() {
		if (this.popupType === undefined) {
			this.popupType = "";
		} else if (this.popupType === "fullToast") {
			this.addClass("g-full-toast");
		} else if (this.popupType === "halfToast") {
			this.addClass("g-half-toast");
		}
	},
	showHideScrim: function(inShow) {
		if (this.floating && (this.scrim || (this.modal && this.scrimWhenModal))) {
			var scrim = this.getScrim();
			if (inShow) {
				// move scrim to just under the popup to obscure rest of screen
				var i = this.getScrimZIndex();
				this._scrimZ = i;
				scrim.showAtZIndex(i);
			} else {
				scrim.hideAtZIndex(this._scrimZ);
			}
			enyo.call(scrim, "addRemoveClass", [this.scrimClassName, scrim.showing]);
		}
	},
	getScrimZIndex: function() {
		// Position scrim directly below popup
		return g.Popup.highestZ >= this._zIndex ? this._zIndex - 1 : g.Popup.highestZ;
	},
	getScrim: function() {
		// show a transparent scrim for modal popups if scrimWhenModal is true
		// if scrim is true, then show a regular scrim.
		if (this.modal && this.scrimWhenModal && !this.scrim) {
			return g.scrimTransparent.make();
		}
		return g.scrim.make();
	},
	applyZIndex: function() {
		// Adjust the zIndex so that popups will properly stack on each other.
		this._zIndex = (g.Popup.count * 2) + this.findZIndex() + 1;
		if (this._zIndex <= g.Popup.highestZ) {
			this._zIndex = g.Popup.highestZ + 1;
		}
		if (this._zIndex > g.Popup.highestZ) {
			g.Popup.highestZ = this._zIndex;
		}
		// leave room for scrim
		this.applyStyle("z-index", this._zIndex);
	},
	findZIndex: function() {
		// a default z value
		var z = this.defaultZ;
		if (this._zIndex) {
			z = this._zIndex;
		} else if (this.hasNode()) {
			// Re-use existing zIndex if it has one
			z = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || z;
		}
		if (z < this.defaultZ) {
			z = this.defaultZ;
		}
		this._zIndex = z;
		return this._zIndex;
	},
	preventDrag: function() {
		return true;
	},
	preventEvent: function() {
		return true;
	},
	closePopup: function(inSender, inEvent) {
		inEvent.preventTap();
		var dx = inEvent.dx;
		var dy = inEvent.dy;
		if (dy < 0) {
			dy = -dy;
		}
		if (dy < (g.height / 5)) {
			if (dx > (g.width / 5)) {
				this.hide();
				return true;
			}
		}
		return true;
	},
	protectedStatics: {
		count: 0,
		highestZ: 120
	}
});
