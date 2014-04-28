enyo.kind({
	name: "g.sample.WheelSliderPanelSample",
	handlers: {
		onChange: "changeEventHandler",
		onChanging: "changingEventHandler"
	},
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Wheel Slider Panel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Wheel Slider Panel", classes: "g-sample-subheader"},
		{style: "position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{
				name: "panel",
				kind: "g.WheelSliderPanel",
				style: "position: relative; border-radius: 50%; background-color: #212121;",
				minimumValue: -100,
				maximumValue: 100,
				stepValue: 10,
				value: 0
			},
			{style: "width: 172px; height: 0px; margin: 30px 74px 0; text-align: center;", components: [
				{tag:"img", src: "assets/ic_context_menu_normal.svg", style: "margin-bottom: 12px;"},
				{content: "Brightness", style: "font-size: 24px; line-height: 27px; margin-bottom: 4px;"},
				{name: "sampleValue", content: "", style: "font-size: 24px; line-height: 27px; margin-bottom: 7px;"},
				{style: "width: 200px, height: 72px;", components: [
					{name: "cancel", kind: "g.IconButton", src: "$lib/garnet/images/ic_close.svg", ontap: "cancel", classes: "g-cancel-image"},
					{name: "ok", kind: "g.IconButton", src: "$lib/garnet/images/ic_done.svg", ontap: "ok", classes: "g-ok-image"}
				]}
			]}
		]},

		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "Not tapped yet.", classes: "g-sample-description"}
		]}
	],
	bindings: [
		{from: ".$.panel.value", to: ".$.sampleValue.content"}
	],
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.sampleValue.setContent(this.$.panel.getValue());
		};
	}),
	cancel: function(inSender, inEvent) {
		this.$.result.setContent("Cancel button tapped !!");
	},
	ok: function(inSender, inEvent) {
		this.$.result.setContent("OK button tapped !!");
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	changingEventHandler: function(inSender, inEvent) {
		this.$.sampleValue.applyStyle("color", "#1DDBD9");
	},
	changeEventHandler: function(inSender, inEvent) {
		this.$.sampleValue.applyStyle("color", "#FFFFFF");
	}
});
