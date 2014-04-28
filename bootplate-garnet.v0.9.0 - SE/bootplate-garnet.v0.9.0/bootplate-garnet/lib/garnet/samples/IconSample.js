enyo.kind({
	name: "g.sample.IconSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Icon Sample", classes: "g-sample-header", ontap: "goBack"},

		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 230px; height: 200px;", components: [
				{content: "Icons : ", style: "margin-left: 10px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{tag: "br"},
				{kind: "g.Icon", src: "assets/ic_close.svg", style: "width: 72px; height: 72px;", classes: "g-sample-black-background-color g-sample-margin-right"},
				{kind: "g.Icon", src: "assets/ic_done.svg", disabled: true, style: "width: 72px; height: 72px;", classes: "g-sample-black-background-color g-sample-margin-right"},
				{kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-sample-black-background-color g-sample-margin-right"},
				{tag: "br"},
				{tag: "br"},
				{kind: "g.Icon", src: "assets/ic_close.svg", disabled: true, style: "width: 72px; height: 72px;", classes: "g-sample-margin-right"},
				{kind: "g.Icon", src: "assets/ic_done.svg", style: "width: 72px; height: 72px;", classes: "g-sample-margin-right"},
				{kind: "g.Icon", src: "assets/ic_sample.png", classes: "g-sample-margin-right"}
			]}
		]}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
