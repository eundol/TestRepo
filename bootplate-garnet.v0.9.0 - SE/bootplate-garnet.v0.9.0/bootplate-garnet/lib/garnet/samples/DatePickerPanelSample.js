enyo.kind({
	name: "g.sample.DatePickerPanelSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Date Picker Panel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Date Picker Panel", classes: "g-sample-subheader"},
		{
			kind: "g.DatePickerPanel",
			locale: "en-US",
			style: "position: relative; border-radius: 50%; background-color: #212121;",
			onOK: function() {
				this.owner.$.result.setContent("Date is " + this.getValue());
			},
			onCancel: function() {
				this.owner.$.result.setContent("Cancel!");
			}
		},
		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button selected yet.", classes: "g-sample-description"}
		]}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
