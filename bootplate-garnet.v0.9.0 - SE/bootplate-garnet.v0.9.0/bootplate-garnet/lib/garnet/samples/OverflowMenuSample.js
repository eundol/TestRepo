enyo.kind({
	name: "g.sample.OverflowMenuSample",
	kind: "enyo.Scroller",

	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Overflow Menu Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "Overflow Menu", classes: "g-sample-subheader"},
		{style: "position: relative; background-color: #101015; opacity: 0.93;", classes: "g-common-width-height-fit", components: [
			{
				content: "Please tap a title",
				style: "position: absolute; margin-top:60px; text-align: center;"
			},
			{
				name: "overflowMenu",
				kind: "g.OverflowMenuHeader",
				content: "Title long text would be",
				ontap: "showMenu"
			},
			{name: "picker", kind: "g.Popup", components: [
				{style: "background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "position: relative;", components: [
					{name: "pickerPanel", kind: "g.PickerPanel", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, ontap: "onItemSelected"}
				]}
			]}
		]},
		{style: "position: relative; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No item selected yet.", classes: "g-sample-description"}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.pickerPanel.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
		};
	}),
	showMenu: function(inSender, inEvent) {
		this.$.picker.show();
		this.$.result.setContent("Title tapped !!");
		return;
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	onItemSelected: function(inSender, inEvent) {
		var value = inEvent.target.textContent;
		this.$.result.setContent("The " + value+ " is selected.");
		this.$.pickerPanel.deselectAll();
		this.$.picker.hide();
	},
	data: [
		{item: "Favorite"},
		{item: "Family"},
		{item: "Office"},
		{item: "Friends"},
		{item: "Others"}
	]
});
