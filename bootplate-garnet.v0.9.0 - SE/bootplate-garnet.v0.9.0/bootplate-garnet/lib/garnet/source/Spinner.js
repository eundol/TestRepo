/**
	_g.Spinner_ is a control that shows a spinning animation to indicate that
	activity is taking place. Typically, a spinner is shown to indicate activity and hidden to indicate
	that the activity has ended. The animation automatically starts when the
	spinner is shown. If you wish, you may control the animation directly by
	calling the _start()_, _stop()_, and _toggle()_ methods.
*/
enyo.kind({
	name: "g.Spinner",
	//* @protected
	classes: "g-spinner",
	contentChanged: function() {
		this.inherited(arguments);
		this.addRemoveClass("content", !!this.content);
	},
	//* @public
	//* Hides the animating spinner.
	stop: function() {
		this.setShowing(false);
	},
	//* Shows the spinner with animation.
	start: function() {
		this.setShowing(true);
	},
	/** Toggle existing state of spinner.
		If spinner is visible it will be removed and viceversa.
	*/
	toggle: function() {
		this.setShowing(!this.getShowing());
	}
});
