var Ship = Polygon.extend({

	//determina os limites do canvas que o asteroide possa percorrer
	maxX: null,
	maxY: null,

	init: function(p, pf, s, x, y){ //vetor de pontos, pontos da chama da nava, escala, posicao inicial em x e y
		this._super(p);
		this.x = x;
		this.y = y;

		this.flames = new Polygon(pf);//cria a chama atras da nave
		this.flames.scale(s);

		this.drawFlames = false;
		this.visible = true;
		
		this.angle = 0;

		this.scale(s);

		this.isTripleShoot = false;

		this.vel = { //vel é um vetor, nao um numero escalar
			x: 0,
			y: 0
		}
	},

	collide: function(astr){ //compara se asteroide atingiu a nave
		if(!this.visible){ //quando a nave nao estiver visivel, nao haverá colisao
			return false;
		}


		/*for percorre todos os pontos da nave e compara dada ponto com o asteroide
		OBS: é subtraide 2 de len, porque os dois primeiros e ultimos pontos do vetor sao iguais*/
		for(var i=0,len=this.points.length-2; i<len; i+=2){ 
			var x = this.points[i]+this.x; //recebe a posicao original do ponto + o deslocamento
			var y = this.points[i+1]+this.y;

			if(astr.hasPoint(x,y)){
				return true;
			}
		}
		return false;
	},

	shoot: function(){
		var bullets = []

		var b = new Bullet(this.points[0]+this.x, this.points[1]+this.y, this.angle); //instancia a bala a partir da ponta da nave
		b.maxX = this.maxX;
		b.maxY = this.maxY; 

		bullets.push(b);

		if(this.isTripleShoot){

			b = new Bullet(this.points[0]+this.x, this.points[1]+this.y, this.angle+0.5);
			b.maxX = this.maxX;
			b.maxY = this.maxY; 

			bullets.push(b);

			b = new Bullet(this.points[0]+this.x, this.points[1]+this.y, this.angle-0.5);
			b.maxX = this.maxX;
			b.maxY = this.maxY; 

			bullets.push(b);
		}

		return bullets;
	},

	/*a nave nao terá um valor fixo para sua velocidade. Enquanto o jogador estiver apertando o botao de acelerar,
	 a nave vai estar ganhando velocidade.
	 Como estamos lidando com vetores em um plano, e nao queremos que a nave ultrapasse uma certa velocidade,
	 para saber a velocidade maxima que a nave pode alcancar, é usado o teorema de pitagoras, onde a*a + b*b = c*c,
	 onde a e b é a velocidade em x e y e c é a velocidade maxima que a nave pode alcancar.
	 */
	addVel: function(){

		if((this.vel.x*this.vel.x + this.vel.y*this.vel.y) < 20*20){

			this.vel.x += 0.05*Math.cos(this.angle);
			this.vel.y += 0.05*Math.sin(this.angle);

		}

		this.drawFlames = true; //acende as chamas do fogete

	},

	rotate: function(theta){
		this._super(theta); //chama a funcao pai passando theta
		this.flames.rotate(theta); //rotaciona a chama junto com a nave 
		this.angle += theta; //angulo onde a velocidade tem que agir
	},

	update: function(){
		//atualiza a posicao do asteroide
		this.x += this.vel.x;
		this.y += this.vel.y;

		//desacelera a nave de forma contínua
		this.vel.x *= 0.99
		this.vel.y *= 0.99

		//essa verificacao permite a nave, quando estiver saindo de um lado da tela, aparecer do outro lado, tipo o jogo Snake
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
	},

	draw: function(ctx){

		if(!this.visible){
			return; //se a nave nao estiver visivel, nao a desenha na tela
		}

		ctx.drawPolygon(this, this.x, this.y);

		if(this.drawFlames){
			ctx.drawPolygon(this.flames,this.x,this.y);
			this.drawFlames = false; //certifica que a chama da nave só vai aparecer quando o jogador estiver segurando "up"
		}
	}

})