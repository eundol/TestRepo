/**
	MultiPickerSample.js
**/
enyo.kind({
	name: "g.sample.MultiPickerPanelSample",
	classes: "enyo-unselectable garnet g-sample",
	_selections : 0,
	handlers: {
		onCommandCancel: "removeItems",
		onCommandOk: "saveItems"
	},
	components: [
		{content: "< MultiPickerPanel Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "MultiPickerPanel", classes: "g-sample-subheader"},
		{style: "position: relative; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "btn1", kind: "g.Button", ontap: "showPopup", content: "Click here!", style: "width: 266px; top: 135px; left :27px;"},
			{name: "picker", kind: "g.Popup", components: [
				{style: "background-color: #212121; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "multiPickerPanel", kind: "g.MultiPickerPanel", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, multipleSelection: true, ontap: "onItemSelected"}
				]}
			]}
		]},
		{style: "position: relative; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No item selected yet.", classes: "g-sample-description"}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.multiPickerPanel.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
		};
	}),
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "btn1") {
			this.$.picker.show();
		}
	},
	removeItems: function(inSender, inEvent) {
		this.$.multiPickerPanel.setClear();
		this.$.result.setContent("No items");
		this.$.btn1.setContent("No items are selected");
		this.$.picker.hide();
	},
	saveItems: function(inSender, inEvent) {
		var _selections = this.$.multiPickerPanel.getSelection();

		/*print the selected value in result*/
		var selectedItems = "";

		if (_selections.length !== 0) {
			if (_selections.length > 1) { // multi selection
				for (var x=0 ; x<_selections.length ; x++) {
					selectedItems += _selections[x].attributes.item+ "/";
				}
				this.$.result.setContent(selectedItems+ " is selected");
				this.$.btn1.setContent(selectedItems);
			} else {
				this.$.result.setContent(_selections[0].attributes.item + "is selected");
				this.$.btn1.setContent(_selections[0].attributes.item);
			}
		} else {
			// no item is selected
			this.$.result.setContent("No items");
			this.$.btn1.setContent("No items are selected");
		}
		/*save the selections*/
		var selectedArray = enyo.clone(_selections);
		this.$.multiPickerPanel.setSelectedValues(selectedArray);
		this.$.picker.hide();
	},
	onItemSelected: function(inSender, inEvent) {
	},

	data: [
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"}
	]
});
