const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const apiKey="b5f8a2a27ca88545fab0c212da317ca4";



setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

function getCitySearch(){
    let input = document.getElementById("input");

    clearWeatherItems();
    getData(formatInput(input.value));

}

function clearWeatherItems()
{
    let weatherItems=document.getElementsByClassName("weather-forecast-item");
    let forecastContainer=document.getElementById("weather-forecast");
    console.log(weatherItems.length);
    if(weatherItems.length>0)
    {
        forecastContainer.innerHTML="";
    }
}
function formatInput(input)
{

    let lowerCaseInput=input.toLowerCase();
    let str=lowerCaseInput.slice(1);
    lowerCaseInput= lowerCaseInput.charAt(0).toUpperCase()+str;

    return lowerCaseInput;
}

function getData(input)
{

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {

        showWeatherData(data)
    })
}

function setBackground(weather)
{

    if(weather=="Clear")
    {
        document.body.style.backgroundImage="url('Images/clear_sky.jpg')";
    }else if(weather=="Sunny")
    {
        document.body.style.backgroundImage="url('Images/sunny.jpg')";
    }else if(weather=="Drizzle")
    {
        document.body.style.backgroundImage="url('Images/drizzle.jpg')";
    }else if(weather=="Clouds")
    {
        document.body.style.backgroundImage="url('Images/clouds.jpg')";
    }else if(weather=="Rain" || weather=="Storm")
    {
        document.body.style.backgroundImage="url('Images/rain.jpg')";
    }else if(weather=="Snow")
    {
        document.body.style.backgroundImage="url('Images/snow.jpg')";
    }
}
function showWeatherData (data) {
    let podatoci=data.main;
    let humidity = podatoci.humidity;
    let temp = podatoci.temp;
    let feels_like = podatoci.feels_like;
    let weather = data.weather[0].main;
    // console.log(podatoci);
    // console.log("Temperature: "+podatoci.temp);
    // console.log("Feels like: "+podatoci.feels_like);
    // console.log("123:"+data.weather[0].main);
    // console.log("Humidity:"+podatoci.humidity);
    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
       
    </div>
    <div class="weather-item">
        <div>Temeprature</div>
        <div>${temp}</div>
    </div>
    <div class="weather-item">
        <div>Feels like</div>
        <div>${feels_like}</div>
    </div>
    <div class="weather-item">
    <div>Weather</div>
        <div>${weather}</div>
    </div>
     <div class="weather-item">Humidity</div>
        <div>${humidity}</div>
  
    `;
    setBackground(weather);
    let lon = data.coord.lon;
    let lat = data.coord.lat;
    inNextDaysWeather(lon,lat);
}
function inNextDaysWeather(lon,lat){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&units=metric&lon=${lon}&appid=${apiKey}`).then(res => res.json()).then(nextData => {

        showNextWeatherData(nextData);
    });

}
function showNextWeatherData(data){
    let weatherForecast = document.getElementById("weather-forecast");
    let currentDate=new Date();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();

    for(let i = 8 , j=1;i <= 24;i+=8,j++){
        let day = data.list[i].dt_txt;
        let weather = data.list[i].weather[0].main;
        let temp = data.list[i].main.temp;

        weatherForecast.innerHTML += `
        <div class="weather-forecast-item">
                    <div class="day">${date+j} ${months[month]}</div>
                    <div class="temp">Weather: ${weather}</div>
                    <div class="temp">Temperature: ${temp}&#176; C</div>
        </div>
    `
    }


}