/*
##   @b ToastPopupTestApp (g.ToastPopup)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.ToastPopup API according to combination of properties.
#
#    @remark
#        - 2014.  4. 7. Initial created
#
#    @author sunjoong.lee@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.ToastPopup",
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
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel properties-sroller", components: [
					{name: "properties", classes: "properties", components:[
						
						// Property - index
						{classes: "property", style: "margin-top:80px; margin-left:15px;", components:[
							{content: "popupType : "},
							{name: "popupTypeInput", kind: "enyo.Input", placeholder: "Input popupType", oninput:"popupTypeInput",
								style: "width:160px; height:20px; font-size:12px; color:black; margin-left:5px;"}
							],
						},
					]},
				]},
/*------------------*/
				// Selected
				{classes: "selected", components:[
					{content: "Input popupType", classes: "selected-title"},
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
			
		//get effectValue
		var popupType = this.$.popupTypeInput.getValue();
		
		if(!this.$.target){
			this.$.targetContainer.createComponent({
				
				name: "target",
				style: "margin-top:70px; margin-left:30px;",
				components: [
					{
						name: "toastPopupButton",
						kind: "g.Button",
						style: "width: 250px;",
						classes: "g-sample-popup-button center middle",
						ontap: "showPopup",
						content: "Click here to popup!"
					},
					{
						name: "toastPopup",
						kind: "g.ToastPopup",
						popupType: popupType,
						content: "Created just for you, the LG G2 phone makes it easier than ever to get connected."
					}
				]
			},{owner:this}).render();
		}
		//this.$.targetContainer.applyStyle('text-align','center');
/*------------------*/
		this.showTarget();
	},
	
	/*------ Added Functions ------*/	
	// Popup Control	
	showPopup: function(inSender, inEvent) {
		if(inSender.name === "toastPopupButton"){
			this.$.toastPopup.show();
			this.$.status.setContent("popup is shown");			
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	/*------------------*/	
	
	// propChanged
	propChanged: function(inSender, inEvent){
/*------ EDIT ------*/

/*------ EDIT ------*/
	},
	
	// apply properties
	applyProp: function(inSender, inEvent){
/*------ EDIT ------*/

/*------------------*/
		this.showTarget();
	},
	
	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
/*------ EDIT ------*/

/*------------------*/
	},
	
	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
/*------ EDIT ------*/

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
});