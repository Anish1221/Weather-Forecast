$(document).ready(function(){

	$('.short').hide();
	$('.below').hide();
	$('#switch').hide();
	if (navigator.geolocation){
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position){
			currentPosition = position;
			// set lat and lon
			var latitude = currentPosition.coords.latitude;
			var longitude = currentPosition.coords.longitude;
			// console.log(currentPosition);
			var url ='http://api.apixu.com/v1/current.json?key=7b7dab462a844000888155735182502&q='

			$.getJSON(url + latitude + ',' + longitude, function(data){
				// JSON.stringif turns a Javascript object into JSON text and stores that JSON text in a string.
				var data = JSON.stringify(data);
				// JSON.parse turns a string of JSON text into Javascript object
				var json = JSON.parse(data);

				var country = json.location.country;
				var city = json.location.name;
				
				var temp = json.current.temp_c;
				var temp_f = json.current.temp_f;
				var last_updated = json.current.last_updated.replace('-', ' ');

				var wind = json.current.wind_kph;
				var humidity = json.current.humidity;
				var time = json.location.localtime.split(' ')[1];
				var cloud = json.current.cloud;
				// console.log(data);

				$('#switch').show();
				$('.below').show();
				$('#weather').html(city + ',' + country);
				if(temp <= 10){
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/02/06/13/32/snow-3134753_640.jpg)'
					});
					$('#temp').html("<h1>It's a chilly day...</h1>")
				}else if(temp >10 && temp < 28){
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/22/17/40/hill-2165759_640.jpg)'
					});
					$('#temp').html("<h1>It's a sunny day...</h1>")
				}else {
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/11/01/18/19/trees-1789120_640.jpg)'
					});
					$('#temp').html("<h1>It's a hot day...</h1>")
				}


				//toggle temp
				$('#info1').html(time);
				$('#info2').html('Wind ' + wind + 'kph');
				$('#info3').html(temp + '&#8451');
				
				$('.short').show();

				var yes = true;
				$('#switch').on('click', function(){
					if(yes){
						$('#info3').html(temp + '&#8457');	
						$('#switch').html('Show in Celsius');
						yes = false;	
					} else{
						$('#info3').html(temp + '&#8451');
						$('#switch').html('Show in Fahrenheit');
						yes = true;	
					}
				});

				// showing sky status
				if(cloud <=30){
					$('#info5').html('Clear Sky');
				}else{
					$('#info5').html('Cloudy Sky');
				}
				
				$('#info6').html('Humidity ' + humidity + '%');

			});
		});
	}

});