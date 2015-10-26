var Asteroid = Polygon.extend({

	//determina os limites do canvas que o asteroide possa percorrer
	maxX: null,
	maxY: null,

	init: function(p, s, x, y){ //vetor de pontos, escala, posicao inicial em x e y
		this._super(p);
		this.x = x;
		this.y = y;

		this.scale(s);

		//propriedades para fazer a movimentacao dos asteroides

		this.rotAngle = 0.01*(Math.random()*2 - 1); //velocidade de rotacao varia de +- 0.01 
		var r = 2*Math.PI*Math.random(); //recebe um angulo de rotacao inicial que varia entre 0 e 2PI
		var v = Math.random()*4 + 1; //randomiza a velocidade do asteroide

		this.vel = { //vel é um vetor, nao um numero escalar
			x: v*Math.cos(r),
			y: v*Math.sin(r)
		}
	}, 

	update: function(){
		//atualiza a posicao do asteroide
		this.x += this.vel.x;
		this.y += this.vel.y;

		//essa verificacao permite ao asteroide, quando estiver saindo de um lado da tela, aparecer do outro lado, tipo o jogo Snake
		if(this.x> this.maxX){
			this.x = 0;
		}else if(this.x<0){
			this.x = this.maxX;
		}
		if(this.y>this.maxY){
			this.y = 0;
		}else if(this.y<0){
			this.y = this.maxY;
		}

		this.rotate(this.rotAngle); //chama funcao da classe pai
	},

	draw: function(ctx){
		ctx.drawPolygon(this, this.x, this.y);
	}

})