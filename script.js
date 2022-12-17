// Global variables
var searchHistory = [];
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

// DOM element references
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);


function displaySearchHistory() {
    searchHistoryContainer.innerHTML = '';

    for(var i = searchHistory.length -1; i>= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('aria-controls', 'today forecast');
        btn.classList.add('history-btn', 'btn-history');

        btn.setAttribute('data-search', searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
    }
}

function addToHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);

    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function readSearchHistory() {
    var localHisotry = localStorage.getItem('search-history');
    if (localHisotry) {
        searchHistory = JSON.parse(localHisotry);
    }
    displaySearchHistory();
}

function displayWeather(city, weather) {
    var date = dayjs().format('M/D/YYYY');
    var faren = weather.main.temp;
    var windSpeed = weather.wind.speed;
    var humidity = weather.main.humidity;
    var weatherURL = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var weatherDescrip = weather.weather[0].description || weather[0].main;

    var card = document.createElement('div');
    var body = document.createElement('div');
    var heading = document.createElement('h2');
    var icon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');

    card.setAttribute('class', 'card');
    body.setAttribute('class', 'card-body');
    card.append(body);

    heading.textContent = `${city} (${date})`;
    icon.setAttribute('src', weatherURL);
    icon.setAttribute('alt', weatherDescrip);
    icon.setAttribute('class', 'weather-img');
    heading.append(icon);
    tempEl.textContent = `Temp: ${faren}°F`;
    windEl.textContent = `Wind: ${windSpeed} MPH`;
    humidityEl.textContent = `Humidty: ${humidity} %`;
    body.append(heading, tempEl, windEl, humidityEl);

    todayContainer.innerHTML = '';
    todayContainer.append(card);
}
