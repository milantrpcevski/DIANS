const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-box');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const apiKey = "b5f8a2a27ca88545fab0c212da317ca4";
let error = document.getElementById("error-message");

fetch('http://localhost:3000/')
.then(response => response.json())
.then(data => {
console.log(data);
})
.catch(error => console.error(error));
//So ova postignuvame postojano azuriranje na vremeto i datata
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);

//Go zemame inputot od korisnikot za gradot
function getCitySearch() {
    let input = document.getElementById("input");

    clearWeatherItems();// dokolku prethodno imame prebaruvanje za drug grad gi trgame polinjata
    getData(formatInput(input.value)); //gi prevzemame podatocite za vneseniot grad
}

//Brisenje na polinjata za naredniote denovi od prebaruvanje
function clearWeatherItems() {
    let weatherItems = document.getElementsByClassName("weather-forecast-item");
    let currentInfo=document.getElementById("current-box");
    if(currentInfo!=null)
    {
        currentInfo.innerHTML='';

    }
    let forecastContainer = document.getElementById("weather-forecast");
    if (weatherItems.length > 0) {
        forecastContainer.innerHTML = "";
    }

}
//Go transformirame inputot vo format na first letter uppercase
function formatInput(input) {
    let lowerCaseInput = input.toLowerCase();
    let str = lowerCaseInput.slice(1);
    lowerCaseInput = lowerCaseInput.charAt(0).toUpperCase() + str;
    return lowerCaseInput;
}

function getData(input) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {

        showWeatherData(data)
        removeErrorMessage();
    }).catch();
}

function removeErrorMessage() {
    error.innerText = "";
}

function showErrorMessage() {
    error.innerText = "No city found! Try again";
}

//Postavuvame pozadina spored toa kakva e momentalnata vremenska prognoza za samiot grad
function setBackground(weather) {

    
    if (weather == "Clear") {
        document.body.style.backgroundImage = "url('../Images/clear_sky.jpg')";
    } else if (weather == "Sunny") {
        document.body.style.backgroundImage = "url('../Images/sunny.jpg')";
    } else if (weather == "Drizzle") {
        document.body.style.backgroundImage = "url('../Images/drizzle.jpg')";
    } else if (weather == "Clouds") {
        document.body.style.backgroundImage = "url('../Images/clouds.jpg')";
    } else if (weather == "Rain" || weather == "Storm") {
        document.body.style.backgroundImage = "url('../Images/rain.jpg')";
    } else if (weather == "Snow") {
        document.body.style.backgroundImage = "url('../Images/snow.jpg')";
    } else if (weather == 'Fog' || weather == 'Mist' || weather == 'Smog'){
        document.body.style.backgroundImage = "url('../Images/fog.webp')";
    }
}

//Ovde gi obrabotuvame podatocite koi gi dobivame preku API-to
function showWeatherData(data) {
    //Proverka dali e vnesen tochniot grad
    if( data.message == "city not found") 
        showErrorMessage();
    
    let podatoci = data.main;
    let humidity = podatoci.humidity;
    let temp = Math.round(podatoci.temp);
    let feels_like = Math.round(podatoci.feels_like);
    let weather = data.weather[0].main;

    currentWeatherItemsEl.innerHTML =
        ` <div class="others" id="current-weather-items">
<div class="weather-item">
       
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
        <div class="weather-item">
        <div>Humidity</div>
           <div>${humidity}</div>
        </div> 
    `;
    setBackground(weather);// postavuvame pozadina na stranata
    //Od samoto api gi dobivame i tocnite koordinati za vnesniot grad koi ni se potrebni za povik na drugo api za
    //vremenskata prognoza za narednite denovi
    let lon = data.coord.lon;
    let lat = data.coord.lat;
    inNextDaysWeather(lon, lat);
}

//Zemame podatoci za narednite denovi
function inNextDaysWeather(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&units=metric&lon=${lon}&appid=${apiKey}`).then(res => res.json()).then(nextData => {

        showNextWeatherData(nextData);
    });
}

//Gi prikazuvame podatocite za vremenskata prognoza za narednite denovi
function showNextWeatherData(data) {
    let weatherForecast = document.getElementById("weather-forecast");
    let currentDate = new Date();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();

    for (let i = 8, j = 1; i <= 24; i += 8, j++) {
        let day = data.list[i].dt_txt;
        let weather = data.list[i].weather[0].main;
        let temp = Math.round(data.list[i].main.temp);

        weatherForecast.innerHTML += `
        <div class="weather-forecast-item">
                    <div class="day">${date + j} ${months[month]}</div>
                    <div class="temp">Weather: ${weather}</div>
                    <div class="temp">Temperature: ${temp}&#176; C</div>
        </div>
    `
    }
}

function getWeatherData () {

    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`).then(res => res.json()).then(data => {
            clearWeatherItems();// dokolku prethodno imame prebaruvanje za drug grad gi trgame polinjata

        showWeatherData(data);
      })
    })
}
