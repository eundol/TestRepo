/*
##   @b OverflowMenuTestApp (g.OverflowMenu)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.OverflowMenu API according to combination of properties.
#
#    @remark
#        - 2014.  3.  5. Initial created
#
#    @author ykh815.yoo@lgepartner.com
#
#    @version 0.2
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.OverflowMenu",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			// Watch background background - white
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
						// Property - active
						{classes: "property", style: "margin-top:85px; margin-left:25px;", components:[
							{content: "index : "},
							{name: "indexValue", kind: "enyo.Input", placeholder : "0", selectOnFocus: true, style:"margin-left:6px; width:138px;", oninput: "keyPress"},
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
				{classes: "title", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
/*------ EDIT ------*/
				// Target Container
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel target-container-sroller", components: [
					{name: "targetContainer", components:[
					]},
				]},
/*------------------*/
				// Status
				{classes: "status", components:[
					{content: "status", classes: "status-title"},
					{classes: "status-bar"},
					{name: "status", content: "", classes: "status-text"},
				]},
				// Buttons
				{name: "buttonGroupTarget", classes: "button-group", components:[
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
	},
	
	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
/*------ EDIT ------*/
		if(this.$.active_true.getChecked()){
			selected.setContent("active_true" + " selected");
			enyo.log("[" + this.name + "] " + "active_true" + " selected"); // log
		}else{
			selected.setContent("active_false" + " selected");
			enyo.log("[" + this.name + "] " + "active_false" + " selected"); // log
		}
/*------------------*/
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
/*------ EDIT ------*/
		var indexValue = this.$.indexValue.getValue();
		if (indexValue===''){
			indexValue=0;
		}

		if(!this.$.overflowMenu_target){
			this.$.targetContainer.createComponent(
				{
					name: "target",
					kind: "g.OverflowMenu",
					index : indexValue,
					content: indexValue,
					style: "opacity: 0.8; background-color: #EDEDED;"
				},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - index : " + indexValue); // log
/*------------------*/
		this.showTarget();
	},
	
	// apply properties
	applyProp: function(){
/*------ EDIT (just log, you can make annotation) ------*/
		enyo.log("[" + this.name + "] apply... - index : " + this.$.target.getIndex()); // log

		var indexValue = this.$.indexValue.getValue();
		if (indexValue===''){
			indexValue=0;
		}

		this.$.target.setIndex(indexValue);
		this.$.target.setContent(indexValue);
/*------------------*/
		this.showTarget();
		this.$.properties.ontap = "";
	},
	
	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
/*------ EDIT ------*/
		status.setContent("index" + indexValue);
		enyo.log("[" + this.name + "] " + "index" + indexValue); // log
/*------------------*/	
	},
	keyPress: function(){
		this.$.selected.setContent("index : " + this.$.indexValue.getValue());
	},
	
	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.target.destroy();
		this.resetConsoles();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
	},
	
	// change properties
	changeProp: function(inSender, inEvent){
		this.$.properties.ontap = "propActivated";
		this.showProp();
		this.showApplyButton();
	},
	
	// propActivated
	propActivated: function(inSender, inEvent){
/*------ EDIT ------*/
		var indexValue = this.$.indexValue.getValue();
		if (indexValue===''){
			indexValue=0;
		}

		this.$.target.setIndex(indexValue);
		this.$.target.setContent(indexValue);
/*------------------*/	
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
		this.$.status.setContent("");
		this.$.selected.setContent("");
	},
});
