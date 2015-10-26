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

		this.asteroids = []; //asteroides no jogo

		//teste para verificar desenho no canvas

		for(var i=0; i<10; i++){

			var n = Math.round(Math.random() * (Points.ASTEROIDS.length-1));
			var astr = new Asteroid(Points.ASTEROIDS[n],10,100,100);
			//parametros para asteroide saber o tamanho maximo do canvas
			astr.maxX = game.canvas.ctx.width;
			astr.maxY = game.canvas.ctx.height;

			this.asteroids.push(astr); //adiciona um asteroide a no vetor
		}

	},

	update: function(){

		for(var i=0, len=this.asteroids.length; i<len; i++){
			this.asteroids[i].update();
		}
		
	},

	render: function(ctx){
		ctx.clearAll(); //limpa canvas antes de escrever algo

		for(var i=0, len=this.asteroids.length; i<len; i++){
			this.asteroids[i].draw(ctx); //desenha um poligono
		}
	}
})