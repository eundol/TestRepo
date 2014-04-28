//* @protected
/**
	_g.ContextualPopupButton is the button used for a contextual popup.
*/
enyo.kind({
	name: "g.ContextualPopupButton",
	kind: "g.IconButton",
	classes: "g-popup-contextual-button"
});

//* @public
/**
	_g.ContextualPopup_ is contextual popup which has maximum 3 icon buttons.
*/
enyo.kind({
	name: "g.ContextualPopup",
	//* @protected
	kind: "g.Popup",
	//* @public
	published: {
		/**
			When false, _closeButton_ is hidden; when true, it is shown.
		*/
		showCloseButton: true
	},
	/**
		Default kind of buttonComponents is <a href="#g.IconButton">g.IconButton</a>.
		User can define maximun 3 icon buttons on buttonComponents.

		>ex) buttonComponents: [{name: "1st", src: "assets/icon1.png"}, {name: "2nd", src: "assets/icon2.png"}]
	*/
	buttonComponents: [],
	//* @protected
	tools: [
		{name: "closeButton", kind: "g.IconButton", src: "$lib/garnet/images/ic_close.svg", classes: "g-popup-close", ontap: "closeContextual", showing: false}
	],
	classes: "g-popup-contextual g-layout-absolute-wrapper",
	centered: true,
	floating: true,
	handlers: {
		onflick: "preventDrag",
		ondragstart: "preventDrag",
		ondrag: "preventDrag"
	},
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			if (this.buttonComponents) {
				// maximun button count is 4
				var max = 4;
				if (this.buttonComponents.length > max) {
					var bc = this.buttonComponents.slice(0, max);
					this.buttonComponents = bc;
				}

				// create button components
				var hc = enyo.constructorForKind(this.kind).prototype.buttonComponents,
					hcOwner = (hc == this.buttonComponents) ? this : this.getInstanceOwner(),
					iconSize = 84,
					margin = 10,
					space = iconSize + margin;

				if (this.buttonComponents.length == 2) {
					space = iconSize + 26;
					this.addClass("two-buttons");
				}

				this.createComponent({
					name: "box",
					defaultKind: "g.ContextualPopupButton",
					style:
						"top: " + (
							parseInt(this.buttonComponents.length / 4, 10) ?
							33 :  // 4 butons
							101 // 1~3 buttons
						) + "px; " +
						"width: " + (
							(this.buttonComponents.length % 4 * space) + // 1~3 buttons
							parseInt(this.buttonComponents.length / 4, 10) * 2 * space // 4 butons
						) + "px; " +
						" height: " + (
							space + // 1~3 buttons
							parseInt(this.buttonComponents.length / 4, 10) * space // 4 buttons
						) + "px; " +
						"margin: 0 auto; left: 0; right: 0;"
				});

				this.$.box.createComponents(this.buttonComponents, {owner: hcOwner});
			}
		};
	}),
	initComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.createComponents(this.tools, {owner: this});
			this.showCloseButtonChanged();
		};
	}),
	showCloseButtonChanged: function(inOld) {
		if (this.showCloseButton === undefined) {
			this.showCloseButton = inOld;
		}
	},
	showingChanged: function() {
		this.inherited(arguments);

		if (this.showing) {
			this._configCloseButton();
		}
	},
	preventDrag: function() {
		return true;
	},
	//* Removes focus style from _closeButton_ and hides the _moon.Popup_.
	closeContextual: function(inSender, inEvent) {
		if (this.$.closeButton) {
			this.$.closeButton.removeClass("pressed");
		}
		this.hide();
	},
	//* Determines whether to display _closeButton_.
	_configCloseButton: function() {
		if (!this.$.closeButton) { return; }

		if (this.showCloseButton != this.$.closeButton.getShowing()) {
			this.$.closeButton.setShowing(this.showCloseButton);
			this.addRemoveClass("reserve-close", this.showCloseButton);
			if (this.generated) {
				this.resized();
			}
		}
	}
});
