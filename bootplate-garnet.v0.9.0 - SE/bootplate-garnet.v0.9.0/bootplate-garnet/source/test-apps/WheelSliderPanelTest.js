/*
##   @b WheelSliderPanelTestApp (g.WheelSliderPanel)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.WheelSliderPanel API according to combination of properties.
#
#    @remark
#        - 2014.  3. 27. Initial created
#
#    @author sunjoong.lee@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.WheelSliderPanel",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
		onChange: "changeEventHandler",
		onChanging: "changingEventHandler"
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
						
						// Property - minimumValue
						{classes: "property", style: "margin-top:30px; margin-left:15px;", components:[
							{content: "minimumValue : "},
							{name: "minimumValueInput", kind: "enyo.Input", placeholder: "0", oninput:"minimumValueInput",
								style: "width:80px; height:20px; font-size:12px; color:black; margin-left:5px;"}
							],
						},
						
						// Property - maximumValue
						{classes: "property", style:"position:absolute; margin-top:40px; margin-left:15px;", components:[
							{content: "maximumValue : "},
							{name: "maximumValueInput", kind: "enyo.Input", placeholder: "100", oninput:"maximumValueInput",
								style: "width:80px; height:20px; font-size:12px; color:black; margin-left:5px;"}
							],
						},
						
						// Property - stepValue
						{classes: "property", style:"position:absolute; margin-top:80px; margin-left:15px;", components:[
							{content: "stepValue : "},
							{name: "stepValueInput", kind: "enyo.Input", placeholder: "10", oninput:"stepValueInput",
								style: "width:80px; height:20px; font-size:12px; color:black; margin-left:5px;"}
							],
						},
						
						// Property - value
						{classes: "property", style:"position:absolute; margin-top:120px; margin-left:15px;", components:[
							{content: "value : "},
							{name: "valueInput", kind: "enyo.Input", placeholder: "0", oninput:"valueInput",
								style: "width:80px; height:20px; font-size:12px; color:black; margin-left:5px;"}
							],
						},
					]},
				]},
/*------------------*/
				// Selected
				{classes: "selected", components:[
					{content: "Input integer", classes: "selected-title"},
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
				// Buttons
				{name: "buttonGroupTarget", classes: "button-group", style:"z-index:9999", components:[
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
		//this.$.targetFieldTitle.setContent(this.kindName.replace(".Test",""));
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
/*------ EDIT ------*/		
		//get minimumValue
		var minimumValue = this.$.minimumValueInput.getValue();
		minimumValue = Number(minimumValue);
		
		//get maximumValue
		var maximumValue = this.$.maximumValueInput.getValue();
		maximumValue = Number(maximumValue);
		
		//get stepValue
		var stepValue = this.$.stepValueInput.getValue();
		stepValue = Number(stepValue);
		
		//get value
		var value = this.$.valueInput.getValue();
		value = Number(value);
		
		if(!this.$.target){
			new enyo.Binding({source: this, target: this, from: ".$.target.value", to: ".$.ValueOutput.content", oneWay: false});
			this.$.targetField.createComponent({
				name: "targetWrapper",
				style: "position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{
						name: "target",
						kind: "g.WheelSliderPanel",
						style: "position: relative; border-radius: 50%; background-color: #212121;",
						minimumValue: minimumValue,
						maximumValue: maximumValue,
						stepValue: stepValue,
						value: value
					},
					{style: "width: 172px; margin: 30px 74px 0; text-align: center;", components: [
						{tag:"img", src: "assets/ic_context_menu_normal.svg", style: "margin-bottom: 12px;"},
						{content: "value", style: "font-size: 24px; line-height: 27px; margin-bottom: 4px;"},
						{name: "ValueOutput", content: "", style: "font-size: 24px; line-height: 27px; margin-bottom: 7px;"},
						/*{style: "width: 200px, height: 72px;", components: [
							{name: "cancel", kind: "g.IconButton", ontap: "cancel", style: "width: 72px; height: 72px; background: url(assets/ic_done.svg) no-repeat;"},
							{name: "ok", kind: "g.IconButton", ontap: "ok", style: "width: 72px; height: 72px; margin-right: 28px; background: url(assets/ic_close.svg) no-repeat;"}
						]}*/
					]}
				],
			},{owner:this}).render();
		}
		//this.$.targetContainer.applyStyle('text-align','center');
/*------------------*/
		this.showTarget();
	},
	
	/*------ Added Functions ------*/
	cancel: function(inSender, inEvent) {
		this.$.result.setContent("Cancel button tapped !!");
	},
	ok: function(inSender, inEvent) {
		this.$.result.setContent("OK button tapped !!");
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	changingEventHandler: function(inSender, inEvent) {
		this.$.ValueOutput.applyStyle("color", "#1DDBD9");
	},
	changeEventHandler: function(inSender, inEvent) {
		this.$.ValueOutput.applyStyle("color", "#FFFFFF");
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
		if(this.$.target){
			//get minimumValue
			var minimumValueInput = this.$.minimumValueInput.getValue();
			minimumValueInput = Number(minimumValueInput);
			this.$.target.setMinimumValue(minimumValueInput);
			
			//get maximumValue
			var maximumValueInput = this.$.maximumValueInput.getValue();
			maximumValueInput = Number(maximumValueInput);
			this.$.target.setMaximumValue(maximumValueInput);
			
			//get stepValue
			var stepValueInput = this.$.stepValueInput.getValue();
			stepValueInput = Number(stepValueInput);
			this.$.target.setStepValue(stepValueInput);
						
			//get value
			var valueInput = this.$.valueInput.getValue();
			valueInput = Number(valueInput);
			this.$.target.setValue(valueInput);
		}
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
		this.$.targetWrapper.destroy();
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