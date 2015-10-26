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

	//algoritimo para saber se um ponto encontra-se dentro de um poligono
	//http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	hasPoint: function(ox, oy, x, y) { 
		var c = false;
		var p = this.points;
		var len = p.length;

		for (var i = 0, j = len-2; i < len; i += 2) {
			var px1 = p[i] + ox;
			var px2 = p[j] + ox;

			var py1 = p[i+1] + oy;
			var py2 = p[j+1] + oy;

			if (( py1 > y != py2 > y ) &&
			    ( x < (px2-px1) * (y-py1) / (py2-py1) + px1 )
			) {
				c = !c;
			}
			j = i;
		}
		return c;
	}

});