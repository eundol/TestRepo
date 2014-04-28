enyo.kind({
	name: "g.sample.TimePickerPanelSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Time Picker Panel Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "Time Picker Panel", classes: "g-sample-subheader"},
		{
			name: "timepicker",
			kind: "g.TimePickerPanel",
			hourValue: 12,
			minuteValue: 30,
			meridiemValue: "PM",
			onOK: function() {
				this.owner.$.result.setContent("Time is " + this.getHourValue() + " : " + this.getMinuteValue() + " " + this.getMeridiemValue());
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
