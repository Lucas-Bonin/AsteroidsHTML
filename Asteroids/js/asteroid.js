var Asteroid = Polygon.extend({

	init: function(p, s, x, y){ //vetor de pontos, escala, posicao inicial em x e y
		this._super(p);
		this.x = x;
		this.y = y;

		this.scale(s);
	}, 

	draw: function(ctx){
		ctx.drawPolygon(this, this.x, this.y);
	}

})