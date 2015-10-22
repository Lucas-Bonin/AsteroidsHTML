var GameState = State.extend({
	init: function(game){
		this._super(game); //chama construtor da classe pai

		//teste para verificar desenho no canvas
		this.poly = new Polygon([
	0, 0,
	-2, -1,
	-1, -2,
	1, -1,
	-1, -4,
	0, -6,
	3, -6,
	3, -5,
	4, -4,
	5, -3,
	4, -2,
	3, -1,
	4, 0,
	5, 2,
	3, 3,
	2, 4,
	0, 2,
	1, 1,
	0, 0
]);
		this.poly.scale(10); //redimensionando o poligono
	},

	update: function(){

	},

	render: function(ctx){
		ctx.drawPolygon(this.poly,100,100); //desenha um poligono comecando do ponto 100 100
	}
})