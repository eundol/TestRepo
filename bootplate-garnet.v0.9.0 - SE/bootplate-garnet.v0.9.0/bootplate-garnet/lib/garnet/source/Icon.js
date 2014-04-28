//* @public
/**
	A control that displays an icon. The icon image is specified by setting the *src* property to a URL.

	In Garnet, icons have a size of 48x48 pixels. Since the icon image is applied
	as a CSS background, the height and width of an icon must be set if an image
	of a different size is used.

	>{kind: "g.Icon", src: "images/search.png"}

	When an icon should act like a button, use an <a href="#g.IconButton">g.IconButton</a>.
*/
enyo.kind({
	name: "g.Icon",
	//* @protected
	mixins: ["g.ValidationSupport"],
	//* @public
	published: {
		/**
			URL specifying path to icon image

			range [string]
		*/
		src: "",
		/**
			When true, icon is shown as disabled.

			range [true, false]
		*/
		disabled: false
	},
	//* @protected
	classes: "g-icon",
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.srcChanged("");
			this.disabledChanged(false);
		};
	}),
	srcChanged: function(inOld) {
		if (this.src === undefined) {
			this.src = inOld;
		} else if (this.src !== "") {
			this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
		}
	},
	disabledChanged: function(inOld) {
		if (this.disabled === undefined) {
			this.disabled = inOld;
		}
		this.addRemoveClass("disabled", this.disabled);
	},
	getSrc: function() {
		return this.src;
	}
});
