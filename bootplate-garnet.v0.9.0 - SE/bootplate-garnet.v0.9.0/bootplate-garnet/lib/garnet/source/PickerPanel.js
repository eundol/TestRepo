/** @protected
/**
	_g.PickerItemBase is a picker item.

*/
enyo.kind({
	name: "g.PickerItemBase",
	//* @protected
	mixins: [ "g.ValidationSupport" ],
	classes: "g-picker-item",
	published: {
		//* Title
		title: "",
		/**
            Set to true to add the _selected_ class to the image tile; set to
            false to remove the _selected_ class
        */
		selected: false
	},
	//* @protected
	components: [
		{name: "title", classes: "g-picker-item-title"},
		{classes: "g-picker-item-border"}
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

/**
	_g.PickerItem kind is picker item for sample
**/
enyo.kind({
	name: "g.PickerItem",
	kind: "g.PickerItemBase",
	mixins: ["g.SelectionOverlaySupport"],
	selectionScrimIcon: "../images/ic_check_list.png",
	selectionOverlayVerticalOffset: 60,
	selectionOverlayHorizontalOffset: 80,
	bindings: [
		{from: ".model.item", to: ".title"}
	]
});

//* @public
/**
	_g.PickerPanel is specilized _g.Panel_ contains a picker that support only 1 selection, not multi.
	This panel has neither headerComponents nor footerCompoents.
*/
enyo.kind({
	name: "g.PickerPanel",
	//* @protected
	kind: "g.Panel",
	mixins: ["g.HandlerMappingsSupport", "g.WheelSupport"],
	//* @public
	/**
		Title of PickerPanel
	*/
	title: "",
	//* @protected
	handlers: {
		ondragfinish: "eventHandler"
	},
	handlerMappings: {
		".$.list": "g.DataListHandlers",
		".$.wheel": "g.WheelDataListControllerHandlers",
		".$.pickerTitle": "g.TitleHandlers"
	},
	selection: false,
	multipleSelection: false,
	classes: "g-picker g-layout-absolute-wrapper",
	titleTools: [
		{name: "pickerTitle",kind: "g.Title",content: "Title"}
	],
	components: [
		{
			name: "list",
			kind: "g.DataList",
			scrollerOptions: {thumb: false},
			classes: "g-picker-list",
			components: [
				{ kind:"g.PickerItem" }
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"},
		{from: ".title", to: ".$.pickerTitle.content"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.list.set("selection", this.selection);
			this.$.list.set("multipleSelection", this.multipleSelection);

			if (this.title !== undefined && this.title !== "") {
				this.createComponent(this.titleTools);
				this.$.list.$.header.addClass("g-data-list-header-comp");
			}
		};
	}),
	eventHandler: function(inSender, inEvent) {
		if (inEvent.type === "dragfinish") {
			inEvent.preventTap();
			return true;
		}
		return false;
	},
	//* @public
	/**
		deselect all list items.
	*/
	deselectAll: function() {
		this.$.list.deselectAll();
	},
	/**
		select a list item specified by inIndex.
	*/
	select: function(inIndex) {
		this.$.list.select(inIndex);
	},
	/**
		deselect a list item specified by inIndex.
	*/
	deselect: function(inIndex) {
		this.$.list.deselect(inIndex);
	}
});

g.Picker = g.PickerPanel;
