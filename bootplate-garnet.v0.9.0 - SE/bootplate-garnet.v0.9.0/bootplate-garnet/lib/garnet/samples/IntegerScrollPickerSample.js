enyo.kind({
	name: "g.sample.IntegerScrollPickerSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Integer Scroll Picker Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Integer Scroll Picker", classes: "g-sample-subheader"},
		{style: "position: relative; width: 50px; background-color: black;", components: [
			{kind: "g.IntegerScrollPicker", value: 0, min: 1, max: 12, digits: 2, onChange: "changed"}
		]},

		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "value", content: "No change yet", classes: "g-sample-description"}
		]}
	],
	changed: function(inSender, inEvent) {
		if (this.$.value) {
			this.$.value.setContent(inEvent.name + " changed to " + inEvent.value);
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
