
const town = document.getElementById('town')
const latInput = document.getElementById('lat')
const lonInput = document.getElementById('lon')
const submit = document.getElementById('submit')
const cardHolder = document.getElementById('cardHolder')

town.addEventListener('change', () => {
    temp = town.value
    getCoordinates(temp)
})

submit.addEventListener('click', (event) => {
    event.preventDefault();
    const lat = latInput.value;
    const lon = lonInput.value;
    getCurrentWeather(lat, lon)
})

const getCoordinates = async (location) => {
    const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=928727c844b22fe8f406fd59203e231e`)
    const data = await resp.json();
    latInput.value= data[0].lat
    lonInput.value = data[0].lon
}

const getCurrentWeather = async (lat, lon) => {
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=928727c844b22fe8f406fd59203e231e`)
    const data = await resp.json();

    const card = document.createElement('div');
    card.className='card';
    cardHolder.append(card);

    const title = document.createElement('h2')
    title.innerText= town.value;
    card.append(title);

    const main = document.createElement('h3');
    main.innerText = `"${data.weather[0].main}"`;
    card.append(main);

    const temp = document.createElement('h4');
    calc = Math.floor((data.main.temp - 273.15) * (9/5) + 32)
    temp.innerText = `${calc}°`;
    card.append(temp);

    const humidity = document.createElement('h5');
    humidity.innerText = `Humidity: ${data.main.humidity}`;
    card.append(humidity);

    const wind = document.createElement('h6');
    wind.innerText = `Windspeed: ${data.wind.speed}`;
    card.append(wind);
}


/*

data.weather.main --> 'clear'
data.main.temp (in kalvin) (32K − 273.15) × 9/5 + 32 = -402.1°F
data.main.humidity
data.wind.speed
*/