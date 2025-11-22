// Hamburger Menu
const hambButton = document.querySelector("#hamb-btn");
const nav = document.querySelector("nav");

// Add event listener
hambButton.addEventListener("click", () =>{
    nav.classList.toggle("show");
});


// Current weather temperature
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDesc = document.querySelector("#weather-desc");
const forecastList = document.querySelector("#forecast-list");

// Weather Parameters
const apiKey = "35df101c98301fb345a2ee51f02ff4ea";
const akureLat = "7.25";
const akureLon = "5.20";
const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${akureLat}&lon=${akureLon}&appid=${apiKey}&units=imperial`;
const urlForecast =`https://api.openweathermap.org/data/2.5/forecast?lat=${akureLat}&lon=${akureLon}&appid=${apiKey}&units=imperial`;

// Fetch the Weather Data
async function getWeather() {
    const response = await fetch(urlCurrent);
    try{
        if(response.ok){
            const data = await response.json();
            console.log(data);
            displayWeather(data);

        }else{
            throw Error(await response.text());
            
        }
    }catch(error){
        console.log(error);
    }
};
function displayWeather(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`
    const iconElements = data.weather[0].icon;
    const iconsrc =`https://openweathermap.org/img/w/${iconElements}.png`;

    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", data.weather[0].description);
    weatherDesc.textContent = data.weather[0].description;


}

async function getForecast(){
    try {
        const response = await fetch(urlForecast);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        
        }else{
            throw Error(await response.text());
        }
    }catch(error){
        console.log(error);

    }
};

function displayForecast(data){
    forecastList.innerHTML = "";
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,3);
    daily.forEach(day => {
        const li = document.createElement("li");
        li.textContent = `${day.main.temp}°F - ${day.weather[0].description}`;
        forecastList.appendChild(li);
    });

};
getWeather();
getForecast();

// Members Spotlights
const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights(){
    try{
        const response = await fetch("data/members.json");
        if(response.ok){
            const members = await response.json();
            console.log(members);
            displaySpotlights(members);
        }else{
            throw Error(await response.text());
        }
    }catch(error){
        console.log(error);
    }
};

function displaySpotlights(members){
    const qualified = members.filter(m => 
        m.membership === 3 || m.membership === 2
    );
    const randomSpotlights = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomSpotlights.forEach(member =>{
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML =`
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="level">${member.membership} Member</p>
        `;

        spotlightContainer.appendChild(card);
        
    });
};

loadSpotlights();
