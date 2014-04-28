//* @public
/**
	_g.MultiPickerPanel is specilized _g.Panel_ contains a picker with checkboxes.
	Multiple items can be selectable.
*/
enyo.kind({
	name: "g.MultiPickerPanel",
	//* @protected
	kind: "g.PickerPanel",
	//* @public
	published: {
		/**
			selectedValues is an array for selected items.
		*/
		selectedValues: []
	},
	//* @protected
	classes: "g-multi-picker",
	components: [
		{
			name: "list",
			kind: "g.DataList",
			scrollerOptions: {thumb: false},
			classes: "g-multi-picker-list",
			components: [
				{ kind:"g.PickerItem" }
			],
			footerComponents: []
		},
		{
			name: "MultiPickerPanel",
			kind: "g.Title",
			content: "Title"
		},
		{
			name: "commandbar",
			kind: "g.CommandBar",
			classes: "g-multi-picker-commandbar"
		}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.list.$.footer.addClass("g-picker-footer-comp");

			this.selectedValuesChanged();
		};
	}),
	selectedValuesChanged: function() {
		this.setSelectedValues(this.selectedValues);
	},
	//* @public
	/**
		deselect all list items.
	*/
	deselectAll: function() {
		this.$.list.deselectAll();
	},
	/**
		get selected items.
	*/
	getSelection: function() {
		return this.$.list.get("selected");
	}
});

g.MultiPicker = g.MultiPickerPanel;
