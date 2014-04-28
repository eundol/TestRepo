/*
##   @b ToastTestApp (g.Toast)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.Toast API according to combination of properties.
#
#    @remark
#        - 2014.  2. 25. Initial created
#		 - 2014.  3.  3. Apply black theme
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.2
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.Toast",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			// {kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9998; pointer-events: none;"},
			// Watch background background - black
			{classes: "watch-background black"},
			// Prop Field
			{name: "propField", classes : "prop-field", components:[
				// Title
				{classes: "title", components:[
					{name: "propFieldTitle", classes: "title-text"}
				]},
				// Properties list - enyo.Scroller
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel properties-sroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - duration
						{classes: "property", style: "margin-top:85px; margin-left:13px;", components:[
							{content: "duration[integer] : "},
							{name: "durationValue", kind: "enyo.Input", placeholder : "3000", value: 3000, selectOnFocus: true, style:"margin-left:6px; width:102px;", oninput: "keyPress"},
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
			{name: "targetField", classes: "target-field visibility-hidden", style: "background-color: #212121;", components:[
				// Title
				{classes: "title", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
				// Target Container
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel target-container-sroller", style: "height:283px", components: [
					{name: "targetContainer", components:[
						{name: "showButton", kind: "g.Button", classes: "center middle", style: "margin-top:80px;", ontap: "showPopup", small: true, content: "show"},
					]},
				]},
				// Status
				{classes: "status", components:[
					{content: "status", classes: "status-title"},
					{classes: "status-bar"},
					{name: "status", content: "", classes: "status-text"},
				]},
				// Buttons
				{name: "buttonGroupTarget", classes: "button-group rotate-90", components:[
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
		var durationValue = this.$.durationValue.getValue();
		if(!isNaN(durationValue) && durationValue != ""){
			durationValue = parseFloat(durationValue);
		}
		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.Toast",
				style: "left: 0; right: 0; top: 238px;",
				content: "Hi, This is Toast. 안녕 나는 토스트야. 嗨，我是烤面包. こんにちは私はトーストよ.",
				duration : durationValue,
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - duration : " + durationValue); // log
		this.showTarget();
	},
	
	// apply properties
	applyProp: function(){
		var durationValue = this.$.durationValue.getValue();
		if(!isNaN(durationValue) && durationValue != ""){
			durationValue = parseFloat(durationValue);
		}
		if(this.$.target){
			this.$.target.setDuration(durationValue);
			enyo.log("[" + this.name + "] apply... - duration : " + this.$.target.getDuration()); // log
		}
		this.showTarget();
	},
	
	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
		status.setContent("show - duration : " + this.$.target.getDuration());
	},
	
/*------ Added Functions ------*/	
	// showPopup
	showPopup: function(inSender, inEvent){
		this.updateStatus(inSender, inEvent);
		this.$.target.setOpen(!this.$.target.getOpen());
		enyo.log("[" + this.name + "] " + "show toast - duration : " + this.$.target.getDuration()); // log
	},
	keyPress: function(){
		this.$.selected.setContent("duration : " + this.$.durationValue.getValue());
	},
/*------------------*/	
	
	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.durationValue.setValue("");
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