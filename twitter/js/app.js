$(document).ready(function () {
	var twits;
	const oauth = OAuth({
	  consumer: {
	    key: 'i3Q1c3I2PxM3BxBbEpA4LbdX8',
	    secret: 'Wy1cGiwybKKz75I3xItz48FdWcMeNIn7k7WYJ8GCUPFNrk1h3W'
	  },
	  signature_method: 'HMAC-SHA1',
	  hash_function(base_string, key) {
	    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
	  }
	});

	const request_data = {
		url: 'https://api.twitter.com/1.1/search/tweets.json',
		method: 'GET',
		data: { q: '#SAviso' }
	};

	const token = {
	  key: '1837061498-JXQF2ZphDgGd7cqwdSRYuud5B4pP75u1Y0uP7Ws',
	  secret: 'B7kRn0rMHAdCwYUJQAFYMxyb6inlMROkk0BWAjGUYDMDu'
	};
	$.ajax({
	  	url: request_data.url,
	  	type: request_data.method,
	  	data: oauth.authorize(request_data, token)
		}).done(function(data) {
			console.log(data.statuses);
			numTwits = data.statuses.length;
			console.log(numTwits);
			text = new Array();
			var deletes = new Array();
			var date = new Date();
			var dia = date.getDate();
			if(dia<10){
				dia="0" + dia;
			}
			var mes = (date.getMonth()+1);
			if(mes<10){
				mes = "0" + mes;
			}
			var año = date.getFullYear()-2000;
			if (año<10){
				año="0" + año;
			}
			var hora = date.getHours();
			if (hora<10){
				hora = "0" + hora;
			}
			var minuto = date.getMinutes();
			if(minuto<10){
				minuto = "0" + minuto;
			}
			var fecha=año+""+mes+""+dia+""+hora+""+minuto;
			console.log(fecha);
			var indDeletes = 0;
			mensajes = [];
			for( i = 0; i< numTwits; i++ ){
				var mensaje = {id:'',texto:''};
				console.log(data.statuses[i]);
				console.log(data.statuses[i].user.screen_name);
				if(data.statuses[i].user.screen_name == 'mexikovsky'){
					texto = data.statuses[i].text;
					indice = texto.indexOf("#f");
					if(indice != -1){
						id = texto.slice(indice+1,indice+10);
						mensaje.id=id;
						console.log("id: "+id);
						texto = texto.slice(19,texto.length);
						mensaje.texto  = texto;
						
						indice = texto.indexOf("#t");
						if(indice != -1){
							idFech = texto.slice(indice+2,indice+13);
							console.log("fecha DESTINO" + idFech);
							console.log("fecha ACTUAL" + fecha);
							if(fecha>=idFech){
								deletes[indDeletes]=id;
								indDeletes = indDeletes + 1;
							}
							texto = texto.slice(indice+13,texto.length);
							mensaje.texto = texto;
						}
						mensajes.push(mensaje);
					}
					indice = texto.indexOf("#o");
					if(indice != -1){
						id = "f"+texto.slice(indice+2,indice+10);
						console.log(id);
						deletes[indDeletes]=id;
						indDeletes = indDeletes + 1;
					}
				}
			}
			console.log(deletes);
			function crearCuadro(element, index, array){
				stringId=element.id;
				if(deletes.indexOf(stringId)==-1){
					$(".carousel-inner").append("<div class=\"item\"><div class=\"row\"><div class=\"col-sm-8 col-sm-offset-2\"><p>"+element.texto+"</div></div></div>");
					console.log(element.texto);
				}
			}
			console.log(mensajes);
			mensajes.forEach(crearCuadro);
		});
});