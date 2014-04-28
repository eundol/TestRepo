//* @public
/**
	_g.Progress_ is a  control that shows the current progress of a
	process in a circle.
	To animate progress changes, call the _draw()_ method:

		this.$.progress.draw(50);

	You may customize the lineWidth, and circleColor by applying a style via the
	_circleClasses_ property, e.g.:

		{kind: "g.Progress", lineWidth: 20, circleColor: "#FF0000"}
*/
enyo.kind({
	name: "g.Progress",
	//* @protected
	mixins: [ "g.ValidationSupport" ],
	//* @public
	published: {
		/**
			Method to set width of the line.

			range [ 0 ~ radius ]
		*/
		lineWidth: 10,
		/**
			progress circle color.
		*/
		circleColor: "#6495ED"
	},
	events: {
		//* Fires when progress value is changed.
		onPrgressValueChanged: ""
	},
	//* @protected
	_circ: 0,
	components: [
		{name: "arc", kind: "g.Arc"}
	],
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.lineWidthChanged();
			this.circleColorChanged();
			this._circ = Math.PI * 2;
		};
	}),
	lineWidthChanged: function(inOld) {
		if (this.lineWidth === undefined) {
			this.lineWidth = inOld;
		} else if (this.lineWidth < 0) {
			this.lineWidth = 0;
		} else if (this.lineWidth > g.width*0.5) {
			this.lineWidth = g.width*0.5;
		}
		this.$.arc.setWidth(this.lineWidth);
	},
	circleColorChanged: function() {
		this.$.arc.setColor(this.circleColor);
	},
	//* @public
	/**
		This method draws the arc based on the current value which will be between 0 to 1
		For Increasing progress, call draw need to pass incrementing values from 0 to 1 at regular time intervals
			example:- draw(current/total); current value will be increasing from 0 to total value
		For Decreasing progress, call draw function and pass decrementing values from 1 to 0 at regular time intervals
			example:- draw((total-current)/total); current value will be increasing from 0 to total value
	*/
	draw: function(inValue) {
		if (inValue >= 0 && inValue <= 1) {
			this.$.arc.draw(0, ((this._circ)* inValue));
			this._valueUpdate(inValue);
		}
	},
	//* @protected
	_valueUpdate: function(inValue) {
		this.doPrgressValueChanged({value: inValue});
	}
});
