enyo.kind({
	name: "g.sample.SpinnerSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Spinner Sample", classes: "g-sample-header", ontap: "goBack"},
		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 240px; height: 130px;", components: [
				{kind: "g.Spinner", content: "Loading...", style: "color: #4B4B4B;"}
			]},
		]}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
