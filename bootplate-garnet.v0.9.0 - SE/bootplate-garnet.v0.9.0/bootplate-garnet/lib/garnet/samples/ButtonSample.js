enyo.kind({
	name: "g.sample.ButtonSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: #212121;", components: [
			{classes: "g-layout-absolute-center g-sample-setting", style: "width: 280px; height: 230px;", components: [
				{name: "B Button", kind: "g.Button", content: "B", ontap: "buttonTapped"},
				{name: "Button", kind: "g.Button", content: "Button", ontap: "buttonTapped"},
				{name: "B Button Disabled", kind: "g.Button", content: "Disabled", disabled: true, ontap: "buttonTapped"},
				{content: "Fixed Button : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{name: "Fixed Button", kind: "g.Button", content: "Fixed Button", style: "width: 280px;", ontap: "buttonTapped"},
				{content: "Grouped Buttons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
				{kind: "Group", components: [
					{name: "Apple Button", kind: "g.Button", active: true, content: "AAA", ontap: "buttonTapped"},
					{name: "Banana Button", kind: "g.Button", content: "BBB", ontap: "buttonTapped"},
					{name: "Saskatoonberry Button", kind: "g.Button",  content: "CCC", ontap: "buttonTapped"}
				]}
			]}
		]},

		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "g-sample-description"}
		]}
	],
	buttonTapped: function(inSender, inEvent) {
		this.$.result.setContent("&quot;" + inSender.name + "&quot; pressed.");
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});