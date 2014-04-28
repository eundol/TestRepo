enyo.kind({
	name: "g.sample.ToggleButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toggle Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 280px; height: 200px;", components: [
				{kind: "g.ToggleButton", value: true, content: "B", ontap: "buttonTapped"},
				{kind: "g.ToggleButton", content: "Btn", ontap: "buttonTapped"},
				{kind: "g.ToggleButton", labelSeparator: "", ontap: "buttonTapped"},
				{kind: "g.ToggleButton", disabled: true, content: "Disabled", ontap: "buttonTapped"},
				{content: "Grouped ToggleButtons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "Group", components: [
					{kind: "g.ToggleButton", active: true, content: "A", ontap: "buttonTapped"},
					{kind: "g.ToggleButton", content: "B", ontap: "buttonTapped"},
					{kind: "g.ToggleButton", content: "C", ontap: "buttonTapped"}
				]}
			]}
		]},

		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "console", content: "No action yet", classes: "g-sample-description"}
		]}
	],
	buttonTapped: function(inSender, inEvent) {
		var str = '"'+inSender.content+'" ';
		str += inSender.getActive() ? 'selected' : 'unselected';
		str += '.';
		this.$.console.setContent(str);
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});