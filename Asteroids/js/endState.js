var EndState = State.extend({

	init: function(game) {
		this.game = game;

		this.hasEnterName = false; //verifica se jogador ja escreveu um nome
		this.nick = "no name"; //nome do jogador
		this.score = game.stateVars.score; //recebe o score do jogador

		//socore fake para representacao na tela;
		//OBS: implementar um score de verdade guardando valores em algum lugar
		this.hisores = [
			["manuel", 1010],
			["binario", 11111],
			["itapira", 1011],
			["samu3l", 10000]
		];

		//recebe nome do jogador em um campo de texto em html
		//OBS: esconder o campo de texto que aparece na tela
		this.namefield = document.getElementById("namefield");
		this.namefield.value = this.nick;
		this.namefield.focus(); //quando carregar a tela vai direto para campo de texto
		this.namefield.select();
	},

	handleInputs: function(input) {
		if (this.hasEnterName) { //quando jogador escrever um nome e apertar espaco, volta para o menu principal
			if (input.isPressed("spacebar")) {
				
				this.game.nextState = States.MENU;
			}
		} else {
			if (input.isPressed("enter")) {


				this.hasEnterName = true;
				this.namefield.blur(); //remove focus do elemento

				//cria uma string contendo apenas letras e numeros e insere no vetor de score
				this.nick = this.nick.replace(/[^a-zA-Z0-9\s]/g, "");
				this.hisores.push([this.nick, this.score]); 

				// ordena o vetor de score
				this.hisores.sort(function(a, b) {
					return b[1] - a[1];
				});
			}
		}
	},

	/**
	 * @override State.update
	 */
	update: function() {
		if (!this.hasEnterName) {
			this.namefield.focus();

			//encerra funcao se nao houve modificacao no nome
			if (this.nick === this.namefield.value) {
				return;
			}

			// atualiza valor do nome
			this.namefield.value = this.namefield.value.replace(/[^a-zA-Z0-9\s]/g, "");
			this.nick = this.namefield.value;
		}
	},


	render: function(ctx) {
		ctx.clearAll();
		//OBS: todas as posicoes de exibicao na tela, nao estao sendo feitas de forma dinamica
		if (this.hasEnterName) { //apresenta tela com os melhores no rank
			

			ctx.vectorText("Hiscore", 3, null, 130);
			for (var i = 0, len = this.hisores.length; i < len; i++) {
				var hs = this.hisores[i];
				ctx.vectorText(hs[0], 2, 200, 200+25*i);
				ctx.vectorText(hs[1], 2, 320, 200+25*i, 10); //ultimo parametro indica espacamento antes de escrever a string
			}
			ctx.vectorText("press space to continue", 1, 200, 350);

		} else { //mostra a tela com o score do jogador e o nome que ele que por

			ctx.vectorText("Thank you for playing", 4, null, 100);
			ctx.vectorText("nick", 2, null, 180);
			ctx.vectorText(this.nick, 3, null, 220);
			ctx.vectorText(this.score, 3, null, 300);
		}
	}
});