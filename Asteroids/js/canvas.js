//Criar metodos do canvas
var Canvas = Class.extend({

	//construtor da classe
	init: function(width,height){
		//cria dinamicamente um canvas
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;

		//cria um contexto
		//essa funcao recebe como parametro this.canvas.getContext("2d") e retorna um contexto
		this.ctx = (function(ctx){
			ctx.height = ctx.canvas.height;
			ctx.width = ctx.canvas.width;

			/*funcao desenha poligono
			recebe como parametro um array de pontos que sao as vertices do poligono e as coordenadas no inicio do desenho
			ferramenta para desenha poligono:
			https://dl.dropboxusercontent.com/spa/fiu9vh5o72q88a4/polygon-draw/index.html
			*/
			ctx.drawPolygon = function(p, x, y){
				p = p.points;

				this.beginPath(); //comeca o desenho
				
				this.moveTo(p[0] + x, p[1] + y); //aponta contexto para a linha inicial
								this.stroke(); //desenha tudo

				for(var i=2,len=p.length; i<len; i+=2){
					this.lineTo(p[i] + x, p[i+1] + y);
					console.log("nada"+p[i]);
				}
				this.stroke(); //desenha tudo
			};

			return ctx;

		})(this.canvas.getContext("2d"));

		//adiciona o novo canvas criado no body da pagina
		document.body.appendChild(this.canvas);

	},

	//funcao de animacao do canvas. Parecido com a funcao Update() do Unity
	animate: function(loop){ //loop é a funcao que será passada como parametro e será executada várias vezes

		//rf receberá o animation frame de cada browser, se nao existir, recebe uma funcao que usa Timeout()
		var rf = (function(){
			return 	window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame || 
					window.oRequestAnimationFrame || 
					window.msRequestAnimationFrame || 
					function(cb, el){
						window.setTimeout(cb, 1000/60);
					}
		})();

		//a recursao é chamada dentro da funcao do animation frame
		var self = this;
		var l = function(){
			loop(); //executa o codigo que ficará em loop
			rf(l, self.canvas);
		}

		rf(l, this.canvas);

	}

});