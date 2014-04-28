/*
##   @b ContextualPopupTestApp (g.ContextualPopup)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.ContextualPopup API according to combination of properties.
#
#    @remark
#        - 2014.  3. 5. Initial created
#
#    @author hyojoo.cho@lgepartner.com
#
#    @version 0.2
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.ContextualPopup",
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
				{classes: "g-layout-box-inside-circle-no-wheel properties-scroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - small
						{classes: "property", style: "margin-top:65px; margin-left:45px;", components:[
							{content: "showCloseButton : "},
							{tag: "br"},
							{tag: "br"},
							{kind: "Group", onActivate: "", components: [
								{name: "showBtn_true", kind: "g.sdet.CheckboxItem", content: "true", checked: true, style: "margin-left: 7px; float:left;", onchange: "updateSelected",},
								{name: "showBtn_false", kind: "g.sdet.CheckboxItem", content: "false", style: "margin-left: 95px; float:left", onchange: "updateSelected",}
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
				{classes: "title", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
				// Target Container
				{classes: "g-layout-box-inside-circle-no-wheel target-container-scroller", components: [
					{name: "targetContainer", components:[
						{name: "threeButton", kind: "g.Button", style: "margin-top:40px;", classes: "center middle", ontap: "showPopup", small: true, content: "3 buttons"},
						{
							name: "threePopup",
							kind: "g.ContextualPopup",
							buttonComponents: [
								{
									name: "First button",
									ontap: "hidePopup",
									src: "assets/icon-extend.png"
								},
								{
									name: "Second button",
									ontap: "hidePopup",
									src: "assets/icon-list.png"
								},
								{
									name: "Third button",
									ontap: "hidePopup",
									src: "assets/icon-album.png"
								}
							]
						},
						{name: "fourButton", kind: "g.Button", style: "margin-top:10px;", classes: "center middle", ontap: "showPopup2", small: true, content: "4 buttons"},
						{
							name: "fourPopup",
							kind: "g.ContextualPopup",
							buttonComponents: [
								{
									name: "First button2",
									ontap: "hidePopup",
									src: "assets/icon-extend.png"
								},
								{
									name: "Second button2",
									ontap: "hidePopup",
									src: "assets/icon-list.png"
								},
								{
									name: "Third button2",
									ontap: "hidePopup",
									src: "assets/icon-album.png"
								},
								{
									name: "Firth button2",
									ontap: "hidePopup",
									src: "assets/icon-album.png"
								}
							]
						},
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
	
	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
		if(this.$.showBtn_true.getChecked()){
			this.$.threePopup.setShowCloseButton(true);
			this.$.fourPopup.setShowCloseButton(true);
			selected.setContent("showBtn_true" + " selected");
			enyo.log("[" + this.name + "] " + "showBtn_true" + " selected");
		}else{
			this.$.threePopup.setShowCloseButton(false);
			this.$.fourPopup.setShowCloseButton(false);
			selected.setContent("showBtn_false" + " selected");
			enyo.log("[" + this.name + "] " + "showBtn_false" + " selected");
		}
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
		var showBtnValue = (this.$.showBtn_true.getChecked()? true : false);
		if(!this.$.threePopup){
			this.$.threePopup.setShowCloseButton(showBtnValue);
		}
		if(!this.$.fourPopup){
			this.$.fourPopup.setShowCloseButton(showBtnValue);
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - showCloseButton : " + showBtnValue);
		this.showTarget();
	},
	
	// apply properties
	applyProp: function(){
		enyo.log("[" + this.name + "] apply... - showCloseButton : " + this.$.threePopup.getShowCloseButton());
		this.showTarget();
		this.$.properties.ontap = "";
	},

	showPopup: function(inSender, inEvent) {
		this.$.threePopup.show();
		
		var status = this.$.status;
		status.setContent(inSender.getContent() + " is selected.");
		enyo.log("[" + this.name + "] " + inSender.getContent() + " is selected.");
	},

	showPopup2: function(inSender, inEvent) {
		this.$.fourPopup.show();
		
		var status = this.$.status;
		status.setContent(inSender.getContent() + " is selected.");
		enyo.log("[" + this.name + "] " + inSender.getContent() + " is selected.");
	},

	hidePopup: function(inSender, inEvent) {
		this.log("enter");
		if ( inEvent.originator.active === true &&
			(inEvent.originator.name === "First button" ||
			inEvent.originator.name === "Second button" ||
			inEvent.originator.name === "Third button" ||
			inEvent.originator.name === "First button2" ||
			inEvent.originator.name === "Second button2" ||
			inEvent.originator.name === "Third button2" ||
			inEvent.originator.name === "Firth button2")) {
			this.$.status.setContent(inEvent.originator.name + " is selected.");
			this.$.threePopup.hide();
			this.$.fourPopup.hide();
		}
	},
	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
		status.setContent(inSender.getContent() + " is selected.");
		enyo.log("[" + this.name + "] " + inSender.getContent() + " is selected.");
	},
	
	// reset target
	resetTarget: function(inSender, inEvent){
		this.resetConsoles();
		this.$.showBtn_true.setChecked(true);
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
		this.$.status.setContent("");
		this.$.selected.setContent("");
	},
});