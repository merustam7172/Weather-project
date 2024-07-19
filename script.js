let weatherBox = document.querySelector(".weather");
let container = document.querySelector(".container");
let weather_detail = document.querySelector(".weather-detail");
let inputBox = document.querySelector(".search_box input");
let searchBtn = document.querySelector(".search_box button");
let error404 = document.querySelector(".not_found");
let wrapper = document.querySelector(".wrapper");


const API_key = "bb7129bbe5b8b4094e7e35bfbaa88965";
searchBtn.addEventListener('click', () => {

    SearchWeather();
    
})

async function SearchWeather(){
    let cityName = inputBox.value;
    
    if(cityName == ""){
        return;
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_key}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    
    if(data.cod === "404"){
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weather_detail.classList.remove('active');
        error404.classList.add('active');
        wrapper.style.backgroundImage = "url(/images/location.jpg)";
    }
    // else means no error
    else{
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weather_detail.classList.add('active');
        error404.classList.remove('active');
    }
        

    let image = document.querySelector(".weather img");
    let temperature = document.querySelector(".temperature");
    let description = document.querySelector(".description");
    let humidity_percentage = document.querySelector(".humidity_percentage");
    let speed = document.querySelector(".speed");

    // image change karo
    switch(data.weather[0].main){
        case 'Clear':
            image.src = 'images/clear.png';
            wrapper.style.backgroundImage = "url(/images/clearWeather.jpg)";
            break;
        
        case 'Rain':
            image.src = 'images/rain.png';
            wrapper.style.backgroundImage = "url(/images/rainBackground.jpg)";
            break;
        
        case 'Snow':
            image.src = 'images/snow.png';
            wrapper.style.backgroundImage = "url(/images/snowBackground.jpg)";
            break;

        case 'Clouds':
            image.src = 'images/cloud.png';
            wrapper.style.backgroundImage = "url(/images/cloudBackground.jpg)";
            break;

        case 'Mist':
            image.src = 'images/mist.png';
            wrapper.style.backgroundImage = "url(/images/mistBackground.jpg)";
            break;
        default:
            image.src = 'images/cloud.png';
            wrapper.style.backgroundImage = "url(/images/sunsetBackground.jpg)";
    }


    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    description.innerHTML = `${data.weather[0].description}`;
    humidity_percentage.innerHTML = `${parseInt(data.main.humidity)}%`;
    speed.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

}