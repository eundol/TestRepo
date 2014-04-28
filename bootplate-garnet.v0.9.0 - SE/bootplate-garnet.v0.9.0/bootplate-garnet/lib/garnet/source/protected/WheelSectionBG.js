//* @protected
enyo.kind({
	name: "g.WheelSectionBG",
	//* @public
	published: {
		expanded: false,
		open: true
	},
	//* @protected
	classes: "g-wheel-index-bg",
	components: [
		{
			name: "svg",
			tag: "svg",
			classes: "g-wheel-index-bg-svg",
			attributes: {
				x: "0",
				y: "0",
				width: "320px",
				height: "320px"
			},
			components: [
				{
					name: "shrinked",
					tag: "path",
					attributes: {
						xmlns: "http://www.w3.org/2000/svg",
						fill: "#3C3E3E",
						d: "M0,0v320h320V0H0z M160,294c-74.007,0-134-59.993-134-134C26,85.995,85.993,26,160,26s134,59.995,134,134  C294,234.007,234.007,294,160,294z"
					}
				},
				{
					name: "expanded",
					tag: "path",
					attributes: {
						display: "none",
						xmlns: "http://www.w3.org/2000/svg",
						fill: "#3C3E3E",
						d: "M0,0v320h320V0H0z M160,286c-69.589,0-126-56.411-126-126C34,90.412,90.411,34,160,34 c69.59,0,126,56.412,126,126C286,229.589,229.59,286,160,286z"
					}
				},
				{name: "group", tag: "g", attributes: {
					display: "none",
					opacity: "0.1"
				}},
				{name: "shrinkedGuide1", tag: "rect", attributes: {
					x: "-66.772",
					y: "159.498",
					transform: "rotate(0 160 160)",
					fill: "#7A7A7A",
					width: "93",
					height: "1"
				}},
				{name: "shrinkedGuide2", tag: "rect", attributes: {
					x: "-66.772",
					y: "159.498",
					transform: "rotate(135 160 160)", // 138 -> 129
					fill: "#7A7A7A",
					width: "93",
					height: "1"
				}},
				{name: "expandedGuide1", tag: "rect", attributes: {
					x: "-66.772",
					y: "159.498",
					transform: "rotate(0 160 160)",
					fill: "#7A7A7A",
					width: "100",
					height: "1"
				}},
				{name: "expandedGuide2", tag: "rect", attributes: {
					x: "-66.772",
					y: "159.498",
					transform: "rotate(135 160 160)", // 138 -> 129
					fill: "#7A7A7A",
					width: "100",
					height: "1"
				}}

			]
		}
	],
	create: function() {
		this.inherited(arguments);

		for (var i = 0; i < 360; i = i + 3) {
			// var i = 0;
			this.$.group.createComponent(
				{tag: "rect", attributes: {
					x: "-66.772",
					y: "159.498",
					transform: "rotate(" + i + " 160 160)",
					fill: "#FFFFFF",
					width: "100",
					height: "1"
				}}
			);
		}

		this.expandedChanged();
	},
	expandedChanged: function() {
		if (this.expanded) {
			this.$.expanded.setAttribute("display", "");
			this.$.expandedGuide1.setAttribute("display", "");
			this.$.expandedGuide2.setAttribute("display", "");
			this.$.group.setAttribute("display", "");
			this.$.shrinked.setAttribute("display", "none");
			this.$.shrinkedGuide1.setAttribute("display", "none");
			this.$.shrinkedGuide2.setAttribute("display", "none");
		} else {
			this.$.expanded.setAttribute("display", "none");
			this.$.expandedGuide1.setAttribute("display", "none");
			this.$.expandedGuide2.setAttribute("display", "none");
			this.$.group.setAttribute("display", "none");
			this.$.shrinked.setAttribute("display", "");
			this.$.shrinkedGuide1.setAttribute("display", "");
			this.$.shrinkedGuide2.setAttribute("display", "");
		}
	},
	openChanged: function() {
		this.stopJob("show");
		if (this.open) {
			this.startJob("show", this._show, 1000);
		} else {
			this.setShowing(false);
		}
	},
	_show: function() {
		this.setShowing(true);
	}
});
