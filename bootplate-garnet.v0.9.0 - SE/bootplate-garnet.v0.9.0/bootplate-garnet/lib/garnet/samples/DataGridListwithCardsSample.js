/**
	Sample GridItem
*/
enyo.kind({
	name: "g.sample.GridSampleItem",
	kind: "g.GridListImageItem",
	mixins: ["g.SelectionOverlaySupport"],
	selectionScrimIcon: "../images/watch_big_square_check.png",
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [
		{from: ".model.text", to: ".caption"},
		{from: ".model.url", to: ".source"}
	]
});

/**
	You may create an image grid by adding instances of this kind as components of
	a [g.GridList](#g.GridList). See the latter kind for an example of how
	this may be done.
*/
enyo.kind({
	name: "g.GridListImageItem",
	mixins: [
		"g.ValidationSupport"
	],
	classes: "g-gridlist-imageitem",
	components: [
		{name: "image", kind: "enyo.Image"}
	],
	published: {
		//* The absolute URL path to the image
		source: "",
		//* The primary caption to be displayed with the image
		caption: "",
		/**
            Set to true to add the _selected_ class to the image tile; set to
            false to remove the _selected_ class
        */
		selected: false
	},
	bindings: [
		{from: ".source", to: ".$.image.src"}
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
	_g.DataGridListSupport_ is wheel + event handler module for data grid list.

**/
g.sample.DataGridListSupport = {
	name: "g.sample.DataGridListSupport",
	handlerMappings: {
		".$.list": "g.DataGridListHandlers",
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
	_g.DataGridListPanel is specilized _g.Panel_ contains a grid list.
*/
enyo.kind({
	name: "g.sample.DataGridListPanel",
	kind: "g.Panel",
	mixins: ["g.HandlerMappingsSupport", "g.sample.DataGridListSupport", "g.WheelSupport"],
	//* @protected
	classes: "g-layout-absolute-wrapper",
	style: "width: 320px; height: 320px; background-color: #212121;",
	selection: false,
	multipleSelection: false,
	components: [
		{
			name: "list",
			kind: "g.DataGridList",
			scrollerOptions: {thumb: true},
			spacing: 60,
			style: " background-color: #212121; height: 350px; margin-top:-55px; margin-left: -5px;",
			components: [
				{ kind: "g.sample.GridSampleItem" }
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

enyo.kind({
	name: "g.sample.DataGridListwithCardsSample",
	classes: "enyo-unselectable garnet g-sample",
	kind: "enyo.Scroller",
	components: [
		{content: "< Data Grid List with Cards Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data Grid List with Cards", classes: "g-sample-subheader"},
		{name: "gridList", kind: "g.sample.DataGridListPanel", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true }
	],
	bindings: [
		{from: ".collection", to: ".$.gridList.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set("collection", new enyo.Collection(this.generateRecords()));
		};
	}),
	generateRecords: function () {
		var records	= [],
			idx     = this.index || 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: "assets/photo.png"
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
