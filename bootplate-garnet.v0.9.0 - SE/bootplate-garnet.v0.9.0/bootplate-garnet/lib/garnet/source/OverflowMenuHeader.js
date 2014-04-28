//* @public
/**
	_g.OverflowMenuHeader is a title that showing the popup when user tap the menu area.
*/
enyo.kind({
	name: "g.OverflowMenuHeader",
	//* @protected
	kind: "g.Title",
	classes: "g-overflow-menu",
	create: enyo.inherit(function(sup) {
		return function() {
			if (this.content !== undefined) {
				this.components = [{
					kind: "ToolDecorator",
					components: [
						{classes: "g-overflow-icon"},
						{name: "content", content: this.content, classes: "g-overflow-title"}
					]
				}];
				delete this.content;
			}
			sup.apply(this, arguments);
		};
	}),
	contentChanged: function() {
		this.$.content.setContent(this.content);
		this.$.content.render();
		this.content = undefined;
	},
	getContent: function() {
		return this.$.content.getContent();
	}
});

g.OverflowMenu = g.OverflowMenuHeader;
