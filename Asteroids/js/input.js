var InputHandler = Class.extend({

	init: function(keys){ //recebe como parametro um mapa com todas as teclas que serao utilizadas no jogo
		this.keys = {}; 
		this.down = {};
		this.pressed = {};

		for(key in keys){ //for irá rodar sobre o "keys que veio como parametro"
			var code = keys[key]; //pegará o codigo do digito. Exemplo: up: 32, code receberá 32
			this.keys[code] = key; //inverte o mapa de keys rebebido por parametro. Mapa = inputValue: inputName
			this.down[key] = false; //Mapa = inputName: boolean
			this.pressed[key] = false; //Mapa = inputName: boolean
		}

		var self = this;

		document.addEventListener("keydown", function(evt) {

			if(self.keys[evt.keyCode]){ //verifica se tecla acionada  é uma tecla válida

				self.down[self.keys[evt.keyCode]] = true;
			}

		});

		document.addEventListener("keyup", function(evt) {

			if(self.keys[evt.keyCode]){ //verifica se tecla acionada  é uma tecla válida

				self.down[self.keys[evt.keyCode]] = false;
				self.pressed[self.keys[evt.keyCode]] = false;
			}

		});

	},

	//funcoes de verificacao das teclas
	isDown: function(key){ //recebe como parametro o nome da tecla
		return this.down[key]
	},

	isPressed: function(key){ //faz a comparacao dessa forma para retornar somente na primeira vez que a tecla foi precionada
		if(this.pressed[key]){
			return false;
		}else if(this.down[key]){
			return this.pressed[key] = true;
		}

		return false;
	}

})