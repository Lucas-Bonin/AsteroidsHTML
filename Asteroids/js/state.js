//interface para estados do jogo
var State = Class.extend({
	init: function(game){ //game é a classe Game passada por parametro
		this.game = game;
	},

	handleInputs: function(input){},
	update: function(){},
	render: function(ctx){}

});