/*
##   @b Garnet Test App Integrated
#
#    @brief
#        - Goal : Testing Garnet API
#
#    @remark
#        - 2014. 2. 13. Initial created
#		 - 2014. 2. 25. Edit api list
#        - 2014. 3.  2. Apply black theme
#        - 2014. 3.  5. Add App Counts Index
#		 - 2014. 3. 12. Edit api list - 0.6.4
#		 - 2014. 3. 24. Add section api list, Edit api list - 0.7.1
#		 - 2014. 3. 24. Edit api list - 0.7.2
#		 - 2014. 3. 25. Add scroll event (hide & show sections)
#		 - 2014. 3. 27. Add g.PickerPanel component
#		 - 2014. 4.  7. Edit api list - 0.8.1
#		 - 2014. 4. 17. Edit api list - 0.9.0
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.8
#
#    ** Do not change names related with operating (such as 'main', 'list', 'component'...)
*/

enyo.kind({
	name: "g.Test.App",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
		ontap: "ontapEventOperator",
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			{kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9998; pointer-events: none;"},
			// Watch background - black
			{classes: "watch-background black"},
			// Main
			{name: "main", components: [
			
				/* First - API List */
				{name: "list", components: [
					// Title
					{classes: "title", components:[
						{classes: "title-text", content: "Garnet Test"}
					]},
					// Component list - enyo.Scroller
					{name: "componentList", kind: "enyo.Scroller", onScrollStart: "hideSections", onScrollStop: "showSections", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel list-sroller white", components: [
						// Component list - Repeater
						{kind: "Repeater", onSetupItem: "setupItem", components: [
							{name: "item", classes: "item-component", ontap: "loadTestApp", components:[
								{name: "component"}
							]},
						]}, 
					]},
					{name:"appCounts", content: "", style:"font-size:11px; color: black; position:absolute; margin-top:5px; right:5px; font-family: Miso; z-index: 9999;"}
				]},
				
				/* Second - Setting Properties */
				/* Third - Rendering Target */
			]},
		]},
	],
	
	create: function(inSender, inEvent) {
		this.inherited(arguments);
		// create doms by repeater
		this.$.repeater.setCount(this.api.length);
		this.$.appCounts.setContent(this.apiCounts + "/" + this.api.length);
		this.setupSectionApiList();
	},
	
	// load test app
	loadTestApp: function(inSender, inEvent){
		var component = inEvent.originator.getContent()
		var testApp;
		for(var i = 0 ; i < this.api.length ; i++){
			if(this.api[i].component == component){
				testApp = this.api[i].testApp;
				break;
			}
		}
		enyo.log('component : ' + component + ',\ttestApp : ' + testApp);
		if(testApp != null && testApp != ""){
			enyo.log('Loading... ' + testApp);
			this.$.list.addClass("visibility-hidden");
			this.$.main.createComponent({
				name: component.charAt(0).toLowerCase() + component.substr(1),
				kind: testApp,},{owner:this}).render();
			this.nowTestApp = testApp;
		}else{
			enyo.log('testApp is disabled');
		}
	},
	nowTestApp: "",
	
	// ontapEventOperator - shift page : print log by ontap
	ontapEventOperator: function(inSender, inEvent){
		// ontap logger
		enyo.log('id : ' + inEvent.originator.id + ',\tname : ' + inEvent.originator.name + ',\tkind : ' + inEvent.originator.kind + ',\tcontent : ' + inEvent.originator.getContent() + ',\towner : ' + inEvent.originator.owner);
		if(inEvent.originator.name == 'backToList' || inEvent.originator.name == 'backToListText'){
			enyo.log(this.nowTestApp + " will be removed...");
			this.$.main.children[1].destroy();
			enyo.log("done... show api-list");
			this.$.list.removeClass('visibility-hidden');
		}else if(inEvent.originator.id.indexOf('app_sections_') > -1 && inEvent.originator.kind == 'Control'){
			this.sectionApiListEvent(inSender, inEvent);
		}
	},
	
	apiCounts : 0,
	
	// setup api list
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item;
		var api = this.api[index];
		item.$.component.setContent(api.component);
		// when testApp is disabled, text will be changed
		if(this.api[index].testApp == ""){
			item.$.item.addClass("disabled");
		}else{
			this.apiCounts++;
		}
		// when last component, border-bottom disappear & have a gap with bottom
		if(index == (this.api.length-1)){
			item.$.item.applyStyle("border-bottom-width","0px;");
			item.$.item.applyStyle("margin-bottom","50px;");
		}
		return true;
	},

	// setup section api list
	setupSectionApiList: function(inSender, inEvent){
		//clear
		if (this._sectionApiListView !== undefined) {
			this._sectionApiListView.destroy();
			this._sectionApiListView = undefined;
		}
		//create parent node
		this._sectionApiListView = this.$.list.createComponent({name: "sections",style:"text-align:center;"},{owner:this});
		this._sectionApiListView.applyStyle("z-index","9999;");
		//create sections, at (width/2 - padding + cos(T), height/2 - padding + sin(T))
		var theta = (Math.PI/4);
		this._startTheta = theta - (Math.PI/2);
		this._deltaTheta = (6.16*theta)/this.api.length;
		var x0 = g.width/2 - 15;
		var y0 = g.height/2 - 15;
		for (var i=0; i<this.api.length; i++) {
			var xx = x0 + (x0)*Math.cos(this._startTheta + this._deltaTheta*i);
			var yy = y0 + (y0)*Math.sin(this._startTheta + this._deltaTheta*i);
			if(this.api[i].testApp == ""){
				this._sectionApiListView.createComponent({
					name: this.api[i].component,
					content: this.api[i].component,
					style:"cursor:pointer; color:gray; font-size:1px; overflow:hidden; width: 10px; height: 10px; position: absolute; text-align: center; left: " + (xx+10) + "px; top: " + (yy+10) + "px;"
				});
			}else{
				this._sectionApiListView.createComponent({
					name: this.api[i].component,
					content: this.api[i].component,
					style:"cursor:pointer; font-size:1px; overflow:hidden; width: 10px; height: 10px; position: absolute; text-align: center; left: " + (xx+10) + "px; top: " + (yy+10) + "px;"
				});
			}
			
		};
	},
	// section api list ontap event
	sectionApiListEvent: function(inSender, inEvent){
		for (var i = 0; i < this.api.length; i++){
			if(this.api[i].component == inEvent.originator.name) {
				this.$.componentList.scrollTo( 0, (i * 51.3) - 92);
				break;
			}
		}
		this.loadTestApp(inSender, inEvent);
		
	},
	
	// hide & show sections
	hideSections: function(){
		this.$.sections.applyStyle("visibility","hidden");
	},
	showSections: function(){
		this.$.sections.applyStyle("visibility","visible");
	},
	
/*------ EDIT ------*/
	// api list 
	api: [
		{component: "Button", 						testApp : "g.Test.Button"},
		{component: "Checkbox", 					testApp : ""},
		{component: "CircularThumb", 				testApp : ""},
		{component: "CommandBar", 					testApp : "g.Test.CommandBar"},
		{component: "ConfirmPopup", 				testApp : "g.Test.ConfirmPopup"},
		{component: "ContextualPopup",				testApp : "g.Test.ContextualPopup"},
		{component: "DataGridList", 				testApp : "g.Test.DataGridList"},
		{component: "DataIndexList", 				testApp : ""},
		{component: "DataList", 					testApp : "g.Test.DataList"},
		{component: "DatePickerPanel", 				testApp : "g.Test.DatePickerPanel"},
		{component: "Icon", 						testApp : "g.Test.Icon"},
		{component: "IconButton", 					testApp : "g.Test.IconButton"},
		{component: "IntegerScrollPicker", 			testApp : ""},
		{component: "Loading", 						testApp : "g.Test.Loading"},
		{component: "MultiPickerListPanel", 		testApp : "g.Test.MultiPickerListPanel"},
		{component: "Notification", 				testApp : "g.Test.Notification"},
		{component: "OverflowMenu", 				testApp : "g.Test.OverflowMenu"},
		{component: "Panel", 						testApp : "g.Test.Panel"},
		{component: "PanelIndicator", 				testApp : "g.Test.PanelIndicator"},
		{component: "PanelSet", 					testApp : "g.Test.PanelSet"},
		{component: "PickerPanel", 					testApp : "g.Test.PickerPanel"},
		{component: "Popup", 						testApp : "g.Test.Popup"},
		{component: "Progress", 					testApp : "g.Test.Progress"},
		{component: "ProgressBar",					testApp : "g.Test.ProgressBar"},
		{component: "Scroller", 					testApp : "g.Test.Scroller"},
		{component: "ScrollPopup", 					testApp : ""},
		{component: "TimePickerPanel", 				testApp : "g.Test.TimePickerPanel"},
		{component: "Title", 						testApp : "g.Test.Title"},
		{component: "Toast", 						testApp : "g.Test.Toast"},
		{component: "ToastPopup", 					testApp : "g.Test.ToastPopup"},
		{component: "ToggleButton", 				testApp : "g.Test.ToggleButton"},
		{component: "ToggleIconButton",				testApp : "g.Test.ToggleIconButton"},
		{component: "WheelDataListController", 		testApp : "g.Test.WheelDataListController"},
		{component: "WheelPicker", 					testApp : "g.Test.WheelPicker"},
		{component: "WheelPickerController",		testApp : "g.Test.WheelPickerController"},
		{component: "WheelSectionListController", 	testApp : "g.Test.WheelSectionListController"},
		{component: "WheelSliderPanel", 			testApp : "g.Test.WheelSliderPanel"},
	]
/*------------------*/
});
