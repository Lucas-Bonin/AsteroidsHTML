
var asteroidSize = 8; //tamanho original de um asteroide
var probPowerUp = 0.1; //probabilidade de respawnar um powerUp

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

		this.lives = 4;
		this.score = 0; 

		//vida que aparece na tela
		this.lifePolygon = new Polygon(Points.SHIP);
		this.lifePolygon.scale(1.5);
		this.lifePolygon.rotate(-Math.PI/2);

		this.gameOver = false; //flag que verifica final do jogo

		this.lvl = 0; //determina a dificuldade do jogo

		this.generateLvl(); //gera as naves do jogo

	},

	generateLvl: function(){
		/*determina quantos asteroides vao respawnar, dependendo do nivel do jogo. 
		OBS: Fazer uma formula melhor para o respawn*/
		//var num = Math.round(Math.atan(this.lvl/25)) + 3; 
		var num = this.lvl*2 + 3;
		//reposiciona nave no inicia de cada fase
		this.ship.x = this.canvasWidth/2;
		this.ship.y = this.canvasHeight/2;

		this.ship.isTripleShoot = false; //nave comeca outra fase sem o powerUp

		this.bullets = []; //vetor de balas disparadas

		this.asteroids = []; //asteroides no jogo

		this.powerUps = []; //powerUps no jogo



		for(var i=0; i<num; i++){

			var n = Math.round(Math.random() * (Points.ASTEROIDS.length-1));

			//respawnar randomicamente asteroides sempre nas extremidades da tela
			var x = 0;
			var y = 0;
			if(Math.random() > 0.5){
				x = Math.random()*this.canvasWidth;
			}else{
				y = Math.random()*this.canvasHeight;
			}

			var astr = new Asteroid(Points.ASTEROIDS[n],asteroidSize,x,y);
			//parametros para asteroide saber o tamanho maximo do canvas
			astr.maxX = this.canvasWidth;
			astr.maxY = this.canvasHeight; 

			this.asteroids.push(astr); //adiciona um asteroide a no vetor
		}

	},

	handleInputs: function(input){ //gerencia a movimentacao da nave
		
		if(!this.ship.visible){ //quando jogador morrer, o jogo só recomeca quando ele apertar espaco
			if(input.isPressed("spacebar")){

				if(this.gameOver){

					this.game.nextState = States.END;
					this.game.stateVars.score = this.score; //passa score para uma variavel da main
					return;
				}
				this.ship.visible = true;
			}

			return;
		}

		if(input.isDown("right")){
			this.ship.rotate(0.06);
		}
		if(input.isDown("left")){
			this.ship.rotate(-0.06);
		}
		if(input.isDown("up")){
			this.ship.addVel();
		}
		if(input.isPressed("spacebar")){

			var newBullets = this.ship.shoot();
			for (var i=0,len = newBullets.length; i<len;i++){
				this.bullets.push(newBullets[i]); //quando apertar espaco, instancia uma bala no jogo
			}
		}

	},

	update: function(){

		//update do asteroide
		for(var i=0, len=this.asteroids.length; i<len; i++){
			
			var a = this.asteroids[i];
			a.update();

			//compara se um asteroide atingiu a nave, pode-se otimizar a funcao

			if(this.ship.collide(a)){

				//centraliza nave e remove sua aceleracao
				this.ship.x = this.canvasWidth/2;
				this.ship.y = this.canvasHeight/2;

				this.ship.isTripleShoot = false; //tira powerUp da nave

				this.ship.vel = {
					x: 0,
					y: 0
				}

				this.lives--; //decrementa a vida do jogador
				if(this.lives <= 0){
					this.gameOver = true;
				}
				this.ship.visible = false; //deixa a nave invisivel
				this.ship.drawFlames = false; 	
			}

			/* nessa parte, compara se um projetil atingiu um asteroide, mas para isso, compara-se com todos os asteroides
			no jogo, futuramente, implementar um algoritimo para reduzir a quantidade de comparacoes necessárias.*/

			for(var j=0, len2=this.bullets.length; j<len2; j++){ //for percorre o vetor das balas
				var b = this.bullets[j];
				if(a.hasPoint(b.x,b.y)){ //funcao que verifica se um ponto atingiu o asteroide
					this.bullets.splice(j,1); //se atingiu destroi a bala
					len2--;
					j--;

					//determina quantos pontos jogador vai receber por ter acertado o asteroide
					switch(a.size){
						case asteroidSize:
							this.score += 20;
						break;
						case asteroidSize/2:
							this.score += 50;
						break;
						case asteroidSize/4:
							this.score += 100;
						break;
					}

					if(a.size > asteroidSize/4){ //verifica se dá pra dividir o asteroide em dois
						for(var k=0; k<2; k++){ //cria dois asteroides com a metade do tamanho do anterior

							var astr = null;

							var n = Math.round(Math.random() * (Points.ASTEROIDS.length-1));

							if(Math.random()>probPowerUp){ //determina se o que será respawnado será um asteroide ou um powerUp
								astr = new Asteroid(Points.ASTEROIDS[n],a.size/2,a.x,a.y);
								//parametros para asteroide saber o tamanho maximo do canvas
								astr.maxX = this.canvasWidth;
								astr.maxY = this.canvasHeight; 

								this.asteroids.push(astr); //adiciona um asteroide a no vetor
								len++;


							}else{
								astr = new PowerUp(a.x,a.y);

								astr.maxX = this.canvasWidth;
								astr.maxY = this.canvasHeight; 

								this.powerUps.push(astr);
							}

							
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

		//updadte do powerUp
		for(var i=0, len=this.powerUps.length; i<len; i++){
			
			var a = this.powerUps[i];
			a.update();

			//compara se a nave acertou um powerUp
			if(this.ship.collide(a)){

				//verifica o tipo do powerUp
				this.setPowerUp(a.powerType);
				this.powerUps.splice(i,1); //tira o asteroide destruido do vetor
				len--;
				i--;


			}

			//verifica se alguma bala acertou o powerUp

			for(var j=0, len2=this.bullets.length; j<len2; j++){ //for percorre o vetor das balas
				var b = this.bullets[j];
				if(a.hasPoint(b.x,b.y)){ //funcao que verifica se um ponto atingiu o asteroide
					this.bullets.splice(j,1); //se atingiu destroi a bala
					len2--;
					j--;

					this.setPowerUp(a.powerType);

					this.powerUps.splice(i,1); //tira o asteroide destruido do vetor
					len--;
					i--;
				}

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

		//mostra o score na tela
		ctx.vectorText(this.score,3,35,15); //OBS: valores absolutos para o tamanho do texto, futuramente fazer responsivo

		//desenha as vidas na tela
		//OBS: valor fixo para o desenho, mudar para se ajustar ao tamanho da tela
		for(var i=0; i < this.lives; i++){
			ctx.drawPolygon(this.lifePolygon, 40+15*i, 50);
		}

		for(var i=0, len=this.asteroids.length; i<len; i++){
			this.asteroids[i].draw(ctx); //desenha um poligono 
		}

		for(var i=0, len=this.powerUps.length; i<len; i++){
			this.powerUps[i].draw(ctx);
		}


		for(var i=0, len=this.bullets.length; i<len; i++){
			this.bullets[i].draw(ctx);
		}

		if(this.gameOver){ //se acabar jogo, printar mensagem na tela
			ctx.vectorText("Game Over",4, null,null); //parametro null centraliza a imagem na tela
		}

		this.ship.draw(ctx);  
	},

	//aciona o powerUp
	setPowerUp: function(currentPowerUp){
		switch (currentPowerUp){

			case POWER.LIFE:
					this.lives++;
				break;
			case POWER.THREE_BULLETS:
					this.ship.isTripleShoot = true;
				break;
			case POWER.DESTRUCTION:
					//destroi todos os asteroides em cena, case eles ainda possam se partir, cria mais asteroides
					var asteroidsAux = [];
					for(var i=0, len=this.asteroids.length; i<len; i++){

						var a = this.asteroids[i];

						//determina quantos pontos jogador vai receber por ter acertado o asteroide
						switch(a.size){
							case asteroidSize:
								this.score += 20;
							break;
							case asteroidSize/2:
								this.score += 50;
							break;
							case asteroidSize/4:
								this.score += 100;
							break;
						}

						if(a.size > asteroidSize/4){ //verifica se dá pra dividir o asteroide em dois
							for(var k=0; k<2; k++){ //cria dois asteroides com a metade do tamanho do anterior
								var n = Math.round(Math.random() * (Points.ASTEROIDS.length-1));
								var astr = new Asteroid(Points.ASTEROIDS[n],a.size/2,a.x,a.y);
								//parametros para asteroide saber o tamanho maximo do canvas
								astr.maxX = this.canvasWidth;
								astr.maxY = this.canvasHeight; 

								asteroidsAux.push(astr); //adiciona um asteroide a no vetor
								
							}
						}
					}

					this.asteroids = asteroidsAux;

				break;
			case POWER.DOUBLE_SCORE:
						this.score += this.score;
				break;
		}


	}
})