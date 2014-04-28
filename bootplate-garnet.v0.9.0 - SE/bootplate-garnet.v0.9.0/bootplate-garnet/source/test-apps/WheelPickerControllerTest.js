/*
##   @b WheelPickerControllerTestApp (g.WheelPickerController)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.WheelPickerController API according to combination of properties.
#
#    @remark
#        - 2014.  3.  3. Initial created
#		 - 2014.  3. 12. Apply "g.sdet.CheckboxItem"
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.WheelPickerController",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			{kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9999; pointer-events: none;"},
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
					{name: "properties", classes: "properties", style: "font-size:17px;", components:[
						// Property - baseRadian, baseFixed, rewindEnabled
						{classes: "property", style: "margin-top:50px; margin-left:13px; position:absolute", components:[
							{content: "baseRadian : "},
							{name: "baseRadianValue", kind: "enyo.Input", placeholder : "0 [0~Math.PI*2]", selectOnFocus: true, style: "margin-left:6px; width:135px; height:17px; font-size:15px;", oninput: "keyPress"},
						]},
						{classes: "property", style: "margin-top:90px; margin-left:13px; position:absolute", components:[
							{content: "baseFixed : "},
							{kind: "Group", onActivate: "", components: [
								{name: "baseFixed_true", kind: "g.sdet.CheckboxItem", content: "true", checked: true, style: "margin-left: 3px; float:left;", onchange: "propChanged",},
								{name: "baseFixed_false", kind: "g.sdet.CheckboxItem", content: "false", style: "margin-left: 77px; float:left", onchange: "propChanged",}
							]},
						]},
						{classes: "property", style: "margin-top:130px; margin-left:13px; position:absolute", components:[
							{content: "rewindEnabled : "},
							{kind: "Group", onActivate: "", components: [
								{name: "rewindEnabled_true", kind: "g.sdet.CheckboxItem", content: "true", checked: true, style: "margin-left: 3px; float:left;", onchange: "propChanged",},
								{name: "rewindEnabled_false", kind: "g.sdet.CheckboxItem", content: "false", style: "margin-left: 77px; float:left", onchange: "propChanged",}
							]},
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
				{classes: "title",  style: "margin-top:19px;", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
				// Target Container
				{fit: true, classes: "g-layout-box-inside-circle-no-wheel target-container-sroller", style: "height:160px; z-index:9999;", components: [
					{name: "targetContainer", components:[
						{kind: "g.Button", classes: "center middle", style: "margin-top:70px;", ontap: "resetTarget", small: true, content: "Reset"},
					]},
				]},
				// Status
				{classes: "status", style: "margin-top:197px;", components:[
					{content: "status", classes: "status-title"},
					{classes: "status-bar"},
					{name: "status", classes: "status-text"},
				]},
				// Buttons
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
		var baseRadianValue = this.$.baseRadianValue.getValue();
		if(!isNaN(baseRadianValue) && baseRadianValue != ""){
			baseRadianValue = parseFloat(baseRadianValue);
		}
		var baseFixedValue = (this.$.baseFixed_true.getChecked()? true : false);
		var rewindEnabledValue = (this.$.rewindEnabled_true.getChecked()? true : false);
		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.WheelPickerController",
				baseRadian : baseRadianValue,
				baseFixed : baseFixedValue,
				rewindEnabled : rewindEnabledValue,
				onWheelPickerChange: "onChange",
				onWheelPickerReleased: "onReleased"
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - baseRadian : " + baseRadianValue + ", baseFixed : " + baseFixedValue + ", rewindEnabled : " + rewindEnabledValue); // log
		this.showTarget();
		this.updateStatus();
	},
	
	// propChanged
	propChanged: function(inSender, inEvent){
		if(this.$.target){
			switch(inSender.name){
				case 'baseFixed_true' : this.$.target.setBaseFixed(true); break;
				case 'baseFixed_false' : this.$.target.setBaseFixed(false); break;
				case 'rewindEnabled_true' : this.$.target.setRewindEnabled(true); break;
				case 'rewindEnabled_false' : this.$.target.setRewindEnabled(false); break;
			}
		}
		this.updateSelected(inSender, inEvent);
	},
	
	// apply properties
	applyProp: function(){
		var baseRadianValue = this.$.baseRadianValue.getValue();
		if(!isNaN(baseRadianValue) && baseRadianValue != ""){
			baseRadianValue = parseFloat(baseRadianValue);
		}
		this.$.target.setBaseRadian(baseRadianValue);
		enyo.log("[" + this.name + "] apply... - baseRadian : " + this.$.target.getBaseRadian() + ", baseFixed : " + this.$.target.getBaseFixed() + ", rewindEnabled : " + this.$.target.getRewindEnabled()); // log
		this.showTarget();
		this.updateStatus();
	},
	
	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
			selected.setContent(inSender.name + " selected");
			// enyo.log("[" + this.name + "] " + inSender.name + " selected"); // log
	},
	
	// update status
	updateStatus: function(){
		var status = this.$.status;
		status.setContent("baseRadian : " + this.$.target.getBaseRadian() + ", baseFixed : " + this.$.target.getBaseFixed() + ", rewindEnabled : " + this.$.target.getRewindEnabled());
	},
	
/*------ Added Functions ------*/	
	keyPress: function(){
		this.$.selected.setContent("baseRadian : " + this.$.baseRadianValue.getValue());
	},
	onChange: function(inSender, inEvent){
		this.$.status.setContent(parseInt(inEvent.value, 10));
	},
	onReleased: function(inSender, inEvent){
		this.$.status.setContent(0);
	},
/*------------------*/	
	
	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.baseRadianValue.setValue("");
		this.$.baseFixed_true.setChecked(true);
		this.$.rewindEnabled_true.setChecked(true);
		this.resetConsoles();
		this.$.target.destroy();
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