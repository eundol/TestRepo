enyo.kind({
	name: "g.sample.IconButtonSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Icon Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 255px; height: 230px;", components: [
				{content: "Icon Buttons : ", style: "margin-left: 10px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{tag: "br"},
				{kind: "g.IconButton", style:"margin-right: 10px; height: 72px; width: 72px;", src: "assets/ic_done.svg", ontap: "buttonTapped"},
				{kind: "g.IconButton", style:"margin-right: 10px; height: 72px; width: 72px;", src: "assets/ic_done.svg", disabled: true, ontap: "buttonTapped"},
				{content: "Grouped Icon Buttons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "Group", onActivate:"iconGroupActivated", components: [
					{kind: "g.IconButton", style:"margin-right: 10px; height: 72px; width: 72px;", active: true, src: "assets/ic_done.svg"},
					{kind: "g.IconButton", style:"margin-right: 10px; height: 72px; width: 72px;", src: "assets/ic_done.svg"},
					{kind: "g.IconButton", style:"margin-right: 10px; height: 72px; width: 72px;", src: "assets/ic_done.svg"}
				]}
			]}
		]},
		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "console", content: "No changes yet", classes: "g-sample-description"}
		]}
	],
	buttonTapped: function(inSender, inEvent) {
		var str = '"'+inSender.name+'" ';
		str += 'selected.';
		this.$.console.setContent(str);
	},
	ordinals: ["1st", "2nd", "3rd", "4th"],
	iconGroupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.console.setContent("The " + this.ordinals[selected] + " icon button in the group is selected.");
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
