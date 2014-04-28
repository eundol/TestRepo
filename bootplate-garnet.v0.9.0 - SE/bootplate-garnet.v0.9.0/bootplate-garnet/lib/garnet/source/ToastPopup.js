//* @public
/**
	g.ToastPopup is a popup that showing the message with 3 lines.

	The toast limits the line to show with 3 in maximum
*/
enyo.kind({
	name: "g.ToastPopup",
	//* @protected
	kind: "g.Popup",
	//* @public
	/**
		popupType is for what type of toast will be displayed.
		range ["halfToast", "fullToast"]
	*/
	popupType: "halfToast",
	//* @protected
	classes: "g-toast-popup",
	fullToastComponents: [
		{classes: "g-toast-popup-full", components: [
			{name: "client"}
		]}
	],
	halfToastComponents: [
		{classes: "g-toast-popup-half-container", components:[
			{classes: "g-toast-popup-half-circle", components: [
				{classes: "g-toast-popup-half-text-area", components: [
					{name: "client"}
				]}
			]}
		]}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			var content;

			if (this.popupType !== "halfToast" && this.popupType !== "fullToast") {
				this.popupType = "halfToast";
			}
			content = this.content;
			this.content = undefined;
			this.components = undefined;

			sup.apply(this, arguments);

			if (this.popupType === "halfToast") {
				this.createComponents(this.halfToastComponents);
				this.$.client.setContent(content);
			} else if (this.popupType === "fullToast") {
				this.createComponents(this.fullToastComponents);
				this.$.client.setContent(content);
			}
		};
	})
});
