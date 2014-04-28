//* @public
/**
	_g.IconButton_ is an icon that acts like a button.
	The icon image is specified by setting the _src_ property to a URL.

	If you want to combine an icon with text inside a button,
	use an <a href="#g.Icon">g.Icon</a> inside an <a href="#g.Button">g.Button</a>.

	The image associated with the _src_ property is assumed	to be a 48-144 pixel strip,
	with 3 parts indicating button's status below (in order from top to bottom.)

		1st: normal
		2nd: pressed
		3rd: disabled

	If the image has differenct size (for example, 60x180), style of this object must be set properly.
*/
enyo.kind({
	name: "g.IconButton",
	//* @protected
	kind: "g.ButtonIconBase",
	//* @public
	published: {
		/**
			The image used for a icon button.
		*/
		src: ""
	},
	//* @protected
	_srcHeight: "",
	_active: false,
	_node: null,
	classes: "g-icon-button",
	rendered: enyo.inherit(function(sup) {
		return function() {
			this.srcChanged("");
			this._node = this.hasNode();
			this._srcHeight = parseInt(enyo.dom.getComputedStyleValue(this._node, "height"), 10) || 48;
			sup.apply(this, arguments);
		};
	}),
	srcChanged: function(inOld) {
		if (this.src === undefined) {
			this.src = inOld;
		} else if (this.src !== "") {
			this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
		}
	},
	getSrc: function() {
		return this.src;
	},
	_effectActive: function() {
		this._moveSrc();
	},
	_effectDisabled: function() {
		this._moveSrc();
	},
	_effectPressed: function() {
		this._moveSrc();
	},
	addClass: enyo.inherit(function(sup) {
		return function(inClass) {
			if (inClass === "active") {
				this._active = true;
				this._moveSrc();
			} else {
				sup.apply(this, arguments);
			}
		};
	}),
	removeClass: enyo.inherit(function(sup) {
		return function(inClass) {
			if (inClass === "active") {
				this._active = false;
				this._moveSrc();
			} else {
				sup.apply(this, arguments);
			}
		};
	}),
	_moveSrc: function() {
		var distance = 0;
		if (this.disabled) {
			distance += 2;
		} else if (this.pressed || this._active) {
			distance += 1;
		}
		if (distance === 0) {
			this.applyStyle("background-position", null);
		} else {
			this.applyStyle("background-position", "0 -" + (this._srcHeight * distance) + "px");
		}
	}
});
