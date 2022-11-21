var todayName = document.querySelector(".today-name");
var todayDate = document.querySelector(".today-date")
var todayMonth = document.querySelector(".today-month")
var thirdDayName = document.querySelector(".third-day-name")
var nextdayName = document.querySelector(".nextday-name")
var cuntaryName = document.querySelector(".card-title")
var iconFristCard = document.querySelector("#img-icon")
var degree = document.querySelector(".degree");
var searchBar = document.querySelector("#search");

var date = new Date();
//displayDay
function displayDay() {
    var days = ["Sunday ", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var indexDay = date.getDay();
    var today = days[indexDay];
    var nextDay = days[indexDay + 1];
    var thirdDay = days[indexDay + 2];
    todayName.innerHTML = today;
    nextdayName.innerHTML = nextDay;
    thirdDayName.innerHTML = thirdDay;

}
displayDay()
//displayMonth
function displayMonth() {

    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = months[date.getMonth()]
    todayMonth.innerHTML = month;
}

displayMonth()
//displaydate
function displaydate() {
    var numdays = [];
    for (var i = 0; i <= 30; i++) {
        numdays.push(i)

    }

    var numofday = numdays[date.getDate()];


    todayDate.innerHTML = numofday;


}
displaydate()

//display weather
var arrayweather = [];
// var TownName=[];
function getInfoWeather(currentCity = 'cairo') {
    var httprequest = new XMLHttpRequest();
    httprequest.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    httprequest.send();
    httprequest.addEventListener("readystatechange", function () {
        if (httprequest.readyState == 4 && httprequest.status == 200) {
            arrayweather = JSON.parse(httprequest.response);
            //   TownName = arrayweather.location.name;
            //   console.log(TownName)
            displaytodayWeather()
            displaynextWeather()
            displaythirdWeather()
        }
    })
}
getInfoWeather()

//displaytodayWeather
function displaytodayWeather() {
    currenticon = arrayweather.current.condition.icon;
    iconFristCard.src = `${currenticon}`;


    cuntaryName.innerHTML = arrayweather.location.name;;
    degree.innerHTML = arrayweather.current.temp_c;
    document.querySelector(".desc-weather").innerHTML = arrayweather.current.condition.text
    document.querySelector(".humidity").innerHTML = arrayweather.current.humidity
    document.querySelector(".wind").innerHTML = arrayweather.current.wind_kph
    document.querySelector(".wind_dir").innerHTML = arrayweather.current.wind_dir

}
//displaynextWeather
function displaynextWeather() {
    document.querySelector("#img-icon2").src = `${arrayweather.forecast.forecastday[1].day.condition.icon}`
    document.querySelector(".desc-weather2").innerHTML = arrayweather.forecast.forecastday[1].day.condition.text;
    document.querySelector(".maxtemp").innerHTML = arrayweather.forecast.forecastday[1].day.maxtemp_c;
    document.querySelector(".mintemp").innerHTML = arrayweather.forecast.forecastday[1].day.mintemp_c;


}
//displaythirdWeather
function displaythirdWeather() {
    document.querySelector("#img-icon3").src = `${arrayweather.forecast.forecastday[2].day.condition.icon}`
    document.querySelector(".desc-weather3").innerHTML = arrayweather.forecast.forecastday[2].day.condition.text;
    document.querySelector(".maxtemp2").innerHTML = arrayweather.forecast.forecastday[2].day.maxtemp_c;
    document.querySelector(".mintemp2").innerHTML = arrayweather.forecast.forecastday[2].day.mintemp_c;


}
searchBar.addEventListener("keyup", function () {
    currentCity=searchBar.value;
    getInfoWeather(currentCity);
})
