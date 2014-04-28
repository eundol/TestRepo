/** @protected
	_g.WheelSupport is for checking whether the area user touched is in a wheel or not.

**/
g.WheelSupport = {
	name: "g.WheelSupport",
	isWheelEvent: function(inEvent) {
		var w = this.$.wheel;
		if (w && w.isInbounds) {
			return w.isInbounds(inEvent);
		}
		return false;
	}
};
