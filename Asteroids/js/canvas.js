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

			//char code para criacao do texto
			ctx.ACODE = "A".charCodeAt(0);
			ctx.ZCODE = "0".charCodeAt(0);
			ctx.SCODE = " ".charCodeAt(0);

			/*funcao desenha poligono
			recebe como parametro um array de pontos que sao as vertices do poligono e as coordenadas no inicio do desenho
			ferramenta para desenha poligono:
			https://dl.dropboxusercontent.com/spa/fiu9vh5o72q88a4/polygon-draw/index.html
			*/


			ctx.drawPolygon = function(p, x, y, color){
				p = p.points;

				this.beginPath(); //comeca o desenho
				
				this.moveTo(p[0] + x, p[1] + y); //aponta contexto para a linha inicial
								this.stroke(); //desenha tudo

				for(var i=2,len=p.length; i<len; i+=2){
					this.lineTo(p[i] + x, p[i+1] + y);
				}

				if(color){
					var aux = this.strokeStyle;
					this.strokeStyle = color;
					this.stroke(); //desenha tudo

					this.strokeStyle = aux;
				}else{
					this.stroke(); //desenha tudo

				}
			};

			// funcao cria um texto desenhando cada letra no canvas
			ctx.vectorText = function(text, s, x, y, offset){ //string, tamanho , posisao x, y e offset
				text = text.toString().toUpperCase(); //tranforma a string em letras maiusculas

				var step = s*6 //determina o espacamento entre as letras

				if(typeof offset === "number"){ //comeca string depois do offset
					x += step*(offset - text.length); 
				}

				//se 'x' receber null, centraliza texto na horizontal
				if(typeof x !== "number"){
					x = Math.round((this.width - text.length*step)/2);
				}

				//se 'y' receber null, centraliza texto na vertical
				if(typeof y !== "number"){
					y = Math.round((this.height - step)/2);
				}

				//aumenta a resolucao das letras
				x += 0.5;
				y += 0.5;

				for(var i=0,len=text.length; i<len; i++){
					var ch = text.charCodeAt(i); //recebe o codigo da letra 

					if(ch === this.SCODE){ //compara se o que foi digitado é um espaco
						x += step;
						continue;
					}

					var p;
					if(ch - this.ACODE >= 0){ //verifica se char é uma letra
						p = Points.LETTERS[ch-this.ACODE]; //recebe o vetor de pontos da letra
					}else{
						p = Points.NUMBERS[ch - this.ZCODE];
					}

					this.beginPath(); 
				
					this.moveTo(p[0]*s + x, p[1]*s + y); 
					for(var j=2,len2=p.length; j<len2; j+=2){
						this.lineTo(p[j]*s + x, p[j+1]*s + y);
					}
					this.stroke();
					x += step; //quando comecar a desenhar, a proxima letra terá um espacamento da primeira
				}
				
			};

			ctx.clearAll = function(){ //limpa tudo que tem no canvas
				this.clearRect(0, 0, this.width, this.height);
			}

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