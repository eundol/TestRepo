enyo.kind({
	name: "g.sample.ProgressBarSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Progress Bar Sample", classes: "g-sample-header", ontap: "goBack"},

		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 280px; height: 250px;", components: [
				{content: "Progress Bar: 0 to 100 ", style: "margin-left: 40px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "g.ProgressBar", name: "autoProgress", style:"left: 25px; width: 240px;", progress: 0, max: 100, onProgressBarChanged: "updateProgress"},
				{name: "percentage", style:"font-size: 20px; width: 240px; height:20px; margin: 0px 20px; line-height: 20px; text-align: center; display: inline-block; color: #FFFFFF;", content: "Press Start"},
				{content: "", style: "margin-left: 20px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "g.Button", content:"Start", classes:"g-sample-spaced-button", ontap: "autoValue"},
				{kind: "g.Button", content:"Reset", classes:"g-sample-spaced-button", ontap: "resetValue"},
				{content: "Progress Bar: set value ", style: "margin-left: 20px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "g.ProgressBar", progress: 25, max: 100, style: "margin-top: 10px;"},
				{kind: "g.ProgressBar", progress: 25, bgProgress: 75, max: 100, style: "margin-top: 10px; margin-bottom: 10px;"},
				{content: "", style: "margin-left: 20px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "enyo.Input", placeholder: "Value", value:25, style: "width: 50px;"},
				{kind: "g.Button", content:"Set", classes:"g-sample-spaced-button", ontap: "changeValue"},
				{kind: "g.Button", content:"-", classes:"g-sample-spaced-button", ontap: "decValue"},
				{kind: "g.Button", content:"+", classes:"g-sample-spaced-button", ontap: "incValue"}
			]}
		]}
	],
	changeValue: function(inSender, inEvent) {
		for (var i in this.$) {
			if (this.$[i].kind == "g.ProgressBar" && this.$[i].name !=="autoProgress") {
				this.$[i].animateProgressTo(this.$.input.getValue());
			}
		}
	},
	incValue: function() {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	autoValue: function() {
		this.$.autoProgress.animateProgressTo(100);
	},
	resetValue: function() {
		this.$.autoProgress.setProgress(0);
		this.$.percentage.setContent("Press Start");
	},
	updateProgress: function(inSender, inEvent) {
		var value = Math.round(this.$.autoProgress.getProgress());
		this.$.percentage.setContent(value + " %");
		return false;
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
