enyo.kind({
	name: "g.sample.ToggleIconButtonSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toggle Icon Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 260px; height: 230px;", components: [
				{content: "Toggle Icon Buttons : ", style: "margin-left: 10px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{tag: "br"},
				{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_bg.svg", active: true, onChange: "toggleChanged"},
				{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list.svg", onChange: "toggleChanged"},
				{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_bg.svg", disabled: true, onChange: "toggleChanged"},
				{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list.svg", disabled: true, onChange: "toggleChanged"},
				{content: "Grouped Icon Buttons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "Group", onActivate:"iconGroupActivated", components: [
					{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_bg.svg", active: true},
					{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_bg_oi.svg"},
					{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list.svg"},
					{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list_oi.svg"}
				]}
			]}
		]},

		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "console", content: "No changes yet", classes: "g-sample-description"}
		]}
	],
	toggleChanged: function(inSender, inEvent) {
		this.$.console.setContent(inSender.name + " was " + (inSender.getValue() ? " selected." : "deselected."));
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
