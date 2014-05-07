
	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime();

		this._animateDestX = destX;
		this._animateDestY = destY;
		this._animateDestTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= that._animateDestTime) {
				that.isAnimating = false;
				that._translate(that._animateDestX, that._animateDestY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / (that._animateDestTime - startTime);
			easing = easingFn(now);
			newX = ( that._animateDestX - startX ) * easing + startX;
			newY = ( that._animateDestY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}
		}

		this.isAnimating = true;
		step();
	},