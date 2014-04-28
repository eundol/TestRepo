/*
##   @b ScrollPopupTestApp (g.ScrollPopup)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.ScrollPopup API according to combination of properties.
#
#    @remark
#        - 2014.  2. 25. Initial created
#
#    @author sunjoong.lee@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.ScrollPopup",
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
						// Property
						{classes: "property", style: "margin-top:85px; margin-left:15px;", components:[
							{content: "g.Popup don't have properties"},
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
		if(!this.$.target){
			this.$.targetContainer.createComponent({			
				
				name: "target",
				style: "margin-top:70px; margin-left:25px;",
				//classes: "g-sample-popup-button center middle g-layout-box-outside-circle ", 
				components: [
					{
						name: "PopupButton",
						kind: "g.Button",
						ontap: "showPopup",
						small: true,
						content: "Click here to Popup!"
					},
					{						
						name: "scrollPopup",
						kind: "g.ScrollPopup",
						components: [
							{classes: "g-layout-box-inside-circle", components:[
								{name: "icon2", kind: "g.IconButton", ontap: "tapped", src: "assets/icon-list.png", style: "display: block; margin: 5px auto;"},
								{name: "title2", content: "Title", classes: "g-layout-text-center g-common-header-font"},
								{tag: "hr", style: "margin-bottom: 10px;"},
								{style: "margin: auto; overflow: hidden;", components: [
									{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, \
									2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, \
									and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, \
									we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up \
									and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier \
									and find even more ways to talk, text, email and surf the web at home and on the go."}
								]}
							]}
						]
					}
				]
				
			},{owner:this}).render();  
		}
/*------------------*/
		this.showTarget();
	},
	
	// Popup Control
	showPopup: function(inSender, inEvent) {
		if(inSender.name === "PopupButton")
			this.$.scrollPopup.show();
			this.$.status.setContent("popup is shown");
	},
	hidePopup: function(inSender, inEvent) {
		if (inEvent.originator.name === "scrollPopup")			
			this.$.scrollPopup.hide();
			this.$.status.setContent("popup is hidden");
	},
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
});