const weather = document.querySelector('.weather');
// const inputValue = document.querySelector('.input-city');


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
        
    </div>
    <p class="feeling"><span>ощущается как</span> ${symbol}${Math.round(weatherObj.main.feels_like - 273.15)}<split>&#176;</split>C </p>
    <div class="wrapper-description">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="wrapper-weather-5-days">
        <div class="day">
            
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
</div>
`;
    weather.insertAdjacentHTML('beforeend', html);
}

const request = new XMLHttpRequest();
let cityDefault = 'Берлин';
request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
request.send();
request.onload = function (){
    let data = JSON.parse(request.responseText);
    symbol = getPlusOrMinus(data);
    renderHtml(data);
}

/*function addNewCity() {
    const inputValue = document.querySelector('.input-city');
    const btnSearch = document.querySelector('.btn');

    let newCity = inputValue.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=d2d35b6f5f8da4f517968aa7540b713d`)
        .then()
}*/

function changeGif(codeOfIcon){
    if(codeOfIcon === '01d'){
        return 'gif/untitled-1%20(1).gif';
    }
    else if (codeOfIcon === '01n'){
        return 'gif/untitled-1%20(2).gif'
    }
    else if (codeOfIcon === '02d'){
        return 'gif/untitled-1%20(11).gif'
    }
    else if(codeOfIcon === '02n'){
        return 'gif/untitled-1%20(8).gif'
    }
    else if(codeOfIcon === '03d' || codeOfIcon === '03n'){
        return 'gif/untitled-1%20(3).gif'
    }
    else if(codeOfIcon === '04d' || codeOfIcon === '04n'){
        return 'gif/untitled-1%20(10).gif'
    }
    else if(codeOfIcon === '09d' || codeOfIcon === '09n'){
        return 'gif/untitled-1%20(5).gif'
    }
    else if(codeOfIcon === '10d'){
        return 'gif/untitled-1%20(4).gif'
    }
    else if(codeOfIcon === '10n'){
        return 'gif/untitled-1%20(12).gif'
    }
    else if(codeOfIcon === '11d' || codeOfIcon === '11n'){
        return 'gif/untitled-1%20(6).gif'
    }
    else if(codeOfIcon === '13d' || codeOfIcon === '13n'){
        return 'gif/untitled-1%20(7).gif'
    }
    else if(codeOfIcon === '50d' || codeOfIcon === '50n'){
        return 'http://openweathermap.org/img/wn/50d@2x.png'
    }
}

let dataNow = new Date();
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};
dataNow = dataNow.toLocaleString('ru', options);

function getPlusOrMinus(data) {
    let temp = data.main.temp - 273.15;
    if (temp > 0) {
        return '+';
    } else if (temp < 0) {
        return ''
    }
}

/*function searchCity() {
    const inputValue = document.querySelector('.input-city');
    const btnSearch = document.querySelector('.btn');
    btnSearch.addEventListener('click', ()=>{
        let newCity = inputValue.value;
        request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=d2d35b6f5f8da4f517968aa7540b713d`);
        request.send();
    });
}*/

