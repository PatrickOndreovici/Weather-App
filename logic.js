$(document).ready(function() {
    const apiKey = "10b179455d283bed7aab50907b5e31e3";
    function GetHour(data){
        var res = "";
        for (var i = 11; i <= 15; ++i){
            res += data[i];
        }
        return res;
    }
    function GetWeather(url1, url2){
        fetch(url1)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                $("#location").html(data.name + ", " + data.sys.country);
                $("#temperature").html(Math.floor(data.main.temp) + " <span>&#8451;</span>");
                var iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                $("#icon").attr("src", iconUrl);
                $("#description").html(data.weather[0].description);
                $("#weather").css("display", "inline-block");
            })
            .catch(function(err){
                console.error(err);
            });
        fetch(url2)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                $("#hour1").html(GetHour(data.list[0].dt_txt));
                $("#hour2").html(GetHour(data.list[1].dt_txt));
                $("#hour3").html(GetHour(data.list[2].dt_txt));
                $("#temp1").html(Math.floor(data.list[0].main.temp) + " <span>&#8451;</span>");
                $("#temp2").html(Math.floor(data.list[1].main.temp) + " <span>&#8451;</span>");
                $("#temp3").html(Math.floor(data.list[2].main.temp) + " <span>&#8451;</span>");
                iconUrl = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
                $("#icon1").attr("src", iconUrl);
                iconUrl = "http://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png";
                $("#icon2").attr("src", iconUrl);
                iconUrl = "http://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png";
                $("#icon3").attr("src", iconUrl);
            })
            .catch(function(err){
                console.error(err);
            });
    }
    function GetWeatherByCity(city){
        var url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + apiKey;
        var url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + apiKey;
        GetWeather(url1, url2);
    }
    function GetCurrentCityWeather(){
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            var url1 = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric" + "&appid=" + apiKey;
            var url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric" + "&appid=" + apiKey;
            GetWeather(url1, url2);
          }

          function error() {
    
          }
        
          if(!navigator.geolocation) {
    
          } else {
    
            navigator.geolocation.getCurrentPosition(success, error);
          }
    }

    GetCurrentCityWeather();
    $("#search").submit(function(){
        var city = $(this).serializeArray()[0].value;
        GetWeatherByCity(city);
        return false;
    });
});