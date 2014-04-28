/** @protected
	_g.DataListSupport_ is wheel + event handler module for data list.

**/
g.sample.DataListSupport = {
	name: "g.sample.DataListSupport",
	handlerMappings: {
		// componentName: eventHandlers
		list: "g.DataListHandlers",
		wheel: "g.WheelDataListControllerHandlers",
		title: "g.TitleHandlers"
	},
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			this.createComponent({
				name: "wheel",
				kind: "g.WheelDataListController"
			});
		};
	})
};

/**
	_g.sample.DataListPanel_ is specilized _g.Panel_ contains a list.
	This panel has headerComponents and footerCompoents
*/
enyo.kind({
	name: "g.sample.DataListPanel",
	kind: "g.Panel",
	mixins: ["g.HandlerMappingsSupport", "g.sample.DataListSupport", "g.WheelSupport"],
	//* @protected
	classes: "g-layout-absolute-wrapper",
	components: [
		{
			name: "list",
			kind: "g.DataList",
			scrollerOptions: {thumb: true},
			style: "background-color: #212121;",
			headerComponents: [
			],
			components: [
				{ontap: "showPopup", components: [
					{name: "listItem", classes: "g-sample-list-item", components: [
						{name: "iconUrl", kind: "enyo.Image", style: "width: 320px; height: 320px;"},
						{tag: "hr", style: "border: 0; color: #2F2F2F; height: 2px; background-color: #2F2F2F; bottom: 0;"}
					]}
				], bindings: [
					{from: ".model.iconUrl", to: ".$.iconUrl.src"}
				]}
			],
			footerComponents: [
				{style: "width: 100%; height: 43px;"}
			]
		},
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

/**
	DataListwithCardsSample is main page.

**/
enyo.kind({
	name: "g.sample.DataListwithCardsSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List with Cards Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "Data List with Cards", classes: "g-sample-subheader"},
		{name: "listPanel", kind: "g.sample.DataListPanel", style: "position: relative; display: inline-block; margin-right: 20px;"}
	],
	bindings: [
		{from: ".collection", to: ".$.listPanel.collection"}
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
	data: [
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});
