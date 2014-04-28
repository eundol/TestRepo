/*
##   @b LoadingTestApp (g.Loading)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.Loading API according to combination of properties.
#
#    @remark
#        - 2014.  2. 25. Initial created
#		 - 2014.  3.  3. Apply black theme
#		 - 2014.  3. 14. Remove Target Field Scroller
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.Loading",
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
				// Properties list - enyo.Scroller
				{classes: "g-layout-box-inside-circle-no-wheel properties-scroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - speed
						{classes: "property", style: "margin-top:85px; margin-left:27px;", components:[
							{content: "speed[0~] : "},
							{name: "speedValue", kind: "enyo.Input", placeholder : "1", value: 1, selectOnFocus: true, style:"margin-left:6px; width:138px;", oninput: "keyPress"},
						]},
					]},
				]},
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
				// Target Container
				{classes: "g-layout-box-inside-circle-no-wheel target-container-scroller", style: "z-index:9999;",components: [
					{name: "targetContainer", style:"z-index:9999;", components:[
						{name: "startButton", kind: "g.Button", classes: "center middle", style: "margin-top:80px;", ontap: "startLoading", small: true, content: "start"},
						{name: "stopButton", kind: "g.Button", classes: "center middle", style: "margin-top:80px;", ontap: "stopLoading", small: true, content: "stop"},
					]},
				]},
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
		var speedValue = this.$.speedValue.getValue();
		if(!isNaN(speedValue) && speedValue != ""){
			speedValue = parseFloat(speedValue);
		}
		if(!this.$.target){	
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.Loading",
				speed : speedValue,
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - speed : " + speedValue); // log
		this.showTarget();
	},
	
	// apply properties
	applyProp: function(){
		var speedValue = this.$.speedValue.getValue();
		if(!isNaN(speedValue) && speedValue != ""){
			speedValue = parseFloat(speedValue);
		}
		if(this.$.target){
			this.$.target.setSpeed(speedValue);
		}
		enyo.log("[" + this.name + "] apply... - speed : " + this.$.target.getSpeed()); // log
		this.showTarget();
	},
	
/*------ Added Functions ------*/	
	// showPopup
	startLoading: function(){
		if(this.$.target){
			this.$.target.start();
			enyo.log("[" + this.name + "] " + "start loading - speed : " + this.$.target.getSpeed()); // log
			this.$.status.setContent("start");
		}
	},
	stopLoading: function(){
		if(this.$.target){
			this.$.target.stop();
			enyo.log("[" + this.name + "] " + "stop loading - speed : " + this.$.target.getSpeed()); // log
			this.$.status.setContent("stop");
		}
	},
	keyPress: function(){
		this.$.selected.setContent("speed : " + this.$.speedValue.getValue());
	},
/*------------------*/	

	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.speedValue.setValue("");
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