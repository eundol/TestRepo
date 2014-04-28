//* @public
/**
	_g.ProgressBar_ is a  control that shows the current progress of a
	process in a horizontal bar.

		{kind: "g.ProgressBar", progress: 10}

	To animate progress changes, call the _animateProgressTo()_ method:

		this.$.progressBar.animateProgressTo(50);

	You may customize the color of the bar by applying a style via the
	_barClasses_ property, e.g.:

		{kind: "g.ProgressBar", barClasses: "class-name"}

	For more information, see the documentation on [Progress
	Indicators](building-apps/controls/progress-indicators.html) in the Enyo
	Developer Guide.
*/
enyo.kind({
	name: "g.ProgressBar",
	//* @protected
	mixins: [ "g.ValidationSupport" ],
	//* @public
	published: {
		/**
			Current position of progress bar

			range [0 ~ Positive Integer]
		*/
		progress: 0,
		/**
			Completion percentage for background process
			range [0~100]
		*/
		bgProgress: 0,
		/**
			Minimum progress value (i.e., no progress made)

			range [0 ~ Positive Integer]
		*/
		min: 0,
		/**
			Maximum progress value (i.e., process complete)

			range [0 ~ Positive Integer]
		*/
		max: 9,
		//* CSS classes to apply to progress bar
		barClasses: "g-progress-bar-bar",
		//* CSS classes to apply to bg progress bar
		bgBarClasses: "g-progress-bg-bar"
	},
	events: {
		//* Fires when progress bar finishes animating to a position.
		onAnimateProgressFinish: "",
		//* Fires when progress bar changed
		onProgressBarChanged:""
	},
	//* @protected
	classes: "g-progress-bar",
	components: [
		{name: "progressAnimator", kind: "Animator", onStep: "_progressAnimatorStep", onEnd: "_progressAnimatorComplete"},
		{name: "bgbar"},
		{name: "bar"}
	],
	create: function() {
		this.inherited(arguments);
		this.progressChanged();
		this.barClassesChanged();
		this.bgBarClassesChanged();
		this.bgProgressChanged();
		this.minChanged();
		this.maxChanged();
	},
	minChanged: function(inOld) {
		if (this.min === undefined) {
			this.min = inOld;
		} else if (this.min < 0) {
			this.min = 0;
		}
		this.bgProgressChanged(this.bgProgress);
		this.progressChanged(this.progress);
	},
	maxChanged: function(inOld) {
		if (this.max === undefined) {
			this.max = inOld;
		} else if (this.max < 0) {
			this.max = 0;
		}
		this.bgProgressChanged(this.bgProgress);
		this.progressChanged(this.progress);
	},
	barClassesChanged: function(inOld) {
		if (this.barClasses === undefined) {
			this.barClasses = inOld;
		}
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},
	bgBarClassesChanged: function(inOld) {
		if (this.bgBarClasses === undefined) {
			this.bgBarClasses = inOld;
		}
		this.$.bgbar.removeClass(inOld);
		this.$.bgbar.addClass(this.bgBarClasses);
	},
	bgProgressChanged: function(inOld) {
		if (this.bgProgress === undefined) {
			this.bgProgress = inOld;
		}
		this.bgProgress = this._clampValue(this.min, this.max, this.bgProgress);
		var p = this._calcPercent(this.bgProgress);
		this._updateBgBarPosition(p);
	},
	progressChanged: function(inOld) {
		if (this.progress === undefined) {
			this.progress = inOld;
		}
		this.progress = this._clampValue(this.min, this.max, this.progress);
		var p = this._calcPercent(this.progress);
		this._updateBarPosition(p);
	},
	//* @public
	//* Animates progress to the passed-in value.
	animateProgressTo: function(inValue) {
		if (inValue !== undefined) {
			this.$.progressAnimator.play({
				startValue: this.progress,
				endValue: this._clampValue(this.min, this.max, inValue),
				node: this.hasNode()
			});
		}
	},
	//* @protected
	_clampValue: function(inMin, inMax, inValue) {
		if (inValue > inMax) {
			inValue = inMax;
		} else if (inValue < inMin) {
			inValue = inMin;
		}
		return inValue;
	},
	_calcRatio: function(inValue) {
		return (inValue - this.min) / (this.max - this.min);
	},
	_calcPercent: function(inValue) {
		return this._calcRatio(inValue) * 100;
	},
	_updateBarPosition: function(inPercent) {
		this.$.bar.applyStyle("width", inPercent + "%");
	},
	_updateBgBarPosition: function(inPercent) {
		this.$.bgbar.applyStyle("width", inPercent + "%");
	},
	_progressAnimatorStep: function(inSender) {
		this.setProgress(inSender.value);
		this.doProgressBarChanged(inSender);
		return true;
	},
	_progressAnimatorComplete: function(inSender) {
		this.doAnimateProgressFinish(inSender);
		return true;
	}
});
