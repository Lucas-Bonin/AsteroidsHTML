var Polygon = Class.extend({
	init: function(p){ //p é um array de vertices do poligono
		this.points = p.slice(0); //

	},

	//Rotaciona o poligono, passando como parametro um angulo
	//https://en.wikipedia.org/wiki/Rotation_matrix
	rotate: function(theta){
		var c = Math.cos(theta);
		var s = Math.sin(theta);

		for(var i=0,len=this.points.length; i<len; i+=2){
			var x = this.points[i]
			var y = this.points[i+1];

			this.points[i] = c*x - s*y;
			this.points[i+1] = s*x + c*y;
		}
	},

	//redimensiona o tamanho do poligono
	scale: function(c){ //c é um valor constante
		for(var i=0,len=this.points.length; i<len; i++){
			this.points[i] *= c;
		}
	},

	hasPoint: function(ox,oy,x,y){

	}

});