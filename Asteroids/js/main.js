//enum de estados do jogo
var States = {
	NO_CHANGE: 0,
	MENU: 1,
	GAME: 2,
	END: 3
}


//classe que gerenciará o jogo
var Game = Class.extend({
	init: function(){
		//inicia classe com um canvas de tamanho 640 x 480
		this.canvas = new Canvas(640, 480);

		//adiciona controlador das entradas
		this.input = new InputHandler({
			left:     37,
			up:       38,
			right:    39,
			down:     40,
			spacebar: 32,
			enter:    13
		});

		this.canvas.ctx.strokeStyle = "#fff"; //muda a cor da linha do contexto

		this.stateVars = { //variaveis que permanecerao de uma cena para a outra
			score: 0
		}

		this.currentState = null;
		this.nextState = States.MENU;

	},

	run: function(){
		var self = this;
		this.canvas.animate(function(){
			//controle dos estados do jogo
			if(self.nextState !== States.NO_CHANGE){ //operador !== verifica o valor e o tipo da variavel
				switch(self.nextState){
					case States.MENU:
						self.currentState = new MenuState(self);
						break;
					case States.GAME:
						self.currentState = new GameState(self);
						break;
					case States.END:
						self.currentState = new EndState(self);
						break;
				}

				self.nextState = States.NO_CHANGE;
			} 

			//atualiza as principais funcoes do jogo
			self.currentState.handleInputs(self.input);
			self.currentState.update();
			self.currentState.render(self.canvas.ctx);

		})
	}

});