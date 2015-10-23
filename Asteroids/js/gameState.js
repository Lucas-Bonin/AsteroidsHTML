var Points = { //json com vertices dos asteroides

	ASTEROIDS: [
		[-4,-2,-2,-4,0,-2,2,-4,4,-2,3,0,4,2,1,4,-2,4,-4,2,-4,-2],
		[-3,0,-4,-2,-2,-4,0,-3,2,-4,4,-2,2,-1,4,1,2,4,-1,3,-2,4,-4,2,-3,0],
		[-2,0,-4,-1,-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,1,-2,4,-4,1,-2,0],
		[-1,-2,-2,-4,1,-4,4,-2,4,-1,1,0,4,2,2,4,1,3,-2,4,-4,1,-4,-2,-1,-2],
		[-4,-2,-2,-4,2,-4,4,-2,4,2,2,4,-2,4,-4,2,-4,-2]
	]
}

var GameState = State.extend({
	init: function(game){
		this._super(game); //chama construtor da classe pai

		//teste para verificar desenho no canvas
		var n = Math.round(Math.random() * Points.ASTEROIDS.length-1);
		this.astr = new Asteroid(Points.ASTEROIDS[n],10,100,100);
	},

	update: function(){
	},

	render: function(ctx){
		ctx.clearAll(); //limpa canvas antes de escrever algo
		this.astr.draw(ctx); //desenha um poligono comecando do ponto 100 100
	}
})