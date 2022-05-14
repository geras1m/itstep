let weather = document.querySelector('.weather');

let symbol = '+';

function renderHtml(weatherObj) {
    let html = `
<div class="menu"></div>
<div class="wrapper-input">
    <p class="input-text">ПОГОДА</p>
    <input type="text" name="city" class="input-city" placeholder="Поиск города">
    <button class="btn"><img src="lupa16.jpg" alt="l"></button>
</div>
<div class="wrapper-yellow"></div>
    <div class="wrapper-weather">
        <div class="wrapper-first">
        <div class="weather-head">
            <p class="weather-city"> Прогноз погоды в ${weatherObj.name}, ${weatherObj.sys.country}</p>
            <p class="data-now">сегодня ${dataNow}</p>
        </div>
        <div class="wrapper-gif-value">
            <div class="gif">
                <img src="${changeGif(weatherObj.weather[0].icon)}" alt="">
            </div>
             <div class="value">
            ${symbol}${Math.round(weatherObj.main.temp - 273.15)}<split>&#176;</split>
            </div>
            <div class="description">
            ${weatherObj.weather[0].description}
            </div>
        </div>
        <p class="feeling"><span>ощущается как</span> ${symbol}${Math.round(weatherObj.main.feels_like - 273.15)}<split>&#176;</split>C </p>
    </div>
    <div class="wrapper-second">
        <div class="additional-description-pressure">
            ${Math.round(weatherObj.main.pressure * 0.75)} мм.рт.ст
        </div>
        <div class="additional-description-humidity">
            ${weatherObj.main.humidity} %
        </div>
        <div class="additional-description-weather">
            ${weatherObj.wind.speed} м/с
        </div>
        <div class="additional-description-weather">
        
        </div>
        <div class="additional-description-weather">
        
        </div>
    </div>
</div>

<div class="wrapper-weather-5-days">
        <div class="day">
            <div class="day-titl"></div>
            <div class="day-img"></div>
            <div class="day-temperatura"></div>
            <div class="day-description"></div>
            <div class="day-pressure"></div>
            <div class="day-humidity"></div>
            <div class="day-wind"></div>
            <div class="day-ultraviolet"></div>
        </div>
        <div class="day">
        
        </div>
        <div class="day">
        
        </div>
        <div class="day">
        
        </div>
        <div class="day">
        
        </div>
    </div>
`;
    weather.insertAdjacentHTML('beforeend', html);
}

const request = new XMLHttpRequest();
let cityDefault = 'Mogilev';
request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
request.send();
request.onload = function () {
    let data = JSON.parse(request.responseText);
    symbol = getPlusOrMinus(data);

    /*const request = new XMLHttpRequest();
    let cityDefault = 'Mogilev';
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
    request.send();*/

    renderHtml(data);

    const inputValue = document.querySelector('.input-city');
    const btnSearch = document.querySelector('.btn');
    btnSearch.addEventListener('click', () => {
        weather.textContent = '';

        let newCity = inputValue.value;
        request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
        request.send();
        let data1 = JSON.parse(request.responseText);
        symbol = getPlusOrMinus(data1);
        renderHtml(data1);
    });
}

function changeGif(codeOfIcon) {                                   // Изменение GIF/img у погоды
    if (codeOfIcon === '01d') {
        return 'http://openweathermap.org/img/wn/01d@2x.png';
    } else if (codeOfIcon === '01n') {
        return 'http://openweathermap.org/img/wn/01n@2x.png';
    } else if (codeOfIcon === '02d') {
        return 'http://openweathermap.org/img/wn/02d@2x.png';
    } else if (codeOfIcon === '02n') {
        return 'http://openweathermap.org/img/wn/08n@2x.png';
    } else if (codeOfIcon === '03d' || codeOfIcon === '03n') {
        return 'http://openweathermap.org/img/wn/03d@2x.png';
    } else if (codeOfIcon === '04d' || codeOfIcon === '04n') {
        return 'http://openweathermap.org/img/wn/04d@2x.png';
    } else if (codeOfIcon === '09d' || codeOfIcon === '09n') {
        return 'http://openweathermap.org/img/wn/09d@2x.png';
    } else if (codeOfIcon === '10d') {
        return 'http://openweathermap.org/img/wn/10d@2x.png';
    } else if (codeOfIcon === '10n') {
        return 'http://openweathermap.org/img/wn/10n@2x.png';
    } else if (codeOfIcon === '11d' || codeOfIcon === '11n') {
        return 'http://openweathermap.org/img/wn/11d@2x.png';
    } else if (codeOfIcon === '13d' || codeOfIcon === '13n') {
        return 'http://openweathermap.org/img/wn/13d@2x.png';
    } else if (codeOfIcon === '50d' || codeOfIcon === '50n') {
        return 'http://openweathermap.org/img/wn/50d@2x.png';
    }
}

let dataNow = new Date();                                             //Вывод даты

let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};

dataNow = dataNow.toLocaleString('ru', options);

function getPlusOrMinus(data) {                            // Изменение знака у значения температуры
    let temp = data.main.temp - 273.15;
    if (temp > 0) {
        return '+';
    } else if (temp < 0) {
        return ''
    }
}





