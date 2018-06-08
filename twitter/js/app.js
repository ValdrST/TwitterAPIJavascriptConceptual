$(document).ready(function () {
	const request_data = {
		url: 'js/carrusel.txt',
		method: 'GET',
		data: { q: '#SAviso' }
	};
	$.ajax({
	  	url: request_data.url,
	  	type: request_data.method
		}).done(function(data) {
			console.log(data);
			function crearCuadro(element, index, array){
				stringId=element.id;
					$(".carousel-inner").append("<div class=\"item\"><div class=\"row\"><div class=\"col-sm-8 col-sm-offset-2\"><p>"+element+"</div></div></div>");
			}
			var mensaje = data.split("\n"); 
			mensaje.pop();
			mensaje.forEach(crearCuadro);
		});
});