enyo.kind({
	name: "g.sample.WheelPickerControllerSample",
	kind: "enyo.Scroller",
	handlers: {
		onWheelPickerChange: "onChange",
		onWheelPickerReleased: "onReleased"
	},
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Wheel Picker Controller Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Wheel Picker", classes: "g-sample-subheader"},
		{style: "position: relative; width: 320px; height: 320px; border-radius: 50%; background-color: #212121;", components: [
			{name: "wheel1Panel", kind: "g.Panel", components: [
				{classes: "g-layout-absolute-center", style: "text-align: center; width: 320px; height: 240px ", components: [
					{name: "title1", content: "Brightness", classes: "g-common-header-font"},
					{content: "Default"},
					{style: "width: 50px; height: 60px;", classes: "g-layout-absolute-center g-button", components: [
						{name: "wheel1Value", content: "0", classes: "g-sample-wheel-picker-control-value-text", style: "line-height: 60px;"}
					]}
				]}
			]},
			{
				name: "wheel1",
				kind: "g.WheelPickerController"
			}
		]},
		{tag:"br"},
		{content: ": Drag a knob.", classes: "g-sample-description"}
	],
	onChange: function(inSender, inEvent) {
		this.$.wheel1Value.setContent(parseInt(inEvent.value, 10));
	},
	onReleased: function(inSender, inEvent) {
		this.$.wheel1Value.setContent(0);
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
