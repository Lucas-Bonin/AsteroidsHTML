var Points = { //json com vertices dos objetos

	ASTEROIDS: [
		[-4,-2,-2,-4,0,-2,2,-4,4,-2,3,0,4,2,1,4,-2,4,-4,2,-4,-2],
		[-3,0,-4,-2,-2,-4,0,-3,2,-4,4,-2,2,-1,4,1,2,4,-1,3,-2,4,-4,2,-3,0],
		[-2,0,-4,-1,-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,1,-2,4,-4,1,-2,0],
		[-1,-2,-2,-4,1,-4,4,-2,4,-1,1,0,4,2,2,4,1,3,-2,4,-4,1,-4,-2,-1,-2],
		[-4,-2,-2,-4,2,-4,4,-2,4,2,2,4,-2,4,-4,2,-4,-2]
	],

	SHIP: [6,0,-3,-3,-2,0,-3,3,6,0],
	FLAMES: [-2,0,-3,-1,-5,0,-3,1,-2,0]
}

var asteroidSize = 8; //tamanho original de um asteroide

var GameState = State.extend({
	init: function(game){
		this._super(game); //chama construtor da classe pai

		//tamanho do canvas
		this.canvasWidth = game.canvas.ctx.width;
		this.canvasHeight = game.canvas.ctx.height;

		//cria a nave do jogo
		this.ship = new Ship(Points.SHIP,Points.FLAMES,2,0,0);
		this.ship.maxX = this.canvasWidth; 
		this.ship.maxY = this.canvasHeight; 

		this.lvl = 0; //determina a dificuldade do jogo

		this.generateLvl(); //gera as naves do jogo

	},

	generateLvl: function(){
		/*determina quantos asteroides vao respawnar, dependendo do nivel do jogo. 
		OBS: Fazer uma formula melhor para o respawn*/
		var num = Math.round((this.lvl + 5)/10 + 2); 

		//reposiciona nave no inicia de cada fase
		this.ship.x = this.canvasWidth/2;
		this.ship.y = this.canvasHeight/2;

		this.bullets = []; //vetor de balas disparadas

		this.asteroids = []; //asteroides no jogo

		//respawnar randomicamente asteroides sempre nas extremidades da tela
		var x = 0;
		var y = 0;
		if(Math.random() > 0.5){
			x = Math.random()*this.canvasWidth;
		}else{
			y = Math.random()*this.canvasHeight;
		}

		for(var i=0; i<num; i++){

			var n = Math.round(Math.random() * (Points.ASTEROIDS.length-1));
			var astr = new Asteroid(Points.ASTEROIDS[n],asteroidSize,x,y);
			//parametros para asteroide saber o tamanho maximo do canvas
			astr.maxX = this.canvasWidth;
			astr.maxY = this.canvasHeight; 

			this.asteroids.push(astr); //adiciona um asteroide a no vetor
		}

	},

	handleInputs: function(input){ //gerencia a movimentacao da nave
		if(input.isDown("right")){
			this.ship.rotate(0.06);
		}
		if(input.isDown("left")){
			this.ship.rotate(-0.06);
		}
		this.ship.drawFlames = false; //certifica que a chama da nave só vai aparecer quando o jogador estiver segurando "up"
		if(input.isDown("up")){
			this.ship.addVel();
		}
		if(input.isPressed("spacebar")){
			this.bullets.push(this.ship.shoot()); //quando apertar espaco, instancia uma bala no jogo
		}

	},

	update: function(){

		//update do asteroide
		for(var i=0, len=this.asteroids.length; i<len; i++){
			
			var a = this.asteroids[i];
			a.update();


			/* nessa parte, compara se um projetil atingiu um asteroide, mas para isso, compara-se com todos os asteroides
			no jogo, futuramente, implementar um algoritimo para reduzir a quantidade de comparacoes necessárias.*/

			for(var j=0, len2=this.bullets.length; j<len2; j++){ //for percorre o vetor das balas
				var b = this.bullets[j];
				if(a.hasPoint(b.x,b.y)){ //funcao que verifica se um ponto atingiu o asteroide
					this.bullets.splice(j,1); //se atingiu destroi a bala
					len2--;
					j--;

					if(a.size > asteroidSize/4){ //verifica se dá pra dividir o asteroide em dois
						for(var k=0; k<2; k++){ //cria dois asteroides com a metade do tamanho do anterior
							var n = Math.round(Math.random() * (Points.ASTEROIDS.length-1));
							var astr = new Asteroid(Points.ASTEROIDS[n],a.size/2,a.x,a.y);

							//parametros para asteroide saber o tamanho maximo do canvas
							astr.maxX = this.canvasWidth;
							astr.maxY = this.canvasHeight; 

							this.asteroids.push(astr); //adiciona um asteroide a no vetor
							len++;
						}
					}
					this.asteroids.splice(i,1); //tira o asteroide destruido do vetor
					len--;
					i--;
				}

			}



		}

		//update do projetil
		for(var i=0, len=this.bullets.length; i<len; i++){
			var b = this.bullets[i];
			b.update();

			if(b.shallRemove){ //se o projetil ja passou do limite do campo, ele é desconsiderado do vetor de balas
				this.bullets.splice(i, 1);
				len--;
				i--;
			}
		}


		this.ship.update();

		if(this.asteroids.length === 0){ //quando acabar asteroides na fase, gerar nova fase
			this.lvl++;
			this.generateLvl();
		}
		
	},

	render: function(ctx){
		ctx.clearAll(); //limpa canvas antes de escrever algo

		for(var i=0, len=this.asteroids.length; i<len; i++){
			this.asteroids[i].draw(ctx); //desenha um poligono 
		}

		for(var i=0, len=this.bullets.length; i<len; i++){
			this.bullets[i].draw(ctx);
		}

		this.ship.draw(ctx);  
	}
})