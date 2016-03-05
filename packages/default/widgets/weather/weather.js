widget = {
	//runs when we receive data from the job
	onData: function(el, data) {

		//The parameters our job passed through are in the data object
		//el is our widget element, so our actions should all be relative to that
		if (data.title) {
			$('h2', el).text(data.title + ' (' + data.hourlyContent.city.name + ')');
		}

		// http://openweathermap.org/forecast5
		var mainContent = $('.content', el).html('');
		if (data.hourlyContent && data.hourlyContent.list && data.hourlyContent.list.length > 0) {
			// create table
			var table = $('<table></table>').appendTo(mainContent);
			var tr = $('<tr></tr>').appendTo(table);
			data.hourlyContent.list.forEach(function(weatherItem) {
				// create table cells:
				var itemTd = $('<td></td>').appendTo(tr);
				var hourlyTable = $('<table class="hourlyTable"></table>').appendTo(itemTd);

				var utcTime = new Date(weatherItem.dt_txt.replace(' ', 'T'));
				var hour = utcTime.getHours();
				var ampm = 'am';
				if(utcTime.getHours() > 12) {
					hour = hour - 12;
					ampm = 'pm';
				}
				var td1 = $('<tr></tr>').append('<td>' + hour + ampm + '</td>').appendTo(hourlyTable);

				var td2 = $('<tr></tr>').append('<td><img src="http://openweathermap.org/img/w/' + weatherItem.weather[0].icon + '.png" /></td>').appendTo(hourlyTable);
				var td3 = $('<tr></tr>').append('<td>' + weatherItem.weather[0].main + '</td>').appendTo(hourlyTable);
			});
		}


		// daily
		var dailyHighContent = $('.dailyhigh', el).html('');
		var dailyWrapper = $('<div class="dailyWrapper">'+ data.dailyContent.list[0].temp.max + '</div>').appendTo(dailyHighContent);

	}
};
