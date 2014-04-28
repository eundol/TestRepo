/*
##   @b PanelIndicatorTestApp (g.PanelIndicator)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.PanelIndicator API according to combination of properties.
#
#    @remark
#        - 2014.  4.  7. Initial created
#
#    @author ykh815.yoo@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.PanelIndicator",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			// {kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9999; pointer-events: none;"},
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
				{classes: "g-layout-box-inside-circle-no-wheel properties-scroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - disable
						{kind: "enyo.Table", name: "propTable", style: "margin-top:55px; margin-left:23px;", components:[
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "width:141px; border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "index"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "indexVal", kind: "enyo.Input", placeholder : "0 [integer]", value: "0", style: "margin-left:5px; width:100px;", selectOnFocus: true},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "count"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "countVal", kind: "enyo.Input", placeholder : "5 [integer]", value: "5", style: "margin-left:5px; width:100px;", selectOnFocus: true},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "open"},
								]},
								{kind: "enyo.TableCell", components:[
									{kind: "Group", onActivate: "", components: [
										{name: "open_true", kind: "enyo.Checkbox", content: "true", checked: true, style: "margin-left: 5px;", onchange: "propChanged",},
										{name: "open_false", kind: "enyo.Checkbox", content: "false", style: "margin-left: 10px;", onchange: "propChanged",}
									]},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "duration"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "durationVal", kind: "enyo.Input", placeholder : "2000 [integer]", value: "2000", style: "margin-left:5px; width:100px;", selectOnFocus: true},
								]},
							]},
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
	
	// render target
	renderTarget: function(inSender, inEvent){
/*------ EDIT ------*/
		var indexValue = this.$.indexVal.getValue();
		var countValue = this.$.countVal.getValue();
		var openValue = (this.$.open_true.getChecked()? true : false);
		var durationValue = this.$.durationVal.getValue();

		if(!this.$.target){
			this.$.targetContainer.createComponent({
				name: "target",
				kind: "g.PanelSet",
				effect: "slide-horizontal",
				style: "position: relative; background-color: #101015; opacity: 0.93;",
				components: [
					{kind: "g.Panel", components: [
						{kind: "g.Title", content: "One", style: "width: 100%;"},
						{kind: "g.PanelIndicator", 
						 index: indexValue, 
						 count: countValue, 
						 open: openValue, 
						 duration: durationValue},
						{content: "Panel 1", style: "line-height: 320px; text-align: center;"}
					]},
					{kind: "g.Panel", components: [
						{kind: "g.Title", content: "Two", style: "width: 100%;"},
						{kind: "g.PanelIndicator", index: 1, count: 4, open: true, duration: 1000},
						{content: "Panel 2", style: "line-height: 320px; text-align: center;"}
					]},
					{kind: "g.Panel", components: [
						{kind: "g.Title", content: "Three", style: "width: 100%;"},
						{kind: "g.PanelIndicator", index: 2, count: 4, open: true, duration: 500},
						{content: "Panel 3", style: "line-height: 320px; text-align: center;"}
					]},
					{kind: "g.Panel", components: [
						{kind: "g.Title", content: "Four", style: "width: 100%;"},
						{kind: "g.PanelIndicator", index: 3, count: 4, open: true, duration: 2000},
						{content: "Panel 4", style: "line-height: 320px; text-align: center;"}
					]}
				]
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - index : " + indexValue); // log
		enyo.log("[" + this.name + "] render... - count : " + countValue); // log
		enyo.log("[" + this.name + "] render... - open : " + openValue); // log
		enyo.log("[" + this.name + "] render... - duration : " + durationValue); // log
/*------------------*/
		this.showTarget();
	},
	
	// propChanged
	propChanged: function(inSender, inEvent){
		if(this.$.target){
			switch(inSender.name){
				case 'open_true' : this.$.target.setSmall(true); break;
				case 'open_false' : this.$.target.setSmall(false); break;
			}
		}
		this.updateSelected(inSender, inEvent);
	},
	
	// apply properties
	applyProp: function(){
/*------ EDIT ------*/
		enyo.log("[" + this.name + "] apply... - small : " + this.$.target.getSmall()); // log
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
		this.$.indexVal.setValue("0");
		this.$.countVal.setValue("5");
		this.$.open_true.setChecked(true)
		this.$.durationVal.setValue("2000");
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
});