g.sample.BoxHandlers = {
	ondrag : "drag",
	ondragfinish: "dragfinish"
};

enyo.kind({
	name: "g.sample.box",
	published: {
		x: 0,
		y: 0
	},
	dx: 0,
	dy: 0,
	handlers: {
		ondrag : "drag",
		ondragfinish: "dragfinish"
	},
	style: "position: absolute; width: 100px; height: 50px; background-color: yellow;",
	create: function() {
		this.inherited(arguments);
		this._updatePosition();
	},
	drag: function(inSender, inEvent) {
		this.dx = inEvent.dx;
		this.dy = inEvent.dy;

		this._updatePosition();
	},
	dragfinish: function(inSender, inEvent) {
		this.dx = 0;
		this.dy = 0;

		this._updatePosition();
	},
	_updatePosition: function() {
		this.applyStyle("left", this.x + this.dx + "px");
		this.applyStyle("top", this.y + this.dy + "px");
	}
});

enyo.kind({
	name: "g.sample.HandlerMappingsSample",
	mixins: ["g.HandlerMappingsSupport"],
	handlerMappings: {
		".$.box1": "g.sample.BoxHandlers",
		".$.checkbox": {
			ontap: "tap"
		}
	},
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Handler Mappings Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Drag boxes : Drag or tap boxes", classes: "g-sample-subheader"},
		{name: "box1", kind: "g.sample.box", x: 10, y: 200},
		{name: "box2", kind: "g.sample.box", x: 200, y: 200, components: [
			{name: "checkbox", kind: "g.Checkbox"}
		]}
	]
});
