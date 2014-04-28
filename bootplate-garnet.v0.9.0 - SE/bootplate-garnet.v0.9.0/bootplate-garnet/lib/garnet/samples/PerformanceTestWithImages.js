enyo.kind({
	name: "g.sample.PerformanceTestWithImages",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	icons: [
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"}, // 10

		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"}, // 20

		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"},
		{name: "icon", kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-confirm-popup-icon"} // 30

	],
	tools: [
		{content: "PerformanceTest With 1000 Images", classes: "g-sample-subheader"},
		{name: "button", kind: "g.Button", content: "click", ontap: "buttonTapped"},
		{name: "container", classes: "g-test-container"}
	],
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.contentComponents = this.components || this.kindComponents;
			this.components = this.kindComponents = null;

			// set icons here..
			//

			this.createComponents(this.tools);

			sup.apply(this, arguments);
		};
	}),
	buttonTapped: function(inSender, inEvent) {
		console.time("create images");
		this.$.container.createComponents(this.icons);
		console.timeEnd("create images");

		this.$.container.render();
	}
});