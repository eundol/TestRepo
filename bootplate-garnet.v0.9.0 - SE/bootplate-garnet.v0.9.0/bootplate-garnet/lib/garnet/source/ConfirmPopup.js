//* @public
/**
	_g.ConfirmPopup_ consists of Icon, Title, Contents and Ok/Cancel button.

	Icon and Ok/Cancel button is optional.
*/
enyo.kind({
	name: "g.ConfirmPopup",
	kind: "g.Popup",
	//* @public
	published: {
		/**
			iconSrc is image source url of Icon. If iconSrc is not set, popup doesn't have Icon.

			range [String] ex) iconSrc: "assets/icon-album.png"
		*/
		iconSrc: ""
	},
	/**
		Cancel, OK buttons. If you define your buttons, Cancel, OK button are replaced with your buttons.
		Up to 2 buttons can be added.
	*/
	buttonComponents: [
		{name: "cancel", kind: "g.IconButton", ontap: "cancel", classes: "g-cancel-image"},
		{name: "ok", kind: "g.IconButton", ontap: "ok", classes: "g-ok-image"}
	],
	events: {
		/**
			onPopupCancel is firing when cancel button is pressed.
		*/
		onPopupCancel: "",
		/**
			onPopupOk is firing when ok button is pressed.
		*/
		onPopupOk: ""
	},
	//* @protected
	handlers: {
		onScrollStop: "scrollstop",
		onflick: "preventDrag",
		ondragstart: "preventDrag",
		ondrag: "preventDrag"
	},
	centered: true,
	floating: true,
	classes: "g-confirm-popup g-layout-box-inside-circle",
	tools: [
		{name: "icon", kind: "g.Icon", src: "", classes: "g-confirm-popup-icon"},
		{name: "client", classes: "g-confirm-popup-client"},
		{name: "buttonContainer", classes: "g-confirm-popup-button-container"}
	],
	//* @protected
	create: enyo.inherit(function(sup) {
		return function() {
			// maximun button count is 2
			var max = 2;
			if (this.buttonComponents.length > max) {
				var bc = this.buttonComponents.slice(0, 2);
				this.buttonComponents = bc;
			}

			sup.apply(this, arguments);
		};
	}),
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.contentComponents = this.components || this.kindComponents;
			this.components = this.kindComponents = null;
			this.createComponents(this.tools);
			this.$.client.createComponents(this.contentComponents, {owner: this.getInstanceOwner()});
			this.$.buttonContainer.createComponents(this.buttonComponents, {owner: this});

			sup.apply(this, arguments);

			this.iconSrcChanged();
		};
	}),
	iconSrcChanged: function(inOld) {
		if (this.iconSrc === undefined) {
			this.iconSrc = inOld;
		}
		this.$.icon.setSrc(this.iconSrc);
	},
	preventDrag: function() {
		return true;
	},
	cancel: function(inSender, inEvent) {
		this.doPopupCancel(inSender, inEvent);
		return true;
	},
	ok: function(inSender, inEvent) {
		this.doPopupOk(inSender, inEvent);
		return true;
	}
});

