/*
##   @b WheelDataListControllerTestApp (g.WheelDataListController)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.WheelDataListController API according to combination of properties.
#
#    @remark
#        - 2014.  3. 5. Initial created
#
#    @author hyojoo.cho@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/
g.WheelDataListControllerHandlers = {
	ondown: "eventHandler",
	onhold: "eventHandler",
	ondragstart: "eventHandler",
	ondrag: "eventHandler",
	ondragfinish: "eventHandler",
	ontap: "eventHandler",
	onScrollStart: "eventHandler",
	onScrollUp: "eventHandler",
	onScrollDown: "eventHandler"
};
g.DataListHandlers = {
	onWheelDataListMove: "eventHandler"
};
enyo.kind({
	name: "g.Test.DataListPanel",
	kind: "g.Panel",
	//* @public
	handlers: (function() {return enyo.mixin(
		{
		},
		[
			g.DataListHandlers,
			g.WheelDataListControllerHandlers
		]
	);})(),
	//* @protected
	classes: "g-layout-absolute-wrapper",
	components: [
		{
			name: "list",
			kind: "g.DataList",
			scrollerOptions: {thumb: true},
			style: "border-radius: 9999px;",
			headerComponents: [
				{style:"text-align: center; margin-top: 40px;", components: [
					{kind: "g.Button", classes: "center middle", style: "color:white; background-color:#236EB6; height:40px; font-size:16pt;", ontap: "changeProp", content: "Prop.."},
				]}
			],
			components: [
				{components: [
					{name: "listItem", style: "height: 80px; line-height: 80px;", components: [
						{name: "iconUrl", kind: "g.IconButton", style: "margin-left: 30px;"},
						{name: "albumTitle", style: "display: inline; margin-left: 10px;"},
						{name: "albumGenre", style: "position: absolute; display: inline; padding-right: 10px; right: 35px; font-size: 12pt; font-style: italic;"},
						{tag: "hr", style: "bottom: 0"}
					]}
				], bindings: [
					{from: ".model.iconUrl", to: ".$.iconUrl.src"},
					{from: ".model.albumTitle", to: ".$.albumTitle.content"},
					{from: ".model.albumGenre", to: ".$.albumGenre.content"}
				]}
			],
			footerComponents: [
				{style:"text-align: center;", components: [
					{kind: "g.Button", classes: "center middle", style: "color:white; background-color:#236EB6; height:40px; font-size:16pt;", ontap: "changeProp", content: "Prop.."},
				]}
			]
		},
		{
			name: "wheel",
			kind: "g.WheelDataListController"
		},
		// {kind: "enyo.Image", src: "assets/mask320.png", classes: "g-common-hw-accelerated", style: "z-index: 9999; pointer-events: none;"}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	],
	eventHandler: enyo.inherit(function(sup) {
		return function(inSender, inEvent) {
			var returnVal = false;
			if (!returnVal) {
				returnVal = this.$.wheel.eventHandler(inSender, inEvent);
			}
			enyo.log('return value='+returnVal);
			if (!returnVal) {
				returnVal = this.$.list.eventHandler(inSender, inEvent);
			}
			enyo.log('return value='+returnVal);

			return sup.apply(this, arguments);
		};
	}),
	isWheelEvent: function(inEvent) {
		var w = this.$.wheel;
		if (w && w.isInbounds) {
			return w.isInbounds(inEvent);
		}
		return false;
	},
/* 	// reset target
	resetTarget: function(inSender, inEvent){
		this.owner.$.target.destroy();
		enyo.log("[" + this.name + "] reset...");
		this.owner.showProp();
		this.owner.showRenderButton();
	}, */
	
	// change properties
	changeProp: function(inSender, inEvent){
		this.owner.showProp();
		this.owner.showApplyButton();
		this.owner.$.target.addClass('display-none');
	},
});

enyo.kind({
	name: "g.Test.WheelDataListController",
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
				{classes: "g-layout-box-inside-circle-no-wheel properties-sroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - small
						{classes: "property", style: "margin-top:90px; margin-right: 10px; text-align: center;", components:[
							{content: "g.WheelDataListController doesn't have properties",},
						]},
					]},
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
				{classes: "title", style: "position: absolute;", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
			]},
			
		]},
	],
	
	create: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.propFieldTitle.setContent(this.kindName.replace(".Test","") + " Prop");
		this.$.targetFieldTitle.setContent(this.kindName.replace(".Test",""));
		// this.collection = new enyo.Collection(this.data);
		// this.set("collection", new enyo.Collection(this.data));
		// new enyo.Binding({source: this, target: this, from: ".collection", to: ".$.target.collection", oneWay: false});
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
		if(!this.$.target){
			this.set("collection", new enyo.Collection(this.data));
			new enyo.Binding({source: this, target: this, from: ".collection", to: ".$.target.collection", oneWay: false});
			this.$.targetField.createComponent({
				name: "target",
				kind: "g.Test.DataListPanel",
				style: "position: relative;",
			}, {owner:this}).render();
		}
		enyo.log("[" + this.name + "] render... ");
		this.showTarget();
	},

	bindings: [
		{from: ".collection", to: ".$.target.collection"}
	],

	// apply properties
	applyProp: function(){
		enyo.log("[" + this.name + "] apply... ");
		this.showTarget();
		this.$.properties.ontap = "";
	},

	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
		status.setContent(inSender.getContent() + " pressed");
		enyo.log("[" + this.name + "] " + inSender.getContent() + " pressed");
	},
	
	
	
	/*--- shift funcitons ---*/
	// showTarget
	showTarget: function(){
		this.$.targetField.removeClass('visibility-hidden');
		this.$.propField.addClass('visibility-hidden');
		this.$.target.removeClass('display-none');
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
	data: [
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/icon-list.png", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});