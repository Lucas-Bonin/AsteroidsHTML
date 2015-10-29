var MenuState = State.extend({

	init: function(game){ //quando iniciar menu, respawnar alguns asteroides no background
		this.game = game;

		this.canvasWidth = game.canvas.ctx.width;
		this.canvasHeight = game.canvas.ctx.height;


		var num = Math.random()*5 +5;
		this.asteroids = []; //asteroides no jogo

		//respawnar randomicamente asteroides sempre nas extremidades da tela

		for(var i=0; i<num; i++){

			var n = Math.round(Math.random() * (Points.ASTEROIDS.length-1));

			var x = Math.random()*this.canvasWidth;
			var y = Math.random()*this.canvasHeight;

			//variar tamanho dos asteroides
			s = [1,2,4][Math.round(Math.random()*2)];

			var astr = new Asteroid(Points.ASTEROIDS[n],asteroidSize/s,x,y);
			//parametros para asteroide saber o tamanho maximo do canvas
			astr.maxX = this.canvasWidth;
			astr.maxY = this.canvasHeight; 

			this.asteroids.push(astr); //adiciona um asteroide a no vetor
		}

	},

	handleInputs: function(input){

		if(input.isPressed("spacebar")){ //quando espaco for pressionado, comeca o jogo
			this.game.nextState = States.GAME;
		}

	},

	update: function(){
		for(var i=0,len=this.asteroids.length; i<len; i++){
			this.asteroids[i].update();
		}
	},

	render: function(ctx){

		ctx.clearAll();

		//OBS: trocar valores absolutos dos textos
		ctx.vectorText("ASTEROIDS",6,null,180);
		ctx.vectorText("push space to play",2,null,260);

		for(var i=0,len=this.asteroids.length; i<len; i++){
			this.asteroids[i].draw(ctx);
		}

	}

})