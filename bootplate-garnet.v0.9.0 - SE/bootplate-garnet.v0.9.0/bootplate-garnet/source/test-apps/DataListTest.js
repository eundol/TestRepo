/*
##   @b DataListTestApp (g.DataList)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.DataList API according to combination of properties.
#
#    @remark
#        - 2014.  3. 10. Initial created
#
#    @author ykh815.yoo@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/
enyo.kind({
	name: "g.Test.DataList",
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
							{content: "g.DataList don't have properties"},
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
				{classes: "title", style: "z-index: 9999", components:[
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
				{classes: "status", style: "z-index: 9999", components:[
					{content: "status", classes: "status-title"},
					{classes: "status-bar"},
					{name: "status", content: "", classes: "status-text"},
				]},
				// Buttons
				{name: "buttonGroupTarget", style: "z-index: 9999", classes: "button-group", components:[
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
			this.collection = new enyo.Collection(this.data);
	},

	// render target
	renderTarget: function(inSender, inEvent){
/*------ EDIT ------*/
		if(!this.$.target){
			this.set("list", new enyo.Collection(this.generateDatas()));
			new enyo.Binding({source: this, target: this, from: ".list", to: ".$.target.collection", oneWay: false});
			this.$.targetField.createComponent({
				name: "target",
				kind: "g.DataList",
				scrollerOptions: {thumb: true},
				headerComponents: [
				{style:"padding-left: 70px;", components: [
					{kind: "g.IconButton", src: "assets/icon-album.png", classes: "g-sample-margin-right"},
					{kind: "g.IconButton", src: "assets/icon-download.png", classes: "g-sample-margin-right"},
					{kind: "g.IconButton", src: "assets/icon-extend.png", classes: "g-sample-margin-right"}
				]}],
				components: [
					{components: [
						{name: "list", style: "padding-left: 20px;", components: [
							{name: "iconUrl", kind: "g.IconButton", classes: "g-sample-margin-right"},
							{name: "albumTitle", classes: "g-sample-list-item-title"},
							{name: "albumGenre", classes: "g-sample-list-item-genre"},
							{tag: "hr", style: "bottom: 0"}
						]}
					], bindings: [
						{from: ".model.iconUrl", to: ".$.iconUrl.src"},
						{from: ".model.albumTitle", to: ".$.albumTitle.content"},
						{from: ".model.albumGenre", to: ".$.albumGenre.content"}
					]}
				],
				footerComponents: [],
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

	// generateDatas
	generateDatas: function () {
		data = [
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

		return data;
	},
});
