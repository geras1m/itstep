let weather = document.querySelector('.weather');
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};
let dataNow = (new Date()).toLocaleString('ru', options);     //Вывод даты
let inputValue;
let btnSearch;

let symbol = '+';

function renderHtml(weatherObj) {
    let html = `
<div class="menu">
    <div class="menu-item">
        <a class="item item-mail" target="_blank" href="https://mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=mail.ru&mt_sub5=36&mt_sub1=pogoda.mail.ru&mt_click_id=mt-ds8xq6-1652728923-110852269">
            Mail.ru
        </a>
        <a class="item" target="_blank" href="https://account.mail.ru/login?page=https%3A%2F%2Fe.mail.ru%2Fmessages%2Finbox%3Futm_source%3Dportal%26utm_medium%3Dnew_portal_navigation%26utm_campaign%3De.mail.ru%26mt_sub5%3D36%26mt_sub1%3Dmail.ru%26mt_click_id%3Dmt-y7s979-1652728966-2391393454&allow_external=1&from=octavius">
            Почта
        </a>
        <a class="item" target="_blank" href="https://cloud.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=cloud.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-pqaft6-1652728979-84093317">
            Облако
        </a>
        <a class="item" target="_blank" href="https://ok.ru/?mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-koydy6-1652728990-3724490173">
            Однаклассники
        </a>
        <a class="item" target="_blank" href="https://vk.com/">
            Вконтакте 
        </a>
        <a class="item" target="_blank" href="https://news.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=news.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-curxh8-1652729053-954414224">
            Новости
        </a>
        <a class="item" target="_blank" href="https://go.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=go.mail.ru&mt_sub5=36&mt_sub1=news.mail.ru&mt_click_id=mt-h0c140-1652729065-3553585952">
            Поиск
        </a>
        <a class="item" target="_blank" href="https://love.mail.ru/ru?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=love.mail.ru&mt_sub5=36&mt_sub1=go.mail.ru&mt_click_id=mt-k9iu14-1652729079-1096571841">
            Знакомства
        </a>
        <a class="item" target="_blank" href="https://my.mail.ru/?from=whiteline&utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=my.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-v6h9q7-1652729092-1463186944">
            Мой мир
        </a>
        <a class="item" target="_blank" href="https://games.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=games.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-pllim0-1652729102-4133023122">
            Игры
        </a>
    </div>
    <a class="menu-login" target="_blank" href="https://account.mail.ru/signup?from=navi&lang=ru_RU&siteid=169&app_id_mytracker=58519" >
           Login
    </a>
</div>
<div class="wrapper-input">
    <a class="input-text" href="https://mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=mail.ru&mt_click_id=mt-ds8xq6-1652626776-1984622503&mt_sub1=pogoda.mail.ru">
        ПОГОДА
    </a>
    <input type="text" name="city" class="input-city" placeholder="Поиск города">
    <button class="btn">
        <img src="lupa-svg.svg" alt="">
    </button>
</div>
<div class="wrapper-black">
    <a class="news-of-weather" href="https://pogoda.mail.ru/news/">
    Новости погоды
    </a>
</div>
<div class="wrapper-weather">
     <div class="wrapper-first">
        <div class="weather-head">
            <p class="weather-city"> 
                Прогноз погоды в ${weatherObj.name}, ${weatherObj.sys.country}
            </p>
            <p class="data-now">
                сегодня ${dataNow}
            </p>
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
        <p class="feeling">
            <span>
                ощущается как
            </span> 
            ${symbol}${Math.round(weatherObj.main.feels_like - 273.15)}
            <split>
                &#176;
            </split>C 
        </p>
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

    inputValue = document.querySelector('.input-city');
    btnSearch = document.querySelector('.btn');
    btnSearch.addEventListener('click', () => {
        let newCity = inputValue.value;
        if (!newCity) return;
        weather.textContent = '';
        (async function () {
            await getCity(newCity);
        })();
    });
}

async function getCity(city = 'Mogilev') {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
    const data = await response.json();
    symbol = getPlusOrMinus(data);
    renderHtml(data);
}

/*function getCityNew(city = 'Mogilev') {
    let data1;
    let data2;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        .then((response)=>response.json())
        .then((data)=>{
            data1=data;
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        })
        .then((response)=>response.json())
        .then((data)=> {
            data2=data;
        })
        .then(()=>{
            let result = data1+data2;
        })

}*/


(async function(){
    await getCity();
})();


/*function showWeather() {
    let data;
    // let dataFiveDays;

    const request = new XMLHttpRequest();
    let cityDefault = 'Mogilev';
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
    request.send();
    request.addEventListener('load', () => {
        data = JSON.parse(request.responseText);
        symbol = getPlusOrMinus(data);
        renderHtml(data);

        // const inputValue = document.querySelector('.input-city');
        // const btnSearch = document.querySelector('.btn');

        /!*btnSearch.addEventListener('click', (e) => {
            console.log(e.target);
            let newCity = inputValue.value;
            if(newCity !==''){
            weather.textContent = '';

            request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
            request.send();
            request.addEventListener('load',()=>{
                let dataNew = JSON.parse(request.responseText);
                renderHtml(dataNew);
            })

            }
        });*!/
    })
}*/

// showWeather()

function changeGif(codeOfIcon) {                                   // Изменение GIF/img у погоды
    return `http://openweathermap.org/img/wn/${codeOfIcon}@2x.png`;
}


function getPlusOrMinus(data) {                            // Изменение знака у значения температуры
    let temp = data.main.temp - 273.15;
    if (temp > 0) {
        return '+';
    } else if (temp < 0) {
        return ''
    }
}





