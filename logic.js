var clicked = false;
$(".searchButton").click(function() {
    if (clicked == false)
    {
        clicked = true;
        var city = $(".searchTerm").val();
        const key = "10b179455d283bed7aab50907b5e31e3";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=metric";
        getWeather(url).catch(function (error){
            alert("Something went wrong, try again !");
            clicked = false;
            $(".vreme").css("display", "none");
        });
    }
});

async function getWeather(url)
{
    var response = await fetch(url);
    var data = await response.json();
    $(".city").text(data.name + ", " + data.sys.country);
    var url = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    $(".icon").attr("src", url);
    $(".temp").text(data.main.temp + " ˚C");
    $(".description").text(data.weather[0].description);
    $(".vreme").css("display", "block");
    console.log(data);
    clicked = false;
}