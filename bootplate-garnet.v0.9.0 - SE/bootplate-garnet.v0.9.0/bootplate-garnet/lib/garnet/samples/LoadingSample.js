enyo.kind({
	name: "g.sample.LoadingSample",
	kind: "enyo.Scroller",
	handlers: {
		ontap: "buttonTapped"
	},
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Loading Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Loading with 80px width", classes: "g-sample-subheader"},
		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 80px; height: 80px;", components: [
				{name: "loading", kind: "g.Loading", speed: 0.6}
			]}
		]},

		{content: "Loading with 320px width", classes: "g-sample-subheader"},
		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{name: "loading2", kind: "g.Loading", speed: 0.6}
		]},
		{tag: "br"},

		{content: ": Tap 'START' or 'STOP' buttons to show/hide a loading control", classes: "g-sample-description"},
		{name: "start", kind: "g.Button", style: "margin: 0px 30px;", ontap: "buttonTapped", content: "Start", disabled: true},
		{name: "stop", kind: "g.Button", style: "margin: 0px 30px;", ontap: "buttonTapped", content: "Stop"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.loading.start();
			this.$.loading2.start();
		};
	}),
	buttonTapped: function(inSender, inEvent) {
		if (inSender.name === "start") {
			this.$.start.setDisabled(true);
			this.$.stop.setDisabled(false);
			this.$.loading.start();
			this.$.loading2.start();
		}
		else if (inSender.name === "stop") {
			this.$.start.setDisabled(false);
			this.$.stop.setDisabled(true);
			this.$.loading.stop();
			this.$.loading2.stop();
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
