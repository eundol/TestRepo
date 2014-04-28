/*
##   @b PanelTestApp (g.Panel)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.Panet API according to combination of properties.
#
#    @remark
#        - 2014.  3.  5. Initial created
#        - 2014.  3. 18. Add properties
#
#    @author sunjoong.lee@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.Panel",
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
						{classes: "property", style: "margin-top:30px; margin-left:15px;", components:[
							{content: "index : "},
							{name: "indexInput", kind: "enyo.Input", placeholder: "Input index value", oninput:"indexInput",
								style: "width:180px; height:20px; font-size:12px; color:black; margin-left:5px;"}
							],
						},
						
						// Property - enablePanelMoveEvent
						{classes: "property", style:"position:absolute; margin-top:40px; margin-left:10px;", components:[
							{content: "enable 1st: "},
							{kind: "Group", onActivate: "", components: [
								{name: "enablePanelMoveEvent1_true", kind: "g.sdet.CheckboxItem", content: "true", checked: true,style: "float:left;", onchange: "propChanged",},
								{name: "enablePanelMoveEvent1_false", kind: "g.sdet.CheckboxItem", content: "false", style: "margin-left: 95px; float:left", onchange: "propChanged",}
							]},
						]},
						
						// Property - enablePanelMoveEvent
						{classes: "property", style:"position:absolute; margin-top:75px; margin-left:10px;", components:[
							{content: "enable 2nd: "},
							{kind: "Group", onActivate: "", components: [
								{name: "enablePanelMoveEvent2_true", kind: "g.sdet.CheckboxItem", content: "true", checked: true,style: "float:left;", onchange: "propChanged",},
								{name: "enablePanelMoveEvent2_false", kind: "g.sdet.CheckboxItem", content: "false", style: "margin-left: 95px; float:left", onchange: "propChanged",}
							]},
						]},
						
						// Property - enablePanelMoveEvent
						{classes: "property", style:"position:absolute; margin-top:110px; margin-left:10px;", components:[
							{content: "enable 3rd: "},
							{kind: "Group", onActivate: "", components: [
								{name: "enablePanelMoveEvent3_true", kind: "g.sdet.CheckboxItem", content: "true", checked: true,style: "float:left;", onchange: "propChanged",},
								{name: "enablePanelMoveEvent3_false", kind: "g.sdet.CheckboxItem", content: "false", style: "margin-left: 95px; float:left", onchange: "propChanged",}
							]},
						]},
					]},
				]},
/*------------------*/
				// Selected
				{classes: "selected", components:[
					{content: "Input text or Select", classes: "selected-title"},
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

		//get indexValue
		var index = this.$.indexInput.getValue();
		index = Number(index);
		
		//get 1st Panel MoveEvent for only render
		var enablePanelMoveEvent1 = (this.$.enablePanelMoveEvent1_true.getChecked()? true : false);
		
		//get 2nd Panel MoveEvent for only render
		var enablePanelMoveEvent2 = (this.$.enablePanelMoveEvent2_true.getChecked()? true : false);
		
		//get 3rd Panel MoveEvent for only render
		var enablePanelMoveEvent3 = (this.$.enablePanelMoveEvent3_true.getChecked()? true : false);
		
		
		if(!this.$.target){
			this.$.targetField.createComponent({
				
				kind: "g.PanelSet",
				name: "target",
				style: "position: absolute; border-radius: 50%; background-color: black;",				
				index: index,
				components: [
					{kind: "g.Panel", name: "firstPanel", enablePanelMoveEvent: enablePanelMoveEvent1, components: [
						{name: "icon", kind: "g.IconButton", ontap: "tapped", src: "assets/icon-list.png", style: "display: block; margin: 10px auto;"},
						{name: "title", content: "Title", classes: "g-layout-text-center g-common-header-font"},
						{tag: "hr", style: "margin-bottom: 10px;"},
						{style: "width: 250px; height: 140px; margin: auto; overflow: hidden;", components: [
							{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm?Snapdragon?800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet."}
						]}
					]},
					{kind: "g.Panel", name: "secondPanel", enablePanelMoveEvent: enablePanelMoveEvent2, components: [
						{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm?Snapdragon?800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet."}
					]},
					{kind: "g.TimePickerPanel", name: "thirdPanel", enablePanelMoveEvent: enablePanelMoveEvent3, meridiemEnabled: true, locale: "ko-KR"}
				]
			},{owner:this}).render();
		}
		//this.$.targetContainer.applyStyle('text-align','center');
/*------------------*/
		this.showTarget();
	},
	
	/*------ Added Functions ------*/	
	// previousPanel
	previousPanel: function(){
		if(this.$.target){
			this.$.target.previous();
		}
	},
	// nextPanel
	nextPanel: function(){
		if(this.$.target){
			this.$.target.next();
		}
	},
	//selectPanelByName
	selectPanelByName: function(){
		if(this.$.target){
			var returnValue = this.$.target.selectPanelByName(this.$.selectPanelByNameInput.getValue());
			this.$.returnSelectedPanelIndex.setContent(returnValue);
			enyo.log("selectedPanelIndex = "+ returnValue);			
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
		if(this.$.target){
			//index setValue
			var index = this.$.indexInput.getValue();
			index = Number(index);
			this.$.target.setIndex(index);			
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