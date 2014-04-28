/**
	_g.sample.CheckboxItem_ kind is list item kind with checkbox
**/
enyo.kind({
	name: "g.sample.CheckboxItem",
	kind: "g.CheckboxItem",
	mixins: ["g.SelectionOverlaySupport"],
	selectionOverlayVerticalOffset: 60,
	selectionOverlayHorizontalOffset: 20,
	bindings: [
		{from: ".model.albumTitle", to: ".title"}
	]
});

/**
	_g.CheckboxItem_ is a list item for checkable list.

*/
enyo.kind({
	name: "g.CheckboxItem",
	//* @protected
	mixins: [ "g.ValidationSupport" ],
	classes: "g-datalist-checkbox-item",
	//* @public
	published: {
		//* Title
		title: "",
		/**
            Set to true to add the _selected_ class to the image tile; set to
            false to remove the _selected_ class
        */
		selected: false
	},
	components: [
		{name: "title", classes: "checkbox-item-title"},
		{tag: "hr", style: "border: 0; color: #2F2F2F; height: 2px; background-color: #2F2F2F; bottom: 0;"}
	],
	bindings: [
		{from: ".title", to: ".$.title.content"},
		{from: ".title", to: ".$.title.showing", kind: "enyo.EmptyBinding"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.selectedChanged();
		};
	}),
	selectedChanged: function() {
		this.addRemoveClass("selected", this.selected);
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	}

});

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
	_g.sample.CheckableDataListPanel_ is specilized _g.Panel_ contains a list with checkboxes.
	This panel has default headerComponents and footerCompoents.
*/
enyo.kind({
	name: "g.sample.CheckableDataListPanel",
	kind: "g.Panel",
	mixins: ["g.HandlerMappingsSupport", "g.sample.DataListSupport", "g.WheelSupport"],
	//* @protected
	classes: "g-layout-absolute-wrapper",
	selection: false,
	multipleSelection: false,
	components: [
		{
			name: "list",
			kind: "g.DataList",
			scrollerOptions: {thumb: true},
			style: "background-color: #212121;",
			components: [
				{ kind:"g.sample.CheckboxItem" }
			]
		},
		{
			name: "title",
			kind: "g.Title",
			content: "Title"
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.list.set("selection", this.selection);
			this.$.list.set("multipleSelection", this.multipleSelection);
		};
	})
});

/**
	DataListwithCheckboxesSample is main page.

**/
enyo.kind({
	name: "g.sample.DataListwithCheckboxesSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List with Checkboxes Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data List with Checkboxes", classes: "g-sample-subheader"},
		{name: "checkableListPanel", kind: "g.sample.CheckableDataListPanel", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, multipleSelection: true, ontap: "onItemSelected"},
		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No item selected yet.", classes: "g-sample-description"}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.checkableListPanel.collection"}
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
	onItemSelected: function(inSender, inEvent) {
		if (inEvent.originator.parent.selected) {
			this.$.result.setContent("The " + inEvent.index + " th item in the list is selected.");
		} else {
			this.$.result.setContent("The " + inEvent.index + " th item in the list is deselected.");
		}
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
