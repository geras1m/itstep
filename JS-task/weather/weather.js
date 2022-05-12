const weather = document.querySelector('.weather');

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
    <div class="weather-head">
        <p class="weather-city"> Прогноз погоды</p>
        <p class="data-now">сегодня ${dataNow}</p>
    </div>
    <div class="wrapper-gif-value">
        <div class="gif">
            
        </div>
        <div class="value">
        ${symbol}${Math.round(weatherObj.main.temp-273.15)}<split>&#176;</split>
            
        </div>
    </div>
    <div class="wrapper-description">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
`;
    weather.insertAdjacentHTML('beforeend', html);
}

/*const valueInput = document.querySelector('.input-city');
const btnInput = document.querySelector('.btn');*/

const request = new XMLHttpRequest();
request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=mogilev&appid=d2d35b6f5f8da4f517968aa7540b713d`);
request.send();
request.addEventListener('load', () => {
    let data = JSON.parse(request.responseText);
    symbol = getPlusOrMinus(data);
    renderHtml(data);
})

let dataNow = new Date();
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};
dataNow = dataNow.toLocaleString('ru',options );

function getPlusOrMinus(data) {
    let temp = data.main.temp-273.15;
    if(temp > 0){
        return '+';
    }else if (temp < 0){
        return ''
    }

}


