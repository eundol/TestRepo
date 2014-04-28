/** @protected
	_g.DataListSupport_ is wheel + event handler module for data list.

**/
g.sample.DataListSupport = {
	name: "g.sample.DataListSupport",
	handlerMappings: {
		".$.list": "g.DataListHandlers",
		".$.wheel": "g.WheelDataListControllerHandlers",
		".$.title": "g.TitleHandlers"
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
				{style: "height: 56px;"},
				{style:"padding-left: 70px;", components: [
					{kind: "g.IconButton", src: "assets/ic_sample.png", classes: "g-sample-margin-right"},
					{kind: "g.IconButton", src: "assets/ic_sample.png", classes: "g-sample-margin-right"},
					{kind: "g.IconButton", src: "assets/ic_sample.png", classes: "g-sample-margin-right"}
				]}
			],
			components: [
				{ontap: "showPopup", components: [
					{name: "listItem", classes: "g-sample-list-item", components: [
						{name: "iconUrl", kind: "g.IconButton", style: "margin-left: 20px;"},
						{name: "albumTitle", classes: "g-sample-list-item-title"},
						{name: "albumGenre", classes: "g-sample-list-item-genre"},
						{tag: "hr", style: "border: 0; color: #2F2F2F; height: 2px; background-color: #2F2F2F; bottom: 0;"}
					]}
				], bindings: [
					{from: ".model.iconUrl", to: ".$.iconUrl.src"},
					{from: ".model.albumTitle", to: ".$.albumTitle.content"},
					{from: ".model.albumGenre", to: ".$.albumGenre.content"}
				]}
			],
			footerComponents: [
				{style:"padding-left: 70px;", components: [
					{kind: "g.IconButton", src: "assets/ic_sample.png", classes: "g-sample-margin-right"},
					{kind: "g.IconButton", src: "assets/ic_sample.png", classes: "g-sample-margin-right"},
					{kind: "g.IconButton", src: "assets/ic_sample.png", classes: "g-sample-margin-right"}
				]},
				{style: "width: 100%; height: 43px;"}
			]
		},
		{
			name: "title",
			kind: "g.Title",
			content: "Title"
		},
		{
			name: "popup",
			kind: "g.ContextualPopup",
			buttonComponents: [
				{
					name: "First button2",
					ontap: "hidePopup",
					src: "assets/ic_context_menu.svg"
				},
				{
					name: "Second button2",
					ontap: "hidePopup",
					src: "assets/ic_context_menu.svg"
				},
				{
					name: "Third button2",
					ontap: "hidePopup",
					src: "assets/ic_context_menu.svg"
				},
				{
					name: "Firth button2",
					ontap: "hidePopup",
					src: "assets/ic_context_menu.svg"
				}
			]
		}
	],
	showPopup: function(inSender, inEvent) {
		this.$.popup.show();
	},
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

/**
	DataListSample is main page.

**/
enyo.kind({
	name: "g.sample.DataListSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "Data List", classes: "g-sample-subheader"},
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
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});
