/*
##   @b MultiPickerListPanelTestApp (g.MultiPickerListPanel)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.MultiPickerListPanel API according to combination of properties.
#
#    @remark
#        - 2014.  3. 13. Initial created
#
#    @author ykh815.yoo@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/
g.MultiPickerListHandlers = {
	onCommandCancel: "removeItems",
	onCommandOk: "saveItems"
};

enyo.kind({
	name: "g.Test.MultiPickerListPanel",
	classes: "enyo-unselectable garnet test-app-base",
	kind: "g.Panel",
	handlers: enyo.mixin(
		{
		},
		g.MultiPickerListHandlers
	),
	_page: 0,
	classes: "g-layout-absolute-wrapper",
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			// {kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9997; pointer-events: none;"},
			// Watch background background - black
			{classes: "watch-background black"},

			// Prop Field
			{name: "propField", classes : "prop-field", components:[
				// Title
				{classes: "title", components:[
					{name: "propFieldTitle", classes: "title-text"}
				]},
/*------ EDIT ------*/
				// Properties list - enyo.Scroller
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel properties-sroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property
						{classes: "property", style: "margin-top:85px; margin-left:15px;", components:[
							{content: "g.MultiPickerListPanel's properties value is object"},
						]},
					]},
				]},
/*------------------*/
				// Selected
				{classes: "selected", components:[
					{content: "selected", classes: "selected-title"},
					{classes: "selected-bar"},
					{name: "selected", content: "", classes: "selected-text"},
				]},
				// Buttons
				{name: "buttonGroupProp", classes: "button-group", components:[
					{name: "backToList", classes: "quarter-circle-bottom-left", components:[
						{name: "backToListText", content: "Back", classes: "quarter-circle-bottom-left-text"}
					]},
					{name: "renderTarget", classes: "quarter-circle-bottom-left quarter-circle-bottom-right", ontap: "renderTarget", components:[
						{name: "renderTargetText", content: "Render", classes:"quarter-circle-bottom-right-text"}
					]},
					{name: "applyProp", classes: "quarter-circle-bottom-left quarter-circle-bottom-right visibility-hidden", ontap: "applyProp",components:[
						{name: "applyPropText", content: "Apply", classes:"quarter-circle-bottom-right-text"}
					]},
				]},
			]},

			// Target Field
			{name: "targetField", classes : "target-field visibility-hidden", components:[
				// Title
				{classes: "title", style:"z-index: 9995", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
/*------ EDIT ------*/
				// Target Container
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel target-container-sroller", components: [
					{name: "targetContainer",
					 components:[
					]},
				]},
/*------------------*/
				// Buttons
				{name: "buttonGroupTarget", classes: "button-group", style:"z-index: 9996", components:[
					{name: "resetTarget", classes: "quarter-circle-bottom-left", ontap: "resetTarget", components:[
						{name: "resetTargetText", content: "Reset", classes: "quarter-circle-bottom-left-text resetText"}
					]},
					{name: "changeProp", classes: "quarter-circle-bottom-left quarter-circle-bottom-right", ontap: "changeProp", components:[
						{name: "changePropText", content: "Prop..", classes:"quarter-circle-bottom-right-text"}
					]},
				]},
			]},
		]},
	],

	create: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.propFieldTitle.setContent(this.kindName.replace(".Test","") + " Prop");
		this.$.targetFieldTitle.setContent(this.kindName.replace(".Test",""));
		this.set("collection", new enyo.Collection(this.data));
	},

	// render target
	renderTarget: function(inSender, inEvent){
/*------ EDIT ------*/
		if(!this.$.target){
			new enyo.Binding({source: this, target: this, from: ".collection", to: ".$.multiPickerPanel.collection", oneWay: false});			

			this.$.targetField.createComponent(
				{name: "target", style: "position: relative; border-radius: 50%; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", 
				 components: [

				 	{name: "popupBtn", kind: "g.Button", ontap: "showPopup", content: "Click here!", style: "width: 266px; top: 135px; left :27px;"},
					{name: "picker", kind: "g.Popup", components: [
						{style: "border-radius: 50%; background-color: #212121; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					 		{name: "multiPickerPanel", kind: "g.MultiPickerPanel", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, multipleSelection: true, ontap: "onItemSelected"}
						]}
					]}

				]},{owner:this});
		};
		this.$.target.render();

/*------------------*/
		this.showTarget();
	},
	// Popup Control
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},

	// propChanged
	propChanged: function(inSender, inEvent){
/*------ EDIT ------*/

/*------------------*/
	},

	// apply properties
	applyProp: function(){
/*------ EDIT ------*/

/*------------------*/
		this.showTarget();
	},

	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
/*------ EDIT ------*/
			selected.setContent(inSender.name + " selected");
			enyo.log("[" + this.name + "] " + inSender.name + " selected"); // log
/*------------------*/
	},

	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
/*------ EDIT ------*/
		status.setContent(inSender.getContent() + " pressed");
		enyo.log("[" + this.name + "] " + inSender.getContent() + " pressed"); // log
/*------------------*/
	},

	// reset target
	resetTarget: function(inSender, inEvent){
/*------ EDIT ------*/

/*------------------*/
		this.$.target.destroy();
		this.resetConsoles();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
	},

	// change properties
	changeProp: function(inSender, inEvent){
		this.showProp();
		this.showApplyButton();
	},

	/*--- shift funcitons ---*/
	// showTarget
	showTarget: function(){
		this.$.targetField.removeClass('visibility-hidden');
		this.$.propField.addClass('visibility-hidden');
		enyo.log("[" + this.name + "] " + "show target");
	},
	// showProp
	showProp: function(){
		this.$.targetField.addClass('visibility-hidden');
		this.$.propField.removeClass('visibility-hidden');
		enyo.log("[" + this.name + "] " + "show prop");
	},
	// show apply button
	showApplyButton: function(){
		this.$.applyProp.removeClass('visibility-hidden');
		this.$.renderTarget.addClass('visibility-hidden');
	},
	// show render button
	showRenderButton: function(){
		this.$.applyProp.addClass('visibility-hidden');
		this.$.renderTarget.removeClass('visibility-hidden');
	},
	/*--- etc ---*/
	resetConsoles: function(){
		if(this.$.status){
			this.$.status.setContent("");
		}
		if(this.$.selected){
			this.$.selected.setContent("");
		}
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "popupBtn") {
			//this.$.multiPickerPanel.setClear();
			//var storedValues = this.$.multiPickerPanel.getSelectedValues();

			/*check the items to list*/
			//this.$.multiPickerPanel.setSelect(storedValues);

			this.$.picker.show();
		}
	},
	removeItems: function(inSender, inEvent) {
		this.$.multiPickerPanel.setClear();
		this.$.popupBtn.setContent("No items are selected");
		this.$.picker.hide();
	},
	saveItems: function(inSender, inEvent) {
		var _selections = this.$.multiPickerPanel.getSelection();

		/*print the selected value in result*/
		var selectedItems = "";

		if (_selections.length !== 0) {
			if (_selections.length > 1) { // multi selection
				for(var x=0 ; x<_selections.length ; x++) {
					selectedItems += _selections[x].attributes.item+ "/";
				}
				this.$.popupBtn.setContent(selectedItems);
			}else {
				this.$.popupBtn.setContent(_selections[0].attributes.item);
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
