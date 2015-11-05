
var POWER = {
	LIFE: 0,
	THREE_BULLETS: 1,
	DESTRUCTION: 2,
	DOUBLE_SCORE: 3
}


var powerUpSize = 8;

var PowerUp = Asteroid.extend({

	init: function(x,y){
		//seleciona um poder randomico para o objeto
		var n = Math.round(Math.random() * 4);

		this._super(Points.POWER_UP[n],powerUpSize,x,y);

		switch (n){

			case 0:
				this.powerType = POWER.LIFE;
				break;
			case 1:
				this.powerType = POWER.THREE_BULLETS;
				break;
			case 2:
				this.powerType = POWER.DESTRUCTION;
				break;
			case 3:
				this.powerType = POWER.DOUBLE_SCORE;
				break;
		}

	},

	draw: function(ctx){

		var randomColor = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';

		ctx.drawPolygon(this, this.x, this.y, randomColor);
	}




})