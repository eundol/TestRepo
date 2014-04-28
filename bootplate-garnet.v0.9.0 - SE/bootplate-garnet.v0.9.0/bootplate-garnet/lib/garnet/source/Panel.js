//* @public
/**
	_g.Panel_ is the default kind for controls created inside a
	<a href="#g.PanelSet">g.PanelSet</a> container.  Typically, a _g.PanelSet_
	will contain several instances of _g.Panel_.

	The built-in features of _moon.g_ include a header and a body
*/
enyo.kind({
	//* @public
	name: "g.Panel",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	handlers: {
		ondragfinish: "eventHandler"
	},
	//* @public
	/**
	The option to enable Panel-moving functionality with drag/flick actions.
	If this property is true, Panel-moving is functional. The default value is true.

	range [true, false]
	*/
	enablePanelMoveEvent: true,
	//* @protected
	_verticalGestureTangent: 0.577, // or lower, Math.abs(dx / dy), tangent(30degree)
	_horizontalGestureTangent: 1.732, // or higher, Math.abs(dx / dy), tangent (60degree)
	classes: "g-panel",
	//* @protected
	eventHandler: function(inSender, inEvent) {
		if (this.enablePanelMoveEvent && this.container && this.container._panelSetInherited === true && !inEvent._ComponentHandled) {
			if (inEvent.type === "dragfinish") {
				var dx = inEvent.dx;
				var dy = inEvent.dy;
				var absoluteTangent = Math.abs(dx / dy);
				if (absoluteTangent < this._verticalGestureTangent) {
					if (dy > 0) {
						this._gestureDown();
					} else {
						this._gestureUp();
					}
				} else if (absoluteTangent > this._horizontalGestureTangent) {
					if (dx > 0) {
						this._gestureRight();
					} else {
						this._gestureLeft();
					}
				} else {
					// ignore ambiguious movement
					return false;
				}
				inEvent.preventTap();
				return true;
			}
		}
		return false;
	},
	_gestureUp: function() {
	},
	_gestureDown: function() {
	},
	_gestureLeft: function() {
		this.container.next();
	},
	_gestureRight: function() {
		this.container.previous();
	}
});
