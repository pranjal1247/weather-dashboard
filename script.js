const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

const cityName = document.querySelector("#city-name");
const date = document.querySelector("#date");
const weatherIcon = document.querySelector("#weather-icon");
const temperature = document.querySelector("#temperature");
let temp_c, temp_f, isCelsius = true;
const unitBtn = document.querySelector("#unit-toggle");
const description = document.querySelector("#description");

const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const pressure = document.querySelector("#pressure");

let wind_kph, wind_mph, isKph = true;

const apiKey = "38390a44147c4f57901112005250312";
const baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=";

// https://api.weatherapi.com/v1/forecast.json?key=38390a44147c4f57901112005250312&q=London&days=1&aqi=no&alerts=no


const loader = document.querySelector("#loader");
const weatherContent = document.querySelector("#weather-content");

function fetchWeather(city) 
{
    loader.classList.add("show");
    weatherContent.style.display = "none";

    const fullUrl = `${baseUrl}${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

    fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            cityName.innerText = data.location.name;
            date.innerText = new Date(data.location.localtime).toLocaleDateString("en-GB");
            data.location.localtime.split(" ")[0];
            weatherIcon.src = "https:" + data.current.condition.icon;
            temp_c = data.current.temp_c; 
            temp_f = data.current.temp_f;
            temperature.innerHTML = isCelsius ? (temp_c + "&deg;C") : (temp_f + "&deg;F");
            unitBtn.innerHTML = isCelsius ? ("&deg;F") : ("&deg;C");
            description.innerText = data.current.condition.text;

            humidity.innerText = data.current.humidity + "%";
            wind_kph = data.current.wind_kph;
            wind_mph = data.current.wind_mph;
            windSpeed.innerText = isKph ? (wind_kph + "km/h") : (wind_mph + "miles/h");
            pressure.innerText = data.current.pressure_mb + " mb";

            const isDay = data.current.is_day;
            const weatherCard = document.querySelector(".weather-card");

            if (isDay) {
                weatherCard.classList.remove("night");
                weatherCard.classList.add("day");
            } else {
                weatherCard.classList.remove("day");
                weatherCard.classList.add("night");
            }

            loader.classList.remove("show");
            weatherContent.style.display = "block";

            const forecastContainer = document.querySelector("#forecast-container");
            forecastContainer.innerHTML = "";
            data.forecast.forecastday.forEach(day => {
                const dayCard = document.createElement("div");
                dayCard.classList.add("forecast-card");

                const dateStr = new Date(day.date).toLocaleDateString("en-UK", {weekday: "short"});
                const iconUrl = "https:" + day.day.condition.icon;
                const temp = day.day.avgtemp_c + "&deg;C";

                dayCard.innerHTML = `
                    <p style="font-weight: 500;">${dateStr}</p>
                    <img src="${iconUrl}">
                    <h3>${temp}<h3>
                `;

                forecastContainer.appendChild(dayCard);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("City not found or API error!");

            loader.classList.remove("show");

        });
}

function showWeatherCard() 
{
    const weatherSection = document.querySelector("#weather-section");
    weatherSection.scrollIntoView({behavior: "smooth", block: "start"});
}



searchBtn.addEventListener("click", function() {
    const city = cityInput.value;
    console.log("Fetching data for: ", city);

    fetchWeather(city);

    showWeatherCard();
    
});

cityInput.addEventListener("keydown", function(event){
    if (event.key == "Enter") {
        const city = cityInput.value;
        console.log("Fetching data for: ", city);

        fetchWeather(city);

        showWeatherCard();
    }
});

fetchWeather("New Delhi");


const backToTopBtn = document.querySelector("#back-to-top");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    });
});

function changeUnit() {
    if (isCelsius) {
        temperature.innerHTML = temp_f + "&deg;F";
        unitBtn.innerHTML = "&deg;C";
        isCelsius = false;
    } else {
        temperature.innerHTML = temp_c + "&deg;C";
        unitBtn.innerHTML = "&deg;F";
        isCelsius = true;
    }
}

unitBtn.addEventListener("click", function () {
    changeUnit();
});

temperature.addEventListener("click", function() {
    changeUnit();
});

windSpeed.addEventListener("click", function() {
    if (isKph) {
        windSpeed.innerText = wind_mph + "miles/h";
        isKph = !isKph;
    } else {
        windSpeed.innerText = wind_kph + "km/h";
        isKph = !isKph;
    }
});

const hamburgerBtn = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburgerBtn.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});