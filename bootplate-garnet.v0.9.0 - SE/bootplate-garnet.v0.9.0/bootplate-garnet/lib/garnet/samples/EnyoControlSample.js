enyo.kind({
	name: "g.sample.EnyoControlSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample enyo-children-middle",
	components: [
		{content: "Enyo Control Sample", classes: "g-sample-header"},
		{content: "Button", classes: "g-sample-subheader"},
		{kind: "Button", content: "Gabel"},
		{kind: "Button", content: "Gabelllishisnous"},
		{kind: "Button", components: [
			{kind: "Image", src: "assets/search.png", style: "padding-right: 4px;"},
			{content: "Label"}
		]},
		//
		{content: "Grouped Buttons", classes: "g-sample-subheader"},
		{kind: "Group", highlander: true, defaultKind: "Button", components: [
			{content: "Stay", active: true},
			{content: "Go"},
			{content: "Stay or Go"}
		]},
		//
		{content: "Checkbox", classes: "g-sample-subheader"},
		{tag: "label", components: [
			{kind: "Checkbox"},
			{tag: "span", content: "Gas Valve"}
		]},
		{tag: "label", components: [
			{kind: "Checkbox", checked: true},
			{tag: "span", content: "Main Power"}
		]},
		//
		{content: "Grouped Checkboxes", classes: "g-sample-subheader"},
		{kind: "Group", highlander: true, components: [
			{tag: "label", components: [
				{kind: "Checkbox", checked: true},
				{tag: "span", content: "Stay"}
			]},
			{tag: "label", components: [
				{kind: "Checkbox"},
				{tag: "span", content: "Go"}
			]},
			{tag: "label", components: [
				{kind: "Checkbox"},
				{tag: "span", content: "Stay or Go"}
			]}
		]},
		//
		{content: "Input", classes: "g-sample-subheader"},
		{tag: "span", name: "defalt", content: "someValue", classes: "data"},
		{tag: "button", content: "value =>", ontap: "setValueTap"},
		{kind: "Input", value: "initial"},
		{tag: "button", content: "value =>", ontap: "getValueTap"},
		{tag: "span", name: "value", content: "&nbsp;", classes: "data"},
		//
		{content: "Checkbox", classes: "g-sample-subheader"},
		{tag: "span", name: "checkDefault", content: "truthy", classes: "data"},
		{tag: "button", content: "value =>", ontap: "setCheckValueTap"},
		{name: "valueCheckbox", kind: "Checkbox", checked: "true"},
		{tag: "button", content: "value =>", ontap: "getCheckValueTap"},
		{tag: "span", name: "checkValue", content: "&nbsp;", classes: "data"},
		//
		{content: "ToolDecorator", classes: "g-sample-subheader"},
		{kind: "ToolDecorator", components: [
			{content: "label", style: "padding: 8px;"},
			{kind: "Input", value: "Goodies and Bits", style: "padding: 8px;"}
		]},
		//
		{content: "ToolDecorator", classes: "g-sample-subheader"},
		{kind: "ToolDecorator", components: [
			{tag: "img", src: "assets/search.png", style: "padding: 4px;"},
			{kind: "Input", value: "Goodies and Bits", style: "width: 300px;"}
		]},
		//
		{content: "Select", classes: "g-sample-subheader"},
		{kind: "Button", ontap: "selectEnyo", content: "Select Best Framework =>"},
		{kind: "Select", components: [
			{value: "enyo", content: "Enyo"},
			{value: "mojo", content: "Mojo"},
			{value: "dojo", content: "Dojo"},
			{value: "jquery", content: "jQuery"}
		]},
		{kind: "Button", content: "value =>", ontap: "getSelectedValue"},
		{tag: "span", name: "selectValue", content: "&nbsp;", classes: "data"}
	],
	//
	getValueTap: function() {
		this.$.value.setContent(this.$.input.getValue());
	},
	setValueTap: function() {
		this.$.input.setValue(this.$.defalt.getContent());
	},
	//
	getCheckValueTap: function(inSender) {
		this.log("getCheckValueTap", inSender.id);
		this.$.checkValue.setContent(this.$.valueCheckbox.getValue());
	},
	setCheckValueTap: function(inSender) {
		this.log("setCheckValueTap", inSender.id);
		this.log(this.$.checkDefault.getContent());
		this.$.valueCheckbox.setValue(this.$.checkDefault.getContent());
	},
	selectEnyo: function() {
		this.$.select.setSelected(0);
	},
	getSelectedValue: function() {
		this.$.selectValue.setContent(this.$.select.getValue() + ", index: " + this.$.select.getSelected());
	}
});
