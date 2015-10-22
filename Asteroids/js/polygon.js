var Polygon = Class.extend({
	init: function(p){ //p é um array de vertices do poligono
		this.points = p.slice(0); //

	},

	rotate: function(theta){

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