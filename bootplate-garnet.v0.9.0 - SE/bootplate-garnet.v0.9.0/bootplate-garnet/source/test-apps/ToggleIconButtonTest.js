/*
##   @b ToggleIconButtonTestApp (g.ToggleIconButton)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.ToggleIconButton API according to combination of properties.
#
#    @remark
#        - 2014.  2. 24. Initial created
#        - 2014.  3.  3. Apply black theme
#        - 2014.  3. 14. Apply "g.sdet.CheckboxItem"
#
#    @author ykh815.yoo@lgepartner.com
#
#    @version 0.2
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.ToggleIconButton",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
		ontap: "updateSelected",
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
						{classes: "property", style: "margin-top:80px; margin-left:25px; position: absolute", components:[
							{content: "active : "},
							{kind: "Group", onActivate: "", components: [
								{name: "active_true", kind: "g.sdet.CheckboxItem", content: " true", style: "margin-left: 7px; float:left"},
								{name: "active_false", kind: "g.sdet.CheckboxItem", content: " false", checked: true, style: "margin-left: 95px; float:left"}
							]},
						]},
						// Property - value
						{classes: "property", style: "margin-top:110px; margin-left:25px; position: absolute", components:[
							{content: "value : "},
							{kind: "Group", onActivate: "", components: [
								{name: "value_true", kind: "g.sdet.CheckboxItem", content: " true", style: "margin-left: 7px; float:left"},
								{name: "value_false", kind: "g.sdet.CheckboxItem", content: " false", checked: true, style: "margin-left: 95px; float:left"}
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
	
	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
/*------ EDIT ------*/
		if(inEvent.originator.kind == 'enyo.Checkbox'){
			selected.setContent(inEvent.originator.name + " selected");
			enyo.log("[" + this.name + "] " + inEvent.originator.name + " selected"); // log
		}else{
			enyo.log("[" + this.name + "] " + inEvent.originator.name + " selected");
		}
/*------------------*/
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
/*------ EDIT ------*/
		var activeValue = (this.$.active_true.getChecked() ? true : false);
		var deactivate = (activeValue ? false : true);
		var buttonValue = (this.$.value_true.getChecked() ? true : false);

		if(!this.$.toggleIconButton_target){
			this.$.targetContainer.createComponent({
				name: "target", components:[{
					kind: "Group", onActivate:"iconGroupActivated", components: [{
						name : "targetButton",
						kind: "g.ToggleIconButton",
						src: "assets/icon-like.png",
						style : "margin-top:30px;",
						active : activeValue,
						ontap: "updateStatus",
					}, {
						name : "groupButton",
						kind: "g.ToggleIconButton",
						src: "assets/icon-list.png",
						style : "margin-top:30px;",
						active : deactivate,
						ontap: "updateStatus",
					}]
				},{
					name : "toggleButton",
					kind: "g.ToggleIconButton",
					src: "assets/icon-close-button.png",
					style : "margin-top:30px;",
					value : buttonValue,
					ontap: "updateStatus",
				}]
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - active : " + activeValue); // log
/*------------------*/
		this.showTarget();
	},
	
	// apply properties
	applyProp: function(){
/*------ EDIT (just log, you can make annotation) ------*/
		enyo.log("[" + this.name + "] apply... - active : " + this.$.target.getActive()); // log
/*------------------*/
		this.showTarget();
		this.$.properties.ontap = "";
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
		switch(inEvent.originator.name){
			case 'active_true' : this.$.toggleIconButton_targetButton.setActive(true); break;
			case 'active_false' : this.$.toggleIconButton_groupButton.setActive(true); break;
			case 'value_true' : this.$.toggleIconButton_targetButton.setValue(true); break;
		}
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
