/*
##   @b NotificationApp (g.Notification)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.Notification API according to combination of properties.
#
#    @remark
#        - 2014.  3. 25. Initial created
#		 - 2014.  4. 24. Update property
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.2
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.Notification",
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
						// Property - open, duration
						{kind: "enyo.Table", name: "propTable", style: "margin-top:70px; margin-left:18px;", components:[
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "width:88px; border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "open"},
								]},
								{kind: "enyo.TableCell", style: "", components:[
									{kind: "Group", onActivate: "", components: [
										{name: "open_true", kind: "g.sdet.CheckboxItem", content: "true", style: "margin-left: 7px; float:left;", onchange: "propChanged",},
										{name: "open_false", kind: "g.sdet.CheckboxItem", content: "false",  style: "margin-left: 87px; float:left", onchange: "propChanged",}
									]},
								]},
							]},
							{kind: "enyo.TableRow", name: "durationRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "duration", style: "color: tan;"},
								]},
								{kind: "enyo.TableCell", style: "", components:[
									{name: "durationValue", kind: "enyo.Input", placeholder : "5000", selectOnFocus: true, style:"margin-left:12px; width:152px;", oninput: "keyPress"},
								]},
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
			{name: "targetField", classes: "target-field visibility-hidden", style: "background-color: #212121;", components:[
				// Title
				{classes: "title", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
				// Target Container
				{classes: "g-layout-box-inside-circle-no-wheel target-container-sroller", style: "height:283px;", components: [
					{name: "targetContainer", components:[
						{name: "showButton", kind: "g.Button", classes: "center middle", style: "margin-top:80px;", ontap: "openNotification", small: true, content: "open"},
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
		this.setDefault();
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
		var durationValue = this.$.durationValue.getValue();
		if(!isNaN(durationValue) && durationValue != ""){
			durationValue = parseFloat(durationValue);
		}
		var openValue = (this.$.open_true.getChecked()? true : false);
		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.Notification",
				duration : durationValue,
				open : openValue,
				ontap: "closeNotification",
				iconSrc: "assets/ic_sample.png",
				content: "closeNotification",
				style: "top: 0; bottom: 0; left: 0; right: 0;"
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - duration : " + durationValue + ", open : " + openValue); // log
		this.showTarget();
	},
	
	// propChanged
	propChanged: function(inSender, inEvent){
		this.updateSelected(inSender, inEvent);
	},
	
	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
			selected.setContent(inSender.name + " selected");
			enyo.log("[" + this.name + "] " + inSender.name + " selected"); // log
	},
	
	// apply properties
	applyProp: function(){
		var openValue = (this.$.open_true.getChecked()? true : false);
		if(this.$.target){
			this.$.target.setOpen(openValue);
			enyo.log("[" + this.name + "] apply... - open : " + this.$.target.getOpen()); // log
		}
		this.$.durationRow.removeClass('visibility-hidden');
		this.showTarget();
	},
	
	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
		status.setContent("open");
	},
	
/*------ Added Functions ------*/	
	// showNotification
	openNotification: function(inSender, inEvent){
		this.updateStatus(inSender, inEvent);
		this.$.target.setOpen(!this.$.target.getOpen());
		enyo.log("[" + this.name + "] " + "open notification - duration : " + this.$.target.getDuration()); // log
	},
	closeNotification: function(inSender, inEvent){
		this.doAction();
		this.$.target.closeNotification();
		enyo.log("[" + this.name + "] " + "closeNotification()"); // log
	},
	keyPress: function(){
		this.$.selected.setContent("duration : " + this.$.durationValue.getValue());
	},
	// setDefault
	setDefault: function(){
		this.$.durationValue.setValue(5000);
		this.$.open_false.setChecked(true);
	},
	// doAction
	doAction: function(){
		this.$.status.setContent("Title tapped - closeNotification()");
	},
/*------------------*/	
	
	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.durationValue.setValue("");
		this.$.target.destroy();
		this.setDefault();
		this.resetConsoles();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
	},
	
	// change properties
	changeProp: function(inSender, inEvent){
		this.showProp();
		this.$.durationRow.addClass('visibility-hidden');
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