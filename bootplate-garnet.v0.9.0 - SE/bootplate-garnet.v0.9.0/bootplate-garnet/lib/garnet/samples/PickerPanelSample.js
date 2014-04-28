/**
	PickerSample.js
**/
enyo.kind({
	name: "g.sample.PickerPanelSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< PickerPanel Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "PickerPanel", classes: "g-sample-subheader"},
		{style: "position: relative; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "btn1", kind: "g.Button", ontap: "showPopup", content: "Click here!", style: "width: 266px; top: 135px; left :27px;"},
			{name: "picker", kind: "g.Popup", components: [
				{style: "background-color: #212121;position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "pickerPanel", kind: "g.PickerPanel", title: "title", selection: true, ontap: "onItemSelected"}
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
	rendered: function() {
		// default index
		this.$.pickerPanel.select(2);
		this.$.result.setContent("The " + 2 + " th item in the list is selected.");
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "btn1") {
			this.$.picker.show();
		}
	},
	onItemSelected: function(inSender, inEvent) {
		if(inEvent.originator.owner.selected) {
			this.$.result.setContent("The " + inEvent.index + " th item in the list is selected.");
		}else {
			this.$.result.setContent("The " + inEvent.index + " th item in the list is deselected.");
		}

		this.$.picker.hide();
		this.$.btn1.setContent((this.data[inEvent.index]).item);
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
		{item: "Tracey"}
	]
});
