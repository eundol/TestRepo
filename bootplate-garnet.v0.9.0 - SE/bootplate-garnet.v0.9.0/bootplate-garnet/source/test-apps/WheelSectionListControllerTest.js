/*
##   @b WheelsectionListControllerTestApp (g.WheelsectionListController)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.WheelsectionListController API according to combination of properties.
#
#    @remark
#        - 2014.  3.  13. Initial created
#		 - 2014.  3.  21. Apply 0.7.1
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.WheelSectionListController",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			{kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9997; pointer-events: none;"},
			// Watch background background - black
			{classes: "watch-background black"},
			
			// Prop Field
			{name: "propField", classes : "prop-field", components:[
				// Title
				{classes: "title", components:[
					{name: "propFieldTitle", classes: "title-text"}
				]},
				// Properties list - enyo.Scroller
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel properties-scroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property
						{classes: "property", style: "margin-top:41px; margin-left:19px;", components:[
							{content: "sectionList", style: "color: Tan"},
							{tag:"br"},
							{name: "sectionList", kind: "enyo.Input", placeholder : "#,A,C,E,F,G,I,K,M,O,Q,S,U,W,Z,?", value: "#,A,C,E,F,G,I,K,M,O,Q,S,U,W,Z,?", selectOnFocus: true, style:"margin-left:0px; width:260px; font-size:12px;", oninput: "keyPress"},
						]},
						{tag:"br"},
						{classes: "property", style: "margin-top:15px; margin-left:19px;", components:[
							{content: "sectionLabelList", style: "color: Tan"},
							{tag:"br"},
							{name: "sectionLabelList", kind: "enyo.Input", placeholder : "#,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,?", value: "#,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,?", selectOnFocus: true, style:"margin-left:0px; width:260px; font-size:12px;", oninput: "keyPress"},
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
				{name: "status", content: "", style: "color:white; z-index:9998; font-size:13px; font-family:miso; width:100%; text-align:center; margin-top:9px;",},
				{name: "back", kind: "g.Icon", src: "assets/arrow-left-icon.png", style: "z-index:9999; margin:130px 0 0 40px;", ontap:"resetTarget",},
			]},
		]},
	],
	
	create: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.propFieldTitle.setContent(this.kindName.replace(".Test","") + " Prop");
		this.set("data", new enyo.Collection(this.data));
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
		var sectionListValue = this.$.sectionList.getValue().split(",");
		var sectionLabelListValue = this.$.sectionLabelList.getValue().split(",");
		if(!this.$.target){
			new enyo.Binding({source: this, target: this, from: ".data", to: ".$.target.collection", oneWay: false});
			this.$.targetField.createComponent({
				name: "target",
				kind: "g.hs.DataIndexList",
				onScrollStart: "showBackButton",
				onScrollStop: "hideBackButton",
			},{owner: this});
			this.$.target.createComponent({
				name: "wheel",
				kind: "g.WheelSectionListController",
				sectionList: sectionListValue,
				sectionLabelList: sectionLabelListValue,
			});
		};
		this.$.target.render();
		enyo.log("[" + this.name + "] render... - sectionList : " + sectionListValue + ", sectionLabelList : " + sectionLabelListValue); // log
		this.showTarget();
	},
	
/*------ Added Functions ------*/	
	keyPress: function(inSender, inEvent){
		this.$.selected.setContent(inSender.name + " changed");
	},
	showBackButton: function(){
		this.$.back.applyStyle("display","none");
	},
	hideBackButton: function(){
		this.$.back.applyStyle("display","inline-block");
	},
/*------------------*/

	// reset target
	resetTarget: function(inSender, inEvent){
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
	
	// Data
	data: [
		{index: 1, title: "000 ~~~~~~~~~~~~"},
		{index: 2, title: "111  ~~~~~~~~~~~~"},
		{index: 3, title: "222  ~~~~~~~~~~~~"},
		{index: 4, title: "333  ~~~~~~~~~~~~"},
		{index: 5, title: "444  ~~~~~~~~~~~~"},
		{index: 6, title: "555  ~~~~~~~~~~~~"},
		{index: 7, title: "666  ~~~~~~~~~~~~"},
		{index: 8, title: "777  ~~~~~~~~~~~~"},
		{index: 9, title: "888  ~~~~~~~~~~~~"},
		{index: 10, title: "999  ~~~~~~~~~~~~"},
		{index: 11, title: "11111  ~~~~~~~~~~~~"},
		{index: 12, title: "22222  ~~~~~~~~~~~~"},
		{index: 13, title: "33333  ~~~~~~~~~~~~"},
		{index: 14, title: "44444  ~~~~~~~~~~~~"},
		{index: 15, title: "55555  ~~~~~~~~~~~~"},
		{index: 16, title: "66666  ~~~~~~~~~~~~"},
		{index: 17, title: "77777  ~~~~~~~~~~~~"},
		{index: 18, title: "88888  ~~~~~~~~~~~~"},
		{index: 19, title: "99999  ~~~~~~~~~~~~"},
		{index: 20, title: "A Christmas Carol"},
		{index: 21, title: "A Christmas Carol"},
		{index: 22, title: "Animal Farm"},
		{index: 23, title: "Animal Farm"},
		{index: 24, title: "Anna Karenina"},
		{index: 25, title: "Anna Karenina"},
		{index: 26, title: "Brave New World"},
		{index: 27, title: "Brave New World"},
		{index: 28, title: "Brave New World"},
		{index: 29, title: "Brave New World"},
		{index: 30, title: "Brave New World"},
		{index: 31, title: "Catch-22 (Catch-22, #1)"},
		{index: 32, title: "Catch-22 (Catch-22, #1)"},
		{index: 33, title: "Catch-22 (Catch-22, #1)"},
		{index: 34, title: "Crime and Punishment"},
		{index: 35, title: "Crime and Punishment"},
		{index: 36, title: "Don Quixote"},
		{index: 37, title: "Don Quixote"},
		{index: 38, title: "Don Quixote"},
		{index: 39, title: "Don Quixote"},
		{index: 40, title: "Don Quixote"},
		{index: 41, title: "Ender's Game (The Ender Qui..."},
		{index: 42, title: "Ender's Game (The Ender Qui..."},
		{index: 43, title: "Ender's Game (The Ender Qui..."},
		{index: 44, title: "Ender's Game (The Ender Qui..."},
		{index: 45, title: "Ender's Game (The Ender Qui..."},
		{index: 46, title: "Ender's Game (The Ender Qui..."},
		{index: 47, title: "Fahrenheit 451"},
		{index: 48, title: "Fahrenheit 451"},
		{index: 49, title: "Fahrenheit 451"},
		{index: 50, title: "Fahrenheit 451"},
		{index: 51, title: "Fahrenheit 451"},
		{index: 52, title: "Gone with the Wind"},
		{index: 53, title: "Gone with the Wind"},
		{index: 54, title: "Gone with the Wind"},
		{index: 55, title: "Gone with the Wind"},
		{index: 56, title: "Hamlet"},
		{index: 57, title: "Hamlet"},
		{index: 58, title: "Hamlet"},
		{index: 59, title: "Hamlet"},
		{index: 60, title: "Harry Potter and the Sorcer..."},
		{index: 61, title: "Harry Potter and the Sorcer..."},
		{index: 62, title: "Harry Potter and the Sorcer..."},
		{index: 63, title: "Iron Man"},
		{index: 64, title: "Iron Man"},
		{index: 65, title: "Iron Man"},
		{index: 66, title: "Iron Man"},
		{index: 67, title: "Iron Man"},
		{index: 68, title: "Jane Eyre"},
		{index: 69, title: "Jane Eyre"},
		{index: 70, title: "Jane Eyre"},
		{index: 71, title: "Jane Eyre"},
		{index: 72, title: "Kingdom of Heven"},
		{index: 73, title: "Kingdom of Heven"},
		{index: 74, title: "Kingdom of Heven"},
		{index: 75, title: "Kingdom of Heven"},
		{index: 76, title: "Kingdom of Heven"},
		{index: 77, title: "Les Misérables"},
		{index: 78, title: "Les Misérables"},
		{index: 79, title: "Les Misérables"},
		{index: 80, title: "Les Misérables"},
		{index: 81, title: "Les Misérables"},
		{index: 82, title: "Lolita"},
		{index: 83, title: "Lolita"},
		{index: 84, title: "Lolita"},
		{index: 85, title: "Lolita"},
		{index: 86, title: "Macbeth"},
		{index: 87, title: "Macbeth"},
		{index: 88, title: "Moby-Dick; or, The Whale"},
		{index: 89, title: "Moby-Dick; or, The Whale"},
		{index: 90, title: "Moby-Dick; or, The Whale"},
		{index: 91, title: "Moby-Dick; or, The Whale"},
		{index: 92, title: "Moby-Dick; or, The Whale"},
		{index: 93, title: "Night  (The Night Trilogy, #1)"},
		{index: 94, title: "Night  (The Night Trilogy, #1)"},
		{index: 95, title: "Night  (The Night Trilogy, #1)"},
		{index: 96, title: "Night  (The Night Trilogy, #1)"},
		{index: 97, title: "Night  (The Night Trilogy, #1)"},
		{index: 98, title: "Night  (The Night Trilogy, #1)"},
		{index: 99, title: "Of Mice and Men"},
		{index: 100, title: "Of Mice and Men"},
		{index: 101, title: "Of Mice and Men"},
		{index: 102, title: "Of Mice and Men"},
		{index: 103, title: "Of Mice and Men"},
		{index: 104, title: "One Hundred Years of Solitude"},
		{index: 105, title: "One Hundred Years of Solitude"},
		{index: 106, title: "One Hundred Years of Solitude"},
		{index: 107, title: "One Hundred Years of Solitude"},
		{index: 108, title: "One Hundred Years of Solitude"},
		{index: 109, title: "Pride and Prejudice"},
		{index: 110, title: "Pride and Prejudice"},
		{index: 111, title: "Pride and Prejudice"},
		{index: 112, title: "Pride and Prejudice"},
		{index: 113, title: "Pride and Prejudice"},
		{index: 114, title: "Quiz Quiz"},
		{index: 115, title: "Quiz Quiz"},
		{index: 116, title: "Quiz Quiz"},
		{index: 117, title: "Quiz Quiz"},
		{index: 118, title: "Romeo and Juliet"},
		{index: 119, title: "Romeo and Juliet"},
		{index: 120, title: "Romeo and Juliet"},
		{index: 121, title: "Romeo and Juliet"},
		{index: 122, title: "Romeo and Juliet"},
		{index: 123, title: "Slaughterhouse-Five"},
		{index: 124, title: "Slaughterhouse-Five"},
		{index: 125, title: "Slaughterhouse-Five"},
		{index: 126, title: "Slaughterhouse-Five"},
		{index: 127, title: "Slaughterhouse-Five"},
		{index: 128, title: "The Adventures of Tom Sawyer"},
		{index: 129, title: "The Adventures of Tom Sawyer"},
		{index: 130, title: "The Adventures of Tom Sawyer"},
		{index: 131, title: "The Adventures of Tom Sawyer"},
		{index: 132, title: "The Adventures of Tom Sawyer"},
		{index: 133, title: "The Adventures of Tom Sawyer"},
		{index: 134, title: "The Diary of a Young Girl"},
		{index: 135, title: "The Diary of a Young Girl"},
		{index: 136, title: "The Diary of a Young Girl"},
		{index: 137, title: "The Diary of a Young Girl"},
		{index: 138, title: "The Good Earth (House of Ea..."},
		{index: 139, title: "The Good Earth (House of Ea..."},
		{index: 140, title: "The Good Earth (House of Ea..."},
		{index: 141, title: "The Good Earth (House of Ea..."},
		{index: 142, title: "The Good Earth (House of Ea..."},
		{index: 143, title: "The Good Earth (House of Ea..."},
		{index: 144, title: "The Metamorphosis"},
		{index: 145, title: "The Metamorphosis"},
		{index: 146, title: "The Metamorphosis"},
		{index: 147, title: "The Metamorphosis"},
		{index: 148, title: "The Metamorphosis"},
		{index: 149, title: "Uncle Tom's Cabin"},
		{index: 150, title: "Uncle Tom's Cabin"},
		{index: 151, title: "Uncle Tom's Cabin"},
		{index: 152, title: "Uncle Tom's Cabin"},
		{index: 153, title: "Uncle Tom's Cabin"},
		{index: 154, title: "Voice Fishing"},
		{index: 155, title: "Voice Fishing"},
		{index: 156, title: "Voice Fishing"},
		{index: 157, title: "Voice Fishing"},
		{index: 158, title: "Voice Fishing"},
		{index: 159, title: "Voice Fishing"},
		{index: 160, title: "War and Peace"},
		{index: 161, title: "War and Peace"},
		{index: 162, title: "War and Peace"},
		{index: 163, title: "War and Peace"},
		{index: 164, title: "War and Peace"},
		{index: 165, title: "Winnie-the-Pooh"},
		{index: 166, title: "Winnie-the-Pooh"},
		{index: 167, title: "Winnie-the-Pooh"},
		{index: 168, title: "X-Man"},
		{index: 169, title: "X-Man"},
		{index: 170, title: "X-Man"},
		{index: 171, title: "X-Man"},
		{index: 172, title: "You & I"},
		{index: 173, title: "You & I"},
		{index: 174, title: "You & I"},
		{index: 175, title: "You & I"},
		{index: 176, title: "You & I"},
		{index: 177, title: "Zebra"},
		{index: 178, title: "Zebra"},
		{index: 179, title: "Zebra"},
		{index: 180, title: "Zebra"},
		{index: 181, title: "겨울왕국"},
		{index: 182, title: "겨울왕국"},
		{index: 183, title: "겨울왕국"},
		{index: 184, title: "겨울왕국"},
		{index: 185, title: "겨울왕국"},
		{index: 186, title: "논스톱 ~~~~~~~~~~~~~~"},
		{index: 187, title: "논스톱 ~~~~~~~~~~~~~~"},
		{index: 188, title: "논스톱 ~~~~~~~~~~~~~~"},
		{index: 189, title: "논스톱 ~~~~~~~~~~~~~~"},
		{index: 190, title: "논스톱 ~~~~~~~~~~~~~~"},
		{index: 191, title: "다이애나"},
		{index: 192, title: "다이애나"},
		{index: 193, title: "다이애나"},
		{index: 194, title: "다이애나"},
		{index: 195, title: "달라스 바이어스 클럽"},
		{index: 196, title: "달라스 바이어스 클럽"},
		{index: 197, title: "달라스 바이어스 클럽"},
		{index: 198, title: "달라스 바이어스 클럽"},
		{index: 199, title: "수상한 그녀"},
		{index: 200, title: "수상한 그녀"},
		{index: 201, title: "수상한 그녀"},
		{index: 202, title: "수상한 그녀"},
		{index: 203, title: "수상한 그녀"},
		{index: 204, title: "제국의 부활"},
		{index: 205, title: "제국의 부활"},
		{index: 206, title: "제국의 부활"},
		{index: 207, title: "제국의 부활"},
		{index: 208, title: "제국의 부활"},
		{index: 209, title: "제국의 부활"},
		{index: 210, title: "폼페이 : 최후의날"},
		{index: 211, title: "폼페이 : 최후의날"},
		{index: 212, title: "폼페이 : 최후의날"},
		{index: 213, title: "폼페이 : 최후의날"},
		{index: 214, title: "폼페이 : 최후의날"},
		{index: 215, title: "폼페이 : 최후의날"},
		{index: 216, title: "폼페이 : 최후의날"},
		{index: 217, title: "!@#$"},
		{index: 218, title: "!@#$"},
		{index: 219, title: "!@#$"},
		{index: 220, title: "!@#$"},
		{index: 221, title: "!@#$"},
		{index: 222, title: "%^&*"},
		{index: 223, title: "%^&*"},
		{index: 224, title: "%^&*"},
		{index: 225, title: "%^&*"},
		{index: 226, title: "%^&*"},
		{index: 227, title: "    _blank_"},
		{index: 228, title: "    _blank_"},
		{index: 229, title: "    _blank_"},
		{index: 230, title: "    _blank_"},
	],
});

// g.hs.DataIndexList
enyo.kind({
	name: "g.hs.DataIndexList",
	kind: "g.Panel",
	mixins: ["g.HandlerMappingsSupport", "g.hs.IndexListSupport", "g.WheelSupport"],
	classes: "g-layout-absolute-wrapper",
	components: [
		{
			name: "list",
			kind: "g.DataList",
			delegateKind: "g.DataIndexListEventDelegate",
			style: "background-color: #212121; border-radius: 9999px",
			components: [
				{components: [
					{name: "listItem", classes:"item-component", style:"border-color: tan; color:Tan; border-bottom-width:1px;", components: [
						{name: "title", style: "width: 260px;font-size:24px; height: 65px; line-height: 65px; margin-left: 42px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"},
					]}
				], bindings: [
					{from: ".model.title", to: ".$.title.content"}
				]}
			]
		},
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	],
	// eventHandler: enyo.inherit(function(sup) {
		// return function(inSender, inEvent) {
			// this.owner.$.status.setContent(inEvent.type); // set status console
			// inEvent.page = this._page;

			// var returnVal = false;
			// if (!returnVal) {
				// returnVal = this.$.wheel.eventHandler(inSender, inEvent);
			// }
			// if (!returnVal) {
				// returnVal = this.$.list.eventHandler(inSender, inEvent);
			// }

			// return sup.apply(this, arguments);
		// };
	// }),
	// isWheelEvent: function(inEvent) {
		// var w = this.$.wheel;
		// if (w && w.isInbounds) {
			// return w.isInbounds(inEvent);
		// }
		// return false;
	// }
});

/** @protected
	_g.DataIndexListEventDelegate_ is for jumping to the first item of current section of list.

**/
enyo.kind({
	name: "g.DataIndexListEventDelegate",
	list: null,
	eventHandler: function(inSender, inEvent) {
		if (inEvent.type == "onSectionChanged") {
			var indexChar = (inEvent.originator.get("sectionLabelList"))[inEvent.sectionIndex];
			var length = this.list.collection.length;
			if (indexChar.match(/^[A-Z]/)) {
				for (var i = 0; i < length; i++) {
					if((this.list.collection.at(i).attributes.title)[0] >= indexChar) {
						this.list.index = i;
						this.list.$.scroller.scrollTo( 0, i * 76 ); /*82 means itemheight = item(80px) + hr(2px)*/
						break;
					}
				}
			} else if (indexChar == "#") {
				this.list.$.scroller.scrollTo( 0, 0 );
			} else if (indexChar == " ") {
				this.list.$.scroller.scrollTo( 0, (length - 1) * 76 );
			} else {
				// FIXME : Not implemented for A-Z
			}
			return true;
		}
		return false;
	}
});

g.hs.IndexListSupport = {
	name: "g.hs.IndexListSupport",
	handlerMappings: {
		// componentName: eventHandlers
		list: "g.DataIndexListHandlers",
		wheel: "g.WheelSectionListControllerHandlers",
		title: "g.TitleHandlers"
	},
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
		};
	}),
	preEventHandler: function(inSender, inEvent) {
		// please write a code here to prevent from calling the default event handlers
		// this function could be removed
		// enyo.log("preEventHandler called");
		this.owner.$.status.setContent(inEvent.type);
	},
	postEventHandler: function(inSender, inEvent) {
		// please write a code here after calling all devault event handlers
		// this function could be removed
		// enyo.log("postEventHandler called");
		this.owner.$.status.setContent(inEvent.type);
	}
};